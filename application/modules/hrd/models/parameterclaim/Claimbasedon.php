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
class Hrd_Models_Parameterclaim_Claimbasedon extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{

   private $claimbasedon_id;
   private $claimbasedon;
   private $claimbasedon_column;

   
   
   public function __construct() {
        parent::__construct();
        $this->embedPrefix = "claimbasedon_";
    }
   
   public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['claimbasedon_id'])){
           $this->setId($x['claimbasedon_id']); 
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
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'claimbasedon_id'=>$this->getId(),
            'claimbasedon_id'=>$this->getClaimBasedOnId(),
            'claimbasedon'=>$this->getClaimBasedOn(),
            'claimbasedon_column'=>$this->getClaimBasedOnColumn()
        );
      
        return $x;
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

   

   public function setClaimBasedOnId($claimbasedon_id) {
       $this->claimbasedon_id = $claimbasedon_id;
   }

   public function setClaimBasedOn($claimbasedon) {
       $this->claimbasedon = $claimbasedon;
   }

   public function setClaimBasedOnColumn($claimbasedon_column) {
       $this->claimbasedon_column = $claimbasedon_column;
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
