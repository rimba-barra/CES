<?php

class Erems_Libraries_Cicilan{
    private $id = 0;
    private $amount = 0;
    private $remaining_balance = 0.0;
    private $pay_value = 0;
    public function __construct($id=0,$am=0,$rb=0.0) {
        $this->id = intval($id);
        $this->amount = floatval($am);
        $this->remaining_balance = floatval($rb);
    }
    public function getId(){
        return $this->id;
    }
    public function getPayValue(){
        return $this->pay_value;
    }
    public function setPayValue($pv){
        $this->pay_value  = floatval($pv);
    }
    public function getAmount(){
        return $this->amount;
    }
    public function getRemainingBalance(){
        return $this->remaining_balance;
    }
    public function setRemainingBalance($rb){
        $this->remaining_balance = floatval($rb);
    }
    
}

?>
