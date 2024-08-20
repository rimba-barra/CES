<?php

/**
 * Description of Type
 *
 * @author MIS
 */
class Erems_Models_Attribute_Type extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "atttype_";
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

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['atttype_id'])){
           $this->setId($x['atttype_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
         if(isset ($x['atttype'])){
           $this->setName($x['atttype']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'atttype_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'atttype'=>$this->getName(),
            'description'=>$this->getDescription()
            
        );
        
        return $x;
    }


}

?>
