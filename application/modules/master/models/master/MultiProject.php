<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Master_Models_Master_MultiProject extends Master_Box_Models_ObjectEmbedData implements Master_Box_Kouti_Remora,  Master_Box_Models_Master_InterProjectPt,Master_Box_Delien_DelimiterCandidate {
    
    
    private $user;
    
   public function __construct() {
        parent::__construct();
        $this->project = new Master_Box_Models_Master_Project();
        $this->pt = new Master_Box_Models_Master_Pt();
        $this->user = new Master_Box_Models_Master_User();
        $this->embedPrefix = 'multiproject_';
    }

 

    
                    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['multiproject_id'])){
           $this->setId($x['multiproject_id']); 
        }
        if(isset ($x['addon'])){
           $this->setAddOn($x['addon']); 
        }
       
       
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "multiproject_id"=>$this->getId(),     
            "addon"=>$this->getAddOn(),
            
        );
        
        return $x;
    }
    

    function getUser() {
        return $this->user;
    }

    function setUser(Master_Box_Models_Master_User $user) {
        $this->user = $user;
    }

        
    public function getProject() {
        return $this->project;
    }

    public function setProject(Master_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Master_Box_Models_Master_Project $project, Master_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Master_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getUser());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }



}

?>
