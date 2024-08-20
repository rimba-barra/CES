<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Gl_Models_Departmentexpense extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $datatb;

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
        $this->_querytb = 0;
        $this->_phpExcel  = new PHPExcel();
        $this->_tmpparam  = array();
    }

    function generateExcel($param){

        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "dbmaster.dbo";
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        if(isset($param['project_id'])){
            $project_id = $param['project_id'];
        }else{
            $project_id = $this->session->getCurrentProjectId();
        }

        $additional['header'] = array( $ptname, 
                'DEPARTMENT EXPENSE', 
                '', 
                'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate'], 
                'COA : '.$param['coastart_id'].' - '.$param['coaend_id']);
        $sheetname = '';
        $sheet = 0 ; 

        $department_id = intval($param['department_id']);
        $is_detail = intval($param['detaildata']);
        $is_excel = 1;

        $sql = "sp_reportdepartmentexpense";

        $sheetname = "Detail Only";
        $titles = array('department_code', 'department', 'voucher_date', 'voucher_no', 'coa', 'coa_name', 'description', 'amount_beg', 'amount_d', 'amount_c', 'amount_end');
        $col = array('department_code', 'department', 'voucher_date', 'voucher_no', 'coa', 'coa_name', 'description', 'amount_beg', 'amount_d', 'amount_c', 'amount_end');
        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'],$param['headerdata'], $is_detail,1,$project_id, $department_id, $is_excel 
        );


        $footer = $this->genReportexcelAdditional($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        $additional['footer'] = array();


        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        $lastrecord0 = $doc->setActiveSheetIndex(0)->getHighestRow();
        $from0 = 'A'.$lastrecord0; // or any value
        $to0 = 'F'.$lastrecord0; // or any value

        //GENERAL STYLE

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

        $styleArray = array(
          'borders' => array(
            'outline' => array(
              'style' => PHPExcel_Style_Border::BORDER_THIN
            )
          )
        );
        //STYLE SHEET 0

        $doc->getActiveSheet()->getStyle('H3:K'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');

        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

        return $this->_tmpparam;

    }

    function genReportexcelAdditional($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {

        //auto generate excel from sql statement

        $this->_schema = "cashier.dbo";
        $dataArray = $this->execSP3($sql, $paramdata);

        $datas = $dataArray[0];
        $arrayKeys = array_keys($datas[0]);

        $tmp = array();
        $final = array();

        foreach ($datas as $d) {

            //HARUS URUT SESUAI QUERY
            foreach ($col as $keyn) {
                if(in_array($keyn,$arrayKeys)){
                    array_push($tmp, $d[$keyn]);
                }else{
                     array_push($tmp, '');
                }
            }
            array_push($final, $tmp);
            $tmp = array();
        }
        return $final;

    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";
            $dataArray = $this->execSP3($sql, $paramdata);

            $datas = $dataArray[0];
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }
           

            $tmp = array();
            $final = array();
            array_push($final, $additional['header']);

            array_push($final,  $titles); //give title

            foreach ($datas as $d) {

                //HARUS URUT SESUAI QUERY
                foreach ($arrayKeys as $key) {
                    if(in_array($key, $col)){
                        array_push($tmp, $d[$key]);
                    }
                }
                array_push($final, $tmp);
                $tmp = array();
            }

            array_push($final, $additional['footer']);

            $finaldata = $final;

            if($sheet>0){
                if($doc->getActiveSheetIndex()!==$sheet){
                    $doc->createSheet($sheet);
                }
            }
             
            $doc->setActiveSheetIndex($sheet);
            $doc->getActiveSheet()->fromArray($finaldata);
            $doc->getActiveSheet()->setTitle($sheetname);

            foreach(range('A','Z') as $columnID) {
                $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);

            }
        }
        

        if($isReady == TRUE){

            $ptname = str_replace(' ', '_', $param['pt_name']);
            $filename = "report_DeptExpense_".$ptname.'_'.$param['untildate'].".xlsx";
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            //READY TO WRITE
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
             
            $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel2007');
            $param['url'] = $path;
            //force user to download the Excel file without writing it to server's HD
            $objWriter->save($newFilePath);   
        }

        $this->_tmpparam = $param;

        return $doc;
    }

    function generateData() {
        $activedate = $this->_helperdata->rangeActiveYear();
        //print_r($activedate);
        //exit;
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        
        $startdatedb = date('Y-m-d',  strtotime($activedate['yeardb'].'-01-01'));
        
        if($fromdate==$startdatedb){
             $startdate = '<= '.$this->istext($fromdate);
             $fromdate = ' > '.$this->istext($fromdate);
        }else{
             $startdate = '< '.$this->istext($fromdate);
             $fromdate = ' >= '.$this->istext($fromdate);
        }   
        
        $this->cleardata();
        $this->create_coa();
        $this->create_suboncoaonlevel_2();
        $result = $this->_querytb->create_calculatetotal($startdate,$fromdate,$untildate,$this->datatb['headertype'],$this->datatb['detailtype']);
        $return = array(
            "cluster"=>$result
        );
        
        return $return;        
    }
    function generateDatabyparam($param) {
        $this->datatb = $param;        
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        
        $startdatedb = date('Y-m-d',  strtotime($param['yeardata'].'-01-01'));
        
        if($fromdate==$startdatedb){
             $startdate = '<= '.$this->istext($fromdate);
             $fromdate = ' > '.$this->istext($fromdate);
        }else{
             $startdate = '< '.$this->istext($fromdate);
             $fromdate = ' >= '.$this->istext($fromdate);
        }   
        
        $this->cleardata();
        $this->create_coa();
        $this->create_suboncoaonlevel_2();
        $result = $this->_querytb->create_calculatetotal($startdate,$fromdate,$untildate,$this->datatb['headertype'],$this->datatb['detailtype']);
     
        
        return $result;        
    }

    function cleardata() {
        $counter = $this->_querytb->count_tmp_rpt();
        if ($counter > 0) {
            $counterbyuser = $this->_querytb->count_tmp_rpt_byuser();
            if ($counter == $counterbyuser) {
                $this->_querytb->truncate_tmp();
            } else {
                $this->_querytb->delete_tmp();
            }
        } else {
            $this->_querytb->delete_tmp();
        }
    }

    function create_coa() {
        //print_r($this->datatb);
        //exit;
        $result = $this->_querytb->get_coa_from_sumtrh($this->datatb['fromcoa'], $this->datatb['untilcoa']);
        if (!empty($result)) {          
            foreach ($result as $row) {
                $resultcoa = $this->_model->getcoa($row['coa']);
                $countercoa = $resultcoa[0][0]['counterdata'];
                if ($countercoa > 0) {
                    $rowcoa = $resultcoa[1][0];
                    if ($this->datatb['headertype'] == 2) {
                        $coaname = $rowcoa['name'];
                    } else {
                        $coaname = str_repeat("-", $rowcoa['level']) . $rowcoa['name'];
                    }

                    if (empty($rowcoa['parent_code'])) {
                        $parent_code = $rowcoa['coa'];
                    } else {
                        $parent_code = $rowcoa['parent_code'];
                    }

                    $resultcoajournal = $this->_querytb->get_coa_from_journaldetail($rowcoa['coa'], $rowcoa['coa']);
                    if (empty($resultcoajournal)) {
                        $level = 1;
                    } else {
                        $level = 2;
                    }

                    $record = array(
                        "project_id" => $this->_project_id,
                        "pt_id" => $this->_pt_id,
                        "user_id" => $this->_user_id,
                        "reportdate" => $this->istext($this->_curdatetime),
                        "coa_id" => $rowcoa['coa_id'],
                        "coa" => $this->istext($rowcoa['coa']),
                        "flag" => $this->istext('H'),
                        "level" => $level,
                        "coatype" => $this->istext($rowcoa['type']),
                        "coalevel" => $rowcoa['level'],
                        "coaname" => $this->istext($coaname),
                        "parent_code" => $this->istext($parent_code),
                    );
                    $this->_querytb->insert_to_tmp($record);
                }
            }
        }
    }

    function create_suboncoaonlevel_2() {
        $result = $this->_querytb->get_coa_from_tmp();
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        if (!empty($result)) {
            foreach ($result as $row) {
                $resultjournal = $this->_querytb->get_coa_from_journaldetail_byperiode($row['coa'], $fromdate, $untildate);
                if (!empty($resultjournal)) {
                    foreach ($resultjournal as $rowjournal) {                        
                        $record = array(
                            "project_id" => $this->_project_id,
                            "pt_id" => $this->_pt_id,
                            "user_id" => $this->_user_id,
                            "reportdate" => $this->istext($this->_curdatetime),
                            "flag" => $this->istext('I'),
                            "level" => 3,
                            "flagshowdata" => $rowjournal['flagshowdata'],
                            "coa_id" => $rowjournal['coa_id'],
                            "coa" => $this->istext($rowjournal['coa']),
                            "coaname" => $this->istext($rowjournal['name']),
                            "coatype" => $this->istext($rowjournal['coatype']),
                            "parent_code" => $this->istext($rowjournal['parent_code']),
                            "coalevel" => $rowjournal['level'],
                            "prefix_id" => $rowjournal['prefix_id'],
                            "prefix" => $this->istext($rowjournal['prefix']),
                            "voucher_date" => $this->istext($rowjournal['voucher_date']),
                            "voucher_no" => $this->istext($rowjournal['voucher_no']),
                            "trxtype" => $this->istext($rowjournal['type']),
                            "amount" => $rowjournal['amount'],
                            "amount_debet" => $rowjournal['amount_debet'],
                            "amount_credit" => $rowjournal['amount_credit'],
                            "description" =>$this->istext($rowjournal['keterangan']),
                        );
                         $this->_querytb->insert_to_tmp($record);
                    }
                }
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
                $this->datatb = $param;
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
                        $result = $this->generateData($param);
                        break;
                    case 'generatereportexcelthismonth':
                        $counter = 0;
                        if ($param['templatedata'] == 3) {
                            $result = $this->generateExcelTbNotBalance($param);
                        } else {
                            $result = $this->generateExcel($param);
                        }
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
