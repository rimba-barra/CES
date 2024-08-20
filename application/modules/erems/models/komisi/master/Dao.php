<?php

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Master_Dao extends Erems_Box_Models_App_AbDao {

	public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Komisi_Master_MasterKomisi $k) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_masterkomisi_read', $k->getProject()->getId(), $k->getPt()->getId(), $r->getPage(), $r->getLimit(), $k->getCode()
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
		$hasil = $this->dbTable->SPExecute('sp_masterkomisidetail_read', intval($id)
		);
		return $hasil;
	}

	public function save(Erems_Models_Komisi_Master_MasterKomisi $k) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_masterkomisi_create', $k->getAddBy(), $k->getProject()->getId(), $k->getPt()->getId(), $k->getCode(), $k->getNama(), $k->getYbs(), $k->getSales_co(), $k->getHead_sales(), $k->getHead_adm(), $k->getTeam(), $k->getKas(), $k->getManager_marketing(), $k->getPph(), $k->getDefinisi_kc(), $k->getPpn(),/* Add by RH 18/11/2019 */ $k->getManager_marketing2(), $k->getGm_sales_marketing(), $k->getAssdir_sales_marketing(), $k->getSupport_proyek(), $k->getSupport1(), $k->getGm_sales_marketing1(), $k->getPph_pt() /* END Add by RH 18/11/2019 */);


		return $hasil;
	}

	public function dataExist(Erems_Models_Komisi_Master_MasterKomisi $k) {
		$hasil = 0;
		$hasil = $this->dbTable->SPExecute('sp_komisicodeexist_read', $k->getProject()->getId(), $k->getPt()->getId(), $k->getCode());

		return $hasil;
	}

	//sp_projectfacilitiestcodeexist_read

	public function update(Erems_Models_Komisi_Master_MasterKomisi $k) {
		$hasil = 0;

		if ($k->getId() == 0) {
			return 0;
		}

		$hasil = $this->dbTable->SPUpdate('sp_masterkomisi_update', $k->getModiBy(), $k->getId(), $k->getCode(), $k->getNama(), $k->getYbs(), $k->getSales_co(), $k->getHead_sales(), $k->getHead_adm(), $k->getTeam(), $k->getKas(), $k->getManager_marketing(), $k->getPph(), $k->getDefinisi_kc(), $k->getPpn(), /* Add by RH 18/11/2019 */ $k->getManager_marketing2(), $k->getGm_sales_marketing(), $k->getAssdir_sales_marketing(), $k->getSupport_proyek(), $k->getSupport1(), $k->getGm_sales_marketing1(), $k->getPph_pt() /* END Add by RH 18/11/2019 */
		);


		//  var_dump($this->dbTable);
		return $hasil;
	}

	public function delete($ids, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;
		$row = $this->dbTable->SPUpdate('sp_masterkomisi_destroy', $ids, $session->getUserId());
		return $row;
	}

}
