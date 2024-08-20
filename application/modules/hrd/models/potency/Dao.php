<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Potency_Dao extends Box_Models_App_AbDao {
    public function getAllByEmployee(Hrd_Models_Master_Employee $em){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_potency_read',$em->getId());
        
        return $hasil;
    }
}

?>
