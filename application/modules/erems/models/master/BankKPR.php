<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BankKPR
 *
 * @author MIS
 */
class Erems_Models_Master_BankKPR extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $bank;
    private $name;
    private $plafon1;
    private $plafon2;
    private $plafon3;
    private $plafon4;
    private $plafon5;
    private $plafon6;
    private $plafon7;
    private $plafon8;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "bankkpr_";
       
    
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['bankkpr_id'])){
           $this->setId($x['bankkpr_id']); 
        }
        if(isset ($x['bank_bank_id'])){
           $this->getBank()->setId($x['bank_bank_id']); 
        }
      
        if(isset ($x['name'])){
           $this->setName($x['name']);  
        }
        
        if(isset ($x['tahap1_id'])){
           $this->getPlafon1()->setId($x['tahap1_id']);  
        }
        
        if(isset ($x['tahap1_persen'])){
           $this->getPlafon1()->setPercent($x['tahap1_persen']);  
        }
        
        if(isset ($x['tahap2_id'])){
           $this->getPlafon2()->setId($x['tahap2_id']);  
        }
        
        if(isset ($x['tahap2_persen'])){
           $this->getPlafon2()->setPercent($x['tahap2_persen']);  
        }
        
        if(isset ($x['tahap2_id'])){
           $this->getPlafon2()->setId($x['tahap2_id']);  
        }
        
        if(isset ($x['tahap2_persen'])){
           $this->getPlafon2()->setPercent($x['tahap2_persen']);  
        }
        
        if(isset ($x['tahap3_id'])){
           $this->getPlafon3()->setId($x['tahap3_id']);  
        }
        
        if(isset ($x['tahap3_persen'])){
           $this->getPlafon3()->setPercent($x['tahap3_persen']);  
        }
        
        if(isset ($x['tahap4_id'])){
           $this->getPlafon4()->setId($x['tahap4_id']);  
        }
        
        if(isset ($x['tahap4_persen'])){
           $this->getPlafon4()->setPercent($x['tahap4_persen']);  
        }
        
        if(isset ($x['tahap5_id'])){
           $this->getPlafon5()->setId($x['tahap5_id']);  
        }
        
        if(isset ($x['tahap5_persen'])){
           $this->getPlafon5()->setPercent($x['tahap5_persen']);  
        }
        
        if(isset ($x['tahap6_id'])){
           $this->getPlafon6()->setId($x['tahap6_id']);  
        }
        
        if(isset ($x['tahap6_persen'])){
           $this->getPlafon6()->setPercent($x['tahap6_persen']);  
        }
        
        if(isset ($x['tahap7_id'])){
           $this->getPlafon7()->setId($x['tahap7_id']);  
        }
        
        if(isset ($x['tahap7_persen'])){
           $this->getPlafon7()->setPercent($x['tahap7_persen']);  
        }
        
        if(isset ($x['tahap8_id'])){
           $this->getPlafon8()->setId($x['tahap8_id']);  
        }
        
        if(isset ($x['tahap8_persen'])){
           $this->getPlafon8()->setPercent($x['tahap8_persen']);  
        }
        
       
        
        unset($x);
    }
    public function getArrayTable() {
        $x = array(
            "bankkpr_id"=>$this->getId(),
            "bank_bank_id"=>$this->getBank()->getId(),
            "name"=>$this->getName(),
            "tahap1_id"=>$this->getPlafon1()->getId(),
            "tahap1_persen"=>$this->getPlafon1()->getPercent(),
            "tahap2_id"=>$this->getPlafon2()->getId(),
            "tahap2_persen"=>$this->getPlafon2()->getPercent(),
            "tahap3_id"=>$this->getPlafon3()->getId(),
            "tahap3_persen"=>$this->getPlafon3()->getPercent(),
            "tahap4_id"=>$this->getPlafon4()->getId(),
            "tahap4_persen"=>$this->getPlafon4()->getPercent(),
            "tahap5_id"=>$this->getPlafon5()->getId(),
            "tahap5_persen"=>$this->getPlafon5()->getPercent(),
            "tahap6_id"=>$this->getPlafon6()->getId(),
            "tahap6_persen"=>$this->getPlafon6()->getPercent(),
            "tahap7_id"=>$this->getPlafon7()->getId(),
            "tahap7_persen"=>$this->getPlafon7()->getPercent(),
            "tahap8_id"=>$this->getPlafon8()->getId(),
            "tahap8_persen"=>$this->getPlafon8()->getPercent(),
        );
        return $x;
                
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getBank() {
        if(!$this->bank){
            $this->bank = new Erems_Models_Master_Bank();
        }
        return $this->bank;
    }

    public function setBank(Erems_Models_Master_Bank $bank) {
        $this->bank = $bank;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPlafon1() {
        if(!$this->plafon1){
            $this->plafon1 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon1;
    }

    public function setPlafon1(Erems_Models_Construction_Plafon $plafon1) {
        $this->plafon1 = $plafon1;
    }

    public function getPlafon2() {
        if(!$this->plafon2){
            $this->plafon2 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon2;
    }

    public function setPlafon2(Erems_Models_Construction_Plafon $plafon2) {
        $this->plafon2 = $plafon2;
    }

    public function getPlafon3() {
        if(!$this->plafon3){
            $this->plafon3 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon3;
    }

    public function setPlafon3(Erems_Models_Construction_Plafon $plafon3) {
        $this->plafon3 = $plafon3;
    }

    public function getPlafon4() {
        if(!$this->plafon4){
            $this->plafon4 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon4;
    }

    public function setPlafon4(Erems_Models_Construction_Plafon $plafon4) {
        $this->plafon4 = $plafon4;
    }

    public function getPlafon5() {
        if(!$this->plafon5){
            $this->plafon5 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon5;
    }

    public function setPlafon5(Erems_Models_Construction_Plafon $plafon5) {
        $this->plafon5 = $plafon5;
    }

    public function getPlafon6() {
        if(!$this->plafon6){
            $this->plafon6 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon6;
    }

    public function setPlafon6(Erems_Models_Construction_Plafon $plafon6) {
        $this->plafon6 = $plafon6;
    }

    public function getPlafon7() {
        if(!$this->plafon7){
            $this->plafon7 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon7;
    }

    public function setPlafon7(Erems_Models_Construction_Plafon $plafon7) {
        $this->plafon7 = $plafon7;
    }

    public function getPlafon8() {
        if(!$this->plafon8){
            $this->plafon8 = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon8;
    }

    public function setPlafon8(Erems_Models_Construction_Plafon $plafon8) {
        $this->plafon8 = $plafon8;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getBank());
    }


    
}

?>
