<?php 

class Hrd_Models_Bsc_PerspectivePercentageDetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

	//public $perspective_percentage_detail_id;
	public $perspective_percentage_id;
	public $perspective_id;
	public $percentage;
	public $deleted;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix  = "perspectivepercentage_";
        $this->detail       = array();
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x   = $dataArray == NULL ? $this->arrayTable : $dataArray;

        $this->setId(isset ($x['perspective_percentage_detail_id']) ? $x['perspective_percentage_detail_id'] : 0); 
        $this->perspective_percentage_id             = isset($x['perspective_percentage_id']) ? $x['perspective_percentage_id'] : 0;
		$this->perspective_id             = isset($x['perspective_perspective_id']) ? $x['perspective_perspective_id'] : 0;
		$this->percentage             = isset($x['percentage']) ? $x['percentage'] : 0;
        $this->deleted             = isset($x['deleted']) ? $x['deleted'] : 0;

        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'perspective_percentage_detail_id'  => $this->getId(),
            'perspective_percentage_id'         => $this->perspective_percentage_id,
            'perspective_perspective_id'                        => $this->perspective_id,
            'percentage'                      => $this->percentage,
			'deleted'                      => $this->deleted
        );
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail($perspectivepercentage) {
        $this->detail[] = $perspectivepercentage;
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
    
    public function getDetail($index = -1){
        if ($index >= 0) {
            return $this->detail[$index];
        }else{
            return $this->detail;
        }
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function getDatefields() {
        return array();
    }
}

?>