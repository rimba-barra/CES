<?php

/**
 * Description of AbsentTypeGroup
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Absenttypegroup extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_AbsentTypeGroupDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_AbsentTypeGroup();
    }

    public function getTableClassName() {
        return "absenttypegroup";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest());
        return $hasil;
    }   
}

?>
