<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';


ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_UploadtransactionController_BU extends Box_Models_App_Hermes_AbstractController {

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
        // $hasil = $dao->getAllWoPL($projectptFilter);
        $hasil = $dao->getAllWoPL_Upload($projectptFilter);

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

    public function get_employeeprojectptRead(){
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("employeeb", $hasil,FALSE);
        }
        return Box_Tools::instantRead(array(), array($hasil));
    }

    //------------------------------------------------------------------------------------------------------------
    //VIEW TABLE

    public function get_transaction_attendanceRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionAttendance($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                    
                    $total_attendance   = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_attendance => $item_attendance){
                            $total_attendance += $item_attendance['total_attendance']; 
                            $start_date_data = $item_attendance['start_date'];
                            $end_date_data = $item_attendance['end_date'];

                            $status_transfer = $item_attendance['status_transfer'];
                            $action_process = $item_attendance['action_process'];
                            $upload_check = $item_attendance['upload_check'];
                        }
                    }

                    if($total_attendance){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_attendance' => $total_attendance,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionAttendance($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                    
                
                $total_attendance = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_attendance => $item_attendance){
                        $total_attendance += $item_attendance['total_attendance']; 
                        $start_date_data = $item_attendance['start_date'];
                        $end_date_data = $item_attendance['end_date'];

                        $status_transfer = $item_attendance['status_transfer'];
                        $action_process = $item_attendance['action_process'];
                        $upload_check = $item_attendance['upload_check'];
                    }
                }
                if($total_attendance){
                        $datas[$i] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_attendance' => $total_attendance,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;
                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_overtimeRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionOvertime($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_overtime     = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_overtime => $item_overtime){
                            $total_overtime += $item_overtime['total_overtime']; 
                            $start_date_data = $item_overtime['start_date'];
                            $end_date_data = $item_overtime['end_date'];

                            $status_transfer = $item_overtime['status_transfer'];
                            $action_process = $item_overtime['action_process'];
                            $upload_check = $item_overtime['upload_check'];
                        }
                    }

                    if($total_overtime){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_overtime' => $total_overtime,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionOvertime($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_overtime     = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_overtime => $item_overtime){
                        $total_overtime += $item_overtime['total_overtime']; 
                        $start_date_data = $item_overtime['start_date'];
                        $end_date_data = $item_overtime['end_date'];

                        $status_transfer = $item_overtime['status_transfer'];
                        $action_process = $item_overtime['action_process'];
                        $upload_check = $item_overtime['upload_check'];
                    }
                }

                if($total_overtime){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_overtime' => $total_overtime,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;
                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_uangmakanRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionUangMakan($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_uang_makan   = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_uang_makan => $item_uang_makan){
                            $total_uang_makan += $item_uang_makan['total_uang_makan']; 
                            $start_date_data = $item_uang_makan['start_date'];
                            $end_date_data = $item_uang_makan['end_date'];

                            $status_transfer = $item_uang_makan['status_transfer'];
                            $action_process = $item_uang_makan['action_process'];
                            $upload_check = $item_uang_makan['upload_check'];
                        }
                    }

                    if($total_uang_makan){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_uang_makan' => $total_uang_makan,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionUangMakan($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_uang_makan   = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_uang_makan => $item_uang_makan){
                        $total_uang_makan += $item_uang_makan['total_uang_makan']; 
                        $start_date_data = $item_uang_makan['start_date'];
                        $end_date_data = $item_uang_makan['end_date'];

                        $status_transfer = $item_uang_makan['status_transfer'];
                        $action_process = $item_uang_makan['action_process'];
                        $upload_check = $item_uang_makan['upload_check'];
                    }
                }

                if($total_uang_makan){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_uang_makan' => $total_uang_makan,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_medicalclaimRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionMedicalClaim($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_medical_claim = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_medical_claim => $item_medical_claim){
                            $total_medical_claim += $item_medical_claim['total_medical_claim']; 
                            $start_date_data = $item_medical_claim['start_date'];
                            $end_date_data = $item_medical_claim['end_date'];

                            $status_transfer = $item_medical_claim['status_transfer'];
                            $action_process = $item_medical_claim['action_process'];
                            $upload_check = $item_medical_claim['upload_check'];
                        }
                    }

                    if($total_medical_claim){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_medical_claim' => $total_medical_claim,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionMedicalClaim($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_medical_claim = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_medical_claim => $item_medical_claim){
                        $total_medical_claim += $item_medical_claim['total_medical_claim']; 
                        $start_date_data = $item_medical_claim['start_date'];
                        $end_date_data = $item_medical_claim['end_date'];

                        $status_transfer = $item_medical_claim['status_transfer'];
                        $action_process = $item_medical_claim['action_process'];
                        $upload_check = $item_medical_claim['upload_check'];
                    }
                }

                if($total_medical_claim){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_medical_claim' => $total_medical_claim,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_unpaidleaveRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionUnpaidLeave($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_unpaid_leave = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_unpaid_leave => $item_unpaid_leave){
                            $total_unpaid_leave += $item_unpaid_leave['total_unpaid_leave']; 
                            $start_date_data = $item_unpaid_leave['start_date'];
                            $end_date_data = $item_unpaid_leave['end_date'];

                            $status_transfer = $item_unpaid_leave['status_transfer'];
                            $action_process = $item_unpaid_leave['action_process'];
                            $upload_check = $item_unpaid_leave['upload_check'];
                        }
                    }

                    if($total_unpaid_leave){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_unpaid_leave' => $total_unpaid_leave,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionUnpaidLeave($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_unpaid_leave = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_unpaid_leave => $item_unpaid_leave){
                        $total_unpaid_leave += $item_unpaid_leave['total_unpaid_leave']; 
                        $start_date_data = $item_unpaid_leave['start_date'];
                        $end_date_data = $item_unpaid_leave['end_date'];

                        $status_transfer = $item_unpaid_leave['status_transfer'];
                        $action_process = $item_unpaid_leave['action_process'];
                        $upload_check = $item_unpaid_leave['upload_check'];
                    }
                }

                if($total_unpaid_leave){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_unpaid_leave' => $total_unpaid_leave,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_cutibesarRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionCutiBesar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);

                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){

                            $start_date_data = $get[0]['start_date'];
                            $end_date_data = $get[0]['end_date'];
                            $status_transfer = $get[0]['status_transfer'];
                            $action_process = $get[0]['action_process'];
                            $upload_check = $get[0]['upload_check'];

                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        // 'hire_date'     => $item_emp['statusinformation_hire_date']
                                        'hire_date'     => $get[0]['hire_date'],
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionCutiBesar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    
                    $start_date_data = $get[0]['start_date'];
                    $end_date_data = $get[0]['end_date'];

                    $status_transfer = $get[0]['status_transfer'];
                    $action_process = $get[0]['action_process'];
                    $upload_check = $get[0]['upload_check'];

                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        // 'hire_date'     => $item_emp['statusinformation_hire_date']
                                        'hire_date'     => $get[0]['hire_date'],
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );

                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                            $i++;
                        }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_saldocutibayarRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, 'No');
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionSaldoCutiBayar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_saldocuti_bayar = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_saldocuti_bayar => $item_saldocuti_bayar){
                            $total_saldocuti_bayar += $item_saldocuti_bayar['total_saldocuti_bayar']; 
                            $start_date_data = $item_saldocuti_bayar['start_date'];
                            $end_date_data = $item_saldocuti_bayar['end_date'];

                            $status_transfer = $item_saldocuti_bayar['status_transfer'];
                            $action_process = $item_saldocuti_bayar['action_process'];
                            $upload_check = $item_saldocuti_bayar['upload_check'];
                        }
                    }

                    if($total_saldocuti_bayar){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_saldocuti_bayar' => $total_saldocuti_bayar,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, 'No');
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionSaldoCutiBayar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_saldocuti_bayar = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_saldocuti_bayar => $item_saldocuti_bayar){
                        $total_saldocuti_bayar += $item_saldocuti_bayar['total_saldocuti_bayar']; 
                        $start_date_data = $item_saldocuti_bayar['start_date'];
                        $end_date_data = $item_saldocuti_bayar['end_date'];

                        $status_transfer = $item_saldocuti_bayar['status_transfer'];
                        $action_process = $item_saldocuti_bayar['action_process'];
                        $upload_check = $item_saldocuti_bayar['upload_check'];
                    }
                }

                if($total_saldocuti_bayar){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_saldocuti_bayar' => $total_saldocuti_bayar,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_potongantransportRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionPotonganTransport($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_potongan_transport = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_potongan_transport => $item_potongan_transport){
                            $total_potongan_transport += $item_potongan_transport['total_potongan_transport']; 
                            $start_date_data = $item_potongan_transport['start_date'];
                            $end_date_data = $item_potongan_transport['end_date'];

                            $status_transfer = $item_potongan_transport['status_transfer'];
                            $action_process = $item_potongan_transport['action_process'];
                            $upload_check = $item_potongan_transport['upload_check'];
                        }
                    }

                    if($total_potongan_transport){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_potongan_transport' => $total_potongan_transport,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionPotonganTransport($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_potongan_transport = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_potongan_transport => $item_potongan_transport){
                        $total_potongan_transport += $item_potongan_transport['total_potongan_transport']; 
                        $start_date_data = $item_potongan_transport['start_date'];
                        $end_date_data = $item_potongan_transport['end_date'];

                        $status_transfer = $item_potongan_transport['status_transfer'];
                        $action_process = $item_potongan_transport['action_process'];
                        $upload_check = $item_potongan_transport['upload_check'];
                    }
                }

                if($total_potongan_transport){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_potongan_transport' => $total_potongan_transport,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function get_transaction_saldocutiminusRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id,
                    'employee_id'       => ''
                );

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $payroll_month = $data['payroll_month'];
        $payroll_year = $data['payroll_year'];
        $datas = '';
        $start_date_data = '';
        $end_date_data = '';

        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => ''
                );
                $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, 'No');
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
                $i = 1;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionSaldoCutiMinus($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year);
                    
                    $total_saldocuti_minus = 0;
                    $sisa_cuti = 0;
                    $start_date_data    = '';
                    $end_date_data      = '';
                    $status_transfer    = '';
                    $action_process     = '';
                    $upload_check       = '';

                    if($get){
                        foreach($get as $key_saldocuti_minus => $item_saldocuti_minus){
                            $total_saldocuti_minus += $item_saldocuti_minus['total_saldocuti_minus']; 
                            $sisa_cuti += $item_saldocuti_minus['sisa_cuti'];
                            $start_date_data = $item_saldocuti_minus['start_date'];
                            $end_date_data = $item_saldocuti_minus['end_date'];

                            $status_transfer = $item_saldocuti_minus['status_transfer'];
                            $action_process = $item_saldocuti_minus['action_process'];
                            $upload_check = $item_saldocuti_minus['upload_check'];
                        }
                    }

                    if($total_saldocuti_minus){
                            $datas[] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['upload_employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_department_id'],
                                        'department'    => $item_emp['department_department'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'sisa_cuti'     => $sisa_cuti,
                                        'start_date'    => $start_date_data,
                                        'end_date'      => $end_date_data,
                                        'total_saldocuti_minus' => $total_saldocuti_minus,
                                        'status_transfer'  => $status_transfer,
                                        'action_process'   => $action_process,
                                        'upload_check'     => $upload_check
                                    );
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil_emp = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, 'No');
            $emp = $hasil_emp[1];

            $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
            $dao_res = new Hrd_Models_Upload_UploadtransactionDao();
            $i = 0;

            foreach($emp as $key_emp => $item_emp){
                $get = $dao_res->getTransactionSaldoCutiMinus($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['upload_employee_id'],$item_emp['nik_group'],$start_date,$end_date,$payroll_month,$payroll_year,$item_emp['project_id'],$item_emp['pt_id']);
                
                $total_saldocuti_minus = 0;
                $sisa_cuti = 0;
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';

                if($get){
                    foreach($get as $key_saldocuti_minus => $item_saldocuti_minus){
                        $total_saldocuti_minus += $item_saldocuti_minus['total_saldocuti_minus']; 
                        $sisa_cuti += $item_saldocuti_minus['sisa_cuti'];
                        $start_date_data = $item_saldocuti_minus['start_date'];
                        $end_date_data = $item_saldocuti_minus['end_date'];

                        $status_transfer = $item_saldocuti_minus['status_transfer'];
                        $action_process = $item_saldocuti_minus['action_process'];
                        $upload_check = $item_saldocuti_minus['upload_check'];
                    }
                }

                if($total_saldocuti_minus){
                        $datas[] = array(
                                    'project_id'    => $item_emp['project_id'],
                                    'project_name'  => $item_emp['project_name'],
                                    'pt_id'         => $item_emp['pt_id'],
                                    'pt_name'       => $item_emp['pt_name'],
                                    'employee_id'   => $item_emp['upload_employee_id'],
                                    'employee_name' => $item_emp['employee_name'],
                                    'department_id' => $item_emp['department_department_id'],
                                    'department'    => $item_emp['department_department'],
                                    'nik_group'     => $item_emp['nik_group'],
                                    'sisa_cuti'     => $sisa_cuti,
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'total_saldocuti_minus' => $total_saldocuti_minus,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process,
                                    'upload_check'     => $upload_check
                                );

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$data);

                                    $datas[$i]['code'] = $code_cherry;

                        $i++;
                    }
            }
            
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    // public function get_lastprocessidRead(){

    //     $data = $this->getAppData();
    //     $process_api = $data['process_api'];
    //     $process_api_model = $data['process_api_model'];

    //     $em = new Hrd_Models_Transferapi_Transferapimaster();
    //     $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
    //     $get = $dao->getLastProcessId($this->getAppRequest(), $em, $this->getAppSession(),$data);
    //     $hasil = $get + 1;
        
    //     $arrayRespon = array("HASIL" => $hasil);
    //     return Box_Tools::instantRead($arrayRespon);
    // }

    // public function checkdata_masterRead(){

    //     $data = $this->getAppData();
    //     $process_api = $data['process_api'];
    //     $process_api_model = $data['process_api_model'];
    //     $model = 'getMasterCheck';
    //     $em = new Hrd_Models_Transferapi_Transferapimaster();
    //     $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
    //     $get = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data);
    //     $hasil = $get[0];
        
    //     if($hasil){
    //         $action_to_cherry = 'update';
    //     }else{
    //         $action_to_cherry = 'insert';
    //     }
        
    //     $arrayRespon = array("ACTION_TO_CHERRY" => $action_to_cherry, "HASIL" => $hasil);
    //     return Box_Tools::instantRead($arrayRespon);
    // }

    // public function save_masterRead(){

    //     $data = $this->getAppData();
    //     $process_api = $data['process_api'];
    //     $process_api_model = $data['process_api_model'];
    //     $jsonString = json_decode($data['jsonString'], true);
    //     $jsonStringResult = json_decode($data['jsonStringResult'], true);

    //     $model = 'saveMaster';
    //     $em = new Hrd_Models_Transferapi_Transferapimaster();
    //     $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
    //     $hasil = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
    //     if(!empty($hasil) && $hasil > 0){
    //         $msg = 'berhasil';
    //     }else{
    //         $msg = '';
    //     }

    //     $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
    //     return Box_Tools::instantRead($arrayRespon);
    // }

    // public function get_masterRead(){

    //     $data = $this->getAppData();
    //     $lastprocessid = $data['lastprocessid'];
    //     $process_api = $data['process_api'];
    //     $process_api_model = $data['process_api_model'];
    //     $value = $data['value'];

    //     $em = new Hrd_Models_Transferapi_Transferapimaster();
    //     $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
    //     $get = $dao->getMaster($this->getAppRequest(), $em, $this->getAppSession(),$data);

    //     $hasil = '';
    //     $i = 0;
        
    //     if($get[0]){
    //         foreach($get[0] as $key_emp => $item_emp){
    //             if($value == 'dept'){
    //                 $datas[] = array(
    //                             'status_transfer' => $item_emp['status_transfer'],
    //                             'department_id' => $item_emp['department_id'],
    //                             'department'    => $item_emp['department_name'],
    //                             'project_id'    => $item_emp['project_id'],
    //                             'project_name'  => $item_emp['project_name'],
    //                             'pt_id'         => $item_emp['pt_id'],
    //                             'pt_name'       => $item_emp['pt_name'],
    //                             'code'          => $item_emp['department_code']
    //                         );
    //             }
    //             elseif($value == 'banding'){
    //                 $datas[] = array(
    //                             'status_transfer' => $item_emp['status_transfer'],
    //                             'banding_id'    => $item_emp['banding_id'],
    //                             'banding'       => $item_emp['banding_name'],
    //                             'code'          => $item_emp['banding_code']
    //                         );
    //             }
    //             elseif($value == 'group'){
    //                 $datas[] = array(
    //                             'status_transfer' => $item_emp['status_transfer'],
    //                             'group_id'      => $item_emp['group_id'],
    //                             'group'         => $item_emp['group_name'],
    //                             'project_id'    => $item_emp['project_id'],
    //                             'project_name'  => $item_emp['project_name'],
    //                             'pt_id'         => $item_emp['pt_id'],
    //                             'pt_name'       => $item_emp['pt_name'],
    //                             'code'          => $item_emp['group_code']
    //                         );
    //             }
    //             elseif($value == 'jobfamily'){
    //                 $datas[] = array(
    //                             'status_transfer' => $item_emp['status_transfer'],
    //                             'jobfamily_id'  => $item_emp['jobfamily_id'],
    //                             'jobfamily'     => $item_emp['jobfamily_name'],
    //                             'code'          => $item_emp['jobfamily_code']
    //                         );
    //             }
    //             elseif($value == 'position'){
    //                 $datas[] = array(
    //                             'status_transfer' => $item_emp['status_transfer'],
    //                             'position_id'  => $item_emp['position_id'],
    //                             'position'     => $item_emp['position_name'],
    //                             'description'  => $item_emp['position_description']
    //                         );
    //             }
    //             elseif($value == 'employee'){
    //                 $datas[] = array(
    //                                     'status_transfer'                           => $item_emp['status_transfer'],
    //                                     'project_id'                                => $item_emp['project_id'],
    //                                     'project_name'                              => $item_emp['project_name'],
    //                                     'pt_id'                                     => $item_emp['pt_id'],
    //                                     'pt_name'                                   => $item_emp['pt_name'],
    //                                     'nik_group'                                 => $item_emp['nik_group'],
    //                                     'employee_id'                               => $item_emp['employee_id'],
    //                                     'employee_nik'                              => $item_emp['employee_nik'],
    //                                     'employee_name'                             => $item_emp['employee_name'],
    //                                     'sex'                                       => $item_emp['sex'],
    //                                     'birth_date'                                => $item_emp['birth_date'],
    //                                     'birth_place'                               => $item_emp['birth_place'],
    //                                     'id_type'                                   => $item_emp['id_type'],
    //                                     'ktp_number'                                => $item_emp['ktp_number'],
    //                                     'marriagestatus_marriagestatus_id'          => $item_emp['marriagestatus_marriagestatus_id'],
    //                                     'marriagestatus_marriagestatus'             => $item_emp['marriagestatus_marriagestatus'],
    //                                     'nationality'                               => $item_emp['nationality'],
    //                                     'npwp'                                      => $item_emp['npwp'],
    //                                     'ptkp'                                      => $item_emp['ptkp'],
    //                                     'department_department_id'                  => $item_emp['department_department_id'],
    //                                     'department_department'                     => $item_emp['department_department'],
    //                                     'banding_banding_id'                        => $item_emp['banding_banding_id'],
    //                                     'banding_banding'                           => $item_emp['banding_banding'],
    //                                     'group_group_id'                            => $item_emp['group_group_id'],
    //                                     'group_code'                                => $item_emp['group_code'],
    //                                     'position_position_id'                      => $item_emp['position_position_id'],
    //                                     'position_position'                         => $item_emp['position_position'],
    //                                     'email_ciputra'                             => $item_emp['email_ciputra'],
    //                                     'phone_number'                              => $item_emp['phone_number'],
    //                                     'employeestatus_employeestatus_id'          => $item_emp['employeestatus_employeestatus_id'],
    //                                     'employeestatus_employeestatus'             => $item_emp['employeestatus_employeestatus'],
    //                                     'statusinformation_hire_date'               => $item_emp['statusinformation_hire_date'],
    //                                     'statusinformation_contract_end'            => $item_emp['statusinformation_contract_end'],
    //                                     'payroll_group'                             => $item_emp['payroll_group'],
    //                                     'ktp_address'                               => $item_emp['ktp_address'],
    //                                     'address'                                   => $item_emp['address'],
    //                                     'payroll_currency'                          => $item_emp['payroll_currency'],
    //                                     'payment_method'                            => $item_emp['payment_method'],
    //                                     'bank_rekening'                             => $item_emp['bank_rekening'],
    //                                     'nomor_rekening'                            => $item_emp['nomor_rekening'],
    //                                     'nama_rekening'                             => $item_emp['nama_rekening'],
    //                                     'calendar_company'                          => $item_emp['calendar_company'],
    //                                     'work_shift'                                => $item_emp['work_shift'],
    //                                     'tax_country_code'                          => $item_emp['tax_country_code'],
    //                                     'fingerprintcode'                           => $item_emp['fingerprintcode'],
    //                                     'cost_center_code'                          => $item_emp['cost_center_code'],
    //                                     'no_bpjs_k'                                 => $item_emp['no_bpjs_k'],
    //                                     'no_bpjs_kk'                                => $item_emp['no_bpjs_kk'],
    //                                     'no_bpjs_pp'                                => $item_emp['no_bpjs_pp'],
    //                                     'no_manulife_p'                             => $item_emp['no_manulife_p'],
    //                                     'no_asuransi'                               => $item_emp['no_asuransi'],
    //                                     'worklocation_id'                           => $item_emp['worklocation_id'],
    //                                     'worklocation'                              => $item_emp['worklocation'],
    //                                     'worklocation_project_id'                   => $item_emp['worklocation_project_id'],
    //                                     'worklocation_project'                      => $item_emp['worklocation_project'],
    //                                     'worklocation_pt_id'                        => $item_emp['worklocation_pt_id'],
    //                                     'worklocation_pt'                           => $item_emp['worklocation_pt'],
    //                                     'ibu_kandung'                               => $item_emp['ibu_kandung']
    //                                     // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
    //                                     // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
    //                                     // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
    //                                 );
    //             }
    //             else{
    //                 $opsi = '';
    //             }

    //             $i++;
    //         }
    //         $hasil[0][0]['totalRow'] = $i;
    //         $hasil[1]= $datas;
    //     }
        
    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     if($value == 'dept'){
    //         $dataList = new Box_Models_App_DataListCreator('', 'department', array(),array());
    //     }
    //     elseif($value == 'banding'){
    //         $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
    //     }
    //     elseif($value == 'group'){
    //         $dataList = new Box_Models_App_DataListCreator('', 'group', array(),array());
    //     }
    //     elseif($value == 'jobfamily'){
    //         $dataList = new Box_Models_App_DataListCreator('', 'jobfamily', array(),array());
    //     }
    //     elseif($value == 'position'){
    //         $dataList = new Box_Models_App_DataListCreator('', 'position', array(),array());
    //     }
    //     elseif($value == 'employee'){
    //         $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array(),array());
    //     }else{
    //         $dataList = '';
    //     }

    //     $dm->setDataList($dataList);
    //     $dm->setHasil($hasil);

    //     return $dm;
    // }

    // public function get_master_masterRead(){
        
    //     $hasil = '';
    //     $data = $this->getAppData();
    //     $projectpt_id           = $data['projectpt_id'];
    //     $employee_id            = $data['employee_id'];
    //     $process_api            = $data['process_api'];
    //     $process_api_model      = $data['process_api_model'];

    //     $master_dept = $this->get_master_deptRead();
    //     $master_dept = $master_dept->getHasil();
        
    //     print_r($master_dept);die();
        
    //     return $hasil;
    // }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    
    public function exportdataRead() {
        $data = $this->getAppData();
        $obj = new Hrd_Models_Transferapi_TransferapimasterExport();
        $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));

        // print_r($post_data);die();
        
        $result = $obj->exceldata($post_data);  
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($result));
        
    }

    // public function exportdataRead() {
    //     $obj = new Hrd_Models_Report_Exporttraining();
    //     //$post_data = Zend_Json::decode($_POST['data']);
    //     $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));

    //     /// projectpt list
    //     $dao = new Hrd_Models_Master_Projectpt_Dao();
    //     $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
    //     $projectptFilter->setUserid($this->getAppSession()->getUserId());
    //     $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
    //     $hasil = $dao->getAllWoPL($projectptFilter);

    //     $allprojectpt = array();
    //     foreach ($hasil[1] as $record){
    
    //         $projectpt = new Hrd_Models_Master_Projectpt_ProjectPt();
    //         $projectpt->setArrayTable($record);
    //         $ids[] = $projectpt->getProjectPt_id();
    //     }
    //     $allprojectpt_forsp = implode(", ", $ids);

    //     $post_data['projectpt_id_default'] = $allprojectpt_forsp;
    //     $result = $obj->exceldata($post_data);  
    //     $hasil = TRUE;
    //     $arrayRespon = array(
    //         "HASIL" => $hasil);
    //     return Box_Tools::instantRead($arrayRespon, array($result));
        
    // }

    public function uploadexcelRead() {
        $app = new Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $data = $this->getAppData();

        $fileName = $data["file_name"];
        $upload = new Hrd_Models_Upload_UploadtransactionExcel();
    
        $success = $upload->process_upload($fileName, $this->getAppSession(),$data);
        // print_r($success);die();
        if ($success == 'TRUE') {
            $success = TRUE;
            $msg = "Success";

        }elseif($success['salah_di']){
            $implode = implode(', ', $success['salah_no']);
            if($success['salah_di'] == 'date'){
                $salah = 'StartDate dan EndDate';
                $salah_add = 'Silahkan disamakan dengan pemilihan Periode saat process.';
            }elseif($success['salah_di'] == 'payroll'){
                $salah = 'Payroll Process';
                $salah_add = 'Silahkan disamakan dengan pemilihan Periode saat process.';
            }elseif($success['salah_di'] == 'projectpt'){
                $salah = 'Project dan Pt';
                $salah_add = 'Silahkan disamakan dengan pemilihan Projectpt saat process.';
            }elseif($success['salah_di'] == 'employee'){
                $salah = 'Employee';
                $salah_add = 'Silahkan upload terlebih dahulu Master Employee-nya.';
            }else{
                $salah = '';
            }
            $success = FALSE;
            $msg = "Silahkan cek kembali ".$salah." pada data No. (".$implode."). ".$salah_add;
        }else {
            $success = FALSE;
            $msg = "Error pada saat proses database";
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    // INI UNTUK UPLOAD FILENYA
    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];

        $chooseUpload = $data["choose"];
      
        $fileName = "";
        $fileUpload = NULL;

        if ($modeUpload == "dokumen") {
            $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/cherry/dokumen/".$chooseUpload."/", $chooseUpload."_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_" . time(), "xlsx");


            $fileUpload->run();
            if (!$fileUpload->isSuccess()) {
                $msg = $fileUpload->getErrorMsg();
            } else {
                $success = TRUE;
                $fileName = $fileUpload->getFileName();
                $msg = $fileName;
            }
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //----------------------------------------------------------------------------------------------------------------
    //PROCESS CHERRY

    //cek employee
    public function cek_master_employeeRead(){

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
        $data = $this->getAppData();

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $project_id = $projectpt['project_id'];
        $project_name = $projectpt['project_name'];
        $data['ptpt_id'] = $pt_id;
        $data['pt_name'] = $pt_name;
        $data['project_id'] = $project_id;
        $data['project_name'] = $project_name;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        $hasil = $dao->cekMasterEmployee($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $hasil[0];

        if($hasil){
            $msg = 'ada';
        }else{
            $msg = 'kosong';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //LAST PROCESS ID
    public function lastprocessidRead(){

        $data = $this->getAppData();   
        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        $data['process_api'] = $type;

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $get = $dao->getLastProcessId($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get + 1;

        $arrayRespon = array("lastprocessid" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    //CHECK PRODUCTIVITY FORM
    public function get_productivity_formRead(){

        $data = $this->getAppData();
        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $project_id = $projectpt['project_id'];
        $project_name = $projectpt['project_name'];
        $data['choose_ptpt'] = $pt_id;
        $data['pt_name'] = $pt_name;
        $data['project_id'] = $project_id;
        $data['project_name'] = $project_name;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $need_input_cherry = '';
        $need_input_cherry_detail = '';


            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            $get_productivity_form_code = $dao->getProductivityFormCode($em,$company_code);

            if(empty($get_productivity_form_code[0])){
                $need_input_cherry_detail = array(
                                                'attendance_desc'           => 'Attendance',
                                                'attendance_formula'        => 'AT',
                                                'overtime_desc'             => 'Overtime',
                                                'overtime_formula'          => 'OT',
                                                'uangmakanlembur_desc'      => 'Uang Makan Lembur',
                                                'uangmakanlembur_formula'   => 'UML',
                                                'medicalclaim_desc'         => 'Medical Claim Internal',
                                                'medicalclaim_formula'      => 'MCI',
                                                'unpaidleave_desc'          => 'Unpaid Leave',
                                                'unpaidleave_formula'       => 'UL',
                                                'cutibesar_desc'            => 'Cuti Besar',
                                                'cutibesar_formula'         => 'CB',
                                                'saldocutidibayarkan_desc'  => 'Saldo Cuti Dibayarkan',
                                                'saldocutidibayarkan_formula' => 'SCD',
                                                'potongantransport_desc'    => 'Potongan Transport',
                                                'potongantransport_formula' => 'PT',
                                                'saldocutiminus_desc'       => 'Saldo Cuti Minus',
                                                'saldocutiminus_formula'    => 'SCM'
                                        );

                $need_input_cherry[] = array(
                                                'company_code'              => $company_code,
                                                'name'                      => 'Transaction',
                                                'formkeyproperty'           => 'Date',
                                                'detail'                    => $need_input_cherry_detail
                                        );

            }

        
        

        $arrayRespon = array("need_input_cherry" => $need_input_cherry);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_productivity_form_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $hasil = '';

        $hasil_head = $dao->saveProductivityFormBeforeApi($em, $this->getAppSession(),$jsonString);
        $hasil['head'] = $hasil_head;
        $hasil_detail = $dao->saveProductivityFormDetailBeforeApi($em, $this->getAppSession(),$jsonString);
        $hasil['detail'] = $hasil_detail;
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $hasil = $hasil;
        }else{
            $msg = '';
            $hasil = '';
        }

        $arrayRespon = array("hasil" => $hasil,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_productivity_form_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        $result = json_decode($data['result_id'], true);
        $data['result_id'] = $result;

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $hasil = '';

        $hasil_head = $dao->updateProductivityFormAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);
        $hasil['head'] = $hasil_head;
        $hasil_detail = $dao->updateProductivityFormDetailAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);
        $hasil['detail'] = $hasil_detail;

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $hasil = $hasil;
        }else{
            $msg = '';
            $hasil = '';
        }

        $arrayRespon = array("hasil" => $hasil,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //GET DATA
    public function get_dataRead(){

        $data = $this->getAppData();

        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        $type = 'get_transaction_'.$type.'Read';
        
        $data = $this->$type();    

        return $data;
    }

    public function save_beforesubmitRead(){

        $data = $this->getAppData();

        $em = new Hrd_Models_Upload_Uploadtransaction();
        $dao = new Hrd_Models_Upload_UploadtransactionDao();

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $data['ptpt_id'] = $pt_id;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        //companycode
        $get_company = $dao->getCompany($this->getAppSession(),$pt_id);
        $data['company_code'] = $get_company[0][0]['company_code'];

        $save = $dao->saveUploadBeforeAPI($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $save;
        
        if($hasil['hasil']){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("message" => $message, "hasil" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

//--------------------------------------------------------------------------------------------------------------------
    // CHERRY PAYROLL PERIODE
    public function companycodecherryRead(){

        
        $data = $this->getAppData();

        $em = new Hrd_Models_Upload_Uploadtransaction();
        $dao = new Hrd_Models_Upload_UploadtransactionDao();

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        
        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();

        $result = '';

        $get_company_code = $dao->getCompanyCode($em, $pt_id);

        if($get_company_code){
            $result['company_code'] = $get_company_code[1][0]['company_code'];
        }else{
            $result['company_code'] = '';
        }
        
        $arrayRespon = array("HASIL" => $result);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function cherryCutOffDateRead(){

        $data = $this->getAppData();

        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $hasil = '';

        $getcutoffdate = $jsonStringResult['AttendanceCutOffDate'];
        $explode_cutoffdate = explode('(', $getcutoffdate);
        $explode_cutoffdate_back = explode(')', $explode_cutoffdate[1]);

        $getcutoffdate_number = $explode_cutoffdate_back[0];

        $seconds = $getcutoffdate_number / 1000;
        $cutoffdate = date("Y-m-d", $seconds);
        $cutoffdate = date("Y-m-d", strtotime($cutoffdate . ' +1 day'));

        $param['Code'] = $jsonStringResult['Code'];
        $param['CompanyCode'] = $jsonStringResult['CompanyCode'];
        $param['TypeCode'] = $jsonStringResult['TypeCode'];
        $param['Month'] = $jsonStringResult['Month'];
        $param['Year'] = $jsonStringResult['Year'];
        $param['Name'] = $jsonStringResult['Name'];
        $param['CutOffDate'] = $cutoffdate;

        $save_payroll_period = $dao->savePayrollPeriode($em, $this->getAppSession(),$param);

        if(!empty($save_payroll_period)){
            $msg = 'berhasil';
            $hasil = $save_payroll_period;
        }else{
            $msg = '';
            $hasil = '';
        }

        $arrayRespon = array("hasil" => $hasil,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getcherryCutOffDateRead(){

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $data = $this->getAppData();

        $result = '';

        $getCutOffDate = $dao->getCutOffDate($em, $data);
        
        if($getCutOffDate){
            $result['cutoffdate'] = $getCutOffDate[0][0]['cutoffdate'];
        }else{
            $result['cutoffdate'] = '';
        }
        
        $arrayRespon = array("HASIL" => $result);
        return Box_Tools::instantRead($arrayRespon);

    }
//--------------------------------------------------------------------------------------------------------------------

    public function update_transactionRead(){

        $em = new Hrd_Models_Upload_Uploadtransaction();
        $dao = new Hrd_Models_Upload_UploadtransactionDao();
        $data = $this->getAppData();
        // $process_api = $data['process_api'];
        // $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $data['ptpt_id'] = $pt_id;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        //TESTING
        // $jsonStringResult['Code'] = '123abc';
        // $jsonStringResult['InsertStamp'] = '/Date(1604633886101)/';
        // $jsonStringResult['UpdateStamp'] = '/Date(1604633886101)/';
        // $data['result_status'] = 'success';
        // $data['result_status_message'] = 'success_message';
        // $jsonStringResult['DetailList'][0]['Code'] = '123abc_dtl';
        //TESTING

        $hasil = $dao->updateTransaction($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = '';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //remove data di cherry yang sekarang udah gak dipakai
    public function checkdata_removecherryRead(){

        $data = $this->getAppData();

        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        if($type == 'department'){
            $type = 'dept';
        }else{
            $type = $type;
        }

        $data['value'] = $type;

        $em = new Hrd_Models_Upload_Uploadtransaction();
        $dao = new Hrd_Models_Upload_UploadtransactionDao();

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $project_id = $projectpt['project_id'];
        $project_name = $projectpt['project_name'];
        $data['ptpt_id'] = $pt_id;
        $data['pt_name'] = $pt_name;
        $data['project_id'] = $project_id;
        $data['project_name'] = $project_name;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        //companycode
        $get_company = $dao->getCompany($this->getAppSession(),$pt_id);
        $data['company_code'] = $get_company[0][0]['company_code'];

        //query
        $hasil = '';
        $get_removecherry = $dao->getDataRemoveCherry($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $get = $get_removecherry[1];

        $i = 0;

        if($get){
            foreach($get as $key => $item){
                $start_date_data    = '';
                $end_date_data      = '';
                $status_transfer    = '';
                $action_process     = '';
                $upload_check       = '';
                        
                $start_date_data = $item['start_date'];
                $end_date_data = $item['end_date'];

                $status_transfer = $item['status_transfer'];
                $action_process = $item['action_process'];

                $datas[] = array(
                                    'project_id'    => $item['project_id'],
                                    'project_name'  => $item['project_name'],
                                    'pt_id'         => $item['pt_id'],
                                    'pt_name'       => $item['pt_name'],
                                    'employee_id'   => $item['upload_employee_id'],
                                    'employee_name' => $item['employee_name'],
                                    'department_id' => $item['department_id'],
                                    'department'    => $item['department'],
                                    'nik_group'     => $item['nik_group'],
                                    'start_date'    => $start_date_data,
                                    'end_date'      => $end_date_data,
                                    'status_transfer'  => $status_transfer,
                                    'action_process'   => $action_process
                        );

                        $choose_type = $data['choose_type'];
                        $explode_type = explode('_', $choose_type);
                        $type = $explode_type[1];

                        if($type == 'attendance'){

                            $datas[$i]['total_attendance'] = $item['total_attendance'];

                        }elseif($type == 'overtime'){

                            $datas[$i]['total_overtime'] = $item['total_overtime'];

                        }elseif($type == 'uangmakan'){

                            $datas[$i]['total_uang_makan'] = $item['total_uang_makan'];

                        }elseif($type == 'medicalclaim'){

                            $datas[$i]['total_medical_claim'] = $item['total_medical_claim'];

                        }elseif($type == 'cutibesar'){
                            
                            $datas[$i]['hire_date'] = $item['hire_date'];

                        }elseif($type == 'unpaidleave'){

                            $datas[$i]['total_unpaid_leave'] = $item['total_unpaid_leave'];

                        }elseif($type == 'potongantransport'){

                            $datas[$i]['total_potongan_transport'] = $item['total_potongan_transport'];

                        }elseif($type == 'saldocutibayar'){

                            $datas[$i]['total_saldocuti_bayar'] = $item['total_saldocuti_bayar'];

                        }elseif($type == 'saldocutiminus'){

                            $datas[$i]['sisa_cuti'] = $item['sisa_cuti'];
                            $datas[$i]['total_saldocuti_minus'] = $item['total_saldocuti_minus'];
                            
                        }

                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item,$data);

                                    $datas[$i]['code'] = $code_cherry;
                        $i++;
            
                }
            
                $hasil[0][0]['totalRow'] = $i;
                $hasil[1]= $datas;
            }


        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function update_transaction_removeRead(){

        $em = new Hrd_Models_Upload_Uploadtransaction();
        $dao = new Hrd_Models_Upload_UploadtransactionDao();
        $data = $this->getAppData();
        // $process_api = $data['process_api'];
        // $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $data['ptpt_id'] = $pt_id;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        //TESTING
        // $jsonStringResult['Code'] = '123abc';
        // $jsonStringResult['InsertStamp'] = '/Date(1604633886101)/';
        // $jsonStringResult['UpdateStamp'] = '/Date(1604633886101)/';
        // $data['result_status'] = 'success';
        // $data['result_status_message'] = 'success_message';
        // $jsonStringResult['DetailList'][0]['Code'] = '123abc_dtl';
        //TESTING

        $hasil = $dao->updateTransaction($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        $hasil_remove = $dao->updateTransactionRemove($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = '';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //--------------------------------------------------------------------------------------------------------------------
    // GET CODE
    public function codecherry($item_emp,$data_param){

        if (array_key_exists("choose_type",$data_param)){
            $choose_type = $data_param['choose_type'];
            $explode_type = explode('_', $choose_type);
            $choose = $explode_type[1];
        }elseif(array_key_exists("choose",$data_param)){
            $choose_type = $data_param['choose'];
            $explode_type = explode('_', $choose_type);
            $choose = $explode_type[1];
        }else{
            $choose = '';
        }

        $em = new Hrd_Models_Upload_Uploadtransaction();
        $dao = new Hrd_Models_Upload_UploadtransactionDao();

        //PT ID
        $data_projectpt['choose_projectpt'] = $data_param['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        $projectpt = $get_projectpt[1][0];
        $pt_id = $projectpt['pt_id'];
        $pt_name = $projectpt['pt_name'];
        $data['ptpt_id'] = $pt_id;
        $data['subholding_subname'] = $projectpt['subholding_subname'];

        //companycode
        $get_company = $dao->getCompany($this->getAppSession(),$pt_id);
        $company_code = $get_company[0][0]['company_code'];

        $data = '';

        //employee_code
        $get_employee_code = $dao->getEmployeeCode($em, $item_emp);
        if($get_employee_code[0]){
            $data['employee_code'] = $get_employee_code[0][0]['code'];
        }else{
            $data['employee_code'] = '';
        }

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        

        //formproductivity master code
        $get_productivity_form_code = $dao->getProductivityFormCode($em,$company_code);
        if($get_productivity_form_code[0]){
            $data['productivity_form_code'] = $get_productivity_form_code[0][0]['code'];
        }else{
            $data['productivity_form_code'] = '';
        }

        //detail code
        $detail_opsi = $choose;

        if($detail_opsi == 'attendance'){
            $detailname = 'Attendance';
        }elseif($detail_opsi == 'overtime'){
            $detailname = 'Overtime';
        }elseif($detail_opsi == 'uangmakanlembur'){
            $detailname = 'Uang Makan Lembur';
        }elseif($detail_opsi == 'medicalclaim'){
            $detailname = 'Medical Claim Internal';
        }elseif($detail_opsi == 'unpaidleave'){
            $detailname = 'Unpaid Leave';
        }elseif($detail_opsi == 'cutibesar'){
            $detailname = 'Cuti Besar';
        }elseif($detail_opsi == 'saldocutibayar'){
            $detailname = 'Saldo Cuti Dibayarkan';
        }elseif($detail_opsi == 'potongantransport'){
            $detailname = 'Potongan Transport';
        }elseif($detail_opsi == 'saldocutiminus'){
            $detailname = 'Saldo Cuti Minus';
        }else{
            $detailname = '';
        }
        $get_productivitydetail_form_code = $dao->getProductivityFormDetailCode($em, $company_code, $data['productivity_form_code'], $detailname);
        if($get_productivitydetail_form_code[0]){
            $data['productivitydetail_form_code'] = $get_productivitydetail_form_code[0][0]['code'];
        }else{
            $data['productivitydetail_form_code'] = '';
        }
        
        return $data;

    }

    public function urlusernameRead(){

        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();

        //get url username CHERRY
        $get_urlusername = $dao->getUrlUsername($this->getAppRequest(), $em, $this->getAppSession());
        if($get_urlusername[0][0]['totalRow'] > 0){
            $url = $get_urlusername[1][0]['url'];
            $username = $get_urlusername[1][0]['username'];
            $password = $get_urlusername[1][0]['password'];
        }else{
            $url = '';
            $username = '';
            $password = '';
        }
        
        $arrayRespon = array("url" => $url, "username" => $username, "password" => $password);
        return Box_Tools::instantRead($arrayRespon);
    }
}

?>
