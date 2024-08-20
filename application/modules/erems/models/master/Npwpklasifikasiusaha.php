<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Erems_Models_Master_Npwpklasifikasiusaha extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "npwpklasifikasiusaha_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;  
        if(isset ($x['npwp_klasifikasiusaha_id'])){
           $this->setId($x['npwp_klasifikasiusaha_id']); 
        }
        if(isset ($x['klasifikasiusaha'])){
           $this->setName($x['klasifikasiusaha']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "npwp_klasifikasiusaha_id"=>$this->getId(),
            "klasifikasiusaha"=>$this->getName()
        );
      
        return $x;
    }



}

?>
