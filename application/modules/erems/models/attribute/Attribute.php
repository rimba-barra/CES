<?php


/**
 * Description of Attribute
 *
 * @author MIS
 */
class Erems_Models_Attribute_Attribute extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    private $freeText;
    private $dataType;
    private $default;
    private $type;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "attribute_";
        $this->type = new Erems_Models_Attribute_Type();
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

    public function getFreeText() {
        return $this->freeText;
    }

    public function setFreeText($freeText) {
        $this->freeText = (boolean)$freeText;
    }

    public function getDataType() {
        return $this->dataType;
    }

    public function setDataType($dataType) {
        $this->dataType = $dataType;
    }

    public function getDefault() {
        return $this->default;
    }

    public function setDefault($default) {
        $this->default = (boolean)$default;
    }

    public function getType() {
        return $this->type;
    }

    public function setType(Erems_Models_Attribute_Type $type) {
        $this->type = $type;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['attribute_id'])){
           $this->setId($x['attribute_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
         if(isset ($x['attribute'])){
           $this->setName($x['attribute']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
         if(isset ($x['is_freetext'])){
           $this->setFreeText($x['is_freetext']); 
        }
        if(isset ($x['datatype'])){
           $this->setDataType($x['datatype']); 
        }
        if(isset ($x['is_default'])){
           $this->setDefault($x['is_default']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'attribute_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'attribute'=>$this->getName(),
            'description'=>$this->getDescription(),
            'is_freetext'=>$this->getFreeText(),
            'datatype'=>$this->getDataType(),
            'is_default'=>$this->getDefault()
            
        );
        
        return $x;
    }
    
    


}

?>
