<?php

/**
 * Description of EmployeePersonal
 *
 * @author MIS
 */
class Hrd_Models_Master_EmployeePersonal extends Hrd_Models_Master_EmployeeRelation implements Box_Models_App_Hermes_HasRelation,Box_Delien_DelimiterCandidate {
    private $educations;
    private $DCResult;
    private $selectedRelation;
    private $relations;
    private $jobHistories;
    private $trainings;
    private $department;
    private $division;
    private $group;
    private $groupPosition;
    private $position;
    private $skills;
    private $organizations;
    private $jobfunction;
    /* start added by ahmad riadi 21-06-2017 */
     private $banding;
     private $jobfamily;
    /* end added by ahmad riadi 21-06-2017 */

     public $multiposition;
     public $datamultiposition;	
   
    
    public function __construct() {
        parent::__construct();
        $this->educations = array();
        $this->relations = array();
        $this->jobHistories = array();
        $this->trainings = array();
        $this->skills = array();
        $this->organizations = array();
	$this->multiposition = array();
        
    }

    function getDatamultiposition() {
        return $this->datamultiposition;
    }

    function setDatamultiposition($datamultiposition) {
        $this->datamultiposition = $datamultiposition;
    }
    
    
    public function addEducation(Hrd_Models_Master_EducationHistory $eh){
        $this->educations[] = $eh;
    }
    
    public function addRelation(Hrd_Models_Master_Relation $r){
        $this->relations[] = $r;
    }
    
    public function addJobHistory(Hrd_Models_Master_JobHistory $j){
        $this->jobHistories[] = $j;
    }
    
    public function addTraining(Hrd_Models_Master_Training $t){
        $this->trainings[] = $t;
    }
    
    public function addSkills(Hrd_Models_Potency_Tran $t){
        $this->skills[] = $t;
    }
    
    
    public function addOrganization(Hrd_Models_Organization_Organization $t){
        $this->organizations[] = $t;
    }

    public function addMultiposition(Hrd_Models_Master_Multiposition $t){
        $this->multiposition[] = $t;
    }

    
   
    
    public function getEducations(){
        return $this->educations;
    }
    
    public function getRelations(){
        return $this->relations;
    }
    
   
    
    public function getEducation($pos){
        return $this->educations[$pos];
    }
    
    public function getJobHistory($pos){
        return $this->jobHistories[$pos];
    }
    
    public function getTraining($pos){
        return $this->trainings[$pos];
    }
    
    public function getRelation($pos){
        return $this->relations[$pos];
    }
    
    public function getSkill($pos){
        return $this->skills[$pos];
    }
    
    public function getOrganization($pos){
        return $this->organizations[$pos];
    }

    public function getMultiposition($pos){
        return $this->multiposition[$pos];
    }
        
    
    public function setSelectedRelation($relation){
        $this->selectedRelation = $relation;
    }

    public function addRelationObject($object, $indexName) {
        switch ($indexName){
            case "educations":
                $this->addEducation($object);
                break;
            case "saudaras":
                $this->addSaudara($object);
                break;
            case "childs":
                $this->addChild($object);
                break;
            case "emgcontact":
                $this->addEmgContact($object);
                break;
            case "relation":
                $this->addRelation($object);
                break;
            case "jobhistories":
                $this->addJobHistory($object);
                break;
            case "trainings":
                $this->addTraining($object);
                break;
            case "skills":
                $this->addSkills($object);
                break;
            case "organizations":
                $this->addOrganization($object);
                break;
	     case "multipositions":
                $this->addMultiposition($object);
                break;	
			
            
        }
    }

    public function getIndexNames() {
        return array("educations","saudaras","relation","childs","emgcontact","jobhistories","trainings","skills","organizations","multipositions");
    }

