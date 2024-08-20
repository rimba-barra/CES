<?php


/**
 * Description of Department
 *
 * @author MIS
 */
 // wulan edit
class Hrd_Models_Performancemanagement_Periodeproses extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    public $project_id;
    public $pt_id;
    public $statusperiode_id;
	public $statusperiode;
    public $tahun;
    public $start_periode;
    public $end_periode;
    
    
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session'); // wulan edit
        parent::__construct();
        $this->embedPrefix = "periodeproses_";
    }
    
    /*public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"periodeproses_";
    }*/
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['periodeproses_id'])){
           $this->setId($x['periodeproses_id']); 
        }
        if (isset($x['statusperiode_id'])) {
            $this->statusperiode_id = $x['statusperiode_id'];
        }
        if (isset($x['statusperiode'])) {
            $this->statusperiode = $x['statusperiode'];
        }
		if (isset($x['tahun'])) {
             $this->tahun = $x['tahun'];
        }
        if (isset($x['start_periode'])) {
            $this->start_periode = $x['start_periode'];
        }
        if (isset($x['end_periode'])) {
            $this->end_periode = $x['end_periode'];
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'periodeproses_id'              => $this->getId(),
            'statusperiode_id'                  => $this->statusperiode_id,
            'statusperiode'           => $this->statusperiode,
			'tahun'      => $this->tahun,
            'start_periode'      => $this->start_periode,
            'end_periode'    => $this->end_periode
        );
      
        return $x;
    }
    
	public function getDatefields() {
        return array('start_periode', 'end_periode');
    }
	
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
	
	// wulan edit
    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }
	
	// wulan edit
    public function getPtId() {
        return $this->session->getCurrentPtId();
    }


    
    


}

?>
