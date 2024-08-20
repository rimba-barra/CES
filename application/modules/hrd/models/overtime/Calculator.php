<?php

/**
 * Description of Calculator
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Calculator {

    private $startTime;
    private $endTime;
    private $overtime;
    private $session;
    private $totalValue;
    private $takenTime;

    public function __construct(Box_Models_App_Session $session) {

        $this->session = $session;
        $this->totalValue = 0;
    }

    public function run(Hrd_Models_Overtime_Overtime $overtime = NULL) {
        if (!$overtime) {
            $overtime = new Hrd_Models_Overtime_Overtime();
        }
        $this->startTime = $overtime->getStartTime();
        $this->endTime = $overtime->getEndTime();
        $parameter = new Hrd_Models_Parameters_Overtimevariable();
        $paramDao = new Hrd_Models_Master_GeneralParameterDao();

        $overtime->setStartTime($this->startTime);
        $overtime->setEndTime($this->endTime);

        $date = new Hrd_Models_App_Date($overtime->getStartTime());
        $endDate = new Hrd_Models_App_Date($overtime->getEndTime());
    
        
        if($endDate->getTime() < $date->getTime()){
            $endDate->addSeconds(24*60*60); // add 1 day
        }
        $duration = $endDate->getTime() - $date->getTime();
        
        $amount = Hrd_Models_App_Date::amountDate($duration);
        $overtime->setDuration($amount);
        /// set total hours


        $parameter->setProject($this->session->getProject());
        $parameter->setPt($this->session->getPt());
        $arData = $paramDao->getValues($parameter);

        $parameter->setArrayTable($arData[1][0]);

        $breakTime = 0;
        $breakTime = (int) $parameter->getBreaktimeDuration();
        $after = (int) $parameter->getBreaktimeCutAfter();
        $workTime = 0;
        $breakDuration = (double) $parameter->getBreaktimeDuration();
        $after = (double) $parameter->getBreaktimeCutAfter();
        $totalHour = (double) $overtime->getNetHours();

        $workBreakAmount = $breakDuration + $after;
        $totalBreakTime = floor($totalHour / $workBreakAmount) * $breakDuration;
        $netWorkTime = $totalHour - $totalBreakTime;
        $overtime->setBreakDuration($totalBreakTime);
        $overtime->setTotalHours($netWorkTime);
        
        $totalHours = $overtime->getTotalHours();
      
        if($totalHours > 0){
            $this->generateFactor($totalHours,$overtime, $parameter);
        }
        
      

        $overtime->setValue($this->totalValue);
        $this->overtime = $overtime;
    }


    /*@return void */
    private function generateFactor($totalHours,Hrd_Models_Overtime_Overtime $overtime, Hrd_Models_Parameters_Overtimevariable $params) {
        /* jumlah factor */
        $factorCount = $overtime->getTakenTime()==Box_Config::OVERTIME_TAKENTIME_AFTEROUT?3:2;
        $i = 1;
       
        $totalResult = 0;
        while ($i <= $factorCount) {

           
            $arValue = $this->getFactorValue($i,$totalHours,$params, $overtime); 
            
            $factor = $arValue["value"];
            $valuePerFactor = $arValue["perfactorvalue"];


            $totalHours = $totalHours - $valuePerFactor;

            $total = $valuePerFactor * $factor;

            $totalResult += (double)$total;

            $factorObj = new Hrd_Models_Overtime_Factor();
            $factorObj->setFactor($factor);
            $factorObj->setValue($valuePerFactor);
            $factorObj->setResult($total);

            $overtime->setFactorDisplay($i - 1, $factorObj);
            $overtime->setTotalFactorResult($totalResult);
            $this->totalValue += (double) $total;
            $i++;
        }
    }
    
    private function getFactorValue($increment,$totalHours,Hrd_Models_Parameters_Overtimevariable $params, Hrd_Models_Overtime_Overtime $overtime){
        $value = 0;
        $perFactorValue = 0;
        $arResult = array("value"=>0,"perfactorvalue"=>0);
       
        if($overtime->getDayType()==Box_Config::OVERTIME_DAYTYPE_GENERAL){
            if($increment==1){
                $value = $params->getGeneralDayFactor1();
                $perFactorValue = 1;
            }else if($increment==2){
                $value = $params->getGeneralDayFactor2();
                $perFactorValue = $totalHours-3;
            }else if($increment==3){
                $value = $params->getGeneralDayFactorMorning();
                $perFactorValue = $totalHours;
            }
        }else if($overtime->getDayType()==Box_Config::OVERTIME_DAYTYPE_HOLIDAY){
            if($increment==1){
                $value = $params->getHolidayFactor1();
                $perFactorValue = 1;
            }else if($increment==2){
                $value = $params->getHolidayFactor2();
                 $perFactorValue = $totalHours-3;
            }else if($increment==3){
                $value = $params->getHolidayFactor3();
                 $perFactorValue = $totalHours;
            }
        }
        return array("value"=>$value,"perfactorvalue"=>$perFactorValue);
    }

    public function getOvertime() {
        return $this->overtime;
    }

}

?>
