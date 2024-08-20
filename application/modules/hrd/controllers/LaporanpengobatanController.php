<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_LaporanpengobatanController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimeheader', array('employee'), array('overtimes'));
        $dao = new Hrd_Models_Overtime_Dao();
        $header = new Hrd_Models_Overtime_Header();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function lookemployeeRead(){
      
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $obj = new Hrd_Models_Master_Employee();

        //$this->setArrayTable($leave,$this->getAppData());
        $this->setArrayTable($obj,$this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->lookupemployee($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function initRead(){
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/hrd/report/';
         
     
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $pt = $this->getAppSession()->getPt();
        $project = $this->getAppSession()->getProject();
        
        
    
        // company profile 
        $genDao = new Hrd_Models_Master_GeneralDao();
        $company = $genDao->getCompanyProfile($this->getAppSession()->getProject(), $this->getAppSession()->getPt());
     
        $pt = new Box_Models_Master_Pt();
        $project = new Box_Models_Master_Project();
        $pt->setArrayTable($company[1][0]);
        $project->setArrayTable($company[0][0]);
        
        
        /// employee list
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employeeFilter = new Hrd_Models_Master_EmployeePersonal();
        $employeeFilter->setProject($this->getAppSession()->getProject());
        $employeeFilter->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEPJustActiveWOPL($employeeFilter);
    
        $allEmployee = array();
        foreach ($hasil[1] as $record){
    
            $employee = new Hrd_Models_Employee_Employee();
            $employee->setArrayTable($record);
            $allEmployee[] = $employee;
        }
  
        
        /// department list
        $dao = new Hrd_Models_Master_DepartmentDao();
        $hasil = $dao->getAllWOPL(new Hrd_Models_Master_Department());
    
        $allDepartment = array();
        foreach ($hasil[1] as $record){
    
            $department = new Hrd_Models_Master_Department();
            $department->setArrayTable($record);
            $allDepartment[] = $department;
        }
        
        
        /// category list
        $dao = new Hrd_Models_Master_GroupDao();
        $hasil = $dao->getAll($this->getAppRequest(),new Hrd_Models_Master_Group());
    
        $allCategories = array();
        foreach ($hasil[1] as $record){
    
            $category = new Hrd_Models_Master_Group();
            $category->setArrayTable($record);
            $allCategories[] = $category;
        }
        
       
        /// status list
        $allStatus = $genDao->getAllEmployeeStatus();
        $allStatusAr = array();
        if(is_array($allStatus)){
            if(is_array($allStatus[0])){
                foreach ($allStatus[0] as $row){
                    $status = new Hrd_Models_Master_Status();
                    $status->setArrayTable($row);
                    $allStatusAr[] = $status;
                }
            }
        }
        
        /// division list
        $dao = new Hrd_Models_Master_DivisionDao();
        $hasil = $dao->getAll($this->getAppRequest(),new Hrd_Models_Master_Division());
        
        $allDivision = array();
        foreach ($hasil[1] as $record){
    
            $division = new Hrd_Models_Master_Division();
            $division->setArrayTable($record);
            $allDivision[] = $division;
        }
        
         /// kelompok training list
        $daokt = new Hrd_Models_Training_GroupDao();
        $kelompokT = new Hrd_Models_Training_Group();
        $kelompokT->setProject($project);
        $kelompokT->setPt($pt);
        $hasilkt = $daokt->getAllWoP($kelompokT);
      
        $allkt= array();
        foreach ($hasilkt[1] as $record){
    
            $kt = new Hrd_Models_Training_Group();
            $kt->setArrayTable($record);
            $allkt[] = $kt;
        }
        
        /// alokasi biaya list
        $daoab = new Hrd_Models_Master_AlokasiBiayaDao();
        $kelompoab = new Hrd_Models_Master_AlokasiBiaya();
        $kelompoab->setProject($project);
        $kelompoab->setPt($pt);
        $hasilab = $daoab->getAllWOPL($kelompoab);
        $hasilab = Box_Tools::toObjectResult($hasilab, new Hrd_Models_Master_AlokasiBiaya());
        
        
        /// jenis pengobatan list
        $daojp = new Hrd_Models_Pengobatan_TypeDao();
        $jp = new Hrd_Models_Pengobatan_Type();
        
        $hasiljp = $daojp->getAllWOPL($jp);
        $hasiljp = Box_Tools::toObjectResult($hasiljp, new Hrd_Models_Pengobatan_Type());
        
        
        

       $otherAT = array(array(
           "AT_SICK"=>  Box_Config::ABSENTTYPE_SICK,
           "AT_PERMISSION"=>  Box_Config::ABSENTTYPE_PERMISSION,
           "AT_LEAVE"=>  Box_Config::ABSENTTYPE_LEAVE
       ));
        
        $dm->setHasil(array($pt,$project,$allDepartment,$allDivision,$allkt,$hasilab,$hasiljp,$allCategories,$allStatusAr,$otherAT,$allEmployee));
       
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    

    public function excelformatrjRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_Claim_ClaimDao();
        $obj = new Hrd_Models_Report_ClaimReport();     
        
        $params = $this->getAppData();
        
        $result = $dao->getdataReportformatrj($params,$this->getAppSession());
        $return = $obj->create_excel_formatrj($params,$result);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }
}

?>
