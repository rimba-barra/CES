<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Cashier_Models_Master_Provinsi extends Cashier_Box_Models_ObjectEmbedData {
    private $id;
    private $name;
    private $country_id;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "provinsi_";
    }  
    public function setName($name) {
        $this->name = $name;
    }  
    
    public function getName() {
        return $this->name;
    }
    
    public function setcountry_id($param) {
        $this->country_id = $param;
    }
    public function getcountry_id() {
        return $this->country_id;
    }  
    public function setdescription($param) {
        $this->description = $param;
    }
    public function getdescription() {
        return $this->description;
    }  
     
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;  
        if(isset ($x['province_id'])){
           $this->setId($x['province_id']); 
        }
        if(isset ($x['province_name'])){
           $this->setName($x['province_name']); 
        }
         if(isset ($x['country_id'])){
           $this->setcountry_id($x['country_id']); 
        }
        if(isset ($x['description'])){
           $this->setdescription($x['description']); 
        }        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "province_id"=>$this->getId(),
            "province_name"=>$this->getName(),
            "country_id"=>$this->getcountry_id(),
            "description"=>$this->getdescription(),
        );      
        return $x;
    }



}

?>
