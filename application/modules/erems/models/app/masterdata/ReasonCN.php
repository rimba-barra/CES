<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_ReasonCN extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Sales_Reason_Dao();
    }

    public function getTableClass() {
        return new Erems_Models_Sales_Reason_GantiNama();
    }

    public function getTableClassName() {
        return "changenamereason";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
     //   $hasil = $dao->getAllPurpose($app->getData(),$objectEmbedata);
      
        return array();
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllCNReason($object);
    }

    

}
