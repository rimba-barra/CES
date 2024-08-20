<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PerjalananDinasValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_PerjalananDinasValidator extends Box_Models_App_Validator  {
    
    public function run(Hrd_Models_Dinas_PerjalananDinas $d) {
        $msg = "";


        if ($d->getEmployee()->getId()==0) {
            $msg = "Karyawan tidak valid";
        }else if (strlen($d->getNomor()) < 3 && $d->getId()==0) {
            $msg = "Nomor surat minimal 3 karakter";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
