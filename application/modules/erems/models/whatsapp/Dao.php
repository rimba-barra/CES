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
class Erems_Models_Whatsapp_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

	public function getAllWhatsappCategory(Erems_Models_Whatsapp_WhatsappCategory $sc) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_proseswhatsappcategory_read', 1, 9999, $sc->getProject()->getId(), $sc->getPt()->getId(), $sc->getId(), $sc->getCode());

		return $hasil;
	}

	public function getWhatsappCategory(Erems_Models_Whatsapp_WhatsappCategory $sc) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_proseswhatsappcategory_read', 1, 1, $sc->getProject()->getId(), $sc->getPt()->getId(), $sc->getId(), "");

		return $hasil;
	}

	public function getAllTagihan($projectId, $ptId, $startDate, $endDate) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_proseswhatsapptagihan_read', $projectId, $ptId, $startDate, $endDate);

		return $hasil;
	}

	public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Whatsapp_Proseswhatsapp $proseswhatsapp, $unitNumber, $customerName, $processDate, $proseswhatsappCategoryId, $proseswhatsappStatus, $bot_purchaseDate, $top_purchaseDate) {
		$hasil = array();

		$unitNumber = ($unitNumber == '' ? $unitNumber : substr($unitNumber, 0, 20));
		$customerName = ($customerName == '' ? $customerName : substr($customerName, 0, 30));
		$processDate = ($processDate == '' ? $processDate : substr($processDate, 0, 10));
		$proseswhatsappCategoryId = ($proseswhatsappCategoryId == '' ? $proseswhatsappCategoryId : substr($proseswhatsappCategoryId, 0, 10));
		$proseswhatsappStatus = ($proseswhatsappStatus == '' ? $proseswhatsappStatus : substr($proseswhatsappStatus, 0, 10));

		$proseswhatsappStatus = ($proseswhatsappStatus == '' ? 0 : $proseswhatsappStatus);
		$hasil = $this->dbTable->spToQuery2(
				'sp_proseswhatsapp_read',
				substr($proseswhatsapp->getProject()->getId(), 0, 10),
				substr($proseswhatsapp->getPt()->getId(), 0, 10),
				substr($r->getPage(), 0, 10),
				substr($r->getLimit(), 0, 10),
				$unitNumber,
				$customerName,
				$processDate,
				$proseswhatsappCategoryId,
				$proseswhatsappStatus,
				$bot_purchaseDate,
				$top_purchaseDate
		);

		return $hasil;
	}

	public function save(Erems_Models_Whatsapp_Proseswhatsapp $proseswhatsapp) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_proseswhatsapp_create', $proseswhatsapp->getAddBy(),
				$proseswhatsapp->getProject()->getId(), $proseswhatsapp->getPt()->getId(),
				$proseswhatsapp->getPurchaseletter()->getId(),
				$proseswhatsapp->getCustomer()->getId(),
				$proseswhatsapp->getPhoneNumber(),
				$proseswhatsapp->getWhatsappCategory()->getId(),
				$proseswhatsapp->getFlagType(),
				$proseswhatsapp->getProcessDate(),
				$proseswhatsapp->getCollectorId(),
				$proseswhatsapp->getNotes(),
				NULL, NULL
		);
		/*

		  $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
		  $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
		 */

		return $hasil;
	}

	public function update(Erems_Models_Whatsapp_Proseswhatsapp $proseswhatsapp) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_proseswhatsapp_update', 
			$proseswhatsapp->getPhoneNumber(),
			$proseswhatsapp->getId(),
			$proseswhatsapp->getAddBy()
		);

		//  var_dump($this->dbTable);
		return $hasil;
	}

	public function saveProseswhatsappCode($params) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_whatsapp_code_update',
				$params['whatsapp_id'],
				$params['project_id'],
				$params['pt_id'],
				$params['status'],
				$params['sent_by'],
				$params['returncode'],
				$params['response']
		);
		//var_dump($this->dbTable);
		return $hasil;
	}

	public function saveProseswhatsappStatus($params) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_proseswhatsapp_status_update',
				$params['proseswhatsapp_id'],
				$params['status']
		);
//var_dump($this->dbTable);
		return $hasil;
	}

	public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;
		$row = $this->dbTable->SPUpdate('sp_proseswhatsapp_destroy', $decan->getString(), $session->getUserId());
		return $row;
	}

	public function getDataSendEmail($proseswhatsappid) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_proseswhatsapp_send_email', $proseswhatsappid);

		return $hasil;
	}

	public function getSaldo(Erems_Models_Whatsapp_Proseswhatsapp $proseswhatsapp) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_whatsapp_view_saldo_read', substr($proseswhatsapp->getProject()->getId(), 0, 10), substr($proseswhatsapp->getPt()->getId(), 0, 10));

		return $hasil;
	}

}
