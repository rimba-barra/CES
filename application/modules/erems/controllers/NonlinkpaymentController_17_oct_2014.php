<?php

class Erems_NonlinkpaymentController extends Erems_Models_App_Controller {

    function readAction() {
        $app = new Erems_Models_App_Models_ReadWorms($this);
     //   $app = new Erems_Models_App_Models_ReadWorms($this,"read_unit");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr) {
                
            case "all":
                $dataList = new Erems_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb'));
                $app->registerDataList('pay', $dataList);
                $dao = new Erems_Models_Payment_Dao();
                $payment = new Erems_Models_Payment_Payment();
                $payment->setFlag(Erems_Models_App_Config::getv("PAYMENTFLAG_NONLINK"));
             
                $hasil = $dao->getAll($r, $payment,$app->getSession());
                $app->setRequestModel(TRUE);
                $app->prosesDao("pay", $hasil);
                break;
            case "detail":
                $dataList = new Erems_Models_App_DataListCreator('', 'payment', array('customerprofile','paymentmethod'),array("detail"));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Payment_Dao();
                $payment = new Erems_Models_Payment_Payment();
                $payment->setArrayTable($app->getData());
                $hasil = $dao->getOne($payment);
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "paymentdetail":
                $dataList = new Erems_Models_App_DataListCreator('', 'paymentdetail', array('paymenttype'));
                $app->registerDataList('paymentdetail', $dataList);
                $dao = new Erems_Models_Payment_Dao();
                $payment = new Erems_Models_Payment_Payment();
                $payment->setArrayTable($app->getData());
                $hasil = $dao->getOthersPayDetail($payment);
                $app->setRequestModel(TRUE);
                $app->prosesDao("paymentdetail", $hasil);
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
            case "paymentmethod":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_PaymentMethod());
                break;
            case "paymenttype":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_PaymentType());
                break;
            case "city":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_City());
                break;
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
        $app = new Erems_Models_App_Models_Create($this, "create_customer");
        $msg = "Invalid Request";
        $success = FALSE;
        $appData = $app->getData();
        $payment = new Erems_Models_Payment_NonlinkPayment();
        $app->prosesData($payment);
        
        $payment->getCustomer()->getCity()->setId($appData["customer_city_id"]);
       // $payment->setAmount(30000000);

        $validator = new Erems_Models_Payment_NonlinkValidator();
        $validator->run($payment);

        if ($validator->getStatus()) {
            
            $detail = $appData["detail"];
            foreach ($detail as $row){
                $pd = new Erems_Models_Payment_Detail();
                $app->prosesDataMini($pd,$row);
              
                $payment->addDetail($pd);
            }

            $detail = $payment->getDetail();
       

            $payment->setNomor(Erems_Models_App_DocPrefixGenerator::get("PAYMENT"));

            $de = new Erems_Libraries_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($payment);
            $de->generate();
            
            
            $dao = new Erems_Models_Payment_Dao();
            if($payment->getId()==0){
                $payment->setFlag(Erems_Models_App_Config::getv("PAYMENTFLAG_NONLINK"));
                $payment->setAddBy($app->getSession()->getUser()->getId());
                $hasil = 0;
                $hasil = $dao->saveNonlink($payment,$payment->getCustomer());
                if($hasil==0){
                    $msg = "Something problem when saving your data";
                }else{
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

    protected function selectedRequestor(\Erems_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }

}

?>