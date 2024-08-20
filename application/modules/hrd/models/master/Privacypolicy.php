<?php


/**
 * Description of Department
 *
 * @author MIS
 */
class Hrd_Models_Master_Privacypolicy extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    
    private $year_submit;
    private $submit_date;
    private $expired_date;
    private $employee_id;
    private $employee_name; 
    private $project_id;
    private $project_name;
    private $pt_id;
    private $pt_name;
    private $department_id;
    private $department;
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"privacypolicy_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['id'])){
           $this->setId($x['id']); 
        }
        if(isset ($x['year_submit'])){
           $this->setYear_submit($x['year_submit']); 
        }
        if(isset ($x['submit_date'])){
           $this->setSubmit_date($x['submit_date']); 
        }
        if(isset ($x['expired_date'])){
           $this->setExpired_date($x['expired_date']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployee_id($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployee_name($x['employee_name']); 
        }
        if(isset ($x['project_id'])){
           $this->setProject_id($x['project_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProject_name($x['project_name']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPt_id($x['pt_id']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPt_name($x['pt_name']); 
        }        
        if(isset ($x['department_id'])){
           $this->setDepartment_id($x['department_id']); 
        }
        if(isset ($x['department'])){
           $this->setDepartment($x['department']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(

            'id'=>$this->getId(),
            'year_submit'=>$this->getYear_submit(),
            'submit_date'=>$this->getSubmit_date(),
            'expired_date'=>$this->getExpired_date(),
            'employee_id'=>$this->getEmployee_id(),
            'employee_name'=>$this->getEmployee_name(),
            'project_id'=>$this->getProject_id(),
            'project_name'=>$this->getProject_name(),
            'pt_id'=>$this->getPt_id(),
            'pt_name'=>$this->getPt_name(),
            'department_id'=>$this->getDepartment_id(),
            'department'=>$this->getDepartment(),

        );
      
        return $x;
    }


    public function getYear_submit() {
        return $this->year_submit;
    }

    public function setYear_submit($year_submit) {
        $this->year_submit = $year_submit;
    }

    public function getSubmit_date() {
        return $this->submit_date;
    }

    public function setSubmit_date($submit_date) {
        $this->submit_date = $submit_date;
    }

    public function getExpired_date() {
        return $this->expired_date;
    }

    public function setExpired_date($expired_date) {
        $this->expired_date = $expired_date;
    }
    
    public function getEmployee_id() {
        return $this->employee_id;
    }

    public function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function getEmployee_name() {
        return $this->employee_name;
    }

    public function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }    

    public function getProject_name() {
        return $this->project_name;
    }

    public function setProject_name($project_name) {
        $this->project_name = $project_name;
    }

    public function getPt_id() {
        return $this->pt_id;
    }

    public function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }      

    public function getPt_name() {
        return $this->pt_name;
    }

    public function setPt_name($pt_name) {
        $this->pt_name = $pt_name;
    } 

    public function getDepartment_id() {
        return $this->department_id;
    }

    public function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }      

    public function getDepartment() {
        return $this->department;
    }

    public function setDepartment($department) {
        $this->department = $department;
    }  


    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


}

?>
