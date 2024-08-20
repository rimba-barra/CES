<?php 

class Hrd_Models_Performancemanagement_JobFamily extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $jobfamily;
    public $description;

    private $status_transfer;
   
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "jobfamily_";
    }
    
    public function setArrayTable($dataArray = NULL) {
       $x = $dataArray==NULL?$this->arrayTable:$dataArray;
       
       $this->setId(isset ($x['jobfamily_id'])?$x['jobfamily_id']:0); 
       
       $this->code          = isset ($x['code'])? $x['code'] : NULL;
       $this->jobfamily     = isset ($x['jobfamily'])? $x['jobfamily'] : NULL;
       $this->description   = isset ($x['description'])? $x['description'] : NULL;

       $this->status_transfer      = isset ($x['status_transfer'])? $x['status_transfer'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'jobfamily_id'  => $this->getId(),
            'code'          => $this->code,
            'jobfamily'     => $this->jobfamily,
            'description'   => $this->description,

            'status_transfer'   => $this->status_transfer
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