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
class Hrd_Models_Plafon_Validator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Plafon_PlafonKaryawan $d) {
        $msg = "";

        


        if ($d->getEmployee()->getId() == 0) {
            $msg = "Invalid employee";
        } else if ($d->getYear()==0) {
            $msg = "Invalid year";
        
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

}

?>
