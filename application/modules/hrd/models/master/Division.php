<?php
/**
 * Description of Division
 *
 * @author MIS
 */
class Hrd_Models_Master_Division extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $name;
    private $code;
    
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "division_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['division_id'])){
           $this->setId($x['division_id']); 
        }
        if(isset ($x['division'])){
           $this->setName($x['division']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'division_id'=>$this->getId(),
            'division'=>$this->getName(),
            'code'=>$this->getCode()
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }   
}

?>
