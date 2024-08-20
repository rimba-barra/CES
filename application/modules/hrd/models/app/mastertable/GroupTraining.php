<?php
/**
 * Description of GroupTraining
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_GroupTraining extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Training_GroupDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Training_Group();
    }

    public function getTableClassName() {
        return "grouptraining";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }
    
    protected function getMethod($object){
        
        return $this->getDao()->getAllWoP($object);
    }
}

?>
