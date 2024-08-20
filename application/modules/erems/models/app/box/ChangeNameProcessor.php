<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_ChangeNameProcessor extends Erems_Models_App_Box_Processor {

    private $purchasLetter;
    private $docStatus;

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

    public function afterFillData($changeName) {
        $data = $this->getData();
        $newCs = new Erems_Models_Master_CustomerProfile();
        /* fill new customer data */
        $csAr = array();

        foreach ($data as $k => $v) {

            if (strpos($k, "customernew") > -1) {
                $csAr[str_replace("customernew_", "", $k)] = $v;
            }
        }

        $newCs->setArrayTable($csAr);
        if ($changeName instanceof Erems_Models_Sales_Change_ChangeName) {
            $changeName->setCustomerNew($newCs);
        }
        return $changeName;
    }

    public function daoUpdate($dao, $object) {

        $hasilApprove = 0;

        $isApproveColl = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->isCollectionApprove();


        // addon 20180710
        // SH1 Feature, penambahan suffix P00N di nomor purchaseletter
        $newNomorPl = "";
        $enableSuffixPlNo = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->usePurchaseletterNumberTail();
        if ($enableSuffixPlNo) {

            $changeNameInfo = $dao->getOneCN($object);
            $changeName = Erems_Box_Tools::toObjectRow($changeNameInfo, new Erems_Models_Sales_Change_ChangeName(), array(new Erems_Models_Purchaseletter_PurchaseLetter()));


            $nomorPl = $changeName->getPurchaseletter()->getNomor();

            $newNomorPl = Erems_Models_Sales_Change_Tools::getSuffixPurchaseNumber($changeName->getPurchaseletter()->getId(), $nomorPl, $dao);
        }

        //end SH1 Feature, penambahan suffix P00N di nomor purchaseletter

        if ($isApproveColl) {
            if (intval($this->docStatus) > 0) {

                $hasilApprove = $dao->approveCNColl($object, $this->docStatus, $newNomorPl);
            }
        } else {
            if (intval($this->docStatus) > 0) {

                $hasilApprove = $dao->approveCN($object, $this->docStatus, $newNomorPl);
            }
        }


        /// kirim email ke GM Finance 
        $generalDao = new Erems_Models_Master_GeneralDao();

        $dataEmailGMFinance = $generalDao->getGlobalParameterSolo($this->session->getProject()->getId(), $this->session->getPt()->getId(), "SP_EMAIL_GM_LIST");

        if (count($dataEmailGMFinance[0]) > 0) {
            $dataEmailGMFinance = $dataEmailGMFinance[0][0]["value"];
            if (strlen($dataEmailGMFinance) > 3) {


                $changeNameInfo = $dao->getEmailCN($object,0);
               
                $changeNameInfo = $changeNameInfo[0][0];
             
               //  var_dump($changeNameInfo);
              //  die();


                $dataEmailGMFinance = explode(",", $dataEmailGMFinance);

                Erems_Models_Sales_Change_Tools::emailGMFinanceApproved($dataEmailGMFinance, "Rubah Nama", array(
                    "nomor_persetujuan" => $changeNameInfo["nomor_persetujuan"],
                    "nomor_unit" => $changeNameInfo["nomor_unit"],
                    "nama_customer" => $changeNameInfo["nama_customer"],
                    "nama_customer_baru" => $changeNameInfo["nama_customer_baru"],
                    "nama_pemohon" => $changeNameInfo["nama_pemohon"],
                    "nama_salesman" => $changeNameInfo["nama_salesman"]
                ));
            }
        }
        
         ///end kirim email ke GM Finance 
     



        $others = NULL;


        return array("status" => $hasilApprove, "others" => $others);
    }

    public function daoSave($dao, $object) {
        $hasilSave = $dao->saveCN($object);

        //  $hasilSave = 1;

        $sendMail = false;
        $others = array(
            "SEND_MAIL" => FALSE,
            "SEND_STATUS" => FALSE,
            "SEND_OTHERS" => NULL // other information of send mail
        );

        if ($hasilSave > 0) { // jika berhasil save data, maka cek param send mail
            $params = new Erems_Models_Sales_Change_ChangeNameParams($this->getSession());

            $sendMail = intval($params->getSendMail());


            $message = "";

            $cnEmail = NULL;

            if ($sendMail > 0) {
                $others["SEND_MAIL"] = TRUE;
                try {
                    $others["SEND_STATUS"] = TRUE;

                    $object->setId($hasilSave);
                    $approveUserId = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), "CHANGENAME_APPROVEUSER");

                    $approveUserId = is_array($approveUserId) ? intval($approveUserId[0]) : $approveUserId;

                    $cnEmail = $dao->getEmailCN($object, $approveUserId);


                    $players = array(
                        'approve' => array(
                            'email' => $cnEmail[0][0]["user_email"],
                            'name' => $cnEmail[0][0]["user_fullname"]
                        )
                    );

                    $others["SEND_OTHERS"] = $players;

                    $messageHead = '<html><body><p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';


                    // $message = '<html><body>';
                    //$message .= '<p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';
                    $message = '<p> <br/>';
                    $message .= '</p>';
                    $message .= '<p>Berikut permohonan transaksi pada CES (Ciputra Enterprise System), <br/>';
                    $message .= 'Mohon bantuan untuk persetujuannya.	<br/>';
                    $message .= '</p>';
                    $message .= '<p>';
                    $message .= '<table>';
                    $message .= '<tr><td>Persetujuan        </td><td>: Rubah Nama </td></tr>';
                    $message .= '<tr><td>Persetujuan No     </td><td>: ' . $cnEmail[0][0]["nomor_persetujuan"] . '</td></tr>';
                    $message .= '<tr><td>Nomor Unit       </td><td>: ' . $cnEmail[0][0]["nomor_unit"] . '</td></tr>';
                    $message .= '<tr><td>Nama Customer       </td><td>: ' . $cnEmail[0][0]["nama_customer"] . '</td></tr>';
                    $message .= '<tr><td>Nama Customer Baru       </td><td>: ' . $cnEmail[0][0]["nama_customer_baru"] . '</td></tr>';
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
                    $mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
      
                    $mail->getMail()->setSubject('Request for Change Name of Purchaseletter');
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
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
            $collApproveUser = isset($collApproveUser["CHANGENAME_APPROVEUSER"]) ? $collApproveUser["CHANGENAME_APPROVEUSER"] : 0;

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
                
                    $mail->getMail()->setSubject('Request for Change Name of Purchaseletter ( Collection User Ver.)');
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

    public function afterValidation($changeName) {
        return $changeName;
    }

}

?>
