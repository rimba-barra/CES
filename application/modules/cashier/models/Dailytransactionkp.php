<?php

class Cashier_Models_Dailytransactionkp extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'cashier';
    protected $session;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_report_dailytransaction_kp';
    }

    function dailytransactionkpRead($param) {

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdatadailytransaction':
                        $this->setting->_project_id = $param['project_id'] == '' ? $this->_project_id : $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'] == '' ? $this->_pt_id : $param['pt_id']; 
                        
                        $result = $this->execSP3('cashier.dbo.sp_report_dailytransaction_kp', 
                            $this->setting->_project_id, 
                            $this->setting->_pt_id, 
                            0,
                            $param['dataflow'],
                            $param['dept_id'],
                            $param['dateparam'],
                            $param['periodfrom'],
                            $param['periodto'],
                            $param['status'],
                            $param['paymentmethod_id'], 
                            $param['sortby']
                        );
                        
                        $counter = count($result[0]);
                        $data = $result[0];
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

    function dailytransactionkpCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                   case 'default':

                        $param['periode'] = date('d-m-Y', strtotime($param['periodfrom']))." s.d. ".date('d-m-Y', strtotime($param['periodto']));

                        $counter = 0;
                        $result = $param;
                        break;
                    default:
                        $counter = 0;
                        $result = null;
                        break;
                }

                if ($param['hideparam'] == 'default') {
                    $count = 0;
                    $msg = " ";
                } else {
                    $count = $counter;
                    $msg = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

}

?>