<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_ExportExcelStockBelumSiapJual {

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
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Siap Stock');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Siap Legal');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Cluster');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Block Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'PT. Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Type');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Category');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Land Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Building Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Kelebihan');
		$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Floor');
		$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Floor Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('O1', 'Bedroom');
		$objPHPExcel->getActiveSheet()->SetCellValue('P1', 'Bathroom');
		$objPHPExcel->getActiveSheet()->SetCellValue('Q1', 'Electricity');
		$objPHPExcel->getActiveSheet()->SetCellValue('R1', 'Status');
		$objPHPExcel->getActiveSheet()->SetCellValue('S1', 'Progress (%)');
		$objPHPExcel->getActiveSheet()->SetCellValue('T1', 'Added By');
		$objPHPExcel->getActiveSheet()->SetCellValue('U1', 'Added Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('V1', 'Edited By');
		$objPHPExcel->getActiveSheet()->SetCellValue('W1', 'Edited Date');

		$objPHPExcel->getActiveSheet()->getStyle('A1:W1')->applyFromArray($style);

		foreach(range('A','W') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$count = 2;
		foreach ($appData as $row) {
			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["unit_id"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["is_readystock"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["is_readylegal"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["cluster_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, $row["block_block"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["pt_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["type_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, $row["productcategory_productcategory"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["land_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $row["building_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, $row["kelebihan"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('M' . $count, $row["floor"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('N' . $count, $row["floor_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('O' . $count, $row["bedroom"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('P' . $count, $row["bathroom"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('Q' . $count, $row["electricity"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('R' . $count, $row["unitstatus_status"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('S' . $count, $row["progress"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('T' . $count, $row["useradd"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('U' . $count, ($row["Addon"] != "" ? date("d-m-Y", strtotime($row["Addon"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('V' . $count, $row["useredit"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('W' . $count, ($row["Modion"] != "" ? date("d-m-Y", strtotime($row["Modion"])) : ""));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_stock_belum_siap_jual_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
