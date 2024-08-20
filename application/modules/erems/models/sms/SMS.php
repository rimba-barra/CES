<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SMS
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Sms_SMS extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $purchaseletter;
    private $customer;
    private $phoneNumber;
    private $SMSCategory;
    private $flagType;
    private $processDate;
    private $collectorId;
    private $notes;
    private $returnCode;
    private $status;
    private $readstatus;
    private $amount;
    private $duedate;
    // added by rico 07092021
    private $sent_date;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "sms_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['sms_id'])){
           $this->setId($x['sms_id']); 
        }
        if(isset ($x['purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_id']); 
        }
        if(isset ($x['customer_customer_id'])){
           $this->getCustomer()->setId($x['customer_customer_id']); 
        }
        if(isset ($x['sms_phonenumber'])){
           $this->setPhoneNumber($x['sms_phonenumber']); 
        }
        if(isset ($x['smscategory_smscategory_id'])){
           $this->getSMSCategory()->setId($x['smscategory_smscategory_id']); 
        }
        if(isset ($x['flag_type'])){
           $this->setFlagType($x['flag_type']); 
        }
        if(isset ($x['process_date'])){
           $this->setProcessDate($x['process_date']); 
        }
        if(isset ($x['collector_id'])){
           $this->setCollectorId($x['collector_id']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['return_code'])){
           $this->setReturnCode($x['return_code']); 
        }
        if(isset ($x['status'])){
           $this->setStatus($x['status']); 
        }
        if(isset ($x['readstatus'])){
           $this->setReadstatus($x['readstatus']); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['duedate'])){
           $this->setDuedate($x['duedate']); 
        }
        if(isset ($x['sent_date'])){
           $this->setSentdate($x['sent_date']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'sms_id'=>$this->getId(),
            'purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'customer_customer_id'=>$this->getCustomer()->getId(),
            'sms_phonenumber'=>$this->getPhoneNumber(),
            'smscategory_smscategory_id'=>$this->getSMSCategory()->getId(),
            'flag_type'=>$this->getFlagType(),
            'smscategory_smscategory_id'=>$this->getSMSCategory()->getId(),
            'process_date'=>$this->getProcessDate(),
            'collector_id'=>$this->getCollectorId(),
            'notes'=>$this->getNotes(),
            'return_code'=>$this->getReturnCode(),
            'status'=>$this->getStatus(),
            'readstatus'=>$this->getReadstatus($this->getStatus()),
            'duedate'=>$this->getDuedate(),
            'sent_date'=>$this->getSentdate(),
            'amount'=>$this->getAmount()
        );
        
        return $x;
    }
    
    

    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function getCustomer() {
        if(!$this->customer){
            $this->customer = new Erems_Models_Master_Customer();
        }
        return $this->customer;
    }

    public function getPhoneNumber() {
        return $this->phoneNumber;
    }

    public function getSMSCategory() {
        if(!$this->SMSCategory){
            $this->SMSCategory = new Erems_Models_Sms_SMSCategory();
        }
        return $this->SMSCategory;
    }

    public function getFlagType() {
        return $this->flagType;
    }

    public function getProcessDate() {
        return $this->processDate;
    }

    public function getCollectorId() {
        return $this->collectorId;
    }

    public function getNotes() {
        return $this->notes;
    }

    

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setCustomer(Erems_Models_Master_Customer $customer) {
        $this->customer = $customer;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

    public function setSMSCategory(Erems_Models_Sms_SMSCategory $SMSCategory) {
        $this->SMSCategory = $SMSCategory;
    }

    public function setFlagType($flagType) {
        $this->flagType = $flagType;
    }

    public function setProcessDate($processDate) {
        $this->processDate = $processDate;
    }

    public function setCollectorId($collectorId) {
        $this->collectorId = $collectorId;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    

    public function getDatefields() {
        return array("process_date");
    }

    public function getReturnCode()
    {
        return $this->returnCode;
    }

    public function setReturnCode($returnCode)
    {
        $this->returnCode = $returnCode;

        return $this;
    }

    public function getStatus()
    {

        $smsApi = new Erems_Models_Sms_SMSApi();
        if($this->returnCode==""){
            $status = $this->returnCode;
        }else{
            if($this->status!==22){
                $status = $smsApi->getReturn($this->returnCode);
                if($status==22){
                    $dao = new Erems_Models_Sms_Dao();
                    $params = array('status'=>22, 'sms_id'=>$this->getId());
                    $hasil = $dao->saveSmsStatus($params);
                    //print_r($params);die();
                }
            }else{
                $status = $this->status;
            }
        }
        
        return $status;
    }

    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    public function getReadstatus($status)
    {
        $smsApi = new Erems_Models_Sms_SMSApi();
        $readstatus = $smsApi->getReadStatus($status);
        return $readstatus;
    }

    public function setReadstatus($readstatus)
    {
        $this->readstatus = $readstatus;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDuedate()
    {
        return $this->duedate;
    }

    /**
     * @param mixed $duedate
     *
     * @return self
     */
    public function setDuedate($duedate)
    {
        $this->duedate = $duedate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param mixed $amount
     *
     * @return self
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSentdate()
    {
        return $this->sent_date;
    }

    /**
     * @param mixed $amount
     *
     * @return self
     */
    public function setSentdate($sent_date)
    {
        $this->sent_date = $sent_date;

        return $this;
    }

}
