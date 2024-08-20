<?php

/**
 * Description of Collector
 *
 * @author MIS
 */
class Cashier_Models_Sales_Collector extends Cashier_Models_Hrd_Employee {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "collector_";
        $this->getJabatan()->setId(Cashier_Box_Config::POSITION_ID_COLLECTOR);
    }
}

?>
