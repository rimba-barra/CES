<?php

/**
 * Description of Pt
 *
 * @author MIS
 */
class Cashier_Box_Models_Master_Pt extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $projectptid;
    private $projectid;
    private $subholdingid;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "pt_";
    }
    
    public function getCode() {
        return $this->code;
    }
    
    function getProjectid() {
        return $this->projectid;
    }

    function setProjectid($projectid) {
        $this->projectid = $projectid;
    }

        function getProjectptid() {
        return $this->projectptid;
    }

    function setProjectptid($projectptid) {
        $this->projectptid = $projectptid;
    }

        public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['pt_id'])){
           $this->setId($x['pt_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['pt_projectpt_id'])){
           $this->setProjectptid($x['pt_projectpt_id']); 
        }
        if(isset ($x['project_project_id'])){
           $this->setProjectid($x['project_project_id']); 
        }
        if(isset ($x['subholding_id'])){
            $this->setSubholdingid($x['subholding_id']); 
         }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'pt_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name'=>$this->getName(),
            'pt_projectpt_id'=>$this->getProjectptid(),
            'project_project_id'=>$this->getProjectid(),
            'subholding_id'=>$this->getSubholdingid(),
            
        );
        
        return $x;
    }



    /**
     * Get the value of subholdingid
     */ 
    public function getSubholdingid()
    {
        return $this->subholdingid;
    }

    /**
     * Set the value of subholdingid
     *
     * @return  self
     */ 
    public function setSubholdingid($subholdingid)
    {
        $this->subholdingid = $subholdingid;

        return $this;
    }
}

?>
