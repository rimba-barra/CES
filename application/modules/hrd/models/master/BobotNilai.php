<?php
/**
 * Description of BobotNilai
 *
 * @author MIS
 */
class Hrd_Models_Master_BobotNilai extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $code;
    private $itemNumber;
    private $value;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "bobotnilai_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['bobotnilai_id'])){
           $this->setId($x['bobotnilai_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['item_number'])){
           $this->setItemNumber($x['item_number']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'bobotnilai_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'item_number'=>$this->getItemNumber(),
            'value'=>$this->getValue()
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getItemNumber() {
        return $this->itemNumber;
    }

    public function setItemNumber($itemNumber) {
        $this->itemNumber = (int)$itemNumber;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = (int)$value;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    


}

?>
