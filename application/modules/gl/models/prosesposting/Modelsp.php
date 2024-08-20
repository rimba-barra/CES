<?php

class Gl_Models_Prosesposting_Modelsp extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_summary';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
    }
    
    public function getendofpostingdate(){
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId()           
        );
        $result = $this->execSP3('sp_journal_getendofposting', $data);
        return $result[0][0];
    }
    
     public function customefromquery($query) {
        $result = $this->execSP3('sp_custome_query', array(
            $query
        ));
        return $result;
    }

    public function deletejournallr($journal_id) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $journal_id,
            1,
            $this->session->getUserId()
        );
        $this->execSP3('sp_journal_delete', $data);
    }
    
    public function getprefixbycode($code){
         $result = $this->execSP3('sp_kodeprefix_getbyname', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $code,
        ));
         
         return $result[0][0];
        
    } 
    
    public function getsummaryaccounttemplete($from,$until){
          $result = $this->execSP3('sp_summary_gettmpinstallment', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $from,
            $until
        ));
          
        return $result[1][0]['amountall'];
        
    }
    public function getcoarl() {
        //$project_id = $this->session->getCurrentProjectId();
        //$pt_id = $this->session->getCurrentPtId();
        //echo "sp_setlaprugilaba_getcoalr,$project_id,$pt_id";
        
        $result = $this->execSP3('sp_setlaprugilaba_getcoalr', array($this->session->getCurrentProjectId(), $this->session->getCurrentPtId()));
        return $result[0][0];
    }

    public function update_reporttmp($coa, $array) {
        $this->execSP3('sp_summary_tmpinstallmentupdate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa,
            $array['net_summary']
        ));
    }

    public function insert_reporttmp($array) {
        $this->execSP3('sp_summary_tmpinstallmentcreate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $array['rptformat_id'],
            $array['sort'],
            $array['report_level'],
            $array['level'],
            $array['coa_id'],
            $array['coa'],
            $array['name'],
            $array['flag'],
            $array['type'],
            0
        ));
    }

    public function getrepotinstallment() {
        $result = $this->execSP3('sp_summary_getreportinstallment', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            'L',
            3,
        ));

        return $result[0];
    }

    public function getsumnet($fromdate, $untildate) {
        $result = $this->execSP3('sp_summary_sumnet', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $fromdate,
            $untildate
        ));
        return $result[0];
    }
    
     public function setuptmpaccount() {
        $this->execSP3('sp_summary_setaccount', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
        ));
    }
    public function checktmpaccount($coa){
        $result = $this->execSP3('sp_summary_chekaccount', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        ));
        
        return $result;
        
    }
    
    public function updateaccount($id,$record){
         $this->execSP3('sp_summary_updateaccount', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $id,
            $record['debit'],
            $record['credit'],
            $record['net'],
        ));
        
    }
    public function insertaccount($record){
         $this->execSP3('sp_summary_insertaccount', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record['coa'],
            $record['debit'],
            $record['credit'],
            $record['net'],
        ));
        
    }

    public function setuptemporary() {
        $this->execSP3('sp_summary_settmpinstallstatement', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
        ));
    }

    public function getjournalbyvoucherdate($date) {
        $result = $this->execSP3('sp_journal_getbyvoucherdate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            date('Y-m-d', strtotime($date)),
        ));

        return $result[0];
    }
    public function getjournaldetailbydate($date) {
        $result = $this->execSP3('sp_journaldetail_getbydate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date
            
        ));

        return $result;
    }

    public function getjournaldetailbyvoucherdate($date, $flag) {
        $result = $this->execSP3('sp_journaldetail_getbyvoucherdate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date,
            $flag
        ));

        return $result;
    }

    public function checkData($firstdate, $lastdate) {
        $result = $this->execSP3('sp_journal_checktransaction', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate
                )
        );
        return $result;
    }

    public function postingNewgenerationLR($month, $year) {
        $result = $this->execSP3('sp_summaryprofitlossforkp_create', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $month,
            $year
                )
        );
        return $result;
    }

    public function postingNewgenerationLRthread($month, $year) {
        $result = $this->getrawSP('sp_summaryprofitlossforkp_create', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $month,
            $year
                )
        );
        return $result;
    }

    public function postingNewgeneration($firstdate, $lastdate) {
        $result = $this->execSP3('sp_summaryfullforkp_update', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate,
            $this->session->getUserId()
                )
        );
        return $result;
    }

    public function postingNewgenerationthread($firstdate, $lastdate) {
        $result = $this->getrawSP('sp_summaryfullforkp_update', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate,
            $this->session->getUserId()
                )
        );
        return $result;
    }

    public function postingflagNewgeneration($firstdate, $lastdate) {
        $result = $this->execSP3('sp_journal_posting', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate
                )
        );
        return $result;
    }

    public function postingflagNewgenerationthread($firstdate, $lastdate) {

        $result = $this->getrawSP('sp_journal_posting', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate
                )
        );
        return $result;
    }


    public function checkTemplate() {
        /* untuk proses posting berpengaruh terhadap template setup incomestatementg
          berdasarkan meeting menggunakan template report level 3
         */
        $result = $this->execSP3('sp_summary_checktemplatereport', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            'L',
            3
                )
        );
        return $result;
    }

    public function CreateTmpSetParent() {
        $this->execSP3('sp_summary_setparentcreate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
        ));
    }

    public function Destroydata($firstdate, $lastdate) {
        $this->execSP3('sp_summary_destroy', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate,
            $this->session->getUserId()
                )
        );
    }

    public function setflag($journal_id) {
        $this->execSP3('sp_journal_updateflag', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $journal_id
        ));
    }

    public function getcoa($coa) {
        $result = $this->execSP3('sp_coa_getcoa', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        ));     
      
        return $result;
    }

    public function checkCOAtemplateSummary($coa, $date) {
        $result = $this->execSP3('sp_summary_checktmptemplate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date,
            $coa
                )
        );
        return $result[0][0]['counterdata'];
    }

    public function insertTemplateSummary($record) {
        $this->execSP3('sp_summary_tmptemplatecreate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record['coa_id'],
            $record['coa'],
            $record['parent'],
            $record['level'],
            $record['voucherdate'],
            $record['debet'],
            $record['credit'],
            $record['net']
                )
        );
    }

    public function getdataTemplateSummary($coa, $date) {
        $result = $this->execSP3('sp_summary_tmptemplategetsummary', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date,
            $coa
                )
        );
        return $result;
    }

    public function readtmptemplate($date) {
        $result = $this->execSP3('sp_summary_tmptemplatereadall', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date
        ));
        return $result[0];
    }

    public function checkdatasummary($coa, $date) {
        $result = $this->execSP3('sp_journal_checksummary', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date,
            $coa
        ));
        return $result[0][0]['counterdata'];
    }

    public function createsummary($record) {
        $this->execSP3('sp_summary_create', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record['coa_id'],
            $record['coa'],
            $record['voucherdate'],
            $record['debit_summmary'],
            $record['credit_summmary'],
            $record['net_summmary'],
            $this->session->getUserId()
        ));
    }

    public function updateTemplateAmount($record) {
        $this->execSP3('sp_summary_tmptemplateupdateamount', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record['summaryid'],
            $record['debet'],
            $record['credit'],
            $record['net']
                )
        );
    }

    public function updatesummary($record) {
        $this->execSP3('sp_summary_update', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record['summaryid'],
            $record['coa_id'],
            $record['coa'],
            $record['voucherdate'],
            $record['debit_summmary'],
            $record['credit_summmary'],
            $record['net_summmary'],
            $this->session->getUserId()
        ));
    }

    public function getsummaryid($coa, $date) {
        $result = $this->execSP3('sp_journal_getsummary', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            date('Y-m-d', strtotime($date)),
            $coa
        ));
        return $result[0][0]['summary_id'];
    }

    public function getsummarybyid($summaryid) {
        $result = $this->execSP3('sp_summary_getbyid', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $summaryid
        ));
        return $result[0][0];
    }

    public function getdataSetParent($coa, $date) {
        $result = $this->execSP3('sp_summary_tmpgetsummary', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date,
            $coa
                )
        );
        return $result[0][0];
    }

    public function checkSetParent($coa, $date) {
        $result = $this->execSP3('sp_summary_checktmp', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date,
            $coa
                )
        );
        return $result[0][0]['counterdata'];
    }

    public function getcoafortmp($coa) {
        $result = $this->execSP3('sp_coa_getbycoa', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        ));

        return $result[0];
    }

    public function readtmpsummary($date) {
        $result = $this->execSP3('sp_summary_tmpreadall', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date
        ));
        return $result[0];
    }

    public function readtmptemplatesummary($date) {
        $result = $this->execSP3('sp_summary_tmptemplatereadall', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date
        ));
        return $result[0];
    }

    public function createtemplatesummary() {
        $this->execSP3('sp_summary_settmptemplate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
        ));
    }

    public function checkdatatmpsummary($coa, $date) {
        $result = $this->execSP3('sp_summary_checktmp', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            date('Y-m-d', strtotime($date)),
            $coa
        ));
        return $result[0][0]['counterdata'];
    }

    public function gettmpsummaryid($coa, $date) {
        $result = $this->execSP3('sp_summary_tmpgetsummary', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            date('Y-m-d', strtotime($date)),
            $coa
        ));
        return $result[0][0]['summary_id'];
    }

    public function gettmpsummarybyid($summaryid) {
        $result = $this->execSP3('sp_summary_tmpgetbyid', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $summaryid
        ));
        return $result[0][0];
    }

    public function create_tmp($record) {
        $this->execSP3('sp_summary_tmpcreate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record["coa_id"],
            $record["coa"],
            $record["parent"],
            $record["level"],
            $record["voucherdate"],
            $record["debit_summary"],
            $record["credit_summary"],
            $record["net_summary"],
                )
        );
    }

    public function update_tmp($record) {
        $this->execSP3('sp_summary_tmpupdate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $record["summary_id"],
            $record["coa_id"],
            $record["coa"],
            $record["parent"],
            $record["level"],
            $record["voucherdate"],
            $record["debit_summary"],
            $record["credit_summary"],
            $record["net_summary"],
        ));
    }

}
