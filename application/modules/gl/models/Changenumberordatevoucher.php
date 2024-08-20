<?php

class Gl_Models_Changenumberordatevoucher extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_prefix';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_query = new Gl_Models_Generalmodel_Builtquery();
    }

    function checkData($param) {
        $result = $this->_model->checkjournal($param['tovoucherno']);
        $counter = $result[0][0]['counterdata'];
        if ($counter > 0) {
            $msg = "Voucher no : " . $param['tovoucherno'] . " already exist";
        } else {
            $msg = null;
        }
        $return = array(
            "counter" => $counter,
            "msg" => $msg,
        );
        return $return;
    }

    function changeData($param) {
        $this->changeprefix($param);
        $this->changevoucherdate($param);
        $this->changevoucherno($param);
    }

    function changeprefix($param) {
        $result = $this->_model->getjournalbyvoucherno($param['fromvoucherno']);
        foreach ($result[0] as $row) {

            $data = array(
                "table" => 'th_jurnal',
                "type" => 'prefix',
                "from_id" => $param['fromprefix_id'],
                "to_id" => $param['toprefix_id'],
                "from" => $param['fromprefix'],
                "to" => $param['toprefix'],
                "journal_id" => $row['journal_id'],
                "prefix_id" => $param['toprefix_id'],
            );

            $data['msg1'] = 'project_id:' . $row['project_id'] . ' pt_id:' . $row['pt_id'] . ' journal_id:' . $row['journal_id'];
            $data['msg2'] = '';
            $this->_model->savetochange($data);
            $this->_query->updateprefixjournal($data);
        }
    }

    function changevoucherdate($param) {
        $result = $this->_model->getjournalbyvoucherno($param['fromvoucherno']);
        foreach ($result[0] as $row) {
            $data = array(
                "table" => 'th_jurnal',
                "type" => 'voucherdate',
                "from_id" => $row['journal_id'],
                "to_id" => $row['journal_id'],
                "from" => date('Y-m-d', strtotime($param['fromvoucherdate'])),
                "to" => date('Y-m-d', strtotime($param['tovoucherdate'])),
                "journal_id" => $row['journal_id'],
                "voucher_date" => date('Y-m-d', strtotime($param['tovoucherdate'])),
            );

            $data['msg1'] = 'project_id:' . $row['project_id'] . ' pt_id:' . $row['pt_id'] . ' journal_id:' . $row['journal_id'];
            $data['msg2'] = '';
            $this->_model->savetochange($data);
            $this->_query->updatevoucherdatejournal($data);
        }
    }

    function changevoucherno($param) {
        $result = $this->_model->getjournalbyvoucherno($param['fromvoucherno']);
        foreach ($result[0] as $row) {
            $data = array(
                "table" => 'th_jurnal',
                "type" => 'voucherno',
                "from_id" => $row['journal_id'],
                "to_id" => $row['journal_id'],
                "from" => $param['fromvoucherno'],
                "to" => $param['tovoucherno'],
                "journal_id" => $row['journal_id'],
                "voucher_no" => $param['tovoucherno'],
            );
            $data['msg1'] = 'project_id:' . $row['project_id'] . ' pt_id:' . $row['pt_id'] . ' journal_id:' . $row['journal_id'];
            $data['msg2'] = '';
            $this->_model->savetochange($data);
            $this->_query->updatevouchernojournal($data);
        }
    }

    function dataCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'default':
                        $result = $this->changeData($param);
                        $counter = 1;
                        $msg = null;
                        $flag = 0;
                        break;
                    case 'checkdata':
                        $result = $this->checkData($param);
                        $counter = $result['counter'];
                        $msg = $result['msg'];
                        $flag = 0;
                        break;
                    default:
                        $counter = 0;
                        $result = null;
                        $msg = null;
                        $flag = null;
                        break;
                }

                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $counter;
                $return['message'] = $msg;
                $return['flagprocess'] = $flag;
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