<?php


/**
 * Description of Department
 *
 * @author MIS
 */
class Hrd_Models_Performancemanagement_Statusperiode extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    public $statusperiode;
    public $description;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "statusperiode_";
    }
    
    /*public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"statusperiode_";
    }*/
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['statusperiode_id'])){
           $this->setId($x['statusperiode_id']); 
        }
        if (isset($x['statusperiode'])) {
            $this->statusperiode = $x['statusperiode'];
        }
		if (isset($x['description'])) {
             $this->description = $x['description'];
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'statusperiode_id'              => $this->getId(),
            'statusperiode'           => $this->statusperiode,
			'description'      => $this->description
        );
      
        return $x;
    }
    
    /*public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getManager() {
        return $this->manager;
    }

    public function setManager($manager) {
        $this->manager = $manager;
    }*/

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


    
    


}

?>
