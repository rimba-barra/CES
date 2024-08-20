<?php

/**
 * Description of Country
 *
 * @author MIS
 */
class Erems_Models_Master_Country extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix?$embedPrefix:"country_";
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['country_id'])){
           $this->setId($x['country_id']); 
        }
        if(isset ($x['country_code'])){
           $this->setCode($x['country_code']); 
        }
        if(isset ($x['country_name'])){
           $this->setName($x['country_name']); 
        }
       
        unset($x);
        
        
    }
    
    public function getArrayTable(){
        $x = array(
            "country_id"=>$this->getId(),
            "country_code"=>$this->getCode(),
            "country_name"=>$this->getName()
        );
      
        return $x;
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


}

?>
