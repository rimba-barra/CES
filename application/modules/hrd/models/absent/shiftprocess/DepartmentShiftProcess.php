<?php

/**
 * Description of EmployeeShiftProcess
 *
 * @author MIS
 */
class Hrd_Models_Absent_Shiftprocess_DepartmentShiftProcess extends Hrd_Models_Absent_ShiftProcessor {

    public function getAbsentSheet() {
        $daoAbs = new Hrd_Models_AbsentDao();
        return $daoAbs->getAbsentSheet($this->validatedObject, $this->getRequest());
       
    }

    public function getShiftData() {
        $daoCal = new Hrd_Models_Calendar_Dao();
        
        // get calender
        return $daoCal->getDetailByDepartment($this->validatedObject);
    
    }

//put your code here
}

?>
