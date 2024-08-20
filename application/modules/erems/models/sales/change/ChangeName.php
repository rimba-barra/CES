<?php

/**
 * Description of ChangeName
 *
 * @author tommytoban
 */
class Erems_Models_Sales_Change_ChangeName extends Erems_Models_Sales_Change implements Erems_Box_Kouti_Remora {
    private $adminFee;
    private $customerOld;
    private $customerNew;
    //rizal 2 April 2019
    private $isSatuKK;
    private $nomorSetorPajak;
    private $noDocPengalihanHak;
    private $caraPembayaranPPH;
    private $nominalPembayaranPPH;
    private $isUsedVerification;
    //
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "changename_";
        $this->customerNew = new Erems_Models_Master_Customer();
        $this->customerOld = new Erems_Models_Master_Customer();
        $this->reason = new Erems_Models_Sales_Reason_GantiNama();
    }
    
    public function getReason() {
        if(!$this->reason){
            $this->reason = new Erems_Models_Sales_Reason_GantiNama();
        }
        return $this->reason;
    }
    
    public function getAdminFee() {
        return $this->adminFee;
    }

    public function getCustomerOld() {
        if(!$this->customerOld){
            $this->customerOld = new Erems_Models_Master_Customer();
        }
        return $this->customerOld;
    }

    public function getCustomerNew() {
        if(!$this->customerNew){
            $this->customerNew = new Erems_Models_Master_Customer();
        }
        return $this->customerNew;
    }

    public function setAdminFee($adminFee) {
        $this->adminFee = $adminFee;
    }
    
    public function setCustomerOld(Erems_Models_Master_Customer $customerOld) {
        $this->customerOld = $customerOld;
    }

    public function setCustomerNew(Erems_Models_Master_Customer $customerNew) {
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
        //rizal 2 April 2019
        if(isset ($x['is_satukk'])){
          $this->setIsSatuKK($x['is_satukk']);
        }
        if(isset ($x['nomor_setor_pajak'])){
          $this->setNomorSetorPajak($x['nomor_setor_pajak']);
        }
        if(isset ($x['nomor_dokumen_pengalihanhak'])){
          $this->setNoDocPengalihanHak($x['nomor_dokumen_pengalihanhak']);
        }
        if(isset ($x['cara_pembayaran_pph'])){
          $this->setCaraPembayaranPPH($x['cara_pembayaran_pph']);
        }
        if(isset ($x['nominal_pembayaran_pph'])){
          $this->setNominalPembayaranPPH($x['nominal_pembayaran_pph']);
        }
        if(isset ($x['is_used_verification'])){
          $this->setIsUsedVerification($x['is_used_verification']);
        }
        //
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
            'persetujuan_relasi'=>$this->getPersetujuanRelasi(),
            //rizal 2 April 2019
            'is_satukk'=>$this->getIsSatuKK(),
            'nomor_setor_pajak'=>$this->getNomorSetorPajak(),
            'nomor_dokumen_pengalihanhak'=>$this->getNoDocPengalihanHak(),
            'cara_pembayaran_pph'=>$this->getCaraPembayaranPPH(),
            'nominal_pembayaran_pph'=>$this->getNominalPembayaranPPH(),
            'is_used_verification' =>$this->getIsUsedVerification()
             //
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
    
    //rizal 2 April 2019
    function getIsSatuKK() {
        return $this->isSatuKK;
    }

    function getNomorSetorPajak() {
        return $this->nomorSetorPajak;
    }

    function setIsSatuKK($isSatuKK) {
        $this->isSatuKK = $isSatuKK;
    }

    function setNomorSetorPajak($nomorSetorPajak) {
        $this->nomorSetorPajak = $nomorSetorPajak;
    }
    function getNoDocPengalihanHak() {
        return $this->noDocPengalihanHak;
    }

    function getCaraPembayaranPPH() {
        return $this->caraPembayaranPPH;
    }

    function setNoDocPengalihanHak($noDocPengalihanHak) {
        $this->noDocPengalihanHak = $noDocPengalihanHak;
    }

    function setCaraPembayaranPPH($caraPembayaranPPH) {
        $this->caraPembayaranPPH = $caraPembayaranPPH;
    }
    function getNominalPembayaranPPH() {
        return $this->nominalPembayaranPPH;
    }

    function setNominalPembayaranPPH($nominalPembayaranPPH) {
        $this->nominalPembayaranPPH = $nominalPembayaranPPH;
    }
    
    function getIsUsedVerification() {
        return $this->isUsedVerification;
    }

    function setIsUsedVerification($isUsedVerification) {
        $this->isUsedVerification = $isUsedVerification;
    }

    
                //

}
