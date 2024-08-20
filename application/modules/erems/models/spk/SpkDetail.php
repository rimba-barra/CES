<?php

/**
 * Description of SpkDetail
 *
 * @author tommytoban
 */
class Erems_Models_Spk_SpkDetail extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried,  Erems_Box_Kouti_Remora{
    private $spk;
    private $unit;
    private $progress;
    private $pengawas;
    private $rubahDesign;
    private $beritaAcara;
    private $gambar;
    private $jadwal;
    private $sik;
    private $serahterima1;
    private $serahterima2;
    private $note2;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "spkdetail_";
        $this->spk = new Erems_Models_Spk_Spk();
        $this->unit = new Erems_Models_Unit_Unit();
  
    }
    
    public function getSpk() {
        return $this->spk;
    }

    public function setSpk(Erems_Models_Spk_Spk $spk) {
        $this->spk = $spk;
    }

    public function getUnit() {
        return $this->unit;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function getProgress() {
        return $this->progress;
    }

    public function setProgress($progress) {
        $this->progress = (double)$progress;
    }
    function getPengawas() {
        return $this->pengawas;
    }

    function getRubahDesign() {
        return $this->rubahDesign;
    }

    function getBeritaAcara() {
        return $this->beritaAcara;
    }

    function getGambar() {
        return $this->gambar;
    }

    function getJadwal() {
        return $this->jadwal;
    }

    function getSik() {
        return $this->sik;
    }

    function getSerahTerima1() {
        return $this->serahterima1;
    }

    function getSerahTerima2() {
        return $this->serahterima2;
    }

    function getNote2() {
        return $this->note2;
    }

    function setPengawas($pengawas) {
        $this->pengawas = $pengawas;
    }

    function setRubahDesign($rubahDesign) {
        $this->rubahDesign = $rubahDesign;
    }

    function setBeritaAcara($beritaAcara) {
        $this->beritaAcara = $beritaAcara;
    }

    function setGambar($gambar) {
        $this->gambar = $gambar;
    }

    function setJadwal($jadwal) {
        $this->jadwal = $jadwal;
    }

    function setSik($sik) {
        $this->sik = $sik;
    }

    function setSerahTerima1($serahterima1) {
        $this->serahterima1 = $serahterima1;
    }

    function setSerahTerima2($serahterima2) {
        $this->serahterima2 = $serahterima2;
    }

    function setNote2($note2) {
        $this->note2 = $note2;
    }

        
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['spkdetail_id'])){
           $this->setId($x['spkdetail_id']); 
        }
        if(isset ($x['progress'])){
           $this->setProgress($x['progress']); 
        }
        if(isset ($x['pengawas_id'])){
           $this->setPengawas($x['pengawas_id']); 
        }
        if(isset ($x['rubah_design'])){
           $this->setRubahDesign($x['rubah_design']); 
        }
        if(isset ($x['berita_acara'])){
           $this->setBeritaAcara($x['berita_acara']); 
        }
        if(isset ($x['gambar'])){
           $this->setGambar($x['gambar']); 
        }
        if(isset ($x['jadwal'])){
           $this->setJadwal($x['jadwal']); 
        }
        if(isset ($x['sik'])){
           $this->setSik($x['sik']); 
        }
        if(isset ($x['serahterima1_date'])){
            $this->setSerahTerima1($x['serahterima1_date']); 
        }
        if(isset ($x['serahterima2_date'])){
            $this->setSerahTerima2($x['serahterima2_date']); 
        }
        if(isset ($x['note'])){
            $this->setNote2($x['note']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'spkdetail_id'=>$this->getId(),
            'progress'=>$this->getProgress(),
            "pengawas_id"=>$this->getPengawas(),
            "rubah_design"=>$this->getRubahDesign(),
            "berita_acara"=>$this->getBeritaAcara(),
            "gambar"=>$this->getGambar(),
            "jadwal"=>$this->getJadwal(),
            "sik"=>$this->getSik(),
            "serahterima1_date"=>$this->getSerahTerima1(),
            "serahterima2_date"=>$this->getSerahTerima2(),
            "note"=>$this->getNote2()
            
        );
        
        return $x;
    }

    public function getArray() {
        $ar = $this->getArrayTable();
        $y = $this->getUnit()->getArrayTable();
        $ar = array_merge($ar,$y);
        return $ar;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getUnit(),$this->getSpk());
    }
    
    


    
}

?>
