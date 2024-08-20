<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ScheduleGenerator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_ScheduleGenerator {

    protected $result;
    protected $purchaseletter;
    protected $priceTypeId;
    protected $count;
    protected $purchaseLetterDate;

    public function __construct() {
        $this->result = array();
        $this->count = 0;
    }

    public function getResult() {
        return $this->result;
    }

    public function setResult($result) {
        $this->result = $result;
    }

    public function getPurchaseletter() {
        return $this->purchaseletter;
    }

    public function setPurchaseletter($purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function run(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseLetter) {
        $this->priceTypeId = $purchaseLetter->getPriceType()->getId();
        $this->purchaseLetterDate = $purchaseLetter->getDate();
        if(intval($this->priceTypeId)==0){
            throw new Exception("Price Type Id Not Found");
        }
        if(!$this->purchaseLetterDate){
             throw new Exception("Invalid Purchaseletter Date");
        }
        $this->createBilling($purchaseLetter->getBilling());
    }

    protected function createBilling(Erems_Models_Sales_BillingRulesTran $billing) {
        if(doubleval($billing->getAngsuran()->getAmount())==0){
             throw new Exception("Angsuran Amount = 0");
        }
        $this->buildRow($billing->getTandaJadi(), Erems_Box_Config::SCHTYPE_TANDAJADI);
        $this->buildRow($billing->getUangMuka(), Erems_Box_Config::SCHTYPE_UANGMUKA);
        $this->buildRow($billing->getAngsuran(), $this->priceTypeId);
    }

    protected function buildRow(Erems_Models_Sales_Rule $rule, $scheduleTypeId) {
        if (!is_array($this->result))
            $this->result = array();
      
        for ($i = 0; $i < $rule->getQuantity(); $i++) {
            $this->count++;
            $sch = new Erems_Models_Purchaseletter_Schedule();
            $sch->setId(0);
           
            $sch->setDueDate($this->getDueDate($this->count));
            $sch->setScheduleTypeId($scheduleTypeId);
            $sch->setAmount($rule->getAmount() / $rule->getQuantity());
            $sch->setTermin($i + 1);
            $this->result[] = $sch;
            unset($sch);
        }
    }

    public function getDueDate($count) {
        $time = strtotime($this->purchaseLetterDate);
        $month = date("n", $time);
        $year = date("Y", $time);
        $day = date("j",$time);
        $temMonth = 0;
        $temMonth = $month+$count;
        $month = ($temMonth%12)===0?12:($temMonth%12);
        $year = $year+floor($temMonth/12);
        $fixDate = $month."-".$day."-".$year;
        return $fixDate;
    }

}

?>
