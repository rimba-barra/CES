<?php

/**
 * Description of Date
 *
 * @author MIS
 */
class Hrd_Models_Master_General_Date extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_App_InterInsertable,  Box_Arried{
    private $number;
    private $dayText;
    private $shiftType;
    private $timeA; /* 07 -14*/
    private $timeB; /* 15 - 21*/
    private $timeC; /* 22 - 06 */
    private $late;
    private $spl;
    private $overtime;
    private $totalAttendance;
    private $dayName;
    private $absentType;
    private $onDutyProjectId;
    private $parameterTlk;
    private $note;
    private $totalHours;
    private $timeIn;
    private $timeOut;
    private $timeLost;
    private $date;
    private $absent;
    private $tlkOther;
    private $tlkProjectType;
    private $leave;    
    
    // edited by wulan sari 20181209
    private $exec_time_in_start;
    private $exec_time_in_end;
    private $exec_time_out_start;
    private $exec_time_out_end;
    
    // added by wulan sari 20200622
    private $totalTransport;

    // added by michael 20220705
    private $pulang_cepat;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "absentdetail_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['absentdetail_id'])){
           $this->setId($x['absentdetail_id']); 
        }
        if(isset ($x['tanggal'])){
           $this->setNumber($x['tanggal']); 
        }
        if(isset ($x['day'])){
           $this->setDayText($x['day']); 
        }
        if(isset ($x['in_7_14'])){
           $this->getTimeA()->setIn($x['in_7_14']); 
        }
        if(isset ($x['out_7_14'])){
           $this->getTimeA()->setOut($x['out_7_14']); 
        }
        if(isset ($x['in_15_21'])){
           $this->getTimeB()->setIn($x['in_15_21']); 
        }
        if(isset ($x['out_15_21'])){
           $this->getTimeB()->setOut($x['out_15_21']); 
        }
        if(isset ($x['in_22_6'])){
           $this->getTimeC()->setIn($x['in_22_6']); 
        }
        if(isset ($x['out_22_6'])){
           $this->getTimeC()->setOut($x['out_22_6']); 
        }
        if(isset ($x['late'])){
           $this->setLate($x['late']); 
        }
        if(isset ($x['overtime'])){
           $this->setOvertime($x['overtime']); 
        }
        if(isset ($x['attendance_total'])){
           $this->setTotalAttendance($x['attendance_total']); 
        }        
        if(isset ($x['day_name'])){
           $this->setDayName($x['day_name']); 
        }
        
        if(isset ($x['total_hours'])){
           $this->setTotalHours($x['total_hours']); 
        }
        
        if(isset ($x['shifttype_shifttype_id'])){
           $this->getShiftType()->setId($x['shifttype_shifttype_id']); 
        }
        if(isset ($x['description'])){
           $this->setNote($x['description']); 
        }
        if(isset ($x['absenttype_absenttype_id'])){
           $this->getAbsentType()->setId($x['absenttype_absenttype_id']); 
        }
        if(isset ($x['parametertlk_parametertlk_id'])){
           $this->getParameterTlk()->setId($x['parametertlk_parametertlk_id']); 
        }
        if(isset ($x['time_in'])){
           $this->setTimeIn($x['time_in']); 
        }
        if(isset ($x['time_out'])){
           $this->setTimeOut($x['time_out']); 
        }
        if(isset ($x['time_lost'])){
           $this->setTimeLost($x['time_lost']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['absent_employee_id'])){
           $this->getAbsent()->getEmployee()->setId($x['absent_employee_id']); 
        }
        if(isset ($x['tlk_other'])){
           $this->setTlkOther($x['tlk_other']); 
        }
        if(isset ($x['tlk_project_type'])){
           $this->setTlkProjectType($x['tlk_project_type']); 
        }
        if(isset ($x['leave_leave_id'])){
           $this->getLeave()->setId($x['leave_leave_id']); 
        }
        
        // added by wulan sari 20181121
        if(isset ($x['spl'])){
           $this->setSpl($x['spl']); 
        }        
    
        // added by wulan sari 20181209
        if(isset ($x['exec_time_in_start'])){
           $this->setExec_time_in_start($x['exec_time_in_start']); 
        }
        if(isset ($x['exec_time_in_end'])){
           $this->setExec_time_in_end($x['exec_time_in_end']); 
        }
        if(isset ($x['exec_time_out_start'])){
           $this->setExec_time_out_start($x['exec_time_out_start']); 
        }
        if(isset ($x['exec_time_out_end'])){
           $this->setExec_time_out_end($x['exec_time_out_end']); 
        }
                
        // added by wulan sari 20200622
        if(isset ($x['transport_total'])){
           $this->setTotalTransport($x['transport_total']); 
        }

        // added by michael 20220705
        if(isset ($x['pulang_cepat'])){
           $this->setPulangCepat($x['pulang_cepat']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'absentdetail_id'=>$this->getId(),
            'tanggal'=>$this->getNumber(),
            'day'=>$this->getDayText(),
            'in_7_14'=>$this->getTimeA()->getIn(),
            'out_7_14'=>$this->getTimeA()->getOut(),
            'in_15_21'=>$this->getTimeB()->getIn(),
            'out_15_21'=>$this->getTimeB()->getOut(),
            'in_22_6'=>$this->getTimeC()->getIn(),
            'out_22_6'=>$this->getTimeC()->getOut(),
            'late'=>$this->getLate(),
            'overtime'=>$this->getOvertime(),
            'attendance_total'=>$this->getTotalAttendance(),
            'transport_total'=>$this->getTotalTransport(), // added by wulan sari 20200622
            'day_name'=>$this->getDayName(),
            'shifttype_shifttype_id'=>$this->getShiftType()->getId(),
            'absenttype_absenttype_id'=>$this->getAbsentType()->getId(),
            'parametertlk_parametertlk_id'=>$this->getParameterTlk()->getId(),
            'description'=>$this->getNote(),
            'total_hours'=>$this->getTotalHours(),
            'time_in'=>$this->getTimeIn(),
            'time_out'=>$this->getTimeOut(),
            'time_lost'=>$this->getTimeLost(),
            'date'=>$this->getDate(),
            'absent_employee_id'=>$this->getAbsent()->getEmployee()->getId(),
            'tlk_other'=>$this->getTlkOther(),
            'tlk_project_type'=>$this->getTlkProjectType(),
            'leave_leave_id'=>$this->getLeave()->getId(),
            'spl'=>$this->getSpl(), // edited by wulan sari 20181121            
            // edited by wulan sari 20181209
            'exec_time_in_start'=>$this->getExec_time_in_start(), 
            'exec_time_in_end'=>$this->getExec_time_in_end(),
            'exec_time_out_start'=>$this->getExec_time_out_start(),
            'exec_time_out_end'=>$this->getExec_time_out_end(),
            //added by michael 20220705
            'pulang_cepat'=>$this->getPulangCepat(),
        );
      
        return $x;
    }
    
    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function getDayText() {
        return $this->dayText;
    }

    public function setDayText($dayText) {
        $this->dayText = $dayText;
    }
    
    public function getShiftType() {
        if(!$this->shiftType){
            $this->shiftType = new Hrd_Models_Master_ShiftType();
        }
        return $this->shiftType;
    }

    public function setShiftType(Hrd_Models_Master_ShiftType $shiftType) {
        $this->shiftType = $shiftType;
    }
    
    public function getTimeA() {
        if(!$this->timeA){
            $this->timeA = new Hrd_Models_Master_General_ShiftTime();
        }
        return $this->timeA;
    }

    public function setTimeA($timeA) {
        $this->timeA = $timeA;
    }

    public function getTimeB() {
        if(!$this->timeB){
            $this->timeB = new Hrd_Models_Master_General_ShiftTime();
        }
        return $this->timeB;
    }

    public function setTimeB($timeB) {
        $this->timeB = $timeB;
    }

    public function getTimeC() {
        if(!$this->timeC){
            $this->timeC = new Hrd_Models_Master_General_ShiftTime();
        }
        return $this->timeC;
    }

    public function setTimeC($timeC) {
        $this->timeC = $timeC;
    }
    
    public function getLate() {
        return $this->late;
    }

    public function setLate($late) {
        $this->late = $late;
    }

    public function getSpl() {
        return $this->spl;
    }

    public function setSpl($spl) {
        $this->spl = $spl;
    }

    public function getOvertime() {
        return (float)$this->overtime;
    }

    public function setOvertime($overtime) {
        $this->overtime = (float)$overtime;
    }

    public function getTotalAttendance() {
        return $this->totalAttendance;
    }

    public function setTotalAttendance($totalAttendance) {
        $this->totalAttendance = $totalAttendance;
    }

    // added by wulan sari 20200622
    public function getTotalTransport() {
        return $this->totalTransport;
    }

    public function setTotalTransport($totalTransport) {
        $this->totalTransport = $totalTransport;
    }
    // end added by wulan sari 20200622
    
    public function getDayName() {
        return $this->dayName;
    }

    public function setDayName($dayName) {
        $this->dayName = $dayName;
    }
    
    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }
    
    public function getTotalHours() {
        return $this->totalHours;
    }

    public function setTotalHours($totalHours) {
        $this->totalHours = $totalHours;
    }
    
    public function getTimeLost() {
        return $this->timeLost;
    }

    public function setTimeLost($timeLost) {
        $this->timeLost = $timeLost;
    }

    
    
        
    public function getAbsentType() {
        if(!$this->absentType){
            $this->absentType = new Hrd_Models_Master_AbsentType();
        }
        return $this->absentType;
    }

    public function setAbsentType(Hrd_Models_Master_AbsentType $absentType) {
        $this->absentType = $absentType;
    }

    public function getOnDutyProjectId() {
        if(!$this->onDutyProjectId){
            $this->onDutyProjectId = new Box_Models_Master_Project();
        }
        return $this->onDutyProjectId;
    }

    public function setOnDutyProjectId(Box_Models_Master_Project $onDutyProjectId) {
        $this->onDutyProjectId = $onDutyProjectId;
    }
    
    public function getParameterTlk() {
        if(!$this->parameterTlk){
            $this->parameterTlk = new Hrd_Models_Parameters_Tlk_Tlk();
        }
        return $this->parameterTlk;
    }

    public function setParameterTlk(Hrd_Models_Parameters_Tlk_Tlk $parameterTlk) {
        $this->parameterTlk = $parameterTlk;
    }

    public function getTimeIn() {
        return $this->timeIn;
    }

    public function setTimeIn($timeIn) {
        $this->timeIn = $timeIn;
    }

    public function getTimeOut() {
        return $this->timeOut;
    }

    public function setTimeOut($timeOut) {
        $this->timeOut = $timeOut;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }
    
    public function getAbsent() {
        if(!$this->absent){
            $this->absent = new Hrd_Models_Absent();
        }
        return $this->absent;
    }

    public function setAbsent(Hrd_Models_Absent $absent) {
        $this->absent = $absent;
    }

    
    public function getTlkOther() {
        return $this->tlkOther;
    }

    public function setTlkOther($tlkOther) {
        $this->tlkOther = $tlkOther;
    }
    
    public function getTlkProjectType() {
        return $this->tlkProjectType;
    }

    public function setTlkProjectType($tlkProjectType) {
        $this->tlkProjectType = $tlkProjectType;
    }
    
    public function getLeave() {
        if(!$this->leave){
            $this->leave = new Hrd_Models_Leave_Leave();
        }
        return $this->leave;
    }

    public function setLeave(Hrd_Models_Leave_Leave $leave) {
        $this->leave = $leave;
    }
    
    function getExec_time_in_start() {
        return $this->exec_time_in_start;
    }

    function getExec_time_in_end() {
        return $this->exec_time_in_end;
    }

    function getExec_time_out_start() {
        return $this->exec_time_out_start;
    }

    function getExec_time_out_end() {
        return $this->exec_time_out_end;
    }

    function setExec_time_in_start($exec_time_in_start) {
        $this->exec_time_in_start = $exec_time_in_start;
    }

    function setExec_time_in_end($exec_time_in_end) {
        $this->exec_time_in_end = $exec_time_in_end;
    }

    function setExec_time_out_start($exec_time_out_start) {
        $this->exec_time_out_start = $exec_time_out_start;
    }

    function setExec_time_out_end($exec_time_out_end) {
        $this->exec_time_out_end = $exec_time_out_end;
    }
    
    // added by michael 20220705
    public function getPulangCepat() {
        return $this->pulang_cepat;
    }

    public function setPulangCepat($pulang_cepat) {
        $this->pulang_cepat = $pulang_cepat;
    }
        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getShiftType(),$this->getAbsentType(),$this->getParameterTlk());
      
    }

    public function insert($storedObject) {
        $this->setDayName($storedObject["dayGenerator"]->getDayText($this->getDayText()));
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    



    
    
    




}

?>
