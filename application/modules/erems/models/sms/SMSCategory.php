<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SMSCategory
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Sms_SMSCategory extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $code;
    private $name;
    private $template;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "smscategory_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['smscategory_id'])){
           $this->setId($x['smscategory_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['smscategory'])){
           $this->setName($x['smscategory']); 
        }
        if(isset ($x['template'])){
           $this->setTemplate($x['template']); 
        }
     
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'smscategory_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'smscategory'=>$this->getName(),
            'template'=>$this->getTemplate()
            
        );
        
        return $x;
    }
    
    

    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function getTemplate() {
        return $this->template;
    }

    public function setTemplate($template) {
        $this->template = $template;
    }

    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
