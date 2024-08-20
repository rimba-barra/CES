<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UangDinasValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_UangDinasValidator  extends Box_Models_App_Validator  {
    public function run(Hrd_Models_Dinas_UangDinas $d) {
        $msg = "";


        if (!$d->getMasterSk()->getId()) {
            $msg = "Nomor sk tidak valid";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
