<?php
/**
 * Description of Schedule
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_Schedule extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried,  Erems_Box_Kouti_Remora {
    private $scheduleTypeId;
    private $purchaseLetterId;
    private $description;
    private $termin;
    private $amount;
    private $remainingBalance;
    private $dueDate;
    private $payAmount;
    private $sourceMoney;
    private $interest;
    private $isPay;
    private $remainingDenda;
    private $sp1No;
    private $sp1Date;
    private $sp1PlanDate;
    private $sp2No;
    private $sp2Date;
    private $sp2PlanDate;
    private $sp3No;
    private $sp3Date;
    private $sp3PlanDate;
    private $sp4No;
    private $sp4Date;
    private $sp4PlanDate;
    private $purchaseletter;
    private $sp1UserDate;
    private $sp2UserDate;
    private $sp3UserDate;
    private $sp4UserDate;
	public $lama_tunggakan;
    private $kpraccdate;
    private $persentasenpv;
    private $ppn;
    private $dpp;
    private $asuransi;
    private $bphtb_bbn_ajb;
    private $biaya_lain_lain;
    private $remaining_dpp;

    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'schedule_';
    }
    
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['schedule_id'])){
          $this->setId($x['schedule_id']);
        }
        if(isset ($x['scheduletype_id'])){
          $this->setScheduleTypeId($x['scheduletype_id']);
        }
        if(isset ($x['purchaseletter_id'])){
          $this->setPurchaseLetterId($x['purchaseletter_id']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
        if(isset ($x['termin'])){
          $this->setTermin($x['termin']);
        }
        if(isset ($x['duedate'])){
          $this->setDueDate($x['duedate']);
        }
        if(isset ($x['amount'])){
          $this->setAmount($x['amount']);
        }
        if(isset ($x['remaining_balance'])){
          $this->setRemainingBalance($x['remaining_balance']);
        }
        if(isset ($x['denda'])){
          $this->setInterest($x['denda']);
        }
        if(isset ($x['sourcemoney_sourcemoney_id'])){
          $this->getSourceMoney()->setId($x['sourcemoney_sourcemoney_id']);
        }
        if(isset ($x['is_pay'])){
          $this->setIsPay($x['is_pay']);
        }
        if(isset ($x['remaining_denda'])){
          $this->setRemainingDenda($x['remaining_denda']);
        }
        if(isset ($x['sp1_date'])){
          $this->setSp1Date($x['sp1_date']);
        }
        if(isset ($x['sp1_no'])){
          $this->setSp1No($x['sp1_no']);
        }
        if(isset ($x['sp1_plandate'])){
          $this->setSp1PlanDate($x['sp1_plandate']);
        }
        if(isset ($x['sp2_date'])){
          $this->setSp2Date($x['sp2_date']);
        }
        if(isset ($x['sp2_no'])){
          $this->setSp2No($x['sp2_no']);
        }
        if(isset ($x['sp2_plandate'])){
          $this->setSp2PlanDate($x['sp2_plandate']);
        }
        if(isset ($x['sp3_date'])){
          $this->setSp3Date($x['sp3_date']);
        }
        if(isset ($x['sp3_no'])){
          $this->setSp3No($x['sp3_no']);
        }
        if(isset ($x['sp3_plandate'])){
          $this->setSp3PlanDate($x['sp3_plandate']);
        }
        if(isset ($x['sp4_date'])){
          $this->setSp4Date($x['sp4_date']);
        }
        if(isset ($x['sp4_no'])){
          $this->setSp4No($x['sp4_no']);
        }
        if(isset ($x['sp4_plandate'])){
          $this->setSp4PlanDate($x['sp4_plandate']);
        }
        if(isset ($x['sp1_userdate'])){
          $this->setSp1UserDate($x['sp1_userdate']);
        }
        if(isset ($x['sp2_userdate'])){
          $this->setSp2UserDate($x['sp2_userdate']);
        }
        if(isset ($x['sp3_userdate'])){
          $this->setSp3UserDate($x['sp3_userdate']);
        }
        if(isset ($x['sp4_userdate'])){
          $this->setSp4UserDate($x['sp4_userdate']);
        }
		if(isset ($x['lama_tunggakan'])){
          $this->lama_tunggakan = $x['lama_tunggakan'];
        }
        if(isset ($x['kpr_acc_date'])){
          $this->setKpraccdate($x['kpr_acc_date']);
        }
        if(isset ($x['persentase_npv'])){
          $this->setPersentasenpv($x['persentase_npv']);
        }
        if(isset ($x['ppn'])){
          $this->setPPN($x['ppn']);
        }
        if(isset ($x['dpp'])){
          $this->setDPP($x['dpp']);
        }
        if(isset ($x['asuransi'])){
          $this->setAsuransi($x['asuransi']);
        }
        if(isset ($x['bphtb_bbn_ajb'])){
          $this->setBphtb_bbn_ajb($x['bphtb_bbn_ajb']);
        }
        if(isset ($x['biaya_lain_lain'])){
          $this->setBiaya_lain_lain($x['biaya_lain_lain']);
        }
        if(isset ($x['remaining_dpp'])){
          $this->setRemaining_dpp($x['remaining_dpp']);
        }

        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'schedule_id'                => $this->getId(),
            'scheduletype_id'            => $this->getScheduleTypeId(),
            'purchaseletter_id'          => $this->getPurchaseLetterId(),
            'description'                => $this->getDescription(),
            'termin'                     => $this->getTermin(),
            'duedate'                    => $this->getDueDate(),
            'amount'                     => $this->getAmount(),
            'remaining_balance'          => $this->getRemainingBalance(),
            'sourcemoney_sourcemoney_id' => $this->getSourceMoney()->getId(),
            'denda'                      => $this->getInterest(),
            'is_pay'                     => $this->getIsPay(),
            'remaining_denda'            => $this->getRemainingDenda(),
            'sp1_date'                   => $this->getSp1Date(),
            'sp1_no'                     => $this->getSp1No(),
            'sp1_plandate'               => $this->getSp1PlanDate(),
            'sp2_date'                   => $this->getSp2Date(),
            'sp2_no'                     => $this->getSp2No(),
            'sp2_plandate'               => $this->getSp2PlanDate(),
            'sp3_date'                   => $this->getSp3Date(),
            'sp3_no'                     => $this->getSp3No(),
            'sp3_plandate'               => $this->getSp3PlanDate(),
            'sp4_date'                   => $this->getSp4Date(),
            'sp4_no'                     => $this->getSp4No(),
            'sp4_plandate'               => $this->getSp4PlanDate(),
            'sp1_userdate'               => $this->getSp1UserDate(),
            'sp2_userdate'               => $this->getSp2UserDate(),
            'sp3_userdate'               => $this->getSp3UserDate(),
            'sp4_userdate'               => $this->getSp4UserDate(),
            'lama_tunggakan'             => $this->lama_tunggakan,
            "kpr_acc_date"               => $this->getKpraccdate(),
            "persentase_npv"             => $this->getPersentasenpv(),
            "ppn"                        => $this->getPPN(),
            "dpp"                        => $this->getDPP(),
            "asuransi"                   => $this->getAsuransi(),
            "bphtb_bbn_ajb"              => $this->getBphtb_bbn_ajb(),
            "biaya_lain_lain"            => $this->getBiaya_lain_lain(),
            "remaining_dpp"              => $this->getRemaining_dpp()
        );
        return $x;
    }
    
    public function getScheduleTypeId() {
        return $this->scheduleTypeId;
    }

    public function setScheduleTypeId($scheduleTypeId) {
        $this->scheduleTypeId = $scheduleTypeId;
    }


    public function getPurchaseLetterId() {
        return $this->purchaseLetterId;
    }

    public function setPurchaseLetterId($purchaseLetterId) {
        $this->purchaseLetterId = $purchaseLetterId;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getTermin() {
        return $this->termin;
    }

    public function setTermin($termin) {
        $this->termin = $termin;
    }

    public function getAmount() {
        return $this->amount;
    }

    public function setAmount($amount) {
        $this->amount = $amount;
    }

    public function getRemainingBalance() {
        return $this->remainingBalance;
    }

    public function setRemainingBalance($remainingBalance) {
        $this->remainingBalance = $remainingBalance;
    }

    public function getDueDate() {
        return $this->dueDate;
    }

    public function setDueDate($dueDate) {
        $this->dueDate = $dueDate;
    }
    
    public function getPayAmount() {
        return $this->payAmount;
    }

    public function setPayAmount($payAmount) {
        $this->payAmount = $payAmount;
    }
    
    public function getSourceMoney() {
        if(!$this->sourceMoney){
            $this->sourceMoney = new Erems_Models_Master_SourceMoney();
        }
        return $this->sourceMoney;
    }

    public function setSourceMoney(Erems_Models_Master_SourceMoney $sourceMoney) {
        $this->sourceMoney = $sourceMoney;
    }
    
    public function getInterest() {
        return $this->interest;
    }

    public function setInterest($interest) {
        $this->interest = $interest;
    }
    
    public function getIsPay() {
        return $this->isPay;
    }

    public function setIsPay($isPay) {
        $this->isPay = $isPay;
    }
    
    public function getRemainingDenda() {
        return $this->remainingDenda;
    }

    public function setRemainingDenda($remainingDenda) {
        $this->remainingDenda = $remainingDenda;
    }
    
    
    public function getSp1No() {
        return $this->sp1No;
    }

    public function getSp1Date() {
        return $this->sp1Date;
    }

    public function getSp1PlanDate() {
        return $this->sp1PlanDate;
    }

    public function getSp2No() {
        return $this->sp2No;
    }

    public function getSp2Date() {
        return $this->sp2Date;
    }

    public function getSp2PlanDate() {
        return $this->sp2PlanDate;
    }

    public function getSp3No() {
        return $this->sp3No;
    }

    public function getSp3Date() {
        return $this->sp3Date;
    }

    public function getSp3PlanDate() {
        return $this->sp3PlanDate;
    }

    public function getSp4No() {
        return $this->sp4No;
    }

    public function getSp4Date() {
        return $this->sp4Date;
    }

    public function getSp4PlanDate() {
        return $this->sp4PlanDate;
    }
    
    public function getSp1UserDate() {
        return $this->sp1UserDate;
    }

    public function getSp2UserDate() {
        return $this->sp2UserDate;
    }

    public function getSp3UserDate() {
        return $this->sp3UserDate;
    }

    public function getSp4UserDate() {
        return $this->sp4UserDate;
    }

    public function setSp1No($sp1No) {
        $this->sp1No = $sp1No;
    }

    public function setSp1Date($sp1Date) {
        $this->sp1Date = $sp1Date;
    }

    public function setSp1PlanDate($sp1PlanDate) {
        $this->sp1PlanDate = $sp1PlanDate;
    }

    public function setSp2No($sp2No) {
        $this->sp2No = $sp2No;
    }

    public function setSp2Date($sp2Date) {
        $this->sp2Date = $sp2Date;
    }

    public function setSp2PlanDate($sp2PlanDate) {
        $this->sp2PlanDate = $sp2PlanDate;
    }

    public function setSp3No($sp3No) {
        $this->sp3No = $sp3No;
    }

    public function setSp3Date($sp3Date) {
        $this->sp3Date = $sp3Date;
    }

    public function setSp3PlanDate($sp3PlanDate) {
        $this->sp3PlanDate = $sp3PlanDate;
    }

    public function setSp4No($sp4No) {
        $this->sp4No = $sp4No;
    }

    public function setSp4Date($sp4Date) {
        $this->sp4Date = $sp4Date;
    }

    public function setSp4PlanDate($sp4PlanDate) {
        $this->sp4PlanDate = $sp4PlanDate;
    }

    public function setSp1UserDate($sp1UserDate) {
        $this->sp1UserDate = $sp1UserDate;
    }

    public function setSp2UserDate($sp2UserDate) {
        $this->sp2UserDate = $sp2UserDate;
    }

    public function setSp3UserDate($sp3UserDate) {
        $this->sp3UserDate = $sp3UserDate;
    }

    public function setSp4UserDate($sp4UserDate) {
        $this->sp4UserDate = $sp4UserDate;
    }
    
    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        }
        return $this->purchaseletter;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }
    
    public function getKpraccdate() {
        return $this->kpraccdate;
    }

    public function setKpraccdate($kpraccdate) {
        $this->kpraccdate = $kpraccdate;
    }
    
    public function getPersentasenpv() {
        return $this->persentasenpv;
    }

    public function setPersentasenpv($persentasenpv) {
        $this->persentasenpv = $persentasenpv;
    }
    
    public function getPPN() {
        return $this->ppn;
    }

    public function setPPN($ppn) {
        $this->ppn = $ppn;
    }
    
    public function getDPP() {
        return $this->dpp;
    }

    public function setDPP($dpp) {
        $this->dpp = $dpp;
    }
    
    public function getAsuransi() {
        return $this->asuransi;
    }

    public function setAsuransi($asuransi) {
        $this->asuransi = $asuransi;
    }
    
    public function getBphtb_bbn_ajb() {
        return $this->bphtb_bbn_ajb;
    }

    public function setBphtb_bbn_ajb($bphtb_bbn_ajb) {
        $this->bphtb_bbn_ajb = $bphtb_bbn_ajb;
    }
    
    public function getBiaya_lain_lain() {
        return $this->biaya_lain_lain;
    }

    public function setBiaya_lain_lain($biaya_lain_lain) {
        $this->biaya_lain_lain = $biaya_lain_lain;
    }
    
    public function getRemaining_dpp() {
        return $this->remaining_dpp;
    }

    public function setRemaining_dpp($remaining_dpp) {
        $this->remaining_dpp = $remaining_dpp;
    }

    public function getArray() {
        
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("duedate","sp1_date","sp1_plandate","sp2_date","sp2_plandate",
            "sp3_date","sp3_plandate","sp4_date","sp4_plandate", "sp1_userdate", "sp2_userdate", "sp3_userdate", "sp4_userdate");
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getSourceMoney());
    }

}

?>
