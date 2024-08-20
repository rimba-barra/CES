<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NegaraTujuanValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_NegaraTujuanValidator  extends Box_Models_App_Validator   {
    public function run(Hrd_Models_Dinas_NegaraTujuan $d) {
        $msg = "";

 
        if (strlen($d->getCode()) < 3) {
            $msg = "Kode negara tujuan minimal 3 karakter";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
