<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_ExpenseType extends Erems_Box_Models_App_Masterdata_Masterdata {
    
    private $requestRead;
    
    
    
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_ExpenseType();
    }

    public function getTableClassName() {
        return "expensetype";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
       // $hasil = $dao->getAllPurpose($app->getData(),$objectEmbedata);
      
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllExpenseType($this->requestRead);
    }
    
    public function setRequestRead(Erems_Box_Models_App_HasilRequestRead $r){
        $this->requestRead = $r;
    }

    

}
