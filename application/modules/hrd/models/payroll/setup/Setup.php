<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Setup
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Setup_Setup extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $komponen;
    private $blnHr;
    private $isTrans;
    private $value;
    private $groupPay;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "setuppayroll_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['setuppayroll_id'])){
           $this->setId($x['setuppayroll_id']); 
        }
        if(isset ($x['komponengaji_komponengaji_id'])){
           $this->getKomponen()->setId($x['komponengaji_komponengaji_id']); 
        }
        if(isset ($x['komponengaji_code'])){
           $this->getKomponen()->setCode($x['komponengaji_code']); 
        }
        if(isset ($x['bln_hr'])){
           $this->setBlnHr($x['bln_hr']); 
        }
        if(isset ($x['is_trans'])){
           $this->setIsTrans($x['is_trans']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['grouppayroll_grouppayroll_id'])){
           $this->getGroupPay()->setId($x['grouppayroll_grouppayroll_id']); 
        }
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'setuppayroll_id'=>$this->getId(),
            'komponengaji_komponengaji_id'=>$this->getKomponen()->getId(),
            'komponengaji_code'=>$this->getKomponen()->getCode(),
            'grouppayroll_grouppayroll_id'=>$this->getGroupPay()->getId(),
            'bln_hr'=>$this->getBlnHr(),
            'is_trans'=>$this->getIsTrans(),
            'value'=>$this->getValue()
            
           
        );
      
        return $x;
    }
    
    public function getKomponen() {
        if(!$this->komponen){
            $this->komponen = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komponen;
    }

    public function getBlnHr() {
        return $this->blnHr;
    }

    public function getIsTrans() {
        return (int)$this->isTrans;
    }

    public function getValue() {
        return (double)$this->value;
    }

    public function setKomponen(Hrd_Models_Payroll_Komponen_Komponen $komponen) {
        $this->komponen = $komponen;
    }

    public function setBlnHr($blnHr) {
        $this->blnHr = $blnHr;
    }

    public function setIsTrans($isTrans) {
        $this->isTrans = (int)$isTrans;
    }

    public function setValue($value) {
        $this->value = (double)$value;
    }
    
    public function getGroupPay() {
        if(!$this->groupPay){
            $this->groupPay = new Hrd_Models_Master_GroupPayroll();
        }
        return $this->groupPay;
    }

    public function setGroupPay(Hrd_Models_Master_GroupPayroll $groupPay) {
        $this->groupPay = $groupPay;
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
        return array($this->getKomponen());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
