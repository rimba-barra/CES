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
class Erems_Models_Cac_Validator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_Cac_Proses $pl){
        $msg = "";
        
        
        
        if(!$pl->getProsesDate()){
            $msg = "Tanggal proses tidak valid";
        
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
