<?php
/**
 * Description of Schedule
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_Scheduleakadkredit extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried,  Erems_Box_Kouti_Remora {
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
    private $purchaseletterNo;
    private $lastDueDate;
    private $lastDueDateAge;
    private $lastDueDateAgeWeek;

    
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
        if(isset ($x['purchaseletter_no'])){
          $this->setPurchaseLetterNo($x['purchaseletter_no']);
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
        if(isset ($x['last_duedate'])){
          $this->setLastDueDate($x['last_duedate']);
        }
        if(isset ($x['last_duedate_age'])){
          $this->setLastDueDateAge($x['last_duedate_age']);
        }
        if(isset ($x['last_duedate_age_week'])){
          $this->setLastDueDateAgeWeek($x['last_duedate_age_week']);
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
       
       
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'schedule_id'=>$this->getId(),
            'scheduletype_id'=>$this->getScheduleTypeId(),
            'purchaseletter_id'=>$this->getPurchaseLetterId(),
            'description'=>$this->getDescription(),
            'termin'=>$this->getTermin(),
            'duedate'=>$this->getDueDate(),
            'amount'=>$this->getAmount(),
            'remaining_balance'=>$this->getRemainingBalance(),
            'sourcemoney_sourcemoney_id'=>$this->getSourceMoney()->getId(),
            'denda'=>$this->getInterest(),
            'is_pay'=>$this->getIsPay(),
            'remaining_denda'=>$this->getRemainingDenda(),
            'sp1_date'=>$this->getSp1Date(),
            'sp1_no'=>$this->getSp1No(),
            'sp1_plandate'=>$this->getSp1PlanDate(),
            'sp2_date'=>$this->getSp2Date(),
            'sp2_no'=>$this->getSp2No(),
            'sp2_plandate'=>$this->getSp2PlanDate(),
            'sp3_date'=>$this->getSp3Date(),
            'sp3_no'=>$this->getSp3No(),
            'sp3_plandate'=>$this->getSp3PlanDate(),
            'sp4_date'=>$this->getSp4Date(),
            'sp4_no'=>$this->getSp4No(),
            'sp4_plandate'=>$this->getSp4PlanDate(),
            'last_duedate' =>$this->getLastDueDate(), //last UM date
            'last_duedate_age' => $this->getLastDueDateAge(),
            'last_duedate_age_week' => $this->getLastDueDateAgeWeek()
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
    
    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        }
        return $this->purchaseletter;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function getArray() {
        
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("duedate","sp1_date","sp1_plandate","sp2_date","sp2_plandate",
            "sp3_date","sp3_plandate","sp4_date","sp4_plandate");
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getSourceMoney());
    }



    /**
     * @return mixed
     */
    public function getPurchaseletterNo()
    {
        return $this->purchaseletterNo;
    }

    /**
     * @param mixed $purchaseletterNo
     *
     * @return self
     */
    public function setPurchaseletterNo($purchaseletterNo)
    {
        $this->purchaseletterNo = $purchaseletterNo;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastDueDate()
    {
        return $this->lastDueDate;
    }

    /**
     * @param mixed $lastDueDate
     *
     * @return self
     */
    public function setLastDueDate($lastDueDate)
    {
        $this->lastDueDate = $lastDueDate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastDueDateAge()
    {
        return $this->lastDueDateAge;
    }

    /**
     * @param mixed $lastDueDateAge
     *
     * @return self
     */
    public function setLastDueDateAge($lastDueDateAge)
    {
        $this->lastDueDateAge = $lastDueDateAge;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastDueDateAgeWeek()
    {
        return $this->lastDueDateAgeWeek;
    }

    /**
     * @param mixed $lastDueDateAgeWeek
     *
     * @return self
     */
    public function setLastDueDateAgeWeek($lastDueDateAgeWeek)
    {
        $this->lastDueDateAgeWeek = $lastDueDateAgeWeek;

        return $this;
    }
}

?>
