<?php

/**
 * Description of JobHistory
 *
 * @author MIS
 */
class Hrd_Models_Master_Employeehistory extends Box_Models_ObjectEmbedData implements Box_Arried {

    private $project_id;
    private $projectname;
    private $pt_id;
    private $ptname;
    private $department_id;
    private $department;
    private $history_id;
    private $employee_id;
    private $employee_nik;
    private $employee_name;
    private $statusinformation_id;
    private $jobfamily_id;
    private $jobfamily;
    private $position_id;
    private $position;
    private $group_id;
    private $groupcode;
    private $groupdesc;
    private $banding_id;
    private $banding;
    private $hire_date;
    private $assignation_date;
    private $reportto_id;
    private $reporttoname;
    private $reporttoposition;
    private $sk_number;
    private $reason;
    private $effective_date;
    private $note;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "employeehistory_";
    }

    function getProject_id() {
        return intval($this->project_id);
    }

    function getProjectname() {
        return strval($this->projectname);
    }

    function getPt_id() {
        return intval($this->pt_id);
    }

    function getPtname() {
        return strval($this->ptname);
    }

    function getDepartment_id() {
        return intval($this->department_id);
    }

    function getDepartment() {
        return strval($this->department);
    }

    function getHistory_id() {
        return intval($this->history_id);
    }

    function getEmployee_id() {
        return intval($this->employee_id);
    }

    function getEmployee_nik() {
        return strval($this->employee_nik);
    }

    function getEmployee_name() {
        return strval($this->employee_name);
    }

    function getStatusinformation_id() {
        return intval($this->statusinformation_id);
    }

    function getJobfamily_id() {
        return intval($this->jobfamily_id);
    }

    function getJobfamily() {
        return strval($this->jobfamily);
    }

    function getPosition_id() {
        return intval($this->position_id);
    }

    function getPosition() {
        return strval($this->position);
    }

    function getGroup_id() {
        return intval($this->group_id);
    }

    function getGroupcode() {
        return strval($this->groupcode);
    }

    function getGroupdesc() {
        return strval($this->groupdesc);
    }

    function getBanding_id() {
        return intval($this->banding_id);
    }

    function getBanding() {
        return strval($this->banding);
    }

    function getHire_date() {
        return $this->hire_date;
    }

    function getAssignation_date() {
        return $this->assignation_date;
    }

    function getReportto_id() {
        return intval($this->reportto_id);
    }

    function getReporttoname() {
        return strval($this->reporttoname);
    }

    function getReporttoposition() {
        return strval($this->reporttoposition);
    }
    function getSk_number() {
        return strval($this->sk_number);
    }

    function getReason() {
        return strval($this->reason);
    }

    function getEffective_date() {
        return $this->effective_date;
    }

    function getNote() {
        return strval($this->note);
    }

    function setSk_number($sk_number) {
        $this->sk_number = $sk_number;
    }

    function setReason($reason) {
        $this->reason = $reason;
    }

    function setEffective_date($effective_date) {
        $this->effective_date = $effective_date;
    }

    function setNote($note) {
        $this->note = $note;
    }

    
    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setProjectname($projectname) {
        $this->projectname = $projectname;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setPtname($ptname) {
        $this->ptname = $ptname;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setHistory_id($history_id) {
        $this->history_id = $history_id;
    }

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }

    function setStatusinformation_id($statusinformation_id) {
        $this->statusinformation_id = $statusinformation_id;
    }

    function setJobfamily_id($jobfamily_id) {
        $this->jobfamily_id = $jobfamily_id;
    }

    function setJobfamily($jobfamily) {
        $this->jobfamily = $jobfamily;
    }

    function setPosition_id($position_id) {
        $this->position_id = $position_id;
    }

    function setPosition($position) {
        $this->position = $position;
    }

    function setGroup_id($group_id) {
        $this->group_id = $group_id;
    }

    function setGroupcode($groupcode) {
        $this->groupcode = $groupcode;
    }

    function setGroupdesc($groupdesc) {
        $this->groupdesc = $groupdesc;
    }

    function setBanding_id($banding_id) {
        $this->banding_id = $banding_id;
    }

    function setBanding($banding) {
        $this->banding = $banding;
    }

    function setHire_date($hire_date) {
        $this->hire_date = $hire_date;
    }

    function setAssignation_date($assignation_date) {
        $this->assignation_date = $assignation_date;
    }

    function setReportto_id($reportto_id) {
        $this->reportto_id = $reportto_id;
    }

    function setReporttoname($reporttoname) {
        $this->reporttoname = $reporttoname;
    }

    function setReporttoposition($reporttoposition) {
        $this->reporttoposition = $reporttoposition;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['history_id'])) {
            $this->setHistory_id($x['history_id']);
        }
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }
        if (isset($x['employee_name'])) {
            $this->setEmployee_name($x['employee_name']);
        }
        if (isset($x['employee_nik'])) {
            $this->setEmployee_nik($x['employee_nik']);
        }
        if (isset($x['project_id'])) {
            $this->setProject_id($x['project_id']);
        }
        if (isset($x['projectname'])) {
            $this->setProjectname($x['projectname']);
        }
        if (isset($x['pt_id'])) {
            $this->setPt_id($x['pt_id']);
        }
        if (isset($x['ptname'])) {
            $this->setPtname($x['ptname']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['jobfamily_id'])) {
            $this->setJobfamily_id($x['jobfamily_id']);
        }
        if (isset($x['jobfamily'])) {
            $this->setJobfamily($x['jobfamily']);
        }
        if (isset($x['banding_id'])) {
            $this->setBanding_id($x['banding_id']);
        }
        if (isset($x['banding'])) {
            $this->setBanding($x['banding']);
        }
        if (isset($x['position_id'])) {
            $this->setPosition_id($x['position_id']);
        }
        if (isset($x['position'])) {
            $this->setPosition($x['position']);
        }
        if (isset($x['group_id'])) {
            $this->setGroup_id($x['group_id']);
        }
        if (isset($x['groupcode'])) {
            $this->setGroupcode($x['groupcode']);
        }
        if (isset($x['groupdesc'])) {
            $this->setGroupdesc($x['groupdesc']);
        }
        if (isset($x['reportto'])) {
            $this->setReportto_id($x['reportto']);
        }
        if (isset($x['reporttoname'])) {
            $this->setReporttoname($x['reporttoname']);
        }
        if (isset($x['reporttoposition'])) {
            $this->setReporttoposition($x['reporttoposition']);
        }
        if (isset($x['hire_date'])) {
            $this->setHire_date($x['hire_date']);
        }
        if (isset($x['assignation_date'])) {
            $this->setAssignation_date($x['assignation_date']);
        }
        if (isset($x['sk_number'])) {
            $this->setSk_number($x['sk_number']);
        }
        if (isset($x['reason'])) {
            $this->setReason($x['reason']);
        }
        if (isset($x['effective_date'])) {
            $this->setEffective_date($x['effective_date']);
        }
        if (isset($x['note'])) {
            $this->setNote($x['note']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "history_id" => $this->getHistory_id(),
            "employee_id" => $this->getEmployee_id(),
            "employee_nik" => $this->getEmployee_nik(),
            "employee_name" => $this->getEmployee_name(),
            "project_id" => $this->getProject_id(),
            "projectname" => $this->getProjectname(),
            "pt_id" => $this->getPt_id(),
            "ptname" => $this->getPtname(),
            "department_id" => $this->getDepartment_id(),
            "department" => $this->getDepartment(),
            "position_id" => $this->getPosition_id(),
            "position" => $this->getPosition(),
            "group_id" => $this->getGroup_id(),
            "groupcode" => $this->getGroupcode(),
            "groupdesc" => $this->getGroupdesc(),
            "jobfamily_id" => $this->getJobfamily_id(),
            "jobfamily" => $this->getJobfamily(),
            "banding_id" => $this->getBanding_id(),
            "banding" => $this->getBanding(),
            "reportto" => $this->getReportto_id(),
            "reporttoname" => $this->getReporttoname(),
            "reporttoposition" => $this->getReporttoposition(),
            "hire_date" => $this->getHire_date(),
            "assignation_date" => $this->getAssignation_date(),
            "sk_number" => $this->getSk_number(),
            "reason" => $this->getReason(),
            "effective_date" => $this->getEffective_date(),
            "note" => $this->getNote(),
        );
        return $x;
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    protected function getDatefields() {
        return array("hire_date", "assignation_date", "contractend_date","effective_date");
    }

}

?>
