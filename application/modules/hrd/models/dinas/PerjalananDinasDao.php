<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PerjalananDinasDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_PerjalananDinasDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Dinas_PerjalananDinas $d) {
        $hasil = 0;
        
       
       
        $hasil = $this->dbTable->SPUpdate('sp_perjalanandinas_create', 
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getDocumentNo(),
                $d->getEmployee()->getId(),
                $d->getDate(),
                $d->getNegaraTujuan()->getId(),
                $d->getStatus(),
                $d->getLama(),
                $d->getProjectTujuan(),
                $d->getNonProjectTujuan(),
                $d->getUangmukaCurrencyId(),
                $d->getUangmukaAmount(),
                $d->getUangKendaraanCurrencyId(),
                $d->getUangKendaraanAmount(),
                $d->getTanggalBerangkat(),
                $d->getTanggalKembali(),
                $d->getJamBerangkat(),
                $d->getJamKembali(),
                $d->getNotes(),
                $d->getExchangeRate(),
                $d->getRincianUangMakanCurrencyId(),
                $d->getRincianUangMakanAmount(),
                $d->getRincianUangMakanDurasi(),
                $d->getRincianUAngMakanTotal(),
                $d->getRincianUangSakuCurrencyId(),
                $d->getRincianUangSakuAmount(),
                $d->getRincianUangSakuDurasi(),
                $d->getRincianUAngSakuTotal(),
                $d->getIsProject(),
                $d->getApproval(),
                $d->getCc(),
                $d->getNomor()
                );
        
         
        
        return $hasil;
    }

    public function update(Hrd_Models_Dinas_PerjalananDinas $d) {
        $hasil = 0;
        
       
    
     
        

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_perjalanandinas_update', 
                $d->getAddBy(),
                $d->getId(),
                $d->getDocumentNo(),
                $d->getEmployee()->getId(),
                $d->getDate(),
                $d->getNegaraTujuan()->getId(),
                $d->getStatus(),
                $d->getLama(),
                $d->getProjectTujuan(),
                $d->getNonProjectTujuan(),
                $d->getUangmukaCurrencyId(),
                $d->getUangmukaAmount(),
                $d->getUangKendaraanCurrencyId(),
                $d->getUangKendaraanAmount(),
                $d->getTanggalBerangkat(),
                $d->getTanggalKembali(),
                $d->getJamBerangkat(),
                $d->getJamKembali(),
                $d->getNotes(),
                $d->getExchangeRate(),
                $d->getRincianUangMakanCurrencyId(),
                $d->getRincianUangMakanAmount(),
                $d->getRincianUangMakanDurasi(),
                $d->getRincianUAngMakanTotal(),
                $d->getRincianUangSakuCurrencyId(),
                $d->getRincianUangSakuAmount(),
                $d->getRincianUangSakuDurasi(),
                $d->getRincianUAngSakuTotal(),
                $d->getIsProject(),
                $d->getApproval(),
                $d->getCc(),
                $d->getNomor()
                );
        
              //  var_dump($this->dbTable);

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Dinas_PerjalananDinas $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_perjalanandinas_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());

        return $hasil;
    }
    
    public function getJumlah($year,$project,$pt) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_perjalanandinastotal_read',$year,$project,$pt);
        return $hasil;
    }
    
   
    
    
    
    
    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_perjalanandinas_destroy',$id,$userId);
    
        return $row;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_perjalanandinas_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
