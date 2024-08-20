<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Voucher extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
   private $approvebyId;
   private $approveDate;
   private $unapproveDate;
   private $approve_user_id;
   private $unapprove_user_id;
   private $dueDate;
   private $voucherDate;
   private $chequeDate;
   private $chequeserahterimaDate;
   private $voucherNo;
   private $chequegiroNo;
   private $cashiervoucherNo;
   private $kasbank;
   private $dataflow;
   private $status;
   private $vendorNote;
   private $cashierNote;
   private $description;
   private $amount;
   private $cashier_voucher_date;
   private $voucherID;
   
   
    

    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        $this->detail = array();
        $this->embedPrefix = 'voucher_';
    }

    function getApprovebyId() {
        return $this->approvebyId;
    }

    function getApproveDate() {
        return $this->approveDate;
    }

    function getUnapproveDate() {
        return $this->unapproveDate;
    }

    function getDueDate() {
        return $this->dueDate;
    }

    function getVoucherDate() {
        return $this->voucherDate;
    }

    function getChequeDate() {
        return $this->chequeDate;
    }

    function getChequeserahterimaDate() {
        return $this->chequeserahterimaDate;
    }

    function getVoucherNo() {
        return $this->voucherNo;
    }

    function getChequegiroNo() {
        return $this->chequegiroNo;
    }

    function getCashiervoucherNo() {
        return $this->cashiervoucherNo;
    }

    function getKasbank() {
        return $this->kasbank;
    }

    function getDataflow() {
        return $this->dataflow;
    }

    function getStatus() {
        return $this->status;
    }

    function getVendorNote() {
        return $this->vendorNote;
    }

    function getCashierNote() {
        return $this->cashierNote;
    }

    function getDescription() {
        return $this->description;
    }

    function getAmount() {
        return $this->amount;
    }

    function setApprovebyId($approvebyId) {
        $this->approvebyId = $approvebyId;
    }

    function setApproveDate($approveDate) {
        $this->approveDate = $approveDate;
    }

    function setUnapproveDate($unapproveDate) {
        $this->unapproveDate = $unapproveDate;
    }

    function setDueDate($dueDate) {
        $this->dueDate = $dueDate;
    }

    function setVoucherDate($voucherDate) {
        $this->voucherDate = $voucherDate;
    }

    function setChequeDate($chequeDate) {
        $this->chequeDate = $chequeDate;
    }

    function setChequeserahterimaDate($chequeserahterimaDate) {
        $this->chequeserahterimaDate = $chequeserahterimaDate;
    }

    function setVoucherNo($voucherNo) {
        $this->voucherNo = $voucherNo;
    }

    function setChequegiroNo($chequegiroNo) {
        $this->chequegiroNo = $chequegiroNo;
    }

    function setCashiervoucherNo($cashiervoucherNo) {
        $this->cashiervoucherNo = $cashiervoucherNo;
    }

    function setKasbank($kasbank) {
        $this->kasbank = $kasbank;
    }

    function setDataflow($dataflow) {
        $this->dataflow = $dataflow;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setVendorNote($vendorNote) {
        $this->vendorNote = $vendorNote;
    }

    function setCashierNote($cashierNote) {
        $this->cashierNote = $cashierNote;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function getApprove_user_id() {
        return $this->approve_user_id;
    }

    function setApprove_user_id($approve_user_id) {
        $this->approve_user_id = $approve_user_id;
    }
    function getUnapprove_user_id() {
        return $this->unapprove_user_id;
    }

    function setUnapprove_user_id($unapprove_user_id) {
        $this->unapprove_user_id = $unapprove_user_id;
    }
    function getCashier_voucher_date() {
        return $this->cashier_voucher_date;
    }

    function setCashier_voucher_date($cashier_voucher_date) {
        $this->cashier_voucher_date = $cashier_voucher_date;
    }

    function getVoucherID() {
        return $this->voucherID;
    }

    function setVoucherID($voucherID) {
        $this->voucherID = $voucherID;
    }

    

                        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['voucher_id'])){
           $this->setId($x['voucher_id']); 
        }
        if(isset ($x['approveby_id'])){
           $this->setApprovebyId($x['approveby_id']); 
        }
        if(isset ($x['approve_date'])){
           $this->setApproveDate($x['approve_date']); 
        }
        if(isset ($x['unapprove_date'])){
           $this->setUnapproveDate($x['unapprove_date']); 
        }
        if(isset ($x['approve_user_id'])){
           $this->setApprove_user_id($x['approve_user_id']); 
        }
        if(isset ($x['unapprove_user_id'])){
           $this->setUnapprove_user_id($x['unapprove_user_id']); 
        }
        if(isset ($x['due_date'])){
           $this->setDueDate($x['due_date']); 
        }
        if(isset ($x['voucher_date'])){
           $this->setVoucherDate($x['voucher_date']); 
        }
        if(isset ($x['chequegiro_date'])){
           $this->setChequeDate($x['chequegiro_date']); 
        }
        if(isset ($x['chequegiro_handover_date'])){
           $this->setChequeserahterimaDate($x['chequegiro_handover_date']); 
        }
        if(isset ($x['cashier_voucher_date'])){
           $this->setCashier_voucher_date($x['cashier_voucher_date']); 
        }
        if(isset ($x['voucher_no'])){
           $this->setVoucherNo($x['voucher_no']); 
        }
        if(isset ($x['chequegiro_no'])){
           $this->setChequegiroNo($x['chequegiro_no']); 
        }
        if(isset ($x['kasbank'])){
           $this->setKasbank($x['kasbank']); 
        }
        if(isset ($x['dataflow'])){
           $this->setDataflow($x['dataflow']); 
        }
        if(isset ($x['status'])){
           $this->setStatus($x['status']); 
        }
        if(isset ($x['vendor_note'])){
           $this->setVendorNote($x['vendor_note']); 
        }
        if(isset ($x['cashier_note'])){
           $this->setCashierNote($x['cashier_note']); 
        }
        if(isset ($x['description'])){
           $this->setDescription(str_replace("'","`",$x['description'])); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
       if(isset ($x['voucherID'])){
           $this->setVoucherID($x['voucherID']); 
        }
       
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "voucher_id"=>$this->getId(),
            "approvebyId"=>$this->getApprovebyId(),
            "approveDate"=>$this->getApproveDate(),
            "unapproveDate"=>$this->getUnapproveDate(),
            "approve_user_id"=>$this->getApprove_user_id(),
            "unapprove_user_id"=>$this->getUnapprove_user_id(),
            "dueDate"=>$this->getDueDate(),
            "voucherDate"=>$this->getVoucherDate(),
            "chequeDate"=>$this->getChequeDate(),
            "chequeserahterimaDate"=>$this->getChequeserahterimaDate(),
            "voucherNo"=>$this->getVoucherNo(),
            "chequegiroNo"=>$this->getChequegiroNo(),
            "cashiervoucherNo"=>$this->getCashiervoucherNo(),
            "kasbank"=>$this->getKasbank(),
            "dataflow"=>$this->getDataflow(),
            "status"=>$this->getStatus(),
            "vendorNote"=>$this->getVendorNote(),
            "cashierNote"=>$this->getCashierNote(),
            "description"=>$this->getDescription(),
            "amount"=>$this->getAmount(),
            "cashier_voucher_date"=>$this->getCashier_voucher_date(),
            "voucherID"=>$this->getVoucherID(),
           
        );
        
        return $x;
    }
    

    
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
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



}

?>
