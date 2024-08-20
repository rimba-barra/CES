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
class Hrd_Models_Upload_UploadtransactionExcel {
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
       
        $dao = new Hrd_Models_Upload_UploadtransactionDao();
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

        $temp_salah_data = '';
        $temp_salah = '';

        //destroy semua dulu
        $destroy_db = $dao->destroyAll($ses,$tableChoose,$data);
        foreach ($rowData as $key => $item) {

            $data_excel = array(
                                'payroll_month'             => $item[0][1],
                                'payroll_year'              => $item[0][2],
                                'start_date'                => date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][3])),
                                'end_date'                  => date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][4])),
                                'project_name'              => $item[0][5],
                                'pt_name'                   => $item[0][6],
                                'employee_name'             => $item[0][7],
                                'department_name'           => $item[0][8],
                                'nik_group'                 => $item[0][9]
            );

            if($tableChoose == 'attendance'){

                $data_excel['total_attendance'] = $item[0][10];

            }elseif($tableChoose == 'overtime'){
                    
                $data_excel['total_overtime']   = $item[0][10];

            }elseif($tableChoose == 'uangmakan'){

                $data_excel['total_uang_makan'] = $item[0][10];

            }elseif($tableChoose == 'medicalclaim'){
                    
                $data_excel['total_medical_claim']  = $item[0][10];
                    
            }elseif($tableChoose == 'unpaidleave'){
                    
                $data_excel['total_unpaid_leave']   = $item[0][10];
                    
            }elseif($tableChoose == 'cutibesar'){
                    
                $data_excel['hire_date']        = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][10]));
                    
            }elseif($tableChoose == 'saldocutibayar'){
                    
                $data_excel['total_saldocuti_bayar'] = $item[0][10];
                    
            }elseif($tableChoose == 'potongantransport'){
                    
                $data_excel['total_potongan_transport'] = $item[0][10];
                    
            }elseif($tableChoose == 'saldocutiminus'){
                    
                $data_excel['sisa_cuti']             = $item[0][10];
                $data_excel['total_saldocuti_minus'] = $item[0][11];
                    
            }


            //get projectpt id dari excel
            $get_projectptid_excel = $dao->getProjectPtIdExcel($data_excel['project_name'],$data_excel['pt_name']);
            //GET UPLOAD EMPLOYEE ID
            $get_upload_employee_id = $dao->getEmployeeUploadId($data['project_id'],$data['pt_id'],$data_excel['employee_name'],$data_excel['nik_group']);


            //CEK TANGGAL DI PERIODE DAN DI EXCEL
            if(empty($temp_salah_data) && ($data_excel['start_date'] != date('Y-m-d',strtotime($data['start_date'])) || $data_excel['end_date'] != date('Y-m-d',strtotime($data['end_date'])))){
                $temp_salah_data[] = 'date';
                $temp_salah[] = $item[0][0];
            }
            
            if(empty($temp_salah_data) && ($data_excel['payroll_month'] != $data['payroll_month'] || $data_excel['payroll_year'] != $data['payroll_year'] )){
                $temp_salah_data[] = 'payroll';
                $temp_salah[] = $item[0][0];
            }

            //CEK PROJECT PT DI FILTER DAN DI EXCEL
            // elseif(empty($temp_salah_data) && ($get_projectptid_excel[0][0]['totalRow'] < 1 || $get_projectptid_excel[1][0]['projectpt_id'] != $data['choose_projectpt'])){
            //     $temp_salah_data[] = 'projectpt';
            //     $temp_salah[] = $item[0][0];
            // }
            elseif(empty($temp_salah_data) && (!$data['choose_projectpt'])){
                $temp_salah_data[] = 'projectpt';
                $temp_salah[] = $item[0][0];
            }
            //CEK EMPLOYEE SUDAH ADA BELUM DI MASTER
            elseif(empty($temp_salah_data) && empty($get_upload_employee_id[0])){
                $temp_salah_data[] = 'employee';
                $temp_salah[] = $item[0][0];
            }

            if($get_upload_employee_id[0]){
                $data_excel['upload_employee_id'] = $get_upload_employee_id[0][0]['upload_employee_id'];
                $data_excel['employee_name'] = $get_upload_employee_id[0][0]['employee_name'];
                $data_excel['upload_department_id'] = $get_upload_employee_id[0][0]['department_department_id'];
                $data_excel['department_name'] = $get_upload_employee_id[0][0]['department_department'];

            }

            if($temp_salah_data && $temp_salah){
                $temp_salah = $temp_salah;
                $temp_salah_data = $temp_salah_data;
            
            }else{

                $check_db = $dao->getTransactionCheck($ses,$tableChoose,$data_excel,$data);

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
                
                
                $input_db_master = $dao->uploadTransaction($ses,$tableChoose,$data_excel,$data);

                // if($input_db_master && $data_excel['deleted'] != '1'){
                //     $total_data_success++;
                // }

                // if($data_excel['deleted'] == '1'){
                //     $total_data_destroy++;
                // }

                if($input_db_master){
                    $total_data_success++;
                }

            }
            
        }
        $total_data = $key_last_data - $total_data_destroy;
        // print_r($key_last_data .' - '. $total_data_destroy.' | '.$total_data_success.' - '. $total_data);die();
        $ada_salah = '';

        if($total_data_success == $total_data && empty($temp_salah)){
            $this->status = 'TRUE';
        }elseif($temp_salah[0]){
            $ada_salah = array(
                            'salah_di' => $temp_salah_data[0],
                            'salah_no' => $temp_salah
                        );
            $this->status = $ada_salah;
        }else{
            $this->status = 'FALSE';
        }
        
        return $this->status;
    }
    

    public function getStatus(){
        return $this->status;
    }
    
    public function getMsg(){
        return $this->msg;
    }

}
