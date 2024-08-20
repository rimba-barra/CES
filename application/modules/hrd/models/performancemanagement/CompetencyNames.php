<?php

class Hrd_Models_Performancemanagement_CompetencyNames extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $catid;
    public $catname;
    public $name;
    public $desc;
    public $interview;
    public $tips;
    public $media;
    public $imgpath;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "competencynames_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if (isset($x['competency_name_id'])) {
            $this->setId($x['competency_name_id']);
        }
        if (isset($x['code'])) {
            $this->code = $x['code'];
        }
        if (isset($x['competency_name'])) {
            $this->name = $x['competency_name'];
        }
        if (isset($x['competency_category_id'])) {
            $this->catid = $x['competency_category_id'];
        }
        if (isset($x['competency_category'])) {
            $this->catname = $x['competency_category'];
        }
        if (isset($x['description'])) {
            $this->desc = $x['description'];
        }
        if (isset($x['interview_question'])) {
            $this->interview = $x['interview_question'];
        }
        if (isset($x['development_tips'])) {
            $this->tips = $x['development_tips'];
        }
        if (isset($x['development_media'])) {
            $this->media = $x['development_media'];
        }

        if (isset($x['image_path'])) {
            $this->imgpath = $x['image_path'];
        }

        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'competency_name_id'    => $this->getId(),
            'code'                  => $this->code,
            'competency_name'       => $this->name,
            'competency_category_id'=> $this->catid,
            'competency_category'   => $this->catname,
            'description'           => $this->desc,
            'interview_question'    => $this->interview,
            'development_tips'      => $this->tips,
            'development_media'     => $this->media,
            'image_path'            => $this->imgpath
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