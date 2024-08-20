<?php

class Gl_Models_Query_Bungashl extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    protected $_amount;

    function init() {
        //start setup
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        //end setup
        //start paramter
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_active = 1;
        $this->_delete = 0;
        $this->_flag_item = 'I';
        $this->_flag_total = 'T';
        //end parameter    
        //start table from db
        $this->_m_coalr = 'm_coalr';
        $this->_m_coa = 'm_coa';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_td_jurnalsubdetail = 'td_jurnalsubdetail';
        $this->_m_prefix = 'm_prefix';
        $this->_m_kelsub = 'm_kelsub';
        $this->_m_subgl = 'm_subgl';
        $this->_rpt_bungashl = 'tmp_rptbungashl';
        //end table from db
        //start create temporary for report 
        $this->_tmp_createbungashl = '##tmp_createbungashl_' . $this->_user_id;
        $this->_tmp_totalamount = '##tmp_totalamountshl_' . $this->_user_id;
        $this->_tmp_totaldebet = '##tmp_totaldebetshl_' . $this->_user_id;
        $this->_tmp_totalcredit = '##tmp_totalcreditshl_' . $this->_user_id;
        $this->_tmp_totalinterest = '##tmp_totalinterestshl_' . $this->_user_id;
        $this->_tmp_uniontotal = '##tmp_uniontotalshl_' . $this->_user_id;
        $this->_tmp_beginingbalance = '##tmp_beginingbalanceshl_' . $this->_user_id;
        $this->_tmp_endbalance = '##tmp_endbalanceshl_' . $this->_user_id;
        $this->_tmp_totaljournaldetail = '##tmp_totaljournaldetail' . $this->_user_id;
        $this->_tmp_sumjournaldetail = '##tmp_sumjournaldetail' . $this->_user_id;
        $this->_tmp_rpt = '##tmp_rptbalanceshl_' . $this->_user_id;
        $this->_tmp = '##tmp_' . $this->_user_id;
        //end create temporary for report                
    }

    public function getcoalr() {
        $sql = "SELECT * FROM $this->_m_coalr 
                WHERE 
                    project_id=$this->_project_id
                    AND pt_id =$this->_pt_id 
                    AND active = 1
                    AND deleted = 0
                    
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    public function create_tmpbungashl() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_createbungashl'') IS NOT NULL DROP TABLE $this->_tmp_createbungashl
                 CREATE TABLE $this->_tmp_createbungashl (
                        bungashl_id int identity primary key,			
                        project_id int,
                        pt_id int,
                        prefix_id int,
                        coa_id int,
                        kelsub_id int,
                        subgl_id int,
                        user_id int,
                        flag varchar(1),
                        prefix varchar(20),
                        voucher_no varchar(20),   
                        voucher_date date, 
                        monthdata varchar(2),  
                        endofmonthdate date,                          
                        reportdate date,                          
                        coa varchar(20),
                        name varchar(100),                       
                        kelsub varchar(2),
                        code varchar(20),
                        typecoa varchar(2),
                        typetrx varchar(2),
                        amountdata money,
                        amountsub money,
                        sumday int,
                        interest decimal(5,2),
                        tenor int,
                        amountinterest money,
                        description varchar(150),
                        addby int,
                        addon datetime,
                        modiby int,
                        modion datetime
                     )     
                
            ";
        $this->_model->customefromquery($sql);
    }

    public function count_tmpbungashl() {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_rpt_bungashl";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }

    public function count_tmpbungashlbyuser() {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_rpt_bungashl
                WHERE
                project_id = $this->_project_id 
                AND pt_id =$this->_pt_id 
                AND addby = $this->_user_id
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }

    public function truncate_tmpbungashl() {
        $sql = "TRUNCATE TABLE $this->_rpt_bungashl ";
        $this->_model->customefromquery($sql);
    }

    public function delete_tmpbungashl() {
        $sql = "DELETE FROM $this->_rpt_bungashl 
                WHERE
                project_id = $this->_project_id 
                AND pt_id =$this->_pt_id 
                AND addby = $this->_user_id
                ";
        $this->_model->customefromquery($sql);
    }

    public function getjournalaccountshl($coa, $fromdate, $untildate) {
        $sql = "
        SELECT
		 a.project_id,a.pt_id,d.journal_id,b.journaldetail_id,b.journalsubdetail_id,a.coa_id,a.kelsub_id,b.subgl_id,e.prefix_id,		 
		 e.prefix,d.voucher_no,voucher_date,a.coa,c.name as coaname,c.type as coatype,a.type as typetrx,a.kelsub,a.keterangan as ketaccount,		
		 b.code,b.code1,b.code2,b.code3,b.code4,b.keterangan  as ketsub,
		 d.debit_total,d.credit_total,a.amount as amountaccount,b.amount as amountsub,
                 case when c.type=''C'' then coalesce(a.amount,0) else -(coalesce(a.amount,0)) end AS amountaccbaseaccount,
                 case when a.type=''C'' then coalesce(b.amount,0) else -(coalesce(b.amount,0)) end AS amountsubbaseaccount,
                 d.is_post as statuspostingvoucher,a.is_post as statuspostingaccount,b.is_post as statuspostingsub
                 
        FROM $this->_td_jurnaldetail a
            
        LEFT JOIN $this->_td_jurnalsubdetail b ON a.journaldetail_id = b.journaldetail_id
        LEFT JOIN $this->_th_jurnal d ON d.journal_id = a.journal_id
        INNER JOIN $this->_m_coa c ON 
                        a.coa = c.coa
                        AND a.project_id = c.project_id
                        AND a.pt_id = c.pt_id
        INNER JOIN $this->_m_prefix e ON 
                        d.prefix_id = e.prefix_id
                        AND d.project_id = e.project_id
                        AND d.pt_id = e.pt_id
        WHERE
            a.active = 1
            AND a.deleted = 0
            AND a.project_id = $this->_project_id 
            AND a.pt_id =$this->_pt_id 
            AND a.coa =''$coa'' 
            AND d.voucher_date >= ''$fromdate'' AND   d.voucher_date <= ''$untildate''
            AND d.voucher_no NOT LIKE ''%MJB%''    
            ORDER BY a.kelsub,b.code,d.voucher_date  ASC
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    function check_tmpbungashl($voucherno) {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_rpt_bungashl 
                WHERE 
                    voucher_no=''$voucherno'' 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND addby = $this->_user_id    
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }

    function check_prefixmjb() {
        $sql = "SELECT COUNT(prefix_id) as counterdata FROM $this->_m_prefix
                WHERE 
                    prefix=''MJB'' 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id                         
                    AND active =1 
                    AND deleted =0 
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        if ($counter < 1) {
            $data = array(
                $this->_project_id,
                $this->_pt_id,
                'MJB',
                'BUNGA SHL LOAN',
                '0',
                '0',
                '0',
                $this->_user_id,
                '1'
            );
            $this->execSP3('sp_kodeprefix_create', $data);
        }

        $sql2 = "SELECT *  FROM $this->_m_prefix
                WHERE 
                    prefix=''MJB'' 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
        $return = $this->_model->customefromquery($sql2);
        return $return[0][0];
    }

    function check_vouchermjb($voucher) {
        $sql = "SELECT COUNT(journal_id) as counterdata FROM $this->_th_jurnal
                WHERE 
                    voucher_no=''$voucher'' 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }

    function insert_tmpbungashl($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];

        $sql = "
                 INSERT INTO $this->_rpt_bungashl ($key) VALUES ($values)  
               ";

        $this->_model->customefromquery($sql);
    }

    function getcoabycoa($coa) {
        $sql = "
                SELECT  TOP 1 * FROM 
                $this->_m_coa 
                WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND coa = ''$coa'' 
                    AND deleted=0
                    AND active =1
               ";

        $result = $this->_model->customefromquery($sql);
        return $result[0][0];
    }

    function getsubglbycode($code) {
        $sql = "
                SELECT  TOP 1 * FROM 
                $this->_m_subgl 
                WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND code = ''$code'' 
                    AND deleted=0
                    AND active =1
                ORDER BY subgl_id DESC    
               ";

        $result = $this->_model->customefromquery($sql);
        return $result[0][0];
    }

    function getsubglbyid($id) {
        $sql = "
                SELECT  TOP 1 * FROM 
                $this->_m_subgl 
                WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND subgl_id =$id 
                    AND deleted=0
                    AND active =1
               ";
        $result = $this->_model->customefromquery($sql);
        return $result[0][0];
    }

    function getkelsubbykelsub($kelsub) {
        $sql = "
                SELECT  TOP 1 * FROM 
                $this->_m_kelsub 
                WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND kelsub = ''$kelsub'' 
                    AND deleted=0
                    AND active =1
               ";

        $result = $this->_model->customefromquery($sql);
        return $result[0][0];
    }

    function getlastdatabungashl() {
        $sql = "
                SELECT  TOP 1 * FROM 
                $this->_rpt_bungashl 
                WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND addby = $this->_user_id   
                ORDER BY voucher_date DESC        
               ";

        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    public function settotalamount() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_totalamount'') IS NOT NULL DROP TABLE $this->_tmp_totalamount
                    SELECT * INTO $this->_tmp_totalamount FROM
                    (  
                        SELECT project_id,pt_id,addby,kelsub,code,endofmonthdate as voucher_date,endofmonthdate,sum(coalesce(amountdata,0)) as totalamount
                        FROM $this->_rpt_bungashl
                        WHERE 
                            project_id = $this->_project_id
                            AND pt_id = $this->_pt_id   
                            AND addby = $this->_user_id    
                        GROUP BY project_id,pt_id,addby,kelsub,code,endofmonthdate  
                                             
                    ) AS DATA
             ";


        $this->_model->customefromquery($sql);
    }

    public function settotaldebet() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_totaldebet'') IS NOT NULL DROP TABLE $this->_tmp_totaldebet
                    SELECT * INTO $this->_tmp_totaldebet FROM
                    (  
                        SELECT project_id,pt_id,addby,kelsub,code,endofmonthdate as voucher_date,endofmonthdate,sum(coalesce(amountdata,0)) as totaldebet
                        FROM $this->_rpt_bungashl
                        WHERE 
                            project_id = $this->_project_id
                            AND pt_id = $this->_pt_id
                            AND addby = $this->_user_id   
                            AND typetrx=''D'' 
                        GROUP BY project_id,pt_id,addby,kelsub,code,endofmonthdate  
                                             
                    ) AS DATA
             ";
        $this->_model->customefromquery($sql);
    }

    public function settotalcredit() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_totalcredit'') IS NOT NULL DROP TABLE $this->_tmp_totalcredit
                    SELECT * INTO $this->_tmp_totalcredit FROM
                    (  
                        SELECT project_id,pt_id,addby,kelsub,code,endofmonthdate as voucher_date,endofmonthdate,sum(coalesce(amountdata,0)) as totalcredit
                        FROM $this->_rpt_bungashl
                        WHERE 
                            project_id = $this->_project_id
                            AND pt_id = $this->_pt_id
                            AND addby = $this->_user_id
                            AND typetrx=''C'' 
                            AND flag NOT IN (''H'')
                        GROUP BY project_id,pt_id,addby,kelsub,code,endofmonthdate  
                                             
                    ) AS DATA
             ";
        $this->_model->customefromquery($sql);
    }

    public function settotalinterest() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_totalinterest'') IS NOT NULL DROP TABLE $this->_tmp_totalinterest
                    SELECT * INTO $this->_tmp_totalinterest FROM
                    (  
                        SELECT project_id,pt_id,addby,kelsub,code,endofmonthdate as voucher_date,endofmonthdate,sum(coalesce(amountinterest,0)) as totalinterest
                        FROM $this->_rpt_bungashl
                        WHERE 
                            project_id = $this->_project_id
                            AND pt_id = $this->_pt_id
                            AND addby = $this->_user_id
                        GROUP BY project_id,pt_id,addby,kelsub,code,endofmonthdate  
                                             
                    ) AS DATA
             ";
        $this->_model->customefromquery($sql);
    }

    public function setendbalance() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_endbalance'') IS NOT NULL DROP TABLE $this->_tmp_endbalance
                    SELECT * INTO $this->_tmp_endbalance FROM
                    (  
                        SELECT 
                                a.*,
                                b.totalinterest,
                                coalesce(a.totalamount,0)+coalesce(b.totalinterest,0) as amountendbalance
                        FROM $this->_tmp_totalamount a
                        LEFT JOIN $this->_tmp_totalinterest b ON 
                                                                    a.project_id = b.project_id
                                                                AND a.pt_id = b.pt_id
                                                                AND a.addby = b.addby	
                                                                AND a.kelsub = b.kelsub	
                                                                AND a.code = b.code	   
                                                                AND a.endofmonthdate = b.endofmonthdate	   
                        WHERE 
                            a.project_id = $this->_project_id
                            AND a.pt_id = $this->_pt_id
                            AND a.addby = $this->_user_id
                                

                    ) AS DATA
             ";

        $this->_model->customefromquery($sql);
    }

    public function uniontotalall($endofmonthdate) {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_uniontotal'') IS NOT NULL DROP TABLE $this->_tmp_uniontotal
                    SELECT * INTO $this->_tmp_uniontotal FROM
                    (  
                        SELECT a.*,
                                coalesce(b.totaldebet,0) as totaldebet,
                                coalesce(c.totalcredit,0) as totalcredit,
                                coalesce(d.totalinterest,0) as totalinterest,
                                coalesce(a.totalamount,0)+coalesce(d.totalinterest,0) as amountendbalance
                        FROM $this->_tmp_totalamount a
                        LEFT JOIN $this->_tmp_totaldebet b ON 
                                                                    a.project_id = b.project_id
                                                                AND a.pt_id = b.pt_id
                                                                AND a.addby = b.addby	
                                                                AND a.kelsub = b.kelsub	
                                                                AND a.code = b.code
                                                                AND a.endofmonthdate = b.endofmonthdate
                                                                
                        LEFT JOIN $this->_tmp_totalcredit c ON  
                                                                    a.project_id =  c.project_id
                                                                AND a.pt_id = c.pt_id
                                                                AND a.addby = c.addby	
                                                                AND a.kelsub = c.kelsub	
                                                                AND a.code = c.code
                                                                AND a.endofmonthdate = c.endofmonthdate
                            
                                
                        LEFT JOIN $this->_tmp_totalinterest d ON 
                                                                    a.project_id =  d.project_id
                                                                AND a.pt_id = d.pt_id
                                                                AND a.addby = d.addby	
                                                                AND a.kelsub = d.kelsub	
                                                                AND a.code = d.code
                                                                AND a.endofmonthdate = d.endofmonthdate
                                
                      
                        WHERE 
                            a.project_id = $this->_project_id
                            AND a.pt_id = $this->_pt_id  
                            AND a.addby = $this->_user_id 
                            AND a.endofmonthdate =''$endofmonthdate''
                    ) AS DATA
             ";
        $this->_model->customefromquery($sql);
    }

    public function uniontotal($endofmonthdate) {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_uniontotal'') IS NOT NULL DROP TABLE $this->_tmp_uniontotal
                    SELECT * INTO $this->_tmp_uniontotal FROM
                    (  
                        SELECT a.*,
                                coalesce(b.totaldebet,0) as totaldebet,
                                coalesce(c.totalcredit,0) as totalcredit,
                                coalesce(d.totalinterest,0) as totalinterest,
                                coalesce(a.totalamount,0)+coalesce(d.totalinterest,0) as amountendbalance
                        FROM $this->_tmp_totalamount a
                        LEFT JOIN $this->_tmp_totaldebet b ON 
                                                                    a.project_id = b.project_id
                                                                AND a.pt_id = b.pt_id
                                                                AND a.addby = b.addby	
                                                                AND a.kelsub = b.kelsub	
                                                                AND a.code = b.code
                                                                AND a.endofmonthdate = b.endofmonthdate
                                                                
                        LEFT JOIN $this->_tmp_totalcredit c ON  
                                                                    a.project_id =  c.project_id
                                                                AND a.pt_id = c.pt_id
                                                                AND a.addby = c.addby	
                                                                AND a.kelsub = c.kelsub	
                                                                AND a.code = c.code
                                                                AND a.endofmonthdate = c.endofmonthdate
                            
                                
                        LEFT JOIN $this->_tmp_totalinterest d ON 
                                                                    a.project_id =  d.project_id
                                                                AND a.pt_id = d.pt_id
                                                                AND a.addby = d.addby	
                                                                AND a.kelsub = d.kelsub	
                                                                AND a.code = d.code
                                                                AND a.endofmonthdate = d.endofmonthdate
                                
                      
                        WHERE 
                            a.project_id = $this->_project_id
                            AND a.pt_id = $this->_pt_id  
                            AND a.addby = $this->_user_id                            
                            AND a.endofmonthdate =''$endofmonthdate''
                    ) AS DATA
             ";

        $this->_model->customefromquery($sql);
    }

    public function gettotaldata() {
        $sql = "SELECT * FROM $this->_tmp_uniontotal 
                WHERE 
                    project_id = $this->_project_id
                    AND pt_id = $this->_pt_id 
                    AND addby = $this->_user_id 
           ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    public function getdatareport($flag, $kelsub, $code, $enddate) {
        $sql = "SELECT * FROM $this->_rpt_bungashl 
                WHERE 
                    project_id = $this->_project_id
                    AND pt_id = $this->_pt_id 
                    AND addby = $this->_user_id
                    AND kelsub=''$kelsub'' 
                    AND code=''$code'' 
                    AND endofmonthdate=''$enddate'' 
                    AND flag = ''$flag'' 
           ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    public function getdistinctendofmonthdate() {
        $sql = "
                SELECT  DISTINCT kelsub,code,endofmonthdate FROM 
                $this->_rpt_bungashl 
                WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND addby = $this->_user_id   
                ORDER BY endofmonthdate asc        
               ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    function update_tmpbungashlbyenddate($kelsub, $subgl, $endofmonthdate, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_rpt_bungashl SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND addby = $this->_user_id
                    AND kelsub =''$kelsub''   
                    AND code =''$subgl''   
                    AND endofmonthdate =''$endofmonthdate''   
               ";
        $this->_model->customefromquery($sql);
    }

    function update_journal($journal_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_th_jurnal SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND journal_id = $journal_id  
               ";
        $this->_model->customefromquery($sql);
    }

    function getreport($fromdate, $untildate) {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_rpt'') IS NOT NULL DROP TABLE $this->_tmp_rpt
                    SELECT * INTO $this->_tmp_rpt FROM
                    (  
                        SELECT a.*, 
                               format(coalesce(a.amountdata,0), ''#,##0.00'') AS format_amountdata,   
                               format(coalesce(a.amountinterest,0), ''#,##0.00'') AS format_amountinterest,   
                               format(coalesce(a.total_beginingbalance,0), ''#,##0.00'') AS format_total_beginingbalance,   
                               format(coalesce(a.total_amountdata,0), ''#,##0.00'') AS format_total_amountdata,   
                               format(coalesce(a.total_amountin,0), ''#,##0.00'') AS format_total_amountin,   
                               format(coalesce(a.total_amountout,0), ''#,##0.00'') AS format_total_amountout,   
                               format(coalesce(a.total_amountinterest,0), ''#,##0.00'') AS format_total_amountinterest,   
                               format(coalesce(a.total_endbalance,0), ''#,##0.00'') AS format_total_endbalance, 
                               CASE WHEN a.flag=''H''AND a.month IN(1) THEN ''MJ0001/01'' 
                                    WHEN a.flag=''H''AND a.month NOT IN(1) THEN '' '' 	
                               ELSE a.voucher_no 
                               END AS voucher_nosaldo,
                               CASE  WHEN a.flag=''H'' AND a.month IN(1) THEN  ''ENDING BALANCE ''+SUBSTRING(cast(a.voucher_date as nvarchar(max)), 1, 4) 
                                     WHEN a.flag=''H'' AND a.month NOT IN(1) THEN  ''SALDO AWAL BULAN  ''+UPPER(cast(datename(month,a.endofmonthdate) as nvarchar(max)))
                               ELSE a.description END AS descriptionsaldo,
                               UPPER(cast(datename(month,endofmonthdate) as nvarchar(max)))+'' ''+SUBSTRING(cast(voucher_date as nvarchar(max)), 1, 4) AS nickmonth,
                               b.description as desckelsub,c.description as descsubgl
                        FROM $this->_rpt_bungashl a
                        LEFT JOIN $this->_m_kelsub b ON b.kelsub_id = a.kelsub_id    
                        LEFT JOIN $this->_m_subgl c ON c.subgl_id = a.subgl_id
                                                            
                        WHERE 
                           a.project_id = $this->_project_id 
                           AND a.pt_id =$this->_pt_id 
                           AND a.addby = $this->_user_id
                           AND a.endofmonthdate between  ''$fromdate'' AND ''$untildate''

                    ) AS DATA
               ";

        

        $this->_model->customefromquery($sql);
        $sql = "
                  
                    IF OBJECT_ID(''tempdb..$this->_tmp'') IS NOT NULL DROP TABLE $this->_tmp
                    SELECT * INTO $this->_tmp FROM(
                                        SELECT 
                                        *,	
                                        sum(amountinterest) OVER (PARTITION BY endofmonthdate,kelsub,code order by kelsub,code,voucher_date,voucher_no,endofmonthdate ROWS BETWEEN UNBOUNDED PRECEDING AND 0 PRECEDING) as endbalanceinterest
                                        FROM $this->_tmp_rpt 
                   ) AS DATA

                ";
        $this->_model->customefromquery($sql);        
       
        $record = array(
            "cluster" => "SELECT * FROM $this->_tmp",
            "filteraccount" => $this->getFilterAccount(),
            "filtersubaccount" => $this->getFilterSubgroup(),
            "filtersubcode" => $this->getFilterSubcode(),
        );
        return $record;
    }
    function getFilterAccount(){
        $sql = "SELECT TOP 1 coa FROM $this->_tmp order by  coa asc";
        $result = $this->_model->customefromquery($sql);
        return $result[0][0]['coa'];        
    }
    function getFilterSubgroup(){
        $sql1 = "SELECT kelsub FROM $this->_tmp GROUP BY kelsub ORDER BY kelsub ASC";
        $sql2 = "SELECT kelsub FROM $this->_tmp GROUP BY kelsub ORDER BY kelsub DESC";
       
        $result1 = $this->_model->customefromquery($sql1);
        $result2 = $this->_model->customefromquery($sql2);        
        
        return trim($result1[0][0]['kelsub']).' to '.trim($result2[0][0]['kelsub']);        
    }
    function getFilterSubcode(){
        $sql1 = "SELECT code FROM $this->_tmp GROUP BY code ORDER BY code ASC";
        $sql2 = "SELECT code FROM $this->_tmp GROUP BY code ORDER BY code DESC";
        
        $result1 = $this->_model->customefromquery($sql1);
        $result2 = $this->_model->customefromquery($sql2);      
        
        return trim($result1[0][0]['code']).' to '.trim($result2[0][0]['code']);        
    }

    function deletejournalsubdetail_byjournalid($journal_id) {
        $sql = "SELECT COUNT(journalsubdetail_id) as counterdata FROM $this->_td_jurnalsubdetail
                WHERE 
                    journal_id=$journal_id 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];

        if ($counter > 0) {
            $sqldelete = "
                UPDATE $this->_td_jurnalsubdetail 
                SET 
                    active =0,
                    deleted=1
                WHERE 
                    journal_id=$journal_id 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
            $this->_model->customefromquery($sqldelete);
        }
    }

    function deletejournaldetail_byjournalid($journal_id) {
        $sql = "SELECT COUNT(journaldetail_id) as counterdata FROM $this->_td_jurnaldetail
                WHERE 
                    journal_id=$journal_id 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];

        if ($counter > 0) {
            $sqldelete = "
                UPDATE $this->_td_jurnaldetail 
                SET 
                    active =0,
                    deleted=1
                WHERE 
                    journal_id=$journal_id 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
            $this->_model->customefromquery($sqldelete);
        }
    }

    function deletejournal_byjournalid($journal_id) {
        $sql = "SELECT COUNT(journal_id) as counterdata FROM $this->_th_jurnal
                WHERE 
                    journal_id=$journal_id 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];

        if ($counter > 0) {
            $sqldelete = "
                UPDATE $this->_th_jurnal 
                SET 
                    active =0,
                    deleted=1
                WHERE 
                    journal_id=$journal_id 
                    AND project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND active =1 
                    AND deleted =0 
                ";
            $this->_model->customefromquery($sqldelete);
        }
    }

    function getbungashl($flag, $fromdate, $untildate) {
        if ($flag == 'ALL') {
            $where = " WHERE 
                   a.project_id = $this->_project_id 
                   AND a.pt_id =$this->_pt_id 
                   AND a.addby = $this->_user_id
                   AND a.endofmonthdate between  ''$fromdate'' AND ''$untildate''
                   ORDER BY a.kelsub,a.code,a.voucher_date   
                   ";
        } else {
            $where = " WHERE 
                   a.project_id = $this->_project_id 
                   AND a.pt_id =$this->_pt_id 
                   AND a.addby = $this->_user_id
                   AND a.flag =''$flag''
                   AND a.endofmonthdate between  ''$fromdate'' AND ''$untildate''
                        
                   ORDER BY a.kelsub,a.code,a.voucher_date 
                   ";
        }
        $sql = "
                SELECT a.*, 
                       --CONVERT(DECIMAL(16,2), a.total_amountinterest) as total_amountinterest_decimal,
                       ABS(a.total_amountinterest) as totalabs_amountinterest,
                       b.code1,b.code2,b.code3,b.code4  
                FROM $this->_rpt_bungashl a
                LEFT JOIN $this->_m_subgl b ON a.subgl_id = b.subgl_id    
                $where 
               ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    function getbungashlbykelsubandcode($kelsub, $code, $date) {
        $sql = "
                SELECT a.*, 
                       b.code1,b.code2,b.code3,b.code4  
                FROM $this->_rpt_bungashl a
                LEFT JOIN $this->_m_subgl b ON a.subgl_id = b.subgl_id    
                WHERE 
                   a.project_id = $this->_project_id 
                   AND a.pt_id =$this->_pt_id 
                   AND a.addby = $this->_user_id
                   AND a.kelsub =  ''$kelsub''
                   AND a.code =   ''$code''
                   AND a.endofmonthdate =   ''$date''
               ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    function getaccountjournal_bycoakelsubsort($array) {
        $result = $this->_model->extract_array($array);
        $where = $result['whereset'];
        $sql = "
                SELECT * FROM $this->_td_jurnaldetail $where
                ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    function insert_subacccountjournal($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_td_jurnalsubdetail ($key) VALUES ($values)  
               ";
        $this->_model->customefromquery($sql);
    }

    function get_summaryaccountjournal($journal_id, $type) {
        $sql = "
                SELECT sum(coalesce(amount,0)) AS sumamount                      
                FROM $this->_td_jurnaldetail 
                WHERE 
                   project_id = $this->_project_id 
                   AND pt_id =$this->_pt_id 
                   AND journal_id = $journal_id
                   AND active =  1
                   AND deleted = 0
                   AND type =''$type''
               ";
        $result = $this->_model->customefromquery($sql);
        return $result[0][0]['sumamount'];
    }

    public function get_journaldetailbyjournalidtypecoa($param) {
        $journal_id = $param['journal_id'];
        $type = $param['type'];
        $coa = $param['coa'];
        $sql = "
                SELECT COUNT(journaldetail_id) as counterdata FROM $this->_td_jurnaldetail
                WHERE 
                    active = 1 
                    and deleted=0
                    and project_id = $this->_project_id 
                    and pt_id =$this->_pt_id 
                    and journal_id = $journal_id
                    and coa=''$coa''
                    and type =''$type''
                        
                SELECT * FROM $this->_td_jurnaldetail
                WHERE 
                    active = 1 
                    and deleted=0
                    and project_id = $this->_project_id 
                    and pt_id =$this->_pt_id 
                    and journal_id = $journal_id
                    and coa=''$coa''
                    and type =''$type''        

                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];

        if ($counter > 0) {
            $counter = $counter;
            $return = $result[1][0];
        } else {
            $counter = $counter;
            $return = null;
        }
        return array("counter" => $counter,
            "result" => $return
        );
    }

    function update_journaldetail_byid($journaldetail_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_td_jurnaldetail SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND journaldetail_id = $journaldetail_id  
               ";
        $this->_model->customefromquery($sql);
    }

    function set_sumdatajournal($journal_id) {
        $sql = "
            
                    IF OBJECT_ID(''tempdb..$this->_tmp_totaljournaldetail'') IS NOT NULL DROP TABLE $this->_tmp_totaljournaldetail
                     SELECT * INTO $this->_tmp_totaljournaldetail FROM
                     (  
                            SELECT 
                            a.journal_id,a.coa,a.type,COALESCE(SUM(b.amount),0) as total_amount
                            FROM $this->_td_jurnaldetail a 
                            INNER JOIN $this->_td_jurnalsubdetail b ON a.journaldetail_id = b.journaldetail_id
                            WHERE
                            a.active = 1
                            and a.deleted = 0
                            and a.project_id = $this->_project_id
                            and a.pt_id = $this->_pt_id
                            and a.journal_id =$journal_id
                            GROUP BY a.journal_id,a.coa,a.type
                    ) AS DATA


                    declare @increment int = 1		
                    declare @journal_id int = 0			  
                    declare @counter int = 0
                    declare @coa varchar(max) = null 
                    declare @type varchar(max) = null
                    declare @totalamount money = 0 
                    
                    SET @counter =  (SELECT COUNT(journal_id) FROM $this->_tmp_totaljournaldetail)
                    WHILE (@increment<=@counter)
                      BEGIN
                          SELECT
                                          @journal_id=journal_id,@coa=coa,@totalamount=total_amount,@type=type						 	
                                  FROM $this->_tmp_totaljournaldetail
                                  ORDER BY coa DESC

                                  SELECT @journal_id,@coa,@type,@totalamount
                                  UPDATE $this->_td_jurnaldetail
                                  SET
                                          amount=@totalamount
                                  WHERE 
                                          active = 1
                                          and deleted =0
                                          and project_id = $this->_project_id
                                          and pt_id=$this->_pt_id
                                          and journal_id =$journal_id
                                          and coa = @coa
                                          and type = @type

                            SET @increment=@increment+1
                            DELETE FROM  $this->_tmp_totaljournaldetail WHERE 
                                journal_id=@journal_id and coa = @coa and type=@type
                           END

                        IF OBJECT_ID(''tempdb..$this->_tmp_sumjournaldetail'') IS NOT NULL DROP TABLE $this->_tmp_sumjournaldetail
                         SELECT * INTO $this->_tmp_sumjournaldetail FROM
                         (  
                                        SELECT 
                                        a.journal_id,a.type,
                                        case when a.type=''D'' then COALESCE(SUM(a.amount),0) else 0 end as sum_debet,
                                        case when a.type=''C'' then COALESCE(SUM(a.amount),0) else 0 end as sum_credit
                                        FROM $this->_td_jurnaldetail a 
                                        WHERE
                                                a.active = 1
                                                and a.deleted = 0
                                                and a.project_id = $this->_project_id
                                                and a.pt_id = $this->_pt_id
                                                and a.journal_id =$journal_id
                                        group by a.journal_id,a.type

                        ) AS DATA

                        declare @sum_debet money = (SELECT sum_debet FROM $this->_tmp_sumjournaldetail where type=''D'')
                        declare @sum_credit money = (SELECT sum_credit FROM $this->_tmp_sumjournaldetail where type=''C'')
                        declare @selilish money = @sum_debet-@sum_credit

                        UPDATE $this->_th_jurnal 
                        SET 
                            debit_total = @sum_debet,
                            credit_total = @sum_credit,
                            selisih = @selilish
                        WHERE 
                             active = 1
                        and  deleted = 0
                        and  project_id = $this->_project_id
                        and  pt_id = $this->_pt_id
                        and  journal_id =$journal_id

                        ";
        
         $this->_model->customefromquery($sql);
    }

}
