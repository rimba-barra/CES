<?php

/**
 * Description of Religion
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_MarriageStatus extends Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "marriagestatus_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['marriagestatus_id'])){
           $this->setId($x['marriagestatus_id']); 
        }
        if(isset ($x['marriagestatus'])){
           $this->setName($x['marriagestatus']); 
        }
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "marriagestatus_id"=>$this->getId(),
            "marriagestatus"=>$this->getName()
        );
      
        return $x;
    }



}

?>
