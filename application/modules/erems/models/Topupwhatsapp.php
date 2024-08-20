<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Topupwhatsapp
 *
 * @author MIS
 */
class Erems_Models_Topupwhatsapp extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Models_Master_InterProjectPt, Erems_Box_Kouti_Remora,Erems_Box_Delien_DelimiterCandidate, Erems_Box_Models_App_Hermes_HasDetail, Erems_Box_Models_App_Hermes_DestroyedDetail{
    private $project;
    private $pt;
    private $user_id;
    private $topup_date;
    private $nominal;
    private $bukti_topup;
    private $is_approve;
    private $approve_fullname;
    private $approve_date;
    private $is_reject;
    private $reject_fullname;
    private $reject_date;
    private $image;
    private $detail;
    private $dcResult;
    private $deletedDetail;
    private $facilitiesType;
    private $cluster;
    private $user_fullname;
    private $Addon;

    // added by rico 09092022
    private $biaya;
    private $saldo;
    private $remaining_saldo;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'topupwhatsapp_';
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getUserID() {
        return $this->user_id;
    }

    public function setUserID($user_id) {
        $this->user_id = $user_id;
    }

    public function getTopupDate() {
        return $this->topup_date;
    }

    public function setTopupDate($topup_date) {
        $this->topup_date = $topup_date;
    }

    public function getNominal() {
        return $this->nominal;
    }

    public function setNominal($nominal) {
        $this->nominal = $nominal;
    }
    
    public function getImage() {
        return $this->image;
    }

    public function setImage($image) {
        $this->image = $image;
    }
    
    public function getBuktiTopup() {
        return $this->bukti_topup;
    }

    public function setBuktiTopup($bukti_topup) {
        $this->bukti_topup = $bukti_topup;
    }
    
    public function getIsApprove() {
        return $this->is_approve;
    }

    public function setIsApprove($is_approve) {
        $this->is_approve = $is_approve;
    }
    
    public function getApproveUser() {
        return $this->approve_fullname;
    }

    public function setApproveUser($approve_fullname) {
        $this->approve_fullname = $approve_fullname;
    }
    
    public function getApproveDate() {
        return $this->approve_date;
    }

    public function setApproveDate($approve_date) {
        $this->approve_date = $approve_date;
    }
    
    public function getIsReject() {
        return $this->is_reject;
    }

    public function setIsReject($is_reject) {
        $this->is_reject = $is_reject;
    }
    
    public function getRejectUser() {
        return $this->reject_fullname;
    }

    public function setRejectUser($reject_fullname) {
        $this->reject_fullname = $reject_fullname;
    }
    
    public function getRejectDate() {
        return $this->reject_date;
    }

    public function setRejectDate($reject_date) {
        $this->reject_date = $reject_date;
    }

    public function getFacilitiesType() {
        if(!$this->facilitiesType){
            $this->facilitiesType = new Erems_Models_Master_FacilitiesType();
        }
        return $this->facilitiesType;
    }

    public function setFacilitiesType(Erems_Models_Master_FacilitiesType $facilitiesType) {
        $this->facilitiesType = $facilitiesType;
    }

    public function getCluster() {
        if(!$this->cluster){
            $this->cluster = new Erems_Models_Master_ClusterB();
        }
        return $this->cluster;
    }

    public function setCluster(Erems_Models_Master_ClusterB $cluster) {
        $this->cluster = $cluster;
    }
    
    public function getUserFullname() {
        return $this->user_fullname;
    }

    public function setUserFullname($user_fullname) {
        $this->user_fullname = $user_fullname;
    }
    
    public function getAddon() {
        return $this->Addon;
    }

    public function setAddon($Addon) {
        $this->Addon = $Addon;
    }

    public function getBiaya() {
        return $this->biaya;
    }

    public function setBiaya($biaya) {
        $this->biaya = $biaya;
    }

    public function getSaldo() {
        return $this->saldo;
    }

