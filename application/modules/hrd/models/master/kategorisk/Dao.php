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
class Hrd_Models_Master_Kategorisk_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_Kategorisk_MasterKategoriSK $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_masterkategorisk_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName()); 
        
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Kategorisk_MasterKategoriSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_masterkategorisk_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName(),$r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Master_Kategorisk_MasterKategoriSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_masterkategorisk_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName(),1,99999);
        return $hasil;
    }

    public function getAllWoPLKP(Hrd_Models_Master_Kategorisk_MasterKategoriSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_masterkategorisk_read',
                $d->getProject(),
                $d->getPt(),
                $d->getName(),1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Master_Kategorisk_MasterKategoriSK $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_masterkategorisk_update', $em->getAddBy(), $em->getId(), 
                $em->getName());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_masterkategorisk_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getAllJustActiveWOPL(Hrd_Models_Master_Kategorisk_MasterKategoriSK $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_masterkategorisk_read',
                 $em->getProject()->getId(), 
                 $em->getPt()->getId(), 
                 $em->getName(), 1, 99999);
        return $hasil;
    }
}
