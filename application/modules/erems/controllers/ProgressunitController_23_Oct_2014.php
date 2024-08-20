<?php

class Erems_ProgressunitController extends Erems_Models_App_Controller {

    function readAction() {
       // $progressList = new Erems_Models_App_DataListCreator('', 'spktransaction', array('spktype', 'contractor', 'cluster', 'block', 'unit'), array("spkdetail", "deletedRows"));
        $unitList = new Erems_Models_App_DataListCreator('', 'unitb', array('clusterb', 'blockb'), array());
        $blockList = new Erems_Models_App_DataListCreator('', 'blockb', array(), array());
        $clusterList = new Erems_Models_App_DataListCreator('', 'clusterb', array(), array());
        $unitInfoList = new Erems_Models_App_DataListCreator('', 'unittran', array('unitstatus','productcategory', 'type', 'customer', 'purchaseletter', 'pricetype','cluster','block'), array());
        $listSpk = new Erems_Models_App_DataListCreator('', 'spk', array(), array());
        $constructionList = new Erems_Models_App_DataListCreator('', 'construction', array(), array('deletedRows'));
        $mainConstructionList = new Erems_Models_App_DataListCreator('', 'construction', array('unitb', 'spk'), array('progressdetail', 'deletedRows'));
        $constructionSpkList = new Erems_Models_App_DataListCreator('', 'construction', array('spk','user'), array());
        $imageList = new Erems_Models_App_DataListCreator('', 'constructionpicture', array(), array());
        $unitConstructionList = new Erems_Models_App_DataListCreator('', 'unitb', array('clusterb','blockb','customer','purchaseletter','pricetype'), array());
        $app = new Erems_Models_App_Models_Read($this);
        //$app = new Erems_Models_App_Models_Read($this,"read_topprogress");

        $app->registerDataList('main_list', $unitConstructionList);
        $app->registerDataList('unit', $unitList);
        $app->registerDataList('cluster', $clusterList);
        $app->registerDataList('block', $blockList);
        $app->registerDataList('spk', $listSpk);
        $app->registerDataList('construction', $constructionList);
        $app->registerDataList('mainconstruction', $mainConstructionList);
        $app->registerDataList('image', $imageList);
        $app->registerDataList('unitinfo', $unitInfoList);
        $app->registerDataList('contructionspk', $constructionSpkList);
        $mr = $app->getModeRead();
        $r = $app->getRequest();

        switch ($mr) {
            case "all":
                $dao = new Erems_Models_Unit_UnitDao();
                $hasil = $dao->getUnitConstructionList($r);
                $app->prosesDao('main_list', $hasil);
                break;
            case "unit":
                $dao = new Erems_Models_Unit_UnitDao();
                $u = new Erems_Models_Unit_UnitTran();
                $u->setProject($app->getSession()->getProject());
                $u->setPt($app->getSession()->getPt());
                $hasil = $dao->getByProjectPt($u);

                $app->prosesDao('unit', $hasil);
                break;
            case "cluster":
                $dao = new Erems_Models_Master_ClusterDao();
                $cluster = new Erems_Models_Master_ClusterTran();
                $cluster->setProject($app->getSession()->getProject());
                $cluster->setPt($app->getSession()->getPt());
                $app->prosesDao("cluster", $dao->getByProjectPt($cluster));
                break;
            case "block":
                $dao = new Erems_Models_Master_BlockDao();
                $block = new Erems_Models_Master_BlockTran();
                $block->setProject($app->getSession()->getProject());
                $block->setPt($app->getSession()->getPt());
                $app->prosesDao("block", $dao->getByCPP($block));
                break;
            case "listspk":
                $dao = new Erems_Models_Spk_SpkDao();
                $u = new Erems_Models_Unit_Unit();
                $u->setArrayTable($app->getData());
                $hasil = $dao->getAllByUnit($u);
                $app->prosesDao('spk', $hasil);
                break;
             case "constructionspk":
             
                $dao = new Erems_Models_Construction_Dao();
             
                $hasil = $dao->getBySpk($r);
                $app->prosesDao('contructionspk', $hasil);
                break;
            case "constructionspkunit":
                $dao = new Erems_Models_Construction_Dao();
                
                $hasil = $dao->getBySpkUnit($r);
                $app->prosesDao('construction', $hasil);
                break;
            case "picture":
                $dao = new Erems_Models_Construction_Dao();
                $hasil = $dao->getPictureByConstruction($r);
                $app->prosesDao('image', $hasil);
                break;
            case "unitinfo":
                $dao = new Erems_Models_Unit_UnitDao();
                $unit = new Erems_Models_Unit_Unit();
                 $unit->setArrayTable($app->getData());
              //  $unit->setId(5);
                $hasil = $dao->getPurchaseLetterInfo($unit);
                $app->prosesDao('unitinfo', $hasil);
                break;
           
            //getBySpkUnit
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
        // $app = new Erems_Models_App_Models_Create($this, "create_progress");
        $construction = new Erems_Models_Construction_Construction();

        $app->prosesData($construction);
        $msgEr = "Error";
        $detail = NULL;
        if (!$construction->getProgressDate()) {
            $msgEr = "Please insert progress date";
        } else if ($construction->getProgressPersen() == 0) {
            $msgEr = "Please insert progress percent";
        } else if ($construction->getSpk()->getId() == 0) {
            $msgEr = "Please insert SPK";
        } else if ($construction->getUnit()->getId() == 0) {
            $msgEr = "Please insert Unit";
        } else {
            $detail = $app->getData();

            $detail = $detail["progressdetail"];
            foreach ($detail as $row) {

                $image = new Erems_Models_Construction_Picture();
                $image->setArrayTable($row);
                $construction->addPictures($image);
            }
            $de = new Erems_Libraries_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($construction);
            $de->generate();

            $dao = new Erems_Models_Construction_Dao();
            if ($construction->getId() > 0) {
                /* deleted Rows */
                $construction->setModiBy($app->getSession()->getUser()->getId());
                $data = $app->getData();

                $decan = new Erems_Models_App_Decan(explode(",", $data["deletedRows"]));
                $de->setDelimiterCandidate($decan);
                $de->generate();

                $row = $dao->update($construction, $decan);
            } else {
                $construction->setAddBy($app->getSession()->getUser()->getId());
                $row = $dao->save($construction);
            }

            if ($row > 0) {
                $app->setSuccess(TRUE);
                $msgEr = "Success";
            }
        }
        $app->setMsg($msgEr);
        $app->run();
    }

    function updateAction() {
        $app = new Erems_Models_App_Models_Create($this);
        $spk = new Erems_Models_Spk_SpkTransaction();
        $r = $app->getData();
        $spk->setArrayTable($r);
        $app->run();
    }

    function uploadAction() {
        //
        $app = new Erems_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Models_App_ImageUpload("/public/app/erems/uploads/progress_unit/", "progress_unit_","jpg,bmp");
        $imageUpload->run();
        if(!$imageUpload->isSuccess()){
            $msg = $imageUpload->getErrorMsg();
        }else{
            $success = TRUE;
            $msg = $imageUpload->getImageName();
        }
        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    function deleteAction() {
        $app = new Erems_Models_App_Models_Delete($this);
        $app->setIdProperty('construction_id');
        $app->execute(new Erems_Models_Construction_Dao());
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->progressunit();
    }

}

?>