<?php

class Erems_FormorderijbController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }
    
    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_FormorderijbProcessor();
    }
    
    public function mainDelete() {
        $dao = new Erems_Models_Formorderijb_Dao();
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Formorderijb_FormOrderIJB());
        $dm->setDao($dao);
        $dm->setIdProperty("formorderijb_id");
        return $dm;
    }
    
    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'formorderijb', array('cluster', 'block','city','salesman','unitb','customer'), array('deletedRows'));
        $dao = new Erems_Models_Formorderijb_Dao();
        $fi = new Erems_Models_Formorderijb_FormOrderIJB();
        $fi->setArrayTable($this->getAppData());
        $hasil = $dao->getOne($fi->getId());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function configRead() {
        $ses       = $this->getAppSession();
        $projectid = $ses->getProject()->getId();
        $ptid      = $ses->getPt()->getId();
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);

        $otherAT = array(array(
            "file_report" => $genco->getListijbFileName(),
        ));

        $dm->setHasil(array($otherAT));
        
        return $dm;
    }
    
    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Formorderijb_FormOrderIJB();
        $validator = new Erems_Models_Formorderijb_Validator();
       // $validator->setType("CN");
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
      
        $validator->setSession($this->getAppSession());
        $dm->setDao(new Erems_Models_Formorderijb_Dao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }
    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'formorderijb', array('cluster','city', 'block','salesman','unitb','customer'), array('deletedRows'));
        $dao = new Erems_Models_Formorderijb_Dao();

        $hasil = $dao->getAll($this->getAppRequest(),$this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function selectedunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype','city','pengalihanhak'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $daoFormIjb = new Erems_Models_Formorderijb_Dao();
        $hasil = array();
        /// check purchaseletter by unit id

        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        // $pHasil = $dao->getOneByUnit($unit);
        $pHasil = $daoFormIjb->getOneByUnit($unit);       


        if (count($pHasil[1]) > 0) {
            $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
            $pl->setArrayTable($pHasil[1][0]);

            $hasil = $dao->getOne($pl->getId());
        }

        $hasil[1][0]['pengalihanhak_name'] = $pHasil[1][0]['pengalihanhak_name'];
        $hasil[1][0]['pengalihanhak_address'] = $pHasil[1][0]['pengalihanhak_address'];
        $hasil[1][0]['pengalihanhak_city'] = $hasil[1][0]['city_city_name'];
        $hasil[1][0]['pengalihanhak_telephone'] = $pHasil[1][0]['pengalihanhak_telephone'];
        $hasil[1][0]['pengalihanhak_mobilephone'] = $pHasil[1][0]['pengalihanhak_mobilephone'];
        $hasil[1][0]['pengalihanhak_ktp'] = $pHasil[1][0]['pengalihanhak_ktp'];
        $hasil[1][0]['pengalihanhak_npwp_no'] = $pHasil[1][0]['pengalihanhak_npwp_no'];
        $hasil[1][0]['pengalihanhak_fax'] = $pHasil[1][0]['pengalihanhak_fax'];
        $hasil[1][0]['pengalihanhak_email'] = $pHasil[1][0]['pengalihanhak_email'];

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function selectedcustomerRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city'));

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getById($this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masterCity = new Erems_Models_App_Masterdata_City();
        $allCty = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);

        //$isAuthorizerUser = Erems_Box_Tools::integerOrArray($this->getAppSession()->getUser()->getId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "CHANGEKAVLING_APPROVEUSER"));
        

        $dm->setHasil(array($allCty));


        return $dm;
    }
    
    public function unitlistRead() {      
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type','customer'));
        $data = $this->getAppData();
        $dao = new Erems_Models_Sales_Change_Dao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data,'block_id'));
        $hasil = $dao->getAllUnitCN($this->getAppRequest(), $unitTran);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function checkijbunitRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $data = $this->getAppData();
        $dao = new Erems_Models_Formorderijb_Dao();
        $hasil = $dao->dataExistbyUnit($this->getAppSession()->getProject(),$this->getAppSession()->getPt(),$data['purchaseletter_id']);
        $sudahAdaRecordbyUnit = TRUE;
        if(count($hasil[0]) > 0){
            $sudahAdaRecordbyUnit = FALSE;
        }
        $otherAT = array(array(
            "ISALLOWED" => $sudahAdaRecordbyUnit,
            "MSG" => "Ijb sudah terdaftar untuk unit tersebut.",
        ));

        $dm->setHasil(array($otherAT));

        return $dm;
    }
}
