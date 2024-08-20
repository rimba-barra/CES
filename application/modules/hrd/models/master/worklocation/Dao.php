<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_Worklocation_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_Worklocation_MasterWorkLocation $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_worklocation_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getWorklocation(),
                $d->getDescription()); 
        
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Worklocation_MasterWorkLocation $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_worklocation_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getWorklocation(),$r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Master_Worklocation_MasterWorkLocation $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_worklocation_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getWorklocation(),1,99999);
        return $hasil;
    }

    public function getAllWoPLKP(Hrd_Models_Master_Worklocation_MasterWorkLocation $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_worklocation_read',
                $d->getProject(),
                $d->getPt(),
                $d->getWorklocation(),1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Master_Worklocation_MasterWorkLocation $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_worklocation_update', $em->getAddBy(), $em->getId(), 
                $em->getWorklocation(),
                $em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_worklocation_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getAllJustActiveWOPL(Hrd_Models_Master_Worklocation_MasterWorkLocation $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_worklocation_read',
                 $em->getProject()->getId(), 
                 $em->getPt()->getId(), 
                 $em->getWorklocation(), 1, 99999);
        return $hasil;
    }
}
