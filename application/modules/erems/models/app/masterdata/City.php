<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_City extends Erems_Box_Models_App_Masterdata_Masterdata {

    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_City();
    }

    public function getTableClassName() {
        return "city";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllCity($objectEmbedata);

        return $hasil;
    }
    
     protected function getMethod($object){
        return $this->getDao()->getAllCityWOR();
    }

    
}
