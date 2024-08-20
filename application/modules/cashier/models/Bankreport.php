<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Bankreport extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $_tmp_data= null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->function = new Cashier_Models_Function_Bankreport;
        $this->setting->_storeprocedure = 'sp_report_bankreport';
        $this->_user_id = $this->_session->getUserId();
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_tmp_data = '##tmp_r_b_' . $this->setting->_user_id;
    }

    function BankreportRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        
                        if($param['version'] == '2'){

                        }else{
                            $data = $this->buildQuery();
                        }
                        
                        $data['dataindexby'] =$param['dataindexby']; 
                        $data['detailaccount'] =$param['detailaccount']; 
                        $data['typetrans'] =$param['typetrans']; 
                        $data['fromperiode'] =$param['fromperiode']; 
                        $data['untilperiode'] =$param['untilperiode']; 
                        $data['typetrans'] =$param['typetrans']; 
                        $data['periode'] = $param['fromperiode']; 
                        $data['dataflow'] = $param["typetrans"];
                        $data['indexdata'] = $param["dataindexby"];
                        $data['detailaccount'] = $param["detailaccount"];
                        $data['printdate'] = date("D-M-Y");
                        $data['timeprint'] = date("H:i:s");
                        $data['reportfile'] = "Bank Report";
                       
                        $counter = 0;
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

    public function buildQuery() {
        $this->setting->setConnection(); //call connection database
        $param = $this->setting->_param;
        $m_voucherprefix = $this->setting->_m_voucherprefix;
        $th_kasbank = $this->setting->_th_kasbank;
        $td_kasbankdetail = $this->setting->_td_kasbankdetail;
        $m_coa = $this->setting->_m_coa;
        $project_id = $this->setting->_project_id;
        $m_project = $this->setting->_m_project;
        $m_pt = $this->setting->_m_pt;
        $m_department = $this->setting->_m_department;       
        
        
        $sqldataheader = '';
        $sqldatadetail = '';
        $sqlgroup = '';
        $sqlheader = '';
        $sqldetail = '';
        $sqlprefixcoa = '';
        $sqlorderby = '';
        $wheredataheader = '';
        $wheredatadetail = '';
        $fielddate = '';
        $fromdate = $param['fromperiode'];
        $untildate = $param['untilperiode'];

        $group_id = $param['grouptrans_id'];

        $allgroup = $param['allgroup'];
        if ($allgroup == 0) { //for filter group trans
            $sqlgroup = " AND grouptrans_id=$group_id ";
        }

        $inpt = $param['in_ptid'];
        $incoa = $param['incoa'];
        $in_deptid = $param['in_deptid'];
        $dataflow = $param['typetrans'];

        $statusdata = 'BANK'; //untuk di label query

        if ($param['allcompany'] == 0) {//for filter coa from voucher prefix by pt
            $sqlprefixcoa = " AND a.coa_id IN (SELECT coa_id FROM $m_voucherprefix WHERE project_id=$project_id AND cash_bank ='B') ";
        } else {
            $sqlprefixcoa = " AND a.coa_id IN (SELECT coa_id FROM $m_voucherprefix WHERE project_id=$project_id AND pt_id in ($inpt) AND cash_bank ='B' ) ";
        }


        switch ($param['dataindexby']) { //for order by
            case 'voucherno':
                $fielddate = ' accept_date ';
                $sqlorderby = ' ORDER BY mprj.name,mpt.name,a.voucher_no,a.accept_date ';
                $sqlorderbyforunion = ' ORDER BY projectname,ptname,voucher_no,accept_date,kasbank_id,flagdata ';
                $sqlorderbydetail = ' ORDER BY mprj.name,mpt.name,thkb.voucher_no,thkb.accept_date ';
                break;
            case 'voucherdate':
                $fielddate = ' accept_date ';
                $sqlorderby = ' ORDER BY mprj.name,mpt.name,a.accept_date,a.voucher_no ';
                $sqlorderbyforunion = ' ORDER BY projectname,ptname,accept_date,voucher_no,kasbank_id,flagdata ';                
                $sqlorderbydetail = ' ORDER BY mprj.name,mpt.name,thkb.accept_date,thkb.voucher_no ';
                break;
            case 'department':
                $fielddate = ' accept_date ';
                $sqlorderby = ' ORDER BY mprj.name,mpt.name,mdept.department,mcoa.coa,a.accept_date,a.voucher_no ';
                $sqlorderbyforunion = ' ORDER BY projectname,ptname,department,coa,accept_date,kasbank_id,flagdata,voucher_no ';
                $sqlorderbydetail = ' ORDER BY mprj.name,mpt.name,mdept.department,mcoa.coa,thkb.accept_date,thkb.voucher_no ';
                break;
            case 'paymentdate':
                $fielddate = ' chequegiro_payment_date ';
                $sqlorderby = ' ORDER BY mprj.name,mpt.name,a.chequegiro_payment_date ';
                $sqlorderbyforunion = ' ORDER BY projectname,ptname,voucher_no,chequegiro_payment_date,kasbank_id,flagdata ';
                $sqlorderbydetail = ' ORDER BY mprj.name,mpt.name,thkb.chequegiro_payment_date ';
                break;
            case 'chequegirono':
                $fielddate = ' accept_date ';
                $sqlorderby = ' ORDER BY mprj.name,mpt.name,a.chequegiro_no,a.voucher_no ';
                $sqlorderbyforunion = ' ORDER BY projectname,ptname,chequegiro_no,voucher_no,kasbank_id,flagdata ';                
                $sqlorderbydetail = ' ORDER BY mprj.name,mpt.name,thkb.chequegiro_no,thkb.voucher_no ';
                break;
            case 'amountvalue':
                $fielddate = ' accept_date ';
                $sqlorderby = ' ORDER BY mprj.name,mpt.name,a.amount,a.voucher_no ';
                $sqlorderbyforunion = ' ORDER BY projectname,ptname,amount,voucher_no,kasbank_id,flagdata ';
                $sqlorderbydetail = ' ORDER BY mprj.name,mpt.name,a.amount,thkb.voucher_no ';
                break;
        }


        $sqldataheader = "
                         SELECT
                           '1' as flagdata,
                            a.project_id,
                            a.pt_id,
                            a.department_id,
                            mprj.name as projectname,
                            mpt.name as ptname,
                            mdept.department,
                            a.kasbank_id,
                            a.accept_date,
                            a.chequegiro_payment_date,
                            a.kasbank,                            
                            a.voucher_no,
                            a.coa_id,
                            mcoa.coa,
                            ' 0 ' as coa_tmp,                           
                           '$statusdata' AS  tr_cg,
                            a.transno,
                            a.journal_voucher_date,
                            a.chequegiro_no,                          
                            a.description,
                            a.dataflow,
                            a.amount,
                            a.amount as amountforsum,
                            case a.dataflow when 'I' then a.amount else 0 end as debit,
                            case a.dataflow when 'O' then a.amount else 0 end as credit,                        
                            case a.dataflow when 'O' then a.amount else -a.amount end as amountcalculate,
                            ( SELECT 
                                    x.description
                                FROM $m_voucherprefix X  
                                WHERE 
                                       x.project_id = a.project_id
                                  AND  x.pt_id = a.pt_id
                                  AND  x.prefix_id = a.prefix_id
                                  AND x.coa_id = a.coa_id
                                  AND x.in_out = a.dataflow
                                  AND x.cash_bank = SUBSTRING(a.kasbank,1,1) 
                             ) AS voucherpprefix_desc
                            FROM $th_kasbank a 
                            LEFT JOIN $m_coa mcoa ON a.coa_id = mcoa.coa_id    
                            LEFT JOIN $m_department mdept ON a.department_id = mdept.department_id    
                            LEFT JOIN $m_project mprj ON a.project_id = mprj.project_id    
                            LEFT JOIN $m_pt mpt ON a.pt_id = mpt.pt_id    
                            LEFT OUTER JOIN (
                                                                    SELECT DISTINCT 
                                                                    project_id,pt_id,prefix_id,coa_id
                                                                    FROM $m_voucherprefix
                                                    ) b ON a.coa_id = b.coa_id 
                                                                AND a.prefix_id = b.prefix_id 
                                                                AND a.project_id = b.project_id 
                                                                    AND a.pt_id = b.pt_id 
                                                  
               
                              ";

        $sqldatadetail = "
                    SELECT
                        '2' as flagdata,
                        a.project_id,
                        a.pt_id,
                        thkb.department_id,
                        mprj.name as projectname,
                        mpt.name as ptname,
                        mdept.department,
                        a.kasbank_id,
                        thkb.accept_date,
                        thkb.chequegiro_payment_date,
                        thkb.kasbank,                       
                        thkb.voucher_no,
                        a.coa_id,
                        case a.coa_id when '0' then a.coa_tmp else mcoa.coa end as coa,
                        a.coa_tmp,                        
                        '$statusdata' AS  tr_cg,
                        a.seq as transno,
                        thkb.journal_voucher_date,
                        thkb.chequegiro_no,
                        a.description,
                        a.dataflow,
                        a.amount,
                        0 as amountforsum,
                        case a.dataflow when 'I' then a.amount else 0 end as debit,
                        case a.dataflow when 'O' then a.amount else 0 end as credit,                        
                        case a.dataflow when 'O' then a.amount else -a.amount end as amountcalculate,
                        ( SELECT x.description
                          FROM $m_voucherprefix X  
                          WHERE 
                                 x.project_id = a.project_id
                            AND  x.pt_id = a.pt_id 
                            AND x.prefix_id = thkb.prefix_id
                            AND x.fixed_coa = a.coa_tmp
                            AND x.in_out = a.dataflow
                            AND x.cash_bank = SUBSTRING(thkb.kasbank,1,1) 
                         ) AS voucherpprefix_desc
                        FROM $td_kasbankdetail a
                        LEFT OUTER JOIN $th_kasbank thkb ON a.kasbank_id = thkb.kasbank_id 
                        LEFT OUTER JOIN $th_kasbank d ON a.kasbank_id = d.kasbank_id
                        LEFT JOIN $m_coa mcoa ON a.coa_id = mcoa.coa_id
                        LEFT JOIN $m_department mdept ON thkb.department_id = mdept.department_id
                        LEFT JOIN $m_project mprj ON a.project_id = mprj.project_id    
                        LEFT JOIN $m_pt mpt ON a.pt_id = mpt.pt_id  
                        LEFT OUTER JOIN (
                                        SELECT DISTINCT 
                                                project_id, pt_id, prefix_id, coa_id
                                         FROM $m_voucherprefix
                                         ) b ON a.coa_id = b.coa_id 
                                             AND thkb.prefix_id = b.prefix_id 
                                             AND a.project_id = b.project_id
                                                         AND a.pt_id = b.pt_id

                    ";



        $wheredataheader = "
                    WHERE
                         convert(date,a.$fielddate) BETWEEN '$fromdate' AND '$untildate' 
                    AND a.kasbank ='$statusdata'   
                    AND a.deleted = 0
                ";

        $wheredatadetail = " 
                WHERE
                        convert(date,d.$fielddate) BETWEEN '$fromdate' AND '$untildate' 
                    AND thkb.kasbank ='BANK'   
                ";

        if ($param['detailaccount'] == 'yes') {
            if (!empty($incoa)) {
                $wheredataheader .= " AND mcoa.coa IN ($incoa) ";
            }
        }



        $wheredataheader.= " AND a.pt_id IN ($inpt) ";
        $wheredatadetail.= " AND a.pt_id IN ($inpt) ";
       
//        $wheredataheader.= " AND a.department_id IN ($in_deptid) ";
//        $wheredatadetail.= " AND d.department_id IN ($in_deptid) ";
        
        if($dataflow !=='All'){
            $wheredataheader.= " AND a.dataflow='$dataflow' ";
            $wheredatadetail.= " AND a.dataflow='$dataflow' ";
        }
        
        $wheredataheader.= " AND a.chequegiro_status IN ('PAID','APPROVE') ";
        $wheredatadetail.= " AND d.chequegiro_status IN ('PAID','APPROVE') ";

        $wheredataheader.= " AND coa is not null ";
        $wheredatadetail.= " AND coa is not null ";
        
        $sqlheader = $sqldataheader.' '.$sqlprefixcoa.' '.$sqlgroup.' '.$wheredataheader;
        $sqldetail = $sqldatadetail.' '.$sqlprefixcoa.' '.$wheredatadetail;
        
        //$sqlcontent = " SELECT * FROM ( $sqlheader ) a UNION  SELECT * FROM ( $sqldetail ) a ".$sqlorderbyforunion;
    
        
        $sqlcontent = "      
            IF OBJECT_ID('tempdb..$this->_tmp_data') IS NOT NULL DROP TABLE $this->_tmp_data
                     SELECT * INTO $this->_tmp_data FROM
              (             
                SELECT * FROM ( $sqlheader ) a UNION  SELECT * FROM ( $sqldetail ) a 
              ) AS DATA
          ";
//        $sqlcontent = "      
//          
//               
//                        Drop Table $this->_tmp_data
//             
//                     SELECT * INTO $this->_tmp_data FROM
//              (             
//                SELECT * FROM ( $sqlheader ) a UNION  SELECT * FROM ( $sqldetail ) a 
//              ) AS DATA
//          ";
        $this->setting->execquery($sqlcontent);
        return array(
            "qd" => $this->_tmp_data .$sqlorderbyforunion,           
        );        
        
    }

}
