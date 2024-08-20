<?php
/**
 * Description of PaymentType
 *
 * @author MIS
 */
class Erems_Models_Master_PaymentType extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'paymenttype_';
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
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
      
        if(isset ($x['paymenttype_id'])){
           $this->setId($x['paymenttype_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['paymenttype'])){
           $this->setName($x['paymenttype']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
        
    }
    
    
    public function getArrayTable(){
        $x = array();
        $x['paymenttype_id'] = $this->getId();
        $x['code']  = $this->getCode();
        $x['paymenttype'] = $this->getName();
        $x['description'] = $this->getDescription();
        return $x;
    }

    

}

?>
