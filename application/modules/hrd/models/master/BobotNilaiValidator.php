<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BobotNilaiValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_BobotNilaiValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_BobotNilai $d){
        $msg = "";
        if(strlen($d->getCode()) < 3){
            $msg = "Code minimum 3 characters";
        }else if($d->getItemNumber()==0){
            $msg = "Please input item number";
        }else if($d->getValue()==0){
            $msg = "Please input value";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
