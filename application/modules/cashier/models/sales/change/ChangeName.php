<?php

/**
 * Description of ChangeName
 *
 * @author tommytoban
 */
class Cashier_Models_Sales_Change_ChangeName extends Cashier_Models_Sales_Change implements Cashier_Box_Kouti_Remora {
    private $adminFee;
    private $customerOld;
    private $customerNew;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "changename_";
        $this->customerNew = new Cashier_Models_Master_Customer();
        $this->customerOld = new Cashier_Models_Master_Customer();
        $this->reason = new Cashier_Models_Sales_Reason_GantiNama();
    }
    
    public function getReason() {
        if(!$this->reason){
            $this->reason = new Cashier_Models_Sales_Reason_GantiNama();
        }
        return $this->reason;
    }
    
    public function getAdminFee() {
        return $this->adminFee;
    }

    public function getCustomerOld() {
        if(!$this->customerOld){
            $this->customerOld = new Cashier_Models_Master_Customer();
        }
        return $this->customerOld;
    }

    public function getCustomerNew() {
        if(!$this->customerNew){
            $this->customerNew = new Cashier_Models_Master_Customer();
        }
        return $this->customerNew;
    }

    public function setAdminFee($adminFee) {
        $this->adminFee = $adminFee;
    }
    
    public function setCustomerOld(Cashier_Models_Master_Customer $customerOld) {
        $this->customerOld = $customerOld;
    }

    public function setCustomerNew(Cashier_Models_Master_Customer $customerNew) {
        $this->customerNew = $customerNew;
    }

    
    public function setArrayTable($dataArray=NULL) {

        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['changename_id'])){
          $this->setId($x['changename_id']);
        }
     
        if(isset ($x['purchaseletterrevision_id'])){
          $this->getRevision()->setId($x['purchaseletterrevision_id']);
        }
        
        if(isset ($x['changename_date'])){
          $this->setDate($x['changename_date']);
        }
      
      
        if(isset ($x['administration_fee'])){
          $this->setAdminFee($x['administration_fee']);
        }
        if(isset ($x['changename_note'])){
          $this->setNote($x['changename_note']);
        }
        if(isset ($x['adendum_no'])){
          $this->setAdendumNomor($x['adendum_no']);
        }
        if(isset ($x['persetujuan_nama'])){
          $this->setPersetujuanNama($x['persetujuan_nama']);
        }
        if(isset ($x['persetujuan_relasi'])){
          $this->setPersetujuanRelasi($x['persetujuan_relasi']);
        }
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            'changename_id'=>$this->getId(),
            'purchaseletterrevision_id'=>$this->getRevision()->getId(),
            'changename_date'=>$this->getDate(),
            'administration_fee'=>$this->getAdminFee(),
            'changename_note'=>$this->getNote(),
            'adendum_no'=>$this->getAdendumNomor(),
            'persetujuan_nama'=>$this->getPersetujuanNama(),
            'persetujuan_relasi'=>$this->getPersetujuanRelasi()
        );
        return $x;
    }
    
    protected function getDatefields() {
        return array("changename_date");
    }

        public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPurchaseletter(),$this->getCustomerNew(),$this->getRevision(),$this->getReason());
    }
    
    

}
