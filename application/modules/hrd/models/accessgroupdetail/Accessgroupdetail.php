<?php

class Hrd_Models_Accessgroupdetail_Accessgroupdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
//class Hrd_Models_Performancemanagement_Monitoringmatrix extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $accessgroup_id;
    public $accessgroup;
    public $index_no;

    /* START VARIABLE DETAIL */
    private $detail;
    private $DCResult;
    public $group_id;
    public $group;
    public $deleted;
    public $is_submitforapproval;
    /* END VARIABLE DETAIL */

	
    /* END VARIABLE HEADER */
	
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');  
		$this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "accessgroupdetail_";
        $this->detail = array();
    }

    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }
	
    public function getPtId() {
        return $this->session->getCurrentPtId();
    }
    
    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }
	
    public function getUserlogin() {
         return $this->session->getUserId();
    }
	
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		$project_id 	= $this->session->getCurrentProjectId();
		$pt_id 			= $this->session->getCurrentPtId();
        $this->setId(isset($x['accessgroup_id']) ? $x['accessgroup_id'] : 0); // penting
        $this->project_id 		= isset($project_id) ? $project_id : 0;
        $this->pt_id 			= isset($pt_id) ? $pt_id : 0;
        $this->accessgroup_id 	= isset($x['accessgroup_id']) ? $x['accessgroup_id'] : 0;
        $this->accessgroup 		= isset($x['accessgroup']) ? $x['accessgroup'] : 0;
        $this->index_no 		= isset($x['index_no']) ? $x['index_no'] : 0;
        unset($x);
    }
	
    public function getArrayTable() {
        $x = array(
            'accessgroup_id'=> $this->accessgroup_id,
            'project_id'	=> $this->project_id,
            'pt_id' 		=> $this->pt_id,
            'accessgroup' 	=> $this->accessgroup,
            'index_no' 		=> $this->index_no
        );
        return $x;
    }
	
    public function getIndex_no() {
        return $this->index_no;
    }

    public function setIndex_no($index_no) {
        $this->index_no = $index_no;
    }
	
    public function getAccessgroup_id() {
        return $this->accessgroup_id;
    }

    public function setAccessgroup_id($accessgroup_id) {
        $this->accessgroup_id = $accessgroup_id;
    }
	
    public function getAccessgroup() {
        return $this->accessgroup;
    }

    public function setAccessgroup($accessgroup) {
        $this->accessgroup = $accessgroup;
    }
	
    public function getEmployee_name() {
        return $this->group;
    }

    public function setEmployee_name($group) {
        $this->group = $group;
    }
	
    public function getEmployee_nik() {
        return $this->employee_nik;
    }

    public function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }
	
    public function getEmployee_id() {
        return $this->group_id;
    }

    public function setEmployee_id($group_id) {
        $this->group_id = $group_id;
    }
	
    public function getIs_submitforapproval() {
        return $this->is_submitforapproval;
    }

    public function setIs_submitforapproval($is_submitforapproval) {
        $this->is_submitforapproval = $is_submitforapproval;
    }
		
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail(Hrd_Models_Accessgroupdetail_Accessgroupdetaildetail $param) {
        $this->detail[] = $param;
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
    
    public function getDetail($index = -1) {
        if ($index >= 0) {
            return $this->detail[$index];
        } else {
            return $this->detail;
        }
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