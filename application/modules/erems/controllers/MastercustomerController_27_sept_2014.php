<?php

class Erems_MastercustomerController extends Erems_Models_App_Controller {

    function readAction() {
        $app = new Erems_Models_App_Models_ReadWorms($this);
        //$app = new Erems_Models_App_Models_ReadWorms($this,"read_all");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr){
            case "all":
                $blockDataList = new Erems_Models_App_DataListCreator('', 'customerprofile', array());
                $app->registerDataList('customer', $blockDataList);
                $dao = new Erems_Models_Master_CustomerDao();
                
                $hasil = $dao->getAllByFilter($r);
               // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("customer", $hasil);
                break;
            case "detail":
                $customerDetailList = new Erems_Models_App_DataListCreator('', 'customerprofile', array('city','religion','purpose','education'));
                $app->registerDataList('customer', $customerDetailList);
                $app->setRequestModel(TRUE);
                $dao = new Erems_Models_Master_CustomerDao();
                $hasil = $dao->getById($r);
                $app->prosesDao("customer",$hasil);
                break;
            case "religion":
                $religionDataList = new Erems_Models_App_DataListCreator('', 'religion', array());
                $app->registerDataList('religion', $religionDataList);
                $dao = new Erems_Models_Master_ReligionDao();
                $app->setRequestModel(TRUE);
                $hasil = $dao->getAll($r);
                $app->prosesDao("religion",$hasil);
                break;
            case "education":
                $educationDataList = new Erems_Models_App_DataListCreator('', 'education', array());
                $app->registerDataList("education", $educationDataList);
                $dao = new Erems_Models_Master_EducationDao();
                $app->setRequestModel(TRUE);
                $app->prosesDao("education",$dao->getAll());
                break;
            case "city":
                $educationDataList = new Erems_Models_App_DataListCreator('', 'city', array());
                $app->registerDataList("city", $educationDataList);
                $dao = new Erems_Models_Master_GeneralDao();
                $app->setRequestModel(TRUE);
                $app->prosesDao("city",$dao->getAllCity($r,new Erems_Models_Master_City()));
                break;
            case "purpose":
                $dl = new Erems_Models_App_DataListCreator('', 'purpose', array());
                $app->registerDataList("purpose", $dl);
                $dao = new Erems_Models_Master_GeneralDao();
                $p = new Erems_Models_Master_Purpose();
                $p->setProject($app->getSession()->getProject());
                $p->setPt($app->getSession()->getPt());
                $app->setRequestModel(TRUE);
                $app->prosesDao("purpose",$dao->getAllPurpose($r,$p));
                break;
            
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
        //$app = new Erems_Models_App_Models_Create($this,"create_object");
        $msg = "Invalid Request";
        $success = FALSE;
        $customer = new Erems_Models_Master_CustomerProfile();
        $app->prosesData($customer);
        
        /*validate */
        $validator = new Erems_Models_Customer_Validator();
        $validator->run($customer);
        
        if($validator->getStatus()){
           $dao =new Erems_Models_Master_CustomerDao();
           $row = 0;
           if($customer->getId() > 0){
            
               $customer->setModiBy($app->getSession()->getUser()->getId());
               $row = $dao->update($customer);
           }else{
                $customer->setAddBy($app->getSession()->getUser()->getId());
                $row = $dao->save($customer);  
           }
          
           if($row > 0){
               $msg = "Success";
               $success = TRUE;
           }else{
               $msg = "Something error when processiong your data";
           }
        }else{
            $msg = $validator->getMsg();
        }
       // $success = $validator->getStatus();
        
        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    function updateAction() {
        $this->createAction();
    }

    function deleteAction() {
        $app = new Erems_Models_App_Models_Delete($this);
        $app->setIdProperty('customer_id');
        $app->execute(new Erems_Models_Master_CustomerDao());
        $app->run();
    }

    function uploadAction() {
        $app = new Erems_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Models_App_ImageUpload("/public/app/erems/uploads/customer/", "customer_","jpg,bmp");
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

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->debugFunct();
    }

}

?>
