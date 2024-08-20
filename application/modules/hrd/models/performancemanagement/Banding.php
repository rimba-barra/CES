<?php

class Hrd_Models_Performancemanagement_Banding extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $banding;
    public $description;
    public $index_no;

    public $leaveentitlements_rest;
    public $holiday_name_id;
    public $holiday_name;

    //UNTUK PAYROLL CHERRY
    private $status_transfer;
    private $action_process;
    private $company_code;
    private $pt_id;
    private $pt_name;
    private $project_id;
    private $project_name;

    private $upload_check;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "banding_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        $this->setId(isset ($x['banding_id'])?$x['banding_id']:0);
        
        $this->code          = isset ($x['code'])? $x['code'] : NULL;
        $this->banding       = isset ($x['banding'])? $x['banding'] : NULL;
        $this->description   = isset ($x['description'])? $x['description'] : NULL;
        $this->index_no      = isset ($x['index_no'])? $x['index_no'] : NULL;

        $this->leaveentitlements_rest       = isset ($x['leaveentitlements_rest'])? $x['leaveentitlements_rest'] : NULL;
        $this->holiday_name                 = isset ($x['holiday_name'])? $x['holiday_name'] : NULL;
        $this->holiday_name_id              = isset ($x['holiday_name_id'])? $x['holiday_name_id'] : NULL;

        $this->status_transfer           = isset ($x['status_transfer'])? $x['status_transfer'] : NULL;
        $this->action_process            = isset ($x['action_process'])? $x['action_process'] : NULL;
        $this->company_code              = isset ($x['company_code'])? $x['company_code'] : NULL;
        $this->pt_id                     = isset ($x['pt_id'])? $x['pt_id'] : NULL;
        $this->pt_name                   = isset ($x['pt_name'])? $x['pt_name'] : NULL;
        $this->project_id                = isset ($x['project_id'])? $x['project_id'] : NULL;
        $this->project_name              = isset ($x['project_name'])? $x['project_name'] : NULL;
        $this->upload_check              = isset ($x['upload_check'])? $x['upload_check'] : NULL;
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'banding_id'        => $this->getId(),
            'code'              => $this->code,
            'banding'           => $this->banding,
            'description'       => $this->description,
            'index_no'          => $this->index_no,

            'leaveentitlements_rest'            => $this->leaveentitlements_rest,
            'holiday_name'                      => $this->holiday_name,
            'holiday_name_id'                   => $this->holiday_name_id,

            'status_transfer'   => $this->status_transfer,
            'action_process'    => $this->action_process,
            'company_code'      => $this->company_code,
            'project_id'        =>$this->project_id,
            'project_name'      =>$this->project_name,
            'pt_id'             => $this->pt_id,
            'pt_name'           => $this->pt_name,
            'upload_check'      => $this->upload_check
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

?>