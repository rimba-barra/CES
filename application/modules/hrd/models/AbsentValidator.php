<?php

/**
 * Description of AbsentValidator
 *
 * @author MIS
 */
class Hrd_Models_AbsentValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Master_General_Date $d) {
        $msg = "";

        if (strlen($d->getShiftType()->getId()) == 0) {
            $msg = "Invalid shift type";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

}

?>
