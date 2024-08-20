<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Block
 *
 * @author MIS
 */
class Erems_Models_Master_Block extends Erems_Box_Models_ObjectEmbedData {
    private $projectId;
    private $ptId;
    private $clusterId;
    private $code;
    private $name;
    private $description;
    private $icon;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'block_';
    }
    
    public function getProjectId() {
        return $this->projectId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function getPtId() {
        return $this->ptId;
    }

    public function setPtId($ptId) {
        $this->ptId = $ptId;
    }

    public function getClusterId() {
        return $this->clusterId;
    }

    public function setClusterId($clusterId) {
        $this->clusterId = $clusterId;
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

    public function getIcon() {
        return $this->icon;
    }

    public function setIcon($icon) {
        $this->icon = $icon;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['block_id']);
        $this->setProjectId($x['project_id']);
        $this->setPtId($x['pt_id']);
        $this->setClusterId($x['cluster_id']);
        $this->setCode($x['code']);
        $this->setName($x['block']);
        $this->setDescription($x['description']);
        $this->setIcon($x['icon']);
        
    }
    
    public function getArrayTable(){
        $x = array();
        $x['block_id'] = $this->getId();
        $x['project_id']  = $this->getProjectId();
        $x['pt_id'] = $this->getPtId();
        $x['cluster_id'] = $this->getClusterId();
        $x['code'] = $this->getCode();
        $x['block'] = $this->getName();
        $x['description'] = $this->getDescription();
        $x['icon'] = $this->getIcon();
        return $x;
    }


}

?>
