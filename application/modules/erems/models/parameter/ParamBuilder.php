<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Erems_Models_Parameter_ParamBuilder extends Erems_Models_Parameter_Parameter{
    private $paramList;
    private $prefix;
    private $paramResult;
    public function __construct(\Erems_Box_Models_App_Session $session,$prefix) {
        $this->buildParamList();
        $this->prefix = $prefix;
        $this->paramResult = array();
        parent::__construct($session);
        
        
    }
    
    public function fill(\Erems_Models_Master_Parameter $parameter) {
      
        if(array_key_exists($parameter->getName(),$this->paramList)){
            if(strpos($parameter->getName(), $this->prefix) !== false){
                $this->paramResult[$parameter->getName()] = $parameter->getValue();
            }
            
        } 
    }

    public function getParams() {
        $varList = array();
       
        foreach($this->paramList as $k=>$v){
            $varList[] = $k;
        }
        return $varList;
    }
    
    private function buildParamList(){
        $object = new Erems_Box_GlobalParamsNew();
        $this->paramList = $object->getVar();
    
     
    }
    
    public function getResult(){
   
        return $this->paramResult;
    }

}