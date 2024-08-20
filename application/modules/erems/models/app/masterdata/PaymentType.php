<?php

/**
 * Description of PaymentType
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_PaymentType extends Erems_Box_Models_App_Masterdata_Masterdata{
    public function getDao() {
        return new Erems_Models_Master_AppDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_PaymentType();
    }

    public function getTableClassName() {
        return "paymenttype";
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllPaymentType();
        return $hasil;
    }
    
    protected function getMethod($object) {
        return $this->getDao()->getAllPaymentType();
    }

           /* public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllPaymentType();
        return $hasil;
    } */   
}

?>
