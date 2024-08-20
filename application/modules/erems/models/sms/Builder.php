<?php

/**
 * Description of Builder
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Sms_Builder {
    
    
    public function proses($params){
        
        $dataCustomer = $this->switcher("AMBIL_DATA_CUSTOMER",$params,$params["smscategory_code"],NULL);
        
                
        return $this->buatSms($dataCustomer,$params);
    }
    
    
    
    
    private function switcher($modul,$params,$smsCategoryCode,$customerInfo){
        $dataCustomer = NULL;
        $dao = new Erems_Models_Sms_Dao();
        if ($smsCategoryCode == Erems_Box_Config::SMSCAT_TAGIHAN) { /// TAGIHAN
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllTagihan($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[duedate]",date("d-m-Y",  strtotime($customerInfo["duedate"])), $template);
               $template = str_replace("[uang]",number_format($customerInfo["uang"]), $template);
               $template = str_replace("[pt_name]",$customerInfo["pt_name"], $template);
               $template = str_replace("[rekening]",$customerInfo["pt_rekening"], $template);
               $template = str_replace("[unit_number]",$customerInfo["unit_number"], $template);
               return $template;
               //return $params["template"];
            }
            
        } else if ($smsCategoryCode == Erems_Box_Config::SMSCAT_REMINDTAG) { /// REMINDER TAGIHAN
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllReminderTagihan($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"],3);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[duedate]",date("d-m-Y",  strtotime($customerInfo["duedate"])), $template);
               $template = str_replace("[uang]",number_format($customerInfo["uang"]), $template);
               $template = str_replace("[pt_name]",$customerInfo["pt_name"], $template);
               $template = str_replace("[rekening]",$customerInfo["pt_rekening"], $template);
               $template = str_replace("[unit_number]",$customerInfo["unit_number"], $template);
               return $template;
               //return $params["template"];
            }
            
              
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_BERKAS) { /// BERKAS
            
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllBerkas($params["project_id"],$params["pt_id"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               
               $template = $params["template"];
               $template = str_replace("[unit]",$customerInfo["unit_number"], $template);
               $template = str_replace("[customer_name]",$customerInfo["customer_name"], $template);
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_WAWANCARA) { /// WAWANCARA
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllWawancara($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[interview_plandate]",date("d-m-Y",  strtotime($customerInfo["interviewplan_date"])), $template);
               $template = str_replace("[pic]","MR. BENDER", $template);
               return $template;
            }
            
            // $dataCustomer = $dao->getAllWawancara($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_INLISTRIK) { /// INFO LISTRIK
            // $dataCustomer = $dao->getAllTagihan();
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_KPRACC) { /// KPR ACC
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllKprAcc($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[bank_name]",$customerInfo["bank_name"], $template);
               $template = str_replace("[kpr_realisation]",number_format($customerInfo["kpr_realisation"]), $template);
               $template = str_replace("[customer_name]",$customerInfo["customer_name"], $template);
              
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_AKAD) { /// AKAD
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllAkad($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[akadplan_date]",date("d-m-Y",  strtotime($customerInfo["akadplan_date"])), $template);
              
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_SETERIMA) { /// SERAHTERIMA
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllSerahTerima($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[unit_number]",$customerInfo["unit_number"], $template);
              
               return $template;
            }
            //  $dataCustomer = $dao->getAllTagihan();
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_INPDAM) { /// INFO PDAM
            // belum ada
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_INNATAL) { ///  INFO NATAL
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllHariRaya($params["project_id"],$params["pt_id"],1);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
              
              
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_INFITRI) { /// INFO IDUL FITRI
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllHariRaya($params["project_id"],$params["pt_id"],2);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
              
              
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_INPROSPEK) { /// INFO PROSPEK
        
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllProspek($params["project_id"],$params["pt_id"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
              
              
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_AJB) { /// AJB
            if($modul=="AMBIL_DATA_CUSTOMER"){
               return $dao->getAllAjb($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
               $template = str_replace("[customer_name]",$customerInfo["customer_name"], $template);
              
               return $template;
            }
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_INKEUANGAN) { /// INFO KEUANGAN
            // $dataCustomer = $dao->getAllTagihan();
        } else if ($smsCategoryCode ==  Erems_Box_Config::SMSCAT_SUDAHBAYAR) { ///  INFO TERIMAKASIH BAYAR
            if($modul=="AMBIL_DATA_CUSTOMER"){
              //  return $dao->getAllReminderTagihan($params["project_id"],$params["pt_id"],$params["start_date"],$params["end_date"],3);
                  return $dao->getAllSudahBayarB($params["project_id"],$params["pt_id"],$params["process_date"]);
            }else if($modul=="TEMPLATE_KONTEN"){
               $template = $params["template"];
                $template = str_replace("[unit_number]",$customerInfo["unit_number"], $template);
               $template = str_replace("[payment_date]",$customerInfo["payment_date"], $template);
              
               return $template;
            }
        }
    }
    
    
    
    private function buatSms($dataCustomer,$params){
        $allSMS = array();
        
        if ($dataCustomer) {
            //   var_dump($tagihan);
            $allCustomer = $dataCustomer[0];
            
         
            
            foreach ($allCustomer as $customer) {
                //    var_dump($customer);
                $sms = new Erems_Models_Sms_SMS();
                $sms->getProject()->setId($params["project_id"]);
                $sms->getPt()->setId($params["pt_id"]);
                $sms->getPurchaseletter()->setId($customer["purchaseletter_id"]);
                $sms->getCustomer()->setId($customer["customer_id"]);
                $sms->setPhoneNumber($customer["customer_mobilephone"]);
                $sms->getSMSCategory()->setId($params["smscategory_id"]);
                $sms->setFlagType(0);
                $sms->setProcessDate($params["process_date"]);
                $sms->setCollectorId(0);
                $sms->setNotes($this->switcher("TEMPLATE_KONTEN",$params,$params["smscategory_code"],$customer));
                $sms->setDuedate($customer['duedate']);
                $sms->setAmount($customer['uang']);
                $allSMS[] = $sms;
            }

            
        }
        
        return $allSMS;
    }
    
    
}
