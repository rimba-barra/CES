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
class Hrd_Models_Training_Trainingregistration_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Trainingregistration_Trainingregistration $d){
        $msg = "";
        $ok = "";

        if(strlen($d->getPeriode()) < 1){
        	$msg = "Periode tidak boleh kosong";
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
