<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_OvertimevariablesController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        
       
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimevariable', array(), array());
        $obj = new Hrd_Models_Parameters_Overtimevariable();
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getValues($obj);
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

    public function updatevariableCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Parameters_Overtimevariable();
        
        $dm->setDao(new Hrd_Models_Master_GeneralParameterDao());
        $dm->setValidator(new Hrd_Models_Parameters_Validator("overtimevariable"));
        $dm->setObject($obj);
       
        return $dm;
    }
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Leave_Leave());
        $dm->setDao(new Hrd_Models_Leave_Dao());
        $dm->setIdProperty("general");
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ParamProcessor();
    }

}

?>
