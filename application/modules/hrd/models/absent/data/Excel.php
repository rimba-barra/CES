<?php

include realpath(APPLICATION_PATH . '/../public/app/hrd/uploads/PHPExcel_1.8.0/Classes/PHPExcel/IOFactory.php');

class Hrd_Models_Absent_Data_Excel extends Hrd_Models_Absent_ImporterData {
    private $session;
    
    public function setSession(Box_Models_App_Session $session) {
        $this->session = $session;
    }

        
    public function process() {
        $inputFileName = realpath(APPLICATION_PATH . '/../public/app/hrd/uploads/absent/excel/'.$this->session->getProject()->getId().'_'.$this->session->getPt()->getId().''.Box_Config::ABSENT_EXCEL_FILENAME);

//  Read your Excel workbook
        try {
            $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
            $objReader = PHPExcel_IOFactory::createReader($inputFileType);

            $objPHPExcel = $objReader->load($inputFileName);


            $sheetData = $objPHPExcel->getActiveSheet()->toArray(NULL,FALSE,FALSE, TRUE);
            $header = new Hrd_Models_Fingerprint_Header();
            $listEmployee = array();
            $countColumn = 0;
            $fpExist = FALSE;
            $header = new Hrd_Models_Fingerprint_Header();
            $count = 0;
            $timeInFirst = TRUE;
            foreach ($sheetData as $row) {
                $tempNumber = (string)$row["A"];
                if ($count > 0 && strlen($tempNumber) > 0) { // skip title row
                 
                    $tempTime = date("H:i:s", PHPExcel_Shared_Date::ExcelToPHP($row["D"])-60*60);
               
                    $tanggal = date("Y-m-d", PHPExcel_Shared_Date::ExcelToPHP($row["C"]));
                    
                    if (array_key_exists($tempNumber, $listEmployee)) {
                        /// check jika tanggal sudah ada 
                        if (array_key_exists($tanggal, $listEmployee[$tempNumber]["date"])) {
                            $listEmployee[$tempNumber]["date"][$tanggal][$timeInFirst?"timeout":"timein"] = $tempTime;
                        } else {
                            $listEmployee[$tempNumber]["date"][$tanggal] = array("timein" =>$timeInFirst?$tempTime:NULL, "timeout" =>$timeInFirst?NULL:$tempTime);
                        }
                    } else {

                        $listEmployee[$tempNumber] = array("name" =>$row["B"], "date" => array());
                        $listEmployee[$tempNumber]["date"][$tanggal] = array("timein" =>$timeInFirst?$tempTime:NULL, "timeout" =>$timeInFirst?NULL:$tempTime);
                    }
                }



                $count++;
            }
            $this->setFinalData($listEmployee);

            $objPHPExcel->disconnectWorksheets();
            unset($objPHPExcel);
        } catch (Exception $e) {
            $this->errorMessage = 'Error loading file "' . pathinfo($inputFileName, PATHINFO_BASENAME)
                    . '": ' . $e->getMessage();
        }
    }

}

?>
