<?php

/**
 * Description of AbsentTypeGroup
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_PlafonGolongan extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Pengobatan_Dao();
    }

    public function getTableClass() {
        return new Hrd_Models_Pengobatan_Plafon();
    }

    public function getTableClassName() {
        return "plafonpengobatan";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }  
    
    protected function getMethod($object){
        return $this->getDao()->getAllWOPL($object);
    }
}

?>