    public function setSaldo($saldo) {
        $this->saldo = $saldo;
    }

    public function getRemainingSaldo() {
        return $this->remaining_saldo;
    }

    public function setRemainingSaldo($remaining_saldo) {
        $this->remaining_saldo = $remaining_saldo;
    }
        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['whatsapp_topup_id'])){
           $this->setId($x['whatsapp_topup_id']); 
        }
         if(isset ($x['topup_date'])){
           $this->setTopupDate($x['topup_date']); 
        }
         if(isset ($x['user_id'])){
           $this->setUserID($x['user_id']); 
        }
        if(isset ($x['nominal'])){
           $this->setNominal($x['nominal']); 
        }
        if(isset ($x['layer_img'])){
           $this->setImage($x['layer_img']); 
        }
        if(isset ($x['bukti_topup'])){
           $this->setBuktiTopup($x['bukti_topup']); 
        }
        if(isset ($x['is_approve'])){
           $this->setIsApprove($x['is_approve']); 
        }
        if(isset ($x['approve_fullname'])){
           $this->setApproveUser($x['approve_fullname']); 
        }
        if(isset ($x['approve_date'])){
           $this->setApproveDate($x['approve_date']); 
        }
        if(isset ($x['is_reject'])){
           $this->setIsReject($x['is_reject']); 
        }
        if(isset ($x['reject_fullname'])){
           $this->setRejectUser($x['reject_fullname']); 
        }
        if(isset ($x['user_fullname'])){
           $this->setUserFullname($x['user_fullname']); 
        }
        if(isset ($x['reject_date'])){
           $this->setRejectDate($x['reject_date']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddon($x['Addon']); 
        }
        if(isset ($x['facilitiestype_facilitiestype_id'])){
           $this->getFacilitiesType()->setId($x['facilitiestype_facilitiestype_id']); 
        }
        if(isset ($x['cluster_cluster_id'])){
           $this->getCluster()->setId($x['cluster_cluster_id']); 
        }
        if(isset ($x['biaya'])){
           $this->setBiaya($x['biaya']); 
        }
        if(isset ($x['saldo'])){
           $this->setSaldo($x['saldo']); 
        }
        if(isset ($x['remaining_saldo'])){
           $this->setRemainingSaldo($x['remaining_saldo']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'whatsapp_topup_id'=>$this->getId(),
            'topup_date'=>$this->getTopupDate(),
            'user_id'=>$this->getUserID(),
            'nominal'=>$this->getNominal(),
            'bukti_topup'=>$this->getBuktiTopup(),
            'is_approve'=>$this->getIsApprove(),
            'approve_fullname'=>$this->getApproveUser(),
            'user_fullname'=>$this->getUserFullname(),
            'approve_date'=>$this->getApproveDate(),
            'is_reject'=>$this->getIsReject(),
            'reject_fullname'=>$this->getRejectUser(),
            'reject_date'=>$this->getRejectDate(),
            'Addon'=>$this->getAddon(),
            'facilitiestype_facilitiestype_id'=>$this->getFacilitiesType()->getId(),
            'cluster_cluster_id'=>$this->getCluster()->getId(),
            'layer_img'=>$this->getImage(),
            'biaya'=>$this->getBiaya(),
            'saldo'=>$this->getSaldo(),
            'remaining_saldo'=>$this->getRemainingSaldo()
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCluster(),$this->getFacilitiesType());
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }

    public function addDetailObject($detailObject) {
        $this->addDetail($detailObject);
    }

    public function getDetailObject() {
        return new Erems_Models_Master_TopupwhatsappImage();
    }

    public function getIndexArName() {
        return "detail";
    }

    public function getDeletedDecanString() {
        return $this->deletedDetail;
    }

    public function getDeletedFieldName() {
        return "deletedRows";
    }

    public function setDeletedDecanString($string) {
        $this->deletedDetail = $string;
    }


}

?>
