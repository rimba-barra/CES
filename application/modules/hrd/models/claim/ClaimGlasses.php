<?php


/**
 * Description of Glasses
 *
 * @author MIS
 */
class Hrd_Models_Claim_ClaimGlasses extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{
    private $employee;
    private $type;
    private $date;
    private $total;
    private $isPay;
    private $lensType;
    private $size;
    private $project;
    private $pt;
    
    private $kiMinus;
    private $kiPlus;
    private $kiSilinder;
    private $kaMinus;
    private $kaPlus;
    private $kaSilinder;
    
    private $claimValue;
    private $percentPengganti;
    private $amountPengganti;
    private $totalTotalKlaim;
    private $saldo;
    private $plafon;
    
    private $tanggalKwitansi;
    private $rekomendasiDokter;
    private $keterangan;

    private $pay_date;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "claimglasses_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['klaimkacamata_id'])){
           $this->setId($x['klaimkacamata_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['tipe_klaim'])){
           $this->setType($x['tipe_klaim']); 
        }
        if(isset ($x['tanggal_klaim'])){
           $this->setDate($x['tanggal_klaim']); 
        }
        if(isset ($x['total_klaim'])){
           $this->setTotal($x['total_klaim']); 
        }
        if(isset ($x['status_bayar'])){
           $this->setIsPay($x['status_bayar']); 
        }
        if(isset ($x['tipe_klaim_lensa'])){
           $this->setLensType($x['tipe_klaim_lensa']); 
        }
        if(isset ($x['ukuran'])){
           $this->setSize($x['ukuran']); 
        }
        if(isset ($x['ki_plus'])){
           $this->setKiPlus($x['ki_plus']); 
        }
        if(isset ($x['ki_minus'])){
           $this->setKiMinus($x['ki_minus']); 
        }
        if(isset ($x['ki_silinder'])){
           $this->setKiSilinder($x['ki_silinder']); 
        }
        if(isset ($x['ka_plus'])){
           $this->setKaPlus($x['ka_plus']); 
        }
        if(isset ($x['ka_minus'])){
           $this->setKaMinus($x['ka_minus']); 
        }
        if(isset ($x['ka_silinder'])){
           $this->setKaSilinder($x['ka_silinder']); 
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
        if(isset ($x['total_total_klaim'])){
           $this->setTotalTotalKlaim($x['total_total_klaim']); 
        }
        if(isset ($x['saldo'])){
           $this->setSaldo($x['saldo']); 
        }
        if(isset ($x['plafon'])){
           $this->setPlafon($x['plafon']); 
        }
        if(isset ($x['tanggal_kwitansi'])){
           $this->setTanggalKwitansi($x['tanggal_kwitansi']); 
        }
        if(isset ($x['rekomendasi_dokter'])){
           $this->setRekomendasiDokter($x['rekomendasi_dokter']); 
        }
        if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }

        if(isset ($x['pay_date'])){
           $this->setPayDate($x['pay_date']); 
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
            'klaimkacamata_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'tipe_klaim'=>$this->getType(),
            'tanggal_klaim'=>$this->getDate(),
            'total_klaim'=>$this->getTotal(),
            'status_bayar'=>$this->getIsPay(),
            'tipe_klaim_lensa'=>$this->getLensType(),
            'ukuran'=>$this->getSize(),
            'ki_plus'=>$this->getKiPlus(),
            'ki_minus'=>$this->getKiMinus(),
            'ki_silinder'=>$this->getKiSilinder(),
            'ka_plus'=>$this->getKaPlus(),
            'ka_minus'=>$this->getKaMinus(),
            'ka_silinder'=>$this->getKaSilinder(),
            'claim_value'=>$this->getClaimValue(),
            'percent_pengganti'=>$this->getPercentPengganti(),
            'amount_pengganti'=>$this->getAmountPengganti(),
            'total_total_klaim'=>$this->getTotalTotalKlaim(),
            'saldo'=>$this->getSaldo(),
            'plafon'=>$this->getPlafon(),
            'tanggal_kwitansi'=>$this->getTanggalKwitansi(),
            'rekomendasi_dokter'=>$this->getRekomendasiDokter(),
            'keterangan'=>$this->getKeterangan(),
            'pay_date'=>$getPayDate
        );
      
        return $x;
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

    

    

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getTotal() {
        return $this->total;
    }

    public function setTotal($total) {
        $this->total = $total;
    }

    public function getIsPay() {
        return $this->isPay;
    }

    public function setIsPay($isPay) {
        $this->isPay = $isPay;
    }
    
    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getLensType() {
        return $this->lensType;
    }

    public function setLensType($lensType) {
        $this->lensType = $lensType;
    }

    public function getSize() {
        return $this->size;
    }

    public function setSize($size) {
        $this->size = $size;
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

    public function getTotalTotalKlaim() {
        return $this->totalTotalKlaim;
    }

    public function getSaldo() {
        return $this->saldo;
    }

    public function getPlafon() {
        return $this->plafon;
    }

    public function getPayDate() {
        return $this->pay_date;
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

    public function setTotalTotalKlaim($totalTotalKlaim) {
        $this->totalTotalKlaim = $totalTotalKlaim;
    }

    public function setSaldo($saldo) {
        $this->saldo = $saldo;
    }

    public function setPlafon($plafon) {
        $this->plafon = $plafon;
    }

    public function setPayDate($pay_date) {
        $this->pay_date = $pay_date;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new \Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new \Box_Models_Master_Pt();
        }
        return $this->pt;
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
    
    protected function getDatefields() {
        return array("tanggal_klaim","tanggal_kwitansi");
    }

    
    public function getKiMinus() {
        return $this->kiMinus;
    }

    public function getKiPlus() {
        return $this->kiPlus;
    }

    public function getKiSilinder() {
        return $this->kiSilinder;
    }

    public function getKaMinus() {
        return $this->kaMinus;
    }

    public function getKaPlus() {
        return $this->kaPlus;
    }

    public function getKaSilinder() {
        return $this->kaSilinder;
    }

    public function setKiMinus($kiMinus) {
        $this->kiMinus = floatval($kiMinus);
    }

    public function setKiPlus($kiPlus) {
        $this->kiPlus = floatval($kiPlus);
    }

    public function setKiSilinder($kiSilinder) {
        $this->kiSilinder = floatval($kiSilinder);
    }

    public function setKaMinus($kaMinus) {
        $this->kaMinus = floatval($kaMinus);
    }

    public function setKaPlus($kaPlus) {
        $this->kaPlus = floatval($kaPlus);
    }

    public function setKaSilinder($kaSilinder) {
        $this->kaSilinder = floatval($kaSilinder);
    }

    public function getTanggalKwitansi() {
        return $this->tanggalKwitansi;
    }

    public function setTanggalKwitansi($tanggalKwitansi) {
        $this->tanggalKwitansi = $tanggalKwitansi;
    }
    
    public function getRekomendasiDokter() {
        return $this->rekomendasiDokter;
    }

    public function setRekomendasiDokter($rekomendasiDokter) {
        $this->rekomendasiDokter = $rekomendasiDokter;
    }
    
    public function getKeterangan() {
        return $this->keterangan;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }






    


    
}

?>
