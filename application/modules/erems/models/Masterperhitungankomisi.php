<?php

class Erems_Models_Masterperhitungankomisi extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_komisi_perhitungan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function perhitungankomisiRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_perhitungan_id'],
					$param['judul'],
					$param['start'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterperhitungankomisi_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function perhitungankomisidetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_masterperhitungankomisidetail_read', $param['komisi_perhitungan_id']);
				$return['total'] = count($result[0]);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function perhitungankomisiCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$komisi_perhitungan_detail_id = '';
				$pricetype_id = '';
				$collection_name = '';
				$persen_uangmasuk_coll = '';
				$persen_pencairan_komisi = '';
				$is_uangmuka = '';
				$is_sppjb = '';
				$is_akad = '';
				$deleted_detail = '';
				$param_detail = $param['data_detail'];
				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'komisi_perhitungan_detail_id': $komisi_perhitungan_detail_id .= $value . "~#~";
									break;
								case 'pricetype_id': $pricetype_id .= $value . "~#~";
									break;
								case 'collection_name': $collection_name .= $value . "~#~";
									break;
								case 'persen_uangmasuk_coll': $persen_uangmasuk_coll .= ((float) $value) . "~#~";
									break;
								case 'persen_pencairan_komisi': $persen_pencairan_komisi .= $value . "~#~";
									break;
								case 'is_uangmuka': $is_uangmuka .= $value . "~#~";
									break;
								case 'is_sppjb': $is_sppjb .= $value . "~#~";
									break;
								case 'is_akad': $is_akad .= $value . "~#~";
									break;
								case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
									break;
							}
						}
					};

					$komisi_perhitungan_detail_id = preg_replace('/(~)$/', '', $komisi_perhitungan_detail_id);
					$pricetype_id = preg_replace('/(~)$/', '', $pricetype_id);
					$collection_name = preg_replace('/(~)$/', '', $collection_name);
					$persen_uangmasuk_coll = preg_replace('/(~)$/', '', $persen_uangmasuk_coll);
					$persen_pencairan_komisi = preg_replace('/(~)$/', '', $persen_pencairan_komisi);
					$is_uangmuka = preg_replace('/(~)$/', '', $is_uangmuka);
					$is_sppjb = preg_replace('/(~)$/', '', $is_sppjb);
					$is_akad = preg_replace('/(~)$/', '', $is_akad);
					$deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
				}

				$data = array(
					$param['komisi_perhitungan_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['judul'],
					$param['description'],
					$komisi_perhitungan_detail_id,
					$pricetype_id,
					$collection_name,
					$persen_uangmasuk_coll,
					$persen_pencairan_komisi,
					$is_uangmuka,
					$is_sppjb,
					$is_akad,
					$deleted_detail,
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterperhitungankomisi_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	function perhitungankomisiUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_perhitungan_id'],
					$param['code'],
					$param['perhitungan_komisi'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterperhitungankomisi_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function perhitungankomisiDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_perhitungan_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . '~#~';
				}
			}
			try {
				$data = array(
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterperhitungankomisi_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function perhitungankomisidetailDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_perhitungan_detail_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . '~#~';
				}
			}
			try {
				$data = array(
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterperhitungankomisidetail_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>