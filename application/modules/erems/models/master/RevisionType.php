<?php

/**
 * Description of RevisionType
 *
 * @author tommytoban
 */
class Erems_Models_Master_RevisionType extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "revisiontype_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setArrayTable($dataArray=NULL) {

        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['revisiontype_id'])){
          $this->setId($x['revisiontype_id']);
        }
        if(isset ($x['revisiontype'])){
          $this->setName($x['revisiontype']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
       
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'revisiontype_id'=>$this->getId(),
            'revisiontype'=>$this->getName(),
            'description'=>$this->getDescription()
        );
        return $x;
    }


}
