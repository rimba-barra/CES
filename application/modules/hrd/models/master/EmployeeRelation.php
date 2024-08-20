<?php

/**
 * Description of EmployeeProfile
 *
 * @author MIS
 */
class Hrd_Models_Master_EmployeeRelation extends Hrd_Models_Master_Employee{
    private $spouse;
    private $mother;
    private $father;
    private $marriageDate;
    protected $childs;
    protected $emgContact;
    protected $saudaras;


    public function __construct() {
        parent::__construct();
        $this->childs = array();
        $this->saudaras = array();
        $this->emgContact = array();
    }
    
    public function getSpouse() {
        if(!$this->spouse){
            $this->spouse = new Hrd_Models_Master_Spouse();
        }
        return $this->spouse;
    }

    public function setSpouse(Hrd_Models_Master_Spouse $spouse) {
        $this->spouse = $spouse;
    }

    public function getMother() {
        if(!$this->mother){
            $this->mother = new Hrd_Models_Master_Relation("mother_");
        }
        return $this->mother;
    }

    public function setMother($mother) {
        $this->mother = $mother;
    }

    public function getFather() {
        if(!$this->father){
            $this->father = new Hrd_Models_Master_Relation("father_");
        }
        return $this->father;
    }

    public function setFather($father) {
        $this->father = $father;
    }

   
    
    
    public function getMarriageDate() {
        return $this->marriageDate;
    }

    public function setMarriageDate($marriageDate) {
        $this->marriageDate = $marriageDate;
    }
    
    public function getSaudaras() {
        return $this->saudaras;
    }

    public function setSaudaras($saudaras) {
        $this->saudaras = (array)$saudaras;
    }
    
    public function addSaudara(Hrd_Models_Master_Saudara $s){
        $this->saudaras[] = $s;
    }

        
    public function getChilds() {
        return $this->childs;
    }

    public function setChilds($childs) {
        $this->childs = (array)$childs;
    }
    
    public function addChild(Hrd_Models_Master_Child $c){
        $this->childs[] = $c;
    }
    
    public function getEmgContact() {
        return $this->emgContact;
    }

    public function setEmgContact($emgContact) {
        $this->emgContact = (array)$emgContact;
    }
    
    public function addEmgContact(Hrd_Models_Master_EmergencyContact $c){
        $this->emgContact[] = $c;
    }

    
    
        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        if(isset ($dataArray['marriage_date'])){
           $this->setMarriageDate($dataArray['marriage_date']); 
        }
        
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            "marriage_date"=>$this->getMarriageDate()
        );
        $x = array_merge($x,$y);
        //$m = $this->getMother()->getArrayTable();
        //$f = $this->getFather()->getArrayTable();
       // $s = $this->getSpouse()->getArrayTable();
        return $x;
    } 
    
    public function grouped() {
        $x = parent::grouped();
        $y = array($this->getSpouse(),$this->getFather(),$this->getMother());
        $x = array_merge($x,$y);
        return $x;
    }
    
    
}

?>
