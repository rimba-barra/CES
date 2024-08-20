<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_ExportExcelHoldBook {

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
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'ID');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Kav. Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Cluster');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Block Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'PT. Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Type');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Category');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Land Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Building Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Kelebihan');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Floor');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Floor Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Bedroom');
		$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Bathroom');
		$objPHPExcel->getActiveSheet()->SetCellValue('O1', 'Electricity');
		$objPHPExcel->getActiveSheet()->SetCellValue('P1', 'Status');
		$objPHPExcel->getActiveSheet()->SetCellValue('Q1', 'Progress');
		$objPHPExcel->getActiveSheet()->SetCellValue('R1', 'Added By');
		$objPHPExcel->getActiveSheet()->SetCellValue('S1', 'Added Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('T1', 'Edited By');
		$objPHPExcel->getActiveSheet()->SetCellValue('U1', 'Edited Date');

		$objPHPExcel->getActiveSheet()->getStyle('A1:W1')->applyFromArray($style);

		foreach(range('A','W') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$count = 2;
		foreach ($appData as $row) {
			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["unit_id"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["cluster_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["block_block"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["pt_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, $row["type_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["productcategory_productcategory"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["land_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, $row["building_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["kelebihan"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $row["floor"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, $row["floor_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('M' . $count, $row["bedroom"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('N' . $count, $row["bathroom"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('O' . $count, $row["electricity"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('P' . $count, $row["unitstatus_status"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('Q' . $count, $row["progress"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('R' . $count, $row["useradd"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('S' . $count, ($row["Addon"] != "" ? date("d-m-Y", strtotime($row["Addon"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('T' . $count, $row["useredit"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('U' . $count, ($row["Modion"] != "" ? date("d-m-Y", strtotime($row["Modion"])) : ""));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_unit_hold_booking_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
