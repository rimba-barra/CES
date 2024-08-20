<?php

/**
 * Description of Employee
 *
 * @author MIS
 */


class Hrd_Models_Master_Allemployee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Arried{
    
   private $subholding_id;
   private $subholding_name;
   private $project_id;
   private $project_name;
   private $pt_id;    
   private $pt_name; 
   private $employee_id;
   private $employee_name;
   private $nik_group;
   private $sex;
   private $sex_name;
   private $birth_date;
   private $age;
   private $age_bot;
   private $age_top;
   private $last_education; 
   private $last_education_name;     
   private $department_id;    
   private $department_name;     
   private $position_id;    
   private $position_name;       
   private $banding_id;    
   private $banding_name;      
   private $group_id;    
   private $group_name; 
   private $employeestatus_id;
   private $employeestatus;
   private $hire_date;
   private $assignation_date;
   private $contractend_date;
   private $nonactive_date;
   private $employee_active;
   private $employee_active_name;

   //added by anas 17022022
   private $hire_date_start;
   private $hire_date_end;
   private $assignation_date_start;
   private $assignation_date_end;
   private $contractend_date_start;
   private $contractend_date_end;
   private $nonactive_date_start;
   private $nonactive_date_end;
   //end added by anas

   private $id;
   private $header_title;
   private $num_order;
   private $field;

   private $usiaKerjaStartDate;
   private $masaKerjaStartDate;
   private $usiaKerjaCount;
   private $masaKerjaCount;
   private $usiaKerjaBot;
   private $usiaKerjaTop;
   private $masaKerjaBot;
   private $masaKerjaTop;
   private $isKompensasi;

   private $isPensiun;

   public function __construct() {
      parent::__construct();
      $this->embedPrefix = "employee_";
      // $this->nik = "";
   }
   
   public function cleanData($param) {
      $setup = new Hrd_Models_General_Setup();
      $data = $setup->clean_specialcaracter($param);
      return $data;
   }


