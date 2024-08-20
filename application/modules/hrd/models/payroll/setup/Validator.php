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
class Hrd_Models_Payroll_Setup_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Payroll_Setup_Setup $d) {
        $msg = "";
        
        $dao = new Hrd_Models_Payroll_Setup_Dao();
        $codee = $dao->codeExist($d);
        
        


        if ($d->getKomponen()->getId()==0) {
            $msg = "Komponen gaji tidak valid";
        }else if ($d->getGroupPay()->getId()==0) {
            $msg = "Group payroll tidak valid";
        }else if (Box_Tools::codeExist($codee,$d, "setuppayroll_id")) {
            $msg = "Komponen ini sudah terpakai";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
