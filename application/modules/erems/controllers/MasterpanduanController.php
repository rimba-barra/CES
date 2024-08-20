<?php

class Erems_MasterpanduanController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_MasterpanduanDao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'masterpanduan', array('bank'), array()));
        $dm->setObject(new Erems_Models_Masterpanduan());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_MasterpanduanValidator());
        $dm->setIdProperty("panduan_id");
        return $dm;   
    }   
    
    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;        
        $imageUpload = NULL;
        
        $tipe = $this->getRequest()->getPost('tipe');


        if($tipe=="document"){
            //updated by anas 02022021
            $file = $_FILES['file_browse'];
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            // $sizefile = $file['size'];
            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/masterpanduan/", "document_",$ext);
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
}

?>