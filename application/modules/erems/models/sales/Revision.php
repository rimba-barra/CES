<?php

/**
 * Description of Revision
 *
 * @author tommytoban
 */
class Erems_Models_Sales_Revision extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {
    private $purchasletter;
    private $type;
    private $index;
    private $note;
    private $approve;
    private $reject;
    private $approveReal;
    private $approveColl;
    private $approveManager;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix?$embedPrefix: "purchaseletterrevision_";
        $this->approve = new Erems_Models_Master_Approve();
        $this->approveReal = new Erems_Models_Master_Approve();
        $this->approveColl = new Erems_Models_Master_Approve();
        $this->approveManager = new Erems_Models_Master_Approve();
        $this->reject = new Erems_Models_Master_Reject();
        $this->type = new Erems_Models_Master_RevisionType();
        $this->purchasletter = new Erems_Models_Purchaseletter_PurchaseLetter();
       
    }
    
    public function getPurchasletter() {
        if(!$this->purchasletter){
            $this->purchasletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchasletter;
    }

    public function getType() {
        if(!$this->type){
            $this->type = new Erems_Models_Master_RevisionType();
        }
        return $this->type;
    }

    public function getIndex() {
        return $this->index;
    }

    public function getNote() {
        return $this->note;
    }

    public function getApprove() {
        if(!$this->approve){
            $this->approve = new Erems_Models_Master_Approve();
        }
        return $this->approve;
    }

    public function setPurchasletter($purchasletter) {
        $this->purchasletter = $purchasletter;
    }

    public function setType(Erems_Models_Master_RevisionType $type) {
        $this->type = $type;
    }

    public function setIndex($index) {
        $this->index = $index;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    public function setApprove(Erems_Models_Master_Approve $approve) {
        $this->approve = $approve;
    }
    
    public function getReject() {
        if(!$this->reject){
            $this->reject = new Erems_Models_Master_Reject();
        }
        return $this->reject;
    }

    public function setReject(Erems_Models_Master_Reject $reject) {
        $this->reject = $reject;
    }
    
    function getApproveReal() {
        if(!$this->approveReal){
            $this->approveReal = new Erems_Models_Master_Approve();
        }
        return $this->approveReal;
    }

    function setApproveReal(Erems_Models_Master_Approve $approveReal) {
        $this->approveReal = $approveReal;
    }
    
    function getApproveColl() {
        if(!$this->approveColl){
            $this->approveColl = new Erems_Models_Master_Approve();
        }
        return $this->approveColl;
    }

    function setApproveColl(Erems_Models_Master_Approve $approveColl) {
        $this->approveColl = $approveColl;
    }

    function getApproveManager() {
        if(!$this->approveManager){
            $this->approveManager = new Erems_Models_Master_Approve();
        }
        return $this->approveManager;
    }

    function setApproveManager(Erems_Models_Master_Approve $approveManager) {
        $this->approveManager = $approveManager;
    }

        
        
    public function setArrayTable($dataArray=NULL) {

        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['purchaseletterrevision_id'])){
          $this->setId($x['purchaseletterrevision_id']);
        }
        if(isset ($x['purchaseletter_id'])){
          $this->getPurchasletter()->setId($x['purchaseletter_id']);
        }
        if(isset ($x['revisiontype_id'])){
          $this->getType()->setId($x['revisiontype_id']);
        }
        if(isset ($x['indeks'])){
          $this->setIndex($x['indeks']);
        }
        if(isset ($x['note'])){
          $this->setNote($x['note']);
        }
        if(isset ($x['is_approve'])){
          $this->getApprove()->setFlag($x['is_approve']);
        }
        if(isset ($x['approve_date'])){
          $this->getApprove()->setDate($x['approve_date']);
        }
        if(isset ($x['approve_by'])){
          $this->getApprove()->getUser()->setId($x['approve_by']);
        }
        if(isset ($x['is_rejected'])){
          $this->getReject()->setFlag($x['is_rejected']);
        }
        if(isset ($x['rejected_date'])){
          $this->getReject()->setDate($x['rejected_date']);
        }
        if(isset ($x['rejected_by'])){
          $this->getReject()->getUser()->setId($x['rejected_by']);
        }
        if(isset ($x['approvereal_date'])){
          $this->getApproveReal()->setDate($x['approvereal_date']);
        }
        if(isset ($x['is_approvecollection'])){
          $this->getApproveColl()->setFlag($x['is_approvecollection']);
        }
        if(isset ($x['approvecollection_date'])){
          $this->getApproveColl()->setDate($x['approvecollection_date']);
        }
        if(isset ($x['approvecollection_by'])){
          $this->getApproveColl()->getUser()->setId($x['approvecollection_by']);
        }
         if(isset ($x['is_approvemanager'])){
          $this->getApproveManager()->setFlag($x['is_approvemanager']);
        }
        if(isset ($x['approvemanager_date'])){
          $this->getApproveManager()->setDate($x['approvemanager_date']);
        }
        if(isset ($x['approvemanager_by'])){
          $this->getApproveManager()->getUser()->setId($x['approvemanager_by']);
        }
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'purchaseletterrevision_id'=>$this->getId(),
            'purchaseletter_id'=>$this->getPurchasletter()->getId(),
            'revisiontype_id'=>$this->getType()->getId(),
            'indeks'=>$this->getIndex(),
            'note'=>$this->getNote(),
            'is_approve'=>$this->getApprove()->getFlag(),
            'approve_date'=>$this->getApprove()->getDate(),
            'approve_by'=>$this->getApprove()->getUser()->getId(),
            'is_rejected'=>$this->getReject()->getFlag(),
            'rejected_date'=>$this->getReject()->getDate(),
            'rejected_by'=>$this->getReject()->getUser()->getId(),
            'approvereal_date'=>$this->getApproveReal()->getDate(),
            'is_approvecollection'=>$this->getApproveColl()->getFlag(),
            'approvecollection_date'=>$this->getApproveColl()->getDate(),
            'approvecollection_by'=>$this->getApproveColl()->getUser()->getId(),
            'is_approvemanager'=>$this->getApproveManager()->getFlag(),
            'approvemanager_date'=>$this->getApproveManager()->getDate(),
            'approvemanager_by'=>$this->getApproveManager()->getUser()->getId()
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPurchasletter(),$this->getType());
    }
    
    


    
}
