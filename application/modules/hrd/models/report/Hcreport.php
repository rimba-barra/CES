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
class Hrd_Models_Report_Hcreport extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setting = new Hrd_Models_General_Setup();      
        $this->destination = getcwd() . '/app/hrd/uploads/report/';
        $this->httpdirect = 'app/hrd/uploads/report/';
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($data) {
        if($data['report_type'] == 'quarterly'){
            $this->setting->_storeprocedure = 'sp_report_quarterly';
            $sp_data = array(
                $data['asof_date'],
                1,
                0
            );
            $result = $this->setting->executeSPReport($sp_data);
        }elseif($data['report_type'] == 'annual'){
            $this->setting->_storeprocedure = 'sp_report_quarterly';
            $sp_data = array(
                $data['asof_date'],
                0,
                1
            );
            $result = $this->setting->executeSPReport($sp_data);
        }elseif($data['report_type'] == 'annual_raw'){
            $this->setting->_storeprocedure = 'sp_report_annual_raw';
            $sp_data = array(
                $data['asof_date'],
                0,
                1
            );
            $result = $this->setting->executeSPReport($sp_data);
        }

        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
      
    }

    public function getdata_coltotal() {
        $this->setting->_storeprocedure = 'sp_report_annual_col_total';
        $sp_data = array(
            1,
            1
        );
         $result = $this->setting->executeSPReport($sp_data);

        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
      
    }

    public function getdata_view() {
        $this->setting->_storeprocedure = 'sp_report_annual_view';
        $sp_data = array(
            1,
            99
        );
         $result = $this->setting->executeSPReport($sp_data);

        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
      
    }

    public function getdata_olddata($param_olddata) {
        $this->setting->_storeprocedure = 'sp_report_annual_olddata';
        $sp_data = array(
            $param_olddata['tbk_id'],
            $param_olddata['year']
        );
         $result = $this->setting->executeSPReport($sp_data);

        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
      
    }
    
    
    function exceldata($data) {
        
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        $result = $this->getdata($data);
        
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
        $objSheet->setTitle('Quarterly Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:V1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('Subholding');    
        $objSheet->getCell('B1')->setValue('Project');   
        $objSheet->getCell('C1')->setValue('PT');
        $objSheet->getCell('D1')->setValue('Permanent');
        //added by anas 18032022
        $objSheet->getCell('E1')->setValue('Kontrak');
        $objSheet->getCell('F1')->setValue('Total');
        //end added by anas
        
        $i = 1;
        foreach ($result as $row) {
            $i++;

            $objSheet->getCell('A' . $i)->setValue($row['subholding']);    
            $objSheet->getCell('B' . $i)->setValue($row['project']);
            $objSheet->getCell('C' . $i)->setValue($row['pt']);
            $objSheet->getCell('D' . $i)->setValue($row['permanent']);  
            //added by anas 18032022
            $objSheet->getCell('E' . $i)->setValue($row['kontrak']);
            $objSheet->getCell('F' . $i)->setValue($row['total']);
            //end added by anas
        }
        
        $sum = '=SUM(D1:D'.$i.')'; 
        //added by anas 18032022
        $sumK = '=SUM(E1:E'.$i.')';
        $sumT = '=SUM(F1:F'.$i.')';
        //end added by anas

        $i++;
        $objSheet->getCell('C' . $i)->setValue('Total');
        $objSheet->getCell('D' . $i)->setValue($sum); 
        //added by anas 18032022
        $objSheet->getCell('E' . $i)->setValue($sumK);
        $objSheet->getCell('F' . $i)->setValue($sumT);
        //end added by anas

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:F' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:F' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:F1')->getBorders()->
                getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

        // autosize the columns
        $objSheet->getColumnDimension('A')->setAutoSize(true);
        $objSheet->getColumnDimension('B')->setAutoSize(true);
        $objSheet->getColumnDimension('C')->setAutoSize(true);
        $objSheet->getColumnDimension('D')->setAutoSize(true); 
        //added by anas 18032022
        $objSheet->getColumnDimension('E')->setAutoSize(true);
        $objSheet->getColumnDimension('F')->setAutoSize(true);
        //end added by anas

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();

        //updated by anas 13092023
        $time = explode('.', microtime());
        $postfix = substr($time[1], 0, 5);
        $filename = 'QuarterlyReport' . date('Ymd') . "_" . $this->setting->_user_id . "_" . $postfix;

        $filedata = $this->destination . $filename . ".xls";
        $directfile = $this->httpdirect . $filename . ".xls";

        //insert ke table log
        $project_id = $data["project_project_id"];
        $pt_id = $data["pt_pt_id"];
        $report_type = $data["report_type"];
        $asof_date = $data["asof_date"];
        $report_filename = $filename . ".xls";

        $this->insert_hcreport_log($this->setting->_user_id, $project_id, $pt_id, $report_type, $asof_date, $report_filename);
        //end updated by anas

        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

    function exceldata_annual($data) {
        
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        $result = $this->getdata($data);
        // print_r(sprintf("#%02x%02x%02x", 219, 219, 219));die();
        // print_r($result);die();
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
        $objSheet->setTitle('Annual Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4

        $headStyle_empinti = array(
            'font'  => array(
                                'bold'  => false,
                                'color' => array('rgb' => 'FF0000'),
                                'size'  => 10,
                                // 'name'  => 'Arial'
            )
        );

        $headStyle_content = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'font'  => array(
                                'bold'  => true,
                                'size'  => 12,
            )
        );

        $bodyStyle_content = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            )
        );

        $bodyStyle_projectpt = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            )
        );

        $footStyle_jumlah = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
            ),
            'font'  => array(
                                'bold'  => true,
            )
        );

        // --- HEADER ---
        $objSheet->getStyle('A1:A3')->getFont()->setBold(true)->setSize(12);

        $objSheet->getCell('A1')->setValue('CIPUTRA GROUP (Data All Group)'); 
        $objSheet->mergeCells('A1:G1');
        $objSheet->getCell('A2')->setValue('KOMPOSISI KARYAWAN INTI'); 
        $objSheet->mergeCells('A2:G2');
        $objSheet->getCell('A3')->setValue("".date('d F Y',strtotime($data['asof_date']))); 
        $objSheet->mergeCells('A3:G3');
        // --- HEADER ---

        // --- BODY ---

        // --- SUBBODY ---
        // --- SUBBODY LEFT (STATUS) ---
        $objSheet->getCell('A5')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A5')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A6')->setValue('STATUS');
        $objSheet->getStyle('A6')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A6:B8');

        $objSheet->getCell('A9')->setValue('Tetap');
        $objSheet->getStyle('A9')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A9:A10');
        $objSheet->getCell('B9')->setValue('Laki-Laki');
        $objSheet->getCell('B10')->setValue('Perempuan');

        $objSheet->getCell('A11')->setValue('Kontrak');
        $objSheet->getStyle('A11')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A11:A12');
        $objSheet->getCell('B11')->setValue('Laki-Laki');
        $objSheet->getCell('B12')->setValue('Perempuan');

        $objSheet->getCell('A13')->setValue('Jumlah');
        $objSheet->getStyle('A13')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A13:B13');

        $objSheet->getStyle('A6:B13')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (STATUS) ---

        // --- SUBBODY LEFT (PENDIDIKAN) ---
        $objSheet->getCell('A17')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A17')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A18')->setValue('JENJANG PENDIDIKAN');
        $objSheet->getStyle('A18')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A18:B20');

        $objSheet->getCell('A21')->setValue('S3');
        $objSheet->getStyle('A21')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A21:A22');
        $objSheet->getCell('B21')->setValue('Laki-Laki');
        $objSheet->getCell('B22')->setValue('Perempuan');

        $objSheet->getCell('A23')->setValue('S2');
        $objSheet->getStyle('A23')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A23:A24');
        $objSheet->getCell('B23')->setValue('Laki-Laki');
        $objSheet->getCell('B24')->setValue('Perempuan');

        $objSheet->getCell('A25')->setValue('Profesi');
        $objSheet->getStyle('A25')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A25:A26');
        $objSheet->getCell('B25')->setValue('Laki-Laki');
        $objSheet->getCell('B26')->setValue('Perempuan');

        $objSheet->getCell('A27')->setValue('S1');
        $objSheet->getStyle('A27')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A27:A28');
        $objSheet->getCell('B27')->setValue('Laki-Laki');
        $objSheet->getCell('B28')->setValue('Perempuan');

        $objSheet->getCell('A29')->setValue('SP-2');
        $objSheet->getStyle('A29')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A29:A30');
        $objSheet->getCell('B29')->setValue('Laki-Laki');
        $objSheet->getCell('B30')->setValue('Perempuan');

        $objSheet->getCell('A31')->setValue('SP-1');
        $objSheet->getStyle('A31')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A31:A32');
        $objSheet->getCell('B31')->setValue('Laki-Laki');
        $objSheet->getCell('B32')->setValue('Perempuan');

        $objSheet->getCell('A33')->setValue('Diploma (D3/D4)');
        $objSheet->getStyle('A33')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A33:A34');
        $objSheet->getCell('B33')->setValue('Laki-Laki');
        $objSheet->getCell('B34')->setValue('Perempuan');

        $objSheet->getCell('A35')->setValue('Diploma (D1/D2)');
        $objSheet->getStyle('A35')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A35:A36');
        $objSheet->getCell('B35')->setValue('Laki-Laki');
        $objSheet->getCell('B36')->setValue('Perempuan');

        $objSheet->getCell('A37')->setValue('SMU/SMK');
        $objSheet->getStyle('A37')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A37:A38');
        $objSheet->getCell('B37')->setValue('Laki-Laki');
        $objSheet->getCell('B38')->setValue('Perempuan');

        $objSheet->getCell('A39')->setValue('SMP');
        $objSheet->getStyle('A39')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A39:A40');
        $objSheet->getCell('B39')->setValue('Laki-Laki');
        $objSheet->getCell('B40')->setValue('Perempuan');

        $objSheet->getCell('A41')->setValue('SD');
        $objSheet->getStyle('A41')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A41:A42');
        $objSheet->getCell('B41')->setValue('Laki-Laki');
        $objSheet->getCell('B42')->setValue('Perempuan');

        $objSheet->getCell('A43')->setValue('Others');
        $objSheet->getStyle('A43')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A43:A44');
        $objSheet->getCell('B43')->setValue('Laki-Laki');
        $objSheet->getCell('B44')->setValue('Perempuan');

        $objSheet->getCell('A45')->setValue('Jumlah');
        $objSheet->getStyle('A45')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A45:B45');

        $objSheet->getStyle('A18:B45')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (PENDIDIKAN) ---
        
        // --- SUBBODY LEFT (KARIR) ---
        $objSheet->getCell('A48')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A48')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A49')->setValue('JENJANG KARIR');
        $objSheet->getStyle('A49')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A49:B51');

        $objSheet->getCell('A52')->setValue('Executive (Direktur)');
        $objSheet->getStyle('A52')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A52:A53');
        $objSheet->getCell('B52')->setValue('Laki-Laki');
        $objSheet->getCell('B53')->setValue('Perempuan');

        $objSheet->getCell('A54')->setValue('Executive (Ast. Direktur)');
        $objSheet->getStyle('A54')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A54:A55');
        $objSheet->getCell('B54')->setValue('Laki-Laki');
        $objSheet->getCell('B55')->setValue('Perempuan');

        $objSheet->getCell('A56')->setValue('General Manager');
        $objSheet->getStyle('A56')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A56:A57');
        $objSheet->getCell('B56')->setValue('Laki-Laki');
        $objSheet->getCell('B57')->setValue('Perempuan');

        $objSheet->getCell('A58')->setValue('Manager');
        $objSheet->getStyle('A58')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A58:A59');
        $objSheet->getCell('B58')->setValue('Laki-Laki');
        $objSheet->getCell('B59')->setValue('Perempuan');

        $objSheet->getCell('A60')->setValue('Coordinator');
        $objSheet->getStyle('A60')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A60:A61');
        $objSheet->getCell('B60')->setValue('Laki-Laki');
        $objSheet->getCell('B61')->setValue('Perempuan');

        $objSheet->getCell('A62')->setValue('Officer');
        $objSheet->getStyle('A62')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A62:A63');
        $objSheet->getCell('B62')->setValue('Laki-Laki');
        $objSheet->getCell('B63')->setValue('Perempuan');

        $objSheet->getCell('A64')->setValue('Support Staff');
        $objSheet->getStyle('A64')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A64:A65');
        $objSheet->getCell('B64')->setValue('Laki-Laki');
        $objSheet->getCell('B65')->setValue('Perempuan');

        $objSheet->getCell('A66')->setValue('[NOT SET]');
        $objSheet->getStyle('A66')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A66:A67');
        $objSheet->getCell('B66')->setValue('Laki-Laki');
        $objSheet->getCell('B67')->setValue('Perempuan');

        $objSheet->getCell('A68')->setValue('Jumlah');
        $objSheet->getStyle('A68')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A68:B68');

        $objSheet->getStyle('A49:B68')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (KARIR) ---

        // --- SUBBODY LEFT (USIA) ---
        $objSheet->getCell('A71')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A71')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A72')->setValue('USIA');
        $objSheet->getStyle('A72')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A72:A74');

        $objSheet->getCell('A75')->setValue('<30');
        $objSheet->getStyle('A75')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A75:A76');
        $objSheet->getCell('B75')->setValue('Laki-Laki');
        $objSheet->getCell('B76')->setValue('Perempuan');

        $objSheet->getCell('A77')->setValue('30-45');
        $objSheet->getStyle('A77')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A77:A78');
        $objSheet->getCell('B77')->setValue('Laki-Laki');
        $objSheet->getCell('B78')->setValue('Perempuan');

        $objSheet->getCell('A79')->setValue('>45');
        $objSheet->getStyle('A79')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A79:A80');
        $objSheet->getCell('B79')->setValue('Laki-Laki');
        $objSheet->getCell('B80')->setValue('Perempuan');

        $objSheet->getCell('A81')->setValue('Jumlah');
        $objSheet->getStyle('A81')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A81:B81');

        $objSheet->getStyle('A72:B81')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (USIA) ---

        // --- SUBBODY LEFT (TURNOVER) ---
        $objSheet->getCell('A84')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A84')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A85')->setValue('TURNOVER');
        $objSheet->getStyle('A85')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A85:A87');

        $objSheet->getCell('A88')->setValue('<30');
        $objSheet->getStyle('A88')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A88:A89');
        $objSheet->getCell('B88')->setValue('Laki-Laki');
        $objSheet->getCell('B89')->setValue('Perempuan');

        $objSheet->getCell('A90')->setValue('30-45');
        $objSheet->getStyle('A90')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A90:A91');
        $objSheet->getCell('B90')->setValue('Laki-Laki');
        $objSheet->getCell('B91')->setValue('Perempuan');

        $objSheet->getCell('A92')->setValue('>45');
        $objSheet->getStyle('A92')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A92:A93');
        $objSheet->getCell('B92')->setValue('Laki-Laki');
        $objSheet->getCell('B93')->setValue('Perempuan');

        $objSheet->getCell('A94')->setValue('Jumlah');
        $objSheet->getStyle('A94')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A94:B94');

        $objSheet->getStyle('A85:B94')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (TURNOVER) ---
        
        // --- SUBBODY RIGHT ---

        // --- Tulisan CTRA/NTBK ---
        for ($letter = 'C'; $letter != 'EO'; $letter++) {     
            if($letter == 'P' || $letter == 'AD' || $letter == 'AE' || $letter == 'AG' || $letter == 'AH' || $letter == 'AI' || $letter == 'AK' || $letter == 'AL' || $letter == 'AM' || $letter == 'AR' || $letter == 'AU' || $letter == 'AV' || $letter == 'BA' || $letter == 'BD' || $letter == 'BU' || $letter == 'BX' || $letter == 'BZ' || $letter == 'CA' || $letter == 'CB' || $letter == 'CC' || $letter == 'CD' || $letter == 'CE' || $letter == 'CF' || $letter == 'CG' || $letter == 'CH' || $letter == 'CI' || $letter == 'CJ' || $letter == 'CL' || $letter == 'DJ' || $letter == 'DK' || $letter == 'DN' || $letter == 'EE' || $letter == 'EF' || $letter == 'EG'){

                $headStyle_ntbk = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => '8497b0')
                    ),
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    )
                );

                $objSheet->getCell($letter.'4')->setValue('NTBK');
                $objSheet->getStyle($letter.'4')->applyFromArray($headStyle_ntbk);
            }else{
                $headStyle_ctra = array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    )
                );

                $objSheet->getCell($letter.'4')->setValue('CTRA');
                $objSheet->getStyle($letter.'4')->applyFromArray($headStyle_ctra);
            }
        }
        $objSheet->getCell('ES4')->setValue('CTRA');
        // --- Tulisan CTRA/NTBK ---

        // --- Tulisan keterangan dibawah CTRA/NTBK ---
        $list = array
        (
        'C' => 'KP',
        'D' => 'CitraRaya Tangerang',
        'E' => 'CitraRaya Tangerang',
        'F' => 'Citra Sentul Raya',
        'G' => 'Citra Maja Raya',
        'H' => 'Citra Maja Raya',
        'I' => 'CitraGarden City Malang',
        'J' => 'CitraGarden City Samarinda',
        'K' => 'CitraLand City Samarinda',
        'L' => 'CitraCity Balikpapan',
        'M' => 'CitraGrand Senyiur City Samarinda',
        'N' => 'CitraLand Waterpark Samarinda',
        'O' => 'CitraGarden City Jakarta',
        'P' => 'CitraGarden City Jakarta (NCI)',
        'Q' => 'Citra Towers Kemayoran',
        'R' => 'Citra Plaza Kemayoran',
        'S' => 'CitraGarden BMW Cilegon',
        'T' => 'CitraGrand City Palembang',
        'U' => 'CitraRaya City Jambi',
        'V' => 'CitraGarden Aneka Pontianak',
        'W' => 'Citra Aerolink Batam',
        'X' => 'CitraPlaza Nagoya',
        'Y' => 'CitraGarden Puri Jakarta',
        'Z' => 'CitraLake Sawangan Depok',
        'AA' => 'CitraGarden City - CitraLake Suites',
        'AB' => 'CitraGarden City - Citra Living',
        'AC' => 'CitraLand Megah Batam',
        'AD' => 'Ciputra Artpreneur',
        'AE' => 'Century21',
        'AF' => 'Barsa City Yogyakarta',
        'AG' => 'BizPark 3 Bekasi',
        'AH' => 'BizPark Bandung',
        'AI' => 'Ciputra Entreprenurship Center',
        'AJ' => 'Ciputra Golf, Club & Hotel',
        'AK' => 'Mal Ciputra Cibubur',
        'AL' => 'Ciputra School of Business Makassar',
        'AM' => 'Ciputra Seraya Mal Pekanbaru',
        'AN' => 'Ciputra World Surabaya - Mal',
        'AO' => 'Ciputra World Surabaya - Apartment',
        'AP' => 'Ciputra World Surabaya - Project',
        'AQ' => 'CitraGarden Bandar Lampung',
        'AR' => 'CitraGarden Medan',
        'AS' => 'CitraGarden Pekanbaru',
        'AT' => 'CitraGarden Sidoarjo',
        'AU' => 'CitraGran Cibubur',
        'AV' => 'CitraGrand Cibubur CBD',
        'AW' => 'CitraGrand Mutiara Yogyakarta',
        'AX' => 'CitraGrand Semarang', 
        'AY' => 'CitraHarmoni Sidoarjo',   
        'AZ' => 'CitraIndah City Jonggol', 
        'BA' => 'CitraLand Ambon', 
        'BB' => 'CitraLand Bandar Lampung',    
        'BC' => 'CitraLand Cibubur',   
        'BD' => 'CitraLand City East Jakarta', 
        'BE' => 'CitraLand City Losari Makassar',  
        'BF' => 'CitraLand Driyorejo CBD', 
        'BG' => 'CitraLand Gama City Medan',   
        'BH' => 'CitraLand Kedamean',  
        'BI' => 'CitraLand Kendari',   
        'BJ' => 'CitraLand Kota Deli Megapolitan', 
        'BK' => 'CitraLand Puncak Tidar Malang',   
        'BL' => 'CitraLand Palembang', 
        'BM' => 'CitraLand Palu',  
        'BN' => 'CitraLand Pekanbaru', 
        'BO' => 'CitraLand Setiabudi Bandung', 
        'BP' => 'CitraLand Surabaya',  
        'BQ' => 'CitraLand Tallasa City Makassar', 
        'BR' => 'CitraLand The GreenLake Surabaya',    
        'BS' => 'CitraLand Surabaya - CitraLand Utara',    
        'BT' => 'CitraLand Vittorio Wiyung Surabaya',  
        'BU' => 'CitraLand Winangun Manado',   
        'BV' => 'CitraSun Garden Semarang',    
        'BW' => 'KP SH2',  
        'BX' => 'KP SH2 - Sekolah',    
        'BY' => 'KP SH2',  
        'BZ' => 'Memorial Park Surabaya',  
        'CA' => 'Sekolah Ciputra Surabaya',    
        'CB' => 'Sekolah Citra Berkat',    
        'CC' => 'Sekolah Citra Berkat',    
        'CD' => 'Sekolah Citra Berkat',    
        'CE' => 'Sekolah Citra Berkat',    
        'CF' => 'Sekolah Citra Kasih', 
        'CG' => 'Sekolah Citra Kasih', 
        'CH' => 'Sekolah Citra Kasih', 
        'CI' => 'Sekolah Citra Kasih', 
        'CJ' => 'Sekolah Citra Kasih', 
        'CK' => 'The Taman Dayu Pandaan',  
        'CL' => 'Universitas Ciputra Surabaya',    
        'CM' => 'Mal Ciputra Jakarta', 
        'CN' => 'Hotel Ciputra Jakarta',   
        'CO' => 'Mal Ciputra Semarang',    
        'CP' => 'Hotel Ciputra Semarang',  
        'CQ' => 'KP SH3A', 
        'CR' => 'CWJ 1',   
        'CS' => 'CWJ 1',   
        'CT' => 'CWJ 1',   
        'CU' => 'CWJ 2',   
        'CV' => 'CWJ 2',   
        'CW' => 'CWJ 2',   
        'CX' => 'CPT', 
        'CY' => 'CPT', 
        'CZ' => 'CPT', 
        'DA' => 'CPT', 
        'DB' => 'CitraLand Mark - Ciracas',    
        'DC' => 'CitraLand BSB City Semarang', 
        'DD' => 'CitraDream Hotel',    
        'DE' => 'CitraDream Hotel',    
        'DF' => 'Ciputra Beach Resort',    
        'DG' => 'Ciputra Beach Resort',    
        'DH' => 'Raffles Hotel Jakarta',   
        'DI' => 'Raffles Residence',   
        'DJ' => 'Linhu New City',  
        'DK' => 'Citra Hasmore Kuliner',   
        'DL' => 'Ciputra World Jakarta 2 - The Newton 1',  
        'DM' => 'Ciputra World Jakarta 2 - The Newton 2',  
        'DN' => 'Outsource SH3A',  
        'DO' => 'KP SH3B', 
        'DP' => 'CitraGarden Banjarmasin', 
        'DQ' => 'CitraLand Banjarmasin',   
        'DR' => 'BizPark Banjarmasin', 
        'DS' => 'Citra BukitIndah Balikpapan', 
        'DT' => 'CitraLand Celebes Makassar',  
        'DU' => 'CitraGarden Gowa',    
        'DV' => 'Vida View Makassar',  
        'DW' => 'CitraGrand Galesong City Gowa',   
        'DX' => 'CitraMitra City Banjarbaru',  
        'DY' => 'CitraLand NGK Jambi', 
        'DZ' => 'CitraLand Botanical City Pangkal Pinang', 
        'EA' => 'CitraLand Cirebon',   
        'EB' => 'CitraLand Tegal', 
        'EC' => 'CitraGarden Pekalongan',  
        'ED' => 'CitraLand Puri Serang',   
        'EE' => 'Ciputra Plantation Indonesia',    
        'EF' => 'Ciputra Plantation Indonesia',    
        'EG' => 'Ciputra Plantation Indonesia',    
        'EH' => 'Ciputra Hospital',    
        'EI' => 'Ciputra Hospital',    
        'EJ' => 'Ciputra Hospital',    
        'EK' => 'Ciputra Hospital',    
        'EL' => 'Ciputra Hospital',    
        'EM' => 'Ciputra Hospital',    
        'EN' => 'Ciputra Hospital'
        );

        foreach($list as $key =>$item){
            $headStyle_list = array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    )
                );

            $objSheet->getCell($key.'5')->setValue($item);
            $objSheet->getStyle($key.'5')->applyFromArray($headStyle_list);
        }
        // --- Tulisan keterangan dibawah CTRA/NTBK ---

        // --- Tulisan subholding ---
        $subholding = array(
        'C' => 'Kantor Pusat',
        'D' => 'SUB HOLDING 1',
        'AF' => 'SUB HOLDING 2',
        'CM' => 'SUB HOLDING 3A',
        'DO' => 'SUB HOLDING 3B',
        'EH' => 'Ciputra Hospital'
        );

        $bodyStyle_projectpt_color1_kp = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '92d050')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh1 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'acb9ca')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh2 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ffff00')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh3a = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'f8cbad')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh3b = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ff66cc')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh4 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '92d050')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );

        // --- Array Location print subholding ---
        // --- Status = 6, Pendidikan = 18, Karir = 49, Usia = 72, Turnover = 85
        $location = array(6,18,49,72,85);

        foreach($subholding as $key =>$item){
            if($key == 'C'){
                $style = $bodyStyle_projectpt_color1_kp;
                $merge = '';
            }elseif($key == 'D'){
                $style = $bodyStyle_projectpt_color1_sh1;
                $merge = 'AE';
            }elseif($key == 'AF'){
                $style = $bodyStyle_projectpt_color1_sh2;
                $merge = 'CL';
            }elseif($key == 'CM'){
                $style = $bodyStyle_projectpt_color1_sh3a;
                $merge = 'DN';
            }elseif($key == 'DO'){
                $style = $bodyStyle_projectpt_color1_sh3b;
                $merge = 'EG';
            }elseif($key == 'EH'){
                $style = $bodyStyle_projectpt_color1_sh4;
                $merge = 'EN';
            }

            // --- Tulisan subholding (STATUS) ---
            // $objSheet->getCell($key.'6')->setValue($item);
            // $objSheet->getStyle($key.'6')->applyFromArray($style);
            // --- Tulisan subholding (STATUS) ---
            
            foreach($location as $key_item => $item_item){
                $objSheet->getCell($key.$item_item)->setValue($item);
                $objSheet->getStyle($key.$item_item)->applyFromArray($style);
            }

            if($merge){
                // --- Tulisan subholding (STATUS) ---
                // $objSheet->mergeCells($key.'6:'.$merge.'6');
                // --- Tulisan subholding (STATUS) ---

                foreach($location as $key_item => $item_item){
                    $objSheet->mergeCells($key.$item_item.':'.$merge.$item_item);
                }
            }
        }    
        // --- Tulisan subholding ---

        // --- Tulisan Project ---
        $project = array
        (
        'C' => 'CD',

        'D' => 'CitraRaya Tangerang',
        'E' => 'Mal Ciputra Tangerang',
        'F' => 'Citra Sentul Raya',
        'G' => 'Citra Maja Raya',
        'H' => '',
        'I' => 'CitraGarden City Malang',
        'J' => 'CitraGarden City Samarinda',
        'K' => 'CitraLand City Samarinda',
        'L' => 'CitraCity Balikpapan',
        'M' => 'CitraGrand Senyiur City Samarinda',
        'N' => 'CitraLand Waterpark Samarinda',
        'O' => 'CitraGarden City Jakarta',
        'P' => "CitraGarden City\n(KII)",
        'Q' => 'Citra Towers Kemayoran',
        'R' => 'Citra Plaza Kemayoran',
        'S' => 'CitraGarden BMW (Cilegon)',
        'T' => 'CitraGrand City Palembang',
        'U' => 'CitraRaya City Jambi',
        'V' => 'CitraGarden Aneka Pontianak',
        'W' => 'Citra Aerolink Batam',
        'X' => 'Citra Plaza Nagoya Batam',
        'Y' => 'CitraGarden Puri Jakarta',
        'Z' => 'CitraLake Sawangan Depok',
        'AA' => 'CitraLake Suites Jakarta',
        'AB' => 'Citra Living Jakarta',
        'AC' => 'CitraLand Megah Batam',
        'AD' => 'Ciputra Artpreneur',
        'AE' => 'Century21',

        'AF' => 'Barsa City Yogyakarta',
        'AG' => 'BizPark 3 Bekasi',
        'AH' => 'BizPark Bandung',
        'AI' => 'Ciputra Entreprenurship Center',
        'AJ' => 'Ciputra Golf, Club & Resto',
        'AK' => 'Ciputra Mal Cibubur',
        'AL' => 'Ciputra School of Business Makassar',
        'AM' => 'Ciputra Seraya Mal Pekanbaru',
        'AN' => 'Ciputra World Mal Surabaya',
        'AO' => 'Ciputra World Surabaya - Apartment',
        'AP' => 'Ciputra World Surabaya - Project',
        'AQ' => 'CitraGarden Lampung',
        'AR' => 'CitraGarden Medan',
        'AS' => 'CitraGarden Pekanbaru',
        'AT' => 'CitraGarden Sidoarjo',
        'AU' => 'CitraGran Cibubur',
        'AV' => 'CitraGrand Cibubur CBD',
        'AW' => 'CitraGrand Mutiara Yogyakarta',
        'AX' => 'CitraGrand Semarang', 
        'AY' => 'CitraHarmoni Sidoarjo',   
        'AZ' => 'CitraIndah City Jonggol', 
        'BA' => 'CitraLand Ambon', 
        'BB' => 'CitraLand Bandar Lampung',    
        'BC' => 'CitraLand Cibubur',   
        'BD' => 'CitraLand City East Jakarta', 
        'BE' => 'CitraLand City Losari - Makassar',  
        'BF' => 'CitraLand Driyorejo CBD', 
        'BG' => 'CitraLand Gama City Medan',   
        'BH' => 'CitraLand Kedamean',  
        'BI' => 'CitraLand Kendari',   
        'BJ' => 'CitraLand Kota Deli MegaPolitan', 
        'BK' => 'CitraLand Malang',   
        'BL' => 'CitraLand Palembang', 
        'BM' => 'CitraLand Palu',  
        'BN' => 'CitraLand Pekanbaru', 
        'BO' => 'CitraLand Setiabudi Bandung', 
        'BP' => 'CitraLand Surabaya',  
        'BQ' => 'CitraLand Tallasa City Makassar', 
        'BR' => 'CitraLand The GreenLake Surabaya',    
        'BS' => 'CitraLand Utara Surabaya',    
        'BT' => 'CitraLand Vittorio Wiyung',  
        'BU' => 'CitraLand Winangun Manado',   
        'BV' => 'CitraSun Garden Semarang',    
        'BW' => 'Kantor Pusat Jakarta',  
        'BX' => 'Kantor Pusat SCK & SCB',    
        'BY' => 'Kantor Pusat Surabaya',  
        'BZ' => 'Memorial Park Surabaya',  
        'CA' => 'Sekolah Ciputra Surabaya',    
        'CB' => 'Sekolah Citra Berkat, Bogor',    
        'CC' => 'Sekolah Citra Berkat, Pandaan',    
        'CD' => 'Sekolah Citra Berkat, Surabaya',    
        'CE' => 'Sekolah Citra Berkat, Tangerang',    
        'CF' => 'Sekolah Citra Kasih Don Bosco Pondok Indah', 
        'CG' => 'Sekolah Citra Kasih, Ambon', 
        'CH' => 'Sekolah Citra Kasih, Jakarta', 
        'CI' => 'Sekolah Citra Kasih, Manado', 
        'CJ' => 'Sekolah Citra Kasih, Samarinda', 
        'CK' => 'The Taman Dayu Pandaan',  
        'CL' => 'Universitas Ciputra Surabaya',    

        'CM' => 'Mal Ciputra Jakarta', 
        'CN' => 'Hotel Ciputra Jakarta',   
        'CO' => 'Mal Ciputra Semarang',    
        'CP' => 'Hotel Ciputra Semarang',  
        'CQ' => 'Ciputra Balai Property (KP)', 
        'CR' => 'Ciputra World 1 Jakarta',   
        'CS' => '',   
        'CT' => '',   
        'CU' => 'Ciputra World 2 Jakarta',   
        'CV' => '',   
        'CW' => '',   
        'CX' => 'Ciputra World Jakarta 2 - Orchard Satrio', 
        'CY' => 'Ciputra International', 
        'CZ' => '', 
        'DA' => '', 
        'DB' => 'Citra Landmark',    
        'DC' => 'CitraLand BSB City', 
        'DD' => 'CitraDream Hotels',    
        'DE' => '',    
        'DF' => 'Ciputra Beach Resort',    
        'DG' => '',    
        'DH' => 'Raffles Hotel Jakarta',   
        'DI' => 'Raffles Residence',   
        'DJ' => 'Linhu New City',  
        'DK' => 'Citra Hasmore Kuliner',   
        'DL' => 'The Newton',  
        'DM' => 'The Newton 2',  
        'DN' => 'Outsource SH3A',

        'DO' => 'SH 3B KP', 
        'DP' => 'CitraGarden Banjarmasin', 
        'DQ' => 'CitraLand Banjarmasin',   
        'DR' => 'BizPark CE Banjarmasin', 
        'DS' => 'Citra BukitIndah Balikpapan', 
        'DT' => 'CitraLand Celebes Makassar',  
        'DU' => 'CitraGarden Manggurupi Makassar',    
        'DV' => 'Vida View Apt Makassar',  
        'DW' => 'CitraGrand Galesong City',   
        'DX' => 'CitraMitra City Banjarbaru',  
        'DY' => 'CitraLand NGK Jambi', 
        'DZ' => 'CitraLand Botanical City', 
        'EA' => 'CitraLand Cirebon',   
        'EB' => 'CitraLand Tegal', 
        'EC' => 'CitraGarden Pekalongan',  
        'ED' => 'CitraLand Puri Serang',   
        'EE' => 'Ciputra Plantation Indonesia',    
        'EF' => '',    
        'EG' => '',   

        'EH' => 'Tangerang',    
        'EI' => 'Citra Garden City Jakarta',    
        'EJ' => 'Banjarmasin',    
        'EK' => 'Ciputra Medical Center',    
        'EL' => 'Eco Medika',    
        'EM' => 'SMG Eye Clinic',    
        'EN' => 'Klinik CGC'
        );
        
        $bodyStyle_projectpt_color2_kp = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ccffcc')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh1 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ddebf7')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh2 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ffff99')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh3a = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'fce4d6')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh3b = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ffccff')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh4 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'dbdbdb')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );

        // --- Array Location print project ---
        // --- Status = 7, Pendidikan = 19, Karir = 50, Usia = 73, Turnover = 86
        $location = array(7,19,50,73,86);

        // --- Array Location print pt ---
        // --- Status = 8, Pendidikan = 20, Karir = 51, Usia = 74, Turnover = 87
        $location_pt = array(8,20,51,74,87);

        foreach($project as $key =>$item){
            // WARNA
            if($key == 'C'){
                $style = $bodyStyle_projectpt_color2_kp;
            }elseif($key == 'D'){
                $style = $bodyStyle_projectpt_color2_sh1;
            }elseif($key == 'AF'){
                $style = $bodyStyle_projectpt_color2_sh2;
            }elseif($key == 'CM'){
                $style = $bodyStyle_projectpt_color2_sh3a;
            }elseif($key == 'DO'){
                $style = $bodyStyle_projectpt_color2_sh3b;
            }elseif($key == 'EH'){
                $style = $bodyStyle_projectpt_color2_sh4;
            }

            //MERGE    
            if($key == 'G'){
                $merge = 'H';
                // $objSheet->getCell('G8')->setValue('Citra Maja Raya JO');
                // $objSheet->getCell('H8')->setValue('Citra Maja Raya JO 2');
                
                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('G'.$item_item)->setValue('Citra Maja Raya JO');
                    $objSheet->getCell('H'.$item_item)->setValue('Citra Maja Raya JO 2');
                }
            }elseif($key == 'CR'){
                $merge = 'CT';
                // $objSheet->getCell('CR8')->setValue("Ciputra Adigraha\n(Project)");
                // $objSheet->getStyle('CR8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('CS8')->setValue("Ciputra Adigraha\n(Operational)");
                // $objSheet->getStyle('CS8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('CT8')->setValue("Pancaran Karya Citra\n(Operational)");
                // $objSheet->getStyle('CT8')->getAlignment()->setWrapText(true);

                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('CR'.$item_item)->setValue("Ciputra Adigraha\n(Project)");
                    $objSheet->getStyle('CR'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('CS'.$item_item)->setValue("Ciputra Adigraha\n(Operational)");
                    $objSheet->getStyle('CS'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('CT'.$item_item)->setValue("Pancaran Karya Citra\n(Operational)");
                    $objSheet->getStyle('CT'.$item_item)->getAlignment()->setWrapText(true);
                }
            }elseif($key == 'CU'){
                $merge = 'CW';
                // $objSheet->getCell('CU8')->setValue("Saraneka Indahpancar\n(Project)");
                // $objSheet->getStyle('CU8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('CV8')->setValue("Saraneka Indahpancar\n(Operational)");
                // $objSheet->getStyle('CV8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('CW8')->setValue("Pancaran Karya Citra\n(Operational)");
                // $objSheet->getStyle('CW8')->getAlignment()->setWrapText(true);

                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('CU'.$item_item)->setValue("Saraneka Indahpancar\n(Project)");
                    $objSheet->getStyle('CU'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('CV'.$item_item)->setValue("Saraneka Indahpancar\n(Operational)");
                    $objSheet->getStyle('CV'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('CW'.$item_item)->setValue("Pancaran Karya Citra\n(Operational)");
                    $objSheet->getStyle('CW'.$item_item)->getAlignment()->setWrapText(true);
                }
            }elseif($key == 'CY'){
                $merge = 'DA';
                // $objSheet->getCell('CY8')->setValue("Ciputra Puri Trisula\n(Operational)");
                // $objSheet->getStyle('CY8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('CZ8')->setValue("Ciputra Puri Trisula\n(Project)");
                // $objSheet->getStyle('CZ8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('DA8')->setValue("Pancaran Karya Citra\n(Operational)");
                // $objSheet->getStyle('DA8')->getAlignment()->setWrapText(true);

                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('CY'.$item_item)->setValue("Ciputra Puri Trisula\n(Operational)");
                    $objSheet->getStyle('CY'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('CZ'.$item_item)->setValue("Ciputra Puri Trisula\n(Project)");
                    $objSheet->getStyle('CZ'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('DA'.$item_item)->setValue("Pancaran Karya Citra\n(Operational)");
                    $objSheet->getStyle('DA'.$item_item)->getAlignment()->setWrapText(true);
                }
            }elseif($key == 'DD'){
                $merge = 'DE';
                // $objSheet->getCell('DD8')->setValue('Ciputra Hospitality');
                // $objSheet->getCell('DE8')->setValue('Project');

                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('DD'.$item_item)->setValue('Ciputra Hospitality');
                    $objSheet->getCell('DE'.$item_item)->setValue('Project');
                }
            }elseif($key == 'DF'){
                $merge = 'DG';
                // $objSheet->getCell('DF8')->setValue('Dwipa Tunasbumi Abhuyudaya');
                // $objSheet->getCell('DG8')->setValue('Dwipa Tunasbumi Bayanaka');

                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('DF'.$item_item)->setValue('Dwipa Tunasbumi Abhuyudaya');
                    $objSheet->getCell('DG'.$item_item)->setValue('Dwipa Tunasbumi Bayanaka');
                }
            }elseif($key == 'EE'){
                $merge = 'EG';
                // $objSheet->getCell('EE8')->setValue("Ciptamas Bumi Selaras\n(Jakarta)");
                // $objSheet->getStyle('EE8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('EF8')->setValue("Ciptamas Bumi Selaras\n(Site)");
                // $objSheet->getStyle('EF8')->getAlignment()->setWrapText(true);
                // $objSheet->getCell('EG8')->setValue('Citraloka Bumi Begawan');

                foreach($location_pt as $key_item => $item_item){
                    $objSheet->getCell('EE'.$item_item)->setValue("Ciptamas Bumi Selaras\n(Jakarta)");
                    $objSheet->getStyle('EE'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('EF'.$item_item)->setValue("Ciptamas Bumi Selaras\n(Site)");
                    $objSheet->getStyle('EF'.$item_item)->getAlignment()->setWrapText(true);
                    $objSheet->getCell('EG'.$item_item)->setValue('Citraloka Bumi Begawan');
                }
            }else{
                $merge = '';
            }

            // --- Tulisan Project (STATUS) ---
            // $objSheet->getCell($key.'7')->setValue($item);
            // $objSheet->getStyle($key.'7')->applyFromArray($style);
            // $objSheet->getStyle($key.'8')->applyFromArray($style);
            // --- Tulisan Project (STATUS) ---

            foreach($location as $key_item => $item_item){
                $objSheet->getCell($key.$item_item)->setValue($item);
                $objSheet->getStyle($key.$item_item)->applyFromArray($style);
            }

            foreach($location_pt as $key_item => $item_item){
                $objSheet->getStyle($key.$item_item)->applyFromArray($style);
            }

            if($key == 'P'){
                // --- Tulisan Project (STATUS) ---
                // $objSheet->getStyle($key.'7')->getAlignment()->setWrapText(true);
                // --- Tulisan Project (STATUS) ---

                foreach($location as $key_item => $item_item){
                    $objSheet->getStyle($key.$item_item)->getAlignment()->setWrapText(true);
                }
            }

            if($merge){
                // --- Tulisan Project (STATUS) ---
                // $objSheet->mergeCells($key.'7:'.$merge.'7');
                // --- Tulisan Project (STATUS) ---

                foreach($location as $key_item => $item_item){
                    $objSheet->mergeCells($key.$item_item.':'.$merge.$item_item);
                }
            }
        }  
        // --- Tulisan Project ---

        // --- Style Value ---
        $valueStyle = array(
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $valueStyle_jumlah = array(
            'font'  => array(
                        'bold'  => true,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              ),
        );

        // --- Value Status ---
        $objSheet->getStyle('C9:EN12')->applyFromArray($valueStyle);
        $objSheet->getStyle('C13:EN13')->applyFromArray($valueStyle_jumlah);
        // --- Value Status ---

        // --- Value Pendidikan ---
        $objSheet->getStyle('C21:EN44')->applyFromArray($valueStyle);
        $objSheet->getStyle('C45:EN45')->applyFromArray($valueStyle_jumlah);
        // --- Value Pendidikan ---

        // --- Value Karir ---
        $objSheet->getStyle('C52:EN67')->applyFromArray($valueStyle);
        $objSheet->getStyle('C68:EN68')->applyFromArray($valueStyle_jumlah);
        // --- Value Karir ---

        // --- Value Usia ---
        $objSheet->getStyle('C75:EN80')->applyFromArray($valueStyle);
        $objSheet->getStyle('C81:EN81')->applyFromArray($valueStyle_jumlah);
        // --- Value Usia ---

        // --- Value Turnover ---
        $objSheet->getStyle('C88:EN93')->applyFromArray($valueStyle);
        $objSheet->getStyle('C94:EN94')->applyFromArray($valueStyle_jumlah);
        // --- Value Turnover ---
        // --- Style Value ---

        // --- Tulisan Value ---
        foreach($project as $key =>$item){
            foreach($result as $key_item => $item_item){
                if(($item_item['row_excel_annual'] == $key)){
                    // Value yang gabungan project tp beda pt
                    if($key == 'J' || $key == 'O' || $key == 'AW' || $key == 'BG' || $key == 'BP' || $key == 'BS' || $key == 'BT' || $key == 'BW' || $key == 'DE'){
                        
                        // --- Value Status ---
                        $gender_permanent_male = 0;
                        $gender_permanent_female = 0;
                        $gender_contract_male = 0;
                        $gender_contract_female = 0;
                        // --- Value Status ---

                        // --- Value Pendidikan ---
                        $education_S3_male = 0;
                        $education_S3_female = 0;
                        $education_S2_male = 0;
                        $education_S2_female = 0;
                        $education_Profesi_male = 0;
                        $education_Profesi_female = 0;
                        $education_S1_male = 0;
                        $education_S1_female = 0;
                        $education_SP2_male = 0;
                        $education_SP2_female = 0;
                        $education_SP1_male = 0;
                        $education_SP1_female = 0;
                        $education_D3D4_male = 0;
                        $education_D3D4_female = 0;
                        $education_D1D2_male = 0;
                        $education_D1D2_female = 0;
                        $education_SMA_male = 0;
                        $education_SMA_female = 0;
                        $education_SMP_male = 0;
                        $education_SMP_female = 0;
                        $education_SD_male = 0;
                        $education_SD_female = 0;
                        $education_Other_male = 0;
                        $education_Other_female = 0;
                        // --- Value Pendidikan ---

                        // --- Value Karir ---
                        $career_EXECUTIVE_male = 0;
                        $career_EXECUTIVE_female = 0;
                        $career_ASEXECUTIVE_male = 0;
                        $career_ASEXECUTIVE_female = 0;
                        $career_GM_male = 0;
                        $career_GM_female = 0;
                        $career_MANAGER_male = 0;
                        $career_MANAGER_female = 0;
                        $career_COORDINATOR_male = 0;
                        $career_COORDINATOR_female = 0;
                        $career_OFFICER_male = 0;
                        $career_OFFICER_female = 0;
                        $career_SS_male = 0;
                        $career_SS_female = 0;
                        $career_OTHER_male = 0;
                        $career_OTHER_female = 0;
                        // --- Value Karir ---

                        // --- Value Usia ---
                        $age_30_male = 0;
                        $age_30_female = 0;
                        $age_3045_male = 0;
                        $age_3045_female = 0;
                        $age_45_male = 0;
                        $age_45_female = 0;
                        // --- Value Usia ---

                        // --- Value Turnover ---
                        $to_30_male = 0;
                        $to_30_female = 0;
                        $to_3045_male = 0;
                        $to_3045_female = 0;
                        $to_45_male = 0;
                        $to_45_female = 0;
                        // --- Value Turnover ---

                        foreach($result as $key_child => $item_child){
                            if($item_child['row_excel_annual'] == $key){
                                // --- Value Status ---
                                $gender_permanent_male += $item_child['gender_permanent_male'];
                                $gender_permanent_female += $item_child['gender_permanent_female'];
                                $gender_contract_male += $item_child['gender_contract_male'];
                                $gender_contract_female += $item_child['gender_contract_female'];
                                // --- Value Status ---

                                // --- Value Pendidikan ---
                                $education_S3_male += $item_child['education_S3_male'];
                                $education_S3_female += $item_child['education_S3_female'];
                                $education_S2_male += $item_child['education_S2_male'];
                                $education_S2_female += $item_child['education_S2_female'];
                                $education_Profesi_male += $item_child['education_Profesi_male'];
                                $education_Profesi_female += $item_child['education_Profesi_female'];
                                $education_S1_male += $item_child['education_S1_male'];
                                $education_S1_female += $item_child['education_S1_female'];
                                $education_SP2_male += $item_child['education_SP2_male'];
                                $education_SP2_female += $item_child['education_SP2_female'];
                                $education_SP1_male += $item_child['education_SP1_male'];
                                $education_SP1_female += $item_child['education_SP1_female'];
                                $education_D3D4_male += $item_child['education_D3D4_male'];
                                $education_D3D4_female += $item_child['education_D3D4_female'];
                                $education_D1D2_male += $item_child['education_D1D2_male'];
                                $education_D1D2_female += $item_child['education_D1D2_female'];
                                $education_SMA_male += $item_child['education_SMA_male'];
                                $education_SMA_female += $item_child['education_SMA_female'];
                                $education_SMP_male += $item_child['education_SMP_male'];
                                $education_SMP_female += $item_child['education_SMP_female'];
                                $education_SD_male += $item_child['education_SD_male'];
                                $education_SD_female += $item_child['education_SD_female'];
                                $education_Other_male += $item_child['education_Other_male'];
                                $education_Other_female += $item_child['education_Other_female'];
                                // --- Value Pendidikan ---

                                // --- Value Karir ---
                                $career_EXECUTIVE_male += $item_child['career_EXECUTIVE_male'];
                                $career_EXECUTIVE_female += $item_child['career_EXECUTIVE_female'];
                                $career_ASEXECUTIVE_male += $item_child['career_ASEXECUTIVE_male'];
                                $career_ASEXECUTIVE_female += $item_child['career_ASEXECUTIVE_female'];
                                $career_GM_male += $item_child['career_GM_male'];
                                $career_GM_female += $item_child['career_GM_female'];
                                $career_MANAGER_male += $item_child['career_MANAGER_male'];
                                $career_MANAGER_female += $item_child['career_MANAGER_female'];
                                $career_COORDINATOR_male += $item_child['career_COORDINATOR_male'];
                                $career_COORDINATOR_female += $item_child['career_COORDINATOR_female'];
                                $career_OFFICER_male += $item_child['career_OFFICER_male'];
                                $career_OFFICER_female += $item_child['career_OFFICER_female'];
                                $career_SS_male += $item_child['career_SS_male'];
                                $career_SS_female += $item_child['career_SS_female'];
                                $career_OTHER_male += $item_child['career_OTHER_male'];
                                $career_OTHER_female += $item_child['career_OTHER_female'];
                                // --- Value Karir ---

                                // --- Value Usia ---
                                $age_30_male += $item_child['age_30_male'];
                                $age_30_female += $item_child['age_30_female'];
                                $age_3045_male += $item_child['age_3045_male'];
                                $age_3045_female += $item_child['age_3045_female'];
                                $age_45_male += $item_child['age_45_male'];
                                $age_45_female += $item_child['age_45_female'];
                                // --- Value Usia ---

                                // --- Value Turnover ---
                                $to_30_male += $item_child['to_30_male'];
                                $to_30_female += $item_child['to_30_female'];
                                $to_3045_male += $item_child['to_3045_male'];
                                $to_3045_female += $item_child['to_3045_female'];
                                $to_45_male += $item_child['to_45_male'];
                                $to_45_female += $item_child['to_45_female'];
                                // --- Value Turnover ---
                            }
                        }

                        // --- Value Status ---
                        $item_item['gender_permanent_male'] = $gender_permanent_male;
                        $item_item['gender_permanent_female'] = $gender_permanent_female;
                        $item_item['gender_contract_male'] = $gender_contract_male;
                        $item_item['gender_contract_female'] = $gender_contract_female;
                        // --- Value Status ---

                        // --- Value Pendidikan ---
                        $item_item['education_S3_male'] = $education_S3_male;
                        $item_item['education_S3_female'] = $education_S3_female;
                        $item_item['education_S2_male'] = $education_S2_male;
                        $item_item['education_S2_female'] = $education_S2_female;
                        $item_item['education_Profesi_male'] = $education_Profesi_male;
                        $item_item['education_Profesi_female'] = $education_Profesi_female;
                        $item_item['education_S1_male'] = $education_S1_male;
                        $item_item['education_S1_female'] = $education_S1_female;
                        $item_item['education_SP2_male'] = $education_SP2_male;
                        $item_item['education_SP2_female'] = $education_SP2_female;
                        $item_item['education_SP1_male'] = $education_SP1_male;
                        $item_item['education_SP1_female'] = $education_SP1_female;
                        $item_item['education_D3D4_male'] = $education_D3D4_male;
                        $item_item['education_D3D4_female'] = $education_D3D4_female;
                        $item_item['education_D1D2_male'] = $education_D1D2_male;
                        $item_item['education_D1D2_female'] = $education_D1D2_female;
                        $item_item['education_SMA_male'] = $education_SMA_male;
                        $item_item['education_SMA_female'] = $education_SMA_female;
                        $item_item['education_SMP_male'] = $education_SMP_male;
                        $item_item['education_SMP_female'] = $education_SMP_female;
                        $item_item['education_SD_male'] = $education_SD_male;
                        $item_item['education_SD_female'] = $education_SD_female;
                        $item_item['education_Other_male'] = $education_Other_male;
                        $item_item['education_Other_female'] = $education_Other_female;
                        // --- Value Pendidikan ---

                        // --- Value Karir ---
                        $item_item['career_EXECUTIVE_male'] = $career_EXECUTIVE_male;
                        $item_item['career_EXECUTIVE_female'] = $career_EXECUTIVE_female;
                        $item_item['career_ASEXECUTIVE_male'] = $career_ASEXECUTIVE_male;
                        $item_item['career_ASEXECUTIVE_female'] = $career_ASEXECUTIVE_female;
                        $item_item['career_GM_male'] = $career_GM_male;
                        $item_item['career_GM_female'] = $career_GM_female;
                        $item_item['career_MANAGER_male'] = $career_MANAGER_male;
                        $item_item['career_MANAGER_female'] = $career_MANAGER_female;
                        $item_item['career_COORDINATOR_male'] = $career_COORDINATOR_male;
                        $item_item['career_COORDINATOR_female'] = $career_COORDINATOR_female;
                        $item_item['career_OFFICER_male'] = $career_OFFICER_male;
                        $item_item['career_OFFICER_female'] = $career_OFFICER_female;
                        $item_item['career_SS_male'] = $career_SS_male;
                        $item_item['career_SS_female'] = $career_SS_female;
                        $item_item['career_OTHER_male'] = $career_OTHER_male;
                        $item_item['career_OTHER_female'] = $career_OTHER_female;
                        // --- Value Karir ---

                        // --- Value Usia ---
                        $item_item['age_30_male'] = $age_30_male;
                        $item_item['age_30_female'] = $age_30_female;
                        $item_item['age_3045_male'] = $age_3045_male;
                        $item_item['age_3045_female'] = $age_3045_female;
                        $item_item['age_45_male'] = $age_45_male;
                        $item_item['age_45_female'] = $age_45_female;
                        // --- Value Usia ---

                        // --- Value Turnover ---
                        $item_item['to_30_male'] = $to_30_male;
                        $item_item['to_30_female'] = $to_30_female;
                        $item_item['to_3045_male'] = $to_3045_male;
                        $item_item['to_3045_female'] = $to_3045_female;
                        $item_item['to_45_male'] = $to_45_male;
                        $item_item['to_45_female'] = $to_45_female;
                        // --- Value Turnover ---

                    }

                    // --- Value Status ---
                    $objSheet->getCell($key.'9')->setValue($item_item['gender_permanent_male']);
                    $objSheet->getCell($key.'10')->setValue($item_item['gender_permanent_female']);
                    $objSheet->getCell($key.'11')->setValue($item_item['gender_contract_male']);
                    $objSheet->getCell($key.'12')->setValue($item_item['gender_contract_female']);
                    // --- Value Status ---

                    // --- Value Pendidikan ---
                    $objSheet->getCell($key.'21')->setValue($item_item['education_S3_male']);
                    $objSheet->getCell($key.'22')->setValue($item_item['education_S3_female']);
                    $objSheet->getCell($key.'23')->setValue($item_item['education_S2_male']);
                    $objSheet->getCell($key.'24')->setValue($item_item['education_S2_female']);
                    $objSheet->getCell($key.'25')->setValue($item_item['education_Profesi_male']);
                    $objSheet->getCell($key.'26')->setValue($item_item['education_Profesi_female']);
                    $objSheet->getCell($key.'27')->setValue($item_item['education_S1_male']);
                    $objSheet->getCell($key.'28')->setValue($item_item['education_S1_female']);
                    $objSheet->getCell($key.'29')->setValue($item_item['education_SP2_male']);
                    $objSheet->getCell($key.'30')->setValue($item_item['education_SP2_female']);
                    $objSheet->getCell($key.'31')->setValue($item_item['education_SP1_male']);
                    $objSheet->getCell($key.'32')->setValue($item_item['education_SP1_female']);
                    $objSheet->getCell($key.'33')->setValue($item_item['education_D3D4_male']);
                    $objSheet->getCell($key.'34')->setValue($item_item['education_D3D4_female']);
                    $objSheet->getCell($key.'35')->setValue($item_item['education_D1D2_male']);
                    $objSheet->getCell($key.'36')->setValue($item_item['education_D1D2_female']);
                    $objSheet->getCell($key.'37')->setValue($item_item['education_SMA_male']);
                    $objSheet->getCell($key.'38')->setValue($item_item['education_SMA_female']);
                    $objSheet->getCell($key.'39')->setValue($item_item['education_SMP_male']);
                    $objSheet->getCell($key.'40')->setValue($item_item['education_SMP_female']);
                    $objSheet->getCell($key.'41')->setValue($item_item['education_SD_male']);
                    $objSheet->getCell($key.'42')->setValue($item_item['education_SD_female']);
                    $objSheet->getCell($key.'43')->setValue($item_item['education_Other_male']);
                    $objSheet->getCell($key.'44')->setValue($item_item['education_Other_female']);
                    // --- Value Pendidikan ---

                    // --- Value Karir ---
                    $objSheet->getCell($key.'52')->setValue($item_item['career_EXECUTIVE_male']);
                    $objSheet->getCell($key.'53')->setValue($item_item['career_EXECUTIVE_female']);
                    $objSheet->getCell($key.'54')->setValue($item_item['career_ASEXECUTIVE_male']);
                    $objSheet->getCell($key.'55')->setValue($item_item['career_ASEXECUTIVE_female']);
                    $objSheet->getCell($key.'56')->setValue($item_item['career_GM_male']);
                    $objSheet->getCell($key.'57')->setValue($item_item['career_GM_female']);
                    $objSheet->getCell($key.'58')->setValue($item_item['career_MANAGER_male']);
                    $objSheet->getCell($key.'59')->setValue($item_item['career_MANAGER_female']);
                    $objSheet->getCell($key.'60')->setValue($item_item['career_COORDINATOR_male']);
                    $objSheet->getCell($key.'61')->setValue($item_item['career_COORDINATOR_female']);
                    $objSheet->getCell($key.'62')->setValue($item_item['career_OFFICER_male']);
                    $objSheet->getCell($key.'63')->setValue($item_item['career_OFFICER_female']);
                    $objSheet->getCell($key.'64')->setValue($item_item['career_SS_male']);
                    $objSheet->getCell($key.'65')->setValue($item_item['career_SS_female']);
                    $objSheet->getCell($key.'66')->setValue($item_item['career_OTHER_male']);
                    $objSheet->getCell($key.'67')->setValue($item_item['career_OTHER_female']);
                    // --- Value Karir ---

                    // --- Value Usia ---
                    $objSheet->getCell($key.'75')->setValue($item_item['age_30_male']);
                    $objSheet->getCell($key.'76')->setValue($item_item['age_30_female']);
                    $objSheet->getCell($key.'77')->setValue($item_item['age_3045_male']);
                    $objSheet->getCell($key.'78')->setValue($item_item['age_3045_female']);
                    $objSheet->getCell($key.'79')->setValue($item_item['age_45_male']);
                    $objSheet->getCell($key.'80')->setValue($item_item['age_45_female']);
                    // --- Value Usia ---

                    // --- Value Turnover ---
                    $objSheet->getCell($key.'88')->setValue($item_item['to_30_male']);
                    $objSheet->getCell($key.'89')->setValue($item_item['to_30_female']);
                    $objSheet->getCell($key.'90')->setValue($item_item['to_3045_male']);
                    $objSheet->getCell($key.'91')->setValue($item_item['to_3045_female']);
                    $objSheet->getCell($key.'92')->setValue($item_item['to_45_male']);
                    $objSheet->getCell($key.'93')->setValue($item_item['to_45_female']);
                    // --- Value Turnover ---

                }
            }
            // --- Value Status ---
            $objSheet->getCell($key.'13')->setValue('=SUM('.$key.'9:'.$key.'12)');
            // --- Value Status ---

            // --- Value Pendidikan ---
            $objSheet->getCell($key.'45')->setValue('=SUM('.$key.'21:'.$key.'44)');
            // --- Value Pendidikan ---

            // --- Value Pendidikan ---
            $objSheet->getCell($key.'68')->setValue('=SUM('.$key.'52:'.$key.'67)');
            // --- Value Pendidikan ---

            // --- Value Usia ---
            $objSheet->getCell($key.'81')->setValue('=SUM('.$key.'75:'.$key.'80)');
            // --- Value Usia ---

            // --- Value Turnover ---
            $objSheet->getCell($key.'94')->setValue('=SUM('.$key.'88:'.$key.'93)');
            // --- Value Turnover ---
        }
        // --- Tulisan Value ---


        // --- Tulisan Total di samping ---
        // --- Value Status ---
        $total_samping_gender_permanent_male = 0;
        $total_samping_gender_permanent_female = 0;
        $total_samping_gender_contract_male = 0;
        $total_samping_gender_contract_female = 0;
        // --- Value Status ---

        // --- Value Pendidikan ---
        $total_samping_education_S3_male = 0;
        $total_samping_education_S3_female = 0;
        $total_samping_education_S2_male = 0;
        $total_samping_education_S2_female = 0;
        $total_samping_education_Profesi_male = 0;
        $total_samping_education_Profesi_female = 0;
        $total_samping_education_S1_male = 0;
        $total_samping_education_S1_female = 0;
        $total_samping_education_SP2_male = 0;
        $total_samping_education_SP2_female = 0;
        $total_samping_education_SP1_male = 0;
        $total_samping_education_SP1_female = 0;
        $total_samping_education_D3D4_male = 0;
        $total_samping_education_D3D4_female = 0;
        $total_samping_education_D1D2_male = 0;
        $total_samping_education_D1D2_female = 0;
        $total_samping_education_SMA_male = 0;
        $total_samping_education_SMA_female = 0;
        $total_samping_education_SMP_male = 0;
        $total_samping_education_SMP_female = 0;
        $total_samping_education_SD_male = 0;
        $total_samping_education_SD_female = 0;
        $total_samping_education_Other_male = 0;
        $total_samping_education_Other_female = 0;
        // --- Value Pendidikan ---

        // --- Value Karir ---
        $total_samping_career_EXECUTIVE_male = 0;
        $total_samping_career_EXECUTIVE_female = 0;
        $total_samping_career_ASEXECUTIVE_male = 0;
        $total_samping_career_ASEXECUTIVE_female = 0;
        $total_samping_career_GM_male = 0;
        $total_samping_career_GM_female = 0;
        $total_samping_career_MANAGER_male = 0;
        $total_samping_career_MANAGER_female = 0;
        $total_samping_career_COORDINATOR_male = 0;
        $total_samping_career_COORDINATOR_female = 0;
        $total_samping_career_OFFICER_male = 0;
        $total_samping_career_OFFICER_female = 0;
        $total_samping_career_SS_male = 0;
        $total_samping_career_SS_female = 0;
        $total_samping_career_OTHER_male = 0;
        $total_samping_career_OTHER_female = 0;
        // --- Value Karir ---

        // --- Value Usia ---
        $total_samping_age_30_male = 0;
        $total_samping_age_30_female = 0;
        $total_samping_age_3045_male = 0;
        $total_samping_age_3045_female = 0;
        $total_samping_age_45_male = 0;
        $total_samping_age_45_female = 0;
        // --- Value Usia ---

        // --- Value Turnover ---
        $total_samping_to_30_male = 0;
        $total_samping_to_30_female = 0;
        $total_samping_to_3045_male = 0;
        $total_samping_to_3045_female = 0;
        $total_samping_to_45_male = 0;
        $total_samping_to_45_female = 0;
        // --- Value Turnover ---

        foreach($project as $key =>$item){
            foreach($result as $key_item => $item_item){
                if(($item_item['row_excel_annual'] == $key)){
                    //hitung yg CTRA saja
                    if($key != 'P' && $key != 'AD' && $key != 'AE' && $key != 'AG' && $key != 'AH' && $key != 'AI' && $key != 'AK' && $key != 'AL' && $key != 'AM' && $key != 'AR' && $key != 'AU' && $key != 'AV' && $key != 'BA' && $key != 'BD' && $key != 'BU' && $key != 'BX' && $key != 'BZ' && $key != 'CA' && $key != 'CB' && $key != 'CC' && $key != 'CD' && $key != 'CE' && $key != 'CF' && $key != 'CG' && $key != 'CH' && $key != 'CI' && $key != 'CJ' && $key != 'CL' && $key != 'DJ' && $key != 'DK' && $key != 'DN' && $key != 'EE' && $key != 'EF' && $key != 'EG'){

                        // --- Value Status ---
                        $total_samping_gender_permanent_male += $item_item['gender_permanent_male'];
                        $total_samping_gender_permanent_female += $item_item['gender_permanent_female'];
                        $total_samping_gender_contract_male += $item_item['gender_contract_male'];
                        $total_samping_gender_contract_female += $item_item['gender_contract_female'];
                        // --- Value Status ---

                        // --- Value Pendidikan ---
                        $total_samping_education_S3_male += $item_item['education_S3_male'];
                        $total_samping_education_S3_female += $item_item['education_S3_female'];
                        $total_samping_education_S2_male += $item_item['education_S2_male'];
                        $total_samping_education_S2_female += $item_item['education_S2_female'];
                        $total_samping_education_Profesi_male += $item_item['education_Profesi_male'];
                        $total_samping_education_Profesi_female += $item_item['education_Profesi_female'];
                        $total_samping_education_S1_male += $item_item['education_S1_male'];
                        $total_samping_education_S1_female += $item_item['education_S1_female'];
                        $total_samping_education_SP2_male += $item_item['education_SP2_male'];
                        $total_samping_education_SP2_female += $item_item['education_SP2_female'];
                        $total_samping_education_SP1_male += $item_item['education_SP1_male'];
                        $total_samping_education_SP1_female += $item_item['education_SP1_female'];
                        $total_samping_education_D3D4_male += $item_item['education_D3D4_male'];
                        $total_samping_education_D3D4_female += $item_item['education_D3D4_female'];
                        $total_samping_education_D1D2_male += $item_item['education_D1D2_male'];
                        $total_samping_education_D1D2_female += $item_item['education_D1D2_female'];
                        $total_samping_education_SMA_male += $item_item['education_SMA_male'];
                        $total_samping_education_SMA_female += $item_item['education_SMA_female'];
                        $total_samping_education_SMP_male += $item_item['education_SMP_male'];
                        $total_samping_education_SMP_female += $item_item['education_SMP_female'];
                        $total_samping_education_SD_male += $item_item['education_SD_male'];
                        $total_samping_education_SD_female += $item_item['education_SD_female'];
                        $total_samping_education_Other_male += $item_item['education_Other_male'];
                        $total_samping_education_Other_female += $item_item['education_Other_female'];
                        // --- Value Pendidikan ---

                        // --- Value Karir ---
                        $total_samping_career_EXECUTIVE_male += $item_item['career_EXECUTIVE_male'];
                        $total_samping_career_EXECUTIVE_female += $item_item['career_EXECUTIVE_female'];
                        $total_samping_career_ASEXECUTIVE_male += $item_item['career_ASEXECUTIVE_male'];
                        $total_samping_career_ASEXECUTIVE_female += $item_item['career_ASEXECUTIVE_female'];
                        $total_samping_career_GM_male += $item_item['career_GM_male'];
                        $total_samping_career_GM_female += $item_item['career_GM_female'];
                        $total_samping_career_MANAGER_male += $item_item['career_MANAGER_male'];
                        $total_samping_career_MANAGER_female += $item_item['career_MANAGER_female'];
                        $total_samping_career_COORDINATOR_male += $item_item['career_COORDINATOR_male'];
                        $total_samping_career_COORDINATOR_female += $item_item['career_COORDINATOR_female'];
                        $total_samping_career_OFFICER_male += $item_item['career_OFFICER_male'];
                        $total_samping_career_OFFICER_female += $item_item['career_OFFICER_female'];
                        $total_samping_career_SS_male += $item_item['career_SS_male'];
                        $total_samping_career_SS_female += $item_item['career_SS_female'];
                        $total_samping_career_OTHER_male += $item_item['career_OTHER_male'];
                        $total_samping_career_OTHER_female += $item_item['career_OTHER_female'];
                        // --- Value Karir ---

                        // --- Value Usia ---
                        $total_samping_age_30_male += $item_item['age_30_male'];
                        $total_samping_age_30_female += $item_item['age_30_female'];
                        $total_samping_age_3045_male += $item_item['age_3045_male'];
                        $total_samping_age_3045_female += $item_item['age_3045_female'];
                        $total_samping_age_45_male += $item_item['age_45_male'];
                        $total_samping_age_45_female += $item_item['age_45_female'];
                        // --- Value Usia ---

                        // --- Value Turnover ---
                        $total_samping_to_30_male += $item_item['to_30_male'];
                        $total_samping_to_30_female += $item_item['to_30_female'];
                        $total_samping_to_3045_male += $item_item['to_3045_male'];
                        $total_samping_to_3045_female += $item_item['to_3045_female'];
                        $total_samping_to_45_male += $item_item['to_45_male'];
                        $total_samping_to_45_female += $item_item['to_45_female'];
                        // --- Value Turnover ---

                    }
                }
            }
        }

        // --- Style Total disamping ---
        $valueStyle_jumlahsamping = array(
            'font'  => array(
                        'bold'  => true,
            ),
        );
        // --- Style Total disamping ---

        // --- Value Status ---
        $objSheet->getCell('ES9')->setValue($total_samping_gender_permanent_male);
        $objSheet->getCell('ES10')->setValue($total_samping_gender_permanent_female);
        $objSheet->getCell('ES11')->setValue($total_samping_gender_contract_male);
        $objSheet->getCell('ES12')->setValue($total_samping_gender_contract_female);

        $objSheet->getCell('ES13')->setValue('=SUM(ES9:ES12)');
        $objSheet->getStyle('ES13')->applyFromArray($valueStyle_jumlahsamping);
        // --- Value Status ---

        // --- Value Pendidikan ---
        $objSheet->getCell('ES21')->setValue($total_samping_education_S3_male);
        $objSheet->getCell('ES22')->setValue($total_samping_education_S3_female);
        $objSheet->getCell('ES23')->setValue($total_samping_education_S2_male);
        $objSheet->getCell('ES24')->setValue($total_samping_education_S2_female);
        $objSheet->getCell('ES25')->setValue($total_samping_education_Profesi_male);
        $objSheet->getCell('ES26')->setValue($total_samping_education_Profesi_female);
        $objSheet->getCell('ES27')->setValue($total_samping_education_S1_male);
        $objSheet->getCell('ES28')->setValue($total_samping_education_S1_female);
        $objSheet->getCell('ES29')->setValue($total_samping_education_SP2_male);
        $objSheet->getCell('ES30')->setValue($total_samping_education_SP2_female);
        $objSheet->getCell('ES31')->setValue($total_samping_education_SP1_male);
        $objSheet->getCell('ES32')->setValue($total_samping_education_SP1_female);
        $objSheet->getCell('ES33')->setValue($total_samping_education_D3D4_male);
        $objSheet->getCell('ES34')->setValue($total_samping_education_D3D4_female);
        $objSheet->getCell('ES35')->setValue($total_samping_education_D1D2_male);
        $objSheet->getCell('ES36')->setValue($total_samping_education_D1D2_female);
        $objSheet->getCell('ES37')->setValue($total_samping_education_SMA_male);
        $objSheet->getCell('ES38')->setValue($total_samping_education_SMA_female);
        $objSheet->getCell('ES39')->setValue($total_samping_education_SMP_male);
        $objSheet->getCell('ES40')->setValue($total_samping_education_SMP_female);
        $objSheet->getCell('ES41')->setValue($total_samping_education_SD_male);
        $objSheet->getCell('ES42')->setValue($total_samping_education_SD_female);
        $objSheet->getCell('ES43')->setValue($total_samping_education_Other_male);
        $objSheet->getCell('ES44')->setValue($total_samping_education_Other_female);

        $objSheet->getCell('ES45')->setValue('=SUM(ES21:ES44)');
        $objSheet->getStyle('ES45')->applyFromArray($valueStyle_jumlahsamping);
        // --- Value Pendidikan ---

        // --- Value Karir ---
        $objSheet->getCell('ES52')->setValue($total_samping_career_EXECUTIVE_male);
        $objSheet->getCell('ES53')->setValue($total_samping_career_EXECUTIVE_female);
        $objSheet->getCell('ES54')->setValue($total_samping_career_ASEXECUTIVE_male);
        $objSheet->getCell('ES55')->setValue($total_samping_career_ASEXECUTIVE_female);
        $objSheet->getCell('ES56')->setValue($total_samping_career_GM_male);
        $objSheet->getCell('ES57')->setValue($total_samping_career_GM_female);
        $objSheet->getCell('ES58')->setValue($total_samping_career_MANAGER_male);
        $objSheet->getCell('ES59')->setValue($total_samping_career_MANAGER_female);
        $objSheet->getCell('ES60')->setValue($total_samping_career_COORDINATOR_male);
        $objSheet->getCell('ES61')->setValue($total_samping_career_COORDINATOR_female);
        $objSheet->getCell('ES62')->setValue($total_samping_career_OFFICER_male);
        $objSheet->getCell('ES63')->setValue($total_samping_career_OFFICER_female);
        $objSheet->getCell('ES64')->setValue($total_samping_career_SS_male);
        $objSheet->getCell('ES65')->setValue($total_samping_career_SS_female);
        $objSheet->getCell('ES66')->setValue($total_samping_career_OTHER_male);
        $objSheet->getCell('ES67')->setValue($total_samping_career_OTHER_female);

        $objSheet->getCell('ES68')->setValue('=SUM(ES52:ES67)');
        $objSheet->getStyle('ES68')->applyFromArray($valueStyle_jumlahsamping);
        // --- Value Karir ---

        // --- Value Usia ---
        $objSheet->getCell('ES75')->setValue($total_samping_age_30_male);
        $objSheet->getCell('ES76')->setValue($total_samping_age_30_female);
        $objSheet->getCell('ES77')->setValue($total_samping_age_3045_male);
        $objSheet->getCell('ES78')->setValue($total_samping_age_3045_female);
        $objSheet->getCell('ES79')->setValue($total_samping_age_45_male);
        $objSheet->getCell('ES80')->setValue($total_samping_age_45_female);

        $objSheet->getCell('ES81')->setValue('=SUM(ES75:ES80)');
        $objSheet->getStyle('ES81')->applyFromArray($valueStyle_jumlahsamping);
        // --- Value Usia ---

        // --- Value Turnover ---
        $objSheet->getCell('ES88')->setValue($total_samping_to_30_male);
        $objSheet->getCell('ES89')->setValue($total_samping_to_30_female);
        $objSheet->getCell('ES90')->setValue($total_samping_to_3045_male);
        $objSheet->getCell('ES91')->setValue($total_samping_to_3045_female);
        $objSheet->getCell('ES92')->setValue($total_samping_to_45_male);
        $objSheet->getCell('ES93')->setValue($total_samping_to_45_female);

        $objSheet->getCell('ES94')->setValue('=SUM(ES88:ES93)');
        $objSheet->getStyle('ES94')->applyFromArray($valueStyle_jumlahsamping);
        // --- Value Turnover ---
        // --- Tulisan Total di samping ---

        // --- SUBBODY RIGHT ---
        // --- SUBBODY ---

        // --- BODY ---

        // autosize the columns
        // foreach (range('A', 'ET') as $letra) {    
        for ($letra = 'A'; $letra != 'EU'; $letra++) {          
            $objSheet->getColumnDimension($letra)->setAutoSize(true);
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'AnnualReport';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setting->_user_id . ".xls";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setting->_user_id . ".xls";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

    function exceldata_annual_v2($data) {
        
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        $result = $this->getdata($data);
        // print_r(sprintf("#%02x%02x%02x", 255, 192, 0));die();
        // print_r($result);die();

        // SETTING dari hasil query
        //CTRA_NTBK
        $ctra_ntbk = '';
        $temp_ctra_ntbk = '';

        //Name List
        $name_list = '';

        //Subholding
        $subholding = '';

        //Project
        $project = '';

        //Col yang summary (jika lebih dari 1)
        $col_summary = '';
        $temp_col_summary = 0;

        foreach($result as $key => $item){
            //CTRA_NTBK
            if($item['col_excel_annual'] && $temp_ctra_ntbk != $item['col_excel_annual']){
                if($item['ctra_ntbk'] == 'ctra'){
                    $ctra_ntbk['ctra'][] = $item['col_excel_annual'];
                }else{
                    $ctra_ntbk['ntbk'][] = $item['col_excel_annual'];
                }
                $temp_ctra_ntbk = $item['col_excel_annual'];
            }

            //Name List
            if($item['col_excel_annual']){
                $name_list[$item['col_excel_annual']] = $item['name_list'];
            }

            //Subholding
            if($item['col_excel_annual']){
                $subholding[$item['subholding']] = array(
                                                        'merge_sh_start_col'    => $item['merge_sh_start_col'],
                                                        'merge_sh_end_col'      => $item['merge_sh_end_col']
                                                    );
            }

            //Project
            if($item['col_excel_annual']){
                $project[$item['col_excel_annual']] = array(
                                                        'subholding'            => $item['subholding'],
                                                        'name_project'          => $item['name_project'],
                                                        'merge_cell'            => $item['merge_cell'],
                                                        'merge_start_col'       => $item['merge_start_col'],
                                                        'merge_end_col'         => $item['merge_end_col'],
                                                        'name_pt'               => $item['name_pt'],
                                                        'parent_cell'           => $item['parent_cell']
                                                    );
            }

            //Col yang summary (jika lebih dari 1)
            if($item['col_excel_annual']){
                $temp_col_summary = 0;
                foreach($result as $key_item => $item_item){
                    if($item['col_excel_annual'] == $item_item['col_excel_annual']){
                        $temp_col_summary++;
                    }
                }
                $col_summary[$item['col_excel_annual']] = $temp_col_summary; 
            }
        }
        // SETTING dari hasil query
        
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
        $objSheet->setTitle('Annual Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4

        $headStyle_empinti = array(
            'font'  => array(
                                'bold'  => false,
                                'color' => array('rgb' => 'FF0000'),
                                'size'  => 10,
                                // 'name'  => 'Arial'
            )
        );

        $headStyle_content = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'font'  => array(
                                'bold'  => true,
                                'size'  => 12,
            )
        );

        $bodyStyle_content = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            )
        );

        $bodyStyle_projectpt = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            )
        );

        $footStyle_jumlah = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
            ),
            'font'  => array(
                                'bold'  => true,
            )
        );

        // --- HEADER ---
        $objSheet->getStyle('A1:A3')->getFont()->setBold(true)->setSize(12);

        $objSheet->getCell('A1')->setValue('CIPUTRA GROUP (Data All Group)'); 
        $objSheet->mergeCells('A1:G1');
        $objSheet->getCell('A2')->setValue('KOMPOSISI KARYAWAN INTI'); 
        $objSheet->mergeCells('A2:G2');
        $objSheet->getCell('A3')->setValue("".date('d F Y',strtotime($data['asof_date']))); 
        $objSheet->mergeCells('A3:G3');
        // --- HEADER ---

        // --- BODY ---

        // --- SUBBODY ---
        // --- SUBBODY LEFT (STATUS) ---
        $objSheet->getCell('A5')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A5')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A6')->setValue('STATUS');
        $objSheet->getStyle('A6')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A6:B8');

        $objSheet->getCell('A9')->setValue('Tetap');
        $objSheet->getStyle('A9')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A9:A10');
        $objSheet->getCell('B9')->setValue('Laki-Laki');
        $objSheet->getCell('B10')->setValue('Perempuan');

        $objSheet->getCell('A11')->setValue('Kontrak');
        $objSheet->getStyle('A11')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A11:A12');
        $objSheet->getCell('B11')->setValue('Laki-Laki');
        $objSheet->getCell('B12')->setValue('Perempuan');

        $objSheet->getCell('A13')->setValue('Jumlah');
        $objSheet->getStyle('A13')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A13:B13');

        $objSheet->getStyle('A6:B13')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (STATUS) ---

        // --- SUBBODY LEFT (PENDIDIKAN) ---
        $objSheet->getCell('A17')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A17')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A18')->setValue('JENJANG PENDIDIKAN');
        $objSheet->getStyle('A18')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A18:B20');

        $objSheet->getCell('A21')->setValue('S3');
        $objSheet->getStyle('A21')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A21:A22');
        $objSheet->getCell('B21')->setValue('Laki-Laki');
        $objSheet->getCell('B22')->setValue('Perempuan');

        $objSheet->getCell('A23')->setValue('S2');
        $objSheet->getStyle('A23')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A23:A24');
        $objSheet->getCell('B23')->setValue('Laki-Laki');
        $objSheet->getCell('B24')->setValue('Perempuan');

        $objSheet->getCell('A25')->setValue('Profesi');
        $objSheet->getStyle('A25')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A25:A26');
        $objSheet->getCell('B25')->setValue('Laki-Laki');
        $objSheet->getCell('B26')->setValue('Perempuan');

        $objSheet->getCell('A27')->setValue('S1');
        $objSheet->getStyle('A27')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A27:A28');
        $objSheet->getCell('B27')->setValue('Laki-Laki');
        $objSheet->getCell('B28')->setValue('Perempuan');

        $objSheet->getCell('A29')->setValue('SP-2');
        $objSheet->getStyle('A29')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A29:A30');
        $objSheet->getCell('B29')->setValue('Laki-Laki');
        $objSheet->getCell('B30')->setValue('Perempuan');

        $objSheet->getCell('A31')->setValue('SP-1');
        $objSheet->getStyle('A31')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A31:A32');
        $objSheet->getCell('B31')->setValue('Laki-Laki');
        $objSheet->getCell('B32')->setValue('Perempuan');

        $objSheet->getCell('A33')->setValue('Diploma (D3/D4)');
        $objSheet->getStyle('A33')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A33:A34');
        $objSheet->getCell('B33')->setValue('Laki-Laki');
        $objSheet->getCell('B34')->setValue('Perempuan');

        $objSheet->getCell('A35')->setValue('Diploma (D1/D2)');
        $objSheet->getStyle('A35')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A35:A36');
        $objSheet->getCell('B35')->setValue('Laki-Laki');
        $objSheet->getCell('B36')->setValue('Perempuan');

        $objSheet->getCell('A37')->setValue('SMU/SMK');
        $objSheet->getStyle('A37')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A37:A38');
        $objSheet->getCell('B37')->setValue('Laki-Laki');
        $objSheet->getCell('B38')->setValue('Perempuan');

        $objSheet->getCell('A39')->setValue('SMP');
        $objSheet->getStyle('A39')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A39:A40');
        $objSheet->getCell('B39')->setValue('Laki-Laki');
        $objSheet->getCell('B40')->setValue('Perempuan');

        $objSheet->getCell('A41')->setValue('SD');
        $objSheet->getStyle('A41')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A41:A42');
        $objSheet->getCell('B41')->setValue('Laki-Laki');
        $objSheet->getCell('B42')->setValue('Perempuan');

        $objSheet->getCell('A43')->setValue('Others');
        $objSheet->getStyle('A43')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A43:A44');
        $objSheet->getCell('B43')->setValue('Laki-Laki');
        $objSheet->getCell('B44')->setValue('Perempuan');

        $objSheet->getCell('A45')->setValue('Jumlah');
        $objSheet->getStyle('A45')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A45:B45');

        $objSheet->getStyle('A18:B45')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (PENDIDIKAN) ---
        
        // --- SUBBODY LEFT (KARIR) ---
        $objSheet->getCell('A48')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A48')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A49')->setValue('JENJANG KARIR');
        $objSheet->getStyle('A49')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A49:B51');

        $objSheet->getCell('A52')->setValue('Executive (Direktur)');
        $objSheet->getStyle('A52')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A52:A53');
        $objSheet->getCell('B52')->setValue('Laki-Laki');
        $objSheet->getCell('B53')->setValue('Perempuan');

        $objSheet->getCell('A54')->setValue('Executive (Ast. Direktur)');
        $objSheet->getStyle('A54')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A54:A55');
        $objSheet->getCell('B54')->setValue('Laki-Laki');
        $objSheet->getCell('B55')->setValue('Perempuan');

        $objSheet->getCell('A56')->setValue('General Manager');
        $objSheet->getStyle('A56')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A56:A57');
        $objSheet->getCell('B56')->setValue('Laki-Laki');
        $objSheet->getCell('B57')->setValue('Perempuan');

        $objSheet->getCell('A58')->setValue('Manager');
        $objSheet->getStyle('A58')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A58:A59');
        $objSheet->getCell('B58')->setValue('Laki-Laki');
        $objSheet->getCell('B59')->setValue('Perempuan');

        $objSheet->getCell('A60')->setValue('Coordinator');
        $objSheet->getStyle('A60')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A60:A61');
        $objSheet->getCell('B60')->setValue('Laki-Laki');
        $objSheet->getCell('B61')->setValue('Perempuan');

        $objSheet->getCell('A62')->setValue('Officer');
        $objSheet->getStyle('A62')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A62:A63');
        $objSheet->getCell('B62')->setValue('Laki-Laki');
        $objSheet->getCell('B63')->setValue('Perempuan');

        $objSheet->getCell('A64')->setValue('Support Staff');
        $objSheet->getStyle('A64')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A64:A65');
        $objSheet->getCell('B64')->setValue('Laki-Laki');
        $objSheet->getCell('B65')->setValue('Perempuan');

        $objSheet->getCell('A66')->setValue('[NOT SET]');
        $objSheet->getStyle('A66')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A66:A67');
        $objSheet->getCell('B66')->setValue('Laki-Laki');
        $objSheet->getCell('B67')->setValue('Perempuan');

        $objSheet->getCell('A68')->setValue('Jumlah');
        $objSheet->getStyle('A68')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A68:B68');

        $objSheet->getStyle('A49:B68')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (KARIR) ---

        // --- SUBBODY LEFT (USIA) ---
        $objSheet->getCell('A71')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A71')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A72')->setValue('USIA');
        $objSheet->getStyle('A72')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A72:A74');

        $objSheet->getCell('A75')->setValue('<30');
        $objSheet->getStyle('A75')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A75:A76');
        $objSheet->getCell('B75')->setValue('Laki-Laki');
        $objSheet->getCell('B76')->setValue('Perempuan');

        $objSheet->getCell('A77')->setValue('30-45');
        $objSheet->getStyle('A77')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A77:A78');
        $objSheet->getCell('B77')->setValue('Laki-Laki');
        $objSheet->getCell('B78')->setValue('Perempuan');

        $objSheet->getCell('A79')->setValue('>45');
        $objSheet->getStyle('A79')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A79:A80');
        $objSheet->getCell('B79')->setValue('Laki-Laki');
        $objSheet->getCell('B80')->setValue('Perempuan');

        $objSheet->getCell('A81')->setValue('Jumlah');
        $objSheet->getStyle('A81')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A81:B81');

        $objSheet->getStyle('A72:B81')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (USIA) ---

        // --- SUBBODY LEFT (TURNOVER) ---
        $objSheet->getCell('A84')->setValue('Karyawan Inti'); 
        $objSheet->getStyle('A84')->applyFromArray($headStyle_empinti);

        $objSheet->getCell('A85')->setValue('TURNOVER');
        $objSheet->getStyle('A85')->applyFromArray($headStyle_content);
        $objSheet->mergeCells('A85:A87');

        $objSheet->getCell('A88')->setValue('<30');
        $objSheet->getStyle('A88')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A88:A89');
        $objSheet->getCell('B88')->setValue('Laki-Laki');
        $objSheet->getCell('B89')->setValue('Perempuan');

        $objSheet->getCell('A90')->setValue('30-45');
        $objSheet->getStyle('A90')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A90:A91');
        $objSheet->getCell('B90')->setValue('Laki-Laki');
        $objSheet->getCell('B91')->setValue('Perempuan');

        $objSheet->getCell('A92')->setValue('>45');
        $objSheet->getStyle('A92')->applyFromArray($bodyStyle_content);
        $objSheet->mergeCells('A92:A93');
        $objSheet->getCell('B92')->setValue('Laki-Laki');
        $objSheet->getCell('B93')->setValue('Perempuan');

        $objSheet->getCell('A94')->setValue('Jumlah');
        $objSheet->getStyle('A94')->applyFromArray($footStyle_jumlah);
        $objSheet->mergeCells('A94:B94');

        $objSheet->getStyle('A85:B94')->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // --- SUBBODY LEFT (TURNOVER) ---
        
        // --- SUBBODY RIGHT ---

        // --- Tulisan CTRA/NTBK ---
        if($ctra_ntbk){
            //CTRA
            foreach($ctra_ntbk['ctra'] as $key => $letter){
                $headStyle_ctra = array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    )
                );

                $objSheet->getCell($letter.'4')->setValue('CTRA');
                $objSheet->getStyle($letter.'4')->applyFromArray($headStyle_ctra);
            }
            //NBTK  
            foreach($ctra_ntbk['ntbk'] as $key => $letter){
                $headStyle_ntbk = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => '8497b0')
                    ),
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    )
                );

                $objSheet->getCell($letter.'4')->setValue('NTBK');
                $objSheet->getStyle($letter.'4')->applyFromArray($headStyle_ntbk);
            }
        }
        // --- Tulisan CTRA/NTBK ---

        // --- Tulisan keterangan dibawah CTRA/NTBK ---
        if($name_list){
            foreach($name_list as $key => $item){
                $headStyle_list = array(
                        'alignment' => array(
                            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                        )
                    );

                $objSheet->getCell($key.'5')->setValue($item);
                $objSheet->getStyle($key.'5')->applyFromArray($headStyle_list);
            }
        }
        // --- Tulisan keterangan dibawah CTRA/NTBK ---

        // --- Tulisan subholding ---
        $bodyStyle_projectpt_color1_kp = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '92d050')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh1 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'acb9ca')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh2 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ffff00')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh3a = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'f8cbad')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh3b = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ff66cc')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color1_sh4 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '92d050')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );

        // --- Array Location print subholding ---
        // --- Status = 6, Pendidikan = 18, Karir = 49, Usia = 72, Turnover = 85
        $location = array(6,18,49,72,85);

        foreach($subholding as $key => $item){
            if($key == 'Kantor Pusat' || $key == 'KP'){
                $style = $bodyStyle_projectpt_color1_kp;
            }elseif($key == 'Subholding 01' || $key == 'Subholding 1'){
                $style = $bodyStyle_projectpt_color1_sh1;
            }elseif($key == 'Subholding 02' || $key == 'Subholding 2'){
                $style = $bodyStyle_projectpt_color1_sh2;
            }elseif($key == 'Subholding 03A' || $key == 'Subholding 3A'){
                $style = $bodyStyle_projectpt_color1_sh3a;
            }elseif($key == 'Subholding 03B' || $key == 'Subholding 3B'){
                $style = $bodyStyle_projectpt_color1_sh3b;
            }elseif($key == 'Ciputra Healthcare' || $key == 'Healthcare'){
                $style = $bodyStyle_projectpt_color1_sh4;
            }

            $from = $item['merge_sh_start_col'];
            $end = $item['merge_sh_end_col'];
            
            foreach($location as $key_item => $item_item){
                $objSheet->getCell($from.$item_item)->setValue($key);
                $objSheet->getStyle($from.$item_item)->applyFromArray($style);
            }

            if($from != $end){
                foreach($location as $key_item => $item_item){
                    $objSheet->mergeCells($from.$item_item.':'.$end.$item_item);
                }
            }

        } 
        // --- Tulisan subholding ---

        // --- Tulisan Project ---
        $bodyStyle_projectpt_color2_kp = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ccffcc')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh1 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ddebf7')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh2 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ffff99')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh3a = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'fce4d6')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh3b = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'ffccff')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $bodyStyle_projectpt_color2_sh4 = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'dbdbdb')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );

        // --- Array Location print project ---
        // --- Status = 7, Pendidikan = 19, Karir = 50, Usia = 73, Turnover = 86
        $location = array(7,19,50,73,86);

        // --- Array Location print pt ---
        // --- Status = 8, Pendidikan = 20, Karir = 51, Usia = 74, Turnover = 87
        $location_pt = array(8,20,51,74,87); 

        foreach($project as $key =>$item){
            // WARNA
            if($item['subholding'] == 'Kantor Pusat' || $item['subholding'] == 'KP'){
                $style = $bodyStyle_projectpt_color2_kp;
            }elseif($item['subholding'] == 'Subholding 01' || $item['subholding'] == 'Subholding 1'){
                $style = $bodyStyle_projectpt_color2_sh1;
            }elseif($item['subholding'] == 'Subholding 02' || $item['subholding'] == 'Subholding 2'){
                $style = $bodyStyle_projectpt_color2_sh2;
            }elseif($item['subholding'] == 'Subholding 03A' ||$item['subholding'] == 'Subholding 3A'){
                $style = $bodyStyle_projectpt_color2_sh3a;
            }elseif($item['subholding'] == 'Subholding 03B' || $item['subholding'] == 'Subholding 3B'){
                $style = $bodyStyle_projectpt_color2_sh3b;
            }elseif($item['subholding'] == 'Ciputra Healthcare' || $item['subholding'] == 'Healthcare'){
                $style = $bodyStyle_projectpt_color2_sh4;
            }
            //MERGE    
            if($item['merge_cell'] == 1 && $item['name_pt']){
                $from = $item['merge_start_col'];
                $merge = $item['merge_end_col'];
                foreach($project as $key_child => $item_child){
                    if($key == $item_child['parent_cell'] && $item_child['merge_cell'] == 1){
                            foreach($location_pt as $key_item => $item_item){
                                $objSheet->getCell($key_child.$item_item)->setValue($item_child['name_pt']);
                            }
                    }
                }
                
            }else{
                $merge = '';
            }

            foreach($location as $key_item => $item_item){
                $objSheet->getCell($key.$item_item)->setValue($item['name_project']);
                $objSheet->getStyle($key.$item_item)->applyFromArray($style);
            }

            foreach($location_pt as $key_item => $item_item){
                $objSheet->getStyle($key.$item_item)->applyFromArray($style);
            }

            if($merge){

                foreach($location as $key_item => $item_item){
                    $objSheet->mergeCells($from.$item_item.':'.$merge.$item_item);
                }
            }
        }
        // --- Tulisan Project ---

        // --- Style Value ---
        $valueStyle = array(
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        );
        $valueStyle_jumlah = array(
            'font'  => array(
                        'bold'  => true,
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              ),
        );

        // --- Value Status ---
        $objSheet->getStyle('C9:EN12')->applyFromArray($valueStyle);
        $objSheet->getStyle('C13:EN13')->applyFromArray($valueStyle_jumlah);
        // --- Value Status ---

        // --- Value Pendidikan ---
        $objSheet->getStyle('C21:EN44')->applyFromArray($valueStyle);
        $objSheet->getStyle('C45:EN45')->applyFromArray($valueStyle_jumlah);
        // --- Value Pendidikan ---

        // --- Value Karir ---
        $objSheet->getStyle('C52:EN67')->applyFromArray($valueStyle);
        $objSheet->getStyle('C68:EN68')->applyFromArray($valueStyle_jumlah);
        // --- Value Karir ---

        // --- Value Usia ---
        $objSheet->getStyle('C75:EN80')->applyFromArray($valueStyle);
        $objSheet->getStyle('C81:EN81')->applyFromArray($valueStyle_jumlah);
        // --- Value Usia ---

        // --- Value Turnover ---
        $objSheet->getStyle('C88:EN93')->applyFromArray($valueStyle);
        $objSheet->getStyle('C94:EN94')->applyFromArray($valueStyle_jumlah);
        // --- Value Turnover ---
        // --- Style Value ---

        // --- Tulisan Value ---
        foreach($col_summary as $key =>$item){
            foreach($result as $key_item => $item_item){
                if(($item_item['col_excel_annual'] == $key)){
                    // Value yang gabungan project tp beda pt
                    if($item > 1){
                        
                        // --- Value Status ---
                        $gender_permanent_male = 0;
                        $gender_permanent_female = 0;
                        $gender_contract_male = 0;
                        $gender_contract_female = 0;
                        // --- Value Status ---

                        // --- Value Pendidikan ---
                        $education_S3_male = 0;
                        $education_S3_female = 0;
                        $education_S2_male = 0;
                        $education_S2_female = 0;
                        $education_Profesi_male = 0;
                        $education_Profesi_female = 0;
                        $education_S1_male = 0;
                        $education_S1_female = 0;
                        $education_SP2_male = 0;
                        $education_SP2_female = 0;
                        $education_SP1_male = 0;
                        $education_SP1_female = 0;
                        $education_D3D4_male = 0;
                        $education_D3D4_female = 0;
                        $education_D1D2_male = 0;
                        $education_D1D2_female = 0;
                        $education_SMA_male = 0;
                        $education_SMA_female = 0;
                        $education_SMP_male = 0;
                        $education_SMP_female = 0;
                        $education_SD_male = 0;
                        $education_SD_female = 0;
                        $education_Other_male = 0;
                        $education_Other_female = 0;
                        // --- Value Pendidikan ---

                        // --- Value Karir ---
                        $career_EXECUTIVE_male = 0;
                        $career_EXECUTIVE_female = 0;
                        $career_ASEXECUTIVE_male = 0;
                        $career_ASEXECUTIVE_female = 0;
                        $career_GM_male = 0;
                        $career_GM_female = 0;
                        $career_MANAGER_male = 0;
                        $career_MANAGER_female = 0;
                        $career_COORDINATOR_male = 0;
                        $career_COORDINATOR_female = 0;
                        $career_OFFICER_male = 0;
                        $career_OFFICER_female = 0;
                        $career_SS_male = 0;
                        $career_SS_female = 0;
                        $career_OTHER_male = 0;
                        $career_OTHER_female = 0;
                        // --- Value Karir ---

                        // --- Value Usia ---
                        $age_30_male = 0;
                        $age_30_female = 0;
                        $age_3045_male = 0;
                        $age_3045_female = 0;
                        $age_45_male = 0;
                        $age_45_female = 0;
                        // --- Value Usia ---

                        // --- Value Turnover ---
                        $to_30_male = 0;
                        $to_30_female = 0;
                        $to_3045_male = 0;
                        $to_3045_female = 0;
                        $to_45_male = 0;
                        $to_45_female = 0;
                        // --- Value Turnover ---

                        foreach($result as $key_child => $item_child){
                            if($item_child['col_excel_annual'] == $key){
                                // --- Value Status ---
                                $gender_permanent_male += $item_child['gender_permanent_male'];
                                $gender_permanent_female += $item_child['gender_permanent_female'];
                                $gender_contract_male += $item_child['gender_contract_male'];
                                $gender_contract_female += $item_child['gender_contract_female'];
                                // --- Value Status ---

                                // --- Value Pendidikan ---
                                $education_S3_male += $item_child['education_S3_male'];
                                $education_S3_female += $item_child['education_S3_female'];
                                $education_S2_male += $item_child['education_S2_male'];
                                $education_S2_female += $item_child['education_S2_female'];
                                $education_Profesi_male += $item_child['education_Profesi_male'];
                                $education_Profesi_female += $item_child['education_Profesi_female'];
                                $education_S1_male += $item_child['education_S1_male'];
                                $education_S1_female += $item_child['education_S1_female'];
                                $education_SP2_male += $item_child['education_SP2_male'];
                                $education_SP2_female += $item_child['education_SP2_female'];
                                $education_SP1_male += $item_child['education_SP1_male'];
                                $education_SP1_female += $item_child['education_SP1_female'];
                                $education_D3D4_male += $item_child['education_D3D4_male'];
                                $education_D3D4_female += $item_child['education_D3D4_female'];
                                $education_D1D2_male += $item_child['education_D1D2_male'];
                                $education_D1D2_female += $item_child['education_D1D2_female'];
                                $education_SMA_male += $item_child['education_SMA_male'];
                                $education_SMA_female += $item_child['education_SMA_female'];
                                $education_SMP_male += $item_child['education_SMP_male'];
                                $education_SMP_female += $item_child['education_SMP_female'];
                                $education_SD_male += $item_child['education_SD_male'];
                                $education_SD_female += $item_child['education_SD_female'];
                                $education_Other_male += $item_child['education_Other_male'];
                                $education_Other_female += $item_child['education_Other_female'];
                                // --- Value Pendidikan ---

                                // --- Value Karir ---
                                $career_EXECUTIVE_male += $item_child['career_EXECUTIVE_male'];
                                $career_EXECUTIVE_female += $item_child['career_EXECUTIVE_female'];
                                $career_ASEXECUTIVE_male += $item_child['career_ASEXECUTIVE_male'];
                                $career_ASEXECUTIVE_female += $item_child['career_ASEXECUTIVE_female'];
                                $career_GM_male += $item_child['career_GM_male'];
                                $career_GM_female += $item_child['career_GM_female'];
                                $career_MANAGER_male += $item_child['career_MANAGER_male'];
                                $career_MANAGER_female += $item_child['career_MANAGER_female'];
                                $career_COORDINATOR_male += $item_child['career_COORDINATOR_male'];
                                $career_COORDINATOR_female += $item_child['career_COORDINATOR_female'];
                                $career_OFFICER_male += $item_child['career_OFFICER_male'];
                                $career_OFFICER_female += $item_child['career_OFFICER_female'];
                                $career_SS_male += $item_child['career_SS_male'];
                                $career_SS_female += $item_child['career_SS_female'];
                                $career_OTHER_male += $item_child['career_OTHER_male'];
                                $career_OTHER_female += $item_child['career_OTHER_female'];
                                // --- Value Karir ---

                                // --- Value Usia ---
                                $age_30_male += $item_child['age_30_male'];
                                $age_30_female += $item_child['age_30_female'];
                                $age_3045_male += $item_child['age_3045_male'];
                                $age_3045_female += $item_child['age_3045_female'];
                                $age_45_male += $item_child['age_45_male'];
                                $age_45_female += $item_child['age_45_female'];
                                // --- Value Usia ---

                                // --- Value Turnover ---
                                $to_30_male += $item_child['to_30_male'];
                                $to_30_female += $item_child['to_30_female'];
                                $to_3045_male += $item_child['to_3045_male'];
                                $to_3045_female += $item_child['to_3045_female'];
                                $to_45_male += $item_child['to_45_male'];
                                $to_45_female += $item_child['to_45_female'];
                                // --- Value Turnover ---
                            }
                        }

                        // --- Value Status ---
                        $item_item['gender_permanent_male'] = $gender_permanent_male;
                        $item_item['gender_permanent_female'] = $gender_permanent_female;
                        $item_item['gender_contract_male'] = $gender_contract_male;
                        $item_item['gender_contract_female'] = $gender_contract_female;
                        // --- Value Status ---

                        // --- Value Pendidikan ---
                        $item_item['education_S3_male'] = $education_S3_male;
                        $item_item['education_S3_female'] = $education_S3_female;
                        $item_item['education_S2_male'] = $education_S2_male;
                        $item_item['education_S2_female'] = $education_S2_female;
                        $item_item['education_Profesi_male'] = $education_Profesi_male;
                        $item_item['education_Profesi_female'] = $education_Profesi_female;
                        $item_item['education_S1_male'] = $education_S1_male;
                        $item_item['education_S1_female'] = $education_S1_female;
                        $item_item['education_SP2_male'] = $education_SP2_male;
                        $item_item['education_SP2_female'] = $education_SP2_female;
                        $item_item['education_SP1_male'] = $education_SP1_male;
                        $item_item['education_SP1_female'] = $education_SP1_female;
                        $item_item['education_D3D4_male'] = $education_D3D4_male;
                        $item_item['education_D3D4_female'] = $education_D3D4_female;
                        $item_item['education_D1D2_male'] = $education_D1D2_male;
                        $item_item['education_D1D2_female'] = $education_D1D2_female;
                        $item_item['education_SMA_male'] = $education_SMA_male;
                        $item_item['education_SMA_female'] = $education_SMA_female;
                        $item_item['education_SMP_male'] = $education_SMP_male;
                        $item_item['education_SMP_female'] = $education_SMP_female;
                        $item_item['education_SD_male'] = $education_SD_male;
                        $item_item['education_SD_female'] = $education_SD_female;
                        $item_item['education_Other_male'] = $education_Other_male;
                        $item_item['education_Other_female'] = $education_Other_female;
                        // --- Value Pendidikan ---

                        // --- Value Karir ---
                        $item_item['career_EXECUTIVE_male'] = $career_EXECUTIVE_male;
                        $item_item['career_EXECUTIVE_female'] = $career_EXECUTIVE_female;
                        $item_item['career_ASEXECUTIVE_male'] = $career_ASEXECUTIVE_male;
                        $item_item['career_ASEXECUTIVE_female'] = $career_ASEXECUTIVE_female;
                        $item_item['career_GM_male'] = $career_GM_male;
                        $item_item['career_GM_female'] = $career_GM_female;
                        $item_item['career_MANAGER_male'] = $career_MANAGER_male;
                        $item_item['career_MANAGER_female'] = $career_MANAGER_female;
                        $item_item['career_COORDINATOR_male'] = $career_COORDINATOR_male;
                        $item_item['career_COORDINATOR_female'] = $career_COORDINATOR_female;
                        $item_item['career_OFFICER_male'] = $career_OFFICER_male;
                        $item_item['career_OFFICER_female'] = $career_OFFICER_female;
                        $item_item['career_SS_male'] = $career_SS_male;
                        $item_item['career_SS_female'] = $career_SS_female;
                        $item_item['career_OTHER_male'] = $career_OTHER_male;
                        $item_item['career_OTHER_female'] = $career_OTHER_female;
                        // --- Value Karir ---

                        // --- Value Usia ---
                        $item_item['age_30_male'] = $age_30_male;
                        $item_item['age_30_female'] = $age_30_female;
                        $item_item['age_3045_male'] = $age_3045_male;
                        $item_item['age_3045_female'] = $age_3045_female;
                        $item_item['age_45_male'] = $age_45_male;
                        $item_item['age_45_female'] = $age_45_female;
                        // --- Value Usia ---

                        // --- Value Turnover ---
                        $item_item['to_30_male'] = $to_30_male;
                        $item_item['to_30_female'] = $to_30_female;
                        $item_item['to_3045_male'] = $to_3045_male;
                        $item_item['to_3045_female'] = $to_3045_female;
                        $item_item['to_45_male'] = $to_45_male;
                        $item_item['to_45_female'] = $to_45_female;
                        // --- Value Turnover ---

                    }

                    // --- Value Status ---
                    $objSheet->getCell($key.'9')->setValue($item_item['gender_permanent_male']);
                    $objSheet->getCell($key.'10')->setValue($item_item['gender_permanent_female']);
                    $objSheet->getCell($key.'11')->setValue($item_item['gender_contract_male']);
                    $objSheet->getCell($key.'12')->setValue($item_item['gender_contract_female']);
                    // --- Value Status ---

                    // --- Value Pendidikan ---
                    $objSheet->getCell($key.'21')->setValue($item_item['education_S3_male']);
                    $objSheet->getCell($key.'22')->setValue($item_item['education_S3_female']);
                    $objSheet->getCell($key.'23')->setValue($item_item['education_S2_male']);
                    $objSheet->getCell($key.'24')->setValue($item_item['education_S2_female']);
                    $objSheet->getCell($key.'25')->setValue($item_item['education_Profesi_male']);
                    $objSheet->getCell($key.'26')->setValue($item_item['education_Profesi_female']);
                    $objSheet->getCell($key.'27')->setValue($item_item['education_S1_male']);
                    $objSheet->getCell($key.'28')->setValue($item_item['education_S1_female']);
                    $objSheet->getCell($key.'29')->setValue($item_item['education_SP2_male']);
                    $objSheet->getCell($key.'30')->setValue($item_item['education_SP2_female']);
                    $objSheet->getCell($key.'31')->setValue($item_item['education_SP1_male']);
                    $objSheet->getCell($key.'32')->setValue($item_item['education_SP1_female']);
                    $objSheet->getCell($key.'33')->setValue($item_item['education_D3D4_male']);
                    $objSheet->getCell($key.'34')->setValue($item_item['education_D3D4_female']);
                    $objSheet->getCell($key.'35')->setValue($item_item['education_D1D2_male']);
                    $objSheet->getCell($key.'36')->setValue($item_item['education_D1D2_female']);
                    $objSheet->getCell($key.'37')->setValue($item_item['education_SMA_male']);
                    $objSheet->getCell($key.'38')->setValue($item_item['education_SMA_female']);
                    $objSheet->getCell($key.'39')->setValue($item_item['education_SMP_male']);
                    $objSheet->getCell($key.'40')->setValue($item_item['education_SMP_female']);
                    $objSheet->getCell($key.'41')->setValue($item_item['education_SD_male']);
                    $objSheet->getCell($key.'42')->setValue($item_item['education_SD_female']);
                    $objSheet->getCell($key.'43')->setValue($item_item['education_Other_male']);
                    $objSheet->getCell($key.'44')->setValue($item_item['education_Other_female']);
                    // --- Value Pendidikan ---

                    // --- Value Karir ---
                    $objSheet->getCell($key.'52')->setValue($item_item['career_EXECUTIVE_male']);
                    $objSheet->getCell($key.'53')->setValue($item_item['career_EXECUTIVE_female']);
                    $objSheet->getCell($key.'54')->setValue($item_item['career_ASEXECUTIVE_male']);
                    $objSheet->getCell($key.'55')->setValue($item_item['career_ASEXECUTIVE_female']);
                    $objSheet->getCell($key.'56')->setValue($item_item['career_GM_male']);
                    $objSheet->getCell($key.'57')->setValue($item_item['career_GM_female']);
                    $objSheet->getCell($key.'58')->setValue($item_item['career_MANAGER_male']);
                    $objSheet->getCell($key.'59')->setValue($item_item['career_MANAGER_female']);
                    $objSheet->getCell($key.'60')->setValue($item_item['career_COORDINATOR_male']);
                    $objSheet->getCell($key.'61')->setValue($item_item['career_COORDINATOR_female']);
                    $objSheet->getCell($key.'62')->setValue($item_item['career_OFFICER_male']);
                    $objSheet->getCell($key.'63')->setValue($item_item['career_OFFICER_female']);
                    $objSheet->getCell($key.'64')->setValue($item_item['career_SS_male']);
                    $objSheet->getCell($key.'65')->setValue($item_item['career_SS_female']);
                    $objSheet->getCell($key.'66')->setValue($item_item['career_OTHER_male']);
                    $objSheet->getCell($key.'67')->setValue($item_item['career_OTHER_female']);
                    // --- Value Karir ---

                    // --- Value Usia ---
                    $objSheet->getCell($key.'75')->setValue($item_item['age_30_male']);
                    $objSheet->getCell($key.'76')->setValue($item_item['age_30_female']);
                    $objSheet->getCell($key.'77')->setValue($item_item['age_3045_male']);
                    $objSheet->getCell($key.'78')->setValue($item_item['age_3045_female']);
                    $objSheet->getCell($key.'79')->setValue($item_item['age_45_male']);
                    $objSheet->getCell($key.'80')->setValue($item_item['age_45_female']);
                    // --- Value Usia ---

                    // --- Value Turnover ---
                    $objSheet->getCell($key.'88')->setValue($item_item['to_30_male']);
                    $objSheet->getCell($key.'89')->setValue($item_item['to_30_female']);
                    $objSheet->getCell($key.'90')->setValue($item_item['to_3045_male']);
                    $objSheet->getCell($key.'91')->setValue($item_item['to_3045_female']);
                    $objSheet->getCell($key.'92')->setValue($item_item['to_45_male']);
                    $objSheet->getCell($key.'93')->setValue($item_item['to_45_female']);
                    // --- Value Turnover ---

                }
            }
            // --- Value Status ---
            $objSheet->getCell($key.'13')->setValue('=SUM('.$key.'9:'.$key.'12)');
            // --- Value Status ---

            // --- Value Pendidikan ---
            $objSheet->getCell($key.'45')->setValue('=SUM('.$key.'21:'.$key.'44)');
            // --- Value Pendidikan ---

            // --- Value Pendidikan ---
            $objSheet->getCell($key.'68')->setValue('=SUM('.$key.'52:'.$key.'67)');
            // --- Value Pendidikan ---

            // --- Value Usia ---
            $objSheet->getCell($key.'81')->setValue('=SUM('.$key.'75:'.$key.'80)');
            // --- Value Usia ---

            // --- Value Turnover ---
            $objSheet->getCell($key.'94')->setValue('=SUM('.$key.'88:'.$key.'93)');
            // --- Value Turnover ---
        }
        // --- Tulisan Value ---


        // --- Tulisan Total di samping ---
        // --- Header ---
        $result_col_total = $this->getdata_coltotal();
        
        if($result_col_total && array_key_exists(0, $result_col_total)){
            $col_excel_total = $result_col_total[0];
            $headStyle_jumlah = array(
                        'fill' => array(
                            'type' => PHPExcel_Style_Fill::FILL_SOLID,
                            'color' => array('rgb' => 'ffc000')
                        ),
                        'alignment' => array(
                            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                        )
                    );

            // --- Value Status ---
            $array_total[0]['start'] = '6';
            $array_total[0]['end'] = '13';

            // --- Value Pendidikan ---
            $array_total[1]['start'] = '18';
            $array_total[1]['end'] = '45';

            // --- Value Pendidikan ---
            $array_total[2]['start'] = '49';
            $array_total[2]['end'] = '68';

            // --- Value Usia ---
            $array_total[3]['start'] = '72';
            $array_total[3]['end'] = '81';

            // --- Value Turnover ---
            $array_total[4]['start'] = '85';
            $array_total[4]['end'] = '94';

            if($col_excel_total['col_excel_total_ctra']){
                $objSheet->getCell($col_excel_total['col_excel_total_ctra'].'4')->setValue('CTRA');

                foreach($array_total as $key => $item){

                    $objSheet->getCell($col_excel_total['col_excel_total_ctra'].$item['start'])->setValue('Jumlah');
                    $objSheet->mergeCells($col_excel_total['col_excel_total_ctra'].$item['start'].':'.$col_excel_total['col_excel_total_ctra'].($item['start']+2));
                    $objSheet->getStyle($col_excel_total['col_excel_total_ctra'].$item['start'])->applyFromArray($headStyle_jumlah);

                    $objSheet->getStyle($col_excel_total['col_excel_total_ctra'].$item['start'].':'.$col_excel_total['col_excel_total_ctra'].$item['end'])->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

                }
            }

            if($col_excel_total['col_excel_total_ntbk']){
                $headStyle_ntbk = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => '8497b0')
                    ),
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    )
                );

                $objSheet->getCell($col_excel_total['col_excel_total_ntbk'].'4')->setValue('NTBK');
                $objSheet->getStyle($col_excel_total['col_excel_total_ntbk'].'4')->applyFromArray($headStyle_ntbk);

                foreach($array_total as $key => $item){

                    $objSheet->getCell($col_excel_total['col_excel_total_ntbk'].$item['start'])->setValue('Jumlah');
                    $objSheet->mergeCells($col_excel_total['col_excel_total_ntbk'].$item['start'].':'.$col_excel_total['col_excel_total_ntbk'].($item['start']+2));
                    $objSheet->getStyle($col_excel_total['col_excel_total_ntbk'].$item['start'])->applyFromArray($headStyle_jumlah);

                    $objSheet->getStyle($col_excel_total['col_excel_total_ntbk'].$item['start'].':'.$col_excel_total['col_excel_total_ntbk'].$item['end'])->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

                }
            }

            if($col_excel_total['col_excel_total_all']){
                
                $objSheet->getCell($col_excel_total['col_excel_total_all'].'4')->setValue('TOTAL CTRA & NTBK');

                foreach($array_total as $key => $item){

                    $objSheet->getCell($col_excel_total['col_excel_total_all'].$item['start'])->setValue('Jumlah');
                    $objSheet->getStyle($col_excel_total['col_excel_total_all'].$item['start'])->applyFromArray($headStyle_jumlah);
                    $objSheet->mergeCells($col_excel_total['col_excel_total_all'].$item['start'].':'.$col_excel_total['col_excel_total_all'].($item['start']+2));

                    $objSheet->getStyle($col_excel_total['col_excel_total_all'].$item['start'].':'.$col_excel_total['col_excel_total_all'].$item['end'])->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

                    // --- TOTAL ---
                    for ($i=($item['start']+3); $i <= $item['end']; $i++) { 
                        $objSheet->getCell($col_excel_total['col_excel_total_all'].$i)->setValue('=SUM('.$col_excel_total['col_excel_total_ctra'].$i.':'.$col_excel_total['col_excel_total_ntbk'].$i.')');

                        if($i == $item['end']){
                            $valueStyle_jumlahsamping = array(
                                'font'  => array(
                                            'bold'  => true,
                                ),
                            );
                            $objSheet->getStyle($col_excel_total['col_excel_total_all'].$i)->applyFromArray($valueStyle_jumlahsamping);
                        }
                    }
                    // --- TOTAL ---
                }
            }
        }
        // --- Header ---

        $array_total_param = array('ctra','ntbk');

        foreach($array_total_param as $key_param => $item_param){
            // --- Value Status ---
            $total_samping_gender_permanent_male = 0;
            $total_samping_gender_permanent_female = 0;
            $total_samping_gender_contract_male = 0;
            $total_samping_gender_contract_female = 0;
            // --- Value Status ---

            // --- Value Pendidikan ---
            $total_samping_education_S3_male = 0;
            $total_samping_education_S3_female = 0;
            $total_samping_education_S2_male = 0;
            $total_samping_education_S2_female = 0;
            $total_samping_education_Profesi_male = 0;
            $total_samping_education_Profesi_female = 0;
            $total_samping_education_S1_male = 0;
            $total_samping_education_S1_female = 0;
            $total_samping_education_SP2_male = 0;
            $total_samping_education_SP2_female = 0;
            $total_samping_education_SP1_male = 0;
            $total_samping_education_SP1_female = 0;
            $total_samping_education_D3D4_male = 0;
            $total_samping_education_D3D4_female = 0;
            $total_samping_education_D1D2_male = 0;
            $total_samping_education_D1D2_female = 0;
            $total_samping_education_SMA_male = 0;
            $total_samping_education_SMA_female = 0;
            $total_samping_education_SMP_male = 0;
            $total_samping_education_SMP_female = 0;
            $total_samping_education_SD_male = 0;
            $total_samping_education_SD_female = 0;
            $total_samping_education_Other_male = 0;
            $total_samping_education_Other_female = 0;
            // --- Value Pendidikan ---

            // --- Value Karir ---
            $total_samping_career_EXECUTIVE_male = 0;
            $total_samping_career_EXECUTIVE_female = 0;
            $total_samping_career_ASEXECUTIVE_male = 0;
            $total_samping_career_ASEXECUTIVE_female = 0;
            $total_samping_career_GM_male = 0;
            $total_samping_career_GM_female = 0;
            $total_samping_career_MANAGER_male = 0;
            $total_samping_career_MANAGER_female = 0;
            $total_samping_career_COORDINATOR_male = 0;
            $total_samping_career_COORDINATOR_female = 0;
            $total_samping_career_OFFICER_male = 0;
            $total_samping_career_OFFICER_female = 0;
            $total_samping_career_SS_male = 0;
            $total_samping_career_SS_female = 0;
            $total_samping_career_OTHER_male = 0;
            $total_samping_career_OTHER_female = 0;
            // --- Value Karir ---

            // --- Value Usia ---
            $total_samping_age_30_male = 0;
            $total_samping_age_30_female = 0;
            $total_samping_age_3045_male = 0;
            $total_samping_age_3045_female = 0;
            $total_samping_age_45_male = 0;
            $total_samping_age_45_female = 0;
            // --- Value Usia ---

            // --- Value Turnover ---
            $total_samping_to_30_male = 0;
            $total_samping_to_30_female = 0;
            $total_samping_to_3045_male = 0;
            $total_samping_to_3045_female = 0;
            $total_samping_to_45_male = 0;
            $total_samping_to_45_female = 0;
            // --- Value Turnover ---

            foreach($project as $key =>$item){
                foreach($result as $key_item => $item_item){
                    if(($item_item['col_excel_annual'] == $key)){
                        //hitung yg CTRA saja
                        if($item_item['ctra_ntbk']== $item_param){

                            // --- Value Status ---
                            $total_samping_gender_permanent_male += $item_item['gender_permanent_male'];
                            $total_samping_gender_permanent_female += $item_item['gender_permanent_female'];
                            $total_samping_gender_contract_male += $item_item['gender_contract_male'];
                            $total_samping_gender_contract_female += $item_item['gender_contract_female'];
                            // --- Value Status ---

                            // --- Value Pendidikan ---
                            $total_samping_education_S3_male += $item_item['education_S3_male'];
                            $total_samping_education_S3_female += $item_item['education_S3_female'];
                            $total_samping_education_S2_male += $item_item['education_S2_male'];
                            $total_samping_education_S2_female += $item_item['education_S2_female'];
                            $total_samping_education_Profesi_male += $item_item['education_Profesi_male'];
                            $total_samping_education_Profesi_female += $item_item['education_Profesi_female'];
                            $total_samping_education_S1_male += $item_item['education_S1_male'];
                            $total_samping_education_S1_female += $item_item['education_S1_female'];
                            $total_samping_education_SP2_male += $item_item['education_SP2_male'];
                            $total_samping_education_SP2_female += $item_item['education_SP2_female'];
                            $total_samping_education_SP1_male += $item_item['education_SP1_male'];
                            $total_samping_education_SP1_female += $item_item['education_SP1_female'];
                            $total_samping_education_D3D4_male += $item_item['education_D3D4_male'];
                            $total_samping_education_D3D4_female += $item_item['education_D3D4_female'];
                            $total_samping_education_D1D2_male += $item_item['education_D1D2_male'];
                            $total_samping_education_D1D2_female += $item_item['education_D1D2_female'];
                            $total_samping_education_SMA_male += $item_item['education_SMA_male'];
                            $total_samping_education_SMA_female += $item_item['education_SMA_female'];
                            $total_samping_education_SMP_male += $item_item['education_SMP_male'];
                            $total_samping_education_SMP_female += $item_item['education_SMP_female'];
                            $total_samping_education_SD_male += $item_item['education_SD_male'];
                            $total_samping_education_SD_female += $item_item['education_SD_female'];
                            $total_samping_education_Other_male += $item_item['education_Other_male'];
                            $total_samping_education_Other_female += $item_item['education_Other_female'];
                            // --- Value Pendidikan ---

                            // --- Value Karir ---
                            $total_samping_career_EXECUTIVE_male += $item_item['career_EXECUTIVE_male'];
                            $total_samping_career_EXECUTIVE_female += $item_item['career_EXECUTIVE_female'];
                            $total_samping_career_ASEXECUTIVE_male += $item_item['career_ASEXECUTIVE_male'];
                            $total_samping_career_ASEXECUTIVE_female += $item_item['career_ASEXECUTIVE_female'];
                            $total_samping_career_GM_male += $item_item['career_GM_male'];
                            $total_samping_career_GM_female += $item_item['career_GM_female'];
                            $total_samping_career_MANAGER_male += $item_item['career_MANAGER_male'];
                            $total_samping_career_MANAGER_female += $item_item['career_MANAGER_female'];
                            $total_samping_career_COORDINATOR_male += $item_item['career_COORDINATOR_male'];
                            $total_samping_career_COORDINATOR_female += $item_item['career_COORDINATOR_female'];
                            $total_samping_career_OFFICER_male += $item_item['career_OFFICER_male'];
                            $total_samping_career_OFFICER_female += $item_item['career_OFFICER_female'];
                            $total_samping_career_SS_male += $item_item['career_SS_male'];
                            $total_samping_career_SS_female += $item_item['career_SS_female'];
                            $total_samping_career_OTHER_male += $item_item['career_OTHER_male'];
                            $total_samping_career_OTHER_female += $item_item['career_OTHER_female'];
                            // --- Value Karir ---

                            // --- Value Usia ---
                            $total_samping_age_30_male += $item_item['age_30_male'];
                            $total_samping_age_30_female += $item_item['age_30_female'];
                            $total_samping_age_3045_male += $item_item['age_3045_male'];
                            $total_samping_age_3045_female += $item_item['age_3045_female'];
                            $total_samping_age_45_male += $item_item['age_45_male'];
                            $total_samping_age_45_female += $item_item['age_45_female'];
                            // --- Value Usia ---

                            // --- Value Turnover ---
                            $total_samping_to_30_male += $item_item['to_30_male'];
                            $total_samping_to_30_female += $item_item['to_30_female'];
                            $total_samping_to_3045_male += $item_item['to_3045_male'];
                            $total_samping_to_3045_female += $item_item['to_3045_female'];
                            $total_samping_to_45_male += $item_item['to_45_male'];
                            $total_samping_to_45_female += $item_item['to_45_female'];
                            // --- Value Turnover ---

                        }
                    }
                }
            }

            // --- Style Total disamping ---
            $valueStyle_jumlahsamping = array(
                'font'  => array(
                            'bold'  => true,
                ),
            );
            // --- Style Total disamping ---
                
            $col_excel_total = $result_col_total[0];
                
            if($item_param == 'ctra'){
                $col_excel = $col_excel_total['col_excel_total_ctra'];
            }elseif($item_param == 'ntbk'){
                $col_excel = $col_excel_total['col_excel_total_ntbk'];
            }

            // --- Value Status ---
            $objSheet->getCell($col_excel.'9')->setValue($total_samping_gender_permanent_male);
            $objSheet->getCell($col_excel.'10')->setValue($total_samping_gender_permanent_female);
            $objSheet->getCell($col_excel.'11')->setValue($total_samping_gender_contract_male);
            $objSheet->getCell($col_excel.'12')->setValue($total_samping_gender_contract_female);

            $objSheet->getCell($col_excel.'13')->setValue('=SUM('.$col_excel.'9:'.$col_excel.'12)');
            $objSheet->getStyle($col_excel.'13')->applyFromArray($valueStyle_jumlahsamping);
            // --- Value Status ---

            // --- Value Pendidikan ---
            $objSheet->getCell($col_excel.'21')->setValue($total_samping_education_S3_male);
            $objSheet->getCell($col_excel.'22')->setValue($total_samping_education_S3_female);
            $objSheet->getCell($col_excel.'23')->setValue($total_samping_education_S2_male);
            $objSheet->getCell($col_excel.'24')->setValue($total_samping_education_S2_female);
            $objSheet->getCell($col_excel.'25')->setValue($total_samping_education_Profesi_male);
            $objSheet->getCell($col_excel.'26')->setValue($total_samping_education_Profesi_female);
            $objSheet->getCell($col_excel.'27')->setValue($total_samping_education_S1_male);
            $objSheet->getCell($col_excel.'28')->setValue($total_samping_education_S1_female);
            $objSheet->getCell($col_excel.'29')->setValue($total_samping_education_SP2_male);
            $objSheet->getCell($col_excel.'30')->setValue($total_samping_education_SP2_female);
            $objSheet->getCell($col_excel.'31')->setValue($total_samping_education_SP1_male);
            $objSheet->getCell($col_excel.'32')->setValue($total_samping_education_SP1_female);
            $objSheet->getCell($col_excel.'33')->setValue($total_samping_education_D3D4_male);
            $objSheet->getCell($col_excel.'34')->setValue($total_samping_education_D3D4_female);
            $objSheet->getCell($col_excel.'35')->setValue($total_samping_education_D1D2_male);
            $objSheet->getCell($col_excel.'36')->setValue($total_samping_education_D1D2_female);
            $objSheet->getCell($col_excel.'37')->setValue($total_samping_education_SMA_male);
            $objSheet->getCell($col_excel.'38')->setValue($total_samping_education_SMA_female);
            $objSheet->getCell($col_excel.'39')->setValue($total_samping_education_SMP_male);
            $objSheet->getCell($col_excel.'40')->setValue($total_samping_education_SMP_female);
            $objSheet->getCell($col_excel.'41')->setValue($total_samping_education_SD_male);
            $objSheet->getCell($col_excel.'42')->setValue($total_samping_education_SD_female);
            $objSheet->getCell($col_excel.'43')->setValue($total_samping_education_Other_male);
            $objSheet->getCell($col_excel.'44')->setValue($total_samping_education_Other_female);

            $objSheet->getCell($col_excel.'45')->setValue('=SUM('.$col_excel.'21:'.$col_excel.'44)');
            $objSheet->getStyle($col_excel.'45')->applyFromArray($valueStyle_jumlahsamping);
            // --- Value Pendidikan ---

            // --- Value Karir ---
            $objSheet->getCell($col_excel.'52')->setValue($total_samping_career_EXECUTIVE_male);
            $objSheet->getCell($col_excel.'53')->setValue($total_samping_career_EXECUTIVE_female);
            $objSheet->getCell($col_excel.'54')->setValue($total_samping_career_ASEXECUTIVE_male);
            $objSheet->getCell($col_excel.'55')->setValue($total_samping_career_ASEXECUTIVE_female);
            $objSheet->getCell($col_excel.'56')->setValue($total_samping_career_GM_male);
            $objSheet->getCell($col_excel.'57')->setValue($total_samping_career_GM_female);
            $objSheet->getCell($col_excel.'58')->setValue($total_samping_career_MANAGER_male);
            $objSheet->getCell($col_excel.'59')->setValue($total_samping_career_MANAGER_female);
            $objSheet->getCell($col_excel.'60')->setValue($total_samping_career_COORDINATOR_male);
            $objSheet->getCell($col_excel.'61')->setValue($total_samping_career_COORDINATOR_female);
            $objSheet->getCell($col_excel.'62')->setValue($total_samping_career_OFFICER_male);
            $objSheet->getCell($col_excel.'63')->setValue($total_samping_career_OFFICER_female);
            $objSheet->getCell($col_excel.'64')->setValue($total_samping_career_SS_male);
            $objSheet->getCell($col_excel.'65')->setValue($total_samping_career_SS_female);
            $objSheet->getCell($col_excel.'66')->setValue($total_samping_career_OTHER_male);
            $objSheet->getCell($col_excel.'67')->setValue($total_samping_career_OTHER_female);

            $objSheet->getCell($col_excel.'68')->setValue('=SUM('.$col_excel.'52:'.$col_excel.'67)');
            $objSheet->getStyle($col_excel.'68')->applyFromArray($valueStyle_jumlahsamping);
            // --- Value Karir ---

            // --- Value Usia ---
            $objSheet->getCell($col_excel.'75')->setValue($total_samping_age_30_male);
            $objSheet->getCell($col_excel.'76')->setValue($total_samping_age_30_female);
            $objSheet->getCell($col_excel.'77')->setValue($total_samping_age_3045_male);
            $objSheet->getCell($col_excel.'78')->setValue($total_samping_age_3045_female);
            $objSheet->getCell($col_excel.'79')->setValue($total_samping_age_45_male);
            $objSheet->getCell($col_excel.'80')->setValue($total_samping_age_45_female);

            $objSheet->getCell($col_excel.'81')->setValue('=SUM('.$col_excel.'75:'.$col_excel.'80)');
            $objSheet->getStyle($col_excel.'81')->applyFromArray($valueStyle_jumlahsamping);
            // --- Value Usia ---

            // --- Value Turnover ---
            $objSheet->getCell($col_excel.'88')->setValue($total_samping_to_30_male);
            $objSheet->getCell($col_excel.'89')->setValue($total_samping_to_30_female);
            $objSheet->getCell($col_excel.'90')->setValue($total_samping_to_3045_male);
            $objSheet->getCell($col_excel.'91')->setValue($total_samping_to_3045_female);
            $objSheet->getCell($col_excel.'92')->setValue($total_samping_to_45_male);
            $objSheet->getCell($col_excel.'93')->setValue($total_samping_to_45_female);

            $objSheet->getCell($col_excel.'94')->setValue('=SUM('.$col_excel.'88:'.$col_excel.'93)');
            $objSheet->getStyle($col_excel.'94')->applyFromArray($valueStyle_jumlahsamping);
            // --- Value Turnover ---
        }
        // --- Tulisan Total di samping ---

        // --- SUBBODY RIGHT ---
        // --- SUBBODY ---

        // --- BODY ---

        // autosize the columns
        // foreach (range('A', 'ET') as $letra) {    
        for ($letra = 'A'; $letra != 'EZ'; $letra++) {          
            $objSheet->getColumnDimension($letra)->setAutoSize(true);
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'AnnualReport';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setting->_user_id . ".xls";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setting->_user_id . ".xls";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

    function exceldata_annual_v3($data) {
        
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();

        // untuk hasil data
        $result = $this->getdata($data);
        // untuk hasil data

        // untuk data apa saja yg ingin ditampilkan
        $result_view = $this->getdata_view();
        // untuk data apa saja yg ingin ditampilkan

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
        $objSheet->setTitle('Annual Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4

        // --- HEADER ---
        $objSheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $objSheet->getCell('A1')->setValue('Annual Report'); 
        $objSheet->mergeCells('A1:J1');

        $objSheet->getStyle('A2')->getFont()->setBold(false)->setSize(11);
        $objSheet->getCell('A2')->setValue("".date('d F Y',strtotime($data['asof_date']))); 
        $objSheet->mergeCells('A2:J2');

        $objSheet->getStyle('B3')->getFont()->setBold(false)->setSize(8);
        $objSheet->getCell('B3')->setValue('*Hasil pada kolom Total di Project PT tahun tersebut merupakan data tembakan, karena data real belum ada/lengkap');
        $objSheet->mergeCells('B3:C3');

        $style = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        );

        $objSheet->getStyle("A1:J1")->applyFromArray($style);
        $objSheet->getStyle("A2:J2")->applyFromArray($style);
        $objSheet->freezePane('K5');
        // --- HEADER ---

        // --- BODY ---
        $objSheet->getStyle('A4:J4')->getFont()->setBold(true)->setSize(11);

        // write header
        $objSheet->getCell('A4')->setValue('No');    
        $objSheet->getCell('B4')->setValue('PT Name');   
        $objSheet->getCell('C4')->setValue('Project Name');
        $objSheet->getCell('D4')->setValue('Group');
        $objSheet->getCell('E4')->setValue('SH');    
        $objSheet->getCell('F4')->setValue('Year');   
        $objSheet->getCell('G4')->setValue('Gender');
        $objSheet->getCell('H4')->setValue('Kategori 1');
        $objSheet->getCell('I4')->setValue('Kategori 2');
        $objSheet->getCell('J4')->setValue('Total');

        $i = 5;
        $no = 1;
        $param_olddata = '';

        foreach($result_view as $key => $item){
            foreach ($result as $key_row => $row) {

                //untuk tembak data lama
                $param_olddata['tbk_id'] = $row['tbk_id'];
                $param_olddata['year'] = date('Y',strtotime($data['asof_date']));
                $result_olddata = $this->getdata_olddata($param_olddata);

                if(array_key_exists(0, $result_olddata)){
                    foreach($result_olddata as $key_olddata => $item_olddata){
                        if($item['annual_select_name'] == $item_olddata['annual_select_name']){
                            $row[$item_olddata['annual_select_name']] = $item_olddata['total'];
                        }
                    }

                    $row['pt'] = $row['pt'] .' *';
                    $row['project'] = $row['project'] .' *';
                }
                //untuk tembak data lama

                $objSheet->getCell('A' . $i)->setValue($no);    
                $objSheet->getCell('B' . $i)->setValue($row['pt']);
                $objSheet->getCell('C' . $i)->setValue($row['project']);
                $objSheet->getCell('D' . $i)->setValue(strtoupper($row['ctra_ntbk']));
                $objSheet->getCell('E' . $i)->setValue(strtoupper($row['subholding']));    
                $objSheet->getCell('F' . $i)->setValue(date('Y',strtotime($data['asof_date'])));
                $objSheet->getCell('G' . $i)->setValue($item['gender']);
                $objSheet->getCell('H' . $i)->setValue($item['kategori1']);
                $objSheet->getCell('I' . $i)->setValue($item['kategori2']);  
                $objSheet->getCell('J' . $i)->setValue($row[$item['annual_select_name']]);
                    
                $i++; $no++;
            }

        }
        $objSheet->setAutoFilter('A4:J4');
        // --- BODY ---

        // autosize the columns
        // foreach (range('A', 'ET') as $letra) {    
        for ($letra = 'A'; $letra != 'J'; $letra++) {          
            $objSheet->getColumnDimension($letra)->setAutoSize(true);
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A4:J' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A4:J' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A4:J4')->getBorders()->
                getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();

        //updated by anas 13092023
        $time = explode('.', microtime());
        $postfix = substr($time[1], 0, 5);
        $filename = 'AnnualReport' . date('Ymd') . "_" . $this->setting->_user_id . "_" . $postfix;

        $filedata = $this->destination . $filename . ".xls";
        $directfile = $this->httpdirect . $filename . ".xls";

        //insert ke table log
        $project_id = $data["project_project_id"];
        $pt_id = $data["pt_pt_id"];
        $report_type = $data["report_type"];
        $asof_date = $data["asof_date"];
        $report_filename = $filename . ".xls";

        $this->insert_hcreport_log($this->setting->_user_id, $project_id, $pt_id, $report_type, $asof_date, $report_filename);
        //end updated by anas

        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

    function exceldata_annual_raw($data) {
        
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        $result = $this->getdata($data);
        
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
        $objSheet->setTitle('Annual Raw Data');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:P1')->getFont()->setBold(true)->setSize(12);

        // --- HEADER ---
        $objSheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $objSheet->getCell('A1')->setValue('Annual Raw Data'); 
        $objSheet->mergeCells('A1:P1');

        $objSheet->getStyle('A2')->getFont()->setBold(false)->setSize(11);
        $objSheet->getCell('A2')->setValue("".date('d F Y',strtotime($data['asof_date']))); 
        $objSheet->mergeCells('A2:P2');

        $objSheet->getStyle('B3')->getFont()->setBold(false)->setSize(8);
        $objSheet->getCell('B3')->setValue('*Data pada Project PT tahun tersebut merupakan data tembakan, karena data real belum ada/lengkap');
        $objSheet->mergeCells('B3:D3');

        $style = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        );

        $objSheet->getStyle("A1:P1")->applyFromArray($style);
        $objSheet->getStyle("A2:P2")->applyFromArray($style);
        // $objSheet->freezePane('K5');
        // --- HEADER ---

        // write header
        $objSheet->getStyle('A4:P4')->getFont()->setBold(true)->setSize(11);
        $objSheet->setAutoFilter('A4:P4');

        $objSheet->getCell('A4')->setValue('No.');    
        $objSheet->getCell('B4')->setValue('Subholding');   
        $objSheet->getCell('C4')->setValue('Project');
        $objSheet->getCell('D4')->setValue('PT');
        $objSheet->getCell('E4')->setValue('NIK');
        $objSheet->getCell('F4')->setValue('Name');     
        $objSheet->getCell('G4')->setValue('Gender');
        $objSheet->getCell('H4')->setValue('Birth Date');
        $objSheet->getCell('I4')->setValue('Age');
        $objSheet->getCell('J4')->setValue('Employee Status');
        $objSheet->getCell('K4')->setValue('Education');    
        $objSheet->getCell('L4')->setValue('Banding'); 
        $objSheet->getCell('M4')->setValue('Job Family');   
        $objSheet->getCell('N4')->setValue('Employee Active');
        $objSheet->getCell('O4')->setValue('Hire Date');
        $objSheet->getCell('P4')->setValue('Nonactive Date');

        
        $i = 5;
        $no = 1;
        $param_olddata = '';
        $is_print = 0;
        $temp_olddata_id = 0;

        foreach ($result as $row) {

            //untuk tembak data lama
            $param_olddata['tbk_id'] = $row['tbk_id'];
            $param_olddata['year'] = date('Y',strtotime($data['asof_date']));
            $result_olddata = $this->getdata_olddata($param_olddata);

            if(array_key_exists(0, $result_olddata)){

                $row['subholding'] = $row['subholding'] .' *';
                $row['pt'] = $row['pt'] .' *';
                $row['project'] = $row['project'] .' *';
                $row['nik'] = '';
                $row['employee_name'] = '';
                $row['gender'] = '';
                $row['birth_date'] = '';
                $row['age'] = '';
                $row['employee_status'] = '';
                $row['education'] = '';
                $row['banding'] = '';
                $row['jobfamily'] = '';
                $row['employee_active'] = '';
                $row['hire_date'] = '';
                $row['nonactive_date'] = '';

                if($temp_olddata_id != $row['tbk_id']){
                    $temp_olddata_id = $row['tbk_id'];
                    $is_print = 1;
                }else{
                    $temp_olddata_id = $row['tbk_id'];
                    $is_print = 0;
                }


            }else{
                $is_print = 1;
            }
            //untuk tembak data lama

            if($is_print == 1){

            $objSheet->getCell('A' . $i)->setValue($no);
            $objSheet->getCell('B' . $i)->setValue($row['subholding']);    
            $objSheet->getCell('C' . $i)->setValue($row['project']);
            $objSheet->getCell('D' . $i)->setValue($row['pt']);
            $objSheet->getCell('E' . $i)->setValue($row['nik']);
            $objSheet->getCell('F' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('G' . $i)->setValue($row['gender']);    
            $objSheet->getCell('H' . $i)->setValue($row['birth_date']);
            $objSheet->getCell('I' . $i)->setValue($row['age']);
            $objSheet->getCell('J' . $i)->setValue(ucfirst(strtolower($row['employee_status'])));
            $objSheet->getCell('K' . $i)->setValue(strtoupper($row['education']));
            $objSheet->getCell('L' . $i)->setValue(ucfirst(strtolower($row['banding'])));    
            $objSheet->getCell('M' . $i)->setValue(ucfirst(strtolower($row['jobfamily'])));
            $objSheet->getCell('N' . $i)->setValue(ucfirst(strtolower($row['employee_active'])));
            $objSheet->getCell('O' . $i)->setValue($row['hire_date']);
            $objSheet->getCell('P' . $i)->setValue($row['nonactive_date']);

            $i++; $no++;

            }
        }
        

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A4:P' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A4:P' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A4:P4')->getBorders()->
                getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

        // autosize the columns
        for ($letra = 'A'; $letra != 'Q'; $letra++) {          
            $objSheet->getColumnDimension($letra)->setAutoSize(true);
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();

        //updated by anas 13092023
        $time = explode('.', microtime());
        $postfix = substr($time[1], 0, 5);
        $filename = 'AnnualRawData' . date('Ymd') . "_" . $this->setting->_user_id . "_" . $postfix;

        $filedata = $this->destination . $filename . ".xls";
        $directfile = $this->httpdirect . $filename . ".xls";

        //insert ke table log
        $project_id = $data["project_project_id"];
        $pt_id = $data["pt_pt_id"];
        $report_type = $data["report_type"];
        $asof_date = $data["asof_date"];
        $report_filename = $filename . ".xls";

        $this->insert_hcreport_log($this->setting->_user_id, $project_id, $pt_id, $report_type, $asof_date, $report_filename);
        //end updated by anas

        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

    //added by anas 13092023 | insert to table log after click View Report    
    public function insert_hcreport_log($user_id, $project_id, $pt_id, $report_type, $cutoff_date, $filename)
    {
        $this->setting->_storeprocedure = 'sp_log_hcreport_insert';
        $sp_data = array(
            $user_id,
            $project_id,
            $pt_id,
            $report_type,
            $cutoff_date,
            $filename
        );
        $result = $this->setting->executeSPReport($sp_data);

        return $result;      
    }
}

