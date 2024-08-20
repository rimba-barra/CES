<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Overtime
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Overtime extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Arried,  Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $date;
    private $employee;
    private $shiftType;
    private $status;
    private $reason;
    private $planBeforeStart;
    private $planBeforeEnd;
    private $planAfterStart;
    private $planAfterEnd;
    private $execTimeInStart;
    private $execTimeInEnd;
    private $beforeDurationText;
    private $beforeNetHours;
    private $beforeBreakDuration;
    private $beforeTotalHours;
    private $execTimeOutStart;
    private $execTimeOutEnd;
    private $afterDurationText;
    private $afterNetHours;
    private $afterBreakDuration;
    private $afterTotalHours;
    private $beforeFactorFactor1;
    private $beforeFactorValue1;
    private $beforeFactorResult1;
    private $beforeFactorFactor2;
    private $beforeFactorValue2;
    private $beforeFactorResult2;
    private $afterFactorFactor1;
    private $afterFactorValue1;
    private $afterFactorResult1;
    private $afterFactorFactor2;
    private $afterFactorValue2;
    private $afterFactorResult2;
    private $afterFactorFactor3;
    private $afterFactorValue3;
    private $afterFactorResult3;
    private $dasarLembur;
    private $jamKerja;
    private $nilaiLembur;
    private $makanExtra;
    private $totalHour;
    private $intranet_reportto_id;
    private $intranet_hrd_comment;
    private $intranet_hrd_comment_jam;
    private $calculate_from_intranet;
    
    private $lembur_id;
    private $basedata;
    private $transaction;
    private $configintranet;
    private $confirm_alert_time;
    private $ref_basedata;
    private $ref_lembur_id;
    private $jam_lembur_approve;
    
    public function __construct($takenTime = NULL) {
        parent::__construct();
        $this->embedPrefix = "overtime_";
        
    }
    function getConfigintranet() {
        return $this->configintranet;
    }

    function setConfigintranet($configintranet) {
        $this->configintranet = $configintranet;
    }

    function getConfirm_alert_time() {
        return $this->confirm_alert_time;
    }

    function setConfirm_alert_time($confirm_alert_time) {
        $this->confirm_alert_time = $confirm_alert_time;
    }
        function getLembur_id() {
        return $this->lembur_id;
    }

    function setLembur_id($lembur_id) {
        $this->lembur_id = $lembur_id;
    }
    
    function getBasedata() {
        return $this->basedata;
    }

    function getTransaction() {
        return $this->transaction;
    }

    function setBasedata($basedata) {
        $this->basedata = $basedata;
    }

    function setTransaction($transaction) {
        $this->transaction = $transaction;
    }

    function getIntranet_reportto_id() {
        return $this->intranet_reportto_id;
    }

    function setIntranet_reportto_id($intranet_reportto_id) {
        $this->intranet_reportto_id = $intranet_reportto_id;
    }

    function getIntranet_hrd_comment() {
        return $this->intranet_hrd_comment;
    }

    function setIntranet_hrd_comment($intranet_hrd_comment) {
        $this->intranet_hrd_comment = $intranet_hrd_comment;
    }

    function getIntranet_hrd_comment_jam() {
        return $this->intranet_hrd_comment_jam;
    }
    
    function setIntranet_hrd_comment_jam($intranet_hrd_comment_jam) {
        $this->intranet_hrd_comment_jam = $intranet_hrd_comment_jam;
    }
    
    public function setArrayTable($dataArray = NULL) {

        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        
        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }

        if (isset($x['overtime_id'])) {
            $this->setId($x['overtime_id']);
        }
        if (isset($x['employee_employee_id'])) {
            $this->getEmployee()->setId($x['employee_employee_id']);
        }
        if (isset($x['shifttype_shifttype_id'])) {
            $this->getShiftType()->setId($x['shifttype_shifttype_id']);
        }

        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['reason'])) {
            $this->setReason($x['reason']);
        }
        if (isset($x['plan_before_start'])) {
            $this->setPlanBeforeStart($x['plan_before_start']);
        }
        if (isset($x['plan_before_end'])) {
            $this->setPlanBeforeEnd($x['plan_before_end']);
        }
       
        if (isset($x['plan_after_start'])) {
            $this->setPlanAfterStart($x['plan_after_start']);
        }
        if (isset($x['plan_after_end'])) {
            $this->setPlanAfterEnd($x['plan_after_end']);
        }
        if (isset($x['exec_time_in_start'])) {
            $this->setExecTimeInStart($x['exec_time_in_start']);
        }
        if (isset($x['exec_time_in_end'])) {
            $this->setExecTimeInEnd($x['exec_time_in_end']);
        }
        if (isset($x['before_duration_text'])) {
            $this->setBeforeDurationText($x['before_duration_text']);
        }
        if (isset($x['before_net_hours'])) {
            $this->setBeforeNetHours($x['before_net_hours']);
        }
        if (isset($x['before_break_duration'])) {
            $this->setBeforeBreakDuration($x['before_break_duration']);
        }
        if (isset($x['before_total_hours'])) {
            $this->setBeforeTotalHours($x['before_total_hours']);
        }
        if (isset($x['exec_time_out_start'])) {
            $this->setExecTimeOutStart($x['exec_time_out_start']);
        }
        if (isset($x['exec_time_out_end'])) {
            $this->setExecTimeOutEnd($x['exec_time_out_end']);
        }
        if (isset($x['after_duration_text'])) {
            $this->setAfterDurationText($x['after_duration_text']);
        }
        if (isset($x['after_net_hours'])) {
            $this->setAfterNetHours($x['after_net_hours']);
        }
        if (isset($x['after_break_duration'])) {
            $this->setAfterBreakDuration($x['after_break_duration']);
        }
        if (isset($x['after_total_hours'])) {
            $this->setAfterTotalHours($x['after_total_hours']);
        }
        if (isset($x['before_factor_factor1'])) {
            $this->setBeforeFactorFactor1($x['before_factor_factor1']);
        }
        if (isset($x['before_factor_value1'])) {
            $this->setBeforeFactorValue1($x['before_factor_value1']);
        }
        if (isset($x['before_factor_result1'])) {
            $this->setBeforeFactorResult1($x['before_factor_result1']);
        }
        if (isset($x['before_factor_factor2'])) {
            $this->setBeforeFactorFactor2($x['before_factor_factor2']);
        }
        if (isset($x['before_factor_value2'])) {
            $this->setBeforeFactorValue2($x['before_factor_value2']);
        }
        if (isset($x['before_factor_result2'])) {
            $this->setBeforeFactorResult2($x['before_factor_result2']);
        }
        if (isset($x['after_factor_factor1'])) {
            $this->setAfterFactorFactor1($x['after_factor_factor1']);
        }
        if (isset($x['after_factor_value1'])) {
            $this->setAfterFactorValue1($x['after_factor_value1']);
        }
        if (isset($x['after_factor_result1'])) {
            $this->setAfterFactorResult1($x['after_factor_result1']);
        }
        if (isset($x['after_factor_factor2'])) {
            $this->setAfterFactorFactor2($x['after_factor_factor2']);
        }
        if (isset($x['after_factor_value2'])) {
            $this->setAfterFactorValue2($x['after_factor_value2']);
        }
        if (isset($x['after_factor_result2'])) {
            $this->setAfterFactorResult2($x['after_factor_result2']);
        }
       
        if (isset($x['after_factor_factor3'])) {
            $this->setAfterFactorFactor3($x['after_factor_factor3']);
        }
        if (isset($x['after_factor_value3'])) {
            $this->setAfterFactorValue3($x['after_factor_value3']);
        }
        if (isset($x['after_factor_result3'])) {
            $this->setAfterFactorResult3($x['after_factor_result3']);
        }
        if (isset($x['dasar_lembur'])) {
            $this->setDasarLembur($x['dasar_lembur']);
        }
        if (isset($x['jam_kerja'])) {
            $this->setJamKerja($x['jam_kerja']);
        }
        if (isset($x['nilai_lembur'])) {
            $this->setNilaiLembur($x['nilai_lembur']);
        }
        if (isset($x['makan_extra'])) {
            $this->setMakanExtra($x['makan_extra']);
        }
        if (isset($x['total_hour'])) {
            $this->setTotalHour($x['total_hour']);
        }
        if (isset($x['basedata'])) {
            $this->setBasedata($x['basedata']);
        }
        if (isset($x['transaction'])) {
            $this->setTransaction($x['transaction']);
        }
        if (isset($x['lembur_id'])) {
            $this->setLembur_id($x['lembur_id']);
        }
        if (isset($x['configintranet'])) {
            $this->setConfigintranet($x['configintranet']);
        }
        if (isset($x['intranet_reportto_id'])) {
            $this->setIntranet_reportto_id($x['intranet_reportto_id']);
        }
        if (isset($x['intranet_hrd_comment'])) {
            $this->setIntranet_hrd_comment($x['intranet_hrd_comment']);
        }
        if (isset($x['intranet_hrd_comment_jam'])) {
            $this->setIntranet_hrd_comment_jam($x['intranet_hrd_comment_jam']);
        }
        if (isset($x['confirm_alert_time'])) {
            $this->setConfirm_alert_time($x['confirm_alert_time']);
        }
        if (isset($x['ref_basedata'])) {
            $this->setRef_basedata($x['ref_basedata']);
        }
        if (isset($x['ref_lembur_id'])) {
            $this->setRef_lembur_id($x['ref_lembur_id']);
        }
        if (isset($x['calculate_from_intranet'])) {
            $this->setCalculate_from_intranet($x['calculate_from_intranet']);
        }
            

        



        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            'date' => $this->getDate(),
            'overtime_id' => $this->getId(),
            'employee_employee_id' => $this->getEmployee()->getId(),
            'shifttype_shifttype_id' => $this->getShiftType()->getId(),
            'status' => $this->getStatus(),
            'reason' => $this->getReason(),
            'plan_before_start' => $this->getPlanBeforeStart(),
            'plan_before_end' => $this->getPlanBeforeEnd(),
            'plan_after_start' => $this->getPlanAfterStart(),
            'plan_after_end' => $this->getPlanAfterEnd(),
            'exec_time_in_start' => $this->getExecTimeInStart(),
            'exec_time_in_end' => $this->getExecTimeInEnd(),
            'before_duration_text' => $this->getBeforeDurationText(),
            'before_net_hours' => $this->getBeforeNetHours(),
            'before_break_duration' => $this->getBeforeBreakDuration(),
            'before_total_hours' => $this->getBeforeTotalHours(),
            'exec_time_out_start' => $this->getExecTimeOutStart(),
            'exec_time_out_end' => $this->getExecTimeOutEnd(),
            'after_duration_text' => $this->getAfterDurationText(),
            'after_net_hours' => $this->getAfterNetHours(),
            'after_break_duration' => $this->getAfterBreakDuration(),
            'after_total_hours' => $this->getAfterTotalHours(),
            'before_factor_factor1' => $this->getBeforeFactorFactor1(),
            'before_factor_value1' => $this->getBeforeFactorValue1(),
            'before_factor_result1' => $this->getBeforeFactorResult1(),
            'before_factor_factor2' => $this->getBeforeFactorFactor2(),
            'before_factor_value2' => $this->getBeforeFactorValue2(),
            'before_factor_result2' => $this->getBeforeFactorResult2(),
            'after_factor_factor1' => $this->getAfterFactorFactor1(),
            'after_factor_value1' => $this->getAfterFactorValue1(),
            'after_factor_result1' => $this->getAfterFactorResult1(),
            'after_factor_factor2' => $this->getAfterFactorFactor2(),
            'after_factor_value2' => $this->getAfterFactorValue2(),
            'after_factor_result2' => $this->getAfterFactorResult2(),
            'after_factor_factor3' => $this->getAfterFactorFactor3(),
            'after_factor_value3' => $this->getAfterFactorValue3(),
            'after_factor_result3' => $this->getAfterFactorResult3(),
            'dasar_lembur' => $this->getDasarLembur(),
            'jam_kerja' => $this->getJamKerja(),
            'nilai_lembur' => $this->getNilaiLembur(),
            'makan_extra' => $this->getMakanExtra(),
            'total_hour'=>$this->getTotalHour(),
            'basedata'=>$this->getBasedata(),
            'transaction'=>$this->getTransaction(),
            'lembur_id'=>$this->getLembur_id(),
            'configintranet'=>$this->getConfigintranet(),
            'intranet_reportto_id'=>$this->getIntranet_reportto_id(),
            'intranet_hrd_comment'=>$this->getIntranet_hrd_comment(),
            'intranet_hrd_comment_jam'=>$this->getIntranet_hrd_comment_jam(),
            'confirm_alert_time'=>$this->getConfirm_alert_time(),
            'ref_basedata'=>$this->getRef_basedata(),
            'ref_lembur_id'=>$this->getRef_lembur_id(),
            'jam_lembur_approve'=>$this->getJam_lembur_approve(),
            'calculate_from_intranet'=>$this->getCalculate_from_intranet()
            
            
            
        );
        
        

        return $x;
    }
    
    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
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

    public function getDepartment() {
        if(!$this->department){
            $this->department = new Hrd_Models_Master_Department();
        }
        return $this->department;
    }

    public function setDepartment(Hrd_Models_Master_Department $department) {
        $this->department = $department;
    }

    public function getStatus() {
        return (float)$this->status;
    }

    public function setStatus($status) {
        $this->status = (int)$status;
    }

    public function getReason() {
        return $this->reason;
    }

    public function setReason($reason) {
        $this->reason = $reason;
    }

    public function getPlanBeforeStart() {
        return $this->planBeforeStart;
    }

    public function setPlanBeforeStart($planBeforeStart) {
        $this->planBeforeStart = $planBeforeStart;
    }

    public function getPlanBeforeEnd() {
        return $this->planBeforeEnd;
    }

    public function setPlanBeforeEnd($planBeforeEnd) {
        $this->planBeforeEnd = $planBeforeEnd;
    }

    public function getPlanAfterStart() {
        return $this->planAfterStart;
    }

    public function setPlanAfterStart($planAfterStart) {
        $this->planAfterStart = $planAfterStart;
    }

    public function getPlanAfterEnd() {
        return $this->planAfterEnd;
    }

    public function setPlanAfterEnd($planAfterEnd) {
        $this->planAfterEnd = $planAfterEnd;
    }

    public function getExecTimeInStart() {
        return $this->execTimeInStart;
    }

    public function setExecTimeInStart($execTimeInStart) {
        $this->execTimeInStart = $execTimeInStart;
    }

    public function getExecTimeInEnd() {
        return $this->execTimeInEnd;
    }

    public function setExecTimeInEnd($execTimeInEnd) {
        $this->execTimeInEnd = $execTimeInEnd;
    }

    public function getBeforeDurationText() {
        return $this->beforeDurationText;
    }

    public function setBeforeDurationText($beforeDurationText) {
        $this->beforeDurationText = $beforeDurationText;
    }

    public function getBeforeNetHours() {
        return (float)$this->beforeNetHours;
    }

    public function setBeforeNetHours($beforeNetHours) {
        $this->beforeNetHours = (float) $beforeNetHours;
    }

    public function getBeforeBreakDuration() {
        return (float)$this->beforeBreakDuration;
    }

    public function setBeforeBreakDuration($beforeBreakDuration) {
        $this->beforeBreakDuration = (float)$beforeBreakDuration;
    }

    public function getBeforeTotalHours() {
        return (float)$this->beforeTotalHours;
    }

    public function setBeforeTotalHours($beforeTotalHours) {
        $this->beforeTotalHours = (float)$beforeTotalHours;
    }

    public function getExecTimeOutStart() {
        return $this->execTimeOutStart;
    }

    public function setExecTimeOutStart($execTimeOutStart) {
        $this->execTimeOutStart = $execTimeOutStart;
    }

    public function getExecTimeOutEnd() {
        return $this->execTimeOutEnd;
    }

    public function setExecTimeOutEnd($execTimeOutEnd) {
        $this->execTimeOutEnd = $execTimeOutEnd;
    }

    public function getAfterDurationText() {
        return $this->afterDurationText;
    }

    public function setAfterDurationText($afterDurationText) {
        $this->afterDurationText = $afterDurationText;
    }

    public function getAfterNetHours() {
        return (float)$this->afterNetHours;
    }

    public function setAfterNetHours($afterNetHours) {
        $this->afterNetHours = (float)$afterNetHours;
    }

    public function getAfterBreakDuration() {
        return (float)$this->afterBreakDuration;
    }

    public function setAfterBreakDuration($afterBreakDuration) {
        $this->afterBreakDuration = (float)$afterBreakDuration;
    }

    public function getAfterTotalHours() {
        return (float)$this->afterTotalHours;
    }

    public function setAfterTotalHours($afterTotalHours) {
        $this->afterTotalHours = (float)$afterTotalHours;
    }

    public function getBeforeFactorFactor1() {
        return (float)$this->beforeFactorFactor1;
    }

    public function setBeforeFactorFactor1($beforeFactorFactor1) {
        $this->beforeFactorFactor1 = (float)$beforeFactorFactor1;
    }

    public function getBeforeFactorValue1() {
        return (float)$this->beforeFactorValue1;
    }

    public function setBeforeFactorValue1($beforeFactorValue1) {
        $this->beforeFactorValue1 =(float) $beforeFactorValue1;
    }

    public function getBeforeFactorResult1() {
        return (float)$this->beforeFactorResult1;
    }

    public function setBeforeFactorResult1($beforeFactorResult1) {
        $this->beforeFactorResult1 =(float) $beforeFactorResult1;
    }

    public function getBeforeFactorFactor2() {
        return (float)$this->beforeFactorFactor2;
    }

    public function setBeforeFactorFactor2($beforeFactorFactor2) {
        $this->beforeFactorFactor2 = (float)$beforeFactorFactor2;
    }

    public function getBeforeFactorValue2() {
        return (float)$this->beforeFactorValue2;
    }

    public function setBeforeFactorValue2($beforeFactorValue2) {
        $this->beforeFactorValue2 = (float)$beforeFactorValue2;
    }

    public function getBeforeFactorResult2() {
        return (float)$this->beforeFactorResult2;
    }

    public function setBeforeFactorResult2($beforeFactorResult2) {
        $this->beforeFactorResult2 = (float)$beforeFactorResult2;
    }

    public function getAfterFactorFactor1() {
        return (float)$this->afterFactorFactor1;
    }

    public function setAfterFactorFactor1($afterFactorFactor1) {
        $this->afterFactorFactor1 = (float)$afterFactorFactor1;
    }

    public function getAfterFactorValue1() {
        return (float)$this->afterFactorValue1;
    }

    public function setAfterFactorValue1($afterFactorValue1) {
        $this->afterFactorValue1 = (float)$afterFactorValue1;
    }

    public function getAfterFactorResult1() {
        return (float)$this->afterFactorResult1;
    }

    public function setAfterFactorResult1($afterFactorResult1) {
        $this->afterFactorResult1 = (float)$afterFactorResult1;
    }

    public function getAfterFactorFactor2() {
        return (float)$this->afterFactorFactor2;
    }

    public function setAfterFactorFactor2($afterFactorFactor2) {
        $this->afterFactorFactor2 =(float) $afterFactorFactor2;
    }

    public function getAfterFactorValue2() {
        return (float)$this->afterFactorValue2;
    }

    public function setAfterFactorValue2($afterFactorValue2) {
        $this->afterFactorValue2 = (float)$afterFactorValue2;
    }

    public function getAfterFactorResult2() {
        return (float)$this->afterFactorResult2;
    }

    public function setAfterFactorResult2($afterFactorResult2) {
        $this->afterFactorResult2 = (float)$afterFactorResult2;
    }

    public function getAfterFactorFactor3() {
        return (float)$this->afterFactorFactor3;
    }

    public function setAfterFactorFactor3($afterFactorFactor3) {
        $this->afterFactorFactor3 = (float)$afterFactorFactor3;
    }

    public function getAfterFactorValue3() {
        return (float)$this->afterFactorValue3;
    }

    public function setAfterFactorValue3($afterFactorValue3) {
        $this->afterFactorValue3 = (float)$afterFactorValue3;
    }

    public function getAfterFactorResult3() {
        return (float)$this->afterFactorResult3;
    }

    public function setAfterFactorResult3($afterFactorResult3) {
        $this->afterFactorResult3 = (float)$afterFactorResult3;
    }

    public function getDasarLembur() {
        return (double)$this->dasarLembur;
    }

    public function setDasarLembur($dasarLembur) {
        $this->dasarLembur = (double)$dasarLembur;
    }

    public function getJamKerja() {
        return $this->jamKerja;
    }

    public function setJamKerja($jamKerja) {
        $this->jamKerja = $jamKerja;
    }

    public function getNilaiLembur() {
        return (float)$this->nilaiLembur;
    }

    public function setNilaiLembur($nilaiLembur) {
        $this->nilaiLembur = (float)$nilaiLembur;
    }

    public function getMakanExtra() {
        return (int)$this->makanExtra;
    }

    public function setMakanExtra($makanExtra) {
        $this->makanExtra = (int)$makanExtra;
    }
    
    public function getTotalHour() {
        return $this->totalHour;
    }

    public function setTotalHour($totalHour) {
        $this->totalHour = $totalHour;
    }

    // edit by wulan 20190309
    public function getRef_basedata() {
        return $this->ref_basedata;
    }

    public function setRef_basedata($ref_basedata) {
        $this->ref_basedata = $ref_basedata;
    }
    
    public function getRef_lembur_id() {
        return $this->ref_lembur_id;
    }

    public function setRef_lembur_id($ref_lembur_id) {
        $this->ref_lembur_id = $ref_lembur_id;
    }
    
    public function getJam_lembur_approve() {
        return $this->jam_lembur_approve;
    }

    public function setJam_lembur_approve($jam_lembur_approve) {
        $this->jam_lembur_approve = $jam_lembur_approve;
    }
    
    public function getCalculate_from_intranet() {
        return $this->calculate_from_intranet;
    }

    public function setCalculate_from_intranet($calculate_from_intranet) {
        $this->calculate_from_intranet = $calculate_from_intranet;
    }
    
    // end edit by wulan 20190309
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function grouped() {
        return array();
    }

    public function getProject() {
        return $this->project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project  = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    
    protected function getDatefields() {
        return array("date");
    }


}

?>
