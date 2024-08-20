<?php

class Erems_Models_Expenserequest_ExpenseDetail extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried,  Erems_Box_Kouti_Remora {

    private $expenseId;
    private $unitId;
    private $description;
    private $amount;
    private $paymenttypeId;
    private $expensetypeId;
    private $paymentType;
    private $expenseType;
    private $expense;
    private $unit;
    private $purchaseletter;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'expensedetail_';
    }

    public function setExpenseId($ao) {
        $this->expenseId = $ao;
    }

    public function getExpenseId() {
        return $this->expenseId;
    }

    public function setUnitId($ao) {
        $this->unitId = $ao;
    }

    public function getUnitId() {
        return $this->unitId;
    }

    public function setDescription($ao) {
        $this->description = $ao;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setAmount($ao) {
        $this->amount = doubleval($ao);
    }

    public function getAmount() {
        return (double)$this->amount;
    }

    public function setPaymentTypeId($ao) {
        $this->paymenttypeId = $ao;
    }

    public function getPaymentTypeId() {
        return $this->paymenttypeId;
    }

    public function setExpenseTypeId($ao) {
        $this->expensetypeId = $ao;
    }

    public function getExpenseTypeId() {
        return $this->expensetypeId;
    }
    
    public function getArray() {
        $ar = $this->getArrayTable();
        return $ar;
    }
    
    public function getPaymentType() {
        if(!$this->paymentType){
            $this->paymentType = new Erems_Models_Master_PaymentType();
        }
        return $this->paymentType;
    }

    public function setPaymentType(Erems_Models_Master_PaymentType $paymentType) {
        $this->paymentType = $paymentType;
    }

    public function getExpenseType() {
        if(!$this->expenseType){
            $this->expenseType = new Erems_Models_Master_ExpenseType();
        }
        return $this->expenseType;
    }

    public function setExpenseType(Erems_Models_Master_ExpenseType $expenseType) {
        $this->expenseType = $expenseType;
    }

    public function getExpense() {
        if(!$this->expense){
            $this->expense = new Erems_Models_Expenserequest_Expense();
        }
        return $this->expense;
    }

    public function setExpense(Erems_Models_Expenserequest_Expense $expense) {
        
        $this->expense = $expense;
    }
    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Master_UnitB();
        }
        return $this->unit;
    }

    public function setUnit(Erems_Models_Master_UnitB $unit) {
        $this->unit = $unit;
    }
    
    function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
            
        }
        return $this->purchaseletter;
    }

    function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    
    
    
    public function setArrayTable($dataArray) {
        $x = $dataArray;
        
        if(isset ($x['expensedetail_id'])){
          $this->setId($x['expensedetail_id']);
        }
        if(isset ($x['amount'])){
          $this->setAmount($x['amount']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
        if(isset ($x['expense_expense_id'])){
          $this->getExpense()->setId($x['expense_expense_id']);
        }
        if(isset ($x['unit_unit_id'])){
          $this->getUnit()->setId($x['unit_unit_id']);
        }
        if(isset ($x['expensetype_expensetype_id'])){
          $this->getExpenseType()->setId($x['expensetype_expensetype_id']);
        }
        if(isset ($x['paymenttype_paymenttype_id'])){
          $this->getPaymentType()->setId($x['paymenttype_paymenttype_id']);
        }
        if(isset ($x['purchaseletter_purchaseletter_id'])){
          $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']);
        }
        
        
        
    }
    
    public function getArrayTable(){
        $x = array();
        $x['expensedetail_id'] = $this->getId();
        $x['expense_expense_id']  = $this->getExpense()->getId();
        $x['unit_unit_id'] = $this->getUnit()->getId();
        $x['expensetype_expensetype_id'] = $this->getExpenseType()->getId();
        $x['paymenttype_paymenttype_id'] = $this->getPaymentType()->getId();
        $x['amount'] = $this->getAmount();
        $x['description'] = $this->getDescription();
        $x['purchaseletter_purchaseletter_id'] = $this->getPurchaseletter()->getId();
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getExpense(),$this->getExpenseType(),$this->getUnit(),$this->getPaymentType());
    }
    
    
    
    
    
    
    
 

}

?>
