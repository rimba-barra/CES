<?php

/**
 * Description of BankKPR
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_BankKPR extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $purchaseletter;
    private $bank;
    private $bankCreatedBy;
    private $appraisalPlanDate;
    private $appraisalDate;
    private $appraisalCreatedBy;
    private $berkasMasukDate;
    private $berkasBankDate;
    private $berkasBankCreatedBy;
    private $interviewPlanDate;
    private $interviewDate;
    private $interviewCreatedBy;
    private $interviewPic;
    private $kprAccDate;
    private $kprRealisation;
    private $kprTenor;
    private $kprInterest;
    private $kprCicilan;
    private $kprCreatedBy;
    private $rejectedDate;
    private $nextProcessDate;
    private $rejectCreatedBy;
    private $akadPlanDate;
    private $akadDate;
    private $akadCreatedBy;
    private $isUse;
    private $note;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "plbankkpr_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['purchaseletter_bankkpr_id'])){
           $this->setId($x['purchaseletter_bankkpr_id']); 
        }
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        if(isset ($x['bank_createdby'])){
           $this->setBankCreatedBy($x['bank_createdby']); 
        }
        if(isset ($x['appraisalplan_date'])){
           $this->setAppraisalPlanDate($x['appraisalplan_date']); 
        }
        if(isset ($x['appraisal_date'])){
           $this->setAppraisalDate($x['appraisal_date']); 
        }
        if(isset ($x['appraisal_createdby'])){
           $this->setAppraisalCreatedBy($x['appraisal_createdby']); 
        }
        if(isset ($x['berkasmasuk_date'])){
           $this->setBerkasMasukDate($x['berkasmasuk_date']); 
        }
        if(isset ($x['berkasbank_date'])){
           $this->setBerkasBankDate($x['berkasbank_date']); 
        }
        if(isset ($x['berkasbank_createdby'])){
           $this->setBerkasBankCreatedBy($x['berkasbank_createdby']); 
        }
        if(isset ($x['interviewplan_date'])){
           $this->setInterviewPlanDate($x['interviewplan_date']); 
        }
        if(isset ($x['interview_date'])){
           $this->setInterviewDate($x['interview_date']); 
        }
        if(isset ($x['interview_createdby'])){
           $this->setInterviewCreatedBy($x['interview_createdby']); 
        }
        if(isset ($x['interview_pic'])){
           $this->setInterviewPic($x['interview_pic']); 
        }
        if(isset ($x['kpr_acc_date'])){
           $this->setKprAccDate($x['kpr_acc_date']); 
        }
        if(isset ($x['kpr_realisation'])){
           $this->setKprRealisation($x['kpr_realisation']); 
        }
        if(isset ($x['kpr_tenor'])){
           $this->setKprTenor($x['kpr_tenor']); 
        }
        if(isset ($x['kpr_interest'])){
           $this->setKprInterest($x['kpr_interest']); 
        }
        if(isset ($x['kpr_cicilan'])){
           $this->setKprCicilan($x['kpr_cicilan']); 
        }if(isset ($x['kpr_createdby'])){
           $this->setKprCreatedBy($x['kpr_createdby']); 
        }if(isset ($x['rejected_date'])){
           $this->setRejectedDate($x['rejected_date']); 
        }
        if(isset ($x['akadplan_date'])){
           $this->setAkadPlanDate($x['akadplan_date']); 
        }
        if(isset ($x['akad_date'])){
           $this->setAkadDate($x['akad_date']); 
        }
        if(isset ($x['akad_createdby'])){
           $this->setAkadCreatedBy($x['akad_createdby']); 
        }
        if(isset ($x['is_use'])){
           $this->setIsUse($x['is_use']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        
        
        
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'purchaseletter_bankkpr_id'=>$this->getId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'bank_id'=>$this->getBank(),
            'bank_createdby'=>$this->getBankCreatedBy(),
            'appraisalplan_date'=>$this->getAppraisalPlanDate(),
            'appraisal_date'=>$this->getAppraisalDate(),
            'appraisal_createdby'=>$this->getAppraisalCreatedBy(),
            'berkasmasuk_date'=>$this->getBerkasMasukDate(),
            'berkasbank_date'=>$this->getBerkasBankDate(),
            'berkasbank_createdby'=>$this->getBerkasBankCreatedBy(),
            'interviewplan_date'=>$this->getInterviewPlanDate(),
            'interview_date'=>$this->getInterviewDate(),
            'interview_createdby'=>$this->getInterviewCreatedBy(),
            'interview_pic'=>$this->getInterviewPic(),
            'kpr_acc_date'=>$this->getKprAccDate(),
            'kpr_realisation'=>$this->getKprRealisation(),
            'kpr_tenor'=>$this->getKprTenor(),
            'kpr_interest'=>$this->getKprInterest(),
            'kpr_cicilan'=>$this->getKprCicilan(),
            'kpr_createdby'=>$this->getKprCreatedBy(),
            'rejected_date'=>$this->getRejectedDate(),
            'nextprocess_date'=>$this->getNextProcessDate(),
            'reject_createdby'=>$this->getRejectCreatedBy(),
            'akadplan_date'=>$this->getAkadPlanDate(),
            'akad_date'=>$this->getAkadDate(),
            'akad_createdby'=>$this->getAkadCreatedBy(),
            'is_use'=>$this->getIsUse(),
            'note'=>$this->getNote(),
            
            
        );
        
        return $x;
    }
    
     protected function getDatefields() {
        return array("appraisalplan_date","appraisal_date","berkasmasuk_date","berkasbank_date",
            "interviewplan_date","interview_date","rejected_date","nextprocess_date","akadplan_date","akad_date","kpr_acc_date");
    }

    
    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        }
        return $this->purchaseletter;
    }

    public function getBank() {
        return $this->bank;
    }

    public function getBankCreatedBy() {
        return $this->bankCreatedBy;
    }

    public function getAppraisalPlanDate() {
        return $this->appraisalPlanDate;
    }

    public function getAppraisalDate() {
        return $this->appraisalDate;
    }

    public function getAppraisalCreatedBy() {
        return $this->appraisalCreatedBy;
    }

    public function getInterviewPlanDate() {
        return $this->interviewPlanDate;
    }

    public function getInterviewDate() {
        return $this->interviewDate;
    }

    public function getInterviewCreatedBy() {
        return $this->interviewCreatedBy;
    }

    public function getInterviewPic() {
        return $this->interviewPic;
    }

    public function getKprAccDate() {
        return $this->kprAccDate;
    }

    public function getKprRealisation() {
        return $this->kprRealisation;
    }

    public function getKprTenor() {
        return $this->kprTenor;
    }

    public function getKprInterest() {
        return $this->kprInterest;
    }

    public function getKprCicilan() {
        return $this->kprCicilan;
    }

    public function getKprCreatedBy() {
        return $this->kprCreatedBy;
    }

    public function getRejectedDate() {
        return $this->rejectedDate;
    }

    public function getNextProcessDate() {
        return $this->nextProcessDate;
    }

    public function getRejectCreatedBy() {
        return $this->rejectCreatedBy;
    }

    public function getAkadPlanDate() {
        return $this->akadPlanDate;
    }

    public function getAkadDate() {
        return $this->akadDate;
    }

    public function getAkadCreatedBy() {
        return $this->akadCreatedBy;
    }

    public function getIsUse() {
        return $this->isUse;
    }

    public function getNote() {
        return $this->note;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setBank($bank) {
        $this->bank = $bank;
    }

    public function setBankCreatedBy($bankCreatedBy) {
        $this->bankCreatedBy = $bankCreatedBy;
    }

    public function setAppraisalPlanDate($appraisalPlanDate) {
        $this->appraisalPlanDate = $appraisalPlanDate;
    }

    public function setAppraisalDate($appraisalDate) {
        $this->appraisalDate = $appraisalDate;
    }

    public function setAppraisalCreatedBy($appraisalCreatedBy) {
        $this->appraisalCreatedBy = $appraisalCreatedBy;
    }

    public function setInterviewPlanDate($interviewPlanDate) {
        $this->interviewPlanDate = $interviewPlanDate;
    }

    public function setInterviewDate($interviewDate) {
        $this->interviewDate = $interviewDate;
    }

    public function setInterviewCreatedBy($interviewCreatedBy) {
        $this->interviewCreatedBy = $interviewCreatedBy;
    }

    public function setInterviewPic($interviewPic) {
        $this->interviewPic = $interviewPic;
    }

    public function setKprAccDate($kprAccDate) {
        $this->kprAccDate = $kprAccDate;
    }

    public function setKprRealisation($kprRealisation) {
        $this->kprRealisation = $kprRealisation;
    }

    public function setKprTenor($kprTenor) {
        $this->kprTenor = $kprTenor;
    }

    public function setKprInterest($kprInterest) {
        $this->kprInterest = $kprInterest;
    }

    public function setKprCicilan($kprCicilan) {
        $this->kprCicilan = $kprCicilan;
    }

    public function setKprCreatedBy($kprCreatedBy) {
        $this->kprCreatedBy = $kprCreatedBy;
    }

    public function setRejectedDate($rejectedDate) {
        $this->rejectedDate = $rejectedDate;
    }

    public function setNextProcessDate($nextProcessDate) {
        $this->nextProcessDate = $nextProcessDate;
    }

    public function setRejectCreatedBy($rejectCreatedBy) {
        $this->rejectCreatedBy = $rejectCreatedBy;
    }

    public function setAkadPlanDate($akadPlanDate) {
        $this->akadPlanDate = $akadPlanDate;
    }

    public function setAkadDate($akadDate) {
        $this->akadDate = $akadDate;
    }

    public function setAkadCreatedBy($akadCreatedBy) {
        $this->akadCreatedBy = $akadCreatedBy;
    }

    public function setIsUse($isUse) {
        $this->isUse = $isUse;
    }

    public function setNote($note) {
        $this->note = $note;
    }
    
    public function getBerkasMasukDate() {
        return $this->berkasMasukDate;
    }

    public function getBerkasBankDate() {
        return $this->berkasBankDate;
    }

    public function getBerkasBankCreatedBy() {
        return $this->berkasBankCreatedBy;
    }

    public function setBerkasMasukDate($berkasMasukDate) {
        $this->berkasMasukDate = $berkasMasukDate;
    }

    public function setBerkasBankDate($berkasBankDate) {
        $this->berkasBankDate = $berkasBankDate;
    }

    public function setBerkasBankCreatedBy($berkasBankCreatedBy) {
        $this->berkasBankCreatedBy = $berkasBankCreatedBy;
    }

    
        
    
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    
    
   

}
