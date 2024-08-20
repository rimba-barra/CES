<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_MastergajiController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'gaji', array('employee','department'));
        $dao = new Hrd_Models_Payroll_Gaji_Dao();
        $header = new Hrd_Models_Payroll_Gaji_Gaji();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWOPL($header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    
     public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Overtime_Dao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function parameterRead(){
        
        $mb = new Hrd_Models_App_Mastertable_Bank();
        $bb = $mb->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        /// load cca 
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $cca = new Hrd_Models_Payroll_Costcontrol_Cca();
        $cca->setProject($this->getAppSession()->getProject());
        $cca->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $cca);
        $allCca = false;
        if(Box_Tools::adaRecord($hasil)){
            $allCca = Box_Tools::toObjects("cca", $hasil,FALSE);
        }
        
        /// load ccb 
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $ccb = new Hrd_Models_Payroll_Costcontrol_Ccb();
        $ccb->setProject($this->getAppSession()->getProject());
        $ccb->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $ccb);
        $allCcb = false;
        if(Box_Tools::adaRecord($hasil)){
            $allCcb = Box_Tools::toObjects("ccb", $hasil,FALSE);
        }
        
        /// load ccc 
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $ccc = new Hrd_Models_Payroll_Costcontrol_Ccc();
        $ccc->setProject($this->getAppSession()->getProject());
        $ccc->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $ccc);
        $allCcc = false;
        if(Box_Tools::adaRecord($hasil)){
            $allCcc = Box_Tools::toObjects("ccc", $hasil,FALSE);
        }
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array($bb,$allCca,$allCcb,$allCcc));
    }
    
    

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEP($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Payroll_Gaji_Gaji();
       
        $dm->setDao(new Hrd_Models_Payroll_Gaji_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Gaji_Validator());
        $dm->setObject($obj);

        return $dm;
    }
    
   
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    

}

?>
