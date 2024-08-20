<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_SubLedger extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $code;
    private $code1;
    private $code2;
    private $code3;
    private $code4;
    private $description;    
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'subgl_';
    }

    function getCode1() {
        return $this->code1;
    }

    function getCode2() {
        return $this->code2;
    }

    function getCode3() {
        return $this->code3;
    }

    function getCode4() {
        return $this->code4;
    }

    function getDescription() {
        return $this->description;
    }

    function setCode1($code1) {
        $this->code1 = $code1;
    }

    function setCode2($code2) {
        $this->code2 = $code2;
    }

    function setCode3($code3) {
        $this->code3 = $code3;
    }

    function setCode4($code4) {
        $this->code4 = $code4;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function getCode() {
        return $this->code;
    }

    function setCode($code) {
        $this->code = $code;
    }

    
                    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['subgl_id'])){
           $this->setId($x['subgl_id']); 
        }
        if(isset ($x['code1'])){
           $this->setCode1($x['code1']); 
        }
        if(isset ($x['code2'])){
           $this->setCode2($x['code2']); 
        }
        if(isset ($x['code3'])){
           $this->setCode3($x['code3']); 
        }
        if(isset ($x['code4'])){
           $this->setCode4($x['code4']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        

        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
 
       
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "subgl_id"=>$this->getId(),       
            "code1"=>$this->getCode1(),       
            "code2"=>$this->getCode2(),       
            "code3"=>$this->getCode3(),       
            "code4"=>$this->getCode4(),       
            "code"=>$this->getCode(),       
            "description"=>$this->getDescription(),     
           
            
        );
        
        return $x;
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
        return array($this->getProject(),$this->getPt());
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
