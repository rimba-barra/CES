<?php


/**
 * Description of Target
 *
 * @author MIS
 */
class Erems_Models_Construction_Target extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {
    private $spkDetail;
    private $unit;
    private $plafon;
    private $targetDate;
    private $realDate;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "constarget_";
       
    
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['spkdetail_target_id'])){
           $this->setId($x['spkdetail_target_id']); 
        }
        if(isset ($x['spkdetail_spkdetail_id'])){
           $this->getSpkDetail()->setId($x['spkdetail_spkdetail_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        if(isset ($x['plafon_plafon_id'])){
           $this->getPlafon()->setId($x['plafon_plafon_id']); 
        }
        if(isset ($x['target_date'])){
           $this->setTargetDate($x['target_date']); 
        }
        if(isset ($x['realisation_date'])){
           $this->setRealDate($x['realisation_date']); 
        }
       
        
        unset($x);
    }
    public function getArrayTable() {
        $x = array(
            "spkdetail_target_id"=>$this->getId(),
            "spkdetail_spkdetail_id"=>$this->getSpkDetail()->getId(),
            "unit_unit_id"=>$this->getUnit()->getId(),
            "plafon_plafon_id"=>$this->getPlafon()->getId(),
            "target_date"=>$this->getTargetDate(),
            "realisation_date"=>$this->getRealDate()
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

    public function getPlafon() {
        if(!$this->plafon){
            $this->plafon = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon;
    }

    public function setPlafon(Erems_Models_Construction_Plafon $plafon) {
        $this->plafon = $plafon;
    }

    public function getTargetDate() {
        return $this->targetDate;
    }

    public function setTargetDate($targetDate) {
        $this->targetDate = $targetDate;
    }

    public function getRealDate() {
        return $this->realDate;
    }

    public function setRealDate($realDate) {
        $this->realDate = $realDate;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPlafon(),$this->getUnit(),$this->getSpkDetail());
    }
    
    public function getDatefields() {
        return array('target_date','realisation_date');
    }


    
}

?>
