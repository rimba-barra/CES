<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_ExportExcelChangeKavlingSatuBulan {

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

		$style = array(
	        'alignment' => array(
	            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
	            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
	        ),
            'font'  => array(
                'bold'  => true
            )
	    );

		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Cluster');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Block');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Unit');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Customer Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Purchase Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Purchase Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Sales Price');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'New Purchase No');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'New Purchase Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'New Cluster');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'New Block');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'New Unit');
		$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'New Salesprice');
		$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Approved');
		$objPHPExcel->getActiveSheet()->SetCellValue('O1', 'Approve Date');

		$objPHPExcel->getActiveSheet()->getStyle('A1:O1')->applyFromArray($style);

		foreach(range('A','O') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$count = 2;
		foreach ($appData as $row) {
			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["cluster_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["block_block"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["unit_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["customer_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, ($row["purchaseletter_purchase_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletter_purchase_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, $row["purchaseletter_purchaseletter_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, number_format($row["purchaseletter_harga_total_jual"],0,'.','.'));
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["purchaseletter2_purchaseletter_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, ($row["purchaseletter2_purchase_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletter2_purchase_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["cluster2_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $row["block2_block"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, $row["unit2_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('M' . $count, number_format($row["purchaseletter2_harga_total_jual"],0,'.','.'));
			$objPHPExcel->getActiveSheet()->SetCellValue('N' . $count, $row["purchaseletterrevision_is_approve"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('O' . $count, ($row["purchaseletterrevision_approve_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletterrevision_approve_date"])) : ""));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_pindah_kavling (30 hari)_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
