<?php

class Erems_SpkController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }
    
    public function browsedetailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $ab = array();

        $dm->setHasil(array($ab));


        return $dm;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'spktransaction', array('spktype', 'contractor', 'cluster', 'block', 'unit'), array("detail","deletedRows"));
        $dao = new Erems_Models_Spk_SpkDao();
        $hasil = $dao->getAll($this->getAppRequest(),$this->getAppSession()->getProject()->getId(),
                $this->getAppSession()->getPt()->getId());
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


        $masterSpkTy = new Erems_Models_App_Masterdata_SpkType();
        $allSpkTy = $masterSpkTy->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterCtr = new Erems_Models_App_Masterdata_Contractor();
        $allCtr = $masterCtr->prosesDataWithSession($this->getAppSession(), TRUE);


        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistSpk($this->getAppSession());

        $otherAT = array(array(
            "GLOBALPARAMSEXIST"  => $paramsRequestResult["status"],
            "GLOBALPARAMSMSG"    => $paramsRequestResult["msg"],
            "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
            "SPKTYPE_UNIT"       => Erems_Box_Config::SPKTYPE_UNIT
        ));

        $dm->setHasil(array($ac, $allSpkTy, $allCtr, $otherAT));

        return $dm;
    }

    
    
     public function unitlistxxRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('clusterb','blockb','unitstatus','pt'));
        $dao = new Erems_Models_Spk_SpkDao();
        //$u = new Erems_Models_Unit_UnitTran();
       // $u->setProject($this->getAppSession()->getProject());
       // $u->setPt($this->getAppSession()->getPt());
     //   $u->setArrayTable($this->getAppData());
        $params = $this->getAppData();
        $hasil = $dao->getByProjectPtNotinSPK($this->getAppRequest(),$this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId(),$params);
     
        //$hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;


       
    }
    
    public function selectedunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitspk', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));

        $dao = new Erems_Models_Unit_UnitDao();
        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $hasil = $dao->getOneWithSpkInfo($unit);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function blocklistRead() {
        
        
         $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'blocktran', array('clusterb'));
        $dao = new Erems_Models_Master_BlockDao();
        $b = new Erems_Models_Master_BlockTran();
        $b->setProject($this->getAppSession()->getProject());
        $b->setPt($this->getAppSession()->getPt());
      
        $hasil = $dao->getByCPP($b);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function maindetailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $masterSpkTy = new Erems_Models_App_Masterdata_SpkType();
        $allSpkTy = $masterSpkTy->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterCtr = new Erems_Models_App_Masterdata_Contractor();
        $allCtr = $masterCtr->prosesDataWithSession($this->getAppSession(), TRUE);






        $dm->setHasil(array($allSpkTy, $allCtr));


        return $dm;
    }

    public function contractordetailRead() {

        /* start added by ahmad riadi 04-01-2017*/
        $data = $this->getAppData(); 
         /* end added by ahmad riadi 04-01-2017*/
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'contractorprofile', array());
        $dao = new Erems_Models_Master_ContractorDao();
        $ct = new Erems_Models_Master_Contractor();     
         /* start edited by ahmad riadi 04-01-2017*/
        if(isset($data['code'])){
             $ct->setCode($data['code']);        
             $ct->setArrayTable($this->getAppData());
             $hasil = $dao->getByCode($ct);
        }else{
             $ct->setArrayTable($this->getAppData());
             $hasil = $dao->getById($ct); 
        }
        /* end edited by ahmad riadi 04-01-2017*/        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;    
    }

    public function scheduleRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype'));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppData());
        $hasil = $dao->getScheduleById($pl);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function isSh1FeaturesRead() {
        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $arrayRespon = array(
            "SPKCODE" => $genco->activateSh1Features("spk_spk_code")
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }


    public function mainDelete() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Spk_SpkTransaction());
        $dm->setDao(new Erems_Models_Spk_SpkDao());
        $dm->setIdProperty("spk_id");
        return $dm;
    }

    public function spklistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'spkdetail', array('unittran', 'clusterb', 'blockb'));
        $dao = new Erems_Models_Spk_SpkDao();
        $spk = new Erems_Models_Spk_Spk();
        $spk->setArrayTable($this->getAppData());
        $hasil = $dao->getDetailBySpk($spk,$this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Spk_SpkTransaction();
        $validator = new Erems_Models_Spk_Validator();
        $validator->session = $this->getAppSession();
        $dm->setDao(new Erems_Models_Spk_SpkDao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_SpkProcessor();
    }

}

?>
