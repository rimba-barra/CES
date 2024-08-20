<?php

class Erems_MasterdocumentcustomerController extends Erems_Box_Models_App_Hermes_AbstractController {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array());
        $dao = new Erems_Models_Master_CustomerDocumentDao();
        
        $hasil = $dao->getAllCDocumentCustomerByFilter($this->getAppRequest(), $this->getAppSession());

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

        $masterCity = new Erems_Models_App_Masterdata_City();
        $allCty = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mdt = new Erems_Models_App_Masterdata_DocumentType();
        $adt = $mdt->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterdocumenttype = new Erems_Models_App_Masterdata_DocumentTypeonly();
        $datadocumenttype = $masterdocumenttype->prosesDataWithSession($this->getAppSession(), TRUE); 

        $masterDept = new Erems_Models_App_Masterdata_DepartmentErems();
        $masterDept->setRequestRead($this->getAppRequest());
        $masterDept->setAppSession($this->getAppSession());
        $allDept = $masterDept->prosesDataWithSession($this->getAppSession(), TRUE);
       
        $dm->setHasil(array($allCty,$datadocumenttype, $allDept));

        return $dm;
    }

    public function maindetailRead() {

        $hasil = FALSE;
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city', 'religion', 'purpose', 'purposebuy', 'education'));
        $dao = new Erems_Models_Master_CustomerrevisionDao();
        $data = $this->getAppData();  
  
        if(isset($data["customer_id"])){
            $customer_tmp_id = $dao->getNewRevisionId($data["customer_id"]);
            
            $isApprove = $this->approvalcheck($customer_tmp_id);

            //READ MAIN DETAIL
            //kalau baru atau sudah diapprove / direject , kesini
            if($isApprove){
                //override dao
                $dao = new Erems_Models_Master_CustomerDao();
                $hasil = $dao->getById($this->getAppRequest());        
            }
            //READ REVISION DETAIL
            //kalau belum diapprove, kesini
            else{
                $hasil = $dao->getById($customer_tmp_id);
            }
        }

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;    
    }

    public function maindetailcurrentRead() {        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city', 'religion', 'purpose', 'purposebuy', 'education'));
        $data = $this->getAppData();     
        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getById($this->getAppRequest());   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;    
    }

    public function customerlistRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array());

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getAllByFilter($this->getAppRequest(), $this->getAppSession());

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

    public function documentsRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocument', array('documenttype'));
        $params = $this->getAppData();
        $dao = new Erems_Models_Master_CustomerDocumentDao();        
        
        $hasil = $dao->getAllByCustomerWOPL($params);
               
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

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

            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customerdocuments/", "document_",$ext);
            $imageUpload->runDocument();
           
        }else{
            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customer/", "customer_","jpg,bmp");
            $imageUpload->run();
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
        $newDocument = new Erems_Models_Customer_CustomerDocument();
        $newDocument->setArrayTable($params);
        $valid = FALSE;
        
        if($newDocument->getDocumentType()->getId()==0){
            $msg = "Invalid document type";
        }else{
            $valid = TRUE;
        }   

        if($newDocument->getFileName() == ""){
            $msg = "Please upload file first";
        }else{
            $valid = TRUE;
        }     

        if ($valid) {
           $dao = new Erems_Models_Master_CustomerDocumentDao();
           if($newDocument->getId() > 0){
               $newDocument->setModiBy($this->getAppSession()->getUser()->getId());
               $hasil = $dao->update($newDocument);
           }else{             
               $newDocument->setAddBy($this->getAppSession()->getUser()->getId());
               $hasil = $dao->save($newDocument);
           }
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }    
    
    public function deletedocumentRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $id = intval($params["customerdocument_id"]);
        
        if($id==0){
            $msg = "Invalid document id";
        }else{
            $dao = new Erems_Models_Master_CustomerDocumentDao();
            $hasil = $dao->deleteOne($this->getAppSession()->getUser()->getId(), $id);
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    private function approvalcheck($customer_tmp_id){
        //Check if approved?
        if($customer_tmp_id==0){
            return true;
        }else{
            return false;
        }
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_MastercustomerProcessor();
    }

    // added by rico 26102021
    public function saveDownloadRead(){
        $params = $this->getAppData();
        $params = json_decode($params["data"],true);

        $data = array(
            "user_id" => $this->getAppSession()->getUser()->getId(), 
            "project_id" => $this->getAppSession()->getProject()->getId(),
            "pt_id" => $this->getAppSession()->getPt()->getId(),
            "filename" => $params[0],
            "type" => $params[1],
            "description" => $params[2], 
            "document_id" => $params[3], 
            "customer_id" => $params[4], 
            "alasan" => $params[5], 
        );

        $dao   = new Erems_Models_Master_CustomerDocumentDao();
        $hasil = $dao->saveDocumentInformation($data);

        $arrayRespon = array("HASIL" => $data, "MSG" => "msg");
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    // added by rico 26102021
    public function documentsHistoryRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $params = $this->getAppData();
        $params = json_decode($params["customer_id"],true);

        $data = array(
            "project_id" => $this->getAppSession()->getProject()->getId(),
            "pt_id" => $this->getAppSession()->getPt()->getId(),
            "customer_id" => $params
        );

        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocumenthistory', array());
        $dao = new Erems_Models_Master_CustomerDocumentDao();        
        
        $hasil = $dao->readDocumentInformation($data);
               
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    // added by rico 1310722
    public function documentsPhoneRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $params = $this->getAppData();

        $params = json_decode($params["customer_customer_id"],true);

        $data = array(
            "project_id" => $this->getAppSession()->getProject()->getId(),
            "pt_id" => $this->getAppSession()->getPt()->getId(),
            "customer_id" => $params
        );

        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocumentphone', array());
        $dao = new Erems_Models_Master_CustomerDocumentDao();        
        
        $hasil = $dao->readCustomerPhone($data);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function savecustomerphoneRead() {
        $params = $this->getAppData();
        $params = json_decode($params["data"],true);

        if($params['customerphone_id'] > 0){ // update
            $data = array(
                "user_id" => $this->getAppSession()->getUser()->getId(), 
                "customerphone_id" => $params['customerphone_id'],
                "customer_id" => $params['customer_customer_id'],
                "department_id" => $params['department_id'],
                "phone" => $params['phone'],
                "description" => $params['phone_description'], 
            );

            $dao   = new Erems_Models_Master_CustomerDocumentDao();
            $hasil = $dao->updateCustomerPhone($data);
        }else{ //save
            $data = array(
                "user_id" => $this->getAppSession()->getUser()->getId(), 
                "customer_id" => $params['customer_customer_id'],
                "project_id" => $this->getAppSession()->getProject()->getId(),
                "pt_id" => $this->getAppSession()->getPt()->getId(),
                "department_id" => $params['department_id'],
                "phone" => $params['phone'],
                "description" => $params['phone_description'], 
            );

            $dao   = new Erems_Models_Master_CustomerDocumentDao();
            $hasil = $dao->saveCustomerPhone($data);
        }


        $arrayRespon = array("HASIL" => $data, "MSG" => "msg");
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }   
    
    public function deletephoneRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $id = intval($params["customerphone_id"]);
        
        if($id==0){
            $msg = "Invalid document id";
        }else{
            $dao = new Erems_Models_Master_CustomerDocumentDao();
            $hasil = $dao->deleteOnePhone($this->getAppSession()->getUser()->getId(), $id);
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    // added by rico 2010722
    public function documentsKomunikasiRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $params = $this->getAppData();

        $params = json_decode($params["customer_customer_id"],true);

        $data = array(
            "project_id" => $this->getAppSession()->getProject()->getId(),
            "pt_id" => $this->getAppSession()->getPt()->getId(),
            "customer_id" => $params
        );

        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocumentkomunikasi', array());
        $dao = new Erems_Models_Master_CustomerDocumentDao();        
        
        $hasil = $dao->readCustomerKomunikasi($data);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function savecustomerkomunikasiRead() {
        $params = $this->getAppData();
        $params = json_decode($params["data"],true);
        $dao   = new Erems_Models_Master_CustomerDocumentDao();

        if($params['customer_komunikasi_id'] > 0){ // update
            $data = array(
                "user_id" => $this->getAppSession()->getUser()->getId(), 
                "customer_id" => $params['customer_customer_id'],
                "email" => $params['email'],
                "customerphone" => $params['dept_phone'],
                "log_komunikasi" => $params['log_komunikasi'], 
                "customer_komunikasi_id" => $params['customer_komunikasi_id'],
            );

            $hasil = $dao->updateCustomerKomunikasi($data);
        }else{ //save
            $data = array(
                "user_id" => $this->getAppSession()->getUser()->getId(), 
                "customer_id" => $params['customer_customer_id'],
                "email" => $params['email'],
                "customerphone" => $params['dept_phone'],
                "log_komunikasi" => $params['log_komunikasi'], 
            );

            $hasil = $dao->saveCustomerKomunikasi($data);
        }


        $arrayRespon = array("HASIL" => $data, "MSG" => "msg");
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }   
    
    public function deletekomunikasiRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $id = intval($params["customer_komunikasi_id"]);
        
        if($id==0){
            $msg = "Invalid document id";
        }else{
            $dao = new Erems_Models_Master_CustomerDocumentDao();
            $hasil = $dao->deleteOneKomunikasi($this->getAppSession()->getUser()->getId(), $id);
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function getEmailRead(){
        $dao = new Erems_Models_Master_CustomerDocumentDao();        
        $hasil = $dao->readEmailCustomer($this->getAppSession()->getUser()->getId());

        $arrayRespon = array("HASIL" => $hasil, "MSG" => "msg");
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
}

?>
