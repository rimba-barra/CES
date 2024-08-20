<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
date_default_timezone_set('Asia/Jakarta');
class Gl_Models_Generalmodel_Modelsp extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    private $dbtemporary = null;
    protected $_postingakhirtahun;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        
    }
    
    
    /**
     * execSP4
     * [noto.gunawan@yahoo.com]
     * [noto.gh@gmail.com]
     *
     * 2012-11-05 03:39 PM
     * OUTPUT PARAMETER still not supported
     * Can accept array param
     * Multi Result Set (Ultimate Edition)
     * Edited 2016-07-13 by riadi for specified string with |^ 
     * if the data on sql server as varchar but sometimes there are a number
     */
    public function array_to_xml($array, $level = 0) {
        $xml = ($level == 0) ? '<?xml version="1.0" encoding="ISO-8859-1"?>' . PHP_EOL : '';
        $tab = str_pad('', $level, '  ', STR_PAD_LEFT);
        foreach ($array as $node => $value) {
            $xml .= "{$tab}<{$node}>";
            if (!is_array($value)) {
                $xml .= $value;
            } else {
                $level++;
                $xml .= PHP_EOL . $this->array_to_xml($value, $level) . $tab;
            }
            $xml .= "</{$node}>" . PHP_EOL;
        }
        return $xml;
    }

    public function getindex_array($array, $field, $search) {
        //example 
        foreach ($array as $key => $row) {
            if (trim(strtolower($row[$field])) === trim(strtolower($search)))
                return $key;
        }
        return false;
    }

    public function extract_array($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();

        foreach ($array as $key => $value) {
            $keydata[] = $key;
            $values[] = $value;
            $setdata[] = $key . '=' . $value;
            $where[] = ' AND ' . $key . '=' . $value;
        }

        $wherefix = "
                        WHERE 
                                active =1 
                            AND deleted =0 
                            AND project_id =$this->_project_id 
                            AND pt_id=$this->_pt_id 
                     ";

        $setwhere = $wherefix . implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => $setwhere,
            "wherefix" => $wherefix,
        );

        return $return;
    }

    public function execSP4($spname = '', $args = '') {
        if ($spname) {
            $param = array();
            $args = func_get_args();
            if (count($args) > 1) {
                $args = array_slice($args, 1);
                foreach ($args as $val) {
                    if (is_array($val)) {
                        $param = array_merge($param, $val);
                    } else {
                        array_push($param, $val);
                    }
                }
            }
            switch ($this->_adapterName) {
                case 'mysql':
                    $sql = 'CALL ';
                    //$param = $param ? '('.$param.')' : '';
                    break;
                case ($this->_adapterName == 'mssql' || $this->_adapterName == 'sqlsrv'):
                    $sql = 'EXEC ';
                    break;
                default:
                    return;
                    break;
            }
            $spname = ($this->_schema ? $this->_schema . '.' : '') . $spname;
            //$param = (count($param) ? " '" . str_replace("%$%", "', '", implode('%$%', $param)) . "' " : '');	
            if (count($param)) {
                foreach ($param as $key => $val) {
                    if (!is_numeric($val)) {
                        $tmp = explode("|^", $val);
                        if(isset($tmp[1])){
                            $val = $tmp[1];
                        } else {
                            $val = '';
                        }
                        $param[$key] = "'" . $val . "'";
                    }
                }
                $param = " " . str_replace("%$%", ", ", implode('%$%', $param)) . " ";
            }

            $sql .= $spname . ' ' . $param;
            $this->sqlStr = $sql;
            //var_dump($sql);
            //die();

            $result = array();
            $qryIdx = 0;
            $stmt = $this->_db->query($sql);
            try {
                $result[$qryIdx] = $stmt->fetchAll();
            } catch (Exception $e) {
                $result[$qryIdx] = $stmt->rowCount();
            }
            $next = $stmt->nextRowset();
            while ($next) {
                $qryIdx++;
                try {
                    $result[$qryIdx] = $stmt->fetchAll();
                } catch (Exception $e) {
                    $result[$qryIdx] = $stmt->rowCount();
                }
                $next = $stmt->nextRowset();
            }
            return $result;
        }
    }

    function getcommonconfig() {
        $base = substr(getcwd(), 0, -6) . 'application/modules/main/configs/main.ini'; //get common config
        $file_contents = fopen($base, "r"); //read file main.ini
//        while(!feof($file_contents)) {
//        echo fgets($file_contents) . "<br>";
//      }
//      
        $dataconfig = array();
        while (!feof($file_contents)) { //loop all text in main.ini
            $line_of_text = fgets($file_contents); //loop one line from text main.ini
            $host = null;
            $username = null;
            $password = null;
           
            //filter text
            if (stripos($line_of_text, "resources.db.params.host") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $dataconfig['host'] = str_replace("resources.db.params.host=", "", $string); //remove text
            }
            if (stripos($line_of_text, "resources.db.params.username") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $dataconfig['username'] = str_replace("resources.db.params.username=", "", $string); //remove text
            }
            if (stripos($line_of_text, "resources.db.params.password") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $dataconfig['password'] = str_replace("resources.db.params.password=", "", $string); //remove text
            }             
        }

        //set configuration from main.ini               
        return $dataconfig;
        fclose($file_contents);
       
    }

    public function checkregisterdatabase($module, $newdb, $newyeardb) {
        $data = array(
            $module,
            $newdb,
            $newyeardb
        );
        $result = $this->execSP3('sp_checkregisterdatabase', $data);
        return $result;
    }

    public function registerdatabase($module, $newdb, $newyeardb) {
        $data = array(
            $module,
            $newdb,
            $newyeardb,
            $this->session->getUserId()
        );
        $this->execSP3('sp_registerdatabase', $data);
    }

    public function createdatabase($dbbackup, $filebak, $newdb, $newmdf, $newldf) {
        $fbak = str_replace('/', '\\', $filebak);
        $logdb = $dbbackup . '_log';
        $mdf = str_replace('/', '\\', $newmdf);
        $ldf = str_replace('/', '\\', $newldf);
        $this->createbackup($dbbackup, $fbak);
        $this->createrestore($newdb, $fbak, $dbbackup, $logdb, $mdf, $ldf);
        $this->truncate_transaction($newdb);
    }

    function createbackup($dbbackup, $fbak) {
        $config = $this->getcommonconfig();       
        $host = str_replace('"','',$config['host']);
        $username = str_replace('"','',$config['username']);
        $password = str_replace('"','',$config['password']);
        $con = array("Database" => $this->session->getSelectedDbApp(), "UID" => $username, "PWD" => $password);
        $glactive = sqlsrv_connect($host, $con);
        
        if ($glactive === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        } else {
            $sql = "              
                BACKUP DATABASE $dbbackup
                TO DISK = '$fbak' with FORMAT
            ";
            sqlsrv_configure("WarningsReturnAsErrors", 0);
            if (($stmt = sqlsrv_query($glactive, $sql))) {
                do {
                    /* print_r(sqlsrv_errors());
                      echo " * ---End of result --- *\r\n"; */
                } while (sqlsrv_next_result($stmt));
                sqlsrv_free_stmt($stmt);
            }
            sqlsrv_configure("WarningsReturnAsErrors", 1);
        }
    }

    function createrestore($newdb, $fbak, $dbbackup, $logdb, $mdf, $ldf) {       
        $config = $this->getcommonconfig();       
        $host = str_replace('"','',$config['host']);
        $username = str_replace('"','',$config['username']);
        $password = str_replace('"','',$config['password']);
        $con = array("Database" => $this->session->getSelectedDbApp(), "UID" => $username, "PWD" => $password);
        $glactive = sqlsrv_connect($host, $con);
        
        
        if ($glactive === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        } else {
            $sql = "               
                RESTORE DATABASE $newdb
                FROM DISK = '$fbak'
                WITH REPLACE,
                MOVE '$dbbackup' TO '$mdf',
                MOVE '$logdb' TO '$ldf'
                
            ";
            sqlsrv_configure("WarningsReturnAsErrors", 0);
            if (($stmt = sqlsrv_query($glactive, $sql))) {
                do {
                    /* print_r(sqlsrv_errors());
                      echo " * ---End of result --- *\r\n"; */
                } while (sqlsrv_next_result($stmt));
                sqlsrv_free_stmt($stmt);
            }
            sqlsrv_configure("WarningsReturnAsErrors", 1);
        }
    }

    function truncate_transaction($newdb) {     
        $config = $this->getcommonconfig();       
        $host = str_replace('"','',$config['host']);
        $username = str_replace('"','',$config['username']);
        $password = str_replace('"','',$config['password']);
        $con = array("Database" => $newdb, "UID" => $username, "PWD" => $password);
        $glnew = sqlsrv_connect($host, $con);        
        if ($glnew === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        } else {
            $sql = "
                    truncate table th_jurnal
                    truncate table td_jurnaldetail
                    truncate table td_jurnalsubdetail
                    truncate table th_summary                    
                ";
            sqlsrv_query($glnew, $sql);
        }
    }
    
    public function createmj($oldyear,$olddb,$newdb){
        $config = $this->getcommonconfig();       
        $host = str_replace('"','',$config['host']);
        $username = str_replace('"','',$config['username']);
        $password = str_replace('"','',$config['password']);
        
        $con_glold = array("Database" => $olddb, "UID" => $username, "PWD" => $password);
        $glold = sqlsrv_connect($host, $con_glold);       
        
        $con_glnew = array("Database" => $newdb, "UID" => $username, "PWD" => $password);
        $glnew = sqlsrv_connect($host, $con_glnew);        
        
        if ($glold === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        } else {
//             $sqlolddb = "
//                        select 
//                        distinct a.project_id,a.pt_id
//                        from m_coa a
//                        where 
//                        a.deleted = 0
//                        order by a.project_id,a.pt_id  asc 
//               ";
//             $exec = sqlsrv_query($glold, $sqlolddb);
//             while ($row = sqlsrv_fetch_array($exec, SQLSRV_FETCH_ASSOC)) {
//                 $project_id = $row['project_id'];
//                 $pt_id = $row['pt_id'];  
//                 $this->getPostingAkhirtahun()->genReportForEndyear($oldyear,$project_id,$pt_id);
//              }
              
              $this->getPostingAkhirtahun()->genReportForEndyear($oldyear,$this->_project_id,$this->_pt_id);
            //sqlsrv_query($glnew, $sql);
        }
        
        if ($glnew === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        } else {            
            //sqlsrv_query($glnew, $sql);
        }   
    }
    
    function getPostingAkhirtahun(){
        if(!$this->_postingakhirtahun){
             $this->_postingakhirtahun = new Gl_Models_Prosesposting_Postingakhirtahun();
        }       
        return $this->_postingakhirtahun;
    }

    public function getcoa($coa) {
        $result = $this->execSP3('sp_coa_getcoa', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        ));

        return $result;
    }

    public function getcoabyid($id) {
        $result = $this->execSP3('sp_coa_getcoabyid', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $id
        ));

        return $result;
    }

    public function getkelsubbyid($id) {
        $result = $this->execSP3('sp_subaccountgroup_getkelsubbyid', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $id
        ));

        return $result;
    }

    public function customesearchjournal($param) {
        $result = $this->execSP3('sp_coa_getcoabyid', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['added_from'],
            $param['added_until'],
            $param['vdate_from'],
            $param['vdate_until'],
        ));

        return $result;
    }

    public function getFormatReport($param) {
        $result = $this->execSP3('sp_reportformat_getbyreportandlevel', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['report'],
            $param['level'],
        ));

        return $result;
    }

    function listYeargl() {
        $result = $this->execSP3('sp_getlistyear', array(
            'gl',
        ));
        return $result;
    }

    function Clearrptinstallment($param) {
        $this->execSP3('sp_report_installment_destroy', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['level'],
            $this->session->getUserId()
        ));
    }

    function genreportinstallment($array) {
        $this->execSP3('sp_report_installment_create', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $array["coa_id"],
            $array["coa"],
            $array["name"],
            $array["type"],
            $array["report_level"],
            $array["level"],
            $array["sort"],
            $array["flag"],
            $this->session->getUserId()
        ));
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

    public function update_reportinstallment($coa, $array) {
        $this->execSP3('sp_report_installment_update', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa,
            $array['net_summary']
        ));
    }

    public function getalldatasub($param) {
        $this->execSP3('sp_report_subactrx_getall', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['reportby'],
            $param['voucherby'],
            $param['subby'],
            $param['detilby'],
            $param['fromtrxdate'],
            $param['untiltrxdate'],
            $param['fromcoa'],
            $param['untilcoa'],
            $param['fromkelsub'],
            $param['untilkelsub'],
            $param['fromsubcode'],
            $param['untilsubcode'],
        ));
    }

    public function customefromquery($query) {
        $result = $this->execSP3('sp_custome_query', array(
            $query
        ));

        return $result;
    }

    public function bungaloanread($param) {
        $bunga = ($param['bulan'] == '' or $param['bulan'] == null) ? 0 : $param['bulan'];
        $bunga = ($param['bunga'] == '' or $param['bunga'] == null) ? 0 : $param['bunga'];
        $result = $this->execSP3('sp_bungaloan_read', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $bunga,
            $bunga,
            $param['start'],
            $param['limit']
        ));
        return $result;
    }

    public function bungaloancreate($param) {
        $result = $this->execSP3('sp_bungaloan_create', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['bulan'],
            $param['bunga'],
            $this->session->getUserId(),
            '1'
        ));
        return $result;
    }

    public function bungaloanupdate($param) {
        $result = $this->execSP3('sp_bungaloan_update', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['bungaloan_id'],
            $param['bulan'],
            $param['bunga'],
            $this->session->getUserId(),
            1,
        ));
        return $result;
    }

    public function savetochange($param) {
        $result = $this->execSP3('sp_changedata_create', array(
            $this->_project_id,
            $this->_pt_id,
            $param['table'],
            $this->_curdate,
            $param['type'],
            $param['from_id'],
            $param['to_id'],
            $param['from'],
            $param['to'],
            "change data from utility on " . $this->_curdate . ' ' . $param['msg1'] . ' ' . $param['msg2'],
            $this->_user_id,
            1,
        ));
        return $result;
    }

    public function getcoa_in_journaldetail($param) {
        $result = $this->execSP3('sp_journaldetail_getbycoa', array(
            $this->_project_id,
            $this->_pt_id,
            $param['from_coa']
        ));

        return $result;
    }

    public function getcoa_in_sumtrh($param) {
        $result = $this->execSP3('sp_sumtrh_getbycoa', array(
            $this->_project_id,
            $this->_pt_id,
            $param['from_coa']
        ));

        return $result;
    }

    public function getcoa_in_rptformat($param) {
        $result = $this->execSP3('sp_rptformat_getbycoa', array(
            $this->_project_id,
            $this->_pt_id,
            $param['from_coa']
        ));

        return $result;
    }

    public function changecoajournaldetail($param) {
        $result = $this->execSP3('sp_journaldetail_updatecoa', array(
            $this->_project_id,
            $this->_pt_id,
            $param['from_id'],
            $param['from_coa'],
            $param['to_id'],
            $param['to_coa'],
            $param['kelsub_id'],
            $param['kelsub'],
            $this->_user_id,
            1
        ));
        return $result;
    }

    public function changecoasumtrh($param) {
        $result = $this->execSP3('sp_sumtrh_updatecoa', array(
            $this->_project_id,
            $this->_pt_id,
            $param['from_id'],
            $param['from_coa'],
            $param['to_id'],
            $param['to_coa'],
            $this->_user_id,
            1
        ));
        return $result;
    }

    public function changerptformat($param) {
        $result = $this->execSP3('sp_rptformat_updatecoa', array(
            $this->_project_id,
            $this->_pt_id,
            $param['from_id'],
            $param['from_coa'],
            $param['to_id'],
            $param['to_coa'],
            $this->_user_id,
            1
        ));
        return $result;
    }

    public function delete_jurnalsubdetail($journaldetail_id) {
        $result = $this->execSP3('sp_journalsubdetail_deletebyjournaldetail', array(
            $this->_project_id,
            $this->_pt_id,
            $journaldetail_id,
            1,
            $this->_user_id,
        ));
        return $result;
    }

    public function delete_jurnalsubdetailbyid($journaldetail_id) {
        $result = $this->execSP3('sp_journalsubdetail_delete', array(
            $this->_project_id,
            $this->_pt_id,
            $journaldetail_id,
            1,
            $this->_user_id,
        ));
        return $result;
    }

    public function getbungalaon_bymonth($month) {
        $result = $this->execSP3('sp_bungaloan_getbymonth', array(
            $this->_project_id,
            $this->_pt_id,
            $month,
        ));
        return $result;
    }

    public function getsubnothave($param) {
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        $result = $this->execSP3('sp_subvsaccount_read', array(
            $this->_project_id,
            $this->_pt_id,
            null,
            null,
            $fromdate,
            $untildate
        ));

        //var_dump($this->sqlStr);

        return $result[0];
    }

    public function getaccountvssub($param) {
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        $result = $this->execSP3('sp_accountvssub_read', array(
            $this->_project_id,
            $this->_pt_id,
            //$param['fromcoa'],
            //$param['untilcoa'],
            $fromdate,
            $untildate,
            $param['is_post'],
        ));
        return $result[0];
    }

    public function getjournalbyvoucherno($voucherno) {
        $result = $this->execSP3('sp_journal_getbyvoucherno', array(
            $this->_project_id,
            $this->_pt_id,
            $voucherno,
        ));
        return $result;
    }

    public function checkjournal($voucherno) {
        $result = $this->execSP3('sp_journal_checkexist', array(
            $this->_project_id,
            $this->_pt_id,
            $voucherno,
        ));
        return $result;
    }

    public function createjournal($param) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $param['voucherno'],
            date('Y-m-d', strtotime($param['voucherdate'])),
            $param['prefix_id'],
            $param['debit_total'],
            $param['credit_total'],
            $param['selisih'],
            $this->_user_id,
            '1'
        );

        $result = $this->execSP3("sp_journal_create", $data);
        return $result;
    }

    public function createaccountjournal($param) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $param['journal_id'],
            $param['sort'],
            $param['kelsub_id'],
            $param['coa_id'],
            $param['kelsub'],
            $param['coa'],
            $param['type'],
            $param['keterangan'],
            $param['amount'],
            $this->_user_id,
            '1'
        );
        $result = $this->execSP3("sp_journaldetail_create", $data);
        return $result;
    }

    public function createsubaccountjournal($param) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $param['journal_id'],
            $param['journaldetail_id'],
            $param['coa_id'],
            $param['subgl_id'],
            $param['kelsub_id'],
            $param['code'],
            $param['code1'],
            $param['code2'],
            $param['code3'],
            $param['code4'],
            $param['keterangan'],
            $param['amount'],
            $this->_user_id,
            '1'
        );
        $result = $this->execSP3("sp_journalsubdetail_create", $data);
        return $result;
    }
    public function getdataoffset_item($grid,$gridposition) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $this->_user_id,
            'I',
            $grid,
            $gridposition,           
        );
        $result = $this->execSP3("sp_rptoffset", $data);
        return $result[0];
    }

    function offset_read($xml) {
        $result = $this->execSP4('sp_offset_read', $xml);
        return $result;
    }

}
