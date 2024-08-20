<?php

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Dao extends Erems_Box_Models_App_AbDao {

	public function getAllKlaimKomisi(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Komisi_Klaim_Klaim $k) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisi_read', $k->getProject()->getId(), $k->getPt()->getId(), $r->getPage(), $r->getLimit(), $k->getNomor_pengajuan(), $k->getNomor_invoice_agent());
		return $hasil;
	}

	public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Komisi_KomisiTran $k) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_komisitran_read', $k->getProject()->getId(), $k->getPt()->getId(), $r->getPage(), $r->getLimit(), $r->getOthersValue("unit_unit_number"), $r->getOthersValue("citraclub_id")
		);
		return $hasil;
	}

	public function getAllKlaimNotExist(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Komisi_KomisiTran $k) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisitranlist_read', $k->getProject()->getId(), $k->getPt()->getId(), $r->getPage(), $r->getLimit(), $r->getOthersValue("unit_unit_number"), $r->getOthersValue("agent_id"), $r->getOthersValue("tipe_agent")
		);
		return $hasil;
	}

	public function getAllKomisiHitung(Erems_Models_Komisi_Master_KomisiHitung $k) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_komisihitung_read', 1, 9999, $k->getCode()
		);
		return $hasil;
	}

	public function getOne($id) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_komisitrandetail_read', intval($id)
		);
		return $hasil;
	}

	public function getOneKlaimKomisi($id) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisione_read', intval($id));
		return $hasil;
	}

	public function getKlaimSelectedKomisiTran($ids) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisitran_read', $ids);
		return $hasil;
	}

	public function getAllPurchaseletter(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl) {
		$hasil = array();



		$hasil = $this->dbTable->SPExecute('sp_komisipurchaseletter_read',
				$ses->getProject()->getId(),
				$ses->getPt()->getId(),
				$r->getPage(),
				$r->getLimit(),
				$pl->getNomor(),
				$pl->getCustomer()->getName(),
				$pl->getUnit()->getNumber());


		return $hasil;
	}

	public function getSelectedPurchaseletter($ids) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_komisiselectedpurchaseletter_read', $ids);

		return $hasil;
	}

	public function getNomorAkhir($project, $pt, $tahun) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_komisitrannoakhir_read', intval($project), intval($pt), intval($tahun));
		return $hasil;
	}

	public function getNomorAkhirKlaim($project, $pt, $tahun) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisinoakhir_read', intval($project), intval($pt), intval($tahun));
		return $hasil;
	}

	public function save(Erems_Models_Komisi_KomisiTran $k) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_komisitran_create', $k->getAddBy(), $k->getProject()->getId(),
				$k->getPt()->getId(),
				$k->getPurchaseletter()->getId(),
				$k->getKomisitran_no(),
				$k->getKomisitran_date(),
				$k->getKomisi()->getId(),
				$k->getHarganetto_klaim(),
				$k->getKomisi_ybs(),
				$k->getKomisinilai_ybs(),
				$k->getKomisippn_ybs(),
				$k->getKomisidpp_ybs(),
				$k->getKomisipph_ybs(),
				$k->getKomisipphpt_ybs(),
				$k->getKomisibayar_ybs(),
				$k->getKomisi_sales_co(),
				$k->getKomisinilai_sales_co(),
				$k->getKomisippn_sales_co(),
				$k->getKomisidpp_sales_co(),
				$k->getKomisipph_sales_co(),
				$k->getKomisipphpt_sales_co(),
				$k->getKomisibayar_sales_co(),
				$k->getKomisi_head_sales(),
				$k->getKomisinilai_head_sales(),
				$k->getKomisippn_head_sales(),
				$k->getKomisidpp_head_sales(),
				$k->getKomisipph_head_sales(),
				$k->getKomisipphpt_head_sales(),
				$k->getKomisibayar_head_sales(),
				$k->getKomisi_head_adm(),
				$k->getKomisinilai_head_adm(),
				$k->getKomisippn_head_adm(),
				$k->getKomisidpp_head_adm(),
				$k->getKomisipph_head_adm(),
				$k->getKomisipphpt_head_adm(),
				$k->getKomisibayar_head_adm(),
				$k->getKomisi_team(),
				$k->getKomisinilai_team(),
				$k->getKomisippn_team(),
				$k->getKomisidpp_team(),
				$k->getKomisipph_team(),
				$k->getKomisipphpt_team(),
				$k->getKomisibayar_team(),
				$k->getKomisi_kas(),
				$k->getKomisinilai_kas(),
				$k->getKomisippn_kas(),
				$k->getKomisidpp_kas(),
				$k->getKomisipph_kas(),
				$k->getKomisipphpt_kas(),
				$k->getKomisibayar_kas(),
				$k->getKomisi_manager_marketing(),
				$k->getKomisinilai_manager_marketing(),
				$k->getKomisippn_manager_marketing(),
				$k->getKomisidpp_manager_marketing(),
				$k->getKomisipph_manager_marketing(),
				$k->getKomisipphpt_manager_marketing(),
				$k->getKomisibayar_manager_marketing(),
				$k->getTotal_komisipersen(),
				$k->getTotal_komisinilai(),
				$k->getTotal_komisippn(),
				$k->getTotal_komisidpp(),
				$k->getTotal_komisipph(),
				$k->getTotal_komisipphpt(),
				$k->getTotal_komisibayar(),
				# Add by RH 21/11/2019 ##
				$k->getKomisi_manager_marketing2(),
				$k->getKomisinilai_manager_marketing2(),
				$k->getKomisippn_manager_marketing2(),
				$k->getKomisidpp_manager_marketing2(),
				$k->getKomisipph_manager_marketing2(),
				$k->getKomisipphpt_manager_marketing2(),
				$k->getKomisibayar_manager_marketing2(),
				$k->getKomisi_gm_sales_marketing(),
				$k->getKomisinilai_gm_sales_marketing(),
				$k->getKomisippn_gm_sales_marketing(),
				$k->getKomisidpp_gm_sales_marketing(),
				$k->getKomisipph_gm_sales_marketing(),
				$k->getKomisipphpt_gm_sales_marketing(),
				$k->getKomisibayar_gm_sales_marketing(),
				$k->getKomisi_assdir_sales_marketing(),
				$k->getKomisinilai_assdir_sales_marketing(),
				$k->getKomisippn_assdir_sales_marketing(),
				$k->getKomisidpp_assdir_sales_marketing(),
				$k->getKomisipph_assdir_sales_marketing(),
				$k->getKomisipphpt_assdir_sales_marketing(),
				$k->getKomisibayar_assdir_sales_marketing(),
				$k->getKomisi_support_proyek(),
				$k->getKomisinilai_support_proyek(),
				$k->getKomisippn_support_proyek(),
				$k->getKomisidpp_support_proyek(),
				$k->getKomisipph_support_proyek(),
				$k->getKomisipphpt_support_proyek(),
				$k->getKomisibayar_support_proyek(),
				$k->getKomisi_support1(),
				$k->getKomisinilai_support1(),
				$k->getKomisippn_support1(),
				$k->getKomisidpp_support1(),
				$k->getKomisipph_support1(),
				$k->getKomisipphpt_support1(),
				$k->getKomisibayar_support1(),
				$k->getKomisi_gm_sales_marketing1(),
				$k->getKomisinilai_gm_sales_marketing1(),
				$k->getKomisippn_gm_sales_marketing1(),
				$k->getKomisidpp_gm_sales_marketing1(),
				$k->getKomisipph_gm_sales_marketing1(),
				$k->getKomisipphpt_gm_sales_marketing1(),
				$k->getKomisibayar_gm_sales_marketing1()
				## END Add by RH 21/11/2019 ##
		);
		return $hasil;
	}

	public function dataExist(Erems_Models_Komisi_KomisiTran $k) {
		$hasil = 0;
		$hasil = $this->dbTable->SPExecute('sp_komisitranexist_read', $k->getProject()->getId(), $k->getPt()->getId(), $k->getKomisitran_no());

		return $hasil;
	}

	public function klaimDataExist(Erems_Models_Komisi_Klaim_Klaim $k) {
		$hasil = 0;
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisiexist_read', $k->getProject()->getId(), $k->getPt()->getId(), $k->getNomor_pengajuan());

		return $hasil;
	}

	public function getKlaimDetail(Erems_Models_Komisi_Klaim_Detail $k) {
		$hasil = 0;
		$hasil = $this->dbTable->SPExecute('sp_klaimkomisidetail_read', $k->getKlaimkomisi()->getId());

		return $hasil;
	}

	//sp_projectfacilitiestcodeexist_read

	public function update(Erems_Models_Komisi_KomisiTran $k) {
		$hasil = 0;

		if ($k->getId() == 0) {
			return 0;
		}

		$hasil = $this->dbTable->SPUpdate('sp_komisitran_update', $k->getModiBy(), $k->getId(),
				$k->getPurchaseletter()->getId(),
				$k->getKomisitran_no(),
				$k->getKomisitran_date(),
				$k->getKomisi()->getId(),
				$k->getHarganetto_klaim(),
				$k->getKomisi_ybs(),
				$k->getKomisinilai_ybs(),
				$k->getKomisippn_ybs(),
				$k->getKomisidpp_ybs(),
				$k->getKomisipph_ybs(),
				$k->getKomisipphpt_ybs(),
				$k->getKomisibayar_ybs(),
				$k->getKomisi_sales_co(),
				$k->getKomisinilai_sales_co(),
				$k->getKomisippn_sales_co(),
				$k->getKomisidpp_sales_co(),
				$k->getKomisipph_sales_co(),
				$k->getKomisipphpt_sales_co(),
				$k->getKomisibayar_sales_co(),
				$k->getKomisi_head_sales(),
				$k->getKomisinilai_head_sales(),
				$k->getKomisippn_head_sales(),
				$k->getKomisidpp_head_sales(),
				$k->getKomisipph_head_sales(),
				$k->getKomisipphpt_head_sales(),
				$k->getKomisibayar_head_sales(),
				$k->getKomisi_head_adm(),
				$k->getKomisinilai_head_adm(),
				$k->getKomisippn_head_adm(),
				$k->getKomisidpp_head_adm(),
				$k->getKomisipph_head_adm(),
				$k->getKomisipphpt_head_adm(),
				$k->getKomisibayar_head_adm(),
				$k->getKomisi_team(),
				$k->getKomisinilai_team(),
				$k->getKomisippn_team(),
				$k->getKomisidpp_team(),
				$k->getKomisipph_team(),
				$k->getKomisipphpt_team(),
				$k->getKomisibayar_team(),
				$k->getKomisi_kas(),
				$k->getKomisinilai_kas(),
				$k->getKomisippn_kas(),
				$k->getKomisidpp_kas(),
				$k->getKomisipph_kas(),
				$k->getKomisipphpt_kas(),
				$k->getKomisibayar_kas(),
				$k->getKomisi_manager_marketing(),
				$k->getKomisinilai_manager_marketing(),
				$k->getKomisippn_manager_marketing(),
				$k->getKomisidpp_manager_marketing(),
				$k->getKomisipph_manager_marketing(),
				$k->getKomisipphpt_manager_marketing(),
				$k->getKomisibayar_manager_marketing(),
				$k->getTotal_komisipersen(),
				$k->getTotal_komisinilai(),
				$k->getTotal_komisippn(),
				$k->getTotal_komisidpp(),
				$k->getTotal_komisipph(),
				$k->getTotal_komisipphpt(),
				$k->getTotal_komisibayar(),
				# Add by RH 21/11/2019 ##
				$k->getKomisi_manager_marketing2(),
				$k->getKomisinilai_manager_marketing2(),
				$k->getKomisippn_manager_marketing2(),
				$k->getKomisidpp_manager_marketing2(),
				$k->getKomisipph_manager_marketing2(),
				$k->getKomisipphpt_manager_marketing2(),
				$k->getKomisibayar_manager_marketing2(),
				$k->getKomisi_gm_sales_marketing(),
				$k->getKomisinilai_gm_sales_marketing(),
				$k->getKomisippn_gm_sales_marketing(),
				$k->getKomisidpp_gm_sales_marketing(),
				$k->getKomisipph_gm_sales_marketing(),
				$k->getKomisipphpt_gm_sales_marketing(),
				$k->getKomisibayar_gm_sales_marketing(),
				$k->getKomisi_assdir_sales_marketing(),
				$k->getKomisinilai_assdir_sales_marketing(),
				$k->getKomisippn_assdir_sales_marketing(),
				$k->getKomisidpp_assdir_sales_marketing(),
				$k->getKomisipph_assdir_sales_marketing(),
				$k->getKomisipphpt_assdir_sales_marketing(),
				$k->getKomisibayar_assdir_sales_marketing(),
				$k->getKomisi_support_proyek(),
				$k->getKomisinilai_support_proyek(),
				$k->getKomisippn_support_proyek(),
				$k->getKomisidpp_support_proyek(),
				$k->getKomisipph_support_proyek(),
				$k->getKomisipphpt_support_proyek(),
				$k->getKomisibayar_support_proyek(),
				$k->getKomisi_support1(),
				$k->getKomisinilai_support1(),
				$k->getKomisippn_support1(),
				$k->getKomisidpp_support1(),
				$k->getKomisipph_support1(),
				$k->getKomisipphpt_support1(),
				$k->getKomisibayar_support1(),
				$k->getKomisi_gm_sales_marketing1(),
				$k->getKomisinilai_gm_sales_marketing1(),
				$k->getKomisippn_gm_sales_marketing1(),
				$k->getKomisidpp_gm_sales_marketing1(),
				$k->getKomisipph_gm_sales_marketing1(),
				$k->getKomisipphpt_gm_sales_marketing1(),
				$k->getKomisibayar_gm_sales_marketing1()
				## END Add by RH 21/11/2019 ##
		);


		//  var_dump($this->dbTable);
		return $hasil;
	}

	public function saveKlaimKomisi(Erems_Models_Komisi_Klaim_Klaim $k, $decanResult) {
		$hasil = 0;

		if (count($decanResult) == 0) {
			$decanResult = array(
				"purchaseletter_purchaseletter_id" => "",
				"nilai_komisi" => "",
				"nilai_bayar" => "",
				"ppn" => "",
				"pph" => "",
				"pphpt" => "",
				"komisitran_komisitran_id" => ""
			);
		}

		$hasil = $this->dbTable->SPUpdate('sp_klaimkomisi_create', $k->getAddBy(), $k->getProject()->getId(),
				$k->getPt()->getId(),
				$k->getNomor_invoice_agent(),
				$k->getTipe_agent(),
				$k->getAgent_id(),
				$k->getNpwp(),
				$k->getTgl_pengajuan(),
				$k->getNomor_pengajuan(),
				$k->getNote(),
				$k->getNilai_komisi(),
				$k->getPph(),
				$k->getPpn(),
				$k->getTotal_bayar(), $decanResult["purchaseletter_purchaseletter_id"],
				$decanResult["nilai_komisi"],
				$decanResult["ppn"],
				$decanResult["pph"],
				$decanResult["nilai_bayar"],
				$k->getPphpt(),
				$decanResult["pphpt"],
				$decanResult["komisitran_komisitran_id"]
		);


		return $hasil;
	}

	public function updateKlaimKomisi(Erems_Models_Komisi_Klaim_Klaim $k, $deletedRows, $decanResult) {
		$hasil = 0;

		if ($k->getId() == 0) {
			return 0;
		}

		if (count($decanResult) == 0) {
			$decanResult = array(
				"purchaseletter_purchaseletter_id" => "",
				"nilai_komisi" => "",
				"nilai_bayar" => "",
				"ppn" => "",
				"pph" => "",
				"pphpt" => "",
				"komisitran_komisitran_id" => "",
			);
		}

		$hasil = $this->dbTable->SPUpdate('sp_klaimkomisi_update', $k->getModiBy(), $k->getId(),
				$k->getNomor_invoice_agent(),
				$k->getTipe_agent(),
				$k->getAgent_id(),
				$k->getNpwp(),
				$k->getTgl_pengajuan(),
				$k->getNomor_pengajuan(),
				$k->getNote(),
				$k->getNilai_komisi(),
				$k->getPph(),
				$k->getPpn(),
				$k->getTotal_bayar(), $deletedRows, $decanResult["purchaseletter_purchaseletter_id"],
				$decanResult["nilai_komisi"],
				$decanResult["ppn"],
				$decanResult["pph"],
				$decanResult["nilai_bayar"],
				$k->getPphpt(),
				$decanResult["pphpt"],
				$decanResult["komisitran_komisitran_id"]
		);


		//  var_dump($this->dbTable);
		return $hasil;
	}

	public function delete($ids, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;
		$row = $this->dbTable->SPUpdate('sp_komisitran_destroy', $ids, $session->getUserId());
		return $row;
	}

	public function deleteKlaimKomisi($ids, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;
		$row = $this->dbTable->SPUpdate('sp_klaimkomisi_destroy', $ids, $session->getUserId());
		return $row;
	}

}
