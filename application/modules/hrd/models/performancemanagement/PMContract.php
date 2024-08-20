<?php

class Hrd_Models_Performancemanagement_PMContract extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    
	public $pm_contract_id;
	public $project_id;
	public $pt_id;
	public $statusinformation_id;
	public $recomendation_decision;
	public $curr_position_id;
    public $new_position_id;
    public $recommendation_salary;
    public $recommendation_other;
    public $is_submit;
	public $is_close;
	
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "pmcontract_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if (isset($x['pm_contract_id'])) {
            $this->pm_contract_id = $x['pm_contract_id'];
        }
        if (isset($x['project_id'])) {
            $this->project_id = $x['project_id'];
        }
		if (isset($x['pt_id'])) {
             $this->pt_id = $x['pt_id'];
        }
        if (isset($x['statusinformation_id'])) {
            $this->statusinformation_id = $x['statusinformation_id'];
        }
        if (isset($x['recomendation_decision'])) {
            $this->recomendation_decision = $x['recomendation_decision'];
        }
		if (isset($x['curr_position_id'])) {
            $this->curr_position_id = $x['curr_position_id'];
        }
        if (isset($x['new_position_id'])) {
            $this->new_position_id = $x['new_position_id'];
        }
		if (isset($x['recommendation_salary'])) {
            $this->recommendation_salary = $x['recommendation_salary'];
        }        
        if (isset($x['recommendation_other'])) {
            $this->recommendation_other = $x['recommendation_other'];
        }
        if (isset($x['is_submit'])) {
            $this->is_submit = $x['is_submit'];
        }
        if (isset($x['is_close'])) {
            $this->is_close = $x['is_close'];
        }
		
        
		unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'pm_contract_id' => $this->pm_contract_id,
            'project_id' => $this->project_id,
            'pt_id' => $this->pt_id,
            'statusinformation_id' => $this->statusinformation_id,
			'recomendation_decision' => $this->recomendation_decision,
            'curr_position_id' => $this->curr_position_id,
            'new_position_id' => $this->new_position_id,
            'recommendation_salary' => $this->recommendation_salary,
            'recommendation_other' => $this->recommendation_other,
            'is_submit' => $this->is_submit,
            'is_close' => $this->is_close,

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