<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Transfer_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Payroll_Transfer_Transfer $d) {
        $msg = "";
        
     


        if (!Box_Validator::isBulanValid($d->getMonth())) {
            $msg = "Bulan tidak valid";
        }else if (!Box_Validator::isTahunValid($d->getYear())) {
            $msg = "Tahun tidak valid";
        }else if ($d->getBatch()==0) {
            $msg = "Batch tidak valid";
        }else if ($d->getKomponenGaji()->getId()==0) {
            $msg = "Komponen gaji tidak valid";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
