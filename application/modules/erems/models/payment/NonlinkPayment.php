<?php

/**
 * Description of NonlinkPayment
 *
 * @author MIS
 */
class Erems_Models_Payment_NonlinkPayment extends Erems_Models_Payment_Payment  {
    private $customer;
    public function __construct() {
        parent::__construct();
        $this->customer = new Erems_Models_Master_CustomerProfile();
    }
    
    public function getCustomer() {
        return $this->customer;
    }

    public function setCustomer(Erems_Models_Master_Customer $customer) {
        $this->customer = $customer;
    }
    
    public function grouped() {
        $ar = parent::grouped();
        $ar[] = $this->getCustomer();
        return $ar;
    }


}

?>
