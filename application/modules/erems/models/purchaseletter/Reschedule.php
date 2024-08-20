<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Reschedule
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_Reschedule extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Delien_DelimiterCandidate {
    private $purchaseletter;
    private $reason;
    private $rencanaSerahTerimaDate;
    private $rencanaSerahTerimaMonth;
    private $isApprove;
    private $approveDate;
    private $DCResult;
    private $scheduleList;
    private $isUsedVerification;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'reschedule_';
        $this->scheduleList = array();
    }
    
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['reschedule_id'])){
          $this->setId($x['reschedule_id']);
        }
        if(isset ($x['purchaseletter_purchaseletter_id'])){
          $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']);
        }
        if(isset ($x['reason'])){
          $this->setReason($x['reason']);
        }
        if(isset ($x['is_approve'])){
          $this->setIsApprove($x['is_approve']);
        }
        if(isset ($x['approve_date'])){
          $this->setApproveDate($x['approve_date']);
        }
        if(isset ($x['rencanaserahterima_date'])){
          $this->setRencanaSerahTerimaDate($x['rencanaserahterima_date']);
        }
        if(isset ($x['rencanaserahterima_month'])){
          $this->setRencanaSerahTerimaMonth($x['rencanaserahterima_month']);
        }
        if(isset ($x['Addon'])){
          $this->setAddOn($x['Addon']);
        }
        
        if(isset ($x['is_used_verification'])){
          $this->setIsUsedVerification($x['is_used_verification']);
        }
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'reschedule_id'=>$this->getId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'reason'=>$this->getReason(),
            'is_approve'=>$this->getIsApprove(),
            'approve_date'=>$this->getApproveDate(),
            'rencanaserahterima_date'=>$this->getRencanaSerahTerimaDate(),
            'rencanaserahterima_month'=>$this->getRencanaSerahTerimaMonth(),
            'Addon'=>$this->getAddOn(),
            'is_used_verification' =>$this->getIsUsedVerification()
        );
        return $x;
    }
    
    public function addSchedule(Erems_Models_Purchaseletter_Schedule $schedule){
        $this->scheduleList[] = $schedule;
    }
    
    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function getReason() {
        return $this->reason;
    }

    public function setReason($reason) {
        $this->reason = $reason;
    }

    public function getIsApprove() {
        return $this->isApprove;
    }

    public function setIsApprove($isApprove) {
        $this->isApprove = (boolean)$isApprove;
    }

    public function getApproveDate() {
        return $this->approveDate;
    }

    public function setApproveDate($approveDate) {
        $this->approveDate = $approveDate;
    }
    
    

        
    public function getRencanaSerahTerimaDate() {
        return $this->rencanaSerahTerimaDate;
    }

    public function setRencanaSerahTerimaDate($rencanaSerahTerimaDate) {
        $this->rencanaSerahTerimaDate = $rencanaSerahTerimaDate;
    }

    public function getRencanaSerahTerimaMonth() {
        return $this->rencanaSerahTerimaMonth;
    }

    public function setRencanaSerahTerimaMonth($rencanaSerahTerimaMonth) {
        $this->rencanaSerahTerimaMonth = $rencanaSerahTerimaMonth;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPurchaseletter());
    }
    
    public function getDatefields() {
        return array('approve_date','Addon');
    }

    public function getDCArray() {
        return $this->scheduleList;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    function getIsUsedVerification() {
        return $this->isUsedVerification;
    }

    function setIsUsedVerification($isUsedVerification) {
        $this->isUsedVerification = $isUsedVerification;
    }
//put your code here
}

?>
