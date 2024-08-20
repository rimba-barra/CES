<?php

class Cashier_Models_Subaccountcode extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_subgl';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp;
        $this->_query = new Gl_Models_Query_Subaccountcode;
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function subaccountcodeRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam']; 
                
                switch ($parameter) {                   
                     case "livesearch":
                         $result = $this->searchRead($param);
                         $arraydata = $result[1];
                        break;
                     case "filterdata":
                         $result = $this->filterRead($param);
                         $arraydata = $result[1];
                        break;
                     case "project":
                        $result = $this->projectRead();
                         $arraydata = $result[1];
                        break;
                     case "pt":
                         $result = $this->ptRead();
                         $arraydata = $result[1];
                        break;
                     case "readall":
                         $result = $this->readAll();
                         $arraydata = $result[1];
                        break;
                     case "filterdatarange":
                         $result = $this->filterbyRange($param);
                         $arraydata = $result[1];
                        break;
                        break;
                     case "kelsubid_in":
                         $result = $this->Kelsubid_in($param);
                         $arraydata = $result[1];
                        break;
                     case "filtersub":
                         $result = $this->Filtersub($param);
                         $arraydata = $result[1];
                        break;
                    case "filterbysub":
                         $result = $this->Filterbysub($param);
                         $arraydata = $result[1];
                         $total = 0;
                        break;
                    case "filterSubbyCode1":
                         $result = $this->filterSubbyCode1($param);
                         $arraydata = $result[1];
                        break;
                     case "defaultbypt":
                         $result = $this->defaultRead($param);
                         $arraydata = $result[1];
                        break;
                      case "defaultbyprojectpt":
                         $result = $this->defaultProjectPtRead($param);
                         $arraydata = $result[1];
                        break;
                     case "filterbycoaid":
                        $result = $this->getsubaccountbycoaid($param); //print_r($result[2]); exit;
                        $arraydata = $result[2];
                        $total = $result[1][0]['RECORD_TOTAL'];
                        break;
                    case "getiscpmsproject":
                        $result = $this->getiscpmsproject($param);
                        if ( $result[0] ) {
                            $arraydata = $result[0];
                            $total = sizeof($result[0]);
                        }else{
                            $arraydata = [];
                            $total = 0;
                        }
                        break;
                    default:
                        $result = $this->defaultRead($param);
                        $arraydata = $result[1];
                        break;
                }
                
                $return['total'] = isset($result[0][0]['RECORD_TOTAL']) ? $result[0][0]['RECORD_TOTAL'] : $total;
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    function Kelsubid_in($param){
        $result = $this->_query->getkelsub_in($param['kelsubid_in']);
        return $result;
    }
     function Kelsubid_inpt($param){
        $result = $this->_query->getkelsub_inpt($param['pt_id']);
        return $result;
    }
    function Filtersub($param){
        $result = $this->_query->getfiltersubgl($param);
        return $result;
    }
    function filterbyRange($param){
        $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['fromkelsub'],
                $param['untilkelsub']
        );
        return $this->execSP3('sp_subaccountcode_getkelsubbyrange', $data);
        
    }
    
    function filterRead($param){
         $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['kelsub_id'],
            $param['from'],
            $param['until'],            
            $param['start'],            
            $param['limit'],            
        );   
         
        
        $hasil =  $this->execSP3('sp_subaccountcode_filter', $data);
        return $hasil;
        
    }
    
    function searchReadx($param){
        error_reporting(0);
         $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['subgl_id'],
            $param['kelsub_id'],
            $param['code1'],
            $param['code2'],
            $param['code3'],
            $param['code4'],
            $param['code'],
            $param['description'],
            $param['start'],
            $param['limit'],
        );     
        $hasil =  $this->execSP3('sp_subaccountcode_read', $data);
        var_dump($this->sqlStr);
        return $hasil;
    }
    
    function searchRead($param){
        error_reporting(0);
         $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['subgl_id'],
            $param['kelsub_id'],
            "|^".$param['code1']."|^",
            "|^".$param['code2']."|^",
            "|^".$param['code3']."|^",
            "|^".$param['code4']."|^",
            "|^".$param['code']."|^",
            "|^".$param['description']."|^",
            $param['start'],
            $param['limit'],
             //Rizal 31 Mei 2019
            $param['projectpt_id'],
            $param["unit_status"]
             //
        );
        
        $hasil =  $this->_model->execSP4('sp_subaccountcode_read', $data);
        return $hasil;
    }

    function projectRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 15);
        //return $this->execSP3('sp_project_read', $param);
        return $this->execSP3('sp_projectbylogin_read', $data);
    }

    function ptRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 15);
        //return $this->execSP3('sp_pt_read', $param);
        return $this->execSP3('sp_ptbylogin_read', $data);
    }

    /*function defaultRead($param) {
       //ini_set('max_execution_time', 600); //timeout 10 menit
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),           
            $param['start'],
            $param['limit']
                //Rizal 31 Mei 2019
                ,
            $param['projectpt_id']
                //
        );
      
       $hasil =  $this->execSP3('sp_subaccouncode_readall', $data);

             
       // var_dump($this->sqlStr);        
       // die();        
        return $hasil;
         
    }*/
     function defaultRead($param) {
       error_reporting(0);
         $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['subgl_id'],
            $param['kelsub_id'],
            "|^".$param['code1']."|^",
            "|^".$param['code2']."|^",
            "|^".$param['code3']."|^",
            "|^".$param['code4']."|^",
            "|^".$param['code']."|^",
            "|^".$param['description']."|^",
            $param['start'],
            $param['limit'],
             //Rizal 31 Mei 2019
             $param['projectpt_id'],
             $param['unit_status']
             //
        );     
        $hasil =  $this->_model->execSP4('sp_subaccountcode_read', $data);
        return $hasil;
         
    }

     function defaultProjectPtRead($param) {
       error_reporting(0);
         $data = array(
            1,
            $param['project_id'],
            $param['pt_id'],
            $param['subgl_id'],
            $param['kelsub_id'],
            "|^".$param['code1']."|^",
            "|^".$param['code2']."|^",
            "|^".$param['code3']."|^",
            "|^".$param['code4']."|^",
            "|^".$param['code']."|^",
            "|^".$param['description']."|^",
            $param['start'],
            $param['limit'],
             0
        );    
        $hasil =  $this->_model->execSP4('sp_subaccountcode_read', $data);
        return $hasil;
         
    }


    function defaultbyptRead($param) {
       //ini_set('max_execution_time', 600); //timeout 10 menit
        $data = array(
            1,
            0,
            $param['pt_id_owner'],           
            $param['start'],
            $param['limit']
        );
      
       $hasil =  $this->execSP3('sp_subaccouncode_readall', $data);
       var_dump($hasil);
       // var_dump($this->sqlStr);        
       // die();        
        return $hasil;
         
    }

    // Seftian 02 Juli 2021
    /*function check_unit_erems($subgl_id)
    {
        $q = "SELECT CONCAT(u.unit_number, ' ~ ', cl.cluster) as unit_erems FROM gl_2018.dbo.m_subgl sg LEFT JOIN erems.dbo.m_unit u ON u.unit_id = ISNULL(sg.unit_id, sg.subgl_id) LEFT JOIN erems.dbo.mh_cluster cl ON cl.cluster_id=u.cluster_id WHERE sg.subgl_id = " . $subgl_id;
        $stmt = $this->_db->query($q);
        $res = $stmt->fetchAll();
        if ( empty($res) == FALSE ) {
            return $res[0]['unit_erems'];
        }else{
            return '';
        }
    }*/

    function subaccountcodeCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];   
                
                switch ($parameter) {
                    case "livesearch":
                        $data = $this->searchRead($param);
                        $tmp_total = 0;
                        $result = $data[1];
                        break;
                    case "getsubgl":
                        $data = $this->getSubgl($param);
                        $tmp_total = 0;
                        $result = $data[1];
                        break;
                    case "checkexist":
                        $data = $this->checkExist($param);
                        $tmp_total = 0;
                        $result = $data[1];
                        break;
                    case "importdata":
                        $data = $this->importData($param);
                        $tmp_total = 0;
                        $result = $data[1];
                        break;
                    case "checkdatabyptproject":
                        $data = $this->checkDatabyPtProject($param);
                        $tmp_total = $data[0][0]['RECORD_TOTAL'];
                        if($tmp_total < 0){
                            $result = null; 
                        }else{
                            $result = $data;   
                        }
                        break;
                    case "checkdatabyptproject":
                        $data = $this->checkDatabyPtProject($param);
                        $tmp_total = $data[0][0]['RECORD_TOTAL'];
                        if($tmp_total < 0){
                            $result = $data; 
                        }else{
                            $result = $data[1];   
                        }
                        break;
                    default:
                        $data = $this->defaultCreate($param);
                        $tmp_total = 0;
                        $result = $data[1]; 
                }
                
                $return['total'] = $data[0];
                $return['success'] = $data[0] > 0;

                if ($return['total'] != 1 && $parameter !='checkexist') {
                    $return['msg'] = !empty($data[0][0]['msg']) ? $data[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['parameter'] = $parameter;
                    $return['total'] = $tmp_total;
                    $return['data'] =$result;
                }else if($data[0][0]['RECORD_TOTAL'] != 1 && $parameter =='checkexist'){
                    $return['msg'] = !empty($data[0][0]['msg']) ? $data[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['parameter'] = $parameter;
                    $return['total'] = $tmp_total;
                    $return['data'] = $result;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function importData($param) {
        ini_set('memory_limit', '-1'); // for unlimited process 
        foreach ($param['grade'] as $rowkelsub) {
            $project = $param['project_id'];
            $pt = $param['pt_id'];
            $kelsub_id = $rowkelsub;

            $data = array(
                $project,
                $pt,
                $kelsub_id
            );

            $result = $this->execSP3('sp_subaccountcode_import', $data);
            //print_r($this->sqlStr);
            foreach ($result[0] as $row) {
                $arrkelsub = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $row["kelsub"],
                );

                $resultkelsub = $this->execSP3('sp_subaccountcode_getkelsub', $arrkelsub);
                //print_r($this->sqlStr);
                $idkelsub = $resultkelsub[0][0]['kelsub_id'];

                $dataimport = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $idkelsub,
                    $row["code1"],
                    $row["code2"],
                    $row["code3"],
                    $row["code4"],
                    $row["code"],
                    $row["description"],
                    $this->session->getUserId(),
                    '1'
                );
                $this->execSP3('sp_subaccountcode_import_insert', $dataimport);
            }
        }

        return 1;
    }

    function checkDatabyPtProject($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );
        
       $result = $this->execSP3('sp_subaccountcode_checkdata', $data);
       // print_r($this->sqlStr);
        return $result;
        //print_r($this->execSP3('sp_subaccountcode_checkdata', $data));
    }

    function checkExist($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['kelsub_id'],
            "|^".$param['code']."|^"
        );
        $result = $this->_model->execSP4('sp_subaccountcode_checkexist', $data);
        return $result;
    }
    function getSubgl($param) {      
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['subgl_id'],
        );
        $result =  $this->execSP3('sp_subaccountcode_getsubgl', $data);
        return $result;
    }

    function getSubglbycode($param) {      
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['subgl_codes'],
        );
        $result =  $this->execSP3('sp_subaccountcode_getsubglbycode', $data);
        return $result;
    }

    function defaultCreate($param) {
        
        if(!isset($param['projectpt_id'])){
            $param['projectpt_id'] = 0;
        }

        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['kelsub_id'],
            $param['code1'],
            $param['code2'],
            $param['code3'],
            $param['code4'],
            $param['code'],
            $param['description'],
            $this->session->getUserId(),
            '1'
        );
        return $this->execSP3('sp_subaccountcode_create', $data);
    }

    function subaccountcodeUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['subgl_id'],
                    $param['kelsub_id'],
                    $param['code1'],
                    $param['code2'],
                    $param['code3'],
                    $param['code4'],
                    $param['code'],
                    $param['description'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_subaccountcode_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function subaccountcodeDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'subgl_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_subaccountcode_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function subaccountcodecheckexist($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['subdsk_id'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['code'],
                    $param['code1'],
                    $param['code2'],
                    $param['code3'],
                    $param['code4'],
                    $param['description'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_subaccountcode_checkexist', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                if ($return['total'] = 1) {
                    $return['success'] = false;
                } else {
                    $return['success'] = true;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function getsubaccountbycoaid($param) {

        $this->setting->_param = $param;
        $this->setting->_paramsql = 'read';
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_param['hideparam'] = 'getsubglbycoaid';
        $this->setting->_param['query'] = $param['coaid_in'];
        $xmlparam = $this->setting->Xmlparam($this->setting->_param);
        $return = $this->setting->executeSP(); 
        return $return;
    }
    function Filterbysub($param){
        $result = $this->_query->getfilterbysubgl($param);
        return $result;
    }
    function filterSubbyCode1($param){
        $result = $this->_query->getfilterSubbyCode1($param);
        return $result;
    }
    function getiscpmsproject($param)
    {
        $result = $this->setting->customefromquery("SELECT * FROM dbmaster.dbo.m_project WHERE is_cpms = 1 AND project_id = ".$param['project_id']." ");
        return $result;
    }
}

?>