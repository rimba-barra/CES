<?php


/**
 * Description of Construction
 *
 * @author tommytoban
 */
class Erems_Models_Construction_Construction extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Delien_DelimiterCandidate,  Erems_Box_Models_App_Hermes_HasDetail{
    private $progressPersen;
    private $progressDate;
    private $notes;
    private $spk;
    private $unit;
    private $pictures;
    private $DCResult;
    private $sendMail;
    
    public function __construct() {
        $this->embedPrefix = "construction_";
        $this->spk = new Erems_Models_Spk_Spk();
        $this->unit = new Erems_Models_Unit_Unit();
        $this->pictures = array();
    
    }
    
    public function getProgressPersen() {
        return $this->progressPersen;
    }

    public function setProgressPersen($progressPersen) {
        $this->progressPersen = (double)$progressPersen;
    }

    public function getProgressDate() {
        return $this->progressDate;
    }

    public function setProgressDate($progressDate) {
        $this->progressDate = date('d-m-Y', strtotime($progressDate));
    }

    public function getNotes() {
        return $this->notes;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }

    public function getSpk() {
        if(!$this->spk){
            $this->spk = new Erems_Models_Spk_Spk();
        }
        return $this->spk;
    }

    public function setSpk(Erems_Models_Spk_Spk $spk) {
        $this->spk = $spk;
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
    
    public function addPictures(Erems_Models_Construction_Picture $picture){
        $this->pictures[] = $picture;
    }
    
    public function getPicture($posisi){
        if(key_exists($posisi,$this->pictures)){
            return $this->pictures[$posisi];
        }
        
    }
    
    public function getPictures() {
        return $this->pictures;
    }

    public function setPictures($pictures) {
        $this->pictures = $pictures;
    }

    public function getSendMail() {
        return $this->sendMail;
    }

    public function setSendMail($sendMail) {
        $this->sendMail = (int)$sendMail;
    }

        
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['construction_id'])){
           $this->setId($x['construction_id']); 
        }
        if(isset ($x['progress_persen'])){
           $this->setProgressPersen($x['progress_persen']); 
        }
        if(isset ($x['progress_date'])){
           $this->setProgressDate($x['progress_date']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
       
        
        unset($x);
    }
    public function getArrayTable() {
        $x = array(
            "construction_id"=>$this->getId(),
            "progress_persen"=>$this->getProgressPersen(),
            "progress_date"=>$this->getProgressDate(),
            "notes"=>$this->getNotes()
        );
        return $x;
                
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getSpk(),$this->getUnit());
    }
    
    public function getDCArray() {
        return $this->pictures;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }

    public function addDetailObject($detailObject) {
        $this->addPictures($detailObject);
    }

    public function getDetailObject() {
        return new Erems_Models_Construction_Picture();
    }

    public function getIndexArName() {
        return "progressdetail";
    }


    
}

?>
