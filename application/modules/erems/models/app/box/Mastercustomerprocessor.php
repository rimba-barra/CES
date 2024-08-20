<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_MastercustomerProcessor extends Erems_Models_App_Box_Processor {

    private $currentFlag;
    private $decan;


    public function __construct($testingFlag = NULL, $paymentFlag = 0) {
        parent::__construct($testingFlag);
        $this->currentFlag = $paymentFlag;
    }

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }  
    
    public function daoUpdate($dao, $object) {

        $sess =  array(
                        "projectId"=>$this->getSession()->getProject()->getId(),
                        "ptId" => $this->getSession()->getPt()->getId()
                        );


        //apakah revision baru?

        $customer_tmp_id = $dao->getNewRevisionId($object->getId());
        if($customer_tmp_id==0){
            $isNewRevision = true;
        }else{
            $isNewRevision = false;
        }

        //apakah module revision customer diaktifkan?
        $isRevisionActive = $dao->isCustomerRevisionActive($sess);
        if($isRevisionActive==1){

            if($isNewRevision){
                //create new revision
                $this->sendEmail($object);
                return $dao->saveTmp($object, $sess);
            }else{
                //create update revision
                $this->sendEmail($object);
                return $dao->updateTmp($object);
            }
            //return $dao->saveTmp($object, $sess);
            //return $dao->update($object);
        }else{
            //langsung update master
            return $dao->update($object);
        }
    }

    private function sendEmail($object) {

        $hasil = false;
        $msg = NULL;
        $cs = $object;

        $proposed_by = $cs->getUserlogin()->getCurrentuser();

        $statusSentMail = FALSE;

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getSession()->getProject()->getId(),$this->getSession()->getPt()->getId());
        
        // set di genco
        // application\modules\erems\box\projectptconfig
        $receiverNotifikasi = $genco->getSPEmailNotifikasiCustomerAproval();

        /// email ke yang approve
        try {

            $kontenHTML = "<html><body>";
            $kontenHTML .= "<u><b>NOTIFIKASI PERUBAHAN INFORMASI CUSTOMER</b></u>";
            $kontenHTML .= "<p>".$proposed_by['user_fullname']." (".$proposed_by['user_email'].") melakukan pengajuan perubahan customer, berikut detailnya : </p>";
            $kontenHTML .= "<p>Nama Customer : " . $cs->getName() . "</p>";
            $kontenHTML .= "<p>Kode Customer : ".$cs->getCode()."</p>";
            $kontenHTML .= "<p>No. HP Customer : " . $cs->getMobilePhone() . "</p>";
            $kontenHTML .= "<p>Harap Bapak/Ibu melakukan approval atau reject terhadap pengajuan ini.</p>";
            $kontenHTML .= "</body></html>";
            
            $mail = new Erems_Box_Library_Email();
            $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
            $mail->getMail()->setBodyHtml($kontenHTML);

            foreach ($receiverNotifikasi as $r) {
                $mail->getMail()->addTo($r[0], $r[1]);
            }
            
            $mail->getMail()->setSubject('[CES EREMS] Notifikasi email Perubahan Customer');
            $mail->getMail()->send();

            $statusSentMail = TRUE;
            $msg = "Sukses kirim email";
            $hasil = true;
        } catch (Zend_Mail_Exception $e) {
            $statusSentMail = FALSE;
            $msg = "Email gagal terkirim.";
        }

        $arrayRespon = array("hasil" => $hasil, "msg" => $msg, "status_sendmail" => $statusSentMail);
        return $arrayRespon;
    }



}

?>
