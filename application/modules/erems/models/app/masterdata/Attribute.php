<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Attribute extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Attribute_Dao();
    }

    public function getTableClass() {
        return new Erems_Models_Attribute_Attribute();
    }

    public function getTableClassName() {
        return "attribute";
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
       $hasil = $dao->getAll($objectEmbedata);
      
        return $hasil; 
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAll();
    }

     

    

}
