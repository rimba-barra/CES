<?php

/**
 * Description of Rule
 *
 * @author MIS
 */
class Erems_Models_Sales_Rule {
    private $amount;
    private $percent;
    private $quantity;
    private $typePeriodeAmount;
    private $typePeriode; /* example data => hari, minggu , bulan*/
    public function getAmount() {
        return $this->amount;
    }

    public function setAmount($amount) {
        $this->amount = (double)str_replace(",","",$amount);
    }

    public function getPercent() {
        return $this->percent;
    }

    public function setPercent($percent) {
        $this->percent = $percent;
    }

    public function getQuantity() {
        return $this->quantity;
    }

    public function setQuantity($quantity) {
        $this->quantity = (float)$quantity;
    }
    
    public function getTypePeriodeAmount() {
        return $this->typePeriodeAmount;
    }

    public function setTypePeriodeAmount($typePeriodeAmount) {
        $this->typePeriodeAmount = $typePeriodeAmount;
    }

    public function getTypePeriode() {
        return $this->typePeriode;
    }

    public function setTypePeriode($typePeriode) {
        $this->typePeriode = $typePeriode;
    }




}

?>
