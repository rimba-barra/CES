<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_PurchaseletterProcessor extends Erems_Models_App_Box_Processor {

    private $decanDelete;
    private $unitDb;
    private $purchaseletter;

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
            case "updatebyrangedate":
                return $dao->updateByRangeDateAbsentType($object);
                break;
            case "absenttlk":
                return $dao->updateTlk($object);
                break;
            case "reschedule":
                // return $dao->saveReschedule($object);
                return $this->daoSaveReschedule($dao, $object);
                break;
            case "updatereschedule":
                return $dao->updateReschedule($object, $this->decanDelete);
                break;
        }
    }

    public function daoSaveReschedule($dao, $object) {

        $params = new Erems_Models_Purchaseletter_Params($this->getSession());



        if ($params->getRescheduleSendMail() === NULL) {
            echo "TIDAK ADA PARAMETER GLOBAL RESCHEDULE_SENDMAIL";
            die();
        }


        $hasilSave = $dao->saveReschedule($object);
        // $hasilSave = 1071;

        $sendMail = false;
        $others = array(
            "SEND_MAIL" => FALSE,
            "SEND_STATUS" => FALSE,
            "SEND_OTHERS" => NULL // other information of send mail
        );

        if ($hasilSave > 0) { // jika berhasil save data, maka cek param send mail
            $sendMail = intval($params->getRescheduleSendMail());




            if ($sendMail > 0) {
                $others["SEND_MAIL"] = TRUE;
                try {
                    $others["SEND_STATUS"] = TRUE;


                    $approveUserId = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), "PURCHASELETTER_SUPERUSER");
                    if(is_array($approveUserId)){
                        $approveUserId = $approveUserId[0];
                    }
                    $cnEmail = $dao->getEmailReschedule($hasilSave, $approveUserId);


                    $players = array(
                        'approve' => array(
                            'email' => $cnEmail[0][0]["user_email"],
                            'name' => $cnEmail[0][0]["user_fullname"]
                        )
                    );

                    $others["SEND_OTHERS"] = $players;


                    $message = '<html><body>';
                    $message .= '<p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';
                    $message .= '<p> <br/>';
                    $message .= '</p>';
                    $message .= '<p>Berikut permohonan transaksi pada CES (Ciputra Enterprise System), <br/>';
                    $message .= 'Mohon bantuan untuk persetujuannya.	<br/>';
                    $message .= '</p>';
                    $message .= '<p>';
                    $message .= '<table>';
                    $message .= '<tr><td>Persetujuan        </td><td>: Rubah Jadwal Tagihan </td></tr>';
                    $message .= '<tr><td>Persetujuan No     </td><td>: ' . $cnEmail[0][0]["nomor_persetujuan"] . '</td></tr>';
                    $message .= '<tr><td>Nomor Unit         </td><td>: ' . $cnEmail[0][0]["nomor_unit"] . '</td></tr>';
                    $message .= '<tr><td>Nama Customer         </td><td>: ' . $cnEmail[0][0]["nama_customer"] . '</td></tr>';
                    $message .= '<tr><td>Nama Pemohon       </td><td>: ' . $cnEmail[0][0]["nama_pemohon"] . '</td></tr>';
                    $message .= '<tr><td>Nama Sales         </td><td>: ' . $cnEmail[0][0]["nama_salesman"] . '</td></tr>';
                    $message .= '<tr><td>Tanggal permohonan </td><td>: ' . date("d-m-Y H:i:s") . '</td></tr>';
                    $message .= '</table>';
                    $message .= '</p>';
                    $message .= '<p>Deskripsi			:</p>';
                    $message .= '<p> <br/>';
                    $message .= '<br/>';
                    $message .= '<br/>';
                    $message .= '<a href="https://ces.ciputragroup.com/">Login disini untuk proses persetujuan</a><br/>';
                    $message .= '<br/>';
                    $message .= '<br/>';
                    $message .= 'Terima Kasih,	</p>';
                    $message .= '<p> &nbsp; </p>';
                    $message .= '<p>' . $cnEmail[0][0]["nama_pemohon"] . ' </p>';
                    $message .= "</body></html>";




                    $mail = new Erems_Box_Library_Email();
                    $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                    $mail->getMail()->setBodyHtml(nl2br($message));
                    $mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
                    // $mail->getMail()->addCc($players["oldcustomer"]["email"], $players["oldcustomer"]["name"]);
                    //  $mail->getMail()->addCc($players["newcustomer"]["email"], $players["newcustomer"]["name"]);
                    $mail->getMail()->setSubject('Request for Reschedule of Purchaseletter');
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
                } catch (Zend_Mail_Exception $e) {
                    $statusSentMail = FALSE;
                }
            }
        }


        //  return array("status" => $hasilSave, "others" => $others);


        return $hasilSave;
    }

    public function daoSave($dao, $object) {

        // GENERATE NOMOR DOKUMEN
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();

        $unitDb = $this->unitDb;
        $purchaseletter = $this->purchaseletter;

        $counter = new Erems_Models_Purchaseletter_Counter();
        $counter->setYear(date("Y", strtotime($purchaseletter->getDate())));
        $counter->getProject()->setId($unitDb[1][0]["project_id"]);
        $counter->getPt()->setId($unitDb[1][0]["pt_id"]);
        //$counter->getCluster()->setId($unitDb[1][0]["cluster_id"]);
        $isResetByCounter = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($unitDb[1][0]["project_id"], $unitDb[1][0]["pt_id"])->getIsPurchaseNomorResetByCluster();
        // kalau reset hanya per tahun makan set cluster = 0 , jika pakai per tahun dan per cluster set cluster by unit
        $counter->getCluster()->setId($isResetByCounter == 1 ? $unitDb[1][0]["cluster_id"] : 0);

        if ($isResetByCounter < 0) { // tidak reset per tahun dan cluster
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $counter->getPt()->getId(), 0, 0);
        } else {
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $counter->getPt()->getId(), $counter->getCluster()->getId(), $counter->getYear());
        }


        $lastNumber = Erems_Box_Tools::toObjectRow($lastNumber, new Erems_Models_Purchaseletter_Counter());
        $counter->setId($lastNumber->getId());

        if (intval($lastNumber->getNextNumber()) == 0) {

            $lastNumber->setNextNumber(1);
        }


        $paramsNomor = array(
            "nomor" => $lastNumber->getNextNumber(),
            "project_id" => $counter->getProject()->getId(),
            "pt_id" => $counter->getPt()->getId(),
            "purchase_date" => $purchaseletter->getDate(),
            "cluster_code" => $unitDb[1][0]["cluster_code"],
            "productcategory_code" => $unitDb[1][0]["productcategory_productcategory"] == "BANGUNAN" ? "B" : "K",
            "block_code" => $unitDb[1][0]["block_code"]
        );

        $newNomor = NULL;
        $nomorUseGenco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($counter->getProject()->getId(), $counter->getPt()->getId())->isNomorUseGenco();
        
        if($nomorUseGenco){
            $newNomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($counter->getProject()->getId(), $counter->getPt()->getId())->getPurchaseNomorTpl($paramsNomor);
            
            
            
        }else{
            $newNomor = $this->getNewNomor($paramsNomor);
        }
        
        
        $purchaseletter->setNomor($newNomor);



        if (strlen($purchaseletter->getNomor()) < 5) {
            echo "TIDAK ADA NOMOR PURCHASELETTER";

            die();
        }
        // /GENERATE NOMOR DOKUMEN
        $hasilSave = $dao->save($object);
        if ($hasilSave) {

            $counter->setNextNumber(intval($newNomor) + 1);

            if ($counter->getId() == 0) {
                $hasilSaveCounter = $daoCounter->save($counter);
            } else {
                $hasilSaveCounter = $daoCounter->update($counter);
            }
        }
        return TRUE;
        //  return parent::daoSave($dao, $object);
    }

    private function getNewNomor($paramsNomor) {

        $subj = new Erems_Models_Purchaseletter_NomorSubject();
        $subj->attach(new Erems_Models_Purchaseletternomor_Biasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_Local());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOff);
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOrc());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarRes());
        $subj->attach(new Erems_Models_Purchaseletternomor_BmwCilegon());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraIndah());
        $subj->attach(new Erems_Models_Purchaseletternomor_Bizpark3Bekasi());
        $subj->attach(new Erems_Models_Purchaseletternomor_Palu());
        $subj->attach(new Erems_Models_Purchaseletternomor_WinangunManado());
        $subj->attach(new Erems_Models_Purchaseletternomor_WinangunJoManado());
        $subj->attach(new Erems_Models_Purchaseletternomor_LosariMakassar());
        $subj->attach(new Erems_Models_Purchaseletternomor_Medan());
        $subj->attach(new Erems_Models_Purchaseletternomor_Lampung());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandLampung());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraGardenPekanbaru());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandPekanbaru());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandCibubur());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandTallasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraGardenSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandGreenlake());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandAmbon());
        $subj->attach(new Erems_Models_Purchaseletternomor_TheTamanDayuSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitragranSemarang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitrasunSemarang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandPalembang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandKendari());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitragranMutiaraYogyakarta());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitrasunGardenYogyakarta());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraHarmoniSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandDenpasar());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraRaya());
        $subj->attach(new Erems_Models_Purchaseletternomor_BarsaCityYogya());
		$subj->attach(new Erems_Models_Purchaseletternomor_CitralakeSuites());
        $subj->setPurchaseParams($paramsNomor);

        return $subj->getPurchaseNomor();
    }

    public function daoUpdate($dao, $object) {

        $object->setNomor($object->tempNomor); // nomor purchaseletter berdasrkan inputan dari user

        $params = $this->getData();
        // var_dump($params);

        $customerUpdate = new Erems_Models_Master_CustomerProfile();
        $customerUpdate->setId($params["customer_customer_id"]);
        $customerUpdate->setAddress($params["customer_address"]);
        $customerUpdate->getCity()->setId($params["city_city_name"]);
        $customerUpdate->setZipCode($params["customer_zipcode"]);
        $customerUpdate->setHomePhone($params["customer_home_phone"]);
        $customerUpdate->setMobilePhone($params["customer_mobile_phone"]);
        $customerUpdate->setOfficePhone($params["customer_office_phone"]);
        $customerUpdate->setFax($params["customer_fax"]);

        $ktp = new Erems_Models_Customer_KTP();
        $ktp->setNomor($params["customer_KTP_number"]);
        $customerUpdate->setKtp($ktp);
        $customerUpdate->setNpwpNumber($params["customer_NPWP"]);
        $customerUpdate->setNpwpAddress($params["customer_NPWP_address"]);
        $customerUpdate->setEmail($params["customer_email"]);

        return $dao->update($object, $this->decanDelete, $customerUpdate);
    }

    public function afterValidation($purchaseletter) {
        /// insert new purchaseletter

        $data = $this->getData();



        if ($purchaseletter instanceof Erems_Models_Purchaseletter_PurchaseLetterTransaction) {
            $purchaseletter->tempNomor = $purchaseletter->getNomor();
        }



        if ($purchaseletter instanceof Erems_Models_Purchaseletter_Reschedule) {
            foreach ($data["detail"] as $row) {
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setArrayTable($row);
                $sch->setScheduleTypeId($this->getScheduleTypeId($row["scheduletype_scheduletype"]));

                $purchaseletter->addSchedule($sch);
            }

            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($purchaseletter);
            $de->generate();

            if ($purchaseletter->getId() > 0) {

                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
                $de->setDelimiterCandidate($decan);
                $de->generate();
                $this->decanDelete = $decan;
            }

            return $purchaseletter;
        }



        $dao = new Erems_Models_Unit_UnitDao();
        $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        //$price = new Erems_Models_Purchaseletter_PriceCalculator();
        $price = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->getPriceCalculatorPHP();
        $unit = new Erems_Models_Unit_UnitTran();
        $unitDb = $dao->getOne($purchaseletter->getUnit());


        if ($purchaseletter->getId() > 0) { /// for update only
            $this->decanDelete = NULL;
            foreach ($data["detail"] as $row) {
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setArrayTable($row);
                $sch->setScheduleTypeId($this->getScheduleTypeId($row["scheduletype_scheduletype"]));
                $purchaseletter->addSchedule($sch);
            }

            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($purchaseletter);
            $de->generate();

            // for deleted schedule

            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
            $de->setDelimiterCandidate($decan);
            $de->generate();
            $this->decanDelete = $decan;
        } else {
            if (count($unitDb) > 0) {

                $addOnParams = $data["addonparams"];

                $unit->setArrayTable($unitDb[1][0]);
                $price->setUnit($unit);
                $price->setPurchaseLetter($purchaseletter);
                $price->isEditNilaiPPNTanah = $addOnParams["isEditNilaiPPNTanah"];
                $price->isEditNilaiPPNBangunan = $addOnParams["isEditNilaiPPNBangunan"];
                $price->process();



                $purchaseletter->getUnit()->getStatus()->setId(Erems_Box_Config::UNITSTATUS_SOLD);


                //$purchaseletter->setNomor(Erems_Box_Models_App_DocPrefixGenerator::get("PCHLR"));



                foreach ($data["detail"] as $row) {
                    $sch = new Erems_Models_Purchaseletter_Schedule();
                    $sch->setArrayTable($row);
                    $sch->setScheduleTypeId($this->getScheduleTypeId($row["scheduletype_scheduletype"]));
                    $purchaseletter->addSchedule($sch);
                }



                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($purchaseletter);
                $de->generate();

                $this->unitDb = $unitDb;
                $this->purchaseletter = $purchaseletter;
            }
        }


        return $purchaseletter;
    }

    private function getScheduleTypeId($stName) {
        if ($stName == "TJ") {
            return Erems_Box_Config::SCHTYPE_TANDAJADI;
        } else if ($stName == "UM") {
            return Erems_Box_Config::SCHTYPE_UANGMUKA;
        } else if ($stName == "INH") {
            return Erems_Box_Config::SCHTYPE_INH;
        } else if ($stName == "KPR") {
            return Erems_Box_Config::SCHTYPE_KPR;
        } else if ($stName == "SIP") {
            return Erems_Box_Config::SCHTYPE_CASH;
        }
    }

    protected function createDocNumber($payment) {

        if ($payment instanceof Erems_Models_Purchaseletter_Reschedule) {
            
        } else {
            $payment->setNomor(Erems_Box_Models_App_DocPrefixGenerator::getCedarDoc($this->getSession()));
        }
    }

    public static function flashprintEmail($email,$name,$menit,$code) {
        $hasil = array(
            "STATUS"=>FALSE,
            "MESSAGE"=>""
        );
        
        
        try {
        
            $url = "https://ces.ciputragroup.com/flashweb/e_flashprintpl.php?code=".$code;

            $message = '<html><body>';
            $message .= '<p>Dear ' .$name . '</p>';
            $message .= '<p> <br/>';
            $message .= '</p>';
            $message .= '<p>Request untuk flash print purchaseletter telah terbentuk. Silahkan klik link berikut <a href="'.$url.'">'.$url.'</a> untuk mengaktifkan flash print tersebut. 
Anda mempunyai '.$menit.' menit untuk mengaktfikan melalui link ini.<br/>';
            $message .= '</p>';
            $message .= '<p><br/><br/>Pesan ini hasil generate dari sistem CES. Mohon tidak membalas pesan ini.<br/>';
            $message .= '</p>';
           
            $message .= "</body></html>";




            $mail = new Erems_Box_Library_Email();
            $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
            $mail->getMail()->setBodyHtml(nl2br($message));
            $mail->getMail()->addTo($email,$name);
            $mail->getMail()->setSubject('Request Flash Print for Purchaseletter');
            $mail->getMail()->send();

            $statusSentMail = TRUE;
        } catch (Zend_Mail_Exception $e) {
            $statusSentMail = FALSE;
        }
        
        $hasil["STATUS"] = $statusSentMail;
        
        
        return $hasil;
    }
    
    public static function flashprintEmailB($email,$name,$menit,$code,$purchaseletterInfo) {
        $hasil = array(
            "STATUS"=>FALSE,
            "MESSAGE"=>""
        );
        
        
        try {
        
            $url = "https://ces.ciputragroup.com/flashweb/e_flashprintpl.php?code=".$code;

            $message = '<html><body>';
            $message .= '<p>Dear ' .$name . '</p>';
            $message .= '<p> <br/>';
            $message .= '</p>';
            $message .= '<p>Request untuk flash print purchaseletter telah terbentuk. Silahkan klik link berikut <a href="'.$url.'">'.$url.'</a> untuk mengaktifkan flash print tersebut. 
Anda mempunyai '.$menit.' menit untuk mengaktfikan melalui link ini.<br/>';
            $message .= '</p>';
            $message .= '<p><br/>Berikut informasi purchaseletter : <br/>';
            $message .= '<table>';
            $message .= '<tr><td>Nomor unit</td><td>: <b>'.$purchaseletterInfo["nomor_unit"].'</b></td></tr>';
            $message .= '<tr><td>Nama Customer</td><td>: <b>'.$purchaseletterInfo["nama_customer"].'</b></td></tr>';
            $message .= '</table>';
      
            $message .= '</p>';
            $message .= '<p><br/><br/>Pesan ini hasil generate dari sistem CES. Mohon tidak membalas pesan ini.<br/>';
            $message .= '</p>';
           
            $message .= "</body></html>";




            $mail = new Erems_Box_Library_Email();
            $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
            $mail->getMail()->setBodyHtml(nl2br($message));
            $mail->getMail()->addTo($email,$name);
            $mail->getMail()->setSubject('Request Flash Print for Purchaseletter');
            $mail->getMail()->send();

            $statusSentMail = TRUE;
        } catch (Zend_Mail_Exception $e) {
            $statusSentMail = FALSE;
        }
        
        $hasil["STATUS"] = $statusSentMail;
        
        
        return $hasil;
    }

}

?>
