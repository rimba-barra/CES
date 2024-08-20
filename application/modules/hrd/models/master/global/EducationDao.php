<?php

/**
 * Description of ReligionDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_EducationDao extends Box_Models_App_AbDao {
    public function getAll(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_education_read');
   
        return $hasil; 
    }
}

?>
