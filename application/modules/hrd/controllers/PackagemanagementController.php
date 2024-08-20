<?php

class Hrd_PackagemanagementController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
	public function checkapprovalRead() {
        $hasil = FALSE;
    	$msg = "";
		
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId = $this->getAppSession()->getPt()->getId();
	
		$tempCurrentGroupId = $this->getAppSession()->getGroupId();
		
		//var_dump($tempCurrentGroupId);
		
		
		$paramName = "approval_package_document";
		// dao
		$dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
        $hasil = $dao->getCheckApproval('packagemanagement', $projectId, $ptId);
		$valid = FALSE;
		if(count($hasil[1]) > 0){
			foreach($hasil[1] as $row){
				if($row["name"]==$paramName){
					$paramGroupId = $row["value"];
					if($paramGroupId == $tempCurrentGroupId){
						$valid = TRUE;
					}
					break;
				}
			}
		}
		
		
        $arrayRespon = array("HASIL" => $hasil,"VALIDAPPROVE"=>$valid, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
	
	/* TEMPLATE
	public function checkapproveRead() {
        $hasil = FALSE;
    	$msg = "";

        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
	*/

    public function allRead() {
	
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagement', array(), array('details'));
		$dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
		$obj = new Hrd_Models_Master_Packagemanagement_Packagemanagement();
       // $dao = $this->getMainDao();
      //  $obj = $this->getMainObject();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(), $obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function headerdataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterproject = new Hrd_Models_App_Mastertable_Project();
        $masterpt = new Hrd_Models_App_Mastertable_Pt();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $all = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
		
		$user_project_id =  array(
        	"user_project_id" => $this->getAppSession()->getProject()->getId()
        );
		
        $dm->setHasil(array($allproject, $allpt, $user_project_id));
        return $dm;
    }

    public function formdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagementdetail', array(), array());
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterjenisdokumen = new Hrd_Models_App_Mastertable_Jenisdokumen();
        $alljenisdokumen = $masterjenisdokumen->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setDataList($dataList);
        $dm->setHasil(array($alljenisdokumen));
        return $dm;
    }

    public function packagemanagementdetaillistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagementdetail', array('jenisdokumen'), array());
        $dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
        $obj_jenisdokumen = new Hrd_Models_Master_Jenisdokumen();
        $obj_jenisdokumen->setArrayTable($this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil(array());
        return $dm;
    }

    public function updatedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagementdetail', array('jenisdokumen'), array());
        $dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
        $obj_jenisdokumen = new Hrd_Models_Master_Jenisdokumen();
        $data = $this->getAppData();
        $obj_jenisdokumen->setArrayTable($this->getAppData());
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['pmdocument_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detailRead() {
        
    }

    protected function getMainDao() {
        return new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
    }

    protected function getMainFieldID() {
        return "pmdocument_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Master_Packagemanagement_Packagemanagement();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Master_Packagemanagement_PackagemanagementValidator();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_PackagemanagementProcessor();
    }
    public function maindataRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
         $success = $dao->getdataByid($data["pmdocument_id"]);
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }

    public function approveDataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagementdetail', array(), array());
        $dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
        $data = $this->getAppData();
        $hasil = $dao->Approvedata($data['pmdocument_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function rejectDataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagementdetail', array(), array());
        $dao = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
        $data = $this->getAppData();
        $hasil = $dao->Rejectdata($data['pmdocument_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
 	public function projectuserRead() {	
        return Box_Tools::instantRead(array(
        		"project_id" => $this->getAppSession()->getProject()->getId()
        ));
    }
    
	/*wulan edit 2017 11 02*/
    public function savecopyRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->saveCopy($this->getAppSession(), $data['project_id'], $data['pt_id']);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	/*end wulan edit 2017 11 02*/
}

?>