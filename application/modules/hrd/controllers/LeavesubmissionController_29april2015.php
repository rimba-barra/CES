<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_LeavesubmissionController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'leave', array('absenttype','employee'), array());
        $dao = new Hrd_Models_Leave_Dao();
        $leave = new Hrd_Models_Leave_Leave();
        
        //$this->setArrayTable($leave,$this->getAppData());
        $leave->setArrayTable($this->getAppData());
        $leave->setProject($this->getAppSession()->getProject());
        $leave->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $leave);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee,$this->getAppData());
        
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEP($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Leave_Leave();
        
        $dm->setDao(new Hrd_Models_Leave_Dao());
        $dm->setValidator(new Hrd_Models_Leave_Validator());
        $dm->setObject($obj);
       
        return $dm;
    }
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Leave_Leave());
        $dm->setDao(new Hrd_Models_Leave_Dao());
        $dm->setIdProperty("leave_id");
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_AbsentProcessor();
    }

}

?>
