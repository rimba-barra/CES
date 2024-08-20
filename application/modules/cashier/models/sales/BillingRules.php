<?php

/**
 * Description of BillingRule
 *
 * @author tommytoban
 */
class Cashier_Models_Sales_BillingRules extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Models_Master_InterProjectPt{
    private $code;
    private $description;
    private $pt;
    private $project;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'billingrules_';
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getPt() {
        if(!$this->pt){
            $this->pt = new Cashier_Box_Models_Master_Pt();        }
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Cashier_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

        
    public function setArrayTable($dataArray=NULL) {

        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['billingrules_id'])){
          $this->setId($x['billingrules_id']);
        }
        if(isset ($x['code'])){
          $this->setCode($x['code']);
        }
        if(isset ($x['description'])){
          $this->setDescription($x['description']);
        }
       
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'billingrules_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription()
        );
        return $x;
    }


}
