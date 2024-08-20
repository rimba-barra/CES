<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Function_Bankposition extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $session;
    public $_tmp_report = null;
    public $grouptrans = 'm_grouptrans';
    public $kasbank = 'th_kasbank';
    public $mproject = 'dbmaster.dbo.m_project';
    public $mpt = 'dbmaster.dbo.m_pt';
    public $setting = '';

    function init() {
        //start setup
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_General_Generaldata();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_report_fin_bankpositionreport';
        $this->setting->getGllastyear();
               
        //end setup
        //start paramter      
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_active = 1;
        $this->_delete = 0;
        //end parameter  
        //start create temporary for report 
        $this->_tmp_report = 'tmp_rpt_bankposition';
        $this->_tmp_head_rpt = '##tmp_dataheader_' . $this->_user_id;
        $this->_tmp_content_rpt = '##tmp_datacontent_' . $this->_user_id;
        //end create temporary for report                
    }
    
    

    public function istext($text) {
        return "''" . $text . "''";
    }

    public function truncatetable() {
        $sql = "TRUNCATE TABLE $this->_tmp_report ";
        $this->_model->customefromquery($sql);
    }

    public function deletetable($reportfile) {
        $this->setting->_paramsql = 'deletereport';
        $this->setting->_param = array("reportfile" => $reportfile);
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function getbegindata($param) {
        $this->setting->_paramsql = 'begindata';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function getBeginingbalance($param) {
        $this->setting->_paramsql = 'getbeginingbalance';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function getdataBeginingbalance() {
        $this->setting->_paramsql = 'getdatabybeginingbalance';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function getdataendBalance($reportfile, $project_id, $pt_id) {
        $this->setting->_paramsql = 'getendbalance';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array("reportfile" => $reportfile);
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function getdataSum($reportfile, $project_id, $pt_id) {
        $this->setting->_paramsql = 'getsumdata';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array("reportfile" => $reportfile);
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function insertdata($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tmp_report ($key) VALUES ($values)  
               ";
        $return = $this->_model->customefromquery($sql);
        return $return;
    }

    function updatedata($id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_report SET $data
                 WHERE 
                    rpt_id = $id
                      
               ";
        $this->_model->customefromquery($sql);
    }

    function deletedata($user_id, $user_project_id, $user_pt_id, $reportfile) {
        $sql = "
                 DELETE $this->_tmp_report
                 WHERE 
                    user_id = $user_id
                    AND user_project_id = $user_project_id
                    AND user_pt_id = $user_pt_id
                    AND reportfile = ''$reportfile''
               ";
        $this->_model->customefromquery($sql);
    }

    function getdataTrans($param, $project_id, $pt_id) {
        $this->setting->_paramsql = 'getdatafortrans';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getdeptbyprojectpt($sp, $param, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getdeptbyprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getcoabydeptprojectpt($sp, $param, $project_id, $pt_id, $department_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getcoabydeptprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function totalsubbydept($sp, $param, $project_id, $pt_id, $department_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'totalsubbydept';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getkasbankbycoadeptprojectpt($sp, $param, $project_id, $pt_id, $department_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getkasbankbycoadeptprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        //print_r($result);
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getaccountkasbankbyprojectptcoa_id($sp, $param, $project_id, $pt_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getaccountkasbankbyprojectptcoaid';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function totalsubcoabydept($sp, $param, $project_id, $pt_id, $department_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'totalsubcoabydept';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function totalsubcoa($sp, $param, $project_id, $pt_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'totalsubcoa';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getkasbankbyprojectpt($sp, $param, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getkasbankbyprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getdatadetailbyidheader($sp, $id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_iddata = $id;
        $this->setting->_paramsql = 'getkasbankdetailbykasbankid';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getsubtotalkasbank($sp, $id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_iddata = $id;
        $this->setting->_paramsql = 'getsubtotalkasbank';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getdatareportbyuserdate($sp) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getdatareportbyuserdate';
        $this->setting->_param = array(
            "reportdate" => $this->_curdate,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getgrandprojectpttotalkasbank($sp, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_paramsql = 'getgrandtotalprojectptkasbank';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function gettotalsubcompany($sp, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_paramsql = 'gettotalsubcompanydept';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getgrandproject($sp, $project_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_paramsql = 'getgrandprojectdept';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getgrandprojecttotalkasbank($sp, $project_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_paramsql = 'getgrandtotalprojectkasbank';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function showreportbyuser($sp, $param) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'showreportbyuser';
        $param['reportdate'] = $this->_curdate;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        //var_dump($result);
        if (!empty(end($result))) {
            // $return = end(end((end($result['dataprocess']))));
            $return = $result[1][0]['dataprocess'];
        } else {
            $return = null;
        }
        return $return;
    }

    function query_getdata_kasbak($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $coa_id = $param['coa_id'];
        $fromdate = $this->setting->checkdata($param['fromdate']);
        $untildate = $this->setting->checkdata($param['untildate']);
        $typedata = $this->setting->checkdata($param['kasbank']);
        $status = $this->setting->checkdata($param['status_giro']);
        $sql = "
                SELECT 
                a.*
                FROM $this->kasbank a
                WHERE
                a.deleted=0
                AND a.active = 1
                AND a.project_id =$project_id 
                AND a.pt_id =$pt_id 
                AND a.coa_id =$coa_id 
                AND convert(date,a.accept_date) BETWEEN $fromdate AND $untildate
                AND a.kasbank=$typedata   
                AND a.chequegiro_status=$status   
                ORDER BY a.accept_date,a.voucher_no    
               ";
        return $this->_model->customefromquery($sql);
    }

    function query_getdata_sumendingtotal($param) {
        $user_id = $this->setting->_user_id;
        $user_project_id = $this->setting->_project_id;
        $user_pt_id = $this->setting->_pt_id;
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $coa_id = $param['coa_id'];
        $sql = "
                SELECT 
                rpt_id,leveldata,                
                sum(amount) OVER (PARTITION BY coa_id order by leveldata,voucherdate,bankvoucher_no ROWS BETWEEN UNBOUNDED PRECEDING AND 0 PRECEDING) as endingbalance	
                FROM $this->_tmp_report a
                WHERE
                    a.user_id =$user_id 
                AND a.user_project_id =$user_project_id 
                AND a.user_pt_id =$user_pt_id 
                AND a.project_id =$project_id 
                AND a.pt_id =$pt_id 
                AND a.coa_id =$coa_id 
                ORDER BY a.leveldata,a.voucherdate,a.bankvoucher_no    
               ";
        return $this->_model->customefromquery($sql);
    }

    function getfinaldata($param) {
        $result = $this->setting->extract_array_withcheck($param);
        $where = $result['whereset'];
        $sql1 = "            
            IF OBJECT_ID(''tempdb..$this->_tmp_head_rpt'') IS NOT NULL DROP TABLE $this->_tmp_head_rpt
            SELECT * INTO $this->_tmp_head_rpt FROM
            ( 
                SELECT 
                    a.*,
                    b.name as projectname,
                    c.name as ptname
                FROM $this->_tmp_report a  
                LEFT JOIN $this->mproject b ON a.project_id = b.project_id     
                LEFT JOIN $this->mpt c ON a.pt_id = c.pt_id     
                $where                  
             ) AS DATA
             
            ";
        $this->_model->customefromquery($sql1);

        $sql2 = "            
            IF OBJECT_ID(''tempdb..$this->_tmp_content_rpt'') IS NOT NULL DROP TABLE $this->_tmp_content_rpt
            SELECT * INTO $this->_tmp_content_rpt FROM
            ( 
                SELECT 
                    a.*,
                    b.code as groupcode
                FROM $this->_tmp_report a
                LEFT JOIN $this->grouptrans b ON a.grouptrans_id = b.grouptrans_id
                $where    
                    
             ) AS DATA
             
            ";
        $this->_model->customefromquery($sql2);
        $return = array("qhead" => $this->_tmp_head_rpt, "qcontent" => $this->_tmp_content_rpt);
        return $return;
    }

}
