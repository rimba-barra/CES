<?php

/**
 * Description of BadanusahaDao
 *
 * @author MIS
 */
class Erems_Models_Master_ProvinsiDao extends Erems_Box_Models_App_AbDao {    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_provinsi_read');   
        return $hasil; 
    }
     public function getAllWOR(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_provinsi_read');   
        return $hasil; 
    }
    
    public function getAllNoLimit(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_provinsi_read',1,9999);   
        return $hasil; 
    }
    
    
}

?>
