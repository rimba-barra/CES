<?php

/**
 * Description of AbsentTypeGroup
 *
 * @author MIS
 */
class Hrd_Models_Master_AbsentTypeGroup extends Box_Models_ObjectEmbedData {
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "absenttypegroup_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['absenttypegroup_id'])){
           $this->setId($x['absenttypegroup_id']); 
        }
        if(isset ($x['absenttypegroup'])){
           $this->setName($x['absenttypegroup']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'absenttypegroup_id'=>$this->getId(),
            'absenttypegroup'=>$this->getName(),
            'description'=>$this->getDescription()
        );
      
        return $x;
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


}

?>
