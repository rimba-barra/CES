<?php

/**
 * Description of Group
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Group extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_GroupDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Group();
    }

    public function getTableClassName() {
        return "group";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        
        
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
     
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllWoF($object);
    }
}

?>
