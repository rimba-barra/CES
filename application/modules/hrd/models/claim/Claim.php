<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Claim
 *
 * @author MIS
 */
class Hrd_Models_Claim_Claim extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $employee;
    private $year;
    private $type;
    private $date;
    private $receiptDate;
    private $doctor;
    private $hospital;
    private $pharmacy;
    private $description;
    private $inpatient;
    private $total;
    private $subject;
    private $isPaid;
    private $claimValue;
    private $percentPengganti;
    private $amountPengganti;
    private $totalKlaim;
    private $saldo;
    private $plafon;

    private $no_claim;
    private $pay_date;


    private $hrd_check;
    private $jenispengobatan;
    private $nik;
    private $employee_name;
    private $deptcode;
    private $claim_date_ess;
    private $kwitansi_date_ess;
    private $description_ess;
    private $claim_value_ess;
    private $jenispengobatan_id;

    private $fams_process;
    private $fams_process_date;
    private $fams_status;
    private $fams_deleted_date;
    private $fams_deleted_description;
    private $voucher_no;
    private $uploadapi_id;

    private $klaimpengobatan_kacamata_id;
    private $employee_id;
    
    
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "claim_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['klaimpengobatan_id'])){
           $this->setId($x['klaimpengobatan_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['jenispengobatan_jenispengobatan_id'])){
           $this->getType()->setId($x['jenispengobatan_jenispengobatan_id']); 
        }
        if(isset ($x['claim_date'])){
           $this->setDate($x['claim_date']); 
        }
        if(isset ($x['kwitansi_date'])){
           $this->setReceiptDate($x['kwitansi_date']); 
        }
        if(isset ($x['docter_name'])){
           $this->setDoctor($x['docter_name']); 
        }
        if(isset ($x['hospital_name'])){
           $this->setHospital($x['hospital_name']); 
        }
        if(isset ($x['apotic_name'])){
           $this->setPharmacy($x['apotic_name']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['rawat_inap'])){
           $this->setInpatient($x['rawat_inap']); 
        }
        if(isset ($x['total'])){
           $this->setTotal($x['total']); 
        }
        if(isset ($x['claim_subject'])){
           $this->setSubject($x['claim_subject']); 
        }
        if(isset ($x['paid'])){
           $this->setIsPaid($x['paid']); 
        }
        if(isset ($x['claim_value'])){
           $this->setClaimValue($x['claim_value']); 
        }
        if(isset ($x['percent_pengganti'])){
           $this->setPercentPengganti($x['percent_pengganti']); 
        }
        if(isset ($x['amount_pengganti'])){
           $this->setAmountPengganti($x['amount_pengganti']); 
        }
        if(isset ($x['total_klaim'])){
           $this->setTotalKlaim($x['total_klaim']); 
        }
        if(isset ($x['saldo'])){
           $this->setSaldo($x['saldo']); 
        }
        if(isset ($x['plafon'])){
           $this->setPlafon($x['plafon']); 
        }
        if(isset ($x['addon'])){
           $this->setAddOn($x['addon']); 
        }

        if(isset ($x['no_claim'])){
           $this->setNoClaim($x['no_claim']); 
        }
        if(isset ($x['pay_date'])){
           $this->setPayDate($x['pay_date']); 
        }

        if(isset ($x['hrd_check'])){
           $this->setHrdCheck($x['hrd_check']); 
        }
        if(isset ($x['jenispengobatan'])){
           $this->setJenisPengobatan($x['jenispengobatan']); 
        }
        if(isset ($x['nik'])){
           $this->setNik($x['nik']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['deptcode'])){
           $this->setDeptCode($x['deptcode']); 
        }
        if(isset ($x['claim_date_ess'])){
           $this->setClaimDateEss($x['claim_date_ess']); 
        }
        if(isset ($x['kwitansi_date_ess'])){
           $this->setKwitansiDateEss($x['kwitansi_date_ess']); 
        }
        if(isset ($x['description_ess'])){
           $this->setDescriptionEss($x['description_ess']); 
        }
        if(isset ($x['claim_value_ess'])){
           $this->setClaimValueEss($x['claim_value_ess']); 
        }
        if(isset ($x['jenispengobatan_id'])){
           $this->setJenisPengobatanId($x['jenispengobatan_id']); 
        }

        if(isset ($x['fams_process'])){
           $this->setFamsProcess($x['fams_process']); 
        }
        if(isset ($x['fams_process_date'])){
           $this->setFamsProcessDate($x['fams_process_date']); 
        }
        if(isset ($x['fams_status'])){
           $this->setFamsStatus($x['fams_status']); 
        }
        if(isset ($x['fams_deleted_date'])){
           $this->setFamsDeletedDate($x['fams_deleted_date']); 
        }
        if(isset ($x['fams_deleted_description'])){
           $this->setFamsDeletedDesc($x['fams_deleted_description']); 
        }
        if(isset ($x['voucher_no'])){
           $this->setVoucherNo($x['voucher_no']); 
        }
        if(isset ($x['uploadapi_id'])){
           $this->setUploadapiId($x['uploadapi_id']); 
        }

        if(isset ($x['klaimpengobatan_kacamata_id'])){
           $this->setKlaimpengobatanKacamataId($x['klaimpengobatan_kacamata_id']); 
        }

        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {

        if($this->getPayDate() == '1900-01-01'){
            $getPayDate = '';
        }else{
            $getPayDate = $this->getPayDate();
        }
     
        $x = array(
            'klaimpengobatan_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'year'=>$this->getYear(),
            'jenispengobatan_jenispengobatan_id'=>$this->getType()->getId(),
            'claim_date'=>$this->getDate(),
            'kwitansi_date'=>$this->getReceiptDate(),
            'docter_name'=>$this->getDoctor(),
            'hospital_name'=>$this->getHospital(),
            'apotic_name'=>$this->getPharmacy(),
            'description'=>$this->getDescription(),
            'rawat_inap'=>$this->getInpatient(),
            'total'=>$this->getTotal(),
            'claim_subject'=>$this->getSubject(),
            'paid'=>$this->getIsPaid(),
            'claim_value'=>$this->getClaimValue(),
            'percent_pengganti'=>$this->getPercentPengganti(),
            'amount_pengganti'=>$this->getAmountPengganti(),
            'total_klaim'=>$this->getTotalKlaim(),
            'saldo'=>$this->getSaldo(),
            'plafon'=>$this->getPlafon(),
            'addon'=>$this->getAddOn(),

            'no_claim'=>$this->getNoClaim(),
            'pay_date'=>$getPayDate,

            'hrd_check'=>$this->getHrdCheck(),
            'jenispengobatan'=>$this->getJenisPengobatan(),
            'nik'=>$this->getNik(),
            'employee_name'=>$this->getEmployeeName(),
            'deptcode'=>$this->getDeptCode(),
            'claim_date_ess'=>$this->getClaimDateEss(),
            'kwitansi_date_ess'=>$this->getKwitansiDateEss(),
            'description_ess'=>$this->getDescriptionEss(),
            'claim_value_ess'=>$this->getClaimValueEss(),
            'jenispengobatan_id'=>$this->getJenisPengobatanId(),

            'fams_process'=>$this->getFamsProcess(),
            'fams_process_date'=>$this->getFamsProcessDate(),
            'fams_status'=>$this->getFamsStatus(),
            'fams_deleted_date'=>$this->getFamsDeletedDate(),
            'fams_deleted_description'=>$this->getFamsDeletedDesc(),
            'voucher_no'=>$this->getVoucherNo(),
            'uploadapi_id'=>$this->getUploadapiId(),

            'klaimpengobatan_kacamata_id'=>$this->getKlaimpengobatanKacamataId(),
            'employee_id'=>$this->getEmployeeId()

        );
      
        return $x;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function getYear() {
        
        return (int)$this->year;
    }

    public function setYear($year) {
        $this->year = (int)$year;
    }

    public function getType() {
        if(!$this->type){
            $this->type = new Hrd_Models_Pengobatan_Type();
        }
        return $this->type;
    }

    public function setType(Hrd_Models_Pengobatan_Type $type) {
        $this->type = $type;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getReceiptDate() {
        return $this->receiptDate;
    }

    public function setReceiptDate($receiptDate) {
        $this->receiptDate = $receiptDate;
    }

    public function getDoctor() {
        return $this->doctor;
    }

    public function setDoctor($doctor) {
        $this->doctor = $doctor;
    }

    public function getHospital() {
        return $this->hospital;
    }

    public function setHospital($hospital) {
        $this->hospital = $hospital;
    }

    

    public function getPharmacy() {
        return $this->pharmacy;
    }

    public function setPharmacy($pharmacy) {
        $this->pharmacy = $pharmacy;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getInpatient() {
        return $this->inpatient;
    }

    public function setInpatient($inpatient) {
        $this->inpatient = $inpatient;
    }

    public function getTotal() {
        return $this->total;
    }

    public function setTotal($total) {
        $this->total = $total;
    }

    public function getSubject() {
        return $this->subject;
    }

    public function setSubject($subject) {
        $this->subject = $subject;
    }

    public function getIsPaid() {
        return $this->isPaid;
    }

    public function setIsPaid($isPaid) {
        $this->isPaid = $isPaid;
    }
    
    public function getClaimValue() {
        return $this->claimValue;
    }

    public function getPercentPengganti() {
        return $this->percentPengganti;
    }

    public function getAmountPengganti() {
        return $this->amountPengganti;
    }

    public function getTotalKlaim() {
        return $this->totalKlaim;
    }

    public function getSaldo() {
        return $this->saldo;
    }

    public function setClaimValue($claimValue) {
        $this->claimValue = $claimValue;
    }

    public function setPercentPengganti($percentPengganti) {
        $this->percentPengganti = $percentPengganti;
    }

    public function setAmountPengganti($amountPengganti) {
        $this->amountPengganti = $amountPengganti;
    }

    public function setTotalKlaim($totalKlaim) {
        $this->totalKlaim = $totalKlaim;
    }

    public function setSaldo($saldo) {
        $this->saldo = $saldo;
    }
    
    public function getPlafon() {
        return $this->plafon;
    }

    public function setPlafon($plafon) {
        $this->plafon = $plafon;
    }

    public function getNoClaim() {
        return $this->no_claim;
    }

    public function setNoClaim($no_claim) {
        $this->no_claim = $no_claim;
    }

    public function getPayDate() {
        return $this->pay_date;
    }

    public function setPayDate($pay_date) {
        $this->pay_date = $pay_date;
    }

    public function getHrdCheck() {
        return $this->hrd_check;
    }

    public function setHrdCheck($hrd_check) {
        $this->hrd_check = $hrd_check;
    }

    public function getJenisPengobatan() {
        return $this->jenispengobatan;
    }

    public function setJenisPengobatan($jenispengobatan) {
        $this->jenispengobatan = $jenispengobatan;
    }

    public function getNik() {
        return $this->nik;
    }

    public function setNik($nik) {
        $this->nik = $nik;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function getDeptCode() {
        return $this->deptcode;
    }

    public function setDeptCode($deptcode) {
        $this->deptcode = $deptcode;
    }

    public function getClaimDateEss() {
        return $this->claim_date_ess;
    }

    public function setClaimDateEss($claim_date_ess) {
        $this->claim_date_ess = $claim_date_ess;
    }

    public function getKwitansiDateEss() {
        return $this->kwitansi_date_ess;
    }

    public function setKwitansiDateEss($kwitansi_date_ess) {
        $this->kwitansi_date_ess = $kwitansi_date_ess;
    }

    public function getDescriptionEss() {
        return $this->description_ess;
    }

    public function setDescriptionEss($description_ess) {
        $this->description_ess = $description_ess;
    }

    public function getClaimValueEss() {
        return $this->claim_value_ess;
    }

    public function setClaimValueEss($claim_value_ess) {
        $this->claim_value_ess = $claim_value_ess;
    }

    public function getJenisPengobatanId() {
        return $this->jenispengobatan_id;
    }

    public function setJenisPengobatanId($jenispengobatan_id) {
        $this->jenispengobatan_id = $jenispengobatan_id;
    }

    public function getFamsProcess() {
        return $this->fams_process;
    }

    public function setFamsProcess($fams_process) {
        $this->fams_process = $fams_process;
    }

    public function getFamsProcessDate() {
        return $this->fams_process_date;
    }

    public function setFamsProcessDate($fams_process_date) {
        $this->fams_process_date = $fams_process_date;
    }

    public function getFamsStatus() {
        return $this->fams_status;
    }

    public function setFamsStatus($fams_status) {
        $this->fams_status = $fams_status;
    }

    public function getFamsDeletedDate() {
        return $this->fams_deleted_date;
    }

    public function setFamsDeletedDate($fams_deleted_date) {
        $this->fams_deleted_date = $fams_deleted_date;
    }

    public function getFamsDeletedDesc() {
        return $this->fams_deleted_description;
    }

    public function setFamsDeletedDesc($fams_deleted_description) {
        $this->fams_deleted_description = $fams_deleted_description;
    }

    public function getVoucherNo() {
        return $this->voucher_no;
    }

    public function setVoucherNo($voucher_no) {
        $this->voucher_no = $voucher_no;
    }

    public function getUploadapiId() {
        return $this->uploadapi_id;
    }

    public function setUploadapiId($uploadapi_id) {
        $this->uploadapi_id = $uploadapi_id;
    }

    public function getKlaimpengobatanKacamataId() {
        return $this->klaimpengobatan_kacamata_id;
    }

    public function setKlaimpengobatanKacamataId($klaimpengobatan_kacamata_id) {
        $this->klaimpengobatan_kacamata_id = $klaimpengobatan_kacamata_id;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getEmployee(),$this->getType());
    }
    
    protected function getDatefields() {
        return array("claim_date","kwitansi_date","addon");
    }
    





    
}

?>
