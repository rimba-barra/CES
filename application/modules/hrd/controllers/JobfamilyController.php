<?php 

class Hrd_JobfamilyController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'jobfamily', array(),array());
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
        return new Hrd_Models_Performancemanagement_JobFamilyDao();
    }

    protected function getMainFieldID() {
        return "jobfamily_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_JobFamily();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_JobFamilyValidator();
    }
}

?>