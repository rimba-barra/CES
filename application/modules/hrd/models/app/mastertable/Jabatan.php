<?php

/**
 * Description of Jabatan
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Jabatan extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Jabatan();
    }

    public function getTableClassName() {
        return "jabatan";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        return $dao->getAllJabatan();
    }    //put your code here
}

?>
