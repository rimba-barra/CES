<?php 
/*  ZEND MODELS FOR 'Competency Level' */

class Hrd_Models_Performancemanagement_LevelCategory extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $code;
    public $category;
    public $description;
   
    public function __construct() {
        parent::__construct();
        $this->embedPrefix	= "levelcategory_";
    }
    
    public function setArrayTable($dataArray = NULL) {
       $x = $dataArray==NULL?$this->arrayTable:$dataArray;
       
       $this->setId(isset ($x['level_category_id'])?$x['level_category_id']:0); 
       
       $this->code 			= isset ($x['code'])? $x['code'] : NULL;
       $this->category 		= isset ($x['level_category'])? $x['level_category'] : NULL;
       // $this->description 	= isset ($x['description'])? $x['description'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'level_category_id'	=> $this->getId(),
            'code' 				=> $this->code,
            'level_category'	=> $this->category
            // 'description'		=> $this->description
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