<?php

/*
 * Author : Ahmad Riadi MIS KP
 * Date : 04-10-2017
 * Persyaratan pada Controller ini :
 * - Telah membuat data popup di tabel m_activepopup dbmaster.
 * - Tentukan rolenya, jika 0 bersifat general, jika 1 akan aktif di 
 * group tertentu di module aplikasi yang sedang di akses.
 * - Buat file controller popup di Application Management
 * - Setting group-group default mempunya action ke popup yang kita buat,
 * namun muncul atau tidaknya popup tergantung role yang 
 * tadi dibahas di point atas.
 */

class PopupController extends Zend_Controller_Action {

	private $model;
	private $session;

	function init() {
		$this->model = new Main_Models_Popup();
	}

	public function readAction() {
		$result = array('data' => array(), 'total' => 0, 'success' => false);
		$result = $this->model->popupData();

		//addby RH 20211123
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		if ($this->session->getCurrentModuleId() == 5) {
			$alertInformasi = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getAlertInformasi();
			$result['alert']['active'] = 0;
			if ($alertInformasi['active'] == 1 && in_array(date('d'), $alertInformasi['tanggal']) && in_array($this->session->getUserId(), $alertInformasi['user_id'])) {
				$result['alert']['active'] = 1;
				$result['alert']['pesan'] = $alertInformasi['pesan'];
			}
		}
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

}
