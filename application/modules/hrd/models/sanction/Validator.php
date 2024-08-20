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
class Hrd_Models_Sanction_Validator extends Box_Models_App_Validator{
    public function run(Hrd_Models_Sanction_Sanction $d){
        $msg = "";
        if(!$d->getStartDate()){
            $msg = "Invalid start date";
        }else if(!$d->getEndDate() && $d->getIs_sanctiontype_lisan() == 0){ // edit by wulan sari 20190328
            $msg = "Invalid end date";
        }else if(intval($d->getSanctionType()->getId())==0){
            $msg = "Invalid sanction type";
        }else if(intval($d->getEmployee()->getId())==0){
            $msg = "Invalid employee";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
