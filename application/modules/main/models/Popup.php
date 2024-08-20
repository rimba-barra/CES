<?php

class Main_Models_Popup extends Zend_Db_Table_Abstract {

	private $session;
	private $project_id;
	protected $_schema = 'dbmaster';
	private $pt_id;
	private $user_id;
	private $apps_id;
	private $groupuser_id;
	protected $_name = 'm_activepopup';
	protected $options;

	function init() {
		date_default_timezone_set('Asia/Jakarta');
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->project_id = $this->session->getCurrentProjectId();
		$this->pt_id = $this->session->getCurrentPtId();
		$this->user_id = $this->session->getUserId();
		$this->apps_id = $this->session->getCurrentModuleId();
		$this->groupuser_id = $this->session->getCurrentGroupId();
	}

	public function popupData() {
		$return = array();
		$param = array($this->apps_id);
		$result = $this->execSP3('sp_popup_read', $param);
		$return['total'] = $result[0][0]['TOTALDATA'];
		$return['data'] = null;
		$return['user_id'] = $this->user_id;
		if ($return['total'] > 0) {
			$datareturn = $this->validatePopup($result[1]);
			$return['total'] = $datareturn['counter'];
			$return['data'] = $datareturn['data'];
		}
		return $return;
	}

	public function validatePopup($data) {
		$result = array();
		$counter = 0;
		if (is_array($data) && !empty($data)) {
			foreach ($data as $row) {
				if ($row['widget'] == 'Erems.view.popupppatk.Panel') {
					$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->project_id, $this->pt_id);
					if (in_array($this->user_id, $genco->getUserDisplayPopupPPATK()) && in_array(date('d'), $genco->getDateDisplayPopupPPATK())) {
						$result[] = $row;
					}
				} else {
					if ($row['popup_role'] > 0) {
						$usergroup_permit = $row['pop_group_user_apps_id'];
						$validate = $this->checkusergroup($usergroup_permit);
						if ($validate == 1) {
							$result[] = $row;
						}
					} else {
						$result[] = $row;
					}
				}
			}
			$counter = count($result);
		}
		return array("counter" => $counter, "data" => $result);
	}

	public function checkusergroup($usergroup_permit) {
		$data = explode(',', $usergroup_permit);
		if (!empty($data)) {
			$arraycheck = array();
			foreach ($data as $row) {
				if ($row == $this->groupuser_id) {
					$arraycheck[] = 'granted';
				} else {
					$arraycheck[] = 'denny';
				}
			}
			if (in_array('granted', $arraycheck)) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	}

}

?>