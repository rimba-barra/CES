<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Gl_Models_Balancesheetkp extends Zend_Db_Table_Abstract {

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_querybs = new Gl_Models_Query_Balancesheet();
        $this->_phpExcel  = new PHPExcel();
    }

    function genReport($param) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $year = $tmp[1];

        $resultperiode = $this->_helperdata->getFromanduntildate($param);
        $fromdatedesc = date("d F Y", strtotime($resultperiode["fromdate"]));
        $untildatedesc = date("d F Y", strtotime($resultperiode["untildate"]));
        $startdate = date("Y-m-d", strtotime($year . '-01-01'));
        $decemberend = date("Y-m-d", strtotime($resultperiode["enddecember"]));

        $fromdate = date("Y-m-d", strtotime($resultperiode["fromdate"]));
        $untildate = date("Y-m-d", strtotime($resultperiode["untildate"]));

        $lastfromdate = date("Y-m-d", strtotime("-1 month", strtotime($fromdate)));
        $lastuntildate = date("Y-m-t", strtotime("-1 month", strtotime($fromdate)));

        $param['fromdate'] = $fromdatedesc;
        $param['untildate'] = $untildatedesc;

        $counter = $this->_querybs->count_tmp_rpt();

        //FORCE TRUNCATE
        $this->_querybs->truncate_tmp();

        /*
        if ($counter > 0) {
            $counterbyuser = $this->_querybs->count_tmp_rpt_byuser();
            if ($counter == $counterbyuser) {
                $this->_querybs->truncate_tmp();
            } else {
                $this->_querybs->delete_tmp();
            }
        } else {
            $this->_querybs->delete_tmp();
        }
        */

        $this->create_tmp($param);

        $this->create_parent();
        $this->create_amount($param, $startdate, $lastuntildate, $fromdate, $untildate, $decemberend);
       // $this->set_total();     
        $this->set_total_from_m_summary($startdate, $lastuntildate, $fromdate, $untildate, $decemberend);
        $cluster = $this->_querybs->rpt_balancesheet();
        $param['cluster'] = $cluster;
        return $param;
    }


    function genReportexcelthismonth($param) {
        //$result = $this->genReport($param);
        
        $sql = '';
        //show selected data
        $sql = str_replace('*', 'coa, name, calculate_thismonth',$sql);
        $sql = 'exec gl_2018.dbo.sp_reportbalancesheet_kp '.$param['pt_id'].','.$param['monthdata'].','.$param['yeardata'].','.$param['level'].','.$param['project_id'];
        $sheet = 0 ; 

        $additional['header'][0] = array('PT NAME', $param['pt_name']);
        $additional['header'][1] = array('Level', $param['level']);
        $additional['header'][2] = array('Periode', $param['monthdata']."-".$param['yeardata']);
        $additional['header'][3] = array('', '');

        $col = array('coa', 'description','end_balance_lastmonth', 'end_balance', 'end_balance_lastyear', 'flag');
        $titles = array('COA', 'Description', 'Last Month ('.$param['last_month'].')', 'Current ('.$param['current_month'].')', 'Last Year ('.$param['last_year'].')', 'flag');  

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
                'color' => array('rgb' => '2F4F4F'),
                'size' => 11
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            ),
            'borders' => array(
                  'allborders' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
              )
        ); 

        $summaryStyle = array(
            'font' => array(
                'bold' => true
            ),
            'borders' => array(
                  'top' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THIN
                  ),
                  'bottom' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN
                  )
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
                    array_push($tmp, $d[$key]);
                }
            }
            array_push($final, $tmp);
            $tmp = array();
        }

        $finaldata = $final;
        // create php excel object
        $filename = "report_balance_sheet_kp.xls";
        $path = 'app/gl/uploads/'.$filename;
        $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

        $doc = $this->_phpExcel;
         
        $doc->setActiveSheetIndex(0);
        $doc->getActiveSheet()->fromArray($finaldata);

        $lastrecord = $doc->setActiveSheetIndex(0)->getHighestRow();

        $doc->getActiveSheet()->getStyle("A5:E5")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getStyle('C6:E'.$lastrecord)->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getStyle('B2')->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_TEXT);
        $doc->getActiveSheet()->getStyle('A1:B3')->getFont()->setBold(true);

        for ($i = 6; $i <= $lastrecord; $i++) {
            $flag = $doc->getActiveSheet()->getCell('F'.$i)->getValue();

            if ($flag == 'H' || $flag == "") {
                for ($j = 2; $j <= 5; $j++) {
                    $doc->getActiveSheet()->setCellValueByColumnAndRow($j, $i, "");
                }

                if ($flag == "H") {
                    $doc->getActiveSheet()->getStyle('A'.$i.':E'.$i)->getFont()->setBold(true);
                }
            }

            if ($flag == "T") {
                $doc->getActiveSheet()->getStyle('A'.$i.':E'.$i)->applyFromArray($summaryStyle);
            }
        }

        foreach(range('A','Z') as $columnID) {
            $doc->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
        }

        $doc->getActiveSheet()->removeColumn('F');
         
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0'); //no cache
         
        $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel5');
        $param['url'] = $path;
        //force user to download the Excel file without writing it to server's HD
        $objWriter->save($newFilePath);
        return $param;
    }

    function create_tmp($param) {
        $result = $this->_querybs->getalldata_rptformat($param);
        if (!empty($result)) {
            foreach ($result as $row) {
                $row['namecoa'] = str_replace("'","",$row['namecoa']);
                $record = array(
                    "user_id" => $this->_user_id,
                    "reportdate" => $this->istext($this->_curdatetime),
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "coa_id" => $row['coa_id'],
                    "coa" => $this->istext($row['coa']),
                    "name" => $this->istext($row['namecoa']) ,
                    "level" => $row['level'],
                    "type" => $this->istext($row['type']),
                    "report" => $this->istext($row['report']),
                    "report_level" => $row['report_level'],
                    "flag" => $this->istext($row['flag']),
                );
                $this->_querybs->insert_to_tmp($record);
            }
        }
    }

    public function create_parent() {
        $result = $this->_querybs->set_parent();
        if (!empty($result)) {
            foreach ($result as $row) {
                $rpt_id = $row['rpt_id'];
                $record = array("parent_coa" => $this->istext($row['parent_code']));
                $this->_querybs->update_tmp_reportbyid($rpt_id, $record);
            }
        }
    }

    public function create_amount($param, $startdate, $lastuntildate, $fromdate, $untildate, $decemberend) {
        $resultlastmonth = $this->_model->getsumnet($startdate, $lastuntildate);
        $resultthismonth = $this->_model->getsumnet($startdate, $untildate);
        $resultthismonthlastyear = $this->_model->getsumnet($startdate, $decemberend);

        foreach ($resultlastmonth as $row) {
            $record = array(
                "lastmonth_amount" =>  $row['net_summary']
            );
            $this->_querybs->update_tmp_amount($this->istext($row['coa']), $record);
        }

        foreach ($resultthismonth as $row) {
            $record = array(
                "thismonth_amount" => $row['net_summary']
            );
            $this->_querybs->update_tmp_amount($this->istext($row['coa']), $record);
        }

        foreach ($resultthismonthlastyear as $row) {
            $record = array(
                "lastyear_amount" => $row['net_summary']
            );
            $this->_querybs->update_tmp_amount($this->istext($row['coa']), $record);
        }

        $resultcalculate = $this->_querybs->get_rpt_forcalculate($param);
        if (!empty($resultcalculate)) {
            foreach ($resultcalculate as $rowcalculate) {
                $rpt_id = $rowcalculate['rpt_id'];
                $c_last = $rowcalculate['calculate_lastamount'];
                $c_this = $rowcalculate['calculate_thisamount'];
                $c_budget = $rowcalculate['calculate_budgetamount'];
                $c_year = $rowcalculate['calculate_lastyear'];

                $recordcalculate = array(
                    "calculate_lastmonth" => $c_last,
                    "calculate_thismonth" => $c_this,
                    "calculate_budget" => $c_budget,
                    "calculate_lastyear" => $c_year
                );

                $this->_querybs->update_tmp_reportbyid($rpt_id, $recordcalculate);
            }
        }
    }

    public function set_total_from_m_summary($startdate, $lastuntildate, $fromdate, $untildate, $decemberend) {
        $resultlastmonth = $this->_querybs->get_amount_from_summary($startdate, $lastuntildate);
        $resultthismonth = $this->_querybs->get_amount_from_summary($startdate, $untildate);
        $resultlastyear = $this->_querybs->get_amount_from_summary($startdate, $decemberend);

        if (!empty($resultlastmonth[0])) {
            foreach ($resultlastmonth[0] as $row) {                
                $recordlast = array(
                    "calculate_lastmonth" => $row['net_total']
                );
                $this->_querybs->update_tmp_amounttotal($this->istext($row['coa']), $recordlast);
            }
        }
        if (!empty($resultthismonth[0])) {
            foreach ($resultthismonth[0] as $row) {
                
                $recordthis = array(
                    "calculate_thismonth" =>$row['net_total']
                );
                $this->_querybs->update_tmp_amounttotal($this->istext($row['coa']), $recordthis);
            }
        }
        if (!empty($resultlastyear[0])) {
            foreach ($resultlastyear[0] as $row) {
                $recordyear = array(
                    "calculate_lastyear" =>$row['net_total']
                );
                $this->_querybs->update_tmp_amounttotal($this->istext($row['coa']), $recordyear);
            }
        }
    }

    public function set_total() {
        $resultcoa = $this->_querybs->getparent();
        foreach ($resultcoa as $row) {
            $resultamount = $this->_querybs->get_amount_from_parent($row['parent_coa']);
            if (!empty($resultamount[0])) {
                $rowamount = $resultamount[0];
                $coa = $this->istext($rowamount['parent_coa']);
                $restcoa = $this->_querybs->get_coa_on_tmp($rowamount['parent_coa']);
                $rowcoa = $restcoa[0];

                if ($rowcoa['type'] == 'C') {
                    $total_last = ($rowamount['total_lastmonth'] > 0) ? '-' . $rowamount['total_lastmonth'] : $rowamount['total_lastmonth'];
                    $total_this = ($rowamount['total_thismonth'] > 0) ? '-' . $rowamount['total_thismonth'] : $rowamount['total_thismonth'];
                    $total_budget = ($rowamount['total_budget'] > 0) ? '-' . $rowamount['total_budget'] : $rowamount['total_budget'];
                    $total_year = ($rowamount['total_lastyear'] > 0) ? '-' . $rowamount['total_lastyear'] : $rowamount['total_lastyear'];
                } else {
                    $total_last = $rowamount['total_lastmonth'];
                    $total_this = $rowamount['total_thismonth'];
                    $total_budget = $rowamount['total_budget'];
                    $total_year = $rowamount['total_lastyear'];
                }

                $record = array(
                    "calculate_lastmonth" => $total_last,
                    "calculate_thismonth" => $total_this,
                    "calculate_budget" => $total_budget,
                    "calculate_lastyear" => $total_year
                );

                $this->_querybs->update_tmp_totalamount($coa, $record);
            }
        }
    }

    public function istext($param) {
        return $this->_helperdata->textforquery($param);
    }

    function Create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'getcoabyid':
                        $counter = 0;
                        $result = $this->_model->getcoabyid($param['coa_id']);
                        break;
                    case 'generatereport':
                        $counter = 0;
                        $result = $this->genReport($param);
                        break;
                    case 'generatereportexcelthismonth':
                        $counter = 0;
                        $result = $this->genReportexcelthismonth($param);
                        break;
                    default:
                        $counter = 0;
                        $result = null;
                        break;
                }

                if ($param['hideparam'] == 'default') {
                    $count = 0;
                    $msg = " ";
                } else {
                    $count = $counter;
                    $msg = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

}
