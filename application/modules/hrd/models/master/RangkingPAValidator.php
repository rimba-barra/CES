<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RangkingPAValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_RangkingPAValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_RangkingPA $d){
        $msg = "";
        if(strlen($d->getName()) < 1){
            $msg = "Name minimum 1 characters";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
