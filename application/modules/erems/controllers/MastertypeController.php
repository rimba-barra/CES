<?php

// class Erems_MastertypeController extends Erems_Box_Models_App_Hermes_AbstractController implements Erems_Box_Summoner {
class Erems_MastertypeController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'typetran', array("clusterb", "productcategory"), array("typeattribute", "deletedRows"));
        $dao = new Erems_Models_Master_TypeDao();
        $dao->setSes($this->getAppSession());

        $hasil = $dao->getAll($this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function searchinitRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $masterCl = new Erems_Models_App_Masterdata_Cluster();
        $allCl = $masterCl->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterPC = new Erems_Models_App_Masterdata_ProductCategory();
        $allPC = $masterPC->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($allCl,$allPC));

        return $dm;
    }

    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $masterAttr = new Erems_Models_App_Masterdata_Attribute();
        $allAttr = $masterAttr->prosesDataWithSession($this->getAppSession(), TRUE);
                
        $masterPur = new Erems_Models_App_Masterdata_Purpose();
        $allPur = $masterPur->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterAtval = new Erems_Models_App_Masterdata_AttributeValue();
        $allAttrVal = $masterAtval->prosesDataWithSession($this->getAppSession(), TRUE);
                
        $masterCl = new Erems_Models_App_Masterdata_Cluster();
        $allCl = $masterCl->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterPC = new Erems_Models_App_Masterdata_ProductCategory();
        $allPC = $masterPC->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($allAttr,$allAttrVal,$allCl,$allPC,$allPur));

        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'typeattribute', array('attribute', 'attributevalue'));
        $dao = new Erems_Models_Master_TypeDao();
        $type = new Erems_Models_Master_Type();
        $type->setArrayTable($this->getAppData());
        if($type->getId() > 0){
             $hasil = $dao->getAttribute($type);
        }else{
            $hasil = $dao->getAttributeDefault();
        }
       
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function attributevalueRead(){
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'attributevalue', array('attribute'));
        $dao = new Erems_Models_Attribute_Dao();
      
        $hasil = $dao->getAllValue();

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function attributeRead(){
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'attribute', array('attributevalue'));
        $dao = new Erems_Models_Attribute_Dao();
                
        $hasil = $dao->getAll();

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Master_TypeTran();
        $validator = new Erems_Models_Type_Validator();
        $validator->setDao(new Erems_Models_Master_TypeDao());
        $dm->setDao(new Erems_Models_Master_TypeDao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_TypeTran());
        $dm->setDao(new Erems_Models_Master_TypeDao());
        $dm->setIdProperty("type_id");
        return $dm;
    }

    public function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;        
        $imageUpload = NULL;
        
        $tipe = $this->getRequest()->getPost('tipe');
        $flag = $this->getRequest()->getPost('flag');

        if($tipe=="document"){

            $file = $_FILES['file_floorplan_'.$flag.'access'];
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

            $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/mastertype/", "tmp_" . $flag . "_", $ext);
            $imageUpload->runDocument('', false);           
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

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_MasterTypeProcessor();
    }

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_MastertypeController($request,$response);
    }

}

?>
