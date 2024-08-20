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
class Erems_Models_Sms_SMSApi {

	private $prjID;
	private $ptID;
	
	private function getAccount() {
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID());
		return $genco->getAccountMySmsMasking();
	}

	public function sendSms($number, $message) {
		$account = $this->getAccount();
		if ($account == FALSE) {
			return FALSE;
			die();
		}
		$parameter = [
			'username' => $account['username'],
			'password' => $account['password'],
			'number' => $number,
			'message' => $message,
		];

		$vendorSms = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getVendorSMS();
		$returncode = $vendorSms->sendSms($parameter);
		return $returncode;
	}

	public function getReturn($returncode) {
		$vendorSms = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getVendorSMS();
		return $vendorSms->getReturn($returncode);
	}

	public function getSaldo() {
		$account = $this->getAccount();
		if ($account == FALSE) {
			return "Account Not Set";
			die();
		}
		$vendorSms = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getVendorSMS();
		return $vendorSms->getSaldo($account);
	}

	public function getReadStatus($status) {
		$vendorSms = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getPrjID(), $this->getPtID())->getVendorSMS();
		return $vendorSms->getReadStatus($status);
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
