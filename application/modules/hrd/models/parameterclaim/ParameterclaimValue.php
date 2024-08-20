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
class Hrd_Models_Parameterclaim_ParameterclaimValue extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried{
   private $plafonKaryawan;
   private $type;
   private $value;
   
   public function __construct() {
        parent::__construct();
        $this->embedPrefix = "plafonkaryawanvalue_";
    }
   
   public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['plafonkaryawanvalue_id'])){
           $this->setId($x['plafonkaryawanvalue_id']); 
        }
        if(isset ($x['jenispengobatan_jenispengobatan_id'])){
           $this->getType()->setId($x['jenispengobatan_jenispengobatan_id']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['plafonkaryawan_plafonkaryawan_id'])){
           $this->getPlafonKaryawan()->setId($x['plafonkaryawan_plafonkaryawan_id']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'plafonkaryawanvalue_id'=>$this->getId(),
            'jenispengobatan_jenispengobatan_id'=>$this->getType()->getId(),
            'value'=>$this->getValue(),
            'plafonkaryawan_plafonkaryawan_id'=>$this->getPlafonKaryawan()->getId()
        );
      
        return $x;
    } 
    
    
   public function getPlafonKaryawan() {
       if(!$this->plafonKaryawan){
           $this->plafonKaryawan = new Hrd_Models_Plafon_PlafonKaryawan();
       }
       return $this->plafonKaryawan;
   }

   public function setPlafonKaryawan(Hrd_Models_Plafon_PlafonKaryawan $plafonKaryawan) {
       $this->plafonKaryawan = $plafonKaryawan;
   }

   public function getType() {
       if(!$this->type){
           $this->type = new Hrd_Models_Pengobatan_Type();
       }
       return $this->type;
   }

   public function setType(Hrd_Models_Pengobatan_Type $type) {
       $this->type = $type;
   }

   public function getValue() {
       return (double)$this->value;
   }

   public function setValue($value) {
       $this->value = (double)$value;
   }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPlafonKaryawan(),$this->getType());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>
