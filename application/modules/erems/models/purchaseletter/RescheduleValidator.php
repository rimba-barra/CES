<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RescheduleValidator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_RescheduleValidator extends Erems_Box_Models_App_Validator {
    public function run(Erems_Models_Purchaseletter_Reschedule $pl) {
        $msg = "";

        
        $this->setStatus(TRUE);
        $this->setMsg($msg);
       
    }
}

?>
