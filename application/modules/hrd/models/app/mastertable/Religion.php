<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Hrd_Models_App_Mastertable_Religion extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_Global_ReligionDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Global_Religion();
    }

    public function getTableClassName() {
        return "religion";
    }

    public function prosesData(Box_Models_App_AbDao $dao, Box_Models_ObjectEmbedData $objectEmbedata,  Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest());
      
        return $hasil;
    }

}
