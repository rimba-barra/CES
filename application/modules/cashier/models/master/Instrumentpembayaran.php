<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Cashier_Models_Master_Instrumentpembayaran extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "instrumentpembayaran_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;  
        if(isset ($x['instrumentpembayaran_id'])){
           $this->setId($x['instrumentpembayaran_id']); 
        }
        if(isset ($x['instrumentpembayaran'])){
           $this->setName($x['instrumentpembayaran']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "instrumentpembayaran_id"=>$this->getId(),
            "instrumentpembayaran"=>$this->getName()
        );
      
        return $x;
    }



}

?>
