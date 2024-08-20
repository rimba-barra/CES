<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Proses
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Cac_Proses extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $cac;
    private $point;
    private $hargaNetto;
    private $hargaJualTotal;
    private $salesPrice;
    private $project;
    private $pt;
    private $periodeStart;
    private $periodeEnd;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "prosescac_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['prosescac_id'])){
           $this->setId($x['prosescac_id']); 
        }
        
        if(isset ($x['cac_cac_id'])){
           $this->getCac()->setId($x['cac_cac_id']); 
        }
        
        if(isset ($x['point'])){
           $this->setPoint($x['point']); 
        }
        if(isset ($x['harga_netto'])){
           $this->setHargaNetto($x['harga_netto']); 
        }
        if(isset ($x['harga_jual_total'])){
           $this->setHargaJualTotal($x['harga_jual_total']); 
        }
        if(isset ($x['sales_price'])){
           $this->setSalesPrice($x['sales_price']); 
        }
     
        if(isset ($x['periode_start'])){
           $this->setPeriodeStart($x['periode_start']); 
        }
        if(isset ($x['periode_end'])){
           $this->setPeriodeEnd($x['periode_end']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'prosescac_id'=>$this->getId(),
            'cac_cac_id'=>$this->getCac()->getId(),
            'point'=>$this->getPoint(),
            'harga_netto'=>$this->getHargaNetto(),
            'harga_jual_total'=>$this->getHargaJualTotal(),
            'sales_price'=>$this->getSalesPrice(),
          
            'periode_start'=>$this->getPeriodeStart(),
            'periode_end'=>$this->getPeriodeEnd()
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
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

    public function grouped() {
        return array();
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getCac() {
        if(!$this->cac){
            $this->cac = new Erems_Models_Master_CAC();
        }
        return $this->cac;
    }

    public function getPoint() {
        return $this->point;
    }

    public function getHargaNetto() {
        return $this->hargaNetto;
    }

    public function getHargaJualTotal() {
        return $this->hargaJualTotal;
    }

    public function getSalesPrice() {
        return $this->salesPrice;
    }

    public function setCac(Erems_Models_Master_CAC $cac) {
        $this->cac = $cac;
    }

    public function setPoint($point) {
        $this->point = $point;
    }

    public function setHargaNetto($hargaNetto) {
        $this->hargaNetto = $hargaNetto;
    }

    public function setHargaJualTotal($hargaJualTotal) {
        $this->hargaJualTotal = $hargaJualTotal;
    }

    public function setSalesPrice($salesPrice) {
        $this->salesPrice = $salesPrice;
    }
    
   
    
    public function getDatefields() {
        return array("periode_start","periode_end");
     
    }
    
    public function getPeriodeStart() {
        return $this->periodeStart;
    }

    public function getPeriodeEnd() {
        return $this->periodeEnd;
    }

    public function setPeriodeStart($periodeStart) {
        $this->periodeStart = $periodeStart;
    }

    public function setPeriodeEnd($periodeEnd) {
        $this->periodeEnd = $periodeEnd;
    }







}
