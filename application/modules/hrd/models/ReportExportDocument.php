<?php

class Hrd_Models_ReportExportDocument extends Zend_Db_Table_Abstract {
    protected $_schema  = 'hrd';
    protected $_name    = '';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function comboRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if ($param['table'] == 'jobfamily') {
                    $spname = 'sp_jobfamily_read';
                }
                $data = array (
                    1, 
                    9999,
                    '',
                    ''
                );
                $result = $this->execSP3($spname, $data);             
                // $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];           
                $return['success'] = true;              
            } catch(Exception $e) { }
        }       
        return $return;
    }
}

?>
