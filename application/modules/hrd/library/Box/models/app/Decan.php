<?php

/**
 * Description of Decan
 *
 * @author Tommy Toban 
 * class Decan 
 * Decan = Delimiter candidate instant 
 * @param array $member (simple array)
 */
class Box_Models_App_Decan implements Box_Delien_DelimiterCandidate {

    protected $detail;
    protected $DCResult;
    protected $key;

    public function __construct($member) {
        $this->detail = array();
        $this->key = "key";
        foreach ($member as $k => $v) {
            $v = (int)$v;
          
            if ($v> 0) {
                $a = array();
                $a[$this->key] = $v;
                $this->detail[] = new Box_Models_App_DecanMember($a);
            }
        }
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

//put your code here

    public function getKey() {
        return $this->key;
    }

    public function setKey($key) {
        $this->key = $key;
    }
    
    public function getString(){
        $x = $this->getDCResult();
        $hasil = "";
        if(count($x) > 0){
            $hasil  = $x[$this->getKey()];
        }
        return $hasil;
    }

}

?>
