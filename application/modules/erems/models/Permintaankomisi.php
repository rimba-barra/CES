<?php

class Erems_Models_Permintaankomisi extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_komisi_permintaan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function permintaankomisiRead($params) {
		$return['success'] = false;
		try {
			$data = array(
				$params->getPost('komisi_permintaan_id'),
				$params->getPost('unit_number'),
				$params->getPost('cluster_id'),
				$params->getPost('block_id'),
				$params->getPost('unit_id'),
				$params->getPost('customer_name'),
				$params->getPost('page'),
				$params->getPost('limit'),
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId()
			);
			$result = $this->execSP3('sp_permintaankomisi_read', $data);
			$return['total'] = $result[0][0]['totalRow'];
			$return['data'] = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
//			echo $e;
		}
		return $return;
	}

	function purchaseletterlistRead($params) {
		$result = $this->execSP3('sp_permintaankomisilistpurchaseletter_read',
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId(),
				$params->getPost('page'),
				$params->getPost('limit'),
				$params->getPost('purchaseletter_no'),
				$params->getPost('customer_name'),
				$params->getPost('unit_id')
		);

		$return['total'] = $result[0][0]['totalRow'];
		$return['data'] = $result[1];
		$return['success'] = true;
		return $return;
	}

	function permintaankomisidetailRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_permintaankomisidetail_read', $params->getPost('komisi_permintaan_id', 0), $params->getPost('purchaseletter_id'));
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function permintaankomisiCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$komisi_permintaan_detail_id = '';
				$komisi_penerima_id = '';
				$komisi_persen_nominal = '';
				$komisi_value = '';
				$populated_data = '';
				$reff_id = '';
				$reff_name = '';
				$npwp = '';
				$purchaseletter_komisi_id = '';
				$persentase_komisi = '';
				$nilai_komisi = '';
				$persentase_ppn = '';
				$nilai_ppn = '';
				$pph_pt_perorangan = '';
				$persentase_pph_pt = '';
				$nilai_pph_pt = '';
				$is_grossup_pph_pt = '';
				$persentase_pph_perorangan = '';
				$nilai_pph_perorangan = '';
				$is_grossup_pph_perorangan = '';
				$total_komisi = '';
				$harga_netto = '';
				$is_progresif = '';
				$nilai_komisi_progresif_per_tglbuat = '';
				$keterangan = '';
				$deleted_detail = '';
				$is_changekavling = '';
				$komisi_permintaan_date = '';
				$purchaseletter_id_old = '';
				// added by rico 25112021
				$pengurang_komisi = '';
				$param_detail = $param['data_detail'];

				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'komisi_permintaan_detail_id': $komisi_permintaan_detail_id .= $value . "~#~";
									break;
								case 'komisi_penerima_id': $komisi_penerima_id .= $value . "~#~";
									break;
								case 'komisi_persen_nominal': $komisi_persen_nominal .= $value . "~#~";
									break;
								case 'komisi_value': $komisi_value .= str_replace(",", "", $value) . "~#~";
									break;
								case 'populated_data': $populated_data .= $value . "~#~";
									break;
								case 'reff_id': $reff_id .= $value . "~#~";
									break;
								case 'reff_name': $reff_name .= $value . "~#~";
									break;
								case 'npwp': $npwp .= $value . "~#~";
									break;
								case 'purchaseletter_komisi_id': $purchaseletter_komisi_id .= $value . "~#~";
									break;
								case 'persentase_komisi': $persentase_komisi .= $value . "~#~";
									break;
								case 'nilai_komisi': $nilai_komisi .= str_replace(",", "", $value) . "~#~";
									break;
								case 'persentase_ppn': $persentase_ppn .= $value . "~#~";
									break;
								case 'nilai_ppn': $nilai_ppn .= str_replace(",", "", $value) . "~#~";
									break;
								case 'pph_pt_perorangan': $pph_pt_perorangan .= $value . "~#~";
									break;
								case 'persentase_pph_pt': $persentase_pph_pt .= $value . "~#~";
									break;
								case 'nilai_pph_pt': $nilai_pph_pt .= str_replace(",", "", $value) . "~#~";
									break;
								case 'is_grossup_pph_pt': $is_grossup_pph_pt .= str_replace(",", "", $value) . "~#~";
									break;
								case 'persentase_pph_perorangan': $persentase_pph_perorangan .= $value . "~#~";
									break;
								case 'nilai_pph_perorangan': $nilai_pph_perorangan .= str_replace(",", "", $value) . "~#~";
									break;
								case 'is_grossup_pph_perorangan': $is_grossup_pph_perorangan .= str_replace(",", "", $value) . "~#~";
									break;
								case 'total_komisi': $total_komisi .= str_replace(",", "", $value) . "~#~";
									break;
								case 'harga_netto': $harga_netto .= str_replace(",", "", $value) . "~#~";
									break;
								case 'is_progresif': $is_progresif .= $value . "~#~";
									break;
								case 'nilai_komisi_progresif_per_tglbuat': $nilai_komisi_progresif_per_tglbuat .= str_replace(",", "", $value) . "~#~";
									break;
								case 'keterangan': $keterangan .= $value . "~#~";
									break;
								case 'is_changekavling': $is_changekavling .= $value . "~#~";
									break;
								case 'komisi_permintaan_date': $komisi_permintaan_date .= $value . "~#~";
									break;
								case 'purchaseletter_id_old': $purchaseletter_id_old .= $value . "~#~";
									break;
								case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
									break;
								// added by rico 25112021
								case 'pengurang_komisi': $pengurang_komisi .= str_replace(",", "", $value) . "~#~";
									break;
							}
						}
					};

					$komisi_permintaan_detail_id = preg_replace('/(~)$/', '', $komisi_permintaan_detail_id);
					$komisi_penerima_id = preg_replace('/(~)$/', '', $komisi_penerima_id);
					$komisi_persen_nominal = preg_replace('/(~)$/', '', $komisi_persen_nominal);
					$komisi_value = preg_replace('/(~)$/', '', $komisi_value);
					$populated_data = preg_replace('/(~)$/', '', $populated_data);
					$reff_id = preg_replace('/(~)$/', '', $reff_id);
					$reff_name = preg_replace('/(~)$/', '', $reff_name);
					$npwp = preg_replace('/(~)$/', '', $npwp);
					$purchaseletter_komisi_id = preg_replace('/(~)$/', '', $purchaseletter_komisi_id);
					$persentase_komisi = preg_replace('/(~)$/', '', $persentase_komisi);
					$nilai_komisi = preg_replace('/(~)$/', '', $nilai_komisi);
					$persentase_ppn = preg_replace('/(~)$/', '', $persentase_ppn);
					$nilai_ppn = preg_replace('/(~)$/', '', $nilai_ppn);
					$pph_pt_perorangan = preg_replace('/(~)$/', '', $pph_pt_perorangan);
					$persentase_pph_pt = preg_replace('/(~)$/', '', $persentase_pph_pt);
					$nilai_pph_pt = preg_replace('/(~)$/', '', $nilai_pph_pt);
					$is_grossup_pph_pt = preg_replace('/(~)$/', '', $is_grossup_pph_pt);
					$persentase_pph_perorangan = preg_replace('/(~)$/', '', $persentase_pph_perorangan);
					$nilai_pph_perorangan = preg_replace('/(~)$/', '', $nilai_pph_perorangan);
					$is_grossup_pph_perorangan = preg_replace('/(~)$/', '', $is_grossup_pph_perorangan);
					$total_komisi = preg_replace('/(~)$/', '', $total_komisi);
					$harga_netto = preg_replace('/(~)$/', '', $harga_netto);
					$is_progresif = preg_replace('/(~)$/', '', $is_progresif);
					$nilai_komisi_progresif_per_tglbuat = preg_replace('/(~)$/', '', $nilai_komisi_progresif_per_tglbuat);
					$keterangan = preg_replace('/(~)$/', '', $keterangan);
					$deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
					$is_changekavling = preg_replace('/(~)$/', '', $is_changekavling);
					$komisi_permintaan_date = preg_replace('/(~)$/', '', $komisi_permintaan_date);
					$purchaseletter_id_old = preg_replace('/(~)$/', '', $purchaseletter_id_old);
					// added by rico 25112021
					$pengurang_komisi = preg_replace('/(~)$/', '', $pengurang_komisi);
				}

				## DATA DETAIL UNIT JUAL ##
				$idxRecordUnitJual = '';
				$purchaseletterIdUnitJual = '';
				$komisiPermintaanIdUnitJual = '';
				$komisiPermintaanDetailIdUnitJual = '';
				$unitIdUnitJual = '';
				$clusterIdUnitJual = '';
				$unitNumberUnitJual = '';
				$clusterCodeUnitJual = '';
				$firstPurchaseDateUnitJual = '';
				$hargaNettoUnitJual = '';
				$param_unit_jual = $param['data_unit_jual'];
				if (is_array($param_unit_jual) && count($param_unit_jual) > 0) {
					foreach ($param_unit_jual as $idx_record => $dataPerIdxRecord) {
						if (count($dataPerIdxRecord) > 0) {
							foreach ($dataPerIdxRecord as $idx => $data) {
								foreach ($data as $key => $value) {
									switch ($key) {
										case 'index_record': $idxRecordUnitJual .= $value . "~#~";
											break;
										case 'purchaseletter_id': $purchaseletterIdUnitJual .= $value . "~#~";
											break;
										case 'komisi_permintaan_id': $komisiPermintaanIdUnitJual .= $value . "~#~";
											break;
										case 'komisi_permintaan_detail_id': $komisiPermintaanDetailIdUnitJual .= $value . "~#~";
											break;
										case 'unit_id': $unitIdUnitJual .= str_replace(",", "", $value) . "~#~";
											break;
										case 'cluster_id': $clusterIdUnitJual .= $value . "~#~";
											break;
										case 'unit_number': $unitNumberUnitJual .= $value . "~#~";
											break;
										case 'cluster_code': $clusterCodeUnitJual .= $value . "~#~";
											break;
										case 'firstpurchase_date': $firstPurchaseDateUnitJual .= $value . "~#~";
											break;
										case 'harga_netto': $hargaNettoUnitJual .= $value . "~#~";
											break;
									}
								}
							}
						}
					};

					$idxRecordUnitJual = preg_replace('/(~)$/', '', $idxRecordUnitJual);
					$purchaseletterIdUnitJual = preg_replace('/(~)$/', '', $purchaseletterIdUnitJual);
					$komisiPermintaanIdUnitJual = preg_replace('/(~)$/', '', $komisiPermintaanIdUnitJual);
					$komisiPermintaanDetailIdUnitJual = preg_replace('/(~)$/', '', $komisiPermintaanDetailIdUnitJual);
					$unitIdUnitJual = preg_replace('/(~)$/', '', $unitIdUnitJual);
					$clusterIdUnitJual = preg_replace('/(~)$/', '', $clusterIdUnitJual);
					$unitNumberUnitJual = preg_replace('/(~)$/', '', $unitNumberUnitJual);
					$clusterCodeUnitJual = preg_replace('/(~)$/', '', $clusterCodeUnitJual);
					$firstPurchaseDateUnitJual = preg_replace('/(~)$/', '', $firstPurchaseDateUnitJual);
					$hargaNettoUnitJual = preg_replace('/(~)$/', '', $hargaNettoUnitJual);
				}
				## END DATA DETAIL UNIT JUAL ##
				## DATA DETAIL TARGET ##
				$idxRecordTarget = '';
				$purchaseletterIdTarget = '';
				$komisiPermintaanIdTarget = '';
				$komisiPermintaanDetailIdTarget = '';
				$codeTarget = '';
				$tahunTarget = '';
				$persentaseTarget = '';
				$targetBulanIniTarget = '';
				$sisaTarget = '';
				$nilaiKomisiTarget = '';
				$param_target = $param['data_target'];
				if (is_array($param_target) && count($param_target) > 0) {
					foreach ($param_target as $idx_record => $dataPerIdxRecord) {
						if (count($dataPerIdxRecord) > 0) {
							foreach ($dataPerIdxRecord as $idx => $data) {
								foreach ($data as $key => $value) {
									switch ($key) {
										case 'index_record': $idxRecordTarget .= $value . "~#~";
											break;
										case 'purchaseletter_id': $purchaseletterIdTarget .= $value . "~#~";
											break;
										case 'komisi_permintaan_id': $komisiPermintaanIdTarget .= $value . "~#~";
											break;
										case 'komisi_permintaan_detail_id': $komisiPermintaanDetailIdTarget .= $value . "~#~";
											break;
										case 'code': $codeTarget .= str_replace(",", "", $value) . "~#~";
											break;
										case 'tahun': $tahunTarget .= $value . "~#~";
											break;
										case 'persentase': $persentaseTarget .= $value . "~#~";
											break;
//										case 'target_' . $param['bulan']: $targetBulanIniTarget .= $value . "~#~";
										case 'target_bulan_ini': $targetBulanIniTarget .= $value . "~#~";
											break;
										case 'sisa': $sisaTarget .= $value . "~#~";
											break;
										case 'komisi_progresif': $nilaiKomisiTarget .= $value . "~#~";
											break;
									}
								}
							}
						}
					};

					$idxRecordTarget = preg_replace('/(~)$/', '', $idxRecordTarget);
					$purchaseletterIdTarget = preg_replace('/(~)$/', '', $purchaseletterIdTarget);
					$komisiPermintaanIdTarget = preg_replace('/(~)$/', '', $komisiPermintaanIdTarget);
					$komisiPermintaanDetailIdTarget = preg_replace('/(~)$/', '', $komisiPermintaanDetailIdTarget);
					$codeTarget = preg_replace('/(~)$/', '', $codeTarget);
					$tahunTarget = preg_replace('/(~)$/', '', $tahunTarget);
					$persentaseTarget = preg_replace('/(~)$/', '', $persentaseTarget);
					$targetBulanIniTarget = preg_replace('/(~)$/', '', $targetBulanIniTarget);
					$sisaTarget = preg_replace('/(~)$/', '', $sisaTarget);
					$nilaiKomisiTarget = preg_replace('/(~)$/', '', $nilaiKomisiTarget);
				}
				## END DATA DETAIL TARGET ##
