<?php

/**
 * Description of AbsentValidator
 *
 * @author MIS
 */
class Hrd_Models_AbsentMainValidator extends Box_Models_App_Validator {

    private $noValidation; /// boolean

    public function __construct() {
        parent::__construct();
        $this->noValidation = FALSE;
    }

    public function run(Hrd_Models_Absent $d) {
        $msg = "";
        if ($this->noValidation) {
            $this->setStatus(TRUE);
        } else {
            if ($d->getMonth() == 0) {
                $msg = "Invalid Month";
            } else {
                $this->setStatus(TRUE);
            }
        }

        $this->setMsg($msg);
    }

    public function getNoValidation() {
        return $this->noValidation;
    }

    public function setNoValidation($noValidation) {
        $this->noValidation = $noValidation;
    }

}

?>
