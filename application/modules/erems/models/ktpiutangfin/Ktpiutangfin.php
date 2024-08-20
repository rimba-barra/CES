<?php

/**
 * Description of Ktpiutangfin
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Ktpiutangfin_Ktpiutangfin extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

    private $project_id;
    private $pt_id;
    private $unit;
    private $thn_vch;
    private $no_vch;
    private $kode_acc;
    private $no_urut;
    private $no_urut_sub;
    private $sub_kode_sub;
    private $tgl_vch;
    private $ket;
    private $mutasi;
    private $sts_mutasi;
    private $flag_sub;
    private $flag_posting;
    private $flag_sj;
    private $flag_pj;
    private $flag_pph_partner;
    private $flag_pph_owner;
    private $addBy;
    private $modiBy;
    private $addOn;
    private $modiOn;
    private $projectName;
    private $ptName;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "ktpiutangfin_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
      
        
        if (isset($x["kartupiutangacc_id"])) { $this->setId($x["kartupiutangacc_id"]);}
if (isset($x["unit_unit_id"])) { $this->getUnit()->setId($x["unit_unit_id"]);}
if (isset($x["thn_vch"])) { $this->setThn_vch($x["thn_vch"]);}
if (isset($x["no_vch"])) { $this->setNo_vch($x["no_vch"]);}
if (isset($x["kode_acc"])) { $this->setKode_acc($x["kode_acc"]);}
if (isset($x["no_urut"])) { $this->setNo_urut($x["no_urut"]);}
if (isset($x["no_urut_sub"])) { $this->setNo_urut_sub($x["no_urut_sub"]);}
if (isset($x["sub_kode_sub"])) { $this->setSub_kode_sub($x["sub_kode_sub"]);}
if (isset($x["tgl_vch"])) { $this->setTgl_vch($x["tgl_vch"]);}
if (isset($x["ket"])) { $this->setKet($x["ket"]);}
if (isset($x["mutasi"])) { $this->setMutasi($x["mutasi"]);}
if (isset($x["sts_mutasi"])) { $this->setSts_mutasi($x["sts_mutasi"]);}
if (isset($x["flag_sub"])) { $this->setFlag_sub($x["flag_sub"]);}
if (isset($x["flag_posting"])) { $this->setFlag_posting($x["flag_posting"]);}
if (isset($x["flag_sj"])) { $this->setFlag_sj($x["flag_sj"]);}
if (isset($x["flag_pj0"])) { $this->setFlag_pj($x["flag_pj0"]);}
if (isset($x["flag_pph_partner"])) { $this->setFlag_pph_partner($x["flag_pph_partner"]);}
if (isset($x["flag_pph_owner"])) { $this->setFlag_pph_owner($x["flag_pph_owner"]);}
if (isset($x["addonx"])) { $this->setAddOn($x["addonx"]);}
if (isset($x["modionx"])) { $this->setModiOn($x["modionx"]);}
if (isset($x["addbyx"])) { $this->setAddBy($x["addbyx"]);}
if (isset($x["modibyx"])) { $this->setModiBy($x["modibyx"]);}
if (isset($x["project_name"])) { $this->setProjectName($x["project_name"]);}
if (isset($x["pt_name"])) { $this->setPtName($x["pt_name"]);}



        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "kartupiutangacc_id"=>$this->getId(),
"unit_unit_id"=>$this->getUnit()->getId(),
"thn_vch"=>$this->getThn_vch(),
"no_vch"=>$this->getNo_vch(),
"kode_acc"=>$this->getKode_acc(),
"no_urut"=>$this->getNo_urut(),
"no_urut_sub"=>$this->getNo_urut_sub(),
"sub_kode_sub"=>$this->getSub_kode_sub(),
"tgl_vch"=>$this->getTgl_vch(),
"ket"=>$this->getKet(),
"mutasi"=>$this->getMutasi(),
"sts_mutasi"=>$this->getSts_mutasi(),
"flag_sub"=>$this->getFlag_sub(),
"flag_posting"=>$this->getFlag_posting(),
"flag_sj"=>$this->getFlag_sj(),
"flag_pj0"=>$this->getFlag_pj(),
"flag_pph_partner"=>$this->getFlag_pph_partner(),
"flag_pph_owner"=>$this->getFlag_pph_owner(),
"addonx"=>$this->getAddOn(),
       "modionx"=>$this->getModiOn(),
            "addbyx"=>$this->getAddBy(),
                "modibyx"=>$this->getModiBy(),
             "project_name"=>$this->getProjectName(),
             "pt_name"=>$this->getPtName(),
        );
        
        

        return $x;
    }
    
   

    function getThn_vch() {
        return $this->thn_vch;
    }

    function getNo_vch() {
        return $this->no_vch;
    }

    function getKode_acc() {
        return $this->kode_acc;
    }

    function getNo_urut() {
        return $this->no_urut;
    }

    function getNo_urut_sub() {
        return $this->no_urut_sub;
    }

    function getSub_kode_sub() {
        return $this->sub_kode_sub;
    }

    function getTgl_vch() {
        return $this->tgl_vch;
    }

    function getKet() {
        return $this->ket;
    }

    function getMutasi() {
        return $this->mutasi;
    }

    function getSts_mutasi() {
        return $this->sts_mutasi;
    }

    function getFlag_sub() {
        return $this->flag_sub;
    }

    function getFlag_posting() {
        return $this->flag_posting;
    }

    function getFlag_sj() {
        return $this->flag_sj;
    }

    function getFlag_pj() {
        return $this->flag_pj;
    }

    function getFlag_pph_partner() {
        return $this->flag_pph_partner;
    }

    function getFlag_pph_owner() {
        return $this->flag_pph_owner;
    }

  

    function setThn_vch($thn_vch) {
        $this->thn_vch = $thn_vch;
    }

    function setNo_vch($no_vch) {
        $this->no_vch = $no_vch;
    }

    function setKode_acc($kode_acc) {
        $this->kode_acc = $kode_acc;
    }

    function setNo_urut($no_urut) {
        $this->no_urut = $no_urut;
    }

    function setNo_urut_sub($no_urut_sub) {
        $this->no_urut_sub = $no_urut_sub;
    }

    function setSub_kode_sub($sub_kode_sub) {
        $this->sub_kode_sub = $sub_kode_sub;
    }

    function setTgl_vch($tgl_vch) {
        $this->tgl_vch = $tgl_vch;
    }

    function setKet($ket) {
        $this->ket = $ket;
    }

    function setMutasi($mutasi) {
        $this->mutasi = $mutasi;
    }

    function setSts_mutasi($sts_mutasi) {
        $this->sts_mutasi = $sts_mutasi;
    }

    function setFlag_sub($flag_sub) {
        $this->flag_sub = $flag_sub;
    }

    function setFlag_posting($flag_posting) {
        $this->flag_posting = $flag_posting;
    }

    function setFlag_sj($flag_sj) {
        $this->flag_sj = $flag_sj;
    }

    function setFlag_pj($flag_pj) {
        $this->flag_pj = $flag_pj;
    }

    function setFlag_pph_partner($flag_pph_partner) {
        $this->flag_pph_partner = $flag_pph_partner;
    }

    function setFlag_pph_owner($flag_pph_owner) {
        $this->flag_pph_owner = $flag_pph_owner;
    }
    
    function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
            
        }
        return $this->unit;
    }

    function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }
    
    function getProjectName() {
        return $this->projectName;
    }

    function getPtName() {
        return $this->ptName;
    }

    function setProjectName($projectName) {
        $this->projectName = $projectName;
    }

    function setPtName($ptName) {
        $this->ptName = $ptName;
    }

        
    function getAddBy() {
        return $this->addBy;
    }

    function getModiBy() {
        return $this->modiBy;
    }

    function getAddOn() {
        return $this->addOn;
    }

    function getModiOn() {
        return $this->modiOn;
    }

    function setAddBy($addBy) {
        $this->addBy = $addBy;
    }

    function setModiBy($modiBy) {
        $this->modiBy = $modiBy;
    }

    function setAddOn($addOn) {
        $this->addOn = $addOn;
    }

    function setModiOn($modiOn) {
        $this->modiOn = $modiOn;
    }

    
    
    
    public function getProject() {
        if(!$this->project_id){
            $this->project_id = new Erems_Box_Models_Master_Project();
        }
        return $this->project_id;
    }

    public function getPt() {
        if(!$this->pt_id){
            $this->pt_id = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt_id;
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project_id = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt_id = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("modion","addon");
    }


}
