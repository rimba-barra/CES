<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Payment_Validator extends Erems_Box_Models_App_Validator {
    
    private $paymentModule; // null untuk validator payment schedule
    private $session;
    
    public function setSession(Erems_Box_Models_App_Session $ses){
        $this->session = $ses;
    }
    
    public function run(Erems_Models_Payment_Payment $pay) {
        $msg = "";
        $paymentmethodId = (int) $pay->getPaymentMethod()->getId();
        
        $isCash = FALSE;
        $isCash = $paymentmethodId == Erems_Box_Config::PAYMENTMETHOD_CASH ? TRUE : FALSE;
       // var_dump($this->)
        $dao = new Erems_Models_Payment_Dao();
        $codeExist = $dao->receipeExist($pay,$this->session);
        
        $detailProject = $dao->getProjectDetail($this->session->getProject()->getId());
        $subholding = $detailProject['subholding_id'];
       
        $idExist = 0;
        if($codeExist){
            if(count($codeExist[0]) > 0){
                $idExist = $codeExist[0][0]['payment_id'];
            }
        }
        
        $nonValidPaymentMethod = array("pencairan");
        $payMethodText = $pay->getPaymentMethod()->getName();
        $sub = array(1,3,4);

        if ($pay->getPurchaseletter()->getId() == 0) {
            $msg = "Please insert purchaseletter";
        } else if ($paymentmethodId == 0) {
            $msg = "Please insert payment method";
        } else if ($pay->getAmount() == 0) {
            $msg = "Please insert payment value";
        } else if ($pay->getPaymentMethod()->getId() == 0) {
      //  } else if ($pay->getPaymentMethodId()== 0) {
            $msg = "Please insert payment method";
        } else if (!$pay->getDate()) {
            $msg = "Please insert payment date";
        } else if (strtotime(date($pay->getDate()))-strtotime(date("Y-m-d")) > 0) {
             $msg = "Tanggal payment tidak boleh lebih dari ".date("d-m-Y");
        } else if (!$isCash && !$pay->getDueDate()) {
            $msg = "Please insert due date";
        } else if (!$this->paymentModule && (strlen($pay->getReceiptNo()) < 1)) {
            if($pay->getIsDraft() == 1) {
                if($pay->getCounterkwitansi() == 1) {
                    $this->setStatus(TRUE);
                } else {
                    $msg = "Please insert Receipt No";
                }
            } else {
                $msg = "Please insert Receipt No";
            }            
        } else if($idExist && ($pay->getId() != $idExist) && in_array($subholding, $sub)){
            if($pay->getIsDraft() == 1) {
                if($pay->getCounterkwitansi() == 1) {
                    $this->setStatus(TRUE);
                } else {
                    $msg = "Receipt No already taken";
                }
            } else {
                $msg = "Receipt No already taken";
            }            
        }  else if(!$this->paymentModule && $idExist && ($pay->getId() != $idExist) && $subholding == 2){
            if($pay->getIsDraft() == 1) {
                if($pay->getCounterkwitansi() == 1) {
                    $this->setStatus(TRUE);
                } else {
                    $msg = "Receipt No already taken";
                }
            } else {
                $msg = "Receipt No already taken";
            }            
        } else if(in_array(strtolower ($payMethodText), $nonValidPaymentMethod) && $pay->getId() <= 0){
            $msg = $payMethodText." tidak boleh diinput di sini.";   
        } else {
            if (!$isCash) {
                if (strlen($pay->getReferenceNo()) == 0) {
                
                    $msg = "Please insert reference number";
                }else{
                    $this->setStatus(TRUE);
                }
            } else {
                $pay->setDueDate($pay->getDate());
                $pay->setCairDate($pay->getDate());

                $this->setStatus(TRUE);
            }
        }
        $this->setMsg($msg);
    }

    public function setPaymentModule($paymentModule) {
        $this->paymentModule = $paymentModule;
    }

}

?>