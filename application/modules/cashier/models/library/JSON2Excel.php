<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JSON2Excel
 *
 * @author TOMMY-MIS
 */
//ini_set('memory_limit', '512M');
ini_set('memory_limit', '1024M'); /* edited by ahmad riadi 23-06-2017 */
//set_time_limit(300);
set_time_limit(1200); /* edited by ahmad riadi 23-06-2017 */

require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Cashier_Models_Library_JSON2Excel {

	public $msg;
	public $fieldAwal; // contoh : type_name
	public $fileTemplate;
	public $tipeGrouping; // contoh : "TOP", "BOTTOM" , "BOTH"
	public $groupingFields;
	public static $OPERATORTOTAL_SUM = "sum";
	public static $OPERATORTOTAL_COUNT = "count";
	public static $OPERATORTOTAL_TEXT = "text";
	public static $OPERATORTOTAL_STATICTEXT = "statictext";

	public function __construct() {
		$this->tipeGrouping = "BOTTOM";

		// sample groupingFields
		/*
		  array(
		  array("KOLOM"=>"D","VALUE"=>0,"FIELD"=>"salesman_id")
		  )
		 */
	}

	public function process($variables, $jsonFile, $excelFile, $pembagi = 0, $borderRow = 'none', $extensionType = 'Excel2007') {
		$hasil = FALSE;

		if (!file_exists($jsonFile)) {
			$this->msg = "Tidak ada file " . $jsonFile;
			return $hasil;
		}

		if (strlen($this->fieldAwal) == 0) {
			$this->msg = "Silahkan input field awal";
			return FALSE;
		}

		if (!file_exists($this->fileTemplate)) {
			$this->msg = "Tidak ada file template ";
			return $hasil;
		}

		$str = file_get_contents($jsonFile);
// $pembagi = 1000;
		$panjangString = strlen($str);
		if ($pembagi == 0) {
			$pembagi = floor($panjangString / 10000000);
			$pembagi = $pembagi == 0 ? 1 : $pembagi;
		}


		$segment = floor(strlen($str) / $pembagi);

		$barisData = array();
		$textUntukBerikutnya = "";
		$startPotong = 0;
		$endPotong = $segment;
		for ($i = 0; $i < $pembagi + 1; $i++) {
			$rest = substr($str, $startPotong, $segment);
			$rest = $textUntukBerikutnya . "" . $rest;
			$batas = strrpos($rest, '{"' . $this->fieldAwal . '"') - 1; // -1 karen ada koma untuk setiap row
			$restFinal = substr($rest, 0, $batas) . "]";
			$barisData[] = $restFinal;

			$textUntukBerikutnya = "[" . substr($rest, $batas + 1, strlen($rest));
			$startPotong = $segment * ($i + 1);
			$endPotong = $endPotong + $segment;
		}

		if (strlen($textUntukBerikutnya) > 0) {

			$barisData[] = $textUntukBerikutnya;
		}



		$jsonData = array();

		$isDebug = FALSE;
		$maxRow = 100000;

		$objReader = PHPExcel_IOFactory::createReader($extensionType);
		$objPHPExcel = $objReader->load($this->fileTemplate);
//  $objPHPExcel = new PHPExcel();
/// DATA
		$dataExcel = $variables;

		$rowKosong = intval($objPHPExcel->setActiveSheetIndex(0)->getHighestRow()) + 1; /// 1 row kosong yang dijadikan acuan untuk copy style kosong;

		$kolomAkhir = $objPHPExcel->setActiveSheetIndex(0)->getHighestColumn();
		$styleKosong = $objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $rowKosong . ":" . "" . $kolomAkhir . "" . $rowKosong);
		$styleFooter = NULL;
		$styleDFooter = NULL;

		$rangeTplFooter = NULL;


/// SEARCH
		$foundInCells = array();
		$foundRow = array();
		$foundFooter = array();
		$foundDataFooter = array();


		$matches = array();
		foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
			$ws = $worksheet->getTitle();
			foreach ($worksheet->getRowIterator() as $row) {
				$cellIterator = $row->getCellIterator();
				$cellIterator->setIterateOnlyExistingCells(true);
				foreach ($cellIterator as $cell) {
					if (preg_match('/{(.*?)}/', $cell->getValue(), $matches) === 1) {
						$foundInCells[$matches[1]] = array($cell->getCoordinate(), $cell->getValue());
					}
					if (preg_match('/d:row(.*?):/', $cell->getValue(), $matches) === 1) {
						$foundRow[] = array($cell->getCoordinate(), $cell->getValue());
						$cell->setValue("");
					}
					if (preg_match('/g:footer(.*?):/', $cell->getValue(), $matches) === 1) {

						$footerFields = array();
						for ($i = "A"; $i <= $kolomAkhir; $i++) {
							$tempCell = $objPHPExcel->setActiveSheetIndex(0)->getCell($i . $cell->getRow());
							$matchesfield = array();
							$tempFieldName = NULL;
							$tempFieldSum = NULL;
							$kolom = NULL;
							$value = 0;
							$markFound = NULL;
							if (preg_match('/{(.*?)}/', $tempCell->getValue(), $matches) === 1) {


								if (preg_match('/\((.*?)\)/', $matches[1], $matchesfield) === 1) {
									$tempFieldName = $matchesfield[1];
								}
								if (preg_match('/(.*?)\(/', $matches[1], $matchesfield) === 1) {
									$tempFieldSum = $matchesfield[1];
								}

								if ($tempFieldSum == NULL && strlen($matches[1]) > 0) {
									$tempFieldSum = Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_TEXT;
									$tempFieldName = $matches[1];
								}

								$kolom = $i;
								$value = 0;
								$markFound = $matches[1];
							} else {
								/// teks bebas
								if (strlen($tempCell->getValue()) > 0 && strpos($tempCell->getValue(), 'g:footer') === false) {
									$kolom = $i;
									$value = $tempCell->getValue();
								}
							}

							if ($kolom != NULL) {
								$footerFields[] = array("KOLOM" => $i, "VALUE" => $value, "TYPE" => $tempFieldSum, "FIELD" => $tempFieldName, "MARK_FOUND" => $markFound);
							}
						}


						$foundFooter[] = array($cell->getCoordinate(), $cell->getValue(), str_replace("g:footer:", "", $cell->getValue()), $footerFields);



						$styleFooter = $objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow());

						// $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleKosong, "A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow());
						$rangeTplFooter = "A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow();



						$row = 1;
						$lastColumn = $kolomAkhir;
						$lastColumn++;
						for ($column = 'A'; $column != $lastColumn; $column++) {

							$worksheet->getCell($column . $cell->getRow())->setValue("");
							//  Do what you want with the cell
						}
						$cell->setValue("");
					}

					if (preg_match('/d:footer(.*?):/', $cell->getValue(), $matches) === 1) {

						$footerFields = array();
						for ($i = "A"; $i <= $kolomAkhir; $i++) {
							$tempCell = $objPHPExcel->setActiveSheetIndex(0)->getCell($i . $cell->getRow());
							$matchesfield = array();
							$tempFieldName = NULL;
							$tempFieldSum = NULL;
							$kolom = NULL;
							$value = 0;
							$markFound = NULL;
							if (preg_match('/{(.*?)}/', $tempCell->getValue(), $matches) === 1) {


								if (preg_match('/\((.*?)\)/', $matches[1], $matchesfield) === 1) {
									$tempFieldName = $matchesfield[1];
								}
								if (preg_match('/(.*?)\(/', $matches[1], $matchesfield) === 1) {
									$tempFieldSum = $matchesfield[1];
								}

								if ($tempFieldSum == NULL && strlen($matches[1]) > 0) {
									$tempFieldSum = Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_TEXT;
									$tempFieldName = $matches[1];
								}

								$kolom = $i;
								$value = 0;
								$markFound = $matches[1];
							} else {
								/// teks bebas
								if (strlen($tempCell->getValue()) > 0 && strpos($tempCell->getValue(), 'g:footer') === false) {
									$kolom = $i;
									$value = $tempCell->getValue();
								}
							}

							if ($kolom != NULL) {
								$footerFields[] = array("KOLOM" => $i, "VALUE" => $value, "TYPE" => $tempFieldSum, "FIELD" => $tempFieldName, "MARK_FOUND" => $markFound);
							}
						}


						$foundDataFooter[] = array($cell->getCoordinate(), $cell->getValue(), str_replace("g:footer:", "", $cell->getValue()), $footerFields);
						$styleDFooter = $objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow());

						// $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleKosong, "A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow());
						$rangeTplFooter = "A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow();



						$row = 1;
						$lastColumn = $kolomAkhir;
						$lastColumn++;
						for ($column = 'A'; $column != $lastColumn; $column++) {

							$worksheet->getCell($column . $cell->getRow())->setValue("");
							//  Do what you want with the cell
						}
						$cell->setValue("");
					}
				}
			}
		}

