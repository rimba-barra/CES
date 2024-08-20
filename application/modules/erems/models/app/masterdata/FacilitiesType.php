<?php


/**
 * Description of ProductCategory
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_FacilitiesType extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_FacilitiesTypeDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_FacilitiesType();
    }

    public function getTableClassName() {
        return "facilitiestype";
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        
    }
    
    protected function getMethod($object) {
        return $this->getDao()->getAllForMaster($object);
    }

        
    /*
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        return $dao->getAll();
    }
     
     */
    
    

    
    
      
}

?>
