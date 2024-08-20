<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Master_Models_Master_Country extends Master_Box_Models_ObjectEmbedData implements Master_Box_Kouti_Remora,  Master_Box_Models_Master_InterProjectPt,Master_Box_Delien_DelimiterCandidate {
    
    
    private $name;
    private $code;
    
   public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'country_';
    }

    function getName() {
        return $this->name;
    }

    function getCode() {
        return $this->code;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setCode($code) {
        $this->code = $code;
    }

    
    
                    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['country_id'])){
           $this->setId($x['country_id']); 
        }
        if(isset ($x['country_name'])){
           $this->setName($x['country_name']); 
        }
       if(isset ($x['country_code'])){
           $this->setCode($x['country_code']); 
        }
       
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "country_id"=>$this->getId(),     
            "country_name"=>$this->getName(),
            "country_code"=>$this->getCode(),
            
        );
        
        return $x;
    }
    


        
    public function getProject() {
       // return $this->project;
    }

    public function setProject(Master_Box_Models_Master_Project $project) {
     //   $this->project = $project;
    }
    
     public function setProjectPt(Master_Box_Models_Master_Project $project, Master_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
       // return $this->pt;
    }

    public function setPt(Master_Box_Models_Master_Pt $pt) {
       // $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getUser());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }



}

?>
