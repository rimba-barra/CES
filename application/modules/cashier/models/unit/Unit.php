<?php

/**
 * Description of Unit
 *
 * @author tommytoban
 */
class Cashier_Models_Unit_Unit extends Cashier_Box_Models_ObjectEmbedData{
    private $number;
    private $progress;
    private $serahTerimaPlan;
    private $lebarJalan;
    private $gambarRumah;
    private $isReadyStock;
    private $isReadySell;
	private $isReadyLegal;
    private $virtualaccountBca;
    private $customerNo;
    private $customerInt;
    private $koordinat;
    private $clustercode;
    private $cluster;
    private $clusterId;
    private $mhtype;
    private $virtualaccount_no;
    private $unit_type;
    private $unit_block;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = "unit_";
         $this->embedPrefix = $embedPrefix==NULL?'unit_':$embedPrefix;
    }
    
    function getUnit_block() {
        return $this->unit_block;
    }

    function setUnit_block($unit_block) {
        $this->unit_block = $unit_block;
    }

        
    function getUnit_type() {
        return $this->unit_type;
    }

    function setUnit_type($unit_type) {
        $this->unit_type = $unit_type;
    }

        
    function getVirtualaccount_no() {
        return $this->virtualaccount_no;
    }

    function setVirtualaccount_no($virtualaccount_no) {
        $this->virtualaccount_no = $virtualaccount_no;
    }

        
    function getClustercode() {
        return $this->clustercode;
    }

    function setClustercode($clustercode) {
        $this->clustercode = $clustercode;
    }

    function getMhtype() {
        return $this->mhtype;
    }

    function setMhtype($mhtype) {
        $this->mhtype = $mhtype;
    }

    
    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }
    
    public function getProgress() {
        return $this->progress;
    }

    public function setProgress($progress) {
        $this->progress = $progress;
    }
    
    public function getSerahTerimaPlan() {
        return $this->serahTerimaPlan;
    }

    public function setSerahTerimaPlan($serahTerimaPlan) {
        $this->serahTerimaPlan = $this->ignoredd($serahTerimaPlan);
    }
    
    function getLebarJalan() {
        return floatval($this->lebarJalan);
    }

    function getGambarRumah() {
        return $this->gambarRumah;
    }
    function getClusterId() {
        return $this->clusterId;
    }

    function setClusterId($clusterId) {
        $this->clusterId = $clusterId;
    }

    
    function setLebarJalan($lebarJalan) {
        $this->lebarJalan = floatval($lebarJalan);
    }

    function setGambarRumah($gambarRumah) {
        $this->gambarRumah = $gambarRumah;
    }
    
    function getIsReadyStock() {
        return $this->isReadyStock;
    }

    function getIsReadySell() {
        return $this->isReadySell;
    }

    function setIsReadyStock($isReadyStock) {
        $this->isReadyStock = $isReadyStock;
    }

    function setIsReadySell($isReadySell) {
        $this->isReadySell = $isReadySell;
    }

	function setIsReadyLegal($isReadyLegal) {
        $this->isReadyLegal = $isReadyLegal;
    }

	function getIsReadyLegal() {
        return $this->isReadyLegal;
    }

    function getCluster() {
        return $this->cluster;
    }

    function setCluster($cluster) {
        $this->cluster = $cluster;
    }

        
        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['unit_id'])){
           $this->setId($x['unit_id']); 
        }
        if(isset ($x['unit_number'])){
           $this->setNumber($x['unit_number']); 
        }
        if(isset ($x['progress'])){
           $this->setProgress($x['progress']);
        }
        if(isset ($x['serahterima_plan'])){
           $this->setSerahTerimaPlan($x['serahterima_plan']);
        }
        if(isset ($x['lebar_jalan'])){
           $this->setLebarJalan($x['lebar_jalan']);
        }
        if(isset ($x['gambar_rumah'])){
           $this->setGambarRumah($x['gambar_rumah']);
        }
        if(isset ($x['is_readystock'])){
           $this->setIsReadyStock($x['is_readystock']);
        }
        if(isset ($x['is_readysell'])){
           $this->setIsReadySell($x['is_readysell']);
        }

	    if(isset ($x['is_readylegal'])){
           $this->setIsReadyLegal($x['is_readylegal']);
        }
        if(isset ($x['customer_no'])){
           $this->setCustomerNo($x['customer_no']);
        }
        if(isset ($x['customer_int'])){
           $this->setCustomerInt($x['customer_int']);
        }
        if(isset ($x['koordinat'])){
           $this->setKoordinat($x['koordinat']);
        }
        if(isset ($x['virtualaccount_bca'])){
           $this->setVirtualaccountBca($x['virtualaccount_bca']);
        }
        if(isset ($x['cluster_code'])){
           $this->setClustercode($x['cluster_code']);
        }
        if(isset ($x['cluster'])){
           $this->setCluster($x['cluster']);
        }
        if(isset ($x['cluster_id'])){
           $this->setClusterId($x['cluster_id']);
        }
        if(isset ($x['mh_type'])){
           $this->setMhtype($x['mh_type']);
        }
        if(isset ($x['virtualaccount_no'])){
           $this->setVirtualaccount_no($x['virtualaccount_no']);
        }
        if(isset ($x['unit_type'])){
           $this->setUnit_type($x['unit_type']);
        }
        if(isset ($x['unit_block'])){
           $this->setUnit_block($x['unit_block']);
        }
      
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'unit_id'=>$this->getId(),
            'unit_number'=>$this->getNumber(),
            'progress'=>$this->getProgress(),
            'serahterima_plan'=>$this->getSerahTerimaPlan(),
            'lebar_jalan'=>$this->getLebarJalan(),
            'gambar_rumah'=>$this->getGambarRumah(),
            'is_readystock'=>$this->getIsReadyStock(),
            'is_readysell'=>$this->getIsReadySell(),
			'is_readylegal'=>$this->getIsReadyLegal(),
            'koordinat'=>$this->getKoordinat(),
            'customer_no'=>$this->getCustomerNo(),
            'customer_int'=>$this->getCustomerInt(),
            'virtualaccount_bca'=>$this->getVirtualaccountBca()   ,
            'cluster_code'=>$this->getClustercode()              ,
            'cluster'=>$this->getCluster()            ,
            'cluster_id'=>$this->getClusterId()   ,
            'mh_type'=>$this->getMhtype()   ,
            'virtualaccount_no'=>$this->getVirtualaccount_no()   ,
            'unit_type'=>$this->getUnit_type()  ,
            'unit_block'=>$this->getUnit_block()  
        );
        
        return $x;
    }
    
    
    



    /**
     * @return mixed
     */
    public function getVirtualaccountBca()
    {
        return $this->virtualaccountBca;
    }

    /**
     * @param mixed $virtualaccountBca
     *
     * @return self
     */
    public function setVirtualaccountBca($virtualaccountBca)
    {
        $this->virtualaccountBca = $virtualaccountBca;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerNo()
    {
        return $this->customerNo;
    }

    /**
     * @param mixed $customerNo
     *
     * @return self
     */
    public function setCustomerNo($customerNo)
    {
        $this->customerNo = $customerNo;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerInt()
    {
        return $this->customerInt;
    }

    /**
     * @param mixed $customerInt
     *
     * @return self
     */
    public function setCustomerInt($customerInt)
    {
        $this->customerInt = $customerInt;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getKoordinat()
    {
        return $this->koordinat;
    }

    /**
     * @param mixed $koordinat
     *
     * @return self
     */
    public function setKoordinat($koordinat)
    {
        $this->koordinat = $koordinat;

        return $this;
    }
}

?>
