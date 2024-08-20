<?php

/**
 * Description of Header
 *
 * @author MIS
 */
class Erems_Models_Unit_Header implements Erems_Box_Delien_DelimiterCandidate {
    
    private $dcResult;
    private $detail;
    
    
    public function __construct() {
        $this->detail = array();
    }
    
    public function addDetail(Erems_Models_Unit_UnitTran $unit){
        $this->detail[] = $unit;
    }
    
    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }   
}

?>
