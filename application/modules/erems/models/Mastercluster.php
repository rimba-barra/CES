<?php

class Erems_Models_Mastercluster extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_cluster';
	protected $session;
	protected $mydb = NULL;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$defaultConfig = $this->getAdapter()->getConfig();
		$this->mydb = new Zend_Db_Adapter_Sqlsrv(array(
			'host' => $defaultConfig['host'],
			'username' => $defaultConfig['username'],
			'password' => $defaultConfig['password'],
			'dbname' => 'erems'
		));
	}

	function masterclusterRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$resultcount = $this->execSP('sp_cluster_count', $param['code'], $param['cluster'], $param['description'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['flag_svg']);
				$resultdata = $this->execSP('sp_cluster_read', $param['code'], $param['cluster'], $param['description'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['start'], $param['limit'], $param['flag_svg']);

				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;
				$return['success'] = true;
			} catch (Exception $e) {
				//  var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function masterclusterCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				if ($param['detail_id'] == NULL) {
					$affectedRow = $this->execSP('sp_cluster_create', $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['cluster'], $param['img_siteplant'], $param['img_legendlayer'], $param['description'], $this->session->getUserId());
				} else {

					$affectedRow = $this->execSP('sp_cluster_create', $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['cluster'], $param['img_siteplant'], $param['img_legendlayer'], $param['description'], $this->session->getUserId(), $param['detail_id'], $param['detail_title'], $param['detail_image'], $param['detail_is_default'], $param['detail_description']);
				}
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterclusterUpdate($param = array()) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				if ($param['detail_id'] == NULL) {
					$affectedRow = $this->execSP('sp_cluster_update', $param['cluster_id'], $param['code'], $param['cluster'], $param['img_siteplant'], $param['img_legendlayer'], $param['description'], $this->session->getUserId(), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				} else {
					$affectedRow = $this->execSP('sp_cluster_update', $param['cluster_id'], $param['code'], $param['cluster'], $param['img_siteplant'], $param['img_legendlayer'], $param['description'], $this->session->getUserId(), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['detail_id'], $param['detail_title'], $param['detail_image'], $param['detail_is_default'], $param['detail_description']);
				}

				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterclusterUpdateDetail($param = array()) {
		$this->_name = 'md_clusterimage';
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_cluster_images_update', $param['clusterimages_id'], $param['title'], $param['image'], $param['is_default'], $param['description'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterclusterDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'cluster_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_cluster_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterclusterDeleteDetail($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'clusterimages_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_cluster_images_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterclusterImagesRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$resultcount = $this->execSP('sp_cluster_images_count', $param['cluster_id']);
				$resultdata = $this->execSP('sp_cluster_images_read', $param['cluster_id']);

				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;
				$return['success'] = true;
			} catch (Exception $e) {
				//  var_dump($e->getMessage());
			}
		}
		return $return;
	}

}
