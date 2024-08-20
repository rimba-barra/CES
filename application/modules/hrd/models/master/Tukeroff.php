<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tukeroff
 *
 * @author MIS - AHMAD RIADI
 */
class Hrd_Models_Master_Tukeroff extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    private $tukeroff_id;
    private $report_hod_id;
    private $report_cc_id;
    private $transaksi_id_client;
    private $tukeroff_date;
    private $dari_tanggal;
    private $ke_tanggal;
    private $dari_shifttype_id;
    private $dari_shift;
    private $ke_shifttype_id;
    private $ke_shift;
    private $jam_masuk;
    private $jam_pulang;
    private $dari_description;
    private $ke_description;
    private $is_fullday;
    private $is_canceled;
    private $is_approve;
    private $is_process;
    private $project_id;
    private $projectname;
    private $pt_id;
    private $ptname;
    private $department;
    private $department_id;
    private $employee_id;
    private $employee_nik;
    private $employee_name;
    private $addby;
    private $addon;
    private $modiby;
    private $modion;
    private $deleted;
    private $daritanggal_pengajuan;
    private $sampaitanggal_pengajuan;
    private $daritanggal_perubahan;
    private $sampaitanggal_perubahan;
    private $dari_absentdetail_id;
    private $ke_absentdetail_id;

    public function __construct($prefix = NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "tukeroff_";
    }
    function getDari_absentdetail_id() {
        return intval($this->dari_absentdetail_id);
    }

    function getKe_absentdetail_id() {
        return intval($this->ke_absentdetail_id);
    }

    function setDari_absentdetail_id($dari_absentdetail_id) {
        $this->dari_absentdetail_id = $dari_absentdetail_id;
    }

    function setKe_absentdetail_id($ke_absentdetail_id) {
        $this->ke_absentdetail_id = $ke_absentdetail_id;
    }

        
    function getDaritanggal_pengajuan() {
        return strval($this->daritanggal_pengajuan);
    }

    function getSampaitanggal_pengajuan() {
        return strval($this->sampaitanggal_pengajuan);
    }

    function getDaritanggal_perubahan() {
        return strval($this->daritanggal_perubahan);
    }

    function getSampaitanggal_perubahan() {
        return strval($this->sampaitanggal_perubahan);
    }

    function setDaritanggal_pengajuan($daritanggal_pengajuan) {
        $this->daritanggal_pengajuan = $daritanggal_pengajuan;
    }

    function setSampaitanggal_pengajuan($sampaitanggal_pengajuan) {
        $this->sampaitanggal_pengajuan = $sampaitanggal_pengajuan;
    }

    function setDaritanggal_perubahan($daritanggal_perubahan) {
        $this->daritanggal_perubahan = $daritanggal_perubahan;
    }

    function setSampaitanggal_perubahan($sampaitanggal_perubahan) {
        $this->sampaitanggal_perubahan = $sampaitanggal_perubahan;
    }

    function getTukeroff_id() {
        return intval($this->tukeroff_id);
    }

    function getReport_hod_id() {
        return strval($this->report_hod_id);
    }

    function getReport_cc_id() {
        return strval($this->report_cc_id);
    }

    function getTransaksi_id_client() {
        return intval($this->transaksi_id_client);
    }

    function getTukeroff_date() {
        return strval($this->tukeroff_date);
    }

    function getDari_tanggal() {
        return strval($this->dari_tanggal);
    }

    function getKe_tanggal() {
        return strval($this->ke_tanggal);
    }

    function getDari_shifttype_id() {
        return intval($this->dari_shifttype_id);
    }

    function getKe_shifttype_id() {
        return intval($this->ke_shifttype_id);
    }

    function getJam_masuk() {
        return strval($this->jam_masuk);
    }

    function getJam_pulang() {
        return strval($this->jam_pulang);
    }

    function getDari_description() {
        return strval($this->dari_description);
    }

    function getKe_description() {
        return strval($this->ke_description);
    }

    function getIs_fullday() {
        return intval($this->is_fullday);
    }

    function getIs_canceled() {
        return intval($this->is_canceled);
    }

    function getIs_approve() {
        return intval($this->is_approve);
    }
    
    function getIs_process() {
        return intval($this->is_process);
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

    function getDepartment() {
        return strval($this->department);
    }

    function getDepartment_id() {
        return intval($this->department_id);
    }

    function getEmployee_id() {
        return intval($this->employee_id);
    }

    function getAddby() {
        return intval($this->addby);
    }

    function getAddon() {
        return strval($this->addon);
    }

    function getModiby() {
        return intval($this->modiby);
    }

    function getModion() {
        return strval($this->modion);
    }

    function getDeleted() {
        return boolval($this->deleted);
    }

    function setTukeroff_id($tukeroff_id) {
        $this->tukeroff_id = $tukeroff_id;
    }

    function setReport_hod_id($report_hod_id) {
        $this->report_hod_id = $report_hod_id;
    }

    function setReport_cc_id($report_cc_id) {
        $this->report_cc_id = $report_cc_id;
    }

    function setTransaksi_id_client($transaksi_id_client) {
        $this->transaksi_id_client = $transaksi_id_client;
    }

    function setTukeroff_date($tukeroff_date) {
        $this->tukeroff_date = $tukeroff_date;
    }

    function setDari_tanggal($dari_tanggal) {
        $this->dari_tanggal = $dari_tanggal;
    }

    function setKe_tanggal($ke_tanggal) {
        $this->ke_tanggal = $ke_tanggal;
    }

    function setDari_shifttype_id($dari_shifttype_id) {
        $this->dari_shifttype_id = $dari_shifttype_id;
    }

    function setKe_shifttype_id($ke_shifttype_id) {
        $this->ke_shifttype_id = $ke_shifttype_id;
    }

    function setJam_masuk($jam_masuk) {
        $this->jam_masuk = $jam_masuk;
    }

    function setJam_pulang($jam_pulang) {
        $this->jam_pulang = $jam_pulang;
    }

    function setDari_description($dari_description) {
        $this->dari_description = $dari_description;
    }

    function setKe_description($ke_description) {
        $this->ke_description = $ke_description;
    }

    function setIs_fullday($is_fullday) {
        $this->is_fullday = $is_fullday;
    }

    function setIs_canceled($is_canceled) {
        $this->is_canceled = $is_canceled;
    }

    function setIs_approve($is_approve) {
        $this->is_approve = $is_approve;
    }

    function setIs_process($is_process) {
        $this->is_process = $is_process;
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

    function setDepartment($department) {
        $this->department = $department;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setDeleted($deleted) {
        $this->deleted = $deleted;
    }

    function getEmployee_name() {
        return strval($this->employee_name);
    }

    function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }

    function getEmployee_nik() {
        return strval($this->employee_nik);
    }

    function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    function getDari_shift() {
        return strval($this->dari_shift);
    }

    function getKe_shift() {
        return strval($this->ke_shift);
    }

    function setDari_shift($dari_shift) {
        $this->dari_shift = $dari_shift;
    }

    function setKe_shift($ke_shift) {
        $this->ke_shift = $ke_shift;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['dari_absentdetail_id'])) {
            $this->setDari_absentdetail_id($x['dari_absentdetail_id']);
        }
        if (isset($x['ke_absentdetail_id'])) {
            $this->setKe_absentdetail_id($x['ke_absentdetail_id']);
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
        if (isset($x['tukeroff_id'])) {
            $this->setTukeroff_id($x['tukeroff_id']);
        }
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }
        if (isset($x['employee_nik'])) {
            $this->setEmployee_nik($x['employee_nik']);
        }
        if (isset($x['employee_name'])) {
            $this->setEmployee_name($x['employee_name']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['report_hod_id'])) {
            $this->setReport_hod_id($x['report_hod_id']);
        }
        if (isset($x['report_cc_id'])) {
            $this->setReport_cc_id($x['report_cc_id']);
        }
        if (isset($x['transaksi_id_client'])) {
            $this->setTransaksi_id_client($x['transaksi_id_client']);
        }
        if (isset($x['tukeroff_date'])) {
            $this->setTukeroff_date($x['tukeroff_date']);
        }
        if (isset($x['dari_tanggal'])) {
            $this->setDari_tanggal($x['dari_tanggal']);
        }
        if (isset($x['ke_tanggal'])) {
            $this->setKe_tanggal($x['ke_tanggal']);
        }
        if (isset($x['dari_shifttype_id'])) {
            $this->setDari_shifttype_id($x['dari_shifttype_id']);
        }
        if (isset($x['dari_shift'])) {
            $this->setDari_shift($x['dari_shift']);
        }
        if (isset($x['ke_shifttype_id'])) {
            $this->setKe_shifttype_id($x['ke_shifttype_id']);
        }
        if (isset($x['ke_shift'])) {
            $this->setKe_shift($x['ke_shift']);
        }
        if (isset($x['jam_masuk'])) {
            $this->setJam_masuk($x['jam_masuk']);
        }
        if (isset($x['jam_pulang'])) {
            $this->setJam_pulang($x['jam_pulang']);
        }
        if (isset($x['dari_description'])) {
            $this->setDari_description($x['dari_description']);
        }
        if (isset($x['ke_description'])) {
            $this->setKe_description($x['ke_description']);
        }
        if (isset($x['is_fullday'])) {
            $this->setIs_fullday($x['is_fullday']);
        }
        if (isset($x['is_canceled'])) {
            $this->setIs_canceled($x['is_canceled']);
        }
        if (isset($x['is_approve'])) {
            $this->setIs_approve($x['is_approve']);
        }
        if (isset($x['is_process'])) {
            $this->setIs_process($x['is_process']);
        }

        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }

        if (isset($x['modiby'])) {
            $this->setModiby($x['modiby']);
        }
        if (isset($x['modion'])) {
            $this->setModion($x['modion']);
        }
        if (isset($x['deleted'])) {
            $this->setDeleted($x['deleted']);
        }

        if (isset($x['daritanggal_pengajuan'])) {
            $this->setdaritanggal_pengajuan($x['daritanggal_pengajuan']);
        }
        if (isset($x['sampaitanggal_pengajuan'])) {
            $this->setsampaitanggal_pengajuan($x['sampaitanggal_pengajuan']);
        }

        if (isset($x['daritanggal_perubahan'])) {
            $this->setDaritanggal_perubahan($x['daritanggal_perubahan']);
        }
        if (isset($x['sampaitanggal_perubahan'])) {
            $this->setSampaitanggal_perubahan($x['sampaitanggal_perubahan']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'dari_absentdetail_id' => $this->getDari_absentdetail_id(),
            'ke_absentdetail_id' => $this->getKe_absentdetail_id(),
            'project_id' => $this->getProject_id(),
            'pt_id' => $this->getPt_id(),
            'projectname' => $this->getProjectname(),
            'ptname' => $this->getPtname(),
            'department_id' => $this->getDepartment_id(),
            'department' => $this->getDepartment(),
            'employee_id' => $this->getEmployee_id(),
            'employee_nik' => $this->getEmployee_nik(),
            'employee_name' => $this->getEmployee_name(),
            'tukeroff_id' => $this->getTukeroff_id(),
            'report_hod_id' => $this->getReport_hod_id(),
            'report_cc_id' => $this->getReport_cc_id(),
            'transaksi_id_client' => $this->getTransaksi_id_client(),
            'tukeroff_date' => $this->getTukeroff_date(),
            'dari_tanggal' => $this->getDari_tanggal(),
            'ke_tanggal' => $this->getKe_tanggal(),
            'dari_shifttype_id' => $this->getDari_shifttype_id(),
            'dari_shift' => $this->getDari_shift(),
            'ke_shifttype_id' => $this->getKe_shifttype_id(),
            'ke_shift' => $this->getKe_shift(),
            'jam_masuk' => $this->getJam_masuk(),
            'jam_pulang' => $this->getJam_pulang(),
            'dari_description' => $this->getDari_description(),
            'ke_description' => $this->getKe_description(),
            'is_fullday' => $this->getIs_fullday(),
            'is_canceled' => $this->getIs_canceled(),
            'is_approve' => $this->getIs_approve(),
            'is_process' => $this->getIs_process(),
            'addby' => $this->getAddby(),
            'addon' => $this->getAddon(),
            'modiby' => $this->getModiby(),
            'modion' => $this->getModion(),
            'deleted' => $this->getDeleted(),
            'daritanggal_pengajuan' => $this->getDaritanggal_pengajuan(),
            'sampaitanggal_pengajuan' => $this->getSampaitanggal_pengajuan(),
            'daritanggal_perubahan' => $this->getDaritanggal_perubahan(),
            'sampaitanggal_perubahan' => $this->getSampaitanggal_perubahan(),
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

    public function getDatefields() {
        return array(
            'tukeroff_date',
            'dari_tanggal',
            'ke_tanggal',
            'daritanggal_pengajuan',
            'sampaitanggal_pengajuan',
            'daritanggal_perubahan',
            'sampaitanggal_perubahan'
        );
    }

}

?>
