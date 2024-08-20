<?php

/**
 * Description of PaymentDestroyer
 *
 * @author MIS
 */
class Erems_Models_Payment_PaymentDestroyer {

    private $payment;
    private $detail;
    private $schedule;
    private $dao;
    private $isPaymentSchedule;
    private $status;
    private $msg;

    public function __construct() {
        $this->detail = array();
        $this->schedule = array();
        $this->dao = new Erems_Models_Payment_Dao();
        $this->status = FALSE;
    }

    public function run() {
        if ($this->getPayment()->getId() == 0) {
            throw new Exception("Please input payment id");
        }

        

        /// get list detail = 
        $dao = new Erems_Models_Payment_Dao();
        $listDetail = $dao->getPaymentDetail($this->getPayment());
      
        $allDetail = array();
        $totalPayment = 0;
        if ($listDetail[1]) {
            foreach ($listDetail[1] as $row) {
                $detail = new Erems_Models_Payment_Detail();
                $detail->setArrayTable($row);
                $allDetail[] = $detail;
                $totalPayment +=$detail->getPayment();
            }
        }
        $isdraft = $dao->getCheckisDraft($this->getPayment()->getId());
        if($isdraft[0][0]['is_draft'] == 1){
            $listSchedule = $dao->getDetailDraft($this->getPayment());
        } else {
            $listSchedule = $dao->getDetail($this->getPayment());
        }
        
        $allSch = array();
        if ($listSchedule[1]) {
            foreach ($listSchedule[1] as $row) {
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setArrayTable($row);
                $allSch[] = $sch;
            }
        }
        
       
     
        
        

        /* make sure jumlah tagihan dan pembayaran sama */
        if (count($allSch) == count($allDetail)) {
            $count = 0;
            foreach ($allSch as $sch) {
                foreach ($allDetail as $payDetail) {
                    if ($payDetail->getSchedule()->getId() == $sch->getId()) {
                      
                        $rb = $sch->getRemainingBalance() + $payDetail->getPayment();
                        if($count==count($allDetail)-1){ // untuk tagihan terakhir yang mengalami credit / debit note
                            // jika credit debit note = credit maka tambahkan remaining balance dengan nilai cdn
                            if($this->payment->getCdn()==Erems_Box_Config::CDN_CREDIT){
                                $rb = $rb+doubleval($this->payment->getCdnValue());
                            }
                            
                          
                        }
                        $sch->setRemainingBalance($rb);
                        $count++;
                    }
                    
                }
            }
            $this->status = TRUE;
        }else{
            $this->msg =  "tidak sama ".count($allSch)."..".count($allDetail);
        }

        $this->schedule = $allSch;
        $this->detail = $allDetail;

    }

    public function getDecanStringPaymentDetail() {
        $hasil = FALSE;
        if ($this->detail) {
            $payment = new Erems_Models_Payment_Payment();
            foreach($this->detail as $pd){
                $payment->addDetail($pd);
            }
            $de = new Erems_Box_Delien_DelimiterEnhancer();
          
            $de->setDelimiterCandidate($payment);
            $de->generate();
            
           $hasil = $payment->getDCResult();
        }
        return $hasil;
    }
    
    public function getDecanStringSch() {
        $hasil = FALSE;
        if ($this->schedule) {
            $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
            foreach($this->schedule as $sch){
                $purchaseletter->addSchedule($sch);
            }
            $de = new Erems_Box_Delien_DelimiterEnhancer();
          
            $de->setDelimiterCandidate($purchaseletter);
            $de->generate();
            
            $hasil = $purchaseletter->getDCResult();
        }
        return $hasil;
    }

    public static function isPaymentSchedule(Erems_Models_Payment_Payment $payment) {
        $hasil = FALSE;
        $dao = new Erems_Models_Payment_Dao();
        $isdraft = $dao->getCheckisDraft($payment->getId());
        if($isdraft[0][0]['is_draft'] == 1) {
            $hasilDao = $dao->getOneDraft($payment);
        }else {
            $hasilDao = $dao->getOne($payment);
        }
        
        $payment->setArrayTable($hasilDao[1][0]);
        if ($payment->getFlag() == Erems_Box_Config::PAYMENTFLAG_SCHEDULE) {
            $hasil = TRUE;
        }
        return $hasil;
    }

    public function getPayment() {
        if (!$this->payment) {
            $this->payment = new Erems_Models_Payment_Payment();
        }
        return $this->payment;
    }

    public function setPayment(Erems_Models_Payment_Payment $payment) {
        $this->payment = $payment;
    }

    public function getDetail() {
        return $this->detail;
    }

    public function setDetail($detail) {
        $this->detail = $detail;
    }

    public function getSchedule() {
        return $this->schedule;
    }

    public function setSchedule($schedule) {
        $this->schedule = $schedule;
    }
    
    public function getStatus(){
        return $this->status;
    }

}

?>
