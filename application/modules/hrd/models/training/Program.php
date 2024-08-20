<?php

/**
 * Description of Program
 *
 * @author MIS
 */
class Hrd_Models_Training_Program extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $groupTraining;
    private $code;
    private $type;
    private $days;
    private $duration;
    private $inHouse;
    private $organizer;
    private $cost;
    private $theme;
    private $isActive;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "programtraining_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['programtraining_id'])){
           $this->setId($x['programtraining_id']); 
        }
        if(isset ($x['grouptraining_grouptraining_id'])){
           $this->getGroupTraining()->setId($x['grouptraining_grouptraining_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['trainingtype'])){
           $this->setType($x['trainingtype']); 
        }
        if(isset ($x['days'])){
           $this->setDays($x['days']); 
        }
        if(isset ($x['duration'])){
           $this->setDuration($x['duration']); 
        }
        if(isset ($x['is_inhouse'])){
           $this->setInHouse($x['is_inhouse']); 
        }
        if(isset ($x['organizer'])){
           $this->setOrganizer($x['organizer']); 
        }
        if(isset ($x['cost'])){
           $this->setCost($x['cost']); 
        }
        if(isset ($x['theme'])){
           $this->setTheme($x['theme']); 
        }
        if(isset ($x['is_active'])){
           $this->setIsActive($x['is_active']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'programtraining_id'=>$this->getId(),
            'grouptraining_grouptraining_id'=>$this->getGroupTraining()->getId(),
            'code'=>$this->getCode(),
            'trainingtype'=>$this->getType(),
            'days'=>$this->getDays(),
            'duration'=>$this->getDuration(),
            'is_inhouse'=>$this->getInHouse(),
            'organizer'=>$this->getOrganizer(),
            'cost'=>$this->getCost(),
            'theme'=>$this->getTheme(),
            'is_active'=>$this->getIsActive()
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

    public function getGroupTraining() {
        if(!$this->groupTraining){
            $this->groupTraining = new Hrd_Models_Training_Group();
        }
        return $this->groupTraining;
    }

    public function setGroupTraining(Hrd_Models_Training_Group $groupTraining) {
        $this->groupTraining = $groupTraining;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getDays() {
        return $this->days;
    }

    public function setDays($days) {
        $this->days = (int)$days;
    }

    public function getDuration() {
        return $this->duration;
    }

    public function setDuration($duration) {
        $this->duration = $duration;
    }

    public function getInHouse() {
        return $this->inHouse;
    }

    public function setInHouse($inHouse) {
        $this->inHouse = $inHouse;
    }

    public function getOrganizer() {
        return $this->organizer;
    }

    public function setOrganizer($organizer) {
        $this->organizer = $organizer;
    }

    public function getCost() {
        return $this->cost;
    }

    public function setCost($cost) {
        $this->cost = (double)$cost;
    }

    public function getTheme() {
        return $this->theme;
    }

    public function setTheme($theme) {
        $this->theme = $theme;
    }

    public function getIsActive() {
        return $this->isActive;
    }

    public function setIsActive($isActive) {
        $this->isActive = (boolean)$isActive;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getGroupTraining(),$this->getProject(),$this->getPt());
    }


}

?>
