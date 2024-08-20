<?php

/**
 * Description of AbsentValidator
 *
 * @author MIS
 */
class Hrd_Models_AbsentToolValidator extends Box_Models_App_Validator {

    private $process;

    public function __construct($process = NULL) {
        parent::__construct();
        $this->process = $process;
    }

    public function setProcess($p) {
        $this->process = $p;
    }

    public function run($object) {
        $msg = "";

        if ($this->process == "GENHOLIDAY") {
            if ($object instanceof Hrd_Models_Absent) {
                if ($object->getMonth() == 0) {
                    $msg = "Invalid Month";
                } else if($object->getYear()==0) {
                    $msg = "Invalid Year";
                } else if(!$object->getEmployee()->getId()) {
                    $msg = "Invalid employee";
                }else{
                    $this->setStatus(TRUE);
                }
                $this->setMsg($msg);
            }
        }
        else if ($this->process == "GENHOLIDAYBYDIVISION") {
            if ($object instanceof Hrd_Models_Absent) {
                if ($object->getMonth() == 0) {
                    $msg = "Invalid Month";
                } else if($object->getYear()==0) {
                    $msg = "Invalid Year";
                
                } else if(!$object->getEmployee()->getDepartment()->getId() || $object->getEmployee()->getDepartment()->getId()==999) {
                    $msg = "Invalid department";
                }else{
                    $this->setStatus(TRUE);
                }
                $this->setMsg($msg);
            }
        }else if ($this->process == "GENHOLIDAYBYALL") {
            if ($object instanceof Hrd_Models_Absent) {
                if ($object->getMonth() == 0) {
                    $msg = "Invalid Month";
                } else if($object->getYear()==0) {
                    $msg = "Invalid Year";
                }else{
                    $this->setStatus(TRUE);
                }
                $this->setMsg($msg);
            }
        }
    }

}

?>
