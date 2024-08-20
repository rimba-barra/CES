<?php

/**
 * Description of cashierpaymenterems
 *
 * @author Semy MIS
 */
class Erems_Models_App_Box_PaymentProcessorCashier extends Erems_Models_App_Box_PaymentProcessor {

    
    public function daoSave($dao, $payment) {
        $data = $this->getData();
        $payment = $this->calculatePayment($payment);
        $detail = $data['detailcoa'];
        $allDetail = array();
        
        foreach ($detail as $row){
            $d = new Erems_Models_Master_CoaConfigDetail();
            $d->setArrayTable($row);
           
            $allDetail[] = $d;
        }
        $decanResult = Erems_Box_Tools::toDecan($allDetail);
        if ($payment->getFlag() == Erems_Box_Config::PAYMENTFLAG_NONLINK) {
            $payment->setNomor($payment->getReferenceNo());
            return $dao->saveNonlinkWithCashier($payment, $payment->getCustomer(),$decanResult->getDCResult(),$this->getSession(),$data);
        } else {

       
       // $cash = new Erems_Models_Payment_PaymentCashier();
        //$cash->setArrayTable($data);
            return $dao->savePaymentCashier($payment,$data,$decanResult->getDCResult(),$this->getSession());
        }
    }
    
    
    public function daoUpdate($dao, $object) {

        $decan = NULL;
        $deletedDendas = array();
        $object = $this->calculatePayment($object);
        

        if (in_array($object->getFlag(), array(Erems_Box_Config::PAYMENTFLAG_SCHEDULE, Erems_Box_Config::PAYMENTFLAG_OTHERS, Erems_Box_Config::PAYMENTFLAG_NONLINK))) {
            $data = $this->getData();
            if ($object->getId() > 0) {
                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
                $de->setDelimiterCandidate($decan);
                $de->generate();
            }
        }

        ///// MEMPROSES INFORMASI DENDA DI OTHERSPAYMENT
        if ($object->getFlag() == Erems_Box_Config::PAYMENTFLAG_OTHERS) {


            $details = $object->getDCResult();
            //  $details["paymentdetail_id"] = "";
            $allDetails = $dao->getDetailByArrayIds($details["paymentdetail_id"]);
            $allDetails = Erems_Box_Tools::toObjectResult($allDetails, new Erems_Models_Payment_Detail(), array(new Erems_Models_Master_PaymentType()));


            foreach ($allDetails as $detail) {
                if ($detail instanceof Erems_Models_Payment_Detail) {
                    if ($detail->getPaymentType()->getName() == "DENDA") {

                        foreach ($object->getDetail() as $objectDetail) {
                            /// mapping ke payment detail object yang idnya sama
                            if ($objectDetail->getId() == $detail->getId()) {
                                /// cek jika ada payment detail tipe denda yang diganti dengan yg tipe bukan denda
                                if ($objectDetail->getPaymentType()->getId() != $detail->getPaymentType()->getId()) {

                                    $deletedDendas[] = $detail;
                                }
                            }
                        }
                    }
                }
            }


            /// cek di deleted rows yg tipe denda
            /// jika tipenya denda maka ikut digabungkan ke list deletedDenda
            $dcResultDeletedRows = $decan->getDCResult();
            if (key_exists("key", $dcResultDeletedRows)) {
                $allDetailsDeleted = $dao->getDetailByArrayIds($dcResultDeletedRows["key"]);
                $allDetailsDeleted = Erems_Box_Tools::toObjectResult($allDetailsDeleted, new Erems_Models_Payment_Detail(), array(new Erems_Models_Master_PaymentType()));
                foreach ($allDetailsDeleted as $detail) {
                    if ($detail instanceof Erems_Models_Payment_Detail) {
                        if ($detail->getPaymentType()->getName() == "DENDA") {

                            $deletedDendas[] = $detail;
                        }
                    }
                }
            }
        }
        
        
        $data = $this->getData();
        $detail = $data['detailcoa'];
        $allDetail = array();
        
        foreach ($detail as $row){
            $d = new Erems_Models_Master_CoaConfigDetail();
            $d->setArrayTable($row);         
            $allDetail[] = $d;
        }
        $decanResultCashier = Erems_Box_Tools::toDecan($allDetail);
        
        if(!empty($data["deletedCoa"])) {
            $deletedCoa = implode("~",$data["deletedCoa"]);
        }
        else {
            $deletedCoa = 0;
        }
        
     


        if ($object->getFlag() == Erems_Box_Config::PAYMENTFLAG_NONLINK) {
           
            $object->setNomor($object->getReferenceNo());
            return $dao->updateNonLinkCashier($object, $object->getCustomer(), $decan, $decanResultCashier->getDCResult(),$deletedCoa);
            /* ADDED 24 Mei 2016 */
        } else if ($object->getFlag() == Erems_Box_Config::PAYMENTFLAG_OTHERS) {
            if (count($deletedDendas) > 0) {
                $allScheduleDenda = array();
                foreach ($deletedDendas as $dd) {
                    $scheduleRollbackDenda = new Erems_Models_Purchaseletter_Schedule();
                    $scheduleRollbackDenda->setId($dd->getSchedule()->getId());
                    $scheduleRollbackDenda->setRemainingDenda($dd->getPayment());
                    $allScheduleDenda[] = $scheduleRollbackDenda;
                }

                if (count($allScheduleDenda) > 0) {
                    $decansd = Box_Tools::toDecan($allScheduleDenda);
                    $dcResultsd = $decansd->getDCResult();
                    $dao->rollbackScheduleDenda($dcResultsd);
                }
            }
            return $dao->updatePaymentCashierv2($object, $decan,$decanResultCashier->getDCResult(),$deletedCoa);
        } else {
            return $dao->updatePaymentCashierv2($object, $decan, $decanResultCashier->getDCResult(),$deletedCoa);
        }
    }

}

?>
