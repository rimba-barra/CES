<?php

class Gl_AssetController extends Gl_Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Gl_Box_Models_App_Hermes_DataModel();
        $dataList = new Gl_Box_Models_App_DataListCreator('', 'assetdata', array(),array()); // assetdata di setting dari entity dan creator, entyty ini yang terhubung pada tabel di sql server
        $dao = $this->getMainDao();
        $obj = $this->getMainObject();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$obj);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function detailRead() {
    }
    
    
    protected function getMainDao() {
        return new Gl_Models_Asset_AssetDao();

    }

    protected function getMainFieldID() {
        return "asset_id"; // untuk menangkap ID di program terhadap entytynya

    }

    protected function getMainObject() {
        return new Gl_Models_Asset_Asset();
    }

    protected function getMainValidator() {
        return new Gl_Models_Asset_AssetValidator(); 

    }
    
    
}
