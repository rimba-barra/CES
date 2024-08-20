<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_ExportExcelSudahBayarSekianPersenHariLalu {

	private $fileResult;
	private $objPHPExcel;
	private $url;
	private $projectId;
	private $ptId;

	function __construct($projectId, $ptId) {
		$this->projectId = $projectId;
		$this->ptId = $ptId;
	}

	public function process($appData) {


		$objPHPExcel = new PHPExcel();

		// $objPHPExcel->setActiveSheetIndex(0);
		//   $activeSheet = $this->objPHPExcel->getActiveSheet();
		// Set properties
//echo date('H:i:s') . " Set properties\n";
		$objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

		$objPHPExcel->getProperties()->setTitle("POPUP SUDAH BAYAR SEKIAN PERSEN EREMS");
		$objPHPExcel->getProperties()->setSubject("POPUP SUDAH BAYAR SEKIAN PERSEN EREMS");
		$objPHPExcel->getProperties()->setDescription("POPUP SUDAH BAYAR SEKIAN PERSEN EREMS");


// Add some data
//echo date('H:i:s') . " Add some data\n";
		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Total Payment');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Tgl Terakhir Bayar');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Kawasan');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Unit Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Type');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Tanggal Pesanan');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Nomor Pesanan');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Harga Jual');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Customer Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Sales Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Member Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'ACI');
		$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Status Lunas');
		$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Tanggal Lunas');
		$objPHPExcel->getActiveSheet()->SetCellValue('O1', 'Tanggal Input');

		$count = 2;
		foreach ($appData as $row) {
			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["total_payment"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, ($row["payment_payment_date"] != "" ? date("d-m-Y", strtotime($row["payment_payment_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["cluster_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["unit_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["type_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, date("d-m-Y", strtotime($row["purchase_date"])));
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["purchaseletter_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["harga_total_jual"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, $row["customer_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["salesman_employee_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $row["clubcitra_member"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, $row["api_aci"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('M' . $count, $row["is_lunas"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('N' . $count, ($row["lunas_date"] != "" ? date("d-m-Y", strtotime($row["lunas_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('O' . $count, date("d-m-Y", strtotime($row["Addon"])));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'SUDAHBAYARSEKIANPERSEN_' . $this->projectId . '_' . $this->ptId . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/sudah_bayar_sekian_persen/' . $this->fileResult);
		$this->url = 'app/erems/uploads/sudah_bayar_sekian_persen/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
