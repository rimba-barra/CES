<?php

class Gl_Models_Bungaloan extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_prefix';
    protected $session;
    protected $param;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');


        $this->_helper = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_queryb = new Gl_Models_Query_Bungaloan();
    }

    function bungaloanRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'default':
                        $result = $this->_model->bungaloanread($param);
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        break;
                    default:
                        $counter = 0;
                        $data = null;
                        break;
                }
                $return['total'] = $counter;
                $return['data'] = $data;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    public function txt($param) {
        return $this->_helper->textforquery($param);
    }

    function generatedata() {
        for ($i = 1; $i <= 12; $i++) {
            $record = array(
                "project_id" => $this->_project_id,
                "pt_id" => $this->_pt_id,
                "addby" => $this->_user_id,
                "addon" => $this->txt($this->_curdatetime),
                "bulan" => $i
            );
            $this->_queryb->insertdata($record);
        }
        return 1;
    }

    function updatedata($param) {
        $record = array(
            "modiby" => $this->_user_id,
            "modion" => $this->txt($this->_curdatetime),
            "bunga" => $param['data']['bunga']
        );
        $this->_queryb->updatedata($param['data']['bungaloan_id'], $record);
    }

    function bungaloanCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->param = $param;
                switch ($parameter) {
                    case 'create':
                        $result = $this->_model->bungaloancreate($param);
                        $counter = $result[0];
                        $msg = null;
                        break;
                    case 'generate':
                        $result = $this->generatedata($param);
                        $counter = $result;
                        $msg = null;
                        break;
                    case 'updatedata':
                        //if (!empty($param['data']['bunga'])) {
                            $result = $this->updatedata($param);
//                        } else {
//                            $result = null;
//                        }
                        $counter = 1;
                        $msg = null;
                        break;
                    default:
                        $counter = 0;
                        $result = null;
                        $msg = null;
                        break;
                }

                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $counter;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

}

?>