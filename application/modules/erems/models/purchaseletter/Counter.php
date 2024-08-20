<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Counter
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_Counter extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $project;
    private $pt;
    private $cluster;
    private $year;
    private $nextNumber;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();

         $this->embedPrefix = $embedPrefix==NULL?'purchasecounter_':$embedPrefix;
    
    }
    
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['purchasecounter_id'])){
          $this->setId($x['purchasecounter_id']);
        }
        if(isset ($x['cluster_cluster_id'])){
          $this->getCluster()->setId($x['cluster_cluster_id']);
        }
        if(isset ($x['year'])){
          $this->setYear($x['year']);
        }
        if(isset ($x['next_number'])){
          $this->setNextNumber($x['next_number']);
        }
        
        unset($x);
        
   
        
    }
    
    public function getArrayTable(){
        $x = array(
            "purchasecounter_id"=>$this->getId(),
            "cluster_cluster_id"=>$this->getCluster()->getId(),
            "year"=>$this->getYear(),
            "next_number"=>$this->getNextNumber()
        );
      
        
        return $x;
    }
    
    

    public function getCluster() {
        if(!$this->cluster){
            $this->cluster = new Erems_Models_Master_ClusterTran();
        }
        return $this->cluster;
    }

    public function getYear() {
        return $this->year;
    }

    public function getNextNumber() {
        return $this->nextNumber;
    }

    

    public function setCluster(Erems_Models_Master_ClusterTran $cluster) {
        $this->cluster = $cluster;
    }

    public function setYear($year) {
        $this->year = $year;
    }

    public function setNextNumber($nextNumber) {
        $this->nextNumber = $nextNumber;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project(); 
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    
        
    public function fillData($data) {
     $this->setArrayTable($data);   
    }

    public function grouped() {
        return array();
    }

//put your code here
}
