<?php

class Erems_MasterdocumentunitController extends Erems_Box_Models_App_Hermes_AbstractController {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('customer','blockb', 'pt', 'clusterb', 'type', 'productcategory', 'position', 'side', 'purpose', 'unitstatus', 'unithistory'), array("detail", "number_end", "mode_number_generator", "number_check", "deletedRows"));
        $dao = new Erems_Models_Master_UnitDocumentDao();
        
        $hasil = $dao->getAllDocumentUnitByFilter($this->getAppRequest(), $this->getAppSession());

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

        $masterdocumenttype = new Erems_Models_App_Masterdata_DocumentTypeonly();
        $datadocumenttype = $masterdocumenttype->prosesDataWithSession($this->getAppSession(), TRUE); 

        $masterCluster = new Erems_Models_App_Masterdata_Cluster();
        $allCluster = $masterCluster->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterBlock = new Erems_Models_App_Masterdata_Block();
        $allBlock = $masterBlock->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterUnitStatus = new Erems_Models_App_Masterdata_UnitStatus();
        $allUnitStatus = $masterUnitStatus->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($allCty,$datadocumenttype, $allCluster, $allBlock, $allUnitStatus));

        return $dm;
    }

    public function maindetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));

        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Unit_UnitDao();
        $hasil = $dao->getOneUnit($unit->getId());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;    
    }

    public function unitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('blockb', 'pt', 'clusterb', 'type', 'productcategory', 'position', 'side', 'purpose', 'unitstatus', 'unithistory', 'tanahcode'), array("detail", "number_end", "mode_number_generator", "number_check", "deletedRows"));

        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getByProjectPtWitPage($unitTran, $this->getAppRequest());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function selectedunitRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));

        $dao = new Erems_Models_Unit_UnitDao();
        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $hasil = $dao->getOne($unit);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function documentsRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitdocument', array('documenttype'));

        $params = $this->getAppData();
        $dao = new Erems_Models_Master_UnitDocumentDao();        
        
        $hasil = $dao->getAllByUnitWOPL($params);
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

            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/unitdocuments/", "document_",$ext);
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
        $newDocument = new Erems_Models_Unit_UnitDocument();
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
           $dao = new Erems_Models_Master_UnitDocumentDao();
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
        $id = intval($params["unitdocument_id"]);
        
        if($id==0){
            $msg = "Invalid document id";
        }else{
            $dao = new Erems_Models_Master_UnitDocumentDao();
            $hasil = $dao->deleteOne($this->getAppSession()->getUser()->getId(), $id);
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_MastercustomerProcessor();
    }

    // added by rico 27102021
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
            "unit_unit_id" => $params[4], 
            "alasan" => $params[5], 
        );

        $dao   = new Erems_Models_Master_UnitDocumentDao();
        $hasil = $dao->saveUnitInformation($data);

        $arrayRespon = array("HASIL" => $data, "MSG" => "msg");
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    // added by rico 27102021
    public function documentsHistoryRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $params = $this->getAppData();
        $params = json_decode($params["unit_id"],true);

        $data = array(
            "project_id" => $this->getAppSession()->getProject()->getId(),
            "pt_id" => $this->getAppSession()->getPt()->getId(),
            "unit_id" => $params
        );

        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitdocumenthistory', array());
        
        $dao = new Erems_Models_Master_UnitDocumentDao();        
        $hasil = $dao->readUnitInformation($data);
               
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

}

?>