//				die;

				$data = array(
					$param['komisi_permintaan_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['purchaseletter_id'],
					$param['generate_skema'],
					$param['komisi_distributionchannel_id'],
					$param['komisi_pencairan_id'],
					$param['komisi_perhitungan_id'],
					$komisi_penerima_id,
					$komisi_persen_nominal,
					$komisi_value,
					$populated_data,
					$reff_id,
					$reff_name,
					$npwp,
					$komisi_permintaan_detail_id,
					$purchaseletter_komisi_id,
					$persentase_komisi,
					$nilai_komisi,
					$persentase_ppn,
					$nilai_ppn,
					$pph_pt_perorangan,
					$persentase_pph_pt,
					$nilai_pph_pt,
					$is_grossup_pph_pt,
					$persentase_pph_perorangan,
					$nilai_pph_perorangan,
					$is_grossup_pph_perorangan,
					$total_komisi,
					$harga_netto,
					$is_progresif,
					$nilai_komisi_progresif_per_tglbuat,
					$keterangan,
					$deleted_detail,
					$is_changekavling,
					$komisi_permintaan_date,
					$purchaseletter_id_old,
					## DETAIL UNIT JUAL ##
					$idxRecordUnitJual,
					$purchaseletterIdUnitJual,
					$komisiPermintaanIdUnitJual,
					$komisiPermintaanDetailIdUnitJual,
					$unitIdUnitJual,
					$clusterIdUnitJual,
					$unitNumberUnitJual,
					$clusterCodeUnitJual,
					$firstPurchaseDateUnitJual,
					$hargaNettoUnitJual,
					## END DETAIL UNIT JUAL ##
					## DETAIL TARGET ##
					$idxRecordTarget,
					$purchaseletterIdTarget,
					$komisiPermintaanIdTarget,
					$komisiPermintaanDetailIdTarget,
					$codeTarget,
					$tahunTarget,
					$persentaseTarget,
					$targetBulanIniTarget,
					$sisaTarget,
					$nilaiKomisiTarget,
					## END DETAIL TARGET ##
					$this->session->getUserId(),
					// added by rico 25112021
					$pengurang_komisi
				);

				$result = $this->execSP3('sp_permintaankomisi_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	function permintaankomisiDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_permintaan_id';
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
				$result = $this->execSP3('sp_permintaankomisi_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function salesmanpurchaselleterRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_get_salesman_purchaseletter',
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$params->getPost('purchaseletter_id')
			);

			if (isset($result[1][0]['sales_id']) && $result[1][0]['sales_id']) {
				$return['success'] = true;
				$return['total'] = count($result[1]);
				$return['data'] = array(
					'komisi_penerima_id' => isset($result[0][0]['komisi_penerima_id']) ? $result[0][0]['komisi_penerima_id'] : '',
					'penerima_komisi'    => isset($result[0][0]['penerima_komisi']) ? $result[0][0]['penerima_komisi'] : '',
					'code'               => isset($result[0][0]['code']) ? $result[0][0]['code'] : '',
					'project_id'         => isset($result[0][0]['project_id']) ? $result[0][0]['project_id'] : $this->session->getCurrentProjectId(),
					'pt_id'              => isset($result[0][0]['pt_id']) ? $result[0][0]['pt_id'] : $this->session->getCurrentPtId(),
					'reff_id'            => $result[1][0]['sales_id'],
					'reff_name'          => $result[1][0]['sales_name'],
					'npwp'               => $result[1][0]['sales_npwp'] ? $result[1][0]['sales_npwp'] : '',
				);
			}
		} catch (Exception $e) {
			echo $e;
		}

		return $return;
	}

	function permintaankomisilistunitRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_permintaankomisilistunit_read', $params->getPost('salesman_id', 0), $params->getPost('komisi_permintaan_id', 0), $params->getPost('komisi_permintaan_date', NULL));
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function permintaankomisilistunitbatalRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_permintaankomisilistunitbatal_read', $params->getPost('salesman_id', 0), $params->getPost('unit_number', ''), $params->getPost('customer_name', ''));
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function permintaankomisitargetjualRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_permintaankomisitargetjual_read', $params->getPost('bulan', 0), $params->getPost('tahun', 0), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function permintaankomisitargetbatalRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_permintaankomisitargetbatal_read', $params->getPost('purchaseletter_id', 0), $params->getPost('salesman_id', 0));
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

}

?>