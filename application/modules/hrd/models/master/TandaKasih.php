<?php

/**
 * Description of TandaKasih
 *
 * @author MIS
 */
class Hrd_Models_Master_TandaKasih extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $group;
    private $firstMarriage;
    private $firstMarriagePlus;
    private $birthOfChild;
    private $birthOfChildPlus;
    private $sickInHospital;
    private $sickInHospitalPlus;
    private $parentPassAway;
    private $parentPassAwayPlus;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "tandakasih_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['tandakasih_id'])){
           $this->setId($x['tandakasih_id']); 
        }
        if(isset ($x['group_group_id'])){
           $this->getGroup()->setId($x['group_group_id']); 
        }
        if(isset ($x['first_marriage'])){
           $this->setFirstMarriage($x['first_marriage']); 
        }
        if(isset ($x['first_marriage_plus'])){
           $this->setFirstMarriagePlus($x['first_marriage_plus']); 
        }
        if(isset ($x['birth_of_child'])){
           $this->setBirthOfChild($x['birth_of_child']); 
        }
        if(isset ($x['birth_of_child_plus'])){
           $this->setBirthOfChildPlus($x['birth_of_child_plus']); 
        }
        if(isset ($x['sick_in_hospital'])){
           $this->setSickInHospital($x['sick_in_hospital']); 
        }
        if(isset ($x['sick_in_hospital_plus'])){
           $this->setSickInHospitalPlus($x['sick_in_hospital_plus']); 
        }
        if(isset ($x['parent_passaway'])){
           $this->setParentPassAway($x['parent_passaway']); 
        }
        if(isset ($x['parent_passaway_plus'])){
           $this->setParentPassAwayPlus($x['parent_passaway_plus']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'tandakasih_id'=>$this->getId(),
            'group_group_id'=>$this->getGroup()->getId(),
            'first_marriage'=>$this->getFirstMarriage(),
            'first_marriage_plus'=>$this->getFirstMarriagePlus(),
            'birth_of_child'=>$this->getBirthOfChild(),
            'birth_of_child_plus'=>$this->getBirthOfChildPlus(),
            'sick_in_hospital'=>$this->getSickInHospital(),
            'sick_in_hospital_plus'=>$this->getSickInHospitalPlus(),
            'parent_passaway'=>$this->getParentPassAway(),
            'parent_passaway_plus'=>$this->getParentPassAwayPlus()
        );
      
        return $x;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_Group();
        }
        return $this->group;
    }

    public function setGroup(Hrd_Models_Master_Group $group) {
        $this->group = $group;
    }

    public function getFirstMarriage() {
        return $this->firstMarriage;
    }

    public function setFirstMarriage($firstMarriage) {
        $this->firstMarriage = $firstMarriage;
    }

    public function getFirstMarriagePlus() {
        return $this->firstMarriagePlus;
    }

    public function setFirstMarriagePlus($firstMarriagePlus) {
        $this->firstMarriagePlus = $firstMarriagePlus;
    }

    public function getBirthOfChild() {
        return $this->birthOfChild;
    }

    public function setBirthOfChild($birthOfChild) {
        $this->birthOfChild = $birthOfChild;
    }

    public function getBirthOfChildPlus() {
        return $this->birthOfChildPlus;
    }

    public function setBirthOfChildPlus($birthOfChildPlus) {
        $this->birthOfChildPlus = $birthOfChildPlus;
    }

    public function getSickInHospital() {
        return $this->sickInHospital;
    }

    public function setSickInHospital($sickInHospital) {
        $this->sickInHospital = $sickInHospital;
    }

    public function getSickInHospitalPlus() {
        return $this->sickInHospitalPlus;
    }

    public function setSickInHospitalPlus($sickInHospitalPlus) {
        $this->sickInHospitalPlus = $sickInHospitalPlus;
    }

    public function getParentPassAway() {
        return $this->parentPassAway;
    }

    public function setParentPassAway($parentPassAway) {
        $this->parentPassAway = $parentPassAway;
    }

    public function getParentPassAwayPlus() {
        return $this->parentPassAwayPlus;
    }

    public function setParentPassAwayPlus($parentPassAwayPlus) {
        $this->parentPassAwayPlus = $parentPassAwayPlus;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


    
}

?>
