<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TransferapimasterController extends Box_Models_App_Hermes_AbstractController {

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
        // $dao = new Hrd_Models_Master_DepartmentDao();
        // $hasil = $dao->getAll($this->getAppRequest(),new Hrd_Models_Master_Department());
    
        // $allDepartment = array();
        // foreach ($hasil[1] as $record){
    
        //     $department = new Hrd_Models_Master_Department();
        //     $department->setArrayTable($record);
        //     $allDepartment[] = $department;
        // }
        
        /// alokasibiaya list
        // $dao = new Hrd_Models_Master_AlokasiBiayaDao();
        // $abFilter = new Hrd_Models_Master_AlokasiBiaya();
        // $abFilter->setProject($this->getAppSession()->getProject());
        // $abFilter->setPt($this->getAppSession()->getPt());
        // $hasil = $dao->getAllWOPL($abFilter);
    
        // $allAlokasiBiaya = array();
        // foreach ($hasil[1] as $record){
    
        //     $ab = new Hrd_Models_Master_AlokasiBiaya();
        //     $ab->setArrayTable($record);
        //     $allAlokasiBiaya[] = $ab;
        // }

        /// kategorisk list
        // $dao = new Hrd_Models_Master_Kategorisk_Dao();
        // $kategoriskFilter = new Hrd_Models_Master_Kategorisk_MasterKategoriSK();
        // $kategoriskFilter->setProjectKP($this->getAppSession()->getProject());
        // $kategoriskFilter->setPtKP($this->getAppSession()->getPt());
        // $hasil = $dao->getAllWoPLKP($kategoriskFilter);

        // $allKategorisk = array();
        // foreach ($hasil[1] as $record){
    
        //     $kategorisk = new Hrd_Models_Master_Kategorisk_MasterKategoriSK();
        //     $kategorisk->setArrayTable($record);
        //     $allKategorisk[] = $kategorisk;
        // }

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
        
       // $otherAT = array(array(
       //     "AT_SICK"=>  Box_Config::ABSENTTYPE_SICK,
       //     "AT_PERMISSION"=>  Box_Config::ABSENTTYPE_PERMISSION,
       //     "AT_LEAVE"=>  Box_Config::ABSENTTYPE_LEAVE
       // ));

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
        //$temp_pt_cherry = null;

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

        // $dm->setHasil(array($pt,$project,$allDepartment,$allAlokasiBiaya,$otherAT,$allKategorisk,$allprojectpt,$allemp,$allpt_cherry));

        $dm->setHasil(array($pt,$project,$allprojectpt,$allpt_cherry,$allemp));

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

    public function get_employeeptRead(){

        $data = $this->getAppData();
        $pt_id = $data['pt_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            //$arr_temp_union_projectpt = null;

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

            //menjadi
            //$hasil = null;
            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => '',
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );

                    $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);

                    $get = $get[1];
                    $i = 0;
                    foreach($get as $key_child => $item_child){
                            if($item_child['employee_id']){
                                $datas[] = array(
                                            'project_id'                                => $item_child['project_id'],
                                            'project_name'                              => $item_child['project_name'],
                                            'pt_id'                                     => $item_child['pt_id'],
                                            'pt_name'                                   => $item_child['pt_name'],
                                            'nik_group'                                 => $item_child['nik_group'],
                                            'employee_id'                               => $item_child['employee_id'],
                                            'employee_nik'                              => $item_child['employee_nik'],
                                            'employee_name'                             => $item_child['employee_name'],
                                            
                                        );
                                $i++;
                            }
                        }
                }
                $hasil[0][0]['totalRow'] = $i;
                $hasil[1]= $datas;
            }

        
        // $em = new Hrd_Models_Master_EmployeePersonal();
        // $em->setProject($this->getAppSession()->getProject());
        // $em->setPt($this->getAppSession()->getPt());
        // $dao = new Hrd_Models_Master_EmployeeDao();
        
        // $hasil = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);

        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("employeeb", $hasil,FALSE);
        }
        return Box_Tools::instantRead(array(), array($hasil));
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
        $temp_pt_cherry = null;

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

    public function get_master_deptRead(){
        
        $data = $this->getAppData();
        //ganti
        // $projectpt_id = $data['projectpt_id'];
        //menjadi
        $pt_id = $data['pt_id'];
        
        
        // ALL
        //ganti
        // if($projectpt_id == '999'){
        //menjadi
        if($pt_id == '999'){
            /// projectpt list
            //ganti
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            //menjadi
            // ganti lagi menjadi yg dibawah

            /// pt list access
            // $dao = new Hrd_Models_Master_Ptaccess_Dao();
            // $ptFilter = new Hrd_Models_Master_Ptaccess_PtAccess();
            // $ptFilter->setUserid($this->getAppSession()->getUserId());
            // $ptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $hasil_pt = $dao->getAllWoPL($ptFilter);
            // /// pt list x cherry
            // $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            // $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
            
            // $RowNum = 0;
            // $temp_pt_cherry = null;

            // foreach($hasil_pt[1] as $key => $item){
                
            //     $pt_cherryFilter->setPtptId($item['ptpt_id']);
            //     $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
                
            //     if($hasil_pt_cherry[0][0]['totalRow'] > 0){
            //         $RowNum++;
            //         $temp_pt_cherry[] = array(
            //                                     'RowNum'        => $RowNum,
            //                                     'ptpt_id'       => $item['ptpt_id'],
            //                                     'ptpt_name'     => $item['ptpt_name'],
            //                                     'company_code'  => $hasil_pt_cherry[1][0]['company_code']
            //         );
            //     }
            // }
            
            // $allprojectpt[0][0]['totalRow'] = $RowNum;
            // $allprojectpt[1] = $temp_pt_cherry;

            // menjadi
            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_Department();
            $dao = new Hrd_Models_Master_DepartmentDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                //ganti
                // $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
                //menjadi, ganti lagi menjadi yg dibawah
                // $get = $dao->getAllPt($this->getAppRequest(), $em, $this->getAppSession(), $item['ptpt_id']);

                //menjadi
                $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);

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
                                    'company_code'  => $item['company_code'],
                                    // 'description'   => $item_child['description']
                                );
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

            $arr_temp_union_projectpt = null;

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
            $em = new Hrd_Models_Master_Department();
            $dao = new Hrd_Models_Master_DepartmentDao();
            
            $totalRow_all = 0;
            $hasil_all = null;
            $i_all = 0;

            //added by michael 27/09/2021
            $id_choose = null;
            $each_id_choose = null;

            if(array_key_exists('department_id_choose', $data)){
                $id_choose = $data['department_id_choose'];
            }

            if($id_choose){
                $each_id_choose = explode('~', $id_choose);
            }
            //end added by michael 27/09/2021

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $hasil = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
                    
                    if($hasil[0][0]['totalRow'] > 0){
                        
                        $totalRow_all += $hasil[0][0]['totalRow'];

                        foreach($hasil[1] as $key_hasil => $item_hasil){

                            // $i_all++;

                            // $hasil_all[] = array(
                            //                     'RowNum'        => $i_all,
                            //                     'department_id' => $item_hasil['department_id'],
                            //                     'department'    => $item_hasil['department'],
                            //                     'project_id'    => $item_hasil['project_id'],
                            //                     'project_name'  => $item_hasil['project_name'],
                            //                     'pt_id'         => $item_hasil['pt_id'],
                            //                     'pt_name'       => $item_hasil['pt_name'],
                            //                     'code'          => $item_hasil['code'],
                            //                     'company_code'  => $company_code,
                            //                     // 'description'   => $item_child['description']
                            //                 );

                            //added by michael 27/09/2021
                            if($id_choose){
                                foreach($each_id_choose as $key_choose => $item_choose){
                                    if($item_choose && $item_choose == $item_hasil['department_id']){

                                        $i_all++;

                                        $hasil_all[] = array(
                                                            'RowNum'        => $i_all,
                                                            'department_id' => $item_hasil['department_id'],
                                                            'department'    => $item_hasil['department'],
                                                            'project_id'    => $item_hasil['project_id'],
                                                            'project_name'  => $item_hasil['project_name'],
                                                            'pt_id'         => $item_hasil['pt_id'],
                                                            'pt_name'       => $item_hasil['pt_name'],
                                                            'code'          => $item_hasil['code'],
                                                            'company_code'  => $company_code,
                                                        );
                                    }
                                }
                            }else{
                                $i_all++;

                                $hasil_all[] = array(
                                                    'RowNum'        => $i_all,
                                                    'department_id' => $item_hasil['department_id'],
                                                    'department'    => $item_hasil['department'],
                                                    'project_id'    => $item_hasil['project_id'],
                                                    'project_name'  => $item_hasil['project_name'],
                                                    'pt_id'         => $item_hasil['pt_id'],
                                                    'pt_name'       => $item_hasil['pt_name'],
                                                    'code'          => $item_hasil['code'],
                                                    'company_code'  => $company_code,
                                                );
                            }
                            //end added by michael 27/09/2021
                        }
                    }
                }
            }

            $hasil = null;
            $hasil[0][0]['totalRow'] = $totalRow_all;
            $hasil[1] = $hasil_all;

            //ganti
            // $hasil = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $projectpt_id);
            
            //menjadi ,, ganti lagi menjadi yg diatas
            // $hasil = $dao->getAllPt($this->getAppRequest(), $em, $this->getAppSession(), $pt_id);

        }
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'department', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_bandingRead(){
        
        $data = $this->getAppData();
        //ganti
        // $projectpt_id = $data['projectpt_id'];
        //menjadi
        $pt_id = $data['pt_id'];

        //tembak ke KP (tidak jadi tembak ke KP, biar kan sesuai company yg dipilih, jadi gak masalah kalo double 06/11/2020)
        // $pt_id = '1';

        $em = new Hrd_Models_Performancemanagement_Banding();
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $get = $dao->getAllBanding($em);
        $get = $get[1];

        if($pt_id == '999'){
            
            $allprojectpt = $this->all_projectpt_companycherry();

            foreach($allprojectpt[1] as $key => $item){
                $i = 0;
                foreach($get as $key_child => $item_child){
                    if($item_child['banding_id']){

                        $i++;
                        
                        if(empty($item_child['description'])){
                            $description = null;
                        }else{
                            $description = $item_child['description'];
                        }

                        if(empty($item_child['index_no'])){
                            $index_no = null;
                        }else{
                            $index_no = $item_child['index_no'];
                        }

                        $datas[] = array(
                                    'RowNum'        => $i,
                                    'banding_id'    => $item_child['banding_id'],
                                    'code'          => $item_child['code'],
                                    'banding'       => $item_child['banding'],
                                    'description'   => $description,
                                    'index_no'      => $index_no,
                                    'company_code'  => $item['company_code'],
                                    'pt_id'         => $item['ptpt_id'],
                                    'pt_name'       => $item['ptpt_name'],
                                );
                    }
                }
            }

            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;

        }else{
            
            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];

            $i = 0;

            //added by michael 27/09/2021
            $id_choose = null;
            $each_id_choose = null;
            
            if(array_key_exists('banding_id_choose', $data)){
                $id_choose = $data['banding_id_choose'];
            }

            if($id_choose){
                $each_id_choose = explode('~', $id_choose);
            }
            //end added by michael 27/09/2021

            foreach($get as $key_child => $item_child){
                if($item_child['banding_id']){

                    if(empty($item_child['description'])){
                        $description = null;
                    }else{
                        $description = $item_child['description'];
                    }

                    if(empty($item_child['index_no'])){
                        $index_no = null;
                    }else{
                        $index_no = $item_child['index_no'];
                    }

                    // $i++;
                    // $datas[] = array(
                    //             'RowNum'        => $i,
                    //             'banding_id'    => $item_child['banding_id'],
                    //             'code'          => $item_child['code'],
                    //             'banding'       => $item_child['banding'],
                    //             'description'   => $description,
                    //             'index_no'      => $index_no,
                    //             'company_code'  => $company_code,
                    //             'pt_id'         => $hasil_pt_cherry[1][0]['ptpt_id'],
                    //             'pt_name'       => $hasil_pt_cherry[1][0]['ptpt_name'],
                    //         );

                    //added by michael 27/09/2021
                    if($id_choose){
                        foreach($each_id_choose as $key_choose => $item_choose){
                            if($item_choose && $item_choose == $item_child['banding_id']){

                                $i++;
                                $datas[] = array(
                                            'RowNum'        => $i,
                                            'banding_id'    => $item_child['banding_id'],
                                            'code'          => $item_child['code'],
                                            'banding'       => $item_child['banding'],
                                            'description'   => $description,
                                            'index_no'      => $index_no,
                                            'company_code'  => $company_code,
                                            'pt_id'         => $hasil_pt_cherry[1][0]['ptpt_id'],
                                            'pt_name'       => $hasil_pt_cherry[1][0]['ptpt_name'],
                                        );
                            }
                        }
                    }else{
                        $i++;
                        $datas[] = array(
                                    'RowNum'        => $i,
                                    'banding_id'    => $item_child['banding_id'],
                                    'code'          => $item_child['code'],
                                    'banding'       => $item_child['banding'],
                                    'description'   => $description,
                                    'index_no'      => $index_no,
                                    'company_code'  => $company_code,
                                    'pt_id'         => $hasil_pt_cherry[1][0]['ptpt_id'],
                                    'pt_name'       => $hasil_pt_cherry[1][0]['ptpt_name'],
                                );
                    }
                    //end added by michael 27/09/2021
                }
            }

            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;

        }
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_groupRead(){
        
        $data = $this->getAppData();
        //ganti
        // $projectpt_id = $data['projectpt_id'];
        //menjadi
        $pt_id = $data['pt_id'];
        
        
        // ALL
        //ganti
        // if($projectpt_id == '999'){
        //menjadi
        if($pt_id == '999'){
            /// projectpt list
            //ganti
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            //menjadi
            // ganti lagi menjadi yg dibawah

            /// pt list access
            // $dao = new Hrd_Models_Master_Ptaccess_Dao();
            // $ptFilter = new Hrd_Models_Master_Ptaccess_PtAccess();
            // $ptFilter->setUserid($this->getAppSession()->getUserId());
            // $ptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $hasil_pt = $dao->getAllWoPL($ptFilter);
            // /// pt list x cherry
            // $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            // $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
            
            // $RowNum = 0;
            // $temp_pt_cherry = null;

            // foreach($hasil_pt[1] as $key => $item){
                
            //     $pt_cherryFilter->setPtptId($item['ptpt_id']);
            //     $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
                
            //     if($hasil_pt_cherry[0][0]['totalRow'] > 0){
            //         $RowNum++;
            //         $temp_pt_cherry[] = array(
            //                                     'RowNum'        => $RowNum,
            //                                     'ptpt_id'       => $item['ptpt_id'],
            //                                     'ptpt_name'     => $item['ptpt_name'],
            //                                     'company_code'  => $hasil_pt_cherry[1][0]['company_code']
            //         );
            //     }
            // }
            
            // $allprojectpt[0][0]['totalRow'] = $RowNum;
            // $allprojectpt[1] = $temp_pt_cherry;

            // menjadi
            $allprojectpt = $this->all_projectpt_companycherry();


            $em = new Hrd_Models_Master_Group();
            $dao = new Hrd_Models_Master_GroupDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                //ganti
                // $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
                //menjadi, ganti lagi menjadi yg dibawah
                // $get = $dao->getAllPt($this->getAppRequest(), $em, $this->getAppSession(), $item['ptpt_id']);

                //menjadi
                $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
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
                                    'company_code'  => $item['company_code'],
                                    // 'uang_makan'                => $item_child['uang_makan'],
                                    // 'uang_makan_extra'          => $item_child['uang_makan_extra'],
                                    // 'uang_transport'            => $item_child['uang_transport'],
                                    // 'uang_hadir'                => $item_child['uang_hadir'],
                                    // 'denda_terlambat'           => $item_child['denda_terlambat'],
                                    // 'uang_transport_mod'        => $item_child['uang_transport_mod'],
                                    // 'uang_makan_mod'            => $item_child['uang_makan_mod']
                                );
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

            $arr_temp_union_projectpt = null;

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
            $em = new Hrd_Models_Master_Group();
            $dao = new Hrd_Models_Master_GroupDao();
            
            $totalRow_all = 0;
            $hasil_all = null;
            $i_all = 0;

            //added by michael 27/09/2021
            $id_choose = null;
            $each_id_choose = null;
            
            if(array_key_exists('group_id_choose', $data)){
                $id_choose = $data['group_id_choose'];
            }

            if($id_choose){
                $each_id_choose = explode('~', $id_choose);
            }
            //end added by michael 27/09/2021

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $hasil = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $item['projectpt_id']);
                    
                    if($hasil[0][0]['totalRow'] > 0){
                        
                        $totalRow_all += $hasil[0][0]['totalRow'];

                        foreach($hasil[1] as $key_hasil => $item_hasil){

                            // $i_all++;

                            // $hasil_all[] = array(
                            //                     'RowNum'        => $i_all,
                            //                     'group_id'      => $item_hasil['group_id'],
                            //                     'group'         => $item_hasil['group'],
                            //                     'project_id'    => $item_hasil['project_id'],
                            //                     'project_name'  => $item_hasil['project_name'],
                            //                     'pt_id'         => $item_hasil['pt_id'],
                            //                     'pt_name'       => $item_hasil['pt_name'],
                            //                     'code'          => $item_hasil['code'],
                            //                     'company_code'  => $company_code,
                            //                     // 'uang_makan'                => $item_hasil['uang_makan'],
                            //                     // 'uang_makan_extra'          => $item_hasil['uang_makan_extra'],
                            //                     // 'uang_transport'            => $item_hasil['uang_transport'],
                            //                     // 'uang_hadir'                => $item_hasil['uang_hadir'],
                            //                     // 'denda_terlambat'           => $item_hasil['denda_terlambat'],
                            //                     // 'uang_transport_mod'        => $item_hasil['uang_transport_mod'],
                            //                     // 'uang_makan_mod'            => $item_hasil['uang_makan_mod']
                            //                 );

                            //added by michael 27/09/2021
                            if($id_choose){
                                foreach($each_id_choose as $key_choose => $item_choose){
                                    if($item_choose && $item_choose == $item_hasil['group_id']){

                                        $i_all++;

                                        $hasil_all[] = array(
                                                            'RowNum'        => $i_all,
                                                            'group_id'      => $item_hasil['group_id'],
                                                            'group'         => $item_hasil['group'],
                                                            'project_id'    => $item_hasil['project_id'],
                                                            'project_name'  => $item_hasil['project_name'],
                                                            'pt_id'         => $item_hasil['pt_id'],
                                                            'pt_name'       => $item_hasil['pt_name'],
                                                            'code'          => $item_hasil['code'],
                                                            'company_code'  => $company_code,
                                                        );
                                    }
                                }
                            }else{
                                $i_all++;

                                $hasil_all[] = array(
                                                    'RowNum'        => $i_all,
                                                    'group_id'      => $item_hasil['group_id'],
                                                    'group'         => $item_hasil['group'],
                                                    'project_id'    => $item_hasil['project_id'],
                                                    'project_name'  => $item_hasil['project_name'],
                                                    'pt_id'         => $item_hasil['pt_id'],
                                                    'pt_name'       => $item_hasil['pt_name'],
                                                    'code'          => $item_hasil['code'],
                                                    'company_code'  => $company_code,
                                                );
                            }
                            //end added by michael 27/09/2021
                        }
                    }
                }
            }

            $hasil = null;
            $hasil[0][0]['totalRow'] = $totalRow_all;
            $hasil[1] = $hasil_all;

            //ganti
            // $hasil = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $projectpt_id);
            //menjadi ,, ganti menjadi yg diatas
            //$hasil = $dao->getAllPt($this->getAppRequest(), $em, $this->getAppSession(), $pt_id);

        }
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'group', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_jobfamilyRead(){
        
        $data = $this->getAppData();
        //ganti
        // $projectpt_id = $data['projectpt_id'];
        //menjadi
        $pt_id = $data['pt_id'];
        
        $em = new Hrd_Models_Performancemanagement_JobFamily();
        $dao = new Hrd_Models_Performancemanagement_JobFamilyDao();
        $hasil = $dao->getAllJobFamily($em);

        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'jobfamily', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function get_master_positionRead(){
        
        $data = $this->getAppData();
        //ganti
        // $projectpt_id = $data['projectpt_id'];
        //menjadi
        $pt_id = $data['pt_id'];
        
        // $em = new Hrd_Models_Master_Position();
        // $dao = new Hrd_Models_Master_PositionDao();
        // $hasil = $dao->getAllPosition($em);


        if($pt_id == '999'){

            $allprojectpt = $this->all_projectpt_companycherry();
            
            $hasil_group_by = $this->group_by("subholding_subname", $allprojectpt[1]);
            foreach($hasil_group_by as $key => $item){
                $allprojectpt_subname[] = $key;
            }

            $em = new Hrd_Models_Master_Position();
            $dao = new Hrd_Models_Master_PositionDao();
            $get = array();
            $i = 0;
            foreach($hasil_group_by as $key => $item){
                $get = $dao->getAllSubholdingSubname($em, $key, $this->getAppSession(), $item['projectpt_id']);
                $get = $get[1];

                //INI UNTUK PER SH, LANGSUNG AMBIL COMPANY CODE PERTAMA AJA
                foreach($get as $key_child => $item_child){
                        if($item_child['position_id']){
                            $datas[] = array(
                                        'position_id'           => $item_child['position_id'],
                                        'position'              => $item_child['position'],
                                        'description'           => $item_child['description'],
                                        'subholding_subname'    => $item_child['subholding_subname'],
                                        'company_code'          => $item[0]['company_code'],
                                        'pt_id'                 => $item[0]['ptpt_id'],
                                        'pt_name'               => $item[0]['ptpt_name'],
                                    );
                            $i++;
                        }
                }
                
                //INI KALO PER PT SATU PERSATU
                // foreach($item as $key_group => $item_group){
                //     foreach($get as $key_child => $item_child){
                //         if($item_child['position_id']){
                //             $datas[] = array(
                //                         'position_id'           => $item_child['position_id'],
                //                         'position'              => $item_child['position'],
                //                         'description'           => $item_child['description'],
                //                         'subholding_subname'    => $item_child['subholding_subname'],
                //                         'company_code'          => $item_group['company_code'],
                //                     );
                //             $i++;
                //         }
                //     }
                // }
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

            $arr_temp_union_projectpt = null;

            if($allprojectpt[0][0]['totalRow'] > 0){
                foreach($allprojectpt[1] as $key => $item){
                    if($item['pt_id'] == $pt_id){
                        $arr_temp_union_projectpt[] = $item;
                    }
                }

            }

            //cek pt_id nya sama atau tidak KHUSUS POSITION SAJA, karena poition per sh
            $temp_check_pt_id = null;
            $arr_check_pt_id = null;
            foreach($arr_temp_union_projectpt as $key => $item){
                if(empty($temp_check_pt_id)){
                    $temp_check_pt_id = $item['pt_id'];
                    $arr_check_pt_id[] = $item;
                }elseif($temp_check_pt_id != $item['pt_id']){
                    $arr_check_pt_id[] = $item;
                }
            }
            if($arr_check_pt_id){
                $arr_temp_union_projectpt = $arr_check_pt_id;
            }

            //CARI COMPANY CODE NYA
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

            $company_code = $hasil_pt_cherry[1][0]['company_code'];
            
            // SETELAH KETEMU PROJECTPTID nya, baru di ambil datanya
            $em = new Hrd_Models_Master_Position();
            $dao = new Hrd_Models_Master_PositionDao();
            
            $totalRow_all = 0;
            $hasil_all = null;
            $i_all = 0;

            //added by michael 27/09/2021
            $id_choose = null;
            $each_id_choose = null;
            
            if(array_key_exists('position_id_choose', $data)){
                $id_choose = $data['position_id_choose'];
            }

            if($id_choose){
                $each_id_choose = explode('~', $id_choose);
            }
            //end added by michael 27/09/2021

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $hasil = $dao->getAllSubholdingSubname($em, $item['subholding_subname'], $this->getAppSession(), $item['projectpt_id']);
                    
                    if($hasil[0][0]['totalRow'] > 0){
                        
                        $totalRow_all += $hasil[0][0]['totalRow'];

                        foreach($hasil[1] as $key_hasil => $item_hasil){

                            // $i_all++;

                            // $hasil_all[] = array(
                            //                     'position_id'           => $item_hasil['position_id'],
                            //                     'position'              => $item_hasil['position'],
                            //                     'description'           => $item_hasil['description'],
                            //                     'subholding_subname'    => $item_hasil['subholding_subname'],
                            //                     'company_code'          => $company_code,
                            //                     'pt_id'                 => $hasil_pt_cherry[1][0]['ptpt_id'],
                            //                     'pt_name'               => $hasil_pt_cherry[1][0]['ptpt_name'],
                            //                 );

                            //added by michael 27/09/2021
                            if($id_choose){
                                foreach($each_id_choose as $key_choose => $item_choose){
                                    if($item_choose && $item_choose == $item_hasil['position_id']){

                                        $i_all++;

                                        $hasil_all[] = array(
                                                            'position_id'           => $item_hasil['position_id'],
                                                            'position'              => $item_hasil['position'],
                                                            'description'           => $item_hasil['description'],
                                                            'subholding_subname'    => $item_hasil['subholding_subname'],
                                                            'company_code'          => $company_code,
                                                            'pt_id'                 => $hasil_pt_cherry[1][0]['ptpt_id'],
                                                            'pt_name'               => $hasil_pt_cherry[1][0]['ptpt_name'],
                                                        );
                                    }
                                }
                            }else{
                                $i_all++;

                                $hasil_all[] = array(
                                                    'position_id'           => $item_hasil['position_id'],
                                                    'position'              => $item_hasil['position'],
                                                    'description'           => $item_hasil['description'],
                                                    'subholding_subname'    => $item_hasil['subholding_subname'],
                                                    'company_code'          => $company_code,
                                                    'pt_id'                 => $hasil_pt_cherry[1][0]['ptpt_id'],
                                                    'pt_name'               => $hasil_pt_cherry[1][0]['ptpt_name'],
                                                );
                            }
                            //end added by michael 27/09/2021
                        }
                    }
                }
            }

            $hasil = null;
            $hasil[0][0]['totalRow'] = $totalRow_all;
            $hasil[1] = $hasil_all;

        }


        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'position', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

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

    public function get_master_employeeRead(){
        
        $data = $this->getAppData();
        //ganti
        // $projectpt_id = $data['projectpt_id'];
        //menjadi
        $pt_id = $data['pt_id'];
        $employee_id = $data['employee_id'];
        $start_date = date('Y-m-d',strtotime($data['start_date']));
        $end_date = date('Y-m-d',strtotime($data['end_date']));
        $appdata = array(
                    // 'projectpt_id'      => $projectpt_id,
                    'pt_id'             => $pt_id,
                    'employee_id'       => $employee_id,
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        if($start_date == '1970-01-01'){
            $start_date = null;
        }
        if($end_date == '1970-01-01'){
            $end_date = null;
        }
        
        // ALL
        //ganti
        // if($projectpt_id == '999'){
        //menjadi
        if($pt_id == '999'){
            /// projectpt list
            //ganti
            // $dao = new Hrd_Models_Master_Projectpt_Dao();
            // $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            // $projectptFilter->setUserid($this->getAppSession()->getUserId());
            // $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            // $allprojectpt = $dao->getAllWoPL($projectptFilter);

            //menjadi
            $allprojectpt = $this->all_projectpt_companycherry();

            $em = new Hrd_Models_Master_EmployeePersonal();
            $dao = new Hrd_Models_Master_EmployeeDao();
            $get = array();
            $i = 1;
            foreach($allprojectpt[1] as $key => $item){
                $appdata = array(
                    'projectpt_id'      => $item['projectpt_id'],
                    'employee_id'       => $employee_id,
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );
                $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);
                $get = $get[1];
                foreach($get as $key_child => $item_child){
                    // if(!empty($start_date) && !empty($end_date)){
                    //     if($start_date <= $item_child['statusinformation_hire_date'] && $end_date >= $item_child['statusinformation_hire_date']){
                    //         $item_child['employee_id'] = $item_child['employee_id'];
                    //     }else{
                    //         $item_child['employee_id'] = null;
                    //     }
                    // }

                    if($item_child['employee_id']){
                        $data[] = array(
                                    'project_id'                                => $item_child['project_id'],
                                    'project_name'                              => $item_child['project_name'],
                                    'pt_id'                                     => $item_child['pt_id'],
                                    'pt_name'                                   => $item_child['pt_name'],
                                    'nik_group'                                 => $item_child['nik_group'],
                                    'company_code'                              => $item['company_code'],
                                    'employee_id'                               => $item_child['employee_id'],
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
                                    'ptkp_id'                                   => $item_child['ptkp_ptkp_id'],
                                    'ptkp_code'                                 => $item_child['ptkp_ptkp_code'],
                                    'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                    'department_department_id'                  => $item_child['department_department_id'],
                                    'department_department'                     => $item_child['department_department'],
                                    'banding_banding_id'                        => $item_child['banding_banding_id'],
                                    'banding_banding'                           => $item_child['banding_banding'],
                                    'group_group_id'                            => $item_child['group_group_id'],
                                    'group_code'                                => $item_child['group_code'],
                                    'position_position_id'                      => $item_child['position_position_id'],
                                    'position_position'                         => $item_child['position_position'],
                                    'email'                                     => $item_child['email'],
                                    'email_ciputra'                             => $item_child['email_ciputra'],
                                    'phone_number'                              => $item_child['phone_number'],
                                    'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                    'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                    'statusinformation_id'                      => $item_child['statusinformation_id'],
                                    'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                    'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                    'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],

                                    'statusinformation_consultant_start'        => $item_child['statusinformation_consultant_start'],
                                    'statusinformation_consultant_end'          => $item_child['statusinformation_consultant_end'],

                                    'nonactive_date'                            => $item_child['nonactive_date'],
                                    'payroll_group'                             => $item_child['payroll_group'],
                                    'payrollgroup_id'                           => $item_child['payrollgroup_id'],
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
                                    'alokasibiaya_id'                           => $item_child['alokasibiaya_id'],
                                    'code_alokasibiaya'                         => $item_child['code_ab'],
                                    'name_alokasibiaya'                         => $item_child['name_ab'],
                                    'alokasibiaya_id2'                          => $item_child['alokasibiaya_id2'],
                                    'code_alokasibiaya2'                        => $item_child['code_ab2'],
                                    'name_alokasibiaya2'                        => $item_child['name_ab2'],
                                    'alokasibiaya_id3'                          => $item_child['alokasibiaya_id3'],
                                    'code_alokasibiaya3'                        => $item_child['code_ab3'],
                                    'name_alokasibiaya4'                        => $item_child['name_ab3'],
                                    'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                    'addon'                                     => $item_child['addon'],
                                    'modion'                                    => $item_child['modion'],
                                    'payroll_effective_date'                    => $item_child['payroll_effective_date'],
                                    'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    'religion_religion_id'                      => $item_child['religion_religion_id'],
                                    'religion_religion'                         => $item_child['religion_religion'],
                                    // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                    // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                    // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
                                );

                        //GET CODE IN CHERRY
                        $code_cherry = $this->codecherry($data);

                        $data['code'] = $code_cherry;
                                
                        $datas[] = $data;

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

            $arr_temp_union_projectpt = null;

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

            //added by michael 27/09/2021
            $id_choose = null;
            $each_id_choose = null;
            
            if(array_key_exists('employee_id_choose', $data)){
                $id_choose = $data['employee_id_choose'];
            }

            if($id_choose){
                $each_id_choose = explode('~', $id_choose);
            }
            //end added by michael 27/09/2021

            //menjadi
            $hasil = null;
            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => $employee_id,
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);

                    $get = $get[1];
                    $i = 0;
                    foreach($get as $key_child => $item_child){
                            // if(!empty($start_date) && !empty($end_date)){
                            //     if($start_date <= $item_child['statusinformation_hire_date'] && $end_date >= $item_child['statusinformation_hire_date']){
                            //         $item_child['employee_id'] = $item_child['employee_id'];
                            //     }else{
                            //         $item_child['employee_id'] = null;
                            //     }
                            // }
                       
                            if($item_child['employee_id']){

                                // $data = array(
                                //             'project_id'                                => $item_child['project_id'],
                                //             'project_name'                              => $item_child['project_name'],
                                //             'pt_id'                                     => $item_child['pt_id'],
                                //             'pt_name'                                   => $item_child['pt_name'],
                                //             'company_code'                              => $company_code,
                                //             'nik_group'                                 => $item_child['nik_group'],
                                //             'employee_id'                               => $item_child['employee_id'],
                                //             'employee_nik'                              => $item_child['employee_nik'],
                                //             'employee_name'                             => $item_child['employee_name'],
                                //             'sex'                                       => $item_child['sex'],
                                //             'birth_date'                                => $item_child['birth_date'],
                                //             'birth_place'                               => $item_child['birth_place'],
                                //             'id_type'                                   => 'KTP',
                                //             'ktp_number'                                => $item_child['ktp_number'],
                                //             'marriagestatus_marriagestatus_id'          => $item_child['marriagestatus_marriagestatus_id'],
                                //             'marriagestatus_marriagestatus'             => $item_child['marriagestatus_marriagestatus'],
                                //             'nationality'                               => 'Indonesia',
                                //             'npwp'                                      => $item_child['npwp'],
                                //             'ptkp_id'                                   => $item_child['ptkp_ptkp_id'],
                                //             'ptkp_code'                                 => $item_child['ptkp_ptkp_code'],
                                //             'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                //             'department_department_id'                  => $item_child['department_department_id'],
                                //             'department_department'                     => $item_child['department_department'],
                                //             'banding_banding_id'                        => $item_child['banding_banding_id'],
                                //             'banding_banding'                           => $item_child['banding_banding'],
                                //             'group_group_id'                            => $item_child['group_group_id'],
                                //             'group_code'                                => $item_child['group_code'],
                                //             'position_position_id'                      => $item_child['position_position_id'],
                                //             'position_position'                         => $item_child['position_position'],
                                //             'email'                                     => $item_child['email'],
                                //             'email_ciputra'                             => $item_child['email_ciputra'],
                                //             'phone_number'                              => $item_child['phone_number'],
                                //             'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                //             'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                //             'statusinformation_id'                      => $item_child['statusinformation_id'],
                                //             'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                //             'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                //             'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                //             'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],

                                //             'statusinformation_consultant_start'        => $item_child['statusinformation_consultant_start'],
                                //             'statusinformation_consultant_end'          => $item_child['statusinformation_consultant_end'],

                                //             'nonactive_date'                            => $item_child['nonactive_date'],
                                //             'payroll_group'                             => $item_child['payroll_group'],
                                //             'payrollgroup_id'                           => $item_child['payrollgroup_id'],
                                //             'ktp_address'                               => $item_child['ktp_address'],
                                //             'address'                                   => $item_child['address'],
                                //             'payroll_currency'                          => 'IDR',
                                //             'payment_method'                            => 'Transfer',
                                //             'bank_rekening'                             => $item_child['bank_rekening'],
                                //             'nomor_rekening'                            => $item_child['nomor_rekening'],
                                //             'nama_rekening'                             => $item_child['nama_rekening'],
                                //             'calendar_company'                          => 'Calendar',
                                //             'work_shift'                                => '',
                                //             'tax_country_code'                          => 'INA',
                                //             'fingerprintcode'                           => $item_child['fingerprintcode'],
                                //             'cost_center_code'                          => '',
                                //             'no_bpjs_k'                                 => $item_child['no_bpjs_k'],
                                //             'no_bpjs_kk'                                => $item_child['no_bpjs_kk'],
                                //             'no_bpjs_pp'                                => $item_child['no_bpjs_pp'],
                                //             'no_manulife_p'                             => $item_child['no_manulife_p'],
                                //             'no_asuransi'                               => $item_child['no_asuransi'],
                                //             'worklocation_id'                           => $item_child['worklocation_id'],
                                //             'worklocation'                              => $item_child['worklocation'],
                                //             'worklocation_project_id'                   => $item_child['worklocation_project_id'],
                                //             'worklocation_project'                      => $item_child['worklocation_project'],
                                //             'worklocation_pt_id'                        => $item_child['worklocation_pt_id'],
                                //             'worklocation_pt'                           => $item_child['worklocation_pt'],
                                //             'ibu_kandung'                               => $item_child['ibu_kandung'],
                                //             'alokasibiaya_id'                           => $item_child['alokasibiaya_id'],
                                //             'code_alokasibiaya'                         => $item_child['code_ab'],
                                //             'name_alokasibiaya'                         => $item_child['name_ab'],
                                //             'alokasibiaya_id2'                          => $item_child['alokasibiaya_id2'],
                                //             'code_alokasibiaya2'                        => $item_child['code_ab2'],
                                //             'name_alokasibiaya2'                        => $item_child['name_ab2'],
                                //             'alokasibiaya_id3'                          => $item_child['alokasibiaya_id3'],
                                //             'code_alokasibiaya3'                        => $item_child['code_ab3'],
                                //             'name_alokasibiaya4'                        => $item_child['name_ab3'],
                                //             'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                //             'addon'                                     => $item_child['addon'],
                                //             'modion'                                    => $item_child['modion'],
                                //             'payroll_effective_date'                    => $item_child['payroll_effective_date'],
                                //             'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                //             'religion_religion_id'                      => $item_child['religion_religion_id'],
                                //             'religion_religion'                         => $item_child['religion_religion'],
                                //             // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                //             // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                //             // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
                                //         );

                                // $i++;

                                //added by michael 27/09/2021
                                if($id_choose){
                                    foreach($each_id_choose as $key_choose => $item_choose){
                                        if($item_choose && $item_choose == $item_child['employee_id']){
                                            
                                            $i++;

                                            $data_item = $this->array_employee($item_child, $company_code);

                                            //GET CODE IN CHERRY
                                            $code_cherry = $this->codecherry($data_item);

                                            $data_item['code'] = $code_cherry;
                                            
                                            $datas[] = $data_item;
                                        }
                                    }
                                }else{
                                    $i++;

                                    $data_item = $this->array_employee($item_child, $company_code);

                                    //GET CODE IN CHERRY
                                    $code_cherry = $this->codecherry($data_item);

                                    $data_item['code'] = $code_cherry;
                                    
                                    $datas[] = $data_item;
                                }
                                //end added by michael 27/09/2021

                            }
                        }
                }
                $hasil[0][0]['totalRow'] = $i;
                $hasil[1]= $datas;
            }
            
            //ganti
            // $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $this->getAppData());
            // $get = $get[1];
            // $i = 1;
            // foreach($get as $key_child => $item_child){
            //         if(!empty($start_date) && !empty($end_date)){
            //             if($start_date <= $item_child['statusinformation_hire_date'] && $end_date >= $item_child['statusinformation_hire_date']){
            //                 $item_child['employee_id'] = $item_child['employee_id'];
            //             }else{
            //                 $item_child['employee_id'] = null;
            //             }
            //         }
            //         if($item_child['employee_id']){
            //                 // print_r($item_child);die();
            //             $datas[] = array(
            //                         'project_id'                                => $item_child['project_id'],
            //                         'project_name'                              => $item_child['project_name'],
            //                         'pt_id'                                     => $item_child['pt_id'],
            //                         'pt_name'                                   => $item_child['pt_name'],
            //                         'nik_group'                                 => $item_child['nik_group'],
            //                         'employee_id'                               => $item_child['employee_id'],
            //                         'employee_nik'                              => $item_child['employee_nik'],
            //                         'employee_name'                             => $item_child['employee_name'],
            //                         'sex'                                       => $item_child['sex'],
            //                         'birth_date'                                => $item_child['birth_date'],
            //                         'birth_place'                               => $item_child['birth_place'],
            //                         'id_type'                                   => 'KTP',
            //                         'ktp_number'                                => $item_child['ktp_number'],
            //                         'marriagestatus_marriagestatus_id'          => $item_child['marriagestatus_marriagestatus_id'],
            //                         'marriagestatus_marriagestatus'             => $item_child['marriagestatus_marriagestatus'],
            //                         'nationality'                               => 'Indonesia',
            //                         'npwp'                                      => $item_child['npwp'],
            //                         'ptkp_id'                                   => $item_child['ptkp_ptkp_id'],
            //                         'ptkp_code'                                 => $item_child['ptkp_ptkp_code'],
            //                         'department_department_id'                  => $item_child['department_department_id'],
            //                         'department_department'                     => $item_child['department_department'],
            //                         'banding_banding_id'                        => $item_child['banding_banding_id'],
            //                         'banding_banding'                           => $item_child['banding_banding'],
            //                         'group_group_id'                            => $item_child['group_group_id'],
            //                         'group_code'                                => $item_child['group_code'],
            //                         'position_position_id'                      => $item_child['position_position_id'],
            //                         'position_position'                         => $item_child['position_position'],
            //                         'email_ciputra'                             => $item_child['email_ciputra'],
            //                         'phone_number'                              => $item_child['phone_number'],
            //                         'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
            //                         'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
            //                         'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
            //                         'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],
            //                         'payroll_group'                             => 'Group-1',
            //                         'ktp_address'                               => $item_child['ktp_address'],
            //                         'address'                                   => $item_child['address'],
            //                         'payroll_currency'                          => 'IDR',
            //                         'payment_method'                            => 'Transfer',
            //                         'bank_rekening'                             => $item_child['bank_rekening'],
            //                         'nomor_rekening'                            => $item_child['nomor_rekening'],
            //                         'nama_rekening'                             => $item_child['nama_rekening'],
            //                         'calendar_company'                          => 'Calendar',
            //                         'work_shift'                                => '',
            //                         'tax_country_code'                          => 'INA',
            //                         'fingerprintcode'                           => $item_child['fingerprintcode'],
            //                         'cost_center_code'                          => '',
            //                         'no_bpjs_k'                                 => $item_child['no_bpjs_k'],
            //                         'no_bpjs_kk'                                => $item_child['no_bpjs_kk'],
            //                         'no_bpjs_pp'                                => $item_child['no_bpjs_pp'],
            //                         'no_manulife_p'                             => $item_child['no_manulife_p'],
            //                         'no_asuransi'                               => $item_child['no_asuransi'],
            //                         'worklocation_id'                           => $item_child['worklocation_id'],
            //                         'worklocation'                              => $item_child['worklocation'],
            //                         'worklocation_project_id'                   => $item_child['worklocation_project_id'],
            //                         'worklocation_project'                      => $item_child['worklocation_project'],
            //                         'worklocation_pt_id'                        => $item_child['worklocation_pt_id'],
            //                         'worklocation_pt'                           => $item_child['worklocation_pt'],
            //                         'ibu_kandung'                               => $item_child['ibu_kandung']
            //                         // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
            //                         // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
            //                         // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
            //                     );
            //             $i++;
            //         }
            //     }
            // $hasil[0][0]['totalRow'] = $i;
            // $hasil[1]= $datas;
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array(),array());
            
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    //added by michael 27/09/2021
    public function array_employee($item_child, $company_code){
        $data = null;
        $data = array(
                                            'project_id'                                => $item_child['project_id'],
                                            'project_name'                              => $item_child['project_name'],
                                            'pt_id'                                     => $item_child['pt_id'],
                                            'pt_name'                                   => $item_child['pt_name'],
                                            'company_code'                              => $company_code,
                                            'nik_group'                                 => $item_child['nik_group'],
                                            'employee_id'                               => $item_child['employee_id'],
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
                                            'ptkp_id'                                   => $item_child['ptkp_ptkp_id'],
                                            'ptkp_code'                                 => $item_child['ptkp_ptkp_code'],
                                            'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                            'department_department_id'                  => $item_child['department_department_id'],
                                            'department_department'                     => $item_child['department_department'],
                                            'banding_banding_id'                        => $item_child['banding_banding_id'],
                                            'banding_banding'                           => $item_child['banding_banding'],
                                            'group_group_id'                            => $item_child['group_group_id'],
                                            'group_code'                                => $item_child['group_code'],
                                            'position_position_id'                      => $item_child['position_position_id'],
                                            'position_position'                         => $item_child['position_position'],
                                            'email'                                     => $item_child['email'],
                                            'email_ciputra'                             => $item_child['email_ciputra'],
                                            'phone_number'                              => $item_child['phone_number'],
                                            'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                            'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                            'statusinformation_id'                      => $item_child['statusinformation_id'],
                                            'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                            'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                            'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                            'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],

                                            'statusinformation_consultant_start'        => $item_child['statusinformation_consultant_start'],
                                            'statusinformation_consultant_end'          => $item_child['statusinformation_consultant_end'],

                                            'nonactive_date'                            => $item_child['nonactive_date'],
                                            'payroll_group'                             => $item_child['payroll_group'],
                                            'payrollgroup_id'                           => $item_child['payrollgroup_id'],
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
                                            'alokasibiaya_id'                           => $item_child['alokasibiaya_id'],
                                            'code_alokasibiaya'                         => $item_child['code_ab'],
                                            'name_alokasibiaya'                         => $item_child['name_ab'],
                                            'alokasibiaya_id2'                          => $item_child['alokasibiaya_id2'],
                                            'code_alokasibiaya2'                        => $item_child['code_ab2'],
                                            'name_alokasibiaya2'                        => $item_child['name_ab2'],
                                            'alokasibiaya_id3'                          => $item_child['alokasibiaya_id3'],
                                            'code_alokasibiaya3'                        => $item_child['code_ab3'],
                                            'name_alokasibiaya4'                        => $item_child['name_ab3'],
                                            'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                            'addon'                                     => $item_child['addon'],
                                            'modion'                                    => $item_child['modion'],
                                            'payroll_effective_date'                    => $item_child['payroll_effective_date'],
                                            'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                            'religion_religion_id'                      => $item_child['religion_religion_id'],
                                            'religion_religion'                         => $item_child['religion_religion'],
                                            // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                            // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                            // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
        );
        return $data;
    }
    //end added by michael 27/09/2021

    public function get_lastprocessidRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $get = $dao->getLastProcessId($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get + 1;
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function checkdata_masterRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $model = 'getMasterCheck';
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $get = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get[0];
        
        $jsonCurrent = json_decode($data['jsonCurrent'],true);
        
        $changeprofile = null;
        $changepayroll = null;


        if($hasil && $data['value'] == 'employee'){
            
            // $hasil_lastsuccess = $hasil[0];

            // $get = $dao->getMasterCheckChange($this->getAppRequest(), $em, $this->getAppSession(),$data);
            // $hasil = $get[0];
            $item = $hasil[0];

            if($item){

                if($item['employee_name'] != $jsonCurrent['employee_name']){
                    $changeprofile .= 'Nama,';
                }
                if($item['sex'] != $jsonCurrent['sex']){
                    $changeprofile .= 'Gender,';
                }
                if($item['religion_id'] != $jsonCurrent['religion_religion_id']){
                    $changeprofile .= 'Religion,';
                }
                if($item['birth_place'] != $jsonCurrent['birth_place']){
                    $changeprofile .= 'Tempat Lahir,';
                }
                if($item['birth_date'] != $jsonCurrent['birth_date']){
                    $changeprofile .= 'Tanggal Lahir,';
                }
                if($item['marriagestatus_marriagestatus_id'] != $jsonCurrent['marriagestatus_marriagestatus_id']){
                    $changeprofile .= 'Status Marital,';
                }
                if($item['ktp_number'] != $jsonCurrent['ktp_number']){
                    $changeprofile .= 'KTP Number,';
                }
                if($item['nationality'] != $jsonCurrent['nationality']){
                    $changeprofile .= 'Nationality,';
                }
                // if($item['phone_number'] != $jsonCurrent['phone_number']){
                //     $changeprofile .= 'Phone num,';
                // }
                if($item['email_ciputra'] != $jsonCurrent['email_ciputra']){
                    $changeprofile .= 'Email Office,';
                }
                // if($item['ktp_address'] != $jsonCurrent['ktp_address']){
                //     $changeprofile .= 'Ktp Address,';
                // }
                // if($item['address'] != $jsonCurrent['address']){
                //     $changeprofile .= 'Curr Address,';
                // }

                //PAYROLL
                if($item['bank_rekening'] != $jsonCurrent['bank_rekening']){
                    $changepayroll .= 'Bank Rek,';
                }
                if($item['nomor_rekening'] != $jsonCurrent['nomor_rekening']){
                    $changepayroll .= 'No Rek,';
                }
                if($item['nama_rekening'] != $jsonCurrent['nama_rekening']){
                    $changepayroll .= 'Nama Rek,';
                }
                if($item['ptkp_code'] != $jsonCurrent['ptkp_code']){
                    $changepayroll .= 'PTKP,';
                }
                if($item['npwp'] != $jsonCurrent['npwp']){
                    $changepayroll .= 'NPWP,';
                }
                
            }
        }else{
            $item = null;
        }

        if($hasil){
            $last_status = $hasil[0]['status_transfer'];
            $last_code = $hasil[0]['code'];

            if($last_status == 'error'){
                $action_to_cherry = 'insert';
            }elseif(empty($last_code)){
                $action_to_cherry = 'insert';
            }else{
                $action_to_cherry = 'update';
            }

            if($data['value'] == 'employee'){
                if($changeprofile || $changepayroll){
                    $action_to_cherry = 'update';
                }else{
                    // $action_to_cherry = 'update';
                    $action_to_cherry = 'already up-to-date';
                }
            }

        }else{
            $action_to_cherry = 'insert';
        }
        
        $arrayRespon = array("ACTION_TO_CHERRY" => $action_to_cherry, "HASIL" => $hasil, "changeprofile" =>$changeprofile, "changepayroll" =>$changepayroll);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_masterRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $model = 'saveMaster';
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $hasil = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = null;
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function get_masterRead(){

        $data = $this->getAppData();
        $lastprocessid = $data['lastprocessid'];
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $value = $data['value'];

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $get = $dao->getMaster($this->getAppRequest(), $em, $this->getAppSession(),$data);

        $hasil = null;
        $i = 0;
        
        if($get[0]){
            foreach($get[0] as $key_emp => $item_emp){
                if($value == 'dept'){
                    $datas[] = array(
                                'action_process' => $item_emp['action_process'],
                                'status_transfer' => $item_emp['status_transfer'],
                                'department_id' => $item_emp['department_id'],
                                'department'    => $item_emp['department_name'],
                                'project_id'    => $item_emp['project_id'],
                                'project_name'  => $item_emp['project_name'],
                                'pt_id'         => $item_emp['pt_id'],
                                'pt_name'       => $item_emp['pt_name'],
                                'code'          => $item_emp['department_code']
                            );
                }
                elseif($value == 'banding'){
                    $datas[] = array(
                                'action_process' => $item_emp['action_process'],
                                'status_transfer' => $item_emp['status_transfer'],
                                'banding_id'    => $item_emp['banding_id'],
                                'banding'       => $item_emp['banding_name'],
                                'code'          => $item_emp['banding_code']
                            );
                }
                elseif($value == 'group'){
                    $datas[] = array(
                                'action_process' => $item_emp['action_process'],
                                'status_transfer' => $item_emp['status_transfer'],
                                'group_id'      => $item_emp['group_id'],
                                'group'         => $item_emp['group_name'],
                                'project_id'    => $item_emp['project_id'],
                                'project_name'  => $item_emp['project_name'],
                                'pt_id'         => $item_emp['pt_id'],
                                'pt_name'       => $item_emp['pt_name'],
                                'code'          => $item_emp['group_code']
                            );
                }
                elseif($value == 'jobfamily'){
                    $datas[] = array(
                                'action_process' => $item_emp['action_process'],
                                'status_transfer' => $item_emp['status_transfer'],
                                'jobfamily_id'  => $item_emp['jobfamily_id'],
                                'jobfamily'     => $item_emp['jobfamily_name'],
                                'code'          => $item_emp['jobfamily_code']
                            );
                }
                elseif($value == 'position'){
                    $datas[] = array(
                                'action_process' => $item_emp['action_process'],
                                'status_transfer' => $item_emp['status_transfer'],
                                'position_id'  => $item_emp['position_id'],
                                'position'     => $item_emp['position_name'],
                                'description'  => $item_emp['position_description'],
                                'subholding_subname' => $item_emp['position_subholding_subname']
                            );
                }
                elseif($value == 'employee'){
                    $datas[] = array(
                                        'action_process'                            => $item_emp['action_process'],
                                        'status_transfer'                           => $item_emp['status_transfer'],
                                        'project_id'                                => $item_emp['project_id'],
                                        'project_name'                              => $item_emp['project_name'],
                                        'pt_id'                                     => $item_emp['pt_id'],
                                        'pt_name'                                   => $item_emp['pt_name'],
                                        'nik_group'                                 => $item_emp['nik_group'],
                                        'employee_id'                               => $item_emp['employee_id'],
                                        'employee_nik'                              => $item_emp['employee_nik'],
                                        'employee_name'                             => $item_emp['employee_name'],
                                        'sex'                                       => $item_emp['sex'],
                                        'birth_date'                                => $item_emp['birth_date'],
                                        'birth_place'                               => $item_emp['birth_place'],
                                        'id_type'                                   => $item_emp['id_type'],
                                        'ktp_number'                                => $item_emp['ktp_number'],
                                        'marriagestatus_marriagestatus_id'          => $item_emp['marriagestatus_marriagestatus_id'],
                                        'marriagestatus_marriagestatus'             => $item_emp['marriagestatus_marriagestatus'],
                                        'nationality'                               => $item_emp['nationality'],
                                        'npwp'                                      => $item_emp['npwp'],
                                        // 'ptkp'                                      => $item_emp['ptkp'],
                                        'department_department_id'                  => $item_emp['department_department_id'],
                                        'department_department'                     => $item_emp['department_department'],
                                        'banding_banding_id'                        => $item_emp['banding_banding_id'],
                                        'banding_banding'                           => $item_emp['banding_banding'],
                                        'group_group_id'                            => $item_emp['group_group_id'],
                                        'group_code'                                => $item_emp['group_code'],
                                        'position_position_id'                      => $item_emp['position_position_id'],
                                        'position_position'                         => $item_emp['position_position'],
                                        'email'                                     => $item_emp['email'],
                                        'email_ciputra'                             => $item_emp['email_ciputra'],
                                        'phone_number'                              => $item_emp['phone_number'],
                                        'employeestatus_employeestatus_id'          => $item_emp['employeestatus_employeestatus_id'],
                                        'employeestatus_employeestatus'             => $item_emp['employeestatus_employeestatus'],
                                        'statusinformation_hire_date'               => $item_emp['statusinformation_hire_date'],
                                        'statusinformation_contract_end'            => $item_emp['statusinformation_contract_end'],

                                        'statusinformation_consultant_end'          => $item_emp['statusinformation_consultant_end'],

                                        'nonactive_date'                            => $item_emp['nonactive_date'],
                                        'payroll_group'                             => $item_emp['payroll_group'],
                                        'ktp_address'                               => $item_emp['ktp_address'],
                                        'address'                                   => $item_emp['address'],
                                        'payroll_currency'                          => $item_emp['payroll_currency'],
                                        'payment_method'                            => $item_emp['payment_method'],
                                        'bank_rekening'                             => $item_emp['bank_rekening'],
                                        'nomor_rekening'                            => $item_emp['nomor_rekening'],
                                        'nama_rekening'                             => $item_emp['nama_rekening'],
                                        'calendar_company'                          => $item_emp['calendar_company'],
                                        'work_shift'                                => $item_emp['work_shift'],
                                        'tax_country_code'                          => $item_emp['tax_country_code'],
                                        'fingerprintcode'                           => $item_emp['fingerprintcode'],
                                        'cost_center_code'                          => $item_emp['cost_center_code'],
                                        'no_bpjs_k'                                 => $item_emp['no_bpjs_k'],
                                        'no_bpjs_kk'                                => $item_emp['no_bpjs_kk'],
                                        'no_bpjs_pp'                                => $item_emp['no_bpjs_pp'],
                                        'no_manulife_p'                             => $item_emp['no_manulife_p'],
                                        'no_asuransi'                               => $item_emp['no_asuransi'],
                                        'worklocation_id'                           => $item_emp['worklocation_id'],
                                        'worklocation'                              => $item_emp['worklocation'],
                                        'worklocation_project_id'                   => $item_emp['worklocation_project_id'],
                                        'worklocation_project'                      => $item_emp['worklocation_project'],
                                        'worklocation_pt_id'                        => $item_emp['worklocation_pt_id'],
                                        'worklocation_pt'                           => $item_emp['worklocation_pt'],
                                        'ibu_kandung'                               => $item_emp['ibu_kandung'],
                                        'alokasibiaya_id'                           => $item_emp['alokasibiaya_id'],
                                        'code_alokasibiaya'                         => $item_emp['code_alokasibiaya'],
                                        'name_alokasibiaya'                         => $item_emp['name_alokasibiaya'],
                                        'alokasibiaya_id2'                          => $item_emp['alokasibiaya_id2'],
                                        'code_alokasibiaya2'                        => $item_emp['code_alokasibiaya2'],
                                        'name_alokasibiaya2'                        => $item_emp['name_alokasibiaya2'],
                                        'alokasibiaya_id3'                          => $item_emp['alokasibiaya_id3'],
                                        'code_alokasibiaya3'                        => $item_emp['code_alokasibiaya3'],
                                        'name_alokasibiaya3'                        => $item_emp['name_alokasibiaya3'],
                                        'hari_kerja_perminggu'                      => $item_emp['hari_kerja_perminggu'],
                                        // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                        // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                        // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']

                                    );
                }
                else{
                    $opsi = null;
                }

                $i++;
            }
            $hasil[0][0]['totalRow'] = $i;
            $hasil[1]= $datas;
        }
        
        $dm = new Box_Models_App_Hermes_DataModel();
        if($value == 'dept'){
            $dataList = new Box_Models_App_DataListCreator('', 'department', array(),array());
        }
        elseif($value == 'banding'){
            $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
        }
        elseif($value == 'group'){
            $dataList = new Box_Models_App_DataListCreator('', 'group', array(),array());
        }
        elseif($value == 'jobfamily'){
            $dataList = new Box_Models_App_DataListCreator('', 'jobfamily', array(),array());
        }
        elseif($value == 'position'){
            $dataList = new Box_Models_App_DataListCreator('', 'position', array(),array());
        }
        elseif($value == 'employee'){
            $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array(),array());
        }else{
            $dataList = null;
        }

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function save_master_beforeapiRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $hasil = $dao->saveMasterBeforeApi($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = null;
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_masterRead(){

        $data = $this->getAppData();
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $model = 'updateMaster';
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $hasil = $dao->$model($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonString,$jsonStringResult);
        
        if(!empty($hasil) && $hasil > 0){
            $msg = 'berhasil';
        }else{
            $msg = null;
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
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

        if($item['religion_religion']){
            $lookupname = 'Religion';

            if($item['religion_religion'] == 'Buddha' || $item['religion_religion'] == 'Budha'){
                $item['religion_religion'] = 'Budha';
            }elseif($item['religion_religion'] == 'Katholik' || $item['religion_religion'] == 'Katolik'){
                $item['religion_religion'] = 'Katolik';
            }else{
                $item['religion_religion'] = $item['religion_religion'];
            }

            $get_religion_code = $dao->getCommonCode($em,$lookupname, $item['religion_religion']);
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

    //CHECK MASTER YANG DIEMPLOYEE UDAH ADA SEMUA BELUM DI CHERRY
    public function get_employee_checkRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $data = json_decode($data['data']);
        
        $need_input_cherry_master_emp = null;
        
        foreach($data as $key => $item){
            if(empty($item->employeeb->code->department_code)){

                if(array_key_exists("department_department_id",$item->employeeb)){
                    $need_input_cherry_master_emp[] = array(
                                                                'employee_id'           => $item->employeeb->employee_id,
                                                                'employee_name'         => $item->employeeb->employee_name,
                                                                'project_id'            => $item->employeeb->project_id,
                                                                'pt_id'                 => $item->employeeb->pt_id,
                                                                'department_department_id' => $item->employeeb->department_department_id,
                                                            );
                }
            }
            if(empty($item->employeeb->code->group_code)){

                if(array_key_exists("group_group_id",$item->employeeb)){
                    $need_input_cherry_master_emp[] = array(
                                                                'employee_id'           => $item->employeeb->employee_id,
                                                                'employee_name'         => $item->employeeb->employee_name,
                                                                'project_id'            => $item->employeeb->project_id,
                                                                'pt_id'                 => $item->employeeb->pt_id,
                                                                'group_group_id'        => $item->employeeb->group_group_id,
                                                            );
                }
                

            }
            if(empty($item->employeeb->code->banding_code)){

                if(array_key_exists("banding_banding_id",$item->employeeb)){
                    $need_input_cherry_master_emp[] = array(
                                                                'employee_id'           => $item->employeeb->employee_id,
                                                                'employee_name'         => $item->employeeb->employee_name,
                                                                'project_id'            => $item->employeeb->project_id,
                                                                'pt_id'                 => $item->employeeb->pt_id,
                                                                'banding_banding_id'    => $item->employeeb->banding_banding_id,
                                                            );

                }

            }
            if(empty($item->employeeb->code->position_code)){
                
                if(array_key_exists("position_position_id",$item->employeeb)){
                    $need_input_cherry_master_emp[] = array(
                                                                'employee_id'           => $item->employeeb->employee_id,
                                                                'employee_name'         => $item->employeeb->employee_name,
                                                                'project_id'            => $item->employeeb->project_id,
                                                                'pt_id'                 => $item->employeeb->pt_id,
                                                                'position_position_id'  => $item->employeeb->position_position_id,
                                                            );
                }

            }
        }


        $arrayRespon = array("need_input_cherry_master_emp" => $need_input_cherry_master_emp);
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

            if($item->employeeb->religion_religion == 'Buddha' || $item->employeeb->religion_religion == 'Budha'){
                $item->employeeb->religion_religion = 'Budha';
            }elseif($item->employeeb->religion_religion == 'Katholik' || $item->employeeb->religion_religion == 'Katolik'){
                $item->employeeb->religion_religion = 'Katolik';
            }else{
                $item->employeeb->religion_religion = $item->employeeb->religion_religion;
            }

            $arr_temp_data[] = array(
                                        'employee_id'                               => $item->employeeb->employee_id,
                                        'employee_name'                             => $item->employeeb->employee_name,
                                        'sex'                                       => $item->employeeb->sex,
                                        'religion'                                  => $item->employeeb->religion_religion,
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
                                        'employee_id'                               => $item->employeeb->employee_id,
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
                                        'employee_id'                               => $item->employeeb->employee_id,
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
                                        'employee_id'                               => $item->employeeb->employee_id,
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
                                        'employee_id'                               => $item->employeeb->employee_id,
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

    //---------------------------------------------------------------------------------------------------------------------
    //CUSTOM FIELD
    public function check_customfieldRead(){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $data = $this->getAppData();

        $explode_data = explode(',', $data['customfield_var']);
        
        $need_input_cherry_customfield = null;

        foreach($explode_data as $key => $item){
            $get_customfield_code = $dao->getCustomFieldCode($em,$item);
            if(empty($get_customfield_code[0])){
                    $need_input_cherry_customfield[] = array(
                                                        'name'          => $item
                                                    );
            }
        }

        $arrayRespon = array("need_input_cherry_customfield" => $need_input_cherry_customfield);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_customfield_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveCustomFieldBeforeApi($em, $this->getAppSession(),$jsonString);
        
        
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

    public function update_customfield_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateCustomFieldAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);
        
        
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

    //CUSTOM FIELD VALUE

    public function save_customfieldvalue_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $get_customfield_code = $dao->getCustomFieldCode($em,$data['value']);
        $customfield_code = $get_customfield_code[0][0]['code'];
        $customfield_name = $get_customfield_code[0][0]['name'];
        $employee_code = $jsonStringResult['Code'];

        if($customfield_name == 'ProjectId'){

            $customfield_value = $jsonString['project_id'];

        }elseif($customfield_name == 'ProjectName'){

            $customfield_value = $jsonString['project_name'];

        }elseif($customfield_name == 'NoBpjsKetenagakerjaan'){

            $customfield_value = $jsonString['no_bpjs_kk'];

        }elseif($customfield_name == 'NoBpjsKesehatan'){

            $customfield_value = $jsonString['no_bpjs_k'];

        }elseif($customfield_name == 'NoBpjsJaminanPensiun'){

            $customfield_value = $jsonString['no_bpjs_pp'];

        }elseif($customfield_name == 'NoManulife'){

            $customfield_value = $jsonString['no_manulife_p'];

        }elseif($customfield_name == 'NoAsuransi'){

            $customfield_value = $jsonString['no_asuransi'];

        }elseif($customfield_name == 'CodeAlokasiBiaya'){

            $customfield_value = $jsonString['code_alokasibiaya'];

        }elseif($customfield_name == 'NameAlokasiBiaya'){

            $customfield_value = $jsonString['name_alokasibiaya'];

        }elseif($customfield_name == 'CodeAlokasiBiaya2'){

            $customfield_value = $jsonString['code_alokasibiaya2'];

        }elseif($customfield_name == 'NameAlokasiBiaya2'){

            $customfield_value = $jsonString['name_alokasibiaya2'];

        }elseif($customfield_name == 'CodeAlokasiBiaya3'){

            $customfield_value = $jsonString['code_alokasibiaya3'];

        }elseif($customfield_name == 'NameAlokasiBiaya3'){

            $customfield_value = $jsonString['name_alokasibiaya3'];
        
        }else{
            $customfield_value = '-';
        }

        //check db
        $get_customfieldvalue_code = $dao->getCustomFieldValueCode($em, $this->getAppSession(),$employee_code,$customfield_code);
        
        if(empty($get_customfieldvalue_code[0])){
            $action_process = 'insert';
            $hasil_action_process = null;
        }else{
            $action_process = 'update';
            $hasil_action_process = $get_customfieldvalue_code[0];
        }

        $hasil = $dao->saveCustomFieldValueBeforeApi($em, $this->getAppSession(),$jsonString,$employee_code,$customfield_code,$customfield_name,$action_process,$customfield_value);
        
        
        if(!empty($hasil)){
            $msg = 'berhasil';
            $result_id = $hasil;
        }else{
            $msg = null;
            $result_id = null;
        }

        $arrayRespon = array(
            "result_id" => $result_id,
            "msg" => $msg,
            "action_process" => $action_process,
            "hasil_action_process" => $hasil_action_process, 
            "customfield_code" => $customfield_code, 
            "employee_code" => $employee_code, 
            'customfield_value' => $customfield_value);

        return Box_Tools::instantRead($arrayRespon);
    }

    public function update_customfieldvalue_afterapiRead(){

        $data = $this->getAppData();

        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateCustomFieldValueAfterApi($em, $this->getAppSession(),$jsonStringResult,$data);
        
        
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

    public function getparam_customfieldvalue_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();

        $employee_code = $jsonStringResult['Code'];
        $explode_customfield_value = explode(',', $data['value']);
        
        $param_customfieldvalue = null;

        foreach($explode_customfield_value as $key => $item){
            if($item){
                $get_customfield_code = $dao->getCustomFieldCode($em,$item);
                
                $customfield_code = $get_customfield_code[0][0]['code'];
                $get_customfieldvalue_code = $dao->getCustomFieldValueCode($em, $this->getAppSession(),$employee_code,$customfield_code);

                if($get_customfieldvalue_code[0]){

                    if($get_customfieldvalue_code[0][0]['active'] == 1){
                        $active = 'true';
                    }else{
                        $active = 'false';
                    }

                    $param_customfieldvalue[] = array(
                                                        'Code' => $get_customfieldvalue_code[0][0]['code'],
                                                        'ModelCode' => $get_customfieldvalue_code[0][0]['model_code'],
                                                        'ModelEntityCode' => $get_customfieldvalue_code[0][0]['modelentity_code'],
                                                        'CustomFieldCode' => $get_customfieldvalue_code[0][0]['customfield_code'],
                                                        'CustomFieldValue' => $get_customfieldvalue_code[0][0]['customfield_value'],
                                                        'InsertStamp' => $get_customfieldvalue_code[0][0]['insertstamp'],
                                                        'UpdateStamp' => $get_customfieldvalue_code[0][0]['updatestamp'],
                                                        'Active' => $active,
                    );
                    // $param_customfieldvalue .= '{';
                    // $param_customfieldvalue .= '   "Code": "'.$get_customfieldvalue_code[0][0]['code'].'",';
                    // $param_customfieldvalue .= '   "ModelCode": "'.$get_customfieldvalue_code[0][0]['model_code'].'",';
                    // $param_customfieldvalue .= '   "ModelEntityCode": "'.$get_customfieldvalue_code[0][0]['modelentity_code'].'",';
                    // $param_customfieldvalue .= '   "CustomFieldCode": "'.$get_customfieldvalue_code[0][0]['customfield_code'].'",';
                    // $param_customfieldvalue .= '   "CustomFieldValue": "'.$get_customfieldvalue_code[0][0]['customfield_value'].'",';
                    // $param_customfieldvalue .= '   "InsertStamp": "'.$get_customfieldvalue_code[0][0]['insertstamp'].'",';
                    // $param_customfieldvalue .= '   "UpdateStamp": "'.$get_customfieldvalue_code[0][0]['updatestamp'].'",';
                    // $param_customfieldvalue .= '   "Active": '.$active.',';
                    // $param_customfieldvalue .= '},';
                }
            }
        }

        // if($param_customfieldvalue){
        //    $param_customfieldvalue = json_encode($param_customfieldvalue); 
        // }

        $arrayRespon = array(
            "param_customfieldvalue" => $param_customfieldvalue);

        return Box_Tools::instantRead($arrayRespon);
    }

    //---------------------------------------------------------------------------------------------------------------------
    //CAREER TRANSITION TYPE
    public function check_careertransitionRead(){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $data = $this->getAppData();

        $pt_id = $data['choose_ptpt'];

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

    //EMPLOYEE CAREER TRANSITION
    // 1 PROMOSI -- 2 ROTASI -- 3 MUTASI -- 4 DEMOSI
    public function check_careertransition_employeeRead(){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $data = $this->getAppData();

        $data_current = json_decode($data['jsonString']);
        $data_result = $data['jsonStringResult'];
        $arr_temp_data = null;
        if(array_key_exists("nik_group",$data_current)){
            $arr_temp_data[] = array(
                                        'employee_id'                               => $data_current->employee_id,
                                        'employee_name'                             => $data_current->employee_name,
                                        'project_id'                                => $data_current->project_id,
                                        'pt_id'                                     => $data_current->pt_id,
                                        'nik_group'                                 => $data_current->nik_group,
                                        'code'                                      => $data_current->code,
            );
            
        }

        $check_db = $this->check_careertransition_employee_db($arr_temp_data,$data,$data_result);


        $arrayRespon = array("check_db" => $check_db);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function check_careertransition_employee_firstRead(){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $data = $this->getAppData();

        $data_current = json_decode($data['jsonString']);
        $data_result = null;
        $arr_temp_data = null;
        foreach($data_current as $key => $item){
            if(array_key_exists("nik_group",$item->employeeb)){
                $arr_temp_data[] = array(
                                            'employee_id'                               => $item->employeeb->employee_id,
                                            'employee_name'                             => $item->employeeb->employee_name,
                                            'project_id'                                => $item->employeeb->project_id,
                                            'pt_id'                                     => $item->employeeb->pt_id,
                                            'nik_group'                                 => $item->employeeb->nik_group,
                                            'code'                                      => $item->employeeb->code,
                );
            }
        }

        $check_db = $this->check_careertransition_employee_db($arr_temp_data,$data,$data_result);
        // print_r($check_db);die();

        $arrayRespon = array("check_db" => $check_db);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function check_careertransition_employee_db($arr_temp_data,$data,$data_result){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();

        $need_input_cherry_careertransition_employee = null;
        $need_input_cherry_master = null;
        $need_input_cherry_master_company = null;
        $company_diff = null;

        foreach($arr_temp_data as $key_cte => $item_cte){

            //ASSIGNATION DATE
            $get_careertransition_employee_assign = $dao->getCareerTransitionEmployeeAssign($em,$item_cte,$data['choose_startdate'],$data['choose_enddate']);

            $careertransition_employee_assign = $get_careertransition_employee_assign[0];


            //T_CHANGE STATUS
            $get_careertransition_employee = $dao->getCareerTransitionEmployee($em,$item_cte,$data['choose_startdate'],$data['choose_enddate']);

            $careertransition_employee = $get_careertransition_employee[0];


            //RESIGN DATE
            $get_careertransition_employee_resign = $dao->getCareerTransitionEmployeeResign($em,$item_cte,$data['choose_startdate'],$data['choose_enddate']);

            $careertransition_employee_resign = $get_careertransition_employee_resign[0];
            


            //JIKA ADA ASSIGNANTION DATE DIANTARA PERIODE
            //COMMENT SEMENTARA (2020-12-02)
            // if($careertransition_employee_assign){

            //     foreach($careertransition_employee_assign as $key => $item){
            //         $data_temp_check_old = array(
            //                                         'project_id'                => $item['project_id'],
            //                                         'pt_id'                     => $item['pt_id'],
            //                                         'department_department_id'  => $item['department_id'],
            //                                         'group_group_id'            => $item['group_id'],
            //                                         'banding_banding_id'        => $item['banding_id'],
            //                                         'position_position_id'      => $item['position_id'],
            //                                 );

            //         //department code
            //         $get_department_old_code = $dao->getDepartmentCode($em, $data_temp_check_old);
            //         if($get_department_old_code[0]){
            //             $department_old_code = $get_department_old_code[0][0]['code'];
            //             $old_department_id_code = $department_old_code;
            //         }else{
            //             $old_department_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'department_department_id'  => $item['old_department_id'],
            //                                             );
            //         }

            //         //group code
            //         $get_group_old_code = $dao->getGroupCode($em, $data_temp_check_old);
            //         if($get_group_old_code[0]){
            //             $group_old_code = $get_group_old_code[0][0]['code'];
            //             $old_group_id_code = $group_old_code;
            //         }else{
            //             $old_group_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'group_group_id'            => $item['old_group_id'],
            //                                             );
            //         }

            //         //banding code
            //         $get_banding_old_code = $dao->getBandingCode($em, $data_temp_check_old);
            //         if($get_banding_old_code[0]){
            //             $banding_old_code = $get_banding_old_code[0][0]['code'];
            //             $old_banding_id_code = $banding_old_code;
            //         }else{
            //             $old_banding_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'banding_banding_id'        => $item['old_banding_id'],
            //                                             );
            //         }

            //         //position code
            //         $get_position_old_code = $dao->getPositionCode($em, $data_temp_check_old);
            //         if($get_position_old_code[0]){
            //             $position_old_code = $get_position_old_code[0][0]['code'];
            //             $old_position_id_code = $position_old_code;
            //         }else{
            //             $old_position_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'position_position_id'      => $item['old_position_id'],
            //                                             );
            //         }

            //         $dao_ptold_cherry = new Hrd_Models_Companycherry_Dao();
            //         $ptold_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            //         $ptold_cherryFilter->setPtptId($item['pt_id']);
            //         $hasil_ptold_cherry = $dao_ptold_cherry->getAllWoPL($ptold_cherryFilter);
            //         if($hasil_ptold_cherry[1]){
            //             $company_code_old = $hasil_ptold_cherry[1][0]['company_code'];
            //         }else{
            //             $company_code_old = null;
            //         }

            //         if($data_result){
            //             $data_result = json_decode($data['jsonStringResult']);
            //             $employee_code = $data_result->Code;
            //         }else{
            //             $employee_code = null;
            //         }

            //         $name_item = 'Perubahan Status';

            //         if($company_code_old){
            //             $get_careertransition_code = $dao->getCareerTransitionTypeCode($em,$name_item,$company_code_old);
            //             $careertransitiontype_code = $get_careertransition_code[0][0]['code'];
            //         }else{
            //             $careertransitiontype_code = null;
            //         }

            //         if($careertransition_employee){
            //             $expired_date = date('Y-m-d',strtotime($careertransition_employee[0]['effective_date']));
            //         }else{
            //             $expired_date = null;
            //         }


            //         // $get_employeestatus_code = $dao->getEmpStatusCode($em,'EmploymentStatus', $item_cte['employeestatus_employeestatus'],$company_code_old);

            //         // if($get_employeestatus_code[0]){
            //         //     $employeestatus_code = $get_employeestatus_code[0][0]['code'];
            //         // }else{
            //         //     $employeestatus_code = null;
            //         // }

            //         $need_input_cherry_careertransition_employee[] = array(
            //                                                                 'changestatus_id'    => '',
            //                                                                 'alasanresign_id'    => '',
            //                                                                 'assignation_date'   => $item['assignation_date'],
            //                                                                 'nik_group'          => $item_cte['nik_group'],
            //                                                                 'employee_id'        => $item_cte['employee_id'],
            //                                                                 'employee_name'      => $item_cte['employee_name'],
            //                                                                 'employee_code'      => $employee_code,
            //                                                                 'project_id'         => $item_cte['project_id'],
            //                                                                 'new_project_id'     => $item_cte['project_id'],
            //                                                                 'pt_id'              => $item_cte['pt_id'],
            //                                                                 'new_pt_id'          => $item_cte['pt_id'],
            //                                                                 'old_company_code'   => $company_code_old,
            //                                                                 'new_company_code'   => $company_code_old,
            //                                                                 // 'old_department'     => $item_cte['code']->department_code,
            //                                                                 // 'old_group'          => $item_cte['code']->group_code,
            //                                                                 // 'old_banding'        => $item_cte['code']->banding_code,
            //                                                                 // 'old_position'       => $item_cte['code']->position_code,
            //                                                                 'old_department'     => $old_department_id_code,
            //                                                                 'old_group'          => $old_group_id_code,
            //                                                                 'old_banding'        => $old_banding_id_code,
            //                                                                 'old_position'       => $old_position_id_code,
            //                                                                 'new_department'     => $old_department_id_code,
            //                                                                 'new_group'          => $old_group_id_code,
            //                                                                 'new_banding'        => $old_banding_id_code,
            //                                                                 'new_position'       => $old_position_id_code,
            //                                                                 'new_empstatus'      => $item_cte['code']->employeestatus_code,
            //                                                                 'date'               => date('Y-m-d',strtotime($item['modion'])),
            //                                                                 'careertransitiontype_code' => $careertransitiontype_code,
            //                                                                 'reason'             => $name_item,
            //                                                                 'note'               => $name_item,
            //                                                                 'effective_date'     => $item['assignation_date'],

            //                                                                 //INI KUNCI NYA
            //                                                                 'expired_date'       => $expired_date,


                                                                            
            //         );
            //     }
            // }

            // JIKA ADA T CHANGE STATUS DIANTARA PERIODE
            if($careertransition_employee){
                //tumpuk yg old dulu
                // $get_careertransitionemployee_before_code = $dao->getCareerTransitionEmployeeBeforeCode($em,$this->getAppSession(), $item_cte['employee_id']);
                // $careertransitionemployee_before_code = $get_careertransitionemployee_before_code[0];
                
                // if($careertransitionemployee_before_code){
                //     $item = $careertransitionemployee_before_code[0];

                //     $new_careertransition_employee = $careertransition_employee;
                //     end($new_careertransition_employee);   
                //     $lastkey_new = key($new_careertransition_employee);
                    
                //     if($item['changestatus_id'] && $careertransition_employee[$lastkey_new]['changestatus_id'] != $item['changestatus_id'] || 
                //         $item['statusinformation_id'] && $careertransition_employee[$lastkey_new]['statusinformation_id'] != $item['statusinformation_id']){
                //         $need_input_cherry_careertransition_employee[] = array(
                //                                                                         'code'               => $item['code'],
                //                                                                         'changestatus_id'    => $item['changestatus_id'],
                //                                                                         'alasanresign_id'    => $item['alasanresign_id'],
                //                                                                         'statusinformation_id'    => $item['statusinformation_id'],
                //                                                                         'assignation_date'   => $item['assignation_date'],
                //                                                                         'nik_group'          => $item['nik_group'],
                //                                                                         'employee_id'        => $item['employee_id'],
                //                                                                         'employee_name'      => $item['employee_name'],
                //                                                                         'employee_code'      => $item['employee_code'],
                //                                                                         'project_id'         => $item['old_project_id'],
                //                                                                         'new_project_id'     => $item['new_project_id'],
                //                                                                         'pt_id'              => $item['old_pt_id'],
                //                                                                         'new_pt_id'          => $item['new_pt_id'],
                //                                                                         'old_company_code'   => $item['old_company_code'],
                //                                                                         'new_company_code'   => $item['new_company_code'],
                //                                                                         'old_department'     => $item['old_department'],
                //                                                                         'old_group'          => $item['old_group'],
                //                                                                         'old_banding'        => $item['old_banding'],
                //                                                                         'old_position'       => $item['old_position'],
                //                                                                         'new_department'     => $item['new_department'],
                //                                                                         'new_group'          => $item['new_group'],
                //                                                                         'new_banding'        => $item['new_banding'],
                //                                                                         'new_position'       => $item['new_position'],
                //                                                                         'new_empstatus'      => $item['new_empstatus'],
                //                                                                         'date'               => date('Y-m-d',strtotime($item['date'])),
                //                                                                         'careertransitiontype_code' => $item['careertransitiontype_code'],
                //                                                                         'reason'             => $item['reason'],
                //                                                                         'note'               => $item['note'],
                //                                                                         'effective_date'     => date('Y-m-d',strtotime($item['effective_date'])),

                //                                                                         //INI KUNCI NYA
                //                                                                         // 'expired_date'       => date('Y-m-d',strtotime($careertransition_employee[0]['effective_date'])),
                //                                                                         'expired_date'       => date('Y-m-d',strtotime($careertransition_employee[0]['order_date'])),
                                                                                        
                //                 );
                //     }

                // }

                $new_careertransition_employee = $careertransition_employee;
                    end($new_careertransition_employee);   
                    $lastkey_new = key($new_careertransition_employee);

                foreach($careertransition_employee as $key => $item){
                    $data_temp_check_new = array(
                                                    'project_id'                => $item['new_project_id'],
                                                    'pt_id'                     => $item['new_pt_id'],
                                                    'department_department_id'  => $item['new_department_id'],
                                                    'group_group_id'            => $item['new_group_id'],
                                                    'banding_banding_id'        => $item['new_banding_id'],
                                                    'position_position_id'      => $item['new_position_id'],
                                            );
                    $data_temp_check_old = array(
                                                    'project_id'                => $item['old_project_id'],
                                                    'pt_id'                     => $item['old_pt_id'],
                                                    'department_department_id'  => $item['old_department_id'],
                                                    'group_group_id'            => $item['old_group_id'],
                                                    'banding_banding_id'        => $item['old_banding_id'],
                                                    'position_position_id'      => $item['old_position_id'],
                                            );
                    //CHECK CODE DI CHERRY
                    
                    //Company code
                    if($item['new_pt_id'] != $item['old_pt_id']){

                        $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                        $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
                        $pt_cherryFilter->setPtptId($item['new_pt_id']);
                        $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);

                        //penanda beda company, supaya di sinkron dulu yg sebelumnya
                        $em_pt = new Hrd_Models_Companycherry_Companycherry();
                        $data_temp['ptpt_id'] = $item['new_pt_id'];
                        $hasil_pt_name = $dao_pt_cherry->getPtName($this->getAppRequest(),$em_pt,$this->getAppSession(),$data_temp);

                        if(empty($company_diff)){
                            $company_diff .= $hasil_pt_name[1][0]['name'];
                        }else{
                            $company_diff .= ','.$hasil_pt_name[1][0]['name'];
                        }
                        
                        if($hasil_pt_cherry[1]){
                            $company_code = $hasil_pt_cherry[1][0]['company_code'];
                        }else{
                            $company_code = null;
                        }

                        if($company_code){
                            $new_pt_id_code = $company_code;
                        }else{
                            $new_pt_id_code = null;
                            $need_input_cherry_master_company[] = array(
                                                                'project_id'                => $item['new_project_id'],
                                                                'pt_id'                     => $item['new_pt_id'],
                                                                'company_code'              => '',
                                                            );
                        }
                    }

                    //department code
                    if($item['new_department_id']){
                        $get_department_code = $dao->getDepartmentCode($em, $data_temp_check_new);
                        if($get_department_code[0]){
                            $department_code = $get_department_code[0][0]['code'];
                            $new_department_id_code = $department_code;
                        }else{
                            $new_department_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['new_project_id'],
                                                                'pt_id'                     => $item['new_pt_id'],
                                                                'department_department_id'  => $item['new_department_id'],
                                                            );
                        }
                    }else{
                        $new_department_id_code = $item['new_department_code'];
                    }

                    if($item['old_department_id']){
                        $get_department_old_code = $dao->getDepartmentCode($em, $data_temp_check_old);
                        if($get_department_old_code[0]){
                            $department_old_code = $get_department_old_code[0][0]['code'];
                            $old_department_id_code = $department_old_code;
                        }else{
                            $old_department_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['old_project_id'],
                                                                'pt_id'                     => $item['old_pt_id'],
                                                                'department_department_id'  => $item['old_department_id'],
                                                            );
                        }
                    }else{
                        $old_department_id_code = $item['old_department_code'];
                    }

                    //group code
                    if($item['new_group_id']){
                        
                        $get_group_code = $dao->getGroupCode($em, $data_temp_check_new);
                        if($get_group_code[0]){
                            $group_code = $get_group_code[0][0]['code'];
                            $new_group_id_code = $group_code;
                        }else{
                            $new_group_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['new_project_id'],
                                                                'pt_id'                     => $item['new_pt_id'],
                                                                'group_group_id'            => $item['new_group_id'],
                                                            );
                        }
                    }else{
                        $new_group_id_code = $item['new_group_code'];
                    }

                    if($item['old_group_id']){
                        $get_group_old_code = $dao->getGroupCode($em, $data_temp_check_old);
                        if($get_group_old_code[0]){
                            $group_old_code = $get_group_old_code[0][0]['code'];
                            $old_group_id_code = $group_old_code;
                        }else{
                            $old_group_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['old_project_id'],
                                                                'pt_id'                     => $item['old_pt_id'],
                                                                'group_group_id'            => $item['old_group_id'],
                                                            );
                        }
                        
                    }else{
                        $old_group_id_code = $item['old_group_code'];
                    }

                    //banding code
                    if($item['new_banding_id']){
                        $get_banding_code = $dao->getBandingCode($em, $data_temp_check_new);
                        if($get_banding_code[0]){
                            $banding_code = $get_banding_code[0][0]['code'];
                            $new_banding_id_code = $banding_code;
                        }else{
                            $new_banding_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['new_project_id'],
                                                                'pt_id'                     => $item['new_pt_id'],
                                                                'banding_banding_id'        => $item['new_banding_id'],
                                                            );
                        }

                    }else{
                        $new_banding_id_code = $item['new_banding_code'];
                    }

                    if($item['old_banding_id']){
                        $get_banding_old_code = $dao->getBandingCode($em, $data_temp_check_old);
                        if($get_banding_old_code[0]){
                            $banding_old_code = $get_banding_old_code[0][0]['code'];
                            $old_banding_id_code = $banding_old_code;
                        }else{
                            $old_banding_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['old_project_id'],
                                                                'pt_id'                     => $item['old_pt_id'],
                                                                'banding_banding_id'        => $item['old_banding_id'],
                                                            );
                        }

                    }else{
                        $old_banding_id_code = $item['old_banding_code'];
                    }

                    //position code
                    if($item['new_position_id']){
                        $get_position_code = $dao->getPositionCode($em, $data_temp_check_new);
                        if($get_position_code[0]){
                            $position_code = $get_position_code[0][0]['code'];
                            $new_position_id_code = $position_code;
                        }else{
                            $new_position_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['new_project_id'],
                                                                'pt_id'                     => $item['new_pt_id'],
                                                                'position_position_id'      => $item['new_position_id'],
                                                            );
                        }

                    }else{
                        $new_position_id_code = $item['new_position_code'];
                    }

                    if($item['old_position_id']){
                        $get_position_old_code = $dao->getPositionCode($em, $data_temp_check_old);
                        if($get_position_old_code[0]){
                            $position_old_code = $get_position_old_code[0][0]['code'];
                            $old_position_id_code = $position_old_code;
                        }else{
                            $old_position_id_code = null;
                            $need_input_cherry_master[] = array(
                                                                'project_id'                => $item['old_project_id'],
                                                                'pt_id'                     => $item['old_pt_id'],
                                                                'position_position_id'      => $item['old_position_id'],
                                                            );
                        }

                    }else{
                        $old_position_id_code = $item['old_position_code'];
                    }


                    //SEMUA TRANSAKSI t_changestatus
                    // 1 PROMOSI -- 2 ROTASI -- 3 MUTASI -- 4 DEMOSI
                    if($item['changetype_id']){
                        if($item['changetype_id'] == '1'){
                            $name_item = 'Promosi';
                        }elseif($item['changetype_id'] == '2'){
                            $name_item = 'Rotasi';
                        }elseif($item['changetype_id'] == '3'){
                            $name_item = 'Mutasi';
                        }elseif($item['changetype_id'] == '4'){
                            $name_item = 'Demosi';
                        }
                    }elseif($item['alasanresign_id']){
                        if($item['alasanresign_id'] == '1'){
                            $name_item = 'Mengundurkan Diri';
                        }elseif($item['alasanresign_id'] == '2'){
                            $name_item = 'Pensiun';
                        }elseif($item['alasanresign_id'] == '3'){
                            $name_item = 'Pemutusan Hubungan Kerja';
                        }elseif($item['alasanresign_id'] == '4'){
                            $name_item = 'Habis Kontrak';
                        }elseif($item['alasanresign_id'] == '5'){
                            $name_item = 'Meninggal Dunia';
                        }elseif($item['alasanresign_id'] == '6'){
                            $name_item = 'Lainnya';
                        }
                    }else{
                        $name_item = 'Perubahan Status';
                    }

                    $dao_ptold_cherry = new Hrd_Models_Companycherry_Dao();
                    $ptold_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
                    $ptold_cherryFilter->setPtptId($item['old_pt_id']);
                    $hasil_ptold_cherry = $dao_ptold_cherry->getAllWoPL($ptold_cherryFilter);
                    if($hasil_ptold_cherry[1]){
                        $company_code_old = $hasil_ptold_cherry[1][0]['company_code'];
                    }else{
                        $company_code_old = null;
                    }

                    $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                    $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
                    $pt_cherryFilter->setPtptId($item['new_pt_id']);
                    $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
                    if($hasil_pt_cherry[1]){
                        $company_code = $hasil_pt_cherry[1][0]['company_code'];
                    }else{
                        $company_code = null;
                    }

                    if($company_code_old){
                        $get_careertransition_code = $dao->getCareerTransitionTypeCode($em,$name_item,$company_code_old);
                        if($get_careertransition_code[0]){
                            $careertransitiontype_code = $get_careertransition_code[0][0]['code'];
                        }else{
                            $careertransitiontype_code = null;
                        }
                    }else{
                        $careertransitiontype_code = null;
                    }

                    if($data_result){
                        $data_result = json_decode($data['jsonStringResult']);
                        $employee_code = $data_result->Code;
                    }else{
                        $employee_code = null;
                    }

                    if($key < $lastkey_new){
                        if($item['statusinformation_id']){
                            if($item['employeestatus_id'] == 2){
                                $expired_date_next = $item['contract_end'];
                            }elseif($item['employeestatus_id'] == 7){
                                $expired_date_next = $item['consultant_end'];
                            }else{
                                $expired_date_next = $careertransition_employee[$key + 1]['order_date'];
                            }
                        }else{
                            // $expired_date_next = $careertransition_employee[$key + 1]['effective_date'];
                            $expired_date_next = $careertransition_employee[$key + 1]['order_date'];
                        }
                    }else{
                        if($careertransition_employee_resign){
                            //comment sementara 31/02/2021
                            // $expired_date_next = date('Y-m-d',strtotime($careertransition_employee_resign[0]['nonactive_date']));
                            $expired_date_next = null;
                        }else{
                            if($item['statusinformation_id']){
                                if($item['employeestatus_id'] == 2){
                                    $expired_date_next = $item['contract_end'];
                                }elseif($item['employeestatus_id'] == 7){
                                    $expired_date_next = $item['consultant_end'];
                                }else{
                                    $expired_date_next = null;
                                }
                            }else{
                                $expired_date_next = null;
                            }
                        }
                        // $expired_date_next = null;
                    }

                    $need_input_cherry_careertransition_employee[] = array(
                                                                            'changestatus_id'    => $item['changestatus_id'],
                                                                            'alasanresign_id'    => $item['alasanresign_id'],
                                                                            'assignation_date'   => '',
                                                                            'statusinformation_id' => $item['statusinformation_id'],
                                                                            'nik_group'          => $item_cte['nik_group'],
                                                                            'employee_id'        => $item_cte['employee_id'],
                                                                            'employee_name'      => $item_cte['employee_name'],
                                                                            'employee_code'      => $employee_code,
                                                                            'project_id'         => $item_cte['project_id'],
                                                                            'new_project_id'     => $item['new_project_id'],
                                                                            'pt_id'              => $item_cte['pt_id'],
                                                                            'new_pt_id'          => $item['new_pt_id'],
                                                                            'old_company_code'   => $company_code_old,
                                                                            'new_company_code'   => $company_code,
                                                                            // 'old_department'     => $item_cte['code']->department_code,
                                                                            // 'old_group'          => $item_cte['code']->group_code,
                                                                            // 'old_banding'        => $item_cte['code']->banding_code,
                                                                            // 'old_position'       => $item_cte['code']->position_code,
                                                                            'old_department'     => $old_department_id_code,
                                                                            'old_group'          => $old_group_id_code,
                                                                            'old_banding'        => $old_banding_id_code,
                                                                            'old_position'       => $old_position_id_code,
                                                                            'new_department'     => $new_department_id_code,
                                                                            'new_group'          => $new_group_id_code,
                                                                            'new_banding'        => $new_banding_id_code,
                                                                            'new_position'       => $new_position_id_code,
                                                                            'new_empstatus'      => $item_cte['code']->employeestatus_code,
                                                                            'date'               => date('Y-m-d',strtotime($item['addon'])),
                                                                            'careertransitiontype_code' => $careertransitiontype_code,
                                                                            'reason'             => $item['reason'],
                                                                            'note'               => $item['note'],
                                                                            // 'effective_date'     => $item['effective_date'],
                                                                            'effective_date'     => $item['order_date'],
                                                                            'expired_date'       => $expired_date_next,
                                                                            
                    );
                }
            }

            //JIKA ADA RESIGN DIANTARA PERIODE
            //comment sementara 31/03/2021
            // if($careertransition_employee_resign){

            //     $get_careertransitionemployee_before_code = $dao->getCareerTransitionEmployeeBeforeCode($em,$this->getAppSession(), $item_cte['employee_id']);
            //     $careertransitionemployee_before_code = $get_careertransitionemployee_before_code[0];

            //     if($careertransitionemployee_before_code){
            //         $item = $careertransitionemployee_before_code[0];
                    
                    
            //             $need_input_cherry_careertransition_employee[] = array(
            //                                                                             'code'               => $item['code'],
            //                                                                             'changestatus_id'    => $item['changestatus_id'],
            //                                                                             'alasanresign_id'    => $item['alasanresign_id'],
            //                                                                             'statusinformation_id'    => $item['statusinformation_id'],
            //                                                                             'assignation_date'   => $item['assignation_date'],
            //                                                                             'nik_group'          => $item['nik_group'],
            //                                                                             'employee_id'        => $item['employee_id'],
            //                                                                             'employee_name'      => $item['employee_name'],
            //                                                                             'employee_code'      => $item['employee_code'],
            //                                                                             'project_id'         => $item['old_project_id'],
            //                                                                             'new_project_id'     => $item['new_project_id'],
            //                                                                             'pt_id'              => $item['old_pt_id'],
            //                                                                             'new_pt_id'          => $item['new_pt_id'],
            //                                                                             'old_company_code'   => $item['old_company_code'],
            //                                                                             'new_company_code'   => $item['new_company_code'],
            //                                                                             'old_department'     => $item['old_department'],
            //                                                                             'old_group'          => $item['old_group'],
            //                                                                             'old_banding'        => $item['old_banding'],
            //                                                                             'old_position'       => $item['old_position'],
            //                                                                             'new_department'     => $item['new_department'],
            //                                                                             'new_group'          => $item['new_group'],
            //                                                                             'new_banding'        => $item['new_banding'],
            //                                                                             'new_position'       => $item['new_position'],
            //                                                                             'new_empstatus'      => $item['new_empstatus'],
            //                                                                             'date'               => date('Y-m-d',strtotime($item['date'])),
            //                                                                             'careertransitiontype_code' => $item['careertransitiontype_code'],
            //                                                                             'reason'             => $item['reason'],
            //                                                                             'note'               => $item['note'],
            //                                                                             'effective_date'     => date('Y-m-d',strtotime($item['effective_date'])),

            //                                                                             //INI KUNCI NYA
            //                                                                             // 'expired_date'       => date('Y-m-d',strtotime($careertransition_employee[0]['effective_date'])),
            //                                                                             'expired_date'       => date('Y-m-d',strtotime($careertransition_employee_resign[0]['nonactive_date'])),
                                                                                        
            //                     );
                    

            //     }

            //     foreach($careertransition_employee_resign as $key => $item){
            //         $data_temp_check_old = array(
            //                                         'project_id'                => $item['project_id'],
            //                                         'pt_id'                     => $item['pt_id'],
            //                                         'department_department_id'  => $item['department_id'],
            //                                         'group_group_id'            => $item['group_id'],
            //                                         'banding_banding_id'        => $item['banding_id'],
            //                                         'position_position_id'      => $item['position_id'],
            //                                 );

            //         //department code
            //         $get_department_old_code = $dao->getDepartmentCode($em, $data_temp_check_old);
            //         if($get_department_old_code[0]){
            //             $department_old_code = $get_department_old_code[0][0]['code'];
            //             $old_department_id_code = $department_old_code;
            //         }else{
            //             $old_department_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'department_department_id'  => $item['old_department_id'],
            //                                             );
            //         }

            //         //group code
            //         $get_group_old_code = $dao->getGroupCode($em, $data_temp_check_old);
            //         if($get_group_old_code[0]){
            //             $group_old_code = $get_group_old_code[0][0]['code'];
            //             $old_group_id_code = $group_old_code;
            //         }else{
            //             $old_group_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'group_group_id'            => $item['old_group_id'],
            //                                             );
            //         }

            //         //banding code
            //         $get_banding_old_code = $dao->getBandingCode($em, $data_temp_check_old);
            //         if($get_banding_old_code[0]){
            //             $banding_old_code = $get_banding_old_code[0][0]['code'];
            //             $old_banding_id_code = $banding_old_code;
            //         }else{
            //             $old_banding_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'banding_banding_id'        => $item['old_banding_id'],
            //                                             );
            //         }

            //         //position code
            //         $get_position_old_code = $dao->getPositionCode($em, $data_temp_check_old);
            //         if($get_position_old_code[0]){
            //             $position_old_code = $get_position_old_code[0][0]['code'];
            //             $old_position_id_code = $position_old_code;
            //         }else{
            //             $old_position_id_code = null;
            //             $need_input_cherry_master[] = array(
            //                                                 'project_id'                => $item['old_project_id'],
            //                                                 'pt_id'                     => $item['old_pt_id'],
            //                                                 'position_position_id'      => $item['old_position_id'],
            //                                             );
            //         }

            //         $dao_ptold_cherry = new Hrd_Models_Companycherry_Dao();
            //         $ptold_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            //         $ptold_cherryFilter->setPtptId($item['pt_id']);
            //         $hasil_ptold_cherry = $dao_ptold_cherry->getAllWoPL($ptold_cherryFilter);
            //         if($hasil_ptold_cherry[1]){
            //             $company_code_old = $hasil_ptold_cherry[1][0]['company_code'];
            //         }else{
            //             $company_code_old = null;
            //         }

            //         if($data_result){
            //             $data_result = json_decode($data['jsonStringResult']);
            //             $employee_code = $data_result->Code;
            //         }else{
            //             $employee_code = null;
            //         }

            //         if($item['alasanresign_id'] == '1'){
            //             $name_item = 'Mengundurkan Diri';
            //         }elseif($item['alasanresign_id'] == '2'){
            //             $name_item = 'Pensiun';
            //         }elseif($item['alasanresign_id'] == '3'){
            //             $name_item = 'Pemutusan Hubungan Kerja';
            //         }elseif($item['alasanresign_id'] == '4'){
            //             $name_item = 'Habis Kontrak';
            //         }elseif($item['alasanresign_id'] == '5'){
            //             $name_item = 'Meninggal Dunia';
            //         }elseif($item['alasanresign_id'] == '6'){
            //             $name_item = 'Lainnya';
            //         }

            //         if($company_code_old){
            //             $get_careertransition_code = $dao->getCareerTransitionTypeCode($em,$name_item,$company_code_old);
            //             $careertransitiontype_code = $get_careertransition_code[0][0]['code'];
            //         }else{
            //             $careertransitiontype_code = null;
            //         }

            //         $need_input_cherry_careertransition_employee[] = array(
            //                                                                 'changestatus_id'    => '',
            //                                                                 'alasanresign_id'    => $item['alasanresign_id'],
            //                                                                 'assignation_date'   => '',
            //                                                                 'statusinformation_id' => '',
            //                                                                 'nik_group'          => $item_cte['nik_group'],
            //                                                                 'employee_id'        => $item_cte['employee_id'],
            //                                                                 'employee_name'      => $item_cte['employee_name'],
            //                                                                 'employee_code'      => $employee_code,
            //                                                                 'project_id'         => $item_cte['project_id'],
            //                                                                 'new_project_id'     => $item_cte['project_id'],
            //                                                                 'pt_id'              => $item_cte['pt_id'],
            //                                                                 'new_pt_id'          => $item_cte['pt_id'],
            //                                                                 'old_company_code'   => $company_code_old,
            //                                                                 'new_company_code'   => $company_code_old,
            //                                                                 // 'old_department'     => $item_cte['code']->department_code,
            //                                                                 // 'old_group'          => $item_cte['code']->group_code,
            //                                                                 // 'old_banding'        => $item_cte['code']->banding_code,
            //                                                                 // 'old_position'       => $item_cte['code']->position_code,
            //                                                                 'old_department'     => $old_department_id_code,
            //                                                                 'old_group'          => $old_group_id_code,
            //                                                                 'old_banding'        => $old_banding_id_code,
            //                                                                 'old_position'       => $old_position_id_code,
            //                                                                 'new_department'     => $old_department_id_code,
            //                                                                 'new_group'          => $old_group_id_code,
            //                                                                 'new_banding'        => $old_banding_id_code,
            //                                                                 'new_position'       => $old_position_id_code,
            //                                                                 'new_empstatus'      => $item_cte['code']->employeestatus_code,
            //                                                                 'date'               => date('Y-m-d',strtotime($item['modion'])),
            //                                                                 'careertransitiontype_code' => $careertransitiontype_code,
            //                                                                 'reason'             => $name_item,
            //                                                                 'note'               => $item['alasan_resign'],
            //                                                                 'effective_date'     => $item['nonactive_date'],

            //                                                                 //INI KUNCI NYA
            //                                                                 'expired_date'       => '',


                                                                            
            //         );
            //     }
            // }

        }

        $return_data['need_input_cherry_master'] = $need_input_cherry_master;
        $return_data['need_input_cherry_master_company'] = $need_input_cherry_master_company;
        $return_data['company_diff'] = $company_diff;
        $return_data['need_input_cherry_careertransition_employee'] = $need_input_cherry_careertransition_employee;
        
        return $return_data;

    }

    public function get_careertransition_employee_beforeRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString']);

        $employee_id = $jsonString->employee_id;
        $changestatus_id = $jsonString->changestatus_id;
        
        $get_careertransitionemployee_before_code = $dao->getCareerTransitionEmployeeBeforeCode($em,$this->getAppSession(), $employee_id);
        $careertransitionemployee_before_code = $get_careertransitionemployee_before_code[0];
        $need_update_cherry_careertransition_employee_before = null;
        if($careertransitionemployee_before_code 
            && $changestatus_id != $careertransitionemployee_before_code[0]['changestatus_id'] 
            && ($careertransitionemployee_before_code[0]['expired_date'] == '' || date('Y-m-d',strtotime($careertransitionemployee_before_code[0]['expired_date'])) == '1970-01-01') )
        {
            
            $item = $careertransitionemployee_before_code[0];

            $need_update_cherry_careertransition_employee_before = array(
                                                                            'code'               => $item['code'],
                                                                            'changestatus_id'    => $item['changestatus_id'],
                                                                            'nik_group'          => $item['nik_group'],
                                                                            'employee_id'        => $item['employee_id'],
                                                                            'employee_name'      => $item['employee_name'],
                                                                            'employee_code'      => $item['employee_code'],
                                                                            'project_id'         => $item['old_project_id'],
                                                                            'new_project_id'     => $item['new_project_id'],
                                                                            'pt_id'              => $item['old_pt_id'],
                                                                            'new_pt_id'          => $item['new_pt_id'],
                                                                            'old_company_code'   => $item['old_company_code'],
                                                                            'new_company_code'   => $item['new_company_code'],
                                                                            'old_department'     => $item['old_department'],
                                                                            'old_group'          => $item['old_group'],
                                                                            'old_banding'        => $item['old_banding'],
                                                                            'old_position'       => $item['old_position'],
                                                                            'new_department'     => $item['new_department'],
                                                                            'new_group'          => $item['new_group'],
                                                                            'new_banding'        => $item['new_banding'],
                                                                            'new_position'       => $item['new_position'],
                                                                            'date'               => date('Y-m-d',strtotime($item['date'])),
                                                                            'careertransitiontype_code' => $item['careertransitiontype_code'],
                                                                            'reason'             => $item['reason'],
                                                                            'note'               => $item['note'],
                                                                            'effective_date'     => date('Y-m-d',strtotime($item['effective_date'])),

                                                                            //INI KUNCI NYA
                                                                            'expired_date'       => date('Y-m-d',strtotime($jsonString->effective_date)),
                                                                            
                    );

            $hasil_update = $dao->saveCareerTransitionEmployeeBeforeApi($em, $this->getAppSession(),$need_update_cherry_careertransition_employee_before,'update');
            $msg = 'berhasil';

            $get_careertransitionemployee_code = $dao->getCareerTransitionEmployeeCode($em,$this->getAppSession(), $item['changestatus_id']);

            $hasil_get = $get_careertransitionemployee_code[0];

        }else{
            $need_update_cherry_careertransition_employee_before = null;
            $hasil_get = null;
            $hasil_update = null;
            $msg = null;
        }

        $arrayRespon = array(
            "need_update_cherry_careertransition_employee_before" => $need_update_cherry_careertransition_employee_before,
            "hasil_get" => $hasil_get,
            "hasil_update" => $hasil_update,
            "msg" => $msg
        );
        return Box_Tools::instantRead($arrayRespon);
    } 

    public function get_careertransition_employeeRead(){

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString']);

        $changestatus_id = $jsonString->changestatus_id;
        $alasanresign_id = $jsonString->alasanresign_id;
        $assignation_date = $jsonString->assignation_date;
        $statusinformation_id = $jsonString->statusinformation_id;

        $employee_id = $jsonString->employee_id;

        if($changestatus_id){

            $get_careertransitionemployee_code = $dao->getCareerTransitionEmployeeCode($em,$this->getAppSession(), $changestatus_id);

        }elseif($alasanresign_id){

            $get_careertransitionemployee_code = $dao->getCareerTransitionEmployeeCodeResign($em,$this->getAppSession(), $alasanresign_id,$employee_id);

        }elseif($statusinformation_id){

            $get_careertransitionemployee_code = $dao->getCareerTransitionEmployeeCodeStatus($em,$this->getAppSession(), $statusinformation_id,$employee_id);

        }elseif($assignation_date != '' || date('Y-m-d',strtotime($assignation_date)) == '1970-01-01'){

            $get_careertransitionemployee_code = $dao->getCareerTransitionEmployeeCodeAssign($em,$this->getAppSession(), $assignation_date,$employee_id);

        }else{
            $get_careertransitionemployee_code = null;
        }
        

        if(empty($get_careertransitionemployee_code[0])){
            $action_to_cherry = 'insert';
            $hasil_get = null;
        }else{

            $action_to_cherry = 'update';
            $hasil_get = $get_careertransitionemployee_code[0];
            
            // $careertransitionemployee_code = $get_careertransitionemployee_code[0];
            // $item = $careertransitionemployee_code[0];

            // if($item['expired_date'] == '' || date('Y-m-d',strtotime($item['expired_date'])) == '1970-01-01' ){
            //     $action_to_cherry = 'update';
            //     $hasil_get = $get_careertransitionemployee_code[0];
            // }else{
            //     $action_to_cherry = 'nothing';
            //     $hasil_get = null;
            // }
            // print_r($item['expired_date']);die();
        }
        
        
        
        $arrayRespon = array("action_to_cherry" => $action_to_cherry,"hasil_get" => $hasil_get);
        return Box_Tools::instantRead($arrayRespon);
    } 

    public function save_careertransitionemployee_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveCareerTransitionEmployeeBeforeApi($em, $this->getAppSession(),$jsonString,$data['action_to_cherry']);
        
        
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

    public function update_careertransitionemployee_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateCustomFieldValueEmployeeAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
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

    //EMPLOYEE RESIGN

    public function check_careertransition_employeeresignRead(){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $data = $this->getAppData();

        $data_current = json_decode($data['jsonString']);
        $data_result = $data['jsonStringResult'];
        $arr_temp_data = null;
        if(array_key_exists("nik_group",$data_current)){
            $arr_temp_data[] = array(
                                        'employee_id'                               => $data_current->employee_id,
                                        'employee_name'                             => $data_current->employee_name,
                                        'project_id'                                => $data_current->project_id,
                                        'pt_id'                                     => $data_current->pt_id,
                                        'nik_group'                                 => $data_current->nik_group,
                                        'code'                                      => $data_current->code,
            );
            
        }

        $check_db = $this->check_careertransition_employeeresign_db($arr_temp_data,$data,$data_result);


        $arrayRespon = array("check_db" => $check_db);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function check_careertransition_employeeresign_db($arr_temp_data,$data,$data_result){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();

        $need_input_cherry_careertransition_employee = null;
        $need_input_cherry_master = null;
        $need_input_cherry_master_company = null;
        $company_diff = null;

        foreach($arr_temp_data as $key_cte => $item_cte){
            $get_careertransition_employee = $dao->getCareerTransitionEmployeeResign($em,$item_cte,$data['choose_startdate'],$data['choose_enddate']);

            $careertransition_employee = $get_careertransition_employee[0];
            
            if($careertransition_employee){
                //tumpuk yg old dulu
                $get_careertransitionemployee_before_code = $dao->getCareerTransitionEmployeeBeforeCode($em,$this->getAppSession(), $item_cte['employee_id']);
                $careertransitionemployee_before_code = $get_careertransitionemployee_before_code[0];
                
                if($careertransitionemployee_before_code){
                    $item = $careertransitionemployee_before_code[0];

                    $new_careertransition_employee = $careertransition_employee;
                    end($new_careertransition_employee);   
                    $lastkey_new = key($new_careertransition_employee);
                    
                    if($careertransition_employee[$lastkey_new]['changestatus_id'] != $item['changestatus_id']){
                        $need_input_cherry_careertransition_employee[] = array(
                                                                                        'code'               => $item['code'],
                                                                                        'changestatus_id'    => $item['changestatus_id'],
                                                                                        'nik_group'          => $item['nik_group'],
                                                                                        'employee_id'        => $item['employee_id'],
                                                                                        'employee_name'      => $item['employee_name'],
                                                                                        'employee_code'      => $item['employee_code'],
                                                                                        'project_id'         => $item['old_project_id'],
                                                                                        'new_project_id'     => $item['new_project_id'],
                                                                                        'pt_id'              => $item['old_pt_id'],
                                                                                        'new_pt_id'          => $item['new_pt_id'],
                                                                                        'old_company_code'   => $item['old_company_code'],
                                                                                        'new_company_code'   => $item['new_company_code'],
                                                                                        'old_department'     => $item['old_department'],
                                                                                        'old_group'          => $item['old_group'],
                                                                                        'old_banding'        => $item['old_banding'],
                                                                                        'old_position'       => $item['old_position'],
                                                                                        'new_department'     => $item['new_department'],
                                                                                        'new_group'          => $item['new_group'],
                                                                                        'new_banding'        => $item['new_banding'],
                                                                                        'new_position'       => $item['new_position'],
                                                                                        'date'               => date('Y-m-d',strtotime($item['date'])),
                                                                                        'careertransitiontype_code' => $item['careertransitiontype_code'],
                                                                                        'reason'             => $item['reason'],
                                                                                        'note'               => $item['note'],
                                                                                        'effective_date'     => date('Y-m-d',strtotime($item['effective_date'])),

                                                                                        //INI KUNCI NYA
                                                                                        'expired_date'       => date('Y-m-d',strtotime($careertransition_employee[0]['nonactive_date'])),
                                                                                        
                                );
                    }

                }

                $item = $careertransition_employee[0];
                $data_temp_check_old = array(
                                                    'project_id'                => $item['project_id'],
                                                    'pt_id'                     => $item['pt_id'],
                                                    'department_department_id'  => $item['department_id'],
                                                    'group_group_id'            => $item['group_id'],
                                                    'banding_banding_id'        => $item['banding_id'],
                                                    'position_position_id'      => $item['position_id'],
                                            );

                //department code
                    $get_department_old_code = $dao->getDepartmentCode($em, $data_temp_check_old);
                    if($get_department_old_code[0]){
                        $department_old_code = $get_department_old_code[0][0]['code'];
                        $old_department_id_code = $department_old_code;
                    }else{
                        $old_department_id_code = null;
                        $need_input_cherry_master[] = array(
                                                            'project_id'                => $item['old_project_id'],
                                                            'pt_id'                     => $item['old_pt_id'],
                                                            'department_department_id'  => $item['old_department_id'],
                                                        );
                    }

                    //group code
                    $get_group_old_code = $dao->getGroupCode($em, $data_temp_check_old);
                    if($get_group_old_code[0]){
                        $group_old_code = $get_group_old_code[0][0]['code'];
                        $old_group_id_code = $group_old_code;
                    }else{
                        $old_group_id_code = null;
                        $need_input_cherry_master[] = array(
                                                            'project_id'                => $item['old_project_id'],
                                                            'pt_id'                     => $item['old_pt_id'],
                                                            'group_group_id'            => $item['old_group_id'],
                                                        );
                    }

                    //banding code
                    $get_banding_old_code = $dao->getBandingCode($em, $data_temp_check_old);
                    if($get_banding_old_code[0]){
                        $banding_old_code = $get_banding_old_code[0][0]['code'];
                        $old_banding_id_code = $banding_old_code;
                    }else{
                        $old_banding_id_code = null;
                        $need_input_cherry_master[] = array(
                                                            'project_id'                => $item['old_project_id'],
                                                            'pt_id'                     => $item['old_pt_id'],
                                                            'banding_banding_id'        => $item['old_banding_id'],
                                                        );
                    }

                    //position code
                    $get_position_old_code = $dao->getPositionCode($em, $data_temp_check_old);
                    if($get_position_old_code[0]){
                        $position_old_code = $get_position_old_code[0][0]['code'];
                        $old_position_id_code = $position_old_code;
                    }else{
                        $old_position_id_code = null;
                        $need_input_cherry_master[] = array(
                                                            'project_id'                => $item['old_project_id'],
                                                            'pt_id'                     => $item['old_pt_id'],
                                                            'position_position_id'      => $item['old_position_id'],
                                                        );
                    }
            
                foreach($careertransition_employee as $key => $item){
                    
                    if($item['alasanresign_id'] == '1'){
                        $name_item = 'Mengundurkan Diri';
                    }elseif($item['alasanresign_id'] == '2'){
                        $name_item = 'Pensiun';
                    }elseif($item['alasanresign_id'] == '3'){
                        $name_item = 'Pemutusan Hubungan Kerja';
                    }elseif($item['alasanresign_id'] == '4'){
                        $name_item = 'Habis Kontrak';
                    }elseif($item['alasanresign_id'] == '5'){
                        $name_item = 'Meninggal Dunia';
                    }elseif($item['alasanresign_id'] == '6'){
                        $name_item = 'Lainnya';
                    }

                    $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
                    $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
                    $pt_cherryFilter->setPtptId($item['pt_id']);
                    $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
                    if($hasil_pt_cherry[1]){
                        $company_code = $hasil_pt_cherry[1][0]['company_code'];
                    }else{
                        $company_code = null;
                    }

                    if($company_code){
                        $get_careertransition_code = $dao->getCareerTransitionTypeCode($em,$name_item,$company_code);
                        $careertransitiontype_code = $get_careertransition_code[0][0]['code'];
                    }else{
                        $careertransitiontype_code = null;
                    }

                    if($data_result){
                        $data_result = json_decode($data['jsonStringResult']);
                        $employee_code = $data_result->Code;
                    }else{
                        $employee_code = null;
                    }

                    if($item['alasan_resign']){
                        $alasan_resign = $item['alasan_resign'];
                    }else{
                        $alasan_resign = '-';
                    }

                    $expired_date_next = $item['nonactive_date'];

                    $need_input_cherry_careertransition_employee[] = array(
                                                                            'alasanresign_id'    => $item['alasanresign_id'],
                                                                            'nik_group'          => $item_cte['nik_group'],
                                                                            'employee_id'        => $item_cte['employee_id'],
                                                                            'employee_name'      => $item_cte['employee_name'],
                                                                            'employee_code'      => $employee_code,
                                                                            'project_id'         => $item_cte['project_id'],
                                                                            // 'new_project_id'     => $item['new_project_id'],
                                                                            'pt_id'              => $item_cte['pt_id'],
                                                                            // 'new_pt_id'          => $item['new_pt_id'],
                                                                            'old_company_code'   => $company_code,
                                                                            // 'new_company_code'   => $company_code,
                                                                            
                                                                            'old_department'     => $old_department_id_code,
                                                                            'old_group'          => $old_group_id_code,
                                                                            'old_banding'        => $old_banding_id_code,
                                                                            'old_position'       => $old_position_id_code,
                                                                            // 'new_department'     => $new_department_id_code,
                                                                            // 'new_group'          => $new_group_id_code,
                                                                            // 'new_banding'        => $new_banding_id_code,
                                                                            // 'new_position'       => $new_position_id_code,
                                                                            'date'               => date('Y-m-d'),
                                                                            'careertransitiontype_code' => $careertransitiontype_code,
                                                                            'reason'             => $alasan_resign,
                                                                            'note'               => $name_item,
                                                                            'effective_date'     => $item['nonactive_date'],
                                                                            'expired_date'       => '',
                                                                            
                    );
                }
            }

        }

        $return_data['need_input_cherry_careertransition_employee'] = $need_input_cherry_careertransition_employee;
        
        return $return_data;

    }

    // public function check_careertransition_employee_expbeforeRead(){
        
    //     $em = new Hrd_Models_Transferapi_Transferapimaster();
    //     $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
    //     $data = $this->getAppData();

    //     $data_current = json_decode($data['jsonString']);
    //     $data_result = $data['jsonStringResult'];
    //     $data_resign = json_decode($data['jsonResign'],true);

    //     $arr_temp_data = null;
    //     if(array_key_exists("nik_group",$data_current)){
    //         $arr_temp_data[] = array(
    //                                     'employee_id'                               => $data_current->employee_id,
    //                                     'employee_name'                             => $data_current->employee_name,
    //                                     'project_id'                                => $data_current->project_id,
    //                                     'pt_id'                                     => $data_current->pt_id,
    //                                     'nik_group'                                 => $data_current->nik_group,
    //                                     'code'                                      => $data_current->code,
    //         );
            
    //     }

    //     $check_db = $this->check_careertransition_employee_expbefore_db($arr_temp_data,$data,$data_result,$data_resign);


    //     $arrayRespon = array("check_db" => $check_db);
    //     return Box_Tools::instantRead($arrayRespon);
    // }

    // public function check_careertransition_employee_expbefore_db($arr_temp_data,$data,$data_result,$data_resign){
        
    //     $em = new Hrd_Models_Transferapi_Transferapimaster();
    //     $dao = new Hrd_Models_Transferapi_TransferapimasterDao();

    //     $need_input_cherry_careertransition_employee = null;

    //     foreach($arr_temp_data as $key_cte => $item_cte){

    //             $get_careertransitionemployee_before_code = $dao->getCareerTransitionEmployeeBeforeCode($em,$this->getAppSession(), $item_cte['employee_id']);

    //             $careertransitionemployee_before_code = $get_careertransitionemployee_before_code[0];
                
    //             if($careertransitionemployee_before_code){
    //                 $item = $careertransitionemployee_before_code[0];

                   
                    
    //                 if($item['changestatus_id']){
    //                     $need_input_cherry_careertransition_employee[] = array(
    //                                                                                     'code'               => $item['code'],
    //                                                                                     'changestatus_id'    => $item['changestatus_id'],
    //                                                                                     'nik_group'          => $item['nik_group'],
    //                                                                                     'employee_id'        => $item['employee_id'],
    //                                                                                     'employee_name'      => $item['employee_name'],
    //                                                                                     'employee_code'      => $item['employee_code'],
    //                                                                                     'project_id'         => $item['old_project_id'],
    //                                                                                     'new_project_id'     => $item['new_project_id'],
    //                                                                                     'pt_id'              => $item['old_pt_id'],
    //                                                                                     'new_pt_id'          => $item['new_pt_id'],
    //                                                                                     'old_company_code'   => $item['old_company_code'],
    //                                                                                     'new_company_code'   => $item['new_company_code'],
    //                                                                                     'old_department'     => $item['old_department'],
    //                                                                                     'old_group'          => $item['old_group'],
    //                                                                                     'old_banding'        => $item['old_banding'],
    //                                                                                     'old_position'       => $item['old_position'],
    //                                                                                     'new_department'     => $item['new_department'],
    //                                                                                     'new_group'          => $item['new_group'],
    //                                                                                     'new_banding'        => $item['new_banding'],
    //                                                                                     'new_position'       => $item['new_position'],
    //                                                                                     'date'               => date('Y-m-d',strtotime($item['date'])),
    //                                                                                     'careertransitiontype_code' => $item['careertransitiontype_code'],
    //                                                                                     'reason'             => $item['reason'],
    //                                                                                     'note'               => $item['note'],
    //                                                                                     'effective_date'     => date('Y-m-d',strtotime($item['effective_date'])),

    //                                                                                     //INI KUNCI NYA
    //                                                                                     'expired_date'       => date('Y-m-d',strtotime($data_resign[0]['effective_date'])),
                                                                                        
    //                             );
    //                 }

    //             }

    //     }

    //     $return_data['need_input_cherry_careertransition_employee'] = $need_input_cherry_careertransition_employee;
        
    //     return $return_data;

    // }

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


    //check code cherry udah keisi semua belum
    public function check_codecherry_employeeRead(){

        $data = $this->getAppData();
        $pt_id = $data['pt_id'];
        $employee_id = $data['employee_id'];
        $start_date = date('Y-m-d',strtotime($data['start_date']));
        $end_date = date('Y-m-d',strtotime($data['end_date']));
        $appdata = array(
                    'pt_id'             => $pt_id,
                    'employee_id'       => $employee_id,
                    'start_date'        => $start_date,
                    'end_date'          => $end_date
                );

        if($start_date == '1970-01-01'){
            $start_date = null;
        }
        if($end_date == '1970-01-01'){
            $end_date = null;
        }

         //CARI USER DPT AKSES APA AJA yang berhubungan dengan PT ini
            $daoprojectpt = new Hrd_Models_Master_Projectpt_Dao();
            $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectptFilter->setUserid($this->getAppSession()->getUserId());
            $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
            $allprojectpt = $daoprojectpt->getAllWoPL($projectptFilter);

            $arr_temp_union_projectpt = null;

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

            $hasil = null;
            $need_input_cherry_code = 0;
            $need_input_cherry_code_emp = null;
            $need_input_cherry_code_item = null;
            $need_input_cherry_code_ket = null;

            if($arr_temp_union_projectpt){
                foreach($arr_temp_union_projectpt as $key => $item){
                    $appdata = array(
                        'projectpt_id'      => $item['projectpt_id'],
                        'employee_id'       => $employee_id,
                        'start_date'        => $start_date,
                        'end_date'          => $end_date
                    );
                    $get = $dao->getAllProjectPt($this->getAppRequest(), $em, $this->getAppSession(), $appdata);

                    $get = $get[1];
                    $i = 0;
                    foreach($get as $key_child => $item_child){
                            // if(!empty($start_date) && !empty($end_date)){
                            //     if($start_date <= $item_child['statusinformation_hire_date'] && $end_date >= $item_child['statusinformation_hire_date']){
                            //         $item_child['employee_id'] = $item_child['employee_id'];
                            //     }else{
                            //         $item_child['employee_id'] = null;
                            //     }
                            // }
                            
                            if($item_child['employee_id']){

                                $data = array(
                                            'project_id'                                => $item_child['project_id'],
                                            'project_name'                              => $item_child['project_name'],
                                            'pt_id'                                     => $item_child['pt_id'],
                                            'pt_name'                                   => $item_child['pt_name'],
                                            'company_code'                              => $company_code,
                                            'nik_group'                                 => $item_child['nik_group'],
                                            'employee_id'                               => $item_child['employee_id'],
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
                                            'ptkp_id'                                   => $item_child['ptkp_ptkp_id'],
                                            'ptkp_code'                                 => $item_child['ptkp_ptkp_code'],
                                            'ptkp_effective_date'                       => $item_child['ptkp_effective_date'],
                                            'department_department_id'                  => $item_child['department_department_id'],
                                            'department_department'                     => $item_child['department_department'],
                                            'banding_banding_id'                        => $item_child['banding_banding_id'],
                                            'banding_banding'                           => $item_child['banding_banding'],
                                            'group_group_id'                            => $item_child['group_group_id'],
                                            'group_code'                                => $item_child['group_code'],
                                            'position_position_id'                      => $item_child['position_position_id'],
                                            'position_position'                         => $item_child['position_position'],
                                            'email'                                     => $item_child['email'],
                                            'email_ciputra'                             => $item_child['email_ciputra'],
                                            'phone_number'                              => $item_child['phone_number'],
                                            'employeestatus_employeestatus_id'          => $item_child['employeestatus_employeestatus_id'],
                                            'employeestatus_employeestatus'             => $item_child['employeestatus_employeestatus'],
                                            'statusinformation_id'                      => $item_child['statusinformation_id'],
                                            'statusinformation_hire_date'               => $item_child['statusinformation_hire_date'],
                                            'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                            'statusinformation_contract_start'          => $item_child['statusinformation_contract_start'],
                                            'statusinformation_contract_end'            => $item_child['statusinformation_contract_end'],

                                            'statusinformation_consultant_start'        => $item_child['statusinformation_consultant_start'],
                                            'statusinformation_consultant_end'          => $item_child['statusinformation_consultant_end'],

                                            'nonactive_date'                            => $item_child['nonactive_date'],
                                            'payroll_group'                             => $item_child['payroll_group'],
                                            'payrollgroup_id'                           => $item_child['payrollgroup_id'],
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
                                            'alokasibiaya_id'                           => $item_child['alokasibiaya_id'],
                                            'code_alokasibiaya'                         => $item_child['code_ab'],
                                            'name_alokasibiaya'                         => $item_child['name_ab'],
                                            'alokasibiaya_id2'                          => $item_child['alokasibiaya_id2'],
                                            'code_alokasibiaya2'                        => $item_child['code_ab2'],
                                            'name_alokasibiaya2'                        => $item_child['name_ab2'],
                                            'alokasibiaya_id3'                          => $item_child['alokasibiaya_id3'],
                                            'code_alokasibiaya3'                        => $item_child['code_ab3'],
                                            'name_alokasibiaya4'                        => $item_child['name_ab3'],
                                            'hari_kerja_perminggu'                      => $item_child['hari_kerja_perminggu'],
                                            'addon'                                     => $item_child['addon'],
                                            'modion'                                    => $item_child['modion'],
                                            'payroll_effective_date'                    => $item_child['payroll_effective_date'],
                                            'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                            'religion_religion_id'                      => $item_child['religion_religion_id'],
                                            'religion_religion'                         => $item_child['religion_religion'],
                                            // 'jobfamily_jobfamily'                       => $item_child['jobfamily_jobfamily'],
                                            // 'statusinformation_assignation_date'        => $item_child['statusinformation_assignation_date'],
                                            // 'statusinformation_contract_start'          => $item_child['statusinformation_contract_start']
                                        );

                                //GET CODE IN CHERRY
                                $code_cherry = $this->codecherry($data);
                                $data['code'] = $code_cherry;

                                
                                $need_input_cherry_code_item = null;
                                $need_input_cherry_code_emp = null;

                                end($code_cherry);
                                $key_last_code_cherry = key($code_cherry);

                                $need_input_cherry_code_emp = $data['employee_name'];
                                
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

                                if(empty($data['nik_group']) || empty($data['ktp_number']) || empty($data['npwp'])){
                                    if(empty($data['nik_group'])){
                                        $need_input_cherry_code_item .= '(NIK Group)';
                                    }
                                    if(empty($data['ktp_number'])){
                                        $need_input_cherry_code_item .= '(Ktp)';
                                    }
                                    if(empty($data['npwp'])){
                                        $need_input_cherry_code_item .= '(Npwp)';
                                    }
                                }
                                
                                if($need_input_cherry_code_item){
                                    if(empty($need_input_cherry_code_ket)){
                                        $need_input_cherry_code_ket .= $need_input_cherry_code_emp.' '.$need_input_cherry_code_item;
                                    }else{
                                        $need_input_cherry_code_ket .= ', '.$need_input_cherry_code_emp.' '.$need_input_cherry_code_item;
                                    }                                   
                                }
                                
                                $datas[] = $data;
                                $i++;
                            }
                        }
                }
                $hasil[0][0]['totalRow'] = $i;
                $hasil[1]= $datas;
            }
        
        $arrayRespon = array("need_input_cherry_code" => $need_input_cherry_code_ket);
        return Box_Tools::instantRead($need_input_cherry_code_ket);
    }

    //---------------------------------------------------------------------------------------------------------------------
    //EMP STATUS TYPE
    public function check_empstatusRead(){
        
        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        $data = $this->getAppData();

        $pt_id = $data['choose_ptpt'];

        if($pt_id == '999'){
            
            $allprojectpt = $this->all_projectpt_companycherry();
        
        }else{
            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            $pt_cherryFilter->setPtptId($pt_id);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
            $allprojectpt = $hasil_pt_cherry;

        }


        $explode_data = explode(',', $data['empstatus_var']);
        
        $need_input_cherry_empstatus = null;

        foreach($allprojectpt[1] as $key_pt => $item_pt){
            foreach($explode_data as $key => $item){
                $get_empstatus_code = $dao->getEmpStatusSubCode($em,$item,$item_pt['company_code']);
                if(empty($get_empstatus_code[0])){
                        $need_input_cherry_empstatus[] = array(
                                                            'name'          => $item,
                                                            'company_code'  => $item_pt['company_code']
                                                        );
                }
            }
        }

        $arrayRespon = array("need_input_cherry_empstatus" => $need_input_cherry_empstatus);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function save_empstatus_beforeapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        
        $hasil = $dao->saveEmpStatusBeforeApi($em, $this->getAppSession(),$jsonString,'insert');
        
        
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

    public function update_empstatus_afterapiRead(){

        $data = $this->getAppData();

        $jsonString = json_decode($data['jsonString'], true);
        $jsonStringResult = json_decode($data['jsonStringResult'], true);

        $em = new Hrd_Models_Transferapi_Transferapimaster();
        $dao = new Hrd_Models_Transferapi_TransferapimasterDao();
        
        $hasil = $dao->updateEmpStatusAfterApi($em, $this->getAppSession(),$jsonString,$jsonStringResult,$data);

        
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
}

?>
