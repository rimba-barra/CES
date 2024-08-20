<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_ReportapprovalmatrixController extends Box_Models_App_Hermes_AbstractController {

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
         
        
    
        $masterdept     = new Hrd_Models_App_Mastertable_Department();
        $allDepartment        = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
		
		/*
        /// department list
        $dao = new Hrd_Models_Master_DepartmentDao();
        $hasil = $dao->getAllWOPL(new Hrd_Models_Master_Department());
       	$hasil = $dao->getAll($this->getAppRequest(),new Hrd_Models_Master_Department());
		
        $allDepartment = array();
        foreach ($hasil[1] as $record){
    
            $department = new Hrd_Models_Master_Department();
            $department->setArrayTable($record);
            $allDepartment[] = $department;
        }
        */
        
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
        
        

       $otherAT = array(array(
           "AT_SICK"=>  Box_Config::ABSENTTYPE_SICK,
           "AT_PERMISSION"=>  Box_Config::ABSENTTYPE_PERMISSION,
           "AT_LEAVE"=>  Box_Config::ABSENTTYPE_LEAVE
       ));
        
        $dm->setHasil(array($pt,$project,$allDepartment,$allDivision,$allCategories,$allStatusAr,$otherAT));
       
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    

}

?>
