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
class Hrd_Models_Intranet_Overtime extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id_ces;
    public $employee_id_ces;
    private $project_id_ces;
    private $pt_id_ces;
    private $department_id_ces;
    private $department;
    private $lembur_id;
    private $pt_id_intranet;
    private $project_id_intranet;
    private $department_id_intranet;
    private $employee_id_intranet;
    private $assign_to; //karyawan yang approve
    private $lemburtype_id;
    private $lemburtype;
    private $lembur_dari;
    private $lembur_sampai;
    private $lembur_dari_plan;
    private $lembur_sampai_plan;
    private $description;
    private $email_cc;  //harus di explode,bernilai ID
    private $status;
    private $hrd_comment;
    private $comment_date;
    private $hrd_check;
    private $email;  //kondisi kirim email,default 0 = belum di terkirim email
    private $revisi;  //kondisi kirim di revisi, default 0 = belum di revisi
    private $rev_dari;
    private $rev_sampai;
    private $rev_keterangan;
    private $setup;
    private $fromdate;
    private $untildate;
    private $approve_by;
    private $start_date;
    private $end_date;
    private $name;
    private $nik;
    private $configintranet;
    private $lemburtypedesc;
    private $employee_id_approve;
    private $hire_date;
    private $position;
    private $tugas_id;
    
    private $shifttype;
    private $shifttype_id;
    private $absent_id;
    private $absentdetail_id;
    private $holyday;
    private $in_time;
    private $out_time;
    private $time_in;
    private $time_out;
    private $employee_nik;
    private $employee_name;
    private $deptcode;
    private $overtimedate;
    private $days;
    private $different_day_out;
    private $time_in_plan;
    private $time_out_plan;
    private $jam_lembur_approve;
    private $tgl_close;
    private $time_in_absensi;
    private $time_out_absensi;
    
    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "intranet_";
        $this->setup = new Hrd_Models_General_Setup();
    }
    
    function getDifferent_day_out() {
        return $this->different_day_out;
    }

    function setDifferent_day_out($different_day_out) {
        $this->different_day_out = $different_day_out;
    }

        
    function getDays() {
        return $this->days;
    }

    function setDays($days) {
        $this->days = $days;
    }

        function getOvertimedate() {
        return $this->overtimedate;
    }

    function setOvertimedate($overtimedate) {
        $this->overtimedate = $overtimedate;
    }

        
    function getDeptcode() {
        return strval($this->deptcode);
    }

    function setDeptcode($deptcode) {
        $this->deptcode = $deptcode;
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

        
    function getTugas_id() {
        return $this->tugas_id;
    }

    function setTugas_id($tugas_id) {
        $this->tugas_id = $tugas_id;
    }

        function getPosition() {
        return $this->position;
    }

    function setPosition($position) {
        $this->position = $position;
    }        
    
    function getHire_date() {
        return $this->hire_date;
    }

    function setHire_date($hire_date) {
        $this->hire_date = $hire_date;
    }

        
    function getLemburtype() {
        return $this->lemburtype;
    }

    function setLemburtype($lemburtype) {
        $this->lemburtype = $lemburtype;
    }

        function getEmployee_id_approve() {
        return intval($this->employee_id_approve);
    }

    function setEmployee_id_approve($employee_id_approve) {
        $this->employee_id_approve = $employee_id_approve;
    }

        
    function getLemburtypedesc() {
        return strval($this->lemburtypedesc);
    }

    function setLemburtypedesc($lemburtypedesc) {
        $this->lemburtypedesc = $lemburtypedesc;
    }

    
    function getConfigintranet() {
        return strval($this->configintranet);
    }

    function setConfigintranet($configintranet) {
        $this->configintranet = $configintranet;
    }

    function getName() {
        return strval($this->name);
    }

    function getNik() {
        return strval($this->nik);
    }

    function setName($name) {
        $this->name = $name;
    }

    function setNik($nik) {
        $this->nik = $nik;
    }

    function getDepartment() {
        return strval($this->department);
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function getStart_date() {
        return date('Y-m-d', strtotime($this->start_date));
    }

    function getEnd_date() {
        return date('Y-m-d', strtotime($this->end_date));
    }

    function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    function setEnd_date($end_date) {
        $this->end_date = $end_date;
    }

    function getApprove_by() {
        return strval($this->approve_by);
    }

    function setApprove_by($approve_by) {
        $this->approve_by = $approve_by;
    }

    function getFromdate() {
        return date('Y-m-d', strtotime($this->fromdate));
    }

    function getUntildate() {
        return date('Y-m-d', strtotime($this->untildate));
    }

    function setFromdate($fromdate) {
        $this->fromdate = $fromdate;
    }

    function setUntildate($untildate) {
        $this->untildate = $untildate;
    }

    function getDepartment_id_ces() {
        return intval($this->department_id_ces);
    }

    function setDepartment_id_ces($department_id_ces) {
        $this->department_id_ces = $department_id_ces;
    }

    function getUser_id_ces() {
        $setup = new Hrd_Models_General_Setup();
        return $setup->_user_id;
    }

    function getEmployee_id_ces() {
        return $this->employee_id_ces;
    }

    function getProject_id_ces() {
         $setup = new Hrd_Models_General_Setup();
        return $setup->_project_id;
    }

    function getPt_id_ces() {
        $setup = new Hrd_Models_General_Setup();
        return $setup->_pt_id;
    }

    function setEmployee_id_ces($employee_id_ces) {
        $this->employee_id_ces = $employee_id_ces;
    }

    function getLembur_id() {
        //return intval($this->lembur_id); comment by wulan sari karena lembur_id bisa lebih dari 1 dengan separator koma
        return $this->lembur_id;
    }

    function getPt_id_intranet() {
        return intval($this->pt_id_intranet);
    }

    function getProject_id_intranet() {
        return intval($this->project_id_intranet);
    }

    function getDepartment_id_intranet() {
        return intval($this->department_id_intranet);
    }

    function getEmployee_id_intranet() {
        return intval($this->employee_id_intranet);
    }

    function getAssign_to() {
        return intval($this->assign_to);
    }

    function getLemburtype_id() {
        return intval($this->lemburtype_id);
    }

    function getLembur_dari() {
        return strval($this->lembur_dari);
    }

    function getLembur_sampai() {
        return strval($this->lembur_sampai);
    }

    function getDescription() {
        return strval($this->description);
    }

    function getEmail_cc() {
        return strval($this->email_cc);
    }

    function getStatus() {
        return strval($this->status);
    }

    function getHrd_comment() {
        return strval($this->hrd_comment);
    }

    function getComment_date() {
        return date('Y-m-d H:i:s', strtotime($this->comment_date));
    }

    function getHrd_check() {
        return strval($this->hrd_check);
    }

    function getEmail() {
        return intval($this->email);
    }

    function getRevisi() {
        return intval($this->revisi);
    }

    function getRev_dari() {
        return date('Y-m-d H:i:s', strtotime($this->rev_dari));
    }

    function getRev_sampai() {
        return date('Y-m-d H:i:s', strtotime($this->rev_sampai));
    }

    function getRev_keterangan() {
        return strval($this->rev_keterangan);
    }

    function setLembur_id($lembur_id) {
        $this->lembur_id = $lembur_id;
    }

    function setPt_id_intranet($pt_id_intranet) {
        $this->pt_id_intranet = $pt_id_intranet;
    }

    function setProject_id_intranet($project_id_intranet) {
        $this->project_id_intranet = $project_id_intranet;
    }

    function setDepartment_id_intranet($department_id_intranet) {
        $this->department_id_intranet = $department_id_intranet;
    }

    function setEmployee_id_intranet($employee_id_intranet) {
        $this->employee_id_intranet = $employee_id_intranet;
    }

    function setAssign_to($assign_to) {
        $this->assign_to = $assign_to;
    }

    function setLemburtype_id($lemburtype_id) {
        $this->lemburtype_id = $lemburtype_id;
    }

    function setLembur_dari($lembur_dari) {
        $this->lembur_dari = $lembur_dari;
    }

    function setLembur_sampai($lembur_sampai) {
        $this->lembur_sampai = $lembur_sampai;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setEmail_cc($email_cc) {
        $this->email_cc = $email_cc;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setHrd_comment($hrd_comment) {
        $this->hrd_comment = $hrd_comment;
    }

    function setComment_date($comment_date) {
        $this->comment_date = $comment_date;
    }

    function setHrd_check($hrd_check) {
        $this->hrd_check = $hrd_check;
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setRevisi($revisi) {
        $this->revisi = $revisi;
    }

    function setRev_dari($rev_dari) {
        $this->rev_dari = $rev_dari;
    }

    function setRev_sampai($rev_sampai) {
        $this->rev_sampai = $rev_sampai;
    }

    function setRev_keterangan($rev_keterangan) {
        $this->rev_keterangan = $rev_keterangan;
    }
    
    
    function getShifttype() {
        return strval($this->shifttype);
    }

    function getShifttype_id() {
        return intval($this->shifttype_id);
    }

    function getAbsent_id() {
        return intval($this->absent_id);
    }

    function getAbsentdetail_id() {
        return intval($this->absentdetail_id);
    }

    function getHolyday() {
        return boolval($this->holyday);
    }

    function getIn_time() {
        return strval($this->in_time);
    }

    function getOut_time() {
        return strval($this->out_time);
    }

    function getTime_in() {
        return strval($this->time_in);
    }

    function getTime_out() {
        return strval($this->time_out);
    }

    function setShifttype($shifttype) {
        $this->shifttype = $shifttype;
    }

    function setShifttype_id($shifttype_id) {
        $this->shifttype_id = $shifttype_id;
    }

    function setAbsent_id($absent_id) {
        $this->absent_id = $absent_id;
    }

    function setAbsentdetail_id($absentdetail_id) {
        $this->absentdetail_id = $absentdetail_id;
    }

    function setHolyday($holyday) {
        $this->holyday = $holyday;
    }

    function setIn_time($in_time) {
        $this->in_time = $in_time;
    }

    function setOut_time($out_time) {
        $this->out_time = $out_time;
    }

    function setTime_in($time_in) {
        $this->time_in = $time_in;
    }

    function setTime_out($time_out) {
        $this->time_out = $time_out;
    }

    function getTime_in_plan() {
        return $this->time_in_plan;
    }

    function getTime_out_plan() {
        return $this->time_out_plan;
    }

    function setTime_in_plan($time_in_plan) {
        $this->time_in_plan = $time_in_plan;
    }

    function setTime_out_plan($time_out_plan) {
        $this->time_out_plan = $time_out_plan;
    }
    
    function setTgl_close($tgl_close) {
        $this->tgl_close = $tgl_close;
    }

    function getTgl_close() {
        return $this->tgl_close;
    }
    
    // added by wulan sari 201900904    
    public function getJam_lembur_approve() {
        return $this->jam_lembur_approve;
    }

    public function setJam_lembur_approve($jam_lembur_approve) {
        $this->jam_lembur_approve = $jam_lembur_approve;
    }    
    // end added by wulan sari 20190904
    
    
    // added by wulan sari 20200617    
    function getTime_in_absensi() {
        return $this->time_in_absensi;
    }
    
    function setTime_in_absensi($time_in_absensi) {
        $this->time_in_absensi = $time_in_absensi;
    }
    
    function getTime_out_absensi() {
        return $this->time_out_absensi;
    }
    
    function setTime_out_absensi($time_out_absensi) {
        $this->time_out_absensi = $time_out_absensi;
    }
    // end added by wulan sari 20200617
    
    
    //=================START GETTER===========================    
    function rangeDate($startdate, $enddate) {
        $dates = array();
        $proceeddate = $startdate;
        while ($proceeddate <= $enddate) {
            $date = $proceeddate;
            $dates[] = $date;
            $proceeddate = date('Y-m-d', strtotime("+1 day", strtotime($date)));
        }
        return implode("~", $dates);
    }

    //=================END SETTER===========================
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['employee_id_ces'])) {
            $this->setEmployee_id_ces($x['employee_id_ces']);
        }
        if (isset($x['department_id_ces'])) {
            $this->setDepartment_id_ces($x['department_id_ces']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['lembur_id'])) {
            $this->setLembur_id($x['lembur_id']);
        }
        if (isset($x['project_id_intranet'])) {
            $this->setProject_id_intranet($x['project_id_intranet']);
        }
        if (isset($x['pt_id_intranet'])) {
            $this->setPt_id_intranet($x['pt_id_intranet']);
        }
        if (isset($x['department_id_intranet'])) {
            $this->setDepartment_id_intranet($x['department_id_intranet']);
        }
        if (isset($x['employee_id_intranet'])) {
            $this->setEmployee_id_intranet($x['employee_id_intranet']);
        }
        if (isset($x['assign_to'])) {
            $this->setAssign_to($x['assign_to']);
        }
        if (isset($x['lemburtype_id'])) {
            $this->setLemburtype_id($x['lemburtype_id']);
        }
        if (isset($x['lembur_dari'])) {
            $this->setLembur_dari($x['lembur_dari']);
        }
        if (isset($x['lembur_sampai'])) {
            $this->setLembur_sampai($x['lembur_sampai']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['email_cc'])) {
            $this->setEmail_cc($x['email_cc']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['hrd_comment'])) {
            $this->setHrd_comment($x['hrd_comment']);
        }
        if (isset($x['comment_date'])) {
            $this->setComment_date($x['comment_date']);
        }
        if (isset($x['hrd_check'])) {
            $this->setHrd_check($x['hrd_check']);
        }
        if (isset($x['email'])) {
            $this->setEmail($x['email']);
        }
        if (isset($x['rev_dari'])) {
            $this->setRev_dari($x['rev_dari']);
        }
        if (isset($x['rev_sampai'])) {
            $this->setRev_sampai($x['rev_sampai']);
        }

        if (isset($x['rev_keterangan'])) {
            $this->setRev_keterangan($x['rev_keterangan']);
        }
        if (isset($x['fromdate'])) {
            $this->setFromdate($x['fromdate']);
        }
        if (isset($x['untildate'])) {
            $this->setUntildate($x['untildate']);
        }
        if (isset($x['approve_by'])) {
            $this->setApprove_by($x['approve_by']);
        }
        if (isset($x['start_date'])) {
            $this->setStart_date($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setEnd_date($x['end_date']);
        }
        if (isset($x['name'])) {
            $this->setName($x['name']);
        }
        if (isset($x['nik'])) {
            $this->setNik($x['nik']);
        }
        if (isset($x['lemburtypedesc'])) {
            $this->setLemburtypedesc($x['lemburtypedesc']);
        }
        if (isset($x['lemburtype'])) {
            $this->setLemburtype($x['lemburtype']);
        }
        if (isset($x['hire_date'])) {
            $this->setHire_date($x['hire_date']);
        }
        if (isset($x['position'])) {
            $this->setPosition($x['position']);
        }
        if (isset($x['tugas_id'])) {
            $this->setTugas_id($x['tugas_id']);
        }
        
        if (isset($x['shifttype'])) {
            $this->setShifttype($x['shifttype']);
        }
        if (isset($x['shifttype_id'])) {
            $this->setShifttype_id($x['shifttype_id']);
        }
      
        if (isset($x['absent_id'])) {
            $this->setAbsent_id($x['absent_id']);
        }
        if (isset($x['absentdetail_id'])) {
            $this->setAbsentdetail_id($x['absentdetail_id']);
        }
        if (isset($x['holyday'])) {
            $this->setHolyday($x['holyday']);
        }
        if (isset($x['in_time'])) {
            $this->setIn_time($x['in_time']);
        }        
        if (isset($x['out_time'])) {
            $this->setOut_time($x['out_time']);
        }
        if (isset($x['time_in'])) {
            $this->setTime_in($x['time_in']);
        }
        if (isset($x['time_out'])) {
            $this->setTime_out($x['time_out']);
        }    
        if (isset($x['employee_nik'])) {
            $this->setEmployee_nik($x['employee_nik']);
        }    
        if (isset($x['employee_name'])) {
            $this->setEmployee_name($x['employee_name']);
        }    
        if (isset($x['deptcode'])) {
            $this->setDeptcode($x['deptcode']);
        }    
        if (isset($x['overtimedate'])) {
            $this->setOvertimedate($x['overtimedate']);
        }    
        if (isset($x['days'])) {
            $this->setDays($x['days']);
        }    
        if (isset($x['configintranet'])) {
            $this->setConfigintranet($x['configintranet']);
        }        
        if (isset($x['time_in_plan'])) {
            $this->setTime_in_plan($x['time_in_plan']);
        }    
        if (isset($x['time_out_plan'])) {
            $this->setTime_out_plan($x['time_out_plan']);
        }    
        if (isset($x['jam_lembur_approve'])) {
            $this->setJam_lembur_approve($x['jam_lembur_approve']);
        }    
        if (isset($x['tgl_close'])) {
            $this->setTgl_close($x['tgl_close']);
        }    
        
        //added by wulan sari 20200617  
        if (isset($x['time_in_absensi'])) {
            $this->setTime_in_absensi($x['time_in_absensi']);
        }
        if (isset($x['time_out_absensi'])) {
            $this->setTime_out_absensi($x['time_out_absensi']);
        }    

        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            'configintranet' => strval($this->getConfigintranet()),
            'user_id_ces' => $this->getUser_id_ces(),
            'employee_id_ces' => intval($this->getEmployee_id_ces()),
            'project_id_ces' => intval($this->getProject_id_ces()),
            'pt_id_ces' => intval($this->getPt_id_ces()),
            'department_id_ces' => intval($this->getDepartment_id_ces()),
            'department' => $this->getDepartment(),
            'lembur_id' => $this->getLembur_id(),
            'pt_id_intranet' => $this->getPt_id_intranet(),
            'project_id_intranet' => $this->getProject_id_intranet(),
            'department_id_intranet' => $this->getProject_id_intranet(),
            'employee_id_intranet' => $this->getEmployee_id_intranet(),
            'assign_to' => $this->getAssign_to(),
            'lemburtype_id' => $this->getLemburtype_id(),
            'lembur_dari' => $this->getLembur_dari(),
            'lembur_sampai' => $this->getLembur_sampai(),
            'description' => $this->getDescription(),
            'email_cc' => $this->getEmail_cc(),
            'status' => $this->getStatus(),
            'hrd_comment' => $this->getHrd_comment(),
            'comment_date' => $this->getComment_date(),
            'hrd_check' => $this->getHrd_check(),
            'email' => $this->getEmail(),
            'rev_dari' => $this->getRev_dari(),
            'rev_sampai' => $this->getRev_sampai(),
            'rev_keterangan' => $this->getRev_keterangan(),
            'fromdate' => $this->getFromdate(),
            'untildate' => $this->getUntildate(),
            'approve_by' => $this->getApprove_by(),
            'start_date' => $this->getStart_date(),
            'end_date' => $this->getEnd_date(),
            'name' => $this->getName(),
            'nik' => $this->getNik(),
            'lemburtypedesc' => $this->getLemburtypedesc(),
            'lemburtype' => $this->getLemburtype(),
            'hire_date' => $this->getHire_date(),
            'position' => $this->getPosition(),
            'tugas_id' => $this->getTugas_id(),
            'shifttype' => $this->getShifttype(),
            'shifttype_id' => $this->getShifttype_id(),
            'absent_id' => $this->getAbsent_id(),
            'absentdetail_id' => $this->getAbsentdetail_id(),
            'holyday' => $this->getHolyday(),
            'in_time' => $this->getIn_time(),
            'out_time' => $this->getOut_time(),
            'time_in' => $this->getTime_in(),
            'time_out' => $this->getTime_out(),
            'employee_nik' => $this->getEmployee_nik(),
            'employee_name' => $this->getEmployee_name(),
            'deptcode' => $this->getDeptcode(),
            'overtimedate' => $this->getOvertimedate(),
            'days' => $this->getDays(),
            'different_day_out' => $this->getDifferent_day_out(),
            'time_in_plan' => $this->getTime_in_plan(),
            'time_out_plan' => $this->getTime_out_plan(),
            'jam_lembur_approve'=>$this->getJam_lembur_approve(),
            'tgl_close'=>$this->getTgl_close(),
            'time_in_absensi' => $this->getTime_in_absensi(), //added by wulan sari 20200617
            'time_out_absensi' => $this->getTime_out_absensi() //added by wulan sari 20200617
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
        return array('comment_date', 'lembur_dari', 'lembur_sampai', 'rev_dari', 'rev_sampai','hire_date');
    }

}

?>
