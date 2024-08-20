<?php

/**
 * Description of Contractor
 *
 * @author MIS
 */
class Erems_Models_Master_Contractor extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt {
    private $name;
    private $code;
    private $city;
    private $country;
    private $npwp;
    private $project;
    private $pt;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "contractor_";
    }

    public function getName() {
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
    
    public function getCity() {
        if(!$this->city){
            $this->city = new Erems_Models_Master_City();
        }
        return $this->city;
    }

    public function setCity(Erems_Models_Master_City $city) {
        $this->city = $city;
    }

    public function getCountry() {
        if(!$this->country){
            $this->country = new Erems_Models_Master_Country();
        }
        return $this->country;
    }

    public function setCountry(Erems_Models_Master_Country $country) {
        $this->country = $country;
    }

    public function getNpwp() {
        return $this->npwp;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    
        
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['contractor_id'])){
           $this->setId($x['contractor_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['contractorname'])){
           $this->setName($x['contractorname']); 
        }
        if(isset ($x['city_city_id'])){
           $this->getCity()->setId($x['city_city_id']); 
        }
        if(isset ($x['country_country_id'])){
           $this->getCountry()->setId($x['country_country_id']); 
        }
       if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            "contractor_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "contractorname"=>$this->getName(),
            "city_city_id"=>$this->getCity()->getId(),
            "country_country_id"=>$this->getCountry()->getId(),
            "npwp"=>$this->getNpwp()
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCity(),$this->getCountry());
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
       if(!$this->pt){
           $this->pt = new Erems_Box_Models_Master_Pt();
       }  
       return $this->pt;
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    


}

?>
