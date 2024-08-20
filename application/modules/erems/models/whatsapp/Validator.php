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
class Erems_Models_Whatsapp_Validator extends Erems_Box_Models_App_Validator {
   public function run(Erems_Models_Sms_SMS $pl){
        $msg = "";
               
        if($pl->getCustomer()->getId()==0){
            $msg = "Invalid customer";
        }else if(strlen($pl->getPhoneNumber())<5){
            $msg = "Phonenumber minimum 5 characters";
      
        } else if(strlen($pl->getNotes()) < 3){
            $msg = "Notes minimum 3 characters";
        } else if(strlen($pl->getNotes()) > 150){
            $msg = "Notes maximum 150 characters";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}