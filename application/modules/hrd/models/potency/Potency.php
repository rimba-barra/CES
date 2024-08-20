<?php

/**
 * Description of Child
 *
 * @author MIS
 */
class Hrd_Models_Potency_Potency extends Box_Models_ObjectEmbedData implements Box_Arried{
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "potency_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['potency_id'])){
           $this->setId($x['potency_id']); 
        }
        if(isset ($x['potency'])){
           $this->setName($x['potency']); 
        }
       
       
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'potency_id'=>$this->getId(),
            'potency'=>$this->getName()
        );
      
        return $x;
    }
    
    
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    

    public function getArray() {
        return $this->getArrayTable();
    }

    
}

?>
