<?php

/**
 * Description of ProcessHal
 *
 * @author MIS
 */
class Hrd_Models_Absent_ProcessHal extends Hrd_Models_Absent_OptionSelectorProcess {
    private $lostTime;
    private $shifTypes;

    private $data;
    // public function __construct(Box_Models_App_Session $ses,$shiftTypes) {
    // added by Michael 2021.05.19
    public function __construct(Box_Models_App_Session $ses,$shiftTypes, $data) {
    // end added by Michael 2021.05.19
        $this->lostTime =  new Hrd_Models_Absent_LostTime($ses, $data);
        $this->shifTypes = $shiftTypes;
        
        $this->data = $data;
    }
    

    public function getDaoSuccesMsg() {
        return "Success process hour and lost time";
    }

    public function getDaoUpdateMethod(\Hrd_Models_AbsentDao $absentDao, \Hrd_Models_Absent $absent, \Box_Models_App_Session $ses) {
 
        return $absentDao->updateHal($absent, $ses);
    }

    public function isDebugging() {
        return FALSE;
    }

    public function attachProcess(\Hrd_Models_Master_General_Date $absentDetail, \Hrd_Models_Master_ShiftType $st) {
        $timeRange = Hrd_Models_Absent_Tools::getTimeRange($absentDetail, $st);
        $in = new DateTime();
        $out = new DateTime();
        
        if($timeRange["out"] > $timeRange["in"]){
            $in->setTimestamp(strtotime('2019-01-01 ' . $timeRange["in"]));
            $out->setTimestamp(strtotime('2019-01-01 ' . $timeRange["out"]));
            $jumlahJam = date_diff($in, $out);
        } else {
            // kalau different day maka pulang di esok hari
            $in->setTimestamp(strtotime('2019-01-01 ' . $timeRange["in"]));
            $out->setTimestamp(strtotime('2019-01-02 ' . $timeRange["out"]));
            $jumlahJam = date_diff($in, $out);            
        }
        $jumlahJam = $jumlahJam->h.":".$jumlahJam->i.":".$jumlahJam->s;
        $absentDetail->setTotalHours($jumlahJam);
        
        
      
        
        //var_dump($absentTtypeId->get);
       $lostTimeValue = $this->lostTime->getAmount($in->format('H:i:s'),$out->format('H:i:s'),$this->shifTypes,$absentDetail->getShiftType()->getId(),$absentDetail->getAbsentType()->getId(),intval($absentDetail->getParameterTlk()->getId()));
        $absentDetail->setTimeLost($lostTimeValue);
        
       
     
      //  var_dump($absentDetail->getTimeLost());
        
    }

}

?>
