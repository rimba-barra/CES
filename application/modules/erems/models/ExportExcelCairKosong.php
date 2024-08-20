<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_ExportExcelCairKosong {

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
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Code');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Block');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Unit Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Payment No');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Receipt No');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Payment Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Salesman');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Note');

		$objPHPExcel->getActiveSheet()->getStyle('A1:W1')->applyFromArray($style);

		foreach(range('A','W') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$count = 2;
		foreach ($appData as $row) {
			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["cluster_code"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["block_code"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["unit_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["payment_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["receipt_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, ($row["payment_date"] != "" ? date("d-m-Y", strtotime($row["payment_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["salesman_employee_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["note"]);
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_tanggal_cair_kosong_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
