<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AnggaranValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_AnggaranValidator  extends Box_Models_App_Validator  {
    public function run(Hrd_Models_Training_Anggaran $d){
        $msg = "";
    
        if($d->getId()==0){
            $msg = "Invalid record";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
