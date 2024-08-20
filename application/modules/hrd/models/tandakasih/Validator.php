<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Tandakasih_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Tandakasih_TandaKasih $d){
        $msg = "";
   
        if($d->getEmployee()->getId()==0){
            $msg = "Invalid employee";
        }else if(!$d->getDate()){
            $msg = "Tanggal invalid";
        }else if(intval ($d->getJenis())==0){
            $msg = "Jenis tanda kasih invalid";
        }else if(doubleval($d->getJumlah())==0){
            $msg = "Jumlah invalid";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
 
}

?>
