<?php


/**
 * Description of CancelReason
 *
 * @author MIS
 */
class Cashier_Models_Sales_Reason_CancelReason extends Cashier_Models_Sales_Reason {
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "cancelreason_";
    }
    
    public function getArrayTableEx() {
         $x = array(
            'cancelreason_id'=>$this->getId(),
            'cancelreason'=>$this->getName(),
            'code'=>$this->getCode()
        );
        return $x;
    }

    public function setArrayTableEx($dataArray) {
        if(isset ($dataArray['cancelreason_id'])){
          $this->setId($dataArray['cancelreason_id']);
        }
        if(isset ($dataArray['cancelreason'])){
          $this->setName($dataArray['cancelreason']);
        }
        if(isset ($dataArray['code'])){
          $this->setCode($dataArray['code']);
        }
    }    
}

?>
