<?php

class Gl_Models_Generalmodel_Builtquery extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    private $_dbtemporary = null;
    private $_showdata = null;
    private $_showdatasum = null;
    private $_groupby = null;
    private $_groupbysum = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_t_m_report = 'm_rptformat';
        $this->_th_journal = 'th_jurnal';
        $this->_t_td_jurnaldetail = 'td_jurnaldetail';

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        
        //start create temporary for report sub transaction       
         
        
        
        //end create temporary for report sub transaction   
        
        
        //start create temporary for report sub transaction       
         
        
        
        //end create temporary for report sub transaction        
        
        
        
        
    }

    public function changeheadertochield($param) {
        $report = $param[2];
        $report_level = $param[4];
        $sql = "
                IF OBJECT_ID(''tempdb..##tmp_setlevel'') IS NOT NULL DROP TABLE ##tmp_setlevel
                    SELECT * INTO ##tmp_setlevel FROM
                    (                    
                        SELECT * FROM $this->_t_m_report
                        WHERE                        
                        active = 1
                        AND deleted = 0
                        AND project_id = $this->_project_id
                        AND pt_id = $this->_pt_id
                        AND report=''$report'' 
                        AND report_level=$report_level 
                        AND flag in(''H'',''T'')
                    ) AS Data


                    IF OBJECT_ID(''tempdb..##tmp_settotal'') IS NOT NULL DROP TABLE ##tmp_settotal
                    SELECT * INTO ##tmp_settotal FROM
                    (   
                        SELECT  a.coa,a.name,a.flag,b.coa as coabaru
                        FROM  $this->_t_m_report a 
                        LEFT JOIN ##tmp_setlevel b ON  a.coa = b.coa AND a.flag = b.flag
                        WHERE 
                            a.active = 1
                            AND a.deleted = 0
                            AND a.project_id = $this->_project_id
                            AND a.pt_id = $this->_pt_id
                            AND a.report=''$report'' 
                            AND a.report_level=$report_level 
                            AND a.flag=''T''
                        ) AS DATA

                    IF OBJECT_ID(''tempdb..##tmp_changeflag'') IS NOT NULL DROP TABLE ##tmp_changeflag
                    SELECT * INTO ##tmp_changeflag FROM
                    (  
                        SELECT a.coa,a.name,a.flag
                        FROM $this->_t_m_report a 
                        WHERE        
                                a.active = 1
                            AND a.deleted = 0
                            AND a.project_id = $this->_project_id
                            AND a.pt_id = $this->_pt_id
                            AND a.report=''$report'' 
                            AND a.report_level=$report_level 
                            AND a.flag=''H''
                            AND a.coa NOT IN (select coabaru from ##tmp_settotal)
                    ) AS DATA

                    UPDATE m_rptformat 
                    SET flag=''I'' 
                    WHERE coa IN (select coa from ##tmp_changeflag)
                ";


        $this->_model->customefromquery($sql);
    }

    public function setField() {
        $query = "
            SELECT 		 
                                a.project_id,
                                a.pt_id,
                                a.journal_id,
                                b.journaldetail_id,
                                c.journalsubdetail_id,
                                a.voucher_no,
                                a.voucher_date,
                                a.prefix_id,
                                f.prefix,
                                b.coa_id,
                                b.coa,
                                d.name as coaname,
                                d.type as typecoa,
                                b.type as typetrx,
                                a.is_post as postingjournal,
                                b.is_post as postingaccount,
                                c.is_post as postingsub,
                                a.is_fromkasir as kasir,	
                                f.is_cashflow as cashflow,			
                                b.keterangan as ketaccountjournal,
                                b.amount as amountaccount,
                                c.amount as amountsub,
                                b.kelsub_id as kelsubidaccount,
                                c.kelsub_id as kelsubidsub,
                                b.kelsub as kelsubaccount,
                                c.subgl_id,
                                c.code,
                                c.code1,
                                c.code2,
                                c.code3,
                                c.code4,
                                c.keterangan as ketsub,
                                e.description as subgldesc		
                            FROM th_jurnal a 
                            LEFT JOIN td_jurnaldetail b on a.journal_id = b.journal_id 
                            LEFT JOIN td_jurnalsubdetail c on b.journaldetail_id = c.journaldetail_id 
                            LEFT JOIN m_coa d on b.coa_id = d.coa_id 
                            LEFT JOIN m_subgl e on c.subgl_id = e.subgl_id 
                            LEFT JOIN m_prefix f on f.prefix_id = a.prefix_id
                            ";

        return $query;
    }

    function setCondition($param, $flag) {
        //START SET VARIABEL
        $project_id = $this->session->getCurrentProjectId();
        $pt_id = $this->session->getCurrentPtId();
        $paramdate = $param['paramdate'];
        $reportby = $param['reportby'];
        $voucherby = $param['voucherby'];
        $subby = $param['subby'];
        $detailby = $param['detailby'];
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        $fromkelsub = $param['fromkelsub'];
        $untilkelsub = $param['untilkelsub'];
        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromsubcode = $param['fromsubcode'];
        $untilsubcode = $param['untilsubcode'];
        $fromsub1 = $param['fromsub1'];
        $untilsub1 = $param['untilsub1'];
        $fromsub2 = $param['fromsub2'];
        $untilsub2 = $param['untilsub2'];
        $fromsub3 = $param['fromsub3'];
        $untilsub3 = $param['untilsub3'];
        $fromsub4 = $param['fromsub4'];
        $untilsub4 = $param['untilsub4'];
        //END SET VARIABEL
        //START SET CONDITION FOR FILTER
        $where = " WHERE";
        $where.= " a.active=1";
        $where.= " AND a.deleted=0";
        $where.= " AND a.is_post =1";
        $where.= " AND a.project_id=$project_id";
        $where.= " AND a.pt_id=$pt_id";
        if ($voucherby == false) {
            $where.= " AND f.is_cashflow=1";
        }
        $where.= " AND b.coa >=''$fromcoa'' AND b.coa <=''$untilcoa''";
        $where.= " AND b.kelsub >=''$fromkelsub'' AND b.kelsub <=''$untilkelsub''";

        if ($flag == 'beginingbalance') {
            if ($paramdate == 'NOSAME') {
                $cond = " AND a.voucher_date <''$fromdate''";
            } else {
                $cond = " AND a.voucher_date <=''$fromdate'' AND a.voucher_no=''MJ0001/01''";
            }
            $where.= $cond;
        } else {
            if ($paramdate == 'NOSAME') {
                $cond = " AND a.voucher_date >=''$fromdate''";
            } else {
                $cond = " AND a.voucher_date >=''$fromdate'' AND a.voucher_no NOT IN(''MJ0001/01'')";
            }
            $where.= $cond;
        }

        if ($subby == true) {
            $where.= " AND c.code >=''$fromsubcode'' AND c.code <=''$untilsubcode''";
        } else if ($subby == false) {
            if (!is_null($fromsub1)) {
                $where.= " AND c.code1 >=''$fromsub1'' ";
            }
            if (!is_null($untilsub1)) {
                $where.= " AND c.code1 <=''$untilsub1''";
            }
            if (!is_null($fromsub2)) {
                $where.= " AND c.code2 >=''$fromsub2''";
            }
            if (!is_null($untilsub2)) {
                $where.= " AND c.code2 <=''$untilsub2''";
            }
            if (!is_null($fromsub3)) {
                $where.= " AND c.code3 >=''$fromsub3''";
            }
            if (!is_null($untilsub3)) {
                $where.= " AND c.code3 <=''$untilsub3''";
            }
            if (!is_null($fromsub4)) {
                $where.= " AND c.code4 >=''$fromsub4''";
            }
            if (!is_null($untilsub4)) {
                $where.= " AND c.code4 <=''$untilsub4''";
            }
        }

        return $where;
    }

    function setConditionsub($param) {
        //START SET VARIABEL
        $project_id = $this->session->getCurrentProjectId();
        $pt_id = $this->session->getCurrentPtId();
        $paramdate = $param['paramdate'];
        $reportby = $param['reportby'];
        $voucherby = $param['voucherby'];
        $subby = $param['subby'];
        $detailby = $param['detailby'];
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        $fromkelsub = $param['fromkelsub'];
        $untilkelsub = $param['untilkelsub'];
        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromsubcode = $param['fromsubcode'];
        $untilsubcode = $param['untilsubcode'];
        $fromsub1 = $param['fromsub1'];
        $untilsub1 = $param['untilsub1'];
        $fromsub2 = $param['fromsub2'];
        $untilsub2 = $param['untilsub2'];
        $fromsub3 = $param['fromsub3'];
        $untilsub3 = $param['untilsub3'];
        $fromsub4 = $param['fromsub4'];
        $untilsub4 = $param['untilsub4'];
        //END SET VARIABEL
        //START SET CONDITION FOR FILTER
        $where = " WHERE";
        $where.= " a.active=1";
        $where.= " AND a.deleted=0";
        $where.= " AND a.is_post =1";
        $where.= " AND a.project_id=$project_id";
        $where.= " AND a.pt_id=$pt_id";
        $where.= " AND a.voucher_date >=''$fromdate'' AND a.voucher_date <=''$untildate''";

        if ($voucherby == false) {
            $where.= " AND f.is_cashflow=1";
        }
        $where.= " AND b.coa >=''$fromcoa'' AND b.coa <=''$untilcoa''";
        $where.= " AND b.kelsub >=''$fromkelsub'' AND b.kelsub <=''$untilkelsub''";

        if ($subby == true) {
            $where.= " AND c.code >=''$fromsubcode'' AND c.code <=''$untilsubcode''";
        } else if ($subby == false) {
            if (!is_null($fromsub1)) {
                $where.= " AND c.code1 >=''$fromsub1'' ";
            }
            if (!is_null($untilsub1)) {
                $where.= " AND c.code1 <=''$untilsub1''";
            }
            if (!is_null($fromsub2)) {
                $where.= " AND c.code2 >=''$fromsub2''";
            }
            if (!is_null($untilsub2)) {
                $where.= " AND c.code2 <=''$untilsub2''";
            }
            if (!is_null($fromsub3)) {
                $where.= " AND c.code3 >=''$fromsub3''";
            }
            if (!is_null($untilsub3)) {
                $where.= " AND c.code3 <=''$untilsub3''";
            }
            if (!is_null($fromsub4)) {
                $where.= " AND c.code4 >=''$fromsub4''";
            }
            if (!is_null($untilsub4)) {
                $where.= " AND c.code4 <=''$untilsub4''";
            }
        }

        return $where;
    }

    public function setGroupby($param) {
        $reportby = $param['reportby'];
        $show = "  $this->_project_id AS project_id,$this->_pt_id as pt_id,$this->_user_id as user_id,''$this->_curdate'' as createreportdate,"
                . " A.coa_id,A.coa,A.coaname,A.kelsubidaccount,A.kelsubaccount,A.subgl_id,A.code,A.typetrx,A.subgldesc";

        $showsum = "  $this->_project_id AS project_id,$this->_pt_id as pt_id,$this->_user_id as user_id,''$this->_curdate'' as createreportdate, "
                . "A.coa_id,A.coa,A.coaname,A.kelsubidaccount,A.kelsubaccount,A.subgl_id,A.code,A.subgldesc";
        if ($reportby == true) {
            $groupby = " GROUP BY A.coa_id,A.coa,A.coaname,A.kelsubidaccount,A.kelsubaccount,A.subgl_id,A.code,A.typetrx,A.subgldesc";
            $groupbysum = " GROUP BY A.coa_id,A.coa,A.coaname,A.kelsubidaccount,A.kelsubaccount,A.subgl_id,A.code,A.subgldesc";
        } else {
            $groupby = " GROUP BY A.subgl_id,A.code,A.coa_id,A.coa,A.coaname,A.kelsubidaccount,A.kelsubaccount,A.typetrx,A.subgldesc";
            $groupbysum = " GROUP BY A.subgl_id,A.code,A.coa_id,A.coa,A.coaname,A.kelsubidaccount,A.kelsubaccount,A.subgldesc";
        }
        $this->_showdata = $show;
        $this->_showdatasum = $showsum;
        $this->_groupby = $groupby;
        $this->_groupbysum = $groupbysum;
    }

    function rpt_subtrx_getdatasub_fromrange($param) {
        $where = $this->setConditionsub($param);
        $field = $this->setField();
        $sql = "
                    IF OBJECT_ID(''tempdb..##tmp_datasub'') IS NOT NULL DROP TABLE ##tmp_datasub
                    SELECT * INTO ##tmp_datasub FROM
                        (   
                            $field
                            $where) AS DATA 
                        
                     ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_getalldata_totalrange($param) {
        $where = $this->setCondition($param, 'totalrange');
        $field = $this->setField();
        $sql = "
                    IF OBJECT_ID(''tempdb..##tmp_getalldata2'') IS NOT NULL DROP TABLE ##tmp_getalldata2
                    SELECT * INTO ##tmp_getalldata2 FROM
                        (   
                            $field
                            $where) AS DATA 
                        
                     ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_getalldata_beginingbalance($param) {
        $where = $this->setCondition($param, 'beginingbalance');
        $field = $this->setField();
        $sql = "
                    IF OBJECT_ID(''tempdb..##tmp_getalldata1'') IS NOT NULL DROP TABLE ##tmp_getalldata1
                    SELECT * INTO ##tmp_getalldata1 FROM
                        ( 
                            $field
                            $where) AS DATA 
                        
                     ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_debetsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sum_debetsub'') IS NOT NULL DROP TABLE ##tmp_sum_debetsub
                    SELECT * INTO ##tmp_sum_debetsub FROM
                    (
                        SELECT $this->_showdata,sum(coalesce(A.amountsub,0)) tot_debetsub
                        FROM ##tmp_datasub A
                        WHERE
                             A.typetrx=''D''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_debet1() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sum_debet1'') IS NOT NULL DROP TABLE ##tmp_sum_debet1
                    SELECT * INTO ##tmp_sum_debet1 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''D'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM ##tmp_getalldata1 A
                        WHERE
                             A.typetrx=''D''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_debet2() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sum_debet2'') IS NOT NULL DROP TABLE ##tmp_sum_debet2
                    SELECT * INTO ##tmp_sum_debet2 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''D'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM ##tmp_getalldata2 A
                        WHERE
                             A.typetrx=''D''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_creditsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sum_creditsub'') IS NOT NULL DROP TABLE ##tmp_sum_creditsub
                    SELECT * INTO ##tmp_sum_creditsub FROM
                    (
                        SELECT $this->_showdata,sum(coalesce(A.amountsub,0)) tot_creditsub
                        FROM ##tmp_datasub A
                        WHERE
                             A.typetrx=''C''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_credit1() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sum_credit1'') IS NOT NULL DROP TABLE ##tmp_sum_credit1
                    SELECT * INTO ##tmp_sum_credit1 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''C'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM ##tmp_getalldata1 A
                        WHERE
                             A.typetrx=''C''    
                        $this->_groupby      
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_credit2() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sum_credit2'') IS NOT NULL DROP TABLE ##tmp_sum_credit2
                    SELECT * INTO ##tmp_sum_credit2 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''C'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM ##tmp_getalldata2 A
                        WHERE
                             A.typetrx=''C''
                        $this->_groupby      
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_set_union1() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_union1'') IS NOT NULL DROP TABLE ##tmp_union1
                    SELECT * INTO ##tmp_union1 FROM
                    (
                        SELECT * FROM  ##tmp_sum_debet1
                        UNION
                        SELECT * FROM  ##tmp_sum_credit1
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_set_union2() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_union2'') IS NOT NULL DROP TABLE ##tmp_union2
                    SELECT * INTO ##tmp_union2 FROM
                    (
                        SELECT * FROM  ##tmp_sum_debet2
                        UNION
                        SELECT * FROM  ##tmp_sum_credit2
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_set_unionsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_unionsub'') IS NOT NULL DROP TABLE ##tmp_unionsub
                    SELECT * INTO ##tmp_unionsub FROM
                    (
                        SELECT * FROM  ##tmp_sum_debetsub
                        UNION
                        SELECT * FROM  ##tmp_sum_creditsub
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_sum_beginingbalance() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_beginingbalance'') IS NOT NULL DROP TABLE ##tmp_beginingbalance
                    SELECT * INTO ##tmp_beginingbalance FROM
                    (
                       SELECT $this->_showdatasum,SUM(COALESCE(A.tot_amountsub,0)) as beginingbalanceamount
                       FROM ##tmp_union1 A
                       $this->_groupbysum
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_sum_totalrange() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_totalrange'') IS NOT NULL DROP TABLE ##tmp_totalrange
                    SELECT * INTO ##tmp_totalrange FROM
                    (
                       SELECT $this->_showdatasum,SUM(COALESCE(A.tot_amountsub,0)) as totalrange
                       FROM ##tmp_union2 A
                       $this->_groupbysum
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_sum_debet_credit() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sumdebetcredit'') IS NOT NULL DROP TABLE ##tmp_sumdebetcredit
                    SELECT * INTO ##tmp_sumdebetcredit FROM
                    (                    
                       SELECT $this->_showdatasum,coalesce(B.tot_amountsub,0) as tot_amountsub_Debet,coalesce(C.tot_amountsub,0) as tot_amountsub_Credit
                       FROM ##tmp_totalrange A
                       LEFT JOIN  ##tmp_sum_debet1 B on A.coa=B.coa and A.code=B.code
                       LEFT JOIN  ##tmp_sum_credit1 C on A.coa=B.coa and A.code=C.code
                     )AS DATA
               ";

        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_sum_totalendrange() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_totalendrange'') IS NOT NULL DROP TABLE ##tmp_totalendrange
                    SELECT * INTO ##tmp_totalendrange FROM
                    (                    
                       SELECT $this->_showdatasum,A.beginingbalanceamount,B.totalrange,coalesce(A.beginingbalanceamount,0)+coalesce(B.totalrange,0) as tot_endrange
                       FROM ##tmp_beginingbalance A
                       LEFT JOIN ##tmp_totalrange B ON A.coa = B.coa AND A.code = B.code
                     )AS DATA
               ";

        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_settotaldata() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_totaldata'') IS NOT NULL DROP TABLE ##tmp_totaldata
                    SELECT * INTO ##tmp_totaldata FROM
                    (                    
                       SELECT $this->_showdatasum,A.beginingbalanceamount,A.totalrange,A.tot_endrange,coalesce(C.tot_debetsub,0) as amountdebet,B.tot_amountsub_Debet,coalesce(D.tot_creditsub,0) as amountcredit,((coalesce(C.tot_debetsub,0)-coalesce(D.tot_creditsub,0))+A.beginingbalanceamount)AS endbalanceamount,B.tot_amountsub_Credit
                       FROM ##tmp_totalendrange A
                       LEFT JOIN ##tmp_sumdebetcredit B ON A.coa = B.coa AND B.code = A.code
                       LEFT JOIN ##tmp_sum_debetsub C ON A.coa = C.coa AND C.code = A.code
                       LEFT JOIN ##tmp_sum_creditsub D ON A.coa = D.coa AND D.code = A.code
                     )AS DATA
          ";

        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_setgrandtotal() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_granddata'') IS NOT NULL DROP TABLE ##tmp_granddata
                    SELECT * INTO ##tmp_granddata FROM
                    (                    
                       SELECT A.project_id,A.pt_id,A.user_id,A.createreportdate,
                           SUM(coalesce(A.beginingbalanceamount,0)) AS grand_beginingbalance,
                           SUM(coalesce(A.amountdebet,0)) AS grand_amountdebet,
                           SUM(coalesce(A.amountcredit,0)) AS grand_amountcredit,
                           SUM(coalesce(A.endbalanceamount,0)) AS grand_endbalanceamount
                       FROM ##tmp_totaldata A  
                       GROUP BY A.project_id,A.pt_id,A.user_id,A.createreportdate
                     )AS DATA
          ";

        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_bindingdata() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_bindingdata'') IS NOT NULL DROP TABLE ##tmp_bindingdata
                    SELECT * INTO ##tmp_bindingdata FROM
                    (                    
                       SELECT B.*,A.project_id AS project_id_binding,A.pt_id AS pt_id_binding,A.user_id,A.createreportdate,
                                  A.coa AS coa_binding,A.coaname AS coaname_binding,A.code AS code_binding ,A.subgldesc AS subgldesc_binding,
                                  A.beginingbalanceamount,A.amountdebet,A.amountcredit,A.endbalanceamount,A.tot_amountsub_Debet,A.tot_amountsub_Credit,A.totalrange,A.tot_endrange,
                                  C.grand_beginingbalance,C.grand_amountdebet,C.grand_amountcredit,C.grand_endbalanceamount
                       FROM ##tmp_totaldata A
                       LEFT JOIN ##tmp_datasub B ON A.coa = B.coa AND B.code = A.code                     
                       LEFT JOIN ##tmp_granddata C ON A.project_id = C.project_id AND A.pt_id = C.pt_id                    
                     )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_createsumdataaccount() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_sumdataaccount'') IS NOT NULL DROP TABLE ##tmp_sumdataaccount
                SELECT * INTO ##tmp_sumdataaccount FROM
                (                    
                SELECT 	
                           coa_binding,
			   SUM(DISTINCT(beginingbalanceamount)) AS sum_beginingbalance,
			   SUM(DISTINCT(amountdebet)) AS sum_amountdebet,
			   SUM(DISTINCT(amountcredit)) AS sum_amountcredit,
			   SUM(DISTINCT(endbalanceamount)) AS sum_endbalanceamount
                FROM ##tmp_bindingdata 
                WHERE 
                    project_id_binding = $this->_project_id
                    AND pt_id_binding = $this->_pt_id
                    AND user_id = $this->_user_id
                    AND createreportdate = ''$this->_curdate''
                GROUP BY 
                    coa_binding 		

                )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_finaldata() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_finaldata'') IS NOT NULL DROP TABLE ##tmp_finaldata
                    SELECT * INTO ##tmp_finaldata FROM
                    (                    
                       SELECT A.*,B.sum_beginingbalance,B.sum_amountdebet,B.sum_amountcredit,B.sum_endbalanceamount
                       FROM ##tmp_bindingdata A
                       LEFT JOIN ##tmp_sumdataaccount B ON A.coa_binding = b.coa_binding                                   
                     )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }
    
    
    
    //=======================================================================================================

    public function rpt_installstatemenet_generate($param) {
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_templateinstallment'') IS NOT NULL DROP TABLE ##tmp_templateinstallment
                    SELECT * INTO ##tmp_templateinstallment FROM
                    (                    
                       
                        SELECT *,
                                 REPLACE(name, ''-'', '' '') as namecoa,
                                 case when level not in(''0'') then coalesce(realisasi_bln_ini,0) end AS this_amount,
                                 case when level not in(''0'') then coalesce(realisasi_sd_bln_ini,0) end AS until_thisamount,
                                 case when level not in(''0'') then coalesce(anggaran_bln_ini,0) end AS budget_thisamount,
                                 case when level not in(''0'') then coalesce(realisasi_banding,0) end AS equal_amount
                                                   
                        FROM m_rptformat 
                        WHERE 
                        active = 1
                        AND deleted = 0
                        AND project_id = $this->_project_id
                        AND pt_id = $this->_pt_id
                        AND report = ''$report''
                        AND report_level = $level  
                    )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_balancesheet_generate($param) {
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_templatebalancesheet'') IS NOT NULL DROP TABLE ##tmp_templatebalancesheet
                    SELECT * INTO ##tmp_templatebalancesheet FROM
                    (                    
                       
                        SELECT *,
                                 REPLACE(name, ''-'', '' '') as namecoa,
                                 case when level not in(''0'') then coalesce(realisasi_bln_ini,0) end AS lastmonth_amount,
                                 case when level not in(''0'') then coalesce(realisasi_bln_ini,0) end AS thismonth_amount,
                                 case when level not in(''0'') then coalesce(realisasi_bln_ini,0) end AS budget_amount,
                                 case when level not in(''0'') then coalesce(realisasi_bln_ini,0) end AS lastyear_amount
                                                   
                        FROM m_rptformat 
                        WHERE 
                        active = 1
                        AND deleted = 0
                        AND project_id = $this->_project_id
                        AND pt_id = $this->_pt_id
                        AND report = ''$report''
                        AND report_level = $level  
                    )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_balancesheet_set_lastmonth_amount($param) {
        $coa = $param['coa'];
        $net = $param['net_summary'];
        $sql = "
                 UPDATE ##tmp_templatebalancesheet SET
                            project_id = $this->_project_id,
                            pt_id = $this->_pt_id,                          
                            coa = ''$coa'',                         
                            lastmonth_amount = $net	
                                
	 WHERE
			coa = ''$coa''
                        AND flag=''I''     
          ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_installstatement_set_thisamount($param) {
        $coa = $param['coa'];
        $net = $param['net_summary'];
        $sql = "
                 UPDATE ##tmp_templateinstallment SET
                            project_id = $this->_project_id,
                            pt_id = $this->_pt_id,                          
                            coa = ''$coa'',                         
                            this_amount = $net	
                                
	 WHERE
			coa = ''$coa''
                        AND flag=''I''     
          ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_balancesheet_set_thismonth_amount($param) {
        $coa = $param['coa'];
        $net = $param['net_summary'];
        $sql = "
                 UPDATE ##tmp_templatebalancesheet SET
                            project_id = $this->_project_id,
                            pt_id = $this->_pt_id,                          
                            coa = ''$coa'',                         
                            thismonth_amount = $net	
                                
	 WHERE
			coa = ''$coa''
                        AND flag=''I''     
          ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_installstatement_set_until_thisamount($param) {
        $coa = $param['coa'];
        $net = $param['net_summary'];
        $sql = "
                 UPDATE ##tmp_templateinstallment SET
                            project_id = $this->_project_id,
                            pt_id = $this->_pt_id,                          
                            coa = ''$coa'',                         
                            until_thisamount = $net	
                                
	 WHERE
			coa = ''$coa''
                        AND flag=''I''    
          ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_balancesheet_set_lastyear_amount($param) {
        $coa = $param['coa'];
        $net = $param['net_summary'];
        $sql = "
                 UPDATE ##tmp_templatebalancesheet SET
                            project_id = $this->_project_id,
                            pt_id = $this->_pt_id,                          
                            coa = ''$coa'',                         
                            lastyear_amount = $net	
                                
	 WHERE
			coa = ''$coa''
                        AND flag=''I''     
          ";
        $this->_model->customefromquery($sql);
    }

    function rpt_installstatement_setcalculate() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_setcalculate'') IS NOT NULL DROP TABLE ##tmp_setcalculate
                    SELECT * INTO ##tmp_setcalculate FROM
                    (                    
                       
                        SELECT 
                                *,
                                case when type=''C'' then coalesce(this_amount,0) else -(coalesce(this_amount,0)) end AS calculate_thisamount,
                                case when type=''C'' then coalesce(until_thisamount,0) else -(coalesce(until_thisamount,0)) end AS calculate_untilthisamount,
                                case when type=''C'' then coalesce(budget_thisamount,0) else -(coalesce(budget_thisamount,0)) end AS calculate_budgetthisamount,
                                case when type=''C'' then coalesce(equal_amount,0) else -(coalesce(equal_amount,0)) end AS calculate_equalamount
                        FROM ##tmp_templateinstallment 
                        WHERE                      
                            project_id = $this->_project_id
                        AND pt_id = $this->_pt_id                      
                    )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

   
    
    
//    function rpt_balancesheet_setcalculate_replace($param) {
//        $level = $param['level'];
//        if($level > 3){
//           // $range = '16.90.000';
//            $range = '20.00.000';
//        }else{
//            $range = '20.00.000';
//        }        
//        
//        $sql = "
//                 IF OBJECT_ID(''tempdb..##tmp_setcalculatebalancesheet'') IS NOT NULL DROP TABLE ##tmp_setcalculatebalancesheet
//                    SELECT * INTO ##tmp_setcalculatebalancesheet FROM
//                    (                    
//                       
//                        SELECT 
//                                *,
//                                CASE 		
//                                        WHEN type =''C'' and cal_lastamount < 0 and  coa >=''$range'' then REPLACE(cal_lastamount, ''-'', '''')
//                                        WHEN type =''C'' and cal_lastamount > 0 and  coa >=''20.00.000'' then -(coalesce(cal_lastamount,0))
//                                        ELSE cal_lastamount
//                                END as calculate_lastamount,
//                                
//                                CASE 		
//                                        WHEN type =''C'' and cal_thisamount < 0 and  coa >=''$range'' then REPLACE(cal_thisamount, ''-'', '''')
//                                        WHEN type =''C'' and cal_thisamount > 0 and  coa >=''20.00.000'' then -(coalesce(cal_thisamount,0))
//                                        ELSE cal_thisamount
//                                END as calculate_thisamount,
//                                
//                                CASE 		
//                                        WHEN type =''C'' and cal_budgetamount < 0 and  coa >=''$range'' then REPLACE(cal_budgetamount, ''-'', '''')
//                                        WHEN type =''C'' and cal_budgetamount > 0 and  coa >=''20.00.000'' then -(coalesce(cal_budgetamount,0))
//                                        ELSE cal_budgetamount
//                                END as calculate_budgetamount,
//                                
//                                CASE 		
//                                        WHEN type =''C'' and cal_lastyear < 0 and  coa >''$range'' then REPLACE(cal_lastyear, ''-'', '''')
//                                        WHEN type =''C'' and cal_lastyear > 0 and  coa >=''20.00.000'' then -(coalesce(cal_lastyear,0))
//                                        ELSE cal_lastyear
//                                END as calculate_lastyear
//
//                        FROM ##tmp_setcalculatebalancesheet0 
//                        WHERE                      
//                            project_id = $this->_project_id
//                        AND pt_id = $this->_pt_id                      
//                    )AS DATA
//          ";
//        $this->_model->customefromquery($sql);
//    }
    
     function rpt_balancesheet_setcalculate() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_setcalculatebalancesheet'') IS NOT NULL DROP TABLE ##tmp_setcalculatebalancesheet0
                    SELECT * INTO ##tmp_setcalculatebalancesheet FROM
                    (                    
                        SELECT 
                                *,
                                case when type=''D'' then coalesce(lastmonth_amount,0) else -(coalesce(lastmonth_amount,0)) end AS calculate_lastamount,
                                case when type=''D'' then coalesce(thismonth_amount,0) else -(coalesce(thismonth_amount,0)) end AS calculate_thisamount,
                                case when type=''D'' then coalesce(budget_amount,0) else -(coalesce(budget_amount,0)) end AS calculate_budgetamount,
                                case when type=''D'' then coalesce(lastyear_amount,0) else -(coalesce(lastyear_amount,0)) end AS calculate_lastyear
                        FROM ##tmp_templatebalancesheet 
                        WHERE                      
                            project_id = $this->_project_id
                        AND pt_id = $this->_pt_id                      
                    )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    function rpt_installstatement_set_total($param) {
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
             IF OBJECT_ID(''tempdb..##tmp_totalinstallment'') IS NOT NULL DROP TABLE ##tmp_totalinstallment
                    SELECT * INTO ##tmp_totalinstallment FROM
                    (   
                SELECT b.parent_code,
                       sum(coalesce(a.calculate_thisamount,0)) as total_thisamount,
                       sum(coalesce(a.calculate_untilthisamount,0)) as total_untilthisamount,
                       sum(coalesce(a.calculate_budgetthisamount,0)) as total_budget_thisamount,
                       sum(coalesce(a.calculate_equalamount,0)) as total_equal_amount
                FROM ##tmp_setcalculate a
                LEFT JOIN m_coa b ON a.coa = b.coa              
                WHERE 
                        a.flag =''I''
                        AND b.project_id=$this->_project_id
                        AND b.pt_id=$this->_pt_id                                                     
                GROUP by b.parent_code
                ) AS DATA
                ";
        $this->_model->customefromquery($sql);
    }

    function rpt_balancesheet_set_total($param) {
        $report = $param['report'];
        $level = $param['level'];        

//       for ($x = $level; $x >= 1; $x--) {
//            echo "The number is: $x <br>";
//        } 
//        
     
        
        $sql = "
             IF OBJECT_ID(''tempdb..##tmp_totalbalancesheet'') IS NOT NULL DROP TABLE ##tmp_totalbalancesheet
                    SELECT * INTO ##tmp_totalbalancesheet FROM
                    (   
                SELECT b.parent_code,
                       sum(coalesce(a.calculate_lastamount,0)) as total_lastamount,
                       sum(coalesce(a.calculate_thisamount,0)) as total_thisamount,
                       sum(coalesce(a.calculate_budgetamount,0)) as total_budgetamount,
                       sum(coalesce(a.calculate_lastyear,0)) as total_lastyear
                FROM ##tmp_setcalculatebalancesheet a
                LEFT JOIN m_coa b ON a.coa = b.coa              
                WHERE 
                        a.flag =''I''
                        AND b.project_id=$this->_project_id
                        AND b.pt_id=$this->_pt_id                                                     
                GROUP by b.parent_code
                ) AS DATA
                ";
        $this->_model->customefromquery($sql);
    }

    function rpt_installstatement_setformat($param) {
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
             IF OBJECT_ID(''tempdb..##tmp_reportinstallment_setformat'') IS NOT NULL DROP TABLE ##tmp_reportinstallment_setformat
                    SELECT * INTO ##tmp_reportinstallment_setformat FROM
                    (   
                        SELECT A.*,			
                            coalesce(B.total_thisamount,0) AS total_thisamount,
                            coalesce(B.total_untilthisamount,0) AS total_untilthisamount,
                            coalesce(B.total_budget_thisamount,0) AS total_budgetthisamount,
                            coalesce(B.total_equal_amount,0) AS total_equalamount,
                            format(coalesce(B.total_thisamount,0), ''#,##0.00'') AS format_total_thisamount,
                            format(coalesce(B.total_untilthisamount,0), ''#,##0.00'') AS format_total_untilthisamount,					
                            format(coalesce(B.total_budget_thisamount,0), ''#,##0.00'') AS format_total_budgetthisamount,					
                            format(coalesce(B.total_equal_amount,0), ''#,##0.00'') AS format_total_equalamount				
                        FROM ##tmp_setcalculate A
                        LEFT JOIN ##tmp_totalinstallment B ON A.coa = b.parent_code	
                        WHERE
                            A.project_id = $this->_project_id
                            AND A.pt_id = $this->_pt_id
                            AND A.report = ''$report''
                            AND A.report_level = $level  


                    ) AS DATA
                ";
        $this->_model->customefromquery($sql);
    }

    function rpt_balancesheet_setformat($param) {
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
             IF OBJECT_ID(''tempdb..##tmp_reportbalancesheet_setformat'') IS NOT NULL DROP TABLE ##tmp_reportbalancesheet_setformat
                    SELECT * INTO ##tmp_reportbalancesheet_setformat FROM
                    (   
                        SELECT A.*,			
                            coalesce(B.total_lastamount,0) AS total_lastamount,
                            coalesce(B.total_thisamount,0) AS total_thisamount,
                            coalesce(B.total_budgetamount,0) AS total_budgetamount,
                            coalesce(B.total_lastyear,0) AS total_lastyear,
                            format(coalesce(B.total_lastamount,0), ''#,##0.00'') AS format_total_lastamount,
                            format(coalesce(B.total_thisamount,0), ''#,##0.00'') AS format_total_thisamount,					
                            format(coalesce(B.total_budgetamount,0), ''#,##0.00'') AS format_total_budgetamount,					
                            format(coalesce(B.total_lastyear,0), ''#,##0.00'') AS format_total_lastyear				
                        FROM ##tmp_setcalculatebalancesheet A
                        LEFT JOIN ##tmp_totalbalancesheet B ON A.coa = b.parent_code	
                        WHERE
                            A.project_id = $this->_project_id
                            AND A.pt_id = $this->_pt_id
                            AND A.report = ''$report''
                            AND A.report_level = $level  


                    ) AS DATA
                ";
        $this->_model->customefromquery($sql);
    }

    function rpt_installment_set_sumtotal() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_setsumtotal'') IS NOT NULL DROP TABLE ##tmp_setsumtotal
                    SELECT * INTO ##tmp_setsumtotal FROM
                    (                    
                       SELECT 			
                        parent_code as coa,	
                        sum(coalesce(a.total_thisamount,0)) as sum_thisamount,
                        sum(coalesce(a.total_untilthisamount,0)) as sum_untilthisamount,
                        sum(coalesce(a.total_budgetthisamount,0)) as sum_budget_thisamount,
                        sum(coalesce(a.total_equalamount,0)) as sum_equal_amount
                FROM ##tmp_reportinstallment_setformat a
                    LEFT JOIN m_coa b ON a.coa = b.coa              
                WHERE 
                    a.flag =''T''
                    AND b.project_id=$this->_project_id
                    AND b.pt_id=$this->_pt_id                                                    
                GROUP by b.parent_code                                             
            )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }


    function rpt_installment() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_reportinstallment'') IS NOT NULL DROP TABLE ##tmp_reportinstallment
                    SELECT * INTO ##tmp_reportinstallment FROM
                    (                    
                       SELECT 			
                        a.*,
                        coalesce(b.sum_thisamount,0) as sum_thisamount,
                        coalesce(b.sum_untilthisamount,0) as sum_untilthisamount,
                        coalesce(b.sum_budget_thisamount,0) as sum_budgetthisamount,
                        coalesce(b.sum_equal_amount,0) as sum_equalamount
                FROM ##tmp_reportinstallment_setformat a
                LEFT JOIN ##tmp_setsumtotal b ON a.coa = b.coa              
                WHERE 
                     a.project_id=$this->_project_id
                    AND a.pt_id=$this->_pt_id                                                    
            )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }
    function rpt_balancesheet_set_sumtotal() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_setsumtotalbalancesheet'') IS NOT NULL DROP TABLE ##tmp_setsumtotalbalancesheet
                    SELECT * INTO ##tmp_setsumtotalbalancesheet FROM
                    (                    
                       SELECT 			
                        parent_code as coa,	
                        sum(coalesce(a.total_lastamount,0)) as sum_lastamount,
                        sum(coalesce(a.total_thisamount,0)) as sum_thisamount,
                        sum(coalesce(a.total_budgetamount,0)) as sum_budgetamount,
                        sum(coalesce(a.total_lastyear,0)) as sum_lastyear
                FROM ##tmp_reportbalancesheet_setformat a
                    LEFT JOIN m_coa b ON a.coa = b.coa              
                WHERE 
                    a.flag =''T''
                    AND b.project_id=$this->_project_id
                    AND b.pt_id=$this->_pt_id                                                    
                GROUP by b.parent_code                                             
            )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }
    
    public  function rpt_balancesheet() {
        $sql = "
                 IF OBJECT_ID(''tempdb..##tmp_reportbalancesheet'') IS NOT NULL DROP TABLE ##tmp_reportbalancesheet
                    SELECT * INTO ##tmp_reportbalancesheet FROM
                    (                    
                       SELECT 			
                                a.*,
                                coalesce(b.sum_lastamount,0) as sum_lastamount,
                                coalesce(b.sum_thisamount,0) as sum_thisamount,
                                coalesce(b.sum_budgetamount,0) as sum_budgetamount,
                                coalesce(b.sum_lastyear,0) as sum_lastyear,
                                (coalesce(a.total_lastamount,0)+coalesce(b.sum_lastamount,0)) as grand_lastamount,
                                (coalesce(a.total_thisamount,0)+coalesce(b.sum_thisamount,0)) as grand_thisamount,
                                (coalesce(a.total_budgetamount,0)+coalesce(b.sum_budgetamount,0)) as grand_budgetamount,
                                (coalesce(a.total_lastyear,0)+coalesce(b.sum_lastyear,0)) as grand_lastyear,
                                format((coalesce(a.total_lastamount,0)+coalesce(b.sum_lastamount,0)), ''#,##0.00'') as format_grand_lastamount,
                                format((coalesce(a.total_thisamount,0)+coalesce(b.sum_thisamount,0)), ''#,##0.00'') as format_grand_thisamount,
                                format((coalesce(a.total_budgetamount,0)+coalesce(b.sum_budgetamount,0)), ''#,##0.00'') as format_grand_budgetamount,
                                format((coalesce(a.total_lastyear,0)+coalesce(b.sum_lastyear,0)), ''#,##0.00'') as format_grand_lastyear
                        FROM ##tmp_reportbalancesheet_setformat a
                        LEFT JOIN ##tmp_setsumtotalbalancesheet b ON a.coa = b.coa              
                        WHERE 
                             a.project_id=$this->_project_id
                            AND a.pt_id=$this->_pt_id                                                    
            )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    public function get_sumday($fromdate,$untildate){      
        $sql = "select dbo.f_calculate_day(''$fromdate'', ''$untildate'') as sumday";
        $result = $this->_model->customefromquery($sql);
        return $result[0][0]['sumday'];
    }
    
    public function updateprefixjournal($data){
        $to_id = $data['prefix_id'];
        $journal_id = $data['journal_id'];
        
        $sql = "UPDATE  $this->_th_journal
                SET 
                prefix_id = $to_id,  
                modion = ''$this->_curdatetime'',  
                modiby = $this->_user_id
                WHERE 
                        project_id=$this->_project_id
                    AND pt_id=$this->_pt_id  
                    AND journal_id=$journal_id    
            ";
        $this->_model->customefromquery($sql);
    }   
    public function updatevoucherdatejournal($data){
        $to = $data['voucher_date'];
        $journal_id = $data['journal_id'];
        $sql = "UPDATE  $this->_th_journal
                SET 
                voucher_date = ''$to'',  
                modion = ''$this->_curdatetime'',  
                modiby = $this->_user_id  
                WHERE 
                        project_id=$this->_project_id
                    AND pt_id=$this->_pt_id  
                    AND journal_id=$journal_id    
            ";
        $this->_model->customefromquery($sql);
    }   
    public function updatevouchernojournal($data){
        $to = $data['voucher_no'];
        $journal_id = $data['journal_id'];
        $sql = "UPDATE  $this->_th_journal
                SET 
                voucher_no = ''$to'',  
                modion = ''$this->_curdatetime'',  
                modiby = $this->_user_id  
                WHERE 
                        project_id=$this->_project_id
                    AND pt_id=$this->_pt_id  
                    AND journal_id=$journal_id    
            ";
        $this->_model->customefromquery($sql);
    }   
  
//    public function checkgetalldata() {
//        $sql = "SELECT * FROM ##tmp_setcalculatebalancesheet";
//        $result = $this->_model->customefromquery($sql);
//        //print_r($result);
//    }

}
