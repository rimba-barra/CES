<?php

class Erems_MasterpurposeController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Master_PurposeDao();
        $dao->setSession($this->getAppSession());
        $validator = new Erems_Models_Master_PurposeValidator();
        $validator->session = $this->getAppSession();
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'purpose', array(), array()));
        $dm->setObject(new Erems_Models_Master_Purpose());
        $dm->setDao($dao);
        $dm->setValidator($validator);
        $dm->setIdProperty("purpose_id");
        return $dm;
        
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_MasterpurposeController($request,$response);
    }

    //edited by Rizal 1 Maret 2019
    public function inlineEditRead() {
        $params = $this->getAppData();
        $dao = new Erems_Models_Master_PurposeDao();
        $result = $dao->InlineUpdate($params, $this->getAppSession()->getUser()->getId());
        echo Zend_Json::encode($result);
        die();
    }
}

?>
