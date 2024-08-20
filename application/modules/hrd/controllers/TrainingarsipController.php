<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingarsipController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingarsip', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingarsip_Trainingarsip());
        $dm->setDao(new Hrd_Models_Training_Trainingarsip_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingarsip_Validator());
        $dm->setIdProperty("trainingarsip_id");
        return $dm;
    }

    public function getScheduleRead() {
        $em = new Hrd_Models_Training_Trainingarsip_Trainingarsip();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingarsip_Dao();
        
        $allname = $dao->getAllSchedule($em);
        if(Box_Tools::adaRecord($allname)){
            $allname = Box_Tools::toObjectsb("trainingschedule", $allname,FALSE);
        }

        $em1 = new Hrd_Models_Training_Trainingname_Trainingname();
        $em1->setProject($this->getAppSession()->getProject());
        $em1->setPt($this->getAppSession()->getPt());
        $dao1 = new Hrd_Models_Training_Trainingname_Dao();
        
        $alltrainingname = $dao1->getAllWoPL($em1);
        if(Box_Tools::adaRecord($alltrainingname)){
            $alltrainingname = Box_Tools::toObjectsb("trainingname", $alltrainingname,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allname, $alltrainingname));

    }

    public function getVTSRead() {
        $em = new Hrd_Models_Training_Trainingarsip_Trainingarsip();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingarsip_Dao();
        $detail = $dao->getDetailSchedule($em,$this->getAppData());
        
        if(Box_Tools::adaRecord($detail)){
            $detail = Box_Tools::toObjectsb("trainingscheduledetail", $detail,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($detail));

    }

    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
      
        $fileName = "";
        $fileUpload = NULL;

        if ($modeUpload == "dokumen") {
            $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/training/arsip/", "arsip_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_DOKUMEN_" . time(), "pdf");


            $fileUpload->run();
            if (!$fileUpload->isSuccess()) {
                $msg = $fileUpload->getErrorMsg();
            } else {
                $success = TRUE;
                $fileName = $fileUpload->getFileName();
                $msg = $fileName;
            }
        }





        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

}

?>
