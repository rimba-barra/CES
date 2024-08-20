<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TransferapitransactionController_BU extends Box_Models_App_Hermes_AbstractController {

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

       /// pt list access
        $dao = new Hrd_Models_Master_Ptaccess_Dao();
        $ptFilter = new Hrd_Models_Master_Ptaccess_PtAccess();
        $ptFilter->setUserid($this->getAppSession()->getUserId());
        $ptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil_pt = $dao->getAllWoPL($ptFilter);

        /// pt list x cherry
        $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
        $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
        $RowNum = 0;
        //$temp_pt_cherry = '';

        foreach($hasil_pt[1] as $key => $item){
            
            $pt_cherryFilter->setPtptId($item['ptpt_id']);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
            
            if($hasil_pt_cherry[0][0]['totalRow'] > 0){
                $RowNum++;
                $temp_pt_cherry[] = array(
                                            'RowNum'        => $RowNum,
                                            'ptpt_id'       => $item['ptpt_id'],
                                            'ptpt_name'     => $item['ptpt_name'],
                                            'company_code'  => $hasil_pt_cherry[1][0]['company_code']
                );
            }
        }


        $allpt_cherry = array();
        foreach ($temp_pt_cherry as $record){
    
            $pt_cherry = new Hrd_Models_Companycherry_Companycherry();
            $pt_cherry->setArrayTable($record);
            $allpt_cherry[] = $pt_cherry;
        }
        
        $dm->setHasil(array($pt,$project,$allDepartment,$allAlokasiBiaya,$otherAT,$allKategorisk,$allprojectpt,$allemp,$allpt_cherry));
        return $dm;
    }

    public function all_projectpt_companycherry(){
        /// projectpt list access
        $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
        $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectptFilter->setUserid($this->getAppSession()->getUserId());
        $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);
            
        /// pt list x cherry
        $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
        $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
        $RowNum = 0;
        $temp_pt_cherry = '';

        foreach($allprojectpt[1] as $key => $item){
                
            $pt_cherryFilter->setPtptId($item['pt_id']);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
                
            if($hasil_pt_cherry[0][0]['totalRow'] > 0){
                $RowNum++;
                $temp_pt_cherry[] = array(
                                            'RowNum'        => $RowNum,
                                            'projectpt_id'  => $item['projectpt_id'],
                                            'project_id'    => $item['project_id'],
                                            'project_name'  => $item['project_name'],
                                            'pt_id'         => $item['pt_id'],
                                            'pt_name'       => $item['pt_name'],
                                            'subholding_subname'       => $item['subholding_subname'],
                                            'company_code'  => $hasil_pt_cherry[1][0]['company_code']
                );
            }
        }
            
        $allprojectpt_cherry[0][0]['totalRow'] = $RowNum;
        $allprojectpt_cherry[1] = $temp_pt_cherry;

        return $allprojectpt_cherry;
    }


    public function get_transaction_attendanceRead(){
        
        $data = $this->getAppData();
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionAttendance($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_attendance = 0;
                    if($get){
                        foreach($get as $key_attendance => $item_attendance){
                            $total_attendance += $item_attendance['total_attendance']; 
                            
                        }
                    }

                    if($total_attendance){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_attendance' => $total_attendance,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );

                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionAttendance($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_attendance = 0;
                        if($get){
                            foreach($get as $key_attendance => $item_attendance){
                                $total_attendance += $item_attendance['total_attendance']; 
                                
                            }
                        }

                        if($total_attendance){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_attendance' => $total_attendance,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }
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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionOvertime($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_overtime = 0;
                    if($get){
                        foreach($get as $key_overtime => $item_overtime){
                            $total_overtime += $item_overtime['total_overtime']; 
                            
                        }
                    }

                    if($total_overtime){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_overtime' => $total_overtime,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
            
            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionOvertime($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_overtime = 0;
                        if($get){
                            foreach($get as $key_overtime => $item_overtime){
                                $total_overtime += $item_overtime['total_overtime']; 
                                
                            }
                        }

                        if($total_overtime){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_overtime' => $total_overtime,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }

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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionUangMakan($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_uang_makan = 0;
                    if($get){
                        foreach($get as $key_uang_makan => $item_uang_makan){
                            $total_uang_makan += $item_uang_makan['total_uang_makan']; 
                            
                        }
                    }

                    if($total_uang_makan){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_uang_makan' => $total_uang_makan,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
            
            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionUangMakan($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_uang_makan = 0;
                        if($get){
                            foreach($get as $key_uang_makan => $item_uang_makan){
                                $total_uang_makan += $item_uang_makan['total_uang_makan']; 
                                
                            }
                        }

                        if($total_uang_makan){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_uang_makan' => $total_uang_makan,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }
                
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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionMedicalClaim($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_medical_claim = 0;
                    if($get){
                        foreach($get as $key_medical_claim => $item_medical_claim){
                            $total_medical_claim += $item_medical_claim['total_medical_claim']; 
                            
                        }
                    }

                    if($total_medical_claim){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_medical_claim' => $total_medical_claim,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionMedicalClaim($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_medical_claim = 0;
                        if($get){
                            foreach($get as $key_medical_claim => $item_medical_claim){
                                $total_medical_claim += $item_medical_claim['total_medical_claim']; 
                                
                            }
                        }

                        if($total_medical_claim){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_medical_claim' => $total_medical_claim,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }
                
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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionUnpaidLeave($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_unpaid_leave = 0;
                    if($get){
                        foreach($get as $key_unpaid_leave => $item_unpaid_leave){
                            $total_unpaid_leave += $item_unpaid_leave['total_unpaid_leave']; 
                            
                        }
                    }

                    if($total_unpaid_leave){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_unpaid_leave' => $total_unpaid_leave,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionUnpaidLeave($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_unpaid_leave = 0;
                        if($get){
                            foreach($get as $key_unpaid_leave => $item_unpaid_leave){
                                $total_unpaid_leave += $item_unpaid_leave['total_unpaid_leave']; 
                                
                            }
                        }

                        if($total_unpaid_leave){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_unpaid_leave' => $total_unpaid_leave,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }
                
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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionCutiBesar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);

                    if($get){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'hire_date'     => $item_emp['hire_date'],
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionCutiBesar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        if($get){
                                    $datas[$i] = array(
                                                'project_id'    => $item_emp['project_id'],
                                                'project_name'  => $item_emp['project_name'],
                                                'pt_id'         => $item_emp['pt_id'],
                                                'pt_name'       => $item_emp['pt_name'],
                                                'employee_id'   => $item_emp['employee_id'],
                                                'employee_name' => $item_emp['employee_name'],
                                                'department_id' => $item_emp['department_id'],
                                                'department'    => $item_emp['department_code'],
                                                'nik_group'     => $item_emp['nik_group'],
                                                'hire_date'     => $item_emp['hire_date'],
                                                'company_code'  => $company_code,
                                            );

                                        //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;

                                    $i++;
                                }
                    }
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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, 'No');
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionSaldoCutiBayar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_saldocuti_bayar = 0;
                    if($get){
                        foreach($get as $key_saldocuti_bayar => $item_saldocuti_bayar){
                            $total_saldocuti_bayar += $item_saldocuti_bayar['total_saldocuti_bayar']; 
                            
                        }
                    }

                    if($total_saldocuti_bayar){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_saldocuti_bayar' => $total_saldocuti_bayar,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, 'No');
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionSaldoCutiBayar($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_saldocuti_bayar = 0;
                        if($get){
                            foreach($get as $key_saldocuti_bayar => $item_saldocuti_bayar){
                                $total_saldocuti_bayar += $item_saldocuti_bayar['total_saldocuti_bayar']; 
                                
                            }
                        }

                        if($total_saldocuti_bayar){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_saldocuti_bayar' => $total_saldocuti_bayar,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }

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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionPotonganTransport($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_potongan_transport = 0;
                    if($get){
                        foreach($get as $key_potongan_transport => $item_potongan_transport){
                            $total_potongan_transport += $item_potongan_transport['total_potongan_transport']; 
                            
                        }
                    }

                    if($total_potongan_transport){
                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'total_potongan_transport' => $total_potongan_transport,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionPotonganTransport($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                        
                        $total_potongan_transport = 0;
                        if($get){
                            foreach($get as $key_potongan_transport => $item_potongan_transport){
                                $total_potongan_transport += $item_potongan_transport['total_potongan_transport']; 
                                
                            }
                        }

                        if($total_potongan_transport){
                                $datas[$i] = array(
                                            'project_id'    => $item_emp['project_id'],
                                            'project_name'  => $item_emp['project_name'],
                                            'pt_id'         => $item_emp['pt_id'],
                                            'pt_name'       => $item_emp['pt_name'],
                                            'employee_id'   => $item_emp['employee_id'],
                                            'employee_name' => $item_emp['employee_name'],
                                            'department_id' => $item_emp['department_id'],
                                            'department'    => $item_emp['department_code'],
                                            'nik_group'     => $item_emp['nik_group'],
                                            'total_potongan_transport' => $total_potongan_transport,
                                            'company_code'  => $company_code,
                                        );
                                //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                $i++;
                            }
                    }
                
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
        // $projectpt_id = $data['projectpt_id'];
        $pt_id = $data['ptpt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        $datas = '';

        // ALL
        // if($projectpt_id == '999'){
        if($pt_id == '999'){
            /// projectpt list
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => '',
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, '1');
                $emp = $hasil_emp[1];

                $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                $i = 0;

                foreach($emp as $key_emp => $item_emp){
                    $get = $dao_res->getTransactionSaldoCutiMinus($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                    
                    $total_sisa_cuti = 0;
                    $total_saldocuti_minus = 0;
                    if($get){
                        foreach($get as $key_sisa_cuti => $item_sisa_cuti){
                            $total_sisa_cuti += $item_sisa_cuti['sisa_cuti']; 
                        }

                        if($get[0]['total_saldocuti_minus'] && $get[0]['get_from'] == 'upload' ){
                            $total_saldocuti_minus = $get[0]['total_saldocuti_minus'];
                        }
                    }

                    //DEFAULT -6
                    // if($total_saldocuti_minus == 0){
                    //     if($total_sisa_cuti < -6){
                    //         $total_saldocuti_minus = $total_sisa_cuti - (-6);
                    //     }else{
                    //         $total_saldocuti_minus = 0;
                    //     }
                    // }


                    //OPEN, semua minus
                    if($total_saldocuti_minus == 0){
                        if($total_sisa_cuti < 0){
                            $total_saldocuti_minus = $total_sisa_cuti - (0);
                        }else{
                            $total_saldocuti_minus = 0;
                        }
                    }

                    if($total_saldocuti_minus){

                            //OPEN, default 0
                            $total_saldocuti_minus = 0;

                            $datas[$i] = array(
                                        'project_id'    => $item_emp['project_id'],
                                        'project_name'  => $item_emp['project_name'],
                                        'pt_id'         => $item_emp['pt_id'],
                                        'pt_name'       => $item_emp['pt_name'],
                                        'employee_id'   => $item_emp['employee_id'],
                                        'employee_name' => $item_emp['employee_name'],
                                        'department_id' => $item_emp['department_id'],
                                        'department'    => $item_emp['department_code'],
                                        'nik_group'     => $item_emp['nik_group'],
                                        'sisa_cuti'     => $total_sisa_cuti,
                                        'total_saldocuti_minus' => $total_saldocuti_minus,
                                        'company_code'  => $item['company_code'],
                                    );
                            //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                            $i++;
                        }
                }
                
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{

            //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = '';

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                
                    $hasil_emp = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata, '1');
                    $emp = $hasil_emp[1];

                    $em_res = new Hrd_Models_Transferapi_Transferapitransaction();
                    $dao_res = new Hrd_Models_Transferapi_TransferapitransactionDao();
                    $i = 0;

                    foreach($emp as $key_emp => $item_emp){
                        $get = $dao_res->getTransactionSaldoCutiMinus($this->getAppRequest(), $em_res, $this->getAppSession(),$item_emp['employee_id'],$start_date,$end_date,$item_emp['nik_group']);
                            
                            $total_sisa_cuti = 0;
                            $total_saldocuti_minus = 0;
                            if($get){
                                foreach($get as $key_sisa_cuti => $item_sisa_cuti){
                                    $total_sisa_cuti += $item_sisa_cuti['sisa_cuti']; 
                                }

                                if($get[0]['total_saldocuti_minus'] && $get[0]['get_from'] == 'upload' ){
                                    $total_saldocuti_minus = $get[0]['total_saldocuti_minus'];
                                }
                            }


                            //DEFAULT -6
                            // if($total_saldocuti_minus == 0){
                            //     if($total_sisa_cuti < -6){
                            //         $total_saldocuti_minus = $total_sisa_cuti - (-6);
                            //     }else{
                            //         $total_saldocuti_minus = 0;
                            //     }
                            // }

                            //OPEN, semua minus
                            if($total_saldocuti_minus == 0){
                                if($total_sisa_cuti < 0){
                                    $total_saldocuti_minus = $total_sisa_cuti - (0);
                                }else{
                                    $total_saldocuti_minus = 0;
                                }
                            }

                            if($total_saldocuti_minus){

                                //OPEN, default 0
                                $total_saldocuti_minus = 0;

                                    $datas[$i] = array(
                                                'project_id'    => $item_emp['project_id'],
                                                'project_name'  => $item_emp['project_name'],
                                                'pt_id'         => $item_emp['pt_id'],
                                                'pt_name'       => $item_emp['pt_name'],
                                                'employee_id'   => $item_emp['employee_id'],
                                                'employee_name' => $item_emp['employee_name'],
                                                'department_id' => $item_emp['department_id'],
                                                'department'    => $item_emp['department_code'],
                                                'nik_group'     => $item_emp['nik_group'],
                                                'sisa_cuti'     => $total_sisa_cuti,
                                                'total_saldocuti_minus' => $total_saldocuti_minus,
                                                'company_code'  => $company_code,
                                            );
                                    //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($item_emp,$company_code,$data);

                                    $datas[$i]['code'] = $code_cherry;
                                    $i++;
                                }
                    }
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

    public function get_lastprocessidRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $get = $dao->getLastProcessId($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get + 1;
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function checkdata_transactionRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();

        $model_all = 'getAllTransactionCheck';
        $get_all = $dao->$model_all($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil_all = $get_all[0];

        $model = 'getTransactionCheck';
        $get = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get[0];

        if($hasil_all){
            $action_to_cherry = 'update';
        }else{
            $action_to_cherry = 'insert';
        }
        
        $arrayRespon = array("ACTION_TO_CHERRY" => $action_to_cherry, "HASIL" => $hasil, "HASILALL" => $hasil_all);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_transactionRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $model = 'saveTransaction';
        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $hasil = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = '';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function get_transactionRead(){

        $data = $this->getAppData();
        $lastprocessid = $data['lastprocessid'];
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $get = $dao->getTransaction($this->getAppRequest(), $em, $this->getAppSession(),$data);

        $hasil = '';
        $i = 0;
        
        if($get[0]){
            if($process_api == 'cutibesar'){
                $opsi = 'hire_date';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'attendance'){
                $opsi = 'total_attendance';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'medicalclaim'){
                $opsi = 'total_medical_claim';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'overtime'){
                $opsi = 'total_overtime';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'uangmakan'){
                $opsi = 'total_uang_makan';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'unpaidleave'){
                $opsi = 'total_unpaid_leave';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'saldocutibayar'){
                $opsi = 'total_saldocuti_bayar';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'potongantransport'){
                $opsi = 'total_potongan_transport';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }
            elseif($process_api == 'saldocutiminus'){
                $opsi = 'total_saldocuti_minus';
                $opsi_add = 'sisa_cuti';
                $opsi_add_hcms = 'update_hcms';
            }
            else{
                $opsi = '';
                $opsi_add = '';
                $opsi_add_hcms = '';
            }


            foreach($get[0] as $key_emp => $item_emp){

                if($opsi_add){
                    $datas[] = array(
                    'status_transfer'   => $item_emp['status_transfer'],
                    'project_id'        => $item_emp['project_id'],
                    'project_name'      => $item_emp['project_name'],
                    'pt_id'             => $item_emp['pt_id'],
                    'pt_name'           => $item_emp['pt_name'],
                    'employee_id'       => $item_emp['employee_id'],
                    'employee_name'     => $item_emp['employee_name'],
                    'department_id'     => $item_emp['department_id'],
                    'department'        => $item_emp['department_name'],
                    'nik_group'         => $item_emp['nik_group'],
                    $opsi               => $item_emp[$opsi],
                    $opsi_add           => $item_emp[$opsi_add],
                    $opsi_add_hcms      => $item_emp[$opsi_add_hcms]
                        );
                }else{

                    $datas[] = array(
                        'status_transfer'   => $item_emp['status_transfer'],
                        'project_id'        => $item_emp['project_id'],
                        'project_name'      => $item_emp['project_name'],
                        'pt_id'             => $item_emp['pt_id'],
                        'pt_name'           => $item_emp['pt_name'],
                        'employee_id'       => $item_emp['employee_id'],
                        'employee_name'     => $item_emp['employee_name'],
                        'department_id'     => $item_emp['department_id'],
                        'department'        => $item_emp['department_name'],
                        'nik_group'         => $item_emp['nik_group'],
                        $opsi               => $item_emp[$opsi]
                            );
                }

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

    public function save_transaction_beforeapiRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $hasil = $dao->saveTransactionBeforeApi($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = '';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_transactionRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $model = 'updateTransaction';
        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $hasil = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = '';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_hcmsRead(){

        $data = $this->getAppData();
        $jsonString = json_decode($data['jsonString_cell'], true);

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $getcell = $dao->getCellTransaction($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString);
        $addleave = $dao->addLeave($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$getcell);
        $getleaveentitlements = $dao->getLeaveEntitlements($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$getcell);
        $updateleaveentitlements = $dao->updateLeaveEntitlements($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$getcell,$getleaveentitlements);
        
        if($addleave && $updateleaveentitlements){
            $updatesaldocutiminus = $dao->updateSaldoCutiMinus($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$getcell,$addleave);
        }else{
            $updatesaldocutiminus = '';
        }

        $hasil = $updatesaldocutiminus;
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = '';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    // public function process_cherryRead(){

    //     $data = $this->getAppData();
    //     $process_api = $data['process_api'];
    //     $function = 'get_transaction_'.$process_api.'Read';
    //     $get = $this->$function();
    //     print_r($get->hasil);die();
    //    for ($i=0; $i < 3 ; $i++) { 
    //         $datas[] = array(
    //                     'project_id'    => '1',
    //                     'project_name'  => 'project',
    //                     'pt_id'         => '1',
    //                     'pt_name'       => 'pt',
    //                     'employee_id'   => '99',
    //                     'employee_name' => 'test_'.($i+1),
    //                     'department'    => 'test_'.($i+1),
    //                     'nik_group'     => 'nik',
    //                     'hire_date'     => '1900-01-01'
    //                 );
    //    }


    //     $hasil[0][0]['totalRow'] = $i;
    //     $hasil[1]= $datas;

    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     $dataList = new Box_Models_App_DataListCreator('', 'transferapitransaction', array(),array());
            
    //     $dm->setDataList($dataList);
    //     $dm->setHasil($hasil);

    //     return $dm;
    // }

    // public function save_test_cherryRead() {
        
    //     $em = new Hrd_Models_Transferapi_Transferapitransaction();
    //     $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
    //     $hasil = $dao->saveTransactionCutiBesar($this->getAppRequest(),$em, $this->getAppSession(), $this->getAppData());
        
    //     $arrayRespon = array("HASIL" => $hasil);
    //     return Box_Tools::instantRead($arrayRespon);

    // }

    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    
    public function exportdataRead() {
        $data = $this->getAppData();
        $obj = new Hrd_Models_Transferapi_TransferapitransactionExport();
        $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));

        // print_r($post_data);die();
        
        $result = $obj->exceldata($post_data);  
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($result));
        
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

    //CHECK PRODUCTIVITY FORM
    public function get_productivity_formRead(){

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $data = $this->getAppData();

        $pt_id = $data['pt_id'];

        $need_input_cherry = '';
        $need_input_cherry_detail = '';

        if($pt_id == '999'){

            $allprojectpt = $this->all_projectpt_companycherry();
            
            foreach($allprojectpt[1] as $key => $item){

                $company_code = $item['company_code'];

                $get_productivity_form_code = $dao->getProductivityFormCode($em,$company_code);

                if(empty($get_productivity_form_code[0])){

                    $need_input_cherry_detail = '';
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

            }

        }else{

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

    //--------------------------------------------------------------------------------------------------------------------
    // GET CODE
    public function codecherry($item_emp,$company_code,$data_param){

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $data = '';

        //formproductivity master code
        $get_productivity_form_code = $dao->getProductivityFormCode($em,$company_code);
        if($get_productivity_form_code[0]){
            $data['productivity_form_code'] = $get_productivity_form_code[0][0]['code'];
        }else{
            $data['productivity_form_code'] = '';
        }

        //detail code
        $detail_opsi = $data_param['choose'];

        if($detail_opsi == 'transfer_attendance'){
            $detailname = 'Attendance';
        }elseif($detail_opsi == 'transfer_overtime'){
            $detailname = 'Overtime';
        }elseif($detail_opsi == 'transfer_uangmakanlembur'){
            $detailname = 'Uang Makan Lembur';
        }elseif($detail_opsi == 'transfer_medicalclaim'){
            $detailname = 'Medical Claim Internal';
        }elseif($detail_opsi == 'transfer_unpaidleave'){
            $detailname = 'Unpaid Leave';
        }elseif($detail_opsi == 'transfer_cutibesar'){
            $detailname = 'Cuti Besar';
        }elseif($detail_opsi == 'transfer_saldocutibayar'){
            $detailname = 'Saldo Cuti Dibayarkan';
        }elseif($detail_opsi == 'transfer_potongantransport'){
            $detailname = 'Potongan Transport';
        }elseif($detail_opsi == 'transfer_saldocutiminus'){
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

        //employee_code
        $get_employee_code = $dao->getEmployeeCode($em, $item_emp['employee_id']);
        if($get_employee_code[0]){
            $data['employee_code'] = $get_employee_code[0][0]['code'];
        }else{
            $data['employee_code'] = '';
        }
        
        return $data;

    }


    //--------------------------------------------------------------------------------------------------------------------
    // GET last activity
    public function get_lastactivityRead(){

        $data = $this->getAppData();

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        $get = $dao->getLastActivity($this->getAppRequest(), $em, $this->getAppSession(),$data);

        if($get){
            $hasil = $get[0];
        }else{
            $hasil = '';
        }
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    //--------------------------------------------------------------------------------------------------------------------
    // CHERRY PAYROLL PERIODE
    public function companycodecherryRead(){

        $em = new Hrd_Models_Transferapi_Transferapitransaction();
        $dao = new Hrd_Models_Transferapi_TransferapitransactionDao();
        
        $data = $this->getAppData();

        $pt_id = $data['pt_id'];

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
}

?>
