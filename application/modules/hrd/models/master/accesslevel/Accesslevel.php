<?php

//class Hrd_Models_Master_Accesslevel_Accesslevel extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
class Hrd_Models_Master_Accesslevel_Accesslevel extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $accesslevel_id;
    public $index_no;
    public $accesslevel;
    public $description;
    /* END VARIABLE HEADER */
	
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "accesslevel_";
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
        $this->setId(isset($x['accesslevel_id']) ? $x['accesslevel_id'] : 0);
        $this->accesslevel_id = isset($x['accesslevel_id']) ? $x['accesslevel_id'] : 0;
        $this->index_no = isset($x['index_no']) ? $x['index_no'] : 0;
        $this->accesslevel = isset($x['accesslevel']) ? $x['accesslevel'] : 0;
        $this->description = isset($x['description']) ? $x['description'] : 0;		
        unset($x);
    }
	
    public function getArrayTable() {
        $x = array(			
            'accesslevel_id' => $this->accesslevel_id,
            'index_no' => $this->index_no,
            'accesslevel' => $this->accesslevel,
            'description' => $this->description
        );
        return $x;
    }
	
    public function getIndex_no() {
        return $this->index_no;
    }

    public function setIndex_no($index_no) {
        $this->index_no = $index_no;
    }

    public function getAccesslevel() {
        return $this->accesslevel;
    }

    public function setAccesslevel($accesslevel) {
        $this->accesslevel = $accesslevel;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
	
	/*
    public function addDetail(Hrd_Models_Master_Accesslevel_Accessleveldetail $param) {
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
	*/

    public function getArray() {
        return $this->getArrayTable();
    }

    public function getDatefields() {
        return array();
    }

}

?>