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
class Erems_Models_Sms_MySmsMasking {

	public function sendSms($parameter) {
		$url = "https://sms.mobiledata.id/masking/send_post.php"; // added by rico 14022023
		// $url = "https://sms.mysmsmasking.com/masking/send_post.php";
		$rows = array(
			'username' => $parameter['username'],
			'password' => $parameter['password'],
			'hp' => '62' . $parameter['number'],
			'message' => $parameter['message']
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POST, TRUE);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($rows));
		curl_setopt($curl, CURLOPT_HEADER, FALSE);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 60);
		curl_setopt($curl, CURLOPT_TIMEOUT, 60);
		$htm = curl_exec($curl);
		if (curl_errno($curl) !== 0) {
			error_log('cURL error when connecting to ' . $url . ': ' . curl_error($curl));
		}
		curl_close($curl);
		$returncode = $htm;
		return $returncode;
	}

	public function getReturn($returncode) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			//CURLOPT_URL => "https://sms.mysmsmasking.com/masking/report.php?rpt=" . $returncode,
			CURLOPT_URL => "https://sms.mobiledata.id/masking/report.php?rpt=" . $returncode,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET",
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			return "cURL Error #:" . $err;
		}

		if (strpos($response, '22') !== false) {
			return 22;
			//return 'Pesan Terkirim , code: '.$returncode;
		} else if (strpos($response, '50') !== false) {
			return 50;
			//return 'Pesan Gagal Terkirim , code: '.$returncode.' - '.$response;
		} else if (strpos($response, '20') !== false) {
			return 20;
			//return 'Pesan Pending , code: '.$returncode.' - '.$response;
		} else {
			return $response;
		}
	}

	public function getSaldo($parameter) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			//CURLOPT_URL => "https://sms.mysmsmasking.com/masking/balance.php?username=" . $parameter['username'] . "&password=" . $parameter['password'],
			CURLOPT_URL => "https://sms.mobiledata.id/masking/balance.php?username=" . $parameter['username'] . "&password=" . $parameter['password'],
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET",
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			return "cURL Error #:" . $err;
		} else {
			return $response;
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
