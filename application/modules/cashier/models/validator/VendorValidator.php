<?php

class Cashier_Models_Validator_VendorValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;

    public function run(Cashier_Models_Master_Vendor $pl) {
        $msg = "";
        $this->returnId = 0;
        $appData = $this->paramdata;
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $name = $dao->codeExistVendor($pl, $this->appRequest);

        $idExist = 0;
        $val = '';
        if ($name) {

            if (count($name[0]) > 0) {
                $idExist = $name[0][0]['vendor_id'];
                $val = $name[0][0]['vendorname'];
            }
        }

        if ($idExist && ($pl->getId() != $idExist)) {
            $msg = "Supplier " . $val . " already inserted.";
        } else {


            $update = $dao->savevendor($pl, $this->appRequest);

       

            if ($update) {

             
                $msg = "SUCCESS";
                $this->setReturnId($update);
                $this->setStatus(TRUE);
            } else {
                $msg = "Unable to proccess data.";
            }
        }

        $this->setMsg($msg);
    }

}
