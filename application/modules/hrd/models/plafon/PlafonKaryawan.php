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
class Hrd_Models_Plafon_PlafonKaryawan extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{
   private $employee;
   private $year;
   private $project;
   private $pt;
   private $yearlyGlobal;
   private $yearlyObat;
   private $yearlyDokter;
   private $yearlyGigi;
   private $yearlyLab;
   private $rawatInap;
   private $persalinanNormal;
   private $persalinanAbnormal;
   private $kehamilan;
   private $keluargaBerencana;
   private $checkUp;
   private $lensa;
   private $frame;
   private $lainLain;
   private $isGlobal;
   
   
   public function __construct() {
        parent::__construct();
        $this->embedPrefix = "plafonkaryawan_";
    }
   
   public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['plafonkaryawan_id'])){
           $this->setId($x['plafonkaryawan_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['yearly_global'])){
           $this->setYearlyGlobal($x['yearly_global']); 
        }
        if(isset ($x['yearly_obat'])){
           $this->setYearlyObat($x['yearly_obat']); 
        }
        if(isset ($x['yearly_dokter'])){
           $this->setYearlyDokter($x['yearly_dokter']); 
        }
        if(isset ($x['yearly_gigi'])){
           $this->setYearlyGigi($x['yearly_gigi']); 
        }
        if(isset ($x['yearly_lab'])){
           $this->setYearlyLab($x['yearly_lab']); 
        }
        if(isset ($x['rawat_inap'])){
           $this->setRawatInap($x['rawat_inap']); 
        }
        if(isset ($x['persalinan_normal'])){
           $this->setPersalinanNormal($x['persalinan_normal']); 
        }
        if(isset ($x['persalinan_abnormal'])){
           $this->setPersalinanAbnormal($x['persalinan_abnormal']); 
        }
        if(isset ($x['kehamilan'])){
           $this->setKehamilan($x['kehamilan']); 
        }
        if(isset ($x['keluarga_berencana'])){
           $this->setKeluargaBerencana($x['keluarga_berencana']); 
        }
        if(isset ($x['checkup'])){
           $this->setCheckUp($x['checkup']); 
        }
        if(isset ($x['lensa'])){
           $this->setLensa($x['lensa']); 
        }
        if(isset ($x['frame'])){
           $this->setFrame($x['frame']); 
        }
        if(isset ($x['lainlain'])){
           $this->setLainLain($x['lainlain']); 
        }
        if(isset ($x['is_global'])){
           $this->setIsGlobal($x['is_global']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'plafonkaryawan_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'year'=>$this->getYear(),
            'yearly_global'=>$this->getYearlyGlobal(),
            'yearly_obat'=>$this->getYearlyObat(),
            'yearly_dokter'=>$this->getYearlyDokter(),
            'yearly_gigi'=>$this->getYearlyGigi(),
            'yearly_lab'=>$this->getYearlyLab(),
            'rawat_inap'=>$this->getRawatInap(),
            'persalinan_normal'=>$this->getPersalinanNormal(),
            'persalinan_abnormal'=>$this->getPersalinanAbnormal(),
            'kehamilan'=>$this->getKehamilan(),
            'keluarga_berencana'=>$this->getKeluargaBerencana(),
            'checkup'=>$this->getCheckUp(),
            'lensa'=>$this->getLensa(),
            'frame'=>$this->getFrame(),
            'lainlain'=>$this->getLainLain(),
            'is_global'=>$this->getIsGlobal()
        );
      
        return $x;
    } 
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getYear() {
        return $this->year;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setYear($year) {
        $this->year = $year;
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

   public function getYearlyGlobal() {
       return $this->yearlyGlobal;
   }

   public function getYearlyObat() {
       return $this->yearlyObat;
   }

   public function getYearlyDokter() {
       return $this->yearlyDokter;
   }

   public function getYearlyGigi() {
       return $this->yearlyGigi;
   }

   public function getYearlyLab() {
       return $this->yearlyLab;
   }

   public function getRawatInap() {
       return $this->rawatInap;
   }

   public function getPersalinanNormal() {
       return $this->persalinanNormal;
   }

   public function getPersalinanAbnormal() {
       return $this->persalinanAbnormal;
   }

   public function getKehamilan() {
       return $this->kehamilan;
   }

   public function getKeluargaBerencana() {
       return $this->keluargaBerencana;
   }

   public function getCheckUp() {
       return $this->checkUp;
   }

   public function getLensa() {
       return $this->lensa;
   }

   public function getFrame() {
       return $this->frame;
   }

   public function getLainLain() {
       return $this->lainLain;
   }

   public function setYearlyGlobal($yearlyGlobal) {
       $this->yearlyGlobal = $yearlyGlobal;
   }

   public function setYearlyObat($yearlyObat) {
       $this->yearlyObat = $yearlyObat;
   }

   public function setYearlyDokter($yearlyDokter) {
       $this->yearlyDokter = $yearlyDokter;
   }

   public function setYearlyGigi($yearlyGigi) {
       $this->yearlyGigi = $yearlyGigi;
   }

   public function setYearlyLab($yearlyLab) {
       $this->yearlyLab = $yearlyLab;
   }

   public function setRawatInap($rawatInap) {
       $this->rawatInap = $rawatInap;
   }

   public function setPersalinanNormal($persalinanNormal) {
       $this->persalinanNormal = $persalinanNormal;
   }

   public function setPersalinanAbnormal($persalinanAbnormal) {
       $this->persalinanAbnormal = $persalinanAbnormal;
   }

   public function setKehamilan($kehamilan) {
       $this->kehamilan = $kehamilan;
   }

   public function setKeluargaBerencana($keluargaBerencana) {
       $this->keluargaBerencana = $keluargaBerencana;
   }

   public function setCheckUp($checkUp) {
       $this->checkUp = $checkUp;
   }

   public function setLensa($lensa) {
       $this->lensa = $lensa;
   }

   public function setFrame($frame) {
       $this->frame = $frame;
   }

   public function setLainLain($lainLain) {
       $this->lainLain = $lainLain;
   }
   
   public function getIsGlobal() {
       return $this->isGlobal;
   }

   public function setIsGlobal($isGlobal) {
       $this->isGlobal = $isGlobal;
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
