<?php


/**
 * Description of Overtimevariable
 *
 * @author MIS
 */
class Hrd_Models_Parameters_Overtimevariable extends Hrd_Models_App_Parameter implements Box_Kouti_Remora  {
    
    private $minutesLimitMaximum;
    private $minutesLimitMinimum;
    private $overtimeMealAfter;
    private $overtimeCut;
    private $breaktimeDuration;
    private $breaktimeCutAfter;
    private $cutBasedMultiply;
    private $breaktimeCut;
    private $lateCategory3;
    private $lateCategory2End;
    private $lateCategory2Start;
    private $lateCategory1End;
    private $lateCategory1Start;
    private $holidayFactor3;
    private $holidayFactor2;
    private $holidayFactor1;
    private $shortHolidayAfter;
    private $normalHolidayAfter;
    private $generalDayFactor2;
    private $generalDayFactor1;
    private $generalDayFactorMorning;
    private $generalDayAfter;
    private $generalDayEnhancer;

    private $shortHolidayNasionalAfter;
    
    
    public function getModuleName() {
        return Box_Config::PARAM_OVERTIMEVARIABLE;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function extraGetArrayTable() {
        
    }

    
    
    public function getMinutesLimitMaximum() {
        return $this->minutesLimitMaximum;
    }

    public function setMinutesLimitMaximum($minutesLimitMaximum) {
        $this->minutesLimitMaximum = $minutesLimitMaximum;
    }

    public function getMinutesLimitMinimum() {
        return $this->minutesLimitMinimum;
    }

    public function setMinutesLimitMinimum($minutesLimitMinimum) {
        $this->minutesLimitMinimum = $minutesLimitMinimum;
    }

    public function getOvertimeMealAfter() {
        return $this->overtimeMealAfter;
    }

    public function setOvertimeMealAfter($overtimeMealAfter) {
        $this->overtimeMealAfter = $overtimeMealAfter;
    }

    public function getOvertimeCut() {
        return $this->overtimeCut;
    }

    public function setOvertimeCut($overtimeCut) {
        $this->overtimeCut = $overtimeCut;
    }

    public function getBreaktimeDuration() {
        return $this->breaktimeDuration;
    }

    public function setBreaktimeDuration($breaktimeDuration) {
        $this->breaktimeDuration = $breaktimeDuration;
    }

    public function getBreaktimeCutAfter() {
        return $this->breaktimeCutAfter;
    }

    public function setBreaktimeCutAfter($breaktimeCutAfter) {
        $this->breaktimeCutAfter = $breaktimeCutAfter;
    }

    public function getCutBasedMultiply() {
        return $this->cutBasedMultiply;
    }

    public function setCutBasedMultiply($cutBasedMultiply) {
        $this->cutBasedMultiply = $cutBasedMultiply;
    }

    public function getBreaktimeCut() {
        return $this->breaktimeCut;
    }

    public function setBreaktimeCut($breaktimeCut) {
        $this->breaktimeCut = $breaktimeCut;
    }

    public function getLateCategory3() {
        return $this->lateCategory3;
    }

    public function setLateCategory3($lateCategory3) {
        $this->lateCategory3 = $lateCategory3;
    }

    public function getLateCategory2End() {
        return $this->lateCategory2End;
    }

    public function setLateCategory2End($lateCategory2End) {
        $this->lateCategory2End = $lateCategory2End;
    }

    public function getLateCategory2Start() {
        return $this->lateCategory2Start;
    }

    public function setLateCategory2Start($lateCategory2Start) {
        $this->lateCategory2Start = $lateCategory2Start;
    }

    public function getLateCategory1End() {
        return $this->lateCategory1End;
    }

    public function setLateCategory1End($lateCategory1End) {
        $this->lateCategory1End = $lateCategory1End;
    }

    public function getLateCategory1Start() {
        return $this->lateCategory1Start;
    }

    public function setLateCategory1Start($lateCategory1Start) {
        $this->lateCategory1Start = $lateCategory1Start;
    }

    public function getHolidayFactor3() {
        return $this->holidayFactor3;
    }

    public function setHolidayFactor3($holidayFactor3) {
        $this->holidayFactor3 = $holidayFactor3;
    }

    public function getHolidayFactor2() {
        return $this->holidayFactor2;
    }

    public function setHolidayFactor2($holidayFactor2) {
        $this->holidayFactor2 = $holidayFactor2;
    }

    public function getHolidayFactor1() {
        return $this->holidayFactor1;
    }

    public function setHolidayFactor1($holidayFactor1) {
        $this->holidayFactor1 = $holidayFactor1;
    }

    public function getShortHolidayAfter() {
        return $this->shortHolidayAfter;
    }

    public function setShortHolidayAfter($shortHolidayAfter) {
        $this->shortHolidayAfter = $shortHolidayAfter;
    }

    public function getNormalHolidayAfter() {
        return $this->normalHolidayAfter;
    }

    public function setNormalHolidayAfter($normalHolidayAfter) {
        $this->normalHolidayAfter = $normalHolidayAfter;
    }

    public function getGeneralDayFactor2() {
        return $this->generalDayFactor2;
    }

    public function setGeneralDayFactor2($generalDayFactor2) {
        $this->generalDayFactor2 = $generalDayFactor2;
    }

    public function getGeneralDayFactor1() {
        return $this->generalDayFactor1;
    }

    public function setGeneralDayFactor1($generalDayFactor1) {
        $this->generalDayFactor1 = $generalDayFactor1;
    }

    public function getGeneralDayFactorMorning() {
        return $this->generalDayFactorMorning;
    }

    public function setGeneralDayFactorMorning($generalDayFactorMorning) {
        $this->generalDayFactorMorning = $generalDayFactorMorning;
    }

    public function getGeneralDayAfter() {
        return $this->generalDayAfter;
    }

    public function setGeneralDayAfter($generalDayAfter) {
        $this->generalDayAfter = $generalDayAfter;
    }

    public function getGeneralDayEnhancer() {
        return $this->generalDayEnhancer;
    }

    public function setGeneralDayEnhancer($generalDayEnhancer) {
        $this->generalDayEnhancer = $generalDayEnhancer;
    }

    public function getShortHolidayNasionalAfter() {
        return $this->shortHolidayNasionalAfter;
    }

    public function setShortHolidayNasionalAfter($shortHolidayNasionalAfter) {
        $this->shortHolidayNasionalAfter = $shortHolidayNasionalAfter;
    }

  

      
}

?>
