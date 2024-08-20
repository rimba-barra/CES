<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JobFunctionValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_JobFunctionValidator extends Box_Models_App_Validator{
    public function run(Hrd_Models_Master_JobFunction $d){
        $msg = "";
        if(strlen($d->getCode()) < 1){
            $msg = "Kode minimal 1 karakter";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
