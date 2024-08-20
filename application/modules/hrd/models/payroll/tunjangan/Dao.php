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
class Hrd_Models_Payroll_Tunjangan_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Tunjangan_TunjanganTetap $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_tunjangantetap_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId(),$d->getKomponenGaji()->getId(),$d->getValue());
        
        return $hasil;
    }
    
    public function saveMulti(Box_Models_App_Session $ses,$decan) {
        $hasil = 0;
        
        $dcResult = Box_Tools::getCleanDCResult($decan,"tunjangantetap");
       
        $hasil = $this->dbTable->SPUpdate('sp_tunjangantetap_multi_create',$ses->getUser()->getId(),
                $ses->getProject()->getId(),$ses->getPt()->getId(),
                $dcResult["komponengaji_komponengaji_id"],
                $dcResult["employee_employee_id"],
                $dcResult["value"]
                );
        
        
        
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Tunjangan_TunjanganTetap $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_tunjangantetap_update', $d->getAddBy(),
                $d->getId(),$d->getEmployee()->getId(),$d->getKomponenGaji()->getId(),$d->getValue());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Tunjangan_TunjanganTetap $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_tunjangantetap_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getKomponenGaji()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    /* tanpa filter komponen gaji */
    public function getAllB(Hrd_Models_Payroll_Tunjangan_TunjanganTetap $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_tunjangantetap_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),0);
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_tunjangantetap_destroy',$id,$userId);

        return $row;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_tunjangantetap_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Tunjangan_TunjanganTetap $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_tunjangantetap_dataexist_read', $d->getProject()->getId(),$d->getPt()->getId(),$d->getKomponenGaji()->getId(),$d->getEmployee()->getId());

        return $hasil;
    }
}
