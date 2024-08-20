<?php

/**
 * Description of Salesman
 *
 * @author MIS
 */
class Erems_Models_Sales_Salesman extends Erems_Models_Hrd_Employee {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "salesman_";
        $this->getJabatan()->setId(Erems_Box_Config::POSITION_ID_SALESMAN);
    }
}

?>
