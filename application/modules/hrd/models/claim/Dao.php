<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Claim_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    private $addonFields;
    
    public function setAddOnFields($addonFields){
        $this->addonFields = $addonFields;
    }
    
    public function save(Hrd_Models_Claim_ClaimGlasses $d) {
        $hasil = 0;
     
        $af = $this->addonFields;
   
       
        $hasil = $this->dbTable->SPUpdate('sp_klaimkacamata_create', $d->getAddBy(), $d->getProject()->getId(),
                $d->getPt()->getId(), $d->getEmployee()->getId(),
                $d->getType(),$d->getDate(),$d->getTotal(),$d->getIsPay(),$d->getLensType(),$d->getSize(),
                $d->getKiMinus(),$d->getKiPlus(),$d->getKiSilinder(),
                $d->getKaMinus(),$d->getKaPlus(),$d->getKaSilinder(),
                $d->getClaimValue(),$d->getPercentPengganti(),$d->getAmountPengganti(),
                $d->getTotalTotalKlaim(),$d->getSaldo(),$d->getPlafon(),
                $af["employee_klaim_frame_tahun_akhir"],
                $af["employee_klaim_frame_tanggal_akhir"],
                $af["employee_klaim_frame_saldo_akhir"],
                $af["employee_klaim_lensa_tahun_akhir"],
                $af["employee_klaim_lensa_tanggal_akhir"],
                $af["employee_klaim_lensa_saldo_akhir"],
                $d->getTanggalKwitansi(),
                $d->getRekomendasiDokter(),
                $d->getKeterangan(),
                $d->getPayDate());
        
        //var_dump($this->dbTable);
        
        return $hasil;
    }

    public function update(Hrd_Models_Claim_ClaimGlasses $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_klaimkacamata_update', $d->getAddBy(),
                $d->getId(),$d->getDate(),$d->getTotal(),$d->getIsPay(),$d->getLensType(),$d->getSize(),
                $d->getKiMinus(),$d->getKiPlus(),$d->getKiSilinder(),
                $d->getKaMinus(),$d->getKaPlus(),$d->getKaSilinder(),
                $d->getClaimValue(),$d->getPercentPengganti(),$d->getAmountPengganti(),
                $d->getTotalTotalKlaim(),$d->getSaldo(),$d->getPlafon(),$d->getTanggalKwitansi(),$d->getRekomendasiDokter(),
                $d->getKeterangan(),
                $d->getPayDate());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Claim_ClaimGlasses $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaimkacamata_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getType(),$d->getEmployee()->getId());
     
        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Claim_ClaimGlasses $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaimkacamata_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getType(),$d->getEmployee()->getId());
     
        return $hasil;
    }
    
    public function getByPeriod(Hrd_Models_Claim_ClaimGlasses $d,$year) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaimkacamata_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getType(),$d->getEmployee()->getId(),$year);
     
        return $hasil;
    }
    
    public function delete($id,\Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_klaimkacamata_destroy', $id, $session->getUserId());

        return $row;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_klaimkacamata_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

}

?>
