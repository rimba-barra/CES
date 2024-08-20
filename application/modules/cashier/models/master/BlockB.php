<?php

/**
 * Description of BlockB
 *
 * @author MIS
 */
class Cashier_Models_Master_BlockB extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
       // $this->embedPrefix = "block_";
         $this->embedPrefix = $embedPrefix==NULL?'block_':$embedPrefix;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['block_id'])){
           $this->setId($x['block_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['block'])){
           $this->setName($x['block']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'block_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'block'=>$this->getName()
            
        );
        
        return $x;
    }
    
    


    
}

?>
