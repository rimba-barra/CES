<?php

/**
 * Description of ScheduleType
 *
 * @author MIS
 */
class Cashier_Models_Master_ScheduleType extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'scheduletype_';
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
    
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['scheduletype_id'])){
          $this->setId($x['scheduletype_id']);
        }
        if(isset ($x['scheduletype'])){
          $this->setName($x['scheduletype']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
        unset($x);
        
        
        
    }
    
    public function getArrayTable(){
        $x = array(
           'scheduletype_id'=>$this->getId(),
            'scheduletype'=>$this->getName(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }


}

?>
