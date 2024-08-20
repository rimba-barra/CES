<?php

/**
 * Description of Collector
 *
 * @author MIS
 */
class Erems_Models_Sales_Collector extends Erems_Models_Hrd_Employee {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "collector_";
        $this->getJabatan()->setId(Erems_Box_Config::POSITION_ID_COLLECTOR);
    }
}

?>
