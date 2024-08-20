<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Csv
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_Data_Csv extends Hrd_Models_Absent_ImporterData {

    private $params;
    private $listEmployee;
    private $fileName;

    private $param_data;

    // public function __construct($fileName, $session) {
    // added by Michael 2021.05.19 
    public function __construct($fileName, $session, $param_data) {
    // end added by Michael 2021.05.19 
        
        $this->fileName = $fileName;
        $this->params = array();
        $this->listEmployee = array();
        
        // added by Wulan Sari 24.04.2018
        $this->session = $session;

        // added by Michael 2021.05.19 
        $this->param_data = $param_data;
        // end added by Michael 2021.05.19 
        
    }


    public function process() {
        

        // open csv file
        $kolomTanggal = 4;
        $row = 1;
        if(strlen($this->fileName)==0){
            $this->setErrorMessage("Filename tidak ada");
            return FALSE;
        }
        $fn = realpath(APPLICATION_PATH . '/../' . Box_Config::ABSENT_CSV_PATH . $this->fileName);
        if (file_exists($fn)) {
            if (($handle = fopen($fn, "r")) !== FALSE) {
                // comment by Wulan Sari 24.04.2018
                //while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                                    
                // added by Wulan Sari 24.04.2018
                while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {
                    
                    $num = count($data);
                    //  echo "<p> $num fields in line $row: <br /></p>\n";
                    $row++;
                    
                    $fd = $this->fixDate($data[3]);
                    if($fd){
                        
                        // added by Wulan Sari 24.04.2018    
                        $aDao = new Hrd_Models_AbsentDao();
                        // $checkprojectpt = $aDao->checkProjectPt($data[0], $this->session);

                        // added by Michael 2021.05.19 
                        $checkprojectpt = $aDao->checkProjectPt($data[0], $this->session, $this->param_data);
                        // end added by Michael 2021.05.19 

                        if($checkprojectpt){
                            
                            //$nomor, $nama, $tanggal, $timeIn, $timeOut
                            //$this->registerSingleLine($data[0], $data[1], $fd, $data[9], $data[10]);
                            $this->register($data[0], $data[1], $fd, $data[9]); //format fix yang digunakan
                            
                        }
                        
                    }
                    
                }
                fclose($handle);
            } else {
                $this->setErrorMessage("Tidak bisa membuka file");
            }
        } else {
            $this->setErrorMessage("Tidak ada file csv");
        }

        if (count($this->listEmployee) > 0) {
            $this->setFinalData($this->listEmployee);
            return TRUE;
        }


        return FALSE;
    }

    /* jam timein dan timeout beda record
     * contoh : 001,Budi,2015-01-01,08:20
     *          001,Budi,2015-01-01,17:56
     *  */

    protected function register($nomor, $nama, $tanggal, $time) {
        //var_dump($tanggal);
        //var_dump($listEmployee);
        
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
