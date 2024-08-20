<?php

class Erems_TemplatechecklistController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Templatechecklist();
        $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'templatechecklistmodel', array(), array()));
        $dm->setObject(new Erems_Models_TemplatechecklistModel());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Master_TemplatechecklistValidator());
        $dm->setIdProperty("checklist_bangunan_id");
        return $dm;
        
    } 
    
    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        $masterTy = new Erems_Models_App_Masterdata_Type();
        $masterTy->setSes($this->getAppSession());
        $allTy = $masterTy->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($allTy));

        return $dm;
    }

    public function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;        
        $imageUpload = NULL;
        
        $tipe = $this->getRequest()->getPost('tipe');

        if($tipe=="document"){

            $file = $_FILES['file_browse'];
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/templatechecklist/", "document_",$ext);
            $imageUpload->runDocument();           
        }
        
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

    public function savedocumentRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $params = json_decode($params["data"],true);
        $model = new Erems_Models_TemplatechecklistModel();
        $model->setArrayTable($params);

        $dao = new Erems_Models_Templatechecklist();
        $dao->setSession($this->getAppSession());

        if(!empty($params['checklist_bangunan_id'])){
            $hasil = $dao->update($model, $params['checklist_bangunan_id']);
        }else{
            $hasil = $dao->save($model);
        }
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_TemplatechecklistController($request,$response);
    }
}

?>
