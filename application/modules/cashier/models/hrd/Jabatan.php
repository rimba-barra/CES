<?php

/**
 * Description of Jabatan
 *
 * @author MIS
 */
class Cashier_Models_Hrd_Jabatan extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jabatan_";
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
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jabatan_id'])){
           $this->setId($x['jabatan_id']); 
        }
        if(isset ($x['jabatan_code'])){
           $this->setCode($x['jabatan_code']); 
        }
        if(isset ($x['jabatan_name'])){
           $this->setName($x['jabatan_name']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'jabatan_id'=>$this->getId(),
            'jabatan_code'=>$this->getCode(),
            'jabatan_name'=>$this->getName(),
            'description'=>$this->getDescription()
            
        );
        
        return $x;
    }


}

?>
