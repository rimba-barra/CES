<?php


/**
 * Description of Cluster
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_UnitStatus extends Erems_Box_Models_App_Masterdata_Masterdata {

    
    public function getDao() {
        return new Erems_Models_Unit_UnitDao();
    }

    public function getTableClass() {
        return new Erems_Models_Unit_Status();
    }

    public function getTableClassName() {
        return "unitstatus_";
        
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = array();
        return $hasil;
    }
    
    
    protected function getMethod($object){
        return $this->getDao()->getAllUnitStatus($object);
    }

   
}

?>
