<?php


/**
 * Description of ProductCategory
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_ProductCategory extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_ProductCategoryDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_ProductCategory();
    }

    public function getTableClassName() {
        return "productcategory";
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        return $dao->getAll();
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAll();
    }
    

    
    
      
}

?>
