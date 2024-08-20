<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_PaymentMethod extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_AppDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_PaymentMethod();
    }

    public function getTableClassName() {
        return "paymentmethod";
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllPaymentMethod($objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object) {
        return $this->getDao()->getAllPaymentMethod($object);
    }


    
    
    

}
