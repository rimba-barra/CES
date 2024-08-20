<?php

/**
 * Description of AbstractEnhancer
 *
 * @author MIS
 */
class Gl_Models_App_DelimiterCreator implements Gl_Box_Delien_DelimiterCandidate{
    
    private $members;
    private $dcResult;
    
    public function __construct() {
        $this->members = array();
    }
    
    public function add($member){
        $this->members[] = $member;
    }
    
    public function remove($index){
        unset($this->members[$index]);
    }
    
    public function getMembers(){
        return $this->members;
    }
    
    public function getMember($pos){
        return $this->members[$pos];
    }
    
    public function getDCArray() {
        return $this->members;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }    
}

?>
