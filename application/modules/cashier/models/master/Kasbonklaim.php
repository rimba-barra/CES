<?php

/**
 * Description of Customer
 *
 * @author tommytoban
 */
class Cashier_Models_Master_Kasbonklaim extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {
    private $date;
    private $kasbon_date;
    private $voucherno;
    private $department;
    private $amountf;
    private $amountbayarf;
    private $amountselisihf;
    private $remainingkasbonf;
    private $amountkembalif;
    private $description;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix==NULL?'kasbonklaim_':$embedPrefix;
    }
    
    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

     public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['kasbondept_id'])){
           $this->setId($x['kasbondept_id']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['voucher_date_f'])){
           $this->setKasbonDate($x['voucher_date_f']); 
        }
        if(isset ($x['voucher_no'])){
           $this->setVoucherno($x['voucher_no']); 
        }
        if(isset ($x['department'])){
           $this->setDepartment($x['department']); 
        }
        if(isset ($x['amount'])){
           $this->setAmountf($x['amount']); 
        }
        if(isset ($x['amount_bayar'])){
           $this->setAmountbayarf($x['amount_bayar']); 
        }
        if(isset ($x['amount_selisih'])){
           $this->setAmountselisihf($x['amount_selisih']); 
        }
        if(isset ($x['remainingkasbon'])){
           $this->setRemainingkasbonf($x['remainingkasbon']); 
        }
        if(isset ($x['amountkembali'])){
           $this->setAmountkembalif($x['amountkembali']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            "kasbondept_id"=>$this->getId(),
            "date"=>$this->getDate(),
            "voucher_date_f"=>$this->getKasbonDate(),
            "voucher_no"=>$this->getVoucherno(),
            "department"=>$this->getDepartment(),
            "amount"=>$this->getAmountf(),
            "amount_bayar"=>$this->getAmountbayarf(),
            "amount_selisih"=>$this->getAmountselisihf(),
            "remainingkasbon"=>$this->getRemainingkasbonf(),
            "amountkembali"=>$this->getAmountkembalif(),
            "description"=>$this->getDescription()
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
    public function getVoucherno()
    {
        return $this->voucherno;
    }

    /**
     * @return mixed
     */
    public function getAmountselisihf()
    {
        return $this->amountselisihf;
    }

    /**
     * @param mixed $amountselisihf
     *
     * @return self
     */
    public function setAmountselisihf($amountselisihf)
    {
        $this->amountselisihf = $amountselisihf;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getRemainingkasbonf()
    {
        return $this->remainingkasbonf;
    }

    /**
     * @param mixed $remainingkasbonf
     *
     * @return self
     */
    public function setRemainingkasbonf($remainingkasbonf)
    {
        $this->remainingkasbonf = $remainingkasbonf;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAmountkembalif()
    {
        return $this->amountkembalif;
    }

    /**
     * @param mixed $amountkembalif
     *
     * @return self
     */
    public function setAmountkembalif($amountkembalif)
    {
        $this->amountkembalif = $amountkembalif;

        return $this;
    }

    /**
     * @param mixed $voucherno
     *
     * @return self
     */
    public function setVoucherno($voucherno)
    {
        $this->voucherno = $voucherno;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAmountbayarf()
    {
        return $this->amountbayarf;
    }

    /**
     * @param mixed $amountbayarf
     *
     * @return self
     */
    public function setAmountbayarf($amountbayarf)
    {
        $this->amountbayarf = $amountbayarf;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDepartment()
    {
        return $this->department;
    }

    /**
     * @param mixed $department
     *
     * @return self
     */
    public function setDepartment($department)
    {
        $this->department = $department;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAmountf()
    {
        return $this->amountf;
    }

    /**
     * @param mixed $amountf
     *
     * @return self
     */
    public function setAmountf($amountf)
    {
        $this->amountf = $amountf;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     *
     * @return self
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getKasbonDate()
    {
        return $this->kasbon_date;
    }

    /**
     * @param mixed $kasbon_date
     *
     * @return self
     */
    public function setKasbonDate($kasbon_date)
    {
        $this->kasbon_date = $kasbon_date;

        return $this;
    }
}

?>
