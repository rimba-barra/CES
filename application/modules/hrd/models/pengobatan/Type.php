<?php
/**
 * Description of Type
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_Type extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $code;
    private $name;
    private $percentValue;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jenispengobatan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jenispengobatan_id'])){
           $this->setId($x['jenispengobatan_id']); 
        }
        if(isset ($x['jenispengobatan'])){
           $this->setName($x['jenispengobatan']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['percent_value'])){
           $this->setPercentValue($x['percent_value']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'jenispengobatan_id'=>$this->getId(),
            'jenispengobatan'=>$this->getName(),
            'code'=>$this->getCode(),
            'percent_value'=>$this->getPercentValue()
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
    
    public function getPercentValue() {
        return $this->percentValue;
    }

    public function setPercentValue($percentValue) {
        $this->percentValue = $percentValue;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


}

?>
