<?php

require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';

class Cashier_Models_Report_Cashbackcashbondepartmentreport extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $datacf;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_ptname ='';

        // $this->_helper->session->set('selected_dbapps', 'gl_2018');
        //$this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        //$this->_schema = 'gl_2018.dbo';
        $this->session->set('selected_dbapps', 'cashier');

        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        //$this->_querycf = new Gl_Models_Query_Salesbacklog();
        $this->_phpExcel  = new PHPExcel();
        $this->_tmpparam  = array();

    }

    function generateData() {
        $result = $this->_querycf->calculatedata($this->datacf);
        return $result;
    }

    function Create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->datacf = $param;
                switch ($parameter) {
                    case 'generatereportexcelthismonth':
                    $counter = 0;
                    $result;
                    
                    $result = $this->generateExcel($param);

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

    function generateExcel($param){
        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        $this->_ptname = $ptname;

        $additional['header'] = array( $ptname, 
            'Cashback Cashbon Department Report', 
            '', 
            'PERIOD : '.$param['periode_start'].' '.$param['periode_end'].'');
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';

        $sql = "sp_report_cashbackcashbondepartment";


        $col = array('vid', 'kasbank_date', 'voucher_no', 'realization_date','description', 'amount','dataflow','vid_reff','voucher_no_reff','kasbondept_no_reff');  
        $titles = array('VID', 'Kasbank Date', 'Voucher No', 'Realization Date','Description', 'Amount','Data Flow','Vid Reff','Voucher No Reff','Kasbondept No Reff');  

        $paramdata = array(
            $param['project_id'],$param['pt_id'],$param['periode_start'],$param['periode_end']
        );
        $sheetname = "Cashback Cashbon Department";

        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

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
        $doc->getActiveSheet()->getStyle("A2:J2")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

        return $this->_tmpparam;

        }

        function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
            $doc = $this->_phpExcel;
        //auto generate excel from sql statement
            if($isReady == FALSE){
                $this->_schema = "cashier.dbo";
                $dataArray = $this->execSP3($sql, $paramdata);

        //die(print_r($dataArray));

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

        // array_push($final, $additional['footer']);

        $finaldata = $final;
        // echo json_encode($finaldata);die;

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
            $ptname = $this->_ptname;
            $filename = "Cashbackcashbondepartmentreport ".$ptname.".xls";
            $filename = str_replace(' ', '_', $filename);
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

        //READY TO WRITE
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0'); //no cache

        $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel5');
        $param['url'] = $path;
        //force user to download the Excel file without writing it to server's HD
        $objWriter->save($newFilePath);   
        }

        $this->_tmpparam = $param;

        return $doc;
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
}