//		  print_r($foundInCells);
		//  var_dump($foundFooter);
//		 die();


		$this->groupingFields = array();
		if (count($foundFooter) > 0) {
			if (is_array($foundFooter[0][3])) {
				$this->groupingFields = $foundFooter[0][3];
			}
		}


		$pageFooterGroupingFields = array();
		if (count($foundDataFooter) > 0) {
			if (is_array($foundDataFooter[0][3])) {
				$pageFooterGroupingFields = $foundDataFooter[0][3];
			}
		}



		/// ROW
		if (count($foundRow) > 0) {
			$index = 0;
			$row = $this->get_numerics($foundRow[$index][0]);
			$temp = array();
			foreach ($foundInCells as $found) {
				//$temp
				if ($this->get_numerics($found[0]) == $row) {
					$replaceKurawal = array("{", "}");
					$temp[] = array(
						str_replace($row, "", $found[0]),
						str_replace($replaceKurawal, "", $found[1])
					);
				}
			}
			if (count($temp) > 0) {
				$foundRow[$index][] = $temp;
			}
		}


		// var_dump($foundFooter);
		//  var_dump($foundInCells);
/// REPLACE VALUE {DATA}
		foreach ($dataExcel as $k => $v) {
			if (array_key_exists($k, $foundInCells)) {
				$objPHPExcel->setActiveSheetIndex(0)
						->setCellValue($foundInCells[$k][0], str_replace("{" . $k . "}", $v, $foundInCells[$k][1]));
			}
		}




