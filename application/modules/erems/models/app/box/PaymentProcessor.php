<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_PaymentProcessor extends Erems_Models_App_Box_Processor {

	private $currentFlag;
	private $decan;

	public function __construct($testingFlag = NULL, $paymentFlag = 0) {
		parent::__construct($testingFlag);
		$this->currentFlag = $paymentFlag;
	}

	public function daoProses($dao, $object, $modeCreate) {

		switch ($modeCreate) {
			case "setupsheet":
				return $dao->setupShift($object);
				break;
		}
	}

	protected function afterFillData($payment) {
		if ($this->currentFlag == Erems_Box_Config::PAYMENTFLAG_NONLINK) {
			$data = $this->getData();
			$payment->getCustomer()->getCity()->setId($data["customer_city_city_id"]);
		}

		$this->createNomorPrintKwitansi($payment);

		return $payment;
	}

	private function createNomorPrintKwitansi(Erems_Models_Payment_Payment $payment) {

		$useNomorPrint = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId())->useNomorPrintKwitansi();
		$hasilNomor = "";
		if ($useNomorPrint["ACTIVE"]) {
			$format = $useNomorPrint["FORMAT"];

			$dao = new Erems_Models_Payment_Dao();
			$nomorAkhir = $dao->getNomorAkhirPrint($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), date("Y"));


			$nomorAkhir = $nomorAkhir[0][0]["print_no"];
			if (strlen($nomorAkhir) >= 5) {
				$nomorAkhir = explode("/", $nomorAkhir);
				$nomorAkhir = intval($nomorAkhir[0]);
			} else {
				$nomorAkhir = 0;
			}


			if ($format) {
				$formatAr = explode("/", $format);
				$finalNomor = array();
				//var_dump($formatAr);
				foreach ($formatAr as $row) {
					$finalNomor[] = $this->replaceTemplateNomorPrintKwitansi($row, array("value" => $nomorAkhir + 1));
				}

				$finalNomor = implode("/", $finalNomor);
				$hasilNomor = $finalNomor;
			}
		}



		$payment->setNomorPrint($hasilNomor);
	}

	private function replaceTemplateNomorPrintKwitansi($tpl, $params) {
		if ($tpl == "DD") {
			return date("d");
		} else if ($tpl == "MM") {
			return date("m");
		} else if ($tpl == "YY") {
			return date("y");
		} else if ($tpl == "YYYY") {
			return date("Y");
		} else if ($tpl == "000" || $tpl == "0000" || $tpl == "00000" || $tpl == "000000") {
			return str_pad(intval($params["value"]), STRLEN($tpl), "0", STR_PAD_LEFT);
		}
		return "INVALID";
	}

	protected function calculatePayment($payment) {
		$payment->setFlag($this->currentFlag);
		if ($payment->getFlag() == Erems_Box_Config::PAYMENTFLAG_SCHEDULE) {
			if ($payment instanceof Erems_Models_Payment_Payment) {

				$payment->resetDetail();

				$paymentProcessor = new Erems_Models_Payment_PaymentProcessor();
				$paymentProcessor->setPayment($payment);
				$paymentProcessor->setSession($this->getSession());



				$paymentProcessor->run();
				$payment->setDenda($paymentProcessor->getTotalDenda());
				$paymentDetail = $paymentProcessor->getPaymentDetail();



				$de = new Erems_Box_Delien_DelimiterEnhancer();
				$de->setDelimiterCandidate($payment);
				$de->generate();
			}
		} else if ($payment->getFlag() == Erems_Box_Config::PAYMENTFLAG_OTHERS) {

			if ($payment instanceof Erems_Models_Payment_Payment) {
				$details = $payment->getDetail();
				$total = 0;
				$totalDetail = 0;
				foreach ($details as $row) {
					if ($row instanceof Erems_Models_Payment_Detail) {
						$totalDetail += $row->getPayment();
					}
				}

				$total = doubleval($totalDetail) + doubleval($payment->getAdminFee());

				$payment->setTotal($total);
			}
		}




		return $payment;
	}

	public function daoSave($dao, $payment) {

		$payment = $this->calculatePayment($payment);
		if ($payment->getFlag() == Erems_Box_Config::PAYMENTFLAG_NONLINK) {
			## Comment by RH 18/10/2019 ##
//            $payment->setNomor($payment->getReferenceNo());
			## END Comment by RH 18/10/2019 ##
			return $dao->saveNonlink($payment, $payment->getCustomer());
		} else {
			return $dao->save($payment);
		}
	}

	public function daoUpdate($dao, $object) {
		$decan = NULL;
		$deletedDendas = array();
		$object = $this->calculatePayment($object);
		if (in_array($object->getFlag(), array(Erems_Box_Config::PAYMENTFLAG_SCHEDULE, Erems_Box_Config::PAYMENTFLAG_OTHERS, Erems_Box_Config::PAYMENTFLAG_NONLINK))) {
			$data = $this->getData();
			if ($object->getId() > 0) {
				$de = new Erems_Box_Delien_DelimiterEnhancer();
				$decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
				$de->setDelimiterCandidate($decan);
				$de->generate();
			}
		}

		///// MEMPROSES INFORMASI DENDA DI OTHERSPAYMENT
		if ($object->getFlag() == Erems_Box_Config::PAYMENTFLAG_OTHERS) {


			$details = $object->getDCResult();
			//  $details["paymentdetail_id"] = "";
			$allDetails = $dao->getDetailByArrayIds($details["paymentdetail_id"]);
			$allDetails = Erems_Box_Tools::toObjectResult($allDetails, new Erems_Models_Payment_Detail(), array(new Erems_Models_Master_PaymentType()));


			foreach ($allDetails as $detail) {
				if ($detail instanceof Erems_Models_Payment_Detail) {
					if ($detail->getPaymentType()->getName() == "DENDA") {

						foreach ($object->getDetail() as $objectDetail) {
							/// mapping ke payment detail object yang idnya sama
							if ($objectDetail->getId() == $detail->getId()) {
								/// cek jika ada payment detail tipe denda yang diganti dengan yg tipe bukan denda
								if ($objectDetail->getPaymentType()->getId() != $detail->getPaymentType()->getId()) {

									$deletedDendas[] = $detail;
								}
							}
						}
					}
				}
			}


			/// cek di deleted rows yg tipe denda
			/// jika tipenya denda maka ikut digabungkan ke list deletedDenda
			$dcResultDeletedRows = $decan->getDCResult();
			if (key_exists("key", $dcResultDeletedRows)) {
				$allDetailsDeleted = $dao->getDetailByArrayIds($dcResultDeletedRows["key"]);
				$allDetailsDeleted = Erems_Box_Tools::toObjectResult($allDetailsDeleted, new Erems_Models_Payment_Detail(), array(new Erems_Models_Master_PaymentType()));
				foreach ($allDetailsDeleted as $detail) {
					if ($detail instanceof Erems_Models_Payment_Detail) {
						if ($detail->getPaymentType()->getName() == "DENDA") {

							$deletedDendas[] = $detail;
						}
					}
				}
			}
		}



		if ($object->getFlag() == Erems_Box_Config::PAYMENTFLAG_NONLINK) {
			## Comment by RH 18/10/2019 ##
//			$object->setNomor($object->getReferenceNo());
			## END Comment by RH 18/10/2019 ##
			return $dao->updateNonLink($object, $object->getCustomer(), $decan);
			/* ADDED 24 Mei 2016 */
		} else if ($object->getFlag() == Erems_Box_Config::PAYMENTFLAG_OTHERS) {
			if (count($deletedDendas) > 0) {
				$allScheduleDenda = array();
				foreach ($deletedDendas as $dd) {
					$scheduleRollbackDenda = new Erems_Models_Purchaseletter_Schedule();
					$scheduleRollbackDenda->setId($dd->getSchedule()->getId());
					$scheduleRollbackDenda->setRemainingDenda($dd->getPayment());
					$allScheduleDenda[] = $scheduleRollbackDenda;
				}

				if (count($allScheduleDenda) > 0) {
					$decansd = Box_Tools::toDecan($allScheduleDenda);
					$dcResultsd = $decansd->getDCResult();
					$dao->rollbackScheduleDenda($dcResultsd);
				}
			}
			return $dao->update($object, $decan);
		} else {
			return $dao->update($object, $decan);
		}
	}

}

?>
