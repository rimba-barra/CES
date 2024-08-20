<?php

class Erems_Models_Bagihasilpilihdata extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function dataRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['unit_number'],
					$param['customer_name'],
					$param['cluster_id'],
					$param['set_lrp'],
					$param['pt_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page'],
					$param['type']
				);
				$result = $this->execSP3('sp_bagihasilpilihdata_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	/* function landrepaymentCreate($param = array()) {
	  $landrepayment_id = $param['landrepayment_id'];
	  $code = $param['code'];
	  $keterangan = $param['keterangan'];
	  $management_fee = $param['management_fee'];
	  $royalty = $param['royalty'];

	  $param_detail = $param['data_detail'];

	  if (is_array($param) && count($param)) {
	  try {
	  $landrepayment_detail_id = '';
	  $landrepayment_id_header = '';
	  $nomor = '';
	  $periode_awal = '';
	  $periode_akhir = '';
	  $nilai_pembayaran = '';

	  $deleted_detail = '';

	  //detail
	  if (is_array($param_detail) && count($param_detail) > 0) {
	  foreach ($param_detail as $idx => $data) {

	  foreach ($data as $key => $value) {
	  switch ($key) {
	  case 'landrepayment_detail_id': $landrepayment_detail_id .= $value . "~#~";
	  break;
	  case 'landrepayment_id': $landrepayment_id_header .= $value . "~#~";
	  break;
	  case 'nomor': $nomor .= $value . "~#~";
	  break;
	  case 'periode_awal': $periode_awal .= $value . "~#~";
	  break;
	  case 'periode_akhir': $periode_akhir .= $value . "~#~";
	  break;
	  case 'nilai_pembayaran': $nilai_pembayaran .= $value . "~#~";
	  break;
	  case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
	  break;
	  }
	  }
	  };

	  $landrepayment_detail_id = preg_replace('/(~)$/', '', $landrepayment_detail_id);
	  $landrepayment_id_header = preg_replace('/(~)$/', '', $landrepayment_id_header);
	  $nomor = preg_replace('/(~)$/', '', $nomor);
	  $periode_awal = preg_replace('/(~)$/', '', $periode_awal);
	  $periode_akhir = preg_replace('/(~)$/', '', $periode_akhir);
	  $nilai_pembayaran = preg_replace('/(~)$/', '', $nilai_pembayaran);
	  $deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
	  }

	  $result = $this->execSP3('sp_bagihasilpilihdata_create',
	  $landrepayment_id,
	  $this->session->getCurrentProjectId(),
	  $this->session->getCurrentPtId(),
	  $code,
	  $keterangan,
	  $management_fee,
	  $royalty,
	  $landrepayment_detail_id, $landrepayment_id_header, $nomor, $periode_awal, $periode_akhir, $nilai_pembayaran, $deleted_detail,
	  $this->session->getUserId()
	  );

	  $this->returned['total'] = $result[0];
	  $this->returned['success'] = $result[0] > 0;
	  } catch (Exception $e) {
	  }
	  }
	  return $this->returned;
	  } */

	function dataUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$is_set_toall     = $param['is_set_toall'];
				$is_set_tocluster = $param['is_set_tocluster'];
				$is_set_toblock   = $param['is_set_toblock'];
				// $komisi_marketing = ($param['komisi_marketing'] ? $param['komisi_marketing'] : 0);

				$param_update = 'unit';
				if($is_set_toall == 1){
					$param_update = 'all';
				}
				else if($is_set_tocluster == 1){
					$param_update = 'cluster';
				}
				else if($is_set_toblock == 1){
					$param_update = 'block';
				}

				$data_array = array(
					$param_update,
					$param['unit_id'],
					$param['cluster_id'],
					$param['block_id'],
					$param['landrepayment_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bagihasilpilihdata_update_new', $data_array);

				// if ($is_set_tocluster == 1 && $is_set_toblock == 0) {

				// 	$data = array(
				// 		$param['purchaseletter_id'],
				// 		$param['unit_id'],
				// 		$param['is_prosesbagihasil'],
				// 		$param['kelompok_edit'],
				// 		$param['landrepayment_id'],
				// 		$komisi_marketing,
				// 		$param['cluster_id'],
				// 		$this->session->getCurrentProjectId(),
				// 		$this->session->getCurrentPtId(),
				// 		$this->session->getUserId()
				// 	);
				// 	$result = $this->execSP3('sp_bagihasilpilihdata_allcluster_update', $data);
				// } else if ($is_set_tocluster == 1 && $is_set_toblock == 1) {

				// 	$data = array(
				// 		$param['purchaseletter_id'],
				// 		$param['unit_id'],
				// 		$param['is_prosesbagihasil'],
				// 		$param['kelompok_edit'],
				// 		$param['landrepayment_id'],
				// 		$komisi_marketing,
				// 		$param['cluster_id'],
				// 		$param['block_id'],
				// 		$this->session->getCurrentProjectId(),
				// 		$this->session->getCurrentPtId(),
				// 		$this->session->getUserId()
				// 	);
				// 	$result = $this->execSP3('sp_bagihasilpilihdata_allclusterblock_update', $data);
				// } else if ($is_set_tocluster == 0 && $is_set_toblock == 1) {

				// 	$data = array(
				// 		$param['purchaseletter_id'],
				// 		$param['unit_id'],
				// 		$param['is_prosesbagihasil'],
				// 		$param['kelompok_edit'],
				// 		$param['landrepayment_id'],
				// 		$komisi_marketing,
				// 		$param['cluster_id'],
				// 		$param['block_id'],
				// 		$this->session->getCurrentProjectId(),
				// 		$this->session->getCurrentPtId(),
				// 		$this->session->getUserId()
				// 	);
				// 	$result = $this->execSP3('sp_bagihasilpilihdata_allclusterblock_update', $data);
				// } else {

				// 	$data = array(
				// 		$param['purchaseletter_id'],
				// 		$param['unit_id'],
				// 		$param['is_prosesbagihasil'],
				// 		$param['kelompok_edit'],
				// 		$param['landrepayment_id'],
				// 		$komisi_marketing,
				// 		$this->session->getUserId()
				// 	);
				// 	$result = $this->execSP3('sp_bagihasilpilihdata_update', $data);
				// }
				
				$return['total']   = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function bagihasilDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'unit_id';
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
				$result = $this->execSP3('sp_bagihasilpilihdata_unset', $param[$key_name], $data);
				$return['total'] = count($result[0]);
				$return['success'] = count($result[0]) > 0;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

}

?>