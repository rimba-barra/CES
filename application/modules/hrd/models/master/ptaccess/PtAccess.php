<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterSK
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_Ptaccess_PtAccess extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    
    private $ptpt_id;
    private $ptpt_name;
    private $name;
    private $user_id;
    private $group_id;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "ptaccess_";
    }

    public function setArrayTable($dataArray = NULL) {
  
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['ptpt_id'])){
           $this->setPt_id($x['ptpt_id']); 
        }
        if(isset ($x['ptpt_name'])){
           $this->setPt_name($x['ptpt_name']); 
        }
        
        unset($x);
    }

    public function getArrayTable() {
     
        $x = array(
            'ptpt_id'=>$this->getPt_id(),
            'ptpt_name'=>$this->getPt_name()
        );
      
        return $x;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }
    
    public function getUserid() {
        return $this->user_id;
    }

    public function getGroupid() {
        return $this->group_id;
    }

    public function getPt_id() {
        return $this->ptpt_id;
    }

    public function getPt_name() {
        return $this->ptpt_name;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPt_id($ptpt_id) {
        $this->ptpt_id = $ptpt_id;
    }

    public function setPt_name($ptpt_name) {
        $this->ptpt_name = $ptpt_name;
    }

    public function setUserid($user_id) {
        $this->user_id = $user_id;
    }

    public function setGroupid($group_id) {
        $this->group_id = $group_id;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
