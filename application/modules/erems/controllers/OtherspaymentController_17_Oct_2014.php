<?php

class Erems_OtherspaymentController extends Erems_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return TRUE;
    }

    public function allRead() {
        $dm = new Erems_Models_App_Hermes_DataModel();
        $dataList = new Erems_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Models_App_Config::getv("PAYMENTFLAG_OTHERS"));
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAll($this->getAppRequest(), $payment, $this->getAppSession()));
        return $dm;
    }

    public function detailRead() {
        $dm = new Erems_Models_App_Hermes_DataModel();
        $dataList = new Erems_Models_App_DataListCreator('', 'payment', array('customer', 'unitb', 'purchaseletter', 'paymentmethod'), array("detail"));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getOne($payment));
        return $dm;
    }
    
    

    public function paymentdetailRead() {
        $dm = new Erems_Models_App_Hermes_DataModel();
        $dataList = new Erems_Models_App_DataListCreator('', 'paymentdetail', array('paymenttype'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getOthersPayDetail($payment));
        return $dm;
    }

    public function unitRead() {
        $dm = new Erems_Models_App_Hermes_DataModel();
        $dataList = new Erems_Models_App_DataListCreator('', 'unitb', array());
        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->setStatus(Erems_Models_App_Config::getv("UNITSTATUS_SOLD"));
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAll($this->getAppRequest(), $unitTran));
        return $dm;
    }

    public function selectedUnitRead() {
        $dm = new Erems_Models_App_Hermes_DataModel();
        $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('pricetype', 'customer', 'unittran', 'salesman', 'collector', 'price', 'billingrulestran', 'type'));
        $dao = new Erems_Models_Payment_Dao();
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getOneChangePriceRequested($unit));
        return $dm;
    }

    protected function getObjectValidator() {
        
    }
    
    public function mainCreate(){
        $dm = new Erems_Models_App_Hermes_DataModel();
        $payment = new Erems_Models_Payment_Payment();
        
        $dm->setDao(new Erems_Models_Payment_Dao());
        $dm->setValidator(new Erems_Models_Payment_Validator());
        $dm->setObject($payment);
        return $dm;
    }
    
    public function confCreate($obj,$app){
       $obj->setFlag(Erems_Models_App_Config::getv("PAYMENTFLAG_OTHERS")); 
    }

}

?>