<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_ConsolidationDetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    
    private $user;
    private $ptdetail;
    private $projectdetail;
    private $ptname;
    private $projectname;
    private $isused;
    private $percentage;
    private $selected;

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->ptdetail = new Cashier_Box_Models_Master_Pt();
        $this->projectdetail = new Cashier_Box_Models_Master_Project();
        $this->user = new Cashier_Box_Models_Master_User();
        $this->embedPrefix = 'multiprojectdetail_';
    }
   
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['multiprojectdetail_id'])){
           $this->setId($x['multiprojectdetail_id']); 
        }
        if(isset ($x['addon'])){
           $this->setAddOn($x['addon']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtname($x['pt_name']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectname($x['project_name']); 
        }
        if(isset ($x['is_used'])){
           $this->setIsused($x['is_used']); 
        }
        if(isset ($x['pt_id'])){
           $this->getPtdetail()->setId($x['pt_id']); 
        }
        if(isset ($x['project_id'])){
           $this->getProjectdetail()->setId($x['project_id']); 
        }
        if(isset ($x['percentage'])){
           $this->setPercentage($x['percentage']); 
        }
        if(isset ($x['selected'])){
           $this->setSelected($x['selected']); 
        }
       
       
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "multiprojectdetail_id"=>$this->getId(),     
            "addon"=>$this->getAddOn(),
            "pt_name"=>$this->getPtname(),
            "project_name"=>$this->getProjectname(),
            "is_used"=>$this->getIsused(),
            "pt_id"=>$this->getPtdetail()->getId(),
            "project_id"=>$this->getProjectdetail()->getId(),
            "percentage"=>$this->getPercentage(),
            "selected"=>$this->getSelected()            
        );
        
        return $x;
    }
    function getIsused() {
        return $this->isused;
    }

    function setIsused($isused) {
        $this->isused = $isused;
    }

        function getPtname() {
        return $this->ptname;
    }

    function setPtname($ptname) {
        $this->ptname = $ptname;
    }

    function getPtdetail() {
       if (!$this->ptdetail) {
            $this->ptdetail = new Cashier_Box_Models_Master_Pt();
        }
        return $this->ptdetail;
    }

    function getProjectdetail() {
       if (!$this->projectdetail) {
            $this->projectdetail = new Cashier_Box_Models_Master_Project();
        }
        return $this->projectdetail;
    }

    function setPtdetail(Cashier_Box_Models_Master_Pt $ptdetail) {
        $this->ptdetail = $ptdetail;
    }

    function setProjectdetail(Cashier_Box_Models_Master_Project $projectdetail) {
        $this->projectdetail = $projectdetail;
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
    public function getProjectname()
    {
        return $this->projectname;
    }

    /**
     * @param mixed $projectname
     *
     * @return self
     */
    public function setProjectname($projectname)
    {
        $this->projectname = $projectname;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPercentage()
    {
        return $this->percentage;
    }

    /**
     * @param mixed $percentage
     *
     * @return self
     */
    public function setPercentage($percentage)
    {
        $this->percentage = $percentage;

        return $this;
    }

    public function getSelected()
    {
        return $this->selected;
    }

    /**
     * @param mixed $percentage
     *
     * @return self
     */
    public function setSelected($selected)
    {
        $this->selected = $selected;

        return $this;
    }
}

?>
