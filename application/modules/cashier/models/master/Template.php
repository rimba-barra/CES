<?php

/**
 * Description of Type
 *
 * @author MIS
 */
class Cashier_Models_Master_Template extends Cashier_Box_Models_ObjectEmbedData {

    private $name;
    private $mrt_json;

    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
     //   $this->embedPrefix = 'type_';
        $this->embedPrefix = $embedPrefix==NULL?'template_':$embedPrefix;
    }
    
    function getName() {
        return $this->name;
    }

   
    function setName($name) {
        $this->name = $name;
    }
    function getMrt_json() {
        return $this->mrt_json;
    }

    function setMrt_json($mrt_json) {
        $this->mrt_json = $mrt_json;
    }

                
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['template_id'])){
          $this->setId($x['template_id']);
        }
        if(isset ($x['name'])){
          $this->setName($x['name']);
        }
        if(isset ($x['mrt_json'])){
          $this->setMrt_json($x['mrt_json']);
        }
     
        unset($x);
        
   
        
    }
    
    public function getArrayTable(){
        $x = array(
            "template_id"=>$this->getId(),
            "name"=> $this->getName(),
            "mrt_json"=> $this->getMrt_json(),
            
        );
      
        
        return $x;
    }


    
}

?>
