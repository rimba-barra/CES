<?php
/**
 * Description of Organization
 *
 * @author MIS
 */
class Hrd_Models_Organization_Organization extends Box_Models_ObjectEmbedData implements Box_Arried {
    private $employee;
    private $name;
    private $position;
    private $startYear;
    private $endYear;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "organization_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['organization_id'])){
           $this->setId($x['organization_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->getEmployee()->setId($x['employee_id']); 
        }
        if(isset ($x['organization'])){
           $this->setName($x['organization']); 
        }
        if(isset ($x['position'])){
           $this->setPosition($x['position']); 
        }
        if(isset ($x['start_year'])){
           $this->setStartYear($x['start_year']); 
        }
        if(isset ($x['end_year'])){
           $this->setEndYear($x['end_year']); 
        }
        if(isset ($x['deleted'])){
           $this->setDeleted($x['deleted']); 
        }
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'organization_id'=>$this->getId(),
            'employee_id'=>$this->getEmployee()->getId(),
            'organization'=>$this->getName(),
            'position'=>$this->getPosition(),
            'start_year'=>$this->getStartYear(),
            'end_year'=>$this->getEndYear(),
            'deleted'=>$this->getDeleted()
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPosition() {
        return $this->position;
    }

    public function setPosition($position) {
        $this->position = $position;
    }

    public function getStartYear() {
        return $this->startYear;
    }

    public function setStartYear($startYear) {
        $this->startYear = $startYear;
    }

    public function getEndYear() {
        return $this->endYear;
    }

    public function setEndYear($endYear) {
        $this->endYear = $endYear;
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>
