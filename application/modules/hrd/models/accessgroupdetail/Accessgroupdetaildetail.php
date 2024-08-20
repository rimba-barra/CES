<?php

class Hrd_Models_Accessgroupdetail_Accessgroupdetaildetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

    public $accessgroup_detail_id;
    public $accessgroup_id;
	public $group_id;
	public $group;
	public $is_approve;
	public $approveon;
	public $is_reject;
	public $rejecton;
	public $deleted;
	public $is_submitforapproval;
	public $approveby_name;
	public $rejectby_name;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "accessgroupdetail_";
        $this->detail = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['accessgroup_detail_id']) ? $x['accessgroup_detail_id'] : 0);
        $this->accessgroup_detail_id = isset($x['accessgroup_detail_id']) ? $x['accessgroup_detail_id'] : 0;
        $this->accessgroup_id = isset($x['accessgroup_id']) ? $x['accessgroup_id'] : 0;
        $this->group_id = isset($x['group_id']) ? $x['group_id'] : 0;
        $this->group = isset($x['group']) ? $x['group'] : 0;
        $this->is_approve = isset($x['is_approve']) ? $x['is_approve'] : 0;
        $this->approveon = isset($x['approveon']) ? $x['approveon'] : 0;
        $this->is_reject = isset($x['is_reject']) ? $x['is_reject'] : 0;
        $this->rejecton = isset($x['rejecton']) ? $x['rejecton'] : 0;
        $this->deleted = isset($x['deleted']) ? $x['deleted'] : 0;
        $this->is_submitforapproval = isset($x['is_submitforapproval']) ? $x['is_submitforapproval'] : 0;
        $this->approveby_name = isset($x['approveby_name']) ? $x['approveby_name'] : 0;
        $this->rejectby_name = isset($x['rejectby_name']) ? $x['rejectby_name'] : 0;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'accessgroup_detail_id' => $this->getId(),
            'accessgroup_id' => $this->accessgroup_id,
            'group_id' => floatval($this->group_id),
            'group' => $this->group,
            'is_approve' => $this->is_approve,
            'approveon' => $this->approveon,
            'is_reject' => $this->is_reject,
            'rejecton' => $this->rejecton,
            'deleted' => $this->deleted,
            'is_submitforapproval' => $this->is_submitforapproval,
            'approveby_name'	=> $this->approveby_name,
            'rejectby_name'		=> $this->rejectby_name
        );

        return $x;
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

    public function addDetail($param) {
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

}

?>