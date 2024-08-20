<?php

/**
 * Description of ReligionDao
 *
 * @author MIS
 */
class Hrd_Models_Organization_Dao extends Box_Models_App_AbDao {
    public function getAllByEmployee(Hrd_Models_Master_Employee $em){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_organization_read',$em->getId());
        return $hasil; 
    }
}

?>
