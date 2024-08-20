<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonKaryawanValue
 *
 * @author MIS
 */
class Hrd_Models_Parameterclaim_Parameterclaim extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{
   private $project;
   private $pt;
   private $jenispengobatan_id;
   private $masterjenispengobatan_id;
   private $parameterjenispengobatan_id;
   private $jenispengobatan;
   private $code;
   private $employeestatus_id;
   private $employeestatus;
   private $min_workingmonth;
   private $sex;
   private $min_age;
   private $claimbasedon_id;
   private $claimbasedon;
   private $claimbasedon_column;
   private $claimupdate_id;
   private $claimupdate;
   private $parameterjenispengobatan_group_id;
   private $group_id;
   private $frequently_inmonth;
   private $maxclaim;

   private $min_age_special;
   private $frequently_inmonth_special;
   
   
   public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parameterclaim_";
    }
   
   public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jenispengobatan_id'])){
           $this->setId($x['jenispengobatan_id']); 
        }
        if(isset ($x['parameterjenispengobatan_id'])){
           $this->setParameterJenisPengobatanId($x['parameterjenispengobatan_id']); 
        }
        if(isset ($x['masterjenispengobatan_id'])){
           $this->setMasterJenisPengobatanId($x['masterjenispengobatan_id']); 
        }
        if(isset ($x['jenispengobatan'])){
           $this->setJenisPengobatan($x['jenispengobatan']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['employeestatus_id'])){
           $this->setEmployeeStatusId($x['employeestatus_id']); 
        }
        if(isset ($x['employeestatus'])){
           $this->setEmployeeStatus($x['employeestatus']); 
        }
        if(isset ($x['min_workingmonth'])){
           $this->setMinWorkingMonth($x['min_workingmonth']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
        if(isset ($x['min_age'])){
           $this->setMinAge($x['min_age']); 
        }
        if(isset ($x['claimbasedon_id'])){
           $this->setClaimBasedOnId($x['claimbasedon_id']); 
        }
        if(isset ($x['claimbasedon'])){
           $this->setClaimBasedOn($x['claimbasedon']); 
        }
        if(isset ($x['claimbasedon_column'])){
           $this->setClaimBasedOnColumn($x['claimbasedon_column']); 
        }
        if(isset ($x['claimupdate_id'])){
           $this->setClaimUpdateId($x['claimupdate_id']); 
        }
        if(isset ($x['claimupdate'])){
           $this->setClaimUpdate($x['claimupdate']); 
        }
        if(isset ($x['parameterjenispengobatan_group_id'])){
           $this->setParameterJenisPengobatanGroupId($x['parameterjenispengobatan_group_id']); 
        }
        if(isset ($x['group_id'])){
           $this->setGroupId($x['group_id']); 
        }
        if(isset ($x['frequently_inmonth'])){
           $this->setFrequently($x['frequently_inmonth']); 
        }
        if(isset ($x['maxclaim'])){
           $this->setMaxclaim($x['maxclaim']); 
        }
        if(isset ($x['min_age_special'])){
           $this->setMinAgeSpecial($x['min_age_special']); 
        }
        if(isset ($x['frequently_inmonth_special'])){
           $this->setFrequentlySpecial($x['frequently_inmonth_special']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
        
        if(empty($this->getMinWorkingMonth())){
            $getMinWorkingMonth = '0';
        }else{
            $getMinWorkingMonth = $this->getMinWorkingMonth();
        }

        if(empty($this->getMinAge())){
            $getMinAge = '0';
        }else{
            $getMinAge = $this->getMinAge();
        }

        if(empty($this->getFrequently())){
            $getFrequently = '0';
        }else{
            $getFrequently = $this->getFrequently();
        }

        if(empty($this->getMaxclaim())){
            $getMaxclaim = '0';
        }else{
            $getMaxclaim = $this->getMaxclaim();
        }

        if(empty($this->getMinAgeSpecial())){
            $getMinAgeSpecial = '0';
        }else{
            $getMinAgeSpecial = $this->getMinAgeSpecial();
        }

        if(empty($this->getFrequentlySpecial())){
            $getFrequentlySpecial = '0';
        }else{
            $getFrequentlySpecial = $this->getFrequentlySpecial();
        }

        $x = array(
            'jenispengobatan_id'=>$this->getId(),
            'parameterjenispengobatan_id'=>$this->getParameterJenisPengobatanId(),
            'masterjenispengobatan_id'=>$this->getMasterJenisPengobatanId(),
            'jenispengobatan'=>$this->getJenisPengobatan(),
            'code'=>$this->getCode(),
            'employeestatus_id'=>$this->getEmployeeStatusId(),
            'employeestatus'=>$this->getEmployeeStatus(),
            'min_workingmonth'=>$getMinWorkingMonth,
            'sex'=>$this->getSex(),
            'min_age'=>$getMinAge,
            'claimbasedon_id'=>$this->getClaimBasedOnId(),
            'claimbasedon'=>$this->getClaimBasedOn(),
            'claimbasedon_column'=>$this->getClaimBasedOnColumn(),
            'claimupdate_id'=>$this->getClaimUpdateId(),
            'claimupdate'=>$this->getClaimUpdate(),
            'parameterjenispengobatan_group_id'=>$this->getParameterJenisPengobatanGroupId(),
            'group_id'=>$this->getGroupId(),
            'frequently_inmonth'=>$getFrequently,
            'maxclaim'=>$getMaxclaim,
            'min_age_special'=>$getMinAgeSpecial,
            'frequently_inmonth_special'=>$getFrequentlySpecial,
        );
      
        return $x;
    } 
    

    public function getParameterJenisPengobatanId() {
        return $this->parameterjenispengobatan_id;
    }

    public function setParameterJenisPengobatanId($parameterjenispengobatan_id) {
        $this->parameterjenispengobatan_id = $parameterjenispengobatan_id;
    }

        
    /*
   public function getPlafonKaryawan() {
       if(!$this->plafonKaryawan){
           $this->plafonKaryawan = new Hrd_Models_Plafon_PlafonKaryawan();
       }
       return $this->plafonKaryawan;
   }

   public function setPlafonKaryawan(Hrd_Models_Plafon_PlafonKaryawan $plafonKaryawan) {
       $this->plafonKaryawan = $plafonKaryawan;
   }
     
     */

   public function getJenisPengobatan() {
       return $this->jenispengobatan;
   }

   public function getMasterJenisPengobatanId() {
       return $this->masterjenispengobatan_id;
   }

   public function getCode() {
       return $this->code;
   }

   public function getEmployeeStatusId() {
       return $this->employeestatus_id;
   }

   public function getEmployeeStatus() {
       return $this->employeestatus;
   }

   public function getMinWorkingMonth() {
       return $this->min_workingmonth;
   }

   public function getSex() {
       return $this->sex;
   }

   public function getMinAge() {
       return $this->min_age;
   }

   public function getClaimBasedOnId() {
       return $this->claimbasedon_id;
   }

   public function getClaimBasedOn() {
       return $this->claimbasedon;
   }

   public function getClaimBasedOnColumn() {
       return $this->claimbasedon_column;
   }

   public function getClaimUpdateId() {
       return $this->claimupdate_id;
   }

   public function getClaimUpdate() {
       return $this->claimupdate;
   }

   public function getParameterJenisPengobatanGroupId() {
       return $this->parameterjenispengobatan_group_id;
   }

   public function getGroupId() {
       return $this->group_id;
   }

   public function setJenisPengobatan($jenispengobatan) {
       $this->jenispengobatan = $jenispengobatan;
   }

   public function setMasterJenisPengobatanId($masterjenispengobatan_id) {
       $this->masterjenispengobatan_id = $masterjenispengobatan_id;
   }

   public function setCode($code) {
       $this->code = $code;
   }

   public function setEmployeeStatusId($employeestatus_id) {
       $this->employeestatus_id = $employeestatus_id;
   }

   public function setEmployeeStatus($employeestatus) {
       $this->employeestatus = $employeestatus;
   }

   public function setMinWorkingMonth($min_workingmonth) {
       $this->min_workingmonth = $min_workingmonth;
   }

   public function setSex($sex) {
       $this->sex = $sex;
   }

   public function setMinAge($min_age) {
       $this->min_age = $min_age;
   }

   public function setClaimBasedOnId($claimbasedon_id) {
       $this->claimbasedon_id = $claimbasedon_id;
   }

   public function setClaimBasedOn($claimbasedon) {
       $this->claimbasedon = $claimbasedon;
   }

   public function setClaimBasedOnColumn($claimbasedon_column) {
       $this->claimbasedon_column = $claimbasedon_column;
   }

   public function setClaimUpdateId($claimupdate_id) {
       $this->claimupdate_id = $claimupdate_id;
   }

   public function setClaimUpdate($claimupdate) {
       $this->claimupdate = $claimupdate;
   }

   public function setParameterJenisPengobatanGroupId($parameterjenispengobatan_group_id) {
       $this->parameterjenispengobatan_group_id = $parameterjenispengobatan_group_id;
   }

   public function setGroupId($group_id) {
       $this->group_id = $group_id;
   }
   
   public function getFrequently() {
       return $this->frequently_inmonth;
   }

   public function setFrequently($frequently_inmonth) {
       $this->frequently_inmonth = $frequently_inmonth;
   }

   public function getMaxclaim() {
       return $this->maxclaim;
   }

   public function setMaxclaim($maxclaim) {
       $this->maxclaim = $maxclaim;
   }

   public function getMinAgeSpecial() {
       return $this->min_age_special;
   }
   public function setMinAgeSpecial($min_age_special) {
       $this->min_age_special = $min_age_special;
   }
   public function getFrequentlySpecial() {
       return $this->frequently_inmonth_special;
   }

   public function setFrequentlySpecial($frequently_inmonth_special) {
       $this->frequently_inmonth_special = $frequently_inmonth_special;
   }

   
   
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
       // return array($this->getPlafonKaryawan(),$this->getType());
         return array();
    }

    public function getArray() {
        return $this->getArrayTable();
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

}

?>
