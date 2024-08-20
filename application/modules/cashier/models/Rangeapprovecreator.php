<?php
/**
 * Description of PaymentType
 *
 * @author MIS
 */
class Cashier_Models_Rangeapprovecreator extends Cashier_Box_Models_ObjectEmbedData {
    private $rangeApproveId;
    private $range;
    private $fromamount;
    private $untilamount;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'rangeapprove_';
    }
    
    function getRangeApproveId() {
        return $this->rangeApproveId;
    }

    function getRange() {
        return $this->range;
    }

    function getFromamount() {
        return $this->fromamount;
    }

    function getUntilamount() {
        return $this->untilamount;
    }

    function setRangeApproveId($rangeApproveId) {
        $this->rangeApproveId = $rangeApproveId;
    }

    function setRange($range) {
        $this->range = $range;
    }

    function setFromamount($fromamount) {
        $this->fromamount = $fromamount;
    }

    function setUntilamount($untilamount) {
        $this->untilamount = $untilamount;
    }

        
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
      
        if(isset ($x['rangeapprove_id'])){
           $this->setRangeApproveId($x['rangeapprove_id']); 
        }
        if(isset ($x['range'])){
           $this->setRange($x['range']); 
        }
        if(isset ($x['fromamount'])){
           $this->setFromamount($x['fromamount']); 
        }
        if(isset ($x['untilamount'])){
           $this->setUntilamount($x['untilamount']); 
        }
        unset($x);
        
    }
    
    
    public function getArrayTable(){
        $x = array();
        $x['rangeapprove_id'] = $this->getRangeApproveId();
        $x['range']  = $this->getRange();
        $x['fromamount'] = $this->getFromamount();
        $x['untilamount'] = $this->getUntilamount();
        return $x;
    }

    

}

?>
