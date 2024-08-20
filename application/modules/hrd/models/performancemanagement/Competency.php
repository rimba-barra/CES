<?php

class Hrd_Models_Performancemanagement_Competency extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $desc;
    public $catid;
    public $nameid;
    public $jobid;
    public $category;
    public $competencyname;
    public $jobfamily;
    public $deleted;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "competency_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if (isset($x['competency_id'])) {
            $this->setId($x['competency_id']);
        }
        if (isset($x['code'])) {
            $this->code = $x['code'];
        }
        if (isset($x['description'])) {
            $this->desc = $x['description'];
        }
        if (isset($x['competency_category_id'])) {
            $this->catid = $x['competency_category_id'];
        }
        if (isset($x['competency_category'])) {
            $this->category = $x['competency_category'];
        }
        if (isset($x['competency_name_id'])) {
            $this->nameid = $x['competency_name_id'];
        }
        if (isset($x['competency_name'])) {
            $this->competencyname = $x['competency_name'];
        }
        if (isset($x['jobfamily_id'])) {
            $this->jobid = $x['jobfamily_id'];
        }
        if (isset($x['jobfamily'])) {
            $this->jobfamily = $x['jobfamily'];
        }
        if (isset($x['deleted'])) {
            $this->deleted = $x['deleted'];
        }

        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'competency_id'             => $this->getId(),
            'code'                      => $this->code,
            'description'               => $this->desc,
            'competency_category_id'    => $this->catid,
            'competency_category'       => $this->category,
            'competency_name_id'        => $this->nameid,
            'competency_name'           => $this->competencyname,
            'jobfamily_id'              => $this->jobid,
            'jobfamily'                 => $this->jobfamily,
            'deleted'                   => $this->deleted
        );
      
        return $x;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
}