<?php

class Erems_Models_Expenserequest_Expense extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried,Erems_Box_Delien_DelimiterCandidate,  Erems_Box_Kouti_Remora,Erems_Box_Models_App_Hermes_Nomorable,Erems_Box_Models_App_Hermes_HasDetail,  Erems_Box_Models_Master_InterProjectPt {
    private $projectId;
    private $ptId;
    private $nomor;
    private $departmentId;
    private $date;
    private $note;
    private $totalAmount;
    private $expenseDetail;
    private $DCResult;
    private $department;
    private $paymentMethod;
    private $project;
    private $pt;
    
    
    /*
     * @var Erems_Models_Voucher
     */
    private $voucher;
    /*
     * @var boolean
     */
    private $approved;
    private $approveDate;
    private $paymentMethodId;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'expense_';
        $this->expenseDetail = array();
    }
    
    public function setProjectId($ao){
        $this->projectId = $ao;
    }
    
    public function getProjectId(){
        return $this->projectId;
    }
    
    public function setPtId($ao){
        $this->ptId = $ao;
    }
    
    public function getPtId(){
        return $this->ptId;
    }
    
    public function setNomor($ao){
        $this->nomor = $ao;
    }
    
    public function getNomor(){
        return $this->nomor;
    }
    
    public function setDepartmentId($ao){
        $this->departmentId = $ao;
    }
    
    public function getDepartmentId(){
        return $this->departmentId;
    }
    
    public function setDate($ao){
        $this->date = $ao;
        
    }
    
    public function getDate(){
        return $this->date;
    }
    
    public function setNote($ao){
        $this->note = $ao;
    }
    
    public function getNote(){
        return $this->note;
    }
    
    public function setTotalAmount($ao){
        $this->totalAmount = $ao;
    }
    
    public function getTotalAmount(){
        return $this->totalAmount;
    }
    
    public function addExpenseDetail(Erems_Models_Expenserequest_ExpenseDetail $x){
        $this->expenseDetail[] = $x;
    }
    public function getExpenseDetail($posisi=-1){
        if(key_exists($posisi,$this->expenseDetail)){
            return $this->expenseDetail[$posisi];
        }
        return $this->expenseDetail;
        
    }

    public function getDCArray() {
        return $this->expenseDetail;
    }

    public function setDCArray($data) {
        $this->DCResult = $data;
    }
    
    public function getDCResult(){
        return $this->DCResult;
    }

    public function getArray() {
        $ar = $this->getArrayTable();
        return $ar;
    }
    
    public function getVoucher() {
        if($this->voucher instanceof Erems_Models_Voucher){
            return $this->voucher;
        }else{
            return new Erems_Models_Voucher();
        }
        
    }

    public function setVoucher(Erems_Models_Voucher $voucher) {
        $this->voucher = $voucher;
    }
    
    public function getApproved() {
        return $this->approved;
    }

    public function setApproved($approved) {
        $this->approved = $approved;
        
    }

    public function getApproveDate() {
        return $this->approveDate;
    }

    public function setApproveDate($approveDate) {
        $this->approveDate = $approveDate;
        //$this->approveDate = date("d/m/Y",strtotime($approveDate));
    }

    public function getPaymentMethodId() {
        return $this->paymentMethodId;
    }

    public function setPaymentMethodId($paymentMethodId) {
        $this->paymentMethodId = $paymentMethodId;
    }
    
    public function getDepartment() {
        if(!$this->department){
            $this->department = new Erems_Models_Master_Department();
        }
        return $this->department;
    }

    public function setDepartment(Erems_Models_Master_Department $department) {
        $this->department = $department;
    }
    
    public function getPaymentMethod() {
        if(!$this->paymentMethod){
            $this->paymentMethod = new Erems_Models_Master_PaymentMethod();
        }
        return $this->paymentMethod;
    }

    public function setPaymentMethod(Erems_Models_Master_PaymentMethod $paymentMethod) {
        $this->paymentMethod = $paymentMethod;
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

    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['expense_id']);
        //$this->setProjectId($x['project_id']);
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
          $this->setPtId($x['pt_id']);
        }
        if(isset ($x['expense_no'])){
          $this->setNomor($x['expense_no']);
        }
        if(isset ($x['department_id'])){
          $this->setDepartmentId($x['department_id']);
        }
        if(isset ($x['expense_date'])){
          $this->setDate($x['expense_date']);
        }
        if(isset ($x['total_amount'])){
           $this->setTotalAmount($x['total_amount']);
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']);
        }
        

        /*add voucher*/
        $voucher = $this->getVoucher();
        if(isset ($x['voucher_date'])){
          $voucher->setDate($x['voucher_date']);
        }
        if(isset ($x['voucher_no'])){
          $voucher->setNumber($x['voucher_no']);
        }
        if(isset ($x['reference_no'])){
          $voucher->setReferenceNumber($x['reference_no']);
        }
        
        $this->setVoucher($voucher);
        
        if(isset ($x['approved'])){
          $this->setApproved($x['approved']);
        }
        if(isset ($x['approve_date'])){
          $this->setApproveDate($x['approve_date']);
        }
        if(isset ($x['paymentmethod_id'])){
          $this->setPaymentMethodId($x['paymentmethod_id']);
        }
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array();
      
        $x['expense_id'] = $this->getId();
        $x['project_id'] = $this->getProjectId();
        $x['pt_id'] = $this->getPtId();
        $x['expense_no'] = $this->getNomor();
        $x['department_id']= $this->getDepartmentId();
        $x['expense_date'] = $this->getDate();
        $x['total_amount'] = $this->getTotalAmount();
        $x['note'] = $this->getNote();
        /*add voucher*/
        $voucher = $this->getVoucher();
        $x['voucher_date'] = $voucher->getDate();
        $x['voucher_no'] = $voucher->getNumber();
        $x['reference_no'] = $voucher->getReferenceNumber();
        /*end add voucher*/
        $x['approved']= $this->getApproved();
        $x['approve_date'] = $this->getApproveDate();
        $x['paymentmethod_id'] = $this->getPaymentMethodId();
        return $x;
    }
        
    protected function getDatefields() {
        return array("voucher_date","approve_date","expense_date");
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getDepartment(),$this->getPaymentMethod());
    }

    public function addDetailObject($detailObject) {
        $this->addExpenseDetail($detailObject);
    }

    public function getDetailObject() {
        return new Erems_Models_Expenserequest_ExpenseDetail();
    }

    public function getIndexArName() {
        return "detail";
    }

    public function getPrefixNumber() {
        return "EXPENSEDOC";
    }

    public function setDocumentNumber($nomorResult) {
        $this->setNomor($nomorResult);
    }
}

?>
