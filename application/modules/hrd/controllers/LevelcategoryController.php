<?php 
/*  ZEND CONTROLLER FOR 'Competency Level' */

class Hrd_LevelcategoryController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    function readspecialAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = 1;
        $post_data['limit'] = 9999;
        
        
        $model_levelcategory = $this->getMainDao();
        $result = $model_levelcategory->getWopl($this->getMainObject());  

        echo Zend_Json::encode($result[1]);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'levelcategory', array(),array());
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
        return new Hrd_Models_Performancemanagement_LevelCategoryDao();
    }

    protected function getMainFieldID() {
        return "level_category_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_LevelCategory();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_LevelCategoryValidator();
    }
}

?>