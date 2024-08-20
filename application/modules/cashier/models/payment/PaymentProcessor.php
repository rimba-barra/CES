<?php

/**
 * Description of PaymentProcessor
 *
 * @author MIS
 */
class Cashier_Models_Payment_PaymentProcessor {

    private $purchaseletter;
    private $payment;
    private $paymentDetail;
    private $lastRow;
    private $count;
    private $effectedSch;
    private $scheduleList;
    private $session;
    private $globalParams;
    private $totalDenda;

    public function __construct() {
        $this->purchaseletter = new Cashier_Models_Purchaseletter_PurchaseLetter();
        $this->payment = new Cashier_Models_Payment_Payment();
        $this->paymentDetail = array();
        $this->lastRow = -1;
        $this->effectedSch = array();
        $this->count = -1;
        $this->totalDenda = 0;
    }
    
    public function getTotalDenda(){
        return $this->totalDenda;
    }

    public function run() {
        $scheduleList = $this->getSchedule($this->purchaseletter);
        if (!$scheduleList)
            return FALSE;
        $this->scheduleList = $scheduleList;
        $tempAmount = $this->payment->getAmount();
        $paramsRequestResult = Cashier_Box_Tools::globalParamsExistPayment($this->getSession());
        $this->globalParams = $paramsRequestResult["parameters"];
       
        foreach ($scheduleList as $schedule) {
            $this->calculatePayment($schedule);
        }
        $this->payment->setAmount($tempAmount);
        $this->processTotalPayment();
        $this->processCdn();
    }

    private function processCdn() {


        switch ($this->payment->getCdn()) {
            case 1: // kurang bayar diabaikan
                $this->payment->setCdnValue($this->payment->getDetail($this->lastRow)->getRemainingBalance());

                $this->payment->getDetail($this->lastRow)->setRemainingBalance(0);

                break;
            case 2: // lebih bayar diabaikan
                if (count($this->effectedSch) > 1) { /// berlaku jika schedule yang terbayar lebih dari 1 row
                    /// check di schedulelist
                    foreach ($this->scheduleList as $sch) {
                        if ($sch instanceof Cashier_Models_Purchaseletter_Schedule) {
                            if ($sch->getId() == $this->payment->getDetail($this->lastRow)->getSchedule()->getId()) {
                                $this->payment->setCdnValue($sch->getRemainingBalance() - $this->payment->getDetail($this->lastRow)->getRemainingBalance());
                                $this->payment->getDetail($this->lastRow)->setRemainingBalance($sch->getRemainingBalance());
                                $this->payment->getDetail($this->lastRow)->setPayment($sch->getPayAmount());
                            } else {
                                
                            }
                        }
                    }
                }
                break;
        }
    }

    protected function calculatePayment(Cashier_Models_Purchaseletter_Schedule $sch) {
        $pay = $this->payment->getAmount();
        $oldRb = (double) $sch->getRemainingBalance();
        $rb = (double) $sch->getRemainingBalance();
        $payValue = 0;
        $payTagihan = 0;

        if ($pay > 0) {
            if ($rb > $pay) {


                $rb = $rb - $pay;
                $payValue = $pay;
                $pay = 0;
            } else {

                $payValue = $rb;
                $pay = $pay - $rb;
                $rb = 0;
            }
            
           
            $this->payment->setAmount($pay);
            $denda = $this->hitungDenda($payValue, $sch, $this->payment->getCairDate());
    
            $this->totalDenda += $denda;
            $pDetail = new Cashier_Models_Payment_Detail();
            $pDetail->setAmount(round($sch->getAmount(), 4));
            $pDetail->setRemainingBalance(round($rb,4));
            $pDetail->setPayment(round($payValue,4));
            $pDetail->getSchedule()->setId($sch->getId());
            $pDetail->setDenda(round($denda,4));
            $this->payment->addDetail($pDetail);
            /*
             $pDetail = new Cashier_Models_Payment_Detail();
            $pDetail->setAmount(doubleval($sch->getAmount()));
            $pDetail->setRemainingBalance(doubleval($rb));
            $pDetail->setPayment(doubleval($payValue));
            $pDetail->getSchedule()->setId($sch->getId());
            $pDetail->setDenda($denda);
            $this->payment->addDetail($pDetail);
              
             */
            $this->count++;
            if ($oldRb > 0) {
                $this->effectedSch[] = $sch->getId();
                $this->lastRow = $this->count;
            }
        }


        $sch->setRemainingBalance($oldRb);
        // $sch->setRemainingBalance($rb);
    }

    protected function hitungDenda($payment = NULL, Cashier_Models_Purchaseletter_Schedule $sch, $paymentDate = NULL) {
        // hari keterlambatan = Payment date - due date + 1
        //(Denda_permil / 1000) * nilai payment * hari keterlambatan

        $totalHariTerlambat = 0;
        $tempDate = explode("T", $paymentDate);
        $tempDate2 = explode(" ", $sch->getDueDate());
        $startDate = new DateTime($tempDate2[0]);
        $endDate = new DateTime($tempDate[0]);
       

        $totalHariTerlambat = Cashier_Box_Tools::dateDifference($tempDate2[0], $tempDate[0]);

        $denda = 0;
        if ($endDate > $startDate) {
            $toleransi = (int) $this->globalParams["BATAS_TOLERANSI"];
            if ($totalHariTerlambat > $toleransi) {
                $dendaPermil = (float) $this->globalParams["DENDA_PERMIL"];
                $denda = ($dendaPermil / 1000) * $payment * $totalHariTerlambat;
                $denda = $denda + doubleval($sch->getInterest());
            }
        }
        
        $denda = round($denda, 4);
      
        
        return $denda;
    }

    

    protected function processTotalPayment() {
        $payment = (double) $this->payment->getAmount();
        $adminFee = (double) $this->payment->getAdminFee();
        $total = $payment + $adminFee;
        $this->payment->setTotal($total);
    }

    protected function getSchedule(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        if ($purchaseletter->getId() > 0) {
            $dao = new Cashier_Models_Purchaseletter_PurchaseLetterDao();
            $hasil = $dao->getScheduleById($purchaseletter);
            $listSchedule = array();

            foreach ($hasil[1] as $row) {
                $sch = new Cashier_Models_Purchaseletter_Schedule();


                $sch->setArrayTable($row);
                $sch->setPayAmount($row["payment_payment"]);

                $listSchedule[] = $sch;
            }
            return $listSchedule;
        }
        return FALSE;
    }

    public function getPurchaseletter() {
        return $this->purchaseletter;
    }

    public function setPurchaseletter(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function getPayment() {
        return $this->payment;
    }

    public function setPayment(Cashier_Models_Payment_Payment $payment) {
        $this->payment = $payment;
        $this->purchaseletter = $payment->getPurchaseletter();
    }

    public function getPaymentDetail() {
        return $this->paymentDetail;
    }

    public function getSession() {
        return $this->session;
    }

    public function setSession($session) {
        $this->session = $session;
    }

}

?>
