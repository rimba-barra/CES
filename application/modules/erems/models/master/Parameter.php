<?php


/**
 * Description of Parameter
 *
 * @author MIS
 */
class Erems_Models_Master_Parameter extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
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

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parameter_id'])){
           $this->setId($x['parameter_id']); 
        }
        if(isset ($x['parametername'])){
           $this->setName($x['parametername']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['datatype'])){
           $this->setType($x['datatype']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'parameter_id'=>$this->getId(),
            'parametername'=>$this->getName(),
            'value'=>$this->getValue(),
            'datatype'=>$this->getType(),
            'description'=>$this->getDescription()
            
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
