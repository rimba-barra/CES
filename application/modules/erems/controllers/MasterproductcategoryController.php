<?php

class Erems_MasterproductcategoryController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
    
    protected function testingFlag() {
        return FALSE;
    } 
    
    public function _getMainDataModel() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'productcategory', array(), array()));
        $dm->setObject(new Erems_Models_Master_ProductCategory());
        $dm->setDao(new Erems_Models_Master_ProductCategoryDao());
        $dm->setValidator(new Erems_Models_Master_ProductCategoryValidator());
        $dm->setIdProperty("productcategory_id");
        return $dm;
        
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_MasterproductcategoryController($request,$response);
    } 
}

?>
