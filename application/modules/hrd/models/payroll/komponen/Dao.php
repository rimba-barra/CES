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
class Hrd_Models_Payroll_Komponen_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Komponen_Komponen $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_komponengaji_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getCode(),$d->getDescription(),
                $d->getPphBaris(),$d->getPlusMinus(),$d->getKpph(),$d->getTunjanganPotongan());
        
        return $hasil;
    }
    
    
    public function saveMulti(Box_Models_App_Session $s,$decan) {
        $hasil = 0;
        
        $dcResult = Box_Tools::getCleanDCResult($decan,"komponengaji");
       
        $hasil = $this->dbTable->SPUpdate('sp_komponengaji_multi_create', $s->getUser()->getId(),
                $s->getProject()->getId(),$s->getPt()->getId(),
                $dcResult["code"],
                $dcResult["description"],
                $dcResult["pph_baris"],
                $dcResult["plus_minus"],
                $dcResult["kpph"],
                $dcResult["tunjangan_potongan"]);
        
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Komponen_Komponen $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_komponengaji_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription(),
                $d->getPphBaris(),$d->getPlusMinus(),$d->getKpph(),$d->getTunjanganPotongan());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Komponen_Komponen $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
       $hasil = $this->dbTable->SPExecute('sp_komponengaji_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
      //  $hasil = $this->dbTable->SPExecute('sp_komponengaji_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Payroll_Komponen_Komponen $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_komponengaji_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_komponengaji_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Komponen_Komponen $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_komponengajicodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
