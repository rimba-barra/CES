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
class Hrd_Models_Payroll_Edittunjangan_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Edittunjangan_EditTunjangan $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_edittunjangan_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getCode(),$d->getDescription());
        
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Edittunjangan_EditTunjangan $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_edittunjangan_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription());

        return $hasil;
    }
    
    public function updateValue($decan,Box_Models_App_Session $ses) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");
        $dcResult = Box_Tools::getCleanDCResult($decan,"edittunjangan");

        $hasil = $this->dbTable->SPUpdate('sp_edittunjanganvalue_update',$ses->getUser()->getId(),
                $dcResult["edittunjangan_id"],$dcResult["value"]);

        return $hasil;
    }
    
    //
    
    public function generateSave($decan,Box_Models_App_Session $ses) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");
        $dcResult = Box_Tools::getCleanDCResult($decan,"edittunjangan");

        $hasil = $this->dbTable->SPUpdate('sp_edittunjangangenerate_create',$ses->getUser()->getId(),
                $ses->getProject()->getId(),$ses->getPt()->getId(),
                $dcResult["employee_employee_id"],
                $dcResult["komponengaji_komponengaji_id"],
                $dcResult["month"],
                $dcResult["year"]);
        
    //    var_dump($this->dbTable);

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Edittunjangan_EditTunjangan $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_edittunjangan_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getMonth(),$d->getYear());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getMonthYear(Box_Models_App_Session $ses) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_edittunjanganmonthyear_read',1, 9999,$ses->getProject()->getId(),$ses->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getEmployee(Box_Models_App_Session $ses,$bulan,$tahun) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_edittunjanganemployee_read',1, 9999,$ses->getProject()->getId(),$ses->getPt()->getId(),
                $bulan,$tahun);
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    //
    
    public function getValue(Box_Models_App_Session $ses,$bulan,$tahun,$employeeId) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_edittunjanganvalue_read',1, 9999,$ses->getProject()->getId(),$ses->getPt()->getId(),
                $bulan,$tahun,$employeeId);
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
   

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_edittunjangan_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Edittunjangan_EditTunjangan $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_bankcodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
