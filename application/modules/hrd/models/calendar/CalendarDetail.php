<?php
/**
 * Description of CalendarDetail
 *
 * @author MIS
 */
class Hrd_Models_Calendar_CalendarDetail  extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Arried {
    private $calendar;
    private $day;
    private $month;
    private $isHoliday;
    private $shiftType;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "calendardetail_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['calendardetail_id'])){
           $this->setId($x['calendardetail_id']); 
        }
        if(isset ($x['day'])){
           $this->setDay($x['day']); 
        }
        if(isset ($x['month'])){
           $this->setMonth($x['month']); 
        }
        if(isset ($x['is_holiday'])){
           $this->setIsHoliday($x['is_holiday']); 
        }
        if(isset ($x['shifttype_id'])){
           $this->getShiftType()->setId($x['shifttype_id']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'calendardetail_id'=>$this->getId(),
            'day'=>$this->getDay(),
            'month'=>$this->getMonth(),
            'is_holiday'=>$this->getIsHoliday(),
            'shifttype_id'=>$this->getShiftType()->getId()
        );
      
        return $x;
    }
    
    
    
    public function getCalendar() {
        if(!$this->calendar){
            $this->calendar = new Hrd_Models_Calendar_Calendar();
        }
        return $this->calendar;
    }

    public function setCalendar($calendar) {
        $this->calendar = $calendar;
    }

    public function getDay() {
        return $this->day;
    }

    public function setDay($day) {
        $this->day = $day;
    }

    public function getMonth() {
        return $this->month;
    }

    public function setMonth($month) {
        $this->month = (int)$month;
    }

    public function getIsHoliday() {
        return (boolean)$this->isHoliday;
    }

    public function setIsHoliday($isHoliday) {
        $this->isHoliday = (boolean)$isHoliday;
    }

    public function getShiftType() {
        if(!$this->shiftType){
            $this->shiftType = new Hrd_Models_Master_ShiftType();
        }
        return $this->shiftType;
    }

    public function setShiftType($shiftType) {
        $this->shiftType = $shiftType;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getShiftType(),$this->getCalendar());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>
