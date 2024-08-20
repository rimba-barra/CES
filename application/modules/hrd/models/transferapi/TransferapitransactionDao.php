

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
class Hrd_Models_Transferapi_TransferapitransactionDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
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

    public function getTransactionAttendance(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        // $hasil = null;

        // $month_start = date('m', strtotime($start_date));
        // $month_end = date('m', strtotime($end_date));

        // $year_start = date('Y', strtotime($start_date));
        // $year_end = date('Y', strtotime($end_date));

        // if($year_start != $year_end){
        //     for ($i=$month_start; $i <= 12 ; $i++) { 
        //         $get = $this->dbTable->SPExecute('sp_transaction_attendance_read', $employee_id, $i, $year_start);
        //         if($get[0]){
        //             $hasil[] = array(
        //                             'employee_id'       => $employee_id,
        //                             'month'             => $i,
        //                             'year'              => $year_start,
        //                             'total_attendance'  => $get[0][0]['total_attendance']
        //             );  
        //         }
        //     }
        //     for ($i = 1; $i <= $month_end ; $i++) { 
        //         $get = $this->dbTable->SPExecute('sp_transaction_attendance_read', $employee_id, $i, $year_end);
        //         if($get[0]){
        //             $hasil[] = array(
        //                             'employee_id'       => $employee_id,
        //                             'month'             => $i,
        //                             'year'              => $year_end,
        //                             'total_attendance'  => $get[0][0]['total_attendance']
        //             );        
        //         }
        //     }
        // }else{
        //     if($month_start != $month_end){
        //         for ($i=$month_start; $i <= $month_end ; $i++) { 
        //             $get = $this->dbTable->SPExecute('sp_transaction_attendance_read', $employee_id, $i, $year_start);
        //             if($get[0]){
        //                 $hasil[] = array(
        //                                 'employee_id'       => $employee_id,
        //                                 'month'             => $i,
        //                                 'year'              => $year_start,
        //                                 'total_attendance'  => $get[0][0]['total_attendance']
        //                 );
        //             }
        //         }
        //     }else{
        //         $get = $this->dbTable->SPExecute('sp_transaction_attendance_read', $employee_id, $month_start, $year_start);
        //         if($get[0]){
        //             $hasil[] = array(
        //                             'employee_id'       => $employee_id,
        //                             'month'             => $month_start,
        //                             'year'              => $year_start,
        //                             'total_attendance'  => $get[0][0]['total_attendance']
        //             );

        //         }
        //     }
        // }

        // return $hasil;

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_attendance_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_attendance'    => $get[0][0]['total_attendance']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionAttendance_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionAttendance_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_attendance_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_attendance'    => $get[0][0]['total_attendance']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionOvertime(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_overtime_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_overtime'    => $get[0][0]['total_overtime']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionOvertime_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionOvertime_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_overtime_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_overtime'    => $get[0][0]['total_overtime']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionUangMakan(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_uangmakan_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_uang_makan'  => $get[0][0]['total_uang_makan']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionUangMakan_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionUangMakan_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_uangmakan_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_uang_makan'  => $get[0][0]['total_uang_makan']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionMedicalClaim(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_medicalclaim_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_medical_claim'  => $get[0][0]['total_medical_claim']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionMedicalClaim_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionMedicalClaim_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_medicalclaim_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_medical_claim'  => $get[0][0]['total_medical_claim']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionUnpaidLeave(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_unpaidleave_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_unpaid_leave'  => $get[0][0]['total_unpaid_leave']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionUnpaidLeave_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionUnpaidLeave_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_unpaidleave_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_unpaid_leave'  => $get[0][0]['total_unpaid_leave']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionCutiBesar(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));
        
        $month_start = date('m', strtotime($start_date));
        $month_end = date('m', strtotime($end_date));

        $year_start = date('Y', strtotime($start_date));
        $year_end = date('Y', strtotime($end_date));

        // $get = $this->dbTable->SPExecute('sp_transaction_cutibesar_read', $employee_id, $nik_group, $month_start, $year_start,$start_date,$end_date);
        $get = $this->dbTable->SPExecute('sp_transaction_cutibesar_read', $employee_id, $month_start, $year_start,$start_date,$end_date);
        
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'month'             => $month_start,
                            'year'              => $year_start,
                            'hire_date'         => $get[0][0]['datedata']
            );

        }

        // if($year_start != $year_end){
        //     for ($i=$month_start; $i <= 12 ; $i++) { 
        //         $get = $this->dbTable->SPExecute('sp_transaction_cutibesar_read', $employee_id, $i, $year_start,$start_date,$end_date);
        //         if($get[0]){
        //             $hasil[] = array(
        //                             'employee_id'       => $employee_id,
        //                             'month'             => $i,
        //                             'year'              => $year_start,
        //                             'hire_date'         => $get[0][0]['datedata']
        //             );  
        //         }
        //     }
        //     for ($i = 1; $i <= $month_end ; $i++) { 
        //         $get = $this->dbTable->SPExecute('sp_transaction_cutibesar_read', $employee_id, $i,$year_end,$start_date,$end_date);
        //         if($get[0]){
        //             $hasil[] = array(
        //                             'employee_id'       => $employee_id,
        //                             'month'             => $i,
        //                             'year'              => $year_end,
        //                             'hire_date'         => $get[0][0]['datedata']
        //             );        
        //         }
        //     }
        // }else{
        //     if($month_start != $month_end){
        //         for ($i=$month_start; $i <= $month_end ; $i++) { 
        //             $get = $this->dbTable->SPExecute('sp_transaction_cutibesar_read', $employee_id, $i, $year_start,$start_date,$end_date);
        //             if($get[0]){
        //                 $hasil[] = array(
        //                                 'employee_id'       => $employee_id,
        //                                 'month'             => $i,
        //                                 'year'              => $year_start,
        //                                 'hire_date'         => $get[0][0]['datedata']
        //                 );
        //             }
        //         }
        //     }else{
        //         $get = $this->dbTable->SPExecute('sp_transaction_cutibesar_read', $employee_id, $month_start, $year_start,$start_date,$end_date);
        //         if($get[0]){
        //             $hasil[] = array(
        //                             'employee_id'       => $employee_id,
        //                             'month'             => $month_start,
        //                             'year'              => $year_start,
        //                             'hire_date'         => $get[0][0]['datedata']
        //             );

        //         }
        //     }
        // }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionCutiBesar_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }


        return $hasil;
    }

    public function getTransactionCutiBesar_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));
        
        $month_start = date('m', strtotime($start_date));
        $month_end = date('m', strtotime($end_date));

        $year_start = date('Y', strtotime($start_date));
        $year_end = date('Y', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_cutibesar_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $get[0][0]['upload_employee_id'],
                            'nik_group'         => $nik_group,
                            'month'             => $month_start,
                            'year'              => $year_start,
                            'hire_date'         => $get[0][0]['hire_date']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionSaldoCutiBayar(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_saldocutibayar_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_saldocuti_bayar'  => $get[0][0]['total_saldocuti_bayar']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionSaldoCutiBayar_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionSaldoCutiBayar_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_saldocutibayar_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_saldocuti_bayar'  => $get[0][0]['total_saldocuti_bayar']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionPotonganTransport(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_potongantransport_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_potongan_transport'  => $get[0][0]['total_potongan_transport']
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionPotonganTransport_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionPotonganTransport_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_potongantransport_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'total_potongan_transport'  => $get[0][0]['total_potongan_transport']
            );

        }

        return $hasil_upload;
    }

    public function getTransactionSaldoCutiMinus(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group) {

        $hasil = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_transaction_saldocutiminus_read', $employee_id, $start_date, $end_date);
        if($get[0]){
            $hasil[] = array(
                            'employee_id'       => $employee_id,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'sisa_cuti'         => $get[0][0]['sisa_cuti'],
                            'get_from'          => 'process',
                            'total_saldocuti_minus' => ''
            );

        }

        if(empty($hasil)){
            $hasil_upload = $this->getTransactionSaldoCutiMinus_Upload($r, $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil);
            $hasil = $hasil_upload;
        }

        return $hasil;
    }

    public function getTransactionSaldoCutiMinus_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$employee_id,$start_date,$end_date,$nik_group,$hasil) {

        $hasil_upload = null;

        $start_date = date('Y-m-d', strtotime($start_date));
        $end_date = date('Y-m-d', strtotime($end_date));

        $get = $this->dbTable->SPExecute('sp_upload_transaction_saldocutiminus_read', $employee_id, $nik_group, $start_date, $end_date);

        if($get[0]){
            $hasil_upload[] = array(
                            'employee_id'       => $employee_id,
                            'nik_group'         => $nik_group,
                            'start_date'        => $start_date,
                            'end_date'          => $end_date,
                            'sisa_cuti'         => $get[0][0]['sisa_cuti'],
                            'get_from'          => 'upload',
                            'total_saldocuti_minus' => $get[0][0]['total_saldocuti_minus']
            );

        }

        return $hasil_upload;
    }

    //------------------------------------------------------------------------------------------------------------------

    //CHECK LAST PROCSS ID

    public function getLastProcessId(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data) {

        $hasil = null;
        $sp = 'sp_transaction_'.$data['process_api'].'_readlast';
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
    public function getTransactionCheck(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data) {

        $hasil = null;
        
        $sp = 'sp_transaction_'.$data['process_api'].'_readcheck';

        $processdata_from       = date('Y-m-d', strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d', strtotime($data['end_date']));
        $employee_id            = $data['employee_id'];
        $nik_group              = $data['nik_group'];
        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];

        //$hasil = $this->dbTable->SPExecute($sp, $employee_id, $processdata_from, $processdata_end);

        $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

        return $hasil;
    }

    public function getAllTransactionCheck(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data) {

        $hasil = null;
        
        //ini sudah benar sebelum sync API ke CHERRY
        // $sp = 'sp_transaction_'.$data['process_api'].'_readcheck';

        $processdata_from           = date('Y-m-d', strtotime($data['start_date']));
        $processdata_end            = date('Y-m-d', strtotime($data['end_date']));
        $employee_id                = $data['employee_id'];
        $nik_group                  = $data['nik_group'];
        $payroll_month              = $data['payroll_month'];
        $payroll_year               = $data['payroll_year'];

        //$hasil = $this->dbTable->SPExecute($sp, $employee_id, $processdata_from, $processdata_end);

        //ini sudah benar sebelum sync API ke CHERRY
        // $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end);

        $sp = 'sp_transaction_attendance_readcheck';
        $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);
        
        if(empty($hasil[0])){
            $sp = 'sp_transaction_cutibesar_readcheck';
            $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

            if(empty($hasil[0])){
                $sp = 'sp_transaction_medicalclaim_readcheck';
                $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

                if(empty($hasil[0])){
                    $sp = 'sp_transaction_overtime_readcheck';
                    $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

                    if(empty($hasil[0])){
                        $sp = 'sp_transaction_potongantransport_readcheck';
                        $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

                        if(empty($hasil[0])){
                            $sp = 'sp_transaction_saldocutibayar_readcheck';
                            $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

                            if(empty($hasil[0])){
                                $sp = 'sp_transaction_saldocutiminus_readcheck';
                                $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

                                if(empty($hasil[0])){
                                    $sp = 'sp_transaction_uangmakan_readcheck';
                                    $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);

                                    if(empty($hasil[0])){
                                        $sp = 'sp_transaction_unpaidleave_readcheck';
                                        $hasil = $this->dbTable->SPExecute($sp, $nik_group, $processdata_from, $processdata_end, $payroll_month, $payroll_year);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // print_r($hasil);die();

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //PROCESS TO CHERRY
    public function saveTransaction(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data,$jsonString,$jsonStringResult) {

        $project_id             = $jsonString['project_id'];
        $project_name           = $jsonString['project_name'];
        $pt_id                  = $jsonString['pt_id'];
        $pt_name                = $jsonString['pt_name'];
        $employee_id            = $jsonString['employee_id'];
        $employee_name          = $jsonString['employee_name'];
        $department_id          = $jsonString['department_id'];
        $department             = $jsonString['department'];
        $nik_group              = $jsonString['nik_group'];
        $action                 = $data['action_to_cherry'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];


        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));

        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        // $processdata_projectpt_id = $data['projectpt_id'];
        $processdata_pt_id      = $data['ptpt_id'];
        
        if($data['process_api'] == 'cutibesar'){
            $opsi_input         = $jsonString['hire_date'];
        }
        elseif($data['process_api'] == 'attendance'){
            $opsi_input         = $jsonString['total_attendance'];
        }
        elseif($data['process_api'] == 'medicalclaim'){
            $opsi_input         = $jsonString['total_medical_claim'];
        }
        elseif($data['process_api'] == 'overtime'){
            $opsi_input         = $jsonString['total_overtime'];
        }
        elseif($data['process_api'] == 'uangmakan'){
            $opsi_input         = $jsonString['total_uang_makan'];
        }
        elseif($data['process_api'] == 'unpaidleave'){
            $opsi_input         = $jsonString['total_unpaid_leave'];
        }
        elseif($data['process_api'] == 'saldocutibayar'){
            $opsi_input         = $jsonString['total_saldocuti_bayar'];
        }
        elseif($data['process_api'] == 'potongantransport'){
            $opsi_input         = $jsonString['total_potongan_transport'];
        }
        elseif($data['process_api'] == 'saldocutiminus'){
            $opsi_input         = $jsonString['sisa_cuti']."','";
            $opsi_input         .= $jsonString['total_saldocuti_minus'];
        }
        else{
            $opsi_input         = null;
        }

        
        $logprocessid           = $data['lastprocessid'];

        $sp = 'sp_transaction_'.$data['process_api'].'_create';
        $hasil = 0;
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
                                        // $processdata_projectpt_id,
                                        $processdata_pt_id,

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
        return $hasil;
    }

     //------------------------------------------------------------------------------------------------------------------

    //GET AFTER PROCESS
    public function getTransaction(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data) {

        $hasil = null;

        $lastprocessid = $data['lastprocessid'];
        $process_api = $data['process_api'];
        $process_api_model = $data['process_api_model'];

        $sp = 'sp_transaction_'.$process_api.'_readafterprocess';

        $hasil = $this->dbTable->SPExecute($sp, $lastprocessid);

        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //PROCESS TO CHERRY
    public function saveTransactionBeforeApi(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data,$jsonString) {

        $project_id             = $jsonString['project_id'];
        $project_name           = $jsonString['project_name'];
        $pt_id                  = $jsonString['pt_id'];
        $pt_name                = $jsonString['pt_name'];
        $employee_id            = $jsonString['employee_id'];
        $employee_name          = $jsonString['employee_name'];
        $department_id          = $jsonString['department_id'];
        $department             = $jsonString['department'];
        $nik_group              = $jsonString['nik_group'];
        $action                 = $data['action_to_cherry'];

        $processdata_start      = date('Y-m-d',strtotime($data['start_date']));
        $processdata_end        = date('Y-m-d',strtotime($data['end_date']));

        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        // $processdata_projectpt_id = $data['projectpt_id'];
        $processdata_pt_id      = $data['ptpt_id'];
        
        if($data['process_api'] == 'cutibesar'){
            $opsi_input         = $jsonString['hire_date'];
        }
        elseif($data['process_api'] == 'attendance'){
            $opsi_input         = $jsonString['total_attendance'];
        }
        elseif($data['process_api'] == 'medicalclaim'){
            $opsi_input         = $jsonString['total_medical_claim'];
        }
        elseif($data['process_api'] == 'overtime'){
            $opsi_input         = $jsonString['total_overtime'];
        }
        elseif($data['process_api'] == 'uangmakan'){
            $opsi_input         = $jsonString['total_uang_makan'];
        }
        elseif($data['process_api'] == 'unpaidleave'){
            $opsi_input         = $jsonString['total_unpaid_leave'];
        }
        elseif($data['process_api'] == 'saldocutibayar'){
            $opsi_input         = $jsonString['total_saldocuti_bayar'];
        }
        elseif($data['process_api'] == 'potongantransport'){
            $opsi_input         = $jsonString['total_potongan_transport'];
        }
        elseif($data['process_api'] == 'saldocutiminus'){
            $opsi_input         = $jsonString['sisa_cuti']."','";
            $opsi_input         .= $jsonString['total_saldocuti_minus'];
        }
        else{
            $opsi_input         = null;
        }

        
        $logprocessid           = $data['lastprocessid'];

        $sp = 'sp_transaction_'.$data['process_api'].'_create';
        $hasil = 0;
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
                                        $processdata_pt_id,

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
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //PROCESS TO CHERRY
    public function updateTransaction(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data,$jsonString,$jsonStringResult) {

        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $employee_id            = $jsonString['employee_id'];
        $nik_group              = $jsonString['nik_group'];
        $logprocessid           = $data['lastprocessid'];
        
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $code                   = $jsonStringResult['Code'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        $detaillist             = $jsonStringResult['DetailList'];
        $code_detail            = $detaillist[0]['Code'];
        

        $sp = 'sp_transaction_'.$data['process_api'].'_update';
        $hasil = 0;
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
        return $hasil;
    }

    //------------------------------------------------------------------------------------------------------------------

    //UPDATE HCMS
    public function getCellTransaction(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em, $session,$data,$jsonString){

        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $employee_id            = $jsonString['employee_id'];
        $nik_group              = $jsonString['nik_group'];
        $log_process_id         = $data['log_process_id'];
        $start_date             = date('Y-m-d',strtotime($data['start_date']));
        $end_date               = date('Y-m-d',strtotime($data['end_date']));

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_transaction_saldocutiminus_readgetupdate', 
                                            $project_id,
                                            $pt_id,
                                            $nik_group,
                                            $log_process_id,
                                            $start_date,
                                            $end_date);

        return $hasil[0][0];

    }

    public function addLeave(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em, $session,$data,$jsonString,$getcell){

        $start_date             = date('Y-m-d',strtotime($data['start_date']));
        $end_date               = date('Y-m-d',strtotime($data['end_date']));
        $payroll_month          = $data['payroll_month'];
        $payroll_year           = $data['payroll_year'];
        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $employee_id            = $jsonString['employee_id'];
        $note                   = 'Process Pemotongan Payroll Bulan '.$payroll_month.' Tahun '.$payroll_year.' Periode ('.$start_date.' - '.$end_date.')';
        $total_saldocuti_minus  = $getcell['total_saldocuti_minus'];
        $description            = 'logcherry_t_saldocutiminus_id='.$getcell['logcherry_t_saldocutiminus_id'];

        $hasil = 0;

        if($total_saldocuti_minus < 0 ){
        $hasil = $this->dbTable->SPUpdate('sp_transaction_saldocutiminus_createleave', 
                                            $start_date,
                                            $end_date,
                                            $project_id,
                                            $pt_id,
                                            $employee_id,
                                            $note,
                                            $total_saldocuti_minus,
                                            $description,
                                            $session->getUserId(),
                                            1,
                                            0
                                        );

        }else{
            $hasil = 1;
        }
            

        return $hasil;

    }

    public function getLeaveEntitlements(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em, $session,$data,$jsonString,$getcell){

        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $employee_id            = $jsonString['employee_id'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_transaction_saldocutiminus_readleaveentitlements', 
                                            $project_id,
                                            $pt_id,
                                            $employee_id
                                        );
        
        return $hasil[0][0];

    }

    public function updateLeaveEntitlements(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em, $session,$data,$jsonString,$getcell,$getleaveentitlements){

        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $employee_id            = $jsonString['employee_id'];
        $rest                   = $getleaveentitlements['rest'] - ($getcell['total_saldocuti_minus']);
        
        if($getleaveentitlements['description']){
            $description            = $getleaveentitlements['description'].','.$getcell['logcherry_t_saldocutiminus_id'];
        }else{
            $description            = 'logcherry_t_saldocutiminus_id='.$getcell['logcherry_t_saldocutiminus_id'];
        }

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_transaction_saldocutiminus_updateleaveentitlements', 
                                            $project_id,
                                            $pt_id,
                                            $employee_id,
                                            $rest,
                                            $description,
                                            $session->getUserId()
                                        );
        
        return $hasil;

    }

    public function updateSaldoCutiMinus(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em, $session,$data,$jsonString,$getcell,$addleave){

        $project_id             = $jsonString['project_id'];
        $pt_id                  = $jsonString['pt_id'];
        $nik_group              = $jsonString['nik_group'];
        $log_process_id         = $data['log_process_id'];
        $start_date             = date('Y-m-d',strtotime($data['start_date']));
        $end_date               = date('Y-m-d',strtotime($data['end_date']));
        $leave_id               = $addleave;
        $employee_id            = $jsonString['employee_id'];
        
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_transaction_saldocutiminus_updateafterleave', 
                                            $log_process_id,
                                            $project_id,
                                            $pt_id,
                                            $nik_group,
                                            $start_date,
                                            $end_date,
                                            $leave_id
                                        );

        return $hasil;

    }


    //------------------------------------------------------------------------------------------------------------------
    //PRODUCTIVITY FORM

    public function getProductivityFormCode(Hrd_Models_Transferapi_Transferapitransaction $em, $companycode){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_productivityform_cherrycode_read', 
                                            'Transaction',
                                            $companycode
                                        );
        
        return $hasil;

    }

    public function saveProductivityFormBeforeApi(Hrd_Models_Transferapi_Transferapitransaction $em, $session,$jsonString) {

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_productivityform_cherrycode_create',
                $jsonString['name'],
                $jsonString['company_code'],
                $jsonString['formkeyproperty'],
                $session->getUserId()
                );

        return $hasil;
    }

    public function updateProductivityFormAfterApi(Hrd_Models_Transferapi_Transferapitransaction $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id']['head'];
        $name                   = $jsonString['name'];
        $company_code           = $jsonString['company_code'];
        $formkeyproperty        = $jsonString['formkeyproperty'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_productivityform_cherrycode_update',
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

    public function getProductivityFormDetailCode(Hrd_Models_Transferapi_Transferapitransaction $em, $companycode, $productcode, $detailname){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_productivityformdetail_cherrycode_read', 
                                            $detailname,
                                            $companycode,
                                            $productcode
                                        );
        
        return $hasil;

    }

    public function saveProductivityFormDetailBeforeApi(Hrd_Models_Transferapi_Transferapitransaction $em, $session,$jsonString) {

        $hasil = 0;
        $arr_hasil = 0;
        
        $detail = $jsonString['detail'];

        $temp = null;
        $arr = null;
        foreach($detail as $key => $item){
            $explode = explode('_', $key);
            if(empty($temp)){
                $temp = $explode[0];
                $arr[$temp][$explode[1]] = $item;
            }else{
                $temp = $explode[0];
                $arr[$temp][$explode[1]] = $item;
                $temp = null;
            }

        }

        $arr_hasil = null;

        foreach($arr as $key => $item){
            $hasil = $this->dbTable->SPUpdate('sp_productivityformdetail_cherrycode_create',
                    $item['desc'],
                    $item['formula'],
                    $jsonString['company_code'],
                    $session->getUserId()
                    );

            $desc = $item['desc'];

            $arr_hasil[$desc]['desc'] =  $item['desc'];
            $arr_hasil[$desc]['formula'] = $item['formula'];
            $arr_hasil[$desc]['hasil'] = $hasil;
        }


        return $arr_hasil;
    }

    public function updateProductivityFormDetailAfterApi(Hrd_Models_Transferapi_Transferapitransaction $em, $session,$jsonString,$jsonStringResult,$data){

        $action                 = $data['action'];
        $result_status          = $data['result_status'];
        $result_status_message  = $data['result_status_message'];
        $result_id              = $data['result_id']['detail'];
        $name                   = $jsonString['name'];
        $company_code           = $jsonString['company_code'];
        $formkeyproperty        = $jsonString['formkeyproperty'];

        $code                   = $jsonStringResult['Code'];
        $active                 = $jsonStringResult['Active'];
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];
        $detaillist             = $jsonStringResult['DetailList'];
        

        $hasil = 0;
        foreach($detaillist as $key => $item){
            $result_id_detail = $result_id[$item['Description']]['hasil'];
            $hasil = $this->dbTable->SPUpdate('sp_productivityformdetail_cherrycode_update',
                    $result_id_detail,
                    $item['Description'],
                    $company_code,

                    $action,
                    $result_status,
                    $result_status_message,

                    $item['Code'],
                    $code,
                    $item['Active'],
                    $item['InsertStamp'],
                    $item['UpdateStamp'],

                    $session->getUserId()
                    );
        }

        return $hasil;

    }

    //get employee code
    public function getEmployeeCode(Hrd_Models_Transferapi_Transferapitransaction $em, $employee_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_master_employee_readcheck', 
                                            $employee_id,
                                            '',
                                            '',
                                            ''
                                        );
        
        return $hasil;

    }
    

    //LAST ACTIVITY
    public function getLastActivity(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransaction $em,$session,$data){

        $hasil = null;
        if($data['choose'] == 'transfer_attendance'){
            $process_api = 'attendance';
        }elseif($data['choose'] == 'transfer_overtime'){
            $process_api = 'overtime';
        }elseif($data['choose'] == 'transfer_uangmakanlembur'){
            $process_api = 'uangmakan';
        }elseif($data['choose'] == 'transfer_medicalclaim'){
            $process_api = 'medicalclaim';
        }elseif($data['choose'] == 'transfer_unpaidleave'){
            $process_api = 'unpaidleave';
        }elseif($data['choose'] == 'transfer_cutibesar'){
            $process_api = 'cutibesar';
        }elseif($data['choose'] == 'transfer_saldocutibayar'){
            $process_api = 'saldocutibayar';
        }elseif($data['choose'] == 'transfer_potongantransport'){
            $process_api = 'potongantransport';
        }elseif($data['choose'] == 'transfer_saldocutiminus'){
            $process_api = 'saldocutiminus';
        }else{
            $process_api = null;
        }


        $sp = 'sp_transaction_'.$process_api.'_lastactivity_read';
        $last_activity          = $this->dbTable->SPExecute($sp, $data['ptpt_id']);
        $hasil = $last_activity[0];
        return $hasil;

    }
    

    //get company code
    public function getCompanyCode(Hrd_Models_Transferapi_Transferapitransaction $em, $pt_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_read', 
                                            $pt_id,
                                            1,
                                            1
                                        );
        
        return $hasil;

    }

    public function savePayrollPeriode(Hrd_Models_Transferapi_Transferapitransaction $em, $session,$param){

        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_cutoffdate_createlog',
                    $param['Code'],
                    $param['CompanyCode'],
                    $param['TypeCode'],
                    $param['Month'],
                    $param['Year'],
                    $param['Name'],
                    $param['CutOffDate'],
                    $session->getUserId()
                    );

        return $hasil;

    }
    public function getCutOffDate(Hrd_Models_Transferapi_Transferapitransaction $em, $data){

        $companycode = $data['companycode'];
        $choose_payroll_month = $data['choose_payroll_month'];
        $choose_payroll_year = $data['choose_payroll_year'];
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_cutoffdate_readdata', 
                                            $companycode,
                                            $choose_payroll_month,
                                            $choose_payroll_year
                                        );
        
        return $hasil;

    }
}

