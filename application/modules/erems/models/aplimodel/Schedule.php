<?php


/**
 * Description of Schedule
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Aplimodel_Schedule extends Erems_Models_Purchaseletter_Schedule{
    protected function getFloatFields() {
        return array("amount","remaining_balance");
    }

}
