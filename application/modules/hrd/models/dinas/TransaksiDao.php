<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransaksiDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_TransaksiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Dinas_Transaksi $d, Hrd_Models_Dinas_NomorSurat $n) {
        $hasil = 0;
        
         $detail = $d->getDCResult();
         
        
       
        $hasil = $this->dbTable->SPUpdate('sp_dinastransaksi_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId(),
                $d->getDate(),$d->getNomor(),$d->getTujuan(),
                $d->getKeterangan(),$d->getUangMuka(),$d->getKendaraan(),
                $d->getBerangkat(),$d->getBerangkatJam(),$d->getKembali(),$d->getKembaliJam(),$d->getTugas(),$d->getTotalUangSaku(),
                $d->getTotalUangMakan(),$d->getTotalUang(),
                $detail["dinasdetail_id"],
                $detail["date"],
                $detail["hari"],
                $detail["uang_saku"],
                $detail["uang_makan"],
                $detail["uang_makan_potong"],
                $detail["transportasi"],
                $detail["pengeluaran_makan"],
                $detail["airport_tax"],
                $detail["biaya_telepon"],
                $detail["tinggal_di_rumah"],
                $detail["tinggal_di_rumah_uang"],
                $detail["biaya_lainnya"],
                $detail["keterangan"],
                $detail["tujuan"],
                $n->getId(),$n->getTahun(),$n->getBulan(),$n->getNomor(),
                $n->getInfiks(),
                $d->getTujuanLain()
                );
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function update(Hrd_Models_Dinas_Transaksi $d, Hrd_Models_Dinas_NomorSurat $n,$deletedRows) {
        $hasil = 0;
        $detail = $d->getDCResult();
      //  var_dump($d->getDCResult());
       // var_dump($d->getArrayTable());
       // die();
        

        $hasil = $this->dbTable->SPUpdate('sp_dinastransaksi_update', $d->getAddBy(),
                $d->getId(),
                $d->getDate(),$d->getNomor(),$d->getTujuan(),
                $d->getKeterangan(),$d->getUangMuka(),$d->getKendaraan(),
                $d->getBerangkat(),$d->getBerangkatJam(),$d->getKembali(),$d->getKembaliJam(),$d->getTugas(),$d->getTotalUangSaku(),
                $d->getTotalUangMakan(),$d->getTotalUang(),
                $detail["dinasdetail_id"],
                $detail["date"],
                $detail["hari"],
                $detail["uang_saku"],
                $detail["uang_makan"],
                $detail["uang_makan_potong"],
                $detail["transportasi"],
                $detail["pengeluaran_makan"],
                $detail["airport_tax"],
                $detail["biaya_telepon"],
                $detail["tinggal_di_rumah"],
                $detail["tinggal_di_rumah_uang"],
                $detail["biaya_lainnya"],
                $detail["keterangan"],
                $detail["tujuan"],
                $deletedRows, // deletedrows,
                $d->getTujuanLain()
                );
       // var_dump($this->dbTable);
        return $hasil;
    }
    

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Dinas_Transaksi $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_dinastransaksi_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getOneByNomor(Hrd_Models_Dinas_Transaksi $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_dinastransaksi_codeexist_read',$d->getProject()->getId(),$d->getPt()->getId(),1,1,
                $d->getNomor());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getAllByEmployee(Box_Models_App_HasilRequestRead $r, Hrd_Models_Dinas_Transaksi $d) {
        $hasil = 0;
 
        
        $hasil = $this->dbTable->SPExecute('sp_dinastransaksi_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit(),$d->getEmployee()->getId());
     
    
        return $hasil;
    }
    
    public function getAllByEmployeeWOPL(Hrd_Models_Dinas_Transaksi $d) {
        $hasil = 0;
        
    
        
        $hasil = $this->dbTable->SPExecute('sp_dinastransaksi_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999,$d->getEmployee()->getId());
     

        return $hasil;
    }
    
    public function getBiaya($dinasId) {
        $hasil = 0;
        

        
        $hasil = $this->dbTable->SPExecute('sp_dinasdetail_read',$dinasId,1,9999);
     

        return $hasil;
    }
    
    public function getLastNomorSurat(Box_Models_App_Session $s) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_dinastransaksilasnomor_read',$s->getProject()->getId(),$s->getPt()->getId());
        
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_dinastransaksi_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
