<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SMS
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Whatsapp_Proseswhatsapp extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

	private $project;
	private $pt;
	private $purchaseletter;
	private $customer;
	private $whatsapp_phonenumber;
	private $whatsappcategory_whatsappcategory_id;
	private $flagType;
	private $processDate;
	private $collectorId;
	private $notes;
	private $returnCode;
	private $status;
	private $readstatus;
	private $amount;
	private $duedate;
	// added by rico 07092021
	private $sent_date;

	public function __construct() {
		parent::__construct();
		$this->embedPrefix = "proseswhatsapp_";
	}

	public function setArrayTable($dataArray = NULL) {
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		if (isset($x['whatsapp_id'])) {
			$this->setId($x['whatsapp_id']);
		}
		if (isset($x['purchaseletter_id'])) {
			$this->getPurchaseletter()->setId($x['purchaseletter_id']);
		}
		if (isset($x['customer_customer_id'])) {
			$this->getCustomer()->setId($x['customer_customer_id']);
		}
		if (isset($x['whatsapp_phonenumber'])) {
			$this->setPhoneNumber($x['whatsapp_phonenumber']);
		}
		if (isset($x['whatsappcategory_whatsappcategory_id'])) {
			$this->getWhatsappCategory()->setId($x['whatsappcategory_whatsappcategory_id']);
		}
		if (isset($x['whatsappcategory'])) {
			$this->getWhatsappCategory()->setName($x['whatsappcategory']);
		}
		if (isset($x['flag_type'])) {
			$this->setFlagType($x['flag_type']);
		}
		if (isset($x['process_date'])) {
			$this->setProcessDate($x['process_date']);
		}
		if (isset($x['collector_id'])) {
			$this->setCollectorId($x['collector_id']);
		}
		if (isset($x['notes'])) {
			$this->setNotes($x['notes']);
		}
		if (isset($x['return_code'])) {
			$this->setReturnCode($x['return_code']);
		}
		if (isset($x['status'])) {
			$this->setStatus($x['status']);
		}
		if (isset($x['readstatus'])) {
			$this->setReadstatus($x['readstatus']);
		}
		if (isset($x['amount'])) {
			$this->setAmount($x['amount']);
		}
		if (isset($x['duedate'])) {
			$this->setDuedate($x['duedate']);
		}
		if (isset($x['sent_date'])) {
			$this->setSentdate($x['sent_date']);
		}
		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			'whatsapp_id' => $this->getId(),
			'purchaseletter_id' => $this->getPurchaseletter()->getId(),
			'customer_customer_id' => $this->getCustomer()->getId(),
			'whatsapp_phonenumber' => $this->getPhoneNumber(),
			'whatsappcategory_whatsappcategory_id' => $this->getWhatsappCategory()->getId(),
			'whatsappcategory' => $this->getWhatsappCategory()->getName(),
			'flag_type' => $this->getFlagType(),
			'process_date' => $this->getProcessDate(),
			'collector_id' => $this->getCollectorId(),
			'notes' => $this->getNotes(),
			'return_code' => $this->getReturnCode(),
			'readstatus' => $this->getReadstatus($this->getStatus()),
			'status' => $this->getStatus(),
			'duedate' => $this->getDuedate(),
			'sent_date' => $this->getSentdate(),
			'amount' => $this->getAmount()
		);

		return $x;
	}

	public function getPurchaseletter() {
		if (!$this->purchaseletter) {
			$this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
		}
		return $this->purchaseletter;
	}

	public function getCustomer() {
		if (!$this->customer) {
			$this->customer = new Erems_Models_Master_Customer();
		}
		return $this->customer;
	}

	public function getPhoneNumber() {
		return $this->whatsapp_phonenumber;
	}

	public function getWhatsappCategory() {
		if (!$this->whatsappcategory_whatsappcategory_id) {
			$this->whatsappcategory_whatsappcategory_id = new Erems_Models_Whatsapp_WhatsappCategory();
		}
		return $this->whatsappcategory_whatsappcategory_id;
	}

	public function getFlagType() {
		return $this->flagType;
	}

	public function getProcessDate() {
		return $this->processDate;
	}

	public function getCollectorId() {
		return $this->collectorId;
	}

	public function getNotes() {
		return $this->notes;
	}

	public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
		$this->purchaseletter = $purchaseletter;
	}

	public function setCustomer(Erems_Models_Master_Customer $customer) {
		$this->customer = $customer;
	}

	public function setPhoneNumber($whatsapp_phonenumber) {
		$this->whatsapp_phonenumber = $whatsapp_phonenumber;
	}

	public function setWhatsappCategory(Erems_Models_Whatsapp_WhatsappCategory $whatsappcategory_whatsappcategory_id) {
		$this->whatsappcategory_whatsappcategory_id = $whatsappcategory_whatsappcategory_id;
	}

	public function setFlagType($flagType) {
		$this->flagType = $flagType;
	}

	public function setProcessDate($processDate) {
		$this->processDate = $processDate;
	}

	public function setCollectorId($collectorId) {
		$this->collectorId = $collectorId;
	}

	public function setNotes($notes) {
		$this->notes = $notes;
	}

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function grouped() {
		return array();
	}

	public function getProject() {
		if (!$this->project) {
			$this->project = new Erems_Box_Models_Master_Project();
		}
		return $this->project;
	}

	public function getPt() {
		if (!$this->pt) {
			$this->pt = new Erems_Box_Models_Master_Pt();
		}
		return $this->pt;
	}

	public function setProject(\Erems_Box_Models_Master_Project $project) {
		$this->project = $project;
	}

	public function setPt(\Erems_Box_Models_Master_Pt $pt) {
		$this->pt = $pt;
	}

	public function getDatefields() {
		return array("process_date");
	}

	public function getReturnCode() {
		return $this->returnCode;
	}

	public function setReturnCode($returnCode) {
		$this->returnCode = $returnCode;

		return $this;
	}

	public function getStatus() {
		return $this->status;
	}

	public function setStatus($status) {
		$this->status = $status;
		return $this;
	}

	public function getReadstatus($status) {
		$whatsappApi = new Erems_Models_Whatsapp_WhatsappApi();
		$readstatus = $whatsappApi->getReadStatus($status);
		return $readstatus;
	}

	public function setReadstatus($readstatus) {
		$this->readstatus = $readstatus;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getDuedate() {
		return $this->duedate;
	}

	/**
	 * @param mixed $duedate
	 *
	 * @return self
	 */
	public function setDuedate($duedate) {
		$this->duedate = $duedate;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getAmount() {
		return $this->amount;
	}

	/**
	 * @param mixed $amount
	 *
	 * @return self
	 */
	public function setAmount($amount) {
		$this->amount = $amount;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getSentdate() {
		return $this->sent_date;
	}

	/**
	 * @param mixed $amount
	 *
	 * @return self
	 */
	public function setSentdate($sent_date) {
		$this->sent_date = $sent_date;

		return $this;
	}

}
