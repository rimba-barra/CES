<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Employee
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Employee_Employee extends Hrd_Models_Master_EmployeePersonal{
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "employeeb_";
        
        
    }
    
    public function setArrayTable($dataArray=NULL) {
        
        parent::setArrayTable($dataArray);
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['group_group_id'])){
           $this->getGroup()->setId($x['group_group_id']); 
        }
        if(isset ($x['position_position_id'])){
           $this->getPosition()->setId($x['position_position_id']); 
        }
        if(isset ($x['department_department_id'])){
           $this->getDepartment()->setId($x['department_department_id']); 
        }
        if(isset ($x['division_division_id'])){
           $this->getDivision()->setId($x['division_division_id']); 
        }
        /* start added by ahmad riadi 21-06-2017 */
        if(isset ($x['jobfamily_jobfamily_id'])){
           $this->getJobfamily()->setId($x['jobfamily_jobfamily_id']); 
        }
        if(isset ($x['banding_banding_id'])){
           $this->getBanding()->setId($x['banding_banding_id']); 
        }
        /* end added by ahmad riadi 21-06-2017 */
        
        
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "group_group_id"=>$this->getGroup()->getId(),
            "position_position_id"=>$this->getPosition()->getId(),
            "department_department_id"=>$this->getDepartment()->getId(),
            "division_division_id"=>$this->getDivision()->getId(),
             /* start added by ahmad riadi 21-06-2017 */
            "jobfamily_jobfamily_id"=>$this->getJobfamily()->getId(),
            "banding_banding_id"=>$this->getBanding()->getId(),
            /* end added by ahmad riadi 21-06-2017 */
            
           
        );
        $y = parent::getArrayTable();
   
        $x = array_merge($y,$x);
      
        return $x;
    }
}
