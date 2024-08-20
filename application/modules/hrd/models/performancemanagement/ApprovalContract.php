<?php

class Hrd_Models_Performancemanagement_ApprovalContract extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $pm_contract_approvalmatrix_id;
	public $pm_contract_id;
	public $project_id;
	public $pt_id;
	public $penilai_id;
	public $approvallevel_id;

	public $penilai_name;
	public $last_review;
	public $last_review_date;
	
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "contract_approvalmatrix_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
		if (isset($x['pm_contract_approvalmatrix_id'])) {
            $this->pm_contract_approvalmatrix_id = $x['pm_contract_approvalmatrix_id'];
        }
        if (isset($x['pm_contract_id'])) {
            $this->pm_contract_id = $x['pm_contract_id'];
        }
        if (isset($x['project_id'])) {
            $this->project_id = $x['project_id'];
        }
		if (isset($x['pt_id'])) {
             $this->pt_id = $x['pt_id'];
        }
        if (isset($x['penilai_id'])) {
            $this->penilai_id = $x['penilai_id'];
        }
        if (isset($x['approvallevel_id'])) {
            $this->approvallevel_id = $x['approvallevel_id'];
        }

		if (isset($x['penilai_name'])) {
            $this->penilai_name = $x['penilai_name'];
        }
		if (isset($x['last_review'])) {
            $this->last_review = $x['last_review'];
        }
		if (isset($x['last_review_date'])) {
            $this->last_review_date = $x['last_review_date'];
        }
		
        
		unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'pm_contract_approvalmatrix_id'	=> $this->pm_contract_approvalmatrix_id,//$this->getId(),
            'pm_contract_id' => $this->pm_contract_id,
            'project_id' => $this->project_id,
            'pt_id' => $this->pt_id,
            'penilai_id' => $this->penilai_id,
			'approvallevel_id' => $this->approvallevel_id,

            'penilai_name' => $this->penilai_name,
            'last_review' => $this->last_review,
			'last_review_date' => $this->last_review_date,

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