<?php


/**
 * Description of SpkParams
 *
 * @author MIS
 */
class Erems_Models_Sales_Change_ChangeNameParams extends Erems_Models_Parameter_Parameter implements Erems_Models_App_Mail_SendMail {
    private $isApproval;
    private $group;
    private $sendMail;
    
    public function getParams() {
        return array(Erems_Box_GlobalParams::CHANGENAME_APPROVAL,
            Erems_Box_GlobalParams::CHANGENAME_APPROVE_GROUPID,Erems_Box_GlobalParams::CHANGENAME_SENDMAIL);
    }
    
    
    
    public function fill(Erems_Models_Master_Parameter $parameter){
       
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::CHANGENAME_APPROVAL:
               $this->setIsApproval($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::CHANGENAME_APPROVE_GROUPID:
                $this->setGroup($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::CHANGENAME_SENDMAIL:
                $this->setSendMail($parameter->getValue());
                break;
            default:
                break;
        }
    }
    
    
    public function getIsApproval() {
        return $this->isApproval;
    }

    public function setIsApproval($isApproval) {
        $this->isApproval = $isApproval;
    }

    public function getGroup() {
        return $this->group;
    }

    public function setGroup($group) {
        $this->group = $group;
    }

    public function getSendMail() {
        return $this->sendMail;
    }

    public function setSendMail($sendMail) {
        $this->sendMail = $sendMail;
    }





    

    

    
    
    



    
}

?>
