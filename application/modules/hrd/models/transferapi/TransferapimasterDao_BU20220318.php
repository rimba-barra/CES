

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
class Hrd_Models_Transferapi_TransferapimasterDao_BU extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
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

    //CHECK LAST PROCSS ID

    public function getLastProcessId(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data) {

        $hasil = '';
        $sp = 'sp_master_'.$data['value'].'_readlast';
        $last_logprocessid      = $this->dbTable->SPExecute($sp);
        if(empty($last_logprocessid[0])){
            $logprocessid       = 0;
        }else{
            $logprocessid       = $last_logprocessid[0][0]['log_process_id'];
        }

        $hasil = $logprocessid;

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHECK DATA DITABLE LOG

    public function getMasterCheck(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data) {

        $hasil = '';
        $sp = 'sp_master_'.$data['value'].'_readcheck';
        $processdata_from = date('Y-m-d', strtotime($data['start_date']));
        $processdata_end = date('Y-m-d', strtotime($data['end_date']));
        $choose_employee = $data['choose_employee'];
        $choose_ptpt = $data['pt_id'];
        $opsi_id = $data['opsi_id'];

        if($data['process_api'] == 'employee'){

            $hasil = $this->dbTable->SPExecute($sp, $opsi_id, $choose_employee, $processdata_from, $processdata_end);

        }elseif($data['process_api'] == 'master' && $data['value'] == 'banding'){

            $hasil = $this->dbTable->SPExecute($sp, $opsi_id, $choose_ptpt);

        }elseif($data['process_api'] == 'master' && $data['value'] == 'position'){

            $hasil = $this->dbTable->SPExecute($sp, $opsi_id, $choose_ptpt);

        }else{
            $hasil = $this->dbTable->SPExecute($sp, $opsi_id);
        }
            
        return $hasil;
    }

    public function getMasterCheckChange(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data) {

        $hasil = '';
        $sp = 'sp_master_employee_change_readcheck';
        $processdata_from = date('Y-m-d', strtotime($data['start_date']));
        $processdata_end = date('Y-m-d', strtotime($data['end_date']));
        $choose_employee = $data['choose_employee'];
        $choose_ptpt = $data['pt_id'];
        $opsi_id = $data['opsi_id'];

        $hasil = $this->dbTable->SPExecute($sp, $opsi_id, $choose_employee, $processdata_from, $processdata_end);
        
            
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //PROCESS TO CHERRY
    public function saveMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data,$jsonString,$jsonStringResult) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
        $processdata_projectpt_id = $data['projectpt_id'];

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

            if($jsonString['statusinformation_consultant_end'] != '-' && $jsonString['statusinformation_consultant_end'] != '1900-01-01'){
                $statusinformation_consultant_end = $jsonString['statusinformation_consultant_end'];
            }else{
                $statusinformation_consultant_end = '';
            }

            if($jsonString['statusinformation_consultant_start'] != '-' && $jsonString['statusinformation_consultant_start'] != '1900-01-01'){
                $statusinformation_consultant_start = $jsonString['statusinformation_consultant_start'];
            }else{
                $statusinformation_consultant_start = '';
            }

            if($jsonString['nonactive_date'] != '-' && $jsonString['nonactive_date'] != '1900-01-01'){
                $nonactive_date = $jsonString['nonactive_date'];
            }else{
                $nonactive_date = '';
            }

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['project_name']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['employee_nik']."','".
                                    $jsonString['nik_group']."','".
                                    $jsonString['sex']."','".
                                    $jsonString['religion_religion_id']."','".
                                    $jsonString['religion_religion']."','".
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
                                    $jsonString['alokasibiaya_id']."','".
                                    $jsonString['code_alokasibiaya']."','".
                                    $jsonString['name_alokasibiaya']."','".
                                    $jsonString['alokasibiaya_id2']."','".
                                    $jsonString['code_alokasibiaya2']."','".
                                    $jsonString['name_alokasibiaya2']."','".
                                    $jsonString['alokasibiaya_id3']."','".
                                    $jsonString['code_alokasibiaya3']."','".
                                    $jsonString['name_alokasibiaya3']."','".
                                    $jsonString['hari_kerja_perminggu']."','".
                                    $jsonString['statusinformation_id']."','".
                                    $statusinformation_contract_start."','".
                                    $statusinformation_assignation_date."','".
                                    $statusinformation_consultant_start."','".
                                    $statusinformation_consultant_end
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
                                    $jsonString['subholding_subname']
                                  ;
        }
        else{
            $opsi_input         = '';
        }
