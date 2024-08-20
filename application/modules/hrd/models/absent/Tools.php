<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tools
 *
 * @author MIS
 */
class Hrd_Models_Absent_Tools {

    public static function attachTimeByShiftType(Hrd_Models_Master_General_Date $absentDetail, $time, $isIn = TRUE) {
        if ($time >= '07:00:00' && $time <= '14:59:59') {
            $isIn ? $absentDetail->getTimeA()->setIn($time) : $absentDetail->getTimeA()->setOut($time);
        } else if ($time >= '15:00:00' && $time <= '21:59:59') {
            $isIn ? $absentDetail->getTimeB()->setIn($time) : $absentDetail->getTimeB()->setOut($time);
        } else {
            $isIn ? $absentDetail->getTimeC()->setIn($time) : $absentDetail->getTimeC()->setOut($time);
        }
    }

    /* get time region [A,B,C] */

    public static function attachLate(Hrd_Models_Master_General_Date $absentDetail, $time, Hrd_Models_Master_ShiftType $st) {
        $x = new DateTime();
        $y = new DateTime();
        $y->setTimestamp(strtotime($time));
        $isLate = FALSE;               

        // edit by wulan sari 20190507
        // untuk shift dengan jam mnasuk 00:00:00 maka hari + 1
        $shift_in = date('Y-m-d').' '. $time;            
        if($st->getInTime() == '00:00:00'){
            $shift_in = date('Y-m-d H:i:s', strtotime($shift_in . "+1 days"));
        }

        if ($time >= '07:00:00' && $time <= '14:59:59') {
            
            $time_in = date('Y-m-d').' '. $absentDetail->getTimeA()->getIn();
            if ($time_in > $shift_in) {
                $x->setTimestamp(strtotime($absentDetail->getTimeA()->getIn()));
                $isLate = TRUE;
            }
        } else if ($time >= '15:00:00' && $time <= '21:59:59') {
            
            $time_in = date('Y-m-d').' '. $absentDetail->getTimeB()->getIn();
            if ($time_in > $shift_in) {
                $isLate = TRUE;
                $x->setTimestamp(strtotime($absentDetail->getTimeB()->getIn()));
            }
        } else {
            
            $time_in = date('Y-m-d').' '. $absentDetail->getTimeC()->getIn();
            if ($time_in > $shift_in) {
                $isLate = TRUE;
                $x->setTimestamp(strtotime($absentDetail->getTimeC()->getIn()));
            }
        }
        if ($isLate) {
            $diff = date_diff($x, $y);
            $absentDetail->setLate($diff->h . ":" . $diff->i . ":" . $diff->s);
        } else {
            $absentDetail->setLate("00:00:00");
        }
    }

    public static function attachAttendance(Hrd_Models_Master_General_Date $absentDetail, Hrd_Models_Master_ShiftType $st) {

        $timeRange = Hrd_Models_Absent_Tools::getTimeRange($absentDetail, $st);
        $absentDetail->setTotalAttendance($timeRange["out"] - $timeRange["in"] > 0 ? 1 : 0);
        
        //added by wulan sari 20200622
        $absentDetail->setTotalTransport($timeRange["out"] - $timeRange["in"] > 0 ? 1 : 0);
    }

    public static function getTimeRange(Hrd_Models_Master_General_Date $absentDetail, Hrd_Models_Master_ShiftType $st) {
        $x = array("in" => '00:00:00', "out" => '00:00:00');

	/* catatan by ahmad riadi - ketergantungan terhadap shift,
         *  harus terisi timein dan out di shiftnya, jika tidak akan retun null
         */        
        /*start added by ahmad riadi 05-10-2017 untuk menghitung total jam di hari libur*/
        $recordshift = $st->getArrayTable();
        $recordabsent = $absentDetail->getArrayTable();      
        /*end added by ahmad riadi 05-10-2017 */

        // contoh kasus hasil hitung jam in ga keambil karena ja in diluar range. ada di td_absentdetail absentdetail_id = 1461975

        if ($st->getInTime() >= '07:00:00' && $st->getInTime() <= '14:59:59') {
            $x["in"] = $absentDetail->getTimeA()->getIn();
        } else if ($st->getInTime() >= '15:00:00' && $st->getInTime() <= '21:59:59') {
            $x["in"] = $absentDetail->getTimeB()->getIn();
        } else {
            $x["in"] = $absentDetail->getTimeC()->getIn();
	    if($recordshift['code']=='OFF'){  
                $x["in"]= $recordabsent['time_in'];
            }  	
		
        }

        if ($st->getOutTime() >= '07:00:00' && $st->getOutTime() <= '14:59:59') {
            $x["out"] = $absentDetail->getTimeA()->getOut();
        } else if ($st->getOutTime() >= '15:00:00' && $st->getOutTime() <= '21:59:59') {
            $x["out"] = $absentDetail->getTimeB()->getOut();
        } else {
            $x["out"] = $absentDetail->getTimeC()->getOut();
	     if($recordshift['code']=='OFF'){  
                $x["out"]= $recordabsent['time_out'];
            }	
		

        }
        return $x;
    }

    //

    /* @return array of objects
     * @params $indexPos => posisi index tempat array data dao
     *  */

    public static function buildObjects(Box_Models_App_Creator $creator, $creatorName, $daoResult, $indexPos) {
        $hasil = array();
        if ($daoResult) {
            if (key_exists($indexPos, $daoResult)) {
                if (count($daoResult[$indexPos]) > 0) {
                    foreach ($daoResult[$indexPos] as $row) {

                        $obj = $creator->create($creatorName);
                        $obj->setArrayTable($row);
                        if ($obj instanceof Box_Kouti_Remora) {
                            foreach ($obj->grouped() as $remoraObj) {
                                $remoraObj->setArrayTable($row);
                            }
                        }
                        $hasil[] = $obj;
                    }
                }
            }
        }
        return $hasil;
    }

