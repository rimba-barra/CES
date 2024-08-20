<?php

class Erems_MasterclusterController extends Erems_Box_Models_App_Hermes_AbstractController implements Erems_Box_Summoner {

	protected function testingFlag() {
		return FALSE;
	}

	public function allRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'clustertran', array('user', array('user', 'usermodi_')), array("detail", "deletedRows"));

		$dao = new Erems_Models_Master_ClusterDao();
		$cluster = new Erems_Models_Master_ClusterTran();
		$cluster->setProject($this->getAppSession()->getProject());
		$cluster->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getByProjectPtWithPageSearch($cluster, $this->getAppRequest());

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
		$masterRsn = new Erems_Models_App_Masterdata_ReasonCN();
		$allRCN = $masterRsn->prosesDataWithSession($this->getAppSession(), TRUE);

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistChangeName($this->getAppSession());

		$otherAT = array(array(
				"GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
				"GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
				"GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
				//"APPROVALUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_AuthorizeConfig::CHANGENAME_APPROVEUSER ? TRUE : FALSE
				"APPROVALUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "CHANGENAME_APPROVEUSER") ? TRUE : FALSE
		));

		$dm->setHasil(array($allRCN, $otherAT));

		return $dm;
	}

	public function imagelistRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'clusterimage', array(), array());

		$dao = new Erems_Models_Master_ClusterDao();
		$cluster = new Erems_Models_Master_ClusterB();
		$cluster->setArrayTable($this->getAppData());
		if ($cluster->getId() == 0) {
			$hasil = array();
		} else {
			$hasil = $dao->getImageList($cluster, $this->getAppRequest());
		}


		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	function uploadAction() {
		$app = new Erems_Box_Models_App_Models_Create($this);
		$msg = '???';
		$success = FALSE;

		if ($this->getRequest()->getPost('mode') == 'siteplan_svg') {
			$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/mastercluster/", "siteplansvg_", "svg");
			$imageUpload->runDocument('svg');
		} else {
			$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/mastercluster/", "cluster_");
			$imageUpload->run();
		}
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
		$cluster = new Erems_Models_Master_ClusterTran();
		$cluster->setProject($this->getAppSession()->getProject());
		$cluster->setPt($this->getAppSession()->getPt());
		$dm->setDao(new Erems_Models_Master_ClusterDao());
		$dm->setValidator(new Erems_Models_Master_ClusterValidator());
		$dm->setObject($cluster);

		return $dm;
	}

	public function mainDelete() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject(new Erems_Models_Master_ClusterB());
		$dm->setDao(new Erems_Models_Master_ClusterDao());
		$dm->setIdProperty("cluster_id");
		return $dm;
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_MasterclusterProcessor();
	}

	public function getOldController(\Zend_Controller_Request_Http $request, \Zend_Controller_Response_Http $response) {
		return new Erems_Models_Oldcontroller_MasterclusterController($request, $response);
	}

}

?>
