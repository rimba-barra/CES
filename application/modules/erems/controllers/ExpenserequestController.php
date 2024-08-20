<?php

class Erems_ExpenserequestController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        //  $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype'));
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'expense', array('department','user','paymentmethod'), array('deletedRows','detail'));

        $dao = new Erems_Models_Expenserequest_ExpenseDao();

        $hasil = $dao->getAll($this->getAppRequest(),$this->getAppSession());
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //

        $masterDept = new Erems_Models_App_Masterdata_Department();
        $masterDept->setRequestRead($this->getAppRequest());
        $masterDept->setAppSession($this->getAppSession());
        $allDept = $masterDept->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterETy = new Erems_Models_App_Masterdata_ExpenseType();
        $masterETy->setRequestRead($this->getAppRequest());
        $allETy = $masterETy->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterPT = new Erems_Models_App_Masterdata_PaymentType();
        $allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mpm = new Erems_Models_App_Masterdata_PaymentMethod();
        $apm = $mpm->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allDept, $allPT, $allETy, $apm));
        
        return $dm;
    }
    
     public function searchassetsRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $md = new Erems_Models_App_Masterdata_Department();
        $md->setRequestRead($this->getAppRequest());
        $ad = $md->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mpm = new Erems_Models_App_Masterdata_PaymentMethod();
        $apm = $mpm->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($ad,$apm));

        return $dm;
    }

    public function detailapproveRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $masterPM = new Erems_Models_App_Masterdata_PaymentMethod();
        $allPM = $masterPM->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allPM));

        return $dm;
    }

    public function mainDelete() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Expenserequest_Expense());
        $dm->setDao(new Erems_Models_Expenserequest_ExpenseDao());
        $dm->setIdProperty("expense_id");
        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'city'));
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getOne($pl->getId());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function isrequestedRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $data = $this->getAppData();
        $dao = new Erems_Models_Expenserequest_ExpenseDao();
        $hasil = $dao->checkIsRequested($data["unit_id"],$data["paymenttype_id"],$data["purchaseletter_id"]);
        $status = FALSE;
        if(count($hasil) > 0){
            if(intval($hasil[1][0]["expense_id"]) > 0){
                 $status = TRUE;
            }
        }
       
        $otherAT = array(array(
                "STATUS" =>$status     
        ));
        $dm->setHasil(array($otherAT));

        return $dm;
    }

    public function expensedetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'expensedetail', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'paymenttype', 'expensetype','paymentmethod','purchaseletter'));
        $ex = new Erems_Models_Expenserequest_Expense();
        $dao = new Erems_Models_Expenserequest_ExpenseDao();

        $ex->setId($this->getAppRequest()->getOthersValue('expense_id'));
        $hasil = $dao->getDetail($ex,$this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function detailbyunitRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'expensedetail', array('expense','unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'paymenttype', 'expensetype'));
        $dao = new Erems_Models_Expenserequest_ExpenseDao();
        $unit = new Erems_Models_Master_Unit();
        $unit->setArrayTable($this->getAppRequest()->getOthers());
        $hasil = $dao->getDetailByUnit($unit,$this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function unitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('clusterb', 'blockb', 'productcategory', 'type'));
        $unit = new Erems_Models_Unit_UnitTran();

        $unit->setArrayTable($this->getAppData());
        $unit->setProject($this->getAppSession()->getProject());
        $unit->setPt($this->getAppSession()->getPt());

        $dao = new Erems_Models_Unit_UnitDao();
 
        $hasil = $dao->getAllWoP($this->getAppRequest(), $unit);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function selectedunitRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('clusterb', 'blockb', 'productcategory', 'type','purchaseletter'));
        $pl = new Erems_Models_Unit_Unit();
        $pl->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Unit_UnitDao();
        $hasil = $dao->getOne($pl);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Expenserequest_Expense();
        $dm->setDao(new Erems_Models_Expenserequest_ExpenseDao());
        $dm->setValidator(new Erems_Models_Expenserequest_Validator());
        $dm->setObject($obj);

        return $dm;
    }
    
    public function approveCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $validator = new Erems_Models_Expenserequest_Validator();
        $validator->setMode("APPROVE");
        $obj = new Erems_Models_Expenserequest_Expense();
        $dm->setDao(new Erems_Models_Expenserequest_ExpenseDao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }
    
    public function unapproveRead() {        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $obj = new Erems_Models_Expenserequest_Expense();
        $obj->setArrayTable($this->getAppData());
        $obj->setAddBy($this->getAppSession()->getUser()->getId());
        $dao = new Erems_Models_Expenserequest_ExpenseDao();
        $hasil = $dao->unApprove($obj);

        $otherAT = array(array(
                "STATUS" =>$hasil                
        ));
        $dm->setHasil(array($otherAT));

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_ExpenseRequestProcessor();
    }
}
?>
