<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Project
 *
 * @author Tommy Toban <mail@tommytoban.com>
 */
class Erems_Models_Project_Project extends Erems_Box_Models_ObjectEmbedData {
    private $subholdingId;
    private $projectId;
    private $ptProyek;
    private $code;
    private $name;
    private $description;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'project_';
        

    }
    public function getSubholdingId() {
        return $this->subholdingId;
        
    }

    public function setSubholdingId($subholdingId) {
        $this->subholdingId = $subholdingId;
    }

    public function getProjectId() {
        return $this->projectId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function getPtProyek() {
        return $this->ptProyek;
    }

    public function setPtProyek($ptProyek) {
        $this->ptProyek = $ptProyek;
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

    public function getArrayTable() {
        $x = array();
        $x['pt_id'] = $this->getId();
        $x['subholding_id'] = $this->getSubholdingId();
        $x['project_id'] = $this->getProjectId();
        $x['pt_proyek'] = $this->getPtProyek();
        $x['code'] = $this->getCode();
        $x['name'] = $this->getName();
        $x['description'] = $this->getDescription();
        return $x;
    }

    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['pt_id']);
        $this->setSubholdingId($x['subholding_id']);
        $this->setProjectId($x['project_id']);
        $this->setPtProyek($x['pt_proyek']);
        $this->setCode($x['code']);
        $this->setName($x['name']);
        $this->setDescription($x['description']); 
    }

    
    
    
    
    
    

   
  


}

?>
