<?php

/**
 * Description of Religion
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_Education extends Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "education_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['education_id'])){
           $this->setId($x['education_id']); 
        }
        if(isset ($x['education'])){
           $this->setName($x['education']); 
        }
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "education_id"=>$this->getId(),
            "education"=>$this->getName()
        );
      
        return $x;
    }



}

?>
