<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SqlServerProject
 *
 * @author
 */
class Hrd_Models_Absent_Data_SqlServerProject extends Hrd_Models_Absent_ImporterData {
    private $params;
    private $projectId;
    private $ptId;
    private $mysqlcon;
    private $configintranet;

    public function __construct($projectId,$ptId) {
        $this->projectId = $projectId;
        $this->ptId = $ptId;
                
        $this->params = array(
            'host' => '202.145.11.232',
            'username' => 'bozz',
            // 'password' => 'w3bd3v.cipdev',
            'password' => '$7iM#03pA@44',
            'dbname' => 'dbtemp_absen'
        );
        
        $this->params_hrd = array(
            //'host' => '13.76.184.138',
            'host' => '10.45.45.4',
            'username' => 'webappsdb',
            'password' => '$bu5w4yP@ssw0rd',
            'dbname' => 'hrd'
        ); 
        
        
        // $this->params = array(
        //     'host' => 'MIS-RICO-NB\SQLEXPRESS',
        //     'username' => 'sa',
        //     'password' => 'sa',
        //     'dbname' => 'dbtemp_absen'
        // );
        
        // $this->params_hrd = array(
        //     'host' => 'MIS-RICO-NB\SQLEXPRESS',
        //     'username' => 'sa',
        //     'password' => 'sa',
        //     'dbname' => 'hrd'
        // );
        
        
        // Untuk cek koneksi ke database intranet
        $dao_absent = new Hrd_Models_AbsentDao();
        $sh = $dao_absent->checkSH($this->projectId);
        $this->configintranet = $sh['dbintranet_name'];
                
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($this->configintranet);
        $this->mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );        
               
            
        // sementara hanya apply di sh3a dan citra garden
        $t_absenlog = '';
        if($this->configintranet == 'config_sh3a'){
            if ($projectId == 6 || $projectId == 4057){
                $t_absenlog = 't_absenlog_sh3a_mcj';
            } else if ($projectId == 1002 && $ptId == 4225){
                $t_absenlog = 't_absenlog_sh3a_pkc';
            } else if (($projectId == 22 && $ptId == 4225) || ($projectId == 2004 && $ptId == 4225) || ($projectId == 22 && $ptId == 12)) {
                $t_absenlog = 't_absenlog_sh3a_cw2';
            } else if (($projectId == 4047 && $ptId == 3165) || ($projectId == 4047 && $ptId == 4225)) {
                $t_absenlog = 't_absenlog_sh3a_ci';
            } else if (($projectId == 4049 && $ptId == 3186) || ($projectId == 4049 && $ptId == 3189) || ($projectId == 4049 && $ptId == 3187) || ($projectId == 4049 && $ptId == 3185) || ($projectId == 4049 && $ptId == 3188)) {
                $t_absenlog = 't_absenlog_sh3a_citradream';
            } else if (($projectId == 2074 && $ptId == 3166) || ($projectId == 4048 && $ptId == 3178) || ($projectId == 11140 && $ptId == 23465)) {
                $t_absenlog = 't_absenlog_sh3a_cw2';
            } else if ($projectId == 92 && $ptId == 40) {
                $t_absenlog = 't_absenlog_sh3a_hcj';
            } else if ($projectId == 2012 && $ptId == 2084) {
                $t_absenlog = 't_absenlog_century';
            } else {
                $t_absenlog = 't_absenlog_sh3a';            
            } 
            
        } else if($this->configintranet == 'config_sh3b'){
            $t_absenlog = 't_absenlog_sh3b';     
            
        } else if($this->configintranet == 'config_sh1a'){
            $t_absenlog = 't_absenlog_citragarden';            
        } 
        
        //dummy
        else if($this->configintranet == 'config_kp' && $projectId == 5096 && $ptId == 5232){
            $t_absenlog = 't_absenlog_dummy';            
        }
        else if($this->configintranet == 'config_art' || $this->configintranet == 'config_century21'){
            $t_absenlog = 't_absenlog_ciputra';            
        }else{
            $t_absenlog = 't_absenlog_dummy2';            
        }
        
