<?php

/**
 * Description of Currency
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_General_Currency extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    private $name;
    private $country;
    private $symbol;
    private $symbol1;
    private $description;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "currency_";
    }
    
    
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['currency_id'])){
           $this->setId($x['currency_id']); 
        }
         if(isset ($x['currency_name'])){
           $this->setName($x['currency_name']); 
        }
        if(isset ($x['currency_country'])){
           $this->setCountry($x['currency_country']); 
        }
        if(isset ($x['currency_symbol'])){
           $this->setSymbol($x['currency_symbol']); 
        }
        if(isset ($x['currency_symbol_1'])){
           $this->setSymbol1($x['currency_symbol_1']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
     
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'currency_id'=>$this->getId(),
            'currency_name'=>$this->getName(),
            'currency_country'=>$this->getCountry(),
            'currency_symbol'=>$this->getSymbol(),
            'currency_symbol_1'=>$this->getSymbol1(),
            'description'=>$this->getDescription()
           
        );
      
        return $x;
    }
    
    
    public function getName() {
        return $this->name;
    }

    public function getCountry() {
        return $this->country;
    }

    public function getSymbol() {
        return $this->symbol;
    }

    public function getSymbol1() {
        return $this->symbol1;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setCountry($country) {
        $this->country = $country;
    }

    public function setSymbol($symbol) {
        $this->symbol = $symbol;
    }

    public function setSymbol1($symbol1) {
        $this->symbol1 = $symbol1;
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
