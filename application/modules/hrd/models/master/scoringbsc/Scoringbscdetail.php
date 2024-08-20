<?php

class Hrd_Models_Master_Scoringbsc_Scoringbscdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

    public $scoringbsc_id;
    public $rating;
    public $batas_bawah;
    public $batas_atas;
    public $interval;
    public $deleted;
    public $rating_range;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "scoringbsc_";
        $this->detail = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['scoringbsc_detail_id']) ? $x['scoringbsc_detail_id'] : 0);
        $this->scoringbsc_id = isset($x['scoringbsc_id']) ? $x['scoringbsc_id'] : 0;
        $this->rating = isset($x['rating']) ? $x['rating'] : 0;
        $this->batas_bawah = isset($x['batas_bawah']) ? $x['batas_bawah'] : 0;
        $this->batas_atas = isset($x['batas_atas']) ? $x['batas_atas'] : 0;
        $this->interval = isset($x['interval']) ? $x['interval'] : 0;
        $this->rating_range = isset($x['rating_range']) ? $x['rating_range'] : '';
        $this->deleted = isset($x['deleted']) ? $x['deleted'] : 0;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'scoringbsc_detail_id' => $this->getId(),
            'rating' => floatval($this->rating),
            'batas_atas' => floatval($this->batas_atas),
            'batas_bawah' => floatval($this->batas_bawah),
            'interval' => floatval($this->interval),
            'rating_range' => $this->rating_range,
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