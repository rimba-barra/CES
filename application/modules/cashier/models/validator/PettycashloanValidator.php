<?php

class Cashier_Models_Validator_PettycashloanValidator extends Cashier_Box_Models_App_Validator {

    public $kasbank_id;

    public function run(Cashier_Models_Master_Kasbank $object) {
        $msg = "";
        $this->kasbank_id = 0;
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $request = $this->appRequest;

            $update = $dao->prosesPettycashloan($object, $request);

            if ($update) {
                $msg = "SUCCESS";
                $this->setStatus(TRUE);
            } else {
                $msg = "Unable to proccess data.";
            }
       

        $this->setMsg($msg);
    }

}
