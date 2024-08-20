<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingoutstandingController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingoutstanding', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding());
        $dm->setDao(new Hrd_Models_Training_Trainingoutstanding_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingoutstanding_Validator());
        $dm->setIdProperty("trainingoutstanding_id");
        return $dm;
    }

    public function getTransactionRead(){
    	$em = new Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingoutstanding_Dao();
        // print_r($this->getAppData());die();
        $hasil = $dao->getalltrans($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingoutstandingtransaction', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getTransactionFilterRead(){
        $em = new Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingoutstanding_Dao();
        // print_r($this->getAppData());die();
        $hasil = $dao->getalltrans_filterperiode($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingoutstandingtransaction', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getTransactionFilterTotalRead(){
        $em = new Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingoutstanding_Dao();
        // print_r($this->getAppData());die();
        $hasil = $dao->getalltrans_filterperiode_total($em, $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }
}

?>
