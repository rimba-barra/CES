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
class Hrd_Models_Payroll_Join_Validator extends Box_Models_App_Validator{
    public function run(Hrd_Models_Payroll_Join_Join $d) {
        $msg = "";
        
     
        
        


        if ($d->getKomp1()->getId()==0) {
            $msg = "Komponen 1 tidak valid";
        }else if ($d->getKomp2()->getId()==0) {
            $msg = "Komponen 2 tidak valid";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
