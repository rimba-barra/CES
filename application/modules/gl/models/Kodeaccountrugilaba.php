<?php

class Gl_Models_Kodeaccountrugilaba extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'coalr';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
    }

    function kodeaccountrugilabaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $result = $this->readData($param);
                //print_r($result);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function compareValues($param) {
        $value1 = explode('.', $param['val1']);
        $value2 = explode('.', $param['val2']);

        if (count($value1) != 1) {
            $data1 = $value1[0] . $value1[1] . $value1[2];
            $data2 = $value2[0] . $value2[1] . $value2[2];

            $tmp1 = $data1;
            $tmp2 = $data2;

            $val1 = intval($tmp1);
            $val2 = intval($tmp2);

            $valstr1 = substr($tmp1, 0, 1);
            $valstr2 = substr($tmp2, 0, 1);

            if ($val1 > $val2) {
                $status = 0;
            } else {
                $a = 1;
                if (intval($valstr1) > intval($valstr2)) {
                    $a = 0;
                } else {
                    $a = 1;
                }

                $status = $a;
            }
            $tmpstatus = $status;
        } else {
            $tmpstatus = 1;
        }

        return $tmpstatus;
    }

    function readData($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
        );

        return $this->execSP3('sp_kodeaccountrugilaba_read', $data);
    }

    function kodeaccountrugilabaCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];

                if ($parameter == 'comparevalues') {
                    $status = $this->compareValues($param);
                    $result = null;
                } else {
                    $status = 1;
                    $result = $this->createData($param);
                    
                }

                $return['total'] = $result[0];
                $return['parameter'] = $parameter;
                $return['statusaccount'] = $status;
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function createData($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['profitloss_coa_from'],
            $param['profitloss_coa_until'],
            $param['desc1_coa_from'],
            $param['desc1_coa_until'],
            $param['desc1_note'],
            $param['desc2_coa_from'],
            $param['desc2_coa_until'],
            $param['desc2_note'],
            $param['sum1_note'],
            $param['desc3_coa_from'],
            $param['desc3_coa_until'],
            $param['desc3_note'],
            $param['sum2_note'],
            $param['desc4_coa_from'],
            $param['desc4_coa_until'],
            $param['desc4_note'],
            $param['sum3_note'],
            $param['desc5_coa_from'],
            $param['desc5_coa_until'],
            $param['desc5_note'],
            $param['desc6_coa_from'],
            $param['desc6_coa_until'],
            $param['desc6_note'],
            $param['sum4_note'],
            $param['coa_bungaloan1'],
            $param['coa_bungaloan2'],
            $param['bungaloan_desc'],
            $this->session->getUserId(),
            '1'
        );

        return $this->execSP3('sp_kodeaccountrugilaba_create', $data);
    }

    function getCoabyID($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param
        );
        $result = $this->execSP3('sp_kodeaccountrugilaba_getcoabyid', $data);
        return $result[1][0]['coa'];
    }

    function kodeaccountrugilabaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['coalr_id'],
                    $param['profitloss_coa_from'],
                    $param['profitloss_coa_until'],
                    $param['desc1_coa_from'],
                    $param['desc1_coa_until'],
                    $param['desc1_note'],
                    $param['desc2_coa_from'],
                    $param['desc2_coa_until'],
                    $param['desc2_note'],
                    $param['sum1_note'],
                    $param['desc3_coa_from'],
                    $param['desc3_coa_until'],
                    $param['desc3_note'],
                    $param['sum2_note'],
                    $param['desc4_coa_from'],
                    $param['desc4_coa_until'],
                    $param['desc4_note'],
                    $param['sum3_note'],
                    $param['desc5_coa_from'],
                    $param['desc5_coa_until'],
                    $param['desc5_note'],
                    $param['desc6_coa_from'],
                    $param['desc6_coa_until'],
                    $param['desc6_note'],
                    $param['sum4_note'],
                    $param['coa_bungaloan1'],
                    $param['coa_bungaloan2'],
                    $param['bungaloan_desc'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_kodeaccountrugilaba_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

}

?>