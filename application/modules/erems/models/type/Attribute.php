<?php

/**
 * Description of Attribute
 *
 * @author MIS
 */
class Erems_Models_Type_Attribute extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Arried {
    private $type;
    private $attribute;
    private $attributeValue;
    private $value;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "typeattribute_";
        $this->type = new Erems_Models_Master_Type();
        $this->attribute = new Erems_Models_Attribute_Attribute();
        $this->attributeValue = new Erems_Models_Attribute_Value();
    }
    
    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getAttribute() {
        if(!$this->attribute){
            $this->attribute = new Erems_Models_Attribute_Attribute();
        }
        return $this->attribute;
    }

    public function setAttribute($attribute) {
        $this->attribute = $attribute;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }
    
    public function getAttributeValue() {
        if(!$this->attributeValue){
            $this->attributeValue = new Erems_Models_Attribute_Value();
        }
        return $this->attributeValue;
    }

    public function setAttributeValue(Erems_Models_Attribute_Value $attributeValue) {
        $this->attributeValue = $attributeValue;
    }

        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['typeattribute_id'])){
           $this->setId($x['typeattribute_id']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['attribute_id'])){
           $this->getAttribute()->setId($x['attribute_id']); 
        }
        if(isset ($x['attributevalue_id'])){
           $this->getAttributeValue()->setId($x['attributevalue_id']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'typeattribute_id'=>$this->getId(),
            'value'=>$this->getValue(),
            'attribute_id'=>$this->getAttribute()->getId(),
            'attributevalue_id'=>$this->getAttributeValue()->getId()
            
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getType());
    }

    public function getArray() {
        $ar = $this->getArrayTable();
        return $ar;
    }
    
    


}

?>
