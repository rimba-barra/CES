<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Cashier_Models_Payment_Validator extends Cashier_Box_Models_App_Validator {
    
    private $paymentModule; // null untuk validator payment schedule
    private $session;
    
    public function setSession(Cashier_Box_Models_App_Session $ses){
        $this->session = $ses;
    }
    

    public function run(Cashier_Models_Payment_Payment $pay) {
        $msg = "";
        $paymentmethodId = (int) $pay->getPaymentMethod()->getId();
        
        $isCash = FALSE;
        $isCash = $paymentmethodId == Cashier_Box_Config::PAYMENTMETHOD_CASH ? TRUE : FALSE;
       // var_dump($this->)
        $dao = new Cashier_Models_Payment_Dao();
        $codeExist = $dao->receipeExist($pay,$this->session);
        
       
        $idExist = 0;
        if($codeExist){
            if(count($codeExist[0]) > 0){
               
                $idExist = $codeExist[0][0]['payment_id'];
            }
        }
        
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
            $msg = "Please insert Receipt No";
        } else if(!$this->paymentModule && $idExist && ($pay->getId() != $idExist)){
            $msg = "Receipe No already taken";   
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
