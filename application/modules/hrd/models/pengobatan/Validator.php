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
class Hrd_Models_Pengobatan_Validator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Pengobatan_Plafon $d) {
        $msg = "";

     

        


        if ($d->getYear() == 0) {
            $msg = "Invalid year";
        } else if ((strtotime($d->getStartDate())) > (strtotime($d->getEndDate()))) {
            $msg = "Invalid period";
        } else if ($d->getEmployeeGroup()->getId() == 0) {
            $msg = "Invalid group";
        } else if ($d->getType()->getId() == 0) {
            $msg = "Invalid type";
        } else if (Hrd_Models_App_Tools::isCodeExist(new Hrd_Models_Pengobatan_Dao(), $d,"plafonpengobatan_id")) {
            $msg = "Record exists";
        } else {
            $this->setStatus(TRUE);
        }
        
      
        
        $this->setMsg($msg);
    }

}

?>
