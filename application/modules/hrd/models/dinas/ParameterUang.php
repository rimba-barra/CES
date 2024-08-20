<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ParameterUang
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_ParameterUang extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $group;
    private $pulkmakan1bulan;
    private $pulksaku1bulan;
    private $pulkmakan1bulanlebih;
    private $pulksaku1bulanlebih;
    private $pplkmakan1bulan;
    private $pplksaku1bulan;
    private $pplkmakan1bulanlebih;
    private $pplksaku1bulanlebih;    
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parameteruang_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parameteruangsaku_id'])){
           $this->setId($x['parameteruangsaku_id']); 
        }
        if(isset ($x['group_group_id'])){
           $this->getGroup()->setId($x['group_group_id']); 
        }
        if(isset ($x['pulk_makan_satu_bulan'])){
           $this->setPulkmakan1bulan($x['pulk_makan_satu_bulan']); 
        }
        if(isset ($x['pulk_saku_satu_bulan'])){
           $this->setPulksaku1bulan($x['pulk_saku_satu_bulan']); 
        }
        if(isset ($x['pulk_makan_satu_bulan_lebih'])){
           $this->setPulkmakan1bulanlebih($x['pulk_makan_satu_bulan_lebih']); 
        }
        if(isset ($x['pulk_saku_satu_bulan_lebih'])){
           $this->setPulksaku1bulanlebih($x['pulk_saku_satu_bulan_lebih']); 
        }
        if(isset ($x['pplk_makan_satu_bulan'])){
           $this->setPplkmakan1bulan($x['pplk_makan_satu_bulan']); 
        }
        if(isset ($x['pplk_saku_satu_bulan'])){
           $this->setPplksaku1bulan($x['pplk_saku_satu_bulan']); 
        }
        if(isset ($x['pplk_makan_satu_bulan_lebih'])){
           $this->setPplkmakan1bulanlebih($x['pplk_makan_satu_bulan_lebih']); 
        }
        if(isset ($x['pplk_saku_satu_bulan_lebih'])){
           $this->setPplksaku1bulanlebih($x['pplk_saku_satu_bulan_lebih']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parameteruangsaku_id'=>$this->getId(),
            'group_group_id'=>$this->getGroup()->getId(),
            'pulk_makan_satu_bulan'=>$this->getPulkmakan1bulan(),
            'pulk_saku_satu_bulan'=>$this->getPulksaku1bulan(),
            'pulk_makan_satu_bulan_lebih'=>$this->getPulkmakan1bulanlebih(),
            'pulk_saku_satu_bulan_lebih'=>$this->getPulksaku1bulanlebih(),
            'pplk_makan_satu_bulan'=>$this->getPplkmakan1bulan(),
            'pplk_saku_satu_bulan'=>$this->getPplksaku1bulan(),
            'pplk_makan_satu_bulan_lebih'=>$this->getPplkmakan1bulanlebih(),
            'pplk_saku_satu_bulan_lebih'=>$this->getPplksaku1bulanlebih(),
        );
      
        return $x;
    }
    
    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_Group();
        }
        return $this->group;
    }

    public function getPulkmakan1bulan() {
        return $this->pulkmakan1bulan;
    }

    public function getPulksaku1bulan() {
        return $this->pulksaku1bulan;
    }

    public function getPulkmakan1bulanlebih() {
        return $this->pulkmakan1bulanlebih;
    }

    public function getPulksaku1bulanlebih() {
        return $this->pulksaku1bulanlebih;
    }

    public function getPplkmakan1bulan() {
        return $this->pplkmakan1bulan;
    }

    public function getPplksaku1bulan() {
        return $this->pplksaku1bulan;
    }

    public function getPplkmakan1bulanlebih() {
        return $this->pplkmakan1bulanlebih;
    }

    public function getPplksaku1bulanlebih() {
        return $this->pplksaku1bulanlebih;
    }

    public function setGroup(Hrd_Models_Master_Group $group) {
        $this->group = $group;
    }

    public function setPulkmakan1bulan($pulkmakan1bulan) {
        $this->pulkmakan1bulan = $pulkmakan1bulan;
    }

    public function setPulksaku1bulan($pulksaku1bulan) {
        $this->pulksaku1bulan = $pulksaku1bulan;
    }

    public function setPulkmakan1bulanlebih($pulkmakan1bulanlebih) {
        $this->pulkmakan1bulanlebih = $pulkmakan1bulanlebih;
    }

    public function setPulksaku1bulanlebih($pulksaku1bulanlebih) {
        $this->pulksaku1bulanlebih = $pulksaku1bulanlebih;
    }

    public function setPplkmakan1bulan($pplkmakan1bulan) {
        $this->pplkmakan1bulan = $pplkmakan1bulan;
    }

    public function setPplksaku1bulan($pplksaku1bulan) {
        $this->pplksaku1bulan = $pplksaku1bulan;
    }

    public function setPplkmakan1bulanlebih($pplkmakan1bulanlebih) {
        $this->pplkmakan1bulanlebih = $pplkmakan1bulanlebih;
    }

    public function setPplksaku1bulanlebih($pplksaku1bulanlebih) {
        $this->pplksaku1bulanlebih = $pplksaku1bulanlebih;
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
        return array($this->getGroup());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    
}
