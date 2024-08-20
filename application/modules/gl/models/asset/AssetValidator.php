<?php

class Gl_Models_Asset_AssetValidator extends Gl_Box_Models_App_Validator {
    
    public function run(Gl_Models_Asset_Asset $d){
        $msg = "";
    
        
        /*
        if(strlen($d->account) < 1){
            $msg = "Code minimum 1 characters";
        }else{
            $this->setStatus(TRUE);
            
        }
         * 
         */
        $this->setMsg($msg);
    }
}
      

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

