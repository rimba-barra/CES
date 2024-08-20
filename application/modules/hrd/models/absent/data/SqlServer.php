<?php

/**
 * Description of SqlServer
 *
 * @author MIS
 */
class Hrd_Models_Absent_Data_SqlServer extends Hrd_Models_Absent_ImporterData {

    private $params;

    public function __construct() {
        //  $this->params = array(
        //     'host' => 'MIS-RICO-NB\SQLEXPRESS',
        //     'username' => 'sa',
        //     'password' => 'sa',
        //     'dbname' => 'SAMSUNG_PRO'
        // ); 
        //  $this->params_hrd = array(
        //     'host' => 'MIS-RICO-NB\SQLEXPRESS',
        //     'username' => 'sa',
        //     'password' => 'sa',
        //     'dbname' => 'hrd'
        // );

        $this->params = array(
            'host' => '202.145.11.230\SAMS', // 180.250.59.245
            'username' => 'sa2',
            'password' => 'samsp&w?',
            'dbname' => 'SAMSUNG_PRO'
        );

        $this->params_hrd = array(
            //'host' => '13.76.184.138',
            'host' => '10.45.45.4',
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
                
                



                $hasil = $db->fetchAll("Select * From view_absensi 
                    where EventTime between '" . $year . "-" . $month . "-" . $startDay . "' and '" . $tempDate . "'
                        order by PSNNO,EventTime");


                $header = new Hrd_Models_Fingerprint_Header();
                $listEmployee = array();
                $jsonString = json_encode($hasil);
                $arData = json_decode($jsonString);


                foreach ($arData as $row) {

                    $dt = $row->EventTime;

                    //  if ($row->PSNNO == "20120003") { /// check khusu psno ini saja
                    //var_dump($dt);

                    $tanggal = date("Y-m-d", strtotime($dt->date));
                    if (array_key_exists($row->PSNNO, $listEmployee)) {
                        /// check jika tanggal sudah ada 
                        if (array_key_exists($tanggal, $listEmployee[$row->PSNNO]["date"])) {
                            $listEmployee[$row->PSNNO]["date"][$tanggal]["timeout"] = date("H:i:s", strtotime($dt->date));
                        } else {                               // $listEmployee[$row->PSNNO]["date"][$tanggal] = array("timeout" => date("H:i:s", strtotime($dt->date)), "timein" => NULL);
                            $listEmployee[$row->PSNNO]["date"][$tanggal] = array("timein" => date("H:i:s", strtotime($dt->date)), "timeout" => NULL);
                        }
                    } else {

                        $listEmployee[$row->PSNNO] = array("name" => $row->PSNNAME, "date" => array());

                        $listEmployee[$row->PSNNO]["date"][$tanggal] = array("timein" => date("H:i:s", strtotime($dt->date)), "timeout" => NULL);
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

    public function get_all_log($param, $postdata){
        try {

            $db = Zend_Db::factory('Sqlsrv', $param->params);
            $dbhrd = Zend_Db::factory('Sqlsrv', $param->params_hrd);

            $hasil_emp = $dbhrd->fetchAll("
                SELECT employee_id, employee_name, fingerprintcode, email_ciputra
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

            //comment by anas 15072024 | tidak ambil data dari mesin samsung tapi langsung dari t_absen_log (API) aja
            // //dari mesin absen 
            // $hasil = $db->fetchAll("
            //     SELECT * FROM view_absensi WHERE PSNNO = '".$data_employee['fingerprintcode']."' and EventTime between '".date('Y-m-d 00:00:00',strtotime($postdata['fromdate']))."' AND '".date('Y-m-d 23:59:59',strtotime($postdata['untildate']))."'
            //     ORDER BY EventTime");

            // $jsonString = json_encode($hasil);
            // $array = json_decode($jsonString, TRUE);
            //end comment by anas

            //dari teams
            $hasil_teams = $dbhrd->fetchAll("
                            SELECT * FROM absent_teams 
                            WHERE email = '".$data_employee['email_ciputra']."' 
                                    and completion_time between '".date('Y-m-d 00:00:00',strtotime($postdata['fromdate']))."' AND '".date('Y-m-d 23:59:59',strtotime($postdata['untildate']))."'
                            ORDER BY id");

            $jsonString_teams = json_encode($hasil_teams);
            $array_teams = json_decode($jsonString_teams, TRUE);

            //added by anas 15072024 | ambil data dari t_absen_log (API)
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

            $hasil_log = curl_exec($curl);
            curl_close($curl);
            $jsonString_log = $hasil_log;            
            $array_log = json_decode($jsonString_log, TRUE);
            //end added by anas

            //merge dari mesin absen dan teams
            $merge = null;
            $data_mesin_teams = null;
            $i_temp = 0;


            //comment by anas 15072024 | tidak ambil data dari mesin samsung tapi langsung dari t_absen_log (API) aja
            // if($array){
            //     foreach($array as $key_mesin => $item_mesin){
            //         $data_mesin_teams[$i_temp]['psnno'] = $item_mesin['PSNNO'];
            //         $data_mesin_teams[$i_temp]['psnname'] = $data_employee['employee_name'];
            //         $data_mesin_teams[$i_temp]['date'] = date('Y-m-d',strtotime($item_mesin['EventTime']['date']));
            //         $data_mesin_teams[$i_temp]['time'] = date('H:i:s',strtotime($item_mesin['EventTime']['date']));
            //         $data_mesin_teams[$i_temp]['datetime'] = date('Y-m-d H:i:s',strtotime($item_mesin['EventTime']['date']));
            //         $data_mesin_teams[$i_temp]['is_fingerprint'] = '1';
            //         $data_mesin_teams[$i_temp]['tipe'] = null;
            //         $i_temp++;
            //     }
            // }
            //end comment by anas

            if($array_teams){
                foreach($array_teams as $key_teams => $item_teams){
                    $data_mesin_teams[$i_temp]['psnno'] = $data_employee['fingerprintcode'];
                    $data_mesin_teams[$i_temp]['psnname'] = $data_employee['employee_name'];
                    $data_mesin_teams[$i_temp]['date'] = date('Y-m-d',strtotime($item_teams['completion_time']['date']));
                    $data_mesin_teams[$i_temp]['time'] = date('H:i:s',strtotime($item_teams['completion_time']['date']));
                    $data_mesin_teams[$i_temp]['datetime'] = date('Y-m-d H:i:s',strtotime($item_teams['completion_time']['date']));
                    $data_mesin_teams[$i_temp]['is_fingerprint'] = '0';
                    $data_mesin_teams[$i_temp]['tipe'] = $item_teams['tipe'];
                    $i_temp++;
                }

            }

            //added by anas 15072024 | ambil data dari t_absen_log (API)
            if($array_log){
                foreach($array_log as $key_log => $item_log){
                    $data_mesin_teams[$i_temp]['psnno'] = $item_log['psnno'];
                    $data_mesin_teams[$i_temp]['psnname'] = $data_employee['employee_name'];
                    $data_mesin_teams[$i_temp]['date'] = date('Y-m-d',strtotime($item_log['date']));
                    $data_mesin_teams[$i_temp]['time'] = date('H:i:s',strtotime($item_log['time']));
                    $data_mesin_teams[$i_temp]['datetime'] = date('Y-m-d H:i:s',strtotime($item_log['datetime']));
                    $data_mesin_teams[$i_temp]['is_fingerprint'] = $item_log['is_fingerprint'];
                    $data_mesin_teams[$i_temp]['tipe'] = $item_log['tipe'];
                    $i_temp++;
                }
            }
            //end added by anas

            $data = null;
            $i = 0;

            if($data_mesin_teams){
                $keys = array_column($data_mesin_teams, 'datetime');

                array_multisort($keys, SORT_ASC, $data_mesin_teams);
                
                
                $data[0][0]['totalRow'] = $i;

                foreach($data_mesin_teams as $row_key => $row_data){
                    $i++;
                    
                    $data[1][$row_key]['RowNum'] = $i;
                    $data[1][$row_key]['fingerprintprocess_id'] = $i;
                    
                    foreach($row_data as $key_data => $item_data){
                        
                            $data[1][$row_key][$key_data] = $item_data;
                        
                    }
                }

                $data[0][0]['totalRow'] = $i;

            }else{
                $data[0] = null;
                $data[1] = null;
            }
            
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

    function date_sort($a, $b) {
        return strtotime($a['date']) - strtotime($b['date']);
    }  


}

?>
