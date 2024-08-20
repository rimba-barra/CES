<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TipeValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Pinjaman_TipeValidator extends Box_Models_App_Validator{
    public function run(Hrd_Models_Pinjaman_Tipe $d) {
        $msg = "";


        if (strlen($d->getCode()) < 2) {
            $msg = "Kode tipe pinjaman minimal 2 karakter";
        }else if (strlen($d->getName()) < 5) {
            $msg = "Keterangan tipe pinjaman minimal 5 karakter";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
