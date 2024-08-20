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
class Hrd_Models_Payroll_Komponen_Validator extends Box_Models_App_Validator{
    public function run(Hrd_Models_Payroll_Komponen_Komponen $d) {
        $msg = "";
        
        $dao = new Hrd_Models_Payroll_Komponen_Dao();
        $codee = $dao->codeExist($d);
        
        


        if (strlen($d->getCode()) < 2) {
            $msg = "Kode komponen minimal 2 karakter";
        }else if (strlen($d->getDescription()) < 5) {
            $msg = "Keterangan komponen minimal 5 karakter";
        }else if (Box_Tools::codeExist($codee,$d, "komponengaji_id")) {
            $msg = "Kode ini sudah terpakai";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
