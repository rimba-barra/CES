<?php

/**
 * Description of PriceType
 *
 * @author MIS
 */
class Erems_Models_Sales_PriceType extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    private $description;
    
    public function __construct($params=NULL) {
        parent::__construct();
        $this->embedPrefix = $params==NULL?'pricetype_':$params;
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
        
        if(isset ($x['pricetype_id'])){
          $this->setId($x['pricetype_id']);
        }
        if(isset ($x['pricetype'])){
          $this->setName($x['pricetype']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
       
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'pricetype_id'=>$this->getId(),
            'pricetype'=>$this->getName(),
            'description'=>$this->getDescription()
        );
        return $x;
    }


}

?>
