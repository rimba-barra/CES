<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_ExportExcelChangePriceSatuBulan {

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
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Cluster Code');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Block');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Unit Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Purchaseletter Number');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Old Purchase Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Old Sales Price');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Old Type Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Old Land Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Old Land Over Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Old Building Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Old Days');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'New Purchase Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'New Sales Price');
		$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'New Type Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('O1', 'New Land Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('P1', 'New Land Over Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('Q1', 'New Building Size');
		$objPHPExcel->getActiveSheet()->SetCellValue('R1', 'New Pays');
		$objPHPExcel->getActiveSheet()->SetCellValue('S1', 'Approved');
		$objPHPExcel->getActiveSheet()->SetCellValue('T1', 'Approve DATE');

		$objPHPExcel->getActiveSheet()->getStyle('A1:T1')->applyFromArray($style);

		foreach(range('A','T') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}


		$count = 2;
		foreach ($appData as $row) {
			if($row["pricetype_pricetype_id"]==1){
				$oldPrice = 'T';
			}else if($row["pricetype_pricetype_id"]==2){
				$oldPrice = 'K';
			}else{
				$oldPrice = 'I';
			}

			if($row["pricetypenew_pricetype_id"]==1){
				$newPrice = 'T';
			}else if($row["pricetypenew_pricetype_id"]==2){
				$newPrice = 'K';
			}else{
				$newPrice = 'I';
			}

			if($row["purchaseletterrevision_is_approve"] == 1){
				$approved = 'Sudah';
			}else{
				$approved = 'Belum';			
			}

			$objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["cluster_code"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["block_block"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["unit_unit_number"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["purchaseletter_purchaseletter_no"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, ($row["purchaseletter_purchase_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletter_purchase_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, number_format($row["harga_total_jual"],0,'.','.'));
			$objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["type_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["unit_land_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, $row["unit_kelebihan"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, $row["unit_building_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, $oldPrice);
			$objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, ($row["changeprice_date"] != "" ? date("d-m-Y", strtotime($row["changeprice_date"])) : ""));
			$objPHPExcel->getActiveSheet()->SetCellValue('M' . $count, number_format($row["harga_total_jual_new"],0,'.','.'));
			$objPHPExcel->getActiveSheet()->SetCellValue('N' . $count, $row["typenew_name"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('O' . $count, $row["unitnew_land_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('P' . $count, $row["unitnew_kelebihan"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('Q' . $count, $row["unitnew_building_size"]);
			$objPHPExcel->getActiveSheet()->SetCellValue('R' . $count, $newPrice);
			$objPHPExcel->getActiveSheet()->SetCellValue('S' . $count, $approved);
			$objPHPExcel->getActiveSheet()->SetCellValue('T' . $count, ($row["purchaseletterrevision_approve_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletterrevision_approve_date"])) : ""));
			$count++;
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->fileResult = 'List_popup_ganti_harga (30 hari)_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $this->fileResult);
		$this->url = 'app/erems/downloadfile/msexcel/' . $this->fileResult;
	}

	public function getUrl() {
		return $this->url;
	}

}

?>
