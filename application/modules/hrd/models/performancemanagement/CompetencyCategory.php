<?php 

class Hrd_Models_Performancemanagement_CompetencyCategory extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $category;
    public $description;
   
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "competencycategory_";
    }
    
    public function setArrayTable($dataArray = NULL) {
       $x = $dataArray==NULL?$this->arrayTable:$dataArray;
       
       $this->setId(isset ($x['competency_category_id'])?$x['competency_category_id']:0); 
       
       $this->code          = isset ($x['code'])? $x['code'] : NULL;
       $this->category      = isset ($x['competency_category'])? $x['competency_category'] : NULL;
       $this->description   = isset ($x['description'])? $x['description'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'competency_category_id'    => $this->getId(),
            'code'                      => $this->code,
            'competency_category'       => $this->category,
            'description'               => $this->description
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