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
class Hrd_Models_Beasiswa_TransaksiValidator extends Box_Models_App_Validator  {
    public function run(Hrd_Models_Beasiswa_Transaksi $d) {
        $msg = "";
        
        $isKaryawan = (boolean)$d->getIsKaryawan();
        

        if ($isKaryawan && $d->getEmployee()->getId()==0) {
            $msg = "Invalid karyawan";
        }else if(!$isKaryawan && strlen($d->getNamaOrangTua()) < 3){
            $msg = "Nama Orang Tua minimal 3 karakter";
        }else if (!$d->getDate()) {
            $msg = "Tanggal pemberian tidak ada";
        }else if ($isKaryawan && $d->getChild()->getId()==0) {
            $msg = "Invalid anak karyawan";
        }else if (!$isKaryawan && strlen($d->getNamaAnak()) < 3) {
            $msg = "Nama anak minimal 3 karakter";
        }else if (!$d->getModule()) {
            $msg = "Invalid module transaksi";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
