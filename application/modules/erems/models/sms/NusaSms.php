<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author RH-MIS
 */
class Erems_Models_Sms_NusaSms {

	public function sendSms($parameter) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => 'https://api.nusasms.com/api/v3/sendsms/plain?output=json',
			CURLOPT_POST => true,
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_POSTFIELDS => array(
				'user' => $parameter['username'],
				'password' => $parameter['password'],
				'GSM' => '62' . $parameter['number'],
				'SMSText' => $parameter['message']
			)
		));

		$resp = curl_exec($curl);
		$returncode = 22;
		if (!$resp) {
			$returncode = 50;
			error_log('cURL error when connecting to NusaSms: ' . curl_error($curl));
//			die('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
		}

		curl_close($curl);
		return $returncode;
	}

	public function getReturn($returncode) {
		if (strpos($returncode, '22') !== false) {
			return 22;
			//return 'Pesan Terkirim , code: '.$returncode;
		} else if (strpos($returncode, '50') !== false) {
			return 50;
			//return 'Pesan Gagal Terkirim , code: '.$returncode.' - '.$response;
		} else if (strpos($returncode, '20') !== false) {
			return 20;
			//return 'Pesan Pending , code: '.$returncode.' - '.$response;
		} else {
			return $returncode;
		}
	}

	public function getSaldo($account) {

		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://api.nusasms.com/api/command?user=" . $account['username'] . "&password=" . $account['password'] . "&cmd=CREDITS&type=sms&output=json",
//			CURLOPT_URL => "http://sms.mysmsmasking.com/masking/balance.php?username=" . $account['username'] . "&password=" . $account['password'],
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET",
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
			),
		));

		$response = json_decode(curl_exec($curl), TRUE);
		$err = curl_error($curl);

		curl_close($curl);
		if ($err) {
			return "cURL Error #:" . $err;
		} else {
			return $response['value'] . ', expired : ' . $response['expiredDate'];
		}
	}

	public function getReadStatus($status) {
		if (strpos($status, 'Success') !== false) {
			return '<p style="color: blue;">Sent<p>';
		} else if ($status == 22) {
			return '<p style="color: green;">Delivered<p>';
		} else if ($status == 50) {
			return '<p style="color: red;">Failed<p>';
		} else if ($status == 20) {
			return '<p style="color: yellow;">Pending<p>';
		} else {
			return '<p style="color: red;">' . $status . '<p>';
		}
	}

}
