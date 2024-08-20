<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Params
 *
 * @author MIS
 */
class Erems_Models_Payment_Params extends Erems_Models_Parameter_Parameter {
    private $finePermil;
    private $toleranceLimit;
    private $otherPayDesc;
    private $nonLinkPayDesc;
    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::PAYMENT_FINE_PERMIL:
               $this->setFinePermil($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PAYMENT_TOLERANCE_LIMIT:
                $this->setToleranceLimit($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PAYMENT_NONLINKPAY_DESC:
                $this->setNonLinkPayDesc($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PAYMENT_OTHERPAY_DESC:
                $this->setOtherPayDesc($parameter->getValue());
                break;
            default:
                break;
        }
    }

    public function getParams() {
        return array(Erems_Box_GlobalParams::PAYMENT_FINE_PERMIL, 
            Erems_Box_GlobalParams::PAYMENT_TOLERANCE_LIMIT,
            Erems_Box_GlobalParams::PAYMENT_NONLINKPAY_DESC,
            Erems_Box_GlobalParams::PAYMENT_OTHERPAY_DESC);
    }    
    
    public function getFinePermil() {
        return $this->finePermil;
    }

    public function setFinePermil($finePermil) {
        $this->finePermil = $finePermil;
    }

    public function getToleranceLimit() {
        return $this->toleranceLimit;
    }

    public function setToleranceLimit($toleranceLimit) {
        $this->toleranceLimit = $toleranceLimit;
    }
    
    public function getOtherPayDesc() {
        return $this->otherPayDesc;
    }

    public function setOtherPayDesc($otherPayDesc) {
        $this->otherPayDesc = $otherPayDesc;
    }

    public function getNonLinkPayDesc() {
        return $this->nonLinkPayDesc;
    }

    public function setNonLinkPayDesc($nonLinkPayDesc) {
        $this->nonLinkPayDesc = $nonLinkPayDesc;
    }




    
    
}

?>
