<?php

class Hrd_Models_Organizationchart_Organizationchartdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

    public $organizationchart_id;
    public $organizationchart_detail_id;
    public $position_id;
    public $position;
    public $parent_id;
    public $parentposition;
    public $orglevel;
    public $order_no;
    public $description;
    public $isbetween;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "organizationchartdetail_";
        $this->detail = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['organizationchart_detail_id']) ? $x['organizationchart_detail_id'] : 0);
        $this->organizationchart_id = isset($x['organizationchart_id']) ? $x['organizationchart_id'] : 0;
        $this->organizationchart_detail_id = isset($x['organizationchart_detail_id']) ? $x['organizationchart_detail_id'] : 0;
        $this->position_id = isset($x['position_id']) ? $x['position_id'] : 0;
        $this->position = isset($x['position']) ? $x['position'] : 0;
        $this->parent_id = isset($x['parent_id']) ? $x['parent_id'] : 0;
        $this->parentposition = isset($x['parentposition']) ? $x['parentposition'] : 0;
        $this->orglevel = isset($x['orglevel']) ? $x['orglevel'] : 0;
        $this->order_no = isset($x['order_no']) ? $x['order_no'] : 0;
        $this->description = isset($x['description']) ? $x['description'] : 0;
        $this->isbetween = isset($x['isbetween']) ? $x['isbetween'] : 0;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'organizationchart_detail_id' => $this->getId(),
            'organizationchart_id' => $this->organizationchart_id,
            'position_id' => $this->position_id,
            'position' => $this->position,
            'parent_id' => $this->parent_id,
            'parentposition' => $this->parentposition,
            'orglevel' => $this->orglevel,
            'order_no' => $this->order_no,
            'description' => $this->description,
            'isbetween' => $this->isbetween
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