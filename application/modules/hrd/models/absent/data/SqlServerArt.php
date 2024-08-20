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
            // 'password' => 'w3bd3v.cipdev',
            'password' => '$7iM#03pA@44',
            'dbname' => 'dbtemp_absen'
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
                                        FROM t_absenlog 
                                        WHERE 
                                            project_id=$this->projectId
                                            and pt_id=$this->ptId
                                            and [date] between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
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
