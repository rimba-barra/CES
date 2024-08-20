<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_AbsentTypeValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_AbsentType $d){
        $msg = "";
        if(strlen($d->getName()) < 1){
            $msg = "Name minimum 1 characters";
        }else if($d->getGroup()->getId()==0){
            $msg = "Invalid Group";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
