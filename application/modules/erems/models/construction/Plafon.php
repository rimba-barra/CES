<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Plafon
 *
 * @author MIS
 */
class Erems_Models_Construction_Plafon extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {
    private $name;
    private $percent;
    private $isDefault;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "plafon_";
       
    
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['plafon_id'])){
           $this->setId($x['plafon_id']); 
        }
        if(isset ($x['plafon'])){
           $this->setName($x['plafon']); 
        }
        if(isset ($x['persen_desc'])){
           $this->setPercent($x['persen_desc']); 
        }
        if(isset ($x['is_default'])){
           $this->setIsDefault($x['is_default']); 
        }
       
        
        unset($x);
    }
    public function getArrayTable() {
        $x = array(
            "plafon_id"=>$this->getId(),
            "plafon"=>$this->getName(),
            "persen_desc"=>$this->getPercent(),
            "is_default"=>$this->getIsDefault()
        );
        return $x;
                
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPercent() {
        return $this->percent;
    }

    public function setPercent($percent) {
        $this->percent = (double)$percent;
    }

    public function getIsDefault() {
        return $this->isDefault;
    }

    public function setIsDefault($isDefault) {
        $this->isDefault = $isDefault;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


}

?>
