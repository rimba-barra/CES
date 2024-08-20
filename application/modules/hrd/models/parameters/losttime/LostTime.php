<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LostTime
 *
 * @author MIS
 */
class Hrd_Models_Parameters_Losttime_LostTime extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $absentType;
    private $description;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parameterlosttime_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['losttime_param_id'])){
           $this->setId($x['losttime_param_id']); 
        }
        if(isset ($x['absenttype_absenttype_id'])){
           $this->getAbsentType()->setId($x['absenttype_absenttype_id']); 
           
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'losttime_param_id'=>$this->getId(),
            'absenttype_absenttype_id'=>$this->getAbsentType()->getId(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }
    
    public function getAbsentType() {
        if(!$this->absentType){
            $this->absentType = new Hrd_Models_Master_AbsentType();
        }
        return $this->absentType;
    }

    public function setAbsentType(Hrd_Models_Master_AbsentType $absentType) {
        $this->absentType = $absentType;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getAbsentType());
    }


}

?>
