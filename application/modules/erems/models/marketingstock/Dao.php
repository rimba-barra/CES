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
class Erems_Models_Marketingstock_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

	public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead, Erems_Models_Marketingstock_MarketingStock $ms) {
		$hasil = array();

		$filters = $requestRead->getOthers();

		$unitNumber  = isset($filters['unit_number']) ? $filters['unit_number'] : '';
		$cluster     = isset($filters['cluster_id']) ? $filters['cluster_id'] : '';
		$block       = isset($filters['block_id']) ? $filters['block_id'] : '';
		$tipe        = isset($filters['type_id']) ? $filters['type_id'] : '';
		$position    = isset($filters['position_id']) ? $filters['position_id'] : '';
		$pc          = isset($filters['productcategory_id']) ? $filters['productcategory_id'] : '';
		$side        = isset($filters['side_id']) ? $filters['side_id'] : '';
		$purpose     = isset($filters['purpose_id']) ? $filters['purpose_id'] : '';
		$unitStatus  = isset($filters['unitstatus_id']) ? $filters['unitstatus_id'] : '';
		$progressbot = isset($filters['bot_progress']) ? intval($filters['bot_progress']) : '';
		$progresstop = isset($filters['top_progress']) ? intval($filters['top_progress']) : '';

		$hasil = $this->dbTable->SPExecute('sp_marketingstockb_read',
			$requestRead->getPage(),
			$requestRead->getLimit(),
			$ms->getUnit()->getProject()->getId(),
			$ms->getUnit()->getPt()->getId(),
			$unitStatus,
			$unitNumber,
			$cluster,
			$block,
			$tipe,
			$position,
			$pc,
			$side,
			$purpose,
			$progressbot,
			$progresstop
		);

		return $hasil;
	}

	public function getByUnitId($projectId, $ptId, $unitId) {
		$hasil = array();

		$hasil = $this->dbTable->spToQuery2('sp_marketingstockb_read', 1,
				1, $projectId, $ptId,
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				$unitId
		);

		return $hasil;
	}

	public function save(Erems_Models_Marketingstock_MarketingStock $ex, $unitList, $serahTerimaDate) {
		$row = 0;

		$detail = $ex->getDCResult();

		// added by rico 06052021
		if ($ex->getDefaultType() > 0) {
			$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
			$project = $session->getCurrentProjectId();
			$pt = $session->getCurrentPtId();
			$username = $session->getUserName();

			$data = array($project, $pt, (int) $ex->getUnit()->getId(), $username, (int) $ex->getDefaultType(), (int) $ex->getDefaultLand(), (int) $ex->getDefaultKelebihan(), (int) $ex->getTypetypeID(), (int) $ex->getLandSize(), (int) $ex->getKelebihan());
			$this->save_history($data);
		}

		if (count($ex->getDetail()) == 0) {
			return $row;
		}

		$u_width = $ex->getUWidth() == '' ? 0 : $ex->getUWidth();
		$u_long = $ex->getLong() == '' ? 0 : $ex->getLong();
		$u_kelebihan = $ex->getKelebihan() == '' ? 0 : $ex->getKelebihan();

		$row = $this->dbTable->SPUpdate('sp_marketingstockb_create',
				$unitList,
				Erems_Box_Config::UNITSTATUS_STOCK,
				$ex->getTunjanganUangMuka(),
				$ex->getHargaTanahNJOP(),
				$ex->getHargaJualKPR(),
				$ex->getHargaJualTunai(),
				$ex->getHargaJualInHouse(),
				$ex->getAddBy(),
				$serahTerimaDate,
				$detail["pricetype_id"],
				$ex->getMinimumTandaJadi(),
				$ex->getUnit()->getIsReadySell(),
				$detail["tanahpermeter"],
				$detail["kelebihantanah"],
				$detail["harga_tanah"],
				$detail["harga_kelebihantanah"],
				$detail["harga_bangunan"],
				$detail["harga_jualdasar"],
				$detail["persen_dischargedasar"],
				$detail["harga_dischargedasar"],
				$detail["persen_dischargetanah"],
				$detail["harga_dischargetanah"],
				$detail["persen_dischargebangunan"],
				$detail["harga_dischargebangunan"],
				$detail["harga_neto"],
				$detail["persen_ppntanah"],
				$detail["harga_ppntanah"],
				$detail["persen_ppnbangunan"],
				$detail["harga_ppnbangunan"],
				$detail["persen_ppnbm"],
				$detail["harga_ppnbm"],
				$detail["persen_pph22"],
				$detail["harga_pph22"],
				$detail["harga_bbnsertifikat"],
				$detail["harga_bphtb"],
				$detail["harga_bajb"],
				$detail["harga_jual"],
				$ex->getPtptID(),
				$ex->getTypetypeID(),
				($ex->getLandSize() == '' ? 0 : $ex->getLandSize()),
				($ex->getBuildingSize() == '' ? 0 : $ex->getBuildingSize()),
				($ex->getFloor() == '' ? 0 : $ex->getFloor()),
				($ex->getFloorSize() == '' ? 0 : $ex->getFloorSize()),
				($ex->getBedroom() == '' ? 0 : $ex->getBedroom()),
				($ex->getBathroom() == '' ? 0 : $ex->getBathroom()),
				($ex->getUWidth() == '' ? 0 : $ex->getUWidth()),
				($ex->getLong() == '' ? 0 : $ex->getLong()),
				($ex->getKelebihan() == '' ? 0 : $ex->getKelebihan()),
				($ex->getElectricity() == '' ? 0 : $ex->getElectricity()),
				// added by rico 15062021
				$ex->getIsHoldManagement(), $ex->getNotesHoldManagement(),
				$detail["subsidi_dp"],
				$detail["harga_interior"],
				$detail["persen_ppnsubsidi_dp"],
				$detail["harga_ppnsubsidi_dp"],
				$detail["persen_ppninterior"],
				$detail["harga_ppninterior"]
		);

		return $row;
	}

	public function update(Erems_Models_Marketingstock_MarketingStock $ex, $serahTerimaDate) {
		$row = 0;

		$detail = $ex->getDCResult();

		if (count($ex->getDetail()) == 0) {
			return $row;
		}

		if ($ex->getDefaultType() > 0) {
			$session  = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
			$project  = $session->getCurrentProjectId();
			$pt       = $session->getCurrentPtId();
			$username = $session->getUserName();

			$data = array($project, $pt, $ex->getUnit()->getId(), $username, (int) $ex->getDefaultType(), (int) $ex->getDefaultLand(), (int) $ex->getDefaultKelebihan(), (int) $ex->getTypetypeID(), (int) $ex->getLandSize(), (int) $ex->getKelebihan());
			$this->save_history($data);
		}

		$u_width     = $ex->getUWidth() == '' ? 0 : $ex->getUWidth();
		$u_long      = $ex->getLong() == '' ? 0 : $ex->getLong();
		$u_kelebihan = $ex->getKelebihan() == '' ? 0 : $ex->getKelebihan();

		$row = $this->dbTable->SPUpdate('sp_marketingstockb_update',
				$ex->getId(),
				$ex->getUnit()->getId(),
				$ex->getTunjanganUangMuka(),
				$ex->getHargaTanahNJOP(),
				$ex->getHargaJualKPR(),
				$ex->getHargaJualTunai(),
				$ex->getHargaJualInHouse(),
				$ex->getAddBy(),
				$serahTerimaDate,
				$detail["pricetype_id"],
				$ex->getMinimumTandaJadi(),
				$ex->getUnit()->getIsReadySell(),
				$detail["tanahpermeter"],
				$detail["kelebihantanah"],
				$detail["harga_tanah"],
				$detail["harga_kelebihantanah"],
				$detail["harga_bangunan"],
				$detail["harga_jualdasar"],
				$detail["persen_dischargedasar"],
				$detail["harga_dischargedasar"],
				$detail["persen_dischargetanah"],
				$detail["harga_dischargetanah"],
				$detail["persen_dischargebangunan"],
				$detail["harga_dischargebangunan"],
				$detail["harga_neto"],
				$detail["persen_ppntanah"],
				$detail["harga_ppntanah"],
				$detail["persen_ppnbangunan"],
				$detail["harga_ppnbangunan"],
				$detail["persen_ppnbm"],
				$detail["harga_ppnbm"],
				$detail["persen_pph22"],
				$detail["harga_pph22"],
				$detail["harga_bbnsertifikat"],
				$detail["harga_bphtb"],
				$detail["harga_bajb"],
				$detail["harga_jual"],
				$ex->getPtptID(),
				$ex->getTypetypeID(),
				($ex->getLandSize() == '' ? 0 : $ex->getLandSize()),
				($ex->getBuildingSize() == '' ? 0 : $ex->getBuildingSize()),
				($ex->getFloor() == '' ? 0 : $ex->getFloor()),
				($ex->getFloorSize() == '' ? 0 : $ex->getFloorSize()),
				($ex->getBedroom() == '' ? 0 : $ex->getBedroom()),
				($ex->getBathroom() == '' ? 0 : $ex->getBathroom()),
				($ex->getUWidth() == '' ? 0 : $ex->getUWidth()),
				($ex->getLong() == '' ? 0 : $ex->getLong()),
				($ex->getKelebihan() == '' ? 0 : $ex->getKelebihan()),
				($ex->getElectricity() == '' ? 0 : $ex->getElectricity()),
				$ex->getIsHoldManagement(), $ex->getNotesHoldManagement(),
				$ex->getSavetoAll(),
				$detail["subsidi_dp"],
				$detail["harga_interior"],
				$detail["persen_ppnsubsidi_dp"],
				$detail["harga_ppnsubsidi_dp"],
				$detail["persen_ppninterior"],
				$detail["harga_ppninterior"]
		);

		return $row;
	}

	public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;

		$row = $this->dbTable->SPUpdate('sp_marketingstock_destroy', $decan->getString(), $session->getUser()->getId(), Erems_Box_Config::UNITSTATUS_STOCK, Erems_Box_Config::UNITSTATUS_AVAILABLE);

		return $row;
	}

	protected function save_history($data) {
		$row = $this->dbTable->SPUpdate('sp_unithistory_create', $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6], $data[7], $data[8], $data[9]);
		return $row;
	}

}

?>
