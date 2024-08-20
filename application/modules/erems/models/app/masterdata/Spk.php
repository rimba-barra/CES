<?php

/**
 * Description of Cluster
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_Spk extends Erems_Box_Models_App_Masterdata_Masterdata {

	public function getDao() {
		return new Erems_Models_Spk_SpkDao();
	}

	public function getTableClass() {
		return new Erems_Models_Spk_Spk();
	}

	public function getTableClassName() {
		return "spk";
	}

	public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
		$objectEmbedata->getProject()->setId($app->getSession()->getProject()->getId());
		$objectEmbedata->getPt()->setId($app->getSession()->getPt()->getId());
		$hasil = $dao->getByProjectPt($objectEmbedata);
		return $hasil;
	}

	protected function getMethod($object) {
		return $this->getDao()->getAllForCombo();
	}

}

?>
