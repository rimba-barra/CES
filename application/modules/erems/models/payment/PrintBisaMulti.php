<?php

/**
 *
 * @author TOMMY-MIS
 */
interface Erems_Models_Payment_PrintBisaMulti {
    public function getOptions();
    public function runMulti(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds,$option);
}
