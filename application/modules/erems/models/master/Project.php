<?php

/**
 * Description of Project
 *
 * @author MIS
 */
class Erems_Models_Master_Project extends Erems_Models_ObjectEmbedData {
    private $code;
    private $name;
    
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
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'project_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name'=>$this->getName()
            
        );
        
        return $x;
    }
    
    


}

?>
