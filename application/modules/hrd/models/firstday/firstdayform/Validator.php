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
class Hrd_Models_Firstday_Firstdayform_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Firstday_Firstdayform_Firstdayform $d){
        $msg = "";
        if(strlen($d->getQuestion()) < 3){
            $msg = "Question minimal 3 karakter";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
