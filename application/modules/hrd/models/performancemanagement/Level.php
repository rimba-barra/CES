<?php

class Hrd_Models_Performancemanagement_Level extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $desc;
    public $sample;
    public $nameid;
    public $competencyname;
    public $compnamedesc;
    public $catid;
    public $category;
    public $catdesc;
    public $deleted;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "level_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if (isset($x['level_id'])) {
            $this->setId($x['level_id']);
        }
        if (isset($x['code'])) {
            $this->code = $x['code'];
        }
        if (isset($x['description'])) {
            $this->desc = $x['description'];
        }
        if (isset($x['sample_behaviour'])) {
            $this->sample = $x['sample_behaviour'];
        }
        if (isset($x['competency_name_id'])) {
            $this->nameid = $x['competency_name_id'];
        }
        if (isset($x['competency_name'])) {
            $this->competencyname = $x['competency_name'];
        }
        if (isset($x['competency_name_desc'])) {
            $this->compnamedesc = $x['competency_name_desc'];
        }
        if (isset($x['level_category_id'])) {
            $this->catid = $x['level_category_id'];
        }
        if (isset($x['level_category'])) {
            $this->category = $x['level_category'];
        }
        if (isset($x['level_category_desc'])) {
            $this->catdesc = $x['level_category_desc'];
        }
        if (isset($x['deleted'])) {
            $this->deleted = $x['deleted'];
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'level_id'              => $this->getId(),
            'code'                  => $this->code,
            'description'           => $this->desc,
            'sample_behaviour'      => $this->sample,
            'competency_name_id'    => $this->nameid,
            'competency_name'       => $this->competencyname,
            // 'competency_name_desc'  => ($this->compnamedesc ? $this->compnamedesc : '-'),
            'competency_name_desc'  => $this->compnamedesc,
            'level_category_id'     => $this->catid,
            'level_category'        => $this->category,
            'level_category_desc'   => $this->catdesc,
            'deleted'               => $this->deleted
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