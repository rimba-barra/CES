<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TrainingreportController extends Box_Models_App_Hermes_AbstractController {

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
        
        
  
        
        /// department list
        $dao = new Hrd_Models_Master_DepartmentDao();
        $hasil = $dao->getAll($this->getAppRequest(),new Hrd_Models_Master_Department());
    
        $allDepartment = array();
        foreach ($hasil[1] as $record){
    
            $department = new Hrd_Models_Master_Department();
            $department->setArrayTable($record);
            $allDepartment[] = $department;
        }
        
        /// alokasibiaya list
        $dao = new Hrd_Models_Master_AlokasiBiayaDao();
        $abFilter = new Hrd_Models_Master_AlokasiBiaya();
        $abFilter->setProject($this->getAppSession()->getProject());
        $abFilter->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWOPL($abFilter);
    
        $allAlokasiBiaya = array();
        foreach ($hasil[1] as $record){
    
            $ab = new Hrd_Models_Master_AlokasiBiaya();
            $ab->setArrayTable($record);
            $allAlokasiBiaya[] = $ab;
        }

        /// kategorisk list
        $dao = new Hrd_Models_Master_Kategorisk_Dao();
        $kategoriskFilter = new Hrd_Models_Master_Kategorisk_MasterKategoriSK();
        $kategoriskFilter->setProjectKP($this->getAppSession()->getProject());
        $kategoriskFilter->setPtKP($this->getAppSession()->getPt());
        $hasil = $dao->getAllWoPLKP($kategoriskFilter);

        $allKategorisk = array();
        foreach ($hasil[1] as $record){
    
            $kategorisk = new Hrd_Models_Master_Kategorisk_MasterKategoriSK();
            $kategorisk->setArrayTable($record);
            $allKategorisk[] = $kategorisk;
        }

        /// projectpt list
        $dao = new Hrd_Models_Master_Projectpt_Dao();
        $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectptFilter->setUserid($this->getAppSession()->getUserId());
        $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil = $dao->getAllWoPL($projectptFilter);

        $allprojectpt = array();
        foreach ($hasil[1] as $record){
    
            $projectpt = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectpt->setArrayTable($record);
            $allprojectpt[] = $projectpt;
        }

         //EMPLOYEE
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masteremp   = new Hrd_Models_App_Mastertable_Employee();
        $allemp      = $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        
       $otherAT = array(array(
           "AT_SICK"=>  Box_Config::ABSENTTYPE_SICK,
           "AT_PERMISSION"=>  Box_Config::ABSENTTYPE_PERMISSION,
           "AT_LEAVE"=>  Box_Config::ABSENTTYPE_LEAVE
       ));

        
        $dm->setHasil(array($pt,$project,$allDepartment,$allAlokasiBiaya,$otherAT,$allKategorisk,$allprojectpt,$allemp));
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    
    public function exportdataRead() {
        $obj = new Hrd_Models_Report_Exporttraining();
        //$post_data = Zend_Json::decode($_POST['data']);
        $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));

        /// projectpt list
        // $dao = new Hrd_Models_Master_Projectpt_Dao();
        // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        // $projectptFilter->setUserid($this->getAppSession()->getUserId());
        // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        // $hasil = $dao->getAllWoPL($projectptFilter);

        // $allprojectpt = array();
        // foreach ($hasil[1] as $record){
    
        //     $projectpt = new Hrd_Models_Master_Projectpt_ProjectPt();
        //     $projectpt->setArrayTable($record);
        //     $ids[] = $projectpt->getProjectPt_id();
        // }
        // $allprojectpt_forsp = implode(", ", $ids);

        // $post_data['projectpt_id_default'] = $allprojectpt_forsp;
        

        //added by anas 22062022
        if($post_data['report_type'] == "survey")
        {
            $result = $obj->exceldataSurvey2($post_data);  
        }
        else
        {
            $result = $obj->exceldata($post_data);              
        }

        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($result));
        
    }

}

?>
