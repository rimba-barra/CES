<?php

class Erems_Models_Followup extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_schedule';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function followupInlineUpdate($param = array()) {
		$return['success'] = false;
		$table = 'th_schedule';
		$id = 'schedule_id';
		$id_value = $param['id'];
		$collumn = $param['collumn'];
		$collumn_value = $param['value'];

		if (is_array($param) && count($param)) {
			try {
				//add by imaam on 20190919
				$affectedRow = $this->execSP('sp_followup_userdate_update', $table, $id, $id_value, $collumn, $collumn_value, $this->session->getUserId());
				$a = array('sp_followup_userdate_update', $table, $id, $id_value, $collumn, $collumn_value, $this->session->getUserId());

				//$affectedRow = $this->execSP('sp_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $this->session->getUserId());
				//$a = array('sp_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $this->session->getUserId());

				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				var_dump($e->getMessage());
				var_dump($e);
			}
		}
		return $return;
	}

	function followupHistoryCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$schedule_id = '';
				$scheduletype = '';
				$termin = '';
				$duedate = '';
				$remaining_balance = '';
				$remaining_denda = '';
				$param_detail = $param['dataDetail'];
				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'schedule_id': $schedule_id .= $value . "~#~";
									break;
								case 'scheduletype': $scheduletype .= $value . "~#~";
									break;
								case 'termin': $termin .= $value . "~#~";
									break;
								case 'duedate': $duedate .= $value . "~#~";
									break;
								case 'remaining_balance': $remaining_balance .= $value . "~#~";
									break;
								case 'remaining_denda': $remaining_denda .= $value . "~#~";
									break;
							}
						}
					};

					$schedule_id = preg_replace('/(~)$/', '', $schedule_id);
					$scheduletype = preg_replace('/(~)$/', '', $scheduletype);
					$termin = preg_replace('/(~)$/', '', $termin);
					$duedate = preg_replace('/(~)$/', '', $duedate);
					$remaining_balance = preg_replace('/(~)$/', '', $remaining_balance);
					$remaining_denda = preg_replace('/(~)$/', '', $remaining_denda);
				}


				$data = array(
					$param['purchaseletter_id'],
					$param['sp_ke'],
					$param['print_date'],
					$param['sp1_date'],
					$param['sp1_no'],
					$param['sp2_date'],
					$param['sp2_no'],
					$param['sp3_date'],
					$param['sp3_no'],
					$param['sp4_date'],
					$param['sp4_no'],
					$param['tpl_file'],
					$param['dataHeader'],
					$param['dataSchedule'],
					
					## DETAIL ##
					$schedule_id,
					$scheduletype,
					$termin,
					$duedate,
					$remaining_balance,
					$remaining_denda,
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),					
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_followuphistory_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
//				print_r($return);
//				die;
			} catch (Exception $e) {
//				 echo $e;
			}
		}
//		die;
		return $return;
	}
	
	function followupHistoryRead($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_followuphistory_read', [$param['followup_history_id']]);
				$return['data'] = $result[0][0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
//				 echo $e;
			}
		}
		return $return;
	}

}

?>
