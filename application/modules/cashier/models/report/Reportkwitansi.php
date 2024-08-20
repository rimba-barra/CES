<?php

require_once APPLICATION_PATH . '/modules/cashier/library/phpexcel/PHPExcel.php';
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Report_Reportkwitansi extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_report_kwitansi';
        $this->_model = new Cashier_Models_Generalmodel_Modelsp();
        $this->_phpExcel  = new PHPExcel();
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                
                switch ($this->setting->_param['hideparam']) {
                    case 'processreport':
                        $qparam = array(
                            "reportfile" => "Report_kwitansi",
                            "paramjs" => $param,
                        );
                        $message = null;
                        $valid = true;
                        break;
                    case 'generateexcel':
                        $result = $this->genReportexcelthismonth($this->setting->_param);
                        $qparam = $result;
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }

                $return = array(
                    "success" => $valid,
                    "data" => $qparam,
                    "msg" => $message,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function genReportexcelthismonth($param) {
        
        $sql = '';
        //show selected data
        $sql = "exec cashier.dbo.sp_report_kwitansi ".$param['pt_id'].",".$param['project_id'].",''".$param['statusreceipt']."'',''".$param['prefix']."'',''".$param['datetype']."'',''".$param['datefrom']."'',''".$param['untildate']."''";
        $sheet = 0 ; 

        $col = array('no','prefix', 'receipt_no','status_receipt', 'vid', 'description_voucher', 'tanggal_kwitansi', 'amount_kasbank', 'status_voucher', 'voucher_no');
        $titles = array('No','Prefix', 'Receipt No', 'Status Receipt', 'Voucher ID','Description Voucher', 'Tanggal Kwitansi', 'Amount','Status Voucher', 'Voucher No');  

        $additional['header'][0] = array('PT Name (Project)', ": ". $param['pt_name']);
        $additional['header'][1] = array('Status Receipt', ": ". $param['statusreceipt']);
        $additional['header'][2] = array('Periode Kwitansi', ": ". $param['datefrom']."-".$param['untildate']);
        $additional['header'][3] = array('', '');
        return $this->genReportexcel($param, $sql, $sheet, $additional, $col, $titles);
    }

    function genReportexcel($param, $sql, $sheet, $additional, $col, $titles) {

        //auto generate excel from sql statement
        $dataArray = $this->_model->customefromquery($sql);
        
        $datas = $dataArray[0];
        $arrayKeys = array_keys($datas[0]);

        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'color' => array('rgb' => '000'),
                'size' => 12
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            )
        ); 

        $titleArraystyle2 = array(
            'font' => array(
                'bold' => true,
                'color' => array('rgb' => '000'),
                'size' => 12
            )
        ); 

        $alignCenterStyle = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            )
        ); 

        $tmp = array();
        $final = array();

        foreach ($additional['header'] as $h) {
            array_push($final, $h);
        }
        

        array_push($final,  $titles);

        // array_push($final, $arrayKeys); //give title

        foreach ($datas as $d) {
            foreach ($arrayKeys as $key) {
                if(in_array($key, $col)){
                    if ($key == 'prefix' || $key == 'receipt_no' ) {
                        array_push($tmp, '="'.$d[$key].'"');
                    }else{
                        array_push($tmp,$d[$key]);
                    }
                }
            }
            array_push($final, $tmp);
            $tmp = array();
        }

        $finaldata = $final;
        
        // create php excel object
        $filename = "report_kwitansi-".date('Y-m-d').".xls";
        $path = 'app/gl/uploads/'.$filename;
        $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

        $doc = $this->_phpExcel;
        $max = count($finaldata);
        $doc->setActiveSheetIndex(0);
        $doc->getActiveSheet()->getStyle("A1:J3")->applyFromArray($titleArraystyle2);
        $doc->getActiveSheet()->getStyle("A5:J5")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getStyle("D")->applyFromArray($alignCenterStyle);
        $doc->getActiveSheet()->getStyle("I")->applyFromArray($alignCenterStyle);
        
        // $doc->getActiveSheet()->getStyle("A1:"."J".$max)->applyFromArray($summaryStyle);
        $doc->getActiveSheet()->fromArray($finaldata);
         
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0'); //no cache
         
        $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel5');
        $param['url'] = $path;
        //force user to download the Excel file without writing it to server's HD
        $objWriter->save($newFilePath);
        return $param;
    }

}
