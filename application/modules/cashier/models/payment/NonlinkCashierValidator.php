<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Cashier_Models_Payment_NonlinkCashierValidator extends Cashier_Box_Models_App_Validator {

     private $session;
    public $dataValidator;
    
     public function _toInt($str)
    {
        return (int)preg_replace("/([^0-9\\.])/i", "", $str);
    }
    
        public function setSession(Cashier_Box_Models_App_Session $ses){
        $this->session = $ses;
    }
    
    public function run(Cashier_Models_Payment_Payment $pay) {
        $msg = "";
        $paymentmethodId = (int) $pay->getPaymentMethod()->getId();
        $isCash = FALSE;
        $isCash = $paymentmethodId == Cashier_Box_Config::PAYMENTMETHOD_CASH ? TRUE : FALSE;
        $customer = $pay->getCustomer();
        
        
//        $data = array();
//        $data = $this->dataValidator;
//        $detail = array();
//        $detail = $data['detailcoa'];
//        
//      
//        
//        if($detail) {
//            if(in_array('O', array_column($detail, 'type'))) { // search value in the array
//                $filter = array("O");
//                $newArrayO = array_filter($detail, function($e) use ($filter){
//                        return in_array($e['type'], $filter);
//                });  
//            }
//            
//            
//            
//            if(isset($newArrayO)) {
//                $sumO = array();
//                    foreach($newArrayO as $dataO) {
//                        $sumO[] = $dataO["amount"];
//                    }     
//                }
//
//                $totalO = round(array_sum($sumO),2);
//                 
//                
//        } 
//        else {
//            $totalO = 0;
//        }
        
        
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
     
        if ($paymentmethodId == 0) {
            $msg = "Please insert payment method";
        } else if ($pay->getAmount() == 0) {
            $msg = "Please insert payment value";
        } else if ($pay->getPaymentMethod()->getId() == 0) {
            $msg = "Please insert payment method";
        } else if (strlen($pay->getReferenceNo()) == 0 && !$isCash) {
            $msg = "Please insert reference number";
        } else if (!$pay->getDate()) {
            $msg = "Please insert payment date";
        } else if (!$isCash && !$pay->getDueDate()) {
            $msg = "Please insert due date";
        } else if(!$pay->getVoucherNo()){
            $msg = "Document number not generated";    
        } else if(!$data["paymentcashier_grouptrans_id"]){
            $msg = "Please select Group Trans";   
        } 
         else if( $countI == 0 AND $countO == 0) {
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
        
        else {
            if ($customer instanceof Cashier_Models_Master_CustomerProfile) {
                if (strlen($customer->getName()) < 5) {
                    $msg = "Name minimum 5 characters";
                } 
				
				/* 7/25/2017 - removed validation by David
				else if (strlen($customer->getAddress()) < 5) {
                    $msg = "Address minimum 5 characters";
                } 
				*/
				
				else if ($customer->getCity()->getId() == 0) {
                    $msg = "Invalid City";
                } 
				/* 7/25/2017 - removed validation by David
				else if (strlen($customer->getHomePhone()) < 7 || !$this->isDigit($customer->getHomePhone())) {
                    $msg = "Home Phone minimum 7 characters and digits only allowed";
                } 
				*/
				else {
                    if ($isCash) {
                        $pay->setDueDate($pay->getDate());
                        $pay->setCairDate($pay->getDate());
                    }

                    $this->setStatus(TRUE);
                }
            }else{
                $msg = "Invalid customer";
            }
        }
        $this->setMsg($msg);
    }

}

?>
