<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Cashpositionreportb extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $_counter= null;
    private $_tmp_head= null;
    private $_tmp_head_sum= null;
    private $_tmp_kasbankdetail= null;
    private $_tmp_kasbon= null;
    private $_tmp_kasbon_project= null;
    private $_tmp_kasbon_project_grouping= null;
    private $_tmp_loanproject= null;
    private $_fisik_tmp_cashpos2_head = null;
    private $_fisik_tmp_cashpos2_head_sum = null;
    private $_fisik_tmp_cashpos2_kasbank_kasbon = null;
    private $_fisik_tmp_cashpos2_kasbankdetail = null;
    private $_fisik_tmp_cashpos2_loanpayment = null;
  
    
    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->_user_id = $this->_session->getUserId();
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting->setConnection();
        $this->_fisik_tmp_cashpos2_head = 'tmp_cashpos2_head';
        $this->_fisik_tmp_cashpos2_head_sum = 'tmp_cashpos2_head_sum';
        $this->_fisik_tmp_cashpos2_kasbank_kasbon = 'tmp_cashpos2_kasbank_kasbon';
        $this->_fisik_tmp_cashpos2_kasbankdetail = 'tmp_cashpos2_kasbankdetail';
        $this->_fisik_tmp_cashpos2_loanpayment = 'tmp_cashpos2_loanpayment';
        $this->_tmp_head = '##tmp_rpt_cashpos2_head' . $this->setting->_user_id;
        $this->_tmp_head_sum = '##tmp_rpt_cashpos2_head_sum' . $this->setting->_user_id;
        $this->_tmp_kasbankdetail = '##tmp_rpt_cashpos2_kasbankdetail' . $this->setting->_user_id;
        $this->_tmp_kasbon = '##tmp_rpt_cashpos2_kasbon' . $this->setting->_user_id;
        $this->_tmp_kasbon_project = '##tmp_rpt_cashpos2_kasbonproject' . $this->setting->_user_id;
        $this->_tmp_kasbon_project_grouping = '##tmp_rpt_cashpos2_kasbonproject_grouping' . $this->setting->_user_id;
        $this->_tmp_loanproject = '##tmp_rpt_cashpos2_loanproject' . $this->setting->_user_id;
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->cleandata_head();
                        $this->cleandata_head_sum();
                        $this->cleandata_detail();
                        $this->cleandata_detail_kasbon();
                        $this->cleandata_loanpayment();
                        //$this->build_query($param);
                        $tmp = $this->get_datatmp();
                        $param['is_backdate'] = ($param['backdate']==1)?'Yes':'No'; 
                        $param['user_id']= $this->setting->_user_id;
                        $param['user_project_id']= $this->setting->_project_id;
                        $param['user_pt_id']= $this->setting->_pt_id;
                        $param['q']= $tmp;
                        $data = $param;
                        $counter = 1; //force 1
                        //$counter = $this->_counter;
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    public function build_query($param) {
        /* start setup valiable param */
        $formatreport = $param['optionformat'];
        /* end setup valiable param */
        if ($formatreport == 'detailcash') {
            $this->query_detailcash($param);
        } else if ($formatreport == 'summary') {
            $this->query_detailcash($param);
        } else {
            $this->query_summaryall($param);
        }
    }

    public function query_detailcash($param) {
        /* start setup valiable table */
        $m_project = $this->setting->_m_project;
        $m_pt = $this->setting->_m_pt;
        $th_kasbank = $this->setting->_th_kasbank;
        $td_kasbankdetail = $this->setting->_td_kasbankdetail;
        $th_kasbon = $this->setting->_th_kasbon;
        $m_grouptrans = $this->setting->_m_grouptrans;
        $m_coa = $this->setting->_m_coa;
        $td_kasbank_kasbon = $this->setting->_td_kasbank_kasbon;
        $th_loan = $this->setting->_th_loan;
        $td_loanpayment = $this->setting->_td_loanpayment;
        /* end setup valiable table */

        /* start setup valiable */
        $formatreport = $param['optionformat'];
        $fromdate = date('Y-m-d', strtotime($param['fromperiode']));
        $untildate = date('Y-m-d', strtotime($param['untilperiode']));
        $project_id = $this->setting->_project_id;
        $in_ptid = $param['in_pt'];
        $grouptrans_id = $param['grouptrans_id'];
        $in_coa = $param['in_coa'];
        $dataflow = $param['typetrans'];
        $allcompany = $param['allcompany'];
        $in_pt = $param['in_pt'];
        /* end setup valiable  */

        //Filter Group Trans
        $sqlcoakasbank = " AND sub_c.coa IN($in_coa)";

        $sqlgrouptrans = " ";
        if ($param['allgroup'] == 0) {
            $sqlgrouptrans = " AND sub_b.grouptrans_id=$grouptrans_id";
        }

        $sql_inheadpt = '';
        if ($allcompany !== '1') {
            $sql_inheadpt = " AND a.pt_id IN('$in_pt') ";
        }


        $sqlkasbankheader = "
                
                SELECT a.kasbank,a.projectname,a.project_id,a.ptname,a.pt_id,
                (
                        (
                                SELECT COALESCE(SUM(sub_a.amount),0) 
                                FROM 
                                        $th_kasbank sub_a
                                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = sub_a.grouptrans_id
                                LEFT JOIN $m_coa sub_c on sub_c.coa_id = sub_a.coa_id
                                WHERE 
                                        sub_a.kasbank = a.kasbank 
                                        AND sub_a.pt_id = a.pt_id 
                                        AND sub_a.dataflow = 'I' 
                                        AND convert(date,sub_a.accept_date) < '$fromdate' 
                                        AND sub_a.deleted=0    
                                        $sqlcoakasbank
                                        $sqlgrouptrans
                                           
                        )
                        -
                        (
                                SELECT COALESCE(SUM(sub_a.amount),0) 
                                FROM 
                                        $th_kasbank sub_a
                                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = sub_a.grouptrans_id
                                LEFT JOIN $m_coa sub_c on sub_c.coa_id = sub_a.coa_id
                                WHERE 
                                        sub_a.kasbank = a.kasbank
                                        AND sub_a.deleted=0    
                                        AND sub_a.pt_id = a.pt_id 
                                        AND sub_a.dataflow = 'O' 
                                        AND convert(date,sub_a.accept_date)  < '$fromdate'
                                        $sqlcoakasbank
                                        $sqlgrouptrans
                        )
                   ) AS beginingbalance,
                   (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                        $th_kasbank sub_a
                                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = sub_a.grouptrans_id
                                LEFT JOIN $m_coa sub_c on sub_c.coa_id = sub_a.coa_id 
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0   
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'I' 
                                AND convert(date,sub_a.accept_date) between '$fromdate' AND '$untildate'
                                    
                                $sqlcoakasbank
                                $sqlgrouptrans    
                  ) AS debit,
                  (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                        $th_kasbank sub_a
                                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = sub_a.grouptrans_id
                                LEFT JOIN $m_coa sub_c on sub_c.coa_id = sub_a.coa_id
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'I'                                
                                AND convert(date,sub_a.accept_date) between '$fromdate' AND '$untildate'    
                                $sqlcoakasbank
                                $sqlgrouptrans
                ) AS debitbank,
                (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                 $th_kasbank sub_a
                                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = sub_a.grouptrans_id
                                LEFT JOIN $m_coa sub_c on sub_c.coa_id = sub_a.coa_id 
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'O' 
                                AND convert(date,sub_a.accept_date) between '$fromdate' AND '$untildate'     
                                $sqlcoakasbank
                                $sqlgrouptrans

                  ) AS credit,
                  (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                 $th_kasbank sub_a
                                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = sub_a.grouptrans_id
                                LEFT JOIN $m_coa sub_c on sub_c.coa_id = sub_a.coa_id 
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'O'                              	
                                AND convert(date,sub_a.accept_date) between '$fromdate' AND '$untildate' 
                                $sqlcoakasbank
                                $sqlgrouptrans
                  ) AS creditbank,
                  (
                        SELECT COALESCE(SUM(amount),0) 
                        FROM $th_kasbon 
                        WHERE 
                        pt_id = a.pt_id 
                        AND deleted=0
                        AND status IN ('T') 
                        AND status_special = 'N' 
                        AND monitoring = 0 
                        AND convert(date,claim_date) between '$fromdate' AND '$untildate'     
                 ) AS cashbon,
                 (
                        SELECT COALESCE(SUM(amount),0) 
                        FROM $th_kasbon 
                        WHERE 
                        pt_id = a.pt_id 
                        AND deleted=0
                        AND status IN ('T') 
                        AND status_special = 'Y' 
                        AND monitoring = 0 
                        AND convert(date,claim_date) between '$fromdate' AND '$untildate'       
                 ) AS loanproject
        FROM (
                SELECT DISTINCT a.kasbank,a.project_id,a.pt_id,b.name as projectname,c.name as ptname 
                FROM $th_kasbank a 
                LEFT JOIN $m_project b on b.project_id = a.project_id
                LEFT JOIN $m_pt c on c.pt_id = a.pt_id
                LEFT JOIN $m_grouptrans sub_b on sub_b.grouptrans_id = a.grouptrans_id    
                WHERE   
                        a.project_id = $project_id
                        AND a.deleted=0    
                        AND convert(date,a.accept_date) between '$fromdate' AND '$untildate'     
                        AND a.kasbank ='KAS'
                        $sqlgrouptrans
            ";
        if ($param['allcompany'] == 0) {
            $sqlkasbankheader .= " AND a.pt_id IN ($in_ptid)";
        }

        $sqlkasbankheader .= " ) a ";
        $sqlkasbankheader .= " ORDER BY a.projectname,a.ptname";
        
        //echo $sqlkasbankheader;

        $execheader = $this->setting->execquery($sqlkasbankheader);
        if ($execheader) {
            $this->cleandata_head();
            $dataheader = $this->setting->getarray($execheader);
            if (is_array($dataheader) && !empty($dataheader)) {
                $this->createdata_head($dataheader);
            }

            $sql_inpt = "";
            $sql_inptsub = "";
            $sql_inpthead = "";
            $sql_inptnoprefix = "";
            if ($allcompany !== '1') {
                $sql_inptnoprefix = " AND pt_id IN('$in_pt') ";
                $sql_inpt = " AND a.pt_id IN('$in_pt') ";
                $sql_inpthead = " AND head_b.pt_id IN('$in_pt') ";
                $sql_inptsub = " AND sub_b.pt_id IN('$in_pt') ";
            }


            $sqldataflow = "";
            $sqldataflowhead = "";
            $sqldataflowsub = "";
            if ($dataflow !== 'all') {
                $sqldataflow = " AND a.dataflow ='$dataflow' ";
                $sqldataflowhead = " AND head_b.dataflow ='$dataflow' ";
                $sqldataflowsub = " AND sub_b.dataflow ='$dataflow' ";
            }


            $sqldetailgrouptrans_no_sub = " ";
            $sqldetailgrouptrans_head = " ";
            $sqldetailgrouptrans = " ";
            if ($param['allgroup'] == 0) {
                $sqldetailgrouptrans = " AND sub_a.grouptrans_id=$grouptrans_id";
                $sqldetailgrouptrans_head = " AND head_b.grouptrans_id=$grouptrans_id";
                $sqldetailgrouptrans_no_sub = " AND a.grouptrans_id=$grouptrans_id";
            }

            $sqlkasbankdetail = "
               SELECT *,'1' as leveldata FROM (
                            SELECT 
                            a.kasbank_id,
                            a.transno,
                            a.voucher_no,
                            a.accept_date,
                            a.chequegiro_no,
                            a.dataflow,
                            a.description,
                            a.grouptrans_id,
                            a.kasbank,
                            sub_c.coa, 
                            a.project_id,
                            a.pt_id,
                            a.amount,
                            COALESCE(b.beginingbalance,0) + COALESCE(c.beginingbalance,0) AS beginingbalance,
                            COALESCE(b.sum_debit,0)+COALESCE(c.sum_debit,0) AS sum_debit, 
                            COALESCE(b.sum_credit,0)+COALESCE(c.sum_credit,0) AS sum_credit,
                            IIF(a.dataflow='I',a.amount,0) AS debit,
                            IIF(a.dataflow='O',a.amount,0) AS credit,
                            COALESCE(b.beginingbalance,0) + COALESCE(c.beginingbalance,0) + IIF(a.dataflow='I',a.amount,0) - IIF(a.dataflow='O',a.amount,0) AS endingbalance
                            FROM $th_kasbank a
                            LEFT JOIN $m_coa sub_c on a.coa_id = sub_c.coa_id 
                            /* Ambil data B dari transaksi KAS */
                            LEFT OUTER JOIN (
                                            SELECT 
                                                    a.pt_id,a.kasbank,(
                                                                    (
                                                                    SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                    FROM $th_kasbank sub_a
                                                                    LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id 
                                                                    WHERE 
                                                                            sub_a.kasbank = a.kasbank 
                                                                            AND sub_a.deleted=0  
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'I' AND convert(date,sub_a.accept_date) < '$fromdate'  
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                            $sqldetailgrouptrans    
                                                                    )-
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $th_kasbank sub_a
                                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id 
                                                                            WHERE 
                                                                            sub_a.kasbank = a.kasbank
                                                                            AND sub_a.deleted=0
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'O' AND convert(date,sub_a.accept_date) < '$fromdate' 
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                            $sqldetailgrouptrans    
                                                                    )) AS beginingbalance,
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $th_kasbank sub_a
                                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id 
                                                                            WHERE 
                                                                                    sub_a.kasbank = a.kasbank 
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'I' 
                                                                                    AND convert(date,sub_a.accept_date) between '$fromdate' AND '$untildate'    
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                                    $sqldetailgrouptrans    
                                                                    ) AS sum_debit,		
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $th_kasbank sub_a
                                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id 
                                                                            WHERE 
                                                                                    sub_a.kasbank = a.kasbank 
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'O'                                                                                  
                                                                                    AND convert(date,sub_a.accept_date)  between '$fromdate' AND '$untildate'     
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                                   $sqldetailgrouptrans     
                                                                    ) AS sum_credit

                                                    FROM (
                                                            SELECT DISTINCT 
                                                                    a.kasbank,a.pt_id 
                                                            FROM $th_kasbank a 
                                                            LEFT JOIN $m_coa sub_c on a.coa_id = sub_c.coa_id
                                                            WHERE                                                             
                                                            convert(date,a.accept_date) <='$untildate'   
                                                            AND a.deleted=0    
                                                            AND a.kasbank ='KAS'
                                                            AND a.deleted = 0
                                                            AND a.project_id = $project_id
                                                            $sql_inpt    
                                                            $sqldataflow    
                                                            $sqlcoakasbank
                                                            $sqldetailgrouptrans_no_sub    
                                                            ) a
                                                            ) b ON a.pt_id = b.pt_id			
                            /* Ambil data c dari transaksi Bank */
                            LEFT OUTER JOIN (
                                            SELECT 
                                                    a.kasbank,a.pt_id,(
                                                                    (
                                                                    SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                    FROM $td_kasbankdetail sub_a
                                                                    LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                    LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id 
                                                                    WHERE 
                                                                            sub_a.kasbank_id = a.pt_id 
                                                                            AND sub_a.deleted=0 
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'I' 
                                                                            AND convert(date,sub_b.accept_date) < '$fromdate' 
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                    )-
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $td_kasbankdetail sub_a
                                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id 
                                                                            WHERE 
                                                                            sub_a.kasbank_id = sub_b.kasbank_id 
                                                                            AND sub_a.deleted=0
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'O'                                                                            
                                                                            AND convert(date,sub_b.accept_date) < '$fromdate' 
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                    )) AS beginingbalance,
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $td_kasbankdetail sub_a 
                                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                                    sub_a.kasbank_id = sub_b.kasbank_id
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'I'                                                                                    
                                                                                    AND convert(date,sub_b.accept_date) between '$fromdate' AND '$untildate'    
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                    ) AS sum_debit,		
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $td_kasbankdetail sub_a
                                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id 
                                                                            WHERE 
                                                                                    sub_a.kasbank_id = sub_b.kasbank_id  
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'I'                                                                                     
                                                                                    AND convert(date,sub_b.accept_date) between '$fromdate' AND '$untildate'      
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                    ) AS sum_credit

                                                    FROM (
                                                            SELECT DISTINCT 
                                                                    sub_b.kasbank,sub_a.pt_id
                                                            FROM $td_kasbankdetail sub_a 
                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id 
                                                            WHERE 
                                                            
                                                              convert(date,sub_b.accept_date) <='$untildate' 
                                                            AND sub_a.deleted=0    
                                                            AND sub_b.kasbank ='BANK'
                                                            AND sub_a.deleted = 0
                                                            AND sub_a.project_id = $project_id
                                                            $sql_inptsub    
                                                            $sqldataflowsub    
                                                            $sqlcoakasbank
                                                            ) a
                                                            ) c ON a.pt_id = b.pt_id
                            WHERE a.accept_date >='$fromdate' 
                                    AND convert(date,a.accept_date) <='$untildate'                                    
                                    AND a.kasbank ='KAS'
                                    AND a.deleted =0
                                    AND a.project_id = $project_id
                                    $sql_inpt  
                                    $sqldataflow   
                                    $sqlcoakasbank
                                    $sqldetailgrouptrans_no_sub

                            ) a

                            UNION ALL

                            SELECT *,'2' as leveldata FROM (
                            SELECT
                            head_b.kasbank_id,
                            head_b.transno,
                            head_b.voucher_no,
                            head_b.accept_date,
                            head_b.chequegiro_no,
                            a.dataflow,
                            a.description,
                            head_b.grouptrans_id,
                            head_b.kasbank,
                            sub_c.coa,
                            a.project_id,
                            a.pt_id,
                            a.amount,
                            COALESCE(b.beginingbalance,0) + COALESCE(c.beginingbalance,0) AS beginingbalance,
                            COALESCE(b.sum_debit,0)+COALESCE(c.sum_debit,0) AS sum_debit, 
                            COALESCE(b.sum_credit,0)+COALESCE(c.sum_credit,0) AS sum_credit,
                            IIF(a.dataflow='I',a.amount,0) AS debit,
                            IIF(a.dataflow='O',a.amount,0) AS credit,
                            COALESCE(b.beginingbalance,0) + COALESCE(c.beginingbalance,0) + IIF(a.dataflow='I',a.amount,0) - IIF(a.dataflow='O',a.amount,0) AS endingbalance
                            FROM $td_kasbankdetail a
                            LEFT JOIN $th_kasbank head_b ON head_b.kasbank_id = a.kasbank_id
                            LEFT JOIN $m_coa sub_c on head_b.coa_id = sub_c.coa_id 
                            /* Ambil data B dari transaksi KAS */
                            LEFT OUTER JOIN (
                                            SELECT 
                                                    a.pt_id,a.kasbank,(
                                                                    (
                                                                    SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                    FROM $th_kasbank  sub_a 
                                                                    LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id
                                                                    WHERE 
                                                                            sub_a.kasbank = a.kasbank 
                                                                            AND sub_a.deleted=0
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'I' AND convert(date,sub_a.accept_date) < '$fromdate' 
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                            $sqldetailgrouptrans
                                                                    )-
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $th_kasbank sub_a
                                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                            sub_a.kasbank = a.kasbank
                                                                            AND sub_a.deleted=0
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'O' AND convert(date,sub_a.accept_date) < '$fromdate' 
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                            $sqldetailgrouptrans    
                                                                    )) AS beginingbalance,
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $th_kasbank sub_a
                                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                                    sub_a.kasbank = a.kasbank
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'I' 
                                                                                    AND convert(date,sub_a.accept_date) between '$fromdate'  AND  '$untildate' 
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                                    $sqldetailgrouptrans    
                                                                    ) AS sum_debit,		
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $th_kasbank sub_a
                                                                            LEFT JOIN $m_coa sub_c on sub_a.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                                    sub_a.kasbank = a.kasbank 
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'O'                                                                                    
                                                                                    AND convert(date,sub_a.accept_date) between '$fromdate'  AND  '$untildate'     
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                                    $sqldetailgrouptrans    
                                                                    ) AS sum_credit

                                                    FROM (
                                                            SELECT DISTINCT 
                                                                    a.kasbank,a.pt_id 
                                                            FROM $th_kasbank a 
                                                            LEFT JOIN $m_coa sub_c on a.coa_id = sub_c.coa_id
                                                            WHERE 
                                                            convert(date,a.accept_date) <='$untildate'
                                                            AND a.deleted=0    
                                                            AND a.kasbank ='KAS'
                                                            AND a.deleted = 0
                                                            AND a.project_id = $project_id
                                                            $sql_inpt    
                                                            $sqldataflow    
                                                            $sqlcoakasbank
                                                            $sqldetailgrouptrans_no_sub    
                                                            ) a
                                                            ) b ON a.pt_id = b.pt_id			
                            /* Ambil data c dari transaksi Bank */
                            LEFT OUTER JOIN (
                                            SELECT 
                                                    a.kasbank,a.pt_id,(
                                                                    (
                                                                    SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                    FROM $td_kasbankdetail sub_a
                                                                    LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                    LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id
                                                                    WHERE 
                                                                            sub_a.kasbank_id = a.pt_id 
                                                                            AND sub_a.deleted=0
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'I' 
                                                                            AND convert(date,sub_b.accept_date) < '$fromdate'  
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                    )-
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $td_kasbankdetail sub_a
                                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                            sub_a.kasbank_id = sub_b.kasbank_id 
                                                                            AND sub_a.deleted=0
                                                                            AND sub_a.pt_id = a.pt_id 
                                                                            AND sub_a.dataflow = 'O' 
                                                                            AND convert(date,sub_b.accept_date) < '$fromdate'  
                                                                            AND sub_a.deleted = 0
                                                                            AND sub_a.project_id = $project_id
                                                                            $sqlcoakasbank
                                                                    )) AS beginingbalance,
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $td_kasbankdetail sub_a 
                                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                                    sub_a.kasbank_id = sub_b.kasbank_id  
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'I' 
                                                                                    AND convert(date,sub_b.accept_date) between  '$fromdate'  AND  '$untildate'
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                    ) AS sum_debit,		
                                                                    (
                                                                            SELECT COALESCE(SUM(sub_a.amount),0) 
                                                                            FROM $td_kasbankdetail sub_a
                                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id
                                                                            WHERE 
                                                                                    sub_a.kasbank_id = sub_b.kasbank_id 
                                                                                    AND sub_a.deleted=0
                                                                                    AND sub_a.pt_id = a.pt_id 
                                                                                    AND sub_a.dataflow = 'I'                                                                                     
                                                                                    AND convert(date,sub_b.accept_date) between '$fromdate'  AND  '$untildate'    
                                                                                    AND sub_a.deleted = 0
                                                                                    AND sub_a.project_id = $project_id
                                                                                    $sqlcoakasbank
                                                                    ) AS sum_credit

                                                    FROM (
                                                            SELECT DISTINCT 
                                                                    sub_b.kasbank,sub_a.pt_id
                                                            FROM $td_kasbankdetail sub_a 
                                                            LEFT JOIN $th_kasbank sub_b on sub_a.kasbank_id = sub_b.kasbank_id
                                                            LEFT JOIN $m_coa sub_c on sub_b.coa_id = sub_c.coa_id
                                                            WHERE 
                                                            convert(date,sub_b.accept_date) <='$untildate'
                                                            AND sub_a.deleted=0    
                                                            AND sub_b.kasbank ='BANK'
                                                            AND sub_a.deleted = 0
                                                            AND sub_a.project_id = $project_id
                                                            $sql_inptsub    
                                                            $sqldataflowsub
                                                            $sqlcoakasbank
                                                            ) a
                                                            ) c ON a.pt_id = b.pt_id
                            WHERE head_b.accept_date >='$fromdate' 
                                    AND convert(date,head_b.accept_date) <='$untildate'
                                    AND head_b.kasbank ='KAS'
                                    AND a.deleted =0
                                    AND a.project_id = $project_id
                                    $sql_inpthead  
                                    $sqldataflowhead     
                                    $sqlcoakasbank
                                    $sqldetailgrouptrans_head
                            ) a
                            ORDER BY pt_id,accept_date,voucher_no,transno,leveldata
                ";
            $execdetail = $this->setting->execquery($sqlkasbankdetail);
            if ($execdetail) {
                $datadetail = $this->setting->getarray($execdetail);
                if (is_array($datadetail) && !empty($datadetail)) {
                    $this->cleandata_detail();
                    $this->createdata_detail($datadetail);
                }
            }



            $sqlrangedetailkasbon = "";
            $sqlrangedetailkasbon_head = "";
            $sqlrangedetailloan = "";

            if ($param['calculateallcashbon'] == 1) {
                if ($param['backdate'] == 1) {
                    $sqlrangedetailkasbon = " convert(date,claim_date) <='$untildate' AND ";
                    $sqlrangedetailkasbon_head = " AND convert(date,a.claim_date) <='$untildate' ";
                    $sqlrangedetailloan = " convert(date,a.loan_date) <='$untildate' ";
                }
            } else {
                $sqlrangedetailkasbon = " convert(date,claim_date) between '$fromdate' AND claim_date '$untildate' AND ";
                $sqlrangedetailkasbon_head = " AND convert(date,a.claim_date) between '$fromdate' AND a.claim_date '$untildate' ";
                $sqlrangedetailloan = " convert(date,a.loan_date) between '$fromdate' AND '$untildate' ";
            }


            if ($param['backdate'] == 1) {
                $sqlkasbankkasbon = "                    
                                        a.amount-(SELECT COALESCE(SUM(COALESCE(z.amount,0)),0) 
                                        FROM
                                                (
                                                        SELECT 
                                                                x.amount,x.kasbank_id,x.kasbon_id
                                                        FROM $td_kasbank_kasbon X 
                                                        LEFT OUTER JOIN $th_kasbank Y ON x.kasbank_id = y.kasbank_id
                                                        WHERE 
                                                                convert(date,y.accept_date) <='$untildate'
                                                                AND X.deleted=0      
                                                ) z 
                                                WHERE 
                                                z.kasbon_id = a.kasbon_id
                                                ) as balance,
                                    ";



                $sqlbackdateloan = " AND convert(date,payment_date) <='$untildate' ";
                $sqlbackdatethloan = " AND convert(date,loan_date) <='$untildate' ";
                $sqlkasbonstatus = "'T','S','Y'";
            } else {
                $sqlkasbankkasbon = 'a.balance, ';
                $sqlbackdatethloan = '';
                $sqlbackdateloan = '';
                $sqlkasbonstatus = "'T','S'";
            }

            $sqlkasbankdetailkasbon = "                
                        SELECT 
                            a.voucher_no,a.accept_date,a.description,
                            a.project_id,a.pt_id,a.department_id,chequegiro_no,
                            a.claim_date,a.status_special,a.status,a.amount,
                            $sqlkasbankkasbon
                            b.beginingbalance 
                    FROM $th_kasbon a
                    INNER JOIN (
                                    SELECT 
                                            a.pt_id,
                                            (
                                                    (SELECT COALESCE(SUM(amount),0) FROM $th_kasbon WHERE status IN ($sqlkasbonstatus) AND status_special = 'N' AND deleted=0  AND pt_id = a.pt_id AND convert(date,claim_date) < '$fromdate')-
                                                    (SELECT COALESCE(SUM(amount),0) FROM $th_kasbon WHERE status IN ($sqlkasbonstatus) AND status_special = 'N' AND deleted=0  AND pt_id = a.pt_id AND convert(date,claim_date) < '$fromdate')
                                            ) AS beginingbalance
                                    FROM (
                                            SELECT DISTINCT pt_id 
                                            FROM 
                                            $th_kasbon 
                                            WHERE
                                            $sqlrangedetailkasbon
                                            status IN ($sqlkasbonstatus)
                                            AND status_special = 'N'
                                            AND deleted=0  
                                          ) a 
                                ) b ON a.pt_id = b.pt_id

                    WHERE   
                             a.pt_id = a.pt_id 
                            $sqlrangedetailkasbon_head    
                            AND a.status IN ($sqlkasbonstatus)	
                            AND a.status_special = 'N' 
                            AND a.deleted=0
                            ORDER BY a.pt_id,a.claim_date,a.voucher_no
                                ";

            $execdetailkasbon = $this->setting->execquery($sqlkasbankdetailkasbon);
            if ($execdetailkasbon) {
                $datadetailkasbon = $this->setting->getarray($execdetailkasbon);
                if (is_array($datadetailkasbon) && !empty($datadetailkasbon)) {
                    $this->cleandata_detail_kasbon();
                    $this->createdata_detail_kasbon($datadetailkasbon);
                }
            }


            $sqlkasbankdetailkasbonprojectloan = "   
                    SELECT 
                            a.voucher_no,a.accept_date,a.description,a.project_id,a.pt_id,a.department_id,chequegiro_no,a.claim_date,
                            a.status_special,a.status,a.amount,b.beginingbalance,
                            a.cashbon_projectpt_id,
                            case a.cashbon_projectpt_id 
                            when 0 then 
                                    for_projectpt  
                            else 
                                    (select name from dbmaster.dbo.m_pt  where pt_id=a.cashbon_projectpt_id)	
                            end as for_cashbonproject
                    FROM $th_kasbon a
                    INNER JOIN (	
                                    SELECT a.pt_id,
                                    (
                                            SELECT 
                                                    COALESCE(SUM(amount),0) 
                                            FROM $th_kasbon 
                                            WHERE 
                                            status IN ('T','S') 
                                            AND deleted=0
                                            AND status_special = 'Y' 
                                            AND pt_id = a.pt_id 
                                            AND convert(date,claim_date) < '$fromdate'
                                    ) AS beginingbalance
                                    FROM (
                                            SELECT 
                                                    DISTINCT pt_id 
                                            FROM $th_kasbon 
                                            WHERE 
                                                    convert(date,claim_date) between '$fromdate' AND '$untildate'
                                                    AND deleted=0    
                                                    AND status IN ('T','S') 
                                                    AND status_special = 'Y'
                                         ) a 
                                ) b ON a.pt_id = b.pt_id

                            WHERE 
                                    a.pt_id = b.pt_id
                                    AND a.deleted=0
                                    AND convert(date,a.claim_date) between '$fromdate' AND '$untildate'
                                    AND a.status IN ('T','S') 
                                    AND a.status_special = 'Y' 
                            ORDER BY 
                                    for_cashbonproject,a.claim_date,a.voucher_no

                        ";
            $execdetailkasbonproject = $this->setting->execquery($sqlkasbankdetailkasbonprojectloan, 'fromloan');
            if ($execdetailkasbonproject) {
                $datadetailkasbonproject = $this->setting->getarray($execdetailkasbonproject);
                if (is_array($datadetailkasbonproject) && !empty($datadetailkasbonproject)) {
                    $this->createdata_detail_kasbon_project($datadetailkasbonproject);
                }
            }

            $sqlcoaloan = " AND b.coa IN($in_coa)";
            $sqlloanpayment = "                
                        SELECT a.*,
                            (
                                    SELECT 
                                            COALESCE(SUM(COALESCE(amount,0)),0) 
                                    FROM $td_loanpayment 
                                    WHERE 
                                    loan_id = a.loan_id
                                    AND deleted=0
                                    $sqlbackdateloan 
                            ) 
                            AS amount_bayar,
                            a.amount - (
                                            SELECT COALESCE(SUM(COALESCE(amount,0)),0) 
                                            FROM $td_loanpayment 
                                            WHERE
                                            loan_id = a.loan_id
                                            AND deleted=0
                                            $sqlbackdateloan
                                          )
                            AS amount_sisa,
                            (
                                    SELECT COALESCE(SUM(COALESCE(amount,0)),0) 
                                    FROM $th_loan 
                                    WHERE 
                                        convert(date,loan_date) < '$fromdate'
                                        AND deleted=0    
                                        $sql_inptnoprefix    
                            )-
                            (
                                    SELECT COALESCE(SUM(COALESCE(amount,0)),0) 
                                    FROM $td_loanpayment 
                                    WHERE 
                                    loan_id IN (
                                               SELECT loan_id 
                                               FROM $th_loan	
                                               WHERE 
                                                    deleted=0
                                                    AND convert(date,loan_date) < '$fromdate'
                                                    $sql_inptnoprefix    
                                              )
                            ) AS beginingbalance
                    FROM $th_loan a 
                    LEFT JOIN $m_coa b on a.coa_id =b.coa_id   
                    WHERE
                             a.deleted=0
                         AND a.loan_id > 0	
                        $sqlrangedetailloan   
                        $sqlcoaloan    
                        $sql_inpt    
                   ";
            $execloanpayment = $this->setting->execquery($sqlloanpayment);
            if ($execloanpayment) {
                $dataloanpayment = $this->setting->getarray($execloanpayment);
                if (is_array($dataloanpayment) && !empty($dataloanpayment)) {
                    $this->cleandata_loanpayment();
                    $this->createdata_loanpayment($dataloanpayment);
                }
            }
            $this->_counter = 1;
        }else{
            $this->_counter = 0;
        }
    }

    public function query_summaryall($param) {
        /* start setup valiable table */
        $m_project = $this->setting->_m_project;
        $m_pt = $this->setting->_m_pt;
        $th_kasbank = $this->setting->_th_kasbank;
        $td_kasbankdetail = $this->setting->_td_kasbankdetail;
        $th_kasbon = $this->setting->_th_kasbon;
        $m_grouptrans = $this->setting->_m_grouptrans;
        $m_coa = $this->setting->_m_coa;
        $td_kasbank_kasbon = $this->setting->_td_kasbank_kasbon;
        $th_loan = $this->setting->_th_loan;
        $td_loanpayment = $this->setting->_td_loanpayment;
        /* end setup valiable table */

        /* start setup valiable */
        $formatreport = $param['optionformat'];
        $fromdate = date('Y-m-d', strtotime($param['fromperiode']));
        $untildate = date('Y-m-d', strtotime($param['untilperiode']));
        $project_id = $this->setting->_project_id;
        $in_ptid = $param['in_pt'];
        $grouptrans_id = $param['grouptrans_id'];
        $in_coa = $param['in_coa'];
        $dataflow = $param['typetrans'];
        $allcompany = $param['allcompany'];
        $in_pt = $param['in_pt'];
        /* end setup valiable  */

        //Filter Group Trans
        $sqlcoakasbank = " AND sub_c.coa IN($in_coa)";

        $sqlgrouptrans = " ";
        if ($param['allgroup'] == 0) {
            $sqlgrouptrans = " AND sub_b.grouptrans_id=$grouptrans_id";
        }

        $sqlkasbankheader = "                
                SELECT a.kasbank,a.projectname,a.project_id,a.ptname,a.pt_id,
                (
                        (
                                SELECT COALESCE(SUM(sub_a.amount),0) 
                                FROM 
                                        $th_kasbank sub_a
                                WHERE 
                                        sub_a.kasbank = a.kasbank 
                                        AND sub_a.deleted=0  
                                        AND sub_a.pt_id = a.pt_id 
                                        AND sub_a.dataflow = 'I' 
                                        AND convert(date,sub_a.accept_date) < '$fromdate' 
                                           
                        )
                        -
                        (
                                SELECT COALESCE(SUM(sub_a.amount),0) 
                                FROM 
                                        $th_kasbank sub_a
                                WHERE 
                                        sub_a.kasbank = a.kasbank 
                                        AND sub_a.deleted=0  
                                        AND sub_a.pt_id = a.pt_id 
                                        AND sub_a.dataflow = 'O' 
                                        AND convert(date,sub_a.accept_date) < '$fromdate'
                        )
                   ) AS beginingbalance,
                   (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                        $th_kasbank sub_a
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0  
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'I' 
                                AND convert(date,sub_a.accept_date) BETWEEN  '$fromdate' AND  '$untildate' 
                  ) AS debit,
                  (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                        $th_kasbank sub_a
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0  
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'I' 
                                AND convert(date,sub_a.accept_date) BETWEEN  '$fromdate' AND  '$untildate'     
                ) AS debitbank,
                (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                 $th_kasbank sub_a
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0  
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'O' 
                                AND convert(date,sub_a.accept_date) BETWEEN  '$fromdate' AND  '$untildate'     

                  ) AS credit,
                  (
                        SELECT COALESCE(SUM(sub_a.amount),0) 
                        FROM 
                                 $th_kasbank sub_a
                        WHERE 
                                sub_a.kasbank = a.kasbank 
                                AND sub_a.deleted=0  
                                AND sub_a.pt_id = a.pt_id 
                                AND sub_a.dataflow = 'O' 
                                AND convert(date,sub_a.accept_date) BETWEEN  '$fromdate' AND  '$untildate'    
                  ) AS creditbank,
                  (
                        SELECT COALESCE(SUM(amount),0) 
                        FROM $th_kasbon 
                        WHERE 
                        pt_id = a.pt_id 
                        AND deleted=0  
                        AND status IN ('T') 
                        AND status_special = 'N' 
                        AND monitoring = 0 
                        AND convert(date,claim_date) BETWEEN  '$fromdate' AND  '$untildate'
                 ) AS cashbon,
                 (
                        SELECT COALESCE(SUM(amount),0) 
                        FROM $th_kasbon 
                        WHERE 
                        pt_id = a.pt_id 
                        AND deleted=0
                        AND status IN ('T') 
                        AND status_special = 'Y' 
                        AND monitoring = 0 
                        AND convert(date,claim_date) BETWEEN  '$fromdate' AND  '$untildate'
                 ) AS loanproject
        FROM (
                SELECT DISTINCT a.kasbank,a.project_id,a.pt_id,b.name as projectname,c.name as ptname 
                FROM $th_kasbank a 
                LEFT JOIN $m_project b on b.project_id = a.project_id
                LEFT JOIN $m_pt c on c.pt_id = a.pt_id
                WHERE   
                        a.project_id = $project_id
                        AND a.deleted=0   
                        AND convert(date,a.accept_date) BETWEEN  '$fromdate' AND  '$untildate' 
                        AND a.kasbank ='KAS'
            ";
        if ($param['allcompany'] == 0) {
            $sqlkasbankheader .= " AND a.pt_id IN ($in_ptid)";
        }

        $sqlkasbankheader .= " ) a ";
        $sqlkasbankheader .= " ORDER BY a.projectname,a.ptname";
        

        $execheader = $this->setting->execquery($sqlkasbankheader);
        if ($execheader) {
            $this->cleandata_head();
            $this->cleandata_head_sum();
            $this->cleandata_detail();
            $this->cleandata_detail_kasbon();
            $this->cleandata_loanpayment();
            $dataheader = $this->setting->getarray($execheader);
            if (is_array($dataheader) && !empty($dataheader)) {
                $this->createdata_head($dataheader);                                
                $exec = $this->setting->getdatamanual($this->getDefaultparam());
                $data = $this->setting->getarray($exec);
                $counter = count($data);
                if($counter > 0){
                    $this->create_sumall($data);
                }
                
            }            
            $this->_counter = 1;
        }else{
            $this->_counter = 0;
        }
    }

    public function create_sumall($param) {
        foreach ($param as $row) {            
            //Cash Begining Balance             
            $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_head_sum;
            $record1 = array(
                "sort"=>1,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Cash Begining Balance',
                "beginingbalance"=>$row['beginingbalance'],
                "endingbalance"=>$row['beginingbalance'],               
            );
            $this->setting->insertmanual($record1);
            
             //Receipts From The Bank 
            $record2 = array(
                "sort"=>2,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Receipts From The Bank',
                "debit"=>$row['debitbank'],
                "endingbalance"=>$row['beginingbalance']+$row['debitbank'],               
            );
            $this->setting->insertmanual($record2);
            
            //Revenue 
            $record3 = array(
                "sort"=>3,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Revenue',
                "debit"=>$row['debit'],
                "endingbalance"=>$row['beginingbalance']+$row['debitbank']+$row['debit'],               
            );
            $this->setting->insertmanual($record3);
            
            //Expending 
            $record4 = array(
                "sort"=>4,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Expending',
                "credit"=>$row['credit'],
                "endingbalance"=>($row['beginingbalance']+$row['debitbank']+$row['debit'])-$row['credit'],               
            );
            $this->setting->insertmanual($record4);
            
            //Deposit Bank 
            $record5 = array(
                "sort"=>5,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Deposit Bank',
                "credit"=>$row['creditbank'],
                "endingbalance"=>($row['beginingbalance']+$row['debitbank']+$row['debit'])-$row['credit']-$row['creditbank'],               
            );
            $this->setting->insertmanual($record5);
            
            
            //Cash Advance
            $record6 = array(
                "sort"=>6,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Cash Advance',
                "credit"=>$row['cashbon'],
                "endingbalance"=>($row['beginingbalance']+$row['debitbank']+$row['debit'])-$row['credit']-$row['creditbank']-$row['cashbon'],               
            );
            $this->setting->insertmanual($record6);
            
            //Project Loan 
            $record7 = array(
                "sort"=>7,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Project Loan',
                "credit"=>$row['loanproject'],
                "endingbalance"=>($row['beginingbalance']+$row['debitbank']+$row['debit'])-$row['credit']-$row['creditbank']-$row['cashbon']-$row['loanproject'],               
            );
            $this->setting->insertmanual($record7);
            
            //Project Loan 
            $record8 = array(
                "sort"=>8,
                "reportfile"=>$row['reportfile'],
                "user_id"=>$row['user_id'],
                "user_project_id"=>$row['user_project_id'],
                "user_pt_id"=>$row['user_pt_id'],
                "reportdate"=>$row['reportdate']->format('Y-m-d'),
                "project_id"=>$row['project_id'],
                "projectname"=>$row['projectname'],
                "pt_id"=>$row['pt_id'],
                "ptname"=>$row['ptname'],
                "note"=>'Cash Ending Balance',
                "credit"=>$row['loanproject'],
                "endingbalance"=>($row['beginingbalance']+$row['debitbank']+$row['debit'])-$row['credit']-$row['creditbank']-$row['cashbon']-$row['loanproject'],               
            );
            $this->setting->insertmanual($record8);
            
        }
        
        
    }
    
    
    public function get_datatmp() {
        $user_id = $this->setting->_user_id;
        $project_id = $this->setting->_project_id;
        $pt_id = $this->setting->_pt_id;

        $sqlhead = "      
            IF OBJECT_ID('tempdb..$this->_tmp_head') IS NOT NULL DROP TABLE $this->_tmp_head
                     SELECT * INTO $this->_tmp_head FROM
              (             
                SELECT * FROM $this->_fisik_tmp_cashpos2_head
                WHERE
                   user_id=$user_id
                  AND user_project_id=$project_id      
                  AND user_pt_id=$pt_id      
              ) AS DATA
          ";
         $this->setting->execquery($sqlhead);
        
        $sqlheadsum = "      
            IF OBJECT_ID('tempdb..$this->_tmp_head_sum') IS NOT NULL DROP TABLE $this->_tmp_head_sum
                     SELECT * INTO $this->_tmp_head_sum FROM
              (             
                SELECT * FROM $this->_fisik_tmp_cashpos2_head_sum
                WHERE
                   user_id=$user_id
                  AND user_project_id=$project_id      
                  AND user_pt_id=$pt_id      
              ) AS DATA
          ";
         $this->setting->execquery($sqlheadsum);
        
        $sqlkasbankdetail = "      
            IF OBJECT_ID('tempdb..$this->_tmp_kasbankdetail') IS NOT NULL DROP TABLE $this->_tmp_kasbankdetail
                     SELECT * INTO $this->_tmp_kasbankdetail FROM
              (             
                SELECT * FROM $this->_fisik_tmp_cashpos2_kasbankdetail
                WHERE
                   user_id=$user_id
                  AND user_project_id=$project_id      
                  AND user_pt_id=$pt_id      
              ) AS DATA
          ";
         $this->setting->execquery($sqlkasbankdetail);
        
        $sqlkasbon = "      
            IF OBJECT_ID('tempdb..$this->_tmp_kasbon') IS NOT NULL DROP TABLE $this->_tmp_kasbon
                     SELECT * INTO $this->_tmp_kasbon FROM
              (             
                SELECT * FROM $this->_fisik_tmp_cashpos2_kasbank_kasbon
                WHERE
                   user_id=$user_id
                  AND user_project_id=$project_id      
                  AND user_pt_id=$pt_id 
                  AND fromstate='kasbon_only'    
              ) AS DATA
          ";
         $this->setting->execquery($sqlkasbon);
        
        $sqlkasbonproject = "      
            IF OBJECT_ID('tempdb..$this->_tmp_kasbon_project') IS NOT NULL DROP TABLE $this->_tmp_kasbon_project
                     SELECT * INTO $this->_tmp_kasbon_project FROM
              (             
                SELECT * FROM $this->_fisik_tmp_cashpos2_kasbank_kasbon
                WHERE
                   user_id=$user_id
                  AND user_project_id=$project_id      
                  AND user_pt_id=$pt_id 
                  AND fromstate='kasbon_project'    
              ) AS DATA
          ";
          $this->setting->execquery($sqlkasbonproject);
        
       
        
         $sqlloanpayment = "      
            IF OBJECT_ID('tempdb..$this->_tmp_loanproject') IS NOT NULL DROP TABLE $this->_tmp_loanproject
                     SELECT * INTO $this->_tmp_loanproject FROM
              (             
                SELECT * FROM $this->_fisik_tmp_cashpos2_loanpayment
                WHERE
                   user_id=$user_id
                  AND user_project_id=$project_id      
                  AND user_pt_id=$pt_id 
              ) AS DATA
          ";
         $this->setting->execquery($sqlloanpayment);
         
         
          $sqlkasbonprojectgrouping = "      
            IF OBJECT_ID('tempdb..$this->_tmp_kasbon_project_grouping') IS NOT NULL DROP TABLE $this->_tmp_kasbon_project_grouping
                     SELECT * INTO $this->_tmp_kasbon_project_grouping FROM
              (             
                SELECT 
                    a.user_id,a.user_project_id,a.user_pt_id,
                    a.project_id,a.pt_id,
                    a.for_cashbonproject,
                    (select coalesce(sum(x.amount),0) from $this->_fisik_tmp_cashpos2_kasbank_kasbon x where x.fromstate='kasbon_project' and x.for_cashbonproject=a.for_cashbonproject AND x.user_id=$user_id AND x.user_project_id=$project_id  AND x.user_pt_id=$pt_id ) as amountdata,
                    a.beginingbalance+(select coalesce(sum(x.amount),0) from $this->_fisik_tmp_cashpos2_kasbank_kasbon x where x.fromstate='kasbon_project' and x.for_cashbonproject=a.for_cashbonproject AND x.user_id=$user_id AND x.user_project_id=$project_id AND x.user_pt_id=$pt_id ) as endamount,
                    a.beginingbalance
                FROM $this->_fisik_tmp_cashpos2_kasbank_kasbon a
                WHERE
                     a.fromstate='kasbon_project'
                     AND a.user_id=$user_id
                     AND a.user_project_id=$project_id      
                     AND a.user_pt_id=$pt_id
                GROUP BY 
                        a.user_id,a.user_project_id,a.user_pt_id,a.project_id,a.pt_id,a.for_cashbonproject,a.beginingbalance
              ) AS DATA
          ";
        $this->setting->execquery($sqlkasbonprojectgrouping);
       
        
        //echo $sqlkasbankdetail;
       
        return array(
            "qhead" => $this->_tmp_head,
            "qhead_sum" => $this->_tmp_head_sum,
            "qkasbankdetail" => $this->_tmp_kasbankdetail,
            "qkasbon" => $this->_tmp_kasbon,
            "qkasbonproject" => $this->_tmp_kasbon_project,
            "qkasbonprojectgrouping" => $this->_tmp_kasbon_project_grouping,
            "qloanpayment" => $this->_tmp_loanproject,
        );
    }

    public function getDefaultparam() {
        $param = array(
            "user_id" => $this->setting->_user_id,
            "user_project_id" => $this->setting->_project_id,
            "user_pt_id" => $this->setting->_pt_id
        );
        return $param;
    }

    public function cleandata_head() {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_head;
        $this->setting->deletemanual($this->getDefaultparam());
    }
    public function cleandata_head_sum() {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_head_sum;
        $this->setting->deletemanual($this->getDefaultparam());
    }

    public function cleandata_detail() {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_kasbankdetail;
        $this->setting->deletemanual($this->getDefaultparam());
    }

    public function cleandata_detail_kasbon() {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_kasbank_kasbon;
        $this->setting->deletemanual($this->getDefaultparam());
    }

    public function cleandata_loanpayment() {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_loanpayment;
        $this->setting->deletemanual($this->getDefaultparam());
    }

    public function createdata_head($data) {
        $this->setting->_tabledata =$this->_fisik_tmp_cashpos2_head;
        foreach ($data as $row) {
            $row['reportfile'] = 'Cashpostion2';
            $row['user_id'] = $this->setting->_user_id;
            $row['user_project_id'] = $this->setting->_project_id;
            $row['user_pt_id'] = $this->setting->_pt_id;
            $row['reportdate'] = $this->setting->_curdate;
            $row['endingbalance'] = floatval($row['beginingbalance'])+floatval($row['debit'])-floatval($row['credit']);
            $this->setting->insertmanual($row);
        };
    }

    public function createdata_detail($data) {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_kasbankdetail;
        foreach ($data as $row) {
            $row['reportfile'] = 'Cashpostion2';
            $row['user_id'] = $this->setting->_user_id;
            $row['user_project_id'] = $this->setting->_project_id;
            $row['user_pt_id'] = $this->setting->_pt_id;
            $row['reportdate'] = $this->setting->_curdate;
            $row['accept_date'] = $row['accept_date']->format('Y-m-d');
            $this->setting->insertmanual($row);
        }
    }

    public function createdata_detail_kasbon($data) {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_kasbank_kasbon;
        $sum = 0;
        foreach ($data as $row) {
            $sum+=floatval($row['amount']);
            $row['reportfile'] = 'Cashpostion2';
            $row['user_id'] = $this->setting->_user_id;
            $row['user_project_id'] = $this->setting->_project_id;
            $row['user_pt_id'] = $this->setting->_pt_id;
            $row['reportdate'] = $this->setting->_curdate;
            $row['cashbon_projectpt_id'] = 0;
            $row['fromstate'] = 'kasbon_only';
            $row['accept_date'] = $row['accept_date']->format('Y-m-d');
            $row['claim_date'] = $row['claim_date']->format('Y-m-d');
            $row['endingbalance'] = $sum;            
            $this->setting->insertmanual($row);
        }
    }

    public function createdata_detail_kasbon_project($data) {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_kasbank_kasbon;
        $sum =0;
        foreach ($data as $row) {
            $sum+=floatval($row['amount']);
            $row['reportfile'] = 'Cashpostion2';
            $row['user_id'] = $this->setting->_user_id;
            $row['user_project_id'] = $this->setting->_project_id;
            $row['user_pt_id'] = $this->setting->_pt_id;
            $row['reportdate'] = $this->setting->_curdate;
            $row['fromstate'] = 'kasbon_project';
            $row['accept_date'] = $row['accept_date']->format('Y-m-d');
            $row['claim_date'] = $row['claim_date']->format('Y-m-d');
            $row['endingbalance'] = $sum;
            $this->setting->insertmanual($row);
        }
    }

    public function createdata_loanpayment($data) {
        $this->setting->_tabledata = $this->_fisik_tmp_cashpos2_loanpayment;
        foreach ($data as $row) {
            $row['reportfile'] = 'Cashpostion2';
            $row['user_id'] = $this->setting->_user_id;
            $row['user_project_id'] = $this->setting->_project_id;
            $row['user_pt_id'] = $this->setting->_pt_id;
            $row['reportdate'] = $this->setting->_curdate;
            $row['loan_date'] = $row['loan_date']->format('Y-m-d');
            $this->setting->insertmanual($row);
        }
    }

}
