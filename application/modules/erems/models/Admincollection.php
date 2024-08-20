<?php

class Erems_Models_Admincollection extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	// function admincollectionRead($param) {
	// $return['success'] = false;
	// if (is_array($param) && count($param))
	// {
	// try {
	// $data = array (
	// $param['cluster_id'], 
	// $param['block_id'], 
	// // $param['kavling_number_start'], 
	// // $param['kavling_number_end'], 
	// $param['unit_number'], 
	// $param['customer_name'], 
	// $param['purchase_startdate'], 
	// $param['purchase_enddate'], 
	// $param['pricetype_id'], 
	// $param['recommended_tocancel_id'],
	// $this->session->getCurrentProjectId(), 
	// $this->session->getCurrentPtId(),
	// $param['start'], 
	// $param['limit']
	// );
	// $result = $this->execSP3('sp_admincollection_read', $data);				
	// $return['total'] = $result[0][0]['RECORD_TOTAL'];
	// $return['data'] = $result[1];			
	// $return['success'] = true;				
	// } catch(Exception $e) { }
	// }		
	// return $return;
	// }

	function admincollectionRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['cluster_id'],
					$param['block_id'],
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'],
					$param['customer_name'],
					$param['purchase_startdate'],
					$param['purchase_enddate'],
					$param['pricetype_id'],
					$param['recommended_tocancel_id'],
					$param['is_akad'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_admincollection_new_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function checkRemainingDenda($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_check_remaining_denda_read', $data);
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['denda'] = $result[0][0]['remaining_denda'];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function admincollectionUpdatePengakuanPenjualanDate($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$param['pengakuan_penjualan_date'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_plpengakuan_penjualan_update', $data);
				//var_dump($result);			
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function cekum($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_admincollection_cekum', $data);
//				var_dump($result);die();			
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function mastercollector($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['position'],
					1
				);

				$result = $this->execSP3('sp_mastercollector_read', $data);
				// var_dump($result);die();			
				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function updateCollector($param) {
		$return['success'] = false;
		try {
			$purchaseletter_id = '';
			if (is_array($param['purchaseletter_id']) && count($param['purchaseletter_id']) > 0) {
				foreach ($param['purchaseletter_id'] AS $idx => $value) {
					$purchaseletter_id .= $value . "~#~";
				}
			};
			$purchaseletter_id = preg_replace('/(~)$/', '', $purchaseletter_id);

			$data = array(
				$param['collector'],
				$purchaseletter_id,
				$this->session->getUserId()
			);
			$result = $this->execSP3('sp_admincollection_collector_update', $data);
			$return['total'] = $result[0];
			$return['success'] = count($result[0]) > 0;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function printout_lunasdpRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_lunasdp_printout_read',
						$param['purchaseletter_id'],
						$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function lunasdpUpdateCounterNo($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$param['purchaseletter_bankkpr_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$this->session->getUserId()
				);

				$result = $this->execSP3('sp_lunasdp_counter_no_create', $data);
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}

		return $return;
	}

	/* function admincollectionCreate($param = array()) {
	  $return['success'] = false;
	  if (is_array($param) && count($param)) {
	  try {
	  $affectedRow = $this->execSP('sp_admincollection_create',
	  $param['purchaseletter_id'],
	  '',
	  $param['admincollectionreason_id'],
	  $param['description'],
	  $param['admincollection_date'],
	  $param['biaya'],
	  $param['ktp'],
	  $param['name'],
	  $param['address'],
	  $param['telephone'],
	  $param['mobilephone'],
	  $param['city_id'],
	  $this->session->getUserId(),
	  '1'
	  );
	  $return['success'] = (bool) $affectedRow;
	  } catch (Exception $e) {
	  var_dump($e->getMessage());
	  }
	  }
	  return $return;
	  }

	  function admincollectionUpdate($param = array()) {
	  $return['success'] = false;
	  if (is_array($param) && count($param)) {
	  try {
	  $affectedRow = $this->execSP('sp_admincollection_update',
	  $param['admincollection_id'],
	  $param['purchaseletter_id'],
	  '',
	  $param['admincollectionreason_id'],
	  $param['description'],
	  $param['admincollection_date'],
	  $param['biaya'],
	  $param['ktp'],
	  $param['name'],
	  $param['address'],
	  $param['telephone'],
	  $param['mobilephone'],
	  $param['city_id'],
	  $this->session->getUserId(),
	  '1'
	  );
	  $return['success'] = (bool) $affectedRow;
	  } catch (Exception $e) {
	  var_dump($e->getMessage());
	  }
	  }
	  return $return;
	  }

	  function admincollectionDelete($param = array()) {
	  $return['success'] = false;
	  if (is_array($param) && count($param)) {
	  $key_name = 'admincollection_id';
	  $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
	  foreach ($param as $key => $val) {
	  if (is_array($val)) {
	  $param[$key_name] .= $val[$key_name] . ',';
	  }
	  }
	  $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
	  try {
	  $affectedRow = $this->execSP('sp_admincollection_destroy', $param[$key_name], $this->session->getUserId());
	  $return['total'] = $affectedRow;
	  $return['success'] = (bool) $affectedRow;
	  } catch (Exception $e) {

	  }
	  }
	  return $return;
	  } */

	//added by anas 04062021
	function updateOpenHariVA($param) {
		$return['success'] = false;
		try {

			$data = array(
				$param['purchaseletter_id'],
				$param['open_hari_va'],
				$param['include_denda_va'],
				$this->session->getUserId()
			);

			$result = $this->execSP3('sp_admincollection_openhariva_update', $data);
			$return['total'] = $result[0];
			$return['success'] = count($result[0]) > 0;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function updateAdjustkprdate($param) {
		$return['success'] = false;
		try {
			$ts   = date('H:i:s', time()).'.000';
			$expD = explode(' ', $param['kpr_date_adjust']);
			
			$data = array(
				$param['purchaseletter_id'],
				($expD[0] . ' ' . $ts),
				$this->session->getUserId()
			);

			$result = $this->execSP3('sp_admincollection_adjustkprdate_update', $data);

			$return['total'] = $result[0];
			$return['success'] = count($result[0]) > 0;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	// added by rico 15122021
	function printRetensi($param) {
		$return['success'] = false;
		try {
			$purchaseletter_pencairankpr_id = '';
			$param_string = explode('~', $param['param_string']);
			array_pop($param_string);

			if (is_array($param_string) && count($param_string) > 0) {
				foreach ($param_string AS $idx => $value) {
					$purchaseletter_pencairankpr_id .= $value . "~#~";
				}
			};

			$purchaseletter_pencairankpr_id = preg_replace('/(~)$/', '', $purchaseletter_pencairankpr_id);

			$data = array(
				$param['purchaseletter_id'],
				$purchaseletter_pencairankpr_id
			);

			$result = $this->execSP3('sp_admincollection_print_retensi', $data);
			$rslt = array();
			if(count($result)){
				foreach($result as $key => $val){
					if(is_array($val)){
						$rslt[] = $val;
					}
				}
			}
			$return['data']    = $rslt[0];
			$return['total']   = count($rslt[0]);
			$return['success'] = count($rslt[0]) > 0;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	// added by rico 22042022
	function printout_feekprRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_feekpr_printout_read',
						$param['purchaseletter_id'],
						$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	// added by rico 22042022
	function feekprUpdateCounterNo($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$param['purchaseletter_bankkpr_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$this->session->getUserId()
				);

				$result = $this->execSP3('sp_feekpr_counter_no_create', $data);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}

		return $return;
	}

	// added by rico 13022023
	function printout_suratkuasaRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_suratkuasa_printout_read',
						$param['purchaseletter_id'],
						$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	// added by rico 22042022
	function printout_covernotesRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_covernotes_printout_read',
						$param['purchaseletter_id'],
						$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

	// added by rico 22042022
	function printout_subsidikprRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_subsidikpr_printout_read',
						$param['purchaseletter_id'],
						$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

	// added by rico 26062023
	function printout_buybackRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_buyback_printout_read',
						$param['purchaseletter_id'],
						$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}


	// added by rico 17072023
	function printout_konfirmasiRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_konfirmasi_printout_read',
					$param['purchaseletter_id'],
					$param['purchaseletter_bankkpr_id'],
					$param['tunggakan']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	// added by rico 14082023
	function printout_orderaktaRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_buktikepemilikan_akta_pinjam_pakai_printout_read',
					$param['purchaseletter_id']
				);

				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

	// added by rico 14082023
	function printout_suratbiayaRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_buktikepemilikan_surat_biaya_legalitas_printout_read',
					$param['purchaseletter_id']
				);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

	// added by rico 14082023
	function printout_orderajbRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_buktikepemilikan_order_ajb_printout_read',
					$param['purchaseletter_id']
				);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

}

?>