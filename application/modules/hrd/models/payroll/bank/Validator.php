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
class Hrd_Models_Payroll_Bank_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Payroll_Bank_Bank $d) {
        $msg = "";
        
        $dao = new Hrd_Models_Payroll_Bank_Dao();
        $codee = $dao->codeExist($d);
        
        


        if (strlen($d->getCode()) < 2) {
            $msg = "Kode bank minimal 2 karakter";
        }else if (strlen($d->getDescription()) < 5) {
            $msg = "Keterangan bank minimal 5 karakter";
        }else if (Box_Tools::codeExist($codee,$d, "bank_id")) {
            $msg = "Kode ini sudah terpakai";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
