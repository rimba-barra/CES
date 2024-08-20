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
class Hrd_Models_Payroll_Proses_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Proses_Gaji $d,$decan) {
        $hasil = 0;
        
        $dcResult = Box_Tools::getCleanDCResult($decan,"prosesgaji");
      
       
        $hasil = $this->dbTable->SPUpdate('sp_prosesgaji_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMonth(),$d->getYear(),$d->getMonthYear(),
                $dcResult["prosesgaji_id"],
                $dcResult["group"],
                $dcResult["komponengaji_komponengaji_id"],
                $dcResult["employee_employee_id"],
                $dcResult["value"]);
      
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Proses_Gaji $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_prosesgaji_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription(),
                $d->getPphBaris(),$d->getPlusMinus(),$d->getKpph(),$d->getTunjanganPotongan());

        return $hasil;
    }
    
    public function getParams(Hrd_Models_Payroll_Proses_Gaji $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_prosesgaji_read',$d->getProject()->getId(),$d->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Proses_Gaji $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
    
        $hasil = $this->dbTable->SPExecute('sp_prosesgaji_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMonth(),$d->getYear(),$d->getGroup(),$d->getKomponen()->getId());
     
        //var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getPeriode(Hrd_Models_Payroll_Proses_Gaji $d) {
        $hasil = 0;
        

        
        $hasil = $this->dbTable->SPExecute('sp_prosesgaji_periode_read',$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
    
    
    public function getGroup(Hrd_Models_Payroll_Proses_Gaji $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_prosesgaji_group_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getMonth(),$d->getYear());
        return $hasil;
    }
    
    public function getKomponen(Hrd_Models_Payroll_Proses_Gaji $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_prosesgaji_komponen_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getMonth(),$d->getYear(),$d->getGroup());
        return $hasil;
    }
    
    //
    
    
   
  
  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_prosesgaji_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
}