        if($t_absenlog != ''){
            $this->t_absenlog = $t_absenlog;
        } else {
            echo 'temp table not found'; exit;
        }
        
        $date_field = 'date';
        if($this->t_absenlog == 't_absenlog_sh3a_mcj'){
            $date_field = 'date_ymd';
        }
        $this->date_field = $date_field;
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
                                            distinct nik, ".$this->date_field." as date
                                        FROM ".$this->t_absenlog."
                                        WHERE 
                                            project_id=$this->projectId
                                            and pt_id=$this->ptId
                                            and nik != ''
                                            and ".$this->date_field." between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
                                        ORDER BY  
                                                nik, ".$this->date_field." ASC  
                                       ");
                                       
                $jsonString = json_encode($hasil_date);
                $arData_date = json_decode($jsonString);
                
                $hasil = $db->fetchAll("
                                        SELECT 
                                            distinct nik, ".$this->date_field." as date, time, project_id, pt_id
                                        FROM ".$this->t_absenlog." 
                                        WHERE 
                                            project_id=$this->projectId
                                            and pt_id=$this->ptId
                                            and nik != ''
                                            and ".$this->date_field." between '" . $from . "' and '" . $tempDate . "'
                                        ORDER BY  
                                                nik,".$this->date_field.",time ASC  
                                       ");

                $header = new Hrd_Models_Fingerprint_Header();
                $listEmployee = array();
                $jsonString = json_encode($hasil);
                $arData = json_decode($jsonString);
                
                $arData_shift = $this->get_cek_shift($this->projectId, $this->ptId, $from, $tempDate);                
                
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
                    
                    if($holiday == 0){
                        $time_in_hari_ini = $this->get_timein($arData, $tanggal, $nomorKaryawan, $arData_shift);
                        
                        if ($this->configintranet) {
                            $empid = $this->get_employee_id($this->projectId, $this->ptId, $nomorKaryawan);
                            $sql = "SELECT * FROM th_lembur WHERE is_deleted=0 and status IN ('OPEN', 'CLOSED', 'SUBMIT') and different_day_out = 1 and assign_to = ".$empid." and lembur_dari like '".$tanggal."%'";                                                        
                            $mysqlquery = mysqli_query($this->mysqlcon, $sql);
                            $mysqlcount = mysqli_num_rows($mysqlquery);
                            if($mysqlcount > 0){
                                $tanggal_besok = date('Y-m-d', strtotime("+1 day", strtotime($tanggal)));
                                $time_out_hari_ini = $this->get_timeout_difday_lembur($arData, $tanggal_besok, $nomorKaryawan);
                            } else {
                                $time_out_hari_ini = $this->get_timeout($arData, $tanggal, $nomorKaryawan, $arData_shift);                                
                            }
                            
                            $sql = "SELECT * FROM th_lembur WHERE is_deleted=0 and status IN ('OPEN', 'CLOSED', 'SUBMIT') and different_day_in = 1 and assign_to = ".$empid." and lembur_dari like '".$tanggal."%'";                                                        
                            $mysqlquery = mysqli_query($this->mysqlcon, $sql);
                            $mysqlcount = mysqli_num_rows($mysqlquery);
                            if($mysqlcount > 0){
                                $tanggal_kemarin = date('Y-m-d', strtotime("-1 day", strtotime($tanggal)));
                                $time_in_hari_ini = $this->get_time_paling_malam($arData, $tanggal_kemarin, $nomorKaryawan);
                                
                                // kalau ada lembur yang in nya kemarin maka cari out di paling malam hari ini
                                $time_out_hari_ini = $this->get_time_paling_malam($arData, $tanggal, $nomorKaryawan);
                            }
                        } else {
                            $time_out_hari_ini = $this->get_timeout($arData, $tanggal, $nomorKaryawan, $arData_shift);
                        }
                        
                    } else {
                        $time_in_hari_ini = $this->get_timein_off($arData, $tanggal, $nomorKaryawan);
                        $time_out_hari_ini = $this->get_timeout_off($arData, $tanggal, $nomorKaryawan);
                        
                        // kalau ada lembur
                        if ($this->configintranet) {
                            $empid = $this->get_employee_id($this->projectId, $this->ptId, $nomorKaryawan);
                            $sql = "SELECT * FROM th_lembur WHERE is_deleted=0 and status IN ('OPEN', 'CLOSED', 'SUBMIT') and different_day_out = 1 and assign_to = ".$empid." and lembur_dari like '".$tanggal."%'";
                            $mysqlquery = mysqli_query($this->mysqlcon, $sql);
                            $mysqlcount = mysqli_num_rows($mysqlquery);
                            if($mysqlcount > 0){                                
                                $tanggal_besok = date('Y-m-d', strtotime("+1 day", strtotime($tanggal)));
                                $time_out_hari_ini = $this->get_timeout_difday($arData, $tanggal_besok, $nomorKaryawan);;
                            }

                            $sql = "SELECT * FROM th_lembur WHERE is_deleted=0 and status IN ('OPEN', 'CLOSED', 'SUBMIT') and different_day_in = 1 and assign_to = ".$empid." and lembur_dari like '".$tanggal."%'";
                            $mysqlquery = mysqli_query($this->mysqlcon, $sql);
                            $mysqlcount = mysqli_num_rows($mysqlquery);
                            if($mysqlcount > 0){
                                $tanggal_kemarin = date('Y-m-d', strtotime("-1 day", strtotime($tanggal)));
                                $time_in_hari_ini = $this->get_time_paling_malam($arData, $tanggal_kemarin, $nomorKaryawan);;

                                // kalau ada lembur yang in nya kemarin maka cari out di paling malam hari ini
                                $time_out_hari_ini = $this->get_time_paling_malam($arData, $tanggal, $nomorKaryawan);;
                            }

                        }

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
      
    
    function get_timein_normal($arData, $tanggal, $nomorKaryawan, $arData_shift){
        $shift_in_time = '';
        $shift_out_time = '';
        foreach ($arData_shift as $row_shift) {
            $dt = date("Y-m-d", strtotime($row_shift->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode){
                $shift_in_time = $row_shift->in_time;
                $shift_out_time = $row_shift->out_time;
                break;
            }
        }
        //echo $shift_in_time->date;
        // cari jam paling pagi antara 3 jam sebelum in shift dan 2 jam sesudah time in shift
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-3 hour', strtotime($shift_in_time->date)));
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+3 hour', strtotime($shift_in_time->date)));
        $i = 0;
        $min_time = '';
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time = date("Y-m-d H:i:s", strtotime($row2->time->date));
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
        
        /*
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time =  date("H:i:s", strtotime($row2->time->date)); // paling pagi hari ini
                return $time;
                exit;
            }
        }
        return null;*/
    }
    
    
    function get_timein_difday($arData, $tanggal, $nomorKaryawan, $arData_shift){
        $shift_in_time = '';
        $shift_out_time = '';
        foreach ($arData_shift as $row_shift) {
            $dt = date("Y-m-d", strtotime($row_shift->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode){
                $shift_in_time = $row_shift->in_time;
                $shift_out_time = $row_shift->out_time;
                break;
            }
        }
        //echo $shift_in_time->date;
        // cari jam paling pagi antara 3 jam sebelum in shift dan 2 jam sesudah time in shift
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-3 hour', strtotime($shift_in_time->date)));
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+3 hour', strtotime($shift_in_time->date)));
        $i = 0;
        $min_time = '';
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time = date("Y-m-d H:i:s", strtotime($row2->time->date));
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
        
        /*
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time =  date("H:i:s", strtotime($row2->time->date)); // paling pagi hari ini
                return $time;
                exit;
            }
        }
        return null;*/
    }
    
    
    function get_timein_kemarin_difday($arData, $tanggal, $nomorKaryawan, $arData_shift){
        /* // cara 1 ambil max ke 2  */   
        $i = 0;
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $i++;
                if($i == 2){
                    $time_in_hari_ini =  date("H:i:s", strtotime($row2->time->date));
                    return $time_in_hari_ini;
                    exit;
                }
            }
        }
    }
    
    function get_timeout_normal($arData, $tanggal, $nomorKaryawan, $arData_shift){
        $shift_in_time = '';
        $shift_out_time = '';
        foreach ($arData_shift as $row_shift) {
            $dt = date("Y-m-d", strtotime($row_shift->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode){
                $shift_in_time = $row_shift->in_time;
                $shift_out_time = $row_shift->out_time;
                break;
            }
        }
        
        // cari jam paling malam antara 1 jam sebelum out shift dan 7 jam sesudah time out shift
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-1 hour', strtotime($shift_out_time->date)));
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+7 hour', strtotime($shift_out_time->date)));
        $i = 0;
        $max_time = '';
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time = date("Y-m-d H:i:s", strtotime($row2->time->date));
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
        
        /*
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
        */
    }

    function get_timeout_difday($arData, $tanggal_besok, $nomorKaryawan, $arData_shift, $tanggal){
        $shift_in_time = '';
        $shift_out_time = '';
        foreach ($arData_shift as $row_shift) {
            $dt = date("Y-m-d", strtotime($row_shift->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row_shift->fingerprintcode){
                $shift_in_time = $row_shift->in_time;
                $shift_out_time = $row_shift->out_time;
                break;
            }
        }
        
        // cari jam paling malam antara 1 jam sebelum out shift dan 7 jam sesudah time out shift
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-1 hour', strtotime($shift_out_time->date)));
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+7 hour', strtotime($shift_out_time->date)));
        $i = 0;
        $max_time = '';
        foreach ($arData as $row2) {   
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal_besok == $dt && $nomorKaryawan == $row2->nik){
                $time = date("Y-m-d H:i:s", strtotime($row2->time->date));        
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
        
        /*
        $i = 0;
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal_besok == $dt && $nomorKaryawan == $row2->nik){
                $i++;
                if($i == 1){
                    $time_out_hari_ini =  date("H:i:s", strtotime($row2->time->date));
                    return $time_out_hari_ini;
                    exit;
                }
            }
        }                            
        return null;
        */
        
    }
    
    // jam pulang di esok hari, jadi ambil jam besok yang paling pagi
    function get_timeout_difday_lembur($arData, $tanggal_besok, $nomorKaryawan){
        $i = 0;
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal_besok == $dt && $nomorKaryawan == $row2->nik){
                $i++;
                if($i == 1){
                    $time_out =  date("H:i:s", strtotime($row2->time->date));
                    return $time_out;
                    exit;
                }
            }
        }
        return null;
    }
    
    // cari paling malam
    function get_time_paling_malam($arData, $tanggal, $nomorKaryawan){
        $i = 0;
        $time_in = null;
        foreach ($arData as $row2) {
            $dt = date("Y-m-d", strtotime($row2->date->date));
            if($tanggal == $dt && $nomorKaryawan == $row2->nik){
                $time_in =  date("H:i:s", strtotime($row2->time->date));
            }
        }
        return $time_in;
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
        // cari jam paling pagi antara 6 jam sebelum dan 6 jam sesudah time in shift
        $shift_range1 = date('Y-m-d H:i:s', strtotime('-6 hour', strtotime($shift_in_time)));
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
        $shift_range2 = date('Y-m-d H:i:s', strtotime('+7 hour', strtotime($shift_out_time)));
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

    public function get_all_log($param, $postdata){
        try {

            $db = Zend_Db::factory('Sqlsrv', $param->params);
            $dbhrd = Zend_Db::factory('Sqlsrv', $param->params_hrd);

            $hasil_emp = $dbhrd->fetchAll("
                SELECT employee_id, employee_name, fingerprintcode
                FROM m_employee as a
                WHERE 
                a.deleted = 0
                AND a.employee_active = 1
                AND a.employee_id = '".$postdata['employee_id']."'
                AND a.project_id = ".$postdata['project_id']." 
                AND a.pt_id = ".$postdata['pt_id']);

            $jsonString_emp = json_encode($hasil_emp);
            $array_emp = json_decode($jsonString_emp); 

            $data_employee = null;

            foreach ($array_emp as $row) {
                foreach($row as $key => $item){
                    $data_employee[$key] = $item;
                }
            }
            
            //$ch = curl_init();

            //curl_setopt($ch, CURLOPT_URL, "https://api.ciputragroup.com/viewalllog/viewalllog.php?project_id=".$postdata['project_id']."&pt_id=".$postdata['pt_id']."&fingerprintcode=".$data_employee['fingerprintcode']."&start_date=".date('Y-m-d',strtotime($postdata['fromdate']))."&end_date=".date('Y-m-d',strtotime($postdata['untildate'])));
            //curl_setopt($ch, CURLOPT_HEADER, 0);

            //$hasil = curl_exec($ch);

            //curl_close($ch);
            //print_r("https://api.ciputragroup.com/viewalllog/viewalllog.php?project_id=".$postdata['project_id']."&pt_id=".$postdata['pt_id']."&fingerprintcode=".$data_employee['fingerprintcode']."&start_date=".date('Y-m-d',strtotime($postdata['fromdate']))."&end_date=".date('Y-m-d',strtotime($postdata['untildate'])));die();
            $curl = curl_init();

                    curl_setopt_array($curl, array(
                      CURLOPT_URL => "https://api.ciputragroup.com/viewalllog/viewalllog.php?project_id=".$postdata['project_id']."&pt_id=".$postdata['pt_id']."&fingerprintcode=".$data_employee['fingerprintcode']."&start_date=".date('Y-m-d',strtotime($postdata['fromdate']))."&end_date=".date('Y-m-d',strtotime($postdata['untildate'])),
                      CURLOPT_RETURNTRANSFER => true,
                      CURLOPT_ENCODING => '',
                      CURLOPT_MAXREDIRS => 10,
                      CURLOPT_TIMEOUT => 0,
                      CURLOPT_FOLLOWLOCATION => true,
                      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                      CURLOPT_CUSTOMREQUEST => 'POST',
                      CURLOPT_POSTFIELDS => '',
                      CURLOPT_HTTPHEADER => array(
                        'Content-Type: application/json'
                      ),
                    ));

                    $hasil = curl_exec($curl);

                    curl_close($curl);

            // $hasil = $db->fetchAll("
            //     SELECT *
            //     FROM ".$param->t_absenlog." as a
            //     WHERE 
            //     a.nik = '".$data_employee['fingerprintcode']."'
            //     AND a.project_id = ".$postdata['project_id']." 
            //     AND a.pt_id = ".$postdata['pt_id']."
            //     AND a.date BETWEEN '".date('Y-m-d',strtotime($postdata['fromdate']))."' AND '".date('Y-m-d',strtotime($postdata['untildate']))."'
            //     ORDER BY date, time");

            // $jsonString = json_encode($hasil);
            $jsonString = $hasil;
            
            $array = json_decode($jsonString, TRUE);

            $data = null;
            $i = 0;
            
            $data[0][0]['totalRow'] = $i;

            foreach($array as $row_key => $row_data){
                $i++;
                
                $data[1][$row_key]['RowNum'] = $i;

                foreach($row_data as $key_data => $item_data){
                    
                    if($key_data == 'date'){
                        $data[1][$row_key][$key_data] = date('Y-m-d',strtotime($item_data));
                    }elseif($key_data == 'time'){
                        $data[1][$row_key][$key_data] = date('H:i:s',strtotime($item_data));
                    }elseif($key_data == 'psnno'){
                        $data[1][$row_key]['psnno'] = $item_data;
                        $data[1][$row_key]['psnname'] = $data_employee['employee_name'];
                        $data[1][$row_key]['is_fingerprint'] = '1';
                    }elseif($key_data == 'id'){
                        $data[1][$row_key]['fingerprintprocess_id'] = $item_data;
                    }else{
                        $data[1][$row_key][$key_data] = $item_data;
                    }
                }
            }

            $data[0][0]['totalRow'] = $i;

            $errorMessage = 'Success';

        } catch (Zend_Db_Adapter_Exception $e) {
            $data = null;
            $errorMessage = "Can't connect to database";
        } catch (Zend_Exception $e) {
            $data = null;
            $errorMessage = $e->getMessage();
        }

        $result['data'] = $data;
        $result['message'] = $errorMessage;

        return $result;
    }

}
