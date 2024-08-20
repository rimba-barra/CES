<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_ProsestagihanvaController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();

		$return['project_name'] = $project_name;
		$return['pt_name'] = $pt_name;

		echo Zend_Json::encode($return);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function uploadfilesAction() {

		$upload = new Zend_File_Transfer_Adapter_Http();
		$bank = ($this->getRequest()->getPost('data') ? $this->getRequest()->getPost('data') : '');
		$files = $upload->getFileInfo('browse_filename');
		$message = '';
		foreach ($files as $file => $info) {
			$filename = $info['name'];
			if ($filename) {
				$filetype = explode('.', $filename);
				$fileallowed = array('txt');
				$new_file_name = preg_replace('/[\s]|[^A-Za-z0-9_]/', '', $filetype[0]);
				$time = explode('.', microtime());
				$postfix = substr($time[1], 0, 5);
				$imageName = date("Ymd") . "_" . $this->session->getUserId() . "." . $filetype[1];
				if (!(in_array($filetype[1], $fileallowed))) {
					$msg = 'File type must be Txt File';
					$imageName = '';
					$success = false;
				} else {
					$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/erems/uploads/prosesva/' . $imageName, 'overwrite' => true));
					$success = false;
					$msg = '';

					try {
						$upload->receive();
						$result = $this->prosestagihan_create($imageName, $bank);

						$success = $result['count'] > 0 ? true : false;
						$message = $result['count'] . " data succesfully";
						$msg = $result['count'] > 0 ? $result['msg'] : "no data updated";
					} catch (Zend_File_Transfer_Exception $e) {
						$msg = $e->message();
						$imageName = '';
						$success = false;
					}
				}
			}
		}

		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
		$result = array('data' => array(), 'total' => 0, 'success' => $success, 'msg' => $msg, 'message' => $message);
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function prosestagihan_create($fileName, $bank) {

		$projectid = $this->session->getCurrentProjectId();
		$ptid = $this->session->getCurrentPtId();
		$result['count'] = 0;
		$result['msg'] = '';

		$inputFileName = APPLICATION_PATH . '/../public/app/erems/uploads/prosesva/' . $fileName;

		$output = array();
		$variable = file($inputFileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
		foreach ($variable as $key => $value) {
			array_push($output, $value);
		}
		$newdate = substr($output[1], -8);
		$countrow = count($output);
		$startrow = 9;
		$endrow = count($output) - 6;
		for ($i = $endrow; $i < $countrow; $i++) {
			unset($output[$i]);
		}
		for ($i = 0; $i < $startrow; $i++) {
			unset($output[$i]);
		}


		$model = new Erems_Models_Prosestagihanva();
		//ambil data dari parameter BATAS_TOLERANSI
		$paramBatastoleransi = $model->getParameter($projectid, $ptid, "BATAS_TOLERANSI");
		//ambil data dari parameter DENDA_PERMIL
		$paramDendapermil = $model->getParameter($projectid, $ptid, "DENDA_PERMIL");

		$data = array();
		$success = 0;
		foreach ($output as $key => $value) {
			// $date = DateTime::createFromFormat('d/m/y', trim(substr($value, 71, 10)));
			$date = DateTime::createFromFormat('d/m/y', trim($newdate));
			$data[$key]['vano'] = trim(substr($value, 6, 9));
			$data[$key]['amount'] = str_replace(",", "", str_replace(".00", "", trim(substr($value, 49, 22))));
			$data[$key]['tanggal'] = $date->format('Y-m-d');
			$data[$key]['jam'] = trim(substr($value, 81, 10));
			$data[$key]['ket1'] = trim(substr($value, 98, 19));
			$data[$key]['ket2'] = trim(substr($value, 117, 18));

			//ambil data schedule dan purchaseletter berdasarkan dengan no va customer
			$resultSch = $model->getAllSchedulebyVA($data[$key]['vano'], $bank);
			if ($resultSch["success"] && (count($resultSch["data"]) > 0)) {
				$totalPayHitung = 0;
				$totalPayment = 0;
				$totalDenda = 0;

				$hs = $resultSch["data"];
				$jt = count($hs);

				// tagihan default
				$tagihanDefaultValue = array();
				for ($i = 0; $i < $jt; $i++) {

					$rec = $hs[$i];

					$tagihanDefaultValue[] = array(
						"rb" => $rec["remaining_balance"],
						"pay" => $rec["payment_payment"],
						"denda" => $rec["denda"],
						"remaining_denda" => $rec["remaining_denda"],
						"id" => $rec["schedule_id"]
					);
				}
				// end tagihan default
				//total pay berdasarkan file
				$pay = $data[$key]['amount'];

				$detailIds = array();
				$detailSchIds = array();
				$detailPaymentTypes = array();
				$detailPayments = array();
				$detailAmounts = array(); /// jumlah tagihan sebelum bayar
				$detailRemainingBalances = array(); // jumlaha sisa tagihan setelah dibayar
				$detailDendas = array();
				$detailKets = array();
				$notes = "";
				for ($i = 0; $i < $jt; $i++) {

					$rec = $hs[$i];
					$rb = doubleval($rec["remaining_balance"]);
					$payValue = 0;
					$payTagihan = 0;

					if ($pay > 0 && $rb > 0) {

						if ($rb > $pay) {
							//Jika yang dipayment lebih kecil maka remaining balance = remaining balance - payment
							//payment diset 0, karena sudah tidak bisa bayar yang lain lagi
							$rb = $rb - $pay;
							$payValue = $pay;
							$pay = 0;
						} else {
							//Jika yang dipayment lebih besar maka pay = payment - remaining balance
							//sisa payment akan digunakan untuk membayar remaining balance selanjutnya
							$payValue = $rb;
							$pay = $pay - $rb;
							$rb = 0;
						}

						$totalPayment += $payValue;
						if ($notes != "") {
							$notes .= ", ";
						}
						$notes .= $rec['scheduletype_scheduletype'] . ' ' . $rec['termin'];
					}

					$finalPay = $tagihanDefaultValue[$i]["pay"]; //Jumlah pay dari schedule bagian payment_payment
					$finalRb = $tagihanDefaultValue[$i]["rb"]; //Jumlah remaining balance dari schedule bagian remaining_balance
					$denda = 0;

					$payValue = doubleval($payValue);

					//tanggal dibayarkan berdasarkan file
					$cairDate = $data[$key]['tanggal'];

					if ($payValue > 0 || ($payValue == 0 && $rb == 0)) {
						// $finalPay = $payValue + $tagihanDefaultValue[$i]["pay"];
						$finalPay = $payValue;
						$finalRb = $rb;

						//call func hitungDenda untuk hitung total denda
						$denda = $this->hitungDenda(array(
							"payment" => $payValue,
							"rec" => $rec,
							"paymentDate" => $cairDate,
							"currentDenda" => $tagihanDefaultValue[$i]["remaining_denda"],
							"BATAS_TOLERANSI" => $paramBatastoleransi["data"][0]["value"],
							"DENDA_PERMIL" => $paramDendapermil["data"][0]["value"]
						));
					} else {
						$denda = $tagihanDefaultValue[$i]["remaining_denda"];
					}

					$totalDenda += $denda;

					$totalPayHitung += $finalPay;

					if ($payValue > 0) {
						$detailIds[] = $i + 1;
						$detailSchIds[] = $rec["schedule_id"];
						$detailPaymentTypes[] = "";
						$detailPayments[] = $finalPay;
						$detailAmounts[] = $rec["amount"]; /// jumlah tagihan sebelum bayar
						$detailRemainingBalances[] = $finalRb;  // jumlah sisa tagihan setelah dibayar
						// $detailDendas[] = $denda;
						$detailDendas[] = ($denda < 1 ? 0 : $denda);
						$detailKets[] = ($data[$key]['ket1'] . " " . $data[$key]['ket2']);
					}
				}

				$denda = $totalDenda;
				$detailIds = implode("~", $detailIds);
				$detailSchIds = implode("~", $detailSchIds);
				$detailPaymentTypes = implode("~", $detailPaymentTypes);
				$detailPayments = implode("~", $detailPayments);
				$detailAmounts = implode("~", $detailAmounts);
				$detailRemainingBalances = implode("~", $detailRemainingBalances);
				$detailDendas = implode("~", $detailDendas);
				$detailKets = implode("~", $detailKets);

				$payDate = $data[$key]['tanggal'] . " " . $data[$key]['jam'];
				$payDateNo = preg_replace('/[\s]|[^A-Za-z0-9_]/', '', $payDate); //payment date dari file tanpa tanda baca
				$payAmount = $data[$key]['amount'];

//				{TERMIN PEMBAYARAN}, {MH_TYPE.NAME} VA BCA.  PAYMENT_DATE Rp. th_payment.payment,- {MH_CLUSTER.CLUSTER} {M_UNIT.UNIT_NUMBER} {DBMASTER.M_PT.NAME}
				$notes .= ", " . $resultSch["purchaseletter"][0]['type_name'] . ' VA ' . $bank . '. ' . date('d-m-Y', strtotime($payDate));
				$notes .= " Rp. " . number_format($payAmount) . ',- ' . $resultSch["purchaseletter"][0]["cluster"] . ' ' . $resultSch["purchaseletter"][0]["unit_number"] . ' ' . $resultSch["purchaseletter"][0]["pt_name"];

				$new_post_data = array();
				$new_post_data['admin_id'] = $this->session->getUserId();
				$new_post_data['payment_number'] = $payDateNo;
				$new_post_data['purchaseletter_id'] = $resultSch["purchaseletter"][0]["purchaseletter_id"];
				$new_post_data['paymentflag_id'] = 1;
				$new_post_data['paymentmethod_id'] = 33;
				$new_post_data['reference_no'] = $payDateNo;
				$new_post_data['payment'] = $payAmount;
				$new_post_data['total'] = $payAmount;
				$new_post_data['payment_date'] = $payDate;
				$new_post_data['payment_duedate'] = $payDate;
				$new_post_data['payment_cairdate'] = $payDate;
//		        $new_post_data['note'] = $data[$key]['ket1'] . " " . $data[$key]['ket2'];
				$new_post_data['note'] = $notes;
				$new_post_data['is_rejected'] = 0;
				$new_post_data['admin_fee'] = 0;
				$new_post_data['denda'] = $denda;
				$new_post_data['cdn'] = 0;
				$new_post_data['cdn_val'] = 0;
				$new_post_data['receipt_no'] = $payDateNo;
				$new_post_data['detail_id'] = $detailIds;
				$new_post_data['detail_scheduleid'] = $detailSchIds;
				$new_post_data['detail_paymenttype'] = $detailPaymentTypes;
				$new_post_data['detail_payment'] = $detailPayments;
				$new_post_data['detail_amount'] = $detailAmounts;
				$new_post_data['detail_remaining_balance'] = $detailRemainingBalances;
				$new_post_data['detail_denda'] = $detailDendas;
				$new_post_data['detail_note'] = $detailKets;
				$new_post_data['cust_name'] = $resultSch["purchaseletter"][0]["customer_name"];
				$new_post_data['cust_address'] = $resultSch["purchaseletter"][0]["customer_address"];
				$new_post_data['cust_city'] = $resultSch["purchaseletter"][0]["customer_city_id"];
				$new_post_data['cust_officephone'] = $resultSch["purchaseletter"][0]["customer_officephone"];
				$new_post_data['cust_homephone'] = $resultSch["purchaseletter"][0]["customer_homephone"];
				$new_post_data['cust_mobilephone'] = $resultSch["purchaseletter"][0]["customer_mobilephone"];
				$new_post_data['is_debitnote'] = 0;
				$new_post_data['is_creditnote'] = 0;
				$new_post_data['debitnote'] = 0;
				$new_post_data['creditnote'] = 0;
				$new_post_data['project_id'] = $projectid;
				$new_post_data['pt_id'] = $ptid;
				$new_post_data['no_print'] = 0;

				$result_installpay = $model->insertInstallmentPayment($new_post_data);
				$sucCount = $result_installpay["success"] == true ? 1 : 0;
				$result["count"] += $sucCount;
				$result["msg"] .= $result_installpay["msg"] . "|";
			}
		}

		return $result;
	}

	function hitungDenda($params) {

		$payment = $params["payment"];
		$rec = $params["rec"];
		$paymentDate = $params["paymentDate"];
		$currentDenda = $params["currentDenda"];
		$BATAS_TOLERANSI = $params["BATAS_TOLERANSI"];
		$DENDA_PERMIL = $params["DENDA_PERMIL"];

		$date1 = date_create($rec["duedate"]);
		$date2 = date_create($paymentDate);
		$diff = date_diff($date1, $date2);
		$totalHariTerlambat = intval($diff->format("%R%a"));
		$totalHariTerlambat = $totalHariTerlambat > 0 ? $totalHariTerlambat : 0;

		$denda = 0;
		if ($paymentDate > $rec["duedate"]) {
			$toleransi = intval($BATAS_TOLERANSI);

			if ($totalHariTerlambat > $toleransi) {
				// $totalHariTerlambat = $totalHariTerlambat - $toleransi;
				$dendaPermil = floatval($DENDA_PERMIL);
				$denda = ($dendaPermil / 1000) * $payment * ($totalHariTerlambat);
				$denda = $currentDenda + $denda;
			}
		} else {
			$denda = $currentDenda;
		}

		return $denda;
	}

}

?>
