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
class Hrd_Models_Statuschange_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Statuschange_StatusChange $d){
        $msg = "";
        $cs = $this->checkStatus($d->getNewEmployeeStatus(),$d->getNewStatus());
        if($d->getEmployee()->getId()==0){
            $msg = "Invalid employee";
        }else if($d->getNewEmployeeStatus()->getId()==0){
            $msg = "Please choose new status";
        }else if(!$cs["valid"]){
            $msg = $cs["msg"];
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
    
    private function checkStatus(Hrd_Models_Master_Status $status, Hrd_Models_Master_StatusInformation $information) {
        
        return Hrd_Models_App_Tools::checkStatus($status, $information);
    }
}

?>
