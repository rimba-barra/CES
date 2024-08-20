<?php

/**
 * Description of SpkTransaction
 *
 * @author MIS
 */
class Erems_Models_Spk_SpkTransaction extends Erems_Models_Spk_Spk implements Erems_Box_Kouti_Remora,  Erems_Box_Models_App_Hermes_Nomorable,  Erems_Box_Delien_DelimiterCandidate,  Erems_Box_Models_App_Hermes_HasDetail{
    private $progress;
    private $contractor;
    private $spkType;
    private $durasi;
    private $timeStart;
    private $timeEnd;
    private $jobFee;
    private $jobTitle;
    private $description;
    private $spkDetail;
    private $DCResult;
    private $status;
    private $serahTerimaDate1;
    private $serahTerimaDate2;
    private $serahTerimaDate3;
    private $serahTerimaNote1;
    private $serahTerimaNote2;
    private $serahTerimaNote3;
    
    function getSerahTerimaDate3() {
        return $this->serahTerimaDate3;
    }

    function getSerahTerimaNote3() {
        return $this->serahTerimaNote3;
    }

    function setSerahTerimaDate3($serahTerimaDate3) {
        $this->serahTerimaDate3 = $serahTerimaDate3;
    }

    function setSerahTerimaNote3($serahTerimaNote3) {
        $this->serahTerimaNote3 = $serahTerimaNote3;
    }

    
     /* start added by ahmad riadi 04-01-2017 */
    private $statusdoc;
    private $manualnumber;
     /* end added by ahmad riadi 04-01-2017 */			


    
    public function __construct() {
        parent::__construct();
        $this->contractor = new Erems_Models_Master_Contractor();
        $this->spkType = new Erems_Models_Master_SpkType();
        $this->status = new Erems_Models_Spk_StatusSpk();
        $this->spkDetail = array();
    }


    /* start added by ahmad riadi 04-01-2017 */
     public function setStatusdoc($param) {
        if(strlen($param)>0){
            $doc = "manual";
            $this->setManualnumber($param);
        }else{
            $doc = "generator";
        }        
        $this->statusdoc = $doc; 
    }
    public function getStatusdoc() {        
         return $this->statusdoc;        
    }   
    public function setManualnumber($param) {        
         $this->manualnumber =$param;        
    }    
    public function getManualnumber() {        
         return $this->manualnumber;        
    }
    /* end added by ahmad riadi 04-01-2017 */    
    		
	

    
    public function getProgress() {
        return $this->progress;
    }

    public function setProgress($progress) {
        $this->progress = (double)$progress;
    }

    public function getContractor() {
       return $this->contractor; 
    }

    public function setContractor(Erems_Models_Master_Contractor $contractor) {
        $this->contractor = $contractor;
    }

    public function getSpkType() {
        return $this->spkType;
    }

    public function setSpkType(Erems_Models_Master_SpkType $spkType) {
        $this->spkType = $spkType;
    }

    public function getDurasi() {
        return $this->durasi;
    }

    public function setDurasi($durasi) {
        $this->durasi = (int)$durasi;
    }

    public function getTimeStart() {
        return $this->timeStart;
    }

    public function setTimeStart($timeStart) {
        $this->timeStart = $timeStart;
    }

    public function getTimeEnd() {
        return $this->timeEnd;
    }

    public function setTimeEnd($timeEnd) {
       // $this->timeEnd = $timeEnd;
        $this->timeEnd = $timeEnd;
    }

    public function getJobFee() {
        return $this->jobFee;
    }

    public function setJobFee($jobFee) {
        $this->jobFee = (double)$jobFee;
    }

    public function getJobTitle() {
        return $this->jobTitle;
    }

