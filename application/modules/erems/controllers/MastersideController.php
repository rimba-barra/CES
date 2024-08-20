<?php

class Erems_MastersideController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
 
    public function _getMainDataModel() {
         $dao = new Erems_Models_Master_SideDao();
        $dao->setSession($this->getAppSession());
  
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'side', array(), array()));
        $dm->setObject(new Erems_Models_Master_Side());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Master_SideValidator());
        $dm->setIdProperty("side_id");
        return $dm;
        
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_MastersideController($request,$response);
    } 
}

?>
