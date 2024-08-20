<?php

class Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $header_id;
    public $detail_id;
    public $name;
    /* END VARIABLE HEADER */
	
    /* START VARIABLE DETAIL */
    private $detail;
    private $DCResult;
    public $employee_id;
    public $employee_name;
    /* END VARIABLE DETAIL */

    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "kelompokabsensi_";
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
        $this->setId(isset($x['kelompokabsensi_id']) ? $x['kelompokabsensi_id'] : 0);
        $this->header_id = isset($x['kelompokabsensi_id']) ? $x['kelompokabsensi_id'] : 0;
        $this->detail_id = isset($x['kelompokabsensi_detail_id']) ? $x['kelompokabsensi_detail_id'] : 0;
        $this->name = isset($x['name']) ? $x['name'] : 0;
        $this->employee_id = isset($x['employee_id']) ? $x['employee_id'] : 0;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'kelompokabsensi_id' => $this->header_id,
            'kelompokabsensi_detail_id' => $this->detail_id,
            'project_id' => $this->session->getCurrentProjectId(),
            'name' => $this->name,
            'employee_id' => $this->employee_id
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail(Hrd_Models_Master_Kelompokabsensi_Kelompokabsensidetail $param) {
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