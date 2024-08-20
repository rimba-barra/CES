<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 *
 * @author Ahmad Riadi
 */
class Hrd_Models_Transferapi_TransferapitransactionExport extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        // $this->setup->_storeprocedure = 'sp_report_training_export';        
        $this->destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/personal/exportdata/';
        $this->dbTable = new Box_Models_Dbtable_Db();
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($data) {
        $this->setup->_storeprocedure = 'sp_transaction_'.$data['process_api'].'_export';      
        $this->setup->_param = $data;
        $this->setup->_paramsql = 'read';
        $result = $this->setup->executeSP(); 
        
        if(!empty($result[0])){
            return $result[0];
        }else{
            return null;
        }
      
    }
    

    function exceldata($data) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
         
        $result = $this->getdata($data);
        // var_dump($result);die();
    
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
        // $title = 'Log_Transaction_'.$data['process_api_model'];
        $title = 'Log_'.$data['process_api_model'];
        $objSheet->setTitle($title);
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:N1')->getFont()->setBold(true)->setSize(12);
// print_r($row);die();
        // write header
        $objSheet->getCell('A1')->setValue('No.');
        $objSheet->getCell('B1')->setValue('Process Transaction');
        $objSheet->getCell('C1')->setValue('Process Month'); 
        $objSheet->getCell('D1')->setValue('Process Year');
        $objSheet->getCell('E1')->setValue('Process StartDate'); 
        $objSheet->getCell('F1')->setValue('Process EndDate');
        $objSheet->getCell('G1')->setValue('Status Transfer');
        $objSheet->getCell('H1')->setValue('Project');
        $objSheet->getCell('I1')->setValue('PT');    
        $objSheet->getCell('J1')->setValue('Employee');
        $objSheet->getCell('K1')->setValue('NIK Group');
        if($data['process_api'] == 'cutibesar'){
            $objSheet->getCell('L1')->setValue('Hire Date');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'attendance'){
            $objSheet->getCell('L1')->setValue('Total Attendance');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'medicalclaim'){
            $objSheet->getCell('L1')->setValue('Total Medical Claim');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'overtime'){
            $objSheet->getCell('L1')->setValue('Total Overtime');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'uangmakan'){
            $objSheet->getCell('L1')->setValue('Total Uang Makan');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'unpaidleave'){
            $objSheet->getCell('L1')->setValue('Total Unpaid Leave');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'saldocutibayar'){
            $objSheet->getCell('L1')->setValue('Total Saldo Cuti Dibayarkan');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'potongantransport'){
            $objSheet->getCell('L1')->setValue('Total Potongan Transport');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }
        elseif($data['process_api'] == 'saldocutiminus'){
            $objSheet->getCell('L1')->setValue('Sisa Cuti');
            $objSheet->getCell('M1')->setValue('Total Saldo Cuti Minus');
            $objSheet->getCell('N1')->setValue('Process By');
            $objSheet->getCell('O1')->setValue('Process On');
            $objSheet->getCell('P1')->setValue('Update HCMS');
        }
        else{
            $objSheet->getCell('L1')->setValue('');
            $objSheet->getCell('M1')->setValue('Process By');
            $objSheet->getCell('N1')->setValue('Process On');
        }

        $i = 1;
        $no_index = 0;
        foreach ($result as $row) {
            $i++;
            $no_index++;

            $objSheet->getCell('A' . $i)->setValue($no_index);  
            $objSheet->getCell('B' . $i)->setValue($data['process_api_model']);
            $objSheet->getCell('C' . $i)->setValue($row['processpayroll_month']);
            $objSheet->getCell('D' . $i)->setValue($row['processpayroll_year']);
            $objSheet->getCell('E' . $i)->setValue($row['processdata_from']);
            $objSheet->getCell('F' . $i)->setValue($row['processdata_end']);
            $objSheet->getCell('G' . $i)->setValue($row['status_transfer']);
            $objSheet->getCell('H' . $i)->setValue($row['project_name']);
            $objSheet->getCell('I' . $i)->setValue($row['pt_name']);
            $objSheet->getCell('J' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('K' . $i)->setValue($row['nik_group']);  
            if($data['process_api'] == 'cutibesar'){
                $objSheet->getCell('L' . $i)->setValue($row['hire_date']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            } 
            elseif($data['process_api'] == 'attendance'){
                $objSheet->getCell('L' . $i)->setValue($row['total_attendance']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'medicalclaim'){
                $objSheet->getCell('L' . $i)->setValue($row['total_medical_claim']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'overtime'){
                $objSheet->getCell('L' . $i)->setValue($row['total_overtime']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'uangmakan'){
                $objSheet->getCell('L' . $i)->setValue($row['total_uang_makan']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'unpaidleave'){
                $objSheet->getCell('L' . $i)->setValue($row['total_unpaid_leave']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'saldocutibayar'){
                $objSheet->getCell('L' . $i)->setValue($row['total_saldocuti_bayar']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'potongantransport'){
                $objSheet->getCell('L' . $i)->setValue($row['total_potongan_transport']);
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            elseif($data['process_api'] == 'saldocutiminus'){
                $objSheet->getCell('L' . $i)->setValue($row['sisa_cuti']);
                $objSheet->getCell('M' . $i)->setValue($row['total_saldocuti_minus']);
                $objSheet->getCell('N' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('O' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
                $objSheet->getCell('P' . $i)->setValue($row['update_hcms']);
            }

            else{
                $objSheet->getCell('L' . $i)->setValue('');
                $objSheet->getCell('M' . $i)->setValue($row['user_fullname']);
                $objSheet->getCell('N' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            }
            
           
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:P' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:P' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:P1')->getBorders()->
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

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportlog_transaction_'.$data['process_api'];
        $filedata = $this->destination . $filename . '_' . date('Ymd',strtotime($row['processdata_from'])) . '_' . date('Ymd',strtotime($row['processdata_end'])) . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . '_' . date('Ymd',strtotime($row['processdata_from'])) . '_' . date('Ymd',strtotime($row['processdata_end'])) . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
