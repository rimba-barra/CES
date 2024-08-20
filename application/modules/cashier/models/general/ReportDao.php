<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReportDao
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_General_ReportDao extends Cashier_Box_Models_App_AbDao {

	public function generalSales($project, $pt, $salesman, $buildingClass, $cluster, $type, $productCategory, $dataBot, $dateTop) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_report_generalsales', $pt, $project, $buildingClass, $cluster, $type, $productCategory, '', '', $dataBot, $dateTop, $salesman);

		return $hasil;
	}

	public function generalSalesCC($project, $pt, $salesman, $buildingClass, $cluster, $type, $productCategory, $dataBot, $dateTop) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_report_generalsales', $pt, $project, $buildingClass, $cluster, $type, $productCategory, '', '', $dataBot, $dateTop, $salesman);

		return $hasil;
	}

	public function generalSalesCaraBayar($project, $pt, $salesman, $buildingClass, $cluster, $type, $productCategory, $dataBot, $dateTop) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_report_generalsalescarabayar', $pt, $project, $buildingClass, $cluster, $type, $productCategory, '', '', $dataBot, $dateTop, $salesman);

		return $hasil;
	}

	public function stockMe($project, $pt, $cluster) {
		$hasil = array();

// $hasil = $this->dbTable->SPExecute('sp_reportstockme_read',$project,$pt,$cluster);
		$hasil = $this->dbTable->SPExecute('sp_reportstockme_read', $project, $pt);
		return $hasil;
	}

	public function townplan($project, $pt, $salesGroup, $cluster, $type, $productCategory, $unitStatus, $groupBy) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_report_townplanning', $salesGroup, $cluster, $type, $productCategory, $unitStatus, $groupBy, $pt, $project);

		return $hasil;
	}

	public function constall($project, $pt, $cluster) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_reportconstconstall_read', $project, $pt, $cluster);

		return $hasil;
	}

	public function lastprice($project, $pt, $dataBot, $dateTop) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_report_lastprice', $pt, $project, $dataBot, $dateTop);

		return $hasil;
	}

	public function penjualanpersales($project, $salesman_id, $dataBot, $dateTop, $salesgroup) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_reportpenjualansales_read', $project, $salesman_id, $dataBot, $dateTop, $salesgroup);

		return $hasil;
	}
	
	public function escrow($project, $dataBot, $dateTop, $bank, $lunas) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_reportescrowkpr_read', $project, $dataBot, $dateTop, $bank, $lunas);

		return $hasil;
	}
	
	public function status_pembayaran($project, $status_bayar, $angsuran_ke) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_reportstatuspembayaran_read', $project, $status_bayar, $angsuran_ke);

		return $hasil;
	}

}
