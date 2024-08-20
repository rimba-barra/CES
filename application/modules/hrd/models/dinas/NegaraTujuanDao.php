<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NegaraTujuanDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_NegaraTujuanDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Dinas_NegaraTujuan $d) {
        $hasil = 0;
        

        
       
        $hasil = $this->dbTable->SPUpdate('sp_negaratujuan_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getCode(),$d->getName(),$d->getIsLuarNegeri());
        
        return $hasil;
    }

    public function update(Hrd_Models_Dinas_NegaraTujuan $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_negaratujuan_update', $d->getAddBy(),
                $d->getId(),
                $d->getCode(),$d->getName(),$d->getIsLuarNegeri());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Dinas_NegaraTujuan $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_negaratujuan_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getName());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Dinas_NegaraTujuan $d) {
        $hasil = 0;
    
        $hasil = $this->dbTable->SPExecute('sp_negaratujuan_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getName());
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_negaratujuan_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
