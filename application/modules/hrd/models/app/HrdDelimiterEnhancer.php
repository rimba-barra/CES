<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HrdDelimiterEnhancer
 *
 * @author MIS
 */
class Hrd_Models_App_HrdDelimiterEnhancer extends Box_Delien_DelimiterEnhancer {

    public function generate() {
        $dc = $this->getDelimiterCandidate();
        $dcA = $dc->getDCArray();
        if (!is_array($dcA))
            return;
        $tempAr = array();
        $fielAr = array();
        $xtraAr = array();
        $tempDelimiterStr = '';

        $jumlahItem = count($dcA);
        $countRow = 1;
    
        foreach ($dcA as $v) {

            $this->generateFields($v,$countRow,$jumlahItem,$xtraAr);

            if ($v instanceof Box_Kouti_Remora) {
                
                foreach($v->grouped() as $row){
                    
                    $this->generateFields($row,$countRow,$jumlahItem,$xtraAr);
                }
            }
            $countRow++;
        }
        $dc->setDCArray($xtraAr);
    }

    /*@data type void*/
    protected function generateFields($v,$countRow,$jumlahItem,& $xtraAr) {

        $tempAr = array();
        $fielAr = array();
        $tempDelimiterStr = '';
        if ($v instanceof Box_Arried) {
            $tempAr = $v->getArray();

            if (count($fielAr) == 0) {
                $fielAr = array_keys($tempAr);
                foreach ($fielAr as $fav) {
                    if (!key_exists($fav, $xtraAr)) {
                        $xtraAr[$fav] = '';
                    }
                }
            }
            $count = 1;

            foreach ($tempAr as $ku => $vu) {
               
                if ($jumlahItem > 1) {
                    //$tempDelimiterStr = $count<=count($tempAr)?$this->delimiter:"";
                   // $tempDelimiterStr = $countRow < $jumlahItem ? $this->delimiter : "";
                     $tempDelimiterStr = $countRow < $jumlahItem ? $this->delimiter : "";
                } else {
                    $tempDelimiterStr = "";
                }
                
                $xtraAr[$ku] .= $vu . '' . $tempDelimiterStr;
                $count++;
            }
            
        }

    }

}

?>
