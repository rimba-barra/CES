<?php

/**
 * Description of GantiNama
 *
 * @author tommytoban
 */
class Cashier_Models_Sales_Reason_GantiNama extends Cashier_Models_Sales_Reason {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "reasonchgname_";
    }

    public function getArrayTableEx() {
        $x = array(
            'reasonchgname_id'=>$this->getId(),
            'reasonchgname'=>$this->getName()
        );
        return $x;
    }

    public function setArrayTableEx($dataArray) {
        if(isset ($dataArray['reasonchgname_id'])){
          $this->setId($dataArray['reasonchgname_id']);
        }
        if(isset ($dataArray['reasonchgname'])){
          $this->setName($dataArray['reasonchgname']);
        }
    }

}
