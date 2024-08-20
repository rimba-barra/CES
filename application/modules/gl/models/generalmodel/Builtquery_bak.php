<?php

class Gl_Models_Generalmodel_Builtquery_bak extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    private $_dbtemporary = null;
    private $_showdata = null;
    private $_showdatasum = null;
    private $_groupby = null;
    private $_groupbysum = null;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
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
     
     
   function rpt_installstatement_set_total($param){
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
             IF OBJECT_ID(''tempdb..##tmp_totalinstallment'') IS NOT NULL DROP TABLE ##tmp_totalinstallment
                    SELECT * INTO ##tmp_totalinstallment FROM
                    (   
                SELECT b.parent_code,
                       sum(coalesce(a.this_amount,0)) as total_thisamount,
                       sum(coalesce(a.until_thisamount,0)) as total_untilthisamount,
                       sum(coalesce(a.budget_thisamount,0)) as total_budget_thisamount,
                       sum(coalesce(a.equal_amount,0)) as total_equal_amount
                FROM ##tmp_templateinstallment a
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
     
     function rpt_installstatement($param){
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
             IF OBJECT_ID(''tempdb..##tmp_reportinstallment'') IS NOT NULL DROP TABLE ##tmp_reportinstallment
                    SELECT * INTO ##tmp_reportinstallment FROM
                    (   
                        SELECT A.*,			
                            coalesce(B.total_thisamount,0) AS total_thisamount,
                            coalesce(B.total_untilthisamount,0) AS total_untilthisamount,
                            format(coalesce(B.total_thisamount,0), ''#,##0.00'') AS format_total_thisamount,
                            format(coalesce(B.total_untilthisamount,0), ''#,##0.00'') AS format_total_untilthisamount					
                        FROM ##tmp_templateinstallment A
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
   

     
    public function checkgetalldata() {
        $sql = "SELECT * FROM ##tmp_templateinstallment";
        $result = $this->_model->customefromquery($sql);
       // print_r($result);
    }

}
