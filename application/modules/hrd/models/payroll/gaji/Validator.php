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
class Hrd_Models_Payroll_Gaji_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Payroll_Gaji_Gaji $d) {
        $msg = "";
        
       


        if ($d->getEmployee()->getId()==0) {
            $msg = "Karyawan tidak valid";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