/// END SEARCH
		//  $row = 1;
/// HEADER
/// BODY

		$salesman = NULL;
		$jenisReport = NULL; // untuk hold report yang sedang di render
		//   $row = 3;
		// $total = $this->groupingFields;

		$collector = array();

		$currentGroupName = "";
		foreach ($barisData as $l => $w) {
			$json = json_decode($w);

			if ($row < $maxRow) {
				if (is_array($json) && count($json) > 0) {
					foreach ($json as $k => $v) {

						/// header group

						if (strlen($currentGroupName) > 0 && $currentGroupName <> rtrim(ltrim($json[$k]->{$foundFooter[0][2]}))) {

							$this->cetakGroupFooter($objPHPExcel, $this->groupingFields, $row, $v, $kolomAkhir);
							$currentGroupName = rtrim(ltrim($json[$k]->{$foundFooter[0][2]}));

							$row++;
						}


						## STYLE BORDER ADD BY RH 21/05/2021##
						if ($borderRow == 'allBorder') {
							$columnAwal = $foundRow[0][2][0][0];
							$objPHPExcel->setActiveSheetIndex(0)->getStyle($columnAwal . $row . ':' . $kolomAkhir . $row)->applyFromArray(
									array(
										'borders' => array(
											'allborders' => array(
												'style' => PHPExcel_Style_Border::BORDER_THIN
											)
										)
									)
							);
						}


						// $tempCurrGroupName = $json[$k]->{$foundFooter[0][2]};

						foreach ($this->groupingFields as $k2 => $field2) {
							/// kalau field "FIELD" null maka increment 1 , jika tidak maka increment field
							if ($field2["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_COUNT) {
								if (isset($v->{$field2["FIELD"]})) {
									$this->groupingFields[$k2]["VALUE"] ++; // reset
								}
							} else if ($field2["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_SUM) {
								$this->groupingFields[$k2]["VALUE"] += $v->{$field2["FIELD"]}; // reset
							}
						}

						/// grand total
						foreach ($pageFooterGroupingFields as $k2 => $field2) {
							/// kalau field "FIELD" null maka increment 1 , jika tidak maka increment field
							if ($field2["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_COUNT) {
								if (isset($v->{$field2["FIELD"]})) {
									$pageFooterGroupingFields[$k2]["VALUE"] ++; // reset
								}
							} else if ($field2["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_SUM) {
								$pageFooterGroupingFields[$k2]["VALUE"] += $v->{$field2["FIELD"]}; // reset
							}
						}


						foreach ($foundRow[0][2] as $field) {
							$objPHPExcel->setActiveSheetIndex(0)->setCellValue($field[0] . $row, $v->{$field[1]});
						}


						if (count($foundFooter) > 0) {
							if (array_key_exists($k + 1, $json)) {

								// if($tempCurrGroupName <> $json[$k + 1]->{$foundFooter[0][2]}){
								if (rtrim(ltrim($json[$k]->{$foundFooter[0][2]})) <> rtrim(ltrim($json[$k + 1]->{$foundFooter[0][2]}))) {

									$currentGroupName = rtrim(ltrim($json[$k + 1]->{$foundFooter[0][2]}));

									/// FOOTER GROUP
									if (is_array($this->groupingFields)) {
										$row++;

										$this->cetakGroupFooter($objPHPExcel, $this->groupingFields, $row, $v, $kolomAkhir);
									}




									/// HEADER GROUP
									/*
									  $row++;

									  $objPHPExcel->setActiveSheetIndex(0)
									  ->setCellValue("A" . $row, $v->{$foundFooter[0][2]});
									 * 
									 */
								}
							} else {
								
							}
						}

						$row++;
					}
				}



//   $start = $row;
			} else {
				
			}



			unset($json);
		}

		/// END ROW
		/// GROUP FOOTER
		if (is_array($this->groupingFields) && count($this->groupingFields) > 0) {
			$this->cetakGroupFooter($objPHPExcel, $this->groupingFields, $row, $v, $kolomAkhir);
		}

		/// / FOOTEr
		/// PAGE FOOTER
		$row++;
		if (is_array($pageFooterGroupingFields) && count($pageFooterGroupingFields) > 0) {

			//$pageFooterGroupingFields
			//  $this->cetakGroupFooter($objPHPExcel,$pageFooterGroupingFields,$row,$v,$kolomAkhir);
			foreach ($pageFooterGroupingFields as $gpk => $gpv) {
				if ($gpv["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_TEXT) {
					$objPHPExcel->setActiveSheetIndex(0)->setCellValue($gpv["KOLOM"] . $row, $v->{$gpv["FIELD"]});
				} else {
					$objPHPExcel->setActiveSheetIndex(0)->setCellValue($gpv["KOLOM"] . $row, $gpv["VALUE"]);
				}
			}
			$objPHPExcel->setActiveSheetIndex(0)->setCellValue("A" . $row, "");
			//  $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleFooter, "A" . $row . ":" . $kolomAkhir . "" . $row);

			$objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $row . ":" . $kolomAkhir . "" . $row)
					->applyFromArray(
							array(
								'borders' => array(
									'top' => array(
										'style' => PHPExcel_Style_Border::BORDER_THIN
									)
								)
							)
			);

			$objPHPExcel->setActiveSheetIndex(0)->getStyle($rangeTplFooter)
					->applyFromArray(
							array(
								'borders' => array(
									'allborders' => array(
										'style' => PHPExcel_Style_Border::BORDER_NONE
									)
								)
							)
			);
		}




		if (file_exists($jsonFile)) {

			unlink($jsonFile);
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $extensionType);
		$objWriter->save($excelFile);

		$hasil = TRUE;
		return $hasil;
	}

	private function cetakGroupFooter($objPHPExcel, &$dataFooter, $row, $record, $kolomAkhir) {
		foreach ($dataFooter as $gpk => $gpv) {
			if ($gpv["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_TEXT) {
				$objPHPExcel->setActiveSheetIndex(0)->setCellValue($gpv["KOLOM"] . $row, $record->{$gpv["FIELD"]});
			} else {
				$objPHPExcel->setActiveSheetIndex(0)->setCellValue($gpv["KOLOM"] . $row, $gpv["VALUE"]);
			}

			if ($gpv["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_COUNT || $gpv["TYPE"] == Cashier_Models_Library_JSON2Excel::$OPERATORTOTAL_SUM) {
				$dataFooter[$gpk]["VALUE"] = 0; // reset
			}
		}

		//$objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleFooter, "A" . $row . ":" . $kolomAkhir . "" . $row);
		$objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $row . ":" . $kolomAkhir . "" . $row)
				->applyFromArray(
						array(
							'borders' => array(
								'top' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
		);
	}

	private function get_numerics($str) {
		preg_match_all('/\d+/', $str, $matches);
		return intval($matches[0][0]);
	}

}
