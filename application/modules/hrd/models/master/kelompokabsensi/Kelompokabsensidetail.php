<?php

class Hrd_Models_Master_Kelompokabsensi_Kelompokabsensidetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

    public $kelompokabsensi_id;
    public $employee_id;
    public $employee_name;
    public $employee_nik;
    public $department;
    public $deleted;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "kelompokabsensi_";
        $this->detail = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['kelompokabsensi_detail_id']) ? $x['kelompokabsensi_detail_id'] : 0);
        $this->kelompokabsensi_id = isset($x['kelompokabsensi_id']) ? $x['kelompokabsensi_id'] : 0;
        $this->employee_id = isset($x['employee_id']) ? $x['employee_id'] : 0;
        $this->employee_name = isset($x['employee_name']) ? $x['employee_name'] : 0;
        $this->department = isset($x['department']) ? $x['department'] : 0;
        $this->employee_nik = isset($x['employee_nik']) ? $x['employee_nik'] : 0;
        $this->deleted = isset($x['deleted']) ? $x['deleted'] : 0;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'kelompokabsensi_detail_id' => $this->getId(),
            'employee_id' => floatval($this->employee_id),
            'employee_name' => $this->employee_name,
            'department' => $this->department,
            'employee_nik' => $this->employee_nik,
            'deleted' => $this->deleted
        );
        return $x;
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