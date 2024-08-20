<?php

class Hrd_Models_Performancemanagement_Approvalmatrixdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $approvalmatrix_id;
	public $employee_id;
	public $project_id;
	public $pt_id;
	public $department_id;
	public $penilai_id;
	public $approvallevel_id;
	public $docdept_id;
	public $is_plan_approval;
	public $is_midyear_evaluation;
	public $is_endyear_evaluation;
	public $deleted;
	
    public $employee_name;
	public $penilai_name;
	public $project_name;
	public $pt_name;
	public $department;
    public $doc_dept;
	public $approvallevel;

    //added by anas 15012024
    public $is_pmcontract;
    public $from_quarterly;
	
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "approvalmatrixdetail_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        /*if (isset($x['approvalmatrix_id'])) {
            $this->setId($x['approvalmatrix_id']);
        }*/
		if (isset($x['approvalmatrix_id'])) {
            $this->approvalmatrix_id = $x['approvalmatrix_id'];
        }
        if (isset($x['employee_id'])) {
            $this->employee_id = $x['employee_id'];
        }
        if (isset($x['project_id'])) {
            $this->project_id = $x['project_id'];
        }
		if (isset($x['pt_id'])) {
             $this->pt_id = $x['pt_id'];
        }
        if (isset($x['department_id'])) {
            $this->department_id = $x['department_id'];
        }
        if (isset($x['penilai_id'])) {
            $this->penilai_id = $x['penilai_id'];
        }
		if (isset($x['approvallevel_id'])) {
            $this->approvallevel_id = $x['approvallevel_id'];
        }
		if (isset($x['docdept_id'])) {
            $this->docdept_id = $x['docdept_id'];
        }
		if (isset($x['is_plan_approval'])) {
            $this->is_plan_approval = $x['is_plan_approval'];
        }
		if (isset($x['is_midyear_evaluation'])) {
            $this->is_midyear_evaluation = $x['is_midyear_evaluation'];
        }
		if (isset($x['is_endyear_evaluation'])) {
            $this->is_endyear_evaluation = $x['is_endyear_evaluation'];
        }
		if (isset($x['deleted'])) {
            $this->deleted = $x['deleted'];
        }
		
		if (isset($x['employee_name'])) {
            $this->employee_name = $x['employee_name'];
        }
		if (isset($x['penilai_name'])) {
            $this->penilai_name = $x['penilai_name'];
        }
		if (isset($x['project_name'])) {
            $this->project_name = $x['project_name'];
        }
		if (isset($x['pt_name'])) {
            $this->pt_name = $x['pt_name'];
        }
		if (isset($x['department'])) {
            $this->department = $x['department'];
        }
		if (isset($x['doc_dept'])) {
            $this->doc_dept = $x['doc_dept'];
        }
		if (isset($x['approvallevel'])) {
            $this->approvallevel = $x['approvallevel'];
        }
        
        //added by anas 15012024 | param untuk contract
        if (isset($x['is_pmcontract'])) {
            $this->is_pmcontract = $x['is_pmcontract'];
        }
        if (isset($x['from_quarterly'])) {
            $this->from_quarterly = $x['from_quarterly'];
        }

		unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'approvalmatrix_id'	=> $this->approvalmatrix_id,//$this->getId(),
            'employee_id'       => $this->employee_id,
            'project_id'     => $this->project_id,
            'pt_id'      	=> $this->pt_id,
            'department_id'    	=> $this->department_id,
			'penilai_id'       => $this->penilai_id,
            'approvallevel_id'     => $this->approvallevel_id,
            'docdept_id'      	=> $this->docdept_id,
			'is_plan_approval'      	=> $this->is_plan_approval,
			'is_midyear_evaluation'      	=> $this->is_midyear_evaluation,
			'is_endyear_evaluation'      	=> $this->is_endyear_evaluation,
            'deleted'    	=> $this->deleted,
			
			'employee_name'     => $this->employee_name,
            'penilai_name'      	=> $this->penilai_name,
            'project_name'    	=> $this->project_name,
			'pt_name'       => $this->pt_name,
            'department'     => $this->department,
            'doc_dept'      	=> $this->doc_dept,
            'approvallevel'    	=> $this->approvallevel

            //added by anas 15012024 | param untuk contract
            , 'is_pmcontract' => $this->is_pmcontract,
            'from_quarterly' => $this->from_quarterly
        );
      
        return $x;
    }
	
	/*public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }*/

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
}