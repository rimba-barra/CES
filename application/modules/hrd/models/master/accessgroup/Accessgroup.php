<?php

//class Hrd_Models_Master_Accessgroup_Accessgroup extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
class Hrd_Models_Master_Accessgroup_Accessgroup extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $accessgroup_id;
    public $index_no;
    public $accessgroup;
    public $description;
    /* END VARIABLE HEADER */
	
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "accessgroup_";
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
        $this->setId(isset($x['accessgroup_id']) ? $x['accessgroup_id'] : 0);
        $this->accessgroup_id = isset($x['accessgroup_id']) ? $x['accessgroup_id'] : 0;
        $this->index_no = isset($x['index_no']) ? $x['index_no'] : 0;
        $this->accessgroup = isset($x['accessgroup']) ? $x['accessgroup'] : 0;
        $this->description = isset($x['description']) ? $x['description'] : 0;		
        unset($x);
    }
	
    public function getArrayTable() {
        $x = array(			
            'accessgroup_id' => $this->accessgroup_id,
            'index_no' => $this->index_no,
            'accessgroup' => $this->accessgroup,
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

    public function getAccessgroup() {
        return $this->accessgroup;
    }

    public function setAccessgroup($accessgroup) {
        $this->accessgroup = $accessgroup;
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
    public function addDetail(Hrd_Models_Master_Accessgroup_Accessgroupdetail $param) {
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