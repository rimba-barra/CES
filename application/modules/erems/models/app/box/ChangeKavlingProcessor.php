<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_ChangeKavlingProcessor extends Erems_Models_App_Box_Processor {

    private $purchasLetter;
    private $docStatus;
    private $numberCounter;

    public function setDocStatus($status) {
        $this->docStatus = intval($status);
    }

    public function daoProses($dao, $object, $modeCreate) {
        echo "hello";
        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    public function afterFillData($changeKavling) {

        if (!in_array($this->docStatus, array(1, 2))) {
            $dao            = new Erems_Models_Unit_UnitDao();
            $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
            $plDao          = new Erems_Models_Purchaseletter_PurchaseLetterDao();
            //$price = new Erems_Models_Purchaseletter_PriceCalculator();
            // $price = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->getPriceCalculatorPHP();
            $price = new Erems_Models_Purchaseletter_PriceCalculator();
            $unit  = new Erems_Models_Unit_UnitTran();

            $data = $this->getData();

            $purchaseletter->getUnit()->setId($data["unitbaru_unit_id"]);
            $unitDb = $dao->getOne($purchaseletter->getUnit());
            if (count($unitDb) > 0) {

                $purchaseletter->getPriceType()->setId($data["pricetype_pricetype_id"]);
                $purchaseletter->setDate($data["plnew_purchase_date"]);

                $priceData        = new Erems_Models_Sales_PriceAlt();
                $priceAdminData   = new Erems_Models_Sales_PriceAdmin();
                $billingRulesTran = new Erems_Models_Sales_BillingRulesTran();

                /* fill price data */
                $prAr = array();
                foreach ($data as $k => $v) {

                    if (strpos($k, "pricenew") > -1) {
                        $prAr[str_replace("pricenew_", "", $k)] = $v;
                    }
                }
                $priceData->setArrayTable($prAr);

                /* fill price admin */
                $prAr = array();
                foreach ($data as $k => $v) {

                    if (strpos($k, "plnew") > -1) {
                        $prAr[str_replace("plnew_", "", $k)] = $v;
                    }
                }
                $priceAdminData->setArrayTable($prAr);

                /* fill billing rules */
                $prAr = array();
                foreach ($data as $k => $v) {

                    if (strpos($k, "billingrules") > -1) {
                        $prAr[str_replace("billingrules_", "", $k)] = $v;
                    }
                }
                $billingRulesTran->setArrayTable($prAr);

                $purchaseletter->setPrice($priceData);
                $purchaseletter->setPriceAdmin($priceAdminData);
                $purchaseletter->setBilling($billingRulesTran);


                $unit->setArrayTable($unitDb[1][0]);

                $addOnParams = $data["addonparams"];


                $price->setUnit($unit);
                $price->setPurchaseLetter($purchaseletter);

                $price->isEditTanahpermeter          = $addOnParams["isEditTanahpermeter"];
                $price->isEditTotaltanah             = $addOnParams["isEditTotaltanah"];
                $price->isEditKelebihantanahpermeter = $addOnParams["isEditKelebihantanahpermeter"];
                $price->isEditTotalkelebihantanah    = $addOnParams["isEditTotalkelebihantanah"];
                $price->isEditAmountPPNTanah         = $addOnParams["isEditAmountPPNTanah"];
                $price->isEditAmountPPNBangunan      = $addOnParams["isEditAmountPPNBangunan"];
                $price->isEditAmountPPNBM            = $addOnParams["isEditAmountPPNBM"];
                $price->isEditAmountPPH22            = $addOnParams["isEditAmountPPH22"];
                
                $price->process();

                $purchaseletter->getUnit()->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);

                $purchaseletter->setNomor(Erems_Box_Models_App_DocPrefixGenerator::get("PCHLR"));


                $purchaseletter->getBilling()->setId($data["billingrules_billingrules_id"]);
                $purchaseletter->getBankKPR()->setId($data["bank_bank_id"]);
                $purchaseletter->getCollector()->setId($data["collector_employee_id"]);
                $purchaseletter->setRencanaSerahTerima($data["purchaseletter_rencana_serahterima"]);
                $purchaseletter->setRencanaSerahTerimaDate($data["purchaseletter_rencana_serahterima_date"]);
                $purchaseletter->setNotes($data["plnew_notes"]);

                foreach ($data["detail"] as $row) {
                    $sch = new Erems_Models_Purchaseletter_Schedule();
                    $sch->setArrayTable($row);
                    $sch->setScheduleTypeId($this->getScheduleTypeId($row["scheduletype_scheduletype"]));
                    $purchaseletter->addSchedule($sch);
                }

                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($purchaseletter);
                $de->generate();

                $changeKavling->setNewPurchaseletter($purchaseletter);
            }
        }



        return $changeKavling;
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
        } else if ($stName == "PU") {
            return Erems_Box_Config::SCHTYPE_PENGEMBALIANUANG;
        } else if ($stName == "PPNDTP") {
            return Erems_Box_Config::SCHTYPE_PPNDTP;
        }
    }

    public function daoUpdate($dao, $object) {
        $hasilUpdate = 0;
        if (intval($this->docStatus) > 0) {
            $changeKavlingInfo = $dao->getOneCK($object);

            $ng = new Erems_Models_Purchaseletter_NomorGenerator();
            $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
            $unit = new Erems_Models_Unit_UnitTran();
            $unit->getProject()->setId($changeKavlingInfo[1][0]["unitbaru_project_id"]);
            $unit->getPt()->setId($changeKavlingInfo[1][0]["unitbaru_pt_id"]);
            $unit->getCluster()->setId($changeKavlingInfo[1][0]["unitbaru_cluster_id"]);
            $purchaseletter->setDate(date("Y-m-d")); // tanggal purchaseletter baru ambil dari tanggal approve hari ini
            $unit->getCluster()->setCode($changeKavlingInfo[1][0]["clusterbaru_code"]);
            $unit->getProductCategory()->setName($changeKavlingInfo[1][0]["productcategorybaru_productcategory"]);
            $unit->getBlock()->setCode($changeKavlingInfo[1][0]["blockbaru_code"]);




            $hasilNg = $ng->getNomor($purchaseletter, $unit);


            if ($hasilNg["status"]) {

                $isApproveColl = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->isCollectionApprove();


                if ($isApproveColl) {
                    $hasilUpdate = $dao->approveCKColl($object, $this->docStatus, $hasilNg["new_nomor"]);


                    if ($hasilUpdate == 1) { //jika dua2nya sudah approve
                        $ng->updateNomor($hasilNg["counter_obj"], $hasilNg["new_nomor"]);
                    }
                } else {
                    $hasilUpdate = $dao->approveCK($object, $this->docStatus, $hasilNg["new_nomor"]);


                    if ($hasilUpdate > 0) { // update number counter ke database
                        $ng->updateNomor($hasilNg["counter_obj"], $hasilNg["new_nomor"]);
                    }
                }
            } else {
                echo $hasilNg["msg"];
                die();
            }


            /* mark on 2018/01/11
              $numberCounter = new Erems_Models_General_NumberCounter($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), $changeKavlingInfo[1][0]["unitbaru_cluster_id"], $changeKavlingInfo[1][0]["clusterbaru_code"], $changeKavlingInfo[1][0]["plnew_purchase_date"]);
              $numberCounter->process();


              $hasilUpdate = $dao->approveCK($object, $this->docStatus, $numberCounter->getNumber());
              if ($hasilUpdate > 0) { // update number counter ke database
              $numberCounter->save();
              }
             */
        }
        return $hasilUpdate;
        //return $dao->approveCP($object);
    }

    /*
      public function daoSave($dao, $object) {
      return $dao->saveCK($object);
      }
     */

    public function daoSave($dao, $object) {
        $hasilSave = $dao->saveCK($object);


        /*
          if($hasilSave > 0){ // update number counter ke database
          $this->numberCounter->save();
          }

         */

        // $hasilSave = 4092;
        $sendMail = false;
        $others = array(
            "SEND_MAIL" => FALSE,
            "SEND_STATUS" => FALSE,
            "SEND_OTHERS" => NULL // other information of send mail
        );

        if ($hasilSave > 0) { // jika berhasil save data, maka cek param send mail
            $params = new Erems_Models_Sales_Change_ChangeKavlingParams($this->getSession());

            $sendMail = intval($params->getSendMail());

            $message = "";


            if ($sendMail > 0) {
                $others["SEND_MAIL"] = TRUE;
                try {
                    $others["SEND_STATUS"] = TRUE;
                    $mainMessage = "[PURCHASELETTER_INFORMATION]";
                    $object->setId($hasilSave);
                    $approveUserId = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), "CHANGEKAVLING_APPROVEUSER");
                    $approveUserIdTemp = $approveUserId;
                    $approveUserId = is_array($approveUserId) ? $approveUserId[0] : $approveUserId;



                    $cnEmail = $dao->getEmailCK($object, $approveUserId);



                    /// list email user
                    $daoGen = new Erems_Models_Master_GeneralDao();
                    $emails = $daoGen->getUsersInfo(is_array($approveUserIdTemp) ? implode("~", $approveUserIdTemp) : $approveUserIdTemp);
                    $emails = $emails[0];


                    if (count($cnEmail[0]) > 0) {

                        $players = array(
                            'approve' => array(
                                'email' => $cnEmail[0][0]["user_email"],
                                'name' => $cnEmail[0][0]["user_fullname"]
                            )
                        );

                        $others["SEND_OTHERS"] = $players;

                        // $message = '<html><body>';
                        // $message .= '<p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';

                        $messageHead = '<html><body><p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';

                        $message = '<p> <br/>';
                        $message .= '</p>';
                        $message .= '<p>Berikut permohonan transaksi pada CES (Ciputra Enterprise System), <br/>';
                        $message .= 'Mohon bantuan untuk persetujuannya.	<br/>';
                        $message .= '</p>';
                        $message .= '<p>';
                        $message .= '<table>';
                        $message .= '<tr><td>Persetujuan        </td><td>: Rubah Kavling </td></tr>';
                        $message .= '<tr><td>Persetujuan No     </td><td>: ' . $cnEmail[0][0]["nomor_persetujuan"] . '</td></tr>';
                        $message .= '<tr><td>Nomor Unit       </td><td>: ' . $cnEmail[0][0]["nomor_unit"] . '</td></tr>';
                        $message .= '<tr><td>Nomor Unit Baru      </td><td>: ' . $cnEmail[0][0]["nomor_unit_baru"] . '</td></tr>';
                        
                        //edited by Rizal 26022019
                        $message .= '<tr><td>Harga Unit Lama       </td><td>: Rp. ' . number_format($cnEmail[0][0]["harga_total_jual"]) . '</td></tr>';
                        $message .= '<tr><td>Harga Unit Baru       </td><td>: Rp. ' . number_format($cnEmail[0][0]["new_harga_total_jual"]) . '</td></tr>';
                        //endedited
                        
                        $message .= '<tr><td>Nama Customer       </td><td>: ' . $cnEmail[0][0]["nama_customer"] . '</td></tr>';
                        $message .= '<tr><td>Nama Pemohon       </td><td>: ' . $cnEmail[0][0]["nama_pemohon"] . '</td></tr>';
                        $message .= '<tr><td>Nama Sales         </td><td>: ' . $cnEmail[0][0]["nama_salesman"] . '</td></tr>';
                        $message .= '<tr><td>Tanggal permohonan </td><td>: ' . date("d-m-Y H:i:s") . '</td></tr>';
                        $message .= '<tr><td>Proyek </td><td>: ' . $cnEmail[0][0]["nama_proyek"] . '</td></tr>';
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


                        $finalMessage = $messageHead . "" . $message;

                        $mail = new Erems_Box_Library_Email();
                        $mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
                        $mail->getMail()->setBodyHtml(nl2br($finalMessage));
                        // $mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
                        foreach ($emails as $emailRec) {
                            $mail->getMail()->addTo($emailRec["user_email"], $emailRec["user_fullname"]);
                        }

                        $mail->getMail()->addBcc("jerry.peter@ciputra.co.id", "Jerry Peter");
                        $mail->getMail()->setSubject('Request for Change Kavling of Purchaseletter');
                        $mail->getMail()->send();




                        $statusSentMail = TRUE;
                 
                    }
                } catch (Zend_Mail_Exception $e) {
                    $statusSentMail = FALSE;
                    $this->logError($message, $e->getMessage());
                }
            }
        }

        //addon 20180702
        /// collection user
        if ($hasilSave > 0) {
            $this->emailToCollectionUser($message);
        }


        return array("status" => $hasilSave, "others" => $others);
    }

    private function emailToCollectionUser($message) {


        $projectId = $this->session->getProject()->getId();
        $ptId = $this->session->getPt()->getId();

        $isCollectionApprove = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->isCollectionApprove();




        if ($isCollectionApprove) {

            $collApproveUser = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->getCollectionApproveUser();
            $collApproveUser = isset($collApproveUser["CHANGEPRICE_APPROVEUSER"]) ? $collApproveUser["CHANGEKAVLING_APPROVEUSER"] : 0;

            if (is_array($collApproveUser)) {
                $collApproveUser = implode("~", $collApproveUser);
            } else {
                if (intval($collApproveUser) == 0) { /// jika user id tidak valid
                    return FALSE;
                }
            }



            $userDao = new Erems_Models_Master_UserDao();
            $userInfo = $userDao->getUserByMultiId($collApproveUser);

            if (count($userInfo[0]) == 0) { /// jika tidak ada informasi user di database user
                return FALSE;
            }

            $userInfo = $userInfo[0];






            foreach ($userInfo as $user) {

                $receiver = array(
                    "email" => $user["user_email"],
                    "name" => $user["user_fullname"]
                );

                try {

                    $messageHead = '<html><body><p>Dear ' . $receiver["name"] . '</p>';
                    $finalMessage = $messageHead . "" . $message;



                    $mail = new Erems_Box_Library_Email();
                    $mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
                    $mail->getMail()->setBodyHtml(nl2br($finalMessage));

                    $mail->getMail()->addTo($receiver["email"], $receiver["name"]);


                    $mail->getMail()->addBcc("jerry.peter@ciputra.co.id", "Jerry Peter");
                    $mail->getMail()->setSubject('Request for Change Kavling of Purchaseletter ( Collection User Ver. )');
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
                } catch (Zend_Mail_Exception $e) {
                    $statusSentMail = FALSE;
                    $this->logError($message, $e->getMessage());
                }
            }
        }
    }

    private function logError($msg, $erMsg) {
        $file = 'erems_perubahan_log.txt';
        $file = APPLICATION_PATH . '/../public/app/erems/log/' . $file;
        $current = file_get_contents($file);
        $current .= "[" . date("d-m-Y H:i:s") . "][MSG] Email gagal terkirim \r\n";
        $current .= "[" . date("d-m-Y H:i:s") . "][HTML] " . $msg . "\r\n";
        $current .= "[" . date("d-m-Y H:i:s") . "][MAIL] " . $erMsg . "\r\n";
        file_put_contents($file, $current);
    }

    public function afterValidation($changeKavling) {
        return $changeKavling;
    }

}

?>
