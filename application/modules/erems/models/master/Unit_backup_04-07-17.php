<?php

/**
 * Description of Unit
 *
 * @author MIS
 */
class Erems_Models_Master_Unit extends Erems_Box_Models_ObjectEmbedData {
    private $projectId;
    private $ptId;
    private $clusterId;
    private $number;
    private $blockId;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        //$this->embedPrefix = 'unit_';
         $this->embedPrefix = $embedPrefix==NULL?'unit_':$embedPrefix;
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

    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function getBlockId() {
        return $this->blockId;
    }

    public function setBlockId($blockId) {
        $this->blockId = $blockId;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['unit_id'])){
           $this->setId($x['unit_id']); 
        }
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }
        if(isset ($x['cluster_id'])){
           $this->setClusterId($x['cluster_id']); 
        }
        if(isset ($x['unit_number'])){
           $this->setNumber($x['unit_number']); 
        }
        if(isset ($x['block_id'])){
           $this->setBlockId($x['block_id']); 
        }
        unset($x);
        
        
    }
    
    public function getArrayTable(){
        $x = array();
        $x['unit_id'] = $this->getId();
        $x['project_id']  = $this->getProjectId();
        $x['pt_id'] = $this->getPtId();
        $x['cluster_id'] = $this->getClusterId();
        $x['unit_number'] = $this->getNumber();
        $x['block_id'] = $this->getBlockId();
        return $x;
    }


}

?>
