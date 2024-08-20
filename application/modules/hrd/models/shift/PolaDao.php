<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PolaDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Shift_PolaDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Shift_Pola $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_polashift_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getCode(),$d->getDescription(),$d->getBatasanLembur());
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function update(Hrd_Models_Shift_Pola $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_polashift_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription(),$d->getBatasanLembur());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Shift_Pola $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_polashift_read',$d->getProject()->getId(),
                $d->getPt()->getId(),$r->getPage(), $r->getLimit(),$d->getCode());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Shift_Pola $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_polashift_read',$d->getProject()->getId(),
                $d->getPt()->getId(),1,99999,$d->getCode());
     
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_polashift_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Shift_Pola $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_polashiftcodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
