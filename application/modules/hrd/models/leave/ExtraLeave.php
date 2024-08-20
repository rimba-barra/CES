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
class Hrd_Models_Leave_ExtraLeave extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $extraleave_id;
    private $periode;
    private $leavegroup;
    private $leavegroup_name;
    private $expired_date;
    private $amount;
    private $description;
    private $proses;
    private $cancel;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "extraleave_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['extraleave_id'])){
           $this->setId($x['extraleave_id']); 
        }
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['leavegroup'])){
           $this->setLeavegroup($x['leavegroup']); 
        }
        if(isset ($x['leavegroup_name'])){
           $this->setLeavegroupName($x['leavegroup_name']); 
        }
        if(isset ($x['expired_date'])){
           $this->setExpiredDate($x['expired_date']); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['proses'])){
           $this->setProses($x['proses']); 
        }
        if(isset ($x['cancel'])){
           $this->setCancel($x['cancel']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'extraleave_id'=>$this->getId(),
            'periode'=>$this->getPeriode(),
            'leavegroup'=>$this->getLeavegroup(),
            'leavegroup_name'=>$this->getLeavegroupName(),
            'expired_date'=>$this->getExpiredDate(),
            'amount'=>$this->getAmount(),
            'description'=>$this->getDescription(),
            'proses'=>$this->getProses(),
            'cancel'=>$this->getCancel(),
        );
      
        return $x;
    }

    function getProjectid() {
        return $this->projectid;
    }

    function getPtid() {
        return $this->ptid;
    }

    function setProjectid($projectid) {
        $this->projectid = $projectid;
    }

    function setPtid($ptid) {
        $this->ptid = $ptid;
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

    public function getPeriode() {
        return $this->periode;
    }

    public function getLeavegroup() {
        return $this->leavegroup;
    }

    public function getLeavegroupName() {
        return $this->leavegroup_name;
    }

    public function getExpiredDate() {
        return $this->expired_date;
    }

    public function getAmount() {
        return $this->amount;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getProses() {
        return $this->proses;
    }

    public function getCancel() {
        return $this->cancel;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }

    public function setLeavegroup($leavegroup) {
        $this->leavegroup = $leavegroup;
    }

    public function setLeavegroupName($leavegroup_name) {
        $this->leavegroup_name = $leavegroup_name;
    }

    public function setAmount($amount) {
        $this->amount = $amount;
    }

    public function setExpiredDate($expired_date) {
        $this->expired_date = $expired_date;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setProses($proses) {
        $this->proses = $proses;
    }

    public function setCancel($cancel) {
        $this->cancel = $cancel;
    }
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("tanggal");
    }

    function get_mail() {
        return $this->_mail;
    }
    


}
