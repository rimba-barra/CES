<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Report_ReportAging extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';

    function init() {
        $this->setting = new Erems_Models_General_Setup;
        $this->destination = getcwd() . '/app/erems/downloadfile/report/agingschedule_jatuhtempo/';
        $this->httpdirect = 'app/erems/downloadfile/report/agingschedule_jatuhtempo/';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $paramsp = array(
                    $param['project_id'],
                    $param['pt_id'],
                    $param['group_admin'],
                    $param['jatuhtempo_date'],
                    $param['sourcemoney_id']
                );
                $this->createFolder();
                switch ($param['mode_read']) {
                    case 'exportexcel_detail':
                        $result = $this->execSP3('sp_reportcollagingdetail_read', $paramsp);
                        $filedata = $this->createexcelDetail($result);                       
                        $valid = true;
                        $counter = 0;
                        $message = $filedata['direct'];
                        break;
                    case 'exportexcel_rekap':
                        $result = $this->execSP3('sp_reportcollagingdetail_read', $paramsp);
                        $filedata = $this->createexcelRekap($result);                       
                        $valid = true;
                        $counter = 0;
                        $message = $filedata['direct'];
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'default no action';
                }

                $return = array(
                    "success" => $valid,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['mode_read'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }

    function createexcelDetail($paramdata) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';

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
        $objSheet->setTitle('agingjatuhtempodetail');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:AB1')->getFont()->setBold(true)->setSize(12);

        // write header

        $objSheet->getCell('A1')->setValue('No');
        $objSheet->getCell('B1')->setValue('Purchase No');
        $objSheet->getCell('C1')->setValue('Purchase Date');
        $objSheet->getCell('D1')->setValue('Cluster');
        $objSheet->getCell('E1')->setValue('Block');
        $objSheet->getCell('F1')->setValue('Unit');
        $objSheet->getCell('G1')->setValue('Tie Rumah');
        $objSheet->getCell('H1')->setValue('Customer Name');
        $objSheet->getCell('I1')->setValue('Sales Price');
        $objSheet->getCell('J1')->setValue('Total Bayar s/d Bulan ini');
        $objSheet->getCell('K1')->setValue('Total Bayar Bulan ini');
        $objSheet->getCell('L1')->setValue('Piutang Jatuh tempo hari ini');
        $objSheet->getCell('M1')->setValue('Piutang Jatuh tempo s/d  akhir bulan ini');
        $objSheet->getCell('N1')->setValue('Cara Bayar');
        $objSheet->getCell('O1')->setValue('1-30 Hari');
        $objSheet->getCell('P1')->setValue('31 - 60 Hari');
        $objSheet->getCell('Q1')->setValue('61 - 90 Hari');
        $objSheet->getCell('R1')->setValue('> 90 Hari');
        $objSheet->getCell('S1')->setValue('Total');
        $objSheet->getCell('T1')->setValue('Hutang yang belum jatuh tempo');
        $objSheet->getCell('U1')->setValue('Nama Bank');
        $objSheet->getCell('V1')->setValue('Recommended to Cancel');
        $objSheet->getCell('W1')->setValue('Tanggal SP3K');
        $objSheet->getCell('X1')->setValue('Salesman');
        $objSheet->getCell('Y1')->setValue('Source 1-30 Hari');
        $objSheet->getCell('Z1')->setValue('Source 31-60 Hari');
        $objSheet->getCell('AA1')->setValue('Source 61-90 Hari');
        $objSheet->getCell('AB1')->setValue('Source > 90 Hari');


        $no = 0;
        $i = 1;
        $sum_harga_total_jual =0;
        $sum_total_bayar_sampai_bulan_in =0;
        $sum_total_bayar_bulan_ini =0;
        $sum_piutang_jatuh_tempo_hari_ini =0;
        $sum_piutang_jatuh_tempo_sampai_akhir_bulan_ini =0;
        $sum_dari_1_sampai_30 =0;
        $sum_dari_31_sampai_60 =0;
        $sum_dari_61_sampai_90 =0;
        $sum_lebihdari_90 =0;
        $sum_total_hutang =0;
        $sum_hutang_belum_jatuh_tempo =0;
       
        
        $sum_harga_total_jual =0;
        foreach ($paramdata[0] as $row) {
            $no++;
            $i++;
            
            $sum_harga_total_jual+=$row['harga_total_jual'];
            $sum_total_bayar_sampai_bulan_in+=$row['total_bayar_sampai_bulan_ini'];
            $sum_total_bayar_bulan_ini+=$row['total_bayar_bulan_ini'];
            $sum_piutang_jatuh_tempo_hari_ini+=$row['piutang_jatuh_tempo_hari_ini'];
            $sum_piutang_jatuh_tempo_sampai_akhir_bulan_ini+=$row['piutang_jatuh_tempo_sampai_akhir_bulan_ini'];
            $sum_dari_1_sampai_30+=$row['dari_1_sampai_30'];
            $sum_dari_31_sampai_60+=$row['dari_31_sampai_60'];
            $sum_dari_61_sampai_90+=$row['dari_61_sampai_90'];
            $sum_lebihdari_90+=$row['diatas_90'];
            $sum_total_hutang+=$row['total_hutang'];
            $sum_hutang_belum_jatuh_tempo+=$row['hutang_belum_jatuh_tempo'];
            
            
            $objSheet->getCell('A' . $i)->setValue($no);
            $objSheet->getCell('B' . $i)->setValue($row['purchaseletter_no']);
            $objSheet->getCell('C' . $i)->setValue(date('m/d/Y', strtotime($row['purchase_date'])));
            $objSheet->getCell('D' . $i)->setValue($row['cluster']);
            $objSheet->getCell('E' . $i)->setValue($row['block']);
            $objSheet->getCell('F' . $i)->setValue($row['unit_number']);
            $objSheet->getCell('G' . $i)->setValue($row['unit_type_name']);
            $objSheet->getCell('H' . $i)->setValue($row['customer_name']);
            $objSheet->getCell('I' . $i)->setValue($row['harga_total_jual']);
            $objSheet->getCell('J' . $i)->setValue($row['total_bayar_sampai_bulan_ini']);
            $objSheet->getCell('K' . $i)->setValue($row['total_bayar_bulan_ini']);
            $objSheet->getCell('L' . $i)->setValue($row['piutang_jatuh_tempo_hari_ini']);
            $objSheet->getCell('M' . $i)->setValue($row['piutang_jatuh_tempo_sampai_akhir_bulan_ini']);
            $objSheet->getCell('N' . $i)->setValue($row['pricetype']);
            $objSheet->getCell('O' . $i)->setValue($row['dari_1_sampai_30']);
            $objSheet->getCell('P' . $i)->setValue($row['dari_31_sampai_60']);
            $objSheet->getCell('Q' . $i)->setValue($row['dari_61_sampai_90']);
            $objSheet->getCell('R' . $i)->setValue($row['diatas_90']);
            $objSheet->getCell('S' . $i)->setValue($row['total_hutang']);
            $objSheet->getCell('T' . $i)->setValue($row['hutang_belum_jatuh_tempo']);
            $objSheet->getCell('U' . $i)->setValue($row['bank_name']);
            $objSheet->getCell('V' . $i)->setValue($row['recommended_cancel']);
            $objSheet->getCell('W' . $i)->setValue($row['sp3k_date']);
            $objSheet->getCell('X' . $i)->setValue($row['salesman_name']);
            $objSheet->getCell('Y' . $i)->setValue($row['source_1_sampai_30']);
            $objSheet->getCell('Z' . $i)->setValue($row['source_31_sampai_60']);
            $objSheet->getCell('AA' . $i)->setValue($row['source_61_sampai_90']);
            $objSheet->getCell('AB' . $i)->setValue($row['source_diatas_90']);
        }
        $i = $i+1;
        $objSheet->getCell('I' . $i)->setValue($sum_harga_total_jual);
        $objSheet->getCell('J' . $i)->setValue($sum_total_bayar_sampai_bulan_in);
        $objSheet->getCell('K' . $i)->setValue($sum_total_bayar_bulan_ini);
        $objSheet->getCell('L' . $i)->setValue($sum_piutang_jatuh_tempo_hari_ini);
        $objSheet->getCell('M' . $i)->setValue($sum_piutang_jatuh_tempo_sampai_akhir_bulan_ini);
        $objSheet->getCell('O' . $i)->setValue($sum_dari_1_sampai_30);
        $objSheet->getCell('P' . $i)->setValue($sum_dari_31_sampai_60);
        $objSheet->getCell('Q' . $i)->setValue($sum_dari_61_sampai_90);
        $objSheet->getCell('R' . $i)->setValue($sum_lebihdari_90);
        $objSheet->getCell('S' . $i)->setValue($sum_total_hutang);
        $objSheet->getCell('T' . $i)->setValue($sum_hutang_belum_jatuh_tempo);
        // create some borders
        // first, create the whole grid around the table
        $i = $i-1;
        $objSheet->getStyle('A1:AB' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AB' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AB1')->getBorders()->
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
        $objSheet->getColumnDimension('AB')->setAutoSize(true);
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filedata = $this->destination . "agingjatuhtempodetail" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";
        $directfile = $this->httpdirect . "agingjatuhtempodetail" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "direct" => $directfile);
    }
    function createexcelRekap($paramdata) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';

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
        $objSheet->setTitle('agingschedulejatuhtemporekap');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:L1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No');
        $objSheet->getCell('B1')->setValue('Purchase No');
        $objSheet->getCell('C1')->setValue('Receiveable This Month');
        $objSheet->getCell('D1')->setValue('Percent');
        $objSheet->getCell('E1')->setValue('1-30 Days');
        $objSheet->getCell('F1')->setValue('Percent');
        $objSheet->getCell('G1')->setValue('31-60 Days');
        $objSheet->getCell('H1')->setValue('Percent');
        $objSheet->getCell('I1')->setValue('61-90 Days');
        $objSheet->getCell('J1')->setValue('Percent');
        $objSheet->getCell('K1')->setValue('Lebih 90 Days');
        $objSheet->getCell('L1')->setValue('Percent');
     

        $no = 0;
        $i = 1;
        $sum_harga_total_jual =0;
        $sum_total_bayar_sampai_bulan_in =0;
        $sum_total_bayar_bulan_ini =0;        
        $sum_dari_1_sampai_30 =0;
        $sum_dari_31_sampai_60 =0;
        $sum_dari_61_sampai_90 =0;
        $sum_lebihdari_90 =0;        
       
        
        $sum_harga_total_jual =0;
        foreach ($paramdata[0] as $row) {
            $no++;
            $i++;
            
            $sum_total_bayar_sampai_bulan_in+=$row['total_bayar_sampai_bulan_ini'];
            $sum_total_bayar_bulan_ini+=$row['total_bayar_bulan_ini'];           
            $sum_dari_1_sampai_30+=$row['dari_1_sampai_30'];
            $sum_dari_31_sampai_60+=$row['dari_31_sampai_60'];
            $sum_dari_61_sampai_90+=$row['dari_61_sampai_90'];
            $sum_lebihdari_90+=$row['diatas_90'];
            
            $objSheet->getCell('A' . $i)->setValue($no);
            $objSheet->getCell('B' . $i)->setValue($row['purchaseletter_no']);
            $objSheet->getCell('C' . $i)->setValue($row['total_bayar_sampai_bulan_ini']);
            $objSheet->getCell('D' . $i)->setValue($row['total_bayar_bulan_ini']);
            $objSheet->getCell('E' . $i)->setValue($row['dari_1_sampai_30']);
            $objSheet->getCell('F' . $i)->setValue($row['total_bayar_bulan_ini']);
            $objSheet->getCell('G' . $i)->setValue($row['dari_31_sampai_60']);
            $objSheet->getCell('H' . $i)->setValue($row['total_bayar_bulan_ini']);
            $objSheet->getCell('I' . $i)->setValue($row['dari_61_sampai_90']);
            $objSheet->getCell('J' . $i)->setValue($row['total_bayar_bulan_ini']);
            $objSheet->getCell('K' . $i)->setValue($row['diatas_90']);
            $objSheet->getCell('L' . $i)->setValue($row['total_bayar_bulan_ini']);          
        }
        $i = $i+1;
        $objSheet->getCell('C' . $i)->setValue($sum_total_bayar_sampai_bulan_in);
        $objSheet->getCell('D' . $i)->setValue($sum_total_bayar_bulan_ini);        
        $objSheet->getCell('E' . $i)->setValue($sum_dari_1_sampai_30);
        $objSheet->getCell('F' . $i)->setValue($sum_total_bayar_bulan_ini);
        $objSheet->getCell('G' . $i)->setValue($sum_dari_31_sampai_60);
        $objSheet->getCell('H' . $i)->setValue($sum_total_bayar_bulan_ini);
        $objSheet->getCell('I' . $i)->setValue($sum_dari_61_sampai_90);
        $objSheet->getCell('J' . $i)->setValue($sum_total_bayar_bulan_ini);
        $objSheet->getCell('K' . $i)->setValue($sum_lebihdari_90);
        $objSheet->getCell('L' . $i)->setValue($sum_total_bayar_bulan_ini);
        // create some borders
        // first, create the whole grid around the table
        $i=$i-1;
        $objSheet->getStyle('A1:L' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:L' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:L1')->getBorders()->
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
       
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filedata = $this->destination . "agingjatuhtemporekap" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";
        $directfile = $this->httpdirect . "agingjatuhtemporekap" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "direct" => $directfile);
    }

}

?>
