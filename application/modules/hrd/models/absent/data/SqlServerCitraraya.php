<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SqlServerKantorPusat
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_Data_SqlServerCitraraya extends Hrd_Models_Absent_ImporterData{
    private $params;
    private $projectId;
    private $ptId;

    public function __construct($projectId,$ptId) {
        $this->projectId = $projectId;
        $this->ptId = $ptId;

        /*
        $this->params = array(
            'host' => 'TOMMY-MIS-PC',
            'username' => 'sa',
            'password' => 'password12345',
            'dbname' => 'hrd_tempabsent'
        );
        */
        
        $this->params = array(
            'host' => '202.145.11.232', // 180.250.59.247
            'username' => 'bozz',
            // 'password' => 'w3bd3v.cipdev',
            'password' => '$7iM#03pA@44',
            'dbname' => 'dbtemp_absen'
        );
         
        $this->params_hrd = array(
            'host' => 'VM-WEBAPPS',
            'username' => 'webappsdb',
            'password' => '$bu5w4yP@ssw0rd',
            'dbname' => 'hrd'
        );
               
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
            if ($db) {
                $m = intval($this->month);
                $y = intval($this->year);
                $month = $m;
                $year = $y;




                $maxDay = cal_days_in_month(CAL_GREGORIAN, $month, $year);

                $endDay = $endDay > $maxDay ? $maxDay : $endDay;
                
                /* tambah 1 hari */
                $tempDate =  $year . "/" . $month . "/" . $endDay;
           
                $tempDate = date('Y-m-d', strtotime($tempDate . "+1 days"));
                
                



               /* $hasil = $db->fetchAll("Select * From view_absensi 
                    where EventTime between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
                        order by PSNNO,EventTime");
                
                */
                
               
                 /* start edited by ahmad riadi, menambah order by  07-03-2018 */
                $hasil = $db->fetchAll("
                                        SELECT 
                                            *
                                        FROM t_absenlog_sh1b 
                                        WHERE 
                                            project_id=$this->projectId
                                            and pt_id=$this->ptId
                                            and [date] between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
                                            and transfer <> 1
                                        ORDER BY  
                                                nik,date,time ASC  
                                       ");
                /* end edited by ahmad riadi, menambah order by  07-03-2018 */

                /*
                 $hasil = $db->fetchAll("Select * From view_absensi 
                    where EventTime between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
                        order by PSNNO,EventTime");
                 */
                
           


                $header = new Hrd_Models_Fingerprint_Header();
                $listEmployee = array();
                $jsonString = json_encode($hasil);
                $arData = json_decode($jsonString);


                foreach ($arData as $row) {

                   // $dt = $row->EventTime;
                    $nomorKaryawan = $row->nik;

                    $time =  date("H:i:s", strtotime($row->time->date));
                    
                   

                 //   $tanggal = date("Y-m-d", strtotime($dt->date));
                    $tanggal = date("Y-m-d", strtotime($row->date->date));
                  
                    if (array_key_exists($nomorKaryawan, $listEmployee)) {
                        /// check jika tanggal sudah ada 
                        if (array_key_exists($tanggal, $listEmployee[$nomorKaryawan]["date"])) {
                            $listEmployee[$nomorKaryawan]["date"][$tanggal]["timeout"] = $time;
                        } else {                               // $listEmployee[$row->PSNNO]["date"][$tanggal] = array("timeout" => date("H:i:s", strtotime($dt->date)), "timein" => NULL);
                            $listEmployee[$nomorKaryawan]["date"][$tanggal] = array("timein" => $time, "timeout" => NULL);
                        }
                    } else {

                        $listEmployee[$nomorKaryawan] = array("name" => $nomorKaryawan, "date" => array());
                        
                        

                        $listEmployee[$nomorKaryawan]["date"][$tanggal] = array("timein" => $time, "timeout" => NULL);
                    }
                    //    }
                }
                
                // wulan edit 20190124 ada karyawan yang jam absent pulangnya di hari berikutnya
                /* 20190312 sementara di comment dulu karena ada bugs contoh untuk NUR FITRIYANI di tanggal 2019-03-11
                foreach ($arData as $row) {
                    //$dt = $row->EventTime;
                    $nomorKaryawan = $row->nik;

                    $time =  date("H:i:s", strtotime($row->time->date));
                    
                    //$tanggal = date("Y-m-d", strtotime($dt->date));
                    $tanggal = date("Y-m-d", strtotime($row->date->date));
                    
                    if(isset($listEmployee[$nomorKaryawan]["date"][$tanggal]['timeout'])){
                        if(!isset($listEmployee[$nomorKaryawan]["date"][$tanggal]['timein'])){                          
                            // belum dulu
                        }
                    }
                    
                    if(isset($listEmployee[$nomorKaryawan]["date"][$tanggal]['timein'])){
                        if(!isset($listEmployee[$nomorKaryawan]["date"][$tanggal]['timeout'])){
                            // cari jam out dari hari berikutnya
                            $next_day = date('Y-m-d', strtotime($tanggal . ' + 1 day'));
                            $hasil_next = $db->fetchAll("
                                SELECT 
                                min(time) as next_min_time
                                FROM t_absenlog_sh1b 
                                WHERE 
                                    project_id=$this->projectId
                                    and pt_id=$this->ptId
                                    and nik='$nomorKaryawan'
                                    and [date] = '" . $next_day . "'
                               ");
                            $next_min_time = '00:00:00';
                            foreach ($hasil_next as $row_next) {
                                    $next_min_time = $row_next['next_min_time'];
                            }
                            
                            if(isset($next_min_time)){
                                $db_hrd = Zend_Db::factory('Sqlsrv', $this->params_hrd);                            
                                $shift = $db_hrd->fetchAll("
                                    SELECT 
                                    d.out_time, d.in_time
                                    FROM td_absentdetail a
                                    join th_absent b on a.absent_id = b.absent_id
                                    join m_employee c on b.employee_id = c.employee_id
                                    join m_shifttype d on a.shifttype_id = d.shifttype_id
                                    WHERE 
                                        b.project_id=$this->projectId
                                        and b.pt_id=$this->ptId
                                        and c.fingerprintcode='$nomorKaryawan'
                                        and [date] = '" . $next_day . "'
                                ");
                                $shift_in_time = '';
                                foreach ($shift as $row_shift) {
                                        $shift_in_time = $row_shift['in_time'];
                                }

                                if($shift_in_time != ''){
                                    // kasus karyawan absent pulang di hari berikutnya
                                    // kalau jam absent 3 jam sebelum shift masuk maka jam itu masuk jam pulang hari sebelumnya
                                    if (strtotime(date("H:i:s", strtotime($next_min_time->format('Y-m-d H:i:s')))) <= strtotime(date("H:i:s", strtotime($shift_in_time->format('Y-m-d H:i:s'))))-1800){                                
                                        $listEmployee[$nomorKaryawan]["date"][$tanggal]["timeout"] = date("H:i:s", strtotime($next_min_time->format('Y-m-d H:i:s')));
                                    }
                                } else {							
                                    // kalau shift off maka tidak ada patokan jam shift, maka kalau next day ada lebih dari 2 maka yg paling pagi adalah jam pulang hari sebelum
                                    $hasil_next = $db->fetchAll("
                                        SELECT 
                                        count(*) as jml
                                        FROM t_absenlog_sh1b
                                        WHERE 
                                            b.project_id=$this->projectId
                                            and b.pt_id=$this->ptId
                                            and nik='$nomorKaryawan'
                                            and [date] = '" . $next_day . "'
                                       ");
                                    $jml = 0;
                                    foreach ($hasil_next as $row_next) {
                                            $jml = $row_next['jml'];
                                    }

                                    if($jml > 2){
                                        $listEmployee[$nomorKaryawan]["date"][$tanggal]["timeout"] = date("H:i:s", strtotime($next_min_time->format('Y-m-d H:i:s')));
                                    }
                                }

                                // karena jam yg hari berikutnya jadi dipakai out ditanggal ini, jadi jam in hari berikutnya di update juga
                                $hasil_next = $db->fetchAll("
                                    SELECT 
                                    min(time) as next_min_time
                                    FROM t_absenlog_sh1b 
                                    WHERE 
                                        project_id=$this->projectId
                                        and pt_id=$this->ptId
                                        and nik='$nomorKaryawan'
                                        and [date] = '" . $next_day . "'
                                        and time != '" . date("H:i:s", strtotime($next_min_time->format('Y-m-d H:i:s'))) . "'
                                   ");
                                $next_min_time = '';
                                foreach ($hasil_next as $row_next) {
                                        $next_min_time = $row_next['next_min_time'];
                                }
                                if($next_min_time != ''){
                                    $listEmployee[$nomorKaryawan]["date"][$next_day]["timein"] = date("H:i:s", strtotime($next_min_time->format('Y-m-d H:i:s')));
                                }
                            }
                            
                        }
                    }
                    
                }*/
                // end wulan edit 20190124 ada karyawan yang jam absent pulangnya di hari berikutnya
                
                
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
}
