<?php

/**
 * Description of Dao
 *
 * @author MIS
 */
class Erems_Models_Attribute_Dao extends Erems_Box_Models_App_AbDao {
    public function getAll(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_attributeb_read');
        return $hasil; 
    }
    public function getAllValue(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_attributevalueb_read');
        return $hasil;
    }
}

?>
