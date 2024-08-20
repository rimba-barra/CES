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
class Hrd_Models_Master_JenisdokumenValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Master_Jenisdokumen $d) {
        $msg = "";
        if (intval($d->getIndex_no()) < 1) {
            $msg = "Index No is required";
        } else if (strlen($d->getCode()) < 1) {
            $msg = "Kode minimum 1 characters";
        } else {
            $this->setStatus(TRUE);
        }

        $this->setMsg($msg);
    }

}

?>
