<?php

/**
 * Description of AbsentTypeGroup
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_SanctionType extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_SanctionTypeDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_SanctionType();
    }

    public function getTableClassName() {
        return "sanctiontype";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }   
}

?>
