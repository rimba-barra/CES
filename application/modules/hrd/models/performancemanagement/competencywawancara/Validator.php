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
class Hrd_Models_Performancemanagement_Competencywawancara_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Performancemanagement_Competencywawancara_Competencywawancara $d){
        $msg = "";
        $ok = "";

        if(strlen($d->getPertanyaanWawancara()) < 1){
        	$msg = "Pertanyaan Wawancara minimal 1 karakter";
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
