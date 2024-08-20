<?php

/**
 * Description of Pencairan
 *
 * @author MIS
 */
class Erems_Models_Construction_Pencairan extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {
    private $spkDetail;
    private $unit;
    private $status;
    private $realDate;
    private $plafon;
    private $cairDate;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "conscair_";
       
    
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['spkdetail_pencairan_id'])){
           $this->setId($x['spkdetail_pencairan_id']); 
        }
        if(isset ($x['spkdetail_spkdetail_id'])){
           $this->getSpkDetail()->setId($x['spkdetail_spkdetail_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        
        if(isset ($x['status'])){
           $this->setStatus($x['status']); 
        }
        if(isset ($x['realisation_date'])){
           $this->setRealDate($x['realisation_date']); 
        }
        if(isset ($x['plafon_plafon_id'])){
           $this->getPlafon()->setId($x['plafon_id']); 
        }
        if(isset ($x['pencairan_date'])){
           $this->setCairDate($x['pencairan_date']); 
        }
       
        
        unset($x);
    }
    public function getArrayTable() {
        $x = array(
            "spkdetail_pencairan_id"=>$this->getId(),
            "spkdetail_spkdetail_id"=>$this->getSpkDetail()->getId(),
            "unit_unit_id"=>$this->getUnit()->getId(),
            "status"=>$this->getStatus(),
            "realisation_date"=>$this->getRealDate(),
            "plafon_plafon_id"=>$this->getPlafon()->getId(),
            "pencairan_date"=>$this->getCairDate()
        );
        return $x;
                
    }
    
    public function getSpkDetail() {
        if(!$this->spkDetail){
            $this->spkDetail = new Erems_Models_Spk_SpkDetail();
        }
        return $this->spkDetail;
    }

    public function setSpkDetail(Erems_Models_Spk_SpkDetail $spkDetail) {
        $this->spkDetail = $spkDetail;
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

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getRealDate() {
        return $this->realDate;
    }

    public function setRealDate($realDate) {
        $this->realDate = $realDate;
    }
    
    public function getPlafon() {
        if(!$this->plafon){
            $this->plafon = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon;
    }

    public function setPlafon(Erems_Models_Construction_Plafon $plafon) {
        $this->plafon = $plafon;
    }
    
    public function getCairDate() {
        return $this->cairDate;
    }

    public function setCairDate($cairDate) {
        $this->cairDate = $cairDate;
    }

    
        
    

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getSpkDetail(),$this->getUnit(),$this->getPlafon());
    }
    
    public function getDatefields() {
        return array('realisation_date');
    }


}

?>
