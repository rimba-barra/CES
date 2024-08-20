<?php

/**
 * Description of Religion
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_BloodGroup extends Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "bloodgroup_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['bloodgroup_id'])){
           $this->setId($x['bloodgroup_id']); 
        }
        if(isset ($x['bloodgroup'])){
           $this->setName($x['bloodgroup']); 
        }
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "bloodgroup_id"=>$this->getId(),
            "bloodgroup"=>$this->getName()
        );
      
        return $x;
    }



}

?>
