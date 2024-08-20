<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Whatsapp_WhatsappApi {

	private $prjID;
	private $ptID;

	private function getAccount() {
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID());
		return $genco->getAccountWhatsapp();
	}

	public function sendWhatsapp($number, $message) {
		$account = $this->getAccount();
		if ($account == FALSE || count($account) == 0) {
			return ['status' => FALSE];
			die();
		}


		$settingWhatsapp = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getAccountWhatsapp();
		$messageParam = [];
		foreach (explode('|', $message) as $key => $value) {
			$messageParam[] = ['type' => "text", "text" => $value];
		}
//		$messageParam[] = ['type' => "text", "text" => $value];

		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $settingWhatsapp['url'],
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => '{
				"to": "62' . $number . '",
				"type": "template",
				"template": {
					"namespace": "' . $settingWhatsapp['namespace'] . '",
					"name": "bc_info_tagihan_myciputra",
					"language": {
						"policy": "deterministic",
						"code": "id"
					},
					"components": [
						{
							"type" : "header",
							"parameters": [
								{
									"type": "image",
									"image" : {
										"link": "https://d1edrlpyc25xu0.cloudfront.net/pay-5eiadtrxfyywnwoow/image/upload/WjJn49Fl9f/LOGO-CIPUTRA-WA-HEADER.jpg"
									}
								}
							]
						},
						{
							"type": "body",
							"parameters": ' . json_encode($messageParam) . '
						}
					]
				}
			}',
			CURLOPT_HTTPHEADER => array(
				'Qiscus-App-Id: ' . $settingWhatsapp['appid'],
				'Qiscus-Secret-Key: ' . $settingWhatsapp['secretkey'],
				'Content-Type: application/json'
			),
		));

		$response = curl_exec($curl);

		if (curl_errno($curl)) {
			$responFromVendor = curl_error($curl);
			$status = 0;
			$code = 500;
		} else {
			$respon = Zend_Json::decode($response);

			$status = 1;
			$code = 200;
			$responFromVendor = $response;
			if (isset($respon['error'])) {
				$status = 0;
				$code = $respon['error']['code'];
			}
		}
		curl_close($curl);

		return [
			'status' => $status,
			'code' => $code,
			'response' => $responFromVendor
		];
	}

	public function getReturn($returncode) {
		$vendorWhatsapp = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getVendorSMS();
		return $vendorWhatsapp->getReturn($returncode);
	}

	public function getSaldo() {
		$account = $this->getAccount();
		if ($account == FALSE) {
			return "Account Not Set";
			die();
		}
		$vendorWhatsapp = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getVendorSMS();
		return $vendorWhatsapp->getSaldo($account);
	}

	public function getReadStatus($status) {
		if ($status === 1) {
			return '<p style="color: green;">Delivered<p>';
		} else if ($status === 0) {
			return '<p style="color: red;">Failed<p>';
		} else if ($status === 2) {
			return '<p style="color: red;">Out of Balance<p>';
		}
	}

	//getter&setter

	public function getPrjID() {
		return $this->prjID;
	}

	public function setPrjID($prjID) {
		$this->prjID = $prjID;

		return $this;
	}

	public function getPtID() {
		return $this->ptID;
	}

	public function setPtID($ptID) {
		$this->ptID = $ptID;

		return $this;
	}

}
