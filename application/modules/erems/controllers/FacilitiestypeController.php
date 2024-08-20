<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Erems_FacilitiestypeController extends Erems_Models_App_Template_AbstractMasterController implements Erems_Box_Summoner {
 
    
    protected function testingFlag() {
        return FALSE;
    }

    
    public function _getMainDataModel() {
     
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'facilitiestype', array(), array()));
        $dm->setObject(new Erems_Models_Master_FacilitiesType());
        $dm->setDao(new Erems_Models_Master_FacilitiesTypeDao());
        $dm->setValidator(new Erems_Models_Master_FacilitiesTypeValidator());
        $dm->setIdProperty("facilitiestype_id");
        return $dm;
        
    } 
    
    
    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/facilitiestype/", "facilitiestype_","jpg,bmp");
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

    public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
        return new Erems_Models_Oldcontroller_FacilitiestypeController($request,$response);
    }
}

?>