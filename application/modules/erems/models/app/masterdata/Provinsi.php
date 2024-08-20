<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Provinsi extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_ProvinsiDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Provinsi();
    }

    public function getTableClassName() {
        return "provinsi";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllNoLimit();      
        return $hasil;
    }
    
    protected function getMethod($object) {
        return $this->getDao()->getAllNoLimit();
    }


    

}
