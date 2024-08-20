<?php 


class Erems_ProgressnonunitController extends Erems_Models_App_Controller {

    function readAction() {
    
        $unitDataList = new Erems_Models_App_DataListCreator('', 'unitb', array(),array(),array());
        $spkList = new Erems_Models_App_DataListCreator('', 'spktransaction', array('contractor'), array());
        $contractorProfileDataList = new Erems_Models_App_DataListCreator('', 'contractorprofile', array());
        $constructionList = new Erems_Models_App_DataListCreator('', 'construction', array(), array('deletedRows'));
        $imageList = new Erems_Models_App_DataListCreator('', 'constructionpicture', array(), array());
        $mainConstructionList = new Erems_Models_App_DataListCreator('', 'construction', array('spk'), array('progressdetail', 'deletedRows'));
        $constructionSpkList = new Erems_Models_App_DataListCreator('', 'construction', array('spk','user'), array());
        $app = new Erems_Models_App_Models_Read($this);

        $app->registerDataList('main_list', $spkList);
        $app->registerDataList('contractorprofile', $contractorProfileDataList);
        $app->registerDataList('construction', $constructionList);
        $app->registerDataList('image', $imageList);
        $app->registerDataList('mainconstruction', $mainConstructionList);
        $app->registerDataList('contructionspk', $constructionSpkList);
        
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        
        switch ($mr) {
            
            case "unit":
                $dao = new Erems_Models_Unit_UnitDao();
                $u = new Erems_Models_Unit_UnitTran();
                $u->setProject($app->getSession()->getProject());
                $u->setPt($app->getSession()->getPt());
                $hasil = $dao->getAllSpkCount($u);
                
                $app->prosesDao('main_list', $hasil);
                break;
            case "all":
                $r->setOthersValue("spktype_id",  Erems_Models_App_Config::getv("SPK_TYPE_NONUNIT_ID"));
                $dao = new Erems_Models_Spk_SpkDao();
                $hasil = $dao->getAll($r);
                $app->prosesDao("main_list", $hasil);
                break;
            case "contractordetail":
                $dao = new Erems_Models_Master_ContractorDao();
                $ct = new Erems_Models_Master_Contractor();
                $ct->setArrayTable($app->getData());
                $hasil = $dao->getById($ct);
                $app->prosesDao('contractorprofile', $hasil);
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
            case "constructionspk":
                $dao = new Erems_Models_Construction_Dao();
                $hasil = $dao->getBySpkNonUnit($r);
                $app->prosesDao('contructionspk', $hasil);
                break;
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
       $this->createAction();
    }
    
    function uploadAction() {
        
        $app = new Erems_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Models_App_ImageUpload("/public/app/erems/uploads/progress_nonunit/", "progress_unit_","jpg,bmp");
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
        return $requestor->spk();
    }
    
   

}
        ?>