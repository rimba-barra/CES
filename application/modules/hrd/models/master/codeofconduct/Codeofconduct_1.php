<?php

class Hrd_Models_Master_Codeofconduct_Codeofconduct extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */
    
    private $codeofconduct_id;
    private $file_name;
    private $description;
    private $project;
    private $active;
    /* END VARIABLE HEADER */
    
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "codeofconduct_";
        $this->detail = array();
        $this->_mail = new Hrd_Models_General_Email();
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
        $this->setId(isset($x['codeofconduct_id']) ? $x['codeofconduct_id'] : 0);
        $this->codeofconduct_id = isset($x['codeofconduct_id']) ? $x['codeofconduct_id'] : 0;
        $this->file_name = isset($x['file_name']) ? $x['file_name'] : '';
        $this->description = isset($x['description']) ? $x['description'] : '';	
        $this->project = isset($x['project']) ? $x['project'] : '';		
        $this->active = isset($x['active']) ? $x['active'] : 0;		
        unset($x);
    }
	
    public function getArrayTable() {
        $x = array(			
            'codeofconduct_id' => $this->codeofconduct_id,
            'file_name' => $this->file_name,
            'description' => $this->description,
            'project' => $this->project,
            'active' => $this->active
        );
        return $x;
    }
    
    public function getCodeofconduct_id() {
        return $this->codeofconduct_id;
    }

    public function setCodeofconduct_id($codeofconduct_id) {
        $this->codeofconduct_id = $codeofconduct_id;
    }

    public function getFile_name() {
        return $this->file_name;
    }

    public function setFile_name($file_name) {
        $this->file_name = $file_name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getActive() {
        return $this->active;
    }

    public function setActive($active) {
        $this->active = active;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject($project) {
        $this->project = project;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function getDatefields() {
        return array();
    }
    
    function get_mail() {
        return $this->_mail;
    }

}

?>