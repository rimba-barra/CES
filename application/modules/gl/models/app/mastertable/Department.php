<?php

/**
 * Description of Department
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Department extends Box_Models_App_Masterdata_Masterdata{
    private $request;
    public function setRequest($r){
        $this->request = $r;
    }
    public function getDao() {
        return new Hrd_Models_Master_DepartmentDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Department();
    }

    public function getTableClassName() {
        return "department";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }    //put your code here
    
    protected function getMethod($object){
        return $this->getDao()->getAllWOPL($object);
    }
}

?>
