<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_SanctionController extends Box_Models_App_Hermes_AbstractController  {
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'sanction', array('employee','sanctiontype','division','group'),array());
        $sanc = new Hrd_Models_Sanction_Sanction();
        $this->setArrayTable($sanc,$this->getAppData());
        $sanc->setProject($this->getAppSession()->getProject());
        $sanc->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Sanction_Dao();
        $hasil = $dao->getAll($this->getAppRequest(), $sanc);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;       
    }
    
    public function employeeRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('division','group'),array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function mainCreate(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Sanction_Sanction();
        
        $dm->setDao(new Hrd_Models_Sanction_Dao());
        $dm->setValidator(new Hrd_Models_Sanction_Validator());
        $dm->setObject($obj);
        return $dm;
    }
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Sanction_Sanction());
        $dm->setDao(new Hrd_Models_Sanction_Dao());
        $dm->setIdProperty("sanction_id");
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    
}

?>
