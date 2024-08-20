<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Hrd_Models_App_Mastertable_Bloodgroup extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_Global_BloodGroupDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Global_BloodGroup();
    }

    public function getTableClassName() {
        return "bloodgroup";
    }

    public function prosesData(Box_Models_App_AbDao $dao, Box_Models_ObjectEmbedData $objectEmbedata,  Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll();
      
        return $hasil;
    }

}
