<?php

class Cashier_Models_Revenuesharingprint extends Zend_Db_Table_Abstract
{

    protected $_schema = 'cashier';
    protected $_name   = 'td_revenuesharing';
    protected $session;

    function init()
    {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function revenuesharingprintRead($param)
    {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['cluster_id'],
                    $param['block_id'],
                    $param['unit_number'],
                    $param['customer_name'],
                    $param['page'],
                    $param['limit'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId()
                );
                $result = $this->execSP3('sp_revenuesharingprint_read_new', $data);
                $return['total']   = $result[0][0]['totalRow'];
                $return['data']    = $result[1];
                $return['success'] = true;
            } catch (Exception $e) {
            }
        }
        return $return;
    }
}