    public static function getIntervalSpecFromTime($time) {
        $hasil = "PT";
        $x = explode(":", $time);
        if (is_array($x)) {
            if (count($x) > 0) {
                if (array_key_exists(0, $x)) {
                    $hasil .= $x[0] . "H";
                }
                if (array_key_exists(1, $x)) {
                    $hasil .= $x[1] . "M";
                }
                if (array_key_exists(2, $x)) {
                    $hasil .= $x[2] . "S";
                }
            }
        }
        return $hasil;
    }

    public static function calculateTimeLost(Box_Models_App_Session $ses) {
        $lostTime = new Hrd_Models_Absent_LostTime();
        $lostTime->process($ses);
    }

    /* added 23 Agustus 2015
     * cek hari - hari di antara 2 tanggal apakah termasuk hari off atau tidak
     */

    public static function getNonHariOff($startDate, $endDate, $employeeId) {
        $validDate = array();
        /// cek ada di hari off atau gak
        $aDao = new Hrd_Models_AbsentDao();
        $hasil = $aDao->getAbsentSheetByRange($startDate, $endDate, $employeeId);


        $hasil = Box_Tools::toObjectsb('date', $hasil, FALSE, array('shifttype_'));


        foreach ($hasil as $date) {
            if ($date instanceof Hrd_Models_Master_General_Date) {

                if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0) {
                    $validDate[] = $date;
                }
            }
        }

        return $validDate;
    }
    
    public static function getNonHariOffTlk($startDate, $endDate, $employeeId) {
        $validDate = array();
        /// cek ada di hari off atau gak
        $aDao = new Hrd_Models_AbsentDao();
        $hasil = $aDao->getAbsentSheetByRange($startDate, $endDate, $employeeId);


        $hasil = Box_Tools::toObjectsb('date', $hasil, FALSE, array('shifttype_'));


        foreach ($hasil as $date) {
            if ($date instanceof Hrd_Models_Master_General_Date) {
                
                // validasi holiday tidak boleh TLK dihilangkan atas request Citra Raya dan hasil meeting
                //if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0) {
                if ($date->getShiftType()->getId() > 0) {
                    $validDate[] = $date;
                }
            }
        }

        return $validDate;
    }

    /*@return Hrd_Models_Leave_LeaveEntitlement*/
    public static function procesPotongCutiByIzin(Hrd_Models_Leave_Leave $leave,Box_Models_App_Session $ses) {

        $absentTypeIzin = array(Box_Config::ABSENTTYPE_IZINMASUKLAMBAT, Box_Config::ABSENTTYPE_PULANGAWALATAUSAKIT);
        $jatahCutiKepotong = new Hrd_Models_Leave_LeaveEntitlement();
        $potongCutiAmount = 0;
           
        if (in_array($leave->getAbsentType()->getId(), $absentTypeIzin)) {
            
            $dao = new Hrd_Models_AbsentDao();
            
           

            $absentIzin = $dao->getAbsentSheetByRange($leave->getStartDate(), $leave->getEndDate(), $leave->getEmployee()->getId());
            if (Box_Tools::adaRecord($absentIzin)) {
                $absentIzin = Box_Tools::toObjectsb("date", $absentIzin, TRUE);
                
                /// jika belum ambil izin 
                if (!in_array($absentIzin->getAbsentType()->getId(), $absentTypeIzin)) {
                    $shifTypes = Box_Dao::getAllShiftTypes($ses->getProject()->getId(),$ses->getPt()->getId());
              

                    if ($absentIzin instanceof Hrd_Models_Master_General_Date) {


                        $lostIn = Hrd_Models_Absent_LostTime::getLosttimeIn($shifTypes, $absentIzin);
                        $lostOut = Hrd_Models_Absent_LostTime::getLosttimeOut($shifTypes, $absentIzin);

                        if ($lostIn) {
                            $jamLost = $lostIn->format("%h");
                            if ($jamLost >= 2 && $jamLost < 4) {
                                $potongCutiAmount = 0.5;
                            } else if ($jamLost >= 4) {
                                $potongCutiAmount = 1;
                            }
                        }

                        if ($lostOut) {
                            $jamLost = $lostOut->format("%h");
                            if ($jamLost >= 2 && $jamLost < 4) {
                                $potongCutiAmount += 0.5;
                            } else if ($jamLost >= 4) {
                                $potongCutiAmount += 1;
                            }
                        }

                       
                        // jika ada pontonga, maka ambil data jatah cuti untuk dipotong
                        if($potongCutiAmount > 0){
                            $jatahCutiDao = new Hrd_Models_Leave_LeaveEntitlementDao();
                            
                            
                            $jatahCuti = $jatahCutiDao->getJatahCutiTahunTerakhir($leave->getEmployee()->getId(),$ses);
                            if(Box_Tools::adaRecord($jatahCuti)){
                                $jatahCuti = Box_Tools::toObjectsb("leaveentitlement", $jatahCuti,TRUE);
                              
                                $jatahCutiKepotong->setId($jatahCuti->getId());
                                $jatahCutiKepotong->setRest(floatval($jatahCuti->getRest()) - $potongCutiAmount);
                            }
                        }
                        
                        
                    }
                }


                //  var_dump($absents->getArrayTable());
            }

            //var_dump($absents);
        }
        
        return $jatahCutiKepotong;
    }

}

?>
