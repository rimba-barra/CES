<?php


/**
 * Description of Training
 *
 * @author MIS
 */
class Hrd_Models_Master_Training extends Box_Models_ObjectEmbedData implements Box_Arried {
    private $name;
    private $organizer;
    private $employee;
    private $cityName;
    private $years;
    private $sertifikat;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "training_";
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['traininghistory_id'])){
           $this->setId($x['traininghistory_id']); 
        }
        if(isset ($x['training'])){
           $this->setName($x['training']); 
        }
        if(isset ($x['employee_id'])){
           $this->getEmployee()->setId($x['employee_id']); 
        }
        if(isset ($x['organizer'])){
           $this->setOrganizer($x['organizer']); 
        }
        if(isset ($x['city_name'])){
           $this->setCityName($x['city_name']); 
        }
        if(isset ($x['years'])){
           $this->setYears($x['years']); 
        }
       if(isset ($x['deleted'])){
           $this->setDeleted($x['deleted']); 
        }
        if(isset ($x['sertifikat'])){
           $this->setSertifikat($x['sertifikat']); 
        }
        
       
        unset($x);

        
    }
    
    public function getArrayTable(){
      
        $x = array(
            "traininghistory_id"=>$this->getId(),
            "training"=>$this->getName(),
            "employee_id"=>$this->getEmployee()->getId(),
            "organizer"=>$this->getOrganizer(),
            "city_name"=>$this->getCityName(),
            "years"=>$this->getYears(),
            "deleted"=>$this->getDeleted(),
            "sertifikat"=>$this->getSertifikat()
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getOrganizer() {
        return $this->organizer;
    }

    public function setOrganizer($organizer) {
        $this->organizer = $organizer;
    }

    public function getCityName() {
        return $this->cityName;
    }

    public function setCityName($cityName) {
        $this->cityName = $cityName;
    }

    public function getYears() {
        return $this->years;
    }

    public function setYears($years) {
        $this->years = (int)$years;
    }
    
    public function getSertifikat() {
        return $this->sertifikat;
    }

    public function setSertifikat($sertifikat) {
        $this->sertifikat = $sertifikat;
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

    public function getArray() {
        return $this->getArrayTable();
    }

        
    


    
}

?>
