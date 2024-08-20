<?php

/**
 * Description of SanctionType
 *
 * @author MIS
 */
class Hrd_Models_Master_SanctionType extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "sanctiontype_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['sanctiontype_id'])){
           $this->setId($x['sanctiontype_id']); 
        }
        if(isset ($x['sanctiontype'])){
           $this->setName($x['sanctiontype']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'sanctiontype_id'=>$this->getId(),
            'sanctiontype'=>$this->getName(),
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

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }    
}

?>
