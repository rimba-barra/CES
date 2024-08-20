<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SqlServerArt
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_Data_SqlServerArt extends Hrd_Models_Absent_ImporterData {
    private $params;
    private $projectId;
    private $ptId;

    public function __construct($projectId,$ptId) {
        $this->projectId = $projectId;
        $this->ptId = $ptId; 
        
        
        $this->params = array(
            'host' => '202.145.11.232', // 180.250.59.247
            'username' => 'bozz',
            'password' => 'w3bd3v.cipdev',
            'dbname' => 'dbtemp_absen'
        );
        
        $this->params_hrd = array(
            'host' => '13.76.184.138',
            'username' => 'webappsdb',
            'password' => '$bu5w4yP@ssw0rd',
            'dbname' => 'hrd'
        ); 
        
        /*
        $this->params = array(
            'host' => 'LAPTOP-SVULBV9J\SQLEXPRESS',
            'username' => 'sa',
            'password' => '123',
            'dbname' => 'dbtemp_absen'
        );
        
        $this->params_hrd = array(
            'host' => 'LAPTOP-SVULBV9J\SQLEXPRESS',
            'username' => 'sa',
            'password' => '123',
            'dbname' => 'hrd'
        );
         * 
         */
               
    }

    public function connect() {
        
    }

    public function process() {
        $startDay = (int) $this->getStartDay();
        $startDay = $startDay == 0 ? 1 : $startDay;
        $endDay = (int) $this->getEndDay();
        $endDay = $endDay <= $startDay ? $startDay + 1 : $endDay + 1;
        $dayRange = $endDay - 1 - $startDay + 1;
        $limitDay = 31;
        if ($dayRange > $limitDay) {
            $this->errorMessage = $limitDay . " days maximum to transfer";
            return FALSE;
        }

        try {
            $db = Zend_Db::factory('Sqlsrv', $this->params);
            $dbhrd = Zend_Db::factory('Sqlsrv', $this->params_hrd);
            if ($db) {
                $m = intval($this->month);
                $y = intval($this->year);
                $month = $m;
                $year = $y;
                
                $from = $year . "-" . $month . "-" . $startDay;
                
                /* kurang 1 hari */
                $from = date('Y-m-d', strtotime("-1 day", strtotime($from)));
                

                $maxDay = cal_days_in_month(CAL_GREGORIAN, $month, $year);

                $endDay = $endDay > $maxDay ? $maxDay : $endDay;
                
                /* tambah 1 hari */
                $tempDate =  $year . "/" . $month . "/" . $endDay;
                
                $tempDate = date('Y-m-d', strtotime($tempDate . "+1 days"));
                
                $hasil_date = $db->fetchAll("
                                        SELECT 
                                            distinct nik, date
                                        FROM t_absenlog 
                                        WHERE 
                                            project_id=$this->projectId
                                            and pt_id=$this->ptId
                                            and nik != ''
                                            and [date] between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
                                        ORDER BY  
                                                nik,date ASC  
                                       ");
                $jsonString = json_encode($hasil_date);
                $arData_date = json_decode($jsonString);
                
                $hasil = $db->fetchAll("
                                        SELECT 
                                            distinct nik, date, time, project_id, pt_id
                                        FROM t_absenlog 
                                        WHERE 
                                            project_id=$this->projectId
                                            and pt_id=$this->ptId
                                            and nik != ''
                                            and [date] between '" . $from . "' and '" . $tempDate . "'
                                        ORDER BY  
                                                nik,date,time ASC  
                                       ");

                $header = new Hrd_Models_Fingerprint_Header();
                $listEmployee = array();
                $jsonString = json_encode($hasil);
                $arData = json_decode($jsonString);
                
                $arData_shift = $this->get_cek_shift($this->projectId, $this->ptId, $from, $tempDate);  
                $arData_shiftdinamis = $this->get_shiftdinamis($this->projectId, $this->ptId);  
                
                foreach ($arData_date as $row) {
                    $nomorKaryawan = $row->nik;
                    $tanggal = date("Y-m-d", strtotime($row->date->date));    
                    
                    $holiday = 0;
                    foreach ($arData_shift as $row_shift) {
                        $dt = date("Y-m-d", strtotime($row_shift->date->date));
                        if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode && $row_shift->holyday == 1){
                            $holiday = 1;
                        }
                    }
                    
                    $is_shiftdinamis = 0;
                    foreach ($arData_shiftdinamis as $row_sd) {
                        if($nomorKaryawan == $row_sd->fingerprintcode){
                            $is_shiftdinamis = 1;
                        }                        
                    }                    
                    
                    if($holiday == 0 && $is_shiftdinamis == 0){
                        $time_in_hari_ini = $this->get_timein($arData, $tanggal, $nomorKaryawan, $arData_shift);
                        $time_out_hari_ini = $this->get_timeout($arData, $tanggal, $nomorKaryawan, $arData_shift);
                        
                    } else {
                        $time_in_hari_ini = $this->get_timein_off($arData, $tanggal, $nomorKaryawan);
                        $time_out_hari_ini = $this->get_timeout_off($arData, $tanggal, $nomorKaryawan);
                    }
                    if($time_in_hari_ini == $time_out_hari_ini){
                        $time_out_hari_ini = NULL;
                    }
                    if (!array_key_exists($nomorKaryawan, $listEmployee)) {
                            $listEmployee[$nomorKaryawan] = array("name" => $nomorKaryawan, "date" => array());  
                    }
                    $listEmployee[$nomorKaryawan]["date"][$tanggal] = array("timein" => $time_in_hari_ini, "timeout" => $time_out_hari_ini);      

                }
                $this->setFinalData($listEmployee);
                return TRUE;
            }
        } catch (Zend_Db_Adapter_Exception $e) {
            // $this->errorMessage = $e->getMessage();
            $this->errorMessage = "Can't connect to database";
        } catch (Zend_Exception $e) {
            $this->errorMessage = $e->getMessage();
        }
        return FALSE;
    }
     
    public function get_cek_shift($projectId, $ptId, $tanggal_from, $tanggal_to) {
        
        $dbhrd = Zend_Db::factory('Sqlsrv', $this->params_hrd);
        $hasil = $dbhrd->fetchAll("
            SELECT c.different_day, a.shifttype_id, c.in_time, c.out_time, a.date, d.fingerprintcode, c.holyday
            FROM td_absentdetail as a
            LEFT JOIN th_absent as b on b.absent_id = a.absent_id
            LEFT JOIN m_shifttype as c on a.shifttype_id = c.shifttype_id
            LEFT JOIN m_employee as d on b.employee_id = d.employee_id
            WHERE 
            a.deleted=0
            AND b.deleted=0
            AND a.date between '".$tanggal_from."' and '".$tanggal_to."'
            AND b.project_id = ".$projectId." 
            AND b.pt_id = ".$ptId);
        $jsonString = json_encode($hasil);
        $arData = json_decode($jsonString);
        return $arData;
    }
    
    public function get_shiftdinamis($projectId, $ptId) {
        
        $dbhrd = Zend_Db::factory('Sqlsrv', $this->params_hrd);
        $hasil = $dbhrd->fetchAll("
            SELECT a.employee_id, b.fingerprintcode
            FROM t_shiftdinamis as a
            JOIN m_employee as b on b.employee_id = a.employee_id
            WHERE 
            b.project_id = ".$projectId." 
            AND b.pt_id = ".$ptId);
        $jsonString = json_encode($hasil);
        $arData = json_decode($jsonString);
        return $arData;
    }
    
    
    public function get_employee_id($projectId, $ptId, $no) {        
        $dbhrd = Zend_Db::factory('Sqlsrv', $this->params_hrd);
        $hasil = $dbhrd->fetchAll("
            SELECT employee_id
            FROM m_employee as a
            WHERE 
            a.deleted = 0
            AND a.employee_active = 1
            AND a.fingerprintcode = '".$no."'
            AND a.project_id = ".$projectId." 
            AND a.pt_id = ".$ptId);
        $jsonString = json_encode($hasil);
        $array = json_decode($jsonString);        
        $employee_id = 0;
        foreach ($array as $row) {
            $employee_id = $row->employee_id;
        }
        return $employee_id;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Absent_Logfingerprint $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                    'sp_absent_logfinger_read',
                                   1,
                                   999999999, 
                                   $d->getProject_id(),
                                   $d->getPt_id(),
                                   $d->getEmployee_id(),
                                   $d->getFromdate(),
                                   $d->getUntildate()
                            );
        return $hasil;
    }
    
    
    function get_timein($arData, $tanggal, $nomorKaryawan, $arData_shift){
        $shift_in_time = '';
        foreach ($arData_shift as $row_shift) {
            $dt = date("Y-m-d", strtotime($row_shift->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode){
                if($row_shift->in_time != ''){
                    $shift_in_time = $dt . ' ' . date("H:i:s",strtotime($row_shift->in_time->date));
                } else {
                    $shift_in_time = $dt . ' 00:00:00';                    
                }
                break;
            }
        }
        
        //echo $shift_in_time.'<br>';
        // cari jam paling pagi antara 4 jam sebelum dan 6 jam sesudah time in shift ( di yg lain 6 jam sebelum
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-1 hour', strtotime($shift_in_time)));
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+6 hour', strtotime($shift_in_time)));
        //echo $shift_range1 . ' s.d '. $shift_range2 . '<br>';
        
        $i = 0;
        $min_time = '';
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($nomorKaryawan == $row2->nik){
                $time = $dt. ' '. date("H:i:s", strtotime($row2->time->date));
                if($time >= $shift_range1 && $time <= $shift_range2){
                    if($min_time == '' || $time < $min_time){
                        $min_time = $time;
                    }
                }
            }
        }
                
        if($min_time == ''){
            return NULL;
        } else {
            $min_time = date("H:i:s", strtotime($min_time));  
            return $min_time;
        }
    }
    
    function get_timeout($arData, $tanggal, $nomorKaryawan, $arData_shift){
        $shift_out_time = '';
        foreach ($arData_shift as $row_shift) {
            $dt = date("Y-m-d", strtotime($row_shift->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode){
                if($row_shift->out_time != ''){
                    $shift_out_time = $dt . ' ' . date("H:i:s",strtotime($row_shift->out_time->date));
                } else {
                    $shift_out_time = $dt . ' 00:00:00';                    
                }
                $different_day = $row_shift->different_day;
                if($different_day){                    
                    $shift_out_time = date('Y-m-d H:i:s', strtotime('+1 day', strtotime($shift_out_time)));
                }
                break;
            }
        }
        
        //echo 'out ' . $shift_out_time . '<br>';
        // cari jam paling malam antara 6 jam sebelum out shift dan 7 jam sesudah time out shift
        // dibuat 6 jam karena di mall semarang ada kejadian pulang setengah hari saat lebaran
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-6 hour', strtotime($shift_out_time)));
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+1 hour', strtotime($shift_out_time)));
        //echo $shift_range1 . ' s.d '. $shift_range2 . '<br>';
        $i = 0;
        $max_time = '';
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($nomorKaryawan == $row2->nik){
                $time = $dt . ' ' .date("H:i:s", strtotime($row2->time->date));
                //echo "$time >= $shift_range1 && $time <= $shift_range2 <br>";
                if($time >= $shift_range1 && $time <= $shift_range2){
                    if($max_time == '' || $time > $max_time){
                        $max_time = $time;
                    }
                }                
            }
        }
        
        if($max_time == ''){
            return NULL;
        } else {
            $max_time = date("H:i:s", strtotime($max_time));  
            return $max_time;
        }
    }
        
    function get_timein_off($arData, $tanggal, $nomorKaryawan){
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time =  date("H:i:s", strtotime($row2->time->date)); // paling pagi hari ini
                return $time;
                exit;
            }
        }
        return null;
    }
    
    function get_timeout_off($arData, $tanggal, $nomorKaryawan){
        $i = 0;
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $i++;
                if($i == 2){
                    $time_out_hari_ini =  date("H:i:s", strtotime($row2->time->date));
                    return $time_out_hari_ini;
                    exit;
                }
            }
        }                            
        return null;
    }

}
