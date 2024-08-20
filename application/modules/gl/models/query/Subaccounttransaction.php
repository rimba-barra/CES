<?php

class Gl_Models_Query_Subaccounttransaction extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    private $_showdata = null;
    private $_showdatasum = null;
    private $_groupby = null;
    private $_groupbysum = null;

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
        //end parameter    
        //start table from db
        $this->_m_coa = 'm_coa';
        $this->_m_prefix = 'm_prefix';
        $this->_m_kelsub = 'm_kelsub';
        $this->_m_subgl = 'm_subgl';
        $this->_m_summary = 'm_summary';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_td_jurnalsubdetail = 'td_jurnalsubdetail';

        //end table from db
        //start create temporary for report   
        $this->_tmp_datasub = '##tmp_datasub_' . $this->_user_id;
        $this->_tmp_getdata1 = '##tmpt_getdata1_' . $this->_user_id;
        $this->_tmp_getdata2 = '##tmpt_getdata2_' . $this->_user_id;
        $this->_tmp_sum_debetsub = '##tmp_sum_debetsub_' . $this->_user_id;
        $this->_tmp_sum_creditsub = '##tmp_sum_creditsub_' . $this->_user_id;
        $this->_tmp_unionsub = '##tmp_unionsub_' . $this->_user_id;
        $this->_tmp_sum_debet1 = '##tmp_sum_debet1_' . $this->_user_id;
        $this->_tmp_sum_credit1 = '##tmp_sum_credit1_' . $this->_user_id;
        $this->_tmp_union1 = '##tmp_union1_' . $this->_user_id;
        $this->_tmp_sum_debet2 = '##tmp_sum_debet2_' . $this->_user_id;
        $this->_tmp_sum_credit2 = '##tmp_sum_credit2_' . $this->_user_id;
        $this->_tmp_union2 = '##tmp_union2_' . $this->_user_id;
        $this->_tmp_beginingbalance = '##tmp_beginingbalance_' . $this->_user_id;
        $this->_tmp_totalrange = '##tmp_totalrange_' . $this->_user_id;
        $this->_tmp_sumdebetcredit = '##tmp_sumdebetcredit_' . $this->_user_id;
        $this->_tmp_totalendrange = '##tmp_totalendrange_' . $this->_user_id;
        $this->_tmp_outdata = '##tmp_outdata_' . $this->_user_id;
        $this->_tmp_unionendtotal = '##tmp_unionendtotal_' . $this->_user_id;
        $this->_tmp_totaldata = '##tmp_totaldata_' . $this->_user_id;
        $this->_tmp_granddata = '##tmp_granddata_' . $this->_user_id;
        $this->_tmp_bindingdata = '##tmp_bindingdata_' . $this->_user_id;
        $this->_tmp_sumdataaccount = '##tmp_sumdataaccount_' . $this->_user_id;
        $this->_tmp_finaldata = '##tmp_finaldata_' . $this->_user_id;
        $this->_tmp_rpt = '##tmp_rpt_' . $this->_user_id;
        //end create temporary for report                
    }

    function getrangekelsub($fromcoa, $untilcoa, $pt_id) {
     
        $sql = "

                SELECT COUNT(a.coa_id) AS COUNTERDATA FROM $this->_m_coa a
                LEFT JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id
                WHERE
                    a.active=1
                    and a.deleted=0
                  
                    and a.pt_id=$pt_id
                    and a.coa between ''$fromcoa'' and ''$untilcoa''        
                    and b.kelsub is not null    

                SELECT a.kelsub_id,b.kelsub,b.description FROM $this->_m_coa a
                LEFT JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id
                WHERE
                    a.active=1
                    and a.deleted=0
                 
                    and a.pt_id=$pt_id
                    and a.coa between ''$fromcoa'' and ''$untilcoa''  
                    and b.kelsub is not null    
                 ORDER BY b.kelsub ASC       
            ";

        $result = $this->_model->customefromquery($sql);
        $return = array("kelsub_id" => 0, "kelsub" => null);

        if ($result[0][0]['COUNTERDATA'] > 0) {
            $kelsub_id = array();
            $kelsub = array();
            $last_id = '';
            foreach ($result[1] as $row) {
                if ($row['kelsub_id'] !== $last_id) {
                    $kelsub_id[] = $row['kelsub_id'];
                    $kelsub[] = $row['kelsub'];
                }
                $last_id = $row['kelsub_id'];
            }
            $return['kelsub_id'] = implode(',', $kelsub_id);
            $return['kelsub'] = $kelsub;
        }

        return $return;
    }

    function setCondition($param, $flag) {
        //START SET VARIABEL
        $project_id = $this->_project_id;
        $pt_id = $this->_pt_id;
        $paramdate = $param['paramdate'];
        $reportby = $param['reportby'];
        $voucherby = $param['voucherby'];
        $subby = $param['subby'];
        $detailby = $param['detailby'];
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        $kelsubid = $param['kelsubid'];
       // $fromkelsub = $param['fromkelsub'];
       // $untilkelsub = $param['untilkelsub'];
        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromsubcode = $param['fromsubcode'];
       // $untilsubcode = $param['untilsubcode'];
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
        //$where.= " AND a.project_id=$project_id";
        $where.= " AND a.pt_id=$pt_id";
        if ($voucherby == false) {
            $where.= " AND f.is_cashflow=1";
        }
        $where.= " AND b.coa >=''$fromcoa'' AND b.coa <=''$untilcoa''";
        //$where.= " AND b.kelsub >=''$fromkelsub'' AND b.kelsub <=''$untilkelsub''";
        $where.= " AND b.kelsub_id =''$kelsubid''";

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
            //$where.= " AND c.code >=''$fromsubcode'' AND c.code <=''$untilsubcode''";
            $where.= " AND c.code =''$fromsubcode''";
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
        $project_id = $this->_project_id;
        $pt_id = $this->_pt_id;
        $paramdate = $param['paramdate'];
        $reportby = $param['reportby'];
        $voucherby = $param['voucherby'];
        $subby = $param['subby'];
        $detailby = $param['detailby'];
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        //$fromkelsub = $param['fromkelsub'];
        //$untilkelsub = $param['untilkelsub'];
        $kelsubid = $param['kelsubid'];
        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromsubcode = $param['fromsubcode'];
      //  $untilsubcode = $param['untilsubcode'];
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
        //$where.= " AND a.project_id=$project_id";
        $where.= " AND a.pt_id=$pt_id";
        $where.= " AND a.voucher_date >=''$fromdate'' AND a.voucher_date <=''$untildate'' AND a.voucher_no NOT IN(''MJ0001/01'')";

        if ($voucherby == false) {
            $where.= " AND f.is_cashflow=1";
        }
        $where.= " AND b.coa >=''$fromcoa'' AND b.coa <=''$untilcoa''";
        //$where.= " AND b.kelsub >=''$fromkelsub'' AND b.kelsub <=''$untilkelsub''";
        $where.= " AND b.kelsub_id =''$kelsubid''";

        if ($subby == true) {
            //$where.= " AND c.code >=''$fromsubcode'' AND c.code <=''$untilsubcode''";
            $where.= " AND c.code =''$fromsubcode''";
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
                            FROM $this->_th_jurnal a 
                            LEFT JOIN $this->_td_jurnaldetail b on a.journal_id = b.journal_id 
                            LEFT JOIN $this->_td_jurnalsubdetail c on b.journaldetail_id = c.journaldetail_id 
                            LEFT JOIN $this->_m_coa d on b.coa_id = d.coa_id 
                            LEFT JOIN $this->_m_subgl e on c.subgl_id = e.subgl_id 
                            LEFT JOIN $this->_m_prefix f on f.prefix_id = a.prefix_id
                            ";

        return $query;
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
                    IF OBJECT_ID(''tempdb..$this->_tmp_datasub'') IS NOT NULL DROP TABLE $this->_tmp_datasub
                    SELECT * INTO $this->_tmp_datasub FROM
                        (   
                            $field
                            $where) AS DATA 
                        
                     ";

        //print_r($sql);
        //sudah sama
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_debetsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sum_debetsub'') IS NOT NULL DROP TABLE $this->_tmp_sum_debetsub
                    SELECT * INTO $this->_tmp_sum_debetsub FROM
                    (
                        SELECT $this->_showdata,sum(coalesce(A.amountsub,0)) tot_debetsub
                        FROM $this->_tmp_datasub A
                        WHERE
                             A.typetrx=''D''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_creditsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sum_creditsub'') IS NOT NULL DROP TABLE $this->_tmp_sum_creditsub
                    SELECT * INTO $this->_tmp_sum_creditsub FROM
                    (
                        SELECT $this->_showdata,sum(coalesce(A.amountsub,0)) tot_creditsub
                        FROM $this->_tmp_datasub A
                        WHERE
                             A.typetrx=''C''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_set_unionsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_unionsub'') IS NOT NULL DROP TABLE $this->_tmp_unionsub
                    SELECT * INTO $this->_tmp_unionsub FROM
                    (
                        SELECT * FROM  $this->_tmp_sum_debetsub
                        UNION
                        SELECT * FROM  $this->_tmp_sum_creditsub
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_getalldata_beginingbalance($param) {
        $where = $this->setCondition($param, 'beginingbalance');
        $field = $this->setField();
        $sql = "
                    IF OBJECT_ID(''tempdb..$this->_tmp_getdata1'') IS NOT NULL DROP TABLE $this->_tmp_getdata1
                    SELECT * INTO $this->_tmp_getdata1 FROM
                        ( 
                            $field
                            $where) AS DATA 
                        
                     ";

        //print_r($sql);
        //sudah sama
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_debet1() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sum_debet1'') IS NOT NULL DROP TABLE $this->_tmp_sum_debet1
                    SELECT * INTO $this->_tmp_sum_debet1 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''D'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM $this->_tmp_getdata1 A
                        WHERE
                             A.typetrx=''D''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_credit1() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sum_credit1'') IS NOT NULL DROP TABLE $this->_tmp_sum_credit1
                    SELECT * INTO $this->_tmp_sum_credit1 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''C'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM $this->_tmp_getdata1 A
                        WHERE
                             A.typetrx=''C''    
                        $this->_groupby      
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_set_union1() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_union1'') IS NOT NULL DROP TABLE $this->_tmp_union1
                    SELECT * INTO $this->_tmp_union1 FROM
                    (
                        SELECT * FROM  $this->_tmp_sum_debet1
                        UNION
                        SELECT * FROM  $this->_tmp_sum_credit1
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_getalldata_totalrange($param) {
        $where = $this->setConditionsub($param);
        $field = $this->setField();
        $sql = "
                    IF OBJECT_ID(''tempdb..$this->_tmp_getdata2'') IS NOT NULL DROP TABLE $this->_tmp_getdata2
                    SELECT * INTO $this->_tmp_getdata2 FROM
                        (   
                            $field
                            $where) AS DATA 
                        
                     ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_debet2() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sum_debet2'') IS NOT NULL DROP TABLE $this->_tmp_sum_debet2
                    SELECT * INTO $this->_tmp_sum_debet2 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''D'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM $this->_tmp_getdata2 A
                        WHERE
                             A.typetrx=''D''
                        $this->_groupby     
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_setsum_credit2() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sum_credit2'') IS NOT NULL DROP TABLE $this->_tmp_sum_credit2
                    SELECT * INTO $this->_tmp_sum_credit2 FROM
                    (
                        SELECT $this->_showdata,sum(case when A.typecoa=''C'' then coalesce(A.amountsub,0) else -(coalesce(A.amountsub,0)) end) tot_amountsub
                        FROM $this->_tmp_getdata2 A
                        WHERE
                             A.typetrx=''C''
                        $this->_groupby      
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_set_union2() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_union2'') IS NOT NULL DROP TABLE $this->_tmp_union2
                    SELECT * INTO $this->_tmp_union2 FROM
                    (
                        SELECT * FROM  $this->_tmp_sum_debet2
                        UNION
                        SELECT * FROM  $this->_tmp_sum_credit2
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_sum_totalrange() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_totalrange'') IS NOT NULL DROP TABLE $this->_tmp_totalrange
                    SELECT * INTO $this->_tmp_totalrange FROM
                    (
                       SELECT $this->_showdatasum,SUM(COALESCE(A.tot_amountsub,0)) as totalrange
                       FROM $this->_tmp_union2 A
                       $this->_groupbysum
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_sum_debet_credit() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sumdebetcredit'') IS NOT NULL DROP TABLE $this->_tmp_sumdebetcredit
                    SELECT * INTO $this->_tmp_sumdebetcredit FROM
                    (                    
                       SELECT $this->_showdatasum,coalesce(B.tot_amountsub,0) as tot_amountsub_Debet,coalesce(C.tot_amountsub,0) as tot_amountsub_Credit
                       FROM $this->_tmp_totalrange A
                       LEFT JOIN  $this->_tmp_sum_debet2 B on A.coa=B.coa and A.code=B.code
                       LEFT JOIN  $this->_tmp_sum_credit2 C on A.coa=B.coa and A.code=C.code
                     )AS DATA
               ";

        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_sum_beginingbalance() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_beginingbalance'') IS NOT NULL DROP TABLE $this->_tmp_beginingbalance
                    SELECT * INTO $this->_tmp_beginingbalance FROM
                    (
                       SELECT $this->_showdatasum,SUM(COALESCE(A.tot_amountsub,0)) as beginingbalanceamount
                       FROM $this->_tmp_union1 A
                       $this->_groupbysum
                     )AS DATA
               ";
        $this->_model->customefromquery($sql);
    }

    public function rpt_subtrx_sum_totalendrange() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_totalendrange'') IS NOT NULL DROP TABLE $this->_tmp_totalendrange
                    SELECT * INTO $this->_tmp_totalendrange FROM
                    (                    
                       SELECT $this->_showdatasum,coalesce(B.beginingbalanceamount,0) AS beginingbalanceamount,coalesce(A.totalrange,0) totalrange,coalesce(A.totalrange,0)+coalesce(B.beginingbalanceamount,0) as tot_endrange
                       FROM $this->_tmp_totalrange A
                       LEFT JOIN $this->_tmp_beginingbalance B ON A.coa = B.coa AND A.code = B.code
                     )AS DATA
                     
                  IF OBJECT_ID(''tempdb..$this->_tmp_outdata'') IS NOT NULL DROP TABLE $this->_tmp_outdata
                    SELECT * INTO $this->_tmp_outdata FROM
                    ( 
                    SELECT  a.*,0 as totalrange,a.beginingbalanceamount as tot_endrange
                    FROM $this->_tmp_beginingbalance a				
                    WHERE a.beginingbalanceamount not in(0)
                    AND a.code not in (select b.code from $this->_tmp_totalendrange b)	
		  ) AS DATA
                  

                   IF OBJECT_ID(''tempdb..$this->_tmp_unionendtotal'') IS NOT NULL DROP TABLE $this->_tmp_unionendtotal
                    SELECT * INTO $this->_tmp_unionendtotal FROM
                    (  	
                            SELECT * FROM $this->_tmp_outdata
                            UNION ALL
                            SELECT * FROM $this->_tmp_totalendrange
                    ) AS DATA                 

               ";

        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_settotaldata() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_totaldata'') IS NOT NULL DROP TABLE $this->_tmp_totaldata
                    SELECT * INTO $this->_tmp_totaldata FROM
                    (                    
                       SELECT $this->_showdatasum,A.beginingbalanceamount,A.totalrange,A.tot_endrange,coalesce(C.tot_debetsub,0) as amountdebet,B.tot_amountsub_Debet,coalesce(D.tot_creditsub,0) as amountcredit,((coalesce(C.tot_debetsub,0)-coalesce(D.tot_creditsub,0))+A.beginingbalanceamount)AS endbalanceamount,B.tot_amountsub_Credit
                       FROM $this->_tmp_unionendtotal A
                       LEFT JOIN $this->_tmp_sumdebetcredit B ON A.coa = B.coa AND B.code = A.code
                       LEFT JOIN $this->_tmp_sum_debetsub C ON A.coa = C.coa AND C.code = A.code
                       LEFT JOIN $this->_tmp_sum_creditsub D ON A.coa = D.coa AND D.code = A.code
                     )AS DATA
          ";

        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_setgrandtotal() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_granddata'') IS NOT NULL DROP TABLE $this->_tmp_granddata
                    SELECT * INTO $this->_tmp_granddata FROM
                    (                    
                       SELECT A.project_id,A.pt_id,A.user_id,A.createreportdate,
                           SUM(coalesce(A.beginingbalanceamount,0)) AS grand_beginingbalance,
                           SUM(coalesce(A.amountdebet,0)) AS grand_amountdebet,
                           SUM(coalesce(A.amountcredit,0)) AS grand_amountcredit,
                           SUM(coalesce(A.beginingbalanceamount,0))+SUM(coalesce(A.amountdebet,0))-SUM(coalesce(A.amountcredit,0)) AS grand_endbalanceamount
                       FROM $this->_tmp_totaldata A  
                       GROUP BY A.project_id,A.pt_id,A.user_id,A.createreportdate
                     )AS DATA
          ";

        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_bindingdata() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_bindingdata'') IS NOT NULL DROP TABLE $this->_tmp_bindingdata
                    SELECT * INTO $this->_tmp_bindingdata FROM
                    (                    
                       SELECT B.*,A.project_id AS project_id_binding,A.pt_id AS pt_id_binding,A.user_id,A.createreportdate,
                                  A.coa AS coa_binding,A.coaname AS coaname_binding,A.code AS code_binding ,A.subgldesc AS subgldesc_binding,
                                  coalesce(A.beginingbalanceamount,0) as beginingbalanceamount,
                                  coalesce(A.amountdebet,0) as amountdebet,
                                  coalesce(A.amountcredit,0) as amountcredit,
                                  coalesce(A.endbalanceamount,0) as endbalanceamount,
                                  coalesce(A.tot_amountsub_Debet,0) as tot_amountsub_Debet,
                                  coalesce(A.tot_amountsub_Credit,0) as tot_amountsub_Credit,
                                  coalesce(A.totalrange,0) as totalrange,
                                  coalesce(A.tot_endrange,0) as tot_endrange,
                                  coalesce(C.grand_beginingbalance,0) as grand_beginingbalance,
                                  coalesce(C.grand_amountdebet,0) as grand_amountdebet,
                                  coalesce(C.grand_amountcredit,0) as grand_amountcredit,
                                  coalesce(C.grand_endbalanceamount,0) as grand_endbalanceamount
                       FROM $this->_tmp_totaldata A
                       LEFT JOIN $this->_tmp_datasub B ON A.coa = B.coa AND B.code = A.code                     
                       LEFT JOIN $this->_tmp_granddata C ON A.project_id = C.project_id AND A.pt_id = C.pt_id                    
                     )AS DATA
          ";
        $this->_model->customefromquery($sql);
    }

    function rpt_subtrx_createsumdataaccount() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sumdataaccount'') IS NOT NULL DROP TABLE $this->_tmp_sumdataaccount
                SELECT * INTO $this->_tmp_sumdataaccount FROM
                (                    
                SELECT 	
                           coa_binding,
			   SUM(DISTINCT(beginingbalanceamount)) AS sum_beginingbalance,
			   SUM(DISTINCT(amountdebet)) AS sum_amountdebet,
			   SUM(DISTINCT(amountcredit)) AS sum_amountcredit,
			   SUM(DISTINCT(endbalanceamount)) AS sum_endbalanceamount
                FROM $this->_tmp_bindingdata 
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
                 IF OBJECT_ID(''tempdb..$this->_tmp_finaldata'') IS NOT NULL DROP TABLE $this->_tmp_finaldata
                    SELECT * INTO $this->_tmp_finaldata FROM
                    (                    
                       SELECT A.*,
                       coalesce(B.sum_beginingbalance,0) AS sum_beginingbalance,
                       coalesce(B.sum_amountdebet,0) sum_amountdebet,
                       coalesce(B.sum_amountcredit,0) sum_amountcredit,
                       coalesce(B.sum_beginingbalance,0)+(coalesce(B.sum_amountdebet,0)-coalesce(B.sum_amountcredit,0)) AS sum_endbalanceamount
                      -- B.sum_endbalanceamount
                       FROM $this->_tmp_bindingdata A
                       LEFT JOIN $this->_tmp_sumdataaccount B ON A.coa_binding = b.coa_binding                                   
                     )AS DATA
          ";
        $this->_model->customefromquery($sql);
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_rpt'') IS NOT NULL DROP TABLE $this->_tmp_rpt
                    SELECT * INTO $this->_tmp_rpt FROM
                    (
                        SELECT *,
                        CASE WHEN typetrx=''D'' THEN amountsub ELSE 0 end debet,
                        CASE WHEN typetrx=''C'' THEN amountsub ELSE 0 end credit                            
                        FROM $this->_tmp_finaldata  
                        WHERE
                           project_id_binding=$this->_project_id
                           and pt_id_binding=$this->_pt_id
                           and user_id = $this->_user_id
                    )AS DATA
                ";
        $this->_model->customefromquery($sql);
        $query = " SELECT * FROM $this->_tmp_rpt ORDER BY coa,voucher_date,voucher_no";
        $return = array("cluster" => $query);
        return $return;
    }

}
