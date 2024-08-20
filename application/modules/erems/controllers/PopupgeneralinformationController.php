<?php

class Erems_PopupgeneralinformationController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
        

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaseletter', array('cluster', 'block', 'unit', 'type', 'productcategory', 'customer', 'payment','salesman'), array('readONlysss', 'hello', 'hssss'));
        $data = $this->getAppData();
        
        
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $plFilter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $plFilter->setArrayTable($data);

        $plFilter->getUnit()->setNumber($data["unit_number"]);
        $plFilter->getCustomer()->setName($data["customer_name"]);
        //$plFilter->getUnit()->setId($data["cluster_id"]);

        $hasil = $dao->getAllGeneralInformation($this->getAppRequest(),$this->getAppSession(),$plFilter,$data["salesman_name"],$data["bot_purchase_date"],$data["top_purchase_date"]);
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function saveexcelRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $data = $this->getAppData();
        
        
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $plFilter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $plFilter->setArrayTable($data);
        $plFilter->getUnit()->setNumber($data["unit_number"]);
        $plFilter->getCustomer()->setName($data["customer_name"]);
        $all = $dao->getAllGeneralInformationByPage($data["page"],$data["limit"], $this->getAppSession(),$plFilter,$data["salesman_name"],$data["bot_purchase_date"],$data["top_purchase_date"]);


        $ps = new Erems_Models_Generalinfo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($all[1]);



        $msg = 'Export Excel';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }

    
    
    public function searchassetsRead() {




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
        
        $otherAT = array(array(
            "FILE_REPORT"=>  Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getKartuPiutangReportFileName(),
            "SH1GITPL"=>Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->sh1GeneralInformationTemplate()
        ));
 
        
        $dm->setHasil(array($ac,$ab,$ap,$apc,$at,$app,$as,$aus,$otherAT));


        return $dm;
    }
    
    public function paymentRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('paymentdetail','schedule'));
        $dao = new Erems_Models_Payment_Dao();
        $data = $this->getAppData();
        
        $hasil = $dao->getByPurchaseletter(intval($data["purchaseletter_id"]));
        
       
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function utilityRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'utility', array('utilitystatus','utilitytype'));
        $dao = new Erems_Models_Utility_Dao();
        $data = $this->getAppData();
        
        $hasil = $dao->getAllByPurchaseletterWOPL(intval($data["purchaseletter_id"]));
        
       
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'city', 'payment','cac','aftersales','plbankkpr','sppjb','appjb','buktipemilik','contractor','construction','spk','pengalihanhak'), array('detail', 'deletedRows'));
        
        $data = $this->getAppData();
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId($data["purchaseletter_id"]);
        $hasil = $dao->getGeneralInformation($pl->getId());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    protected function getDefaultProcessor() {
    return new Erems_Models_App_Box_Processor();
}

}

?>
