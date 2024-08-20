<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AnggaranDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_AnggaranDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
  

     public function save(Hrd_Models_Training_Anggaran $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_anggarantraining_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getYear(),$d->getEmployee()->getId(),
                $d->getNilai(),$d->getPemakaian(),$d->getSisa());      
        return $hasil;
    }
    
    public function saveGen(Box_Models_App_Decan $decan, Box_Models_App_Session $ses) {
        $hasil = 0;
        $dcResult = $decan->getDCResult();
        
      
        
        $hasil = $this->dbTable->SPUpdate('sp_anggarantraininggen_create',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId(),
                $dcResult["anggarantraining_id"],
                $dcResult["year"],
                $dcResult["employee_employee_id"],
                $dcResult["nilai"],
                $dcResult["pemakaian"],
                $dcResult["sisa"]);      
      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Training_Anggaran $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_anggarantraining_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getYear());
        return $hasil;
    }
    
    public function getAllByDepartment(Box_Models_App_HasilRequestRead $r,Box_Models_App_Session $ses,$year,$departmentId){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_anggarantraining_read', $r->getPage(), $r->getLimit(),$ses->getProject()->getId(),$ses->getPt()->getId(),$year,$departmentId);
        return $hasil;
    }
    
    public function getAllByYear(Box_Models_App_Session $ses,$year){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_anggarantraining_read',1,9999,$ses->getProject()->getId(),$ses->getPt()->getId(),$year,0);
        return $hasil;
    }
    
    // get all without page limit *special for combobox
    public function getAllWoP(Hrd_Models_Training_Anggaran $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_anggarantraining_read', 1,500,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode());
        return $hasil;
    }
    
    public function getAllYear(Box_Models_App_Session $ses){
        $hasil = 0;
        
       $hasil = $this->dbTable->SPExecute('sp_anggarantrainingyear_read',$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;
    }
    
    //

    public function update(Hrd_Models_Training_Anggaran $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_anggarantraining_update', $em->getAddBy(), $em->getId(), 
                $em->getNilai(),$em->getPemakaian(),$em->getSisa());
        return $hasil;
    }
    
    public function deleteOne($ids,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_anggarantraining_destroy', $ids,$userId);
        return $row;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_anggarantraining_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

   

}
