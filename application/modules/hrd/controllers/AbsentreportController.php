<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_AbsentreportController extends Box_Models_App_Hermes_AbstractController {

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

    public function excelformateRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $params = $this->getAppData();
        
        $month = intval(date("m", strtotime($params["start_date"])));
        $year = intval(date("Y", strtotime($params["start_date"])));


        $dao = new Hrd_Models_AbsentDao();
        $all = $dao->getAbsentReportFormatE($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $params["start_date"], $params["end_date"]);
        $all = $all[0];


        $ps = new Hrd_Models_Report_AbsentReportExcelFormatE($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($all, strtoupper(Box_Tools::indoMonthText($month)), $year);



        $msg = 'Export Excel';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function excelreportharianRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Report_AbsentReport();     
        
        $params = $this->getAppData();
        $month = intval(date("m", strtotime($params["start_date"])));
        $monthname = strtoupper(Box_Tools::indoMonthText($month));
        $year = intval(date("Y", strtotime($params["start_date"])));        
        
         // added by wulan sari 20200527
        if (!isset($params["include_other"])){
            $params["include_other"] = 0;
        }
        $params["include_other"] = $params["include_other"] == 'on'? 1:0;
        
        $result = $dao->getdataReportharian($params);
        $return = $obj->create_excel_rpt_harian($params,$result);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }
    
    // added by Michael 2021.06.25 
    public function excelreportharianmhlRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Report_AbsentReport();     
        
        $params = $this->getAppData();
        $month = intval(date("m", strtotime($params["start_date"])));
        $monthname = strtoupper(Box_Tools::indoMonthText($month));
        $year = intval(date("Y", strtotime($params["start_date"])));  
         // added by wulan sari 20200527
        if (!isset($params["include_other"])){
            $params["include_other"] = 0;
        }
        $params["include_other"] = $params["include_other"] == 'on'? 1:0;
        
        //added by anas 21122021
        if($params["format_laporan"] == "R")
        {
            $result = $dao->getdataReportharianmhlRekap($params);
            $return = $obj->create_excel_rpt_harianmhl_rekap($params,$result);
        }
        //end added by anas
        else
        {
            $result = $dao->getdataReportharianmhl($params);
            $return = $obj->create_excel_rpt_harianmhl($params,$result);
        }

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }
    // end added by Michael 2021.06.25 


    // added by Michael 2021.08.24 
    public function excelreportsickleaveRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Report_AbsentReport();     
        
        $params = $this->getAppData();
        $month = intval(date("m", strtotime($params["start_date"])));
        $monthname = strtoupper(Box_Tools::indoMonthText($month));
        $year = intval(date("Y", strtotime($params["start_date"])));        
        
         // added by wulan sari 20200527
        if (!isset($params["include_other"])){
            $params["include_other"] = 0;
        }
        $params["include_other"] = $params["include_other"] == 'on'? 1:0;
        
        $result = $dao->getdataReportsickleave($params);
        $return = $obj->create_excel_rpt_sickleave($params,$result);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function excelreportsickleaveattachRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Report_AbsentReport();     
        
        $params = $this->getAppData();
        $month = intval(date("m", strtotime($params["start_date"])));
        $monthname = strtoupper(Box_Tools::indoMonthText($month));
        $year = intval(date("Y", strtotime($params["start_date"])));        
        
         // added by wulan sari 20200527
        if (!isset($params["include_other"])){
            $params["include_other"] = 0;
        }
        $params["include_other"] = $params["include_other"] == 'on'? 1:0;
        
        $result = $dao->getdataReportsickleave($params);
        $return = $obj->create_excel_rpt_sickleaveattach($params,$result);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }
    // end added by Michael 2021.08.24 

    // added by michael 2021.11.19
    public function excelreportsanksiketerlambatanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Report_AbsentReport();     
        
        $params = $this->getAppData();
        $month = intval(date("m", strtotime($params["start_date"])));
        $monthname = strtoupper(Box_Tools::indoMonthText($month));
        $year = intval(date("Y", strtotime($params["start_date"])));        
        
         // added by wulan sari 20200527
        if (!isset($params["include_other"])){
            $params["include_other"] = 0;
        }
        $params["include_other"] = $params["include_other"] == 'on'? 1:0;
        
        $result = $dao->getdataReportsanksiketerlambatan($params);
        $return = $obj->create_excel_rpt_sanksiketerlambatan($params,$result);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function excelreportpermitRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Report_AbsentReport();     
        
        $params = $this->getAppData();
        $month = intval(date("m", strtotime($params["start_date"])));
        $monthname = strtoupper(Box_Tools::indoMonthText($month));
        $year = intval(date("Y", strtotime($params["start_date"])));        
        
         // added by wulan sari 20200527
        if (!isset($params["include_other"])){
            $params["include_other"] = 0;
        }
        $params["include_other"] = $params["include_other"] == 'on'? 1:0;
        
        $result = $dao->getdataReportpermit($params);
        $return = $obj->create_excel_rpt_permit($params,$result);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $return,
                "URL" => $return['directdata']
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }
    // end added by Michael 2021.11.19 


    public function createTmpforviewerRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $all = $dao->getAbsentReportFormatE($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $params["start_date"], $params["end_date"]);        
        $all = $all[0];
        $ps = new Hrd_Models_Report_AbsentReportExcelFormatE($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $month = intval(date("m", strtotime($params["start_date"])));
        $year = intval(date("Y", strtotime($params["start_date"])));
        $result = $ps->procesforViewer($all, strtoupper(Box_Tools::indoMonthText($month)), $year);
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $result,
                "URL" => null
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function lookemployeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $obj = new Hrd_Models_Master_Employee();

        //$this->setArrayTable($leave,$this->getAppData());
        $this->setArrayTable($obj, $this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->lookupemployee($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function initRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/hrd/report/';



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
        foreach ($hasil[1] as $record) {
            $employee = new Hrd_Models_Employee_Employee();
            $record = preg_replace('/[^\da-z ]/i', '', $record); //edit by wulan sari 20190311, untuk remove special char yang kadang bikin error
            $employee->setArrayTable($record);
            $allEmployee[] = $employee;
        }


        /// department list
        $dao = new Hrd_Models_Master_DepartmentDao();
        $hasil = $dao->getAllWOPL(new Hrd_Models_Master_Department());

        $allDepartment = array();
        foreach ($hasil[1] as $record) {

            $department = new Hrd_Models_Master_Department();
            $department->setArrayTable($record);
            $allDepartment[] = $department;
        }


        /// category list
        $dao = new Hrd_Models_Master_GroupDao();
        $groupFilter = new Hrd_Models_Master_Group();
        $groupFilter->setProject($this->getAppSession()->getProject());
        $groupFilter->setPt($this->getAppSession()->getPt());

        $hasil = $dao->getAllWoF($groupFilter);

        $allCategories = array();
        foreach ($hasil[1] as $record) {

            $category = new Hrd_Models_Master_Group();
            $category->setArrayTable($record);
            $allCategories[] = $category;
        }


        /// status list
        $allStatus = $genDao->getAllEmployeeStatus();
        $allStatusAr = array();
        if (is_array($allStatus)) {
            if (is_array($allStatus[0])) {
                foreach ($allStatus[0] as $row) {
                    $status = new Hrd_Models_Master_Status();
                    $status->setArrayTable($row);
                    $allStatusAr[] = $status;
                }
            }
        }

        /// division list
        $dao = new Hrd_Models_Master_DivisionDao();
        $hasil = $dao->getAll($this->getAppRequest(), new Hrd_Models_Master_Division());

        $allDivision = array();
        foreach ($hasil[1] as $record) {

            $division = new Hrd_Models_Master_Division();
            $division->setArrayTable($record);
            $allDivision[] = $division;
        }



        $otherAT = array(array(
                "AT_SICK" => Box_Config::ABSENTTYPE_SICK,
                "AT_PERMISSION" => Box_Config::ABSENTTYPE_PERMISSION,
                "AT_LEAVE" => Box_Config::ABSENTTYPE_LEAVE
        ));

        $dm->setHasil(array($pt, $project, $allDepartment, $allDivision, $allCategories, $allStatusAr, $otherAT, $allEmployee));

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    
    public function defaultdataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $params = $this->getAppData();
        $setup = new Hrd_Models_General_Setup();
        $rowuser = $setup->getUserdata();
        $month = intval(date("m", strtotime($params["start_date"])));
        $year = intval(date("Y", strtotime($params["start_date"])));
        $return = array(
                        "month"=>Box_Tools::indoMonthText($month),
                        "year"=>$year,
                        "user"=>$rowuser['user_fullname'],
                );
        
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "PARAM" => $return,
                "URL" => null
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }

}

?>
