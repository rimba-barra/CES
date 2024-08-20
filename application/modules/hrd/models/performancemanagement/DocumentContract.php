<?php

class Hrd_Models_Performancemanagement_DocumentContract extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $pm_library_content_id;
	public $pm_library_category_id;
	public $content_name;
	public $content_description;
	public $rate_1_pm_library_score_id;
	public $rate_2_pm_library_score_id;
	public $rate_3_pm_library_score_id;
	public $rate_4_pm_library_score_id;
	public $rate_5_pm_library_score_id;
	public $is_pmcontract;
	public $is_used;
	public $sort;	
    public $category_name;

    public $score_1;
    public $score_1_name;
    public $score_2;
    public $score_2_name;
    public $score_3;
    public $score_3_name;
    public $score_4;
    public $score_4_name;
    public $score_5;
    public $score_5_name;
	
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "documentcontract_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
		if (isset($x['pm_library_content_id'])) {
            $this->pm_library_content_id = $x['pm_library_content_id'];
        }
        if (isset($x['pm_library_category_id'])) {
            $this->pm_library_category_id = $x['pm_library_category_id'];
        }
        if (isset($x['content_name'])) {
            $this->content_name = $x['content_name'];
        }
		if (isset($x['content_description'])) {
             $this->content_description = $x['content_description'];
        }
        if (isset($x['rate_1_pm_library_score_id'])) {
            $this->rate_1_pm_library_score_id = $x['rate_1_pm_library_score_id'];
        }
        if (isset($x['rate_2_pm_library_score_id'])) {
            $this->rate_2_pm_library_score_id = $x['rate_2_pm_library_score_id'];
        }
		if (isset($x['rate_3_pm_library_score_id'])) {
            $this->rate_3_pm_library_score_id = $x['rate_3_pm_library_score_id'];
        }
		if (isset($x['rate_4_pm_library_score_id'])) {
            $this->rate_4_pm_library_score_id = $x['rate_4_pm_library_score_id'];
        }
		if (isset($x['rate_5_pm_library_score_id'])) {
            $this->rate_5_pm_library_score_id = $x['rate_5_pm_library_score_id'];
        }
		if (isset($x['is_pmcontract'])) {
            $this->is_pmcontract = $x['is_pmcontract'];
        }
		if (isset($x['is_used'])) {
            $this->is_used = $x['is_used'];
        }
		if (isset($x['sort'])) {
            $this->sort = $x['sort'];
        }		
		if (isset($x['category_name'])) {
            $this->category_name = $x['category_name'];
        }

        if (isset($x['score_1'])) {
            $this->score_1 = $x['score_1'];
        }
        if (isset($x['score_1_name'])) {
            $this->score_1_name = $x['score_1_name'];
        }
        if (isset($x['score_2'])) {
            $this->score_2 = $x['score_2'];
        }
        if (isset($x['score_2_name'])) {
            $this->score_2_name = $x['score_2_name'];
        }
        if (isset($x['score_3'])) {
            $this->score_3 = $x['score_3'];
        }
        if (isset($x['score_3_name'])) {
            $this->score_3_name = $x['score_3_name'];
        }
        if (isset($x['score_4'])) {
            $this->score_4 = $x['score_4'];
        }
        if (isset($x['score_4_name'])) {
            $this->score_4_name = $x['score_4_name'];
        }
        if (isset($x['score_5'])) {
            $this->score_5 = $x['score_5'];
        }
        if (isset($x['score_5_name'])) {
            $this->score_5_name = $x['score_5_name'];
        }
        
		unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'pm_library_content_id'	=> $this->pm_library_content_id,//$this->getId(),
            'pm_library_category_id' => $this->pm_library_category_id,
            'content_name' => $this->content_name,
            'content_description' => $this->content_description,
            'rate_1_pm_library_score_id' => $this->rate_1_pm_library_score_id,
			'rate_2_pm_library_score_id' => $this->rate_2_pm_library_score_id,
            'rate_3_pm_library_score_id' => $this->rate_3_pm_library_score_id,
            'rate_4_pm_library_score_id' => $this->rate_4_pm_library_score_id,
			'rate_5_pm_library_score_id' => $this->rate_5_pm_library_score_id,
			'is_pmcontract' => $this->is_pmcontract,
			'is_used' => $this->is_used,
            'sort' => $this->sort,			
			'category_name' => $this->category_name,

            'score_1' => $this->score_1,
            'score_1_name' => $this->score_1_name,
            'score_2' => $this->score_2,
            'score_2_name' => $this->score_2_name,
            'score_3' => $this->score_3,
            'score_3_name' => $this->score_3_name,
            'score_4' => $this->score_4,
            'score_4_name' => $this->score_4_name,
            'score_5' => $this->score_5,
            'score_5_name' => $this->score_5_name,
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