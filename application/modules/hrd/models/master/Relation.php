<?php

/**
 * Description of Relation
 *
 * @author MIS
 */
class Hrd_Models_Master_Relation extends Box_Models_ObjectEmbedData implements Box_Arried,Box_Kouti_Remora{
    private $name;
    private $birthDate;
    protected $birthPlace;
    private $occupation;
    private $address;
    private $relationType;
    private $lastEducation;
    private $sex;
    private $relationName;
    private $ripDate;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix?$embedPrefix:"relation_";
        $this->_setRelationType($embedPrefix);
        
        
    }
    
    protected  function _setRelationType($embedPrefix){
        $type = new Hrd_Models_Master_RelationType();
        switch ($embedPrefix){
            case "mother_":
                $type->setId(Box_Config::getv("RT_MOTHER"));
                break;
            case "father_":
                $type->setId(Box_Config::getv("RT_FATHER"));
                break;
        }
        $this->setRelationType($type);
    }


    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['relation_id'])){
           $this->setId($x['relation_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['birth_date'])){
           $this->setBirthDate($x['birth_date']); 
        }
        if(isset ($x['address'])){
           $this->setAddress($x['address']); 
        }
        if(isset ($x['job'])){
           $this->setOccupation($x['job']); 
        }
        if(isset ($x['last_education'])){
           $this->getLastEducation()->setId($x['last_education']); 
        }
      /*  if(isset ($x['relationtype_id'])){
           $this->getRelationType()->setId($x['relationtype_id']); 
        }*/
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
        if(isset ($x['birth_place'])){
           $this->setBirthPlace($x['birth_place']); 
        }
        if(isset ($x['deleted'])){
           $this->setDeleted($x['deleted']); 
        }
        if(isset ($x['relation_name'])){
           $this->setRelationName($x['relation_name']); 
        }
        if(isset ($x['rip_date'])){
           $this->setRipDate($x['rip_date']); 
        }
        
       
        unset($x);

        
    }
    
    public function getArrayTable(){
      
        $x = array(
            "relation_id"=>$this->getId(),
            "name"=>$this->getName(),
            "birth_date"=>$this->getBirthDate(),
            "address"=>$this->getAddress(),
            "job"=>$this->getOccupation(),
            "last_education"=>$this->getLastEducation()->getId(),
            "relationtype_id"=>$this->getRelationType()->getId(),
            "sex"=>$this->getSex(),
            "birth_place"=>$this->getBirthPlace(),
            "deleted"=>$this->getDeleted(),
            "relation_name"=>$this->getRelationName(),
            "rip_date"=>$this->getRipDate()
        );
      
        return $x;
    }
    
    public function getBirthPlace() {
        return $this->birthPlace;
    }

    public function setBirthPlace($birthPlace) {
        $this->birthPlace = $birthPlace;
    }

        
    public function getSex() {
        return $this->sex;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }

        
    public function getLastEducation() {
        if(!$this->lastEducation){
            $this->lastEducation = new Hrd_Models_Master_Global_Education();
        }
        return $this->lastEducation;
    }

    public function setLastEducation(Hrd_Models_Master_Global_Education $lastEducation) {
        $this->lastEducation = $lastEducation;
    }

        
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getBirthDate() {
        return $this->birthDate;
    }

    public function setBirthDate($birthDate) {
        $this->birthDate = $this->toDateTime($birthDate);
    }

    public function getOccupation() {
        return $this->occupation;
    }

    public function setOccupation($occupation) {
        $this->occupation = $occupation;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }
    
    public function getRelationName() {
        return $this->relationName;
    }

    public function setRelationName($relationName) {
        $this->relationName = $relationName;
    }

        
    public function getRelationType() {
        if(!$this->relationType){
            $this->relationType = new Hrd_Models_Master_RelationType();
        }
        return $this->relationType;
    }

    public function setRelationType(Hrd_Models_Master_RelationType $relationType) {
      
        $this->relationType = $relationType;
    }
    
    public function getRipDate() {
        return $this->ripDate;
    }

    public function setRipDate($ripDate) {
        $this->ripDate = $ripDate;
    }

    
    public function getArray() {
        return $this->getArrayTable();
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getLastEducation());
    }
    
    protected function getDatefields() {
        return array("birth_date","rip_date");
    }





}

?>
