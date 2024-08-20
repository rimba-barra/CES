<?php

/**
 * Description of PurposeBuy
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_PurposeBuy extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    
    private $name;
    private $description;
    
    
    
    
     public function __construct() {
        parent::__construct();
        $this->embedPrefix = "purposebuy_";
    }
    
     public function setArrayTable($dataArray=NULL) {
 
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['purposebuy_id'])){
           $this->setId($x['purposebuy_id']); 
        }
        if(isset ($x['purposebuy'])){
           $this->setName($x['purposebuy']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        unset($x);
        
       
        
    }
    
    public function getArrayTable(){
        $x = array(
            "purposebuy_id"=>$this->getId(),
            "purposebuy"=>$this->getName(),
            "description"=>$this->getDescription()
        );
      
        return $x;
    }
    
    function getName() {
        return $this->name;
    }

    function getDescription() {
        return $this->description;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setDescription($description) {
        $this->description = $description;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
