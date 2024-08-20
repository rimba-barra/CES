<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Excel
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../../library/phpexcel/PHPExcel/IOFactory.php';
class Hrd_Models_Absent_Data_Excel2 extends Hrd_Models_Absent_ImporterData {
    private $params;
    private $listEmployee;
    private $fileName;
    private $param_data;
    private $error_cells;

    public function __construct($fileName, $session, $param_data) {
        $this->fileName = $fileName;
        $this->params = array();
        $this->listEmployee = array();
        $this->error_cells = array();
        
        // added by Wulan Sari 24.04.2018
        $this->session = $session;

        // added by Michael 2021.05.19 
        $this->param_data = $param_data; 

    }

    public function process() {
        // open excel file
        $kolomTanggal   = 4;
        $row            = 1;
        if(strlen($this->fileName)==0){
            $this->setErrorMessage("Filename tidak ada");
            return FALSE;
        }

        $fn = realpath(APPLICATION_PATH.'/../'.Box_Config::ABSENT_CSV_PATH.$this->fileName);
        if (file_exists($fn)) {
            $objPHPExcel    = new PHPExcel();
            $inputFileType  = PHPExcel_IOFactory::identify($fn);
            $objReader      = PHPExcel_IOFactory::createReader($inputFileType);
            $objPHPExcel    = $objReader->load($fn);

            $sheet          = $objPHPExcel->getSheet(0); 
            $highestRow     = $sheet->getHighestDataRow(); 
            $highestColumn  = $sheet->getHighestDataColumn();

            $data           = [];
            $rowData        = $sheet->rangeToArray('A2:'.$highestColumn.$highestRow);

            function removeempty($v){
                $arr = [];

                foreach ($v as $key => $value) {
                    if($value !== '' && $value !== null){
                        array_push($arr, $value);
                    }
                }

                return $arr;
            }

            function checkvalues($v, $k){
                $arr  = [];
                $temp = [];

                foreach ($v as $key => $value) {
                    switch($key){
                        case '2':
                            if(preg_match("/^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/",$value)){
                                array_push($arr, $value);
                            }
                            break;
                        case '3':
                            if(preg_match("/^([01]?[0-9]|2[0-3])\:+[0-5][0-9]$/", $value)){
                                array_push($arr, $value);
                            }
                            break;
                        default:
                            array_push($arr, $value);
                            break;
                    }
                }

                if(count($arr) == 5){
                    $temp = $arr;
                }

                return $temp;
            }

            function errorvalues($v, $k){
                $arr  = [];
                $temp = [];

                foreach ($v as $key => $value) {
                    switch($key){
                        case '2':
                            if(preg_match("/^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/",$value)){
                                array_push($arr, $value);
                            }
                            break;
                        case '3':
                            if(preg_match("/^([01]?[0-9]|2[0-3])\:+[0-5][0-9]$/", $value)){
                                array_push($arr, $value);
                            }
                            break;
                        default:
                            array_push($arr, $value);
                            break;
                    }
                }

                if(count($arr) < 5){
                    array_push($temp, $k);
                }

                return $temp;
            }
            
            $filtered           = array_filter(array_map("removeempty", $rowData));
            $checked            = array_filter(array_map("checkvalues", $filtered, array_keys($filtered)));
            $this->error_cells  = array_filter(array_map("errorvalues", $filtered, array_keys($filtered)));

            foreach ($checked as $key => $value) {
                // $fd = $this->fixDate($value[2]);
                if($value[2]){
                    // added by Wulan Sari 24.04.2018    
                    $aDao = new Hrd_Models_AbsentDao();

                    // added by Michael 2021.05.19 
                    $checkprojectpt = $aDao->checkProjectPt($value[0], $this->session, $this->param_data);
                    // end added by Michael 2021.05.19 

                    if($checkprojectpt){
                        //$nomor, $nama, $tanggal, $timeIn, $timeOut
                        $this->register(strval($value[0]), $value[1], $value[2], $value[3]); //format fix yang digunakan   
                    }   
                }
            }
        } else {
            $this->setErrorMessage("Tidak ada file excel");
        }

        if (count($this->listEmployee) > 0) {
            $this->setFinalData($this->listEmployee);
            $this->setErrorCells($this->error_cells);
            return TRUE;
        }

        return FALSE;
    }

    /* jam timein dan timeout beda record
     * contoh : 001,Budi,2015-01-01,08:20
     *          001,Budi,2015-01-01,17:56
     *  */

    protected function register($nomor, $nama, $tanggal, $time) {
        if (array_key_exists($nomor, $this->listEmployee)) {
            /// check jika tanggal sudah ada 
                if (array_key_exists($tanggal, $this->listEmployee[$nomor]["date"])) {
                    $this->listEmployee[$nomor]["date"][$tanggal]["timeout"] = $time;
                } else {
                    $this->listEmployee[$nomor]["date"][$tanggal] = array("timein" => $time, "timeout" => NULL);
                }
        } else {
            $this->listEmployee[$nomor] = array("name" => $nama, "date" => array());
            $this->listEmployee[$nomor]["date"][$tanggal] = array("timein" => $time, "timeout" => NULL);
        }
    }

    /* jam timein dan timeout dalam 1 record 
      contoh : 001,Budi,2015-01-01,08:20,17:56
     * 
     *      */

    protected function registerSingleLine($nomor, $nama, $tanggal, $timeIn, $timeOut) {
        $listEmployee = array();

        if (array_key_exists($nomor, $this->listEmployee)) {
            $this->listEmployee[$nomor]["date"][$tanggal] = array("timein" => $timeIn, "timeout" => $timeOut);
        } else {

            $this->listEmployee[$nomor] = array("name" => $nama, "date" => array());

            $this->listEmployee[$nomor]["date"][$tanggal] = array("timein" => $timeIn, "timeout" => $timeOut);
        }
    }

    private function fixDate($rawDate) {
        // added by Wulan Sari 24.04.2018        
        $rawDate = str_replace('/', '-', $rawDate);
        
        $list = explode("-", $rawDate);
        $hasil = array(15, 1, 2000);
        if (count($list) === 3) { /// format d-M-y
            $hasil = array($list[0], $list[1], $list[2]);
            return date("Y-m-d", mktime(0, 0, 0, $hasil[1], $hasil[0], $hasil[2]));
        }
        return FALSE;   
    }
}