<?php

class Erems_InstallmentpaymentController extends Erems_Models_App_Controller {

    function readAction() {
        $app = new Erems_Models_App_Models_ReadWorms($this);
        
     //    $app = new Erems_Models_App_Models_ReadWorms($this,"read_unit");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        
        switch ($mr) {
            case "all":
                $dataList = new Erems_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb'));
                $app->registerDataList('pay', $dataList);
                $dao = new Erems_Models_Payment_Dao();
                $payment = new Erems_Models_Payment_Payment();
                $payment->setFlag(Erems_Models_App_Config::getv("PAYMENTFLAG_SCHEDULE"));
             
                $hasil = $dao->getAll($r, $payment,$app->getSession());
                $app->setRequestModel(TRUE);
                $app->prosesDao("pay", $hasil);
                break;
            case "detail":
                $dataList = new Erems_Models_App_DataListCreator('', 'payment', array('purchaseletter', 'unitb', 'clusterb', 'block', 'productcategory', 'type', 'customerprofile', 'paymentmethod'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Payment_Dao();
                $payment = new Erems_Models_Payment_Payment();
                $payment->setArrayTable($app->getData());
                $hasil = $dao->getOne($payment);
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'unitb', array());
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Unit_UnitDao();
                $unitTran = new Erems_Models_Unit_UnitTran();
                $unitTran->setProject($app->getSession()->getProject());
                $unitTran->setPt($app->getSession()->getPt());
                $unitTran->setStatus(Erems_Models_App_Config::getv("UNITSTATUS_SOLD"));
                $hasil = $dao->getAll($r, $unitTran);
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "selected_unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('pricetype', 'customer', 'unittran', 'salesman', 'collector', 'price', 'billingrulestran', 'type'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $unit = new Erems_Models_Unit_Unit();
                $unit->setArrayTable($app->getData());

                $hasil = $dao->getOneChangePriceRequested($unit);

                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "tagihan":
                $dataList = new Erems_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'payment'));
                $app->registerDataList('schedule', $dataList);

                $hasil = array();
                $otherReq = $r->getOthers();
                if ($otherReq["data_request"] == "tagihan") {
                    $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                    $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
                    $purchaseletter->setArrayTable($app->getData());
                    $hasil = $dao->getScheduleById($purchaseletter);
                } else {
                    $dao = new Erems_Models_Payment_Dao();
                    $payment = new Erems_Models_Payment_Payment();
                    $payment->setArrayTable($app->getData());
                    $hasil = $dao->getDetail($payment);
                }

                $app->setRequestModel(TRUE);
                $app->prosesDao("schedule", $hasil);
                break;
            case "type":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Type());
                break;
            case "paymentmethod":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_PaymentMethod());
                break;
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
        //  $app = new Erems_Models_App_Models_Create($this, "create_customer");
        $msg = "Invalid Request";
        $success = FALSE;

        $payment = new Erems_Models_Payment_Payment();
        $app->prosesData($payment);
        // $payment->setAmount(30000000);

        $validator = new Erems_Models_Payment_Validator();
        $validator->run($payment);

        if ($validator->getStatus()) {
            $paymentProcessor = new Erems_Models_Payment_PaymentProcessor();
            $paymentProcessor->setPayment($payment);

            $paymentProcessor->run();
            $paymentDetail = $paymentProcessor->getPaymentDetail();

            $payment->setNomor(Erems_Models_App_DocPrefixGenerator::get("PAYMENT"));

            $de = new Erems_Libraries_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($payment);
            $de->generate();

            $dao = new Erems_Models_Payment_Dao();
            if ($payment->getId() == 0) {
                $payment->setFlag(1);
                $payment->setAddBy($app->getSession()->getUser()->getId());
                $hasil = 0;
                $hasil = $dao->save($payment);
                if ($hasil == 0) {
                    $msg = "Something problem when saving your data";
                } else {
                    $msg = "SUCCESS";
                    $success = TRUE;
                }
            }
        } else {
            $msg = $validator->getMsg();
        }






        // $success = $validator->getStatus();

        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    function updateAction() {
        
    }

    function deleteAction() {
        
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }

}

?>