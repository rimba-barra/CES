<?php
/**
 * Description of Group
 *
 * @author MIS
 */
class Hrd_Models_Training_Group extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $code;
    private $description;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "grouptraining_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['grouptraining_id'])){
           $this->setId($x['grouptraining_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'grouptraining_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
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
        return array();
    }


    
    


}

?>
