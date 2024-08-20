<?php

class Erems_ExpenserequestviewController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        //  $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype'));
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'expense', array('department','user','paymentmethod'), array('deletedRows','detail'));

        $dao = new Erems_Models_Expenserequest_ExpenseDao();

        $hasil = $dao->getAll($this->getAppRequest(), $this->getAppSession());
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

    public function mainDelete() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Purchaseletter_PurchaseLetter());
        $dm->setDao(new Erems_Models_Purchaseletter_PurchaseLetterDao());
        $dm->setIdProperty("purchaseletter_id");
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
    
    public function expensedetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'expensedetail', array('unitb','clusterb', 'blockb', 'productcategory', 'type','paymenttype','expensetype'));
        $hasil = array();

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function unitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array( 'clusterb', 'blockb', 'productcategory', 'type'));
        $unit = new Erems_Models_Unit_UnitTran();
        
        $unit->setArrayTable($this->getAppData());
        $unit->setProject($this->getAppSession()->getProject());
        $unit->setPt($this->getAppSession()->getPt());
    
        $dao = new Erems_Models_Unit_UnitDao();
        $hasil = $dao->getByProjectPt($unit);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function selectedunitRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array( 'clusterb', 'blockb', 'productcategory', 'type'));
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
        $obj = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $dm->setDao(new Erems_Models_Purchaseletter_PurchaseLetterDao());
        $dm->setValidator(new Erems_Models_Purchaseletter_Validator());
        $dm->setObject($obj);

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>
