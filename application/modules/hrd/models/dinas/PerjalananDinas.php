<?php

/**
 * Description of PerjalananDinas
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_PerjalananDinas extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $documentNo;
    private $employee;
    private $date;
    private $negaraTujuan;
    private $status;
    private $lama;
    private $projectTujuan;
    private $nonProjectTujuan;
    private $uangmukaCurrencyId;
    private $uangmukaAmount;
    private $uangKendaraanCurrencyId;
    private $uangKendaraanAmount;
    private $tanggalBerangkat;
    private $tanggalKembali;
    private $jamBerangkat;
    private $jamKembali;
    private $notes;
    private $exchangeRate;
    private $rincianUangMakanCurrencyId;
    private $rincianUangMakanAmount;
    private $rincianUangMakanDurasi;
    private $rincianUAngMakanTotal;
    private $rincianUangSakuCurrencyId;
    private $rincianUangSakuAmount;
    private $rincianUangSakuDurasi;
    private $rincianUAngSakuTotal;
    private $isProject;
    private $approval;
    private $cc;
    private $nomor;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "perjalanandinas_";
    }
    
    
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['perjalanandinas_id'])){
           $this->setId($x['perjalanandinas_id']); 
        }
        if(isset ($x['document_no'])){
           $this->setDocumentNo($x['document_no']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['perjalanandinas_date'])){
           $this->setDate($x['perjalanandinas_date']); 
        }
        
        if(isset ($x['negaratujuan_negaratujuan_id'])){
           $this->getNegaraTujuan()->setId($x['negaratujuan_negaratujuan_id']); 
        }
        
        if(isset ($x['perjalanandinas_status'])){
           $this->setStatus($x['perjalanandinas_status']); 
        }
        
        if(isset ($x['perjalanandinas_lama'])){
           $this->setLama($x['perjalanandinas_lama']); 
        }
        
        if(isset ($x['perjalanandinas_project_id'])){
           $this->setProjectTujuan($x['perjalanandinas_project_id']); 
        }
        
        if(isset ($x['perjalanandinas_nonproject'])){
           $this->setNonProjectTujuan($x['perjalanandinas_nonproject']); 
        }
        
        if(isset ($x['uangmuka_currency_id'])){
           $this->setUangmukaCurrencyId($x['uangmuka_currency_id']); 
        }
        
        if(isset ($x['uangmuka_amount'])){
           $this->setUangmukaAmount($x['uangmuka_amount']); 
        }
        
        if(isset ($x['uangkendaraaan_amount'])){
           $this->setUangKendaraanAmount($x['uangkendaraaan_amount']); 
        }
        
        if(isset ($x['uangkendaraan_currency_id'])){
           $this->setUangKendaraanCurrencyId($x['uangkendaraan_currency_id']); 
        }
        
        if(isset ($x['tanggal_berangkat'])){
           $this->setTanggalBerangkat($x['tanggal_berangkat']); 
        }
        
        if(isset ($x['tanggal_kembali'])){
           $this->setTanggalKembali($x['tanggal_kembali']); 
        }
        
        if(isset ($x['jam_berangkat'])){
           $this->setJamBerangkat($x['jam_berangkat']); 
        }
        if(isset ($x['jam_kembali'])){
           $this->setJamKembali($x['jam_kembali']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['exchange_rate'])){
           $this->setExchangeRate($x['exchange_rate']); 
        }
        if(isset ($x['rincian_uangmakan_currency_id'])){
           $this->setRincianUangMakanCurrencyId($x['rincian_uangmakan_currency_id']); 
        }
        if(isset ($x['rincian_uangmakan_amount'])){
           $this->setRincianUangMakanAmount($x['rincian_uangmakan_amount']); 
        }
        if(isset ($x['rincian_uangmakan_durasi'])){
           $this->setRincianUangMakanDurasi($x['rincian_uangmakan_durasi']); 
        }
        if(isset ($x['rincian_uangmakan_total'])){
           $this->setRincianUAngMakanTotal($x['rincian_uangmakan_total']); 
        }
        if(isset ($x['rincian_uangsaku_currency_id'])){
           $this->setRincianUangSakuCurrencyId($x['rincian_uangsaku_currency_id']); 
        }
        if(isset ($x['rincian_uangsaku_amount'])){
           $this->setRincianUangSakuAmount($x['rincian_uangsaku_amount']); 
        }
        if(isset ($x['rincian_uangsaku_durasi'])){
           $this->setRincianUangSakuDurasi($x['rincian_uangsaku_durasi']); 
        }
        if(isset ($x['rincian_uangsaku_total'])){
           $this->setRincianUAngSakuTotal($x['rincian_uangsaku_total']); 
        }
        if(isset ($x['perjalanandinas_is_project'])){
           $this->setIsProject($x['perjalanandinas_is_project']); 
        }
        if(isset ($x['approval_employee_id'])){
           $this->setApproval($x['approval_employee_id']); 
        }
        if(isset ($x['cc_employee_id'])){
           $this->setCc($x['cc_employee_id']); 
        }
        if(isset ($x['perjalanandinas_nomor'])){
           $this->setNomor($x['perjalanandinas_nomor']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'perjalanandinas_id'=>$this->getId(),
            'document_no'=>$this->getDocumentNo(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'perjalanandinas_date'=>$this->getDate(),
            'negaratujuan_negaratujuan_id'=>$this->getNegaraTujuan()->getId(),
            'perjalanandinas_status'=>$this->getStatus(),
            'perjalanandinas_lama'=>$this->getLama(),
            'perjalanandinas_project_id'=>$this->getProjectTujuan(),
            'perjalanandinas_nonproject'=>$this->getNonProjectTujuan(),
            'uangmuka_currency_id'=>$this->getUangmukaCurrencyId(),
            'uangmuka_amount'=>$this->getUangmukaAmount(),
            'uangkendaraan_currency_id'=>$this->getUangKendaraanCurrencyId(),
            'uangkendaraaan_amount'=>$this->getUangKendaraanAmount(),
            'tanggal_berangkat'=>$this->getTanggalBerangkat(),
            'tanggal_kembali'=>$this->getTanggalKembali(),
            'jam_berangkat'=>$this->getJamBerangkat(),
            'jam_kembali'=>$this->getJamKembali(),
            'notes'=>$this->getNotes(),
            'exchange_rate'=>$this->getExchangeRate(),
            'rincian_uangmakan_currency_id'=>$this->getRincianUangMakanCurrencyId(),
            'rincian_uangmakan_amount'=>$this->getRincianUangMakanAmount(),
            'rincian_uangmakan_durasi'=>$this->getRincianUangMakanDurasi(),
            'rincian_uangmakan_total'=>$this->getRincianUAngMakanTotal(),
            'rincian_uangsaku_currency_id'=>$this->getRincianUangSakuCurrencyId(),
            'rincian_uangsaku_amount'=>$this->getRincianUangSakuAmount(),
            'rincian_uangsaku_durasi'=>$this->getRincianUangSakuDurasi(),
            'rincian_uangsaku_total'=>$this->getRincianUAngSakuTotal(),
            'perjalanandinas_is_project'=>$this->getIsProject(),
            'approval_employee_id'=>$this->getApproval(),
            'cc_employee_id'=>$this->getCc(),
            'perjalanandinas_nomor'=>$this->getNomor()
           
        );
      
        return $x;
    }
    
    public function getDocumentNo() {
        return $this->documentNo;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getDate() {
        return $this->date;
    }

    public function getNegaraTujuan() {
        if(!$this->negaraTujuan){
            $this->negaraTujuan = new Hrd_Models_Dinas_NegaraTujuan();
        }
        return $this->negaraTujuan;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getLama() {
        return $this->lama;
    }

    public function getProjectTujuan() {
        return $this->projectTujuan;
    }

    public function getNonProjectTujuan() {
        return $this->nonProjectTujuan;
    }

    public function getUangmukaCurrencyId() {
        return $this->uangmukaCurrencyId;
    }

    public function getUangmukaAmount() {
        return $this->uangmukaAmount;
    }

    public function getUangKendaraanCurrencyId() {
        return $this->uangKendaraanCurrencyId;
    }

    public function getUangKendaraanAmount() {
        return $this->uangKendaraanAmount;
    }

    public function getTanggalBerangkat() {
        return $this->tanggalBerangkat;
    }

    public function getTanggalKembali() {
        return $this->tanggalKembali;
    }

    public function getJamBerangkat() {
        return $this->jamBerangkat;
    }

    public function getJamKembali() {
        return $this->jamKembali;
    }

    public function getNotes() {
        return $this->notes;
    }

    public function getExchangeRate() {
        return $this->exchangeRate;
    }

    public function getRincianUangMakanCurrencyId() {
        return $this->rincianUangMakanCurrencyId;
    }

    public function getRincianUangMakanAmount() {
        return $this->rincianUangMakanAmount;
    }

    public function getRincianUangMakanDurasi() {
        return $this->rincianUangMakanDurasi;
    }

    public function getRincianUAngMakanTotal() {
        return $this->rincianUAngMakanTotal;
    }

    public function getRincianUangSakuCurrencyId() {
        return $this->rincianUangSakuCurrencyId;
    }

    public function getRincianUangSakuAmount() {
        return $this->rincianUangSakuAmount;
    }

    public function getRincianUangSakuDurasi() {
        return $this->rincianUangSakuDurasi;
    }

    public function getRincianUAngSakuTotal() {
        return $this->rincianUAngSakuTotal;
    }

    public function setDocumentNo($documentNo) {
        $this->documentNo = $documentNo;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setNegaraTujuan(Hrd_Models_Dinas_NegaraTujuan $negaraTujuan) {
        $this->negaraTujuan = $negaraTujuan;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function setLama($lama) {
        $this->lama = $lama;
    }

    public function setProjectTujuan($projectTujuan) {
        $this->projectTujuan = $projectTujuan;
    }

    public function setNonProjectTujuan($nonProjectTujuan) {
        $this->nonProjectTujuan = $nonProjectTujuan;
    }

    public function setUangmukaCurrencyId($uangmukaCurrencyId) {
        $this->uangmukaCurrencyId = $uangmukaCurrencyId;
    }

    public function setUangmukaAmount($uangmukaAmount) {
        $this->uangmukaAmount = $uangmukaAmount;
    }

    public function setUangKendaraanCurrencyId($uangKendaraanCurrencyId) {
        $this->uangKendaraanCurrencyId = $uangKendaraanCurrencyId;
    }

    public function setUangKendaraanAmount($uangKendaraanAmount) {
        $this->uangKendaraanAmount = $uangKendaraanAmount;
    }

    public function setTanggalBerangkat($tanggalBerangkat) {
        $this->tanggalBerangkat = $tanggalBerangkat;
    }

    public function setTanggalKembali($tanggalKembali) {
        $this->tanggalKembali = $tanggalKembali;
    }

    public function setJamBerangkat($jamBerangkat) {
        $this->jamBerangkat = $jamBerangkat;
    }

    public function setJamKembali($jamKembali) {
        $this->jamKembali = $jamKembali;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }

    public function setExchangeRate($exchangeRate) {
        $this->exchangeRate = $exchangeRate;
    }

    public function setRincianUangMakanCurrencyId($rincianUangMakanCurrencyId) {
        $this->rincianUangMakanCurrencyId = $rincianUangMakanCurrencyId;
    }

    public function setRincianUangMakanAmount($rincianUangMakanAmount) {
        $this->rincianUangMakanAmount = $rincianUangMakanAmount;
    }

    public function setRincianUangMakanDurasi($rincianUangMakanDurasi) {
        $this->rincianUangMakanDurasi = $rincianUangMakanDurasi;
    }

    public function setRincianUAngMakanTotal($rincianUAngMakanTotal) {
        $this->rincianUAngMakanTotal = $rincianUAngMakanTotal;
    }

    public function setRincianUangSakuCurrencyId($rincianUangSakuCurrencyId) {
        $this->rincianUangSakuCurrencyId = $rincianUangSakuCurrencyId;
    }

    public function setRincianUangSakuAmount($rincianUangSakuAmount) {
        $this->rincianUangSakuAmount = $rincianUangSakuAmount;
    }

    public function setRincianUangSakuDurasi($rincianUangSakuDurasi) {
        $this->rincianUangSakuDurasi = $rincianUangSakuDurasi;
    }

    public function setRincianUAngSakuTotal($rincianUAngSakuTotal) {
        $this->rincianUAngSakuTotal = $rincianUAngSakuTotal;
    }

    public function getIsProject() {
        return $this->isProject;
    }

    public function setIsProject($isProject) {
        $this->isProject = $isProject;
    }
    
    public function getApproval() {
        return $this->approval;
    }

    public function getCc() {
        return $this->cc;
    }

    public function setApproval($approval) {
        $this->approval = $approval;
    }

    public function setCc($cc) {
        $this->cc = $cc;
    }
    
    public function getNomor() {
        return $this->nomor;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    
    
    
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        
        return $this->pt;
    }
    
    protected function getDatefields() {
        return array("perjalanandinas_date");
    }

     public function grouped() {
        return array();
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

//put your code here
}
