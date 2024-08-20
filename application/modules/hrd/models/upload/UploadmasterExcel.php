<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ShiftTypeExcel
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Upload_UploadmasterExcel {
    private $status;
    private $msg;
    private $minCol;
    private $minRow;
    
    public function __construct() {
       $this->status = FALSE;
       $this->msg = "Process...";
       $this->minCol = 3;
       $this->minRow = 2;
    }
    
    /*@return Decan if success, return false if fail*/
    public function process_upload($fileName="file.xlsx",Box_Models_App_Session $ses,$data) {
        
        $file = $fileName;
        $chooseUpload = $data["choose_type"];
        $explodeChooseUpload = explode('_', $chooseUpload);
        $tableChoose = $explodeChooseUpload[1];

        $excel = PHPExcel_IOFactory::load(realpath(APPLICATION_PATH . '/../public/app/hrd/uploads/cherry/dokumen/'.$chooseUpload.'/'.$file));
        $excel->setActiveSheetIndex(0);
        
        $sheet = $excel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        $rowData = array();
        
        for ($row = $this->minRow; $row <= $highestRow; $row++) {
            
            $rowData[] = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            
        }
       
        $dao = new Hrd_Models_Upload_UploadmasterDao();
        $data_excel = array();
        
        $get_projectptid = $dao->getProjectPtId($ses,$data);
        $data['project_id'] = $get_projectptid[1][0]['project_id'];
        $data['pt_id'] = $get_projectptid[1][0]['pt_id'];

        $get_lastprocessid = $dao->getLastProcessId($ses,$tableChoose);
        $lastprocessid = $get_lastprocessid + 1;
        $data['lastprocessid'] = $lastprocessid;

        $data['tablechoose'] = $tableChoose;
        $data['notes'] = 'hasil upload '.$tableChoose;

        $last_data = $rowData;
        end($last_data);
        $key_last_data = key($last_data);
        
        $total_data_success = -1;
        $total_data_destroy = 0;
        
        //destroy semua dulu
        if($tableChoose != 'careertransition' && $tableChoose != 'employee'){
            $destroy_db = $dao->destroyAll($ses,$tableChoose,$data);
        }

        foreach ($rowData as $key => $item) {
            
            if($tableChoose == 'department'){
                $data_excel = array(
                                'project_name'              => $item[0][1],
                                'pt_name'                   => $item[0][2],
                                'department_name'           => $item[0][3],
                                'department_code'           => $item[0][4]
                );
            }elseif($tableChoose == 'group'){
                $data_excel = array(
                                'project_name'              => $item[0][1],
                                'pt_name'                   => $item[0][2],
                                'group_name'                => $item[0][3],
                                'group_code'                => $item[0][4]
                );
            }elseif($tableChoose == 'banding'){
                $data_excel = array(
                                'project_name'              => $item[0][1],
                                'pt_name'                   => $item[0][2],
                                'banding_name'              => $item[0][3],
                                'banding_code'              => $item[0][4]
                );
            }elseif($tableChoose == 'jobfamily'){
                $data_excel = array(
                                'jobfamily_name'            => $item[0][1],
                                'jobfamily_code'            => $item[0][2]
                );
            }elseif($tableChoose == 'position'){
                $data_excel = array(
                                'project_name'              => $item[0][1],
                                'pt_name'                   => $item[0][2],
                                'position_name'             => $item[0][3],
                                'position_description'      => $item[0][4]
                );
            }elseif($tableChoose == 'employee'){

                //--Personal--
                if($item[0][9]){
                    $birth_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][9]));
                }else{
                    $birth_date = '';
                }


                //--Effective Date--
                if($item[0][15]){
                    $npwp_effective_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][15]));
                }else{
                    $npwp_effective_date = '';
                }

                if($item[0][17]){
                    $ptkp_effective_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][17]));
                }else{
                    $ptkp_effective_date = '';
                }

                if($item[0][39]){
                    $rekening_effective_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][39]));
                }else{
                    $rekening_effective_date = '';
                }


                //-- Status Information--
                if($item[0][26]){
                    $hire_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][26]));
                }else{
                    $hire_date = '';
                }

                if($item[0][27]){
                    $assignation_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][27]));
                }else{
                    $assignation_date = '';
                }

                if($item[0][28]){
                    $contract_start = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][28]));
                }else{
                    $contract_start = '';
                }

                if($item[0][29]){
                    $contract_end = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][29]));
                }else{
                    $contract_end = '';
                }

                if($item[0][30]){
                    $nonactive_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][30]));
                }else{
                    $nonactive_date = '';
                }


                $data_excel = array(
                                    'project_name'                              => $item[0][1],
                                    'pt_name'                                   => $item[0][2],
                                    'employee_name'                             => $item[0][3],
                                    'nik_group'                                 => $item[0][4],
                                    'employee_nik'                              => $item[0][5],
                                    'sex'                                       => $item[0][6],
                                    'religion_id'                               => '',
                                    'religion'                                  => $item[0][7],
                                    'birth_place'                               => $item[0][8],
                                    'birth_date'                                => $birth_date,
                                    'id_type'                                   => $item[0][10],
                                    'ktp_number'                                => $item[0][11],
                                    'marriagestatus_marriagestatus_id'          => '',
                                    'marriagestatus_marriagestatus'             => $item[0][12],
                                    'nationality'                               => $item[0][13],
                                    'npwp'                                      => $item[0][14],

                                    'npwp_effective_date'                       => $npwp_effective_date,
                                    'ptkp_id'                                   => '',
                                    'ptkp_code'                                 => $item[0][16],
                                    'ptkp_effective_date'                       => $ptkp_effective_date,
                                    'department_department_id'                  => '',
                                    'department_department'                     => $item[0][18],
                                    'banding_banding_id'                        => '',
                                    'banding_banding'                           => $item[0][19],
                                    'group_group_id'                            => '',
                                    'group_code'                                => $item[0][20],
                                    'position_position_id'                      => '',
                                    'position_position'                         => $item[0][21],
                                    'employeestatus_employeestatus_id'          => '',
                                    'employeestatus_employeestatus'             => $item[0][22],
                                    'phone_number'                              => $item[0][23],
                                    'email'                                     => $item[0][24],

                                    'email_ciputra'                             => $item[0][25],
                                    'statusinformation_hire_date'               => $hire_date,
                                    'statusinformation_assignation_date'        => $assignation_date,
                                    'statusinformation_contract_start'          => $contract_start,
                                    'statusinformation_contract_end'            => $contract_end,
                                    'nonactive_date'                            => $nonactive_date,
                                    'payroll_group'                             => $item[0][31],
                                    'ktp_address'                               => $item[0][32],
                                    'address'                                   => $item[0][33],
                                    'payroll_currency'                          => $item[0][34],
                                    'payment_method'                            => $item[0][35],
                                    'bank_rekening'                             => $item[0][36],
                                    'nomor_rekening'                            => $item[0][37],
                                    'nama_rekening'                             => $item[0][38],
                                    'rekening_effective_date'                   => $rekening_effective_date,

                                    'calendar_company'                          => $item[0][40],
                                    //'work_shift'                                => $item[0][33],
                                    'hari_kerja_perminggu'                      => $item[0][41],
                                    'tax_country_code'                          => $item[0][42],
                                    'fingerprintcode'                           => $item[0][43],
                                    // 'cost_center_code'                          => $item[0][36],
                                    'no_bpjs_k'                                 => $item[0][44],
                                    'no_bpjs_kk'                                => $item[0][45],
                                    'no_bpjs_pp'                                => $item[0][46],
                                    'no_manulife_p'                             => $item[0][47],
                                    'no_asuransi'                               => $item[0][48],
                                    'worklocation_id'                           => '',
                                    'worklocation'                              => $item[0][49],
                                    'worklocation_project_id'                   => '',
                                    'worklocation_project'                      => $item[0][50],
                                    'worklocation_pt_id'                        => '',
                                    'worklocation_pt'                           => $item[0][51],
                                    'ibu_kandung'                               => $item[0][52]
                );
            }elseif($tableChoose == 'careertransition'){

                if($item[0][9]){
                    $effective_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][9]));
                }else{
                    $effective_date = '';
                }

                $data_excel = array(
                                'employee_name'             => $item[0][1],
                                'nik_group'                 => $item[0][2],
                                'alasanresign'              => $item[0][3],
                                'perubahanstatus'           => $item[0][4],
                                'changetype'                => $item[0][5],
                                'reason'                    => $item[0][6],
                                'note'                      => $item[0][7],
                                'sk_number'                 => $item[0][8],
                                'effective_date'            => $effective_date,
                                'old_project'               => $item[0][10],
                                'new_project_id'            => $item[0][11],
                                'new_project'               => $item[0][12],
                                'old_pt'                    => $item[0][13],
                                'new_pt_id'                 => $item[0][14],
                                'new_pt'                    => $item[0][15],
                                'old_department'            => $item[0][16],
                                'new_department'            => $item[0][17],
                                'old_position'              => $item[0][18],
                                'new_position'              => $item[0][19],
                                'old_banding'               => $item[0][20],
                                'new_banding'               => $item[0][21],
                                'old_group'                 => $item[0][22],
                                'new_group'                 => $item[0][23],
                                'employeestatus'            => $item[0][24]
                );

                //comment sementara
                // $destroy_db = $dao->destroyAll($ses,$tableChoose,$data_excel);
            }

            $check_db = $dao->getMasterCheck($ses,$tableChoose,$data_excel,$data);
            
            
            if($check_db[0]){
                //ada yg sama
                // if($data_excel['deleted'] == '1'){
                //     $data['action'] = 'destroy';
                // }else{
                //     $data['action'] = 'update';
                // }
                $data['action'] = 'update';
                $data['upload_'.$tableChoose.'_id'] = $check_db[0][0]['upload_'.$tableChoose.'_id'];
            }else{
                // if($data_excel['deleted'] == '1'){
                //     $data['action'] = 'destroy';
                // }else{
                //     $data['action'] = 'insert';
                // }
                $data['action'] = 'insert';
                $data['upload_'.$tableChoose.'_id'] = '';
            }

            //KHUSUS EMPLOYEE DI CEK DULU MASTER YG LAIN UDAH ADA APA BELOM & DIISI FIELD YANG KOSONG"
            if($tableChoose == 'employee'){

                //RELIGION
                $religion = strtolower($data_excel['religion']);

                if($religion){
                    
                    if($religion == 'islam'){
                        $religion_id = 1;
                    }elseif($religion == 'kristen'){
                        $religion_id = 2;
                    }elseif($religion == 'katholik' || $religion == 'katolik'){
                        $religion_id = 3;
                    }elseif($religion == 'hindu'){
                        $religion_id = 4;
                    }elseif($religion == 'buddha' || $religion == 'budha'){
                        $religion_id = 5;
                    }elseif($religion == 'konghucu'){
                        $religion_id = 6;
                    }else{
                        $religion_id = 7;
                    }

                }else{
                    $religion_id = '';
                }

                $data_excel['religion_id'] = $religion_id;

                //MARRIAGE STATUS
                $marriagestatus_marriagestatus = strtolower($data_excel['marriagestatus_marriagestatus']);

                if($marriagestatus_marriagestatus){

                    if($marriagestatus_marriagestatus == 'married' || $marriagestatus_marriagestatus == 'menikah'){
                        $marriagestatus_marriagestatus_id = 2;
                    }elseif($marriagestatus_marriagestatus == 'janda' || $marriagestatus_marriagestatus == 'duda'){
                        $marriagestatus_marriagestatus_id = 3;
                    }elseif($marriagestatus_marriagestatus == 'single' || $marriagestatus_marriagestatus == 'belum menikah'){
                        $marriagestatus_marriagestatus_id = 1;
                    }else{
                        $marriagestatus_marriagestatus_id = 4;
                    }

                }else{
                    $marriagestatus_marriagestatus_id = '';
                }

                $data_excel['marriagestatus_marriagestatus_id'] = $marriagestatus_marriagestatus_id;

                //EMPLOYEE STATUS
                $employeestatus_employeestatus = strtolower($data_excel['employeestatus_employeestatus']);

                if($employeestatus_employeestatus){
                    
                    if($employeestatus_employeestatus == 'permanent' || $employeestatus_employeestatus == 'tetap'){
                        $employeestatus_employeestatus_id = 1;
                    }elseif($employeestatus_employeestatus == 'contract' || $employeestatus_employeestatus == 'kontrak'){
                        $employeestatus_employeestatus_id = 2;
                    }elseif($employeestatus_employeestatus == 'candidate'){
                        $employeestatus_employeestatus_id = 3;
                    }elseif($employeestatus_employeestatus == 'daily permanent'){
                        $employeestatus_employeestatus_id = 4;
                    }elseif($employeestatus_employeestatus == 'daily contract'){
                        $employeestatus_employeestatus_id = 5;
                    }elseif($employeestatus_employeestatus == 'temporary'){
                        $employeestatus_employeestatus_id = 6;
                    }else{
                        $employeestatus_employeestatus_id = 7;
                    }

                }else{
                    $employeestatus_employeestatus_id = '';
                }

                $data_excel['employeestatus_employeestatus_id'] = $employeestatus_employeestatus_id;

                //PTKP
                $ptkp_code = strtolower($data_excel['ptkp_code']);

                if($ptkp_code){
                    
                    if($ptkp_code == 'tk0'){
                        $ptkp_id = 1;
                    }elseif($ptkp_code == 'tk1'){
                        $ptkp_id = 2;
                    }elseif($ptkp_code == 'tk2'){
                        $ptkp_id = 3;
                    }elseif($ptkp_code == 'tk3'){
                        $ptkp_id = 4;
                    }elseif($ptkp_code == 'k0'){
                        $ptkp_id = 5;
                    }elseif($ptkp_code == 'k1'){
                        $ptkp_id = 6;
                    }elseif($ptkp_code == 'k2'){
                        $ptkp_id = 7;
                    }elseif($ptkp_code == 'k3'){
                        $ptkp_id = 8;
                    }elseif($ptkp_code == 'ki0'){
                        $ptkp_id = 9;
                    }elseif($ptkp_code == 'ki1'){
                        $ptkp_id = 10;
                    }elseif($ptkp_code == 'ki2'){
                        $ptkp_id = 11;
                    }elseif($ptkp_code == 'ki3'){
                        $ptkp_id = 12;
                    }else{
                        $ptkp_id = 13;
                    }

                }else{
                    $ptkp_id = '';
                }

                $data_excel['ptkp_id'] = $ptkp_id;
                
                //DEPARTMENT
                $department_department = strtolower($data_excel['department_department']);
                $get_department_id = $dao->getDepartmentUploadId($data['project_id'],$data['pt_id'],$department_department);
                
                if(empty($get_department_id[0])){
                    $data_others = $data;
                    $tableChoose_others = 'department';
                    $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
                    $lastprocessid_others = $get_lastprocessid_others + 1;
                    $data_others['lastprocessid'] = $lastprocessid_others;
                    $data_others['tablechoose'] = $tableChoose_others;
                    $data_others['notes'] = 'tambahan dari upload employee';

                    $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'department_name'           => $data_excel['department_department'],
                                    'department_code'           => $data_excel['department_department']
                    );

                    $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

                    $get_department_id = $dao->getDepartmentUploadId($data['project_id'],$data['pt_id'],$department_department);
                    $department_department_id = $get_department_id[0][0]['upload_department_id'];
                }else{
                    $department_department_id = $get_department_id[0][0]['upload_department_id'];
                }

                $data_excel['department_department_id'] = $department_department_id;

                //GROUP
                $group_code = strtolower($data_excel['group_code']);
                $get_group_id = $dao->getGroupUploadId($data['project_id'],$data['pt_id'],$group_code);
                
                if(empty($get_group_id[0])){
                    $data_others = $data;
                    $tableChoose_others = 'group';
                    $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
                    $lastprocessid_others = $get_lastprocessid_others + 1;
                    $data_others['lastprocessid'] = $lastprocessid_others;
                    $data_others['tablechoose'] = $tableChoose_others;
                    $data_others['notes'] = 'tambahan dari upload employee';

                    $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'group_name'                => $data_excel['group_code'],
                                    'group_code'                => $data_excel['group_code']
                    );

                    $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

                    $get_group_id = $dao->getGroupUploadId($data['project_id'],$data['pt_id'],$group_code);
                    $group_group_id = $get_group_id[0][0]['upload_group_id'];
                }else{
                    $group_group_id = $get_group_id[0][0]['upload_group_id'];
                }

                $data_excel['group_group_id'] = $group_group_id;

                //BANDING
                $banding_banding = strtolower($data_excel['banding_banding']);
                $get_banding_id = $dao->getBandingUploadId($data['project_id'],$data['pt_id'],$banding_banding);
                
                if(empty($get_banding_id[0])){
                    $data_others = $data;
                    $tableChoose_others = 'banding';
                    $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
                    $lastprocessid_others = $get_lastprocessid_others + 1;
                    $data_others['lastprocessid'] = $lastprocessid_others;
                    $data_others['tablechoose'] = $tableChoose_others;
                    $data_others['notes'] = 'tambahan dari upload employee';

                    $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'banding_name'              => $data_excel['banding_banding'],
                                    'banding_code'              => $data_excel['banding_banding']
                    );

                    $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

                    $get_banding_id = $dao->getBandingUploadId($data['project_id'],$data['pt_id'],$banding_banding);
                    $banding_banding_id = $get_banding_id[0][0]['upload_banding_id'];
                }else{
                    $banding_banding_id = $get_banding_id[0][0]['upload_banding_id'];
                }

                $data_excel['banding_banding_id'] = $banding_banding_id;

                //POSITION
                $position_position = strtolower($data_excel['position_position']);
                $get_position_id = $dao->getPositionUploadId($data['project_id'],$data['pt_id'],$position_position);
                
                if(empty($get_position_id[0])){
                    $data_others = $data;
                    $tableChoose_others = 'position';
                    $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
                    $lastprocessid_others = $get_lastprocessid_others + 1;
                    $data_others['lastprocessid'] = $lastprocessid_others;
                    $data_others['tablechoose'] = $tableChoose_others;
                    $data_others['notes'] = 'tambahan dari upload employee';

                    $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'position_name'             => $data_excel['position_position'],
                                    'position_description'      => $data_excel['position_position']
                    );

                    $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

                    $get_position_id = $dao->getPositionUploadId($data['project_id'],$data['pt_id'],$position_position);
                    $position_position_id = $get_position_id[0][0]['upload_position_id'];
                }else{
                    $position_position_id = $get_position_id[0][0]['upload_position_id'];
                }

                $data_excel['position_position_id'] = $position_position_id;

            }

            //KHUSUS CAREER TRANSITION
            if($tableChoose == 'careertransition'){
                //GET UPLOAD EMPLOYEE ID
                $get_upload_employee_id = $dao->getEmployeeUploadId($data['project_id'],$data['pt_id'],$data_excel['employee_name'],$data_excel['nik_group']);          

                //GET OLD PROJECTPT ID
                //COMMENT SEMENTARA
                // $old_projectpt           = $this->cekProjectPt($ses,$dao,$data_excel,$data,$data_excel['old_project'],$data_excel['old_pt']);
                
                // $old_project_id          = $old_projectpt['get_projectpt_id_upload'][0][0]['project_id'];
                // $old_pt_id               = $old_projectpt['get_projectpt_id_upload'][0][0]['pt_id'];
                // $data_excel['old_project_id'] = $old_project_id;
                // $data_excel['old_pt_id'] = $old_pt_id;
                $old_projectpt = '';
                $old_projectpt['get_data'] = 'upload';
                $old_project_id          = $data['project_id'];
                $old_pt_id               = $data['pt_id'];
                $data_excel['old_project_id'] = $old_project_id;
                $data_excel['old_pt_id'] = $old_pt_id;

                if($old_projectpt['get_data'] == 'upload'){
                    
                    $data_excel['project_name'] = $data_excel['old_project'];
                    $data_excel['pt_name'] = $data_excel['old_pt'];

                    $department_department_id           = $this->cekDepartment($ses,$dao,$data_excel,$data,$data_excel['old_department'],$old_project_id,$old_pt_id);
                    $group_group_id                     = $this->cekGroup($ses,$dao,$data_excel,$data,$data_excel['old_group'],$old_project_id,$old_pt_id);
                    $banding_banding_id                 = $this->cekBanding($ses,$dao,$data_excel,$data,$data_excel['old_banding'],$old_project_id,$old_pt_id);
                     $position_position_id               = $this->cekPosition($ses,$dao,$data_excel,$data,$data_excel['old_position'],$old_project_id,$old_pt_id);

                }else{
                    
                    $department_department_id           = $this->cekDepartmentMaster($ses,$dao,$data_excel,$data,$data_excel['old_department'],$old_project_id,$old_pt_id);
                    $group_group_id                     = $this->cekGroupMaster($ses,$dao,$data_excel,$data,$data_excel['old_group'],$old_project_id,$old_pt_id);
                    $banding_banding_id                 = $this->cekBandingMaster($ses,$dao,$data_excel,$data,$data_excel['old_banding'],$old_project_id,$old_pt_id);
                     $position_position_id               = $this->cekPositionMaster($ses,$dao,$data_excel,$data,$data_excel['old_position'],$old_project_id,$old_pt_id);
                }
                
                $data_excel['old_department_id']    = $department_department_id;  
                $data_excel['old_group_id']         = $group_group_id;  
                $data_excel['old_banding_id']       = $banding_banding_id;  
                $data_excel['old_position_id']      = $position_position_id;  
                

                //NEW project pt
                //COMMENT SEMENTARA
                // $new_projectpt           = $this->cekProjectPt($ses,$dao,$data_excel,$data,$data_excel['new_project'],$data_excel['new_pt']);

                // $new_project_id          = $new_projectpt['get_projectpt_id_upload'][0][0]['project_id'];
                // $new_pt_id               = $new_projectpt['get_projectpt_id_upload'][0][0]['pt_id'];
                // $data_excel['new_project_id'] = $new_project_id;
                // $data_excel['new_pt_id'] = $new_pt_id;
                $new_projectpt = '';
                $new_projectpt['get_data'] = 'upload';
                $new_project_id          = $data_excel['new_project_id'];
                $new_pt_id               = $data_excel['new_pt_id'];

                if($new_projectpt['get_data'] == 'upload'){
                    
                    $data_excel['project_name'] = $data_excel['new_project'];
                    $data_excel['pt_name'] = $data_excel['new_pt'];

                    $department_department_id           = $this->cekDepartment($ses,$dao,$data_excel,$data,$data_excel['new_department'],$new_project_id,$new_pt_id);
                    $group_group_id                     = $this->cekGroup($ses,$dao,$data_excel,$data,$data_excel['new_group'],$new_project_id,$new_pt_id);
                    $banding_banding_id                 = $this->cekBanding($ses,$dao,$data_excel,$data,$data_excel['new_banding'],$new_project_id,$new_pt_id);
                     $position_position_id               = $this->cekPosition($ses,$dao,$data_excel,$data,$data_excel['new_position'],$new_project_id,$new_pt_id);

                }else{
                    
                    $department_department_id           = $this->cekDepartmentMaster($ses,$dao,$data_excel,$data,$data_excel['new_department'],$new_project_id,$new_pt_id);
                    $group_group_id                     = $this->cekGroupMaster($ses,$dao,$data_excel,$data,$data_excel['new_group'],$new_project_id,$new_pt_id);
                    $banding_banding_id                 = $this->cekBandingMaster($ses,$dao,$data_excel,$data,$data_excel['new_banding'],$new_project_id,$new_pt_id);
                     $position_position_id               = $this->cekPositionMaster($ses,$dao,$data_excel,$data,$data_excel['new_position'],$new_project_id,$new_pt_id);
                }
                
                $data_excel['new_department_id']    = $department_department_id;  
                $data_excel['new_group_id']         = $group_group_id;  
                $data_excel['new_banding_id']       = $banding_banding_id;  
                $data_excel['new_position_id']      = $position_position_id;

                //1 PROMOSI -- 2 ROTASI -- 3 MUTASI -- 4 DEMOSI
                $changetype                         = strtolower($data_excel['changetype']);
                
                if($changetype){

                    if($changetype == 'promosi' || $changetype == 'promotion'){
                        $changetype_id = 1;
                    }elseif($changetype == 'rotasi' || $changetype == 'rotation'){
                        $changetype_id = 2;
                    }elseif($changetype == 'mutasi' || $changetype == 'mutation'){
                        $changetype_id = 3;
                    }elseif($changetype == 'demosi' || $changetype == 'demotion'){
                        $changetype_id = 4;
                    }else{
                        $changetype_id = 99;
                    }

                }else{
                    $changetype_id = '';
                }

                $data_excel['changetype_id']        = $changetype_id;

                $employeestatus = strtolower($data_excel['employeestatus']);

                if($employeestatus){
                    
                    if($employeestatus == 'permanent' || $employeestatus == 'tetap'){
                        $employeestatus_id = 1;
                    }elseif($employeestatus == 'contract' || $employeestatus == 'kontrak'){
                        $employeestatus_id = 2;
                    }elseif($employeestatus == 'candidate'){
                        $employeestatus_id = 3;
                    }elseif($employeestatus == 'daily permanent'){
                        $employeestatus_id = 4;
                    }elseif($employeestatus == 'daily contract'){
                        $employeestatus_id = 5;
                    }elseif($employeestatus == 'temporary'){
                        $employeestatus_id = 6;
                    }else{
                        $employeestatus_id = 99;
                    }

                }else{
                    $employeestatus_id = '';
                }

                $data_excel['employeestatus_id'] = $employeestatus_id;

                $alasanresign = strtolower($data_excel['alasanresign']);

                if($alasanresign){
                    
                    if($alasanresign == 'mengundurkan diri' || $alasanresign == 'resign'){
                        $alasanresign_id = 1;
                    }elseif($alasanresign == 'pensiun'){
                        $alasanresign_id = 2;
                    }elseif($alasanresign == 'pemutusan hubungan kerja' || $alasanresign == 'phk'){
                        $alasanresign_id = 3;
                    }elseif($alasanresign == 'habis kontrak'){
                        $alasanresign_id = 4;
                    }elseif($alasanresign == 'meninggal dunia'){
                        $alasanresign_id = 5;
                    }elseif($alasanresign == 'lainnya'){
                        $alasanresign_id = 6;
                    }else{
                        $alasanresign_id = 99;
                    }

                }else{
                    $alasanresign_id = '';
                }

                $data_excel['alasanresign_id'] = $alasanresign_id;

                $perubahanstatus = strtolower($data_excel['perubahanstatus']);

                if($perubahanstatus){
                    
                    if($perubahanstatus == 'permanent' || $perubahanstatus == 'tetap'){
                        $perubahanstatus_id = 1;
                    }elseif($perubahanstatus == 'contract' || $perubahanstatus == 'kontrak'){
                        $perubahanstatus_id = 2;
                    }elseif($perubahanstatus == 'candidate'){
                        $perubahanstatus_id = 3;
                    }elseif($perubahanstatus == 'daily permanent'){
                        $perubahanstatus_id = 4;
                    }elseif($perubahanstatus == 'daily contract'){
                        $perubahanstatus_id = 5;
                    }elseif($perubahanstatus == 'temporary'){
                        $perubahanstatus_id = 6;
                    }else{
                        $perubahanstatus_id = 99;
                    }

                }else{
                    $perubahanstatus_id = '';
                }

                $data_excel['perubahanstatus_id'] = $perubahanstatus_id;
                
                // print_r($data_excel);die();
            }
            
            $input_db_master = $dao->uploadMaster($ses,$tableChoose,$data_excel,$data);

            if($input_db_master){
                $total_data_success++;
            }

            // if($input_db_master && $data_excel['deleted'] != '1'){
            //     $total_data_success++;
            // }

            // if($data_excel['deleted'] == '1'){
            //     $total_data_destroy++;
            // }
        }

        //master destroy employee used
        if($tableChoose != 'careertransition' && $tableChoose != 'employee'){
            $check_master_destroy_but_employee_used = $dao->checkMasterDestoryEmployeeUsed($ses,$tableChoose,$data);
        }
        // $total_data = $key_last_data - $total_data_destroy;
        // print_r($key_last_data .' - '. $total_data_destroy.' | '.$total_data_success .' - '. $total_data);die();
        if($total_data_success == $key_last_data){
            $this->status = TRUE;
        }else{
            $this->status = FALSE;
        }
        
        return $this->status;
    }


    public function cekProjectPt($ses,$dao,$data_excel,$data,$project_name,$pt_name){

        $data = '';
        $project_name = strtolower($project_name);
        $pt_name = strtolower($pt_name);

        $get_projectpt_id_upload = $dao->getProjectPtUploadId($project_name,$pt_name);

        if($get_projectpt_id_upload[0]){
            
            $data['get_data'] = 'upload';
            $data['get_projectpt_id_upload'] = $get_projectpt_id_upload;
            
        }else{

            $data['get_data'] = 'dbmaster';
            $data['get_projectpt_id_upload'] = $dao->getProjectPtUploadDbmasterId($project_name,$pt_name);
        }

        return $data;
    }

    public function cekDepartment($ses,$dao,$data_excel,$data,$department,$project_id,$pt_id){
        $department_department = strtolower($department);
        $get_department_id = $dao->getDepartmentUploadId($data['project_id'],$data['pt_id'],$department_department);
                
        if(empty($get_department_id[0])){
            $data_others = $data;
            $tableChoose_others = 'department';
            $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
            $lastprocessid_others = $get_lastprocessid_others + 1;
            $data_others['lastprocessid'] = $lastprocessid_others;
            $data_others['tablechoose'] = $tableChoose_others;
            $data_others['notes'] = 'tambahan dari career transition';

            $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'department_name'           => $department,
                                    'department_code'           => $department
            );

            $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

            $get_department_id = $dao->getDepartmentUploadId($data['project_id'],$data['pt_id'],$department_department);
            $department_department_id = $get_department_id[0][0]['upload_department_id'];
        }else{
            $department_department_id = $get_department_id[0][0]['upload_department_id'];
        }

        return $department_department_id;
    }

    public function cekDepartmentMaster($ses,$dao,$data_excel,$data,$department,$project_id,$pt_id){
        $department_department = strtolower($department);
        $get_department_id = $dao->getDepartmentMasterId($data['project_id'],$data['pt_id'],$department_department);
                
        $department_department_id = $get_department_id[0][0]['department_id'];

        return $department_department_id;
    }

    public function cekGroup($ses,$dao,$data_excel,$data,$group,$project_id,$pt_id){
        $group_code = strtolower($group);
        $get_group_id = $dao->getGroupUploadId($data['project_id'],$data['pt_id'],$group_code);
                
        if(empty($get_group_id[0])){
            $data_others = $data;
            $tableChoose_others = 'group';
            $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
            $lastprocessid_others = $get_lastprocessid_others + 1;
            $data_others['lastprocessid'] = $lastprocessid_others;
            $data_others['tablechoose'] = $tableChoose_others;
            $data_others['notes'] = 'tambahan dari career transition';

            $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'group_name'                => $group,
                                    'group_code'                => $group
            );

            $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

            $get_group_id = $dao->getGroupUploadId($data['project_id'],$data['pt_id'],$group_code);
            $group_group_id = $get_group_id[0][0]['upload_group_id'];
        }else{
            $group_group_id = $get_group_id[0][0]['upload_group_id'];
        }

        return $group_group_id;
    }

    public function cekGroupMaster($ses,$dao,$data_excel,$data,$group,$project_id,$pt_id){
        $group_code = strtolower($group);
        $get_group_id = $dao->getGroupMasterId($data['project_id'],$data['pt_id'],$group_code);
                
        $group_group_id = $get_group_id[0][0]['group_id'];

        return $group_group_id;
    }

    public function cekBanding($ses,$dao,$data_excel,$data,$banding,$project_id,$pt_id){
        $banding_banding = strtolower($banding);
        $get_banding_id = $dao->getBandingUploadId($data['project_id'],$data['pt_id'],$banding_banding);
                
        if(empty($get_banding_id[0])){
            $data_others = $data;
            $tableChoose_others = 'banding';
            $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
            $lastprocessid_others = $get_lastprocessid_others + 1;
            $data_others['lastprocessid'] = $lastprocessid_others;
            $data_others['tablechoose'] = $tableChoose_others;
            $data_others['notes'] = 'tambahan dari career transition';

            $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'banding_name'              => $banding,
                                    'banding_code'              => $banding
                    );

            $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

            $get_banding_id = $dao->getBandingUploadId($data['project_id'],$data['pt_id'],$banding_banding);
            $banding_banding_id = $get_banding_id[0][0]['upload_banding_id'];
        }else{
            $banding_banding_id = $get_banding_id[0][0]['upload_banding_id'];
        }

        return $banding_banding_id;
    }

    public function cekBandingMaster($ses,$dao,$data_excel,$data,$banding,$project_id,$pt_id){
        $banding_banding = strtolower($banding);
        $get_banding_id = $dao->getBandingMasterId($data['project_id'],$data['pt_id'],$banding_banding);
                
        $banding_banding_id = $get_banding_id[0][0]['banding_id'];

        return $banding_banding_id;
    }

    public function cekPosition($ses,$dao,$data_excel,$data,$position,$project_id,$pt_id){
        $position_position = strtolower($position);
        $get_position_id = $dao->getPositionUploadId($data['project_id'],$data['pt_id'],$position_position);
                
        if(empty($get_position_id[0])){
            $data_others = $data;
            $tableChoose_others = 'position';
            $get_lastprocessid_others = $dao->getLastProcessId($ses,$tableChoose_others);
            $lastprocessid_others = $get_lastprocessid_others + 1;
            $data_others['lastprocessid'] = $lastprocessid_others;
            $data_others['tablechoose'] = $tableChoose_others;
            $data_others['notes'] = 'tambahan dari upload employee';

            $data_excel_others = array(
                                    'project_name'              => $data_excel['project_name'],
                                    'pt_name'                   => $data_excel['pt_name'],
                                    'position_name'             => $position,
                                    'position_description'      => $position
            );

            $input_db = $dao->uploadMaster($ses,$tableChoose_others,$data_excel_others,$data_others);

            $get_position_id = $dao->getPositionUploadId($data['project_id'],$data['pt_id'],$position_position);
            $position_position_id = $get_position_id[0][0]['upload_position_id'];
        }else{
            $position_position_id = $get_position_id[0][0]['upload_position_id'];
        }

        return $position_position_id;
    }

    public function cekPositionMaster($ses,$dao,$data_excel,$data,$position,$project_id,$pt_id){
        $position_position = strtolower($position);
        $get_position_id = $dao->getPositionMasterId($data['project_id'],$data['pt_id'],$position_position);
                
        $position_position_id = $get_position_id[0][0]['position_id'];

        return $position_position_id;
    }
    

    public function getStatus(){
        return $this->status;
    }
    
    public function getMsg(){
        return $this->msg;
    }

}
