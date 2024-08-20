<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Bentukusaha extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_BentukusahaDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Bentukusaha();
    }

    public function getTableClassName() {
        return "bentukusaha";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllWOR();      
        return $hasil;
    }
    
    protected function getMethod($object) {
        return $this->getDao()->getAllWOR();
    }


    

}
