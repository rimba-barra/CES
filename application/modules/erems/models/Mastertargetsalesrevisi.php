<?php

class Erems_Models_Mastertargetsalesrevisi extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_bulan = 'm_targetsales_revisi';
	protected $datadelimiter = '~#~';
	protected $returned = array('total' => 0, 'success' => false, 'data' => array());
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function dataRead($param = array(), $export = null) {
		if (is_array($param) && count($param)) {
			$spbulan = 'sp_targetsales_revisi_read';
			try {
				if ($export == 1) {
					$result = $this->execSP3($spbulan, null, $param['tahun'], 1, 100, $param['view_grid_param'], $this->session->getCurrentPtId());
				} else {
					$searchParam = Zend_Json::decode($param['datasearch']);
					$result = $this->execSP3($spbulan, isset($searchParam['targetsales_revisi_id']) ?: 0, $searchParam['tahun'], $param['page'], $param['limit'], $searchParam['view_grid_param'], $this->session->getCurrentPtId());
				}
				$idx = 0;
				$resultTambahan = [];
				foreach ($result[1] as $r) {
					$result[1][$idx]['bulan'] = $this->getBulan($r['bulan']);
					foreach ($r as $field => $val) {
						if (!isset($resultTambahan[$field])) {
							$resultTambahan[$field] = $val;

							if (in_array($field, ['targetsales_revisi_id', 'tahun', 'bulan'])) {
								$resultTambahan[$field] = '';
								$resultTambahan['bulan'] = '<b>TOTAL</b>';
							}


							if (strpos($field, 'target') !== false) {
								$resultTambahan[$field] = 0;
							}
						}

						if (strpos($field, 'target') !== false) {
							$resultTambahan[$field] += $val;
							if ($val === null || $val == "") {
								$result[1][$idx][$field] = 0;
							}
						}
					}
					$idx++;
				}


				if ($result[0][0]['RECORD_TOTAL'] > 0) {
					$result[1][12] = $resultTambahan;
				}
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL'];
				$this->returned['success'] = true;
				$this->returned['data'] = $result[1];
			} catch (Exception $e) {
				
			}
		}
		return $this->returned;
	}

	function dataCreate($param = array()) {
		if (is_array($param) && count($param)) {
			$spbulan = 'sp_targetsales_revisi_create';
			$spparamkey = array('data' => array('tahun', 'bulan', 'target_tanah_v', 'target_bangunan_v', 'target_tanah_m', 'target_bangunan_m', 'target_unit', 'target_coll_v', 'active' => 1));

			try {
				$result = $this->execSP3($spbulan, $this->generateSPParam($spparamkey, $param), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $this->session->getUserId());
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $this->returned;
	}

	function dataUpdate($param = array()) {
		if (is_array($param) && count($param)) {
			$postData = Zend_Json::decode($param['data']);

			$listPurpose = $this->dataPurpose();
			$arrPurpose = [];
			foreach ($listPurpose['data'] as $key => $value) {
				$purpose = strtolower($value['purpose_target_fieldname']);

				$arrPurpose[] = $purpose . '_target_tanah_m';
				$arrPurpose[] = $purpose . '_target_bangunan_m';
				$arrPurpose[] = $purpose . '_target_unit';
				$arrPurpose[] = $purpose . '_target_tanah_v';
				$arrPurpose[] = $purpose . '_target_bangunan_v';
				$arrPurpose[] = $purpose . '_target_v';
			}

			$fieldName = "";
			$fieldValue = "";
			foreach ($postData as $key => $value) {
				if (in_array($key, $arrPurpose)) {
					$fieldName .= $key . "~#~";
					$fieldValue .= str_replace(",", "", $value) . "~#~";
				}
			}
			$spbulan = 'sp_targetsales_revisi_update';
			$spparamkey = array(
				$postData['targetsales_revisi_id'],
				$fieldName,
				$fieldValue,
				str_replace(",", "", $postData['total_target_tanah_m'], $value),
				str_replace(",", "", $postData['total_target_bangunan_m'], $value),
				str_replace(",", "", $postData['total_target_unit'], $value),
				str_replace(",", "", $postData['total_target_v'], $value),
				str_replace(",", "", $postData['collection_target_v'], $value),
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId(),
				$this->session->getUserId(),
				str_replace(",", "", $postData['collection_target_cash_v'], $value),
				str_replace(",", "", $postData['collection_target_inhouse_v'], $value),
				str_replace(",", "", $postData['collection_target_kpr_v'], $value)
			);

			try {
				$result = $this->execSP3($spbulan, $spparamkey);
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) {
//				echo $e;
			}
		}
		return $this->returned;
	}

	function dataPurpose() {
		try {
			$result = $this->execSP3('sp_targetsales_purpose_read', $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$this->returned['total'] = $result[0];
			$this->returned['success'] = $result[0] > 0;
			$this->returned['data'] = $result[0];
		} catch (Exception $e) {
//				echo $e;
		}
		return $this->returned;
	}
	
	function dataProjectSplit() {
		try {
			$result = $this->execSP3('sp_project_split_read', $this->session->getCurrentProjectId());
			$this->returned['total'] = $result[0];
			$this->returned['success'] = $result[0] > 0;
			$this->returned['data'] = $result[0];
		} catch (Exception $e) {
//				echo $e;
		}
		return $this->returned;
	}

	function dataDelete($param = array()) {
		if (is_array($param) && count($param)) {
			$spbulan = 'sp_targetsales_revisi_destroy';
			$spparamkey = array('data' => array('targetsales_revisi_id'));
			try {
				$result = $this->execSP3($spbulan, $this->generateSPParam($spparamkey, $param, array('datadelimiter' => ($this->datadelimiter))), $this->session->getUserId());
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $this->returned;
	}

	function generateTargetRead($param = array()) {
		if (is_array($param) && count($param)) {
			//generate 1 yr target
			$sptarget = 'sp_targetsales_revisi_generate_create';
			$spparamkey = array('data' => array('tahun'));
			$param = (array) json_decode($param['data']);
			for ($i = 1; $i <= 12; $i++) {
				$month = $i;
				$result = $this->execSP3($sptarget, [$param['tahun'], $month, 1, $param['view_grid_param'], $this->session->getCurrentPtId(), $this->session->getUserId()]);
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			}
		}
		return $this->returned;
	}

	private function overideReadMode($param) {
		if (array_key_exists('mode_read', $param)) {
			//go to read
			return $this->{$param['mode_read'] . 'Read'}($param);
			die();
		} else {
			return false;
		}
	}

	private function getBulan($bulan) {
		switch ($bulan) {
			case 1:
				return 'Januari';
				break;
			case 2:
				return 'Februari';
				break;
			case 3:
				return 'Maret';
				break;
			case 4:
				return 'April';
				break;
			case 5:
				return 'Mei';
				break;
			case 6:
				return 'Juni';
				break;
			case 7:
				return 'Juli';
				break;
			case 8:
				return 'Agustus';
				break;
			case 9:
				return 'September';
				break;
			case 10:
				return 'Oktober';
				break;
			case 11:
				return 'November';
				break;
			case 12:
				return 'Desember';
				break;
			case 13:
				return '<text style="color:blue; font-weight:bold">TOTAL</text>';
				break;
		}
	}

}
