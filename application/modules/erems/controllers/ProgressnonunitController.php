<?php

class Erems_ProgressnonunitController extends Erems_Box_Models_App_Hermes_AbstractController {
	
	
	//start added by ahmad riadi 23-01-2017
    protected $_session = null;
    protected $_project_id = 0;
    protected $_pt_id = 0;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();        
    }      
    //end added by ahmad riadi 23-01-2017

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'spktransaction', array('contractor'), array());
        $dao = new Erems_Models_Spk_SpkDao();
        $this->getAppRequest()->setOthersValue("spktype_id", Erems_Box_Config::SPKTYPE_NONUNIT);
        //$hasil = $dao->getAll($this->getAppRequest());
        // $hasil = array();
	    //print_r($this->_project_id);
		// print_r($this->_pt_id);
		$hasil = $dao->getAll($this->getAppRequest(),$this->_project_id,$this->_pt_id); //edited by ahmad riadi 23-01-2017
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function contractordetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'contractorprofile', array());
        $dao = new Erems_Models_Master_ContractorDao();
        $ct = new Erems_Models_Master_Contractor();
        $ct->setArrayTable($this->getAppData());
        $hasil = $dao->getById($ct);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function deleteprogressRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $c = new Erems_Models_Construction_Construction();
        $c->setArrayTable($this->getAppData());
        
        $dao = new Erems_Models_Construction_Dao();
        $hasilDelete = $dao->deleteOne($c,$this->getAppSession());

       $otherAT = array(array(
                "STATUS" => $hasilDelete
                
        ));


        $dm->setHasil(array($otherAT));


        return $dm;
    }

   

    public function pictureRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'constructionpicture', array(), array());
        $dao = new Erems_Models_Construction_Dao();
        $hasil = $dao->getPictureByConstruction($this->getAppRequest());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    public function constructionspkRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('spk','user'), array());
        $dao = new Erems_Models_Construction_Dao();
                $hasil = $dao->getBySpkNonUnit($this->getAppRequest());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('unitb', 'spk'), array('progressdetail', 'deletedRows'));

        $hasil = array();
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
        $masterSpkTy = new Erems_Models_App_Masterdata_SpkType();
        $allSpkTy = $masterSpkTy->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterCtr = new Erems_Models_App_Masterdata_Contractor();
        $allCtr = $masterCtr->prosesDataWithSession($this->getAppSession(), TRUE);






        $dm->setHasil(array($allSpkTy, $allCtr));


        return $dm;
    }

    public function mainDelete() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Spk_SpkTransaction());
        $dm->setDao(new Erems_Models_Spk_SpkDao());
        $dm->setIdProperty("spk_id");
        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Construction_Construction();
        $v = new Erems_Models_Construction_Validator();
        $v->setSpkType(Erems_Box_Config::SPKTYPE_NONUNIT);
        $dm->setDao(new Erems_Models_Construction_Dao());
        $dm->setValidator($v);
        $dm->setObject($obj);

        return $dm;
    }

    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/progress_nonunit/", "progress_nonunit_", "jpg,bmp");
        $imageUpload->run();
        if (!$imageUpload->isSuccess()) {
            $msg = $imageUpload->getErrorMsg();
        } else {
            $success = TRUE;
            $msg = $imageUpload->getImageName();
        }
        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_ProgressUnitProcessor();
    }

}

?>