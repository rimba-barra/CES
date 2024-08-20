<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_ExportExcelPurchaseSatuBulan {

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
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Kawasan');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Type');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Tgl. Pesanan');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'No. Pesanan');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Harga Jual');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Customer Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Total Payment');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Sales Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Member Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'ACI');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Tgl. Input');

		$objPHPExcel->getActiveSheet()->getStyle('A1:L1')->applyFromArray($style);

		foreach(range('A','L') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$count = 2;
		foreach ($appData as $row) {
			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["cluster_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["unit_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["type_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, ($row["purchase_date"] != "" ? date("d-m-Y", strtotime($row["purchase_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["purchaseletter_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, number_format($row["harga_total_jual"],0,'.','.'));
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["customer_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, number_format($row["total_payment"],0,'.','.'));
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, $row["salesman_employee_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["clubcitra_member"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $row["api_aci"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, date("d-m-Y", strtotime($row["Addon"])));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_terjual (30 hari)_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
