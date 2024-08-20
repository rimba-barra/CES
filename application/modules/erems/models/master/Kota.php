<?php

/**
 * Description of Purpose
 *
 * @author MIS
 */
class Erems_Models_Master_Purpose extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Models_Master_InterProjectPt {
    private $code;
    private $name;
    private $description;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "purpose_";
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
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

        
     public function setArrayTable($dataArray=NULL) {
 
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['purpose_id'])){
           $this->setId($x['purpose_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['purpose'])){
           $this->setName($x['purpose']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
        
       
        
    }
    
    public function getArrayTable(){
        $x = array(
            "purpose_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "purpose"=>$this->getName(),
            "description"=>$this->getDescription()
        );
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    


}

?>
