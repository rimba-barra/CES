<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SMS
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Verification_Verification extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $purchaseletter;
    private $unit;
    private $date;
    private $number;
    private $note;
    private $submitBy;
    private $approveBy;
    private $isApprove;
    private $diskonHargaDasarJenis;
    private $diskonHargaDasarNilai;
    private $diskonHargaTanahJenis;
    private $diskonHargaTanahNilai;
    private $diskonHargaBangunanJenis;
    private $diskonHargaBangunanNilai;
    private $approveDate;
    
    

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "verification_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['verification_id'])){
           $this->setId($x['verification_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
       
        if(isset ($x['verification_date'])){
           $this->setDate($x['verification_date']); 
        }
        if(isset ($x['verification_number'])){
           $this->setNumber($x['verification_number']); 
        }
        if(isset ($x['verification_note'])){
           $this->setNote($x['verification_note']); 
        }
        if(isset ($x['submitted_by'])){
           $this->setSubmitBy($x['submitted_by']); 
        }
        if(isset ($x['approved_by'])){
           $this->setApproveBy($x['approved_by']); 
        }
        if(isset ($x['is_approve'])){
           $this->setIsApprove($x['is_approve']); 
        }
        if(isset ($x['diskonhargadasar_jenis'])){
           $this->setDiskonHargaDasarJenis($x['diskonhargadasar_jenis']); 
        }
        if(isset ($x['diskonhargadasar_nilai'])){
           $this->setDiskonHargaDasarNilai($x['diskonhargadasar_nilai']); 
        }
        if(isset ($x['diskonhargatanah_jenis'])){
           $this->setDiskonHargaTanahJenis($x['diskonhargatanah_jenis']); 
        }
        if(isset ($x['diskonhargatanah_nilai'])){
           $this->setDiskonHargaTanahNilai($x['diskonhargatanah_nilai']); 
        }
        if(isset ($x['diskonhargabangunan_jenis'])){
           $this->setDiskonHargaBangunanJenis($x['diskonhargabangunan_jenis']); 
        }
        if(isset ($x['diskonhargabangunan_nilai'])){
           $this->setDiskonHargaBangunanNilai($x['diskonhargabangunan_nilai']); 
        }
        if(isset ($x['approve_date'])){
           $this->setApproveDate($x['approve_date']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'verification_id'=>$this->getId(),
            'unit_unit_id'=>$this->getUnit()->getId(),
            'verification_date'=>$this->getDate(),
            'verification_number'=>$this->getNumber(),
            'verification_note'=>$this->getNote(),
            'submitted_by'=>$this->getSubmitBy(),
            'approved_by'=>$this->getApproveBy(),
            'is_approve'=>$this->getIsApprove(),
            'diskonhargadasar_jenis'=>$this->getDiskonHargaDasarJenis(),
            'diskonhargadasar_nilai'=>$this->getDiskonHargaDasarNilai(),
            'diskonhargatanah_jenis'=>$this->getDiskonHargaTanahJenis(),
            'diskonhargatanah_nilai'=>$this->getDiskonHargaTanahNilai(),
            'diskonhargabangunan_jenis'=>$this->getDiskonHargaBangunanJenis(),
            'diskonhargabangunan_nilai'=>$this->getDiskonHargaBangunanNilai(),
            'approve_date'=>$this->getApproveDate()
        );
        
        return $x;
    }
    
     

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new \Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new \Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function grouped() {
        return array($this->getPurchaseletter());
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function getDate() {
        return $this->date;
    }

    public function getNumber() {
        return $this->number;
    }

    public function getNote() {
        return $this->note;
    }

    public function getSubmitBy() {
        return $this->submitBy;
    }

    public function getApproveBy() {
        return $this->approveBy;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    public function setSubmitBy($submitBy) {
        $this->submitBy = $submitBy;
    }

    public function setApproveBy($approveBy) {
        $this->approveBy = $approveBy;
    }
    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }
    
    public function getIsApprove() {
        return $this->isApprove;
    }

    public function setIsApprove($isApprove) {
        $this->isApprove = $isApprove;
    }
    
    public function getDiskonHargaDasarJenis() {
        return $this->diskonHargaDasarJenis;
    }

    public function getDiskonHargaDasarNilai() {
        return $this->diskonHargaDasarNilai;
    }

    public function getDiskonHargaTanahJenis() {
        return $this->diskonHargaTanahJenis;
    }

    public function getDiskonHargaTanahNilai() {
        return $this->diskonHargaTanahNilai;
    }

    public function getDiskonHargaBangunanJenis() {
        return $this->diskonHargaBangunanJenis;
    }

    public function getDiskonHargaBangunanNilai() {
        return $this->diskonHargaBangunanNilai;
    }

    public function setDiskonHargaDasarJenis($diskonHargaDasarJenis) {
        $this->diskonHargaDasarJenis = $diskonHargaDasarJenis;
    }

    public function setDiskonHargaDasarNilai($diskonHargaDasarNilai) {
        $this->diskonHargaDasarNilai = $diskonHargaDasarNilai;
    }

    public function setDiskonHargaTanahJenis($diskonHargaTanahJenis) {
        $this->diskonHargaTanahJenis = $diskonHargaTanahJenis;
    }

    public function setDiskonHargaTanahNilai($diskonHargaTanahNilai) {
        $this->diskonHargaTanahNilai = $diskonHargaTanahNilai;
    }

    public function setDiskonHargaBangunanJenis($diskonHargaBangunanJenis) {
        $this->diskonHargaBangunanJenis = $diskonHargaBangunanJenis;
    }

    public function setDiskonHargaBangunanNilai($diskonHargaBangunanNilai) {
        $this->diskonHargaBangunanNilai = $diskonHargaBangunanNilai;
    }
    
    function getApproveDate() {
        return $this->approveDate;
    }

    function setApproveDate($approveDate) {
        $this->approveDate = $approveDate;
    }

    
    
        
    protected function getDatefields() {
        return array("verification_date");
    }





    
    

}
