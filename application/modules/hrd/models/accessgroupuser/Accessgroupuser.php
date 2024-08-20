<?php

class Hrd_Models_Accessgroupuser_Accessgroupuser extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
//class Hrd_Models_Accessgroupuser_Accessgroupuser extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $accessgroup_user_id;
    public $accessgroup_id;
    public $employee_id;
    public $employee_name;
    public $accessgroup;
    public $index_no;
    public $employee_nik;
    public $position;
    public $is_approve;
    public $is_reject;
    public $is_submitforapproval;
	public $approveon;
	public $rejecton;
	public $approveby_name;
	public $rejectby_name;
	
    /* END VARIABLE HEADER */
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');  
	$this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "accessgroupuser_";
        $this->detail = array();
    }

    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }

    public function getPtId() {
        return $this->session->getCurrentPtId();
    }
    
    public function getUserlogin() {
         return $this->session->getUserId();
    }
	
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		$project_id 	= $this->session->getCurrentProjectId();
		$pt_id 			= $this->session->getCurrentPtId();
        $this->setId(isset($x['accessgroup_user_id']) ? $x['accessgroup_user_id'] : 0);
        $this->project_id 		= isset($project_id) ? $project_id : 0;
        $this->pt_id 			= isset($pt_id) ? $pt_id : 0;
        $this->accessgroup_user_id 		= isset($x['accessgroup_user_id']) ? $x['accessgroup_user_id'] : 0;
        $this->employee_id 		= isset($x['employee_id']) ? $x['employee_id'] : 0;
        $this->accessgroup_id 	= isset($x['accessgroup_id']) ? $x['accessgroup_id'] : 0;
        $this->accessgroup 		= isset($x['accessgroup']) ? $x['accessgroup'] : 0;
        $this->index_no 		= isset($x['index_no']) ? $x['index_no'] : 0;
        $this->employee_name 	= isset($x['employee_name']) ? $x['employee_name'] : 0;
        $this->employee_nik 	= isset($x['employee_nik']) ? $x['employee_nik'] : 0;
        $this->position 		= isset($x['position']) ? $x['position'] : 0;
        $this->is_approve 	= isset($x['is_approve']) ? $x['is_approve'] : 0;
        $this->is_reject 		= isset($x['is_reject']) ? $x['is_reject'] : 0;
        $this->approveon = isset($x['approveon']) ? $x['approveon'] : 0;
        $this->rejecton = isset($x['rejecton']) ? $x['rejecton'] : 0;
        $this->approveby_name = isset($x['approveby_name']) ? $x['approveby_name'] : 0;
        $this->rejectby_name = isset($x['rejectby_name']) ? $x['rejectby_name'] : 0;
        $this->is_submitforapproval	= isset($x['is_submitforapproval']) ? $x['is_submitforapproval'] : 0;
        unset($x);
    }
	
    public function getArrayTable() {
        $x = array(
            'accessgroup_user_id'		=> $this->accessgroup_user_id,
            'accessgroup_id'=> $this->accessgroup_id,
            'project_id'	=> $this->project_id,
            'pt_id' 		=> $this->pt_id,
            'employee_id' 	=> $this->employee_id,
            'accessgroup' 	=> $this->accessgroup,
            'index_no' 		=> $this->index_no,
            'employee_name' => $this->employee_name,
            'employee_nik' 	=> $this->employee_nik,
            'position' 		=> $this->position,
            'is_approve' 	=> $this->is_approve,
            'is_reject' 	=> $this->is_reject,
            'approveon' 	=> $this->approveon,
            'rejecton'		=> $this->rejecton,
            'is_submitforapproval' 	=> $this->is_submitforapproval,
            'approveby_name'	=> $this->approveby_name,
            'rejectby_name'		=> $this->rejectby_name
        );
        return $x;
    }
	
    public function getaccessgroup_id() {
        return $this->accessgroup_id;
    }

    public function setaccessgroup_id($accessgroup_id) {
        $this->accessgroup_id = $accessgroup_id;
    }
	
    public function getaccessgroup() {
        return $this->accessgroup;
    }

    public function setaccessgroup($accessgroup) {
        $this->accessgroup = $accessgroup;
    }
	
    public function getIndex_no() {
        return $this->index_no;
    }

    public function setIndex_no($index_no) {
        $this->index_no = $index_no;
    }
	
    public function getEmployee_id() {
        return $this->employee_id;
    }

    public function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }
	
    public function getEmployee_name() {
        return $this->employee_name;
    }

    public function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }
	
    public function getEmployee_nik() {
        return $this->employee_nik;
    }

    public function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }
    public function getPosition() {
        return $this->position;
    }

    public function setPosition($position) {
        $this->position = $position;
    }
		
    public function getIs_approve() {
        return $this->is_approve;
    }

    public function setIs_approve($is_approve) {
        $this->is_approve = $is_approve;
    }
	
    public function getIs_reject() {
        return $this->is_reject;
    }
	
    public function setApproveon($approveon) {
        $this->approveon = $approveon;
    }
	
    public function getApproveon() {
        return $this->approveon;
    }

    public function setRejecton($rejecton) {
        $this->rejecton = $rejecton;
    }
	
    public function getRejecton() {
        return $this->rejecton;
    }

    public function setIs_reject($is_reject) {
        $this->is_reject = $is_reject;
    }
	
    public function getIs_submitforapproval() {
        return $this->is_submitforapproval;
    }

    public function setIs_submitforapproval($is_submitforapproval) {
        $this->is_submitforapproval = $is_submitforapproval;
    }
		
    public function getApproveby_name() {
        return $this->approveby_name;
    }

    public function setApproveby_name($approveby_name) {
        $this->approveby_name = $approveby_name;
    }
		
    public function getRejectby_name() {
        return $this->rejectby_name;
    }

    public function setRejectby_name($rejectby_name) {
        $this->rejectby_name = $rejectby_name;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
	
    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    public function getArray() {
        return $this->getArrayTable();
    }

    public function getDatefields() {
        return array();
    }
	
    function get_mail() {
        return $this->_mail;
    }
}

?>