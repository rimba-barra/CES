<?php

class Erems_PermintaankomisiController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Permintaankomisi();
		if ($this->getRequest()->getPost('mode_read') == 'purchaseletterlist') {
			$result = $model->purchaseletterlistRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'detail') {
			$result = $model->permintaankomisidetailRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'salesmanpurchaselleter') {
			$result = $model->salesmanpurchaselleterRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'listUnit') {
			$result = $model->permintaankomisilistunitRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'listUnitBatal') {
			$result = $model->permintaankomisilistunitbatalRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'targetBatal') {
			$result = $model->permintaankomisitargetbatalRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'targetJual') {
			$result = $model->permintaankomisitargetjualRead($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'featureProgresif') {
			$result = $this->featureProgresif();
		} else {
			$result = $model->permintaankomisiRead($this->getRequest());
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	public function purchaseletterlistRead() {
		$params = $this->getRequest()->getPost();

		$sesBox = Apli::getSession();

		$dao = new Erems_Models_Komisi_Dao();

		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
//$pl->setArrayTable($params);
		$pl->getCustomer()->setName($params["customer_name"]);
		$pl->getUnit()->setNumber($params["unit_number"]);
		$hasil = $dao->getAllPurchaseletter(Apli::getRequest($params), $sesBox, $pl);

		return array(
			"DATA" => $hasil
		);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Permintaankomisi();
		$result = $model->permintaankomisiCreate($post_data);
		if ($result['success'] == true) {
			$req['from'] = 'permintaanKomisi';
			$req['data_purchaseletter_id'][] = $post_data['purchaseletter_id'];
			$req['pricetype_id'][] = $post_data['pricetype_id'];
			$this->getRequest()->setPost('data', Zend_Json::encode($req));
			include 'KlaimkomisinewController.php';
			$klaim = new Erems_KlaimkomisinewController($this->_request, $this->_response);
//			$klaim->setRequest($request);
			$klaim->createAction();
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Permintaankomisi();
		$result = $model->permintaankomisiUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Permintaankomisi();

		$result = $model->permintaankomisiDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function featureProgresif() {
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

		$return['data']['KOMISIPROGRESIF'] = $genco->usePermintaanKomisiProgresif();
		return $return;
	}

}

?>