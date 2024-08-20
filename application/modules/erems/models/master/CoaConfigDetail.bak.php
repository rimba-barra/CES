<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Erems_Models_Master_CoaConfigDetails extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Arried {
    private $coaconfigId;
    private $decription;
    private $dcResult;
    private $Code;
    private $persen;


    
   public function __construct() {
        parent::__construct();
        $this->detail = array();
        $this->embedPrefix = 'coaconfigdetail_';
    }
   
    function getCoaconfigId() {
        return $this->coaconfigId;
    }

    function getDecription() {
        return $this->decription;
    }

    function getCode() {
        return $this->Code;
    }

    function setCoaconfigId($coaconfigId) {
        $this->coaconfigId = $coaconfigId;
    }

    function setDecription($decription) {
        $this->decription = $decription;
    }

    function setCode($Code) {
        $this->Code = $Code;
    }

    function getPersen() {
        return $this->persen;
    }

    function setPersen($persen) {
        $this->persen = $persen;
    }

        
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['description'])){
           $this->setDecription($x['description']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['coa_config_id'])){
           $this->setCoaconfigId($x['coa_config_id']); 
        }
        if(isset ($x['coa_config_detail_id'])){
           $this->setId($x['coa_config_detail_id']); 
        }   
        if(isset ($x['persen'])){
           $this->setPersen($x['persen']); 
        }   
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "description"=>$this->getDecription(),
            "code"=>$this->getCode(),
            "coa_config_id"=>$this->getCoaconfigId(),
            "coa_config_detail_id"=>$this->getId(),
            "persen"=>$this->getPersen(),
        );
        
        return $x;
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

    public function getArray() {
        return $this->getArrayTable();
    }

}

?>
