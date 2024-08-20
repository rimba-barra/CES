<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Detail
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Cac_Detail extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $prosesCac;
    private $purchaseletter;
    private $cac;
    private $point;
    private $prosesDate;
   
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "prosescacdetail_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['prosescacdetail_id'])){
           $this->setId($x['prosescacdetail_id']); 
        }
        
        if(isset ($x['prosescac_prosescac_id'])){
           $this->getProsesCac()->setId($x['prosescac_prosescac_id']); 
        }
        
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        if(isset ($x['point'])){
           $this->setPoint($x['point']); 
        }
        if(isset ($x['cac_cac_id'])){
           $this->getCac()->setId($x['cac_cac_id']); 
        }
        if(isset ($x['proses_date'])){
           $this->setProsesDate($x['proses_date']); 
        }
       
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'prosescacdetail_id'=>$this->getId(),
            'prosescac_prosescac_id'=>$this->getProsesCac()->getId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'point'=>$this->getPoint(),
            'cac_cac_id'=>$this->getCac()->getId(),
            'proses_date'=>$this->getProsesDate()
        );
        
        return $x;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    public function getProsesCac() {
        if(!$this->prosesCac){
            $this->prosesCac = new Erems_Models_Cac_Proses();
        }
        return $this->prosesCac;
    }

    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function getPoint() {
        return $this->point;
    }

    public function setProsesCac(Erems_Models_Cac_Proses $prosesCac) {
      
        $this->prosesCac = $prosesCac;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setPoint($point) {
        $this->point = $point;
    }
    
    public function getCac() {
        if(!$this->cac){
            $this->cac = new Erems_Models_Master_CAC();
        }
        return $this->cac;
    }

    public function setCac(Erems_Models_Master_CAC $cac) {
        $this->cac = $cac;
    }
    
    public function getProsesDate() {
        return $this->prosesDate;
    }

    public function setProsesDate($prosesDate) {
        $this->prosesDate = $prosesDate;
    }







}
