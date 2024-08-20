<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KaryawanDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Mod_KaryawanDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Mod_Karyawan $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_karyawanmod_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId());
        
        return $hasil;
    }

    public function update(Hrd_Models_Mod_Karyawan $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_karyawanmod_update', $d->getAddBy(),
                $d->getId(),$d->getEmployee()->getId());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Mod_Karyawan $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_karyawanmod_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Mod_Karyawan $d) {
        $hasil = 0;
    
        $hasil = $this->dbTable->SPExecute('sp_karyawanmod_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999);
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_karyawanmod_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
