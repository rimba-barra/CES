<?php

/**
 * Description of PurposeBuyDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_PurposeBuyDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $reques){
        return array();
    }
    
    public function getAllWOPL(){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_purposebuy_read',1,100);
        return $hasil;
    }
    
    public function getAllWOPLDropdown(){
        $res = $this->dbTable->SPExecute('sp_purposebuy_read_dropdown');
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        return 0;
    }
}
