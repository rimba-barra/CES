<?php

/**
 * Description of PaymentDetail
 *
 * @author MIS
 */


class Erems_Models_Payment_Detail extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried,  Erems_Box_Kouti_Remora {
    private $paymentType;
    private $schedule;
    private $description;
    private $amount;
    private $payment;
    private $remainingBalance;
    private $denda;
    private $isDebitNote;
    private $isCreditNote;
    private $debitNote;
    private $creditNote;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "paymentdetail_";
        $this->schedule = new Erems_Models_Purchaseletter_Schedule();
        $this->paymentType = new Erems_Models_Master_PaymentType();
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

    public function getSchedule() {
        if(!$this->schedule){
            $this->schedule = new Erems_Models_Purchaseletter_Schedule();
        }
        return $this->schedule;
    }

    public function setSchedule(Erems_Models_Purchaseletter_Schedule $schedule) {
        $this->schedule = $schedule;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getAmount() {
        return (double)$this->amount;
    }

    public function setAmount($amount) {
        $this->amount = (double)$amount;
    }

    public function getPayment() {
        return (double)$this->payment;
    }

    public function setPayment($payment) {
        $this->payment = (double)$payment;
    }

    public function getRemainingBalance() {
        return (double)$this->remainingBalance;
    }

    public function setRemainingBalance($remainingBalance) {
        $this->remainingBalance = (double)$remainingBalance;
    }

    public function getDenda() {
        return (double)$this->denda;
    }

    public function setDenda($denda) {
        $this->denda = (double)$denda;
    }

    public function getIsDebitNote() {
        return $this->isDebitNote;
    }

    public function setIsDebitNote($isDebitNote) {
        $this->isDebitNote = $isDebitNote;
    }

    public function getIsCreditNote() {
        return $this->isCreditNote;
    }

    public function setIsCreditNote($isCreditNote) {
        $this->isCreditNote = $isCreditNote;
    }

    public function getDebitNote() {
        return $this->debitNote;
    }

    public function setDebitNote($debitNote) {
        $this->debitNote = $debitNote;
    }

    public function getCreditNote() {
        return $this->creditNote;
    }

    public function setCreditNote($creditNote) {
        $this->creditNote = $creditNote;
    }
    
   

        
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['paymentdetail_id'])){
          $this->setId($x['paymentdetail_id']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
        if(isset ($x['amount'])){
          $this->setAmount($x['amount']);
        }
        if(isset ($x['payment'])){
          $this->setPayment($x['payment']);
        }
        if(isset ($x['remaining_balance'])){
          $this->setRemainingBalance($x['remaining_balance']);
        }
        if(isset ($x['denda'])){
          $this->setDenda($x['denda']);
        }
        if(isset ($x['is_debitnote'])){
          $this->setIsDebitNote($x['is_debitnote']);
        }
        if(isset ($x['is_creditnote'])){
          $this->setIsCreditNote($x['is_creditnote']);
        }
        if(isset ($x['debitnote'])){
          $this->setDebitNote($x['debitnote']);
        }
        
        if(isset ($x['creditnote'])){
          $this->setCreditNote($x['creditnote']);
        }
        
        if(isset ($x['schedule_id'])){
          $this->getSchedule()->setId($x['schedule_id']);
        }
        
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            'paymentdetail_id'=>$this->getId(),
            'description'=>$this->getDescription(),
            'amount'=>$this->getAmount(),
            'payment'=>$this->getPayment(),
            'remaining_balance'=>$this->getRemainingBalance(),
            'denda'=>$this->getDenda(),
            'is_debitnote'=>$this->getIsDebitNote(),
            'is_creditnote'=>$this->getIsCreditNote(),
            'debitnote'=>$this->getDebitNote(),
            'creditnote'=>$this->getCreditNote(),
            'schedule_id'=>$this->getSchedule()->getId(),
            'paymenttype_id'=>$this->getPaymentType()->getId()
        );
        return $x;
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPaymentType(),$this->getSchedule());
    }


}

?>
