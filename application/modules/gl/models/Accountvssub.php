<?php

class Gl_Models_Accountvssub extends Zend_Db_Table_Abstract {

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
        $this->_queryas = new Gl_Models_Query_Accountvssub();
    }

    public function txt($param) {
        return $this->_helperdata->textforquery($param);
    }

    function getData() {
        // $result = $this->_model->getaccountvssub($this->param);
        $result = $this->_queryas->getdata($this->param);
        return $result;
    }

    function getJournal() {
        $result = $this->_model->getjournalbyvoucherno($this->param['voucher_no']);
        return $result[0][0];
    }

    function searcJournal() {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $this->param['voucher_no'],
            0,
            '',
            '',
            $this->param['is_post'],
            $this->param['start'],
            $this->param['limit']
        );

        $result = $this->execSP3('sp_journal_search', $data);
        if ($result[1][0]['RECORD_TOTAL'] > 0) {
            return array($result[2][0]);
        } else {
            return array(0, null);
        }
    }

    function AccountvssubRead($param) {
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

    function AccountvssubCreate($param) {
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
                    case 'reportdata':
                        $counter = 0;
                        $result = $this->generateData($param);
                        break;
                    case 'searcjournal':
                        $counter = 0;
                        $result = $this->searcJournal();
                        $msg = '';
                        break;
                    case 'getjournal':
                        $counter = 0;
                        $result = $this->getJournal();
                        $msg = '';
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
