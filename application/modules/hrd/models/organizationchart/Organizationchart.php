<?php


/**
 * Description of Organizationchart
 *
 * @author MIS
 */
class Hrd_Models_Organizationchart_Organizationchart extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    private $organizationchart_id;
    private $project_id;
    private $project;
    private $pt_id;
    private $pt;
        
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"organizationchart_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['organizationchart_id'])){
           $this->setId($x['organizationchart_id']); 
        }
        if(isset ($x['project_id'])){
           $this->setProject_id($x['project_id']); 
        }
        if(isset ($x['project'])){
           $this->setProject($x['project']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPt_id($x['pt_id']); 
        }
        if(isset ($x['pt'])){
           $this->setPt($x['pt']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'organizationchart_id'=>$this->getId(),
            'project'=>$this->getProject(),
            'project_id'=>$this->getProject_id(),
            'pt'=>$this->getPt(),
            'pt_id'=>$this->getPt_id()
        );
      
        return $x;
    }
    
    public function getOrganizationchart_id() {
        return $this->organizationchart_id;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function getProject() {
        return $this->project;
    }

    public function getPt_id() {
        return $this->pt_id;
    }
    
    public function getPt() {
        return $this->pt;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    public function setProject($project) {
        $this->project = $project;
    }

    public function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }
    
    public function setPt($pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
//
//    function readData($param=array())
//    {
//            $return['success'] = false;
//            if (is_array($param) && count($param))
//            {
//                    try {
//                            $resultdata = $this->execSP('sp_organizationchartdetail_read', $param['id']);
//                            $return['total'] = 3;//$resultdata[0]['RECORD_TOTAL'];
//                            $return['data'] = $resultdata;			
//                            $return['success'] = true;
//                    } catch(Exception $e) { }
//            }		
//            return $return;
//    }
//    
    


}

?>
