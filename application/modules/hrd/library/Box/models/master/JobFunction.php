<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JobFunction
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_JobFunction extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $code;
    private $name;
    private $desc;
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"jobfunction_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jobfunction_id'])){
           $this->setId($x['jobfunction_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['jobfunction'])){
           $this->setName($x['jobfunction']); 
        }
        if(isset ($x['description'])){
           $this->setDesc($x['description']); 
        }
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'jobfunction_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'jobfunction'=>$this->getName(),
            'description'=>$this->getDesc()
            
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function getDesc() {
        return $this->desc;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setDesc($desc) {
        $this->desc = $desc;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
