<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_LeavegivingController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'leaveentitlement', array('employee'), array());
        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $enti = new Hrd_Models_Leave_LeaveEntitlement();
        
        $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());
    
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAll($this->getAppRequest(), $enti));
        return $dm;
    }
    
    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
      
        $paramsRequestResult = Box_Tools::globalParamsExistLeave($this->getAppSession());

        
        
        
        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
                "EXPIRE_DURATION"=> Box_Config::LEAVE_EXPIRE_DURATION
        ));

        $dm->setHasil(array($otherAT));
        
        
        return $dm;
    }
    
    
    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department','employeestatus'), array());
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
        $obj = new Hrd_Models_Leave_LeaveEntitlement();
        $dm->setDao(new Hrd_Models_Leave_LeaveEntitlementDao());
        $dm->setValidator(new Hrd_Models_Leave_LeaveEntitlementValidator());
        $dm->setObject($obj);
       
        return $dm;
    }
    
    public function generateyearlyCreate(){
         $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Leave_LeaveEntitlement();
        
      
        $dm->setDao(new Hrd_Models_Leave_LeaveEntitlementDao());
        $dm->setValidator(new Hrd_Models_Leave_LeaveEntitlementValidator("yearly"));
        $dm->setObject($obj);
       
        return $dm;
    }
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Leave_LeaveEntitlement());
        $dm->setDao(new Hrd_Models_Leave_LeaveEntitlementDao());
        $dm->setIdProperty("leaveentitlements_id");
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_LeaveProcessor();
    }

}

?>
