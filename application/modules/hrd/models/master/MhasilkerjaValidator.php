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
class Hrd_Models_Master_MhasilkerjaValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Master_Mhasilkerja $d) {
        $msg = "";       
        $this->setStatus(TRUE);
        $this->setMsg($msg);
    }

}

?>
