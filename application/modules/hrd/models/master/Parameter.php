<?php


/**
 * Description of Parameter
 *
 * @author MIS
 */
class Hrd_Models_Master_Parameter extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    private $name;
    private $value;
    private $type;
    private $description;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parameter_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['generalparameter_id'])){
           $this->setId($x['generalparameter_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'generalparameter_id'=>$this->getId(),
            'name'=>$this->getName(),
            'value'=>$this->getValue(),
            
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }


}

?>
