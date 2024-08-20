<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NomorSuratDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_NomorSuratDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Dinas_NomorSurat $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_nomorsuratdinas_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getInfiks(),
                $d->getTahun(),$d->getBulan(),$d->getNomor()
                );
        
        return $hasil;
    }

    public function update(Hrd_Models_Dinas_NomorSurat $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_nomorsuratdinas_update', $d->getAddBy(),
                $d->getId(),
                $d->getInfiks(),
                $d->getTahun(),
                $d->getBulan(),
                $d->getNomor());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Dinas_NomorSurat $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_nomorsuratdinas_read',$d->getProject()->getId(),
                $d->getPt()->getId(),$r->getPage(), $r->getLimit());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Dinas_NomorSurat $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_nomorsuratdinas_read',$d->getProject()->getId(),
                $d->getPt()->getId(),1,9999);
     
       // var_dump($this->dbTable);
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_nomorsuratdinas_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    
    public function codeExist(Hrd_Models_Dinas_NomorSurat $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPExecute('sp_nomorsuratcodeexist_read',
                $d->getTahun(),$d->getBulan(),
                $d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
    
}
