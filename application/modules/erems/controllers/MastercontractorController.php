<?php

class Erems_MastercontractorController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
 
    public function _getMainDataModel() {
         $dao = new Erems_Models_Master_ContractorDao();
       //  $dao->setSession($this->getAppSession());
         $dao->setSes($this->getAppSession());
         $v = new Erems_Models_Master_ContractorValidator();
         $v->setSes($this->getAppSession());
         
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'contractorprofile', array('city','country'), array()));
        $dm->setObject(new Erems_Models_Master_ContractorProfile());
        $dm->setDao($dao);
        $dm->setValidator($v);
        $dm->setIdProperty("contractor_id");
        return $dm;
        
    }
    
    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();        
        
        $masterCity = new Erems_Models_App_Masterdata_City();
        $allCty = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mco = new Erems_Models_App_Masterdata_Country();
        $aco = $mco->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allCty,$aco));

        return $dm;
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_MastercontractorController($request,$response);
    } 
}

?>