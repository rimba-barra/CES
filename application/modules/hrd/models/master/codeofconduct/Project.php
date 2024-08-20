<?php

class Hrd_Models_Master_Codeofconduct_Project extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */
    
    private $codeofconduct_id;
    private $project_id;
    private $name;
    private $file_name;
    
    /* END VARIABLE HEADER */

    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "codeofconduct_";
        $this->detail = array();
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;		
        $this->setId(isset($x['project_id']) ? $x['project_id'] : 0);
        $this->codeofconduct_id = isset($x['codeofconduct_id']) ? $x['codeofconduct_id'] : 0;
        $this->project_id = isset($x['project_id']) ? $x['project_id'] : '';
        $this->file_name = isset($x['file_name']) ? $x['file_name'] : '';
        $this->name = isset($x['name']) ? $x['name'] : '';
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(			
            'project_id' => $this->project_id,
            'codeofconduct_id' => $this->codeofconduct_id,
            'file_name' => $this->file_name,
            'name' => $this->name
        );
        return $x;
    }
    
    function getProject_id() {
        return $this->project_id;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }
    
    function getCodeofconduct_id() {
        return $this->codeofconduct_id;
    }

    function setCodeofconduct_id($codeofconduct_id) {
        $this->codeofconduct_id = $codeofconduct_id;
    }
    
    function getFile_name() {
        return $this->file_name;
    }

    function setFile_name($file_name) {
        $this->file_name = $file_name;
    }
        
    function getName() {
        return $this->name;
    }

    function setName($name) {
        $this->name = name;
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

}

?>