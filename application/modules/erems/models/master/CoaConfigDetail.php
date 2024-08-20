<?php



/**
 * Description of ClusterImage
 *
 * @author MIS
 */
class Erems_Models_Master_CoaConfigDetail extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt,  Erems_Box_Arried{
    private $coaconfigId;
    private $decription;
    private $Code;
    private $persen;
    private $coaId;
    private $coaName;
    private $type;
    private $amount;
    private $kasbankdetailId;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix==NULL?'coaconfigdetail_':$embedPrefix;
    }
    
   public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['description'])){
           $this->setDecription($x['description']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['coa_config_id'])){
           $this->setCoaconfigId($x['coa_config_id']); 
        }
        if(isset ($x['coa_config_detail_id'])){
           $this->setId($x['coa_config_detail_id']); 
        }   
          if(isset ($x['persen'])){
           $this->setPersen($x['persen']); 
        }   
          if(isset ($x['coa_id'])){
           $this->setCoaId($x['coa_id']); 
        }   
          if(isset ($x['coa_name'])){
           $this->setCoaName($x['coa_name']); 
        }   
         if (isset($x['type'])) {
            $this->setType($x['type']);
        }
         if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
         if (isset($x['kasbankdetail_id'])) {
            $this->setKasbankdetailId($x['kasbankdetail_id']);
        }
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "description"=>$this->getDecription(),
            "code"=>$this->getCode(),
            "coa_config_id"=>$this->getCoaconfigId(),
            "coa_config_detail_id"=>$this->getId(),
            "persen"=>$this->getPersen(),
            "coa_id"=>$this->getCoaId(),
            "coa_name"=>$this->getCoaName(),
            "type"=>$this->getType(),
            "amount"=>$this->getAmount(),
            "kasbankdetail_id"=>$this->getKasbankdetailId()
        );
        
        return $x;
    }
    
    function getKasbankdetailId() {
        return $this->kasbankdetailId;
    }

    function setKasbankdetailId($kasbankdetailId) {
        $this->kasbankdetailId = $kasbankdetailId;
    }

        
    function getAmount() {
        return floatval($this->amount);
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

        
    function getCoaName() {
        return $this->coaName;
    }

    function setCoaName($coaName) {
        $this->coaName = $coaName;
    }

        
    function getCoaId() {
        return $this->coaId;
    }

    function setCoaId($coaId) {
        $this->coaId = $coaId;
    }

        
    function getCoaconfigId() {
        return $this->coaconfigId;
    }

    function getDecription() {
        return $this->decription;
    }

    function getCode() {
        return $this->Code;
    }

    function setCoaconfigId($coaconfigId) {
        $this->coaconfigId = $coaconfigId;
    }

    function setDecription($decription) {
        $this->decription = $decription;
    }

    function setCode($Code) {
        $this->Code = $Code;
    }
    
     function getType() {
        return $this->type;
    }

    function setType($type) {
        $this->type = $type;
    }

        
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

   

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getCluster());
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    function getPersen() {
        return floatval($this->persen);
    }

    function setPersen($persen) {
        $this->persen = $persen;
    }



}

?>
