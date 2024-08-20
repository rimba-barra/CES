<?php

/**
 * Description of AbsentValidator
 *
 * @author MIS
 */
class Hrd_Models_Calendar_Validator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Calendar_Calendar $d) {
        $msg = "";


        if ($d->getDepartment()->getId() == 0) {
            $msg = "Invalid department";
        } else if ($this->dataExist($d)) {
            $msg = "The department and year already exist";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function dataExist(Hrd_Models_Calendar_Calendar $d) {
        $exist = FALSE;
        $dao = new Hrd_Models_Calendar_Dao();
        $oldId = $dao->isExist($d);
       
        if ($oldId) {
            if (array_key_exists("id", $oldId)) {
                $oldId = $oldId["id"];
            }
        }


        if ($d->getId() == 0) { /// insert new data
            if ($oldId > 0) {
                $exist = TRUE;
            }
        } else {
            
        }

        return $exist;
    }

}

?>
