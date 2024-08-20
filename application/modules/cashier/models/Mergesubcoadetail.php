<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Mergesubcoadetail extends Zend_Db_Table_Abstract {

    private $setting = null;
    protected $_schema = 'gl_2018';

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_mergesubcoa';
    }

    function MergesubcoadetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                            $totalamount = $result[3][0]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        if (!empty($result[3][0]['RECORD_TOTAL'])) {
                            $data = $result[4];
                            $totalamount =  $result[5]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount =0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $totalamount = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                    "totalamount" => $totalamount,
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

     public function MergesubcoadetailCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
            try {
                $data = array (
                    $param['pt'], 
                    $param['project'],
                    $param['subgl_id_source'], 
                    $param['subgl_id_dest'], 
                    $param['user_id']
                );

                $result = $this->execSP3('sp_mergesubcoa', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0]>0;
            } catch(Exception $e) { }           
        }
        return $return;
    }

  

    

   

}
