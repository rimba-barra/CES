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
class Hrd_Models_Payroll_Bank_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Bank_Bank $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_bank_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getCode(),$d->getDescription());
        
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Bank_Bank $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_bank_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Bank_Bank $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_bank_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Payroll_Bank_Bank $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_bank_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_bank_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Bank_Bank $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_bankcodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
