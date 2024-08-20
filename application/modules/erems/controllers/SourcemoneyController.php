<?php

class Erems_SourcemoneyController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Master_SourceMoneyDao();
        $dao->setRequest($this->getAppData());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'sourcemoney', array(), array()));
        $dm->setObject(new Erems_Models_Master_SourceMoney());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Master_SourceMoneyValidator());
        $dm->setIdProperty("sourcemoney_id");
        return $dm;
        
    } 
    
    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        
       

        $masterPL = new Erems_Models_App_Masterdata_Cluster();
        $allPL = $masterPL->prosesDataWithSession($this->getAppSession(), TRUE);





        $dm->setHasil(array($allPL));


        return $dm;
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_SourcemoneyController($request,$response);
    }
}

?>
