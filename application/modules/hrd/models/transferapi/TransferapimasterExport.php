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
class Hrd_Models_Transferapi_TransferapimasterExport extends Zend_Db_Table_Abstract {

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
        $this->setup->_storeprocedure = 'sp_master_'.$data['process_api'].'_export';   
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
         
    
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getProperties()->setTitle("title")
                ->setDescription("description");

        // emaildata format, &euro; with < 0 being in red color
        $emaildataFormat = '#,#0.## \€;[Red]-#,#0.## \€';
        // number format, with thousands seperator and two decimal points.
        $numberFormat = '#,#0.##;[Red]-#,#0.##';

        if($data['process_api_model'] == 'Master'){
            // $total_sheet = 5;
            // $loop_data = 'dept,banding,group,jobfamily,position';
            $total_sheet = 4;
            $loop_data = 'dept,banding,group,position';
            // $total_sheet = 1;
            // $loop_data = 'position';
            $loop_data_detail = explode(',', $loop_data);
        }else{
            $total_sheet = 1;
            $loop_data_detail[] = 'employee';
        }

        // writer will create the first sheet for us, let's get it
        $objSheet = $objPHPExcel->getActiveSheet();
        
        $j = 0;

while ($j < $total_sheet) {
        
        //looping untuk dapetin master
        $data['process_api'] = $loop_data_detail[$j];

        $result = $this->getdata($data);
        //bikin sheet baru'
        if($j > 0){
            $objSheet = $objPHPExcel->createSheet($j);
        }

        // rename the sheet
        $title = 'Log_Master_'.$data['process_api'];
        $objSheet->setTitle($title);
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:BF1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No.');
        $objSheet->getCell('B1')->setValue('Process Master');
        $objSheet->getCell('C1')->setValue('Process By');
        $objSheet->getCell('D1')->setValue('Process On');
        $objSheet->getCell('E1')->setValue('Action (Status Transfer)');
        if($data['process_api'] == 'dept'){
            $objSheet->getCell('F1')->setValue('Project');
            $objSheet->getCell('G1')->setValue('PT');
            $objSheet->getCell('H1')->setValue('Department Name');
            $objSheet->getCell('I1')->setValue('Code');
        }
        elseif($data['process_api'] == 'banding'){
            $objSheet->getCell('F1')->setValue('Banding Name');
            $objSheet->getCell('G1')->setValue('Code');
        }
        elseif($data['process_api'] == 'group'){
            $objSheet->getCell('F1')->setValue('Project');
            $objSheet->getCell('G1')->setValue('PT');
            $objSheet->getCell('H1')->setValue('Group Name');
            $objSheet->getCell('I1')->setValue('Code');
        }
        elseif($data['process_api'] == 'jobfamily'){
            $objSheet->getCell('F1')->setValue('JobFamily Name');
            $objSheet->getCell('G1')->setValue('Code');
        }
        elseif($data['process_api'] == 'position'){
            $objSheet->getCell('F1')->setValue('Position Name');
            $objSheet->getCell('G1')->setValue('Description');
            $objSheet->getCell('H1')->setValue('Subholding Subname');
        }
        elseif($data['process_api'] == 'employee'){
            $objSheet->getCell('F1')->setValue('Project');
            $objSheet->getCell('G1')->setValue('PT');
            $objSheet->getCell('H1')->setValue('Employee Name');
            $objSheet->getCell('I1')->setValue('NIK Group');
            $objSheet->getCell('J1')->setValue('Employee NIK');
            $objSheet->getCell('K1')->setValue('Sex');
            $objSheet->getCell('L1')->setValue('Birth Place');
            $objSheet->getCell('M1')->setValue('Birth Date');
            $objSheet->getCell('N1')->setValue('ID Type');
            $objSheet->getCell('O1')->setValue('KTP Number');

            $objSheet->getCell('P1')->setValue('Marriage Status');
            $objSheet->getCell('Q1')->setValue('Nationality');
            $objSheet->getCell('R1')->setValue('NPWP');
            $objSheet->getCell('S1')->setValue('PTKP');
            $objSheet->getCell('T1')->setValue('Department');
            $objSheet->getCell('U1')->setValue('Banding');
            $objSheet->getCell('V1')->setValue('Group');
            $objSheet->getCell('W1')->setValue('Position');
            $objSheet->getCell('X1')->setValue('Employee Status');
            $objSheet->getCell('Y1')->setValue('Phone Number');

            $objSheet->getCell('Z1')->setValue('Email Ciputra');
            $objSheet->getCell('AA1')->setValue('Hire Date');
            $objSheet->getCell('AB1')->setValue('Contract End');
            $objSheet->getCell('AC1')->setValue('Payroll Group');
            $objSheet->getCell('AD1')->setValue('KTP Address');
            $objSheet->getCell('AE1')->setValue('Address');
            $objSheet->getCell('AF1')->setValue('Payroll Currency');
            $objSheet->getCell('AG1')->setValue('Payment Method');
            $objSheet->getCell('AH1')->setValue('Bank Rekening');
            $objSheet->getCell('AI1')->setValue('No Rekening');

            $objSheet->getCell('AJ1')->setValue('Nama Rekening');
            $objSheet->getCell('AK1')->setValue('Calendar');
            $objSheet->getCell('AL1')->setValue('Work Shift');
            $objSheet->getCell('AM1')->setValue('Tax Country');
            $objSheet->getCell('AN1')->setValue('Finger Print Code');
            $objSheet->getCell('AO1')->setValue('Cost Center Code');
            $objSheet->getCell('AP1')->setValue('No BPJS Kesehatan');
            $objSheet->getCell('AQ1')->setValue('No BPJS Ketenagakerjaan');
            $objSheet->getCell('AR1')->setValue('No BPJS Jaminan Pensiun');
            $objSheet->getCell('AS1')->setValue('No Manulife');

            $objSheet->getCell('AT1')->setValue('No Asuransi');
            $objSheet->getCell('AU1')->setValue('Worklocation');
            $objSheet->getCell('AV1')->setValue('Worklocation Project');
            $objSheet->getCell('AW1')->setValue('Worklocation PT');
            $objSheet->getCell('AX1')->setValue('Ibu Kandung');

            $objSheet->getCell('AY1')->setValue('Non Active Date');
            $objSheet->getCell('AZ1')->setValue('Hari Kerja Perminggu');
            $objSheet->getCell('BA1')->setValue('Alokasi Biaya');
            $objSheet->getCell('BB1')->setValue('Alokasi Biaya 2');
            $objSheet->getCell('BC1')->setValue('Alokasi Biaya 3');

            $objSheet->getCell('BD1')->setValue('Contract Start');
            $objSheet->getCell('BE1')->setValue('Consultant Start');
            $objSheet->getCell('BF1')->setValue('Consultant End');

        }
        else{
            $objSheet->getCell('F1')->setValue('');
        }


        $i = 1;
        $no_index = 0;
        foreach ($result as $row) {
            $i++;
            $no_index++;

            $objSheet->getCell('A' . $i)->setValue($no_index);  
            $objSheet->getCell('B' . $i)->setValue(ucfirst($data['process_api']));
            $objSheet->getCell('C' . $i)->setValue($row['user_fullname']);
            $objSheet->getCell('D' . $i)->setValue(date('Y-m-d H:i:s', strtotime($row['addon'])));
            $objSheet->getCell('E' . $i)->setValue(ucfirst($row['action_process']).' ('.ucfirst($row['status_transfer']).')');

            if($data['process_api'] == 'dept'){
                $objSheet->getCell('F' . $i)->setValue($row['project_name']);
                $objSheet->getCell('G' . $i)->setValue($row['pt_name']);
                $objSheet->getCell('H' . $i)->setValue($row['department_name']);
                $objSheet->getCell('I' . $i)->setValue($row['department_code']);
            }
            elseif($data['process_api'] == 'banding'){
                $objSheet->getCell('F' . $i)->setValue($row['banding_name']);
                $objSheet->getCell('G' . $i)->setValue($row['banding_code']);
            }
            elseif($data['process_api'] == 'group'){
                $objSheet->getCell('F' . $i)->setValue($row['project_name']);
                $objSheet->getCell('G' . $i)->setValue($row['pt_name']);
                $objSheet->getCell('H' . $i)->setValue($row['group_name']);
                $objSheet->getCell('I' . $i)->setValue($row['group_code']);
            }
            elseif($data['process_api'] == 'jobfamily'){
                $objSheet->getCell('F' . $i)->setValue($row['jobfamily_name']);
                $objSheet->getCell('G' . $i)->setValue($row['jobfamily_code']);
            }
            elseif($data['process_api'] == 'position'){
                $objSheet->getCell('F' . $i)->setValue($row['position_name']);
                $objSheet->getCell('G' . $i)->setValue($row['position_description']);
                $objSheet->getCell('H' . $i)->setValue($row['position_subholding_subname']);
            }
            elseif($data['process_api'] == 'employee'){
                $objSheet->getCell('F'. $i)->setValue($row['project_name']);
                $objSheet->getCell('G'. $i)->setValue($row['pt_name']);
                $objSheet->getCell('H'. $i)->setValue($row['employee_name']);
                $objSheet->getCell('I'. $i)->setValue($row['nik_group']);
                $objSheet->getCell('J'. $i)->setValue($row['employee_nik']);
                $objSheet->getCell('K'. $i)->setValue($row['sex']);
                $objSheet->getCell('L'. $i)->setValue($row['birth_place']);
                $objSheet->getCell('M'. $i)->setValue($row['birth_date']);
                $objSheet->getCell('N'. $i)->setValue($row['id_type']);
                $objSheet->getCell('O'. $i)->setValue($row['ktp_number']);

                $objSheet->getCell('P'. $i)->setValue($row['marriagestatus_marriagestatus']);
                $objSheet->getCell('Q'. $i)->setValue($row['nationality']);
                $objSheet->getCell('R'. $i)->setValue($row['npwp']);
                $objSheet->getCell('S'. $i)->setValue($row['ptkp_code']);
                $objSheet->getCell('T'. $i)->setValue($row['department_department']);
                $objSheet->getCell('U'. $i)->setValue($row['banding_banding']);
                $objSheet->getCell('V'. $i)->setValue($row['group_code']);
                $objSheet->getCell('W'. $i)->setValue($row['position_position']);
                $objSheet->getCell('X'. $i)->setValue($row['employeestatus_employeestatus']);
                $objSheet->getCell('Y'. $i)->setValue($row['phone_number']);

                $objSheet->getCell('Z'. $i)->setValue($row['email_ciputra']);
                $objSheet->getCell('AA'. $i)->setValue($row['statusinformation_hire_date']);
                $objSheet->getCell('AB'. $i)->setValue($row['statusinformation_contract_end']);
                $objSheet->getCell('AC'. $i)->setValue($row['payroll_group']);
                $objSheet->getCell('AD'. $i)->setValue($row['ktp_address']);
                $objSheet->getCell('AE'. $i)->setValue($row['address']);
                $objSheet->getCell('AF'. $i)->setValue($row['payroll_currency']);
                $objSheet->getCell('AG'. $i)->setValue($row['payment_method']);
                $objSheet->getCell('AH'. $i)->setValue($row['bank_rekening']);
                $objSheet->getCell('AI'. $i)->setValue($row['nomor_rekening']);

                $objSheet->getCell('AJ'. $i)->setValue($row['nama_rekening']);
                $objSheet->getCell('AK'. $i)->setValue($row['calendar_company']);
                $objSheet->getCell('AL'. $i)->setValue($row['work_shift']);
                $objSheet->getCell('AM'. $i)->setValue($row['tax_country_code']);
                $objSheet->getCell('AN'. $i)->setValue($row['fingerprintcode']);
                $objSheet->getCell('AO'. $i)->setValue($row['cost_center_code']);
                $objSheet->getCell('AP'. $i)->setValue($row['no_bpjs_k']);
                $objSheet->getCell('AQ'. $i)->setValue($row['no_bpjs_kk']);
                $objSheet->getCell('AR'. $i)->setValue($row['no_bpjs_pp']);
                $objSheet->getCell('AS'. $i)->setValue($row['no_manulife_p']);

                $objSheet->getCell('AT'. $i)->setValue($row['no_asuransi']);
                $objSheet->getCell('AU'. $i)->setValue($row['worklocation']);
                $objSheet->getCell('AV'. $i)->setValue($row['worklocation_project']);
                $objSheet->getCell('AW'. $i)->setValue($row['worklocation_pt']);
                $objSheet->getCell('AX'. $i)->setValue($row['ibu_kandung']);

                $objSheet->getCell('AY'. $i)->setValue($row['nonactive_date']);
                $objSheet->getCell('AZ'. $i)->setValue($row['hari_kerja_perminggu']);
                $objSheet->getCell('BA'. $i)->setValue($row['name_alokasibiaya']);
                $objSheet->getCell('BB'. $i)->setValue($row['name_alokasibiaya2']);
                $objSheet->getCell('BC'. $i)->setValue($row['name_alokasibiaya3']);

                $objSheet->getCell('BD'. $i)->setValue($row['statusinformation_contract_start']);
                $objSheet->getCell('BE'. $i)->setValue($row['statusinformation_consultant_start']);
                $objSheet->getCell('BF'. $i)->setValue($row['statusinformation_consultant_end']);
            }
            else{
                $objSheet->getCell('E1')->setValue('');
            }
           
        }

        // create some borders
        // first, create the whole grid around the table

        if($data['process_api'] == 'dept'){
            $objSheet->getStyle('A1:I' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:I' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:I1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }
        elseif($data['process_api'] == 'banding'){
            $objSheet->getStyle('A1:G' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:G' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:G1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }
        elseif($data['process_api'] == 'group'){
            $objSheet->getStyle('A1:I' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:I' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:I1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }
        elseif($data['process_api'] == 'jobfamily'){
            $objSheet->getStyle('A1:G' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:G' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:G1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }
        elseif($data['process_api'] == 'position'){
            $objSheet->getStyle('A1:H' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:H' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:H1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }
        elseif($data['process_api'] == 'employee'){
            $objSheet->getStyle('A1:BC' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:BC' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:BC1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }
        else{
            $objSheet->getStyle('A1:E' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:E' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:E1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        }

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
        
        $j++;
}

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportlog_master_'.strtolower($data['process_api_model']);
        $filedata = $this->destination . $filename . '_' . date('Ymd',strtotime($row['addon'])). '_' . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . '_' . date('Ymd',strtotime($row['addon'])). '_' . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
