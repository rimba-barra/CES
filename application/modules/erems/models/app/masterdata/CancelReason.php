<?php

/**
 * Description of CancelReason
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_CancelReason extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Sales_Reason_Dao();
    }

    public function getTableClass() {
        return new Erems_Models_Sales_Reason_CancelReason();
    }

    public function getTableClassName() {
        return "cancelreason";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getALLCReason($objectEmbedata);
        return $hasil;
    }    
}

?>
