<?php


/**
 * Description of PaymentMethod
 *
 * @author tommytoban
 */
class Cashier_Models_Master_PaymentMethod extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "paymentmethod_";
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

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['paymentmethod_id'])){
           $this->setId($x['paymentmethod_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['paymentmethod'])){
           $this->setName($x['paymentmethod']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
        
 
        
    }
    
    public function getArrayTable(){
        $x = array(
            "paymentmethod_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "paymentmethod"=>$this->getName(),
            "description"=>$this->getDescription()
        );
        
        return $x;
    }


}

?>
