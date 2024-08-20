<?php

/**
 * Description of SpkType
 *
 * @author MIS
 */
class Erems_Models_Master_SpkType extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "spktype_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['spktype_id'])){
           $this->setId($x['spktype_id']); 
        }
        if(isset ($x['spktype'])){
           $this->setName($x['spktype']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'spktype_id'=>$this->getId(),
            'spktype'=>$this->getName()
            
        );
        
        return $x;
    }


}

?>
