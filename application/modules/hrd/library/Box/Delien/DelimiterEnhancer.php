<?php

class Box_Delien_DelimiterEnhancer {

    protected $delimiter = '~';
    protected $delimiterCandidate = null;
   

    public function __construct($delimiter = '~') {
        $this->delimiter = $delimiter;
    }

    public function getDelimiterCandidate() {
        return $this->delimiterCandidate;
    }

    public function setDelimiterCandidate(Box_Delien_DelimiterCandidate $x) {
        $this->delimiterCandidate = $x;
   
    }

    public function generate() {
        $dc = $this->getDelimiterCandidate();
        $dcA = $dc->getDCArray();
        if (!is_array($dcA))
            return;
        $arField = array_keys($dcA);
        $newAr = array();
        $tempAr = array();
        $fielAr = array();
        $xtraAr = array();
        $tempDelimiterStr = '';
        
        $jumlahItem = count($dcA);
        $countRow = 1;
        foreach ($dcA as $k => $v) {

            if ($v instanceof Box_Arried) {
                $tempAr = $v->getArray();
                
                if (count($fielAr) == 0) {
                    $fielAr = array_keys($tempAr);
                    foreach ($fielAr as $kav => $fav) {
                        if (!key_exists($fav, $xtraAr)) {
                            $xtraAr[$fav] = '';
                        }
                    }
                }
                $count = 1;
                foreach ($tempAr as $ku=>$vu){
                  
                    if($jumlahItem > 1){
                        //$tempDelimiterStr = $count<=count($tempAr)?$this->delimiter:"";
                       $tempDelimiterStr = $countRow<$jumlahItem?$this->delimiter:"";
                    }else{
                        $tempDelimiterStr = "";
                    }
               
                    $xtraAr[$ku] .= $vu.''.$tempDelimiterStr;
                    $count++;
                }
                $countRow++;
            }
        }
        $dc->setDCArray($xtraAr);
    }

}

?>
