<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AlokasiBiayaDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_AlokasiBiayaDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_AlokasiBiaya $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_alokasibiaya_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getCode(),$d->getName());
        
        return $hasil;
    }

    public function update(Hrd_Models_Master_AlokasiBiaya $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_alokasibiaya_update', $d->getAddBy(),
                $d->getId(),
                $d->getCode(),$d->getName());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_AlokasiBiaya $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_alokasibiaya_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());
     
        //var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Master_AlokasiBiaya $d) {
        $hasil = 0;
    
        $hasil = $this->dbTable->SPExecute('sp_alokasibiaya_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999);
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_alokasibiaya_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
