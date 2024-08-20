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
class Hrd_Models_Payroll_Transfer_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
       // $dcResult = Box_Tools::getCleanDCResult($d->getDCResult(),"transferdetail");
                
        $dcResult = $d->getDCResult();
        if(!key_exists("transferdetail_id", $dcResult)){
            $dcResult = array(
                "transferdetail_id"=>"",
                 "employee_employee_id"=>"",
                "value"=>""
            );
        }
        $hasil = $this->dbTable->SPUpdate('sp_transferdata_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMonth(),$d->getYear(),$d->getBatch(),$d->getKomponenGaji()->getId(),$d->getTotal(),$d->getTotalValue(),
                $dcResult["transferdetail_id"],
                $dcResult["employee_employee_id"],
                $dcResult["value"]
                );
         
        return $hasil;
    }
    
    public function saveMultiDetail($decan,Box_Models_App_Session $ses) {
        $hasil = 0;
        
        $dcResult = Box_Tools::getCleanDCResult($decan,"transferdetail");
        
       
        
        $hasil = $this->dbTable->SPUpdate('sp_transferdata_import_create',$ses->getUser()->getId(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $dcResult["transferdetail_id"],
                $dcResult["transfer_transfer_id"],
                $dcResult["employee_employee_nik"],
                $dcResult["value"]
                );
        
             
         
        return $hasil;
    }
    
    //
    
    
    public function saveSelect($decan,Box_Models_App_Session $ses) {
        $hasil = 0;
        
        $dcResult = Box_Tools::getCleanDCResult($decan,"transfer");
        
        
         
        $hasil = $this->dbTable->SPExecute('sp_transferdata_header_read',
                $ses->getUser()->getId(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $dcResult["transfer_id"],$dcResult["month"],$dcResult["year"],$dcResult["komponengaji_komponengaji_id"]);
       
      
         
        return $hasil;
    }
    
    public function getPeriode(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        

        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_periode_read',$d->getProject()->getId(),$d->getPt()->getId());
        
        

        return $hasil;
    }
    
    public function fetchBatch(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_batch_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getMonth(),$d->getYear());
        return $hasil;
    }
    
    public function fetchKomponen(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_komponen_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getMonth(),$d->getYear(),$d->getBatch());
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_transferdata_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getAllForBatchFilter(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_transferdataforbatch_read',1,99,$d->getProject()->getId(),$d->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllTransfer(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
         $hasil = $this->dbTable->SPExecute('sp_transferdata_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getAllDetail(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_detail_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMonth(),$d->getYear(),$d->getBatch(),$d->getKomponenGaji()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    public function getAllDetailWOPL(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_detail_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMonth(),$d->getYear(),$d->getBatch(),$d->getKomponenGaji()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllDetailByPeriod(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_transferdata_detailbyperiod_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getMonth(),$d->getYear());
       
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_transferdata_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
 
        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_transferdata_destroy', $id,$userId);

        return $row;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_transferdata_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function deleteBatch($userId,Hrd_Models_Payroll_Transfer_Transfer $t) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_transferdatabatch_destroy',$userId,$t->getMonth(),$t->getYear(),$t->getBatch());

        return $row;
    }
    
    
}
