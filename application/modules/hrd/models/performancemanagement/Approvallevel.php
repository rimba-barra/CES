<?php 

class Hrd_Models_Performancemanagement_Approvallevel extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $approvallevel_id;
	public $approvallevel;
    public $description;
   
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "approvallevel_";
    }
    
    public function setArrayTable($dataArray = NULL) {
       $x = $dataArray==NULL?$this->arrayTable:$dataArray;
       
       $this->setId(isset ($x['approvallevel_id'])?$x['approvallevel_id']:0); 
       $this->approvallevel       = isset ($x['approvallevel'])? $x['approvallevel'] : NULL;
       $this->description   = isset ($x['description'])? $x['description'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'approvallevel_id'        => $this->getId(),
            'approvallevel'           => $this->approvallevel,
            'description'       => $this->description
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