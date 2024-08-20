<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Erems_Models_Master_Npwpklu extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "npwpklu_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;  
        if(isset ($x['npwp_klu_id'])){
           $this->setId($x['npwp_klu_id']); 
        }
        if(isset ($x['KLU'])){
           $this->setName($x['KLU']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "npwp_klu_id"=>$this->getId(),
            "KLU"=>$this->getName()
        );
      
        return $x;
    }



}

?>
