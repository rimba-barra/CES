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
class Hrd_Models_Payroll_Param_Dao  extends Hrd_Models_App_Box_PayrollDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Payroll_Param_Lainlain $d,$decanPtkp,$deletedPtkp,$decanPajak,$deletedPajak,$decanBayar,$deletedBayar,
            $decanTunjangan,$deletedTunjangan) {
        $hasil = 0;
        
        
        $dcResultPtkp = Box_Tools::getCleanDCResult($decanPtkp,"payparamptkp");
        $dcResultPajak = Box_Tools::getCleanDCResult($decanPajak,"payparampajak");
        
        
        $dcResultBayar = Box_Tools::getCleanDCResult($decanBayar,"payparambayar");
        $dcResultTunjangan = Box_Tools::getCleanDCResult($decanTunjangan,"tunjangangroup");
       
        $hasil = $this->dbTable->SPUpdate('sp_setparampay_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getBiayaJabatan(),$d->getMaxBiayaJabatan(),$d->getMaxBiayaPensiun(),
                $d->getAstek(),$d->getKaryawan(),$d->getPerusahaan(),$d->getLembur(),
                $d->getMinLembur(),$d->getKodePerusahaan(),$d->getNomorRekening(),$d->getUmp(),
                $d->getMinUpah(),$d->getMaxUpah(),$d->getOpsiDtp(),$d->getTtdApproved(),
                $d->getTtdReviewed(),$d->getTtdPrepared(),$d->getTtdPajak(),$d->getNamaPerusahaan(),
                $d->getAlamatPerusahaan(),$d->getKota(),$d->getNpwp(),$d->getNamaKuasaSpt(),
                $d->getNpwpKuasa(),
                $dcResultPtkp["paramptkp_id"],$dcResultPtkp["code"],$dcResultPtkp["description"],$dcResultPtkp["value"],
                $deletedPtkp,
                $dcResultPajak["parampajak_id"],$dcResultPajak["value"],$dcResultPajak["percent"],
                $deletedPajak,
                $dcResultBayar["parambayar_id"],$dcResultBayar["komponengaji_komponengaji_id"],$dcResultBayar["is_dimuka"],
                $deletedBayar,
                $dcResultTunjangan["tunjangangroup_id"],$dcResultTunjangan["komponengaji_komponengaji_id"],$dcResultTunjangan["group_group_id"],
                $dcResultTunjangan["value"],
                $deletedTunjangan);
      // var_dump($this->dbTable);
        return $hasil;
    }

    public function update(Hrd_Models_Payroll_Param_Lainlain $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_setparampay_update', $d->getAddBy(),
                $d->getId(),$d->getCode(),$d->getDescription(),
                $d->getPphBaris(),$d->getPlusMinus(),$d->getKpph(),$d->getTunjanganPotongan());

        return $hasil;
    }
    
    public function getParams(Hrd_Models_Payroll_Param_Lainlain $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_setparampay_read',$d->getProject()->getId(),$d->getPt()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Payroll_Param_Lainlain $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_setparampay_read',$r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Payroll_Param_Lainlain $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_setparampay_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());
     
 
        return $hasil;
    }
    
    
 
    public function getAllPtkp(Hrd_Models_Payroll_Param_Ptkp $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_setparampay_ptkp_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999);
     
 
        return $hasil;
    }
    
    public function getAllTunjanganGroup(Hrd_Models_Payroll_Tunjangan_TunjanganGroup $d) {
        $hasil = 0;
        
       
    
         $hasil = $this->dbTable->SPExecute('sp_tunjangangroup_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getGroup()->getId());
      
 
        return $hasil;
    }
    
    public function getAllPajak(Hrd_Models_Payroll_Param_Pajak $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_setparampay_pajak_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999);
     
 
        return $hasil;
    }
    
    public function getAllBayar(Hrd_Models_Payroll_Param_Bayar $d) {
        $hasil = 0;
    
         $hasil = $this->dbTable->SPExecute('sp_setparampay_bayar_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999);
     
 
        return $hasil;
    }
  
  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_setparampay_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    
    public function codeExist(Hrd_Models_Payroll_Param_Lainlain $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_komponengajicodeexist_read', $d->getCode(),$d->getProject()->getId(),$d->getPt()->getId());

        return $hasil;
    }
}
