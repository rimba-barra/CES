<?php 

class Hrd_Models_Bsc_PerspectivePercentage extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
/*  HEADER */
    public $projectId;
    public $projectName;
    public $ptId;
    public $ptName;
    public $departmentId;
    public $departmentName;
    public $headerId;
    public $yearPeriod;
    public $periodStart;
    public $periodEnd;
    public $description;
/*  DETAIL */
    private $detail;
    private $DCResult;
    public $perspectiveId;
    public $perspectiveCode;
    public $perspectiveName;
    public $percentValue;

    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix  = "perspectivepercentage_";
        $this->detail       = array();
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x   = $dataArray == NULL ? $this->arrayTable : $dataArray;

        $this->setId(isset ($x['perspective_percentage_detail_id']) ? $x['perspective_percentage_detail_id'] : 0); 
        $this->headerId             = isset($x['perspective_percentage_id']) ? $x['perspective_percentage_id'] : 0;
        $this->projectId            = isset($x['project_id']) ? $x['project_id'] : 0;
        $this->projectName          = isset($x['project_name']) ? $x['project_name'] : NULL;
        $this->ptId                 = isset($x['pt_id']) ? $x['pt_id'] : 0;
        $this->ptName               = isset($x['pt_name']) ? $x['pt_name'] : NULL;
        $this->departmentId         = isset($x['department_id']) ? $x['department_id'] : 0;
        $this->departmentName       = isset($x['department_name']) ? $x['department_name'] : NULL;
        $this->perspectiveId        = isset($x['perspective_id']) ? $x['perspective_id'] : 0;
        $this->perspectiveCode      = isset($x['code']) ? $x['code'] : '';
        $this->perspectiveName      = isset($x['perspective']) ? $x['perspective'] : '';
        $this->percentValue         = isset($x['perspectivepercentage_percentage']) ? $x['perspectivepercentage_percentage'] : 0;
        $this->yearPeriod           = isset($x['year_periode']) ? $x['year_periode'] : NULL;
        $this->periodStart          = isset($x['periode_start']) ? $x['periode_start'] : NULL;
        $this->periodEnd            = isset($x['periode_end']) ? $x['periode_end'] : NULL;
		$this->description            = isset($x['description']) ? $x['description'] : NULL;

        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'perspective_percentage_detail_id'  => $this->getId(),
            'perspective_percentage_id'         => $this->headerId,
            'project_id'                        => $this->projectId,
            'project_name'                      => $this->projectName,
            'pt_id'                             => $this->ptId,
            'pt_name'                           => $this->ptName,
            'department_id'                     => $this->departmentId,
            'department_name'                   => $this->departmentName,
            'perspective_id'                    => $this->perspectiveId,
            'code'                              => $this->perspectiveCode,
            'perspective'                       => $this->perspectiveName,
            'perspectivepercentage_percentage'  => $this->percentValue,
            'year_periode'                      => $this->yearPeriod,
            'periode_start'                     => $this->periodStart,
            'periode_end'                       => $this->periodEnd,
			'description'                       => $this->description
        );
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail(Hrd_Models_Bsc_PerspectivePercentageDetail $perspectivepercentage) {
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
        return array('periode_start', 'periode_end');
    }
}

?>