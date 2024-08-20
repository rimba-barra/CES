<?php

/**
 * Description of ChangeMoveReason
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_ChangeMoveReason extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Sales_Reason_Dao();
    }

    public function getTableClass() {
        return new Erems_Models_Sales_Reason_MoveReason();
    }

    public function getTableClassName() {
        return "changekavlingreason";
    }

    public function prosesData(Erems_Box_Models_App_AbDao $dao, Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllCKReason($objectEmbedata);
        return $hasil;
    }    
}

?>
