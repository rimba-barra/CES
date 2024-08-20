

<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Upload_UploadmasterDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save() {
        
    }
    
    public function getAll(){
        
    }
    
    public function getAllWoPL(){
        
    }  

    public function update() {
        
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }


    //------------------------------------------------------------------------------------------------------------------

    //PROCESS TO CHERRY
    // public function saveMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data,$jsonString,$jsonStringResult) {

    //     $value                  = $data['value'];

    //     $action                 = $data['action_to_cherry'];
    //     $result_status          = $data['result_status'];
    //     $result_status_message  = $data['result_status_message'];
    //     $code                   = $jsonStringResult['Code'];
    //     $insertstamp            = $jsonStringResult['InsertStamp'];
    //     $updatestamp            = $jsonStringResult['UpdateStamp'];

    //     $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
    //     $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
    //     $processdata_projectpt_id = $data['projectpt_id'];

    //     $logprocessid           = $data['lastprocessid'];

    //     $sp = 'sp_master_'.$data['value'].'_create';
    //     $hasil = 0;
        
    //     if($data['value'] == 'employee'){

    //         $opsi_input         =   $jsonString['project_id']."','".
    //                                 $jsonString['project_name']."','".
    //                                 $jsonString['pt_id']."','".
    //                                 $jsonString['pt_name']."','".
    //                                 $jsonString['employee_id']."','".
    //                                 $jsonString['employee_name']."','".
    //                                 $jsonString['employee_nik']."','".
    //                                 $jsonString['nik_group']."','".
    //                                 $jsonString['sex']."','".
    //                                 $jsonString['birth_date']."','".

    //                                 $jsonString['birth_place']."','".
    //                                 $jsonString['id_type']."','".
    //                                 $jsonString['ktp_number']."','".
    //                                 $jsonString['marriagestatus_marriagestatus_id']."','".
    //                                 $jsonString['marriagestatus_marriagestatus']."','".
    //                                 $jsonString['nationality']."','".
    //                                 $jsonString['npwp']."','".
    //                                 $jsonString['ptkp']."','".
    //                                 $jsonString['department_department_id']."','".
    //                                 $jsonString['department_department']."','".

    //                                 $jsonString['banding_banding_id']."','".
    //                                 $jsonString['banding_banding']."','".
    //                                 $jsonString['group_group_id']."','".
    //                                 $jsonString['group_code']."','".
    //                                 $jsonString['position_position_id']."','".
    //                                 $jsonString['position_position']."','".
    //                                 $jsonString['phone_number']."','".
    //                                 $jsonString['email_ciputra']."','".
    //                                 $jsonString['employeestatus_employeestatus_id']."','".
    //                                 $jsonString['employeestatus_employeestatus']."','".

    //                                 $jsonString['statusinformation_hire_date']."','".
    //                                 $jsonString['statusinformation_contract_end']."','".
    //                                 $jsonString['payroll_group']."','".
    //                                 $jsonString['ktp_address']."','".
    //                                 $jsonString['address']."','".
    //                                 $jsonString['payroll_currency']."','".
    //                                 $jsonString['payment_method']."','".
    //                                 $jsonString['bank_rekening']."','".
    //                                 $jsonString['nomor_rekening']."','".
    //                                 $jsonString['nama_rekening']."','".

    //                                 $jsonString['calendar_company']."','".
    //                                 $jsonString['work_shift']."','".
    //                                 $jsonString['tax_country_code']."','".
    //                                 $jsonString['fingerprintcode']."','".
    //                                 $jsonString['cost_center_code']."','".
    //                                 $jsonString['no_bpjs_k']."','".
    //                                 $jsonString['no_bpjs_kk']."','".
    //                                 $jsonString['no_bpjs_pp']."','".
    //                                 $jsonString['no_manulife_p']."','".
    //                                 $jsonString['no_asuransi']."','".

    //                                 $jsonString['worklocation_id']."','".
    //                                 $jsonString['worklocation']."','".
    //                                 $jsonString['worklocation_project_id']."','".
    //                                 $jsonString['worklocation_project']."','".
    //                                 $jsonString['worklocation_pt_id']."','".
    //                                 $jsonString['worklocation_pt']."','".
    //                                 $jsonString['ibu_kandung']
    //                               ;
    //     }
    //     elseif($data['value'] == 'dept'){

    //         $opsi_input         =   $jsonString['project_id']."','".
    //                                 $jsonString['project_name']."','".
    //                                 $jsonString['pt_id']."','".
    //                                 $jsonString['pt_name']."','".
    //                                 $jsonString['department_id']."','".
    //                                 $jsonString['department']."','".
    //                                 $jsonString['code']
    //                               ;
    //     }
    //     elseif($data['value'] == 'banding'){

    //         $opsi_input         =   $jsonString['banding_id']."','".
    //                                 $jsonString['banding']."','".
    //                                 $jsonString['code']
    //                               ;
    //     }
    //     elseif($data['value'] == 'group'){

    //         $opsi_input         =   $jsonString['project_id']."','".
    //                                 $jsonString['project_name']."','".
    //                                 $jsonString['pt_id']."','".
    //                                 $jsonString['pt_name']."','".
    //                                 $jsonString['group_id']."','".
    //                                 $jsonString['group']."','".
    //                                 $jsonString['code']
    //                               ;
    //     }
    //     elseif($data['value'] == 'jobfamily'){

    //         $opsi_input         =   $jsonString['jobfamily_id']."','".
    //                                 $jsonString['jobfamily']."','".
    //                                 $jsonString['code']
    //                               ;
    //     }
    //     elseif($data['value'] == 'position'){

    //         $opsi_input         =   $jsonString['position_id'].','.
    //                                 $jsonString['position'].','.
    //                                 $jsonString['description']
    //                               ;
    //     }
    //     else{
    //         $opsi_input         = '';
    //     }

        
    //     $hasil = $this->dbTable->SPUpdate($sp,
    //                                     $logprocessid,

    //                                     $action,
    //                                     $result_status,
    //                                     $result_status_message,
    //                                     $code,
    //                                     $insertstamp,
    //                                     $updatestamp,

    //                                     $processdata_start,
    //                                     $processdata_end,
    //                                     $processdata_projectpt_id,
   
    //                                     $opsi_input,

    //                                     $session->getUserId(),
    //                                     1,
    //                                     0);  
    //     return $hasil;
    // }

     //------------------------------------------------------------------------------------------------------------------

    //GET AFTER PROCESS
    // public function getMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data) {

    //     $hasil = '';

    //     $lastprocessid = $data['lastprocessid'];
    //     $process_api = $data['process_api'];
    //     $process_api_model = $data['process_api_model'];
    //     $value = $data['value'];
    //     $sp = 'sp_master_'.$value.'_readafterprocess';

    //     $hasil = $this->dbTable->SPExecute($sp, $lastprocessid);

    //     return $hasil;
    // }

    //-------------------------------------------------------------------------------------------------------------------

    //UPLOAD
    public function uploadMaster($session,$tableChoose,$data_excel,$data) {

        $hasil = '';
        
        if($tableChoose == 'department'){
            $tableChoose = 'dept';
        }else{
            $tableChoose = $tableChoose;
        }

        // if($data_excel['deleted'] == 1){
        //     $active_excel = 0;
        // }else{
        //     $active_excel = 1;
        // }

        if($tableChoose == 'dept'){

            $opsi = $data['project_id']."','".
                    $data['pt_id']."','". 
                    $data_excel['department_name']."','". 
                    $data_excel['department_code']."','". 
                    "1','". 
                    "0";
                    // $active_excel."','". 
                    // $data_excel['deleted'];

        }elseif($tableChoose == 'group'){

            $opsi = $data['project_id']."','".
                    $data['pt_id']."','". 
                    $data_excel['group_name']."','". 
                    $data_excel['group_code']."','". 
                    "1','". 
                    "0";
                    // $active_excel."','". 
                    // $data_excel['deleted'];

        }elseif($tableChoose == 'banding'){

            $opsi = $data['project_id']."','".
                    $data['pt_id']."','".
                    $data_excel['banding_name']."','". 
                    $data_excel['banding_code']."','". 
                    "1','". 
                    "0";
                    // $active_excel."','". 
                    // $data_excel['deleted'];

        }elseif($tableChoose == 'jobfamily'){

            $opsi = $data_excel['jobfamily_name']."','". 
                    $data_excel['jobfamily_code']; 
                    

        }elseif($tableChoose == 'position'){

            $opsi = $data['project_id']."','".
                    $data['pt_id']."','".
                    $data_excel['position_name']."','". 
                    $data_excel['position_description']."','". 
                    "1','". 
                    "0";
                    // $active_excel."','". 
                    // $data_excel['deleted'];

        }elseif($tableChoose == 'employee'){
                                    
            $opsi         =         $data['project_id']."','".
                                    $data['pt_id']."','". 
                                    $data_excel['employee_name']."','".
                                    $data_excel['employee_nik']."','".
                                    $data_excel['nik_group']."','".
                                    $data_excel['sex']."','".
                                    $data_excel['religion_id']."','".
                                    $data_excel['religion']."','".
                                    $data_excel['birth_date']."','".
                                    $data_excel['birth_place']."','".
                                    $data_excel['id_type']."','".
                                    $data_excel['ktp_number']."','".
                                    $data_excel['marriagestatus_marriagestatus_id']."','".
                                    $data_excel['marriagestatus_marriagestatus']."','".
                                    $data_excel['nationality']."','".
                                    $data_excel['npwp']."','".

                                    $data_excel['npwp_effective_date']."','".
                                    $data_excel['ptkp_id']."','".
                                    $data_excel['ptkp_code']."','".
                                    $data_excel['ptkp_effective_date']."','".
                                    $data_excel['department_department_id']."','".
                                    $data_excel['department_department']."','".
                                    $data_excel['banding_banding_id']."','".
                                    $data_excel['banding_banding']."','".
                                    $data_excel['group_group_id']."','".
                                    $data_excel['group_code']."','".
                                    $data_excel['position_position_id']."','".
                                    $data_excel['position_position']."','".
                                    $data_excel['phone_number']."','".
                                    $data_excel['email']."','".
                                    $data_excel['email_ciputra']."','".
                                    $data_excel['employeestatus_employeestatus_id']."','".
                                    $data_excel['employeestatus_employeestatus']."','".

                                    $data_excel['statusinformation_hire_date']."','".
                                    $data_excel['statusinformation_assignation_date']."','".
                                    $data_excel['statusinformation_contract_start']."','".
                                    $data_excel['statusinformation_contract_end']."','".
                                    $data_excel['nonactive_date']."','".
                                    $data_excel['payroll_group']."','".
                                    $data_excel['ktp_address']."','".
                                    $data_excel['address']."','".
                                    $data_excel['payroll_currency']."','".
                                    $data_excel['payment_method']."','".
                                    $data_excel['bank_rekening']."','".
                                    $data_excel['nomor_rekening']."','".
                                    $data_excel['nama_rekening']."','".
                                    $data_excel['rekening_effective_date']."','".

                                    $data_excel['calendar_company']."','".
                                    // $data_excel['work_shift']."','".
                                    $data_excel['hari_kerja_perminggu']."','".
                                    $data_excel['tax_country_code']."','".
                                    $data_excel['fingerprintcode']."','".
                                    // $data_excel['cost_center_code']."','".
                                    $data_excel['no_bpjs_k']."','".
                                    $data_excel['no_bpjs_kk']."','".
                                    $data_excel['no_bpjs_pp']."','".
                                    $data_excel['no_manulife_p']."','".
                                    $data_excel['no_asuransi']."','".
                                    $data_excel['worklocation_id']."','".
                                    $data_excel['worklocation']."','".
                                    $data_excel['worklocation_project_id']."','".
                                    $data_excel['worklocation_project']."','".
                                    $data_excel['worklocation_pt_id']."','".
                                    $data_excel['worklocation_pt']."','".
                                    $data_excel['ibu_kandung']."','".
                                    "1','". 
                                    "0";
                                    // $active_excel."','". 
                                    // $data_excel['deleted']
                                  ;

        }elseif($tableChoose == 'careertransition'){

            $opsi = $data['project_id']."','".
                    $data['pt_id']."','".
                    $data_excel['employee_name']."','". 
                    $data_excel['nik_group']."','".
                    $data_excel['changetype_id']."','". 
                    $data_excel['changetype']."','".
                    $data_excel['alasanresign_id']."','". 
                    $data_excel['alasanresign']."','".
                    $data_excel['perubahanstatus_id']."','". 
                    $data_excel['perubahanstatus']."','".
                    $data_excel['reason']."','". 
                    $data_excel['note']."','".
                    $data_excel['sk_number']."','". 
                    $data_excel['effective_date']."','".
                    $data_excel['old_project_id']."','". 
                    $data_excel['old_project']."','".
                    $data_excel['new_project_id']."','". 
                    $data_excel['new_project']."','". 
                    $data_excel['old_pt_id']."','". 
                    $data_excel['old_pt']."','".
                    $data_excel['new_pt_id']."','". 
                    $data_excel['new_pt']."','".
                    $data_excel['old_department_id']."','". 
                    $data_excel['old_department']."','".
                    $data_excel['new_department_id']."','". 
                    $data_excel['new_department']."','".
                    $data_excel['old_position_id']."','". 
                    $data_excel['old_position']."','".
                    $data_excel['new_position_id']."','". 
                    $data_excel['new_position']."','".
                    $data_excel['old_banding_id']."','". 
                    $data_excel['old_banding']."','".
                    $data_excel['new_banding_id']."','". 
                    $data_excel['new_banding']."','".
                    $data_excel['old_group_id']."','". 
                    $data_excel['old_group']."','".
                    $data_excel['new_group_id']."','". 
                    $data_excel['new_group']."','".
                    $data_excel['employeestatus_id']."','". 
                    $data_excel['employeestatus']."','".     
                    "1','". 
                    "0";
                    // $active_excel."','". 
                    // $data_excel['deleted'];

        }
        // print_r($data);die();
        $choose = $data['tablechoose'];
        if($data['action'] == 'update' && $data['upload_'.$choose.'_id']){
            $sp = 'sp_upload_master_'.$tableChoose.'_update';
            $hasil = $this->updateuploadMaster($sp,$opsi,$session,$data);
        }elseif($data['action'] == 'destroy' && $data['upload_'.$choose.'_id']){
            $sp = 'sp_upload_master_'.$tableChoose.'_destroy';
            $hasil = $this->destroyuploadMaster($sp,$opsi,$session,$data);
        }elseif($data['action'] == 'insert' && empty($data['upload_'.$choose.'_id'])){
            $sp = 'sp_upload_master_'.$tableChoose.'_create';
            $hasil = $this->saveuploadMaster($sp,$opsi,$session,$data);

            if($tableChoose != 'employee' && $tableChoose != 'careertransition' && $hasil){
                $sp_change = 'sp_upload_master_'.$tableChoose.'_employee_readcheck';
                $sp_update = 'sp_upload_master_'.$tableChoose.'_employee_update';
                $hasil_change = $this->changeMaster($sp_change,$sp_update,$opsi,$session,$data,$data_excel,$hasil);
            }

        }else{
            $sp = '';
            $hasil = '';
        }
        
        if($hasil){
            $sp_log = 'sp_uploadlog_master_'.$tableChoose.'_create';
            $hasil_log = $this->saveloguploadMaster($hasil,$sp_log,$opsi,$session,$data);
        }

        return $hasil;
    }

    public function saveuploadMaster($sp,$opsi,$session,$data) {

        $hasil = '';
        
        $hasil = $this->dbTable->SPUpdate($sp, 
                                            $opsi,
                                            $session->getUserId()
                                            );
        
        return $hasil;
    }

    public function updateuploadMaster($sp,$opsi,$session,$data) {

        $hasil = '';
        $choose = $data['tablechoose'];

        $hasil = $this->dbTable->SPUpdate($sp, 
                                            $opsi,
                                            $session->getUserId(),
                                            $data['upload_'.$choose.'_id']
                                            );

        return $hasil;
    }

    public function destroyuploadMaster($sp,$opsi,$session,$data) {

        $hasil = '';
        $choose = $data['tablechoose'];
        $hasil = $this->dbTable->SPUpdate($sp,
                                            $data['upload_'.$choose.'_id'],
                                            $session->getUserId()
                                            );

        return $hasil;
    }

    public function saveloguploadMaster($hasil,$sp_log,$opsi,$session,$data) {

        $hasil_log = '';
        $choose = $data['tablechoose'];
        if($data['action'] == 'destroy'){
            $hasil = $data['upload_'.$choose.'_id'];
        }
        
        $hasil_log = $this->dbTable->SPUpdate($sp_log, 
                                            $data['lastprocessid'],
                                            $data['action'],
                                            $hasil,

                                            $opsi,

                                            $session->getUserId(),

                                            $data['choose_projectpt'],
                                            // $data['choose_ptpt'],
                                            $data['file_name'],
                                            $data['notes']
                                            );

        return $hasil_log;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHANGE MASTER IN EMPLOYEE

    public function changeMaster($sp_change,$sp_update,$opsi,$session,$data,$data_excel,$hasil_baru) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute($sp_change,
                                            $opsi);
        $get = $hasil[0];

        foreach($get as $key => $item){
            $hasil_change = $this->dbTable->SPUpdate($sp_update, 
                                            $opsi,
                                            $session->getUserId(),
                                            $hasil_baru,
                                            $item['upload_employee_id']
                                            );
        }
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHECK MASTER DESTROY BUT EMPLOYEE USED

    public function checkMasterDestoryEmployeeUsed($session,$tableChoose,$data) {

        if($tableChoose == 'department'){
            $tableChoose = 'dept';
            $table = 'department';
        }else{
            $tableChoose = $tableChoose;
            $table = $tableChoose;
        }

        $hasil = '';
        $sp = 'sp_upload_master_'.$tableChoose.'_destroy_employee_readcheck';
        $hasil = $this->dbTable->SPExecute($sp,
                                            $data['project_id'],
                                            $data['pt_id']);

        $get = $hasil[0];
        $sp_update = 'sp_upload_master_'.$tableChoose.'_destroy_employee_update';
        foreach($get as $key => $item){
            $hasil_change = $this->dbTable->SPUpdate($sp_update, 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $session->getUserId(),
                                            $item['upload_'.$table.'_id']
                                            );
        }
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //DESTROY ALL

    public function destroyAll($session,$tableChoose,$data) {

        if($tableChoose == 'department'){
            $tableChoose = 'dept';
        }else{
            $tableChoose = $tableChoose;
        }

        $hasil = '';
        if($tableChoose == 'careertransition'){
            $hasil = $this->dbTable->SPUpdate('sp_upload_master_'.$tableChoose.'_destroyall',
                                                $data['project_id'],
                                                $data['pt_id'],
                                                $session->getUserId(),
                                                $data['nik_group'],
                                                $data['effective_date']
                                                // ,
                                                // strtolower($data['changetype'])
                                                );
        }else{
            $hasil = $this->dbTable->SPUpdate('sp_upload_master_'.$tableChoose.'_destroyall',
                                                $data['project_id'],
                                                $data['pt_id'],
                                                $session->getUserId()
                                                );
        }

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHECK LAST PROCSS ID

    public function getLastProcessId($session,$tableChoose) {

        $hasil = '';

        if($tableChoose == 'department'){
            $tableChoose = 'dept';
        }else{
            $tableChoose = $tableChoose;
        }

        $sp = 'sp_upload_master_'.$tableChoose.'_readlast';
        $last_logprocessid      = $this->dbTable->SPExecute($sp);

        if(empty($last_logprocessid[0])){
            $logprocessid       = 0;
        }else{
            $logprocessid       = $last_logprocessid[0][0]['upload_process_id'];
        }

        $hasil = $logprocessid;

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //GET PROJECTPT ID

    public function getProjectPtId($session,$data) {
        // print_r($data);die();
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                                            $session->getUserId(),
                                            $session->getGroupId(),
                                            $data['choose_projectpt'],
                                            // $data['choose_ptpt'],
                                            1,
                                            1);

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHECK DATA DITABLE LOG

    public function getMasterCheck($session,$tableChoose,$data_excel,$data) {

        $hasil = '';
        
        if($tableChoose == 'department'){
            $tableChoose = 'dept';
        }else{
            $tableChoose = $tableChoose;
        }

        $sp = 'sp_upload_master_'.$tableChoose.'_readcheck';

        if($tableChoose == 'dept'){

            $opsi = $data['project_id']."','". 
                    $data['pt_id']."','". 
                    $data_excel['department_name']."','". 
                    $data_excel['department_code'];

        }elseif($tableChoose == 'group'){

            $opsi = $data['project_id']."','". 
                    $data['pt_id']."','". 
                    $data_excel['group_name']."','". 
                    $data_excel['group_code'];
                    
        }elseif($tableChoose == 'banding'){

            $opsi = $data['project_id']."','". 
                    $data['pt_id']."','". 
                    $data_excel['banding_name']."','". 
                    $data_excel['banding_code'];
                    
        }elseif($tableChoose == 'jobfamily'){

            $opsi = $data_excel['jobfamily_name']."','". 
                    $data_excel['jobfamily_code'];
                    
        }elseif($tableChoose == 'position'){

            $opsi = $data['project_id']."','". 
                    $data['pt_id']."','". 
                    $data_excel['position_name']."','". 
                    $data_excel['position_description'];
                    
        }elseif($tableChoose == 'employee'){

            $opsi = $data['project_id']."','". 
                    $data['pt_id']."','". 
                    $data_excel['employee_name']."','". 
                    $data_excel['nik_group'];

        }elseif($tableChoose == 'careertransition'){

            $opsi = $data['project_id']."','". 
                    $data['pt_id']."','". 
                    $data_excel['employee_name']."','". 
                    $data_excel['nik_group']."','". 
                    // strtolower($data_excel['changetype'])."','". 
                    $data_excel['effective_date'];

        }
        
        $hasil = $this->dbTable->SPExecute($sp, 
                                            $opsi);

        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    //VIEW TABLE

    //DEPT
    public function getAllDeptProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Department $em,$session,$projectpt_id) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_dept_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'');

        return $hasil;
    }

    //BANDING
    public function getAllBandingCat(Hrd_Models_Performancemanagement_Banding $d,$session,$projectpt_id) {

        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_upload_master_banding_read',
            $get_id[1][0]['project_id'], 
            $get_id[1][0]['pt_id'],
            1,
            9999,
            '',
            ''
            );
        
        return $hasil;
    }

    //GROUP
    public function getAllGroupProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Group $em,$session,$projectpt_id) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_group_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'','');

        return $hasil;
    }

    //JOBFAMILY
    public function getAllJobFamilyJob(Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPExecute(
            'sp_upload_master_jobfamily_read', 
            1, 
            9999,
            '',
            ''
        );
        return $hasil;
    }
    
    //POSITION
    public function getAllPositionWoPL(Hrd_Models_Master_Position $d,$session,$projectpt_id){
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_position_read',$get_id[1][0]['project_id'],$get_id[1][0]['pt_id'],1,99999,$d->getName(),$d->getDescription());
    
        return $hasil;
    }

    //EMPLOYEE
    public function getAllEmployeeProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em,$session,$app_data) {
        $projectpt_id = $app_data['projectpt_id'];
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_employee_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'');

        return $hasil;
    }

    //CAREER TRANSITION
    public function getAllCareerTransitionProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$app_data) {
        $projectpt_id = $app_data['projectpt_id'];
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_careertransition_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'');

        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    // FOR EMPLOYEE, GET DEPARTMENT,GROUP,BANDING,POSITION UPLOAD ID
    public function getDepartmentUploadId($project_id,$pt_id,$department_department){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_department_id_read',$project_id,$pt_id,$department_department);
    
        return $hasil;
    }
    public function getGroupUploadId($project_id,$pt_id,$group_code){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_group_id_read',$project_id,$pt_id,$group_code);
    
        return $hasil;
    }
    public function getBandingUploadId($project_id,$pt_id,$banding_banding){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_banding_id_read',$project_id,$pt_id,$banding_banding);
    
        return $hasil;
    }
    public function getPositionUploadId($project_id,$pt_id,$position_position){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_position_id_read',$project_id,$pt_id,$position_position);
    
        return $hasil;
    }


    //-----------------------------------------------------------------------------------------------------------------
    // FOR CAREER TRANSIITON, GET PROJECTPT UPLOAD ID
    public function getProjectPtUploadId($project_name,$pt_name){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_projectpt_id_read',$project_name,$pt_name);
    
        return $hasil;
    }
    public function getProjectPtUploadDbmasterId($project_name,$pt_name){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_projectpt_id_read',$project_name,$pt_name);
    
        return $hasil;
    }
    public function getDepartmentMasterId($project_id,$pt_id,$department_department){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_department_id_master_read',$project_id,$pt_id,$department_department);
    
        return $hasil;
    }
    public function getGroupMasterId($project_id,$pt_id,$group_code){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_group_id_read',$project_id,$pt_id,$group_code);
    
        return $hasil;
    }
    public function getBandingMasterId($project_id,$pt_id,$banding_banding){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_banding_id_read',$project_id,$pt_id,$banding_banding);
    
        return $hasil;
    }
    public function getPositionMasterId($project_id,$pt_id,$position_position){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_position_id_read',$project_id,$pt_id,$position_position);
    
        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    // FOR CAREER TRANSIITON, GET EMPLOYEE UPLOAD ID
    public function getEmployeeUploadId($project_id,$pt_id,$employee_name,$nik_group){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_employee_readcheck',$project_id,$pt_id,$employee_name,$nik_group);
    
        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    // PROCESS to cherry
    
    public function getCompany($session,$pt_id) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_companycherry_readcheck',
                                            $pt_id);

        return $hasil;
    }

    public function saveUploadBeforeAPI(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$data) {
        
        $value = json_decode($data['value'],true);

        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        if($type == 'department'){
            $data['value'] = 'dept';
        }elseif($type == 'employee'){
            $data['value'] = $type;
            $type = 'employeeb';
        }elseif($type == 'careertransition'){
            $data['value'] = $type;
            $type = 'uploadmaster';
        }else{
            $data['value'] = $type;
        }

        $jsonString = $value[$type];
        $jsonString['company_code'] = $data['company_code'];

        $processdata_start      = date('Y-m-d');
        $processdata_end        = date('Y-m-d');
        // $processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id    = $data['ptpt_id'];

        $logprocessid           = $data['lastprocessid'];


        $sp = 'sp_master_'.$data['value'].'_create';
        $hasil = 0;

        if($data['value'] == 'employee'){

            if($jsonString['statusinformation_contract_end'] != '-' && $jsonString['statusinformation_contract_end'] != '1900-01-01'){
                $statusinformation_contract_end = $jsonString['statusinformation_contract_end'];
            }else{
                $statusinformation_contract_end = '';
            }

            if($jsonString['statusinformation_contract_start'] != '-' && $jsonString['statusinformation_contract_start'] != '1900-01-01'){
                $statusinformation_contract_start = $jsonString['statusinformation_contract_start'];
            }else{
                $statusinformation_contract_start = '';
            }

            if($jsonString['statusinformation_assignation_date'] != '-' && $jsonString['statusinformation_assignation_date'] != '1900-01-01'){
                $statusinformation_assignation_date = $jsonString['statusinformation_assignation_date'];
            }else{
                $statusinformation_assignation_date = '';
            }

            if($jsonString['nonactive_date'] != '-' && $jsonString['nonactive_date'] != '1900-01-01'){
                $nonactive_date = $jsonString['nonactive_date'];
            }else{
                $nonactive_date = '';
            }

            $jsonString['payrollgroup_id'] = 1;
            $jsonString['work_shift'] = '';
            $jsonString['cost_center_code'] = '';
            $jsonString['worklocation_id'] = 0;
            $jsonString['worklocation_project_id'] = 0;
            $jsonString['worklocation_pt_id'] = 0;
            $jsonString['alokasibiaya_alokasibiaya_id'] = 0;
            $jsonString['code_alokasibiaya'] = '';
            $jsonString['name_alokasibiaya'] = '';
            $jsonString['alokasibiaya_alokasibiaya_id2'] = 0;
            $jsonString['code_alokasibiaya2'] = '';
            $jsonString['name_alokasibiaya2'] = '';
            $jsonString['alokasibiaya_alokasibiaya_id3'] = 0;
            $jsonString['code_alokasibiaya3'] = '';
            $jsonString['name_alokasibiaya3'] = '';
            $jsonString['statusinformation_id'] = 0;

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['project_name']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['upload_employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['employee_nik']."','".
                                    $jsonString['nik_group']."','".
                                    $jsonString['sex']."','".
                                    $jsonString['religion_id']."','".
                                    $jsonString['religion_name']."','".
                                    $jsonString['birth_date']."','".

                                    $jsonString['birth_place']."','".
                                    $jsonString['id_type']."','".
                                    $jsonString['ktp_number']."','".
                                    $jsonString['marriagestatus_marriagestatus_id']."','".
                                    $jsonString['marriagestatus_marriagestatus']."','".
                                    $jsonString['nationality']."','".
                                    $jsonString['npwp']."','".
                                    $jsonString['ptkp_id']."','".
                                    $jsonString['ptkp_code']."','".
                                    $jsonString['department_department_id']."','".
                                    $jsonString['department_department']."','".

                                    $jsonString['banding_banding_id']."','".
                                    $jsonString['banding_banding']."','".
                                    $jsonString['group_group_id']."','".
                                    $jsonString['group_code']."','".
                                    $jsonString['position_position_id']."','".
                                    $jsonString['position_position']."','".
                                    $jsonString['phone_number']."','".
                                    $jsonString['email']."','".
                                    $jsonString['email_ciputra']."','".
                                    $jsonString['employeestatus_employeestatus_id']."','".
                                    $jsonString['employeestatus_employeestatus']."','".

                                    $jsonString['statusinformation_hire_date']."','".
                                    $statusinformation_contract_end."','".
                                    $jsonString['payroll_group']."','".
                                    $jsonString['payrollgroup_id']."','".
                                    $jsonString['ktp_address']."','".
                                    $jsonString['address']."','".
                                    $jsonString['payroll_currency']."','".
                                    $jsonString['payment_method']."','".
                                    $jsonString['bank_rekening']."','".
                                    $jsonString['nomor_rekening']."','".
                                    $jsonString['nama_rekening']."','".

                                    $jsonString['calendar_company']."','".
                                    $jsonString['work_shift']."','".
                                    $jsonString['tax_country_code']."','".
                                    $jsonString['fingerprintcode']."','".
                                    $jsonString['cost_center_code']."','".
                                    $jsonString['no_bpjs_k']."','".
                                    $jsonString['no_bpjs_kk']."','".
                                    $jsonString['no_bpjs_pp']."','".
                                    $jsonString['no_manulife_p']."','".
                                    $jsonString['no_asuransi']."','".

                                    $jsonString['worklocation_id']."','".
                                    $jsonString['worklocation']."','".
                                    $jsonString['worklocation_project_id']."','".
                                    $jsonString['worklocation_project']."','".
                                    $jsonString['worklocation_pt_id']."','".
                                    $jsonString['worklocation_pt']."','".
                                    $jsonString['ibu_kandung']."','".
                                    $nonactive_date."','".
                                    $jsonString['alokasibiaya_alokasibiaya_id']."','".
                                    $jsonString['code_alokasibiaya']."','".
                                    $jsonString['name_alokasibiaya']."','".
                                    $jsonString['alokasibiaya_alokasibiaya_id2']."','".
                                    $jsonString['code_alokasibiaya2']."','".
                                    $jsonString['name_alokasibiaya2']."','".
                                    $jsonString['alokasibiaya_alokasibiaya_id3']."','".
                                    $jsonString['code_alokasibiaya3']."','".
                                    $jsonString['name_alokasibiaya3']."','".
                                    $jsonString['hari_kerja_perminggu']."','".
                                    $jsonString['statusinformation_id']."','".
                                    $statusinformation_contract_start."','".
                                    $statusinformation_assignation_date."','".
                                    ''."','".
                                    ''

                                  ;
        }
        elseif($data['value'] == 'dept'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['project_name']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['department_id']."','".
                                    $jsonString['department']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'banding'){

            $opsi_input         =   $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['banding_id']."','".
                                    $jsonString['banding']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'group'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['project_name']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['group_id']."','".
                                    $jsonString['group']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'jobfamily'){

            $opsi_input         =   $jsonString['jobfamily_id']."','".
                                    $jsonString['jobfamily']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'position'){

            $opsi_input         =   $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['position_id']."','".
                                    $jsonString['position']."','".
                                    $jsonString['description']."','".
                                    $data['subholding_subname']
                                  ;
        }
        elseif($data['value'] == 'careertransition'){

            $jsonString['changestatus_id'] = '';
            $jsonString['assignation_date'] = '';
            $jsonString['statusinformation_id'] = '';
            //$jsonString['employee_code'] = '';
            //$jsonString['upload_employee_id'] = '';
            $jsonString['old_company_code'] = '';
            $jsonString['new_company_code'] = '';
            $jsonString['old_dept_code'] = '';
            $jsonString['new_dept_code'] = '';
            $jsonString['old_group_code'] = '';
            $jsonString['new_group_code'] = '';
            $jsonString['old_position_code'] = '';
            $jsonString['new_position_code'] = '';
            $jsonString['old_banding_code'] = '';
            $jsonString['new_banding_code'] = '';
            $jsonString['new_empstatus_code'] = '';
            $jsonString['careertransition_type_code'] = '';
            
            if($jsonString['expired_date'] != '-'){
                $jsonString['expired_date'] = $jsonString['expired_date'];
            }else{
                $jsonString['expired_date'] = '';
            }


            $data_temp_check_new = array(
                                        'project_id'                => $jsonString['new_project_id'],
                                        'pt_id'                     => $jsonString['new_pt_id'],
                                        'department_department_id'  => $jsonString['new_department_id'],
                                        'group_group_id'            => $jsonString['new_group_id'],
                                        'banding_banding_id'        => $jsonString['new_banding_id'],
                                        'position_position_id'      => $jsonString['new_position_id'],
                                    );
            $data_temp_check_old = array(
                                        'project_id'                => $jsonString['old_project_id'],
                                        'pt_id'                     => $jsonString['old_pt_id'],
                                        'department_department_id'  => $jsonString['old_department_id'],
                                        'group_group_id'            => $jsonString['old_group_id'],
                                        'banding_banding_id'        => $jsonString['old_banding_id'],
                                        'position_position_id'      => $jsonString['old_position_id'],
                                    );

            $em = new Hrd_Models_Transferapi_Transferapimaster();
            $dao = new Hrd_Models_Transferapi_TransferapimasterDao();

            //department code
            if($jsonString['new_department_id']){
                $get_department_code = $dao->getDepartmentCode($em, $data_temp_check_new);
                if($get_department_code[0]){
                    $department_code = $get_department_code[0][0]['code'];
                    $new_department_id_code = $department_code;
                }else{
                    $new_department_id_code = '';
                }
            }else{
                $new_department_id_code = $jsonString['new_department_code'];
            }

            if($jsonString['old_department_id']){
                $get_department_old_code = $dao->getDepartmentCode($em, $data_temp_check_old);
                if($get_department_old_code[0]){
                    $department_old_code = $get_department_old_code[0][0]['code'];
                    $old_department_id_code = $department_old_code;
                }else{
                    $old_department_id_code = '';
                }
            }else{
                $old_department_id_code = $jsonString['old_department_code'];
            }

            $jsonString['old_dept_code'] = $old_department_id_code;
            $jsonString['new_dept_code'] = $new_department_id_code;

            //group code
            if($jsonString['new_group_id']){
                $get_group_code = $dao->getGroupCode($em, $data_temp_check_new);
                if($get_group_code[0]){
                    $group_code = $get_group_code[0][0]['code'];
                    $new_group_id_code = $group_code;
                }else{
                    $new_group_id_code = '';
                }
            }else{
                $new_group_id_code = $jsonString['new_group_code'];
            }

            if($jsonString['old_group_id']){
                $get_group_old_code = $dao->getGroupCode($em, $data_temp_check_old);
                if($get_group_old_code[0]){
                    $group_old_code = $get_group_old_code[0][0]['code'];
                    $old_group_id_code = $group_old_code;
                }else{
                    $old_group_id_code = '';
                }
                        
            }else{
                $old_group_id_code = $jsonString['old_group_code'];
            }

            $jsonString['old_group_code'] = $old_group_id_code;
            $jsonString['new_group_code'] = $new_group_id_code;

            //banding code
            if($jsonString['new_banding_id']){
                $get_banding_code = $dao->getBandingCode($em, $data_temp_check_new);
                if($get_banding_code[0]){
                    $banding_code = $get_banding_code[0][0]['code'];
                    $new_banding_id_code = $banding_code;
                }else{
                    $new_banding_id_code = '';
                }

            }else{
                $new_banding_id_code = $jsonString['new_banding_code'];
            }

            if($jsonString['old_banding_id']){
                $get_banding_old_code = $dao->getBandingCode($em, $data_temp_check_old);
                if($get_banding_old_code[0]){
                    $banding_old_code = $get_banding_old_code[0][0]['code'];
                    $old_banding_id_code = $banding_old_code;
                }else{
                    $old_banding_id_code = '';
                }

            }else{
                $old_banding_id_code = $jsonString['old_banding_code'];
            }

            $jsonString['old_banding_code'] = $old_banding_id_code;
            $jsonString['new_banding_code'] = $new_banding_id_code;

            //position code
            if($jsonString['new_position_id']){
                $get_position_code = $dao->getPositionCode($em, $data_temp_check_new);
                if($get_position_code[0]){
                    $position_code = $get_position_code[0][0]['code'];
                    $new_position_id_code = $position_code;
                }else{
                    $new_position_id_code = '';
                }

            }else{
                $new_position_id_code = $jsonString['new_position_code'];
            }

            if($jsonString['old_position_id']){
                $get_position_old_code = $dao->getPositionCode($em, $data_temp_check_old);
                if($get_position_old_code[0]){
                    $position_old_code = $get_position_old_code[0][0]['code'];
                    $old_position_id_code = $position_old_code;
                }else{
                    $old_position_id_code = '';
                }

            }else{
                $old_position_id_code = $jsonString['old_position_code'];
            }

            $jsonString['old_position_code'] = $old_position_id_code;
            $jsonString['new_position_code'] = $new_position_id_code;

            //COMPANY
            $dao_ptold_cherry = new Hrd_Models_Companycherry_Dao();
            $ptold_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            $ptold_cherryFilter->setPtptId($jsonString['old_pt_id']);
            $hasil_ptold_cherry = $dao_ptold_cherry->getAllWoPL($ptold_cherryFilter);
            if($hasil_ptold_cherry[1]){
                $company_code_old = $hasil_ptold_cherry[1][0]['company_code'];
            }else{
                $company_code_old = '';
            }

            $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
            $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
                    
            $pt_cherryFilter->setPtptId($jsonString['new_pt_id']);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
            if($hasil_pt_cherry[1]){
                $company_code = $hasil_pt_cherry[1][0]['company_code'];
            }else{
                $company_code = '';
            }

            $jsonString['old_company_code'] = $company_code_old;
            $jsonString['new_company_code'] = $company_code;

            //career transition type
            if($jsonString['changetype_id']){
                if($jsonString['changetype_id'] == '1'){
                    $name_item = 'Promosi';
                }elseif($jsonString['changetype_id'] == '2'){
                    $name_item = 'Rotasi';
                }elseif($jsonString['changetype_id'] == '3'){
                    $name_item = 'Mutasi';
                }elseif($jsonString['changetype_id'] == '4'){
                    $name_item = 'Demosi';
                }
            }elseif($jsonString['alasanresign_id']){
                if($jsonString['alasanresign_id'] == '1'){
                    $name_item = 'Mengundurkan Diri';
                }elseif($jsonString['alasanresign_id'] == '2'){
                    $name_item = 'Pensiun';
                }elseif($jsonString['alasanresign_id'] == '3'){
                    $name_item = 'Pemutusan Hubungan Kerja';
                }elseif($jsonString['alasanresign_id'] == '4'){
                    $name_item = 'Habis Kontrak';
                }elseif($jsonString['alasanresign_id'] == '5'){
                    $name_item = 'Meninggal Dunia';
                }elseif($jsonString['alasanresign_id'] == '6'){
                    $name_item = 'Lainnya';
                }
            }else{
                $name_item = 'Perubahan Status';
            }

            if($company_code_old){
                $get_careertransition_code = $dao->getCareerTransitionTypeCode($em,$name_item,$company_code_old);
                if($get_careertransition_code[0]){
                    $careertransitiontype_code = $get_careertransition_code[0][0]['code'];
                }else{
                    $careertransitiontype_code = '';
                }
            }else{
                $careertransitiontype_code = '';
            }
            $jsonString['careertransition_type_code'] = $careertransitiontype_code;

            if($jsonString['employeestatus_id']){
                $lookupname = 'EmploymentStatus';

                $employeestatus_employeestatus = strtolower($jsonString['employeestatus']);

                if($employeestatus_employeestatus == 'permanent' || $employeestatus_employeestatus == 'tetap'){
                    $employeestatus_employeestatus = 'permanent';
                }elseif($employeestatus_employeestatus == 'contract' || $employeestatus_employeestatus == 'kontrak'){
                    $employeestatus_employeestatus = 'contract';
                }else{
                    $employeestatus_employeestatus = $item['employeestatus_employeestatus'];
                }

                $get_employeestatus_code = $dao->getEmpStatusCode($em,$lookupname, $employeestatus_employeestatus,$company_code_old);
                if($get_employeestatus_code[0]){
                    $employeestatus_code = $get_employeestatus_code[0][0]['code'];
                    $new_empstatus_code = $employeestatus_code;
                }else{
                    $new_empstatus_code = '';
                }
            }else{
                $new_empstatus_code = '';
            }
            $jsonString['new_empstatus_code'] = $new_empstatus_code;

            $action = '';
            $admin = $session->getUserId();

            $opsi_input         =   $jsonString['changestatus_id']."','".
                                    $jsonString['alasanresign_id']."','".
                                    $jsonString['assignation_date']."','".
                                    $jsonString['statusinformation_id']."','".
                                    $jsonString['nik_group']."','".
                                    $jsonString['employee_code']."','".
                                    $jsonString['upload_employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['old_project_id']."','".
                                    $jsonString['new_project_id']."','".
                                    $jsonString['old_pt_id']."','".
                                    $jsonString['new_pt_id']."','".

                                    $jsonString['old_company_code']."','".
                                    $jsonString['new_company_code']."','".
                                    $jsonString['old_dept_code']."','".
                                    $jsonString['new_dept_code']."','".
                                    $jsonString['old_group_code']."','".
                                    $jsonString['new_group_code']."','".
                                    $jsonString['old_position_code']."','".
                                    $jsonString['new_position_code']."','".
                                    $jsonString['old_banding_code']."','".
                                    $jsonString['new_banding_code']."','".

                                    $jsonString['new_empstatus_code']."','".
                                    $jsonString['careertransition_type_code']."','".
                                    $jsonString['reason']."','".
                                    $jsonString['note']."','".
                                    date('Y-m-d')."','".
                                    $jsonString['effective_date']."','".
                                    $jsonString['expired_date']."','".
                                    $action."','".
                                    $admin
                                  ;
        }
        else{
            $opsi_input         = '';
        }

        $hasil_readcheck = '';
        $sp_readcheck = 'sp_master_'.$data['value'].'_upload_readcheck';
        $hasil_readcheck = $this->dbTable->SPExecute($sp_readcheck,
                                            $opsi_input);

        //CEK CHANGE PAYROLL DAN PROFILE
        $changeprofile = '';
        $changepayroll = '';
        if($hasil_readcheck[0] && $data['value'] == 'employee'){

            $jsonCurrent = $jsonString;
            
            $item = $hasil_readcheck[0][0];

            if($item){

                if($item['employee_name'] != $jsonCurrent['employee_name']){
                    $changeprofile .= 'Nama,';
                }
                if($item['sex'] != $jsonCurrent['sex']){
                    $changeprofile .= 'Gender,';
                }
                if($item['religion_id'] != $jsonCurrent['religion_id']){
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
                if($item['phone_number'] != $jsonCurrent['phone_number']){
                    $changeprofile .= 'Phone num,';
                }
                if($item['email_ciputra'] != $jsonCurrent['email_ciputra']){
                    $changeprofile .= 'Email Office,';
                }
                if($item['ktp_address'] != $jsonCurrent['ktp_address']){
                    $changeprofile .= 'Ktp Address,';
                }
                if($item['address'] != $jsonCurrent['address']){
                    $changeprofile .= 'Curr Address,';
                }

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
            $item = '';
        }


        if($hasil_readcheck[0] && $hasil_readcheck[0][0]['action_process'] != 'remove'){
            // $action                 = 'update';
            if($data['value'] == 'employee'){
                if($changeprofile || $changepayroll){
                    $action = 'update';
                }else{
                    $action = 'already up-to-date';
                }
            }else{
                $action                 = 'update';
            }

        }else{
            $action                 = 'insert';
        }

        if($data['remove_cherry'] == 1){
            $action                 = 'remove';
        }
            
        if($data['value'] == 'careertransition'){
            $sp = 'sp_careertransitionemployee_cherrycode_create';
             $opsi_input         =   $jsonString['changestatus_id']."','".
                                    $jsonString['alasanresign_id']."','".
                                    $jsonString['assignation_date']."','".
                                    $jsonString['statusinformation_id']."','".
                                    $jsonString['nik_group']."','".
                                    $jsonString['employee_code']."','".
                                    $jsonString['upload_employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['old_project_id']."','".
                                    $jsonString['new_project_id']."','".
                                    $jsonString['old_pt_id']."','".
                                    $jsonString['new_pt_id']."','".

                                    $jsonString['old_company_code']."','".
                                    $jsonString['new_company_code']."','".
                                    $jsonString['old_dept_code']."','".
                                    $jsonString['new_dept_code']."','".
                                    $jsonString['old_group_code']."','".
                                    $jsonString['new_group_code']."','".
                                    $jsonString['old_position_code']."','".
                                    $jsonString['new_position_code']."','".
                                    $jsonString['old_banding_code']."','".
                                    $jsonString['new_banding_code']."','".

                                    $jsonString['new_empstatus_code']."','".
                                    $jsonString['careertransition_type_code']."','".
                                    $jsonString['reason']."','".
                                    $jsonString['note']."','".
                                    date('Y-m-d')."','".
                                    $jsonString['effective_date']."','".
                                    $jsonString['expired_date']."','".
                                    $action."','".
                                    $admin
                                  ;
            $hasil = $this->dbTable->SPUpdate($sp,
                                                $opsi_input
                                            );  

            $hasil_update_add_changetypeid = $this->dbTable->SPUpdate('sp_careertransitionemployee_cherrycode_changetype_update',
                                                $hasil,
                                                $jsonString['nik_group'],
                                                $jsonString['effective_date'],
                                                $jsonString['changetype_id']
                                            );  

        }else{
            if($action != 'already up-to-date'){
                $hasil = $this->dbTable->SPUpdate($sp,
                                                $logprocessid,

                                                $action,
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',

                                                $processdata_start,
                                                $processdata_end,
                                                $processdata_ptpt_id,
           
                                                $opsi_input,

                                                $session->getUserId(),
                                                1,
                                                0);  
            }

        }

        if($hasil){
            $sp_uploadsign = 'sp_master_'.$data['value'].'_update_uploadsign';
            $upload_sign = $this->dbTable->SPUpdate($sp_uploadsign,
                                            $hasil);  
        }

        //UPDATE KE TABLE UPLOAD, TANDAIN KALO INI ACTION APA
        if($data['value'] == 'dept'){
           $update_actionsign_id = $jsonString['department_id'];
        }elseif($data['value'] == 'banding'){
           $update_actionsign_id = $jsonString['banding_id'];
        }elseif($data['value'] == 'group'){
           $update_actionsign_id = $jsonString['group_id'];
        }elseif($data['value'] == 'position'){
           $update_actionsign_id = $jsonString['position_id'];
        }elseif($data['value'] == 'employee'){
           $update_actionsign_id = $jsonString['upload_employee_id'];
        }elseif($data['value'] == 'careertransition'){
           $update_actionsign_id = $jsonString['nik_group']."','".$jsonString['effective_date'];
        }else{
            $update_actionsign_id = '';
        }

        if($update_actionsign_id){
            $sp_transfersign = 'sp_upload_master_'.$data['value'].'_actionsign_update';
            $transfer_sign = $this->dbTable->SPUpdate($sp_transfersign,
                                                            $update_actionsign_id,
                                                            $action
                                                        );  
        }
        
        $hasil_array['action'] = $action;
        $hasil_array['hasil'] = $hasil;
        $hasil_array['value'] = $data['value'];
        $hasil_array['hasil_get'] = $hasil_readcheck[0];
        $hasil_array['data_current'] = $jsonString;
        $hasil_array['changepayroll'] = $changepayroll;
        $hasil_array['changeprofile'] = $changeprofile;
        
        return $hasil_array;
    }

    
     //UPDATE AFTER API
    public function updateMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$data,$jsonString,$jsonStringResult) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];

        $processdata_start      = date('Y-m-d');
        $processdata_end        = date('Y-m-d');
        //$processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id = $data['ptpt_id'];

        $logprocessid           = $data['lastprocessid'];

        $hasil = 0;
        
        if($data['value'] == 'employee'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['upload_employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['nik_group']
                                    
                                  ;
        }
        elseif($data['value'] == 'dept'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['department_id']."','".
                                    $jsonString['department']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'banding'){

            $opsi_input         =   $jsonString['pt_id']."','".
                                    $jsonString['banding_id']."','".
                                    $jsonString['banding']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'group'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['group_id']."','".
                                    $jsonString['group']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'jobfamily'){

            $opsi_input         =   $jsonString['jobfamily_id']."','".
                                    $jsonString['jobfamily']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'position'){

            $opsi_input         =   $jsonString['pt_id']."','".
                                    $jsonString['position_id']."','".
                                    $jsonString['position']."','".
                                    $jsonString['description']
                                  ;
        }
        else{
            $opsi_input         = '';
        }
        
        
        if($data['value'] == 'employee'){

            $success_changeprofile = '';
            $success_changepayroll = '';
            $temp_result = '';
            $message_change = '';

            if($data['changeprofile']){

                $effectivedate = date('Y-m-d', strtotime($jsonString['modion']));
                $sp = 'sp_master_'.$data['value'].'_changeprofile_update';
                $note = 'Perubahan pada '.$data['changeprofile'];
                $hasil = $this->dbTable->SPUpdate($sp,
                                            $logprocessid,
                                            $opsi_input,

                                            $result_status,
                                            $result_status_message,
                                            $jsonStringResult['EmployeeCode'],
                                            $code,
                                            $effectivedate,
                                            $note,
                                            $insertstamp,
                                            $updatestamp,


                                            $session->getUserId(),
                                            1,
                                            0);

                if($result_status == 'success'){
                    $success_changeprofile = 1;
                }else{
                    $success_changeprofile = -1;
                }

                $message_change = 'Change Profile';

            }elseif($data['changepayroll']){

                $effectivedate = date('Y-m-d', strtotime($jsonString['payroll_effective_date']));
                $sp = 'sp_master_'.$data['value'].'_changepayroll_update';
                $note = 'Perubahan pada '.$data['changepayroll'];
                $hasil = $this->dbTable->SPUpdate($sp,
                                            $logprocessid,
                                            $opsi_input,

                                            $result_status,
                                            $result_status_message,
                                            $jsonStringResult['EmployeeCode'],
                                            $code,
                                            $effectivedate,
                                            $note,
                                            $insertstamp,
                                            $updatestamp,


                                            $session->getUserId(),
                                            1,
                                            0);

                if($result_status == 'success'){
                    $success_changepayroll = 1;
                }else{
                    $success_changepayroll = -1;
                }

                $message_change = 'Change Payroll';

            }else{

                $sp = 'sp_master_'.$data['value'].'_update';
                $hasil = $this->dbTable->SPUpdate($sp,
                                            $logprocessid,
                                            $opsi_input,

                                            $result_status,
                                            $result_status_message,
                                            $code,
                                            $insertstamp,
                                            $updatestamp,

                                            $session->getUserId(),
                                            1,
                                            0);
            }

            //update besar
            if($success_changeprofile && $success_changepayroll){
                if($success_changeprofile == 1 && $success_changepayroll == 1){
                    $temp_result = 'success';
                }elseif($success_changeprofile == 1 && $success_changepayroll == -1){
                    $temp_result = 'error';
                }elseif($success_changeprofile == -1 && $success_changepayroll == 1){
                    $temp_result = 'error';
                }else{
                    $temp_result = '';
                }
            }elseif($success_changeprofile){
                if($success_changeprofile == 1){
                    $temp_result = 'success';
                }elseif($success_changeprofile == -1){
                    $temp_result = 'error';
                }else{
                    $temp_result = '';
                }
            }elseif($success_changepayroll){
                if($success_changepayroll == 1){
                    $temp_result = 'success';
                }elseif($success_changepayroll == -1){
                    $temp_result = 'error';
                }else{
                    $temp_result = '';
                }
            }

            if($data['changeprofile'] || $data['changepayroll']){
                $sp = 'sp_master_'.$data['value'].'_update';
                    $hasil = $this->dbTable->SPUpdate($sp,
                                                $logprocessid,
                                                $opsi_input,

                                                $temp_result,
                                                $message_change,
                                                $jsonStringResult['EmployeeCode'],
                                                $insertstamp,
                                                $updatestamp,

                                                $session->getUserId(),
                                                1,
                                                0);
            }else{
                $sp = 'sp_master_'.$data['value'].'_update';
                $hasil = $this->dbTable->SPUpdate($sp,
                                            $logprocessid,
                                            $opsi_input,

                                            $result_status,
                                            $result_status_message,
                                            $code,
                                            $insertstamp,
                                            $updatestamp,

                                            $session->getUserId(),
                                            1,
                                            0);
            }

        }elseif($data['value'] == 'careertransition'){
            $sp = 'sp_careertransitionemployee_cherrycode_updateupload';
            $hasil = $this->dbTable->SPUpdate($sp,
                                            $jsonString['nik_group'],
                                            $jsonString['effective_date'],

                                            $result_status,
                                            $result_status_message,
                                            $code,
                                            1,
                                            $insertstamp,
                                            $updatestamp,

                                            $session->getUserId());  
            
        }else{
            $sp = 'sp_master_'.$data['value'].'_update';
            $hasil = $this->dbTable->SPUpdate($sp,
                                            $logprocessid,
                                            $opsi_input,

                                            $result_status,
                                            $result_status_message,
                                            $code,
                                            $insertstamp,
                                            $updatestamp,

                                            $session->getUserId(),
                                            1,
                                            0);  

            
        }
            //UPDATE KE TABLE UPLOAD, TANDAIN KALO INI SUDAH DI TRANSFER DAN KASIH TAU HASILNYA APA
            if($data['value'] == 'careertransition'){
                $opsi_input         =   $jsonString['nik_group']."','".
                                        $jsonString['effective_date']
                                        
                                      ;
            }

            $sp_transfersign = 'sp_upload_master_'.$data['value'].'_transfersign_update';
            $transfer_sign = $this->dbTable->SPUpdate($sp_transfersign,
                                                        $opsi_input,
                                                        1,
                                                        $result_status,
                                                        $result_status_message,
                                                        $code,
                                                        $insertstamp,
                                                        $updatestamp
                                                    );  

        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    // GET DATA SEBELUMNYA, DAN REMOVE DI CHERRY
    public function getDataRemoveCherry(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$data) {
        $hasil = '';
        $sp = 'sp_upload_master_'.$data['value'].'_removecherry_readcheck';
        $hasil = $this->dbTable->SPExecute($sp,
                                            $data['project_id'],
                                            $data['ptpt_id']
                                        );
        

        return $hasil;
    }

    public function updateMasterRemove(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$data,$jsonString,$jsonStringResult) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];

        $processdata_start      = date('Y-m-d');
        $processdata_end        = date('Y-m-d');
        //$processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id = $data['ptpt_id'];

        $logprocessid           = $data['lastprocessid'];

        $hasil = 0;
        
        if($data['value'] == 'employee'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['upload_employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['nik_group']
                                    
                                  ;
        }
        elseif($data['value'] == 'dept'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['department_id']."','".
                                    $jsonString['department']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'banding'){

            $opsi_input         =   $jsonString['pt_id']."','".
                                    $jsonString['banding_id']."','".
                                    $jsonString['banding']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'group'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['group_id']."','".
                                    $jsonString['group']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'jobfamily'){

            $opsi_input         =   $jsonString['jobfamily_id']."','".
                                    $jsonString['jobfamily']."','".
                                    $jsonString['code']
                                  ;
        }
        elseif($data['value'] == 'position'){

            $opsi_input         =   $jsonString['pt_id']."','".
                                    $jsonString['position_id']."','".
                                    $jsonString['position']."','".
                                    $jsonString['description']
                                  ;
        }
        else{
            $opsi_input         = '';
        }
        
        
            //UPDATE KE TABLE UPLOAD, TANDAIN KALO INI SUDAH DI REMOVE DAN KASIH TAU HASILNYA APA
            $sp_transfersign = 'sp_upload_master_'.$data['value'].'_removesign_update';
            $transfer_sign = $this->dbTable->SPUpdate($sp_transfersign,
                                                        $opsi_input,
                                                        1
                                                        
                                                    );  

        return $hasil;
    }
    
    //---------------------------------------------------------------------------------------------------------------------
    // CEK EMPLOYEEMASTER ATTR
    public function cekMasterEmployeeAttr(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$data) {
        $hasil = '';
        $sp = 'sp_upload_master_employee_attr_readcheck';
        $hasil = $this->dbTable->SPExecute($sp,
                                            $data['project_id'],
                                            $data['ptpt_id']
                                        );
        

        return $hasil;
    }

    //---------------------------------------------------------------------------------------------------------------------
    // CEK EMPLOYEE MASTER
    public function cekMasterEmployee(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadmaster $em,$session,$data) {
        $hasil = '';
        $sp = 'sp_upload_master_careertransition_employee_readcheck';
        $hasil = $this->dbTable->SPExecute($sp,
                                            $data['project_id'],
                                            $data['ptpt_id']
                                        );
        

        return $hasil;
    }
    
}

