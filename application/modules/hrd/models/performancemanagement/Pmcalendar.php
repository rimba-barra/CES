<?php


/**
 * Description of Department
 *
 * @author MIS
 */
 // wulan edit
class Hrd_Models_Performancemanagement_Pmcalendar extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    public $project_id;
    public $pt_id;
    public $pm_calendar_type_id;
    public $caption;
    public $start_date;
    public $end_date;
    
    
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "pmcalendar_";
    }
        
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['pm_calendar_id'])){
           $this->setId($x['pm_calendar_id']); 
        }
        if (isset($x['pm_calendar_type_id'])) {
            $this->pm_calendar_type_id = $x['pm_calendar_type_id'];
        }
        if (isset($x['caption'])) {
            $this->caption = $x['caption'];
        }
        
        if (isset($x['start_date'])) {
            $this->start_date = $x['start_date'];
        }
        if (isset($x['end_date'])) {
            $this->end_date = $x['end_date'];
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'pm_calendar_id' => $this->getId(),
            'pm_calendar_type_id' => $this->pm_calendar_type_id,
            'caption' => $this->caption,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date
        );
      
        return $x;
    }
    
    public function getDatefields() {
        return array('start_date', 'end_date');
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
