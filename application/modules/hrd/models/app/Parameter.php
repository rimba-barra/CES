<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Parameter
 *
 * @author MIS
 */
abstract class Hrd_Models_App_Parameter extends Box_Models_ObjectEmbedData implements Box_Delien_DelimiterCandidate,  Box_Models_Master_InterProjectPt {

    protected $variables = array();
    protected  $project;
    protected  $pt;
    protected $DCResult;
    protected $detail;

    public function __construct() {
        $this->detail = array();
        $object = new Hrd_Models_Master_GeneralParameter();
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $params = $dao->getParams($this->getModuleName());
        $allParams = array();
        foreach ($params[1] as $param) {
            $p = new Hrd_Models_Master_GeneralParameter();
            $p->setArrayTable($param);
            $allParams[] = $p;
        }
        $this->embedPrefix = $this->getModuleName() . "_";
        $this->create($allParams);
    }

    private function create($allParams) {
        foreach ($allParams as $param) {
            if ($param instanceof Hrd_Models_Master_GeneralParameter) {
                $entity = new Hrd_Models_App_ParameterEntity();
                $entity->setName($param->getName());
                $entity->setId($param->getId());
                $this->variables[] = $entity;
            }
        }

        
    }
    
    public function toDetail(){
        foreach ($this->variables as $variable) {
            $this->detail[] = $variable;
        }
    }

    public function setArrayTable($dataArray = NULL) {

        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
       
        foreach ($this->variables as $variable) {
            $n = $variable->getName();
            
            if (isset($x[$n])) {
                $variable->setValue($x[$n]);
            }
        }

        $this->extraSetArrayTable();



        unset($x);
    }
    
    public function getVariables(){
        return $this->variables;
    }

    public function getArrayTable() {
        $x = array();
        foreach ($this->variables as $variable){
            $x[$variable->getName()] = $variable->getValue();
        }

        return $x;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    
    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }  
    
    public static function rawArrayToCleanArray($hasil){
        
        
        $cleanHasil = array(array(array("totalRow"=>0)),array());
        $listVar = array();
        foreach ($hasil[1] as $raw){
            $listVar[$raw["name"]] = $raw["value"];
        }
   
        $cleanHasil[1][0] = $listVar;
        return $cleanHasil;
    }
    
    public static function toVariablePrefix($string){
        $string = explode("_", $string);
        $newStr = "";
        $i = 0;
        foreach($string as $str){
           
            $newStr .=$i==0?$str:ucfirst($str);
            $i++;
        }
        return $newStr;
    }
    
    protected function extraSetArrayTable() {
       $vars = $this->getVariables();
       foreach($vars as $var){
           if($var instanceof Hrd_Models_App_ParameterEntity){
        
               $name = Hrd_Models_App_Parameter::toVariablePrefix("set_".$var->getName());
               
               if(method_exists($this, $name)){
                  
                   $this->$name($var->getValue());
               }
           }
       }
    }


    /* return string */
    abstract function getModuleName();
    abstract function extraGetArrayTable();

}

?>
