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
class Hrd_Models_Training_Trainingbudgetprogram_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d){
        $msg = "";
        $ok = "";

        if($d->getBudget() < 1){
        	$msg = "Budget tidak boleh kosong";
        	$ok = 0;
        }else{
            if($d->getCaptionId() < 1){
                $msg = "Silahkan Pilih Training Caption";
                $ok = 0;
            }else{
                $ok = 1;
            }
        }


        if($ok == 1){
            $this->setStatus(TRUE);
        }else{
        	$this->setMsg($msg);
        }
    }
}
