<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Journal extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $madeby;
    private $voucherno;
    private $jurnalno;
    private $jurnalvoucherno;
    private $chequegirono;
    private $dataflow;
    private $kasbank;
    private $chequegirostatus;
    private $kasbankdate;
    private $journaldate;
    private $postingdate;
    private $chequegirodate;
    private $acceptdate;
    private $chequegiropaymentdate;
    private $chequegiroreceivedate;
    private $amount;
    private $amountc;
    private $sumtotaldetail; //debet
    private $sumtotalcdetail;  //credit
    private $description;
    private $fordepartment;
    private $payment;
    private $voucherID;
    private $journalID;
    private $customername;
    private $issueddate;
    private $paymentdate;
    private $cheque;
    private $detail;
    private $subdetail;
    private $kwitansiDate;
    private $bankName;
    private $paymentflag_id;
    private $receiptno;
    private $isposting;
    private $isrealized;
    private $status;
    private $debittotal;
    private $credittotal;
    private $jid;
    private $refferalId;
    private $is_memorialcashflow;
    private $is_directsave;
    private $invoice_no;
    private $modion;
    private $modiby;
    private $addby;
    private $is_fromkasir;
    private $jumlah_sub_detail;
    private $kasbank_id;
    private $journal_type;

   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->payment = new Cashier_Models_Payment_Payment();
        $this->cheque = new Cashier_Models_Master_Cheque();
        $this->embedPrefix = 'journal_';
        $this->detail = array();
        $this->subdetail = array();
    }

    function getMadeby() {
        return $this->madeby;
    }

    function getVoucherno() {
        return $this->voucherno;
    }

    function getJurnalvoucherno() {
        return $this->jurnalvoucherno;
    }

    function getChequegirono() {
        return $this->chequegirono;
    }

    function getDataflow() {
        return $this->dataflow;
    }

    function getKasbank() {
        return $this->kasbank;
    }

    function getChequegirostatus() {
        return $this->chequegirostatus;
    }

    function getKasbankdate() {
        return $this->kasbankdate;
    }

    function getPostingdate() {
        return $this->postingdate;
    }

    function getChequegirodate() {
        return $this->chequegirodate;
    }

    function getAcceptdate() {
        return $this->acceptdate;
    }

    function getChequegiropaymentdate() {
        return $this->chequegiropaymentdate;
    }

    function getChequegiroreceivedate() {
        return $this->chequegiroreceivedate;
    }

    function getAmount() {
        return $this->amount;
    }

    function getDescription() {
        return $this->description;
    }


    function setMadeby($madeby) {
        $this->madeby = $madeby;
    }

    function setVoucherno($voucherno) {
        $this->voucherno = $voucherno;
    }

    function setJurnalvoucherno($jurnalvoucherno) {
        $this->jurnalvoucherno = $jurnalvoucherno;
    }

    function setChequegirono($chequegirono) {
        $this->chequegirono = $chequegirono;
    }

    function setDataflow($dataflow) {
        $this->dataflow = $dataflow;
    }

    function setKasbank($kasbank) {
        $this->kasbank = $kasbank;
    }

    function setChequegirostatus($chequegirostatus) {
        $this->chequegirostatus = $chequegirostatus;
    }

    function setKasbankdate($kasbankdate) {
        $this->kasbankdate = $kasbankdate;
    }

    function setPostingdate($postingdate) {
        $this->postingdate = $postingdate;
    }

    function setChequegirodate($chequegirodate) {
        $this->chequegirodate = $chequegirodate;
    }

    function setAcceptdate($acceptdate) {
        $this->acceptdate = $acceptdate;
    }

    function setChequegiropaymentdate($chequegiropaymentdate) {
        $this->chequegiropaymentdate = $chequegiropaymentdate;
    }

    function setChequegiroreceivedate($chequegiroreceivedate) {
        $this->chequegiroreceivedate = $chequegiroreceivedate;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function getFordepartment() {
        return $this->fordepartment;
    }

    function setFordepartment($fordepartment) {
        $this->fordepartment = $fordepartment;
    }

    function getVoucherID() {
        return $this->voucherID;
    }

    function setVoucherID($voucherID) {
        $this->voucherID = $voucherID;
    }
    function getCustomername() {
        return $this->customername;
    }

    function setCustomername($customername) {
        $this->customername = $customername;
    }
    function getIssueddate() {
        return $this->issueddate;
    }

    function setIssueddate($issueddate) {
        $this->issueddate = $issueddate;
    }

    function getPaymentdate() {
        return $this->paymentdate;
    }

    function setPaymentdate($paymentdate) {
        $this->paymentdate = $paymentdate;
    }

    function getPayment() {
        return $this->payment;
    }

    function setPayment(Cashier_Models_Payment_Payment $payment) {
        $this->payment = $payment;
    }
    
    
    function getCheque() {
        return $this->cheque;
    }

    function setCheque(Cashier_Models_Master_Cheque $cheque) {
        $this->cheque = $cheque;
    }

    function getKwitansiDate() {
        return $this->kwitansiDate;
    }

    function setKwitansiDate($kwitansiDate) {
        $this->kwitansiDate = $kwitansiDate;
    }
    function getBankName() {
        return $this->bankName;
    }

    function setBankName($bankName) {
        $this->bankName = $bankName;
    }
    function getPaymentflag_id() {
        return $this->paymentflag_id;
    }

    function setPaymentflag_id($paymentflag_id) {
        $this->paymentflag_id = $paymentflag_id;
    }
    function getReceiptno() {
        return $this->receiptno;
    }

    function setReceiptno($receiptno) {
        $this->receiptno = $receiptno;
    }
    function getIsposting() {
        return $this->isposting;
    }

    function getIsrealized() {
        return $this->isrealized;
    }

    function setIsposting($isposting) {
        $this->isposting = $isposting;
    }

    function setIsrealized($isrealized) {
        $this->isrealized = $isrealized;
    }
    function getStatus() {
        return $this->status;
    }

    function setStatus($status) {
        $this->status = $status;
    }
    function getInvoiceNo(){
        return $this->invoice_no;
    }
    function setInvoiceNo($invoice_no){
        $this->invoice_no = $invoice_no;
    }

    function getIsFromKasir() {
        return $this->is_fromkasir;
    }

    function setIsFromKasir($is_fromkasir) {
        $this->is_fromkasir = $is_fromkasir;
    }

    function getKasbankId() {
        return $this->kasbank_id;
    }

    function setKasbankId($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['journal_id'])){
           $this->setId($x['journal_id']); 
        }

        if(isset ($x['made_by'])){
           $this->setMadeby($x['made_by']); 
        }
        if(isset ($x['voucher_no'])){
           $this->setVoucherno($x['voucher_no']); 
        }
        if(isset ($x['journal_voucher_no'])){
           $this->setJurnalvoucherno($x['journal_voucher_no']); 
        }
        if(isset ($x['journal_no'])){
           $this->setJurnalno($x['journal_no']); 
        }
        if(isset ($x['chequegiro_no'])){
           $this->setChequegirono($x['chequegiro_no']); 
        }
        if(isset ($x['dataflow'])){
           $this->setDataflow($x['dataflow']); 
        }
        if(isset ($x['kasbank'])){
           $this->setKasbank($x['kasbank']); 
        }
        if(isset ($x['chequegiro_status'])){
           $this->setChequegirostatus($x['chequegiro_status']); 
        }
        if(isset ($x['posting_date'])){
           $this->setPostingdate($x['posting_date']); 
        }
        if(isset ($x['kasbank_date'])){
           $this->setKasbankdate($x['kasbank_date']); 
        }
        if(isset ($x['chequegiro_date'])){
           $this->setChequegirodate($x['chequegiro_date']); 
        }
        if(isset ($x['accept_date'])){
           $this->setAcceptdate($x['accept_date']); 
        }
        if(isset ($x['chequegiro_payment_date'])){
           $this->setChequegiropaymentdate($x['chequegiro_payment_date']); 
        }
        if(isset ($x['chequegiro_receive_date'])){
           $this->setChequegiroreceivedate($x['chequegiro_receive_date']); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['amountc'])){
           $this->setAmountc($x['amountc']); 
        }
        if(isset ($x['sum_total_detail'])){
           $this->setSumtotaldetail($x['sum_total_detail']); 
        }
        if(isset ($x['sum_totalc_detail'])){
           $this->setSumtotalcdetail($x['sum_totalc_detail']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['for_department'])){
           $this->setFordepartment($x['for_department']); 
        }
        if(isset ($x['voucherID'])){
           $this->setVoucherID($x['voucherID']); 
        }
 
        if(isset ($x['customer_name'])){
           $this->setCustomername($x['customer_name']); 
        }
        if(isset ($x['addon'])){
           $this->setAddOn($x['addon']); 
        }
        if(isset ($x['addby'])){
           $this->setAddby($x['addby']); 
        }
        if(isset ($x['modiby'])){
           $this->setModiby($x['modiby']); 
        }
        if(isset ($x['modion'])){
           $this->setModion($x['modion']); 
        }
        if(isset ($x['receipt_no'])){
           $this->setReceiptno($x['receipt_no']); 
        }
        if(isset ($x['is_posting'])){
           $this->setIsposting($x['is_posting']); 
        }
        if(isset ($x['is_realized'])){
           $this->setIsrealized($x['is_realized']); 
        }
        if(isset ($x['status'])){
           $this->setStatus($x['status']); 
        }
 
        if(isset ($x['payment_date'])){
           $this->setPaymentdate($x['payment_date']); 
        }
        if(isset ($x['kwitansi_date'])){
           $this->setKwitansiDate($x['kwitansi_date']); 
        }
        if(isset ($x['bank_name'])){
           $this->setBankName($x['bank_name']); 
        }
        if(isset ($x['paymentflag_id'])){
           $this->setPaymentflag_id($x['paymentflag_id']); 
        }
        if(isset ($x['debit_total'])){
           $this->setDebittotal($x['debit_total']); 
        }
        if(isset ($x['credit_total'])){
           $this->setCredittotal($x['credit_total']); 
        }
        if(isset ($x['journalID'])){
           $this->setJournalID($x['journalID']); 
        }
        if(isset ($x['jid'])){
           $this->setJid($x['jid']); 
        }
        if(isset ($x['journal_date'])){
           $this->setJournaldate($x['journal_date']); 
        }
        if(isset ($x['refferal_id'])){
           $this->setRefferalId($x['refferal_id']); 
        }
        if(isset ($x['is_memorialcashflow'])){
           $this->setIsMemorialcashflow($x['is_memorialcashflow']); 
        }
        if(isset ($x['is_directsave'])){
           $this->setIsDirectsave($x['is_directsave']); 
        }
        if(isset($x['invoice_no'])){
            $this->setInvoiceNo($x['invoice_no']);
        }
        if(isset($x['is_fromkasir'])){
            $this->setIsFromKasir($x['is_fromkasir']);
        }
        if(isset($x['jumlah_sub_detail'])){
            $this->setJumlahSubDetail($x['jumlah_sub_detail']);
        }
        if(isset($x['kasbank_id'])){
            $this->setKasbankId($x['kasbank_id']);
        }
        if(isset($x['journal_type'])){
            $this->setJournalType($x['journal_type']);
        }
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "journal_id"=>$this->getId(),     
            "journal_voucher_no"=>$this->getJurnalvoucherno(),     
            "accept_date"=>$this->getAcceptdate(),     
            "made_by"=>$this->getMadeby(),     
            "voucher_no"=>$this->getVoucherno(),  
            "journal_no"=>$this->getJurnalno(),     
            "chequegiro_no"=>$this->getChequegirono(),     
            "dataflow"=>$this->getDataflow(),     
            "kasbank"=>$this->getKasbank(),     
            "chequegiro_status"=>$this->getChequegirostatus(),     
            "posting_date"=>$this->getPostingdate(),     
            "kasbank_date"=>  Cashier_Box_Tools::formatDate($this->getKasbankdate(),'Y-m-d'),     
            "chequegiro_date"=>$this->getChequegirodate(),     
            "chequegiro_payment_date"=>$this->getChequegiropaymentdate(),     
            "chequegiro_receive_date"=>$this->getChequegiroreceivedate(),     
            "amount"=>$this->getAmount(),     
            "amountc"=>$this->getAmountc(),  
            "sum_total_detail" =>$this->getSumtotaldetail(),
            "sum_totalc_detail" =>$this->getSumtotalcdetail(),
            "for_department"=>$this->getFordepartment(),     
            "voucherID"=>$this->getVoucherID(),     
            "customer_name"=>$this->getCustomername(),     
            "addon"=>$this->getAddOn(),   
            "addby"=>$this->getAddby(),  
            "modiby"=>$this->getModiby(),  
            "modion"=>$this->getModion(),     
            "payment_date"=>$this->getPaymentdate(),     
            "kwitansi_date"=>$this->getKwitansiDate(),     
            "bank_name"=>$this->getBankName(),     
            "paymentflag_id"=>$this->getPaymentflag_id(),     
            "receipt_no"=>$this->getReceiptno(),     
            "is_posting"=>$this->getIsposting(),     
            "is_realized"=>$this->getIsrealized(),     
            "status"=>$this->getStatus(),     
            "description"=>utf8_encode($this->getDescription()), //to clean encoding
            "debit_total"=>$this->getDebittotal(),
            "credit_total"=>$this->getCredittotal(),        
            "jid"=>$this->getJournalID(),
            "journalID"=>$this->getJournalID(),      
            "journal_date"=>$this->getJournaldate(),
            "refferal_id"=>$this->getRefferalId(),
            "is_memorialcashflow"=>$this->getIsMemorialcashflow(),
            "is_directsave"=>$this->getIsDirectsave(),
            "invoice_no"=>$this->getInvoiceNo(),      
            "is_fromkasir"=>$this->getIsFromKasir(),      
            "jumlah_sub_detail"=>$this->getJumlahSubDetail(),      
            "kasbank_id"=>$this->getKasbankId(),
            "journal_type"=>$this->getJournalType()      
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
        return array($this->getProject(),$this->getPt(),$this->getPayment(),$this->getCheque());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon",'posting_date','chequegiro_date','accept_date','chequegiro_payment_date','chequegiro_receive_date','chequegiro_reject_date','chequegiro_release_date','journal_voucher_date'));
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

    /**
     * @return mixed
     */
    public function getJurnalno()
    {
        return $this->jurnalno;
    }

    /**
     * @param mixed $jurnalno
     *
     * @return self
     */
    public function setJurnalno($jurnalno)
    {
        $this->jurnalno = $jurnalno;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAmountc()
    {
        return $this->amountc;
    }

    /**
     * @param mixed $amountc
     *
     * @return self
     */
    public function setAmountc($amountc)
    {
        $this->amountc = $amountc;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSumtotaldetail()
    {
        return $this->sumtotaldetail;
    }

    /**
     * @param mixed $sumtotaldetail
     *
     * @return self
     */
    public function setSumtotaldetail($sumtotaldetail)
    {
        $this->sumtotaldetail = $sumtotaldetail;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSumtotalcdetail()
    {
        return $this->sumtotalcdetail;
    }

    /**
     * @param mixed $sumtotalcdetail
     *
     * @return self
     */
    public function setSumtotalcdetail($sumtotalcdetail)
    {
        $this->sumtotalcdetail = $sumtotalcdetail;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDebittotal()
    {
        return $this->debittotal;
    }

    /**
     * @param mixed $debittotal
     *
     * @return self
     */
    public function setDebittotal($debittotal)
    {
        $this->debittotal = $debittotal;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCredittotal()
    {
        return $this->credittotal;
    }

    /**
     * @param mixed $credittotal
     *
     * @return self
     */
    public function setCredittotal($credittotal)
    {
        $this->credittotal = $credittotal;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getJid()
    {
        return $this->jid;
    }

    /**
     * @return mixed
     */
    public function getJournalID()
    {
        return $this->journalID;
    }

    /**
     * @param mixed $journalID
     *
     * @return self
     */
    public function setJournalID($journalID)
    {
        $this->journalID = $journalID;

        return $this;
    }

    /**
     * @param mixed $jid
     *
     * @return self
     */
    public function setJid($jid)
    {
        $this->jid = $jid;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getJournaldate()
    {
        return $this->journaldate;
    }

    /**
     * @param mixed $journaldate
     *
     * @return self
     */
    public function setJournaldate($journaldate)
    {
        $this->journaldate = $journaldate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getRefferalId()
    {
        return $this->refferalId;
    }

    /**
     * @param mixed $refferalId
     *
     * @return self
     */
    public function setRefferalId($refferalId)
    {
        $this->refferalId = $refferalId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsMemorialcashflow()
    {
        return $this->is_memorialcashflow;
    }

    /**
     * @param mixed $is_memorialcashflow
     *
     * @return self
     */
    public function setIsMemorialcashflow($is_memorialcashflow)
    {
        $this->is_memorialcashflow = $is_memorialcashflow;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsDirectsave()
    {
        return $this->is_directsave;
    }

    /**
     * @param mixed $is_directsave
     *
     * @return self
     */
    public function setIsDirectsave($is_directsave)
    {
        $this->is_directsave = $is_directsave;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getModion()
    {
        return $this->modion;
    }

    /**
     * @param mixed $modion
     *
     * @return self
     */
    public function setModion($modion)
    {
        $this->modion = $modion;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getModiby()
    {
        return $this->modiby;
    }

    /**
     * @param mixed $modiby
     *
     * @return self
     */
    public function setModiby($modiby)
    {
        $this->modiby = $modiby;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAddby()
    {
        return $this->addby;
    }

    /**
     * @param mixed $addby
     *
     * @return self
     */
    public function setAddby($addby)
    {
        $this->addby = $addby;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getJumlahSubDetail()
    {
        return $this->jumlah_sub_detail;
    }

    /**
     * @param mixed $jumlah_sub_detail
     *
     * @return self
     */
    public function setJumlahSubDetail($jumlah_sub_detail)
    {
        $this->jumlah_sub_detail = $jumlah_sub_detail;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getJournalType()
    {
        return $this->journal_type;
    }

    /**
     * @param mixed $journal_type
     *
     * @return self
     */
    public function setJournalType($journal_type)
    {
        $this->journal_type = $journal_type;

        return $this;
    }
}

?>
