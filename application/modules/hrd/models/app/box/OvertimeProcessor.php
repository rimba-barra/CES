<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LeaveProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_OvertimeProcessor extends Hrd_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "calculate":
                return $this->daoResult($dao, $object);
                break;
            case "mainalt":
                return $this->mainalt($dao, $object);
                break;
        }
    }

    public function daoSave($dao, $object) {
        $this->setTotalHour($object);
        return parent::daoSave($dao, $object);
    }

    public function daoUpdate($dao, $object) {
        $this->setTotalHour($object);
        return parent::daoUpdate($dao, $object);
    }

    private function setTotalHour(Hrd_Models_Overtime_Overtime $overtime) {
        
      
        
        if ($overtime->getStatus() == Box_Config::OVERTIME_STATUS_AFTEROUT || $overtime->getStatus() == Box_Config::OVERTIME_STATUS_HOLIDAY ||
                $overtime->getStatus() == Box_Config::OVERTIME_STATUS_SHORT_HOLIDAY || $overtime->getStatus() == Box_Config::OVERTIME_STATUS_SHORT_HOLIDAY_NASIONAL) {
         //   $overtime->setTotalHour($overtime->getAfterDurationText());
            $overtime->setTotalHour(Box_Tools::timeAdd($overtime->getAfterDurationText(),$overtime->getBeforeDurationText()));
        } else {
            //$overtime->setTotalHour($overtime->getBeforeDurationText());
            $overtime->setTotalHour(Box_Tools::timeAdd($overtime->getAfterDurationText(),$overtime->getBeforeDurationText()));
        }
    }

    /*

      private function mainalt($dao, $object) {
      if (is_array($object->getOvertimes())) {
      $count = 0;
      $calculator = new Hrd_Models_Overtime_Calculator($this->getSession());
      $value = 0;
      $hours = 0;
      $minutes = 0;
      foreach ($object->getOvertimes() as $overtime) {
      if ($overtime instanceof Hrd_Models_Overtime_Overtime) {
      $overtime->setDayType(Box_Config::OVERTIME_DAYTYPE_GENERAL);
      $calculator->run($overtime);

      $value += (double) $overtime->getTotalFactorResult();
      $hours += (double) $overtime->getDuration()->getHour();
      $minutes += (double) $overtime->getDuration()->getMinute();
      }
      $count++;
      }

      if($minutes >= 60){
      $minutes = $minutes - 60;
      $hours = $hours+1;
      }



      $object->setWorkHour($hours.":".$minutes);
      $object->setValue($value);

      // enhance overtime field with delimiter
      $de = new Box_Delien_DelimiterEnhancer();
      $de->setDelimiterCandidate($object);
      $de->generate();
      }

      if($object->getId()==0){
      return $dao->save($object);
      }else{
      return $dao->update($object);
      }

      }

      private function daoResult($dao, $object) {
      if ($object instanceof Hrd_Models_Overtime_Overtime) {
      $date = new Hrd_Models_App_Date($object->getStartTime());
      $endDate = new Hrd_Models_App_Date($object->getEndTime());
      $duration = $endDate->getTime() - $date->getTime();
      $amount = Hrd_Models_App_Date::amountDate($duration);
      /// set total hours
      $object->setTakenTime($amount->getHour());
      $overtime = new Hrd_Models_Overtime_Overtime();
      $sess = $this->getSession();
      $variable = new Hrd_Models_Parameters_Overtimevariable();
      $variable->setProject($sess->getProject());
      $variable->setPt($sess->getPt());
      $dao = new Hrd_Models_Master_GeneralParameterDao();
      $hasil = $dao->getValues($variable);


      $variable->setArrayTable($hasil[1][0]);

      $variable->extraSetArrayTable(array());
      $this->processTotalHours($object, $variable);
      }
      }

      private function processTotalHours(Hrd_Models_Overtime_Overtime $overtime, Hrd_Models_Parameters_Overtimevariable $variable) {
      $breakTime = 0;
      $breakTime = (int) $variable->getBreaktimeDuration();
      $after = (int) $variable->getBreaktimeCutAfter();
      $workTime = 0;
      $breakDuration = (double) $variable->getBreaktimeDuration();
      $after = (double) $variable->getBreaktimeCutAfter();
      $totalHour = (double) $overtime->getTakenTime();

      $workBreakAmount = $breakDuration + $after;
      $totalBreakTime = floor($totalHour / $workBreakAmount) * $breakDuration;
      $netWorkTime = $totalHour - $totalBreakTime;
      $overtime->setBreakDuration($totalBreakTime);
      $overtime->setTotalHours($netWorkTime);
      }
     * 
     */
}

?>
