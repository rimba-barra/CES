<?php

/**
 * Description of Status
 *
 * @author MIS
 */
class Cashier_Models_Unit_Status extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'unitstatus_';
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

        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['unitstatus_id'])){
           $this->setId($x['unitstatus_id']); 
        }
        if(isset ($x['status'])){
           $this->setName($x['status']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'unitstatus_id'=>$this->getId(),
            'status'=>$this->getName(),
            'description'=>$this->getDescription()
        );
        
        return $x;
    }
}

?>
