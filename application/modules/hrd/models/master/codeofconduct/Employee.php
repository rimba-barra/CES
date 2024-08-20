<?php

class Hrd_Models_Master_Codeofconduct_Employee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    /* START VARIABLE HEADER */
    
    public $employee_codeofconduct_id;
    public $codeofconduct_id;
    public $employee_id;
    public $employee_name;
    public $project;
    public $email_ciputra;
    public $email;
    public $tgl_menyetujui;
    /* END VARIABLE HEADER */
	
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "codeofconduct_";
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
        $this->setId(isset($x['employee_codeofconduct_id']) ? $x['employee_codeofconduct_id'] : 0);
        $this->codeofconduct_id = isset($x['codeofconduct_id']) ? $x['codeofconduct_id'] : 0;
        $this->employee_id = isset($x['employee_id']) ? $x['employee_id'] : '';
        $this->employee_name = isset($x['employee_name']) ? $x['employee_name'] : '';
        $this->project = isset($x['project']) ? $x['project'] : '';
        $this->email_ciputra = isset($x['email_ciputra']) ? $x['email_ciputra'] : '';	
        $this->email = isset($x['email']) ? $x['email'] : '';
        $this->tgl_menyetujui = isset($x['tgl_menyetujui']) ? $x['tgl_menyetujui'] : '';
        unset($x);
    }
	
    public function getArrayTable() {
        $x = array(			
            'employee_codeofconduct_id' => $this->employee_codeofconduct_id,
            'codeofconduct_id' => $this->codeofconduct_id,
            'employee_id' => $this->employee_id,
            'employee_name' => $this->employee_name,
            'project' => $this->project,
            'email_ciputra' => $this->email_ciputra,
            'email' => $this->email,
            'tgl_menyetujui' => $this->tgl_menyetujui
        );
        return $x;
    }
	
    public function getTgl_menyetujui() {
        return $this->tgl_menyetujui;
    }

    public function setTgl_menyetujui($tgl_menyetujui) {
        $this->tgl_menyetujui = $tgl_menyetujui;
    }
    
    public function getEmployee_codeofconduct_id() {
        return $this->employee_codeofconduct_id;
    }

    public function setEmployee_codeofconduct_id($employee_codeofconduct_id) {
        $this->employee_codeofconduct_id = $employee_codeofconduct_id;
    }

    public function getCodeofconduct_id() {
        return $this->codeofconduct_id;
    }

    public function setCodeofconduct_id($codeofconduct_id) {
        $this->codeofconduct_id = $codeofconduct_id;
    }
    
    public function getEmployee_id() {
        return $this->employee_id;
    }

    public function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }
    
    public function getEmployee_name() {
        return $this->employee_name;
    }

    public function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject($project) {
        $this->project = project;
    }
    
    public function getEmail_ciputra() {
        return $this->email_ciputra;
    }

    public function setEmail_ciputra($email_ciputra) {
        $this->email_ciputra = email_ciputra;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = email;
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