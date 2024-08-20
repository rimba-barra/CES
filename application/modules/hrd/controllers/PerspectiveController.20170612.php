<?php 

class Hrd_PerspectiveController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'perspective', array(),array());
        $dao        = $this->getMainDao();
        $obj        = $this->getMainObject();
        
        $obj->setArrayTable($this->getAppData());
        
        $hasil      = $dao->getAll($this->getAppRequest(),$obj);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function detailRead() {
    
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Bsc_PerspectiveDao();
    }

    protected function getMainFieldID() {
        return "perspective_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Bsc_Perspective();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Bsc_PerspectiveValidator();
    }
}

?>