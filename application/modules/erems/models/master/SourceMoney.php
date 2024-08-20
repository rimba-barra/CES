<?php

/**
 * Description of SourceMoney
 *
 * @author MIS
 */
class Erems_Models_Master_SourceMoney extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'sourcemoney_';
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
        
        if(isset ($x['sourcemoney_id'])){
          $this->setId($x['sourcemoney_id']);
        }
        if(isset ($x['sourcemoney'])){
          $this->setName($x['sourcemoney']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'sourcemoney_id'=>$this->getId(),
            'sourcemoney'=>$this->getName(),
            'description'=>$this->getDescription()
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    
    
    


}

?>
