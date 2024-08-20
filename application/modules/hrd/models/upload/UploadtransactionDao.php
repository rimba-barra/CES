

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
class Hrd_Models_Upload_UploadtransactionDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
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
    //UPLOAD
    public function uploadTransaction($session,$tableChoose,$data_excel,$data) {

        $hasil = '';

        // if($data_excel['deleted'] == 1){
        //     $active_excel = 0;
        // }else{
        //     $active_excel = 1;
        // }

        $opsi =     $data['project_id']."','".
                    $data['pt_id']."','". 
                    $data_excel['start_date']."','". 
                    $data_excel['end_date']."','". 
                    $data_excel['payroll_month']."','". 
                    $data_excel['payroll_year']."','". 
                    $data_excel['upload_employee_id']."','". 
                    $data_excel['upload_department_id']."','". 
                    $data_excel['nik_group']."','";

        if($tableChoose == 'attendance'){

            $opsi .= $data_excel['total_attendance']."','";

        }elseif($tableChoose == 'overtime'){
                
            $opsi .= $data_excel['total_overtime']."','";

        }elseif($tableChoose == 'uangmakan'){

            $opsi .= $data_excel['total_uang_makan']."','";

        }elseif($tableChoose == 'medicalclaim'){
                
            $opsi .= $data_excel['total_medical_claim']."','";
                
        }elseif($tableChoose == 'unpaidleave'){
                
            $opsi .= $data_excel['total_unpaid_leave']."','";
                
        }elseif($tableChoose == 'cutibesar'){
                
            $opsi .= $data_excel['hire_date']."','";
                
        }elseif($tableChoose == 'saldocutibayar'){
                
            $opsi .= $data_excel['total_saldocuti_bayar']."','";
                
        }elseif($tableChoose == 'potongantransport'){
                
            $opsi .= $data_excel['total_potongan_transport']."','";
                
        }elseif($tableChoose == 'saldocutiminus'){
                
            $opsi .= $data_excel['sisa_cuti']."','";
            $opsi .= $data_excel['total_saldocuti_minus']."','";    
        }

        // $opsi .=    $active_excel."','". 
        //             $data_excel['deleted'];
        $opsi .=    "1','". 
                    "0";

        $add_opsi_log = $data_excel['employee_name']."','". 
                        $data_excel['department_name'];
        
        $choose = $data['tablechoose'];

        if($data['action'] == 'update' && $data['upload_'.$choose.'_id']){
            $sp = 'sp_upload_transaction_'.$tableChoose.'_update';
            $hasil = $this->updateuploadTransaction($sp,$opsi,$session,$data);
        }elseif($data['action'] == 'destroy' && $data['upload_'.$choose.'_id']){
            $sp = 'sp_upload_transaction_'.$tableChoose.'_destroy';
            $hasil = $this->destroyuploadTransaction($sp,$opsi,$session,$data);
        }elseif($data['action'] == 'insert' && empty($data['upload_'.$choose.'_id'])){
            $sp = 'sp_upload_transaction_'.$tableChoose.'_create';
            $hasil = $this->saveuploadTransaction($sp,$opsi,$session,$data);
        }else{
            $sp = '';
            $hasil = '';
        }
        
        if($hasil){
            $sp_log = 'sp_uploadlog_transaction_'.$tableChoose.'_create';
            $hasil_log = $this->saveloguploadTransaction($hasil,$sp_log,$opsi,$session,$data,$add_opsi_log);
        }

        return $hasil;
    }

    public function saveuploadTransaction($sp,$opsi,$session,$data) {

        $hasil = '';
        
        $hasil = $this->dbTable->SPUpdate($sp, 
                                            $opsi,
                                            $session->getUserId()
                                            );
        
        return $hasil;
    }

    public function updateuploadTransaction($sp,$opsi,$session,$data) {

        $hasil = '';
        $choose = $data['tablechoose'];
        $hasil = $this->dbTable->SPUpdate($sp, 
                                            $opsi,
                                            $session->getUserId(),
                                            $data['upload_'.$choose.'_id']
                                            );

        return $hasil;
    }

    public function destroyuploadTransaction($sp,$opsi,$session,$data) {

        $hasil = '';
        $choose = $data['tablechoose'];
        $hasil = $this->dbTable->SPUpdate($sp,
                                            $data['upload_'.$choose.'_id'],
                                            $session->getUserId()
                                            );

        return $hasil;
    }

    public function saveloguploadTransaction($hasil,$sp_log,$opsi,$session,$data,$add_opsi_log) {

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

                                            $add_opsi_log,

                                            $session->getUserId(),

                                            $data['start_date'],
                                            $data['end_date'],
                                            $data['payroll_month'],
                                            $data['payroll_year'],
                                            $data['choose_projectpt'],
                                            // $data['choose_ptpt'],
                                            $data['file_name'],
                                            $data['notes']
                                            );

        return $hasil_log;
    }

    //------------------------------------------------------------------------------------------------------------------

    //DESTROY ALL

    public function destroyAll($session,$tableChoose,$data) {



        $hasil = '';
        $hasil = $this->dbTable->SPUpdate('sp_upload_transaction_'.$tableChoose.'_destroyall',
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $session->getUserId(),
                                            $data['payroll_month'],
                                            $data['payroll_year']
                                            );

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHECK LAST PROCSS ID

    public function getLastProcessId($session,$tableChoose) {

        $hasil = '';

        $sp = 'sp_upload_transaction_'.$tableChoose.'_readlast';
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

    public function getTransactionCheck($session,$tableChoose,$data_excel,$data) {

        $hasil = '';

        $sp = 'sp_upload_transaction_'.$tableChoose.'_readcheck';

        $opsi =     $data['project_id']."','". 
                    $data['pt_id']."','". 
                    date('Y-m-d', strtotime($data['start_date']))."','". 
                    date('Y-m-d', strtotime($data['end_date']))."','". 
                    $data['payroll_month']."','". 
                    $data['payroll_year']."','". 
                    $data_excel['upload_employee_id']."','". 
                    $data_excel['upload_department_id']."','". 
                    $data_excel['nik_group'];
        
        $hasil = $this->dbTable->SPExecute($sp, 
                                            $opsi);

        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    //VIEW TABLE

    public function getTransactionAttendance(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_attendance_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);

        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_attendance'  => $get[0][0]['total_attendance'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionOvertime(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_overtime_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_overtime'    => $get[0][0]['total_overtime'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionUangMakan(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_uangmakan_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_uang_makan'  => $get[0][0]['total_uang_makan'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionMedicalClaim(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_medicalclaim_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_medical_claim'  => $get[0][0]['total_medical_claim'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionUnpaidLeave(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_unpaidleave_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_unpaid_leave'  => $get[0][0]['total_unpaid_leave'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionCutiBesar(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));
        
        $month_start = date('m', strtotime($start_date));
        $month_end = date('m', strtotime($end_date));

        $year_start = date('Y', strtotime($start_date));
        $year_end = date('Y', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_cutibesar_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'hire_date'         => $get[0][0]['hire_date'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }
        return $hasil;
    }

    public function getTransactionSaldoCutiBayar(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_saldocutibayar_read', $employee_id, $nik_group , $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_saldocuti_bayar'  => $get[0][0]['total_saldocuti_bayar'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionPotonganTransport(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_potongantransport_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'total_potongan_transport'  => $get[0][0]['total_potongan_transport'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    public function getTransactionSaldoCutiMinus(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$nik_group,$start_date,$end_date,$payroll_month,$payroll_year,$project_id,$pt_id) {

        $hasil = '';

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_saldocutiminus_read', $employee_id, $nik_group, $start_date, $end_date,$payroll_month,$payroll_year,$project_id,$pt_id);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $get[0][0]['start_date'],
                            'end_date'          => $get[0][0]['end_date'],
                            'sisa_cuti'         => $get[0][0]['sisa_cuti'],
                            'total_saldocuti_minus'  => $get[0][0]['total_saldocuti_minus'],
                            'action_process'    => $get[0][0]['action_process'],
                            'status_transfer'   => $get[0][0]['status_transfer'],
                            'upload_check'      => $get[0][0]['upload_check']
            );

        }

        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    // FOR EMPLOYEE, GET DEPARTMENT,EMPLOYEE UPLOAD ID
    public function getDepartmentUploadId($project_id,$pt_id,$department_department){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_get_department_id_read',$project_id,$pt_id,$department_department);
    
        return $hasil;
    }
    public function getEmployeeUploadId($project_id,$pt_id,$employee_name,$nik_group){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_employee_readcheck',$project_id,$pt_id,$employee_name,$nik_group);
    
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------
    //GET PROJECTPT ID DARI EXCEL
    public function getProjectPtIdExcel($project_name,$pt_name){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_projectpt_byname_read',$project_name,$pt_name,1,9999);
    
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

    public function saveUploadBeforeAPI(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_Uploadtransaction $em,$session,$data) {
        
        $value = json_decode($data['value'],true);

        $choose_type = $data['choose_type'];
        $explode_type = explode('_', $choose_type);
        $type = $explode_type[1];

        $data['value'] = $type;

        $jsonString = $value['transferapitransaction'];
        $jsonString['company_code'] = $data['company_code'];

        $project_id             = $jsonString['project_id'];
        $project_name           = $jsonString['project_name'];
        $pt_id                  = $jsonString['pt_id'];
        $pt_name                = $jsonString['pt_name'];
        $employee_id            = $jsonString['employee_id'];
        $employee_name          = $jsonString['employee_name'];
        $department_id          = $jsonString['department_id'];
        $department             = $jsonString['department'];
        $nik_group              = $jsonString['nik_group'];
        // $action                 = $data['action_to_cherry'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        // $processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id    = $data['ptpt_id'];

        $logprocessid           = $data['lastprocessid'];


        $sp = 'sp_transaction_'.$data['value'].'_create';
        $hasil = 0;

        if($data['value'] == 'cutibesar'){
            $opsi_input         = $jsonString['hire_date'];
        }
        elseif($data['value'] == 'attendance'){
            $opsi_input         = $jsonString['total_attendance'];
        }
        elseif($data['value'] == 'medicalclaim'){
            $opsi_input         = $jsonString['total_medical_claim'];
        }
        elseif($data['value'] == 'overtime'){
            $opsi_input         = $jsonString['total_overtime'];
        }
        elseif($data['value'] == 'uangmakan'){
            $opsi_input         = $jsonString['total_uang_makan'];
        }
        elseif($data['value'] == 'unpaidleave'){
            $opsi_input         = $jsonString['total_unpaid_leave'];
        }
        elseif($data['value'] == 'saldocutibayar'){
            $opsi_input         = $jsonString['total_saldocuti_bayar'];
        }
        elseif($data['value'] == 'potongantransport'){
            $opsi_input         = $jsonString['total_potongan_transport'];
        }
        elseif($data['value'] == 'saldocutiminus'){
            $opsi_input         = $jsonString['sisa_cuti']."','";
            $opsi_input         .= $jsonString['total_saldocuti_minus'];
        }
        else{
            $opsi_input         = '';
        }

        $hasil_readcheck = '';
        $sp_readcheck = 'sp_transaction_'.$data['value'].'_readcheck';
        $hasil_readcheck = $this->dbTable->SPExecute($sp_readcheck,
                                                        $nik_group,
                                                        $processdata_start,
                                                        $processdata_end,
                                                        $payroll_month,
                                                        $payroll_year);

        $sp_readcheck_all = 'sp_transaction_attendance_readcheck';
        $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);
        
        if(empty($hasil_readcheck_all[0])){
            $sp_readcheck_all = 'sp_transaction_cutibesar_readcheck';
            $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

            if(empty($hasil_readcheck_all[0])){
                $sp_readcheck_all = 'sp_transaction_medicalclaim_readcheck';
                $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

                if(empty($hasil_readcheck_all[0])){
                    $sp_readcheck_all = 'sp_transaction_overtime_readcheck';
                    $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

                    if(empty($hasil_readcheck_all[0])){
                        $sp_readcheck_all = 'sp_transaction_potongantransport_readcheck';
                        $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

                        if(empty($hasil_readcheck_all[0])){
                            $sp_readcheck_all = 'sp_transaction_saldocutibayar_readcheck';
                            $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

                            if(empty($hasil_readcheck_all[0])){
                                $sp_readcheck_all = 'sp_transaction_saldocutiminus_readcheck';
                                $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

                                if(empty($hasil_readcheck_all[0])){
                                    $sp_readcheck_all = 'sp_transaction_uangmakan_readcheck';
                                    $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);

                                    if(empty($hasil_readcheck_all[0])){
                                        $sp_readcheck_all = 'sp_transaction_unpaidleave_readcheck';
                                        $hasil_readcheck_all = $this->dbTable->SPExecute($sp_readcheck_all, $nik_group, $processdata_start, $processdata_end, $payroll_month, $payroll_year);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        if($hasil_readcheck_all[0] && $hasil_readcheck_all[0][0]['action_process'] != 'remove'){
            $action                 = 'update';
        }else{
            $action                 = 'insert';
        }

        if($data['remove_cherry'] == 1){
            $action                 = 'remove';
        }
            
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
                                        // $processdata_projectpt_id,
                                        $processdata_ptpt_id,

                                        $payroll_month,
                                        $payroll_year,

                                        $project_id,   
                                        $project_name, 
                                        $pt_id,        
                                        $pt_name,      
                                        $employee_id,  
                                        $employee_name,
                                        $nik_group,    
                                        $department_id,
                                        $department,   
                                        $opsi_input,

                                        $session->getUserId(),
                                        1,
                                        0);  

        if($hasil){
            $sp_uploadsign = 'sp_transaction_'.$data['value'].'_update_uploadsign';
            $upload_sign = $this->dbTable->SPUpdate($sp_uploadsign,
                                            $hasil);  
        }

        //UPDATE KE TABLE UPLOAD, TANDAIN KALO INI ACTION APA
        
            $sp_transfersign = 'sp_upload_transaction_'.$data['value'].'_actionsign_update';
            $transfer_sign = $this->dbTable->SPUpdate($sp_transfersign,
                                                            $project_id,
                                                            $pt_id,
                                                            $nik_group,
                                                            $payroll_month,
                                                            $payroll_year,
                                                            $action
                                                        );  
        
        
        $hasil_array['action'] = $action;
        $hasil_array['hasil'] = $hasil;
        $hasil_array['value'] = $data['value'];
        $hasil_array['hasil_get'] = $hasil_readcheck[0];
        $hasil_array['data_current'] = $jsonString;
        $hasil_array['hasil_get_all'] = $hasil_readcheck_all[0];
        
        return $hasil_array;
    }

     //UPDATE AFTER API
    public function updateTransaction(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_UploadTransaction $em,$session,$data,$jsonString,$jsonStringResult) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        $detaillist             = $jsonStringResult['DetailList'];
        $code_detail            = $detaillist[0]['Code'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        //$processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id    = $data['ptpt_id'];

        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $employee_id            = $jsonString['employee_id'];
        $nik_group              = $jsonString['nik_group'];

        $logprocessid           = $data['lastprocessid'];

        $hasil = 0;
        
        $sp = 'sp_transaction_'.$data['value'].'_update';

        $hasil = $this->dbTable->SPUpdate($sp,
                                        $logprocessid,
                                        $project_id,   
                                        $pt_id,        
                                        $employee_id,  
                                        $nik_group,    

                                        $result_status,
                                        $result_status_message,
                                        $code,
                                        $code_detail,
                                        $insertstamp,
                                        $updatestamp,

                                        $session->getUserId(),
                                        1,
                                        0);  
        
            //UPDATE KE TABLE UPLOAD, TANDAIN KALO INI SUDAH DI TRANSFER DAN KASIH TAU HASILNYA APA
            $sp_transfersign = 'sp_upload_transaction_'.$data['value'].'_transfersign_update';
            $transfer_sign = $this->dbTable->SPUpdate($sp_transfersign,
                                                        $project_id,
                                                        $pt_id,
                                                        $nik_group,
                                                        $payroll_month,
                                                        $payroll_year,
                                                        1,
                                                        $result_status,
                                                        $result_status_message,
                                                        $code,
                                                        $code_detail,
                                                        $insertstamp,
                                                        $updatestamp
                                                    );  

        return $hasil;
    }

    //-----------------------------------------------------------------------------------------------------------------
    // GET DATA SEBELUMNYA, DAN REMOVE DI CHERRY
    public function getDataRemoveCherry(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_UploadTransaction $em,$session,$data) {
        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        $hasil = '';
        $sp = 'sp_upload_transaction_'.$data['value'].'_removecherry_readcheck';
        $hasil = $this->dbTable->SPExecute($sp,
                                            $data['project_id'],
                                            $data['ptpt_id'],
                                            $payroll_month,
                                            $payroll_year,
                                            1,
                                            9999
                                        );
        

        return $hasil;
    }

    public function updateTransactionRemove(Box_Models_App_HasilRequestRead $r, Hrd_Models_Upload_UploadTransaction $em,$session,$data,$jsonString,$jsonStringResult) {

        $value                  = $data['value'];

        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];

        //$processdata_projectpt_id = $data['projectpt_id'];
        $processdata_ptpt_id = $data['ptpt_id'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));
        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $nik_group              = $jsonString['nik_group'];

        $logprocessid           = $data['lastprocessid'];

        $hasil = 0;
        
            //UPDATE KE TABLE UPLOAD, TANDAIN KALO INI SUDAH DI REMOVE DAN KASIH TAU HASILNYA APA
            $sp_transfersign = 'sp_upload_transaction_'.$data['value'].'_removesign_update';
            $transfer_sign = $this->dbTable->SPUpdate($sp_transfersign,
                                                        $project_id,
                                                        $pt_id,
                                                        $payroll_month,
                                                        $payroll_year,
                                                        $nik_group,
                                                        1
                                                        
                                                    );  

        return $hasil;
    }

    //get employee code
    public function getEmployeeCode(Hrd_Models_Upload_UploadTransaction $em, $data){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_upload_master_employee_getcode_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_name'],
                                            $data['nik_group']
                                        );
        
        return $hasil;

    }
    
}

