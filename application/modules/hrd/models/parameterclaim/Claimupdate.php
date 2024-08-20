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
class Hrd_Models_Parameterclaim_Claimupdate extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{

   private $claimupdate_id;
   private $claimupdate;
   
   
   public function __construct() {
        parent::__construct();
        $this->embedPrefix = "claimupdate_";
    }
   
   public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['claimupdate_id'])){
           $this->setId($x['claimupdate_id']); 
        }
        if(isset ($x['claimupdate_id'])){
           $this->setClaimUpdateId($x['claimupdate_id']); 
        }
        if(isset ($x['claimupdate'])){
           $this->setClaimUpdate($x['claimupdate']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'claimupdate_id'=>$this->getId(),
            'claimupdate_id'=>$this->getClaimUpdateId(),
            'claimupdate'=>$this->getClaimUpdate()
        );
      
        return $x;
    } 
    

   public function getClaimUpdateId() {
       return $this->claimupdate_id;
   }

   public function getClaimUpdate() {
       return $this->claimupdate;
   }

   public function setClaimUpdateId($claimupdate_id) {
       $this->claimupdate_id = $claimupdate_id;
   }

   public function setClaimUpdate($claimupdate) {
       $this->claimupdate = $claimupdate;
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
