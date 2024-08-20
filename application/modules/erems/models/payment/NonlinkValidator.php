<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Payment_NonlinkValidator extends Erems_Box_Models_App_Validator {

    public function run(Erems_Models_Payment_Payment $pay) {
        $msg = "";
        $paymentmethodId = (int) $pay->getPaymentMethod()->getId();
        $isCash = FALSE;
        $isCash = $paymentmethodId == Erems_Box_Config::PAYMENTMETHOD_CASH ? TRUE : FALSE;
        $customer = $pay->getCustomer();
     
        if ($paymentmethodId == 0) {
            $msg = "Please insert payment method";
        } else if ($pay->getAmount() == 0) {
            $msg = "Please insert payment value";
        } else if ($pay->getPaymentMethod()->getId() == 0) {
            $msg = "Please insert payment method";
        } else if (strlen($pay->getReferenceNo()) == 0 && !$isCash) {
            $msg = "Please insert reference number";
        } else if (!$pay->getDate()) {
            $msg = "Please insert payment date";
        } else if (!$isCash && !$pay->getDueDate()) {
            $msg = "Please insert due date";
        } else {
            if ($customer instanceof Erems_Models_Master_CustomerProfile) {
                if (strlen($customer->getName()) < 5) {
                    $msg = "Name minimum 5 characters";
                } 
				
				/* 7/25/2017 - removed validation by David
				else if (strlen($customer->getAddress()) < 5) {
                    $msg = "Address minimum 5 characters";
                } 
				*/
				
				else if ($customer->getCity()->getId() == 0) {
                    $msg = "Invalid City";
                } 
				/* 7/25/2017 - removed validation by David
				else if (strlen($customer->getHomePhone()) < 7 || !$this->isDigit($customer->getHomePhone())) {
                    $msg = "Home Phone minimum 7 characters and digits only allowed";
                } 
				*/
				else {
                    if ($isCash) {
                        $pay->setDueDate($pay->getDate());
                        $pay->setCairDate($pay->getDate());
                    }

                    $this->setStatus(TRUE);
                }
            }else{
                $msg = "Invalid customer";
            }
        }
        $this->setMsg($msg);
    }

}

?>
