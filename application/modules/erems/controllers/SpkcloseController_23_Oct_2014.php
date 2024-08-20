<?php

class Erems_SpkcloseController extends Erems_Models_App_Controller {

    function readAction() {
        $spkList = new Erems_Models_App_DataListCreator('', 'spktransaction', array('spktype', 'contractor', 'cluster', 'block', 'unit'));
        $spkTypeDataList = new Erems_Models_App_DataListCreator('', 'spktype', array());
        $contractorDataList = new Erems_Models_App_DataListCreator('', 'contractor', array());
        $app = new Erems_Models_App_Models_Read($this);
        //$app = new Erems_Models_App_Models_Read($this,"read_all");
        $app->registerDataList('main_list', $spkList);
        $app->registerDataList('spktype', $spkTypeDataList);
        $app->registerDataList('contractor', $contractorDataList);
        
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        $dao = new Erems_Models_Spk_SpkDao();
        switch ($mr) {
            case "spktype":
                $hasil = $dao->getType();
                $app->prosesDao('spktype', $hasil);
                break;
            case "contractor":
                $hasil = $dao->getContractor();
                $app->prosesDao('contractor', $hasil);
                break;
            case "all":
                $r->setOthersValue("status","OPEN");
              
                
                $hasil = $dao->getAll($r);
                $app->prosesDao('main_list', $hasil);
                break;
        }
        $app->run();
    }

    function updateAction() {
        $app = new Erems_Models_App_Models_Create($this);
      //  $app = new Erems_Models_App_Models_Create($this, "update_cancel");
        $msgEr = "Invalid Request";
        $spkTrn = new Erems_Models_Spk_SpkTransaction();
        $app->prosesData($spkTrn);
        if ($spkTrn->getId() > 0) {

            if (!strtotime($spkTrn->getStatus()->getDate())) {
                $msgEr = "Please insert cancel date";
            } else if (strlen($spkTrn->getStatus()->getNote()) == 0) {
                $msgEr = "Please insert cancel note";
            } else {
                $statusConfig = Erems_Models_App_Config::geto("spk_status");
                $spkTrn->getStatus()->setName($statusConfig->get("close")->getName());
                $spkDao = new Erems_Models_Spk_SpkDao();
                $row = $spkDao->updateCancel($spkTrn);

                if ($row > 0) {
                    $app->setSuccess(TRUE);
                    $msgEr = "Success";
                }
            }
        }

        $app->setMsg($msgEr);
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->spk();
    }

}

?>