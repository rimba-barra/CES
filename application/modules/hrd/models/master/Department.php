<?php


/**
 * Description of Department
 *
 * @author MIS
 */
class Hrd_Models_Master_Department extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    private $name;
    private $code;
    private $description;
    private $manager;
    private $project;
    private $pt;	

    private $project_id;
    private $pt_id;    
    private $project_name;
    private $pt_name;    
    
    private $status_transfer;
    private $action_process;
    private $company_code;

    private $upload_check;
    
    /*
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "department_";
    }*/
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"department_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['department_id'])){
           $this->setId($x['department_id']); 
        }
        if(isset ($x['department'])){
           $this->setName($x['department']); 
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
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }
        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        if(isset ($x['action_process'])){
           $this->setActionProcess($x['action_process']); 
        }
        if(isset ($x['company_code'])){
           $this->setCompanyCode($x['company_code']); 
        }
        if(isset ($x['upload_check'])){
           $this->setUploadCheck($x['upload_check']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'department_id'=>$this->getId(),
            'department'=>$this->getName(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription(),
            'manager_id'=>$this->getManager(),
            'project_id'=>$this->getProjectId(),
            'project_name'=>$this->getProjectName(),
            'pt_id'=>$this->getPtId(),
            'pt_name'=>$this->getPtName(),
            'status_transfer'=>$this->getStatusTransfer(),
            'action_process'=>$this->getActionProcess(),
            'company_code'=>$this->getCompanyCode(),
            'upload_check'=>$this->getUploadCheck()
        );
      
        return $x;
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

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getManager() {
        return $this->manager;
    }

    public function setManager($manager) {
        $this->manager = $manager;
    }

    public function getProjectId() {
        return $this->project_id;
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function getPtId() {
        return $this->pt_id;
    }

    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getActionProcess() {
        return $this->action_process;
    }

    public function setActionProcess($action_process) {
        $this->action_process = $action_process;
    }

    public function getCompanyCode() {
        return $this->company_code;
    }

    public function setCompanyCode($company_code) {
        $this->company_code = $company_code;
    }

    public function getUploadCheck() {
        return $this->upload_check;
    }

    public function setUploadCheck($upload_check) {
        $this->upload_check = $upload_check;
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


    
    


}

?>
