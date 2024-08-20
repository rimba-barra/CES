<?php

/**
 * Description of Employee
 *
 * @author MIS
 */


class Hrd_Models_Performancemanagement_Approvalmatrixdepartment extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Models_Master_InterProjectPt,  Box_Arried{
    //private $department_id;
    private $department;
    private $code;
    private $description;
    private $manager_id;
	public $project_id;
    public $pt_id;
	public $department_id;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "departmentall_";       
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['department_id'])){
           $this->setId($x['department_id']); 
        }
        if(isset ($x['department'])){
           $this->setDepartment($x['department']); 
        }
		
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['manager_id'])){
           $this->setManager($x['manager_id']); 
        }
		
		if (isset($x['project_id'])) {
            $this->project_id = $x['project_id'];
        }
        if (isset($x['pt_id'])) {
            $this->pt_id = $x['pt_id'];
        }
		
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "department_id"=>$this->getId(),
            "department"=>$this->getDepartment(),
            "code"=>$this->getCode(),
            "description"=>$this->getDescription(),
            "manager_id"=>$this->getManager(),
			'project_id'    => $this->project_id,
			'pt_id'    => $this->pt_id
           
        );      
        return $x;
    }
            
    public function getDepartment() {
        return $this->department;
    }

    public function setDepartment($department) {
        $this->department = $department;
    } 

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getManager() {
        return $this->manager_id;
    }
	
    public function setManager($manager_id) {
        $this->manager_id = $manager_id;
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
	   
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getArray() {
        return $this->getArrayTable();
    }

}

?>
