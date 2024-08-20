<?php

/**
 * Description of Date
 *
 * @author MIS
 */
class Gl_Models_App_Date {

    private $time;
    private $hour;
    private $minute;
    private $second;

    public function __construct($strDate = NULL) {
        if ($strDate) {
            $this->time = strtotime($strDate);
            $this->refreshProperty();
        }
    }

    public function addSeconds($seconds) {
        //  $nextWeek = time() + (7 * 24 * 60 * 60);
        $this->time = $this->time + (int) $seconds;
        $this->refreshProperty();
    }

    private function refreshProperty() {
        $this->hour = (int) date('H', $this->time);
        $this->minute = (int) date('m', $this->time);
        $this->second = (int) date('s', $this->time);
      
    }

    public function getTime() {
        return $this->time;
    }

    public function setTime($time) {
        $this->time = $time;
    }

    public function getHour() {
        return $this->hour;
    }

    public function setHour($hour) {
        $this->hour = $hour;
    }

    public function getMinute() {
        return $this->minute;
    }

    public function setMinute($minute) {
        $this->minute = $minute;
    }

    public function getSecond() {
        return $this->second;
    }

    public function setSecond($second) {
        $this->second = $second;
    }

    /* return Gl_models_app_date */

    public static function amountDate($time) {
        $rawHour = $time / (60 * 60);
        $hour = floor($rawHour);
        $rawMinute = ($rawHour - $hour) * 60;
        $minute = floor($rawMinute);
        $second = ($rawMinute - $minute) * 60;
        $date = new Gl_Models_App_Date();
        $date->setHour($hour);
        $date->setMinute($minute);
        return $date;
    }

}

?>
