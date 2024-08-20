<?php

class Hrd_Models_Master_Scoringbsc_Scoringbsc extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $header_id;
    public $detail_id;
    public $year;
    /* END VARIABLE HEADER */
	
    /* START VARIABLE DETAIL */
    private $detail;
    private $DCResult;
    public $rating;
    public $batas_bawah;
    public $batas_atas;
    public $interval;
    public $rating_range;

    /* END VARIABLE DETAIL */

    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "scoringbsc_";
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
        $this->setId(isset($x['scoringbsc_id']) ? $x['scoringbsc_id'] : 0);
        $this->header_id = isset($x['scoringbsc_id']) ? $x['scoringbsc_id'] : 0;
        $this->detail_id = isset($x['scoringbsc_detail_id']) ? $x['scoringbsc_detail_id'] : 0;
        $this->year = isset($x['year']) ? $x['year'] : 0;
        $this->rating = isset($x['rating']) ? $x['rating'] : 0;
        $this->batas_atas = isset($x['batas_atas']) ? $x['batas_atas'] : 0;
        $this->batas_bawah = isset($x['batas_bawah']) ? $x['batas_bawah'] : 0;
        $this->interval = isset($x['interval']) ? $x['interval'] : 0;
        $this->rating_range = isset($x['rating_range']) ? $x['rating_range'] : '';
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'scoringbsc_id' => $this->header_id,
            'scoringbsc_detail_id' => $this->detail_id,
            'project_id' => $this->session->getCurrentProjectId(),
            'year' => $this->year,
            'rating' => $this->rating,
            'batas_atas' => $this->batas_atas,
            'batas_bawah' => $this->batas_bawah,
            'interval' => $this->interval,
            'rating_range' => $this->rating_range
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail(Hrd_Models_Master_Scoringbsc_Scoringbscdetail $param) {
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