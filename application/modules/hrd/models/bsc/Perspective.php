<?php 

class Hrd_Models_Bsc_Perspective extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    public $perspectivecode;
    public $perspectivename;
    public $perspectivedesc;
    public $percentage;
    public $deleted;
   
    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix  = "perspective_";
    }
    
    public function setArrayTable($dataArray = NULL) {
       $x   = $dataArray == NULL ? $this->arrayTable : $dataArray;
       
       $this->setId(isset ($x['perspective_id'])?$x['perspective_id']:0); 
       
       $this->perspectivecode       = isset ($x['code'])? $x['code'] : NULL;
       $this->perspectivename       = isset ($x['perspective'])? $x['perspective'] : NULL;
       $this->perspectivedesc       = isset ($x['description'])? $x['description'] : NULL;
       $this->percentage            = isset ($x['perspectivepercentage_percentage'])? $x['perspectivepercentage_percentage'] : NULL;
       $this->deleted               = isset ($x['deleted'])? $x['deleted'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'perspective_id'                    => $this->getId(),
            'code'                              => $this->perspectivecode,
            'perspective'                       => $this->perspectivename,
            'description'                       => $this->perspectivedesc,
            'perspectivepercentage_percentage'  => $this->percentage,
            'deleted'                           => $this->deleted,
        );
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
	
    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }
}

?>