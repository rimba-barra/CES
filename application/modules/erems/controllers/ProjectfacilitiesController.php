<?php

class Erems_ProjectfacilitiesController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'projectfacilities', array('facilitiestype'), array('deletedRows','detail'));
        $dao = new Erems_Models_Master_ProjectFacilitiesDao();

        $pf = new Erems_Models_Master_ProjectFacilities();
        $pf->setArrayTable($this->getAppData());
        $pf->setProject($this->getAppSession()->getProject());
        $pf->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$pf);

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

        //===== MASTERDATA == //
        $masterPL = new Erems_Models_App_Masterdata_FacilitiesType();
        $allPL = $masterPL->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($allPL));

        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'projectfacilities', array('facilitiestype'));
        $pl = new Erems_Models_Master_ProjectFacilities();
        $pl->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Master_ProjectFacilitiesDao();
      //  $hasil = $dao->getOne($pl->getId());
        $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Master_ProjectFacilities();
        $dm->setDao(new Erems_Models_Master_ProjectFacilitiesDao());
        $dm->setValidator(new Erems_Models_Master_ProjectFacilitiesValidator());
        $dm->setObject($obj);

        return $dm;
    }
    
    public function imageslistRead(){
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'projectfacilitiesimage', array(),array('deletedRows'));
        $pl = new Erems_Models_Master_ProjectFacilities();
        $pl->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Master_ProjectFacilitiesDao();
        $hasil = $dao->getImages($pl);
    
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/projectfacilities/", "","jpg,bmp");
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
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_ProjectFacilities());
        $dm->setDao(new Erems_Models_Master_ProjectFacilitiesDao());
        $dm->setIdProperty("projectfacilities_id");
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_ProjectFacilitiesProcessor();
    }
}
?>
