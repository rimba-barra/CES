<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BuktiPemilik
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_BuktiPemilik extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $unit;
    private $number;
    private $date;
    private $buyDate;
    private $legalDate;
    private $pbIndukId;
    private $nop;
    private $note;

    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "buktipemilik_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['buktipemilik_id'])){
           $this->setId($x['buktipemilik_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        if(isset ($x['imb_no'])){
           $this->setNumber($x['imb_no']); 
        }
        if(isset ($x['imb_date'])){
           $this->setDate($x['imb_date']); 
        }
        if(isset ($x['imb_buy_date'])){
           $this->setBuyDate($x['imb_buy_date']); 
        }
        if(isset ($x['imb_legal_date'])){
           $this->setLegalDate($x['imb_legal_date']); 
        }
        if(isset ($x['pbinduk_id'])){
           $this->setPbIndukId($x['pbinduk_id']); 
        }
        if(isset ($x['nop'])){
           $this->setNop($x['nop']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        
        
        
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'buktipemilik_id'=>$this->getId(),
            'unit_unit_id'=>$this->getUnit()->getId(),
            'imb_no'=>$this->getNumber(),
            'imb_date'=>$this->getDate(),
            'imb_buy_date'=>$this->getBuyDate(),
            'imb_legal_date'=>$this->getLegalDate(),
            'pbinduk_id'=>$this->getPbIndukId(),
            'nop'=>$this->getNop(),
            'note'=>$this->getNote(),
            
           
        );
        
        return $x;
    }
    
    protected function getDatefields() {
        return array("imb_date","imb_legal_date");
    }

    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function getNumber() {
        return $this->number;
    }

    public function getDate() {
        return $this->date;
    }

    public function getBuyDate() {
        return $this->buyDate;
    }

    public function getLegalDate() {
        return $this->legalDate;
    }

    public function getPbIndukId() {
        return $this->pbIndukId;
    }

    public function getNop() {
        return $this->nop;
    }

    public function getNote() {
        return $this->note;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setBuyDate($buyDate) {
        $this->buyDate = $buyDate;
    }

    public function setLegalDate($legalDate) {
        $this->legalDate = $legalDate;
    }

    public function setPbIndukId($pbIndukId) {
        $this->pbIndukId = $pbIndukId;
    }

    public function setNop($nop) {
        $this->nop = $nop;
    }

    public function setNote($note) {
        $this->note = $note;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
