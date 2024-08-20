<?php


/**
 * Description of Leave
 *
 * @author MIS
 */
class Hrd_Models_Absent_Reasondetail extends Box_Models_ObjectEmbedData {
    private $absenttype;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "reasondetail_";
        
    }
    
    function getDescription() {
        return strval($this->description);
    }

    function setDescription($description) {
        $this->description = $description;
    }
    
    function getAbsenttype() {
        return strval($this->absenttype);
    }

    function setAbsenttype($absenttype) {
        $this->absenttype = $absenttype;
    }

    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
         
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }

        if(isset ($x['absenttype'])){
           $this->setAbsenttype($x['absenttype']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'absenttype'=>$this->getAbsentType(),
	    'description'=>$this->getDescription()

        );
      
        return $x;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

}

?>
