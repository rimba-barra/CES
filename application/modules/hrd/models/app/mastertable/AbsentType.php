<?php

/**
 * Description of AbsentTypeGroup
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_AbsentType extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_AbsentTypeDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_AbsentType();
    }

    public function getTableClassName() {
        return "absenttype";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllSimple();
    }

    // added by Michael 2021.05.19
    protected function getMethod_CustomProjectPt($object, $data){
        return $this->getDao()->getAllSimple_CustomProjectPt($data);
    }
    // end added by Michael 2021.05.19
}

?>
