<?php

/**
 * Description of Header
 *
 * @author MIS
 */
class Hrd_Models_Fingerprint_Header extends Box_Models_ObjectEmbedData implements Box_Delien_DelimiterCandidate{
    private $date;
    private $detail;
    private $DCResult;
    public function __construct() {
        $this->embedPrefix = "headerfingerprint_";
        $this->detail = array();
    }
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['headerfingerprint_id'])){
           $this->setId($x['headerfingerprint_id']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'headerfingerprint_id'=>$this->getId(),
            'date'=>$this->getDate()
        );
      
        return $x;
    }
    
    public function addDetail(Hrd_Models_Fingerprint_FingerPrint $fp){
        $this->detail[] = $fp;
    }
    
    public function getDetail($pos=-1){
        if($pos > -1){
            return $this->detail[$pos];
        }else{
            return $this->detail;
        }
    }
    
    public function existByTempId($tempId){
        $indexFound = -1;
        $count = 0;
        foreach($this->detail as $row){
            
            if($row->getTempId()===$tempId){
                $indexFound = $count;
            }
            $count++;
        }
        return $indexFound;
    }
    
    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }


}

?>
