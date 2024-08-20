<?php 
class Cashier_Box_Models_Master_Projectpt extends Cashier_Box_Models_ObjectEmbedData {
    private $project_id;
    private $pt_id;
    private $projectpt_id;
    private $projectname;
    private $project_subholding_id;
    private $projectcode;
    private $ptname;
    private $ptcode;
    private $pt_name;

    function __construct()
    {
        parent::__construct();
        $this->embedPrefix = "projectpt_";
    }

    public function getProject_id()
    {
        return $this->project_id;
    }

    public function setProject_id($project_id)
    {
        $this->project_id = $project_id;
    }

    public function getPt_id()
    {
        return $this->pt_id;
    }

    public function setPt_id($pt_id)
    {
        $this->pt_id = $pt_id;
    }

    public function getProjectpt_id()
    {
        return $this->projectpt_id;
    }

    public function setProjectpt_id($projectpt_id)
    {
        $this->projectpt_id = $projectpt_id;
    }

    public function getProjectname()
    {
        return $this->projectname;
    }

    public function setProjectname($projectname)
    {
        $this->projectname = $projectname;
    }

    public function getProject_subholding_id()
    {
        return $this->project_subholding_id;
    }

    public function setProject_subholding_id($project_subholding_id)
    {
        $this->project_subholding_id = $project_subholding_id;
    }

    public function getProjectcode()
    {
        return $this->projectcode;
    }

    public function setProjectcode($projectcode)
    {
        $this->projectcode = $projectcode;
    }

    public function getPtname()
    {
        return $this->ptname;
    }

    public function setPtname($ptname)
    {
        $this->ptname = $ptname;
    }

    public function getPtcode()
    {
        return $this->ptcode;
    }

    public function setPtcode($ptcode)
    {
        $this->ptcode = $ptcode;
    }

    public function getPt_name()
    {
        return $this->pt_name;
    }

    public function setPt_name($pt_name)
    {
        $this->pt_name = $pt_name;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['project_id'])){
           $this->setProject_id($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPt_id($x['pt_id']); 
        }
        if(isset ($x['projectpt_id'])){
           $this->setProjectpt_id($x['projectpt_id']); 
        }
        if(isset ($x['projectname'])){
           $this->setProjectname($x['projectname']); 
        }
        if(isset ($x['project_subholding_id'])){
            $this->setProject_subholding_id($x['project_subholding_id']);
        }
        if(isset ($x['projectcode'])){
            $this->setProjectcode($x['projectcode']);
        }
        if(isset ($x['ptname'])){
            $this->setPtname($x['ptname']);
        }
        if(isset ($x['ptcode'])){
            $this->setPtcode($x['ptcode']);
        }
        if(isset ($x['pt_name'])){
            $this->setPt_name($x['pt_name']);
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'project_id'=>$this->getProject_id(),            
            'pt_id'=>$this->getPt_id(),            
            'projectpt_id'=>$this->getProjectpt_id(),            
            'projectname'=>$this->getProjectname(),            
            'project_subholding_id'=>$this->getProject_subholding_id(),            
            'projectcode'=>$this->getProjectcode(),            
            'ptname'=>$this->getPtname(),            
            'ptcode'=>$this->getPtcode(),            
            'pt_name'=>$this->getPt_name(),            
        );
        
        return $x;
    }
}
?>