<?php

/**
 * Description of ReligionDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_ReligionDao extends Box_Models_App_AbDao {
    public function getAll(Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_religion_read');
   
        return $hasil; 
    }
    
    public function getNotAll(){
        
    }
   
}

?>
