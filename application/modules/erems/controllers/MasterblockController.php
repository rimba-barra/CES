<?php

class Erems_MasterblockController extends Erems_Box_Models_App_Hermes_AbstractController implements Erems_Box_Summoner{

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'blocktran', array('clusterb','user',array('user','usermodi_')), array('deletedRows','detail'));
        $dao = new Erems_Models_Master_BlockDao();

        $pf = new Erems_Models_Master_BlockTran();
        $pf->setProject($this->getAppSession()->getProject());
        $pf->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWithPage($pf,$this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function searchassetsRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //



        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);



        $dm->setHasil(array($ac));


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

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Master_BlockTran();
        $dm->setDao(new Erems_Models_Master_BlockDao());
        $dm->setValidator(new Erems_Models_Master_BlockValidator());
        $dm->setObject($obj);

        return $dm;
    }
    
    
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_BlockTran());
        $dm->setDao(new Erems_Models_Master_BlockDao());
        $dm->setIdProperty("block_id");
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_MasterblockController($request,$response);
    }

}

?>
