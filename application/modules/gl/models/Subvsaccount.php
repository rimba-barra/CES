<?php

class Gl_Models_Subvsaccount extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $param;
    protected $dataarray;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
    }

    public function txt($param) {
        return $this->_helperdata->textforquery($param);
    }

    function getData() {
        $result = $this->_model->getsubnothave($this->param);
        return $result;
    }

    function DeleteAll() {
        $result = $this->_model->getsubnothave($this->param);
        foreach ($result as $row) {
            $this->_model->delete_jurnalsubdetailbyid($row['journalsubdetail_id']);
        }
    }

    function SubvsaccountRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->param = $param;

                switch ($parameter) {
                    case 'search':
                        $counter = 0;
                        $result = $this->getData();
                        $msg = '';
                        break;
                }

                $return['parameter'] = $parameter;
                $return['counter'] = $counter;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }
    function SubvsaccountDelete($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->param = $param;
                $this->_model->delete_jurnalsubdetailbyid($param['journalsubdetail_id']);
                $counter = 0;
                $result = null;
                $msg = '';
                $return['parameter'] = $parameter;
                $return['counter'] = $counter;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function SubvsaccountCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->param = $param;
                switch ($parameter) {
                    case 'search':
                        $counter = 0;
                        $result = $this->getData();
                        break;
                    case 'deleteall':
                        $counter = 0;
                        $result = $this->DeleteAll();
                        break;
                    case 'reportdata':
                        $counter = 0;
                        $result = $this->generateData($param);
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
