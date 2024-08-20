<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ChangeParams
 *
 * @author MIS
 */
class Cashier_Models_Sales_Change_ChangeParams extends Cashier_Models_Parameter_Parameter  {
    private $sendMail;
    private $useAprroval;
    private $userApproval;
    private $groupApproval;
    public function fill(\Cashier_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Cashier_Box_GlobalParams::CHANGEPRICE_APPROVAL:
               $this->setUseAprroval($parameter->getValue());
                break;
            case Cashier_Box_GlobalParams::CHANGEPRICE_SENDMAIL:
                $this->setSendMail($parameter->getValue());
                break;
            case Cashier_Box_GlobalParams::CHANGEPRICE_APPROVE_GROUPID:
                $this->setGroupApproval($parameter->getValue());
                break;
            default:
                break;
        }
    }

    public function getParams() {
        return array(Cashier_Box_GlobalParams::CHANGEPRICE_APPROVAL,  Cashier_Box_GlobalParams::CHANGEPRICE_APPROVE_GROUPID, Cashier_Box_GlobalParams::CHANGEPRICE_SENDMAIL);
    }   
    
    public function getSendMail() {
        return $this->sendMail;
    }

    public function setSendMail($sendMail) {
        $this->sendMail = $sendMail;
    }

    public function getUseAprroval() {
        return $this->useAprroval;
    }

    public function setUseAprroval($useAprroval) {
        $this->useAprroval = $useAprroval;
    }

    public function getUserApproval() {
        return $this->userApproval;
    }

    public function setUserApproval($userApproval) {
        $this->userApproval = $userApproval;
    }

    public function getGroupApproval() {
        return $this->groupApproval;
    }

    public function setGroupApproval($groupApproval) {
        $this->groupApproval = $groupApproval;
    }


}

?>
