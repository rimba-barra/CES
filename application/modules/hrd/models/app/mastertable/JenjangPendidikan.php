<?php

/**
 * Description of Jabatan
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_JenjangPendidikan extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_General_Dao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_General_JenjangPendidikan();
    }

    public function getTableClassName() {
        return "jenjangpendidikan";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        
        
        $hasil = array();
     
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllJenjangPendidikan($object->getProject()->getId(),
                $object->getPt()->getId());
    }   //put your code here
}

?>
