<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Payment_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

	private $ses;
	private $tempTipePaymentDelete;

	public function setSession($ses) {
		$this->ses = $ses;
	}

	public function setTempTipePaymentDelete($tipe) {
		$this->tempTipePaymentDelete = $tipe;
	}

	public function save(Erems_Models_Payment_Payment $pay) {
		$hasil = 0;

                
		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

                
//                var_dump($dcResult); die();
                
                
                if($pay->getIsDraft() == 1) {
                    if (!array_key_exists('paymentdetail_id', $dcResult)) {
                            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_draft_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $pay->getCounterkwitansi());
                    } else {
                            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_draft_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $pay->getCounterkwitansi(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["denda"], $dcResult["description"], '', '', '', '', '', '', '', '', '', '', '', '', $pay->getNomorPrint());
                    }
                } else {
                    if (!array_key_exists('paymentdetail_id', $dcResult)) {
                            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo());
                    } else {
                            $hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["denda"], $dcResult["description"], '', '', '', '', '', '', '', '', '', '', '', '', $pay->getNomorPrint());
                    }
                    
                }
                
		
                

		return $hasil;
	}

	public function savePaymentCashier(Erems_Models_Payment_Payment $pay, $r, $dc, $session) {
		$hasil = 0;


		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();
		$cash = $pay->getPaymentCashier();

		if ($cash->getKasbank() == "B") {
			$cash->setKasbank("BANK");
		} else {
			$cash->setKasbank("KAS");
		}



		$voucher = new Cashier_Models_Common();
		$param = array(
			"project_id" => $session->getProject()->getId(),
			"pt_id" => $r["pt_pt_id"],
			"module" => $cash->getKasbank(),
			"flag" => "1",
			"prefix" => $r["prefix_voucher"],
			"param_date" => $cash->getAcceptDate(),
		);
		$voc = $voucher->docNumberbyparam($param);

		if ($voc) {
			$pay->setVoucherNo($voc);
		} else {
			return $hasil;
		}



		if (!array_key_exists('paymentdetail_id', $dcResult)) {
			$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create', $pay->getAddBy(), $pay->getNomor(),
					$pay->getPurchaseletter()->getId(), $pay->getFlag(),
					$pay->getPaymentMethod()->getId(), $pay->getReferenceNo(),
					$pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(),
					$pay->getCairDate(), $pay->getDescription(),
					$pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(),
					$pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $pay->getVoucherNo(),
					$cash->getGroupTrans(), $cash->getPrefix(), $cash->getPrefix_id_bank(), $cash->getChequegiro_date(),
					$cash->getChequegiro_no(), $cash->getAcceptDate());
		} else {
			//kalau ada detail coa dan detail schedule

			$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create',
					$pay->getAddBy(),
					$pay->getNomor(),
					$pay->getPurchaseletter()->getId(),
					$pay->getFlag(),
					$pay->getPaymentMethod()->getId(),
					$pay->getReferenceNo(),
					$pay->getAmount(),
					$pay->getTotal(),
					$pay->getDate(),
					$pay->getDueDate(),
					$pay->getCairDate(),
					$pay->getDescription(),
					$pay->getIsReferenceRejected(),
					$pay->getAdminFee(),
					$pay->getDenda(),
					$pay->getCdn(),
					$pay->getCdnValue(),
					$pay->getReceiptNo(),
					$pay->getVoucherNo(),
					$cash->getGroupTrans(),
					intval($cash->getPrefix()) ? intval($cash->getPrefix()) : '',
					intval($cash->getPrefix_id_bank()) ? intval($cash->getPrefix_id_bank()) : '',
					$cash->getChequegiro_date(),
					$cash->getChequegiro_no(),
					$cash->getAcceptDate(),
					$cash->getDepartment_id(),
					$cash->getTransno(),
					intval($cash->getThcoa_id()),
					intval($cash->getVoucherprefix_id()),
					$dc["description"],
					$dc["code"],
					$dc["coa_config_id"],
					$dc["coa_config_detail_id"],
					$dc["persen"],
					$dc["coa_id"],
					$dc["coa_name"],
					$dc["type"],
					$dc["amount"],
					$dcResult["paymentdetail_id"],
					$dcResult["schedule_id"],
					$dcResult["paymenttype_id"],
					$dcResult["payment"],
					$dcResult["amount"],
					$dcResult["remaining_balance"],
					$dcResult["denda"],
					$dcResult["description"]);
		}
		return $hasil;
	}

	public function updateNonLinkCashier(Erems_Models_Payment_Payment $pay, Erems_Models_Master_CustomerProfile $customer, Erems_Box_Models_App_Decan $decan = NULL, $dc, $deletedCoa) {
		$hasil = 0;



		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if (intval($pay->getId()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

		if (!array_key_exists('paymentdetail_id', $dcResult)) {
			$payDetail = new Erems_Models_Payment_Detail();
			$dcResult = $payDetail->getArrayTable();
		}

		$cash = $pay->getPaymentCashier();

//        var_dump($cash->getChequegiro_date());
//        die())


		$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentv2_update',
				$pay->getAddBy(),
				$pay->getId(),
				$pay->getNomor(),
				$pay->getPurchaseletter()->getId(),
				$pay->getFlag(),
				$pay->getPaymentMethod()->getId(),
				$pay->getReferenceNo(),
				$pay->getAmount(),
				$pay->getTotal(),
				$pay->getDate(),
				$pay->getDueDate(),
				$pay->getCairDate(),
				$pay->getDescription(),
				$pay->getIsReferenceRejected(),
				$pay->getAdminFee(),
				$pay->getDenda(), //here
				$cash->getGroupTrans(),
				intval($cash->getPrefix()),
				intval($cash->getPrefix_id_bank()),
				$cash->getChequegiro_date(),
				$cash->getChequegiro_no(),
				$cash->getAcceptDate(),
				$cash->getDepartment_id(),
				$cash->getTransno(),
				intval($cash->getThcoa_id()),
				intval($cash->getVoucherprefix_id()),
				$cash->getId(),
				$dc["description"],
				$dc["code"],
				$dc["coa_config_id"],
				$dc["coa_config_detail_id"],
				$dc["persen"],
				$dc["coa_id"],
				$dc["coa_name"],
				$dc["type"],
				$dc["amount"], //stop
				$dcResult["paymentdetail_id"],
				$dcResult["schedule_id"],
				$dcResult["paymenttype_id"],
				$dcResult["payment"],
				$dcResult["amount"],
				$dcResult["remaining_balance"],
				$dcResult["description"],
				$decan->getString(),
				$customer->getName(),
				$customer->getAddress(),
				$customer->getCity()->getId(),
				$customer->getOfficePhone(),
				$customer->getHomePhone(),
				$customer->getMobilePhone(),
				$deletedCoa,
				$this->ses->getProject()->getId(),
				$this->ses->getPt()->getId()
		);



		return $hasil;
	}

	public function updateNonLink(Erems_Models_Payment_Payment $pay, Erems_Models_Master_CustomerProfile $customer, Erems_Box_Models_App_Decan $decan = NULL) {
		$dcResult = $pay->getDCResult();

		if (!array_key_exists('paymentdetail_id', $dcResult)) {
			$payDetail = new Erems_Models_Payment_Detail();
			$dcResult = $payDetail->getArrayTable();
		}
		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if (intval($pay->getId()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

		if (!array_key_exists('paymentdetail_id', $dcResult)) {
			$payDetail = new Erems_Models_Payment_Detail();
			$dcResult = $payDetail->getArrayTable();
		}

		$hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["description"], $decan->getString(), $customer->getName(), $customer->getAddress(), $customer->getCity()->getId(), $customer->getOfficePhone(), $customer->getHomePhone(), $customer->getMobilePhone(), null, null, null, null, $pay->getReceiptNo());
		return $hasil;
	}

	public function update(Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Decan $decan = NULL) {
		$hasil = 0;



                
		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if (intval($pay->getId()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

                
		/* samakan nomor payment dengan nomor kwitansi */
		/*
		  if (strlen($pay->getReceiptNo()) > 2) {
		  $pay->setNomor($pay->getReceiptNo());
		  }
		 * 
		 */




		// mark on 2 Juni 2016
		/*
		  if (strlen($pay->getReferenceNo()) > 1) {
		  $pay->setNomor($pay->getReferenceNo());
		  }
		 */

		// added 2 Juni 2016
		/*

		 */

                $sp_name_1 = '';
                $sp_name_2 = '';
                if($pay->getIsDraft() == 1) {
                    $sp_name_1 = 'sp_installmentpaymentsch_draft_update';
                    $sp_name_2 = 'sp_installmentpayment_draft_update';
                } else {
                    $sp_name_1 = 'sp_installmentpaymentsch_update';
                    $sp_name_2 = 'sp_installmentpayment_update';
                }


		if ($pay->getFlag() == Erems_Box_Config::PAYMENTFLAG_SCHEDULE) {

			$hasil = $this->dbTable->SPUpdate($sp_name_1, $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getReceiptNo(), $pay->getDescription(), $pay->getDueDate(), $pay->getCairDate(), $pay->getReferenceNo());
		} else {
			if (!array_key_exists('paymentdetail_id', $dcResult)) {
				$hasil = $this->dbTable->SPUpdate($sp_name_2, $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda());
			} else {
				$hasil = $this->dbTable->SPUpdate($sp_name_2, $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["description"], $decan->getString(), '', '', '', '', '', '', '', '', '', '', $pay->getReceiptNo());
			}
		}


		// var_dump($this->dbTable);




		return $hasil;
	}

	public function updatePaymentCashier(Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Decan $decan = NULL) {
		$hasil = 0;

		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if (intval($pay->getId()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

		if ($pay->getFlag() == Erems_Box_Config::PAYMENTFLAG_SCHEDULE) {

			$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentsch_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getReceiptNo(), $pay->getDescription(), $pay->getDueDate(), $pay->getCairDate(), $pay->getReferenceNo());
		} else {
			if (!array_key_exists('paymentdetail_id', $dcResult)) {
				$hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda());
			} else {
				$hasil = $this->dbTable->SPUpdate('sp_installmentpayment_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["description"], $decan->getString(), '', '', '', '', '', '', '', '', '', '', $pay->getReceiptNo());
			}
		}
		return $hasil;
	}

	public function updatePaymentCashierv2(Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Decan $decan = NULL, $dc, $deletedCoa) {
		$hasil = 0;

		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		if (intval($pay->getId()) < 1) {
			return $hasil;
		}
		if ($pay->getFlag() == 0) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();
		$cash = $pay->getPaymentCashier();


		if ($pay->getFlag() == Erems_Box_Config::PAYMENTFLAG_SCHEDULE) { //installment
			if (!array_key_exists('coa_config_detail_id', $dc)) { //kalau ga ada jurnal
				$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentsch_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getReceiptNo(), $pay->getDescription(), $pay->getDueDate(), $pay->getCairDate(), $pay->getReferenceNo());
			} else {

				$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_update',
						$pay->getAddBy(), $pay->getId(),
						$pay->getNomor(), $pay->getReceiptNo(),
						$pay->getDescription(), $pay->getDueDate(),
						$pay->getCairDate(), $pay->getReferenceNo(), //sini
						$cash->getGroupTrans(),
						intval($cash->getPrefix()),
						intval($cash->getPrefix_id_bank()),
						$cash->getChequegiro_date(),
						$cash->getChequegiro_no(),
						$cash->getAcceptDate(),
						$cash->getDepartment_id(),
						$cash->getTransno(),
						intval($cash->getThcoa_id()),
						intval($cash->getVoucherprefix_id()),
						$cash->getId(),
						$dc["description"],
						$dc["code"],
						$dc["coa_config_id"],
						$dc["coa_config_detail_id"],
						$dc["persen"],
						$dc["coa_id"],
						$dc["coa_name"],
						$dc["type"],
						$dc["amount"],
						$deletedCoa
				);
			}
		} else {//others
			if (!array_key_exists('paymentdetail_id', $dcResult)) { // kalau tidak ada detail
				$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashierv2_update', $pay->getAddBy(), $pay->getId(), $pay->getNomor(), $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda());
			} else {
				if (array_key_exists('coa_config_detail_id', $dc)) { //kalau ada detailcoa
					$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashierv2_update',
							$pay->getAddBy(),
							$pay->getId(),
							$pay->getNomor(),
							$pay->getPurchaseletter()->getId(),
							$pay->getFlag(),
							$pay->getPaymentMethod()->getId(),
							$pay->getReferenceNo(),
							$pay->getAmount(),
							$pay->getTotal(),
							$pay->getDate(),
							$pay->getDueDate(),
							$pay->getCairDate(),
							$pay->getDescription(),
							$pay->getIsReferenceRejected(),
							$pay->getAdminFee(),
							$pay->getDenda(),
							$dcResult["paymentdetail_id"],
							$dcResult["schedule_id"],
							$dcResult["paymenttype_id"],
							$dcResult["payment"],
							$dcResult["amount"],
							$dcResult["remaining_balance"],
							$dcResult["description"], //11
							$decan->getString(), '', '', '', '', '', '', '', '', '', '',
							$pay->getReceiptNo(),
							$cash->getGroupTrans(),
							intval($cash->getPrefix()),
							intval($cash->getPrefix_id_bank()),
							$cash->getChequegiro_date(),
							$cash->getChequegiro_no(),
							$cash->getAcceptDate(),
							$cash->getDepartment_id(),
							$cash->getTransno(),
							intval($cash->getThcoa_id()),
							intval($cash->getVoucherprefix_id()),
							$cash->getId(),
							$dc["description"],
							$dc["code"],
							$dc["coa_config_id"],
							$dc["coa_config_detail_id"],
							$dc["persen"],
							$dc["coa_id"],
							$dc["coa_name"],
							$dc["type"],
							$dc["amount"],
							$deletedCoa
					);
				} else { //kalbau ga ada detailcoa
					$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashierv2_update',
							$pay->getAddBy(),
							$pay->getId(),
							$pay->getNomor(),
							$pay->getPurchaseletter()->getId(),
							$pay->getFlag(),
							$pay->getPaymentMethod()->getId(),
							$pay->getReferenceNo(),
							$pay->getAmount(),
							$pay->getTotal(),
							$pay->getDate(),
							$pay->getDueDate(),
							$pay->getCairDate(),
							$pay->getDescription(),
							$pay->getIsReferenceRejected(),
							$pay->getAdminFee(),
							$pay->getDenda(),
							$dcResult["paymentdetail_id"],
							$dcResult["schedule_id"],
							$dcResult["paymenttype_id"],
							$dcResult["payment"],
							$dcResult["amount"],
							$dcResult["remaining_balance"],
							$dcResult["description"],
							$decan->getString(), '', '', '', '', '', '', '', '', '', '',
							$pay->getReceiptNo());
				}
			}
		}
		return $hasil;
	}

	public function saveNonlink(Erems_Models_Payment_Payment $pay, Erems_Models_Master_CustomerProfile $customer) {
		$hasil = 0;
		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

		if (!array_key_exists('paymentdetail_id', $dcResult)) {
			$payDetail = new Erems_Models_Payment_Detail();
			$dcResult = $payDetail->getArrayTable();
		}

		$projectId = $this->ses ? $this->ses->getProject()->getId() : NULL;
		$ptId = $this->ses ? $this->ses->getPt()->getId() : NULL;

		$hasil = $this->dbTable->SPUpdate('sp_installmentpayment_create', $pay->getAddBy(), $pay->getNomor(), (int) $pay->getPurchaseletter()->getId(), $pay->getFlag(), $pay->getPaymentMethod()->getId(), $pay->getReferenceNo(), $pay->getAmount(), $pay->getTotal(), $pay->getDate(), $pay->getDueDate(), $pay->getCairDate(), $pay->getDescription(), $pay->getIsReferenceRejected(), $pay->getAdminFee(), $pay->getDenda(), $pay->getCdn(), $pay->getCdnValue(), $pay->getReceiptNo(), $dcResult["paymentdetail_id"], $dcResult["schedule_id"], $dcResult["paymenttype_id"], $dcResult["payment"], $dcResult["amount"], $dcResult["remaining_balance"], $dcResult["denda"], $dcResult["description"], $customer->getName(), $customer->getAddress(), $customer->getCity()->getId(), $customer->getOfficePhone(), $customer->getHomePhone(), $customer->getMobilePhone(), '', '', '', '', $projectId, $ptId, $pay->getNomorPrint());

		return $hasil;
	}

	public function saveNonlinkWithCashier(Erems_Models_Payment_Payment $pay, Erems_Models_Master_CustomerProfile $customer, $dc, $session, $r) {
		$hasil = 0;
		if (intval($pay->getAddBy()) < 1) {
			return $hasil;
		}
		$dcResult = $pay->getDCResult();

		if (!array_key_exists('paymentdetail_id', $dcResult)) {
			$payDetail = new Erems_Models_Payment_Detail();
			$dcResult = $payDetail->getArrayTable();
		}

		$projectId = $this->ses ? $this->ses->getProject()->getId() : NULL;
		$ptId = $this->ses ? $this->ses->getPt()->getId() : NULL;

		$cash = $pay->getPaymentCashier();

		if ($cash->getKasbank() == "B") {
			$cash->setKasbank("BANK");
		} else {
			$cash->setKasbank("KAS");
		}


		$voucher = new Cashier_Models_Common();
		$param = array(
			"project_id" => $session->getProject()->getId(),
			"pt_id" => $r["pt_pt_id"],
			"module" => $cash->getKasbank(),
			"flag" => "1",
			"prefix" => $r["prefix_voucher"],
			"param_date" => $cash->getAcceptDate(),
		);
		$voc = $voucher->docNumberbyparam($param);

		if ($voc) {
			$pay->setVoucherNo($voc);
		} else {
			return $hasil;
		}



		$hasil = $this->dbTable->SPUpdate('sp_installmentpaymentcashier_create',
				$pay->getAddBy(),
				$pay->getNomor(), (int)
				$pay->getPurchaseletter()->getId(),
				$pay->getFlag(),
				$pay->getPaymentMethod()->getId(),
				$pay->getReferenceNo(),
				$pay->getAmount(),
				$pay->getTotal(),
				$pay->getDate(),
				$pay->getDueDate(),
				$pay->getCairDate(),
				$pay->getDescription(),
				$pay->getIsReferenceRejected(),
				$pay->getAdminFee(),
				$pay->getDenda(),
				$pay->getCdn(),
				$pay->getCdnValue(),
				$pay->getReceiptNo(), //here
				$pay->getVoucherNo(),
				$cash->getGroupTrans(),
				intval($cash->getPrefix()),
				intval($cash->getPrefix_id_bank()),
				$cash->getChequegiro_date(),
				$cash->getChequegiro_no(),
				$cash->getAcceptDate(),
				$cash->getDepartment_id(),
				$cash->getTransno(),
				intval($cash->getThcoa_id()),
				intval($cash->getVoucherprefix_id()),
				$dc["description"],
				$dc["code"],
				$dc["coa_config_id"],
				$dc["coa_config_detail_id"],
				$dc["persen"],
				$dc["coa_id"],
				$dc["coa_name"],
				$dc["type"],
				$dc["amount"],
				//stop
				$dcResult["paymentdetail_id"],
				$dcResult["schedule_id"],
				$dcResult["paymenttype_id"],
				$dcResult["payment"],
				$dcResult["amount"],
				$dcResult["remaining_balance"],
				$dcResult["denda"],
				$dcResult["description"],
				$customer->getName(),
				$customer->getAddress(),
				$customer->getCity()->getId(),
				$customer->getOfficePhone(),
				$customer->getHomePhone(),
				$customer->getMobilePhone(),
				'', '', '', '',
				$projectId,
				$ptId);

		return $hasil;
	}

	public function rollbackScheduleDenda($dcResult) {
		$hasil = 0;

		$this->dbTable->SPUpdate('sp_otherspaymentdenda_destroy', $dcResult["schedule_id"], $dcResult["remaining_denda"]);

		return $hasil;
	}

	public function getDetail(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_schedulewithpayment_read', $pay->getId());

		return $hasil;
	}
        
        public function getDetailDraft(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_schedulewithpayment_draft_read', $pay->getId());

		return $hasil;
	}

	public function getAllCairKosong(Erems_Box_Models_App_HasilRequestRead $r, $projectId, $ptId) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_popupcairkosong_read', $projectId, $ptId, $r->getPage(), $r->getLimit(), $r->getOthersValue("unit_unit_number"), $r->getOthersValue("salesman_employee_name"));

		return $hasil;
	}

	public function getDetailByArrayIds($arIds) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_paymentdetailids_read', $arIds);

		return $hasil;
	}

	public function receipeExist(Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Session $ses) {
		$hasil = array();

		if($pay->getReceiptNo() != '-'){
			$hasil = $this->dbTable->SPExecute('sp_paymentkwitansiexist_read', $pay->getReceiptNo(), $ses->getProject()->getId(), $ses->getPt()->getId());
		}

		return $hasil;
	}

	//

	public function getPaymentDetail(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_paymentdetail_read', $pay->getId());

		return $hasil;
	}

	public function getOthersPayDetail(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_otherspaymentdetail_read', $pay->getId());

		return $hasil;
	}

	/* PAYMENT SCHEDULE */

	public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Session $ses) {

		ini_set("memory_limit", "1526M");
		ini_set('max_execution_time', 300);

    	$hasil = $this->dbTable->SPExecute('sp_get_all_payment_read', 
    		$r->getPage(), 
        	$r->getLimit(), 
        	$pay->getFlag(), 
        	$ses->getProject()->getId(),
			$ses->getPt()->getId(), 
			intval($r->getOthersValue("cluster_id")),
			$r->getOthersValue("payment_no"), 
			$r->getOthersValue("customer_name"),
			intval($r->getOthersValue("block_id")), 
			intval($r->getOthersValue("paymentmethod_id")),
			$r->getOthersValue("unit_number"), 
			$r->getOthersValue("receipt_no"), 
			$r->getOthersValue("virtualaccount_bca"), 
			$r->getOthersValue("virtualaccount_mandiri"),
			$r->getOthersValue("is_draft"),				
			$r->getOthersValue("payment_startdate"),
			$r->getOthersValue("payment_enddate"),
			$r->getOthersValue("cair_startdate"),
			$r->getOthersValue("cair_enddate")
    	); 

		return $hasil;
	}
        
    public function getAllNUP(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Session $ses) {
		ini_set("memory_limit", "1526M");
		ini_set('max_execution_time', 300);

		$hasil = $this->dbTable->SPExecute('sp_get_all_payment_read', 
    		$r->getPage(), 
        	$r->getLimit(), 
        	$pay->getFlag(), 
        	$ses->getProject()->getId(),
			$ses->getPt()->getId(), 
			intval($r->getOthersValue("cluster_id")),
			$r->getOthersValue("payment_no"), 
			$r->getOthersValue("customer_name"),
			intval($r->getOthersValue("block_id")), 
			intval($r->getOthersValue("paymentmethod_id")),
			$r->getOthersValue("unit_number"), 
			$r->getOthersValue("receipt_no"), 
			$r->getOthersValue("virtualaccount_bca"), 
			$r->getOthersValue("virtualaccount_mandiri"),
			1,
			$r->getOthersValue("payment_startdate"),
			$r->getOthersValue("payment_enddate"),
			$r->getOthersValue("cair_startdate"),
			$r->getOthersValue("cair_enddate")
    	);

		return $hasil;
	}

	public function getAllWithCashier(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Session $ses) {
		$hasil = array();



		$hasil = $this->dbTable->spToQuery("sp_installmentpaymentwithcashier_read", $r->getPage(), $r->getLimit(), $pay->getFlag(), $ses->getProject()->getId(),
				$ses->getPt()->getId(), intval($r->getOthersValue("cluster_id")),
				$r->getOthersValue("payment_no"), $r->getOthersValue("customer_name"),
				intval($r->getOthersValue("block_id")), intval($r->getOthersValue("paymentmethod_id")),
				$r->getOthersValue("unit_number"), $r->getOthersValue("receipt_no"));

		return $hasil;
	}

	/*
	 * mark on 20170914
	  public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Payment_Payment $pay, Erems_Box_Models_App_Session $ses) {
	  $hasil = array();

	  $hasil = $this->dbTable->SPExecute('sp_installmentpayment_read', $r->getPage(), $r->getLimit(), $pay->getFlag(), $ses->getProject()->getId(), $ses->getPt()->getId(), $r->getOthersValue("cluster_id"), $r->getOthersValue("payment_no"), $r->getOthersValue("customer_name"), $r->getOthersValue("block_id"), $r->getOthersValue("paymentmethod_id"), $r->getOthersValue("unit_number"), $r->getOthersValue("receipt_no"));

	  return $hasil;
	  }
	 */

	public function getAllB($page, $limit, $flag, $projectId, $ptId, $clusterId, $paymentNo, $customerNo, $blokId, $paymentMethodId, $unitNumber, $receiptNumber) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_installmentpayment_read', $page, $limit, $flag, $projectId, $ptId, $clusterId, $paymentNo, $customerNo, $blokId, $paymentMethodId, $unitNumber, $receiptNumber);

		return $hasil;
	}

	public function getOtherPaymentByPaymentType($project, $pt, $page, $limit, $purchaseId, $paymentCode) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_otherpaymentbypaymenttype_read', $project, $pt, $page, $limit, $purchaseId, $paymentCode);

		return $hasil;
	}

	public function getOne(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetail_read', $pay->getId());

		return $hasil;
	}
        
        public function getOneDraft(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetail_draft_read', $pay->getId());

		return $hasil;
	}

	public function getOnev2(Erems_Models_Payment_Payment $pay) {
		$hasil = array();
		if ($pay->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetailv2_read', $pay->getId());

		if ($hasil) {
			if ($hasil[1][0]["paymentcashier_kasbank"] == "BANK") {
				$hasil[1][0]["paymentcashier_prefix_id_bank"] = $hasil[1][0]["paymentcashier_prefix_id"];
			}
		}

		return $hasil;
	}

	public function getByGroup($ids) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetailbanyak_read', $ids);

		return $hasil;
	}

	public function getByGroupCashier($ids) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_installmentpaymentdetailbanyakcashier_read', $ids);

		return $hasil;
	}

	public function getByPurchaseletter($purchaseletterId) {

		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_installmentpayment_v2_read', $purchaseletterId);

		return $hasil;
	}
        
        public function getCheckisDraft($paymentId) {

		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_installmentcheck_draft', $paymentId);

		return $hasil;
	}

	public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;
                

		$ds = $decan->getString();

		$arIds = explode("~", $ds);

                $checkisdraft = $this->getCheckisDraft($arIds[0]);

                if($checkisdraft[0][0]['is_draft'] == 1) {
                    $spA = 'sp_installmentpayment_draft_destroy';
                    $spB = 'sp_paymentschedule_draft_destroy';
                } else {
                    $spA = 'sp_installmentpayment_destroy';
                    $spB = 'sp_paymentschedule_destroy';
                }



                
		// for other payment 
		if ($this->tempTipePaymentDelete == Erems_Box_Config::PAYMENTFLAG_OTHERS) {
			if (count($arIds) == 1) {

				// get detail
				$payFilter = new Erems_Models_Payment_Payment();
				$payFilter->setId($arIds[0]);
				$paymentDetails = $this->getOthersPayDetail($payFilter);
				$paymentDetails = Erems_Box_Tools::toObjectResult($paymentDetails, new Erems_Models_Payment_Detail(), array(new Erems_Models_Master_PaymentType(), new Erems_Models_Purchaseletter_Schedule()));

				$allScheduleDenda = array();
				foreach ($paymentDetails as $pd) {
					if ($pd->getPaymentType()->getName() == "DENDA") {

						$scheduleRollbackDenda = new Erems_Models_Purchaseletter_Schedule();
						$scheduleRollbackDenda->setId($pd->getSchedule()->getId());
						$scheduleRollbackDenda->setRemainingDenda($pd->getPayment());
						$allScheduleDenda[] = $scheduleRollbackDenda;
					}
				}

				if (count($allScheduleDenda) > 0) {
					$decan = Box_Tools::toDecan($allScheduleDenda);
					$dcResult = $decan->getDCResult();
					$this->dbTable->SPUpdate('sp_otherspaymentdenda_destroy', $dcResult["schedule_id"], $dcResult["remaining_denda"]);
				}


				$row = $this->dbTable->SPUpdate($spA, $ds, $session->getUserId());
			}
			// for non link payment
		} else if ($this->tempTipePaymentDelete == Erems_Box_Config::PAYMENTFLAG_NONLINK) {

			$row = $this->dbTable->SPUpdate($spA, $ds, $session->getUserId());
		} else {
			/// UNTUK PAYMENT SCHEDULE

			/* make sure cuma 1 id yg di delete */
			if (count($arIds) == 1) {
				$idPayment = intval($ds);




				$payment = new Erems_Models_Payment_Payment();
				$payment->setId($idPayment);
				if (Erems_Models_Payment_PaymentDestroyer::isPaymentSchedule($payment)) {
					$destroyer = new Erems_Models_Payment_PaymentDestroyer();
					$destroyer->setPayment($payment);
					$destroyer->run();



					if ($destroyer->getStatus()) {
						$dsp = $destroyer->getDecanStringPaymentDetail();
						$dsch = $destroyer->getDecanStringSch();
						$fixPaymentAmount = 0;
						if ($payment->getCdn() == Erems_Box_Config::CDN_CREDIT || $payment->getCdn() == Erems_Box_Config::CDN_DEBIT) {
							$fixPaymentAmount = $payment->getAmount() - $payment->getCdnValue();
						} else {
							$fixPaymentAmount = $payment->getAmount();
						}

						/*
						  var_dump($dsp["paymentdetail_id"],$dsch["schedule_id"],$dsch["remaining_balance"]);

						  die();
						 */


						$row = $this->dbTable->SPUpdate($spB, $payment->getId(), $fixPaymentAmount, $dsch["schedule_id"], $dsch["remaining_balance"], $dsp["paymentdetail_id"], $session->getUserId());






						return $row;
					} else {
						return 0;
					}
				}
			}
		}

		return $row;
	}

	public function deleteFromCashier($ids, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;




		$arIds = $ids;






		// for other payment 
		if ($this->tempTipePaymentDelete == Erems_Box_Config::PAYMENTFLAG_OTHERS) {
			if (count($arIds) == 1) {

				// get detail
				$payFilter = new Erems_Models_Payment_Payment();
				$payFilter->setId($arIds[0]);
				$paymentDetails = $this->getOthersPayDetail($payFilter);
				$paymentDetails = Erems_Box_Tools::toObjectResult($paymentDetails, new Erems_Models_Payment_Detail(), array(new Erems_Models_Master_PaymentType(), new Erems_Models_Purchaseletter_Schedule()));

				$allScheduleDenda = array();
				foreach ($paymentDetails as $pd) {
					if ($pd->getPaymentType()->getName() == "DENDA") {

						$scheduleRollbackDenda = new Erems_Models_Purchaseletter_Schedule();
						$scheduleRollbackDenda->setId($pd->getSchedule()->getId());
						$scheduleRollbackDenda->setRemainingDenda($pd->getPayment());
						$allScheduleDenda[] = $scheduleRollbackDenda;
					}
				}

				if (count($allScheduleDenda) > 0) {
					$decan = Box_Tools::toDecan($allScheduleDenda);
					$dcResult = $decan->getDCResult();
					$this->dbTable->SPUpdate('sp_otherspaymentdenda_destroy', $dcResult["schedule_id"], $dcResult["remaining_denda"]);
				}


				$row = $this->dbTable->SPUpdate('sp_installmentpayment_destroy', $ds, $session->getUserId());
			}
			// for non link payment
		} else if ($this->tempTipePaymentDelete == Erems_Box_Config::PAYMENTFLAG_NONLINK) {

			$row = $this->dbTable->SPUpdate('sp_installmentpayment_destroy', $ds, $session->getUserId());
		} else {
			/// UNTUK PAYMENT SCHEDULE

			/* make sure cuma 1 id yg di delete */
			if (count($arIds) == 1) {
				$idPayment = intval($arIds[0]);




				$payment = new Erems_Models_Payment_Payment();
				$payment->setId($idPayment);
				if (Erems_Models_Payment_PaymentDestroyer::isPaymentSchedule($payment)) {
					$destroyer = new Erems_Models_Payment_PaymentDestroyer();
					$destroyer->setPayment($payment);
					$destroyer->run();



					if ($destroyer->getStatus()) {
						$dsp = $destroyer->getDecanStringPaymentDetail();
						$dsch = $destroyer->getDecanStringSch();
						$fixPaymentAmount = 0;
						if ($payment->getCdn() == Erems_Box_Config::CDN_CREDIT || $payment->getCdn() == Erems_Box_Config::CDN_DEBIT) {
							$fixPaymentAmount = $payment->getAmount() - $payment->getCdnValue();
						} else {
							$fixPaymentAmount = $payment->getAmount();
						}

						/*
						  var_dump($dsp["paymentdetail_id"],$dsch["schedule_id"],$dsch["remaining_balance"]);

						  die();
						 */


						$row = $this->dbTable->SPUpdate('sp_paymentschedule_destroy', $payment->getId(), $fixPaymentAmount, $dsch["schedule_id"], $dsch["remaining_balance"], $dsp["paymentdetail_id"], $session->getUserId());






						return $row;
					} else {
						return 0;
					}
				}
			}
		}

		return $row;
	}

	public function getNomorAkhirPrint($project, $pt, $tahun) {

		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_payment_nomorakhirprint_read', $project, $pt, $tahun);

		return $hasil;
	}
        
	public function getProjectDetail($project_id){
            $hasil = $this->dbTable->SPExecute('sp_projectdetail_read', $project_id);
            $result = $hasil[0][0];
            return $result;
	}

    public function getScheduleLegalitas(Erems_Models_Payment_Payment $pay) {
        $hasil = array();
        $id = (int) $pay->getPurchaseLetterId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_schedulelegalitas_read', $id);
        return $hasil;
    }

    // added by rico 16022023
    public function InlineUpdate($param = array(),$userID) {
        $return['success'] = false;
        $table = 'th_payment';
        $id = 'payment_id';
        $id_value = $param['id'];
        $collumn = $param['collumn'];
        $collumn_value = $param['value'];

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->dbTable->SPExecute('sp_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $userID);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                 var_dump($e->getMessage());
                var_dump($e); 
            }  
        }
        return $return;
    }

}

?>
