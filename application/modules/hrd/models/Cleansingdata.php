<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Cleansingdata extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $destination = null;
    private $folderapps = null;
    private $path = null;
    private $_mail = null;
    private $_createdatalog = null;
    private $_intranet = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup;
        $this->setting->_storeprocedure = 'sp_cleansingdata';
        $this->dao_emp = new Hrd_Models_Master_EmployeeDao();
        $this->_createdatalog = new Hrd_Models_Createdatalog();
        $this->_intranet = new Hrd_Models_Intranet_Employee();
        $this->path = 'app/hrd/uploads/cleansingdata/';
        $this->folderapps = getcwd() . '/' . $this->path;
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';


                switch ($this->setting->_param['mode_read']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'searching':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'create':
                        $originaldata_m_employee = $this->dao_emp->getAllByIds($param['employee_id']);
                        $result = $this->createData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        if ($valid == true) {
                            $this->update_employee($originaldata_m_employee, 'cleansingdata_approve', $param);
                        }
                        break;
                    case 'update':
                        $originaldata_m_employee = $this->dao_emp->getAllByIds($param['employee_id']);
                        $result = $this->updateData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];                        
                        if ($valid == true) {
                            $this->update_employee($originaldata_m_employee, 'cleansingdata_approve', $param);
                        }
                        break;
                    case 'print':
                        $data = $this->printData($param);
                        $data = '';
                        $counter = 1;
                        $message = null;
                        $valid = true;
                        break;
                    case 'exportdata':
                        $data = $this->exportData($param);
                        $counter = 1;
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }
                
                if($this->setting->_param['mode_read'] == 'exportdata'){
                    $return = $data;
                } else {
                    $return = array(
                        "success" => $valid,
                        "data" => $data,
                        "msg" => $message,
                        "total" => $counter,
                        "counter" => $counter,
                        "parameter" => $param['mode_read'],
                    );
                    
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    public function checkuserApprove($param) {
        $userdata = $this->setting->getUserdata();
        if ($userdata['employee_id'] > 0 && !empty($userdata['employee_id'])) {
            
        } else {
            
        }
    }

    public function update_employee($dataemployee, $basedata, $param) {
        $counter = $dataemployee[0][0]['totalRow'];
        if ($counter > 0) {
            $this->changedatainMultiposition($dataemployee, $param);
            $this->changedatainEmployee($param['employee_id'], $param);
        }
    }

    public function changedatainEmployee($employee_id, $param) {
        $tabledata = 'hrd.dbo.m_employee';
        $record = array(
            //"project_id" => $param['new_project_id'],
            //"pt_id" => $param['new_pt_id'],
            //"division_id" => 0,
            "department_id" => $param['new_department_id'],
            "position_id" => $param['new_position_id'],
            "group_id" => $param['new_group_id'],
            "jobfamily_id" => $param['new_jobfamily_id'],
            "banding_id" => $param['new_banding_id'],
            "reportto" => $param['new_reportto_id'],
            "modiby" => $this->setting->_user_id,
            "modion" => date('Y-m-d H:i:s'),
        );
        $whereset = array(
            "employee_id" => $employee_id
        );
        $this->setting->_tabledata = $tabledata;
        $this->setting->updatedatav2($record, $whereset);
    }

    public function changedatainMultiposition($dataemployee, $param) {
        $counter = $dataemployee[0][0]['totalRow'];
        if ($counter > 0) {
            $tabledata = 'hrd.dbo.t_employee_multiposition';
            $data = $dataemployee[1][0];
            $resultmultiposition = $this->setting->getdata_bytableparam_v2($tabledata, array(
                "is_default" => '1',
                "employee_id" => $data['employee_id'],
                "project_id" => $data['project_id'],
                "pt_id" => $data['pt_id'],
            ));
            if (!empty($resultmultiposition[0])) {
                $datamultiposition = $resultmultiposition[0][0];
                $employee_multiposition_id = $datamultiposition['employee_multiposition_id'];
                $record = array(
                    //"project_id" => $param['new_project_id'],
                    //"pt_id" => $param['new_pt_id'],
                    "department_id" => $param['new_department_id'],
                    "position_id" => $param['new_position_id'],
                    "jobfamily_id" => $param['new_jobfamily_id'],
                    "reportto_id" => $param['new_reportto_id'],
                    "modiby" => $this->setting->_user_id,
                    "modion" => date('Y-m-d H:i:s'),
                );
                $whereset = array(
                    "employee_multiposition_id" => $employee_multiposition_id
                );
                $this->setting->_tabledata = $tabledata;
                $this->setting->updatedatav2($record, $whereset);
            }
        }
    }

    public function createData($param) {
        $this->setting->_paramsql = 'create';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function updateData($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['cleansingdata_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function approveData($param) {
        $this->setting->_paramsql = 'approve';
        $this->setting->_iddata = $param['cleansingdata_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }

    function createFolderError() {
        if (!file_exists($this->destination_error)) {
            mkdir($this->destination_error, 0777, true);
        }
    }

    function Createupload($post, $files) {
//$name = date('Ymd') . '.pdf';
        $filesupload = $files['uploadfile'];
        $name = $filesupload['name'];
        $namedata = $post['cleansingdata_id'];
        $typedocument = $post['typedocument'];
        $file_tmp = $files['uploadfile']['tmp_name'];
        $this->destination = $this->folderapps . $namedata;
        $fullpathfile = $this->destination . '/' . $name;
        $path = $this->path . $namedata . '/' . $name;
        $this->createFolder();
        if (move_uploaded_file($file_tmp, $fullpathfile)) {
            $this->setting->_tabledata = 't_changestatus';
            $record = array("sk_file_upload_path" => $path);
            $whereset = array("cleansingdata_id" => $post['cleansingdata_id']);
            $this->setting->updatedata($record, $whereset);

            $recorddocument = array(
                "cleansingdata_id" => $post['cleansingdata_id'],
                "filename" => $name,
                "locationpath" => $path,
                "typedocument" => $typedocument,
                "addon" => date('Y-m-d H:i:s'),
                "addby" => $this->setting->_user_id,
            );
            $this->setting->insertdata_byparamtable($this->setting->_td_changestatusdocument, $recorddocument);
            return array('success' => true, 'msg' => "Upload Success");
        } else {
            return array('success' => false, 'msg' => "Upload failed");
        }
    }
    
    public function conditionbgColor($text1, $text2) {
        if ($text1 == $text2) {
            $bgcolor = '';
        } else {
            $bgcolor = 'yellow';
        }
        return $bgcolor;
    }
    
    public function exportData($param) {
        
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_cleansingdata';        
        $this->destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/personal/exportdata/';
        $this->setup->_param = array();
        $this->setup->_paramsql = 'exportdata';
        $result = $this->setup->executeSP();
        if(!empty($result[0])){
            $result = $result[1];
        }
        
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        
    
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getProperties()->setTitle("title")
                ->setDescription("description");

        // emaildata format, &euro; with < 0 being in red color
        $emaildataFormat = '#,#0.## \€;[Red]-#,#0.## \€';
        // number format, with thousands seperator and two decimal points.
        $numberFormat = '#,#0.##;[Red]-#,#0.##';

        // writer will create the first sheet for us, let's get it
        $objSheet = $objPHPExcel->getActiveSheet();
        // rename the sheet
        $objSheet->setTitle('export data employee');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:AA1')->getFont()->setBold(true)->setSize(12);

        // write header
        
        $objSheet->getCell('A1')->setValue('Subholding');
        $objSheet->getCell('B1')->setValue('Subholding Sub');
        $objSheet->getCell('C1')->setValue('Proyek');    
        $objSheet->getCell('D1')->setValue('Pt');
        $objSheet->getCell('E1')->setValue('NIK Karyawan');
        $objSheet->getCell('F1')->setValue('NIK Grup Karyawan');
        $objSheet->getCell('G1')->setValue('Nama Karyawan');
        $objSheet->getCell('H1')->setValue('Status Karyawan');
        $objSheet->getCell('I1')->setValue('Hire Date');        
        $objSheet->getCell('J1')->setValue('Banding');
        $objSheet->getCell('K1')->setValue('Previous Banding');
        $objSheet->getCell('L1')->setValue('Golongan');
        $objSheet->getCell('M1')->setValue('Previous Golongan');
        $objSheet->getCell('N1')->setValue('Departemen');
        $objSheet->getCell('O1')->setValue('Previous Departemen');
        $objSheet->getCell('P1')->setValue('Job Family');
        $objSheet->getCell('Q1')->setValue('Previous Job Family');
        $objSheet->getCell('R1')->setValue('Jabatan');
        $objSheet->getCell('S1')->setValue('Previous Jabatan');
        $objSheet->getCell('T1')->setValue('NIK HOD');
        $objSheet->getCell('U1')->setValue('Nama HOD');
        $objSheet->getCell('V1')->setValue('Previous NIK HOD');
        $objSheet->getCell('W1')->setValue('Previous Nama HOD');
        $objSheet->getCell('X1')->setValue('Added By');
        $objSheet->getCell('Y1')->setValue('Added Date');
        $objSheet->getCell('Z1')->setValue('Modified By');
        $objSheet->getCell('AA1')->setValue('Modified Date');
        
        /*
        $objSheet->getCell('V1')->setValue('Jenis Kelamin');
        $objSheet->getCell('W1')->setValue('Tempat Lahir');
        $objSheet->getCell('X1')->setValue('Tanggal Lahir');
        $objSheet->getCell('Y1')->setValue('Golongan Darah');
        $objSheet->getCell('Z1')->setValue('Agama');
        $objSheet->getCell('AA1')->setValue('Status');
        $objSheet->getCell('AB1')->setValue('Tanggal Menikah');
        $objSheet->getCell('AC1')->setValue('Jumlah Anak');
        $objSheet->getCell('AD1')->setValue('Pendidikan Terakhir');
        $objSheet->getCell('AE1')->setValue('Nomor KTP');
        $objSheet->getCell('AF1')->setValue('Nomor NPWP');
        $objSheet->getCell('AG1')->setValue('Nomor Passport');
        $objSheet->getCell('AH1')->setValue('Alamat Saat ini Tinggal');
        $objSheet->getCell('AI1')->setValue('Alamat Sesuai KTP');
        $objSheet->getCell('AJ1')->setValue('Kode POS');
        $objSheet->getCell('AK1')->setValue('Status (Active/Non Active)');
        $objSheet->getCell('AL1')->setValue('Status Karyawan');
        $objSheet->getCell('AM1')->setValue('Hire Date');
        $objSheet->getCell('AN1')->setValue('Tanggal Pengangkatan');
        $objSheet->getCell('AO1')->setValue('Kontrak ke');
        $objSheet->getCell('AP1')->setValue('Tanggal Mulai Kontrak');
        $objSheet->getCell('AQ1')->setValue('Tanggal Berakhir Kontrak');
        $objSheet->getCell('AR1')->setValue('Temporary ke');
        $objSheet->getCell('AS1')->setValue('Tanggal Mulai Temporary');
        $objSheet->getCell('AT1')->setValue('Tanggal Berakhir Temporary');
        $objSheet->getCell('AU1')->setValue('Fingerprint Code');
        $objSheet->getCell('AV1')->setValue('Section');
        $objSheet->getCell('AW1')->setValue('Business Unit');
        $objSheet->getCell('AX1')->setValue('Paket Dokumen');
        $objSheet->getCell('AY1')->setValue('Email Kantor');
        $objSheet->getCell('AZ1')->setValue('Email Pribadi');
        $objSheet->getCell('BA1')->setValue('Bank Rekening');
        $objSheet->getCell('BB1')->setValue('Nomor Rekening');
        $objSheet->getCell('BC1')->setValue('Nama Rekening');
        $objSheet->getCell('BD1')->setValue('Alokasi Biaya ke 1');
        $objSheet->getCell('BE1')->setValue('Alokasi Biaya ke 2');
        $objSheet->getCell('BF1')->setValue('Alokasi Biaya ke 3');
        */
        $styleBg = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'FFC0CB')
            )
        );

                        
        $i = 1;
        foreach ($result as $row) {
            $i++;
            $objSheet->getCell('A' . $i)->setValue($row['subholding']);
            $objSheet->getCell('B' . $i)->setValue($row['subholding_subname']);
            $objSheet->getCell('C' . $i)->setValue($row['projectname']);           
            $objSheet->getCell('D' . $i)->setValue($row['ptname']);
            $objSheet->getCell('E' . $i)->setValue("'".strval($row['employee_nik'])."'");
            $objSheet->getCell('F' . $i)->setValue("'".strval($row['nik_group'])."'");
            $objSheet->getCell('G' . $i)->setValue($row['employee_name']);       
            $objSheet->getCell('H' . $i)->setValue($row['employeestatus']); 
            $objSheet->getCell('I' . $i)->setValue($row['hire_date']);
            
            if($row['banding'] != $row['prev_banding']){
                $objSheet->getStyle('J'.$i.':K'.$i)->applyFromArray($styleBg);
            }
            if($row['groupcode'] != $row['prev_groupcode']){                      
                $objSheet->getStyle('L'.$i.':M'.$i)->applyFromArray($styleBg); 
            }
            if($row['department'] != $row['prev_department']){            
                $objSheet->getStyle('N'.$i.':O'.$i)->applyFromArray($styleBg); 
            }
            if($row['jobfamily'] != $row['prev_jobfamily']){            
                $objSheet->getStyle('P'.$i.':Q'.$i)->applyFromArray($styleBg); 
            }
            if($row['positiondesc'] != $row['prev_positiondesc']){
                $objSheet->getStyle('R'.$i.':S'.$i)->applyFromArray($styleBg); 
            }
            if($row['hod_name'] != $row['prev_hod_name']){                
                $objSheet->getStyle('T'.$i.':W'.$i)->applyFromArray($styleBg); 
            }
            
            $objSheet->getCell('J' . $i)->setValue($row['banding']);
            $objSheet->getCell('K' . $i)->setValue($row['prev_banding']);
            $objSheet->getCell('L' . $i)->setValue($row['groupcode']);
            $objSheet->getCell('M' . $i)->setValue($row['prev_groupcode']);
            $objSheet->getCell('N' . $i)->setValue($row['department']);
            $objSheet->getCell('O' . $i)->setValue($row['prev_department']);
            $objSheet->getCell('P' . $i)->setValue($row['jobfamily']);
            $objSheet->getCell('Q' . $i)->setValue($row['prev_jobfamily']);
            $objSheet->getCell('R' . $i)->setValue($row['positiondesc']);
            $objSheet->getCell('S' . $i)->setValue($row['prev_positiondesc']);
            $objSheet->getCell('T' . $i)->setValue("'".$row['hod_nik']."'");
            $objSheet->getCell('U' . $i)->setValue($row['hod_name']);
            $objSheet->getCell('V' . $i)->setValue("'".$row['prev_hod_nik']."'");
            $objSheet->getCell('W' . $i)->setValue($row['prev_hod_name']);
            $objSheet->getCell('X' . $i)->setValue($row['addby']);
            $objSheet->getCell('Y' . $i)->setValue($row['addon']);
            $objSheet->getCell('Z' . $i)->setValue($row['modiby']);
            $objSheet->getCell('AA' . $i)->setValue($row['modion']);
            
            /*
            $objSheet->getCell('V' . $i)->setValue($row['gender']);
            $objSheet->getCell('W' . $i)->setValue($row['birth_place']);
            $objSheet->getCell('X' . $i)->setValue($row['birth_date']);
            $objSheet->getCell('Y' . $i)->setValue($row['bloodgroup']);
            $objSheet->getCell('Z' . $i)->setValue($row['religion']);
            $objSheet->getCell('AA' . $i)->setValue($row['marriagestatus']);
            $objSheet->getCell('AB' . $i)->setValue($row['marriage_date']);
            $objSheet->getCell('AC' . $i)->setValue($row['child_count']);
            $objSheet->getCell('AD' . $i)->setValue($row['education']);
            $objSheet->getCell('AE' . $i)->setValue("'".$row['ktp_number']."'");
            $objSheet->getCell('AF' . $i)->setValue("'".$row['npwp']."'");
            $objSheet->getCell('AG' . $i)->setValue("'".$row['passport_number']."'");
            $objSheet->getCell('AH' . $i)->setValue($row['address']);
            $objSheet->getCell('AI' . $i)->setValue($row['ktp_address']);
            $objSheet->getCell('AJ' . $i)->setValue($row['zipcode']);
            $objSheet->getCell('AK' . $i)->setValue($row['statusemployee']);         
            $objSheet->getCell('AL' . $i)->setValue($row['employeestatus']); 
            $objSheet->getCell('AM' . $i)->setValue($row['hire_date']);
            $objSheet->getCell('AN' . $i)->setValue($row['assignation_date']);
            $objSheet->getCell('AO' . $i)->setValue($row['contract_ke']);
            $objSheet->getCell('AP' . $i)->setValue($row['contract_start']);
            $objSheet->getCell('AQ' . $i)->setValue($row['contract_end']);
            $objSheet->getCell('AR' . $i)->setValue($row['temporary_ke']);
            $objSheet->getCell('AS' . $i)->setValue($row['temporary_start']);
            $objSheet->getCell('AT' . $i)->setValue($row['temporary_end']);
            $objSheet->getCell('AU' . $i)->setValue("'".$row['fingerprintcode']."'");
            $objSheet->getCell('AV' . $i)->setValue($row['section']);         
            $objSheet->getCell('AW' . $i)->setValue($row['division']);   
            $objSheet->getCell('AX' . $i)->setValue($row['package_name']);
            $objSheet->getCell('AY' . $i)->setValue($row['email_ciputra']);
            $objSheet->getCell('AZ' . $i)->setValue($row['email']);
            $objSheet->getCell('BA' . $i)->setValue($row['bank_rekening']);
            $objSheet->getCell('BB' . $i)->setValue("'".$row['nomor_rekening']."'");
            $objSheet->getCell('BC' . $i)->setValue($row['nama_rekening']);     
            $objSheet->getCell('BD' . $i)->setValue($row['alokasibiaya1']);           
            $objSheet->getCell('BE' . $i)->setValue($row['alokasibiaya2']);           
            $objSheet->getCell('BF' . $i)->setValue($row['alokasibiaya3']);      
            */
            
        }
        
        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:AA' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AA' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AA1')->getBorders()->
                getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

        // autosize the columns
        $objSheet->getColumnDimension('A')->setAutoSize(true);
        $objSheet->getColumnDimension('B')->setAutoSize(true);
        $objSheet->getColumnDimension('C')->setAutoSize(true);
        $objSheet->getColumnDimension('D')->setAutoSize(true);
        $objSheet->getColumnDimension('E')->setAutoSize(true);
        $objSheet->getColumnDimension('F')->setAutoSize(true);
        $objSheet->getColumnDimension('G')->setAutoSize(true);
        $objSheet->getColumnDimension('H')->setAutoSize(true);
        $objSheet->getColumnDimension('I')->setAutoSize(true);
        $objSheet->getColumnDimension('J')->setAutoSize(true);
        $objSheet->getColumnDimension('K')->setAutoSize(true);
        $objSheet->getColumnDimension('L')->setAutoSize(true);
        $objSheet->getColumnDimension('M')->setAutoSize(true);
        $objSheet->getColumnDimension('N')->setAutoSize(true);
        $objSheet->getColumnDimension('O')->setAutoSize(true);
        $objSheet->getColumnDimension('P')->setAutoSize(true);
        $objSheet->getColumnDimension('Q')->setAutoSize(true);
        $objSheet->getColumnDimension('R')->setAutoSize(true);
        $objSheet->getColumnDimension('S')->setAutoSize(true);
        $objSheet->getColumnDimension('T')->setAutoSize(true);
        $objSheet->getColumnDimension('U')->setAutoSize(true);
        $objSheet->getColumnDimension('V')->setAutoSize(true);
        $objSheet->getColumnDimension('W')->setAutoSize(true);
        $objSheet->getColumnDimension('X')->setAutoSize(true);
        $objSheet->getColumnDimension('Y')->setAutoSize(true);
        $objSheet->getColumnDimension('Z')->setAutoSize(true);
        $objSheet->getColumnDimension('AA')->setAutoSize(true);
        /*
        $objSheet->getColumnDimension('AB')->setAutoSize(true);
        $objSheet->getColumnDimension('AC')->setAutoSize(true);
        $objSheet->getColumnDimension('AD')->setAutoSize(true);
        $objSheet->getColumnDimension('AE')->setAutoSize(true);
        $objSheet->getColumnDimension('AF')->setAutoSize(true);
        $objSheet->getColumnDimension('AG')->setAutoSize(true);
        $objSheet->getColumnDimension('AH')->setAutoSize(true);
        $objSheet->getColumnDimension('AI')->setAutoSize(true);
        $objSheet->getColumnDimension('AJ')->setAutoSize(true);
        $objSheet->getColumnDimension('AK')->setAutoSize(true);
        $objSheet->getColumnDimension('AL')->setAutoSize(true);
        $objSheet->getColumnDimension('AM')->setAutoSize(true);
        $objSheet->getColumnDimension('AN')->setAutoSize(true);
        $objSheet->getColumnDimension('AO')->setAutoSize(true);
        $objSheet->getColumnDimension('AP')->setAutoSize(true);
        $objSheet->getColumnDimension('AQ')->setAutoSize(true);
        $objSheet->getColumnDimension('AR')->setAutoSize(true);
        $objSheet->getColumnDimension('AS')->setAutoSize(true);
        $objSheet->getColumnDimension('AT')->setAutoSize(true);
        $objSheet->getColumnDimension('AU')->setAutoSize(true);
        $objSheet->getColumnDimension('AV')->setAutoSize(true);
        $objSheet->getColumnDimension('AW')->setAutoSize(true);
        $objSheet->getColumnDimension('AX')->setAutoSize(true);
        $objSheet->getColumnDimension('AY')->setAutoSize(true);
        $objSheet->getColumnDimension('AZ')->setAutoSize(true);
        $objSheet->getColumnDimension('BA')->setAutoSize(true);
        $objSheet->getColumnDimension('BB')->setAutoSize(true);
        $objSheet->getColumnDimension('BC')->setAutoSize(true);
        $objSheet->getColumnDimension('BD')->setAutoSize(true);
        $objSheet->getColumnDimension('BE')->setAutoSize(true);
        $objSheet->getColumnDimension('BF')->setAutoSize(true);
        */

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'cleansingdata';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
