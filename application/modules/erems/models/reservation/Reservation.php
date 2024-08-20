<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Reservation
 *
 * @author DAVID-MIS
 */
class Erems_Models_Reservation_Reservation extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    
    private $project;
    private $pt;
    private $date;
    private $unitId;
    private $unitNumber;
    private $blockCode;
    private $cluster;
    private $productcategory;
    private $reservationNo;
    private $reservationDate;
    private $reservationDateUntil;
    private $reservationDays;
    private $customerName;
    private $salesName;
    private $notes;
    private $submitBy;
    private $approveBy;
    private $rejectBy;
    private $isApprove;
    private $isReject;
    private $approveDate;
    private $rejectDate;
    private $approvemode;
    private $status;
    private $progress;
    private $email;
    private $paymentMethod;
    private $bookingFee;
    private $mediaPromotion;
    private $customerPhone;
    private $scheduleType;
    private $priceType;
    private $uangTitipan;
    private $customerAddress;

    private $salesmanId; // added by rico 14022023

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "reservation_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['reservation_id'])){
           $this->setId($x['reservation_id']); 
        }
        if(isset ($x['unit_id'])){
           $this->setUnitId($x['unit_id']); 
        }
        if(isset ($x['unit_number'])){
           $this->setUnitNumber($x['unit_number']); 
        }
        if(isset ($x['cluster'])){
           $this->setCluster($x['cluster']); 
        }
        if(isset ($x['block_code'])){
           $this->setBlockCode($x['block_code']); 
        }
        if(isset ($x['reservation_date'])){
           $this->setReservationDate($x['reservation_date']); 
        }
        if(isset ($x['reservation_days'])){
           $this->setReservationDays($x['reservation_days']); 
        }
        if(isset ($x['reservation_date_until'])){
           $this->setReservationDateUntil($x['reservation_date_until']); 
        }
        if(isset ($x['customer_name'])){
           $this->setCustomerName($x['customer_name']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['submit_by'])){
           $this->setSubmitBy($x['submit_by']); 
        }
        if(isset ($x['approved_by'])){
           $this->setApproveBy($x['approved_by']); 
        }
        if(isset ($x['is_reject'])){
           $this->setIsReject($x['is_reject']); 
        }
        if(isset ($x['reject_by'])){
           $this->setrejectBy($x['reject_by']); 
        }
        if(isset ($x['is_approve'])){
           $this->setIsApprove($x['is_approve']); 
        }
        if(isset ($x['reservation_no'])){
           $this->setReservationNo($x['reservation_no']); 
        }
        if(isset ($x['approve_date'])){
           $this->setApproveDate($x['approve_date']); 
        }
        if(isset ($x['reject_date'])){
           $this->setRejectDate($x['reject_date']); 
        }
        if(isset ($x['approvemode'])){
           $this->setApprovemode($x['approvemode']); 
        }
        if(isset ($x['sales_name'])){
           $this->setSalesName($x['sales_name']); 
        }
        if(isset ($x['status'])){
            $this->setStatus($x['status']); 
        }
        if(isset ($x['progress'])){
        $this->setProgress($x['progress']); 
        }
        if(isset ($x['productcategory'])){
           $this->setProductcategory($x['productcategory']); 
        }
        if(isset ($x['customer_email'])){
           $this->setEmail($x['customer_email']); 
        }
        if(isset ($x['customer_phone'])){
           $this->setCustomerPhone($x['customer_phone']); 
        }
        if(isset ($x['booking_fee'])){
           $this->setBookingFee($x['booking_fee']); 
        }
        if(isset ($x['mediapromotion_id'])){
           $this->setMediaPromotion($x['mediapromotion_id']); 
        }
        if(isset ($x['paymentmethod'])){
           $this->setPaymentMethod($x['paymentmethod']); 
        }
        if(isset ($x['scheduletype'])){
           $this->setScheduleType($x['scheduletype']); 
        }
        if(isset ($x['pricetype_id'])){
           $this->setPriceType($x['pricetype_id']); 
        }
        if(isset ($x['customer_address'])){
           $this->setCustomerAddress($x['customer_address']); 
        }
        if(isset ($x['uang_titipan'])){
           $this->setUangTitipan($x['uang_titipan']); 
        }
        // added by rico 14022023
        if(isset ($x['salesman_id'])){
           $this->setSalesmanId($x['salesman_id']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'reservation_id'=>$this->getId(),
            'unit_id'=>$this->getUnitId(),
            'unit_number'=>$this->getUnitNumber(),
            'cluster'=>$this->getCluster(),
            'block_code'=>$this->getBlockCode(),
            'reservation_no'=>$this->getReservationNo(),
            'reservation_date'=>$this->getReservationDate(),
            'reservation_date_until'=>$this->getReservationDateUntil(),
            'reservation_days'=>$this->getReservationDays(),
            'customer_name'=>$this->getCustomerName(),
            'notes'=>$this->getNotes(),
            'submit_by'=>$this->getSubmitBy(),
            'approved_by'=>$this->getApproveBy(),
            'is_approve'=>$this->getIsApprove(),
            'reject_by'=>$this->getrejectBy(),
            'is_reject'=>$this->getisReject(),
            'approve_date'=>$this->getApproveDate(),
            'reject_date'=>$this->getRejectDate(),
            'approvemode'=>$this->getApprovemode(),
            'sales_name'=>$this->getSalesName(),
            'status'=>$this->getStatus(),
            'progress'=>$this->getProgress(),
            'productcategory'=>$this->getProductcategory(),
            'customer_email'=>$this->getEmail(),
            'paymentmethod'=>$this->getPaymentMethod(),
            'booking_fee'=>$this->getBookingFee(),
            'mediapromotion_id'=>$this->getMediaPromotion(),
            'customer_phone'=>$this->getCustomerPhone(),
            'scheduletype'=>$this->getScheduleType(),
            'pricetype_id'=>$this->getPriceType(),
            'customer_address'=>$this->getCustomerAddress(),
            'uang_titipan'=>round($this->getUangTitipan()),

            'salesman_id'=>$this->getSalesmanId(), // added by rico 14022023
        );
        
        return $x;
    }
    
     

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new \Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new \Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function grouped() {
        return array();
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getNotes() {
        return $this->notes;
    }

    public function getSubmitBy() {
        return $this->submitBy;
    }

    public function getApproveBy() {
        return $this->approveBy;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }

    public function setSubmitBy($submitBy) {
        $this->submitBy = $submitBy;
    }

    public function setApproveBy($approveBy) {
        $this->approveBy = $approveBy;
    }
    
    public function getIsApprove() {
        return $this->isApprove;
    }

    public function setIsApprove($isApprove) {
        $this->isApprove = $isApprove;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }
    
    protected function getDatefields() {
        return array("reservation_date");
    }


    /**
     * @return mixed
     */
    public function getUnitId()
    {
        return $this->unitId;
    }

    /**
     * @param mixed $unitId
     *
     * @return self
     */
    public function setUnitId($unitId)
    {
        $this->unitId = $unitId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getReservationDate()
    {
        return $this->reservationDate;
    }

    /**
     * @param mixed $reservationDate
     *
     * @return self
     */
    public function setReservationDate($reservationDate)
    {
        $this->reservationDate = $reservationDate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getReservationDateUntil()
    {
        return $this->reservationDateUntil;
    }

    /**
     * @param mixed $reservationDateUntil
     *
     * @return self
     */
    public function setReservationDateUntil($reservationDateUntil)
    {
        $this->reservationDateUntil = $reservationDateUntil;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getReservationDays()
    {
        return $this->reservationDays;
    }

    /**
     * @param mixed $reservationDays
     *
     * @return self
     */
    public function setReservationDays($reservationDays)
    {
        $this->reservationDays = $reservationDays;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerName()
    {
        return $this->customerName;
    }

    /**
     * @param mixed $customerName
     *
     * @return self
     */
    public function setCustomerName($customerName)
    {
        $this->customerName = $customerName;

        return $this;
    }


    /**
     * @return mixed
     */
    public function getIsReject()
    {
        return $this->isReject;
    }

    /**
     * @param mixed $isReject
     *
     * @return self
     */
    public function setIsReject($isReject)
    {
        $this->isReject = $isReject;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getRejectBy()
    {
        return $this->rejectBy;
    }

    /**
     * @param mixed $rejectBy
     *
     * @return self
     */
    public function setRejectBy($rejectBy)
    {
        $this->rejectBy = $rejectBy;

        return $this;
    }




    /**
     * @return mixed
     */
    public function getReservationNo()
    {
        return $this->reservationNo;
    }

    /**
     * @param mixed $reservationNo
     *
     * @return self
     */
    public function setReservationNo($reservationNo)
    {
        $this->reservationNo = $reservationNo;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getUnitNumber()
    {
        return $this->unitNumber;
    }

    /**
     * @param mixed $unitNumber
     *
     * @return self
     */
    public function setUnitNumber($unitNumber)
    {
        $this->unitNumber = $unitNumber;

        return $this;
    }



    /**
     * @return mixed
     */
    public function getCluster()
    {
        return $this->cluster;
    }

    /**
     * @param mixed $cluster
     *
     * @return self
     */
    public function setCluster($cluster)
    {
        $this->cluster = $cluster;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getBlockCode()
    {
        return $this->blockCode;
    }

    /**
     * @param mixed $blockCode
     *
     * @return self
     */
    public function setBlockCode($blockCode)
    {
        $this->blockCode = $blockCode;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getApproveDate()
    {
        return $this->approveDate;
    }

    /**
     * @param mixed $approveDate
     *
     * @return self
     */
    public function setApproveDate($approveDate)
    {
        $this->approveDate = $approveDate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getRejectDate()
    {
        return $this->rejectDate;
    }

    /**
     * @param mixed $rejectDate
     *
     * @return self
     */
    public function setRejectDate($rejectDate)
    {
        $this->rejectDate = $rejectDate;

        return $this;
    }



    /**
     * @return mixed
     */
    public function getSalesName()
    {
        return $this->salesName;
    }

    /**
     * @param mixed $salesName
     *
     * @return self
     */
    public function setSalesName($salesName)
    {
        $this->salesName = $salesName;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getApprovemode()
    {
        return $this->approvemode;
    }

    /**
     * @param mixed $approvemode
     *
     * @return self
     */
    public function setApprovemode($approvemode)
    {
        $this->approvemode = $approvemode;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     *
     * @return self
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getProgress()
    {
        return $this->progress;
    }

    /**
     * @param mixed $progress
     *
     * @return self
     */
    public function setProgress($progress)
    {
        $this->progress = $progress;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getProductcategory()
    {
        return $this->productcategory;
    }

    /**
     * @param mixed $productcategory
     *
     * @return self
     */
    public function setProductcategory($productcategory)
    {
        $this->productcategory = $productcategory;

        return $this;
    }




    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     *
     * @return self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPaymentMethod()
    {
        return $this->paymentMethod;
    }

    /**
     * @param mixed $paymentMethod
     *
     * @return self
     */
    public function setPaymentMethod($paymentMethod)
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getBookingFee()
    {
        return $this->bookingFee;
    }

    /**
     * @param mixed $bookingFee
     *
     * @return self
     */
    public function setBookingFee($bookingFee)
    {
        $this->bookingFee = $bookingFee;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getMediaPromotion()
    {
        return $this->mediaPromotion;
    }

    /**
     * @param mixed $mediaPromotion
     *
     * @return self
     */
    public function setMediaPromotion($mediaPromotion)
    {
        $this->mediaPromotion = $mediaPromotion;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerPhone()
    {
        return $this->customerPhone;
    }

    /**
     * @param mixed $customerPhone
     *
     * @return self
     */
    public function setCustomerPhone($customerPhone)
    {
        $this->customerPhone = $customerPhone;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getScheduleType()
    {
        return $this->scheduleType;
    }

    /**
     * @param mixed $scheduleType
     *
     * @return self
     */
    public function setScheduleType($scheduleType)
    {
        $this->scheduleType = $scheduleType;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerAddress()
    {
        return $this->customerAddress;
    }

    /**
     * @param mixed $customerAddress
     *
     * @return self
     */
    public function setCustomerAddress($customerAddress)
    {
        $this->customerAddress = $customerAddress;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getUangTitipan()
    {
        return $this->uangTitipan;
    }

    /**
     * @param mixed $uangTitipan
     *
     * @return self
     */
    public function setUangTitipan($uangTitipan)
    {
        $this->uangTitipan = $uangTitipan;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPriceType()
    {
        return $this->priceType;
    }

    /**
     * @param mixed $priceType
     *
     * @return self
     */
    public function setPriceType($priceType)
    {
        $this->priceType = $priceType;

        return $this;
    }

    public function getSalesmanId(){
        return $this->salesmanId;
    }

    public function setSalesmanId($salesmanId){
        $this->salesmanId = $salesmanId;

        return $this;
    }
}
