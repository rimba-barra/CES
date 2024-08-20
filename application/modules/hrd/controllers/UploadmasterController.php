<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';


ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_UploadmasterController extends Box_Models_App_Hermes_AbstractController {

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
    public function get_master_deptRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        
        
        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_Department();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $get = $dao->getAllDeptProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
                $get = $get[1];
                foreach($get as $key_child => $item_child){
                    if($item_child['department_id']){
                        $datas[] = array(
                                    'department_id' => $item_child['department_id'],
                                    'department'    => $item_child['department'],
                                    'project_id'    => $item_child['project_id'],
                                    'project_name'  => $item_child['project_name'],
                                    'pt_id'         => $item_child['pt_id'],
                                    'pt_name'       => $item_child['pt_name'],
                                    'code'          => $item_child['code'],
                                    'description'   => $item_child['description']
                                );
                        $i++;
                    }
                }

            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
            $em = new Hrd_Models_Master_Department();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil = $dao->getAllDeptProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $projectpt_id);

        }
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'department', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_bandingRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        
        $em = new Hrd_Models_Performancemanagement_Banding();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
        $hasil = $dao->getAllBandingCat($em, $this->getAppSession(), $projectpt_id);

        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_groupRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        
        
        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Master_Group();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $get = $dao->getAllGroupProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
                $get = $get[1];
                foreach($get as $key_child => $item_child){
                    if($item_child['group_id']){
                        $datas[] = array(
                                    'group_id'      => $item_child['group_id'],
                                    'group'         => $item_child['group'],
                                    'project_id'    => $item_child['project_id'],
                                    'project_name'  => $item_child['project_name'],
                                    'pt_id'         => $item_child['pt_id'],
                                    'pt_name'       => $item_child['pt_name'],
                                    'code'          => $item_child['code'],
                                    'uang_makan'                => $item_child['uang_makan'],
                                    'uang_makan_extra'          => $item_child['uang_makan_extra'],
                                    'uang_transport'            => $item_child['uang_transport'],
                                    'uang_hadir'                => $item_child['uang_hadir'],
                                    'denda_terlambat'           => $item_child['denda_terlambat'],
                                    'uang_transport_mod'        => $item_child['uang_transport_mod'],
                                    'uang_makan_mod'            => $item_child['uang_makan_mod']
                                );
                        $i++;
                    }
                }

            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }else{
            $em = new Hrd_Models_Master_Group();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $hasil = $dao->getAllGroupProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $projectpt_id);

        }
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'group', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_jobfamilyRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        
        $em = new Hrd_Models_Performancemanagement_JobFamily();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
        $hasil = $dao->getAllJobFamilyJob($em);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'jobfamily', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_positionRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        
        $em = new Hrd_Models_Master_Position();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
        $hasil = $dao->getAllPositionWoPL($em, $this->getAppSession(), $projectpt_id);

        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'position', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_employeeRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id
                );
        $datas = null;

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();

        $company_code = null;

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        
        if($get_projectpt[1]){
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

            if($get_company[0]){
                $data['company_code'] = $get_company[0][0]['company_code'];
                $company_code = $get_company[0][0]['company_code'];
            }
        }

        
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
                    'projectpt_id'      => $item['projectpt_id']
                );
                $get = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $get = $get[1];
                foreach($get as $key_child => $item_child){
                    if($item_child['upload_employee_id']){
                        
                        if($item_child['ptkp_effective_date'] && $item_child['npwp_effective_date'] && $item_child['rekening_effective_date']){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($ptkp_effective_date > $npwp_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }

                            if($temp_payroll_effective_date && $temp_payroll_effective_date > $rekening_effective_date){
                                $payroll_effective_date = $temp_payroll_effective_date;
                            }else{
                                $payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $payroll_effective_date);

                        }elseif($item_child['ptkp_effective_date'] && $item_child['npwp_effective_date'] && empty($item_child['rekening_effective_date'])){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);

                            if($ptkp_effective_date > $npwp_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }elseif($item_child['ptkp_effective_date'] && empty($item_child['npwp_effective_date']) && $item_child['rekening_effective_date']){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($ptkp_effective_date > $rekening_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }elseif(empty($item_child['ptkp_effective_date']) && $item_child['npwp_effective_date'] && $item_child['rekening_effective_date']){

                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($npwp_effective_date > $rekening_effective_date){
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }else{
                            if($item_child['ptkp_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['ptkp_effective_date']));
                            }elseif($item_child['npwp_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['npwp_effective_date']));
                            }elseif($item_child['rekening_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['rekening_effective_date']));
                            }else{
                                $payroll_effective_date = null;
                            }
                        }
                        
                        $data_item = array(
                                    'project_id'                                => $item_child['project_id'],
                                    'project_name'                              => $item_child['project_name'],
                                    'pt_id'                                     => $item_child['pt_id'],
                                    'pt_name'                                   => $item_child['pt_name'],
                                    'company_code'                              => $company_code,
                                    'nik_group'                                 => $item_child['nik_group'],
                                    'upload_employee_id'                        => $item_child['upload_employee_id'],
                                    'employee_nik'                              => $item_child['employee_nik'],
                                    'employee_name'                             => $item_child['employee_name'],
                                    'sex'                                       => $item_child['sex'],
                                    'birth_date'                                => $item_child['birth_date'],
                                    'birth_place'                               => $item_child['birth_place'],
                                    'id_type'                                   => 'KTP',
                                    'ktp_number'                                => $item_child['ktp_number'],
                                    'marriagestatus_marriagestatus_id'          => $item_child['marriagestatus_marriagestatus_id'],
                                    'marriagestatus_marriagestatus'             => $item_child['marriagestatus_marriagestatus'],
                                    'nationality'                               => 'Indonesia',
                                    'npwp'                                      => $item_child['npwp'],
                                    'ptkp_id'                                   => $item_child['ptkp_id'],
                                    'ptkp_code'                                 => $item_child['ptkp_code'],
                                    'department_department_id'                  => $item_child['department_department_id'],
                                    'department_department'                     => $item_child['department_department'],
                                    'banding_banding_id'                        => $item_child['banding_banding_id'],
                                    'banding_banding'                           => $item_child['banding_banding'],
                                    'group_group_id'                            => $item_child['group_group_id'],
                                    'group_code'                                => $item_child['group_code'],
                                    'position_position_id'                      => $item_child['position_position_id'],
                                    'position_position'                         => $item_child['position_position'],
                                    'email_ciputra'                             => $item_child['email_ciputra'],
                                    'phone_number'                              => $item_child['phone_number'],
                                    'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                    'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                    'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                    'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],
                                    'payroll_group'                             => 'Group-1',
                                    'ktp_address'                               => $item_child['ktp_address'],
                                    'address'                                   => $item_child['address'],
                                    'payroll_currency'                          => 'IDR',
                                    'payment_method'                            => 'Transfer',
                                    'bank_rekening'                             => $item_child['bank_rekening'],
                                    'nomor_rekening'                            => $item_child['nomor_rekening'],
                                    'nama_rekening'                             => $item_child['nama_rekening'],
                                    'calendar_company'                          => 'Calendar',
                                    'work_shift'                                => '',
                                    'tax_country_code'                          => 'INA',
                                    'fingerprintcode'                           => $item_child['fingerprintcode'],
                                    'cost_center_code'                          => '',
                                    'no_bpjs_k'                                 => $item_child['no_bpjs_k'],
                                    'no_bpjs_kk'                                => $item_child['no_bpjs_kk'],
                                    'no_bpjs_pp'                                => $item_child['no_bpjs_pp'],
                                    'no_manulife_p'                             => $item_child['no_manulife_p'],
                                    'no_asuransi'                               => $item_child['no_asuransi'],
                                    'worklocation_id'                           => $item_child['worklocation_id'],
                                    'worklocation'                              => $item_child['worklocation'],
                                    'worklocation_project_id'                   => $item_child['worklocation_project_id'],
                                    'worklocation_project'                      => $item_child['worklocation_project'],
                                    'worklocation_pt_id'                        => $item_child['worklocation_pt_id'],
                                    'worklocation_pt'                           => $item_child['worklocation_pt'],
                                    'ibu_kandung'                               => $item_child['ibu_kandung'],
                                    'religion_id'                               => $item_child['religion_id'],
                                    'religion_name'                             => $item_child['religion'],
                                    'npwp_effective_date'                       => $item_child['npwp_effective_date'],
                                    'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                    'email'                                     => $item_child['email'],
                                    'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                    'nonactive_date'                            => $item_child['nonactive_date'],
                                    'rekening_effective_date'                   => $item_child['rekening_effective_date'],
                                    'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                    'status_transfer'                           => $item_child['status_transfer'],
                                    'action_process'                            => $item_child['action_process'],
                                    'upload_check'                              => $item_child['upload_check'],
                                    'modion'                                    => $item_child['modion'],
                                    'payroll_effective_date'                    => $payroll_effective_date
                                    // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                    // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
                                );

                        //GET CODE IN CHERRY
                        $code_cherry = $this->codecherry($data_item);

                        $data_item['code'] = $code_cherry;
                                
                        $datas[] = $data_item;

                        $i++;
                    }
                }

            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;

        }else{
        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $this->getAppData());
            $get = $get[1];
            $i = 1;
            
            foreach($get as $key_child => $item_child){
                    if($item_child['upload_employee_id']){

                        if($item_child['ptkp_effective_date'] && $item_child['npwp_effective_date'] && $item_child['rekening_effective_date']){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($ptkp_effective_date > $npwp_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }

                            if($temp_payroll_effective_date && $temp_payroll_effective_date > $rekening_effective_date){
                                $payroll_effective_date = $temp_payroll_effective_date;
                            }else{
                                $payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $payroll_effective_date);

                        }elseif($item_child['ptkp_effective_date'] && $item_child['npwp_effective_date'] && empty($item_child['rekening_effective_date'])){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);

                            if($ptkp_effective_date > $npwp_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }elseif($item_child['ptkp_effective_date'] && empty($item_child['npwp_effective_date']) && $item_child['rekening_effective_date']){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($ptkp_effective_date > $rekening_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }elseif(empty($item_child['ptkp_effective_date']) && $item_child['npwp_effective_date'] && $item_child['rekening_effective_date']){

                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($npwp_effective_date > $rekening_effective_date){
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }else{
                            if($item_child['ptkp_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['ptkp_effective_date']));
                            }elseif($item_child['npwp_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['npwp_effective_date']));
                            }elseif($item_child['rekening_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['rekening_effective_date']));
                            }else{
                                $payroll_effective_date = null;
                            }
                        }

                        $data_item = array(
                                    'project_id'                                => $item_child['project_id'],
                                    'project_name'                              => $item_child['project_name'],
                                    'pt_id'                                     => $item_child['pt_id'],
                                    'pt_name'                                   => $item_child['pt_name'],
                                    'company_code'                              => $company_code,
                                    'nik_group'                                 => $item_child['nik_group'],
                                    'upload_employee_id'                        => $item_child['upload_employee_id'],
                                    'employee_nik'                              => $item_child['employee_nik'],
                                    'employee_name'                             => $item_child['employee_name'],
                                    'sex'                                       => $item_child['sex'],
                                    'birth_date'                                => $item_child['birth_date'],
                                    'birth_place'                               => $item_child['birth_place'],
                                    'id_type'                                   => 'KTP',
                                    'ktp_number'                                => $item_child['ktp_number'],
                                    'marriagestatus_marriagestatus_id'          => $item_child['marriagestatus_marriagestatus_id'],
                                    'marriagestatus_marriagestatus'             => $item_child['marriagestatus_marriagestatus'],
                                    'nationality'                               => 'Indonesia',
                                    'npwp'                                      => $item_child['npwp'],
                                    'ptkp_id'                                   => $item_child['ptkp_id'],
                                    'ptkp_code'                                 => $item_child['ptkp_code'],
                                    'department_department_id'                  => $item_child['department_department_id'],
                                    'department_department'                     => $item_child['department_department'],
                                    'banding_banding_id'                        => $item_child['banding_banding_id'],
                                    'banding_banding'                           => $item_child['banding_banding'],
                                    'group_group_id'                            => $item_child['group_group_id'],
                                    'group_code'                                => $item_child['group_code'],
                                    'position_position_id'                      => $item_child['position_position_id'],
                                    'position_position'                         => $item_child['position_position'],
                                    'email_ciputra'                             => $item_child['email_ciputra'],
                                    'phone_number'                              => $item_child['phone_number'],
                                    'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                    'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                    'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                    'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],
                                    'payroll_group'                             => 'Group-1',
                                    'ktp_address'                               => $item_child['ktp_address'],
                                    'address'                                   => $item_child['address'],
                                    'payroll_currency'                          => 'IDR',
                                    'payment_method'                            => 'Transfer',
                                    'bank_rekening'                             => $item_child['bank_rekening'],
                                    'nomor_rekening'                            => $item_child['nomor_rekening'],
                                    'nama_rekening'                             => $item_child['nama_rekening'],
                                    'calendar_company'                          => 'Calendar',
                                    'work_shift'                                => '',
                                    'tax_country_code'                          => 'INA',
                                    'fingerprintcode'                           => $item_child['fingerprintcode'],
                                    'cost_center_code'                          => '',
                                    'no_bpjs_k'                                 => $item_child['no_bpjs_k'],
                                    'no_bpjs_kk'                                => $item_child['no_bpjs_kk'],
                                    'no_bpjs_pp'                                => $item_child['no_bpjs_pp'],
                                    'no_manulife_p'                             => $item_child['no_manulife_p'],
                                    'no_asuransi'                               => $item_child['no_asuransi'],
                                    'worklocation_id'                           => $item_child['worklocation_id'],
                                    'worklocation'                              => $item_child['worklocation'],
                                    'worklocation_project_id'                   => $item_child['worklocation_project_id'],
                                    'worklocation_project'                      => $item_child['worklocation_project'],
                                    'worklocation_pt_id'                        => $item_child['worklocation_pt_id'],
                                    'worklocation_pt'                           => $item_child['worklocation_pt'],
                                    'ibu_kandung'                               => $item_child['ibu_kandung'],
                                    'religion_id'                               => $item_child['religion_id'],
                                    'religion_name'                             => $item_child['religion'],
                                    'npwp_effective_date'                       => $item_child['npwp_effective_date'],
                                    'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                    'email'                                     => $item_child['email'],
                                    'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                    'nonactive_date'                            => $item_child['nonactive_date'],
                                    'rekening_effective_date'                   => $item_child['rekening_effective_date'],
                                    'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                    'status_transfer'                           => $item_child['status_transfer'],
                                    'action_process'                            => $item_child['action_process'],
                                    'upload_check'                              => $item_child['upload_check'],
                                    'modion'                                    => $item_child['modion'],
                                    'payroll_effective_date'                    => $payroll_effective_date
                                    // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                    // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
                                );

                        //GET CODE IN CHERRY
                        $code_cherry = $this->codecherry($data_item);

                        $data_item['code'] = $code_cherry;
                                
                        $datas[] = $data_item;

                        $i++;
                    }
                }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function get_master_careertransitionRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id
                );
        $datas = null;
        // ALL
        if($projectpt_id == '999'){
            /// projectpt list
            $dao = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $dao->getAllWoPL($projectptFilter);

            $em = new Hrd_Models_Upload_Uploadmaster();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = array();
            $i = 0;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id']
                );
                $get = $dao->getAllCareerTransitionProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $get = $get[1];

                $careertransition_employee = $get;
                end($careertransition_employee);   
                $lastkey_careertransition = key($careertransition_employee);

                foreach($get as $key_child => $item_child){
                    if($item_child['upload_careertransition_id']){

                        //expired date
                        $expired_date = '-';

                        if($key_child < $lastkey_careertransition){

                            $key_child_next = $key_child+1;

                            if($get[$key_child_next]['nik_group'] == $item_child['nik_group'] 
                                && $get[$key_child_next]['effective_date'] > $item_child['effective_date']){

                                if($get[$key_child_next]['alasanresign_id'] && $get[$key_child_next]['alasanresign']){
                                    $expired_date = '-';
                                }else{
                                    $expired_date = $get[$key_child_next]['effective_date'];
                                }

                            }else{
                                $expired_date = '-';
                            }
                        }else{
                            $expired_date = '-';
                        }

                        //perlu di transfer lg atau tidak
                        $need_transfer = '1';

                        $key_child_next = $key_child+1;

                        if($key_child < $lastkey_careertransition){
                            if($get[$key_child_next]['nik_group'] == $item_child['nik_group']){

                                $need_transfer = '-1';

                            }
                        }

                        $datas[] = array(
                                    'project_id'                                => $item_child['project_id'],
                                    'project_name'                              => $item_child['project_name'],
                                    'pt_id'                                     => $item_child['pt_id'],
                                    'pt_name'                                   => $item_child['pt_name'],
                                    'upload_employee_id'                        => $item_child['upload_employee_id'],
                                    'employee_code'                             => $item_child['employee_code'],
                                    'employee_name'                             => $item_child['employee_name'],
                                    'nik_group'                                 => $item_child['nik_group'],
                                    'changetype_id'                             => $item_child['changetype_id'],
                                    'changetype'                                => $item_child['changetype'],
                                    'alasanresign_id'                           => $item_child['alasanresign_id'],
                                    'alasanresign'                              => $item_child['alasanresign'],
                                    'perubahanstatus_id'                        => $item_child['perubahanstatus_id'],
                                    'perubahanstatus'                           => $item_child['perubahanstatus'],
                                    'reason'                                    => $item_child['reason'],
                                    'note'                                      => $item_child['note'],
                                    'sk_number'                                 => $item_child['sk_number'],
                                    'effective_date'                            => $item_child['effective_date'],
                                    'old_project_id'                            => $item_child['old_project_id'],
                                    'old_project'                               => $item_child['old_project'],
                                    'new_project_id'                            => $item_child['new_project_id'],
                                    'new_project'                               => $item_child['new_project'],
                                    'old_pt_id'                                 => $item_child['old_pt_id'],
                                    'old_pt'                                    => $item_child['old_pt'],
                                    'new_pt_id'                                 => $item_child['new_pt_id'],
                                    'new_pt'                                    => $item_child['new_pt'],
                                    'old_department_id'                         => $item_child['old_department_id'],
                                    'old_department'                            => $item_child['old_department'],
                                    'new_department_id'                         => $item_child['new_department_id'],
                                    'new_department'                            => $item_child['new_department'],
                                    'old_banding_id'                            => $item_child['old_banding_id'],
                                    'old_banding'                               => $item_child['old_banding'],
                                    'new_banding_id'                            => $item_child['new_banding_id'],
                                    'new_banding'                               => $item_child['new_banding'],
                                    'old_group_id'                              => $item_child['old_group_id'],
                                    'old_group'                                 => $item_child['old_group'],
                                    'new_group_id'                              => $item_child['new_group_id'],
                                    'new_group'                                 => $item_child['new_group'],
                                    'old_position_id'                           => $item_child['old_position_id'],
                                    'old_position'                              => $item_child['old_position'],
                                    'new_position_id'                           => $item_child['new_position_id'],
                                    'new_position'                              => $item_child['new_position'],
                                    'employeestatus_id'                         => $item_child['employeestatus_id'],
                                    'employeestatus'                            => $item_child['employeestatus'],
                                    'empstatus_code'                            => $item_child['empstatus_code'],
                                    'status_transfer'                           => $item_child['status_transfer'],
                                    'action_process'                            => $item_child['action_process'],
                                    'upload_check'                              => $item_child['upload_check'],
                                    'expired_date'                              => $expired_date,
                                    'need_transfer'                             => $need_transfer
                                    
                                );
                        $i++;
                    }
                }

            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;

        }else{
        
            $em = new Hrd_Models_Upload_Uploadmaster();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = $dao->getAllCareerTransitionProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $this->getAppData());

            $get = $get[1];
            $i = 0;

            $careertransition_employee = $get;
            end($careertransition_employee);   
            $lastkey_careertransition = key($careertransition_employee);
            

            foreach($get as $key_child => $item_child){
                    if($item_child['upload_careertransition_id']){

                        //expired date
                        $expired_date = '-';

                        if($key_child < $lastkey_careertransition){

                            $key_child_next = $key_child+1;

                            if($get[$key_child_next]['nik_group'] == $item_child['nik_group'] 
                                && $get[$key_child_next]['effective_date'] > $item_child['effective_date']){

                                if($get[$key_child_next]['alasanresign_id'] && $get[$key_child_next]['alasanresign']){
                                    $expired_date = '-';
                                }else{
                                    $expired_date = $get[$key_child_next]['effective_date'];
                                }

                            }else{
                                $expired_date = '-';
                            }
                        }else{
                            $expired_date = '-';
                        }

                        //perlu di transfer lg atau tidak
                        $need_transfer = '1';

                        $key_child_next = $key_child+1;

                        if($key_child < $lastkey_careertransition){
                            if($get[$key_child_next]['nik_group'] == $item_child['nik_group']){

                                $need_transfer = '-1';

                            }
                        }
                        


                        $datas[] = array(
                                    'project_id'                                => $item_child['project_id'],
                                    'project_name'                              => $item_child['project_name'],
                                    'pt_id'                                     => $item_child['pt_id'],
                                    'pt_name'                                   => $item_child['pt_name'],
                                    'upload_employee_id'                        => $item_child['upload_employee_id'],
                                    'employee_code'                             => $item_child['employee_code'],
                                    'employee_name'                             => $item_child['employee_name'],
                                    'nik_group'                                 => $item_child['nik_group'],
                                    'changetype_id'                             => $item_child['changetype_id'],
                                    'changetype'                                => $item_child['changetype'],
                                    'alasanresign_id'                           => $item_child['alasanresign_id'],
                                    'alasanresign'                              => $item_child['alasanresign'],
                                    'perubahanstatus_id'                        => $item_child['perubahanstatus_id'],
                                    'perubahanstatus'                           => $item_child['perubahanstatus'],
                                    'reason'                                    => $item_child['reason'],
                                    'note'                                      => $item_child['note'],
                                    'sk_number'                                 => $item_child['sk_number'],
                                    'effective_date'                            => $item_child['effective_date'],
                                    'old_project_id'                            => $item_child['old_project_id'],
                                    'old_project'                               => $item_child['old_project'],
                                    'new_project_id'                            => $item_child['new_project_id'],
                                    'new_project'                               => $item_child['new_project'],
                                    'old_pt_id'                                 => $item_child['old_pt_id'],
                                    'old_pt'                                    => $item_child['old_pt'],
                                    'new_pt_id'                                 => $item_child['new_pt_id'],
                                    'new_pt'                                    => $item_child['new_pt'],
                                    'old_department_id'                         => $item_child['old_department_id'],
                                    'old_department'                            => $item_child['old_department'],
                                    'new_department_id'                         => $item_child['new_department_id'],
                                    'new_department'                            => $item_child['new_department'],
                                    'old_banding_id'                            => $item_child['old_banding_id'],
                                    'old_banding'                               => $item_child['old_banding'],
                                    'new_banding_id'                            => $item_child['new_banding_id'],
                                    'new_banding'                               => $item_child['new_banding'],
                                    'old_group_id'                              => $item_child['old_group_id'],
                                    'old_group'                                 => $item_child['old_group'],
                                    'new_group_id'                              => $item_child['new_group_id'],
                                    'new_group'                                 => $item_child['new_group'],
                                    'old_position_id'                           => $item_child['old_position_id'],
                                    'old_position'                              => $item_child['old_position'],
                                    'new_position_id'                           => $item_child['new_position_id'],
                                    'new_position'                              => $item_child['new_position'],
                                    'employeestatus_id'                         => $item_child['employeestatus_id'],
                                    'employeestatus'                            => $item_child['employeestatus'],
                                    'empstatus_code'                            => $item_child['empstatus_code'],
                                    'status_transfer'                           => $item_child['status_transfer'],
                                    'action_process'                            => $item_child['action_process'],
                                    'upload_check'                              => $item_child['upload_check'],
                                    'expired_date'                              => $expired_date,
                                    'need_transfer'                             => $need_transfer
                                    
                                );
                        $i++;
                    }
                }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'uploadmaster', array(),array());
            
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
    //         $msg = null;
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

    //     $hasil = null;
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
    //                 $opsi = null;
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
    //         $dataList = null;
    //     }

    //     $dm->setDataList($dataList);
    //     $dm->setHasil($hasil);

    //     return $dm;
    // }

    // public function get_master_masterRead(){
        
    //     $hasil = null;
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

    public function exportdataprojectptRead() {
        $data = $this->getAppData();
        $obj = new Hrd_Models_Upload_Uploadtransaction();
        // $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));

        
        $result = $obj->exceldata();  
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
        $upload = new Hrd_Models_Upload_UploadmasterExcel();
    
        $success = $upload->process_upload($fileName, $this->getAppSession(),$data);
        
        // if ($success == TRUE) {
            $success = TRUE;
            $msg = "Success";
        // } else {
        //     $success = FALSE;
        //     $msg = "Error pada saat proses database";
        // }

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


    //-------------------------------------------------------------------------------------------------------------------
    //TRANSFER TO CHERRY

    public function check_companyRead(){

        $data = $this->getAppData();

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();

        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data);
        
        $get_company = null;
        $pt_name = null;
        $pt_id = null;

        if($get_projectpt){
            $projectpt = $get_projectpt[1][0];
            $pt_id = $projectpt['pt_id'];
            $pt_name = $projectpt['pt_name'];
            $get_company = $dao->getCompany($this->getAppSession(),$pt_id);
        }

        $company = null;
        if($get_company[0]){
            $company = $get_company[0][0];
        }

        if($company){
            $action_to_cherry = 'update';
        }else{
            $action_to_cherry = 'insert';
        }
        
        $arrayRespon = array("ACTION_TO_CHERRY" => $action_to_cherry, "HASIL" => $company, "PTID" => $pt_id, "PTNAME" => $pt_name);
        return Box_Tools::instantRead($arrayRespon);
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
            $url = null;
            $username = null;
            $password = null;
        }
        
        $arrayRespon = array("url" => $url, "username" => $username, "password" => $password);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savemasterRead(){

        $data = $this->getAppData();
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        $save = $dao->saveMaster($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $save;
        
        if($hasil){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("MSG" => $message, 'hasil' => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savelogRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        if($data['action'] == 'insert'){
            $save = $dao->saveLog($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult);
            $hasil = $save;
        }else{
            $hasil = null;
        }
        
        if($hasil){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("MSG" => $message, 'hasil' => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savetaxstatusRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        $save = $dao->saveTaxStatus($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult);
        $hasil = $save;

        if($hasil){
            $message = 'berhasil tax status';
        }else{
            $message = 'gagal tax status';
        }

        $arrayRespon = array("MSG" => $message);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function saveempstatusRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        $save = $dao->saveEmpStatus($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult);
        $hasil = $save;

        if($hasil){
            $message = 'berhasil emp status';
        }else{
            $message = 'gagal emp status';
        }

        $arrayRespon = array("MSG" => $message);
        return Box_Tools::instantRead($arrayRespon);
    }

     //COMMON
    public function get_employee_commonRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $data = json_decode($data['data']);
        
        $arr_temp_data = null;
        foreach($data as $key => $item){
            if(empty($item->employeeb->bank_rekening)){
                $bank_rekening = null;
            }else{
                $bank_rekening = $item->employeeb->bank_rekening;
            }

            if(empty($item->employeeb->ptkp_code)){
                $ptkp_code = null;
            }else{
                $ptkp_code = $item->employeeb->ptkp_code;
            }

            if(empty($item->employeeb->hari_kerja_perminggu)){
                $hari_kerja_perminggu = null;
            }else{
                $hari_kerja_perminggu = $item->employeeb->hari_kerja_perminggu;
            }

            if(empty($item->employeeb->marriagestatus_marriagestatus)){
                $marriagestatus_marriagestatus = null;
            }else{
                $marriagestatus_marriagestatus = $item->employeeb->marriagestatus_marriagestatus;
            }

            if(empty($item->employeeb->employeestatus_employeestatus)){
                $employeestatus_employeestatus = null;
            }else{
                $employeestatus_employeestatus = $item->employeeb->employeestatus_employeestatus;
            }

            if($item->employeeb->religion_name == 'Buddha' || $item->employeeb->religion_name == 'Budha'){
                $item->employeeb->religion_name = 'Budha';
            }elseif($item->employeeb->religion_name == 'Katholik' || $item->employeeb->religion_name == 'Katolik'){
                $item->employeeb->religion_name = 'Katolik';
            }else{
                $item->employeeb->religion_name = $item->employeeb->religion_name;
            }

            $arr_temp_data[] = array(
                                        'employee_id'                               => $item->employeeb->upload_employee_id,
                                        'employee_name'                             => $item->employeeb->employee_name,
                                        'sex'                                       => $item->employeeb->sex,
                                        'religion'                                  => $item->employeeb->religion_name,
                                        'id_type'                                   => $item->employeeb->id_type,
                                        'marriagestatus_marriagestatus'             => $marriagestatus_marriagestatus,
                                        'nationality'                               => $item->employeeb->nationality,
                                        'payroll_currency'                          => $item->employeeb->payroll_currency,
                                        'payment_method'                            => $item->employeeb->payment_method,
                                        'bank_rekening'                             => $bank_rekening,
                                        'calendar_company'                          => $item->employeeb->calendar_company,
                                        'employeestatus_employeestatus'             => $employeestatus_employeestatus,
                                        'ptkp_code'                                 => $ptkp_code,
                                        'payroll_group'                             => $item->employeeb->payroll_group,
                                        'hari_kerja_perminggu'                      => $hari_kerja_perminggu,
            );
        }

        $need_input_cherry = null;

        //GENDER CODE
        $hasil_group_by_gender = $this->group_by("sex", $arr_temp_data);
        foreach ($hasil_group_by_gender as $key => $item) {
            if($key){
                $lookupname = 'Gender';
                $get_gender_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_gender_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //RELIGION CODE
        $hasil_group_by_religion = $this->group_by("religion", $arr_temp_data);
        foreach ($hasil_group_by_religion as $key => $item) {
            if($key){
                $lookupname = 'Religion';
                $get_religion_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_religion_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //ID TYPE CODE
        $hasil_group_by_id_type = $this->group_by("id_type", $arr_temp_data);
        foreach ($hasil_group_by_id_type as $key => $item) {
            if($key){
                $lookupname = 'IdType';
                $get_id_type_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_id_type_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //MARITAL CODE
        $hasil_group_by_marriagestatus = $this->group_by("marriagestatus_marriagestatus", $arr_temp_data);
        foreach ($hasil_group_by_marriagestatus as $key => $item) {
            if($key){
                $lookupname = 'MaritalStatus';
                $get_marriagestatus_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_marriagestatus_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //NATIONALITY CODE
        $hasil_group_by_nationality = $this->group_by("nationality", $arr_temp_data);
        foreach ($hasil_group_by_nationality as $key => $item) {
            if($key){
                $lookupname = 'Nationality';
                $get_nationality_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_nationality_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //Currency CODE
        $hasil_group_by_payroll_currency = $this->group_by("payroll_currency", $arr_temp_data);
        foreach ($hasil_group_by_payroll_currency as $key => $item) {
            if($key){
                $lookupname = 'Currency';
                $get_payroll_currency_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_payroll_currency_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //payment_method CODE
        $hasil_group_by_payment_method = $this->group_by("payment_method", $arr_temp_data);
        foreach ($hasil_group_by_payment_method as $key => $item) {
            if($key){
                $lookupname = 'PaymentMethod';
                $get_payment_method_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_payment_method_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //bank_rekening CODE
        $hasil_group_by_bank_rekening = $this->group_by("bank_rekening", $arr_temp_data);
        foreach ($hasil_group_by_bank_rekening as $key => $item) {
            if($key){
                $lookupname = 'Bank';
                $get_bank_rekening_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_bank_rekening_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //calendar_company CODE
        // $hasil_group_by_calendar_company = $this->group_by("calendar_company", $arr_temp_data);
        // foreach ($hasil_group_by_calendar_company as $key => $item) {
        //     if($key){
        //         $lookupname = 'WorkCalendar';
        //         $get_calendar_company_code = $dao->getCommonCode($em,$lookupname, $key);
        //         if(empty($get_calendar_company_code[0])){
        //             $need_input_cherry[] = array(
        //                                             'key'   => $lookupname,
        //                                             'name'  => $key
        //                                     );
        //         }
        //     }
        // }

        //employeestatus_employeestatus CODE
        $hasil_group_by_employeestatus = $this->group_by("employeestatus_employeestatus", $arr_temp_data);
        foreach ($hasil_group_by_employeestatus as $key => $item) {
            if($key){
                $lookupname = 'EmploymentStatus';
                $get_employeestatus_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_employeestatus_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //ptkp_code CODE
        $hasil_group_by_ptkp_code = $this->group_by("ptkp_code", $arr_temp_data);
        foreach ($hasil_group_by_ptkp_code as $key => $item) {
            if($key){
                $lookupname = 'TaxStatus';
                $get_ptkp_code_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_ptkp_code_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //payroll_group CODE
        $hasil_group_by_payroll_group = $this->group_by("payroll_group", $arr_temp_data);
        foreach ($hasil_group_by_payroll_group as $key => $item) {
            if($key){
                $lookupname = 'PayrollGroup';
                $get_payroll_group_code = $dao->getCommonCode($em,$lookupname, $key);
                if(empty($get_payroll_group_code[0])){
                    $need_input_cherry[] = array(
                                                    'key'   => $lookupname,
                                                    'name'  => $key
                                            );
                }
            }
        }

        //hari_kerja_perminggu CODE
        // $hasil_group_by_hari_kerja_perminggu = $this->group_by("hari_kerja_perminggu", $arr_temp_data);
        // foreach ($hasil_group_by_hari_kerja_perminggu as $key => $item) {
        //     if($key){
        //         $lookupname = 'Workshift';
        //         $get_hari_kerja_perminggu_code = $dao->getCommonCode($em,$lookupname, $key);
        //         if(empty($get_hari_kerja_perminggu_code[0])){
        //             $need_input_cherry[] = array(
        //                                             'key'   => $lookupname,
        //                                             'name'  => $key . ' days'
        //                                     );
        //         }
        //     }
        // }
        

        $arrayRespon = array("need_input_cherry" => $need_input_cherry);
        return Box_Tools::instantRead($arrayRespon);
    }   

    public function save_common_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveCommonBeforeApi($em, $this->getAppSession(),$jsonString);
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_common_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateCommonAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //SHIFT
    public function get_employee_workshiftRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $data = json_decode($data['data']);
        
        $arr_temp_data = null;
        foreach($data as $key => $item){
            if(empty($item->employeeb->hari_kerja_perminggu)){
                $hari_kerja_perminggu = null;
            }else{
                $hari_kerja_perminggu = $item->employeeb->hari_kerja_perminggu;
            }

            $arr_temp_data[] = array(
                                        'employee_id'                               => $item->employeeb->upload_employee_id,
                                        'employee_name'                             => $item->employeeb->employee_name,
                                        'pt_id'                                     => $item->employeeb->pt_id,
                                        'hari_kerja_perminggu'                      => $hari_kerja_perminggu,
            );
        }

        $need_input_cherry_shift = null;

        //hari_kerja_perminggu CODE
        $hasil_group_by_hari_kerja_perminggu = $this->group_by("hari_kerja_perminggu", $arr_temp_data);
        foreach ($hasil_group_by_hari_kerja_perminggu as $key => $item) {
            if($key){
                $lookupname = 'Workshift';

                // foreach($item as $key_emp => $item_emp){
                    $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                    $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                
                    // $pt_cherryFilter->setPtptId($item_emp['pt_id']);
                    $pt_cherryFilter->setPtptId($item[0]['pt_id']);
                    $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

                    $company_code = $hasil_pt_cherry[1][0]['company_code'];
                    
                    $get_hari_kerja_perminggu_code = $dao->getShiftCode($em,$lookupname, $key, $company_code);
                    if(empty($get_hari_kerja_perminggu_code[0])){
                        $need_input_cherry_shift[] = array(
                                                        'key'   => $lookupname,
                                                        'name'  => $key . ' days',
                                                        'company_code'  => $company_code
                                                );
                    }

                // }

            }
        }
        

        $arrayRespon = array("need_input_cherry_shift" => $need_input_cherry_shift);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_workshift_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveShiftBeforeApi($em, $this->getAppSession(),$jsonString);
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_workshift_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateShiftAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //CALENDAR
    public function get_employee_workcalendarRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $data = json_decode($data['data']);
        
        $arr_temp_data = null;
        foreach($data as $key => $item){
            $arr_temp_data[] = array(
                                        'employee_id'                               => $item->employeeb->upload_employee_id,
                                        'employee_name'                             => $item->employeeb->employee_name,
                                        'pt_id'                                     => $item->employeeb->pt_id,
                                        'calendar_company'                          => $item->employeeb->calendar_company,
            );
        }

        $need_input_cherry_calendar = null;

        //calendar_company CODE
        $hasil_group_by_calendar_company = $this->group_by("calendar_company", $arr_temp_data);
        foreach ($hasil_group_by_calendar_company as $key => $item) {
            if($key){
                $lookupname = 'WorkCalendar';
                
                // foreach($item as $key_emp => $item_emp){
                    $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                    $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                
                    // $pt_cherryFilter->setPtptId($item_emp['pt_id']);
                    $pt_cherryFilter->setPtptId($item[0]['pt_id']);
                    $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

                    $company_code = $hasil_pt_cherry[1][0]['company_code'];
                    
                    $get_calendar_company_code = $dao->getCalendarCode($em,$lookupname, $key, $company_code);
                    if(empty($get_calendar_company_code[0])){
                        $need_input_cherry_calendar[] = array(
                                                        'key'           => $lookupname,
                                                        'name'          => $key,
                                                        'company_code'  => $company_code
                                                );
                    }
                // }

            }
        }
        
        $arrayRespon = array("need_input_cherry_calendar" => $need_input_cherry_calendar);
        return Box_Tools::instantRead($arrayRespon);
    } 

    public function save_workcalendar_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveCalendarBeforeApi($em, $this->getAppSession(),$jsonString);
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_workcalendar_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateCalendarAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //PAYROLL GROUP
    public function get_employee_payrollgroupRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $data = json_decode($data['data']);
        
        $arr_temp_data = null;
        foreach($data as $key => $item){
            if(empty($item->employeeb->payroll_group)){
                $payroll_group = null;
            }else{
                $payroll_group = $item->employeeb->payroll_group;
            }

            $arr_temp_data[] = array(
                                        'employee_id'                               => $item->employeeb->upload_employee_id,
                                        'employee_name'                             => $item->employeeb->employee_name,
                                        'pt_id'                                     => $item->employeeb->pt_id,
                                        'payroll_group'                             => $payroll_group,
            );
        }

        $need_input_cherry_payrollgroup = null;

        //payrollgroup CODE
        $hasil_group_by_payroll_group = $this->group_by("payroll_group", $arr_temp_data);
        foreach ($hasil_group_by_payroll_group as $key => $item) {
            
            if($key){
                $lookupname = 'PayrollGroups';

                // foreach($item as $key_emp => $item_emp){
                    $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                    $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                
                    $pt_cherryFilter->setPtptId($item[0]['pt_id']);
                    $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

                    $company_code = $hasil_pt_cherry[1][0]['company_code'];
                    
                    $get_payroll_group_code = $dao->getPayrollGroupCode($em,$lookupname, $key, $company_code);
                    if(empty($get_payroll_group_code[0])){
                        $need_input_cherry_payrollgroup[] = array(
                                                        'key'           => $lookupname,
                                                        'name'          => $key,
                                                        'typecode'      => 'PayrollGroup',
                                                        'company_code'  => $company_code,
                                                        'date'          => date('Y-m-01')
                                                );
                    }

                // }

            }
        }
        
        
        $arrayRespon = array("need_input_cherry_payrollgroup" => $need_input_cherry_payrollgroup);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_payrollgroup_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->savePayrollGroupBeforeApi($em, $this->getAppSession(),$jsonString);
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_payrollgroup_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updatePayrollGroupAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //WORKLOCATION 
    public function get_employee_worklocationRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $data = json_decode($data['data']);
        
        $arr_temp_data = null;
        foreach($data as $key => $item){
            if(empty($item->employeeb->worklocation)){
                $worklocation = null;
            }else{
                $worklocation = $item->employeeb->worklocation;
            }

            if(empty($item->employeeb->worklocation_id)){
                $worklocation_id = null;
            }else{
                $worklocation_id = $item->employeeb->worklocation_id;
            }

            $arr_temp_data[] = array(
                                        'employee_id'                               => $item->employeeb->upload_employee_id,
                                        'employee_name'                             => $item->employeeb->employee_name,
                                        'pt_id'                                     => $item->employeeb->pt_id,
                                        'worklocation_id'                           => $worklocation_id,
                                        'worklocation'                              => $worklocation,
            );
        }

        $need_input_cherry_worklocation = null;

        //worklocation CODE
        $hasil_group_by_worklocation = $this->group_by("worklocation", $arr_temp_data);
        foreach ($hasil_group_by_worklocation as $key => $item) {
            
            if($key){
                $lookupname = 'WorkLocation';

                // foreach($item as $key_emp => $item_emp){
                    $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                    $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                
                    $pt_cherryFilter->setPtptId($item[0]['pt_id']);
                    $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

                    $company_code = $hasil_pt_cherry[1][0]['company_code'];
                    
                    $get_worklocation_code = $dao->getWorkLocationCode($em,$lookupname, $key, $company_code);
                    if(empty($get_worklocation_code[0])){
                        $need_input_cherry_worklocation[] = array(
                                                        'key'           => $lookupname,
                                                        'name'          => $key,
                                                        'labelcode'     => $key,
                                                        'address'       => $key,
                                                        'typecode'      => 'Location',
                                                        'company_code'  => $company_code
                                                );
                    }

                // }

            }
        }
        
        
        $arrayRespon = array("need_input_cherry_worklocation" => $need_input_cherry_worklocation);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_worklocation_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveWorkLocationBeforeApi($em, $this->getAppSession(),$jsonString);
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_worklocation_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateWorkLocationAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //CAREER TRANSITION TYPE
    public function check_careertransitionRead(){
        
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

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        // $pt_id = $data['choose_ptpt'];

        if($pt_id == '999'){
            
            $allprojectpt = $this->all_projectpt_companycherry();
        
        }else{
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
            $allprojectpt = $hasil_pt_cherry;

        }


        $explode_data = explode(',', $data['careertransition_var']);
        
        $need_input_cherry_careertransition = null;

        foreach($allprojectpt[1] as $key_pt => $item_pt){
            foreach($explode_data as $key => $item){
                $get_careertransition_code = $dao->getCareerTransitionTypeCode($em,$item,$item_pt['company_code']);
                if(empty($get_careertransition_code[0])){
                        $need_input_cherry_careertransition[] = array(
                                                            'name'          => $item,
                                                            'company_code'  => $item_pt['company_code']
                                                        );
                }
            }
        }

        $arrayRespon = array("need_input_cherry_careertransition" => $need_input_cherry_careertransition);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_careertransition_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveCareerTransitionTypeBeforeApi($em, $this->getAppSession(),$jsonString,'insert');
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_careertransition_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateCareerTransitionTypeAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array("result_id" => $result_id,"msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function get_dataRead(){

        $data = $this->getAppData();

        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        if($type == 'department'){
            $type = 'get_master_deptRead';
        }else{
            $type = 'get_master_'.$type.'Read';
        }

        $data = $this->$type();    

        return $data;
    }

    public function lastprocessidRead(){

        $data = $this->getAppData();   
        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        if($type == 'department'){
            $type = 'dept';
        }else{
            $type = $type;
        }

        $data_trf['value'] = $type;

        $em_trf = new Hrd_Models_Transferapi_Transferapimaster();
        $dao_trf = new Hrd_Models_Transferapi_TransferapimasterDao();
        $get_trf = $dao_trf->getLastProcessId($this->getAppRequest(), $em_trf, $this->getAppSession(),$data_trf);
        $hasil_lastprocessid = $get_trf + 1;

        $arrayRespon = array("lastprocessid" => $hasil_lastprocessid);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_beforesubmitRead(){

        $data = $this->getAppData();

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();

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

        $arrayRespon = array("message" => $message, "hasil" => $hasil, "changeprofile" => $hasil['changeprofile'], "changepayroll" => $hasil['changepayroll']);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_masterRead(){

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
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
        //TESTING

        $hasil = $dao->updateMaster($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = null;
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

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();

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
        $hasil = null;
        $get_removecherry = $dao->getDataRemoveCherry($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get_removecherry;

        $dm = new Box_Models_App_Hermes_DataModel();
        if($type == 'dept'){

            $dataList = new Box_Models_App_DataListCreator('', 'department', array(),array());
        }
        elseif($type == 'banding'){

            $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
        }
        elseif($type == 'group'){

            $dataList = new Box_Models_App_DataListCreator('', 'group', array(),array());
        }
        elseif($type == 'position'){

            $dataList = new Box_Models_App_DataListCreator('', 'position', array(),array());
        }
        else{
            $dataList = new Box_Models_App_DataListCreator('', 'department', array(),array());
        }
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function update_master_removeRead(){

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();
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
        //TESTING

        $hasil = $dao->updateMaster($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        $hasil_remove = $dao->updateMasterRemove($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = null;
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

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

    public function cek_master_employee_attrRead(){

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

        $hasil = $dao->cekMasterEmployeeAttr($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $hasil[0];

        if($hasil){
            $msg = 'ada';
        }else{
            $msg = 'kosong';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function get_employee_changeRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $effective_date = date('Y-m-d',strtotime($data['effectivedate']));
        $change = $data['change'];
        $employee_id = $data['employee_id'];
        
        if($change == 'changeprofile'){

            $get_change_code = $dao->getChangeProfileEmployeeCode($em,$this->getAppSession(), $effective_date,$employee_id);

        }else{
            $get_change_code = $dao->getChangePayrollEmployeeCode($em,$this->getAppSession(), $effective_date,$employee_id);
        }
        

        if(empty($get_change_code[0])){
            $action_to_cherry = 'insert';
            $hasil_get = null;
        }else{

            $action_to_cherry = 'update';
            $hasil_get = $get_change_code[0];
        }
        
        
        
        $arrayRespon = array("action_to_cherry" => $action_to_cherry,"hasil_get" => $hasil_get);
        return Box_Tools::instantRead($arrayRespon);
    }
    

    //etc
    public function group_by($key, $data) {
        $result = array();

        foreach($data as $val) {
            if(array_key_exists($key, $val)){
                $result[$val[$key]][] = $val;
            }else{
                $result[""][] = $val;
            }
        }

        return $result;
    }

    public function codecherry($item){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = null;

        //department code
        if($item['department_department_id']){
            $get_department_code = $dao->getDepartmentCode($em, $item);
            if($get_department_code[0]){
                $department_code = $get_department_code[0][0]['code'];
                $data['department_code'] = $department_code;
            }else{
                $data['department_code'] = null;
            }
        }else{
            $data['department_code'] = null;
        }

        //group code
        if($item['group_group_id']){
            $get_group_code = $dao->getGroupCode($em, $item);
            if($get_group_code[0]){
                $group_code = $get_group_code[0][0]['code'];
                $data['group_code'] = $group_code;
            }else{
                $data['group_code'] = null;
            }
        }else{
            $data['group_code'] = null;
        }

        //banding code
        if($item['banding_banding_id']){
            $get_banding_code = $dao->getBandingCode($em, $item);
            if($get_banding_code[0]){
                $banding_code = $get_banding_code[0][0]['code'];
                $data['banding_code'] = $banding_code;
            }else{
                $data['banding_code'] = null;
            }
        }else{
            $data['banding_code'] = null;
        }

        //position code
        if($item['position_position_id']){
            $get_position_code = $dao->getPositionCode($em, $item);
            if($get_position_code[0]){
                $position_code = $get_position_code[0][0]['code'];
                $data['position_code'] = $position_code;
            }else{
                $data['position_code'] = null;
            }
        }else{
            $data['position_code'] = null;
        }

        //COMMON CODE-------------------------------------------------------------------

        //gendercode
        if($item['sex']){
            $lookupname = 'Gender';
            $get_gender_code = $dao->getCommonCode($em,$lookupname, $item['sex']);
            if($get_gender_code[0]){
                $gender_code = $get_gender_code[0][0]['code'];
                $data['gender_code'] = $gender_code;
            }else{
                $data['gender_code'] = null;
            }
        }else{
            $data['gender_code'] = null;
        }

        if($item['religion_name']){
            $lookupname = 'Religion';

            if($item['religion_name'] == 'Buddha' || $item['religion_name'] == 'Budha'){
                $item['religion_name'] = 'Budha';
            }elseif($item['religion_name'] == 'Katholik' || $item['religion_name'] == 'Katolik'){
                $item['religion_name'] = 'Katolik';
            }else{
                $item['religion_name'] = $item['religion_name'];
            }

            $get_religion_code = $dao->getCommonCode($em,$lookupname, $item['religion_name']);
            if($get_religion_code[0]){
                $religion_code = $get_religion_code[0][0]['code'];
                $data['religion_code'] = $religion_code;
            }else{
                $data['religion_code'] = null;
            }
        }else{
            $data['religion_code'] = null;
        }

        //id_typecode
        if($item['id_type']){
            $lookupname = 'IdType';
            $get_id_type_code = $dao->getCommonCode($em,$lookupname, $item['id_type']);
            if($get_id_type_code[0]){
                $id_type_code = $get_id_type_code[0][0]['code'];
                $data['id_type_code'] = $id_type_code;
            }else{
                $data['id_type_code'] = null;
            }
        }else{
            $data['id_type_code'] = null;
        }

        //marriagestatuscode
        if($item['marriagestatus_marriagestatus']){
            $lookupname = 'MaritalStatus';

            if($item['marriagestatus_marriagestatus'] == 'Married' || $item['marriagestatus_marriagestatus'] == 'Menikah'){
                $item['marriagestatus_marriagestatus'] = 'Married';
            }elseif($item['marriagestatus_marriagestatus'] == 'Single' || $item['marriagestatus_marriagestatus'] == 'Belum menikah'){
                $item['marriagestatus_marriagestatus'] = 'Single';
            }else{
                $item['marriagestatus_marriagestatus'] = $item['marriagestatus_marriagestatus'];
            }

            $get_marriagestatus_code = $dao->getCommonCode($em,$lookupname, $item['marriagestatus_marriagestatus']);
            if($get_marriagestatus_code[0]){
                $marriagestatus_code = $get_marriagestatus_code[0][0]['code'];
                $data['marriagestatus_code'] = $marriagestatus_code;
            }else{
                $data['marriagestatus_code'] = null;
            }
        }else{
            $data['marriagestatus_code'] = null;
        }

        //nationalitycode
        if($item['nationality']){
            $lookupname = 'Nationality';
            $get_nationality_code = $dao->getCommonCode($em,$lookupname, $item['nationality']);
            if($get_nationality_code[0]){
                $nationality_code = $get_nationality_code[0][0]['code'];
                $data['nationality_code'] = $nationality_code;
            }else{
                $data['nationality_code'] = null;
            }
        }else{
            $data['nationality_code'] = null;
        }

        //payroll_currencycode
        if($item['payroll_currency']){
            $lookupname = 'Currency';
            $get_payroll_currency_code = $dao->getCommonCode($em,$lookupname, $item['payroll_currency']);
            if($get_payroll_currency_code[0]){
                $payroll_currency_code = $get_payroll_currency_code[0][0]['code'];
                $data['payroll_currency_code'] = $payroll_currency_code;
            }else{
                $data['payroll_currency_code'] = null;
            }
        }else{
            $data['payroll_currency_code'] = null;
        }

        //payment_methodcode
        if($item['payment_method']){
            $lookupname = 'PaymentMethod';
            $get_payment_method_code = $dao->getCommonCode($em,$lookupname, $item['payment_method']);
            if($get_payment_method_code[0]){
                $payment_method_code = $get_payment_method_code[0][0]['code'];
                $data['payment_method_code'] = $payment_method_code;
            }else{
                $data['payment_method_code'] = null;
            }
        }else{
            $data['payment_method_code'] = null;
        }

        //bank_rekeningcode
        if($item['bank_rekening']){
            $lookupname = 'Bank';
            $get_bank_rekening_code = $dao->getCommonCode($em,$lookupname, $item['bank_rekening']);
            if($get_bank_rekening_code[0]){
                $bank_rekening_code = $get_bank_rekening_code[0][0]['code'];
                $data['bank_rekening_code'] = $bank_rekening_code;
            }else{
                $data['bank_rekening_code'] = null;
            }
        }else{
            $data['bank_rekening_code'] = null;
        }

        //calendar_companycode
        if($item['calendar_company']){
            $lookupname = 'WorkCalendar';
            $get_calendar_company_code = $dao->getCalendarCode($em,$lookupname, $item['calendar_company'],$item['company_code']);
            if($get_calendar_company_code[0]){
                $calendar_company_code = $get_calendar_company_code[0][0]['code'];
                $data['calendar_company_code'] = $calendar_company_code;
            }else{
                $data['calendar_company_code'] = null;
            }
        }else{
            $data['calendar_company_code'] = null;
        }

        //employeestatuscode
        if($item['employeestatus_employeestatus']){
            $lookupname = 'EmploymentStatus';

            $employeestatus_employeestatus = strtolower($item['employeestatus_employeestatus']);

            if($employeestatus_employeestatus == 'permanent' || $employeestatus_employeestatus == 'tetap'){
                $item['employeestatus_employeestatus'] = 'permanent';
            }elseif($employeestatus_employeestatus == 'contract' || $employeestatus_employeestatus == 'kontrak'){
                $item['employeestatus_employeestatus'] = 'contract';
            }else{
                $item['employeestatus_employeestatus'] = $item['employeestatus_employeestatus'];
            }

            // $get_employeestatus_code = $dao->getCommonCode($em,$lookupname, $item['employeestatus_employeestatus']);
            $get_employeestatus_code = $dao->getEmpStatusCode($em,$lookupname, $item['employeestatus_employeestatus'],$item['company_code']);
            if($get_employeestatus_code[0]){
                $employeestatus_code = $get_employeestatus_code[0][0]['code'];
                $data['employeestatus_code'] = $employeestatus_code;
            }else{
                $data['employeestatus_code'] = null;
            }
        }else{
            $data['employeestatus_code'] = null;
        }
                
        //ptkp_code
        if($item['ptkp_code']){
            $lookupname = 'TaxStatus';
            // $get_ptkp_code_code = $dao->getCommonCode($em,$lookupname, $item['ptkp_code']);
            $get_ptkp_code_code = $dao->getTaxStatusCode($em,$lookupname, $item['ptkp_code'],$item['company_code']);
            if($get_ptkp_code_code[0]){
                $ptkp_code_code = $get_ptkp_code_code[0][0]['code'];
                $data['ptkp_code'] = $ptkp_code_code;
            }else{
                $data['ptkp_code'] = null;
            }
        }else{
            $data['ptkp_code'] = null;
        }

        //payroll_group
        if($item['payroll_group']){
            $lookupname = 'PayrollGroup';
            // $get_payroll_group_code = $dao->getCommonCode($em,$lookupname, $item['payroll_group']);
            $get_payroll_group_code = $dao->getPayrollGroupCode($em,$lookupname, $item['payroll_group'],$item['company_code']);
            if($get_payroll_group_code[0]){
                $payroll_group_code = $get_payroll_group_code[0][0]['code'];
                $data['payroll_group'] = $payroll_group_code;
            }else{
                $data['payroll_group'] = null;
            }
        }else{
            $data['payroll_group'] = null;
        }

        //hari_kerja_perminggu
        if($item['hari_kerja_perminggu']){
            $lookupname = 'Workshift';
            $get_hari_kerja_perminggu_code = $dao->getShiftCode($em,$lookupname, $item['hari_kerja_perminggu'],$item['company_code']);
            if($get_hari_kerja_perminggu_code[0]){
                $hari_kerja_perminggu_code = $get_hari_kerja_perminggu_code[0][0]['code'];
                $data['hari_kerja_perminggu'] = $hari_kerja_perminggu_code;
            }else{
                $data['hari_kerja_perminggu'] = null;
            }
        }else{
            $data['hari_kerja_perminggu'] = null;
        }

        //worklocation
        if($item['worklocation']){
            $lookupname = 'WorkLocation';
            $get_worklocation_code = $dao->getWorkLocationCode($em,$lookupname, $item['worklocation'],$item['company_code']);
            if($get_worklocation_code[0]){
                $worklocation_code = $get_worklocation_code[0][0]['code'];
                $data['worklocation_code'] = $worklocation_code;
            }else{
                $data['worklocation_code'] = null;
            }
        }else{
            $data['worklocation_code'] = null;
        }


        return $data;

    }

    public function check_codecherry_employeeRead(){
        
        $data = $this->getAppData();
        $projectpt_id = $data['projectpt_id'];
        $appdata = array(
                    'projectpt_id'      => $projectpt_id
                );
        $datas = null;

        $em = new Hrd_Models_Upload_Uploadmaster();
        $dao = new Hrd_Models_Upload_UploadmasterDao();

        $company_code = null;

        //PT ID
        $data_projectpt['choose_projectpt'] = $data['projectpt_id'];
        $get_projectpt = $dao->getProjectPtId($this->getAppSession(),$data_projectpt);
        
        if($get_projectpt[1]){
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

            if($get_company[0]){
                $data['company_code'] = $get_company[0][0]['company_code'];
                $company_code = $get_company[0][0]['company_code'];
            }
        }

        $need_input_cherry_code = 0;
        $need_input_cherry_code_emp = null;
        $need_input_cherry_code_item = null;
        $need_input_cherry_code_ket = null;

        
            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Upload_UploadmasterDao();
            $get = $dao->getAllEmployeeProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $this->getAppData());
            $get = $get[1];
            $i = 1;
            
            foreach($get as $key_child => $item_child){
                    if($item_child['upload_employee_id']){

                        if($item_child['ptkp_effective_date'] && $item_child['npwp_effective_date'] && $item_child['rekening_effective_date']){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($ptkp_effective_date > $npwp_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }

                            if($temp_payroll_effective_date && $temp_payroll_effective_date > $rekening_effective_date){
                                $payroll_effective_date = $temp_payroll_effective_date;
                            }else{
                                $payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $payroll_effective_date);

                        }elseif($item_child['ptkp_effective_date'] && $item_child['npwp_effective_date'] && empty($item_child['rekening_effective_date'])){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);

                            if($ptkp_effective_date > $npwp_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }elseif($item_child['ptkp_effective_date'] && empty($item_child['npwp_effective_date']) && $item_child['rekening_effective_date']){

                            $ptkp_effective_date = strtotime($item_child['ptkp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($ptkp_effective_date > $rekening_effective_date){
                                $temp_payroll_effective_date = $ptkp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }elseif(empty($item_child['ptkp_effective_date']) && $item_child['npwp_effective_date'] && $item_child['rekening_effective_date']){

                            $npwp_effective_date = strtotime($item_child['npwp_effective_date']);
                            $rekening_effective_date = strtotime($item_child['rekening_effective_date']);

                            if($npwp_effective_date > $rekening_effective_date){
                                $temp_payroll_effective_date = $npwp_effective_date;
                            }else{
                                $temp_payroll_effective_date = $rekening_effective_date;
                            }

                            $payroll_effective_date = date('Y-m-d', $temp_payroll_effective_date);

                        }else{
                            if($item_child['ptkp_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['ptkp_effective_date']));
                            }elseif($item_child['npwp_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['npwp_effective_date']));
                            }elseif($item_child['rekening_effective_date']){
                                $payroll_effective_date = date('Y-m-d',strtotime($item_child['rekening_effective_date']));
                            }else{
                                $payroll_effective_date = null;
                            }
                        }
                        
                        $data_item = array(
                                    'project_id'                                => $item_child['project_id'],
                                    'project_name'                              => $item_child['project_name'],
                                    'pt_id'                                     => $item_child['pt_id'],
                                    'pt_name'                                   => $item_child['pt_name'],
                                    'company_code'                              => $company_code,
                                    'nik_group'                                 => $item_child['nik_group'],
                                    'upload_employee_id'                        => $item_child['upload_employee_id'],
                                    'employee_nik'                              => $item_child['employee_nik'],
                                    'employee_name'                             => $item_child['employee_name'],
                                    'sex'                                       => $item_child['sex'],
                                    'birth_date'                                => $item_child['birth_date'],
                                    'birth_place'                               => $item_child['birth_place'],
                                    'id_type'                                   => 'KTP',
                                    'ktp_number'                                => $item_child['ktp_number'],
                                    'marriagestatus_marriagestatus_id'          => $item_child['marriagestatus_marriagestatus_id'],
                                    'marriagestatus_marriagestatus'             => $item_child['marriagestatus_marriagestatus'],
                                    'nationality'                               => 'Indonesia',
                                    'npwp'                                      => $item_child['npwp'],
                                    'ptkp_id'                                   => $item_child['ptkp_id'],
                                    'ptkp_code'                                 => $item_child['ptkp_code'],
                                    'department_department_id'                  => $item_child['department_department_id'],
                                    'department_department'                     => $item_child['department_department'],
                                    'banding_banding_id'                        => $item_child['banding_banding_id'],
                                    'banding_banding'                           => $item_child['banding_banding'],
                                    'group_group_id'                            => $item_child['group_group_id'],
                                    'group_code'                                => $item_child['group_code'],
                                    'position_position_id'                      => $item_child['position_position_id'],
                                    'position_position'                         => $item_child['position_position'],
                                    'email_ciputra'                             => $item_child['email_ciputra'],
                                    'phone_number'                              => $item_child['phone_number'],
                                    'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                    'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                    'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                    'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],
                                    'payroll_group'                             => 'Group-1',
                                    'ktp_address'                               => $item_child['ktp_address'],
                                    'address'                                   => $item_child['address'],
                                    'payroll_currency'                          => 'IDR',
                                    'payment_method'                            => 'Transfer',
                                    'bank_rekening'                             => $item_child['bank_rekening'],
                                    'nomor_rekening'                            => $item_child['nomor_rekening'],
                                    'nama_rekening'                             => $item_child['nama_rekening'],
                                    'calendar_company'                          => 'Calendar',
                                    'work_shift'                                => '',
                                    'tax_country_code'                          => 'INA',
                                    'fingerprintcode'                           => $item_child['fingerprintcode'],
                                    'cost_center_code'                          => '',
                                    'no_bpjs_k'                                 => $item_child['no_bpjs_k'],
                                    'no_bpjs_kk'                                => $item_child['no_bpjs_kk'],
                                    'no_bpjs_pp'                                => $item_child['no_bpjs_pp'],
                                    'no_manulife_p'                             => $item_child['no_manulife_p'],
                                    'no_asuransi'                               => $item_child['no_asuransi'],
                                    'worklocation_id'                           => $item_child['worklocation_id'],
                                    'worklocation'                              => $item_child['worklocation'],
                                    'worklocation_project_id'                   => $item_child['worklocation_project_id'],
                                    'worklocation_project'                      => $item_child['worklocation_project'],
                                    'worklocation_pt_id'                        => $item_child['worklocation_pt_id'],
                                    'worklocation_pt'                           => $item_child['worklocation_pt'],
                                    'ibu_kandung'                               => $item_child['ibu_kandung'],
                                    'religion_id'                               => $item_child['religion_id'],
                                    'religion_name'                             => $item_child['religion'],
                                    'npwp_effective_date'                       => $item_child['npwp_effective_date'],
                                    'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                    'email'                                     => $item_child['email'],
                                    'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                    'nonactive_date'                            => $item_child['nonactive_date'],
                                    'rekening_effective_date'                   => $item_child['rekening_effective_date'],
                                    'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                    'status_transfer'                           => $item_child['status_transfer'],
                                    'action_process'                            => $item_child['action_process'],
                                    'upload_check'                              => $item_child['upload_check'],
                                    'modion'                                    => $item_child['modion'],
                                    'payroll_effective_date'                    => $payroll_effective_date
                                    // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                    // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
                                );

                        //GET CODE IN CHERRY
                        $code_cherry = $this->codecherry($data_item);

                        $data_item['code'] = $code_cherry;
                        
                                $need_input_cherry_code_item = null;
                                $need_input_cherry_code_emp = null;

                                end($code_cherry);
                                $key_last_code_cherry = key($code_cherry);

                                $need_input_cherry_code_emp = $data_item['employee_name'];
                                
                                foreach($code_cherry as $key => $item){
                                    
                                    $explode_key = null;
                                    $explode_ket = null;
                                    
                                    if(empty($item)){
                                        $need_input_cherry_code++;
                                        $explode_key = explode('_code', $key);
                                        $explode_ket = $explode_key[0];

                                        
                                        if(empty($need_input_cherry_code_item)){
                                            $need_input_cherry_code_item .= '('.$explode_ket;
                                        }else{
                                            $need_input_cherry_code_item .= ', '.$explode_ket;
                                        }

                                    }

                                    if($need_input_cherry_code_item && $key_last_code_cherry == $key){
                                        $need_input_cherry_code_item .= ')';
                                    }
                                }

                                if(empty($data_item['nik_group']) || empty($data_item['ktp_number']) || empty($data_item['npwp']) || empty($data_item['ptkp_id']) ){
                                    if(empty($data_item['nik_group'])){
                                        $need_input_cherry_code_item .= '(NIK Group)';
                                    }
                                    if(empty($data_item['ktp_number'])){
                                        $need_input_cherry_code_item .= '(Ktp)';
                                    }
                                    if(empty($data_item['npwp'])){
                                        $need_input_cherry_code_item .= '(Npwp)';
                                    }
                                    if(empty($data_item['ptkp_id'])){
                                        $need_input_cherry_code_item .= '(PTKP)';
                                    }
                                }
                                
                                if($need_input_cherry_code_item){
                                    if(empty($need_input_cherry_code_ket)){
                                        $need_input_cherry_code_ket .= $need_input_cherry_code_emp.' '.$need_input_cherry_code_item;
                                    }else{
                                        $need_input_cherry_code_ket .= ', '.$need_input_cherry_code_emp.' '.$need_input_cherry_code_item;
                                    }                                   
                                }

                        $datas[] = $data_item;

                        $i++;
                    }
                }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        

        $arrayRespon = array("need_input_cherry_code" => $need_input_cherry_code_ket);
        return Box_Tools::instantRead($need_input_cherry_code_ket);

    }

}

?>
