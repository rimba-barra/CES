<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransaksiValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_TransaksiValidator extends Box_Models_App_Validator  {
  
    
    
    
    public function run(Hrd_Models_Dinas_Transaksi $d) {
        $msg = "";
        
        $dao = new Hrd_Models_Dinas_TransaksiDao();
        $existDinas = new Hrd_Models_Dinas_Transaksi();
        $exist = $dao->getOneByNomor($d);
        if(Box_Tools::adaRecord($exist)){
            $existDinas = Box_tools::toObjectsb("dinastran", $exist,TRUE);
            
        }
        
       


        if (!$d->getDate()) {
            $msg = "Tanggal tidak valid";
        }else if (strlen($d->getNomor()) < 5) {
            $msg = "Nomor surat minimal 5 karakter";
        }else if (!$d->getEmployee()->getId()) {
            $msg = "Karyawan tidak valid";
        }else if (intval ($d->getTujuan())==0 && strlen($d->getTujuanLain()) < 5) {
            $msg = "Tujuan proyek tidak valid atau tujuan proyek lain minimal 5 karakter";
        }else if (!$d->getBerangkat()) {
            $msg = "Tanggal berangkat tidak valid";
        }else if (!$d->getKembali()) {
            $msg = "Tanggal kembali tidak valid";
        }else if (intval($d->getTugas())==0) {
            $msg = "Jenis tugas tidak valid";
        }else if (count($d->getDetail())==0) {
            $msg = "Rincian biaya tidak ada";
        }else if( $existDinas->getId() > 0 && $existDinas->getId() != $d->getId()){
            $msg = "Nomor surat sudah ada. Silahkan menggunakan nomor surat lain.";
        } else {
             $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
    
   
}
