<?php

/**
 * Description of Shifttype
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Shifttype extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_ShiftTypeDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_ShiftType();
    }

    public function getTableClassName() {
        return "shifttype";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }    //put your code here
}

?>
