<?php

/**
 * Description of Reason
 *
 * @author tommytoban
 */
abstract class Cashier_Models_Sales_Reason extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setArrayTable($dataArray=NULL) {

        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['code'])){
          $this->setCode($x['code']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
       
        $this->setArrayTableEx($x);
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'code'=>$this->getCode(),
            'description'=>$this->getDescription()
        );
        $y = $this->getArrayTableEx();
        $x = array_merge($x,$y);
        return $x;
    }
    
    /*@param $dataArray*/
    abstract function setArrayTableEx($dataArray);
    
    /*@return array */
    abstract function getArrayTableEx();
    
    


}
