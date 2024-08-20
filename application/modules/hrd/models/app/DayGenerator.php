<?php

/**
 * Description of DayGenerator
 *
 * @author MIS
 */
class Hrd_Models_App_DayGenerator {

    private $days;
    private $maxDay;
    private $month;
    private $year;
    private $firstDay;
    private $keyDay;

    public function __construct($month = 1, $year = 2014) {
        $this->month = (int) $month;
        $this->year = (int) $year;
        $this->days = array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
        if ($month > 0 && $year > 1000) {
            $this->maxDay = cal_days_in_month(CAL_GREGORIAN, $month, $year);
            $this->prosesFirstDay();
        }
    }
    
    public function getMaxDay(){
        return cal_days_in_month(CAL_GREGORIAN, $this->month,$this->year);
    }

    public function prosesFirstDay() {
        $firstDay = unixtojd(mktime(0, 0, 0, $this->month, 1, $this->year));
        $firstDay = cal_from_jd($firstDay, CAL_GREGORIAN);
        $firstDay = strtolower($firstDay["dayname"]);
        $this->keyDay = array_search($firstDay, $this->days);
        $this->firstDay = $firstDay;
    }

    public function getDayText($date) {
        $temp = 0;
        $date = (int) $date;
        $data = $date < 1 ? 1 : $date;
        $temp = ($date % 7) - 1;
        $temp = $temp == -1 ? 6 : $temp;
        $temp = $temp + ($this->keyDay);
        $temp = $temp > 6 ? $temp - 7 : $temp;
        return $this->days[$temp];
    }

    public function getMonth() {
        return $this->month;
    }

    public function setMonth($month) {
        $this->month = $month;
    }

    public function getYear() {
        return $this->year;
    }

    public function setYear($year) {
        $this->year = $year;
    }

    public function getFirstDay() {
        return $this->firstDay;
    }

}

?>
