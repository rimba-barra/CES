<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AlokasiBiayaValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_AlokasiBiayaValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_AlokasiBiaya $d) {
        $msg = "";


        if (strlen($d->getCode()) < 2) {
            $msg = "Kode alokasi biaya minimal 2 karakter";
        }else if (strlen($d->getName()) < 2) {
            $msg = "Keterangan alokasi biaya minimal 2 karakter";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
