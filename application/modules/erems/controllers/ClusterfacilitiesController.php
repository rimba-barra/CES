<?php

class Erems_ClusterfacilitiesController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'clusterfacilities', array('facilitiestype','clusterb'),array('detail','deletedRows'));
        
        $dao = new Erems_Models_Master_ClusterFacilitiesDao();
        $obj = new Erems_Models_Master_ClusterFacilities();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$obj);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        
        $masterf = new Erems_Models_App_Masterdata_FacilitiesType();
        $allf = $masterf->prosesDataWithSession($this->getAppSession(), TRUE);

        $mc = new Erems_Models_App_Masterdata_Cluster();
        $allC = $mc->prosesDataWithSession($this->getAppSession(), TRUE);


        $dm->setHasil(array($allf,$allC));


        return $dm;
    }
    
    public function imagelistRead(){
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'clusterfacilitiesimage', array(),array());
        
        $dao = new Erems_Models_Master_ClusterFacilitiesDao();
        $cf = new Erems_Models_Master_ClusterFacilitiesImage();
        $cf->setArrayTable($this->getAppData());
        $hasil = $dao->getImages($cf);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/clusterfacilities/", "cf_","jpg,bmp");
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

    public function maindetailRead() {
        /*
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changename', array('purchaseletter','changenamereason',
            'customerprofile','unittran', 'unitstatus', 'clusterb', 'blockb','city',array('city','city2_'),
            'productcategory', 'type',array('customerprofile','customernew_')),array('approvemode','deletedRows'));
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Sales_Change_Dao();
        
        $hasil = $dao->getOneCN($cn);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        
        


        return $dm;
         
         */
    }

    
    
     

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $v = new Erems_Models_Master_ClusterFacilitiesValidator();
        $v->setSes($this->getAppSession());
        $dm->setDao(new Erems_Models_Master_ClusterFacilitiesDao());
        $dm->setValidator($v);
        $dm->setObject(new Erems_Models_Master_ClusterFacilities());

        return $dm;
    }
    
    public function mainDelete() {
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_ClusterFacilities());
        $dm->setDao(new Erems_Models_Master_ClusterFacilitiesDao());
        $dm->setIdProperty("clusterfacilities_id");
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>