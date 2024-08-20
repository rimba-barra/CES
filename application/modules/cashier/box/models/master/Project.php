<?php

/**
 * Description of Project
 *
 * @author MIS
 */
class Cashier_Box_Models_Master_Project extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $subholding;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "project_";
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
    
    function getSubholding() {
        return $this->subholding;
    }

    function setSubholding($subholding) {
        $this->subholding = $subholding;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['project_id'])){
           $this->setId($x['project_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['subholding_id'])){
           $this->setSubholding($x['subholding_id']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'project_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name'=>$this->getName(),
            'subholding_id'=>$this->getSubholding()
            
        );
        
        return $x;
    }
    
    


}

?>
