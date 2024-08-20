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
class Hrd_Models_Penghargaan_TransaksiValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Penghargaan_Transaksi $d) {
        $msg = "";


        if ($d->getEmployee()->getId()===0) {
            $msg = "Karyawan tidak valid";
        }else if ($d->getJenis()->getId()===0) {
            $msg = "Jenis penghargaan tidak valid";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
