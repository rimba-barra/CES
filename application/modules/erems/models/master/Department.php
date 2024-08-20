<?php
/**
 * Description of Department
 *
 * @author MIS
 */
class Erems_Models_Master_Department extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'department_';
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
        if(isset ($x['department_id'])){
           $this->setId($x['department_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['department'])){
           $this->setName($x['department']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
      
    }
    
    public function getArrayTable(){
        $x = array();
        $x['department_id'] = $this->getId();
        $x['code']  = $this->getCode();
        $x['department'] = $this->getName();
        $x['description'] = $this->getDescription();
        
        return $x;
    }
    
    


}

?>
