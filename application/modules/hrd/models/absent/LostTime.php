<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LostTime
 *
 * @author MIS
 */
class Hrd_Models_Absent_LostTime {

    private $isTimein; // hitung datang telat
    private $isTimeOut; // hitung pulang cepat
    private $lostParams; // global parameter yang termasuk hitungan 
    private $attendanceHours;
    private $msg;
    private $data;

    // public function __construct(Box_Models_App_Session $ses) {
    // added by Michael 2021.05.19
    public function __construct(Box_Models_App_Session $ses, $data) {
    // end added by Michael 2021.05.19
        // if(!$this->init($ses)){
        if(!$this->init($ses, $data)){
            echo $this->msg;
            die();
        }
        $this->attendanceHours = 8;

        // added by Michael 2021.05.19
        $this->data = $data;
        // end added by Michael 2021.05.19
    }

    // public function init(Box_Models_App_Session $ses) {
    // added by Michael 2021.05.19
    public function init(Box_Models_App_Session $ses, $data) {
    // end added by Michael 2021.05.19

        $pltDao = new Hrd_Models_Parameters_Losttime_Dao();

        // $allPlt = $pltDao->getAllB($ses->getProject()->getId(), $ses->getPt()->getId());

        // added by Michael 2021.05.19
        $allPlt = $pltDao->getAllB($data['project_id'], $data['pt_id']);
        // end added by Michael 2021.05.19

        $plts = Box_Tools::toObjects('parameterlosttime', $allPlt);
        $allLostAbsentTypeIds = array();
        
        if (!is_array($plts)) {
            $this->msg = "Parameter lost time tidak ada";
            return FALSE;
        }

        if (count($plts) == 0) {
            $this->msg = "Parameter lost time tidak ada";
            return FALSE;
        }

        foreach ($plts as $plt) {
            $allLostAbsentTypeIds[] = $plt->getAbsentType()->getId();
        }
        if (in_array(Box_Config::ABSENT_LOST_IN, $allLostAbsentTypeIds))
            $this->isTimein = TRUE;
        if (in_array(Box_Config::ABSENT_LOST_OUT, $allLostAbsentTypeIds))
            $this->isTimeOut = TRUE;
        $this->lostParams = $allLostAbsentTypeIds;
        return TRUE;
    }

    public function getAmount($timeIn, $timeOut, $shifTypes = array(), $shiftTypeId, $absentTypeId = 0, $onDutyId = 0) {
        $amount = '00:00:00';

        // cek jika tugas luar kantor
        if ($onDutyId > 0) {
            return $amount;
        }

        // cek absenttype termasuk dalam parameter lost time
        if ($absentTypeId > 0) {
            if (in_array($absentTypeId, $this->lostParams)) {
                return '08:00:00';
            }
        }

        /// jika durasi kerja kurang dari 4 jam makan lost time tidak dihitung
        if ($timeOut == '00:00:00' || Box_Tools::timeDatePart("hh", Box_Tools::timeDifference($timeIn, $timeOut)) < 4) {
            return $amount;
        }








        if (count($shifTypes) > 0) {
            foreach ($shifTypes as $st) {
                if ($st instanceof Hrd_Models_Master_ShiftType) {
                    if ($shiftTypeId == $st->getId()) {
                        if ($this->isTimein) { // jika telat masuk dihitung
                            if ($timeIn > $st->getInTime()) {
                                $amount = Box_Tools::timeDifference($st->getInTime(), $timeIn);
                            }
                        }

                        if ($this->isTimeOut) { // jika pulang cepat dihitung
                            if ($timeOut < $st->getOutTime()) {

                                $amount = Box_Tools::timeAdd($amount, Box_Tools::timeDifference($timeOut, $st->getOutTime()));
                            }
                        }
                    }
                }
            }
        }



        return $amount;
    }

    

    public static function getLosttimeIn($shifTypes,Hrd_Models_Master_General_Date $date) {
        $amount = FALSE;
        if (count($shifTypes) > 0) {
            foreach ($shifTypes as $st) {

                if ($date->getShiftType()->getId() == $st->getId()) {

                    if ($date->getTimeIn() > $st->getInTime()) {
                        $amount = Box_Tools::timeDifferenceB($st->getInTime(), $date->getTimeIn());
                    }
                }
            }
        }
        return $amount;
    }

   

    public static function getLosttimeOut($shifTypes,Hrd_Models_Master_General_Date $date) {
        $amount = FALSE;
        if (count($shifTypes) > 0) {
            foreach ($shifTypes as $st) {

                if ($date->getShiftType()->getId() == $st->getId()) {

                    if ($date->getTimeOut() < $st->getOutTime()) {

                        $amount = Box_Tools::timeDifferenceB($date->getTimeOut(), $st->getOutTime());
                        
                    }
                }
            }
        }
        return $amount;
    }

    public function getLostParams() {
        return $this->lostParams;
    }

    public function getMsg() {
        return $this->msg;
    }

}

?>
