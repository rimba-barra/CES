<?php

class Erems_ProsessmsController extends Erems_Models_App_Template_AbstractMasterController {

	public function _getMainDataModel() {
		$dao = new Erems_Models_Sms_Dao();
		//  $dao->setSession($this->getAppSession());
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'sms', array('smscategory', 'clusterb', 'unitb', 'customer', 'employee', 'purchaseletter'), array()));
		$dm->setObject(new Erems_Models_Sms_SMS());
		$dm->setDao($dao);
		$dm->setValidator(new Erems_Models_Sms_Validator());
		$dm->setIdProperty("sms_id");
		return $dm;
	}

	public function saveexcelRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$params = $this->getAppData();
		$dao = new Erems_Models_Sms_Dao();
		$all = $dao->getAllByPageLimit($params["page"], 25, $this->getAppSession()->getProject()->getId(),
				$this->getAppSession()->getPt()->getId(), $params["unit_number"], $params["customer_name"], $params["process_date"], $params["smscategory_id"]);


		$ps = new Erems_Models_Sms_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
		$ps->process($all[1]);



		$msg = 'Export Excel';
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"MSG" => $msg,
				"URL" => $ps->getUrl()
		));

		$dm->setHasil(array($otherAT));
		return $dm;
	}

	public function mainCreate() {

		$dao = new Erems_Models_Sms_Dao();

		$sms = new Erems_Models_Sms_SMS();
		$sms->getAddBy($this->getAppSession()->getUser()->getId());
		$sms->setProject($this->getAppSession()->getProject());
		$sms->setPt($this->getAppSession()->getPt());

		//  $dao->setSession($this->getAppSession());
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject($sms);
		$dm->setDao($dao);
		$dm->setValidator(new Erems_Models_Sms_Validator());

		return $dm;
	}

	public function allRead() {
		$data = $this->getAppData();
		$dm = $this->_getMainDataModel();
		if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
			$dataList = $dm->getDataList();
			$dao = $dm->getDao();
			$obj = $dm->getObject();
			$obj->setArrayTable($this->getAppData());

			if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
				$ses = $this->getAppSession();
				$obj->setProject($ses->getProject());
				$obj->setPt($ses->getPt());
			}

			if (array_key_exists("smsstatus", $data)) {
				$sms_status = $data["smsstatus"];
			} else {
				$sms_status = NULL;
			}

			$hasil = $dao->getAll($this->getAppRequest(), $obj, $data["unit_number"], $data["customer_name"], $data["process_date"], $data["smscategory_id"], $sms_status, $data["bot_purchaseletter_date"], $data["top_purchaseletter_date"]);

			$dm->setDataList($dataList);
			$dm->setHasil($hasil);
		}

		return $dm;
	}

	public function customerlistRead() {


		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array());

		$dao = new Erems_Models_Master_CustomerDao();
		$hasil = $dao->getAllByFilter($this->getAppRequest(), $this->getAppSession());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function selectedcustomerRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city'));

		$dao = new Erems_Models_Master_CustomerDao();
		$hasil = $dao->getById($this->getAppRequest());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function prosessmsRead() {
		$hasil = FALSE;
		$msg = "Proses...";


		$data = $this->getAppData();

		$dao = new Erems_Models_Sms_Dao();

		/// get detail sms kategori;
		$scFilter = new Erems_Models_Sms_SMSCategory();
		$scFilter->setId($data["smscategory_id"]);
		$scFilter->setProject($this->getAppSession()->getProject());
		$scFilter->setPt($this->getAppSession()->getPt());
		$sc = $dao->getSMSCategory($scFilter);
		$sc = Erems_Box_Tools::toObjectRow($sc, new Erems_Models_Sms_SMSCategory());

		$smsCategoryCode = $sc->getCode();
		// $smsCategoryCode = Erems_Box_Config::SMSCAT_WAWANCARA;
		$startDate = isset($data["start_date"]) ? $data["start_date"] : NULL;
		$endDate = isset($data["end_date"]) ? $data["end_date"] : NULL;


		$datediff = strtotime($startDate) - strtotime($endDate);
		$datediff = abs(floor($datediff / (60 * 60 * 24)));

		// 31 hari untuk 24 bulan.
		if ($datediff > (31 * 24)) {
			$msg = "Proses sms maksimal " . (31 * 24) . " hari.";
		} else {
			$params = array(
				"smscategory_id" => $sc->getId(),
				"smscategory_code" => $smsCategoryCode,
				"process_date" => $data["process_date"],
				"project_id" => $this->getAppSession()->getProject()->getId(),
				"pt_id" => $this->getAppSession()->getPt()->getId(),
				"start_date" => $startDate,
				"end_date" => $endDate,
				"template" => $sc->getTemplate()
			);

			$builder = new Erems_Models_Sms_Builder();
			$allSms = $builder->proses($params);

			if (count($allSms) > 0) {
				$decan = Erems_Box_Tools::toDecan($allSms);
				$hasil = $dao->saveMultiSMS($this->getAppSession()->getUser()->getId(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $decan);
				if ($hasil) {
					$msg = "Sukses";
				}
			} else {
				$msg = "No record.";
			}
		}

		$arrayRespon = array("HASIL" => $hasil,
			"MSG" => $msg);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function detailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		//===== MASTERDATA == //
		$dao = new Erems_Models_Sms_Dao();
		$scFilter = new Erems_Models_Sms_SMSCategory();
		$scFilter->setProject($this->getAppSession()->getProject());
		$scFilter->setPt($this->getAppSession()->getPt());
		$allCategory = $dao->getAllSMSCategory($scFilter);
		$allCategory = Box_Tools::toObjectResult($allCategory, new Erems_Models_Sms_SMSCategory());

		$dm->setHasil(array($allCategory));

		return $dm;
	}

	public function processinitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		//===== MASTERDATA == //
		$dao = new Erems_Models_Sms_Dao();
		$scFilter = new Erems_Models_Sms_SMSCategory();
		$scFilter->setProject($this->getAppSession()->getProject());
		$scFilter->setPt($this->getAppSession()->getPt());
		$allCategory = $dao->getAllSMSCategory($scFilter);

		$allCategory = Erems_Box_Tools::toObjectResult($allCategory, new Erems_Models_Sms_SMSCategory());


		/// collector 
		$edao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Collector();
		$employee->setProject($this->getAppSession()->getProject());
		$employee->setPt($this->getAppSession()->getPt());

		$allCollector = $edao->getAll($employee);

		$allCollector = Erems_Box_Tools::toObjectResult($allCollector, new Erems_Models_Sales_Collector());


		$smsLangsungId = 0;
		foreach ($allCategory as $cat) {
			if ($cat->getCode() == Erems_Box_Config::SMSCAT_SMSLSNG) {
				$smsLangsungId = $cat->getId();
			}
		}

		//// Add by Erwin 06102020
		$setup_email = $this->setupSendEmail();

		$otherParam = array(
			array(
				"SMSLANGSUNGID" => $smsLangsungId,
				'is_send_email' => isset($setup_email['is_send']) ? $setup_email['is_send'] : 0
			)
		);

		$dm->setHasil(array($otherParam, $allCategory, $allCollector));


		return $dm;
	}

	//started by semy 22-6-2017
	public function saveexcelallRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$params = $this->getAppData();
		$dao = new Erems_Models_Sms_Dao();

		$all = $dao->getAllByPageNoLimit($this->getAppSession()->getProject()->getId(),
				$this->getAppSession()->getPt()->getId(), $params["unit_number"], $params["customer_name"], $params["process_date"], $params["smscategory_id"]);

		$ps = new Erems_Models_Sms_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
		$ps->process($all[1]);



		$msg = 'Export Jatuh Tempo Excel';
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"MSG" => $msg,
				"URL" => $ps->getUrl()
		));

		$dm->setHasil(array($otherAT));
		return $dm;
	}

	public function saveexcelselectedRead() {
		$params = $this->getAppData();
		$data = json_decode($params["data"], true);
		$ps = new Erems_Models_Sms_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
		$ps->process($data);
		$msg = 'Export SMS Excel All';
		$otherAT = array(
			"PRINTOUT" => TRUE,
			"MSG" => $msg,
			"URL" => $ps->getUrl()
		);
		return Erems_Box_Tools::instantRead($otherAT, array());
	}

	//ended semy

	public function savecsvallRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$params = $this->getAppData();
		$dao = new Erems_Models_Sms_Dao();
		$all = $dao->getAllByPageNoLimit($this->getAppSession()->getProject()->getId(),
				$this->getAppSession()->getPt()->getId(), $params["unit_number"], $params["customer_name"], $params["process_date"], $params["smscategory_id"]);


		$ps = new Erems_Models_Sms_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
		$ps->processCSVformatSH1($all[1]);


		$msg = 'Export Jatuh Tempo Csv';
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"MSG" => $msg,
				"URL" => $ps->getUrl()
		));

		$dm->setHasil(array($otherAT));
		return $dm;
	}

	public function getAccount() {
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
		return $genco->getAccountMySmsMasking();
	}

	public function checksaldoRead() {
		//SEND SMS
		$smsApi = new Erems_Models_Sms_SMSApi();
        $smsApi->setPrjID($this->getAppSession()->getProject()->getId());
        $smsApi->setPtID($this->getAppSession()->getPt()->getId());
		$account = $this->getAccount();
		if ($account == FALSE) {
			$hasil = "Account Not Set";
		} else {
			$hasil = $smsApi->getSaldo();
		}
        $arrayRespon = array(
                "HASIL" => $hasil,
        );

		// $account = $this->getAccount();
		// if ($account == FALSE) {
			// $hasil = "Account Not Set";
		// } else {
			// if ($vendor == "MySmsMasking") {
				// $smsApi = new Erems_Models_Sms_MySmsMasking();
				// $hasil = $smsApi->getSaldo($account);
			// }
		// }
		$arrayRespon = array(
			"HASIL" => $hasil,
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function sendsmsRead() {

		/*   Demo Multi sender 
		  sleep(1);
		  $hasil = 1;
		  $arrayRespon = array($hasil);
		  return Erems_Box_Tools::instantRead($arrayRespon, array());
		  die();
		 */

		$params = $this->getAppData();
		$data = $params['data'];
		$data = json_decode($data);
		$data = $data[0];
		//messages
		$number = ltrim($data->sms_phonenumber, '0');
		//test
		//$num = '08977791190';
		//$num = '082111001211';
		//$number = ltrim($num, '0');
		//test

		$message = $data->notes;

		//SEND SMS
		$smsApi = new Erems_Models_Sms_SMSApi();
		$smsApi->setPrjID($this->getAppSession()->getProject()->getId());
		$smsApi->setPtID($this->getAppSession()->getPt()->getId());

		$returncode = $smsApi->sendSms($number, $message);
		if ($returncode == FALSE) {
			$arrayRespon = array(0);
			return Erems_Box_Tools::instantRead($arrayRespon, array());
			die();
		}

		//save to db
		$dao = new Erems_Models_Sms_Dao();
		$params = array('sms_id' => $data->sms_id, 'status' => 0, 'sent_by' => $this->getAppSession()->getUser()->getId(), 'returncode' => $returncode);
		$hasil = $dao->saveSmsCode($params);

		$arrayRespon = array($hasil);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	protected function setupSendEmail() {
		return Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->setupSendEmail();
	}

	public function sendemailRead() {
		$msg = 'Tidak ada email yang terkirim';
		$result = array();

		$setup_email = $this->setupSendEmail();
		if (isset($setup_email['is_send']) && $setup_email['is_send'] == 1) {
			$mail_from = isset($setup_email['mail_from']) && $setup_email['mail_from'] ? $setup_email['mail_from'] : '';
			$smtp_secure = isset($setup_email['smtp_secure']) && $setup_email['smtp_secure'] ? $setup_email['smtp_secure'] : '';
			$smtp_host = isset($setup_email['smtp_host']) && $setup_email['smtp_host'] ? $setup_email['smtp_host'] : '';
			$smtp_user = isset($setup_email['smtp_user']) && $setup_email['smtp_user'] ? $setup_email['smtp_user'] : '';
			$smtp_pass = isset($setup_email['smtp_pass']) && $setup_email['smtp_pass'] ? $setup_email['smtp_pass'] : '';
			$smtp_port = isset($setup_email['smtp_port']) && $setup_email['smtp_port'] ? $setup_email['smtp_port'] : '';

			if ($mail_from && $smtp_secure && $smtp_host && $smtp_user && $smtp_pass && $smtp_port) {
				$post = $this->getAppData();
				$data = json_decode($post['data']);
				$dao = new Erems_Models_Sms_Dao();

				$arr_not_sent = array();
				if (count($data) > 0) {
					foreach ($data as $key => $val) {
						$res = $dao->getDataSendEmail($val);
						if (isset($res[0][0])) {
							$res = $res[0][0];
							if (trim($res['customer_email'])) {
								$result[] = $res;
							} else {
								$arr_not_sent[$res['customer_id']] = $res['customer_name'];
							}
						}
					}

					$flag_sent = false;
					if (count($result) > 0) {
						$config = array(
							'auth' => 'login',
							'ssl' => $smtp_secure,
							'username' => $smtp_user,
							'password' => $smtp_pass,
							'port' => $smtp_port
						);
						$mailTransport = new Zend_Mail_Transport_Smtp($smtp_host, $config);

						foreach ($result as $key => $val) {
							try {
								$kontenHTML = "<html><body>";
								$kontenHTML .= "<p>Kepada Yth,</p>";
								$kontenHTML .= "<p>Bapak/Ibu : " . $val['customer_name'] . "</p>";
								$kontenHTML .= "<p>Perumahan " . $val['project_name'] . "</p>";
								$kontenHTML .= "<p>Kawasan " . $val['cluster'] . "</p>";
								$kontenHTML .= "<p>Blok " . $val['unit_number'] . "</p>";
								$kontenHTML .= "<p>&nbsp;</p>";
								$kontenHTML .= "<p>Terdapat jatuh tempo tagihan bapak/ibu pada tanggal " . date('d-m-Y', strtotime($val['duedate'])) . " sebesar Rp " . number_format((float) $val['amount'], 2, ',', '.') . ".</p>";
								$kontenHTML .= "<p>Mohon abaikan email ini bila telah melakukan pembayaran.</p>";
								$kontenHTML .= "<p>&nbsp;</p>";
								$kontenHTML .= "<p>Info " . ($val['project_phone'] ? $val['project_phone'] : '-') . "</p>";
								$kontenHTML .= "<p>&nbsp;</p>";
								$kontenHTML .= "<p>&nbsp;</p>";
								$kontenHTML .= "<p>Regards</p>";
								$kontenHTML .= "<p>&nbsp;</p>";
								$kontenHTML .= "<p>" . $val['project_name'] . "</p>";
								$kontenHTML .= "</body></html>";

								$mail = new Zend_Mail();
								$mail->setFrom($mail_from);
								$mail->setBodyHtml($kontenHTML);
								$mail->addTo($val['customer_email'], $val['customer_name']);
								$mail->setSubject('Informasi Tagihan - ' . $val['unit_number'] . ' - ' . $val['project_name']);
								$mail->send($mailTransport);

								$flag_sent = true;
							} catch (Zend_Mail_Exception $e) {
								$arr_not_sent[$val['customer_id']] = $val['customer_name'];
							}
						}
					}

					if ($flag_sent) {
						$msg = 'Email berhasil terkirim';
					}

					if (count($arr_not_sent) > 0) {
						if ($flag_sent) {
							$msg .= ', dan ';
						} else {
							$msg = 'Email ';
						}
						$msg .= 'tidak terkirim kepada customer [' . implode(', ', $arr_not_sent) . ']';
					}
				}
			}
		}
		$msg .= '.';

		$arrayRespon = array(
			"message" => $msg,
			"result" => $result,
		);
		echo Zend_Json::encode($arrayRespon);
		die();
	}

}

?>