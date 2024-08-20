<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Multiposition
 *
 * @author MIS - AHMAD RIADI
 */
class Hrd_Models_Master_Multiposition extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $addby;
    private $addon;
    private $alokasibiaya;
    private $alokasibiaya_id;
    private $banding;
    private $deleted;
    private $department;
    private $department_id;
    private $employee_id;
    private $employee_multiposition_id;
    private $employee_nik;
    private $hideparam;
    private $is_default;
    private $jobfamily;
    private $jobfamily_id;
    private $mode_read;
    private $modiby;
    private $modion;
    private $position;
    private $position_id;
    private $project_id;
    private $projectname;
    private $pt_id;
    private $ptname;
    private $reportto;
    private $reportto_id;
    private $section;
    private $section_id;
    private $statedata;
    public $_arraydata;

    public function __construct($prefix = NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "multiposition_";
    }
    
    function getAddby() {
        return $this->addby;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAlokasibiaya() {
        return $this->alokasibiaya;
    }

    function getAlokasibiaya_id() {
        return intval($this->alokasibiaya_id);
    }

    function getBanding() {
        return $this->banding;
    }

    function getDeleted() {
        return $this->deleted;
    }

    function getDepartment() {
        return $this->department;
    }

    function getDepartment_id() {
        return intval($this->department_id);
    }

    function getEmployee_id() {
        return intval($this->employee_id);
    }

    function getEmployee_multiposition_id() {
        return intval($this->employee_multiposition_id);
    }

    function getEmployee_nik() {
        return $this->employee_nik;
    }

    function getHideparam() {
        return $this->hideparam;
    }

    function getIs_default() {
        return boolval($this->is_default);
    }

    function getJobfamily() {
        return $this->jobfamily;
    }

    function getJobfamily_id() {
        return intval($this->jobfamily_id);
    }

    function getMode_read() {
        return $this->mode_read;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getModion() {
        return $this->modion;
    }

    function getPosition() {
        return $this->position;
    }

    function getPosition_id() {
        return intval($this->position_id);
    }

    function getProject_id() {
        return intval($this->project_id);
    }

    function getProjectname() {
        return $this->projectname;
    }

    function getPt_id() {
        return intval($this->pt_id);
    }

    function getPtname() {
        return $this->ptname;
    }

    function getReportto() {
        return $this->reportto;
    }

    function getReportto_id() {
        return intval($this->reportto_id);
    }

    function getSection() {
        return $this->section;
    }

    function getSection_id() {
        return intval($this->section_id);
    }

    function getStatedata() {
        return $this->statedata;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAlokasibiaya($alokasibiaya) {
        $this->alokasibiaya = $alokasibiaya;
    }

    function setAlokasibiaya_id($alokasibiaya_id) {
        $this->alokasibiaya_id = intval($alokasibiaya_id);
    }

    function setBanding($banding) {
        $this->banding = $banding;
    }

    function setDeleted($deleted) {
        $this->deleted = boolval($deleted);
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setDepartment_id($department_id) {
        $this->department_id = intval($department_id);
    }

    function setEmployee_id($employee_id) {
        $this->employee_id = intval($employee_id);
    }

    function setEmployee_multiposition_id($employee_multiposition_id) {
        $this->employee_multiposition_id = intval($employee_multiposition_id);
    }

    function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    function setHideparam($hideparam) {
        $this->hideparam = $hideparam;
    }

    function setIs_default($is_default) {
        $this->is_default = boolval($is_default);
    }

    function setJobfamily($jobfamily) {
        $this->jobfamily = $jobfamily;
    }

    function setJobfamily_id($jobfamily_id) {
        $this->jobfamily_id = intval($jobfamily_id);
    }

    function setMode_read($mode_read) {
        $this->mode_read = $mode_read;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setPosition($position) {
        $this->position = $position;
    }

    function setPosition_id($position_id) {
        $this->position_id = intval($position_id);
    }

    function setProject_id($project_id) {
        $this->project_id = intval($project_id);
    }

    function setProjectname($projectname) {
        $this->projectname = $projectname;
    }

    function setPt_id($pt_id) {
        $this->pt_id = intval($pt_id);
    }

    function setPtname($ptname) {
        $this->ptname = $ptname;
    }

    function setReportto($reportto) {
        $this->reportto = $reportto;
    }

    function setReportto_id($reportto_id) {
        $this->reportto_id = intval($reportto_id);
    }

    function setSection($section) {
        $this->section = $section;
    }

    function setSection_id($section_id) {
        $this->section_id = intval($section_id);
    }

    function setStatedata($statedata) {
        $this->statedata = $statedata;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        
        if (isset($x['employee_multiposition_id'])) {
            $this->setId($x['employee_multiposition_id']);
        }
        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }
        if (isset($x['alokasibiaya'])) {
            $this->setAlokasibiaya($x['alokasibiaya']);
        }
        if (isset($x['alokasibiaya_id'])) {
            $this->setAlokasibiaya_id($x['alokasibiaya_id']);
        }
        if (isset($x['banding'])) {
            $this->setBanding($x['banding']);
        }
        if (isset($x['deleted'])) {
            $this->setDeleted($x['deleted']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }
        if (isset($x['employee_nik'])) {
            $this->setEmployee_nik($x['employee_nik']);
        }
        if (isset($x['hideparam'])) {
            $this->setHideparam($x['hideparam']);
        }
        if (isset($x['is_default'])) {
            $this->setIs_default($x['is_default']);
        }

        if (isset($x['jobfamily'])) {
            $this->setJobfamily($x['jobfamily']);
        }
        if (isset($x['jobfamily_id'])) {
            $this->setJobfamily_id($x['jobfamily_id']);
        }
        if (isset($x['mode_read'])) {
            $this->setMode_read($x['mode_read']);
        }
        if (isset($x['modiby'])) {
            $this->setModiby($x['modiby']);
        }
        if (isset($x['modion'])) {
            $this->setModion($x['modion']);
        }
        if (isset($x['position'])) {
            $this->setPosition($x['position']);
        }
        if (isset($x['position_id'])) {
            $this->setPosition_id($x['position_id']);
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
        if (isset($x['reportto'])) {
            $this->setReportto($x['reportto']);
        }
        if (isset($x['reportto_id'])) {
            $this->setReportto_id($x['reportto_id']);
        }
        if (isset($x['section'])) {
            $this->setSection($x['section']);
        }
        if (isset($x['section_id'])) {
            $this->setSection_id($x['section_id']);
        }
        if (isset($x['statedata'])) {
            $this->setStatedata($x['statedata']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'addby' => $this->getAddby(),
            'addon' => $this->getAddon(),
            'alokasibiaya' => $this->getAlokasibiaya(),
            'alokasibiaya_id' => $this->getAlokasibiaya_id(),
            'banding' => $this->getBanding(),
            'deleted' => $this->getDeleted(),
            'department' => $this->getDepartment(),
            'department_id' => $this->getDepartment_id(),
            'employee_id' => $this->getEmployee_id(),
            'employee_multiposition_id' => $this->getId(),
            'employee_nik' => strval($this->getEmployee_nik()),
            'hideparam' => $this->getHideparam(),
            'is_default' => $this->getIs_default(),
            'jobfamily' => $this->getJobfamily(),
            'jobfamily_id' => $this->getJobfamily_id(),
            'mode_read' => $this->getMode_read(),
            'modiby' => $this->getModiby(),
            'modion' => $this->getModion(),
            'position' => $this->getPosition(),
            'position_id' => $this->getPosition_id(),
            'project_id' => $this->getProject_id(),
            'projectname' => $this->getProjectname(),
            'pt_id' => $this->getPt_id(),
            'ptname' => $this->getPtname(),
            'reportto' => $this->getReportto(),
            'reportto_id' => $this->getReportto_id(),
            'section' => $this->getSection(),
            'section_id' => $this->getSection_id(),
            'statedata' => $this->getStatedata(),
        );
        return $x;
    }
    public function getArray() {
        return $this->getArrayTable();
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}

?>
