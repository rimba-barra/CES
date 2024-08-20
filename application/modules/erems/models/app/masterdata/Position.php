<?php


/**
 * Description of Cluster
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_Position extends Erems_Box_Models_App_Masterdata_Masterdata {

    
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Position();
    }

    public function getTableClassName() {
        return "position";
        
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = array();
        return $hasil;
    }
    
    
    protected function getMethod($object){
        return $this->getDao()->getAllPosition($object);
    }

   
}

?>
