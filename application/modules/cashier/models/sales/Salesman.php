<?php

/**
 * Description of Salesman
 *
 * @author MIS
 */
class Cashier_Models_Sales_Salesman extends Cashier_Models_Hrd_Employee {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "salesman_";
        $this->getJabatan()->setId(Cashier_Box_Config::POSITION_ID_SALESMAN);
    }
}

?>
