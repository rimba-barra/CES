<?php

/**
 * Description of BadanusahaDao
 *
 * @author MIS
 */
class Erems_Models_Master_InstrumentpembayaranDao extends Erems_Box_Models_App_AbDao {    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_instrumentpembayaran_read');   
        return $hasil; 
    }
    public function getAllWOR(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_instrumentpembayaran_read');   
        return $hasil; 
    }
    
    
}

?>
