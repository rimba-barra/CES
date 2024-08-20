<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Cashier_Models_Payment_CashierValidator extends Cashier_Box_Models_App_Validator {
    
    private $paymentModule; // null untuk validator payment schedule
    private $session;
    public $dataValidator;
    
    public function setSession(Cashier_Box_Models_App_Session $ses){
        $this->session = $ses;
    }
    
    public function _toInt($str)
    {
        return (int)preg_replace("/([^0-9\\.])/i", "", $str);
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
        
        $data = array();
        $data = $this->dataValidator;
        
        $detail = array();
        $detail = $data['detailcoa'];
        
      
        
        $kasbank_id = 0;
        $voc = null;
        
//        var_dump($data);
//        die();
        
//        if($data['paymentcashier_th_kasbank_id']) {
//            $kasbank_id = $data['paymentcashier_th_kasbank_id'];
//            $voucher = new Cashier_Models_Common();
//            $param = array(
//                "project_id" =>$this->session->getProject()->getId(),
//                "pt_id" => $this->session->getPt()->getId(),
//                "module" => "KAS",
//                "flag" => "1",
//                "prefix" => $r["prefix_voucher"],
//                "param_date" => $cash->getAcceptDate(),
//            );
//            $voc = $voucher->docNumberbyparam($param);
//        }
        
        
        
        
        if($detail) {
            
            $countO = 0;
            $countI = 0;
            $totalOI  = 0;
            $totalI = 0;
            $totalO = 0;
            
            if(in_array('O', array_column($detail, 'type'))) { // search value in the array
                $filter = array("O");
                $newArrayO = array_filter($detail, function($e) use ($filter){
                        return in_array($e['type'], $filter);
                });
                $countO = array_count_values(array_column($newArrayO,'type'));
                $sumO = array();
                    foreach($newArrayO as $dataO) {
                        $sumO[] = $dataO["amount"];
                    }     
                    $totalO = round(array_sum($sumO),2);
            }
            
            if(in_array('I', array_column($detail, 'type'))) { // search value in the array
              $filter = array("I");
              $newArrayI = array_filter($detail, function($e) use ($filter){
                      return in_array($e['type'], $filter);
              });  
              $countI = array_count_values(array_column($newArrayI,'type'));
              $sumI = array();
                    foreach($newArrayI as $dataI) {
                        $sumI[] = $dataI["amount"];
                    }   
                    $totalI = round(array_sum($sumI),2);
              
            }
            

            if ($countI > 0) {
                $totalOI = round($totalI,2);
            }
            elseif($countO >0 ) {
                $totalOI = round($totalO,2);
            }
            else {
                if($data['is_out'] == "0") { //jika 1 itu OUT TRANS, 0 IN TRANS
                    $totalOI = round($totalO-$totalI,2);
                }
                else {
                    $totalOI = round($totalI-$totalO,2);
                }  
            }
         
          
                
        } 
        else {
            
            $countO = 0;
            $countI = 0;
            $totalOI  = 0;
            $totalI = 0;
            $totalO = 0;
            
            
        }
        

        $total_payment = floatval(str_replace(",","",$data['total_payment']));
     
////        var_dump($total_payment == ($totalO - $totalI));
////        die();

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
        } else if (!$isCash && !$pay->getDueDate()) {
            $msg = "Please insert due date";
        } else if (!$this->paymentModule && (strlen($pay->getReceiptNo()) < 1)) {
            $msg = "Please insert Receipt No";
        } else if(!$this->paymentModule && $idExist && ($pay->getId() != $idExist)){
            $msg = "Receipe No already taken";   
        } else if(!$pay->getVoucherNo()){
            $msg = "Document number not generated";    
        } else if(!$data["paymentcashier_grouptrans_id"]){
            $msg = "Please select Group Trans";   
        }
        else if( $countI == 0 and $countO == 0) {
            $msg = "Detail jurnal masih kosong, Mohon generate Template coa"; 
        }
//          else if($countI > 0 AND $countO > 0 AND $totalI != $totalO){
//            $msg = "Total detail dataflow I & O tidak balance.<br><br> Dataflow I : "
//                    . "".number_format($totalI,2,',','.')." <br> Dataflow O : ".number_format($totalO,2,',','.')." "
//                    . "<br>-------------------------------------------------------"
//                    . "<br>Balance I : ".number_format($total_payment-$totalI,2,',','.').""
//                    . "<br>Balance O : ".number_format($total_payment-$totalO,2,',','.')."";     
//            
//        }
        else if( $countI > 0 AND $countO > 0 AND $total_payment != ($totalO - $totalI)) {
            $msg = "Total payment tidak sama dengan total detail jurnal"; 
        }
        // else if($totalOI !== $total_payment){
         //   $msg = "Jurnal header tidak balance dengan detail. <br><br> Header : ".number_format($total_payment,2,',','.')." <br> Detail : ".number_format($totalOI,2,',','.')."";   
         else {
            
              
            
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
