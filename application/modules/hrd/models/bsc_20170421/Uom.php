<?php 

class Hrd_Models_Bsc_Uom extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $uomname;
    public $uomdesc;
   
    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "uom_";
    }
    
    public function setArrayTable($dataArray = NULL) {
       $x   = $dataArray == NULL ? $this->arrayTable : $dataArray;
       
       $this->setId(isset ($x['uom_id'])?$x['uom_id']:0); 
       
       $this->uomname       = isset ($x['uom'])? $x['uom'] : NULL;
       $this->uomdesc       = isset ($x['description'])? $x['description'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'uom_id'            => $this->getId(),
            'uom'               => $this->uomname,
            'description'       => $this->uomdesc
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