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
class Hrd_Models_Master_Kategorisk_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_Kategorisk_MasterKategoriSK $d){
        $msg = "";
        if(strlen($d->getName()) < 1){
            $msg = "Name minimal 1 karakter";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
