<?php

/**
 * Description of Jabatan
 *
 * @author MIS
 */
class Hrd_Models_Master_Jabatan extends Box_Models_ObjectEmbedData {

    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jabatan_";
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['jabatan_id'])){
           $this->setId($x['jabatan_id']); 
        }
        if(isset ($x['jabatan_name'])){
           $this->setName($x['jabatan_name']); 
        }
        
       
        unset($x);

        
    }
    
    public function getArrayTable(){
      
        $x = array(
            "jabatan_id"=>$this->getId(),
            "jabatan_name"=>$this->getName()
        );
      
        return $x;
    }
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

}

?>
