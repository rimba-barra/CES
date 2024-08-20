<?php

class Hrd_Models_Performancemanagement_Monitoringmatrixdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

    public $accessmatrix_id;
    public $accesslevel_id;
	public $employee_id;
	public $employee_nik;
	public $employee_name;
	public $status;
	public $content;
	public $score;
	public $comment_general;
	public $comment_private;
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
        $this->embedPrefix = "monitoringmatrix_";
        $this->detail = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['accessmatrix_id']) ? $x['accessmatrix_id'] : 0);
        $this->accessmatrix_id = isset($x['accessmatrix_id']) ? $x['accessmatrix_id'] : 0;
        $this->accesslevel_id = isset($x['accesslevel_id']) ? $x['accesslevel_id'] : 0;
        $this->employee_id = isset($x['employee_id']) ? $x['employee_id'] : 0;
        $this->employee_nik = isset($x['employee_nik']) ? $x['employee_nik'] : 0;
        $this->employee_name = isset($x['employee_name']) ? $x['employee_name'] : 0;
        $this->status = isset($x['status']) ? $x['status'] : 0;
        $this->content = isset($x['content']) ? $x['content'] : 0;
        $this->score = isset($x['score']) ? $x['score'] : 0;
        $this->comment_general = isset($x['comment_general']) ? $x['comment_general'] : 0;
        $this->comment_private = isset($x['comment_private']) ? $x['comment_private'] : 0;
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
            'accessmatrix_id' => $this->getId(),
            'accesslevel_id' => $this->accesslevel_id,
            'employee_id' => floatval($this->employee_id),
            'employee_nik' => $this->employee_nik,
            'employee_name' => $this->employee_name,
            'status' => $this->status,
            'content' => $this->content,
            'score' => $this->score,
            'comment_general' => $this->comment_general,
            'comment_private' => $this->comment_private,
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