   public function setArrayTable($dataArray=NULL) {

      $x = $dataArray==NULL?$this->arrayTable:$dataArray;

      if(isset ($x['subholding_id'])){
         $this->setSubholding_id($x['subholding_id']); 
      }
      if(isset ($x['subholding_name'])){
         $this->setSubholding_name($x['subholding_name']); 
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
      if(isset ($x['employee_id'])){
         $this->setEmployee_id($x['employee_id']); 
      }
      if(isset ($x['employee_name'])){
         $this->setEmployee_name($x['employee_name']); 
      }
      if(isset ($x['nik_group'])){
         $this->setNik_group($x['nik_group']); 
      }
      if(isset ($x['sex'])){
         $this->setSex($x['sex']); 
      }
      if(isset ($x['sex_name'])){
         $this->setSex_name($x['sex_name']); 
      }
      if(isset ($x['birth_date'])){
         $this->setBirth_date($x['birth_date']); 
      }
      if(isset ($x['age'])){
         $this->setAge($x['age']); 
      }
      if(isset ($x['age_bot'])){
         $this->setAge_bot($x['age_bot']); 
      }
      if(isset ($x['age_top'])){
         $this->setAge_top($x['age_top']); 
      }
      if(isset ($x['last_education'])){
         $this->setLast_education($x['last_education']); 
      }
      if(isset ($x['last_education_name'])){
         $this->setLast_education_name($x['last_education_name']); 
      }
      if(isset ($x['department_id'])){
         $this->setDepartment_id($x['department_id']); 
      }
      if(isset ($x['department_name'])){
         $this->setDepartment_name($x['department_name']); 
      }        
      if(isset ($x['position_id'])){
         $this->setPosition_id($x['position_id']); 
      }
      if(isset ($x['position_name'])){
         $this->setPosition_name($x['position_name']); 
      }
      if(isset ($x['banding_id'])){
         $this->setBanding_id($x['banding_id']); 
      }
      if(isset ($x['banding_name'])){
         $this->setBanding_name($x['banding_name']); 
      }
      if(isset ($x['group_id'])){
         $this->setGroup_id($x['group_id']); 
      }
      if(isset ($x['group_name'])){
         $this->setGroup_name($x['group_name']); 
      }
      if(isset ($x['employeestatus_id'])){
         $this->setEmployeestatus_id($x['employeestatus_id']); 
      }
      if(isset ($x['employeestatus'])){
         $this->setEmployeestatus($x['employeestatus']); 
      }
      if(isset ($x['hire_date'])){
         $this->setHire_date($x['hire_date']); 
      }
      if(isset ($x['assignation_date'])){
         $this->setAssignation_date($x['assignation_date']); 
      }
      if(isset ($x['contractend_date'])){
         $this->setContractend_date($x['contractend_date']); 
      }
      if(isset ($x['nonactive_date'])){
         $this->setNonactive_date($x['nonactive_date']); 
      }
      if(isset ($x['employee_active'])){
         $this->setEmployee_active($x['employee_active']); 
      }
      if(isset ($x['employee_active_name'])){
         $this->setEmployee_active_name($x['employee_active_name']); 
      }

      //added by anas 17022022
      if(isset ($x['hire_date_start'])){
         $this->setHire_date_start($x['hire_date_start']); 
      }
      if(isset ($x['hire_date_end'])){
         $this->setHire_date_end($x['hire_date_end']); 
      }
      if(isset ($x['assignation_date_start'])){
         $this->setAssignation_date_start($x['assignation_date_start']); 
      }
      if(isset ($x['assignation_date_end'])){
         $this->setAssignation_date_end($x['assignation_date_end']); 
      }
      if(isset ($x['contractend_date_start'])){
         $this->setContractend_date_start($x['contractend_date_start']); 
      }
      if(isset ($x['contractend_date_end'])){
         $this->setContractend_date_end($x['contractend_date_end']); 
      }
      if(isset ($x['nonactive_date_start'])){
         $this->setNonactive_date_start($x['nonactive_date_start']); 
      }
      if(isset ($x['nonactive_date_end'])){
         $this->setNonactive_date_end($x['nonactive_date_end']); 
      }
      //end added by anas

      //untuk list header export
      if(isset ($x['id'])){
         $this->setId($x['id']); 
      }
      if(isset ($x['header_title'])){
         $this->setHeader_title($x['header_title']); 
      }
      if(isset ($x['num_order'])){
         $this->setNum_order($x['num_order']); 
      }
      if(isset ($x['field'])){
         $this->setField($x['field']); 
      }

      if(isset ($x['masa_kerja_start_date'])){
          $this->setMasaKerjaStartDate($x['masa_kerja_start_date']); 
      }
      if(isset ($x['usia_kerja_start_date'])){
          $this->setUsiaKerjaStartDate($x['usia_kerja_start_date']); 
      }
      if(isset ($x['masa_kerja_count'])){
          $this->setMasaKerjaCount($x['masa_kerja_count']); 
      }
      if(isset ($x['usia_kerja_count'])){
          $this->setUsiaKerjaCount($x['usia_kerja_count']); 
      }
      if(isset ($x['usia_kerja_bot'])){
          $this->setUsiaKerjaBot($x['usia_kerja_bot']); 
      }
      if(isset ($x['usia_kerja_top'])){
          $this->setUsiaKerjaTop($x['usia_kerja_top']); 
      }
      if(isset ($x['masa_kerja_bot'])){
          $this->setMasaKerjaBot($x['masa_kerja_bot']); 
      }
      if(isset ($x['masa_kerja_top'])){
          $this->setMasaKerjaTop($x['masa_kerja_top']); 
      }
      if(isset ($x['is_kompensasi'])){
          $this->setIsKompensasi($x['is_kompensasi']); 
      }

      if(isset ($x['is_pensiun'])){
          $this->setIsPensiun($x['is_pensiun']); 
      }

      unset($x);
   }

   public function getArrayTable(){

      $x = array(
         "subholding_id"=>$this->getSubholding_id(),
         "subholding_name"=>$this->getSubholding_name(),
         "project_id"=>$this->getProject_id(),
         "project_name"=>$this->getProject_name(),
         'pt_id'=>$this->getPt_id(),
         'pt_name'=>$this->getPt_name(),
         "employee_id"=>$this->getEmployee_id(),
         "employee_name"=>$this->cleanData($this->getEmployee_name()),
         "nik_group"=>$this->getNik_group(),
         "sex"=>$this->getSex(),
         "sex_name"=>$this->getSex_name(),
         "birth_date"=>$this->getBirth_date(),
         "age"=>$this->getAge(),
         "age_bot"=>$this->getAge_bot(),
         "age_top"=>$this->getAge_top(),
         "last_education"=>$this->getLast_education(),
         "last_education_name"=>$this->getLast_education_name(),
         "department_id"=>$this->getDepartment_id(),
         "department_name"=>$this->getDepartment_name(),
         "position_id"=>$this->getPosition_id(),
         "position_name"=>$this->getPosition_name(),
         "banding_id"=>$this->getBanding_id(),
         "banding_name"=>$this->getBanding_name(),
         "group_id"=>$this->getGroup_id(),
         "group_name"=>$this->getGroup_name(),
         "employeestatus_id"=>$this->getEmployeestatus_id(),
         "employeestatus"=>$this->getEmployeestatus(),
         "hire_date"=>$this->getHire_date(),
         "assignation_date"=>$this->getAssignation_date(),
         "contractend_date"=>$this->getContractend_date(),
         "nonactive_date"=>$this->getNonactive_date(),
         "employee_active"=>$this->getEmployee_active(),
         "employee_active_name"=>$this->getEmployee_active_name(),

         //added by anas 17022022
         "hire_date_start"=>$this->getHire_date_start(),
         "hire_date_end"=>$this->getHire_date_end(),
         "assignation_date_start"=>$this->getAssignation_date_start(),
         "assignation_date_end"=>$this->getAssignation_date_end(),
         "contractend_date_start"=>$this->getContractend_date_start(),
         "contractend_date_end"=>$this->getContractend_date_end(),
         "nonactive_date_start"=>$this->getNonactive_date_start(),
         "nonactive_date_end"=>$this->getNonactive_date_end(),
         //end added by anas

         "id"=>$this->getId(),
         "header_title"=>$this->getHeader_title(),
         "num_order"=>$this->getNum_order(),
         "field"=>$this->getField(),

         "masa_kerja_start_date"=>$this->getMasaKerjaStartDate(),
         "usia_kerja_start_date"=>$this->getUsiaKerjaStartDate(),
         "masa_kerja_count"=>$this->getMasaKerjaCount(),
         "usia_kerja_count"=>$this->getUsiaKerjaCount(),
         "usia_kerja_bot"=>$this->getUsiaKerjaBot(),
         "usia_kerja_top"=>$this->getUsiaKerjaTop(),
         "masa_kerja_bot"=>$this->getMasaKerjaBot(),
         "masa_kerja_top"=>$this->getMasaKerjaTop(),
         "is_kompensasi"=>$this->getIsKompensasi(),

         "is_pensiun"=>$this->getIsPensiun()
      );

      return $x;
   }
    

   public function getSubholding_id() {
       return $this->subholding_id;
   }
   public function setSubholding_id($subholding_id) {
       $this->subholding_id = $subholding_id;
   }

   public function getSubholding_name() {
       return $this->subholding_name;
   }
   public function setSubholding_name($subholding_name) {
       $this->subholding_name = $subholding_name;
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

   public function getNik_group() {
       return $this->nik_group;
   }
   public function setNik_group($nik_group) {
       $this->nik_group = $nik_group;
   }

   public function getSex() {
       return $this->sex;
   }
   public function setSex($sex) {
       $this->sex = $sex;
   }

   public function getSex_name() {
       return $this->sex_name;
   }
   public function setSex_name($sex_name) {
       $this->sex_name = $sex_name;
   }

   public function getBirth_date() {
       return $this->birth_date;
   }
   public function setBirth_date($birth_date) {
       $this->birth_date = $birth_date;
   }

   public function getAge() {
       return $this->age;
   }
   public function setAge($age) {
       $this->age = $age;
   }

   public function getAge_bot() {
       return $this->age_bot;
   }
   public function setAge_bot($age_bot) {
       $this->age_bot = $age_bot;
   }

   public function getAge_top() {
       return $this->age_top;
   }
   public function setAge_top($age_top) {
       $this->age_top = $age_top;
   }

   public function getLast_education() {
       return $this->last_education;
   }
   public function setLast_education($last_education) {
       $this->last_education = $last_education;
   }

    
   public function getLast_education_name() {
       return $this->last_education_name;
   }
   public function setLast_education_name($last_education_name) {
       $this->last_education_name = $last_education_name;
   }

   public function getDepartment_id() {
       return $this->department_id;
   }
   public function setDepartment_id($department_id) {
       $this->department_id = $department_id;
   }
    
   public function getDepartment_name() {
       return $this->department_name;
   }
   public function setDepartment_name($department_name) {
       $this->department_name = $department_name;
   }

   public function getPosition_id() {
       return $this->position_id;
   }
   public function setPosition_id($position_id) {
       $this->position_id = $position_id;
   }
    
   public function getPosition_name() {
       return $this->position_name;
   }
   public function setPosition_name($position_name) {
       $this->position_name = $position_name;
   }

   public function getBanding_id() {
       return $this->banding_id;
   }
   public function setBanding_id($banding_id) {
       $this->banding_id = $banding_id;
   }
    
   public function getBanding_name() {
       return $this->banding_name;
   }
   public function setBanding_name($banding_name) {
       $this->banding_name = $banding_name;
   }

   public function getGroup_id() {
       return $this->group_id;
   }
   public function setGroup_id($group_id) {
       $this->group_id = $group_id;
   }
    
   public function getGroup_name() {
       return $this->group_name;
   }
   public function setGroup_name($group_name) {
       $this->group_name = $group_name;
   }
    
   public function getEmployeestatus_id() {
       return $this->employeestatus_id;
   }
   public function setEmployeestatus_id($employeestatus_id) {
       $this->employeestatus_id = $employeestatus_id;
   }

   public function getEmployeestatus() {
       return $this->employeestatus;
   }
   public function setEmployeestatus($employeestatus) {
       $this->employeestatus = $employeestatus;
   }

   public function getHire_date() {
       return $this->hire_date;
   }
   public function setHire_date($hire_date) {
       $this->hire_date = $hire_date;
   }

   public function getContractend_date() {
       return $this->contractend_date;
   }
   public function setContractend_date($contractend_date) {
       $this->contractend_date = $contractend_date;
   }

   public function getAssignation_date() {
       return $this->assignation_date;
   }
   public function setAssignation_date($assignation_date) {
       $this->assignation_date = $assignation_date;
   }
    
   public function getNonactive_date() {
       return $this->nonactive_date;
   }
   public function setNonactive_date($nonactive_date) {
       $this->nonactive_date = $nonactive_date;
   }

   public function getEmployee_active() {
       return $this->employee_active;
   }
   public function setEmployee_active($employee_active) {
       $this->employee_active = $employee_active;
   }

   public function getEmployee_active_name() {
       return $this->employee_active_name;
   }
   public function setEmployee_active_name($employee_active_name) {
       $this->employee_active_name = $employee_active_name;
   }

   //added by anas 17022022
   public function getHire_date_start() {
       return $this->hire_date_start;
   }
   public function setHire_date_start($hire_date_start) {
       $this->hire_date_start = $hire_date_start;
   }

   public function getHire_date_end() {
       return $this->hire_date_end;
   }
   public function setHire_date_end($hire_date_end) {
       $this->hire_date_end = $hire_date_end;
   }

   public function getContractend_date_start() {
       return $this->contractend_date_start;
   }
   public function setContractend_date_start($contractend_date_start) {
       $this->contractend_date_start = $contractend_date_start;
   }

   public function getContractend_date_end() {
       return $this->contractend_date_end;
   }
   public function setContractend_date_end($contractend_date_end) {
       $this->contractend_date_end = $contractend_date_end;
   }

   public function getAssignation_date_start() {
       return $this->assignation_date_start;
   }
   public function setAssignation_date_start($assignation_date_start) {
       $this->assignation_date_start = $assignation_date_start;
   }

   public function getAssignation_date_end() {
       return $this->assignation_date_end;
   }
   public function setAssignation_date_end($assignation_date_end) {
       $this->assignation_date_end = $assignation_date_end;
   }
    
   public function getNonactive_date_start() {
       return $this->nonactive_date_start;
   }
   public function setNonactive_date_start($nonactive_date_start) {
       $this->nonactive_date_start = $nonactive_date_start;
   }

   public function getNonactive_date_end() {
       return $this->nonactive_date_end;
   }
   public function setNonactive_date_end($nonactive_date_end) {
       $this->nonactive_date_end = $nonactive_date_end;
   }
   //end added by anas

   public function getId() {
       return $this->id;
   }
   public function setId($id) {
       $this->id = $id;
   }

   public function getHeader_title() {
       return $this->header_title;
   }
   public function setHeader_title($header_title) {
       $this->header_title = $header_title;
   }

   public function getNum_order() {
       return $this->num_order;
   }
   public function setNum_order($num_order) {
       $this->num_order = $num_order;
   }

   public function getField() {
       return $this->field;
   }
   public function setField($field) {
       $this->field = $field;
   }

   public function getMasaKerjaStartDate() {
        return $this->masaKerjaStartDate;
    }

    public function setMasaKerjaStartDate($masaKerjaStartDate) {
        $this->masaKerjaStartDate = $masaKerjaStartDate;
    }

    public function getUsiaKerjaStartDate() {
        return $this->usiaKerjaStartDate;
    }

    public function setUsiaKerjaStartDate($usiaKerjaStartDate) {
        $this->usiaKerjaStartDate = $usiaKerjaStartDate;
    }

    public function getMasaKerjaCount() {
        return $this->masaKerjaCount;
    }

    public function setMasaKerjaCount($masaKerjaCount) {
        $this->masaKerjaCount = $masaKerjaCount;
    }

    public function getUsiaKerjaCount() {
        return $this->usiaKerjaCount;
    }

    public function setUsiaKerjaCount($usiaKerjaCount) {
        $this->usiaKerjaCount = $usiaKerjaCount;
    }

    public function getUsiaKerjaBot() {
        return $this->usiaKerjaBot;
    }

    public function setUsiaKerjaBot($usiaKerjaBot) {
        $this->usiaKerjaBot = $usiaKerjaBot;
    }

    public function getUsiaKerjaTop() {
        return $this->usiaKerjaTop;
    }

    public function setUsiaKerjaTop($usiaKerjaTop) {
        $this->usiaKerjaTop = $usiaKerjaTop;
    }

    public function getMasaKerjaBot() {
        return $this->masaKerjaBot;
    }

    public function setMasaKerjaBot($masaKerjaBot) {
        $this->masaKerjaBot = $masaKerjaBot;
    }

    public function getMasaKerjaTop() {
        return $this->masaKerjaTop;
    }

    public function setMasaKerjaTop($masaKerjaTop) {
        $this->masaKerjaTop = $masaKerjaTop;
    }

    public function getIsKompensasi() {
        return $this->isKompensasi;
    }

    public function setIsKompensasi($isKompensasi) {
        $this->isKompensasi = $isKompensasi;
    }

    public function getIsPensiun() {
        return $this->isPensiun;
    }

    public function setIsPensiun($isPensiun) {
        $this->isPensiun = $isPensiun;
    }


   public function fillData($data) {
       $this->setArrayTable($data);
   }

  public function getArray() {
       return $this->getArrayTable();
   }

   public function grouped() {
        
   }


}

?>
