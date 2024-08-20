<?php

/**
 * Description of Group
 *
 * @author MIS
 */
class Hrd_Models_Master_Group extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $name;
    private $code;
    private $uangMakan;
    private $uangMakanExtra;
    private $uangTransport;
    private $uangHadir;
    private $lembur;
    private $lambat;
    private $dendaTerlambat;
    private $uangTransportMod;
    private $uangMakanMod;
    private $point;
    private $splitShift;
    private $index_no;

    private $project_name;
    private $pt_name;  

    private $status_transfer;
    private $action_process;
    private $company_code;
    
    private $upload_check;
    
    /*
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "group_";
    }
     
     */
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"group_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }

        if(isset ($x['group_id'])){
           $this->setId($x['group_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['group'])){
           $this->setName($x['group']); 
        }
        if(isset ($x['uang_makan'])){
           $this->setUangMakan($x['uang_makan']); 
        }
        if(isset ($x['uang_makan_extra'])){
           $this->setUangMakanExtra($x['uang_makan_extra']); 
        }
        if(isset ($x['uang_transport'])){
           $this->setUangTransport($x['uang_transport']); 
        }
        if(isset ($x['uang_hadir'])){
           $this->setUangHadir($x['uang_hadir']); 
        }
        if(isset ($x['lembur'])){
           $this->setLembur($x['lembur']); 
        }
        if(isset ($x['lambat'])){
           $this->setLambat($x['lambat']); 
        }
        if(isset ($x['denda_terlambat'])){
           $this->setDendaTerlambat($x['denda_terlambat']); 
        }
        if(isset ($x['uang_transport_mod'])){
           $this->setUangTransportMod($x['uang_transport_mod']); 
        }
        if(isset ($x['uang_makan_mod'])){
           $this->setUangMakanMod($x['uang_makan_mod']); 
        }
        if(isset ($x['point'])){
           $this->setPoint($x['point']); 
        }
        if(isset ($x['split_shift'])){
            $this->setSplitShift($x['split_shift']);
        }
        if(isset ($x['index_no'])){
            $this->setIndexNo($x['index_no']);
        }

        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }
        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        if(isset ($x['action_process'])){
           $this->setActionProcess($x['action_process']); 
        }
        if(isset ($x['company_code'])){
           $this->setCompanyCode($x['company_code']); 
        }
        if(isset ($x['upload_check'])){
           $this->setUploadCheck($x['upload_check']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'group_id'=>$this->getId(),
	    'project_id'=>$this->getProjectid(),
            'pt_id'=>$this->getPtid(), 	
            'code'=>$this->getCode(),
            'group'=>$this->getName(),
            'uang_makan'=>$this->getUangMakan(),
            'uang_makan_extra'=>$this->getUangMakanExtra(),
            'uang_transport'=>$this->getUangTransport(),
            'uang_hadir'=>$this->getUangHadir(),
            'lembur'=>$this->getLembur(),
            'lambat'=>$this->getLambat(),
            'denda_terlambat'=>$this->getDendaTerlambat(),
            'uang_transport_mod'=>$this->getUangTransportMod(),
            'uang_makan_mod'=>$this->getUangMakanMod(),
            'point'=>$this->getPoint(),
            'split_shift'=>$this->getSplitShift(),
            'index_no'=>$this->getIndexNo(),
            'project_name'=>$this->getProjectName(),
            'pt_name'=>$this->getPtName(),
            'status_transfer'=>$this->getStatusTransfer(),
            'action_process'=>$this->getActionProcess(),
            'company_code'=>$this->getCompanyCode(),
            'upload_check'=>$this->getUploadCheck()
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

    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getUangMakan() {
        return $this->uangMakan;
    }

    public function setUangMakan($uangMakan) {
        $this->uangMakan = (double)$uangMakan;
    }

    public function getUangMakanExtra() {
        return $this->uangMakanExtra;
    }

    public function setUangMakanExtra($uangMakanExtra) {
        $this->uangMakanExtra = (double)$uangMakanExtra;
    }

    public function getUangTransport() {
        return $this->uangTransport;
    }

    public function setUangTransport($uangTransport) {
        $this->uangTransport = (double)$uangTransport;
    }

    public function getUangHadir() {
        return $this->uangHadir;
    }

    public function setUangHadir($uangHadir) {
        $this->uangHadir = (double)$uangHadir;
    }

    public function getLembur() {
        return $this->lembur;
    }

    public function setLembur($lembur) {
        $this->lembur = (double)$lembur;
    }

    public function getLambat() {
        return $this->lambat;
    }

    public function setLambat($lambat) {
        $this->lambat = (boolean)$lambat;
    }

    public function getDendaTerlambat() {
        return $this->dendaTerlambat;
    }

    public function setDendaTerlambat($dendaTerlambat) {
        $this->dendaTerlambat = (double)$dendaTerlambat;
    }

    public function getUangTransportMod() {
        return $this->uangTransportMod;
    }

    public function setUangTransportMod($uangTransportMod) {
        $this->uangTransportMod = (double)$uangTransportMod;
    }

    public function getUangMakanMod() {
        return $this->uangMakanMod;
    }

    public function setUangMakanMod($uangMakanMod) {
        $this->uangMakanMod = (double)$uangMakanMod;
    }

    public function getPoint() {
        return $this->point;
    }

    public function setPoint($point) {
        $this->point = (float)$point;
    }
    
    public function getSplitShift() {
        return $this->splitShift;
    }
    
    public function setSplitShift($splitShift) {
        $this->splitShift = (int)$splitShift;
    }
        
    public function getIndexNo() {
        return $this->index_no;
    }
    
    public function setIndexNo($index_no) {
        $this->index_no = (int)$index_no;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
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

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getActionProcess() {
        return $this->action_process;
    }

    public function setActionProcess($action_process) {
        $this->action_process = $action_process;
    }

    public function getCompanyCode() {
        return $this->company_code;
    }

    public function setCompanyCode($company_code) {
        $this->company_code = $company_code;
    }

    public function getUploadCheck() {
        return $this->upload_check;
    }

    public function setUploadCheck($upload_check) {
        $this->upload_check = $upload_check;
    }

//put your code here
}

?>
