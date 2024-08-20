<?php

class Erems_MastercustomerrevisionController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {	
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerrevision', array());

        $dao = new Erems_Models_Master_CustomerrevisionDao();

        $hasil = $dao->getAllByFilter($this->getAppRequest(),$this->getAppSession());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        //var_dump($hasil);die();
        return $dm;
    }
    
    public function savedocumentRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $params = json_decode($params["data"],true);
        $newDocument = new Erems_Models_Customer_CustomerDocument();
        $newDocument->setArrayTable($params);
        
        $valid = FALSE;
        
        if($newDocument->getCustomer()->getId()==0){
            $msg = "Invalid customer";
        }else if($newDocument->getDocumentType()->getId()==0){
            $msg = "Invalid document type";
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
    
    public function saveaddressRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $params = json_decode($params["data"],true);
        $address = new Erems_Models_Customer_CustomerAddress();
        $address->setArrayTable($params);
        
        $valid = FALSE;
        
        if($address->getCustomer()->getId()==0){
            $msg = "Invalid customer";
        }else if(strlen($address->getAddress()) < 3){
            $msg = "Addrress minimum 3 characters";
        }else{
            $valid = TRUE;
        }

        if ($valid) {
           $dao = new Erems_Models_Master_CustomerAddressDao();
           if($address->getId() > 0){
               $address->setModiBy($this->getAppSession()->getUser()->getId());
               $hasil = $dao->update($address);
           }else{
             
               $address->setAddBy($this->getAppSession()->getUser()->getId());
               $hasil = $dao->save($address);
           }
           
                
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
    
    public function deleteaddressRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $params = $this->getAppData();
        $id = intval($params["customeraddress_id"]);
        if($id==0){
            $msg = "Invalid address id";
        }else{
            $dao = new Erems_Models_Master_CustomerAddressDao();
            $hasil = $dao->deleteOne($this->getAppSession()->getUser()->getId(), $id);
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function detailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        /// salesman 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Salesman();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allSalesman = array();
        $this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

        /// collector 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Collector();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allCollector = array();
        $this->fillData($hasil[1], $allCollector, $creator, 'collector');



        $masterReligion = new Erems_Models_App_Masterdata_Religion();
        $allRelg = $masterReligion->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterEdc = new Erems_Models_App_Masterdata_Education();
        $allEdc = $masterEdc->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterCity = new Erems_Models_App_Masterdata_City();
        $allCty = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterPurp = new Erems_Models_App_Masterdata_Purpose();
        $allPurp = $masterPurp->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mdt = new Erems_Models_App_Masterdata_DocumentType();
        $adt = $mdt->prosesDataWithSession($this->getAppSession(), TRUE);
        
       

        //=== DETAIL INFORMATION == //
        /* schedule */
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppData());
        $hasil = $dao->getScheduleById($pl);

        $allSchedule = array();
        $this->fillData(array_key_exists(1, $hasil) ? $hasil[1] : array(), $allSchedule, $creator, 'schedule');
		
		/*start added by ahmad riadi 05-01-2017 */
        $masterbentukusaha = new Erems_Models_App_Masterdata_Bentukusaha();
        $databentukusaha = $masterbentukusaha->prosesDataWithSession($this->getAppSession(), TRUE); 
        
        $masterinstrumentpembayaran = new Erems_Models_App_Masterdata_Instrumentpembayaran();
        $datainstrumentpembayaran = $masterinstrumentpembayaran->prosesDataWithSession($this->getAppSession(), TRUE); 
      
        $masterdocumenttype = new Erems_Models_App_Masterdata_DocumentTypeonly();
        $datadocumenttype = $masterdocumenttype->prosesDataWithSession($this->getAppSession(), TRUE); 
       
        $masterprovinsi = new Erems_Models_App_Masterdata_Provinsi();
        $dataprovinsi = $masterprovinsi->prosesDataWithSession($this->getAppSession(), TRUE);         
        /*end added by ahmad riadi 05-01-2017 */

        //added by david 7/10/17
        $masternpwpklu = new Erems_Models_App_Masterdata_Npwpklu();
        $npwpklu = $masternpwpklu->prosesDataWithSession($this->getAppSession(), TRUE);
        $masternpwpklasusaha = new Erems_Models_App_Masterdata_Npwpklasifikasiusaha();
        $npwpklasusaha = $masternpwpklasusaha->prosesDataWithSession($this->getAppSession(), TRUE);

        //print_r($npwpklasusaha);die();

        //$dm->setHasil(array($allRelg,$allEdc,$allCty,$allPurp,$adt));
        
        /*start edited by ahmad riadi 05-01-2017 */
        $dm->setHasil(array($allRelg,$allEdc,$allCty,$allPurp,$adt,$databentukusaha,$datainstrumentpembayaran,$datadocumenttype,$dataprovinsi, $npwpklu, $npwpklasusaha));
        /*end edited by ahmad riadi 05-01-2017 */

        return $dm;
    }

    public function maindetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city', 'religion', 'purpose', 'education'));
        $dao = new Erems_Models_Master_CustomerrevisionDao();
                
        $hasil = $dao->getById($this->getAppRequest());
       
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    
    public function documentsRead() {


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocument', array('documenttype'));
        // $dao = new Erems_Models_Master_CustomerTmpDao();
      //  $hasil = $dao->getById($this->getAppRequest());
        $params = $this->getAppData();
        $dao = new Erems_Models_Master_CustomerDocumentDao();
        
        $hasil = $dao->getAllByCustomerWOPL($params["customer_id"]);
       
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
     public function addressRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customeraddress', array());
   
        $params = $this->getAppData();
        $dao = new Erems_Models_Master_CustomerAddressDao();
        
        $hasil = $dao->getAllByCustomerWOPL($params["customer_id"]);
       
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }


    public function mainCreate() {
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Master_CustomerProfile();
        $v = new Erems_Models_Customer_Validator();
        $v->setSes($this->getAppSession());
        $dm->setDao(new Erems_Models_Master_CustomerrevisionDao());
        
        //print_r($this->getAppSession());
        //die();
        
        $dm->setValidator($v);
        $dm->setObject($obj);

        return $dm;
    }
    
    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        
        $imageUpload = NULL;
        
        $tipe = $this->getRequest()->getPost('tipe');
        
        if($tipe=="document"){

           $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customerdocuments/", "document_","jpg,bmp");
         
        }else{
            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customer/", "customer_","jpg,bmp");
        
        }

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

    public function mainDelete() {
        $dao = new Erems_Models_Master_CustomerrevisionDao();
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_CustomerProfile());
        $dm->setDao($dao);
        $dm->setIdProperty("customer_tmp_id");
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_MastercustomerProcessor();
    }


    
}

?>
