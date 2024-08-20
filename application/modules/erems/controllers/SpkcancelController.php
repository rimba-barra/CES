<?php

class Erems_SpkcancelController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'spktransaction', array('spktype', 'contractor', 'cluster', 'block', 'unit'), array("detail","deletedRows"));
        $dao = new Erems_Models_Spk_SpkDao();
        $r = $this->getAppRequest();
        $r->setOthersValue("status",  Erems_Box_Config::SPKSTATUS_OPEN);
        $hasil = $dao->getAll($this->getAppRequest(),$this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());
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
        $masterSpkTy = new Erems_Models_App_Masterdata_SpkType();
        $allSpkTy = $masterSpkTy->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterCtr = new Erems_Models_App_Masterdata_Contractor();
        $allCtr = $masterCtr->prosesDataWithSession($this->getAppSession(), TRUE);


      



        $dm->setHasil(array($allSpkTy, $allCtr));


        return $dm;
    }
    
    

    public function contractordetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'contractorprofile', array());
        $dao = new Erems_Models_Master_ContractorDao();
        $ct = new Erems_Models_Master_Contractor();
        $ct->setArrayTable($this->getAppData());
        $hasil = $dao->getById($ct);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

   

    public function mainDelete() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Spk_SpkTransaction());
        $dm->setDao(new Erems_Models_Spk_SpkDao());
        $dm->setIdProperty("spk_id");
        return $dm;
    }


    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Spk_SpkTransaction();
        $v = new Erems_Models_Spk_Validator();
        $v->setModeProses("CANCEL");
        $v->session = $this->getAppSession();
        $dm->setDao(new Erems_Models_Spk_SpkDao());
        $dm->setValidator($v);
        $dm->setObject($obj);

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_SpkProcessor($this->testingFlag(),"CANCEL");
    }

}

?>