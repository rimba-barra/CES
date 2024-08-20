<?php

class Erems_FakturtagihanreportController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		if ($this->getRequest()->getPost('mode_read') == 'detailGenco') {
			return $this->gencoRead();
			exit;
		}
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();

		// $return['project_name'] = $project_name;
		// $return['pt_name'] = $pt_name;
		//updated by anas 10052021 
		$result['project_name'] = $project_name;
		$result['pt_name'] = $pt_name;

		//added by anas 10052021
		$model = new Erems_Models_Fakturtagihanreport();

		if ($this->getRequest()->getPost('mode_read') == 'listUnit') {
			$result = $model->getAllUnit($this->getRequest());
		} else if ($this->getRequest()->getPost('mode_read') == 'sendemail') {
			$result = $this->sendEmail();
		}
		//end added by anas
		// echo Zend_Json::encode($return);
		//updated by anas 10052021 
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Fakturtagihanreport();

		$post_data['project_id'] = $this->getRequest()->getPost('project_id');
		$post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
		$post_data['param_periode_date'] = $this->getRequest()->getPost('param_periode_date');
		$post_data['group_admin_display'] = $this->getRequest()->getPost('group_admin_display');

		//added by anas 10052021
		$post_data['list_unit'] = $this->getRequest()->getPost('list_unit');
		//end added by anas

		$result = $model->fakturtagihanreportUpdate($post_data);
		if ($result['success']) {
			$dataReport = $model->getReport($post_data);
			$result['allData']['data'] = $dataReport['data'];
//			$result['allData']['data']['DataSource1'] = []; //$dataReport['data'];
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function gencoRead() {
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$reportFile = $genco->FakturTagihanReport();
		$otherAT = array("data" => array(
				"REPORT_FILE" => $reportFile,
				"sendEmailReport" => in_array($reportFile, $genco->fakturTagihanReportSendEmail()) ? 1 : 0
		));
		echo Zend_Json::encode($otherAT);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	private function sendEmail() {
		$hasil = false;
		$msg = NULL;
		$statusSentMail = FALSE;
		$configSMTP = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->setupSendEmail();

		if (isset($configSMTP['is_send']) && $configSMTP['is_send'] == 1) {
			$allData = Zend_Json::decode(utf8_encode(base64_decode($_POST['allData'])));
			$allData = $allData['data'][0];
			$hasil = true;

			if ($allData['customer_email'] != "" || in_array($this->session->getCurrentProjectId(), [4065, 11153])) {
				$mail_from = isset($configSMTP['mail_from']) && $configSMTP['mail_from'] ? $configSMTP['mail_from'] : '';
				$smtp_secure = isset($configSMTP['smtp_secure']) && $configSMTP['smtp_secure'] ? $configSMTP['smtp_secure'] : '';
				$smtp_host = isset($configSMTP['smtp_host']) && $configSMTP['smtp_host'] ? $configSMTP['smtp_host'] : '';
				$smtp_user = isset($configSMTP['smtp_user']) && $configSMTP['smtp_user'] ? $configSMTP['smtp_user'] : '';
				$smtp_pass = isset($configSMTP['smtp_pass']) && $configSMTP['smtp_pass'] ? $configSMTP['smtp_pass'] : '';
				$smtp_port = isset($configSMTP['smtp_port']) && $configSMTP['smtp_port'] ? $configSMTP['smtp_port'] : '';

				try {
					$kontenHTML = "<div>Kepada Yth.<br>";
					$kontenHTML .= "Bpk/Ibu " . $allData['customer_name'] . "<br>";
					$kontenHTML .= $allData['email_project_name'] . "<br>";
					$kontenHTML .= (isset($allData['customer_address_unit']) ? $allData['customer_address_unit'] : '') . "<br><br>";
					$kontenHTML .= "<table>";
					$kontenHTML .= "<tr><td>Total Tagihan&emsp;</td><td>= Rp." . number_format((float) $allData['total_seluruh'], 2, ',', '.') . "</td></tr>";
					$kontenHTML .= "<tr><td>Jatuh Tempo</td><td>= " . $allData['jth_tempo'] . "</td></tr>";
					$kontenHTML .= "</table><br>";
					$kontenHTML .= "Pembayaran melalui Transfer ke :<br>";
					$kontenHTML .= "<table>";
					$kontenHTML .= "<tr><td>&#x2022; Bank&emsp;&emsp;</td><td>= " . (isset($allData['email_bank_va']) ? $allData['email_bank_va'] : '') . "</td></tr>";
					$kontenHTML .= "<tr><td>&#x2022; Nomor VA&emsp;</td><td>= " . (isset($allData['email_nomor_va']) ? $allData['email_nomor_va'] : '') . "</td></tr>";
					$kontenHTML .= "<tr><td>&#x2022; Atas nama &emsp;</td><td>= " . (isset($allData['email_atas_nama']) ? $allData['email_atas_nama'] : '') . "</td></tr>";
					$kontenHTML .= "</table><br>";
					$kontenHTML .= "CATATAN<br>";
					$kontenHTML .= "Email ini dikirimkan secara otomatis, sehingga tidak dapat menerima Email balasan.<br>";
					$kontenHTML .= "Apabila terdapat pertanyaan, Mohon email ke <a href='mailto:". $allData['email_pic'] . "'>" . $allData['email_pic'] . "</a><br>";
					$kontenHTML .= "</div>";
					
					$config = array(
						'auth' => 'login',
						'ssl' => $smtp_secure,
						'username' => $smtp_user,
						'password' => $smtp_pass,
						'port' => $smtp_port
					);

					$mail = new Zend_Mail();
					$mail->setFrom($mail_from);
					if (in_array($this->session->getCurrentProjectId(), [4065, 11153])) {
						$mail->addTo('rizki.hartanto@ciputra.com', 'Rizki Hartanto');
						$mail->addTo('hendra.saputra@ciputra.com', 'Suhendar');
					} else {
						$mail->addTo($allData['customer_email'], $allData['customer_name']);
					}
					$mail->setSubject('(NO REPLY) TAGIHAN ANGSURAN ' . $allData['email_pt_nama']);
					$mail->setBodyHtml($kontenHTML);

					if (isset($_FILES['file']) && !$_FILES['file']['error']) {
						$filename = "Faktur Tagihan " . date('dmYHis') . '.pdf';
						move_uploaded_file($_FILES['file']['tmp_name'], APPLICATION_PATH . '/../public/app/erems/pdf/' . $filename);

						$content = file_get_contents(APPLICATION_PATH . '/../public/app/erems/pdf/' . $filename); // e.g. ("attachment/abc.pdf")
						$attachment = new Zend_Mime_Part($content);
						$attachment->type = 'application/pdf';
						$attachment->disposition = Zend_Mime::DISPOSITION_ATTACHMENT;
						$attachment->encoding = Zend_Mime::ENCODING_BASE64;
						$attachment->filename = "Tagihan Angsuran.pdf";
						$mail->addAttachment($attachment);
						unlink(APPLICATION_PATH . '/../public/app/erems/pdf/' . $filename);
					}

					$mail->send(new Zend_Mail_Transport_Smtp($smtp_host, $config));

					$statusSentMail = TRUE;
					$msg = "Send email successfully [" . $allData['unit_number'] . "].";
				} catch (Zend_Mail_Exception $e) {
					$statusSentMail = FALSE;
					$msg = "Send email failed [" . $allData['unit_number'] . "].";
				}
			} else {
				$statusSentMail = FALSE;
				$msg = "Customer email doesn't exist [" . $allData['unit_number'] . "].";
			}
		} else {
			$statusSentMail = FALSE;
			$msg = "The mail server hasn't been set up yet";
		}
		return $arrayRespon = array("success" => $hasil, "msg" => $msg, "status_sendmail" => $statusSentMail);
	}

}

?>
