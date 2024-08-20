<?php

class Gl_Models_Prosesakhirbulan extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_summary';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
    }

    function dataCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $firstdate = date('Y-m-d', strtotime($param['year'] . '-' . $param['month_id'] . '-' . $param['firstdate']));
                $lastdate = date('Y-m-d', strtotime($param['year'] . '-' . $param['month_id'] . '-' . $param['lastdate']));
                $checkdata = $this->checkData($firstdate, $lastdate);
                $counter = $checkdata[0][0]['counterdata'];
                if ($counter > 0) {
                    while ($firsdate <= $lastdate) {
                        $date = $firsdate;
                        $this->calculateCOAbyVoucherdate($date);
                        $firsdate = date('Y-m-d', strtotime("+1 day", strtotime($date)));
                    }
                }
                $return['counter'] = $counter;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function checkData($firstdate, $lastdate) {
        $result = $this->execSP3('sp_journal_checktransaction', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $firstdate,
            $lastdate
                )
        );

        return $result;
    }

    function calculateCOAbyVoucherdate($date) {
        $result = $this->execSP3('sp_journaldetail_getbyvoucherdate', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $date
                )
        );
    }

}
