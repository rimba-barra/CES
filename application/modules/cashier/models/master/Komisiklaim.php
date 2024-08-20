<?php

/**
 * Description of Customer
 *
 * @author tommytoban
 */
class Cashier_Models_Master_Komisiklaim extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {
    private $code;
    private $name;
    private $customername;
    private $unitnumber;
    private $cluster;
    private $komisibelumcair;
    private $komisisudahcair;
    private $komisiharuscair;
    private $nilaikomisi;
    private $purchaseno;
    private $ppn;
    private $pph;
    private $komisi;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix==NULL?'komisiklaim_':$embedPrefix;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getCustomername() {
        return $this->customername;
    }

    public function setCustomername($customername) {
        $this->customername = $customername;
    }
    function getUnitnumber() {
        return $this->unitnumber;
    }

    function getCluster() {
        return $this->cluster;
    }

    function setUnitnumber($unitnumber) {
        $this->unitnumber = $unitnumber;
    }

    function setCluster($cluster) {
        $this->cluster = $cluster;
    }
    function getKomisibelumcair() {
        return $this->komisibelumcair;
    }

    function getKomisisudahcair() {
        return $this->komisisudahcair;
    }

    function setKomisibelumcair($komisibelumcair) {
        $this->komisibelumcair = $komisibelumcair;
    }

    function setKomisisudahcair($komisisudahcair) {
        $this->komisisudahcair = $komisisudahcair;
    }

            
     public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['komisi_klaim_id'])){
           $this->setId($x['komisi_klaim_id']); 
        }
        if(isset ($x['penerima_komisi_code'])){
           $this->setCode($x['penerima_komisi_code']); 
        }
        if(isset ($x['sales_name'])){
           $this->setName($x['sales_name']); 
        }
        if(isset ($x['customer_name'])){
           $this->setCustomername($x['customer_name']); 
        }
        if(isset ($x['unit_number'])){
           $this->setUnitnumber($x['unit_number']); 
        }
        if(isset ($x['cluster'])){
           $this->setCluster($x['cluster']); 
        }
        if(isset ($x['komisi_sudah_cair'])){
           $this->setKomisisudahcair($x['komisi_sudah_cair']); 
        }
        if(isset ($x['komisi_belum_cair'])){
           $this->setKomisibelumcair($x['komisi_belum_cair']); 
        }
        if(isset ($x['komisi_harus_cair'])){
           $this->setKomisiharuscair($x['komisi_harus_cair']); 
        }
        if(isset ($x['persentase_ppn'])){
           $this->setPpn($x['persentase_ppn']); 
        }
        if(isset ($x['persentase_pph'])){
           $this->setPph($x['persentase_pph']); 
        }
        if(isset ($x['persentase_komisi'])){
           $this->setKomisi($x['persentase_komisi']); 
        }
        if(isset ($x['purchaseletter_no'])){
           $this->setPurchaseno($x['purchaseletter_no']); 
        }
        if(isset ($x['nilai_komisi'])){
           $this->setNilaikomisi($x['nilai_komisi']); 
        }
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            "komisi_klaim_id"=>$this->getId(),
            "penerima_komisi_code"=>$this->getCode(),
            "sales_name"=>$this->getName(),
            "customer_name"=>$this->getCustomername(),
            "unit_number"=>$this->getUnitnumber(),
            "cluster"=>$this->getCluster(),
            "komisi_sudah_cair"=>$this->getKomisisudahcair(),
            "komisi_belum_cair"=>$this->getKomisibelumcair(),
            "komisi_harus_cair"=>$this->getKomisiharuscair(),
            "purchaseletter_no"=>$this->getPurchaseno(),
            "persentase_ppn"=>$this->getPpn(),
            "persentase_pph"=>$this->getPph(),
            "persentase_komisi"=>$this->getKomisi(),
            "nilai_komisi"=>$this->getNilaikomisi()
        );
      
        return $x;
    }
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(), $this->getPt());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon", "issued_date"));
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

    /**
     * @return mixed
     */
    public function getKomisiharuscair()
    {
        return $this->komisiharuscair;
    }

    /**
     * @return mixed
     */
    public function getPpn()
    {
        return $this->ppn;
    }

    /**
     * @param mixed $ppn
     *
     * @return self
     */
    public function setPpn($ppn)
    {
        $this->ppn = $ppn;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPph()
    {
        return $this->pph;
    }

    /**
     * @param mixed $pph
     *
     * @return self
     */
    public function setPph($pph)
    {
        $this->pph = $pph;

        return $this;
    }

    /**
     * @param mixed $komisiharuscair
     *
     * @return self
     */
    public function setKomisiharuscair($komisiharuscair)
    {
        $this->komisiharuscair = $komisiharuscair;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPurchaseno()
    {
        return $this->purchaseno;
    }

    /**
     * @param mixed $purchaseno
     *
     * @return self
     */
    public function setPurchaseno($purchaseno)
    {
        $this->purchaseno = $purchaseno;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNilaikomisi()
    {
        return $this->nilaikomisi;
    }

    /**
     * @param mixed $nilaikomisi
     *
     * @return self
     */
    public function setNilaikomisi($nilaikomisi)
    {
        $this->nilaikomisi = $nilaikomisi;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getKomisi()
    {
        return $this->komisi;
    }

    /**
     * @param mixed $komisi
     *
     * @return self
     */
    public function setKomisi($komisi)
    {
        $this->komisi = $komisi;

        return $this;
    }
}

?>
