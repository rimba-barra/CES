<?php

/**
 * Description of City
 *
 * @author MIS
 */
class Cashier_Models_Master_City extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    private $province;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix?$embedPrefix:"city_";
    }
    function getProvince() {
        if(!$this->province){
            $this->province = new Cashier_Models_Master_Provinsi();
        }
        return $this->province;
    }

    function setProvince($province) {
        $this->province = $province;
    }

        public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
   
    
     public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;  
        if(isset ($x['city_id'])){
           $this->setId($x['city_id']); 
        }
        if(isset ($x['city_name'])){
           $this->setName($x['city_name']); 
        }        
        if(isset ($x['provinsi_province_id'])){
           $this->getProvince()->setId($x['provinsi_province_id']); 
        }
       
        unset($x);
        
        
    }
    
    public function getArrayTable(){
        $x = array(
            "city_id"=>$this->getId(),
            "city_name"=>$this->getName(),
            "provinsi_province_id"=>$this->getProvince()->getId(),
        );
      
        return $x;
    }


    
}

?>
