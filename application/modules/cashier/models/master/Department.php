<?php
/**
 * Description of Department
 *
 * @author MIS
 */
class Cashier_Models_Master_Department extends Cashier_Box_Models_ObjectEmbedData  implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    private $code;
    private $name;
    private $description;
    
     public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'department_';
    }
    
    function getCode() {
        return $this->code;
    }

    function getName() {
        return $this->name;
    }

    function getDescription() {
        return $this->description;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setDescription($description) {
        $this->description = $description;
    }

        
    public function setArrayTable($dataArray=NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['department_id'])){
           $this->setId($x['department_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['department'])){
           $this->setName($x['department']); 
        }
        if(isset ($x['name'])){
            $this->setName($x['name']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
    }
    
    public function getArrayTable(){

        $x = array(
            "department_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "name"=>$this->getName(),
            "description"=>$this->getDescription(),
      
              
        );
        
        return $x;
        
    }
    
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
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
