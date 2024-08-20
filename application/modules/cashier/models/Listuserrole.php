<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Listuserrole extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_report_listuserrole';
        $this->_phpExcel  = new PHPExcel();
    }

    function actionRead($param) {
        $return['success'] = false;
    }

    function listuserroleRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                // $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'] == "" ? $this->_project_id : $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'] == "" ? $this->_pt_id : $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'exportdata':
                        $result = $this->exportData($param);
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        $data = $result;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    public function listuserroleCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create'; 
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_param['user_id'] = $this->_user_id;

                        $result = $this->setting->executeSP(); 
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;

                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function listuserroleUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_param['user_id'] = $this->_user_id;

                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function listuserroleDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'persentasepajak_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {

                $this->setting->_iddata = rtrim($param[$key_name], ',');
                $this->setting->_paramsql = 'delete';
                $this->setting->_param['hideparam'] = $param['hideparam'];
                $result = $this->setting->executeSP(); 
                $valid = true;
                $counter = count(explode(',', $this->setting->_iddata));
                $message = "ok";

                $return = array(
                    "success" => $valid,
                    "total" => $counter,
                    "msg" => $message,
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function exportData($param) {
        
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $dataproject = $this->execSP3("sp_project_byid_read", array($param['project_id']));
        $ptname = $datapt[0][0]['name'];
        $projectname = $dataproject[0][0]['name'];

       
        $additional['header'] = array(
            array('Project', $projectname),
            array('PT', $ptname),
            array('Print Date', date('d-m-Y'))
        );
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';
        $sql = "sp_report_listuserrole";
        $col = array('user_name', 'user_fullname','group_name','addon', 'addby');
        $titles = array('User Name', 'User Full Name','Role Name','Add On', 'Add By');     

        $paramdata = array(
            'pt_id' => $param['pt_id'],
            'project_id' => $param['project_id'],
            'pt_name' => $ptname,
            'hideparam' => 'exportdata'
        );
        $sheetname = "ListUserRole";
       
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
        
        $rowstotal = $doc->getActiveSheet()->getHighestRow();
       
        $doc->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
        $doc->getActiveSheet()->mergeCells('B1:C1');
        $doc->getActiveSheet()->mergeCells('B2:C2');
        $doc->getActiveSheet()->mergeCells('B3:C3');
       
        $doc->getActiveSheet()->getStyle("A4:E4")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('4')->setRowHeight(30);
        
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(35);
        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(35);
        $doc->getActiveSheet()->getColumnDimension('C')->setWidth(35);
        $doc->getActiveSheet()->getColumnDimension('D')->setWidth(25);
        $doc->getActiveSheet()->getColumnDimension('E')->setWidth(35);

       
       
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


        return $this->_tmpparam;
    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";

            $param = $this->setting->Xmlparam($paramdata);
            $dataArray = $this->execSP($sql, $param); 

            $datas = $dataArray;
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }

            $tmp = array();
            $final = array();
            
            foreach ($additional['header'] as $h) {
                array_push($final, $h);
            }

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

            $filename = "User_Role_{$this->cleanString($paramdata['pt_name'])}_".date('Ymd').".xlsx";
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

    function cleanString($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '_', $string); // Removes special chars.
     
        return preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
    }

}
