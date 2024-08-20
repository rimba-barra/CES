<?php

class Cashier_Models_Writeoff extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'th_writeoff';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function writeoffRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP3('sp_writeoff_read', 
									$param['projectpt_id'],
									$param['page'], 
									$param['limit'],
									$param['unit_number']
								);
//                var_dump($resultdata);
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