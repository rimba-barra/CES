<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterSK
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Trainingregistration_Trainingregistrationprocess extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingregister_id;
    private $trainingschedule_id;
    private $employee_id;
    private $employee_name;
    private $email_ciputra;
    private $trainingname;
    private $competency_name_id;
    private $batch;
    private $periode;
    private $startdate;
    private $enddate;
    private $timestart;
    private $timeend;
    private $competency_name;
    private $vendor;
    private $skill_trainingname;
    private $certificate_trainingname;
    private $type_trainingname;
    private $department_id;
    private $department;
    private $reportto;
    private $employee_reportto;
    private $trainingcaption_id;
    private $caption;
    private $budget_caption;
    private $is_ess_approve_reject;
    private $is_ess_approve_reject_date;
    private $hc_approve_reject;
    private $hc_approve_reject_date;
    private $training_cost;
    private $accomodation;
    private $transport;
    private $total_cost;
    private $extra_budget;
    private $balance_budget_employee;
    private $training_cost_schedule;
    private $accomodation_schedule;
    private $transport_schedule;
    private $total_cost_schedule;

    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingregistrationprocess_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingscheduleemployee_id'])){
           $this->setId($x['trainingscheduleemployee_id']); 
        }
        if(isset ($x['trainingregister_id'])){
           $this->setTrainingRegisterId($x['trainingregister_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setTrainingScheduleId($x['trainingschedule_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['email_ciputra'])){
           $this->setEmailCiputra($x['email_ciputra']); 
        }
        if(isset ($x['trainingname'])){
           $this->setTrainingName($x['trainingname']); 
        }
        if(isset ($x['competency_name_id'])){
           $this->setCompetencyNameId($x['competency_name_id']); 
        }
        if(isset ($x['batch'])){
           $this->setBatch($x['batch']); 
        }
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['startdate'])){
           $this->setStartdate($x['startdate']); 
        }
        if(isset ($x['enddate'])){
           $this->setEnddate($x['enddate']); 
        }
        if(isset ($x['timestart'])){
           $this->setTimeStart($x['timestart']); 
        }
        if(isset ($x['timeend'])){
           $this->setTimeEnd($x['timeend']); 
        }
        if(isset ($x['competency_name'])){
           $this->setCompetencyName($x['competency_name']); 
        }
        if(isset ($x['vendor'])){
           $this->setVendor($x['vendor']); 
        }
        if(isset ($x['skill_trainingname'])){
           $this->setSkillTrainingname($x['skill_trainingname']); 
        }
        if(isset ($x['certificate_trainingname'])){
           $this->setCertificateTrainingname($x['certificate_trainingname']); 
        }
        if(isset ($x['type_trainingname'])){
           $this->setTypeTrainingname($x['type_trainingname']); 
        }
        if(isset ($x['department_id'])){
           $this->setDepartmentId($x['department_id']); 
        }
        if(isset ($x['department'])){
           $this->setDepartment($x['department']); 
        }
        if(isset ($x['reportto'])){
            $this->setReportto($x['reportto']); 
        }
        if(isset ($x['employee_reportto'])){
           $this->setEmployeeReportto($x['employee_reportto']); 
        }
        if(isset ($x['trainingcaption_id'])){
           $this->setTrainingcaptionId($x['trainingcaption_id']); 
        }
        if(isset ($x['caption'])){
           $this->setCaption($x['caption']); 
        }
        if(isset ($x['budget_caption'])){
           $this->setBudgetCaption($x['budget_caption']); 
        }
        if(isset ($x['is_ess_approve_reject'])){
           $this->setIsAppRej($x['is_ess_approve_reject']); 
        }
        if(isset ($x['is_ess_approve_reject_date'])){
           $this->setIsAppRejDate($x['is_ess_approve_reject_date']); 
        }
        if(isset ($x['hc_approve_reject'])){
           $this->setHcAppRej($x['hc_approve_reject']); 
        }
        if(isset ($x['hc_approve_reject_date'])){
           $this->setHcAppRejDate($x['hc_approve_reject_date']); 
        }
        if(isset ($x['training_cost'])){
           $this->setTrainingCost($x['training_cost']); 
        }
        if(isset ($x['accomodation'])){
           $this->setAccomodation($x['accomodation']); 
        }
        if(isset ($x['transport'])){
           $this->setTransport($x['transport']); 
        }
        if(isset ($x['total_cost'])){
           $this->setTotalCost($x['total_cost']); 
        }
        if(isset ($x['extra_budget'])){
           $this->setExtraBudget($x['extra_budget']); 
        }
        if(isset ($x['balance_budget_employee'])){
           $this->setBalanceBudgetEmployee($x['balance_budget_employee']); 
        }
        if(isset ($x['training_cost_schedule'])){
           $this->setTrainingCostSchedule($x['training_cost_schedule']); 
        }
        if(isset ($x['accomodation_schedule'])){
           $this->setAccomodationSchedule($x['accomodation_schedule']); 
        }
        if(isset ($x['transport'])){
           $this->setTransportSchedule($x['transport_schedule']); 
        }
        if(isset ($x['total_cost'])){
           $this->setTotalCostSchedule($x['total_cost_schedule']); 
        }

        unset($x);
    }
    
    public function getArrayTable() {
        if(empty($this->getIsAppRej())){
            $getIsAppRej = '0';
        }else{
            $getIsAppRej = $this->getIsAppRej();
        }

        if(empty($this->getIsAppRejDate())){
            $getIsAppRejDate = '-';
        }else{
            $getIsAppRejDate = $this->getIsAppRejDate();
        }

        if(empty($this->getHcAppRej())){
            $getHcAppRej = '0';
        }else{
            $getHcAppRej = $this->getHcAppRej();
        }

        if(empty($this->getHcAppRejDate())){
            $getHcAppRejDate = '-';
        }else{
            $getHcAppRejDate = $this->getHcAppRejDate();
        }

        if(empty($this->getTrainingCost())){
            $getTrainingCost = '0';
        }else{
            $getTrainingCost = $this->getTrainingCost();
        }

        if(empty($this->getAccomodation())){
            $getAccomodation = '0';
        }else{
            $getAccomodation = $this->getAccomodation();
        }

        if(empty($this->getTransport())){
            $getTransport = '0';
        }else{
            $getTransport = $this->getTransport();
        }

        if(empty($this->getTotalCost())){
            $getTotalCost = '0';
        }else{
            $getTotalCost = $this->getTotalCost();
        }

        if(empty($this->getTrainingCostSchedule())){
            $getTrainingCostSchedule = '0';
        }else{
            $getTrainingCostSchedule = $this->getTrainingCostSchedule();
        }

        if(empty($this->getAccomodationSchedule())){
            $getAccomodationSchedule = '0';
        }else{
            $getAccomodationSchedule = $this->getAccomodationSchedule();
        }

        if(empty($this->getTransportSchedule())){
            $getTransportSchedule = '0';
        }else{
            $getTransportSchedule = $this->getTransportSchedule();
        }

        if(empty($this->getTotalCostSchedule())){
            $getTotalCostSchedule = '0';
        }else{
            $getTotalCostSchedule = $this->getTotalCostSchedule();
        }

        if(empty($this->getExtraBudget())){
            $getExtraBudget = '0';
        }else{
            $getExtraBudget = $this->getExtraBudget();
        }

        if(empty($this->getBalanceBudgetEmployee())){
            $getBalanceBudgetEmployee = '0';
        }else{
            $getBalanceBudgetEmployee = $this->getBalanceBudgetEmployee();
        }

        $x = array(
            'trainingscheduleemployee_id'=>$this->getId(),
            'trainingregister_id'=>$this->getTrainingRegisterId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'email_ciputra'=>$this->getEmailCiputra(),
            'trainingname'=>$this->getTrainingName(),
            'competency_name_id'=>$this->getCompetencyNameId(),
            'batch'=>$this->getBatch(),
            'periode'=>$this->getPeriode(),
            'startdate'=>$this->getStartdate(),
            'enddate'=>$this->getEnddate(),
            'timestart'=>$this->getTimeStart(),
            'timeend'=>$this->getTimeEnd(),
            'competency_name'=>$this->getCompetencyName(),
            'vendor'=>$this->getVendor(),
            'skill_trainingname'=>$this->getSkillTrainingname(),
            'certificate_trainingname'=>$this->getCertificateTrainingname(),
            'type_trainingname'=>$this->getTypeTrainingname(),
            'department_id'=>$this->getDepartmentId(),
            'department'=>$this->getDepartment(),
            'reportto'=>$this->getReportto(),
            'employee_reportto'=>$this->getEmployeeReportto(),
            'trainingcaption_id'=>$this->getTrainingcaptionId(),
            'caption'=>$this->getCaption(),
            'budget_caption'=>$this->getBudgetCaption(),
            'is_ess_approve_reject'=>$getIsAppRej,
            'is_ess_approve_reject_date'=>$getIsAppRejDate,
            'hc_approve_reject'=>$getHcAppRej,
            'hc_approve_reject_date'=>$getHcAppRejDate,
            'training_cost'=>$getTrainingCost,
            'accomodation'=>$getAccomodation,
            'transport'=>$getTransport,
            'total_cost'=>$getTotalCost,
            'extra_budget'=>$getExtraBudget,
            'balance_budget_employee'=>$getBalanceBudgetEmployee,
            'training_cost_schedule'=>$getTrainingCostSchedule,
            'accomodation_schedule'=>$getAccomodationSchedule,
            'transport_schedule'=>$getTransportSchedule,
            'total_cost_schedule'=>$getTotalCostSchedule,
        );

        return $x;
    }

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
    }

    public function getTrainingRegisterId() {
        return $this->trainingregister_id;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function getEmailCiputra() {
        return $this->email_ciputra;
    }

    public function getTrainingName() {
        return $this->trainingname;
    }

    public function getCompetencyNameId() {
        return $this->competency_name_id;
    }

    public function getBatch() {
        return $this->batch;
    }

    public function getPeriode() {
        return $this->periode;
    }

    public function getStartdate() {
        return $this->startdate;
    }

    public function getEnddate() {
        return $this->enddate;
    }

    public function getTimeStart() {
        return $this->timestart;
    }

    public function getTimeEnd() {
        return $this->timeend;
    }

    public function getCompetencyName() {
        return $this->competency_name;
    }

    public function getVendor() {
        return $this->vendor;
    }

    public function getSkillTrainingname() {
        return $this->skill_trainingname;
    }

    public function getCertificateTrainingname() {
        return $this->certificate_trainingname;
    }

    public function getTypeTrainingname() {
        return $this->type_trainingname;
    }

    public function getDepartmentId() {
        return $this->department_id;
    }

    public function getDepartment() {
        return $this->department;
    }

    public function getReportto() {
        return $this->reportto;
    }

    public function getEmployeeReportto() {
        return $this->employee_reportto;
    }

    public function getTrainingcaptionId() {
        return $this->trainingcaption_id;
    }

    public function getCaption() {
        return $this->caption;
    }

    public function getBudgetCaption() {
        return $this->budget_caption;
    }

    public function getIsAppRej() {
        return $this->is_ess_approve_reject;
    }

    public function getIsAppRejDate() {
        return $this->is_ess_approve_reject_date;
    }

    public function getHcAppRej() {
        return $this->hc_approve_reject;
    }

    public function getHcAppRejDate() {
        return $this->hc_approve_reject_date;
    }

    public function getTrainingCost() {
        return $this->training_cost;
    }

    public function getAccomodation() {
        return $this->accomodation;
    }

    public function getTransport() {
        return $this->transport;
    }

    public function getTotalCost() {
        return $this->total_cost;
    }

    public function getExtraBudget() {
        return $this->extra_budget;
    }

    public function getBalanceBudgetEmployee() {
        return $this->balance_budget_employee;
    }

    public function getTrainingCostSchedule() {
        return $this->training_cost_schedule;
    }

    public function getAccomodationSchedule() {
        return $this->accomodation_schedule;
    }

    public function getTransportSchedule() {
        return $this->transport_schedule;
    }

    public function getTotalCostSchedule() {
        return $this->total_cost_schedule;
    }

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
    }

    public function setTrainingRegisterId($trainingregister_id) {
        $this->trainingregister_id = $trainingregister_id;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function setEmailCiputra($email_ciputra) {
        $this->email_ciputra = $email_ciputra;
    }

    public function setTrainingName($trainingname) {
        $this->trainingname = $trainingname;
    }

    public function setCompetencyNameId($competency_name_id) {
        $this->competency_name_id = $competency_name_id;
    }

    public function setBatch($batch) {
        $this->batch = $batch;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }

    public function setStartdate($startdate) {
        $this->startdate = $startdate;
    }

    public function setEnddate($enddate) {
        $this->enddate = $enddate;
    }

    public function setTimeStart($timestart) {
        $this->timestart = $timestart;
    }

    public function setTimeEnd($timeend) {
        $this->timeend = $timeend;
    }

    public function setCompetencyName($competency_name) {
        $this->competency_name = $competency_name;
    }

    public function setVendor($vendor) {
        $this->vendor = $vendor;
    }

    public function setSkillTrainingname($skill_trainingname) {
        $this->skill_trainingname = $skill_trainingname;
    }

    public function setCertificateTrainingname($certificate_trainingname) {
        $this->certificate_trainingname = $certificate_trainingname;
    }

    public function setTypeTrainingname($type_trainingname) {
        $this->type_trainingname = $type_trainingname;
    }

    public function setDepartmentId($department_id) {
        $this->department_id = $department_id;
    }

    public function setDepartment($department) {
        $this->department = $department;
    }

    public function setReportto($reportto) {
        $this->reportto = $reportto;
    }

    public function setEmployeeReportto($employee_reportto) {
        $this->employee_reportto = $employee_reportto;
    }

    public function setTrainingcaptionId($trainingcaption_id) {
        $this->trainingcaption_id = $trainingcaption_id;
    }

    public function setCaption($caption) {
        $this->caption = $caption;
    }

    public function setBudgetCaption($budget_caption) {
        $this->budget_caption = $budget_caption;
    }

    public function setIsAppRej($is_ess_approve_reject) {
        $this->is_ess_approve_reject = $is_ess_approve_reject;
    }

    public function setIsAppRejDate($is_ess_approve_reject_date) {
        $this->is_ess_approve_reject_date = $is_ess_approve_reject_date;
    }

    public function setHcAppRej($hc_approve_reject) {
        $this->hc_approve_reject = $hc_approve_reject;
    }

    public function setHcAppRejDate($hc_approve_reject_date) {
        $this->hc_approve_reject_date = $hc_approve_reject_date;
    }

    public function setTrainingCost($training_cost) {
        $this->training_cost = $training_cost;
    }

    public function setAccomodation($accomodation) {
        $this->accomodation = $accomodation;
    }

    public function setTransport($transport) {
        $this->transport = $transport;
    }

    public function setTotalCost($total_cost) {
        $this->total_cost = $total_cost;
    }

    public function setExtraBudget($extra_budget) {
        $this->extra_budget = $extra_budget;
    }

    public function setBalanceBudgetEmployee($balance_budget_employee) {
        $this->balance_budget_employee = $balance_budget_employee;
    }

    public function setTrainingCostSchedule($training_cost_schedule) {
        $this->training_cost_schedule = $training_cost_schedule;
    }

    public function setAccomodationSchedule($accomodation_schedule) {
        $this->accomodation_schedule = $accomodation_schedule;
    }

    public function setTransportSchedule($transport_schedule) {
        $this->transport_schedule = $transport_schedule;
    }

    public function setTotalCostSchedule($total_cost_schedule) {
        $this->total_cost_schedule = $total_cost_schedule;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("tanggal");
    }

    function get_mail() {
        return $this->_mail;
    }
    

}
