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
class Hrd_Models_Parameters_Losttime_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Parameters_Losttime_LostTime $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_losttimeparam_create',$d->getAddBy(),$d->getPt()->getId(),$d->getProject()->getId(),$d->getAbsentType()->getId(),$d->getDescription());      
   
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Parameters_Losttime_LostTime $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_losttimeparam_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }
    
    public function getAllB($projectId, $ptId){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_losttimeparam_read',1,999,$projectId,$ptId);
        return $hasil;
    }

    public function update(Hrd_Models_Parameters_Losttime_LostTime $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_losttimeparam_update', $em->getAddBy(), $em->getId(), 
                $em->getAbsentType()->getId(),$em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_losttimeparam_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
