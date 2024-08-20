<?php

/**
 * Description of Date
 *
 * @author MIS
 */
class Hrd_Models_Absent_Importer {

    private $data;
    private $totalRecord;
    private $errorMessage;
    private $header;

    public function __construct(Hrd_Models_Absent_ImporterData $importerData) {
        $this->data = $importerData;
    }

    public function process() {
        $process = $this->data->process();
        if(!$process){
          $this->errorMessage = $this->data->getErrorMessage();
          return FALSE;
        }        
        
        $hasil = $this->data->getFinalData();
        if ($hasil) {
            $this->totalRecord = count($hasil);
        }
        if ($this->totalRecord > 0) {
            $header = new Hrd_Models_Fingerprint_Header();
            // looping all employee
            foreach ($hasil as $fingerPrintNumber => $data) {
                // looping date
                foreach ($data["date"] as $date => $time) {
                    $fp = new Hrd_Models_Fingerprint_FingerPrint();
                    $fp->setNumber($fingerPrintNumber);
                    $fp->setName($data["name"]);
                    $fp->setDate($date);
                    $fp->setTimeIn($time["timein"]);
                    $fp->setTimeOut($time["timeout"]);
                    $header->addDetail($fp);
                }
            }


            $de = new Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($header);
            $de->generate();

            $this->header = $header;
            return TRUE;
        } else {
            $this->errorMessage = "No record found";
        }
        return FALSE;
    }

    public function getErrorMessage() {
        return $this->errorMessage;
    }

    public function getTotalRecord() {
        return $this->totalRecord;
    }
    
    public function getHeader(){
        if(!$this->header){
            $this->header = new Hrd_Models_Fingerprint_Header();
        }
        return $this->header;
    }

}

?>
