<?php 

class Hrd_CompetencycategoryController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'competencycategory', array(),array());
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
        return new Hrd_Models_Performancemanagement_CompetencyCategoryDao();
    }

    protected function getMainFieldID() {
        return "competency_category_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_CompetencyCategory();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_CompetencyCategoryValidator();
    }
}

?>