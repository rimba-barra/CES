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
class Hrd_Models_Training_Trainingname_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Trainingname_Trainingname $d){
        $msg = "";
        $ok = "";

        if(strlen($d->getTrainingName()) < 1){
        	$msg = "Training Name tidak boleh kosong";
        	$ok = 0;
        }elseif(strlen($d->getVendor()) < 1){
            $msg = "Vendor tidak boleh kosong";
            $ok = 0;
        }else{
            $ok = 1;
        }
        if($ok == 1){
            $this->setStatus(TRUE);
        }else{
        	$this->setMsg($msg);
        }
    }
}
