<?php

/**
 * Description of Voucher
 *
 * @author tommytoban
 */
class Erems_Models_Voucher {
    private $date;
    private $number;
    private $referenceNumber;
    
    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
      //  $this->date = date("d/m/Y",strtotime($date));
    }

    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function getReferenceNumber() {
        return $this->referenceNumber;
    }

    public function setReferenceNumber($referenceNumber) {
        $this->referenceNumber = $referenceNumber;
    }


}

?>
