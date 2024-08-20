<?php

/**
 * Description of Employee
 *
 * @author MIS
 */


class Hrd_Models_Master_Listperformancemanagement extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Arried{
   private $performancemanagement_id;
   private $project_id;
   private $project_name;
   private $pt_id;    
   private $pt_name; 
   private $employee_nik;
   private $employee_id;
   private $employee_name;
   private $department_id;
   private $department_name;
   private $periode;
   private $status;
   private $peringkat;
   private $pmdocument_id;
   private $package_name;
   private $status_id;
   private $pm_position_id;
   private $pm_group_id;
   private $pm_banding_id;
   private $pm_jobfamily_id;
   private $detail_ranksetting_id;
   private $rank_system;
   private $jenisdocument;
   private $pf_status;
   private $bsc_status;
   private $rki_status;
   private $hk_status;
   private $cp_status;
   private $dp_status;
   private $idp_status;

   public function __construct() {
      parent::__construct();
      $this->embedPrefix = "performancemanagement_";
      // $this->nik = "";
   }
   
   public function cleanData($param) {
      $setup = new Hrd_Models_General_Setup();
      $data = $setup->clean_specialcaracter($param);
      return $data;
   }

   public function setArrayTable($dataArray=NULL) {
      $x = $dataArray==NULL?$this->arrayTable:$dataArray;

      if(isset ($x['performancemanagement_id'])){
         $this->setPerformancemanagement_id($x['performancemanagement_id']); 
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
      if(isset ($x['employee_nik'])){
         $this->setEmployee_nik($x['employee_nik']); 
      }
      if(isset ($x['employee_id'])){
         $this->setEmployee_id($x['employee_id']); 
      }
      if(isset ($x['employee_name'])){
         $this->setEmployee_name($x['employee_name']); 
      }
      if(isset ($x['department_id'])){
         $this->setDepartment_id($x['department_id']); 
      }
      if(isset ($x['department_name'])){
         $this->setDepartment_name($x['department_name']); 
      }
      if(isset ($x['periode'])){
         $this->setPeriode($x['periode']); 
      }
      if(isset ($x['status'])){
         $this->setStatus($x['status']); 
      }
      if(isset ($x['peringkat'])){
         $this->setPeringkat($x['peringkat']); 
      }
      if(isset ($x['pmdocument_id'])){
         $this->setPmdocument_id($x['pmdocument_id']); 
      }
      if(isset ($x['package_name'])){
         $this->setPackage_name($x['package_name']); 
      }
      if(isset ($x['status_id'])){
         $this->setStatus_id($x['status_id']); 
      }
      if(isset ($x['pm_position_id'])){
         $this->setPmposition_id($x['pm_position_id']); 
      }
      if(isset ($x['pm_group_id'])){
         $this->setPmgroup_id($x['pm_group_id']); 
      }
      if(isset ($x['pm_banding_id'])){
         $this->setPmbanding_id($x['pm_banding_id']); 
      }
      if(isset ($x['pm_jobfamily_id'])){
         $this->setPmjobfamily_id($x['pm_jobfamily_id']); 
      }
      if(isset ($x['detail_ranksetting_id'])){
         $this->setDetail_ranksetting_id($x['detail_ranksetting_id']); 
      }
      if(isset ($x['rank_system'])){
         $this->setRank_system($x['rank_system']); 
      }
      if(isset ($x['jenisdocument'])){
         $this->setJenisdocument($x['jenisdocument']); 
      }
      if(isset ($x['pf_status'])){
         $this->setPf_status($x['pf_status']); 
      }
      if(isset ($x['bsc_status'])){
         $this->setBsc_status($x['bsc_status']); 
      }
      if(isset ($x['rki_status'])){
         $this->setRki_status($x['rki_status']); 
      }
      if(isset ($x['hk_status'])){
         $this->setHk_status($x['hk_status']); 
      }
      if(isset ($x['cp_status'])){
         $this->setCp_status($x['cp_status']); 
      }
      if(isset ($x['dp_status'])){
         $this->setDp_status($x['dp_status']); 
      }
      if(isset ($x['idp_status'])){
         $this->setIdp_status($x['idp_status']); 
      }

      unset($x);
   }

   public function getArrayTable(){
      $x = array(
         "performancemanagement_id" => $this->getPerformancemanagement_id(),
         "project_id"               => $this->getProject_id(),
         "project_name"             => $this->getProject_name(),
         'pt_id'                    => $this->getPt_id(),
         'pt_name'                  => $this->getPt_name(),
         "employee_nik"             => $this->getEmployee_nik(),
         "employee_id"              => $this->getEmployee_id(),
         "employee_name"            => $this->cleanData($this->getEmployee_name()),
         "department_id"            => $this->getDepartment_id(),
         "department_name"          => $this->getDepartment_name(),
         "periode"                  => $this->getPeriode(),
         "status"                   => $this->getStatus(),
         "peringkat"                => $this->getPeringkat(),
         "pmdocument_id"            => $this->getPmdocument_id(),
         "package_name"             => $this->getPackage_name(),
         "status_id"                => $this->getStatus_id(),
         "pm_position_id"           => $this->getPmposition_id(),
         "pm_group_id"              => $this->getPmgroup_id(),
         "pm_banding_id"            => $this->getPmbanding_id(),
         "pm_jobfamily_id"          => $this->getPmjobfamily_id(),
         "detail_ranksetting_id"    => $this->getDetail_ranksetting_id(),
         "rank_system"              => $this->getRank_system(),
         "jenisdocument"            => $this->getJenisdocument(),
         "pf_status"                => $this->getPf_status(),
         "bsc_status"               => $this->getBsc_status(),
         "rki_status"               => $this->getRki_status(),
         "hk_status"                => $this->getHk_status(),
         "cp_status"                => $this->getCp_status(),
         "dp_status"                => $this->getDp_status(),
         "idp_status"               => $this->getIdp_status(),
      );

      return $x;
   }

   public function getPerformancemanagement_id() {
       return $this->performancemanagement_id;
   }
   
   public function setPerformancemanagement_id($performancemanagement_id) {
       $this->performancemanagement_id = $performancemanagement_id;
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

   public function getEmployee_nik() {
       return $this->employee_nik;
   }
   
   public function setEmployee_nik($employee_nik) {
       $this->employee_nik = $employee_nik;
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

    public function getPeriode() {
       return $this->periode;
    }

    public function setPeriode($periode) {
       $this->periode = $periode;
    }

    public function getStatus() {
       return $this->status;
    }

    public function setStatus($status) {
       $this->status = $status;
    }

    public function getPeringkat() {
       return $this->peringkat;
    }

    public function setPeringkat($peringkat) {
       $this->peringkat = $peringkat;
    }

    public function getStatus_id() {
       return $this->status_id;
    }

    public function setStatus_id($status_id) {
       $this->status_id = $status_id;
    }

    public function getPmposition_id() {
       return $this->pm_position_id;
    }

    public function setPmposition_id($pm_position_id) {
       $this->pm_position_id = $pm_position_id;
    }

    public function getPackage_name() {
       return $this->package_name;
    }

    public function setPackage_name($package_name) {
       $this->package_name = $package_name;
    }

    public function getPmdocument_id() {
       return $this->pmdocument_id;
    }

    public function setPmdocument_id($pmdocument_id) {
       $this->pmdocument_id = $pmdocument_id;
    }

    public function getPmgroup_id() {
       return $this->pm_group_id;
    }

    public function setPmgroup_id($pm_group_id) {
       $this->pm_group_id = $pm_group_id;
    }

    public function getPmbanding_id() {
       return $this->pm_banding_id;
    }

    public function setPmbanding_id($pm_banding_id) {
       $this->pm_banding_id = $pm_banding_id;
    }

    public function getPmjobfamily_id() {
       return $this->pm_jobfamily_id;
    }

    public function setPmjobfamily_id($pm_jobfamily_id) {
       $this->pm_jobfamily_id = $pm_jobfamily_id;
    }

    public function getDetail_ranksetting_id() {
       return $this->detail_ranksetting_id;
    }

    public function setDetail_ranksetting_id($detail_ranksetting_id) {
       $this->detail_ranksetting_id = $detail_ranksetting_id;
    }

    public function getRank_system() {
       return $this->rank_system;
    }

    public function setRank_system($rank_system) {
       $this->rank_system = $rank_system;
    }

    public function getJenisdocument() {
       return $this->jenisdocument;
    }

    public function setJenisdocument($jenisdocument) {
       $this->jenisdocument = $jenisdocument;
    }

    public function getPf_status() {
       return $this->pf_status;
    }

    public function setPf_status($pf_status) {
       $this->pf_status = $pf_status;
    }

    public function getBsc_status() {
       return $this->bsc_status;
    }

    public function setBsc_status($bsc_status) {
       $this->bsc_status = $bsc_status;
    }

    public function getRki_status() {
       return $this->rki_status;
    }

    public function setRki_status($rki_status) {
       $this->rki_status = $rki_status;
    }

    public function getHk_status() {
       return $this->hk_status;
    }

    public function setHk_status($hk_status) {
       $this->hk_status = $hk_status;
    }

    public function getCp_status() {
       return $this->cp_status;
    }

    public function setCp_status($cp_status) {
       $this->cp_status = $cp_status;
    }

    public function getDp_status() {
       return $this->dp_status;
    }

    public function setDp_status($dp_status) {
       $this->dp_status = $dp_status;
    }

    public function getIdp_status() {
       return $this->idp_status;
    }

    public function setIdp_status($idp_status) {
       $this->idp_status = $idp_status;
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