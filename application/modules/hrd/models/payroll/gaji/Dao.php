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
class Hrd_Models_Payroll_Gaji_Dao extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Gaji_Gaji $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_gaji_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId(),
                $d->getGaji(),$d->getMetodePph21(),
                $d->getIsAstek(),$d->getIsDanaPensiun(),
                $d->getMetodeBayarTipe(),$d->getAstekNo(),$d->getAstekDate(),$d->getAstekGajiPercent(),
                $d->getAstekGajiValue(),$d->getAstekKecelakaan(),$d->getAstekKematian(),
                $d->getDapenNo(),$d->getDapenDate(),$d->getDapenNoKaryawan(),
                $d->getDapenGajiPercent(),$d->getDapenGajiValue(),$d->getDapenPerusahaan(),
                $d->getDapenKaryawan(),$d->getBank()->getId(),
                $d->getBankCabang(),$d->getBankNama(),$d->getBankRekening(),
                $d->getBankKode(),$d->getAlokasiBiaya1(),$d->getAlokasiBiaya2(),
                $d->getAlokasiBiaya3(),
                $d->getServicePointA(),$d->getServicePointB(),
                $d->getIsBpjsKesehatan(),$d->getBpjsksPerusahaan(),$d->getBpjsksKaryawan(),
                $d->getIsAddincome(),$d->getIsAddAstek(),
                $d->getMarriageStatus(),$d->getChildCount(),$d->getIsActive(),
                $d->getHireDate(),$d->getResignDate(),$d->getSex(),
                $d->getNpwpNumber(),$d->getIsWna(),$d->getAlamatPajak(),$d->getIsPensiun(),
                $d->getPensiunKaryawan(),$d->getPensiunPerusahaan(),$d->getBpjsNo());
        
     //   var_dump($this->dbTable);
        
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Gaji_Gaji $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");
        
     

        $hasil = $this->dbTable->SPUpdate('sp_gaji_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId(),
                $d->getGaji(),$d->getMetodePph21(),
                $d->getIsAstek(),$d->getIsDanaPensiun(),
                $d->getMetodeBayarTipe(),$d->getAstekNo(),$d->getAstekDate(),$d->getAstekGajiPercent(),
                $d->getAstekGajiValue(),$d->getAstekKecelakaan(),$d->getAstekKematian(),
                $d->getDapenNo(),$d->getDapenDate(),$d->getDapenNoKaryawan(),
                $d->getDapenGajiPercent(),$d->getDapenGajiValue(),$d->getDapenPerusahaan(),
                $d->getDapenKaryawan(),$d->getBank()->getId(),
                $d->getBankCabang(),$d->getBankNama(),$d->getBankRekening(),
                $d->getBankKode(),$d->getAlokasiBiaya1(),$d->getAlokasiBiaya2(),
                $d->getAlokasiBiaya3(),
                $d->getServicePointA(),$d->getServicePointB(),
                $d->getIsBpjsKesehatan(),$d->getBpjsksPerusahaan(),$d->getBpjsksKaryawan(),
                $d->getIsAddincome(),$d->getIsAddAstek(),
                $d->getMarriageStatus(),$d->getChildCount(),$d->getIsActive(),
                $d->getHireDate(),$d->getResignDate(),$d->getSex(),
                $d->getNpwpNumber(),$d->getIsWna(),$d->getAlamatPajak(),$d->getIsPensiun(),
                $d->getPensiunKaryawan(),$d->getPensiunPerusahaan(),$d->getBpjsNo());

        return $hasil;
    }
    
    public function saveGenerate($decan,Box_Models_App_Session $session) {
        $hasil = 0;
        
        //$dcResult = Box_Tools::getCleanDCResult($decan);
        $dcResult = Box_Tools::getCleanDCResult($decan,"gaji");
        
        //var_dump($dcResult);
        
        $hasil = $this->dbTable->SPUpdate('sp_gaji_transfer_create',$session->getUser()->getId(),$session->getProject()->getId(),
                $session->getPt()->getId(),
                $dcResult["gaji_id"],
                $dcResult["employee_employee_id"],
                $dcResult["gajix"],
                $dcResult["metode_pph21"],
                $dcResult["is_astek"],
                $dcResult["metodebayar_tipe"],
                $dcResult["is_danapensiun"]);
        
        
        
      // var_dump($this->dbTable);
        
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r,Hrd_Models_Payroll_Gaji_Gaji $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_gaji_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Payroll_Gaji_Gaji $d) {
        $hasil = 0;
    
        // $hasil = $this->dbTable->SPExecute('sp_gaji_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
          $hasil = $this->dbTable->SPExecute('sp_gaji_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId());
     
 
        return $hasil;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_gaji_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Gaji_Gaji $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_gajicodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
