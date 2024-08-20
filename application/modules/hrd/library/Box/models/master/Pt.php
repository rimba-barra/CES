<?php

/**
 * Description of Pt
 *
 * @author MIS
 */
class Box_Models_Master_Pt extends Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "pt_";
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['pt_id'])){
           $this->setId($x['pt_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'pt_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name'=>$this->getName()
            
        );
        
        return $x;
    }


}

?>
