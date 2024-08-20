<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Cashier_Models_Payment_Dao extends Cashier_Box_Models_App_AbDao implements Cashier_Box_Models_App_BlackHole {

    private $ses;
    private $tempTipePaymentDelete;

    public function setSession($ses) {
        $this->ses = $ses;
    }

    public function setTempTipePaymentDelete($tipe) {
        $this->tempTipePaymentDelete = $tipe;
    }

    public function save(Cashier_Models_Payment_Payment $pay) {
        $hasil = 0;


        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();


  



        if (!array_key_exists('paymentdetail_id', $dcResult)) {
            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo());
        } else {
            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["denda"], $dcResult["description"]);
        }





        return $hasil;
    }
    
    public function saveFromCashier(Cashier_Models_Payment_Payment $pay,$dcResult,$dc,$ses,$r) {
        $hasil = 0;

       
        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        
        $cash = $pay->getPaymentCashier();
        
        
         
       
        
        if($cash->getKasbank() == "B") {
            $cash->setKasbank("BANK");
        }
        else {
            $cash->setKasbank("KAS");
        }

        $voucher = new Cashier_Models_Common();
        $param = array(
            "project_id" =>$ses->getProject()->getId(),
            "pt_id" => $r["pt_pt_id"],
            "module" => $cash->getKasbank(),
            "flag" => "1",
            "prefix" => $r["prefix_voucher"],
            "param_date" => $cash->getAcceptDate(),
        );
        $voc = $voucher->docNumberbyparam($param);
        
        if($voc) {
            $pay->setVoucherNo($voc);
        }
        else {
            return $hasil;
        }
        
        
        
        if (!array_key_exists('paymentdetail_id', $dcResult)) {
        
            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["denda"], $dcResult["description"]);
        }
        else {
      
            $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create', 
                    $pay->getAddBy(),
                    $pay->getNomor(),
                    $pay->getPurchaseletter()->getId(),
                    $pay->getFlag(), 
                    $pay->getPaymentMethod()->getId(),
                    $pay->getReferenceNo(),
                    $pay->getAmount(),
                    $pay->getTotal(),
                    $pay->getDate(),
                    $pay->getDueDate(),
                    $pay->getCairDate(),
                    $pay->getDescription(),
                    $pay->getIsReferenceRejected(),
                    $pay->getAdminFee(),
                    $pay->getDenda(),
                    $pay->getCdn(),
                    $pay->getCdnValue(),
                    $pay->getReceiptNo(),
                    $pay->getVoucherNo(),
                    $cash->getGroupTrans(),
                    intval($cash->getPrefix()) ? intval($cash->getPrefix()) : '',
                    intval($cash->getPrefix_id_bank()) ? intval($cash->getPrefix_id_bank()) : '',
                    $cash->getChequegiro_date(),
                    $cash->getChequegiro_no(),
                    $cash->getAcceptDate(),
                    intval($cash->getDepartment_id()) ? intval($cash->getDepartment_id()) : '',
                    $cash->getTransno(),
                    intval($cash->getThcoa_id()),
                    intval($cash->getVoucherprefix_id()),
                    $dc["description"],
                    $dc["code"],
                    $dc["coa_config_id"],
                    $dc["coa_config_detail_id"],
                    $dc["persen"],
                    $dc["coa_id"],
                    $dc["coa_name"],
                    $dc["type"],
                    $dc["amount"],
                    $dcResult["paymentdetail_id"],
                    $dcResult["schedule_id"],
                    $dcResult["paymenttype_id"],
                    $dcResult["payment"],
                    $dcResult["amount"], 
                    $dcResult["remaining_balance"],
                    $dcResult["denda"],
                    $dcResult["description"]);
        }
        

        return $hasil;
    }
    
    
    public function savePaymentCashier(Cashier_Models_Payment_Payment $pay, $r, $dc, $session) {
        $hasil = 0;


        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();
        $cash = $pay->getPaymentCashier();
   
        if($cash->getKasbank() == "B") {
            $cash->setKasbank("BANK");
        }
        else {
            $cash->setKasbank("KAS");
        }

       
        
        $voucher = new Cashier_Models_Common();
        $param = array(
            "project_id" =>$session->getProject()->getId(),
            "pt_id" => $r["pt_pt_id"],
            "module" => $cash->getKasbank(),
            "flag" => "1",
            "prefix" => $r["prefix_voucher"],
            "param_date" => $cash->getAcceptDate(),
        );
        $voc = $voucher->docNumberbyparam($param);
        
        if($voc) {
            $pay->setVoucherNo($voc);
        }
        else {
            return $hasil;
        }
        
  

        if (!array_key_exists('paymentdetail_id', $dcResult)) {
            $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create', $pay->getAddBy(), $pay->getNomor(), 
                    $pay->getPurchaseletter()->getId(), $pay->getFlag(), 
                    $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), 
                    $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), 
                    $pay->getCairDate(), $pay->getDescription(), 
                    $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), 
                    $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $pay->getVoucherNo(), 
                    $cash->getGroupTrans(), $cash->getPrefix(), $cash->getPrefix_id_bank(), $cash->getChequegiro_date(), 
                    $cash->getChequegiro_no(), $cash->getAcceptDate());
        } else {
            //kalau ada detail coa dan detail schedule
           
            $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create', 
                    $pay->getAddBy(),
                    $pay->getNomor(),
                    $pay->getPurchaseletter()->getId(),
                    $pay->getFlag(), 
                    $pay->getPaymentMethod()->getId(),
                    $pay->getReferenceNo(),
                    $pay->getAmount(),
                    $pay->getTotal(),
                    $pay->getDate(),
                    $pay->getDueDate(),
                    $pay->getCairDate(),
                    $pay->getDescription(),
                    $pay->getIsReferenceRejected(),
                    $pay->getAdminFee(),
                    $pay->getDenda(),
                    $pay->getCdn(),
                    $pay->getCdnValue(),
                    $pay->getReceiptNo(),
                    $pay->getVoucherNo(),
                    $cash->getGroupTrans(),
                    intval($cash->getPrefix()) ? intval($cash->getPrefix()) : '',
                    intval($cash->getPrefix_id_bank()) ? intval($cash->getPrefix_id_bank()) : '',
                    $cash->getChequegiro_date(),
                    $cash->getChequegiro_no(),
                    $cash->getAcceptDate(),
                    $cash->getDepartment_id(),
                    $cash->getTransno(),
                    intval($cash->getThcoa_id()),
                    intval($cash->getVoucherprefix_id()),
                    $dc["description"],
                    $dc["code"],
                    $dc["coa_config_id"],
                    $dc["coa_config_detail_id"],
                    $dc["persen"],
                    $dc["coa_id"],
                    $dc["coa_name"],
                    $dc["type"],
                    $dc["amount"],
                    $dcResult["paymentdetail_id"],
                    $dcResult["schedule_id"],
                    $dcResult["paymenttype_id"],
                    $dcResult["payment"],
                    $dcResult["amount"], 
                    $dcResult["remaining_balance"],
                    $dcResult["denda"],
                    $dcResult["description"]);
    
        }
        return $hasil;
    }
    
     public function updateNonLinkCashier(Cashier_Models_Payment_Payment $pay, Cashier_Models_Master_CustomerProfile $customer, Cashier_Box_Models_App_Decan $decan = NULL, $dc,$deletedCoa) {
        $hasil = 0;



        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if (intval($pay->getId()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();

        if (!array_key_exists('paymentdetail_id', $dcResult)) {
            $payDetail = new Cashier_Models_Payment_Detail();
            $dcResult = $payDetail->getArrayTable();
        }
        
        $cash = $pay->getPaymentCashier();
        
//        var_dump($cash->getChequegiro_date());
//        die())
       
  
        $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentv2_update',
                $pay->getAddBy(),
                $pay->getId(),
                $pay->getNomor(),
                $pay->getPurchaseletter()->getId(),
                $pay->getFlag(),
                $pay->getPaymentMethod()->getId(),
                $pay->getReferenceNo(),
                $pay->getAmount(),
                $pay->getTotal(),
                $pay->getDate(),
                $pay->getDueDate(), 
                $pay->getCairDate(),
                $pay->getDescription(),
                $pay->getIsReferenceRejected(),
                $pay->getAdminFee(),
                $pay->getDenda(),//here
                $cash->getGroupTrans(),
                intval($cash->getPrefix()),
                intval($cash->getPrefix_id_bank()),
                $cash->getChequegiro_date(),
                $cash->getChequegiro_no(),
                $cash->getAcceptDate(),
                $cash->getDepartment_id(),
                $cash->getTransno(),
                intval($cash->getThcoa_id()),
                intval($cash->getVoucherprefix_id()),
                $cash->getId(),
                $dc["description"],
                $dc["code"],
                $dc["coa_config_id"],
                $dc["coa_config_detail_id"],
                $dc["persen"],
                $dc["coa_id"],
                $dc["coa_name"],
                $dc["type"],
                $dc["amount"],//stop
                $dcResult["paymentdetail_id"],
                $dcResult["schedule_id"],
                $dcResult["paymenttype_id"],
                $dcResult["payment"],
                $dcResult["amount"], 
                $dcResult["remaining_balance"],
                $dcResult["description"],
                $decan->getString(),
                $customer->getName(),
                $customer->getAddress(),
                $customer->getCity()->getId(),
                $customer->getOfficePhone(),
                $customer->getHomePhone(),
                $customer->getMobilePhone(),
                $deletedCoa,
                $this->ses->getProject()->getId(),
                $this->ses->getPt()->getId()
                );



        return $hasil;
    }

    public function updateNonLink(Cashier_Models_Payment_Payment $pay, Cashier_Models_Master_CustomerProfile $customer, Cashier_Box_Models_App_Decan $decan = NULL) {
        $hasil = 0;



        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if (intval($pay->getId()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();

        if (!array_key_exists('paymentdetail_id', $dcResult)) {
            $payDetail = new Cashier_Models_Payment_Detail();
            $dcResult = $payDetail->getArrayTable();
        }


        $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["description"], $decan->getString(), $customer->getName(), $customer->getAddress(), $customer->getCity()->getId(), $customer->getOfficePhone(), $customer->getHomePhone(), $customer->getMobilePhone());






        return $hasil;
    }

    public function update(Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Decan $decan = NULL) {
        $hasil = 0;


     

        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if (intval($pay->getId()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();


        /* samakan nomor payment dengan nomor kwitansi */
        /*
          if (strlen($pay->getReceiptNo()) > 2) {
          $pay->setNomor($pay->getReceiptNo());
          }
         * 
         */




        // mark on 2 Juni 2016
        /*
          if (strlen($pay->getReferenceNo()) > 1) {
          $pay->setNomor($pay->getReferenceNo());
          }
         */

        // added 2 Juni 2016
        /*

         */
        
       



        if ($pay->getFlag() == Cashier_Box_Config::PAYMENTFLAG_SCHEDULE) {
            
            $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentsch_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getReceiptNo(), $pay->getDescription(), $pay->getDueDate(), $pay->getCairDate(), $pay->getReferenceNo());
        } else {
            if (!array_key_exists('paymentdetail_id', $dcResult)) {
                $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda());
            } else {
                $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["description"], $decan->getString(), '', '', '', '', '', '', '', '', '', '', $pay->getReceiptNo());
            }
        }


        // var_dump($this->dbTable);




        return $hasil;
    }
    
    public function updatePaymentCashier(Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Decan $decan = NULL) {
        $hasil = 0;

        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if (intval($pay->getId()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();

        if ($pay->getFlag() == Cashier_Box_Config::PAYMENTFLAG_SCHEDULE) {

            $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentsch_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getReceiptNo(), $pay->getDescription(), $pay->getDueDate(), $pay->getCairDate(), $pay->getReferenceNo());
        } else {
            if (!array_key_exists('paymentdetail_id', $dcResult)) {
                $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda());
            } else {
                $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["description"], $decan->getString(), '', '', '', '', '', '', '', '', '', '', $pay->getReceiptNo());
            }
        }
        return $hasil;
    }
    
     public function updatePaymentCashierv2(Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Decan $decan = NULL,$dc,$deletedCoa) {
        $hasil = 0;

        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        if (intval($pay->getId()) < 1) {
            return $hasil;
        }
        if ($pay->getFlag() == 0) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();
        $cash = $pay->getPaymentCashier();
        
  
        if ($pay->getFlag() == Cashier_Box_Config::PAYMENTFLAG_SCHEDULE) { //installment
            if (!array_key_exists('coa_config_detail_id', $dc)) { //kalau ga ada jurnal
                $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentsch_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getReceiptNo(), $pay->getDescription(), $pay->getDueDate(), $pay->getCairDate(), $pay->getReferenceNo());
            }
            else {
                
                $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_update', 
                        $pay->getAddBy(), $pay->getId(), 
                        $pay->getNomor(), $pay->getReceiptNo(), 
                        $pay->getDescription(), $pay->getDueDate(), 
                        $pay->getCairDate(), $pay->getReferenceNo(),//sini
                        $cash->getGroupTrans(),
                        intval($cash->getPrefix()),
                        intval($cash->getPrefix_id_bank()),
                        $cash->getChequegiro_date(),
                        $cash->getChequegiro_no(),
                        $cash->getAcceptDate(),
                        $cash->getDepartment_id(),
                        $cash->getTransno(),
                        intval($cash->getThcoa_id()),
                        intval($cash->getVoucherprefix_id()),
                        $cash->getId(),
                        $dc["description"],
                        $dc["code"],
                        $dc["coa_config_id"],
                        $dc["coa_config_detail_id"],
                        $dc["persen"],
                        $dc["coa_id"],
                        $dc["coa_name"],
                        $dc["type"],
                        $dc["amount"],
                        $deletedCoa
                        );
            }
          
            
        } else {//others
            if (!array_key_exists('paymentdetail_id', $dcResult)) { // kalau tidak ada detail
               
                $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashierv2_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda());
            }  else {
                     if (array_key_exists('coa_config_detail_id', $dc)) { //kalau ada detailcoa
                       
                        $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashierv2_update', 
                        $pay->getAddBy(),
                        $pay->getId(),
                        $pay->getNomor(),
                        $pay->getPurchaseletter()->getId(),
                        $pay->getFlag(),
                        $pay->getPaymentMethod()->getId(),
                        $pay->getReferenceNo(),
                        $pay->getAmount(),
                        $pay->getTotal(),
                        $pay->getDate(),
                        $pay->getDueDate(),
                        $pay->getCairDate(),
                        $pay->getDescription(),
                        $pay->getIsReferenceRejected(),
                        $pay->getAdminFee(), 
                        $pay->getDenda(),
                        $dcResult["paymentdetail_id"],
                        $dcResult["schedule_id"],
                        $dcResult["paymenttype_id"],
                        $dcResult["payment"],
                        $dcResult["amount"],
                        $dcResult["remaining_balance"],
                        $dcResult["description"], //11
                        $decan->getString(), '', '', '', '', '', '', '', '', '', '', 
                        $pay->getReceiptNo(),
                        $cash->getGroupTrans(),
                        intval($cash->getPrefix()),
                        intval($cash->getPrefix_id_bank()),
                        $cash->getChequegiro_date(),
                        $cash->getChequegiro_no(),
                        $cash->getAcceptDate(),
                        $cash->getDepartment_id(),
                        $cash->getTransno(),
                        intval($cash->getThcoa_id()),
                        intval($cash->getVoucherprefix_id()),
                        $cash->getId(),
                        $dc["description"],
                        $dc["code"],
                        $dc["coa_config_id"],
                        $dc["coa_config_detail_id"],
                        $dc["persen"],
                        $dc["coa_id"],
                        $dc["coa_name"],
                        $dc["type"],
                        $dc["amount"],
                        $deletedCoa
                        
                        );
                     }
                     else { //kalbau ga ada detailcoa
                        
                        $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashierv2_update', 
                        $pay->getAddBy(),
                        $pay->getId(),
                        $pay->getNomor(),
                        $pay->getPurchaseletter()->getId(),
                        $pay->getFlag(),
                        $pay->getPaymentMethod()->getId(),
                        $pay->getReferenceNo(),
                        $pay->getAmount(),
                        $pay->getTotal(),
                        $pay->getDate(),
                        $pay->getDueDate(),
                        $pay->getCairDate(),
                        $pay->getDescription(),
                        $pay->getIsReferenceRejected(),
                        $pay->getAdminFee(), 
                        $pay->getDenda(),
                        $dcResult["paymentdetail_id"],
                        $dcResult["schedule_id"],
                        $dcResult["paymenttype_id"],
                        $dcResult["payment"],
                        $dcResult["amount"],
                        $dcResult["remaining_balance"],
                        $dcResult["description"],
                        $decan->getString(), '', '', '', '', '', '', '', '', '', '', 
                        $pay->getReceiptNo());
                     }
            }
        }
        return $hasil;
    }

    public function saveNonlink(Cashier_Models_Payment_Payment $pay, Cashier_Models_Master_CustomerProfile $customer) {
        $hasil = 0;
        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();

        if (!array_key_exists('paymentdetail_id', $dcResult)) {
            $payDetail = new Cashier_Models_Payment_Detail();
            $dcResult = $payDetail->getArrayTable();
        }

        $projectId = $this->ses ? $this->ses->getProject()->getId() : NULL;
        $ptId = $this->ses ? $this->ses->getPt()->getId() : NULL;

        $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), (int) $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["denda"], $dcResult["description"], $customer->getName(), $customer->getAddress(), $customer->getCity()->getId(), $customer->getOfficePhone(), $customer->getHomePhone(), $customer->getMobilePhone(), '', '', '', '', $projectId, $ptId);

        return $hasil;
    }
    
        public function saveNonlinkWithCashier(Cashier_Models_Payment_Payment $pay, Cashier_Models_Master_CustomerProfile $customer,$dc,$session,$r) {
        $hasil = 0;
        if (intval($pay->getAddBy()) < 1) {
            return $hasil;
        }
        $dcResult = $pay->getDCResult();

        if (!array_key_exists('paymentdetail_id', $dcResult)) {
            $payDetail = new Cashier_Models_Payment_Detail();
            $dcResult = $payDetail->getArrayTable();
        }

        $projectId = $this->ses ? $this->ses->getProject()->getId() : NULL;
        $ptId = $this->ses ? $this->ses->getPt()->getId() : NULL;
        
        $cash = $pay->getPaymentCashier();
        
        if($cash->getKasbank() == "B") {
            $cash->setKasbank("BANK");
        }
        else {
            $cash->setKasbank("KAS");
        }
        
   
        $voucher = new Cashier_Models_Common();
        $param = array(
            "project_id" =>$session->getProject()->getId(),
            "pt_id" => $r["pt_pt_id"],
            "module" => $cash->getKasbank(),
            "flag" => "1",
            "prefix" => $r["prefix_voucher"],
            "param_date" => $cash->getAcceptDate(),
        );
        $voc = $voucher->docNumberbyparam($param);
        
        if($voc) {
            $pay->setVoucherNo($voc);
        }
        else {
            return $hasil;
        }
        
      
        
        $hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create',
                $pay->getAddBy(),
                $pay->getNomor(), (int) 
                $pay->getPurchaseletter()->getId(),
                $pay->getFlag(), 
                $pay->getPaymentMethod()->getId(),
                $pay->getReferenceNo(),
                $pay->getAmount(),
                $pay->getTotal(), 
                $pay->getDate(),
                $pay->getDueDate(),
                $pay->getCairDate(),
                $pay->getDescription(),
                $pay->getIsReferenceRejected(),
                $pay->getAdminFee(),
                $pay->getDenda(), 
                $pay->getCdn(),
                $pay->getCdnValue(),
                $pay->getReceiptNo(),//here
                $pay->getVoucherNo(),
                $cash->getGroupTrans(),
                intval($cash->getPrefix()),
                intval($cash->getPrefix_id_bank()),
                $cash->getChequegiro_date(),
                $cash->getChequegiro_no(),
                $cash->getAcceptDate(),
                $cash->getDepartment_id(),
                $cash->getTransno(),
                intval($cash->getThcoa_id()),
                intval($cash->getVoucherprefix_id()),
                $dc["description"],
                $dc["code"],
                $dc["coa_config_id"],
                $dc["coa_config_detail_id"],
                $dc["persen"],
                $dc["coa_id"],
                $dc["coa_name"],
                $dc["type"],
                $dc["amount"],
                //stop
                $dcResult["paymentdetail_id"],
                $dcResult["schedule_id"],
                $dcResult["paymenttype_id"],
                $dcResult["payment"],
                $dcResult["amount"],
                $dcResult["remaining_balance"],
                $dcResult["denda"],
                $dcResult["description"],
                $customer->getName(),
                $customer->getAddress(),
                $customer->getCity()->getId(),
                $customer->getOfficePhone(), 
                $customer->getHomePhone(),
                $customer->getMobilePhone(),
                '', '', '', '',
                $projectId,
                $ptId);

        return $hasil;
    }

    public function rollbackScheduleDenda($dcResult) {
        $hasil = 0;

        $this->dbTable->SPUpdate('sp_otherspaymentdenda_destroy', $dcResult["schedule_id"], $dcResult["remaining_denda"]);

        return $hasil;
    }

    public function getDetail(Cashier_Models_Payment_Payment $pay) {
        $hasil = array();
        if ($pay->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_schedulewithpayment_read', $pay->getId());

        return $hasil;
    }
    
    public function getAllCairKosong(Cashier_Box_Models_App_HasilRequestRead $r,$projectId,$ptId) {
        $hasil = array();
  
        $hasil = $this->dbTable->SPExecute('sp_popupcairkosong_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$r->getOthersValue("unit_unit_number"),$r->getOthersValue("salesman_employee_name"));

        return $hasil;
    }

    public function getDetailByArrayIds($arIds) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_paymentdetailids_read', $arIds);

        return $hasil;
    }

    public function receipeExist(Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Session $ses) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_paymentkwitansiexist_read', $pay->getReceiptNo(), $ses->getProject()->getId(), $ses->getPt()->getId());

        return $hasil;
    }

    //

    public function getPaymentDetail(Cashier_Models_Payment_Payment $pay) {
        $hasil = array();
        if ($pay->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_paymentdetail_read', $pay->getId());

        return $hasil;
    }

    public function getOthersPayDetail(Cashier_Models_Payment_Payment $pay) {
        $hasil = array();
        if ($pay->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_otherspaymentdetail_read', $pay->getId());

        return $hasil;
    }

    /* PAYMENT SCHEDULE */

    public function getAll(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Session $ses) {
        $hasil = array();

      
        
        $hasil = $this->dbTable->spToQuery("sp_installmentpayment_read",$r->getPage(), $r->getLimit(), $pay->getFlag(), $ses->getProject()->getId(), 
            $ses->getPt()->getId(), intval($r->getOthersValue("cluster_id")), 
            $r->getOthersValue("payment_no"), $r->getOthersValue("customer_name"),
            intval($r->getOthersValue("block_id")), intval($r->getOthersValue("paymentmethod_id")), 
            $r->getOthersValue("unit_number"), $r->getOthersValue("receipt_no"),$r->getOthersValue("virtualaccount_bca"),$r->getOthersValue("customer_no"));

        return $hasil;
    }
    public function getAllWithCashier(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Session $ses) {
        $hasil = array();

   
        
        $hasil = $this->dbTable->spToQuery("sp_installmentpaymentwithcashier_read",$r->getPage(), $r->getLimit(), $pay->getFlag(), $ses->getProject()->getId(), 
            $ses->getPt()->getId(), intval($r->getOthersValue("cluster_id")), 
            $r->getOthersValue("payment_no"), $r->getOthersValue("customer_name"),
            intval($r->getOthersValue("block_id")), intval($r->getOthersValue("paymentmethod_id")), 
            $r->getOthersValue("unit_number"), $r->getOthersValue("receipt_no"));

        return $hasil;
    }

    /*
     * mark on 20170914
      public function getAll(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Payment_Payment $pay, Cashier_Box_Models_App_Session $ses) {
      $hasil = array();

      $hasil = $this->dbTable->SPExecute('sp_installmentpayment_read', $r->getPage(), $r->getLimit(), $pay->getFlag(), $ses->getProject()->getId(), $ses->getPt()->getId(), $r->getOthersValue("cluster_id"), $r->getOthersValue("payment_no"), $r->getOthersValue("customer_name"), $r->getOthersValue("block_id"), $r->getOthersValue("paymentmethod_id"), $r->getOthersValue("unit_number"), $r->getOthersValue("receipt_no"));

      return $hasil;
      }
     */

    public function getAllB($page, $limit, $flag, $projectId, $ptId, $clusterId, $paymentNo, $customerNo, $blokId, $paymentMethodId, $unitNumber, $receiptNumber) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_installmentpayment_read', $page, $limit, $flag, $projectId, $ptId, $clusterId, $paymentNo, $customerNo, $blokId, $paymentMethodId, $unitNumber, $receiptNumber);

        return $hasil;
    }

    public function getOtherPaymentByPaymentType($project, $pt, $page, $limit, $purchaseId, $paymentCode) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_otherpaymentbypaymenttype_read', $project, $pt, $page, $limit, $purchaseId, $paymentCode);

        return $hasil;
    }

    public function getOne(Cashier_Models_Payment_Payment $pay) {
        $hasil = array();
        if ($pay->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetail_read', $pay->getId());

        return $hasil;
    }
    public function getOnev2(Cashier_Models_Payment_Payment $pay) {
        $hasil = array();
        if ($pay->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetailv2_read', $pay->getId());
        
        if($hasil) {
            if($hasil[1][0]["paymentcashier_kasbank"] == "BANK") {
                $hasil[1][0]["paymentcashier_prefix_id_bank"] = $hasil[1][0]["paymentcashier_prefix_id"];     
            }
        }

        return $hasil;
    }

    public function getByGroup($ids) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetailbanyak_read', $ids);

        return $hasil;
    }

    public function getByPurchaseletter($purchaseletterId) {

        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_installmentpayment_v2_read', $purchaseletterId);

        return $hasil;
    }

    public function directDelete(\Cashier_Box_Models_App_Decan $decan, \Cashier_Box_Kouti_InterSession $session) {
        $row = 0;


        $ds = $decan->getString();

        $arIds = explode("~", $ds);






        // for other payment 
        if ($this->tempTipePaymentDelete == Cashier_Box_Config::PAYMENTFLAG_OTHERS) {
            if (count($arIds) == 1) {

                // get detail
                $payFilter = new Cashier_Models_Payment_Payment();
                $payFilter->setId($arIds[0]);
                $paymentDetails = $this->getOthersPayDetail($payFilter);
                $paymentDetails = Cashier_Box_Tools::toObjectResult($paymentDetails, new Cashier_Models_Payment_Detail(), array(new Cashier_Models_Master_PaymentType(), new Cashier_Models_Purchaseletter_Schedule()));

                $allScheduleDenda = array();
                foreach ($paymentDetails as $pd) {
                    if ($pd->getPaymentType()->getName() == "DENDA") {

                        $scheduleRollbackDenda = new Cashier_Models_Purchaseletter_Schedule();
                        $scheduleRollbackDenda->setId($pd->getSchedule()->getId());
                        $scheduleRollbackDenda->setRemainingDenda($pd->getPayment());
                        $allScheduleDenda[] = $scheduleRollbackDenda;
                    }
                }

                if (count($allScheduleDenda) > 0) {
                    $decan = Box_Tools::toDecan($allScheduleDenda);
                    $dcResult = $decan->getDCResult();
                    $this->dbTable->SPUpdate('sp_otherspaymentdenda_destroy', $dcResult["schedule_id"], $dcResult["remaining_denda"]);
                }


                $row = $this->dbTable->SPUpdate('sp_installmentpayment_destroy', $ds, $session->getUserId());
            }
            // for non link payment
        } else if ($this->tempTipePaymentDelete == Cashier_Box_Config::PAYMENTFLAG_NONLINK) {

            $row = $this->dbTable->SPUpdate('sp_installmentpayment_destroy', $ds, $session->getUserId());
        } else {
            /// UNTUK PAYMENT SCHEDULE

            /* make sure cuma 1 id yg di delete */
            if (count($arIds) == 1) {
                $idPayment = intval($ds);




                $payment = new Cashier_Models_Payment_Payment();
                $payment->setId($idPayment);
                if (Cashier_Models_Payment_PaymentDestroyer::isPaymentSchedule($payment)) {
                    $destroyer = new Cashier_Models_Payment_PaymentDestroyer();
                    $destroyer->setPayment($payment);
                    $destroyer->run();



                    if ($destroyer->getStatus()) {
                        $dsp = $destroyer->getDecanStringPaymentDetail();
                        $dsch = $destroyer->getDecanStringSch();
                        $fixPaymentAmount = 0;
                        if ($payment->getCdn() == Cashier_Box_Config::CDN_CREDIT || $payment->getCdn() == Cashier_Box_Config::CDN_DEBIT) {
                            $fixPaymentAmount = $payment->getAmount() - $payment->getCdnValue();
                        } else {
                            $fixPaymentAmount = $payment->getAmount();
                        }

                        /*
                          var_dump($dsp["paymentdetail_id"],$dsch["schedule_id"],$dsch["remaining_balance"]);

                          die();
                         */


                        $row = $this->dbTable->SPUpdate('sp_paymentschedule_destroy', $payment->getId(), $fixPaymentAmount, $dsch["schedule_id"], $dsch["remaining_balance"], $dsp["paymentdetail_id"], $session->getUserId());






                        return $row;
                    } else {
                        return 0;
                    }
                }
            }
        }

        return $row;
    }
    
    
    public function deleteFromCashier($ids, \Cashier_Box_Kouti_InterSession $session) {
        $row = 0;


      

        $arIds = $ids;






        // for other payment 
        if ($this->tempTipePaymentDelete == Cashier_Box_Config::PAYMENTFLAG_OTHERS) {
            if (count($arIds) == 1) {

                // get detail
                $payFilter = new Cashier_Models_Payment_Payment();
                $payFilter->setId($arIds[0]);
                $paymentDetails = $this->getOthersPayDetail($payFilter);
                $paymentDetails = Cashier_Box_Tools::toObjectResult($paymentDetails, new Cashier_Models_Payment_Detail(), array(new Cashier_Models_Master_PaymentType(), new Cashier_Models_Purchaseletter_Schedule()));

                $allScheduleDenda = array();
                foreach ($paymentDetails as $pd) {
                    if ($pd->getPaymentType()->getName() == "DENDA") {

                        $scheduleRollbackDenda = new Cashier_Models_Purchaseletter_Schedule();
                        $scheduleRollbackDenda->setId($pd->getSchedule()->getId());
                        $scheduleRollbackDenda->setRemainingDenda($pd->getPayment());
                        $allScheduleDenda[] = $scheduleRollbackDenda;
                    }
                }

                if (count($allScheduleDenda) > 0) {
                    $decan = Box_Tools::toDecan($allScheduleDenda);
                    $dcResult = $decan->getDCResult();
                    $this->dbTable->SPUpdate('sp_otherspaymentdenda_destroy', $dcResult["schedule_id"], $dcResult["remaining_denda"]);
                }


                $row = $this->dbTable->SPUpdate('sp_installmentpayment_destroy', $ds, $session->getUserId());
            }
            // for non link payment
        } else if ($this->tempTipePaymentDelete == Cashier_Box_Config::PAYMENTFLAG_NONLINK) {

            $row = $this->dbTable->SPUpdate('sp_installmentpayment_destroy', $ds, $session->getUserId());
        } else {
            /// UNTUK PAYMENT SCHEDULE

            /* make sure cuma 1 id yg di delete */
            if (count($arIds) == 1) {
                $idPayment = intval($arIds[0]);




                $payment = new Cashier_Models_Payment_Payment();
                $payment->setId($idPayment);
                if (Cashier_Models_Payment_PaymentDestroyer::isPaymentSchedule($payment)) {
                    $destroyer = new Cashier_Models_Payment_PaymentDestroyer();
                    $destroyer->setPayment($payment);
                    $destroyer->run();



                    if ($destroyer->getStatus()) {
                        $dsp = $destroyer->getDecanStringPaymentDetail();
                        $dsch = $destroyer->getDecanStringSch();
                        $fixPaymentAmount = 0;
                        if ($payment->getCdn() == Cashier_Box_Config::CDN_CREDIT || $payment->getCdn() == Cashier_Box_Config::CDN_DEBIT) {
                            $fixPaymentAmount = $payment->getAmount() - $payment->getCdnValue();
                        } else {
                            $fixPaymentAmount = $payment->getAmount();
                        }

                        /*
                          var_dump($dsp["paymentdetail_id"],$dsch["schedule_id"],$dsch["remaining_balance"]);

                          die();
                         */


                        $row = $this->dbTable->SPUpdate('sp_paymentschedule_destroy', $payment->getId(), $fixPaymentAmount, $dsch["schedule_id"], $dsch["remaining_balance"], $dsp["paymentdetail_id"], $session->getUserId());






                        return $row;
                    } else {
                        return 0;
                    }
                }
            }
        }

        return $row;
    }

}

?>
