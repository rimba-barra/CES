<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Komponen
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Komponen_Komponen extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $code;
    private $description;
    private $pphBaris;
    private $plusMinus;
    private $kpph;
    private $tunjanganPotongan;
   
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
       // $this->embedPrefix = "komponengaji_";
        $this->embedPrefix = $embedPrefix?$embedPrefix:"komponengaji_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['komponengaji_id'])){
           $this->setId($x['komponengaji_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        if(isset ($x['pph_baris'])){
           $this->setPphBaris($x['pph_baris']); 
        }
        
        if(isset ($x['plus_minus'])){
           $this->setPlusMinus($x['plus_minus']); 
        }
        if(isset ($x['kpph'])){
           $this->setKpph($x['kpph']); 
        }
        if(isset ($x['tunjangan_potongan'])){
           $this->setTunjanganPotongan($x['tunjangan_potongan']); 
        }
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'komponengaji_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription(),
            'pph_baris'=>$this->getPphBaris(),
            'plus_minus'=>$this->getPlusMinus(),
            'kpph'=>$this->getKpph(),
            'tunjangan_potongan'=>$this->getTunjanganPotongan()
            
           
        );
      
        return $x;
    }
    
    public function getPlusMinus() {
        return $this->plusMinus;
    }

    public function setPlusMinus($plusMinus) {
        $this->plusMinus = $plusMinus;
    }

        
    public function getCode() {
        return $this->code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getPphBaris() {
        return $this->pphBaris;
    }

    public function getKpph() {
        return $this->kpph;
    }

    public function getTunjanganPotongan() {
        return $this->tunjanganPotongan;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setPphBaris($pphBaris) {
        $this->pphBaris = $pphBaris;
    }

    public function setKpph($kpph) {
        $this->kpph = $kpph;
    }

    public function setTunjanganPotongan($tunjanganPotongan) {
        $this->tunjanganPotongan = $tunjanganPotongan;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Project();
        }
        return $this->pt;
    }

    public function grouped() {
        return array();
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

//put your code here
}
