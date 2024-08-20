<?php

class Hrd_Models_Performancemanagement_MatrixCompetency extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried{
    public $bandid;
    public $bandname;
    public $compid;
    public $levelid;
    public $levelname;
    public $deleted;
    public $jobid;
    public $jobname;
    private $DCResult;
    private $detail;
    public $headerid;
    public $matrixcompetency_id;

    public $compcat;
    public $compnam;
    public $lvlname;
    public $lvlcatid;
    public $compnameid;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "matrixcompetency_";
        $this->detail       = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if (isset($x['matrixcompetency_id'])) {
            $this->setId($x['matrixcompetency_id']);
        }
        if (isset($x['matrixcompetency_id'])) {
            $this->matrixcompetency_id = $x['matrixcompetency_id'];
        }
        if (isset($x['competencymatrixheader_id'])) {
            $this->headerid = $x['competencymatrixheader_id'];
        }
        if (isset($x['banding_id'])) {
            $this->bandid = $x['banding_id'];
        }
        if (isset($x['banding'])) {
            $this->bandname = $x['banding'];
        }
        if (isset($x['competency_id'])) {
            $this->compid = $x['competency_id'];
        }
        if (isset($x['level_id'])) {
            $this->levelid = $x['level_id'];
        }
        if (isset($x['jobfamily_id'])) {
            $this->jobid = $x['jobfamily_id'];
        }
        if (isset($x['jobfamily'])) {
            $this->jobname = $x['jobfamily'];
        }
        if (isset($x['deleted'])) {
            $this->deleted = $x['deleted'];
        }

        if (isset($x['competency_category'])) {
            $this->compcat = $x['competency_category'];
        }
        if (isset($x['competency_name'])) {
            $this->compnam = $x['competency_name'];
        }
        if (isset($x['level_category'])) {
            $this->lvlname = $x['level_category'];
        }
        if (isset($x['level_category_id'])) {
            $this->lvlcatid = $x['level_category_id'];
        }
        if (isset($x['competency_name_id'])) {
            $this->compnameid = $x['competency_name_id'];
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
		
        $x = array(
            'matrixcompetency_id'       => $this->matrixcompetency_id,
            'competencymatrixheader_id' => $this->headerid,
            'banding_id'                => $this->bandid,
            'bandname'                  => $this->bandname,
            'competency_id'             => $this->compid,
            'level_id'                  => $this->levelid,
            'jobfamily_id'              => $this->jobid,
            'jobfamily'                 => $this->jobname,
            'deleted'                   => $this->deleted,

            'competency_category'       => $this->compcat,
            'competency_name'           => $this->compnam,
            'level_category'            => $this->lvlname,
            'level_category_id'         => $this->lvlcatid,
            'competency_name_id'        => $this->compnameid
        );
        return $x;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        
        return array();
    }

    public function addDetail($matrixcompetency) {
        $this->detail[] = $matrixcompetency;
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
    
    public function getDetail($index = -1){
        if ($index >= 0) {
            return $this->detail[$index];
        }else{
            return $this->detail;
        }
    }

    public function getArray() {
        return $this->getArrayTable();
    }
}