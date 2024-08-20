<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GeneralParameter
 *
 * @author MIS
 */
class Hrd_Models_Master_GeneralParameter extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $name;
    private $moduleName;
    private $value;
    private $dataType;
    private $hasModule; /// hide in general parameter module, 
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "generalparameter_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['generalparameter_id'])){
           $this->setId($x['generalparameter_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['module_name'])){
           $this->setModuleName($x['module_name']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['data_type'])){
           $this->setDataType($x['data_type']); 
        }
        if(isset ($x['has_module'])){
           $this->setHasModule($x['has_module']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'generalparameter_id'=>$this->getId(),
            'name'=>$this->getName(),
            'module_name'=>$this->getModuleName(),
            'value'=>$this->getValue(),
            'data_type'=>$this->getDataType(),
            'has_module'=>$this->getHasModule()
        );
      
        return $x;
    }
    
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getModuleName() {
        return $this->moduleName;
    }

    public function setModuleName($moduleName) {
        $this->moduleName = $moduleName;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function getDataType() {
        return $this->dataType;
    }

    public function setDataType($dataType) {
        $this->dataType = $dataType;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    public function getHasModule() {
        return $this->hasModule;
    }

    public function setHasModule($hasModule) {
        $this->hasModule = $hasModule;
    }




}

?>
