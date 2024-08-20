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
class Hrd_Models_Payroll_Join_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Join_Join $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_joinkomponen_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMaster()->getId(),$d->getKomp1()->getId(),
                $d->getKomp2()->getId(),$d->getKomp3()->getId(),$d->getKomp4()->getId(),
                $d->getKomp5()->getId(),$d->getTglStart(),$d->getTglEnd(),$d->getIsBulanSama(),$d->getIsBulanBelum());
        
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Join_Join $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_joinkomponen_update', $d->getAddBy(),
                $d->getId(),$d->getMaster()->getId(),$d->getKomp1()->getId(),
                $d->getKomp2()->getId(),$d->getKomp3()->getId(),$d->getKomp4()->getId(),
                $d->getKomp5()->getId(),$d->getTglStart(),$d->getTglEnd(),$d->getIsBulanSama(),$d->getIsBulanBelum());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Join_Join $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_joinkomponen_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Payroll_Join_Join $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_joinkomponen_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId());
     
 
        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_joinkomponen_destroy',$id,$userId);

        return $row;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_joinkomponen_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Join_Join $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_bankcodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
