<?php

/**
 * Description of Value
 *
 * @author MIS
 */
class Erems_Models_Attribute_Value extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    private $attribute;
    private $default;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "attributevalue_";
        $this->attribute = new Erems_Models_Attribute_Attribute();
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

    public function getAttribute() {
        if(!$this->attribute){
            $this->attribute= new Erems_Models_Attribute_Attribute();
        }
        return $this->attribute;
    }

    public function setAttribute(Erems_Models_Attribute_Attribute $attribute) {
        $this->attribute = $attribute;
    }

    public function getDefault() {
        return $this->default;
    }

    public function setDefault($default) {
        $this->default = (boolean)$default;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['attributevalue_id'])){
           $this->setId($x['attributevalue_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['attributevalue'])){
           $this->setName($x['attributevalue']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['is_default'])){
           $this->setDefault($x['is_default']); 
        }
      
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'attributevalue_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'attributevalue'=>$this->getName(),
            'description'=>$this->getDescription(),
            'is_default'=>$this->getDefault()
            
        );
        
        return $x;
    }


}

?>
