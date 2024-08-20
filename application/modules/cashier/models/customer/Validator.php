<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Cashier_Models_Customer_Validator extends Cashier_Box_Models_App_Validator {

    private $ses;

    public function setSes($ses) {
        $this->ses = $ses;
    }

    public function run(Cashier_Models_Master_CustomerProfile $customer) {
        $msg = "";

        $paramsRequestResult = Cashier_Box_Tools::globalParamsExistMasterCustomer($this->ses);
        if ($paramsRequestResult["status"]) {
            $p = $paramsRequestResult["parameters"];
            $cmf = $p[Cashier_Box_GlobalParams::MASTERCUSTOMER_MANDATORYFIELDS];
        }

        if ($cmf) {
            if (strlen($customer->getName()) < 3) {
                $msg = "Name minimum 3 characters";
            } else if (strlen($customer->getAddress()) < 5) {
                $msg = "Address minimum 5 characters";
            } else if ($customer->getCity()->getId() == 0) {
                $msg = "Invalid City";
            //} else if (strlen($customer->getHomePhone()) < 7 || !$this->isDigit($customer->getHomePhone())) {
            //} else if (strlen($customer->getHomePhone()) < 7) { // request pak Endin Citra indah 20170412
               // $msg = "Home Phone minimum 7 characters and digits only allowed";
            } else if (strlen($customer->getMobilePhone()) < 7) { // request pak Endin Citra indah 20170412
                $msg = "Mobile Phone minimum 7 characters and digits only allowed";
            } else if (strlen($customer->getKtp()->getNomor()) < 10 || !$this->isDigit($customer->getKtp()->getNomor())) {
                $msg = "KTP Number minimum 10 characters and digits only allowed";
            } else if (strlen($customer->getBirthPlace()) < 3) {
                $msg = "Birth Place minimum 3 characters";
            } else if (!$customer->getBirthDate()) {
                $msg = "Invalid Birth Date";
            } else if (!$customer->getMaritalStatus()) {
                $msg = "Invalid Marital Status";
            } else if (!$customer->getNationality()) {
                $msg = "Invalid Nationality";
            } else if ($customer->getReligion()->getId() == 0) {
                $msg = "Invalid Religion";
            } else if ($customer->getPurpose()->getId() == 0) {
                $msg = "Invalid Purpose";
            } else if (strlen($customer->getUser()->getName()) < 5) {
                $msg = "User id minimum 5 characters";
            } else if (strlen($customer->getUser()->getPassword()) < 5) {
                $msg = "Password minimum 5 characters";
            } else {
                /// check user id
                $dao = new Cashier_Models_Master_CustomerDao();
                $userExist = (int) $dao->userIdExist($customer);
                if ($userExist) {
                    if ($userExist != intval($customer->getId())) {
                        $msg = "Username already taken";
                    } else {
                        $this->setStatus(TRUE);
                    }
                } else {
                    $this->setStatus(TRUE);
                }
            }
        }else{
            if (strlen($customer->getName()) < 5) {
                $msg = "Name minimum 5 characters";
           // } else if (strlen($customer->getHomePhone()) < 7) {
               // $msg = "Home Phone minimum 7 characters and digits only allowed";
            } else if (strlen($customer->getMobilePhone()) < 7) {
                $msg = "Mobile Phone minimum 7 characters and digits only allowed";
            } else {
                $this->setStatus(TRUE);
            }
        }


        $this->setMsg($msg);
    }

}

?>
