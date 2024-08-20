<?php

/**
 * Description of JobHistory
 *
 * @author MIS
 */
class Hrd_Models_Master_JobHistory extends Box_Models_ObjectEmbedData implements Box_Arried{
    private $companyName;
    private $employee;
    private $divisionName;
    private $positionName;
    private $startDate;
    private $endDate;
    private $lineOfBusiness;
    private $lamaKerja;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jobhistory_";
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['jobhistory_id'])){
           $this->setId($x['jobhistory_id']); 
        }
        if(isset ($x['company_name'])){
           $this->setCompanyName($x['company_name']); 
        }
        if(isset ($x['employee_id'])){
           $this->getEmployee()->setId($x['employee_id']); 
        }
        if(isset ($x['division'])){
           $this->setDivisionName($x['division']); 
        }
        if(isset ($x['position'])){
           $this->setPositionName($x['position']); 
        }
        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        if(isset ($x['end_date'])){
           $this->setEndDate($x['end_date']); 
        }
        if(isset ($x['line_of_business'])){
           $this->setLineOfBusiness($x['line_of_business']); 
        }
        if(isset ($x['deleted'])){
           $this->setDeleted($x['deleted']); 
        }
        if(isset ($x['lamakerja'])){
           $this->setLamaKerja($x['lamakerja']); 
        }
        unset($x);

        
    }
    
    public function getArrayTable(){
      
        $x = array(
            "jobhistory_id"=>$this->getId(),
            "company_name"=>$this->getCompanyName(),
            "employee_id"=>$this->getEmployee()->getId(),
            "division"=>$this->getDivisionName(),
            "position"=>$this->getPositionName(),
            "start_date"=>$this->getStartDate(),
            "end_date"=>$this->getEndDate(),
            "line_of_business"=>$this->getLineOfBusiness(),
            "deleted"=>$this->getDeleted(),
            "lamakerja"=>$this->getLamaKerja()
        );
      
        return $x;
    }
    
    public function getCompanyName() {
        return $this->companyName;
    }

    public function setCompanyName($companyName) {
        $this->companyName = $companyName;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee($employee) {
        $this->employee = $employee;
    }

    public function getDivisionName() {
        return $this->divisionName;
    }

    public function setDivisionName($divisionName) {
        $this->divisionName = $divisionName;
    }

    public function getPositionName() {
        return $this->positionName;
    }

    public function setPositionName($positionName) {
        $this->positionName = $positionName;
    }

    public function getStartDate() {
        return $this->startDate;
    }

    public function setStartDate($startDate) {
        $this->startDate = $startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function setEndDate($endDate) {
        $this->endDate = $endDate;
    }

    public function getLineOfBusiness() {
        return $this->lineOfBusiness;
    }

    public function setLineOfBusiness($lineOfBusiness) {
        $this->lineOfBusiness = $lineOfBusiness;
    }
    
    public function getLamaKerja() {
        return $this->lamaKerja;
    }

    public function setLamaKerja($lamaKerja) {
        $this->lamaKerja = $lamaKerja;
    }

    
    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("start_date","end_date");
    }


}

?>
