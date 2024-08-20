<?php

class Cashier_KartupiutangsurabayaController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/cashier/report/';
        

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaseletter', array('cluster', 'block', 'unit', 'type', 'productcategory', 'customer', 'payment','salesman','schedule','project','pt'), array('readONlysss', 'hello', 'hssss'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $hasil = $dao->getListKartuPiutangCashier($this->getAppRequest(),$this->getAppSession());

        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function kartupiutangdetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('cluster', 'block', 'unitsize', 'type', 'customerprofile', 'price', 'pricetype', 'foo','city'), array('total_payment'));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppRequest()->getOthers());
        $hasil = $dao->getKartuPiutang($pl);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function totalPaymentRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaseletter', array('cluster', 'block', 'unit', 'type', 'productcategory', 'customer', 'payment'), array('readONlysss', 'hello', 'hssss'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $hasil = $dao->getListKartuPiutang($this->getAppRequest());
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function scheduleRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney','payment','paymentdetail')
        );

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppRequest()->getOthers());
        $hasil = $dao->getScheduleById($pl);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function paymentlistRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('paymentmethod'));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppRequest()->getOthers());
        $hasil = $dao->getPaymentsById($pl);
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
        /// salesman 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Salesman();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allSalesman = array();
        $this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

        /// collector 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Collector();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allCollector = array();
        $this->fillData($hasil[1], $allCollector, $creator, 'collector');


        $masterCC = new Erems_Models_App_Masterdata_SalesLocation();
        $allSalelLoc = $masterCC->prosesDataWithSession($this->getAppSession(), TRUE);


        $masterMP = new Erems_Models_App_Masterdata_MediaPromotion();
        $allMediaPro = $masterMP->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterBank = new Erems_Models_App_Masterdata_Bank();
        $allBank = $masterBank->prosesDataWithSession($this->getAppSession(), TRUE);


        $masterBillR = new Erems_Models_App_Masterdata_BillingRules();
        $allBillR = $masterBillR->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterClub = new Erems_Models_App_Masterdata_CitraClub();
        $allClubs = $masterClub->prosesDataWithSession($this->getAppSession(), TRUE);


        $otherAT = array(array(
                //"ISAUTHORIZEDUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_AuthorizeConfig::PURCHASELETTER_SUPERUSER ? TRUE : FALSE,
            "ISAUTHORIZEDUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(),"PURCHASELETTER_SUPERUSER") ? TRUE:FALSE
        ));



        $dm->setHasil(array($allSalesman, $allCollector, $allSalelLoc, $allMediaPro, $allBank, $allBillR, $allClubs, $otherAT));


        return $dm;
    }
    
    public function searchassetsRead() {



         $data = $this->getAppData();
         
   
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //



        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

        $mb = new Erems_Models_App_Masterdata_Block();
        $ab = $mb->prosesDataWithSession($this->getAppSession(), TRUE);

        
        $mp = new Erems_Models_App_Masterdata_Position();
        $ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);

        $mpc = new Erems_Models_App_Masterdata_ProductCategory();
        $apc = $mpc->prosesDataWithSession($this->getAppSession(), TRUE);

        $mt = new Erems_Models_App_Masterdata_Type();
        $at = $mt->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mpp = new Erems_Models_App_Masterdata_Purpose();
        $app = $mpp->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $ms = new Erems_Models_App_Masterdata_Side();
        $as = $ms->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mus = new Erems_Models_App_Masterdata_UnitStatus();
        $aus = $mus->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        

          $hslpt = array();
            if(array_key_exists('is_cashier',$data)) {
                $muss = new Erems_Models_App_Masterdata_PtCashier();
                $muss->setRequestRead($this->getAppRequest());
                $muss->setAppSession($this->getAppSession());
                $hslpt = $muss->prosesDataWithSession($this->getAppSession(), TRUE);
               
            }
        
        $otherAT = array(array(
            "FILE_REPORT"=>  Cashier_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getKartuPiutangReportFileName(),
            "DENDAALERT"=>Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->isDendaAlertKartuPiutang()
        ));

        $dm->setHasil(array($ac,$ab,$ap,$apc,$at,$app,$as,$aus,$otherAT,$hslpt));


        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('','purchaselettertransaction',
                array('cluster','block','unitsize','type','customerprofile','price','pricetype','foo','city','cac','citraclub'),
                array('total_payment'));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppRequest()->getOthers());
        $hasil = $dao->getKartuPiutang($pl);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
     public function searchfileRead() {



        $data = $this->getAppData();
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
       


        
        $otherAT = array(array(
            "FILE_REPORT"=>  Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($data['project_id'],$data['pt_id'])->getKartuPiutangReportFileName(),  
            "FILE_REPORT_CUSTOMER"=>  Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($data['project_id'],$data['pt_id'])->getKartuPiutangReportFileNameCustomer(),
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    protected function getDefaultProcessor() {
    return new Erems_Models_App_Box_Processor();
}

}

?>
