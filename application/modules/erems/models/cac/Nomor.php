<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Nomor
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Cac_Nomor extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $prosesCacDetail;
    private $nomor;
    private $cac;
    private $purchaseletter;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "prosescacnomor_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['prosescacnomor_id'])){
           $this->setId($x['prosescacnomor_id']); 
        }
        
        if(isset ($x['prosescacdetail_prosescacdetail_id'])){
           $this->getProsesCacDetail()->setId($x['prosescacdetail_prosescacdetail_id']); 
        }
        
        if(isset ($x['nomor'])){
           $this->setNomor($x['nomor']); 
        }
        
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        
        if(isset ($x['cac_cac_id'])){
           $this->getCac()->setId($x['cac_cac_id']); 
        }
       
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'prosescacdetail_id'=>$this->getId(),
            'prosescacdetail_prosescacdetail_id'=>$this->getProsesCacDetail()->getId(),
            'nomor'=>$this->getNomor(),
            "purchaseletter_purchaseletter_id"=>$this->getPurchaseletter()->getId(),
            "cac_cac_id"=>$this->getCac()->getId()
            
        );
        
        return $x;
    }
    
    public function getProsesCacDetail() {
        if(!$this->prosesCacDetail){
            $this->prosesCacDetail = new Erems_Models_Cac_Detail();
        }
        return $this->prosesCacDetail;
    }

    public function getNomor() {
        return $this->nomor;
    }

    public function setProsesCacDetail(Erems_Models_Cac_Detail $prosesCacDetail) {
        $this->prosesCacDetail = $prosesCacDetail;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }
    
    public function getCac() {
        if(!$this->cac){
            $this->cac = new Erems_Models_Master_CAC();
        }
        return $this->cac;
    }

    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function setCac(Erems_Models_Master_CAC $cac) {
        $this->cac = $cac;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

//put your code here
}
