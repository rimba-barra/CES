<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonKaryawanValidator
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_PlafonKaryawanValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Pengobatan_PlafonKaryawan $d) {
        $msg = "";
        
        if ($d->getEmployee()->getId() == 0) {
            $msg = "Invalid employee";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>
