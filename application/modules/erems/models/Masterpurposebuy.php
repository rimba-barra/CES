<?php

class Erems_Models_Masterpurposebuy extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_purposebuy';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterpurposebuyRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $start = isset($param['start']) ? $param['start'] : 1;
                $limit = isset($param['limit']) ? $param['limit'] : 100000;

                $resultdata = $this->execSP3('sp_purposebuy_read', $start, $limit);
                $return['total'] = $resultdata[0][0]['totalRow'];
                $return['data'] = $resultdata[1];
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

}

?>
