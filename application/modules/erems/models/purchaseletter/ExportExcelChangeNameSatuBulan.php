<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_ExportExcelChangeNameSatuBulan {

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
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Block Code');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Unit Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Purchaseletter No');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Customer Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'New Customer Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Reason');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Approved');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Approve Date');

		$objPHPExcel->getActiveSheet()->getStyle('A1:I1')->applyFromArray($style);

		foreach(range('A','I') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}


		$count = 2;
		foreach ($appData as $row) {
			if($row["purchaseletterrevision_is_approve"] == 1){
				$approved = 'Sudah';
			}else{
				$approved = 'Belum';			
			}

			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["cluster_cluster"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["block_block"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["unit_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["purchaseletter_purchaseletter_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["customernew_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, $row["customerold_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["reasonchgname_reasonchgname"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $approved);
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, ($row["purchaseletterrevision_approve_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletterrevision_approve_date"])) : ""));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_ganti_nama (30 hari)_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