    public function setJobTitle($jobTitle) {
        $this->jobTitle = $jobTitle;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getStatus() {
        if(!$this->status){
            $this->status = new Erems_Models_Spk_StatusSpk();
        }
        return $this->status;
    }

    public function setStatus(Erems_Models_Spk_StatusSpk $status) {
        $this->status = $status;
    }

        
    public function addSpkDetail(Erems_Models_Spk_SpkDetail $spkDetail){
        $this->spkDetail[] = $spkDetail;
    }
    
    public function getSpkDetail($posisi){
        if(key_exists($posisi,$this->spkDetail)){
            return $this->spkDetail[$posisi];
        }
        
    }
    
    public function getSerahTerimaDate1() {
        return $this->serahTerimaDate1;
    }

    public function getSerahTerimaDate2() {
        return $this->serahTerimaDate2;
    }

    public function getSerahTerimaNote1() {
        return $this->serahTerimaNote1;
    }

    public function getSerahTerimaNote2() {
        return $this->serahTerimaNote2;
    }

    public function setSerahTerimaDate1($serahTerimaDate1) {
        $this->serahTerimaDate1 = $serahTerimaDate1;
    }

    public function setSerahTerimaDate2($serahTerimaDate2) {
        $this->serahTerimaDate2 = $serahTerimaDate2;
    }

    public function setSerahTerimaNote1($serahTerimaNote1) {
        $this->serahTerimaNote1 = $serahTerimaNote1;
    }

    public function setSerahTerimaNote2($serahTerimaNote2) {
        $this->serahTerimaNote2 = $serahTerimaNote2;
    }

        
    public function setArrayTable($dataArray=NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;

	/* start added by ahmad riadi 04-01-2017 */
        if(isset ($x['spk_no'])){
           $this->setStatusdoc($x['spk_no']); 
        }
        /* end added by ahmad riadi 04-01-2017 */


        if(isset ($x['progress'])){
           $this->setProgress($x['progress']); 
        }
        if(isset ($x['time_duration'])){
           $this->setDurasi($x['time_duration']); 
        }
        if(isset ($x['started'])){
           $this->setTimeStart($x['started']); 
        }
        if(isset ($x['ended'])){
           $this->setTimeEnd($x['ended']); 
        }
        if(isset ($x['job_fee'])){
           $this->setJobFee($x['job_fee']); 
        }
        if(isset ($x['job_title'])){
           $this->setJobTitle($x['job_title']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['serahterima_date1'])){
           $this->setSerahTerimaDate1($x['serahterima_date1']); 
        }
        if(isset ($x['serahterima_date2'])){
           $this->setSerahTerimaDate2($x['serahterima_date2']); 
        }
        if(isset ($x['serahterima_date3'])){
           $this->setSerahTerimaDate3($x['serahterima_date3']); 
        }
        if(isset ($x['serahterima_note1'])){
           $this->setSerahTerimaNote1($x['serahterima_note1']); 
        }
        if(isset ($x['serahterima_note2'])){
           $this->setSerahTerimaNote2($x['serahterima_note2']); 
        }
        if(isset ($x['serahterima_note3'])){
           $this->setSerahTerimaNote3($x['serahterima_note3']); 
        }
        if(isset ($x['Modion'])){
           $this->setModiOn($x['Modion']); 
        }
        
        $this->getStatus()->setArrayTable($x);
        
        unset($x);
    }
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            "progress"=>$this->getProgress(),
            "time_duration"=>$this->getDurasi(),
            "started"=>$this->getTimeStart(),
            "ended"=>$this->getTimeEnd(),
            "job_fee"=>$this->getJobFee(),
            "job_title"=>$this->getJobTitle(),
            "description"=>$this->getDescription(),
            "Modion"=>$this->getModiOn(),
            "serahterima_date1"=>$this->getSerahTerimaDate1(),
             "serahterima_date2"=>$this->getSerahTerimaDate2(),
             "serahterima_date3"=>$this->getSerahTerimaDate3(),
             "serahterima_note1"=>$this->getSerahTerimaNote1(),
             "serahterima_note2"=>$this->getSerahTerimaNote2(),
             "serahterima_note3"=>$this->getSerahTerimaNote3()
        );
        $x = array_merge($x,$y);
       
        $x = array_merge($x,$this->getStatus()->getArrayTable());
        
       
        
        return $x;
                
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
       return array($this->getContractor(),$this->getSpkType());
      
    }

    public function getDCArray() {
        return $this->spkDetail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }

    public function getPrefixNumber() {
        return "SPKDOC";
    }

    public function setDocumentNumber($nomorResult) {
        $this->setNomor($nomorResult);
    }

    public function addDetailObject($detailObject) {
        $this->addSpkDetail($detailObject);
    }

    public function getDetailObject() {
        return new Erems_Models_Spk_SpkDetail();
    }

    public function getIndexArName() {
        return "detail";
    }
    
    protected function getDatefields() {
        return array("status_change_date","started","ended","spk_date");
    }
    
    protected function getDecimalfields() {
        return array("job_fee");
    }


    
    


    
}

?>
