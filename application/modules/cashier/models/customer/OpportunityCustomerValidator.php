<?php

/**
 * Description of OpportunityCustomerValidator
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_Customer_OpportunityCustomerValidator extends Cashier_Box_Models_App_Validator {

    private $ses;

    public function setSes($ses) {
        $this->ses = $ses;
    }

    public function run(Cashier_Models_Master_OpportunityCustomer $customer) {
        $msg = "";

        if (strlen($customer->getName()) < 5) {
            $msg = "Name minimum 5 characters";
       // } else if (strlen($customer->getAddress()) < 5) {
         //   $msg = "Address minimum 5 characters";
        } else if (strlen($customer->getHomePhone()) < 7 || !$this->isDigit($customer->getHomePhone())) {
            $msg = "Home Phone minimum 7 characters and digits only allowed";
        } else {
            $this->setStatus(TRUE);
        }


        $this->setMsg($msg);
    }

}
