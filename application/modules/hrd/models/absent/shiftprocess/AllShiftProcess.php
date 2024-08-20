<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AllShiftProcess
 *
 * @author MIS
 */
class Hrd_Models_Absent_Shiftprocess_AllShiftProcess extends Hrd_Models_Absent_ShiftProcessor{
    public function getAbsentSheet() {
        $daoAbs = new Hrd_Models_AbsentDao();
        return $daoAbs->getAbsentSheet($this->validatedObject, $this->getRequest());
    }

    public function getShiftData() {
        $daoCal = new Hrd_Models_Calendar_Dao();
        return $daoCal->getDetailByAll($this->validatedObject);
    }    
}

?>
