<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Cashier_Models_Master_Bentukusaha extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "bentukusaha_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;  
        if(isset ($x['bentukusaha_id'])){
           $this->setId($x['bentukusaha_id']); 
        }
        if(isset ($x['bentukusaha'])){
           $this->setName($x['bentukusaha']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "bentukusaha_id"=>$this->getId(),
            "bentukusaha"=>$this->getName()
        );
      
        return $x;
    }



}

?>
