<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Report_Chequeclearing extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $con_sqlsrv = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setConnection();
    }

    public function setConnection() {
        $config = $this->setting->getcommonconfig();
        $host = str_replace('"', '', $config['host']);
        $username = str_replace('"', '', $config['username']);
        $password = str_replace('"', '', $config['password']);
        $db = 'cashier';
        $this->con_sqlsrv = sqlsrv_connect($host, array("Database" => $db, "UID" => $username, "PWD" => $password));
        if ($this->con_sqlsrv === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        }
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $reportfile = $this->setting->_param['reportfile'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $tmp_table = $this->build_query($param);
                        $qparam = array(
                            "qdata" => $tmp_table,
                            "reportfile" => $reportfile,
                            "paramjs" => $param,
                        );
                        $data = $qparam;
                        $counter = 1;
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
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
                
            }
        }
        sleep(5);
        return $return;
    }

    public function build_query($param) {
        /* start setup valiable table */        
        $m_project = $this->setting->_m_project;
        $m_pt = $this->setting->_m_pt;
        $m_coa = $this->setting->_m_coa;
        $m_voucherprefix = $this->setting->_m_voucherprefix;
        $mh_vendor = $this->setting->_mh_vendor;
        $th_kasbank = $this->setting->_th_kasbank;
        $td_kasbankdetail = $this->setting->_td_kasbankdetail;
        $td_kasbank_vendor = $this->setting->_td_kasbank_vendor;
        $tmp_rpt = '##tmp_rpt_' . $this->setting->_user_id;
       /* end setup valiable table */        



        /* start parameter */
        $chequegirostatus = $param['chequegirostatus'];
        $dataflow = $param['typetrans'];
        $frompt = $param['frompt'];
        $untilpt = $param['untilpt'];
        $in_ptid = $param['in_ptid'];
        $in_coa = $param['incoa'];
        $reportfile = $param['reportfile'];
        $fromamount = $param['fromrange'];
        $untilamount = $param['untilrange'];
        $project_di = $this->setting->_project_id;
        $fromdate = $param['fromperiode'];
        $untildate = $param['untilperiode'];
        $statusposting = $param['statusdata'];
        /* end parameter */


        //dynamic condition for detail sum coa
        if ($reportfile !== 'DetailsumCoa') {
            $sqlsumcoa = "
                            ,-99999999.99 AS CoaAmount1
                            ,-99999999.99 as CoaAmount2
                            ,-99999999.99 as CoaAmount3
                            ,-99999999.99 as CoaAmount4
                            ,-99999999.99 as CoaAmount5
                         ";
        } else {
            $coa1 = $param['coa1'];
            $coa2 = $param['coa2'];
            $coa3 = $param['coa3'];
            $coa4 = $param['coa4'];
            $coa5 = $param['coa5'];

            $sqlsumcoa = "  ,
                            (
                              SELECT 
                                    COALESCE(SUM(COALESCE(amount,0)),0) 
                              FROM $td_kasbankdetail 
                              WHERE 
                              kasbank_id = a.kasbank_id 
                              AND coa_id =$coa1 
                             ) CoaAmount1  
                             ,
                            (
                              SELECT 
                                    COALESCE(SUM(COALESCE(amount,0)),0) 
                              FROM $td_kasbankdetail 
                              WHERE 
                              kasbank_id = a.kasbank_id 
                              AND coa_id =$coa2 
                             ) CoaAmount2
                              ,
                            (
                              SELECT 
                                    COALESCE(SUM(COALESCE(amount,0)),0) 
                              FROM $td_kasbankdetail 
                              WHERE 
                              kasbank_id = a.kasbank_id 
                              AND coa_id =$coa3 
                             ) CoaAmount3
                              ,
                            (
                              SELECT 
                                    COALESCE(SUM(COALESCE(amount,0)),0) 
                              FROM $td_kasbankdetail 
                              WHERE 
                              kasbank_id = a.kasbank_id 
                              AND coa_id =$coa4 
                             ) CoaAmount4
                              ,
                            (
                              SELECT 
                                    COALESCE(SUM(COALESCE(amount,0)),0) 
                              FROM $td_kasbankdetail 
                              WHERE 
                              kasbank_id = a.kasbank_id 
                              AND coa_id =$coa5 
                             ) CoaAmount5

                         ";
        }


        //create data for temporary table
        $sql = "      
        IF OBJECT_ID('tempdb..$tmp_rpt') IS NOT NULL DROP TABLE $tmp_rpt
                 SELECT * INTO $tmp_rpt FROM
          (  
        
            SELECT   
                b.project_id,c.pt_id,e.coa_id,
                b.code as projectcode,b.name as projectname,
                c.code as ptcode,c.name as ptname,
                a.kasbank_id,
                a.transno,
                a.voucher_no,
                a.accept_date,
                a.amount,
                case a.dataflow when 'I' then a.amount else 0 end as credit,
		case a.dataflow when 'O' then a.amount else 0 end as debit,
		case a.dataflow when 'O' then a.amount else -a.amount end as amountsum,	
                a.chequegiro_no,
                convert(date,a.chequegiro_date) as chequegirodate,
                convert(date,a.chequegiro_receive_date) as chequegiroreceivedate,
                convert(date,a.chequegiro_release_date) as chequegiroreleasedate,
                convert(date,a.chequegiro_payment_date) as chequegiropaymentdate,
                a.chequegiro_status,
                f.vendorname,
                e.coa,
                e.coaname,
                a.payment,
                a.is_posting,
                a.dataflow,
                a.kasbank,
                a.is_posting_gl,
                a.description
                $sqlsumcoa
                FROM $th_kasbank a
                LEFT JOIN $m_project b on a.project_id = b.project_id
                LEFT JOIN $m_pt c on a.pt_id = c.pt_id
                LEFT OUTER JOIN (
                                                        SELECT 
                                                                        d.project_id, d.pt_id, d.coa,d.coa_id,d.name as coaname 
                                                                        FROM $m_coa d 
                                                                        WHERE 
                                                                        d.deleted = 0 
                                                                        AND d.coa_id IN (
                                                                                                                SELECT coa_id 
                                                                                                                FROM $m_voucherprefix 
                                                                                                                WHERE 
                                                                                                                        deleted = 0 
                                                                                                                        AND cash_bank = 'B'
                                                                                                         )

                                             ) as  e ON e.pt_id = a.pt_id AND e.coa_id = a.coa_id 
                LEFT OUTER JOIN (
                                                        SELECT 
                                                                        x.*,y.vendorname 
                                                        FROM $td_kasbank_vendor X 
                                                        LEFT JOIN $mh_vendor Y ON x.vendor_id = y.vendor_id

                                                ) f ON a.kasbank_id = f.kasbank_id 

                WHERE
                a.deleted=0 
                AND a.active=1
                AND a.kasbank='BANK'
                AND convert(date,a.accept_date) between '$fromdate' and '$untildate'
";


        //cek kondisi filter project pt
        if ($param['allcompany'] == 0) {
            $sql .= " AND a.project_id=$project_di AND a.pt_id IN ($in_ptid) ";
        } else {
            $sql .= " AND a.project_id=$project_di";
        }
        //cek kondisi filter coa bank
        if ($param['allbank'] == 0) {
            $sql .= " AND e.coa IN($in_coa) ";
        }


        //cek kondisi filter status data telah di posting atau belum
        if ($param['statusdata'] !== 'all') {
            if ($statusposting == 'posting') {
                $sql .= " AND a.is_posting=2";
            } else {
                $sql .= " AND a.is_posting IN(0,1)";
            }
        }
        //cek kondisi filter status cheuque giro
        if ($chequegirostatus !== 'all') {
            $sql .= " AND a.chequegiro_status='$chequegirostatus'";
        }
        //cek kondisi data flow
        if ($dataflow !== 'all') {
            $sql .= " AND a.dataflow='$dataflow'";
        }

        //cek kondisi filter range amount approve    
        if ($param['allrangeapproval'] == 0) {
            if ($reportfile == 'BankpaymentVoucher') {
                $sql .= "  AND a.amount >=$fromamount AND a.amount <=$untilamount ";
            }
        }
        //$sql .= " ORDER BY b.name,c.name,e.coa,a.accept_date,a.kasbank_id,a.transno,a.chequegiro_no";
        $sql .= " ) AS DATA ";
        $exec = sqlsrv_query($this->con_sqlsrv, $sql);
        return $tmp_rpt;
    }

}
