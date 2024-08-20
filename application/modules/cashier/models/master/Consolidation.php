<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Consolidation extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    
    private $user;
    private $consolidationid;
    private $groupconsolidation;
    private $pt_pt_idref;
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->user = new Cashier_Box_Models_Master_User();
        $this->embedPrefix = 'multiproject_';
    }
          
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['multiproject_id'])){
           $this->setId($x['multiproject_id']); 
        }
        if(isset ($x['consolidation_id'])){
           $this->setConsolidationid($x['consolidation_id']); 
        }
        if(isset ($x['group_consolidation'])){
           $this->setGroupconsolidation($x['group_consolidation']); 
        }
        if(isset ($x['addon'])){
           $this->setAddOn($x['addon']); 
        }
        if(isset ($x['pt_pt_idref'])){
           $this->setPtIdref($x['pt_pt_idref']); 
        }
       
       
        unset($x);
        
    }
    
    public function getArrayTable() {

        $x = array(
            "multiproject_id"=>$this->getId(),     
            "addon"=>$this->getAddOn(),
            "group_consolidation"=>$this->getGroupconsolidation(),
            "consolidation_id"=>$this->getConsolidationid(),
            "pt_pt_idref"=>$this->getPtIdref()
        );
        
        return $x;
    }
    

    function getUser() {
        return $this->user;
    }

    function setUser(Cashier_Box_Models_Master_User $user) {
        $this->user = $user;
    }

        
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
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




    /**
     * @return mixed
     */
    public function getConsolidationid()
    {
        return $this->consolidationid;
    }

    /**
     * @param mixed $consolidationid
     *
     * @return self
     */
    public function setConsolidationid($consolidationid)
    {
        $this->consolidationid = $consolidationid;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getGroupconsolidation()
    {
        return $this->groupconsolidation;
    }

    /**
     * @param mixed $groupconsolidation
     *
     * @return self
     */
    public function setGroupconsolidation($groupconsolidation)
    {
        $this->groupconsolidation = $groupconsolidation;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPtIdref()
    {
        return $this->pt_pt_idref;
    }

    /**
     * @param mixed $pt_pt_idref
     *
     * @return self
     */
    public function setPtIdref($pt_pt_idref)
    {
        $this->pt_pt_idref = $pt_pt_idref;

        return $this;
    }
}

?>
