<?php

/**
 * Description of PencairanKPR
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Admincollection_PencairanKPR extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $purchaseletter;
    private $payment;
    private $schedule;
    private $escrowDate;
    private $pencairanDate;
    private $pencairanAmount;
    private $persenPencairan;
    private $persenProgress;
    private $plafon;
    private $keterangan;
    private $duedateEscrow;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "pencairankpr_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
		
        if(isset ($x['purchaseletter_pencairankpr_id'])){
           $this->setId($x['purchaseletter_pencairankpr_id']); 
        }
        
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        
        if(isset ($x['payment_payment_id'])){
           $this->getPayment()->setId($x['payment_payment_id']); 
        }
        if(isset ($x['schedule_schedule_id'])){
           $this->getSchedule()->setId($x['schedule_schedule_id']); 
        }
        if(isset ($x['escrow_date'])){
           $this->setEscrowDate($x['escrow_date']); 
        }
        if(isset ($x['duedate_escrow'])){
           $this->setDuedateEscrow($x['duedate_escrow']); 
        }
        if(isset ($x['pencairan_date'])){
           $this->setPencairanDate($x['pencairan_date']); 
        }
        if(isset ($x['persen_pencairan'])){
           $this->setPersenPencairan($x['persen_pencairan']); 
        }
        if(isset ($x['persen_progress'])){
           $this->setPersenProgress($x['persen_progress']); 
        }
        if(isset ($x['plafon_id'])){
           $this->setPlafon($x['plafon_id']); 
        }
        if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }
       
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'purchaseletter_pencairankpr_id'=>$this->getId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'payment_payment_id'=>$this->getPayment()->getId(),
            'schedule_schedule_id'=>$this->getSchedule()->getId(),
            'escrow_date'=>$this->getEscrowDate(),
            'duedate_escrow'=>$this->getDuedateEscrow(),
            'pencairan_date'=>$this->getPencairanDate(),
            'persen_pencairan'=>$this->getPersenPencairan(),
            'persen_progress'=>$this->getPersenProgress(),
            'plafon_id'=>$this->getPlafon(),
            'keterangan'=>$this->getKeterangan()
            
        );
        
        return $x;
    }
    
    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function getPayment() {
        if(!$this->payment){
            $this->payment = new Erems_Models_Payment_Payment();
        }
        return $this->payment;
    }

    public function getSchedule() {
        if(!$this->schedule){
            $this->schedule = new Erems_Models_Purchaseletter_Schedule();
        }
        return $this->schedule;
    }

    public function getEscrowDate() {
        return $this->escrowDate;
    }
    
    public function getPencairanDate() {
        return $this->pencairanDate;
    }

    public function getPencairanAmount() {
        return $this->pencairanAmount;
    }

    public function getPersenPencairan() {
        return $this->persenPencairan;
    }

    public function getPersenProgress() {
        return $this->persenProgress;
    }

    public function getPlafon() {
        return $this->plafon;
    }

    public function getKeterangan() {
        return $this->keterangan;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setPayment(Erems_Models_Payment_Payment $payment) {
        $this->payment = $payment;
    }

    public function setSchedule(Erems_Models_Purchaseletter_Schedule $schedule) {
        $this->schedule = $schedule;
    }

    public function setEscrowDate($escrowDate) {
        $this->escrowDate = $escrowDate;
    }
    
    public function setPencairanDate($pencairanDate) {
        $this->pencairanDate = $pencairanDate;
    }

    public function setPencairanAmount($pencairanAmount) {
        $this->pencairanAmount = $pencairanAmount;
    }

    public function setPersenPencairan($persenPencairan) {
        $this->persenPencairan = $persenPencairan;
    }

    public function setPersenProgress($persenProgress) {
        $this->persenProgress = $persenProgress;
    }

    public function setPlafon($plafon) {
        $this->plafon = $plafon;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPurchaseletter(),$this->getPayment(),$this->getSchedule());
    }

    public function getDuedateEscrow()
    {
        return $this->duedateEscrow;
    }

    public function setDuedateEscrow($duedateEscrow)
    {
        $this->duedateEscrow = $duedateEscrow;

        return $this;
    }
}
    
