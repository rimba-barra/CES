<?php
/**
 * Description of MoveReason
 *
 * @author MIS
 */
class Erems_Models_Sales_Reason_MoveReason extends Erems_Models_Sales_Reason {
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "movereason_";
    }
    
    public function getArrayTableEx() {
         $x = array(
            'movereason_id'=>$this->getId(),
            'movereason'=>$this->getName(),
            'code'=>$this->getCode()
        );
        return $x;
    }

    public function setArrayTableEx($dataArray) {
        if(isset ($dataArray['movereason_id'])){
          $this->setId($dataArray['movereason_id']);
        }
        if(isset ($dataArray['movereason'])){
          $this->setName($dataArray['movereason']);
        }
        if(isset ($dataArray['code'])){
          $this->setCode($dataArray['code']);
        }
    } 
}

?>