// print_r($opsi_input);die();
        
        $hasil = $this->dbTable->SPUpdate($sp,
                                        $logprocessid,

                                        $action,
                                        $result_status,
                                        $result_status_message,
                                        $code,
                                        $insertstamp,
                                        $updatestamp,

                                        $processdata_start,
                                        $processdata_end,
                                        $processdata_projectpt_id,
   
                                        $opsi_input,

                                        $session->getUserId(),
                                        1,
                                        0);  
        return $hasil;
    }

     //------------------------------------------------------------------------------------------------------------------

    //GET AFTER PROCESS
    public function getMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data) {

        $hasil = '';

        $lastprocessid = $data['lastprocessid'];
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];
        $value = $data['value'];
        $sp = 'sp_master_'.$value.'_readafterprocess';

        $hasil = $this->dbTable->SPExecute($sp, $lastprocessid);

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //SAVE SEBELUM API
    public function saveMasterBeforeApi(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data,$jsonString) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
        // $processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id = $data['ptpt_id'];

        $logprocessid           = $data['lastprocessid'];

        $sp = 'sp_master_'.$data['value'].'_create';
        $hasil = 0;
        // print_r($jsonString);die();
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

            if($jsonString['statusinformation_consultant_end'] != '-' && $jsonString['statusinformation_consultant_end'] != '1900-01-01'){
                $statusinformation_consultant_end = $jsonString['statusinformation_consultant_end'];
            }else{
                $statusinformation_consultant_end = '';
            }

            if($jsonString['statusinformation_consultant_start'] != '-' && $jsonString['statusinformation_consultant_start'] != '1900-01-01'){
                $statusinformation_consultant_start = $jsonString['statusinformation_consultant_start'];
            }else{
                $statusinformation_consultant_start = '';
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

            //added by michael 05/11/2021
            if(!array_key_exists('project_id', $jsonString)) $jsonString['project_id'] = '';
            if(!array_key_exists('project_name', $jsonString)) $jsonString['project_name'] = '';
            if(!array_key_exists('pt_id', $jsonString)) $jsonString['pt_id'] = '';
            if(!array_key_exists('pt_name', $jsonString)) $jsonString['pt_name'] = '';
            if(!array_key_exists('employee_id', $jsonString)) $jsonString['employee_id'] = '';
            if(!array_key_exists('employee_name', $jsonString)) $jsonString['employee_name'] = '';
            if(!array_key_exists('employee_nik', $jsonString)) $jsonString['employee_nik'] = '';
            if(!array_key_exists('nik_group', $jsonString)) $jsonString['nik_group'] = '';
            if(!array_key_exists('sex', $jsonString)) $jsonString['sex'] = '';
            if(!array_key_exists('religion_religion_id', $jsonString)) $jsonString['religion_religion_id'] = '';
            if(!array_key_exists('religion_religion', $jsonString)) $jsonString['religion_religion'] = '';
            if(!array_key_exists('birth_date', $jsonString)) $jsonString['birth_date'] = '';

            if(!array_key_exists('birth_place', $jsonString)) $jsonString['birth_place'] = '';
            if(!array_key_exists('id_type', $jsonString)) $jsonString['id_type'] = '';
            if(!array_key_exists('ktp_number', $jsonString)) $jsonString['ktp_number'] = '';
            if(!array_key_exists('marriagestatus_marriagestatus_id', $jsonString)) $jsonString['marriagestatus_marriagestatus_id'] = '';
            if(!array_key_exists('marriagestatus_marriagestatus', $jsonString)) $jsonString['marriagestatus_marriagestatus'] = '';
            if(!array_key_exists('nationality', $jsonString)) $jsonString['nationality'] = '';
            if(!array_key_exists('npwp', $jsonString)) $jsonString['npwp'] = '';
            if(!array_key_exists('ptkp_id', $jsonString)) $jsonString['ptkp_id'] = '';
            if(!array_key_exists('ptkp_code', $jsonString)) $jsonString['ptkp_code'] = '';
            if(!array_key_exists('department_department_id', $jsonString)) $jsonString['department_department_id'] = '';
            if(!array_key_exists('department_department', $jsonString)) $jsonString['department_department'] = '';

            if(!array_key_exists('banding_banding_id', $jsonString)) $jsonString['banding_banding_id'] = '';
            if(!array_key_exists('banding_banding', $jsonString)) $jsonString['banding_banding'] = '';
            if(!array_key_exists('group_group_id', $jsonString)) $jsonString['group_group_id'] = '';
            if(!array_key_exists('group_code', $jsonString)) $jsonString['group_code'] = '';
            if(!array_key_exists('position_position_id', $jsonString)) $jsonString['position_position_id'] = '';
            if(!array_key_exists('position_position', $jsonString)) $jsonString['position_position'] = '';
            if(!array_key_exists('phone_number', $jsonString)) $jsonString['phone_number'] = '';
            if(!array_key_exists('email', $jsonString)) $jsonString['email'] = '';
            if(!array_key_exists('email_ciputra', $jsonString)) $jsonString['email_ciputra'] = '';
            if(!array_key_exists('employeestatus_employeestatus_id', $jsonString)) $jsonString['employeestatus_employeestatus_id'] = '';
            if(!array_key_exists('employeestatus_employeestatus', $jsonString)) $jsonString['employeestatus_employeestatus'] = '';

            if(!array_key_exists('statusinformation_hire_date', $jsonString)) $jsonString['statusinformation_hire_date'] = '';
            if(!array_key_exists('payroll_group', $jsonString)) $jsonString['payroll_group'] = '';
            if(!array_key_exists('payrollgroup_id', $jsonString)) $jsonString['payrollgroup_id'] = '';
            if(!array_key_exists('ktp_address', $jsonString)) $jsonString['ktp_address'] = '';
            if(!array_key_exists('address', $jsonString)) $jsonString['address'] = '';
            if(!array_key_exists('payroll_currency', $jsonString)) $jsonString['payroll_currency'] = '';
            if(!array_key_exists('payment_method', $jsonString)) $jsonString['payment_method'] = '';
            if(!array_key_exists('bank_rekening', $jsonString)) $jsonString['bank_rekening'] = '';
            if(!array_key_exists('nomor_rekening', $jsonString)) $jsonString['nomor_rekening'] = '';
            if(!array_key_exists('nama_rekening', $jsonString)) $jsonString['nama_rekening'] = '';

            if(!array_key_exists('calendar_company', $jsonString)) $jsonString['calendar_company'] = '';
            if(!array_key_exists('work_shift', $jsonString)) $jsonString['work_shift'] = '';
            if(!array_key_exists('tax_country_code', $jsonString)) $jsonString['tax_country_code'] = '';
            if(!array_key_exists('fingerprintcode', $jsonString)) $jsonString['fingerprintcode'] = '';
            if(!array_key_exists('cost_center_code', $jsonString)) $jsonString['cost_center_code'] = '';
            if(!array_key_exists('no_bpjs_k', $jsonString)) $jsonString['no_bpjs_k'] = '';
            if(!array_key_exists('no_bpjs_kk', $jsonString)) $jsonString['no_bpjs_kk'] = '';
            if(!array_key_exists('no_bpjs_pp', $jsonString)) $jsonString['no_bpjs_pp'] = '';
            if(!array_key_exists('no_manulife_p', $jsonString)) $jsonString['no_manulife_p'] = '';
            if(!array_key_exists('no_asuransi', $jsonString)) $jsonString['no_asuransi'] = '';

            if(!array_key_exists('worklocation_id', $jsonString)) $jsonString['worklocation_id'] = '';
            if(!array_key_exists('worklocation', $jsonString)) $jsonString['worklocation'] = '';
            if(!array_key_exists('worklocation_project_id', $jsonString)) $jsonString['worklocation_project_id'] = '';
            if(!array_key_exists('worklocation_project', $jsonString)) $jsonString['worklocation_project'] = '';
            if(!array_key_exists('worklocation_pt_id', $jsonString)) $jsonString['worklocation_pt_id'] = '';
            if(!array_key_exists('worklocation_pt', $jsonString)) $jsonString['worklocation_pt'] = '';
            if(!array_key_exists('ibu_kandung', $jsonString)) $jsonString['ibu_kandung'] = '';
            if(!array_key_exists('alokasibiaya_alokasibiaya_id', $jsonString)) $jsonString['alokasibiaya_alokasibiaya_id'] = '';
            if(!array_key_exists('code_alokasibiaya', $jsonString)) $jsonString['code_alokasibiaya'] = '';
            if(!array_key_exists('name_alokasibiaya', $jsonString)) $jsonString['name_alokasibiaya'] = '';
            if(!array_key_exists('alokasibiaya_alokasibiaya_id2', $jsonString)) $jsonString['alokasibiaya_alokasibiaya_id2'] = '';
            if(!array_key_exists('code_alokasibiaya2', $jsonString)) $jsonString['code_alokasibiaya2'] = '';
            if(!array_key_exists('name_alokasibiaya2', $jsonString)) $jsonString['name_alokasibiaya2'] = '';
            if(!array_key_exists('alokasibiaya_alokasibiaya_id3', $jsonString)) $jsonString['alokasibiaya_alokasibiaya_id3'] = '';
            if(!array_key_exists('code_alokasibiaya3', $jsonString)) $jsonString['code_alokasibiaya3'] = '';
            if(!array_key_exists('name_alokasibiaya3', $jsonString)) $jsonString['name_alokasibiaya3'] = '';
            if(!array_key_exists('hari_kerja_perminggu', $jsonString)) $jsonString['hari_kerja_perminggu'] = '';
            if(!array_key_exists('statusinformation_id', $jsonString)) $jsonString['statusinformation_id'] = '';

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['project_name']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['pt_name']."','".
                                    $jsonString['employee_id']."','".
                                    $jsonString['employee_name']."','".
                                    $jsonString['employee_nik']."','".
                                    $jsonString['nik_group']."','".
                                    $jsonString['sex']."','".
                                    $jsonString['religion_religion_id']."','".
                                    $jsonString['religion_religion']."','".
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
                                    $statusinformation_consultant_start."','".
                                    $statusinformation_consultant_end

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
                                    $jsonString['subholding_subname']
                                  ;
        }
        else{
            $opsi_input         = '';
        }

        // print_r($opsi_input);die();
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
        
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //UPDATE AFTER API
    public function updateMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapimaster $em,$session,$data,$jsonString,$jsonStringResult) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
        //$processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id = $data['ptpt_id'];

        $logprocessid           = $data['lastprocessid'];

        $hasil = 0;
        
        if($data['value'] == 'employee'){

            $opsi_input         =   $jsonString['project_id']."','".
                                    $jsonString['pt_id']."','".
                                    $jsonString['employee_id']."','".
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

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //GET CODE 
    public function getDepartmentCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_cherrycode_read',
                $item['project_id'],
                $item['pt_id'],
                $item['department_department_id']);

        return $hasil;
    }
    public function getGroupCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_cherrycode_read',
                $item['project_id'],
                $item['pt_id'],
                $item['group_group_id']);

        return $hasil;
    }

    public function getBandingCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_banding_cherrycode_read',
                $item['banding_banding_id'],
                $item['pt_id']);

        return $hasil;
    }

    public function getPositionCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_cherrycode_read',
                $item['project_id'],
                $item['position_position_id'],
                $item['pt_id']);
        return $hasil;
    }


    public function getGenderCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_gender_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getIdTypeCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_idtype_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getMarriageStatusCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_maritalstatus_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getNationalityCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_nationality_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getCurrencyCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_currency_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getPaymentMethodCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_paymentmethod_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getBankCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_bank_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getWorkCalendarCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_workcalendar_cherrycode_read',
                $item);

        return $hasil;
    }

    public function getEmploymentStatusCode(Hrd_Models_Transferapi_Transferapimaster $em, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employmentstatus_cherrycode_read',
                $item);

        return $hasil;
    }

    // GET TAXSTATUS DB
    public function getTaxStatusCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_taxstatus_cherrycode_read',
                $key,
                $item,
                $company_code);

        return $hasil;
    }

    // GET EMPSTATUS DB
    public function getEmpStatusCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_empstatus_cherrycode_read',
                $key,
                $item,
                $company_code);

        return $hasil;
    }

    // GET COMMON DB
    public function getCommonCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_common_cherrycode_read',
                $key,
                $item);

        return $hasil;
    }

    //SAVE COMMON DB
    public function saveCommonBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_common_cherrycode_create',
                $jsonString['key'],
                $jsonString['name'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE COMMON DB
    public function updateCommonAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $key                    = $jsonString['key'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $orderid                = $jsonStringResult['OrderId'];
        $value                  = $jsonStringResult['Value'];
        $active                 = $jsonStringResult['Active'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_common_cherrycode_update',
                $result_id,
                $key,
                $name,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $orderid,
                $value,
                $active,

                $session->getUserId()
                );

        return $hasil;

    }

    // GET SHIFT DB
    public function getShiftCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_workshift_cherrycode_read',
                $key,
                $item,
                $company_code);

        return $hasil;
    }

    //SAVE SHIFT DB
    public function saveShiftBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_workshift_cherrycode_create',
                $jsonString['name'],
                $jsonString['company_code'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE SHIFT DB
    public function updateShiftAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $company_code           = $jsonString['company_code'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_workshift_cherrycode_update',
                $result_id,
                $name,
                $company_code,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $active,

                $session->getUserId()
                );

        return $hasil;

    }

    // GET CALENDAR DB
    public function getCalendarCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_workcalendar_cherrycode_read',
                $key,
                $item,
                $company_code);

        return $hasil;
    }
    
    //SAVE CALENDAR DB
    public function saveCalendarBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_workcalendar_cherrycode_create',
                $jsonString['name'],
                $jsonString['company_code'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE CALENDAR DB
    public function updateCalendarAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $company_code           = $jsonString['company_code'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_workcalendar_cherrycode_update',
                $result_id,
                $name,
                $company_code,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $active,

                $session->getUserId()
                );

        return $hasil;

    }

    // GET PAYROLLGROUP DB
    public function getPayrollGroupCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_payrollgroup_cherrycode_read',
                $key,
                $item,
                $company_code);

        return $hasil;
    }

    //SAVE PAYROLLGROUP DB
    public function savePayrollGroupBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_payrollgroup_cherrycode_create',
                $jsonString['name'],
                'PayrollGroup',
                $jsonString['company_code'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE PAYROLLGROUP DB
    public function updatePayrollGroupAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $company_code           = $jsonString['company_code'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_payrollgroup_cherrycode_update',
                $result_id,
                $name,
                $company_code,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $active,
                $insertstamp,
                $updatestamp,

                $session->getUserId()
                );

        return $hasil;

    }

    // GET WORKLOCATION DB
    public function getWorkLocationCode(Hrd_Models_Transferapi_Transferapimaster $em,$key, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_worklocation_cherrycode_read',
                $key,
                $item,
                $company_code);

        return $hasil;
    }

    //SAVE WORKLOCATION DB
    public function saveWorkLocationBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_worklocation_cherrycode_create',
                $jsonString['name'],
                $jsonString['labelcode'],
                $jsonString['address'],
                $jsonString['typecode'],
                $jsonString['company_code'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE WORKLOCATION DB
    public function updateWorkLocationAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $company_code           = $jsonString['company_code'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_worklocation_cherrycode_update',
                $result_id,
                $name,
                $company_code,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $active,
                $insertstamp,
                $updatestamp,

                $session->getUserId()
                );

        return $hasil;

    }

    //----------------------------------------------------------------------------------------------------------------------
    //GET CUSTOMFIELD DB
    public function getCustomFieldCode(Hrd_Models_Transferapi_Transferapimaster $em, $item){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_customfield_cherrycode_read',
                $item);

        return $hasil;

    }

    //SAVE CUSTOMFIELD DB
    public function saveCustomFieldBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_customfield_cherrycode_create',
                $jsonString['name'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE CUSTOMFIELD DB
    public function updateCustomFieldAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_customfield_cherrycode_update',
                $result_id,
                $name,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $active,

                $session->getUserId()
                );

        return $hasil;

    }

    //----------------------------------------------------------------------------------------------------------------------
    //GET CUSTOMFIELD VALUE DB
    public function getCustomFieldValueCode(Hrd_Models_Transferapi_Transferapimaster $em,$session,$employee_code,$customfield_code){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_customfieldvalue_cherrycode_read',
                $employee_code,
                $customfield_code);

        return $hasil;

    }

    //SAVE CUSTOMFIELD VALUE DB
    public function saveCustomFieldValueBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$employee_code,$customfield_code,$customfield_name,$action_process, $customfield_value) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_customfieldvalue_cherrycode_create',
                'EmployeeInformation',
                $employee_code,
                $customfield_code,
                $customfield_value,
                $action_process,
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE CUSTOMFIELD VALUE DB
    public function updateCustomFieldValueAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonStringResult,$data){

        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $customfield_code       = $data['customfield_code'];
        $employee_code          = $data['employee_code'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_customfieldvalue_cherrycode_update',
                $result_id,
                $employee_code,
                $customfield_code,

                $result_status,
                $result_status_message,
                $insertstamp,
                $updatestamp,

                $code,
                $active,

                $session->getUserId()
                );

        return $hasil;

    }

    //----------------------------------------------------------------------------------------------------------------------
    //GET CAREER TRANSITION TYPE VALUE DB
    public function getCareerTransitionTypeCode(Hrd_Models_Transferapi_Transferapimaster $em, $name, $company_code){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitiontype_cherrycode_read',
                $name,
                $company_code);

        return $hasil;

    }

    //SAVE CareerTransitionType DB
    public function saveCareerTransitionTypeBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$action) {

        $hasil = 0;

        if($jsonString['name'] == 'Mengundurkan Diri' || $jsonString['name'] == 'Pemutusan Hubungan Kerja' || $jsonString['name'] == 'Habis Kontrak' || $jsonString['name'] == 'Meninggal Dunia' || $jsonString['name'] == 'Pensiun' || $jsonString['name'] == 'Lainnya'){
            $transition_code = 'TerminationTransition';
        }else{
            $transition_code = 'RegularTransition';
        }

        $hasil = $this->dbTable->SPUpdate('sp_careertransitiontype_cherrycode_create',
                $jsonString['name'],
                $jsonString['company_code'],
                $action,
                $transition_code,
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE CareerTransitionType DB
    public function updateCareerTransitionTypeAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $name                   = $jsonString['name'];
        $company_code           = $jsonString['company_code'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_careertransitiontype_cherrycode_update',
                $result_id,
                $name,
                $company_code,

                $result_status,
                $result_status_message,

                $code,
                $active,
                $insertstamp,
                $updatestamp,

                $session->getUserId()
                );

        return $hasil;

    }

    //CAREER TRANSITION EMPLOYEE
    public function getCareerTransitionEmployee(Hrd_Models_Transferapi_Transferapimaster $em,$arr_temp_data,$startdate,$enddate){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_cherrycode_read',
                $startdate,
                $enddate,
                $arr_temp_data['employee_id']);

        return $hasil;

    }

    public function getCareerTransitionEmployeeBeforeCode(Hrd_Models_Transferapi_Transferapimaster $em,$session,$employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_before_cherrycode_readlog',
                $employee_id);

        return $hasil;

    }

    public function getCareerTransitionEmployeeCode(Hrd_Models_Transferapi_Transferapimaster $em,$session,$changestatus_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_cherrycode_readlog',
                $changestatus_id);

        return $hasil;

    }

    public function getCareerTransitionEmployeeCodeResign(Hrd_Models_Transferapi_Transferapimaster $em,$session,$alasanresign_id,$employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_resign_cherrycode_readlog',
                $alasanresign_id,
                $employee_id);

        return $hasil;

    }

    public function getCareerTransitionEmployeeCodeAssign(Hrd_Models_Transferapi_Transferapimaster $em,$session,$assignation_date,$employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_assign_cherrycode_readlog',
                $assignation_date,
                $employee_id);

        return $hasil;

    }

    public function getCareerTransitionEmployeeCodeStatus(Hrd_Models_Transferapi_Transferapimaster $em,$session,$statusinformation_id,$employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_status_cherrycode_readlog',
                $statusinformation_id,
                $employee_id);

        return $hasil;

    }

    //SAVE CUSTOMFIELD VALUE DB
    public function saveCareerTransitionEmployeeBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$action_process) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_careertransitionemployee_cherrycode_create',
                $jsonString['changestatus_id'],
                $jsonString['alasanresign_id'],
                $jsonString['assignation_date'],
                $jsonString['statusinformation_id'],
                $jsonString['nik_group'],
                $jsonString['employee_code'],
                $jsonString['employee_id'],
                $jsonString['employee_name'],
                $jsonString['project_id'],
                $jsonString['new_project_id'],
                $jsonString['pt_id'],
                $jsonString['new_pt_id'],

                $jsonString['old_company_code'],
                $jsonString['new_company_code'],
                $jsonString['old_department'],
                $jsonString['new_department'],
                $jsonString['old_group'],
                $jsonString['new_group'],
                $jsonString['old_position'],
                $jsonString['new_position'],
                $jsonString['old_banding'],
                $jsonString['new_banding'],
                $jsonString['new_empstatus'],
                $jsonString['careertransitiontype_code'],
                $jsonString['reason'],
                $jsonString['note'],
                $jsonString['date'],
                $jsonString['effective_date'],
                $jsonString['expired_date'],

                $action_process,
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE CUSTOMFIELD VALUE DB
    public function updateCustomFieldValueEmployeeAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $changestatus_id        = $jsonString['changestatus_id'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_careertransitionemployee_cherrycode_update',
                $result_id,
                $changestatus_id,

                $result_status,
                $result_status_message,

                $code,
                $active,
                $insertstamp,
                $updatestamp,

                $session->getUserId()
                );

        return $hasil;

    }

    //CAREERTRANSITION EMPLOYEE RESIGN
    public function getCareerTransitionEmployeeResign(Hrd_Models_Transferapi_Transferapimaster $em,$arr_temp_data,$startdate,$enddate){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_resign_cherrycode_read',
                $startdate,
                $enddate,
                $arr_temp_data['employee_id']);

        return $hasil;

    }

    //CAREERTRANSITION EMPLOYEE ASSIGN
    public function getCareerTransitionEmployeeAssign(Hrd_Models_Transferapi_Transferapimaster $em,$arr_temp_data,$startdate,$enddate){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_careertransitionemployee_assign_cherrycode_read',
                $startdate,
                $enddate,
                $arr_temp_data['employee_id']);

        return $hasil;

    }


    //READ LOG KALO SUDAH ADA
    //CHANGE PROFILE 
    public function getChangeProfileEmployeeCode(Hrd_Models_Transferapi_Transferapimaster $em,$session,$effective_date,$employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_changeprofileemployee_cherrycode_readlog',
                $effective_date,
                $employee_id);

        return $hasil;

    }

    //CHANGEPAYROLL
    public function getChangePayrollEmployeeCode(Hrd_Models_Transferapi_Transferapimaster $em,$session,$effective_date,$employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_changepayrollemployee_cherrycode_readlog',
                $effective_date,
                $employee_id);

        return $hasil;

    }

    // GET EMPSTATUS DB
    public function getEmpStatusSubCode(Hrd_Models_Transferapi_Transferapimaster $em, $item, $company_code) {

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_empstatus_sub_cherrycode_read',
                '',
                $item,
                $company_code);

        return $hasil;
    }

    //SAVE EMPSTATUS DB
    public function saveEmpStatusBeforeApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_empstatus_sub_cherrycode_create',
                $jsonString['name'],
                $jsonString['company_code'],
                $session->getUserId()
                );

        return $hasil;
    }

    //UPDATE EMPSTATUS DB
    public function updateEmpStatusAfterApi(Hrd_Models_Transferapi_Transferapimaster $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id'];
        $company_code           = $jsonString['company_code'];
        $name                   = $jsonString['name'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_empstatus_sub_cherrycode_update',
                $result_id,
                $name,
                $company_code,

                $action,
                $result_status,
                $result_status_message,

                $code,
                $active,

                $session->getUserId()
                );

        return $hasil;

    }
}

