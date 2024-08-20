<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_DepartmentErems extends Erems_Box_Models_App_Masterdata_Masterdata {
    
    private $requestRead;
    private $appSession;
    
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Department();
    }

    public function getTableClassName() {
        return "department";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
       // $hasil = $dao->getAllPurpose($app->getData(),$objectEmbedata);
      
        return $hasil;
    }
    
    protected function getMethod($object){
        // return $this->getDao()->getAllDepartment($this->requestRead, $this->appSession);
        return $this->getDao()->getAllEremsDepartment();
    }
    
    public function setRequestRead(Erems_Box_Models_App_HasilRequestRead $r){
        $this->requestRead = $r;
    }

    public function setAppSession($session){
        $this->appSession = $session;
    }
}