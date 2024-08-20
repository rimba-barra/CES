<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterTran extends Erems_Models_Master_ClusterB implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt,Erems_Box_Delien_DelimiterCandidate {
    private $project;
    private $pt;
    private $decription;
    private $imgLegend;
    private $imgSite;
    private $detail;
    private $dcResult;
    private $sectorCode;
    private $subSectorCode;
    private $hargaTaman;
    private $hargaHook;
    private $kode_rekening_va;
    private $kode_cluster_va;
    private $luasan_efektif_lahan;
    private $total_unit;
    private $siteplan_svg;

    //added by anas 22062021
    private $is_locktype;

    //added by rico 26062023
    private $cluster_alias;
    
    public function __construct() {
        parent::__construct();
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
        $this->detail = array();
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['description'])){
           $this->setDecription($x['description']); 
        }
        if(isset ($x['img_legendlayer'])){
           $this->setImgLegend($x['img_legendlayer']); 
        }
        if(isset ($x['img_siteplant'])){
           $this->setImgSite($x['img_siteplant']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddOn($x['Addon']); 
        }
        if(isset ($x['Modion'])){
           $this->setModiOn($x['Modion']); 
        }
        if(isset ($x['sector_code'])){
           $this->setSectorCode($x['sector_code']); 
        }
        if(isset ($x['subsector_code'])){
           $this->setSubSectorCode($x['subsector_code']); 
        }
        if(isset ($x['harga_taman'])){
           $this->setHargaTaman($x['harga_taman']); 
        }
        if(isset ($x['harga_hook'])){
           $this->setHargaHook($x['harga_hook']); 
        }
        if(isset ($x['kode_rekening_va'])){
           $this->setKode_rekening_va($x['kode_rekening_va']); 
        }
        if(isset ($x['kode_cluster_va'])){
           $this->setKode_cluster_va($x['kode_cluster_va']); 
        }
        if(isset ($x['luasan_efektif_lahan'])){
           $this->setLuasan_efektif_lahan($x['luasan_efektif_lahan']); 
        }
        if(isset ($x['total_unit'])){
           $this->setTotal_unit($x['total_unit']); 
        }
        if(isset ($x['siteplan_svg'])){
           $this->setSiteplan_svg($x['siteplan_svg']); 
        }
                
        //added by anas 22062021
        if(isset ($x['is_locktype'])){
           $this->setIs_locktype($x['is_locktype']); 
        }
                
        //added by rico 26062023
        if(isset ($x['cluster_alias'])){
           $this->setClusterAlias($x['cluster_alias']); 
        }

        unset($x);
        
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            "description"=>$this->getDecription(),
            "img_legendlayer"=>$this->getImgLegend(),
            "img_siteplant"=>$this->getImgSite(),
            "Addon"=>$this->getAddOn(),
            "Modion"=>$this->getModiOn(),
            "sector_code"=>$this->getSectorCode(),
            "subsector_code"=>$this->getSubSectorCode(),
            "harga_taman"=>$this->getHargaTaman(),
            "harga_hook"=>$this->getHargaHook(),
            "kode_rekening_va"=>$this->getKode_rekening_va(),
            "kode_cluster_va"=>$this->getKode_cluster_va(),
            "luasan_efektif_lahan"=>$this->getLuasan_efektif_lahan(),
            "total_unit"=>$this->getTotal_unit(),
			## RH 20220629 ##
			"siteplan_svg"=>$this->getSiteplan_svg(), 

            //added by anas 22062021
            "is_locktype"=>$this->getIs_locktype(), 

            // added by rico 26062023
            "cluster_alias"=>$this->getClusterAlias()
        );
        $x = array_merge($x,$y);
        return $x;
    }
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getDecription() {
        return $this->decription;
    }

    public function setDecription($decription) {
        $this->decription = $decription;
    }

    public function getImgLegend() {
        return $this->imgLegend;
    }

    public function setImgLegend($imgLegend) {
        $this->imgLegend = $imgLegend;
    }

    public function getImgSite() {
        return $this->imgSite;
    }

    public function setImgSite($imgSite) {
        $this->imgSite = $imgSite;
    }
    
    public function addDetail(Erems_Models_Master_ClusterImage $ci){
        $this->detail[] = $ci;
    }
    
    public function getDetail($pos=-1){
        if($pos > -1){
            return $this->detail[$pos];
        }
        return $this->detail;
    }
    
    public function getSectorCode() {
        return $this->sectorCode;
    }

    public function getSubSectorCode() {
        return $this->subSectorCode;
    }

    public function getHargaTaman() {
        return $this->hargaTaman;
    }

    public function getHargaHook() {
        return $this->hargaHook;
    }

    public function setSectorCode($sectorCode) {
        $this->sectorCode = $sectorCode;
    }

    public function setSubSectorCode($subSectorCode) {
        $this->subSectorCode = $subSectorCode;
    }

    public function setHargaTaman($hargaTaman) {
        $this->hargaTaman = $hargaTaman;
    }

    public function setHargaHook($hargaHook) {
        $this->hargaHook = $hargaHook;
    }
    
    function getKode_rekening_va() {
        return $this->kode_rekening_va;
    }

    function getKode_cluster_va() {
        return $this->kode_cluster_va;
    }

    function setKode_rekening_va($kode_rekening_va) {
        $this->kode_rekening_va = $kode_rekening_va;
    }

    function setKode_cluster_va($kode_cluster_va) {
        $this->kode_cluster_va = $kode_cluster_va;
    }

    function setLuasan_efektif_lahan($luasan_efektif_lahan) {
        $this->luasan_efektif_lahan = $luasan_efektif_lahan;
    }

    function getLuasan_efektif_lahan() {
        return $this->luasan_efektif_lahan;
    }

    function setTotal_unit($total_unit) {
        $this->total_unit = $total_unit;
    }

    function getTotal_unit() {
        return $this->total_unit;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }

    //added by anas 22062021
    public function getIs_locktype() {
        return $this->is_locktype;
    }

    public function setIs_locktype($is_locktype) {
        $this->is_locktype = $is_locktype;
    }
	public function getSiteplan_svg() {
		return $this->siteplan_svg;
	}

	public function setSiteplan_svg($siteplan_svg) {
		$this->siteplan_svg = $siteplan_svg;
	}

    // added by rico 26062023
    public function getClusterAlias() {
        return $this->cluster_alias;
    }

    public function setClusterAlias($cluster_alias) {
        $this->cluster_alias = $cluster_alias;
    }

}

?>
