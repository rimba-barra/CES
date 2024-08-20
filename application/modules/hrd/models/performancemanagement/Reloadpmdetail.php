<?php

class Hrd_Models_Performancemanagement_Reloadpmdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $performancemanagement_id;
    public $jenisdokumen_code;
    public $bobot;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "reloadpmdetail_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if (isset($x['performancemanagement_id'])) {
            $this->employee_id = $x['performancemanagement_id'];
        }
        if (isset($x['jenisdokumen_code'])) {
            $this->jenisdokumen_code = $x['jenisdokumen_code'];
        }
        if (isset($x['bobot'])) {
            $this->bobot = $x['bobot'];
        }
        
	unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'performancemanagement_id'	=> $this->performancemanagement_id,
            'jenisdokumen_code' => $this->jenisdokumen_code,
            'bobot'             => $this->bobot
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