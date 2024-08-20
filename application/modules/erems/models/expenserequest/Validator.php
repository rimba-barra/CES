<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Expenserequest_Validator extends Erems_Box_Models_App_Validator {

    private $mode;

    public function run(Erems_Models_Expenserequest_Expense $er) {
        $msg = "";
        if ($this->mode == "APPROVE") {
             if ($er->getId()==0) {
                $msg = "Invalid expense request";
            } else if (strlen($er->getApproveDate()) < 5) {
                $msg = "Please insert approve date";
            } else if (strlen($er->getVoucher()->getDate()) < 5) {
                $msg = "Please insert voucher date";
            } else if ($er->getPaymentMethod()->getId()==0) {
                $msg = "Please insert payment method ";
            } else if (strlen($er->getVoucher()->getNumber()) < 5 ) {
                $msg = "Voucher number mininum 5 characters";
            } else if (strlen($er->getVoucher()->getReferenceNumber()) < 5 ) {
                $msg = "Reference number mininum 5 characters";
            } else {
                $this->setStatus(TRUE);
            }
        } else {
            if (strlen($er->getDate()) < 3) {
                $msg = "Please insert expense request date";
            } else if ($er->getDepartment()->getId() == 0) {
                $msg = "Please insert department";
            } else {
                $this->setStatus(TRUE);
            }
        }
        $this->setMsg($msg);
    }

    public function getMode() {
        return $this->mode;
    }

    public function setMode($mode) {
        $this->mode = $mode;
    }
}
?>
