<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Transactionapi
 *
 * @author MIS
 */
class Hrd_Models_Intranet_Transactionapi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $transaction_id;
    public $project_id;
    public $pt_id;
    public $employee_id;
    public $transaksi_id_client;
    public $for_transaction;
    public $transaction_date;
    public $report_hod_id;
    public $report_cc_id;
    public $daritanggal;
    public $sampaitanggal;
    public $darijam;
    public $sampaijam;
    public $tipe_izin;
    public $tipe_cuti;
    public $is_halfday;
    public $tipe_tlk;
    public $lokasi_tlk;
    public $total_hari;
    public $keterangan;
    public $is_approve;
    public $is_cancel;
    public $is_canceled; // added by Wulan Sari 2018.05.07
    public $is_process;
    //Other field
    public $employee_name;
    public $employee_nik;
    public $department;
    public $department_id;
    public $deptcode;
    public $absenttype;
    public $leavetype;
    public $tlktype;
    public $fromdate;
    public $untildate;
    //custome field for auto value
    public $employee_employee_id;
    public $start_date;
    public $end_date;
    public $absenttypegroup_absenttypegroup_id;
    public $absenttype_absenttype_id;
    public $absenttype_code;
    public $absentdetail_id;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "transactionapi_";
        $this->setup = new Hrd_Models_General_Setup();
    }
    
    function getFromdate() {
        return $this->fromdate;
    }

    function getUntildate() {
        return $this->untildate;
    }

    function setFromdate($fromdate) {
        $this->fromdate = $fromdate;
    }

    function setUntildate($untildate) {
        $this->untildate = $untildate;
    }

        
    function getDepartment_id() {
        return $this->department_id;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }
    
    function getEmployee_employee_id() {
        return $this->employee_employee_id;
    }

    function getStart_date() {
        return $this->start_date;
    }

    function getEnd_date() {
        return $this->end_date;
    }

    function getAbsenttypegroup_absenttypegroup_id() {
        return $this->absenttypegroup_absenttypegroup_id;
    }

    function getAbsenttype_absenttype_id() {
        return $this->absenttype_absenttype_id;
    }

    function getAbsenttype_code() {
        return $this->absenttype_code;
    }

    function getAbsentdetail_id() {
        return $this->absentdetail_id;
    }

    function setEmployee_employee_id($employee_employee_id) {
        $this->employee_employee_id = $employee_employee_id;
    }

    function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    function setEnd_date($end_date) {
        $this->end_date = $end_date;
    }

    function setAbsenttypegroup_absenttypegroup_id($absenttypegroup_absenttypegroup_id) {
        $this->absenttypegroup_absenttypegroup_id = $absenttypegroup_absenttypegroup_id;
    }

    function setAbsenttype_absenttype_id($absenttype_absenttype_id) {
        $this->absenttype_absenttype_id = $absenttype_absenttype_id;
    }

    function setAbsenttype_code($absenttype_code) {
        $this->absenttype_code = $absenttype_code;
    }

    function setAbsentdetail_id($absentdetail_id) {
        $this->absentdetail_id = $absentdetail_id;
    }

    function getTlktype() {
        return $this->tlktype;
    }

    function setTlktype($tlktype) {
        $this->tlktype = $tlktype;
    }

    function getLeavetype() {
        return $this->leavetype;
    }

    function setLeavetype($leavetype) {
        $this->leavetype = $leavetype;
    }

    function getAbsenttype() {
        return $this->absenttype;
    }

    function setAbsenttype($absenttype) {
        $this->absenttype = $absenttype;
    }

    function getEmployee_name() {
        return $this->employee_name;
    }

    function getEmployee_nik() {
        return $this->employee_nik;
    }

    function getDepartment() {
        return $this->department;
    }

    function getDeptcode() {
        return $this->deptcode;
    }

    function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }

    function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setDeptcode($deptcode) {
        $this->deptcode = $deptcode;
    }

    function getIs_process() {
        return intval($this->is_process);
    }

    function setIs_process($is_process) {
        $this->is_process = $is_process;
    }

    function getTransaction_id() {
        return intval($this->transaction_id);
    }

    function getProject_id() {
        return intval($this->project_id);
    }

    function getPt_id() {
        return intval($this->pt_id);
    }

    function getEmployee_id() {
        return intval($this->employee_id);
    }

    function getTransaksi_id_client() {
        return intval($this->transaksi_id_client);
    }

    function getFor_transaction() {
        return strval($this->for_transaction);
    }

    function getTransaction_date() {
        return strval($this->transaction_date);
    }

    function getReport_hod_id() {
        return strval($this->report_hod_id);
    }

    function getReport_cc_id() {
        return strval($this->report_cc_id);
    }

    function getDaritanggal() {
        return $this->daritanggal;
    }

    function getSampaitanggal() {
        return $this->sampaitanggal;
    }

    function getDarijam() {
        return $this->darijam;
    }

    function getSampaijam() {
        return $this->sampaijam;
    }

    function getTipe_izin() {
        return strval($this->tipe_izin);
    }

    function getTipe_cuti() {
        return intval($this->tipe_cuti);
    }

    function getIs_halfday() {
        return boolval($this->is_halfday);
    }

    function getTipe_tlk() {
        return intval($this->tipe_tlk);
    }

    function getLokasi_tlk() {
        return strval($this->lokasi_tlk);
    }

    function getTotal_hari() {
        return floatval($this->total_hari);
    }

    function getKeterangan() {
        return strval($this->keterangan);
    }

    function getIs_approve() {
        return boolval($this->is_approve);
    }

    function getIs_cancel() {
        return boolval($this->is_cancel);
    }

    function setTransaction_id($transaction_id) {
        $this->transaction_id = $transaction_id;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setTransaksi_id_client($transaksi_id_client) {
        $this->transaksi_id_client = $transaksi_id_client;
    }

    function setFor_transaction($for_transaction) {
        $this->for_transaction = $for_transaction;
    }

    function setTransaction_date($transaction_date) {
        $this->transaction_date = $transaction_date;
    }

    function setReport_hod_id($report_hod_id) {
        $this->report_hod_id = $report_hod_id;
    }

    function setReport_cc_id($report_cc_id) {
        $this->report_cc_id = $report_cc_id;
    }

    function setDaritanggal($daritanggal) {
        $this->daritanggal = $daritanggal;
    }

    function setSampaitanggal($sampaitanggal) {
        $this->sampaitanggal = $sampaitanggal;
    }

    function setDarijam($darijam) {
        $this->darijam = $darijam;
    }

    function setSampaijam($sampaijam) {
        $this->sampaijam = $sampaijam;
    }

    function setTipe_izin($tipe_izin) {
        $this->tipe_izin = $tipe_izin;
    }

    function setTipe_cuti($tipe_cuti) {
        $this->tipe_cuti = $tipe_cuti;
    }

    function setIs_halfday($is_halfday) {
        $this->is_halfday = $is_halfday;
    }

    function setTipe_tlk($tipe_tlk) {
        $this->tipe_tlk = $tipe_tlk;
    }

    function setLokasi_tlk($lokasi_tlk) {
        $this->lokasi_tlk = $lokasi_tlk;
    }

    function setTotal_hari($total_hari) {
        $this->total_hari = $total_hari;
    }

    function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    function setIs_approve($is_approve) {
        $this->is_approve = $is_approve;
    }

    function setIs_cancel($is_cancel) {
        $this->is_cancel = $is_cancel;
    }
    
    
    // added by Wulan Sari 2018.05.07
    function getIs_canceled() { 
        return boolval($this->is_canceled);
    }
    
    function setIs_canceled($is_canceled) {
        $this->is_canceled = $is_canceled;
    }
    // end added by Wulan Sari 2018.05.07
    

    //=================END SETTER===========================
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        
        if (isset($x['tlktype'])) {
            $this->setTlktype($x['tlktype']);
        }

        if (isset($x['absenttype'])) {
            $this->setAbsenttype($x['absenttype']);
        }
        if (isset($x['transaction_id'])) {
            $this->setId($x['transaction_id']);
        }
        if (isset($x['transaction_id'])) {
            $this->setTransaction_id($x['transaction_id']);
        }
        if (isset($x['employee_name'])) {
            $this->setEmployee_name($x['employee_name']);
        }
        if (isset($x['employee_nik'])) {
            $this->setEmployee_nik($x['employee_nik']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }

        if (isset($x['deptcode'])) {
            $this->setDeptcode($x['deptcode']);
        }

        if (isset($x['project_id'])) {
            $this->setProject_id($x['project_id']);
        }
        if (isset($x['pt_id'])) {
            $this->setPt_id($x['pt_id']);
        }
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }
        if (isset($x['transaksi_id_client'])) {
            $this->setTransaksi_id_client($x['transaksi_id_client']);
        }
        if (isset($x['for_transaction'])) {
            $this->setFor_transaction($x['for_transaction']);
        }
        if (isset($x['transaction_date'])) {
            $this->setTransaction_date($x['transaction_date']);
        }
        if (isset($x['report_hod_id'])) {
            $this->setReport_hod_id($x['report_hod_id']);
        }
        if (isset($x['report_cc_id'])) {
            $this->setReport_cc_id($x['report_cc_id']);
        }
        if (isset($x['daritanggal'])) {
            $this->setDaritanggal($x['daritanggal']);
        }
        if (isset($x['sampaitanggal'])) {
            $this->setSampaitanggal($x['sampaitanggal']);
        }
        if (isset($x['darijam'])) {
            $this->setDarijam($x['darijam']);
        }
        if (isset($x['start_time'])) {
            $this->setDarijam($x['darijam']);
        }
        if (isset($x['sampaijam'])) {
            $this->setSampaijam($x['sampaijam']);
        }
        if (isset($x['end_time'])) {
            $this->setSampaijam($x['sampaijam']);
        }
        if (isset($x['tipe_izin'])) {
            $this->setTipe_izin($x['tipe_izin']);
        }
        if (isset($x['tipe_cuti'])) {
            $this->setTipe_cuti($x['tipe_cuti']);
        }
        if (isset($x['is_halfday'])) {
            $this->setIs_halfday($x['is_halfday']);
        }
        if (isset($x['tipe_tlk'])) {
            $this->setTipe_tlk($x['tipe_tlk']);
        }
        if (isset($x['lokasi_tlk'])) {
            $this->setLokasi_tlk($x['lokasi_tlk']);
        }
        if (isset($x['total_hari'])) {
            $this->setTotal_hari($x['total_hari']);
        }
        if (isset($x['keterangan'])) {
            $this->setKeterangan($x['keterangan']);
        }
        if (isset($x['is_approve'])) {
            $this->setIs_approve($x['is_approve']);
        }
        if (isset($x['is_cancel'])) {
            $this->setIs_cancel($x['is_cancel']);
        }
        
        // added by Wulan Sari 2018.07.05
        if (isset($x['is_canceled'])) {
            $this->setIs_canceled($x['is_canceled']);
        }
        
        
        if (isset($x['is_process'])) {
            $this->setIs_process($x['is_process']);
        }
        if (isset($x['leavetype'])) {
            $this->setLeavetype($x['leavetype']);
        }
        if (isset($x['employee_employee_id'])) {
            $this->setEmployee_employee_id($x['employee_employee_id']);
        }
        if (isset($x['start_date'])) {
            $this->setStart_date($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setEnd_date($x['end_date']);
        }
        if (isset($x['absenttypegroup_absenttypegroup_id'])) {
            $this->setAbsenttypegroup_absenttypegroup_id($x['absenttypegroup_absenttypegroup_id']);
        }
        if (isset($x['absenttype_absenttype_id'])) {
            $this->setAbsenttype_absenttype_id($x['absenttype_absenttype_id']);
        }
        if (isset($x['absenttype_code'])) {
            $this->setAbsenttype_code($x['absenttype_code']);
        }
        if (isset($x['absentdetail_id'])) {
            $this->setAbsentdetail_id($x['absentdetail_id']);
        }
        if (isset($x['fromdate'])) {
            $this->setFromdate($x['fromdate']);
        }
        if (isset($x['untildate'])) {
            $this->setUntildate($x['untildate']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'transaction_id' => $this->getTransaction_id(),
            'project_id' => $this->getProject_id(),
            'pt_id' => $this->getPt_id(),
            'employee_id' => $this->getEmployee_id(),
            'transaksi_id_client' => $this->getTransaksi_id_client(),
            'for_transaction' => $this->getFor_transaction(),
            'transaction_date' => $this->getTransaction_date(),
            'report_hod_id' => $this->getReport_hod_id(),
            'report_cc_id' => $this->getReport_cc_id(),
            'daritanggal' => $this->getDaritanggal(),
            'sampaitanggal' => $this->getSampaitanggal(),
            'darijam' => $this->getDarijam(),
            'sampaijam' => $this->getSampaijam(),
            'start_time' => $this->getDarijam(),
            'end_time' => $this->getSampaijam(),
            'tipe_izin' => $this->getTipe_izin(),
            'tipe_cuti' => $this->getTipe_cuti(),
            'is_halfday' => $this->getIs_halfday(),
            'tipe_tlk' => $this->getTipe_tlk(),
            'lokasi_tlk' => $this->getLokasi_tlk(),
            'total_hari' => $this->getTotal_hari(),
            'keterangan' => $this->getKeterangan(),
            'is_approve' => $this->getIs_approve(),
            'is_cancel' => $this->getIs_cancel(),
            'is_canceled' => $this->getIs_canceled(), // added by Wulan Sari 2018.07.05
            'is_process' => $this->getIs_process(),
            'employee_name' => $this->getEmployee_name(),
            'employee_nik' => $this->getEmployee_nik(),
            'department' => $this->getDepartment(),
            'department_id' => $this->getDepartment_id(),
            'deptcode' => $this->getDeptcode(),
            'absenttype' => $this->getAbsenttype(),
            'leavetype' => $this->getLeavetype(),
            'tlktype' => $this->getTlktype(),
            'employee_employee_id' => $this->getEmployee_employee_id(),
            'start_date' => $this->getStart_date(),
            'end_date' => $this->getEnd_date(),
            'absenttypegroup_absenttypegroup_id' => $this->getAbsenttypegroup_absenttypegroup_id(),
            'absenttype_absenttype_id' => $this->getAbsenttype_absenttype_id(),
            'absenttype_code' => $this->getAbsenttype_code(),
            'absentdetail_id' => $this->getAbsentdetail_id(),
            'fromdate' => $this->getFromdate(),
            'untildate' => $this->getUntildate(),
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getDatefields() {
        return array('transaction_date', 'daritanggal', 'sampaitanggal', 'start_date', 'end_date','fromdate','untildate');
    }

}

?>
