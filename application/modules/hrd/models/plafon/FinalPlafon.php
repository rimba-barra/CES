<?php

/**
 * Description of FinalPlafon
 *
 * @author MIS
 */
class Hrd_Models_PLafon_FinalPlafon extends Box_Models_ObjectEmbedData {
    private $cekup;
    private $frame;
    private $hamil;
    private $kb;
    private $lainLain;
    private $lensa;
    private $rawatInap;
    private $salinNormal;
    private $salinAbnormal;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "finalplafon_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['cekup'])){
           $this->setCekup($x['cekup']); 
        }
        if(isset ($x['frame'])){
           $this->setFrame($x['frame']); 
        }
        if(isset ($x['hamil'])){
           $this->setHamil($x['hamil']); 
        }
        if(isset ($x['kb'])){
           $this->setKb($x['kb']); 
        }
        if(isset ($x['lainlain'])){
           $this->setLainLain($x['lainlain']); 
        }
        if(isset ($x['lensa'])){
           $this->setLensa($x['lensa']); 
        }
        if(isset ($x['rawatinap'])){
           $this->setRawatInap($x['rawatinap']); 
        }
        if(isset ($x['salinnormal'])){
           $this->setSalinNormal($x['salinnormal']); 
        }
        if(isset ($x['salinabnormal'])){
           $this->salinAbnormal($x['salinabnormal']); 
        }
       
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'cekup'=>$this->getFrame(),
            'frame'=>$this->getFrame(),
            'hamil'=>$this->getHamil(),
            'kb'=>$this->getKb(),
            'lainlain'=>$this->getLainLain(),
            'lensa'=>$this->getLensa(),
            'rawatinap'=>$this->getRawatInap(),
            'salinabnormal'=>$this->getSalinAbnormal(),
            'salinnormal'=>$this->getSalinNormal()
            
        );
      
        return $x;
    }
    
    
    public function toPlafonValue(){
        $x = new Hrd_Models_Plafon_PlafonKaryawanValue();
        
    }
    
    public function getCekup() {
        return $this->cekup;
    }

    public function setCekup($cekup) {
        $this->cekup = $cekup;
    }

    public function getFrame() {
        return $this->frame;
    }

    public function setFrame($frame) {
        $this->frame = $frame;
    }

    public function getHamil() {
        return $this->hamil;
    }

    public function setHamil($hamil) {
        $this->hamil = $hamil;
    }

    public function getKb() {
        return $this->kb;
    }

    public function setKb($kb) {
        $this->kb = $kb;
    }

    public function getLainLain() {
        return $this->lainLain;
    }

    public function setLainLain($lainLain) {
        $this->lainLain = $lainLain;
    }

    public function getLensa() {
        return $this->lensa;
    }

    public function setLensa($lensa) {
        $this->lensa = $lensa;
    }

    public function getRawatInap() {
        return $this->rawatInap;
    }

    public function setRawatInap($rawatInap) {
        $this->rawatInap = $rawatInap;
    }

    public function getSalinNormal() {
        return $this->salinNormal;
    }

    public function setSalinNormal($salinNormal) {
        $this->salinNormal = $salinNormal;
    }

    public function getSalinAbnormal() {
        return $this->salinAbnormal;
    }

    public function setSalinAbnormal($salinAbnormal) {
        $this->salinAbnormal = $salinAbnormal;
    }


}

?>
