<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CACValidator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_CACValidator extends Erems_Box_Models_App_Validator{
   public function run(Erems_Models_Master_CAC $pl){
        $msg = "";
        
        if(strlen($pl->getCode()) < 1){
            $msg = "Code minimum 1 character";
        }else if(strlen($pl->getCode()) > 8 ){
            $msg = "Code maximum 8 character";
        }else if(strlen($pl->getName()) < 5){
            $msg = "Name minimum 5 characters";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
