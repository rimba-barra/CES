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
class Hrd_Models_Tandakasih_AnggaranValidator extends Box_Models_App_Validator  {
    public function run(Hrd_Models_Tandakasih_Anggaran $d){
        $msg = "";
   
        if($d->getGroup()->getId()==0){
            $msg = "Invalid golongan";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
