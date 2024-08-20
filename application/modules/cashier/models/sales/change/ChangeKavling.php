<?php
/**
 * Description of ChangeKavling
 *
 * @author MIS
 */
class Cashier_Models_Sales_Change_ChangeKavling extends Cashier_Models_Sales_Change implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt {
    private $purchaseLetter;
    private $newPurchaseLetter;
    private $project;
    private $pt;

    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "changekavling_";
        $this->reason = new Cashier_Models_Sales_Reason_MoveReason();
    }

    public function getNewPurchaseLetter() {
        if(!$this->newPurchaseLetter){
            $this->newPurchaseLetter = new Cashier_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->newPurchaseLetter;
    }

    public function setNewPurchaseLetter(Cashier_Models_Purchaseletter_PurchaseLetter  $newPurchaseLetter) {
        $this->newPurchaseLetter = $newPurchaseLetter;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Cashier_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Cashier_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
   

   

        
    public function getReason() {
        if(!$this->reason){
            $this->reason = new Cashier_Models_Sales_Reason_MoveReason();
        }
        return $this->reason;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['changekavling_id'])){
          $this->setId($x['changekavling_id']);
        }
        if(isset ($x['project_id'])){
          $this->getProject()->setId($x['project_id']);
        }
        if(isset ($x['pt_id'])){
          $this->getPt()->setId($x['pt_id']);
        }
        if(isset ($x['purchaseletter01_id'])){
          $this->getPurchaseletter()->setId($x['purchaseletter01_id']);
        }
        if(isset ($x['purchaseletter02_id'])){
          $this->getNewPurchaseLetter()->setId($x['purchaseletter02_id']);
        }
        if(isset ($x['reasonchgkavling_id'])){
          $this->getReason()->setId($x['reasonchgkavling_id']);
        }
        if(isset ($x['reasonchgkavling_note'])){
          $this->setNote($x['reasonchgkavling_note']);
        }
    }
    
    public function getArrayTable() {
        //$x = parent::getArrayTable();
        $x = array(
            "changekavling_id"=>$this->getId(),
            "project_id"=>$this->getProject()->getId(),
            "pt_id"=>$this->getPt()->getId(),
            "purchaseletter01_id"=>$this->getPurchaseletter()->getId(),
            "purchaseletter02_id"=>$this->getNewPurchaseLetter()->getId(),
            "reasonchgkavling_id"=>$this->getReason()->getId(),
            "reasonchgkavling_note"=>$this->getNote()
        );
        return $x;
        
    }

    
        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPurchaseletter(),$this->getNewPurchaseLetter(),$this->getProject(),$this->getPt(),$this->getRevision());
    }    
}

?>