    public function getRelationObject($indexName) {
        switch ($indexName){
            case "educations":
                return new Hrd_Models_Master_EducationHistory();
                break;
            case "saudaras":
                return new Hrd_Models_Master_Saudara();
                break;
            case "childs":
                return new Hrd_Models_Master_Child();
                break;
            case "emgcontact":
                return new Hrd_Models_Master_EmergencyContact();
                break;
            case "relation":
                return new Hrd_Models_Master_Relation();
                break;
            case "jobhistories":
                return new Hrd_Models_Master_JobHistory();
                break;
            case "trainings":
                return new Hrd_Models_Master_Training();
                break;
            case "skills":
                return new Hrd_Models_Potency_Tran();
                break;
            case "organizations":
                return new Hrd_Models_Organization_Organization();
                break;
	    case "multipositions":
                return new Hrd_Models_Master_Multiposition();
                break;		
		

        }
    }

    public function getDCArray() {
        $n = $this->selectedRelation;
        if($n){
            switch($n){
                case "relation":
                    return $this->relations;
                    break;
                case "educations":
                    return $this->educations;
                    break;
                case "saudaras":
                    return $this->saudaras;
                    break;
                case "childs":
                    return $this->childs;
                    break;
                case "emgcontact":
                    return $this->emgContact;
                    break;
                case "jobhistories":
                    return $this->jobHistories;
                    break;
                case "trainings":
                    return $this->trainings;
                    break;
                case "skills":
                    return $this->skills;
                    break;
                case "organizations":
                    return $this->organizations;
                    break;
		case "multipositions":
                    return $this->multiposition;
                    break;

                
            }
        }
        return NULL;
    }

    public function getDCResult() {
        if(array_key_exists($this->selectedRelation, $this->DCResult)){
            return $this->DCResult[$this->selectedRelation];
        }
        return false;
        
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult[$this->selectedRelation] = $delimiteredArray;
    }
    
    public function getDepartment() {
        if(!$this->department){
            $this->department = new Hrd_Models_Master_Department();
        }
        return $this->department;
    }

    public function setDepartment(Hrd_Models_Master_Department $department) {
        $this->department = $department;
    }

    public function getDivision() {
        if(!$this->division){
            $this->division = new Hrd_Models_Master_Division();
        }
        return $this->division;
    }

    public function setDivision($division) {
        $this->division = $division;
    }

    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_Group();
        }
        return $this->group;
    }

    public function setGroup($group) {
        $this->group = $group;
    }

    public function getGroupPosition() {
        if(!$this->groupPosition){
            $this->groupPosition = new Hrd_Models_Master_GroupPosition();
        }
        return $this->groupPosition;
    }

    public function setGroupPosition($groupPosition) {
        $this->groupPosition = $groupPosition;
    }

    public function getPosition() {
        if(!$this->position){
            $this->position = new Hrd_Models_Master_Position();
        }
        return $this->position;
    }

    public function setPosition($position) {
        $this->position = $position;
    }
    
    public function getJobfunction() {
        if(!$this->jobfunction){
            $this->jobfunction = new Hrd_Models_Master_JobFunction();
        }
        return $this->jobfunction;
    }

    public function setJobfunction(Hrd_Models_Master_JobFunction $jobfunction) {
        $this->jobfunction = $jobfunction;
    }
    /* start added by ahmad riadi 21-06-2017 */
    function getBanding() {
         if(!$this->banding){
            $this->banding = new Hrd_Models_Performancemanagement_Banding();
        }
        return $this->banding;
    }

    function getJobfamily() {
         if(!$this->jobfamily){
            $this->jobfamily = new Hrd_Models_Performancemanagement_JobFamily();
        }
        return $this->jobfamily;
    }

    function setBanding($banding) {
        $this->banding = $banding;
    }

    function setJobfamily($jobfamily) {
        $this->jobfamily = $jobfamily;
    }
     /* end added by ahmad riadi 21-06-2017 */

            
    public function grouped() {
        $x = parent::grouped();
       // $y = array($this->getDepartment(),$this->getDivision(),$this->getPosition(),$this->getGroupPosition(),$this->getGroup(),$this->getJobfunction());
        /* edited by ahmad riadi 21-06-2017 */
        $y = array($this->getDepartment(),$this->getDivision(),$this->getPosition(),$this->getGroupPosition(),$this->getGroup(),$this->getJobfunction(),$this->getBanding(),$this->getJobfamily());
        $x = array_merge($x,$y);
        return $x;
    }


    
}

?>
