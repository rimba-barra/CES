<?php

/**
 * Description of Religion
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_Religion extends Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
       
        $this->embedPrefix = "religion_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['religion_id'])){
           $this->setId($x['religion_id']); 
        }
        if(isset ($x['religion'])){
           $this->setName($x['religion']); 
        }
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "religion_id"=>$this->getId(),
            "religion"=>$this->getName()
        );
      
        return $x;
    }



}

?>
