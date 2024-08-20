<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Master_OpportunityCustomerExcel {

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

		$objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

		$objPHPExcel->getProperties()->setTitle("Opportunity Customer");
		$objPHPExcel->getProperties()->setSubject("Opportunity Customer");
		$objPHPExcel->getProperties()->setDescription("Opportunity Customer");


		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'No');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Sales Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Downline');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Customer Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Home Phone 1');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Home Phone 2');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Office Phone');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Mobile Phone 1');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Mobile Phone 2');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Address');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Catatan');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Date Registration');

		//AUTO SIZE
		$range = range('A', 'L');
		foreach ($range as $value) {
			if ($value == "J") {
				$objPHPExcel->getSheet(0)->getColumnDimension('J')->setWidth(40);
			} else {
				$objPHPExcel->getSheet(0)->getColumnDimension($value)->setAutoSize(true);
			}
		}

		$no = 1;
		$count = 2;

		foreach ($appData as $row) {

			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $no);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["addname"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["downline_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["name"]);
			$objPHPExcel->getActiveSheet()->setCellValueExplicit('E' . $count, ((string) $row["home_phone"] . ' '));
			$objPHPExcel->getActiveSheet()->setCellValueExplicit('F' . $count, ((string) $row["home_phone2"] . ' '));
			$objPHPExcel->getActiveSheet()->setCellValueExplicit('G' . $count, ((string) $row["office_phone"] . ' '));
			$objPHPExcel->getActiveSheet()->setCellValueExplicit('H' . $count, ((string) $row["mobile_phone"]));
			$objPHPExcel->getActiveSheet()->setCellValueExplicit('I' . $count, ((string) $row["mobile_phone2"] . ' '));
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["address"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $row["description"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, date("d-m-Y", strtotime($row["Addon"])));

			//number to text
//			$objPHPExcel->getActiveSheet()->getStyle('E' . $count)->getNumberFormat()->setFormatCode('');
//			$objPHPExcel->getActiveSheet()->getStyle('F' . $count)->getNumberFormat()->setFormatCode('0');
//			$objPHPExcel->getActiveSheet()->getStyle('G' . $count)->getNumberFormat()->setFormatCode('0');
//			$objPHPExcel->getActiveSheet()->getStyle('H' . $count)->getNumberFormat()->setFormatCode('');
//			$objPHPExcel->getActiveSheet()->getStyle('I' . $count)->getNumberFormat()->setFormatCode('0');
//            $objPHPExcel->getActiveSheet()->getStyle('E'.$count)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_TEXT );
			//wordwrap
			$objPHPExcel->getActiveSheet()->getStyle('J' . $count)->getAlignment()->setWrapText(true);

			$no++;
			$count++;
		}


		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'OpportunityCustomer_' . $this->projectId . '_' . $this->ptId . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/uploads/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
