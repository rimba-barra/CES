<?php

class Gl_Models_Changeaccount extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_prefix';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
    }

    function changedata($param) {
        $from_id = $param['from_id'];
        $to_id = $param['until_id'];
        $flag = $param['flagprocess'];

        $rfcoa = $this->_model->getcoabyid($from_id);
        $rtcoa = $this->_model->getcoabyid($to_id);

        $from_coa = $rfcoa[1][0]['coa'];
        $from_kelsub = $rfcoa[1][0]['kelsub'];
        $to_coa = $rtcoa[1][0]['coa'];
        $to_kelsub = $rtcoa[1][0]['kelsub'];

        $data = array(
            "from_id" => $from_id,
            "to_id" => $to_id,
            "from_coa" => $from_coa,
            "to_coa" => $to_coa,
            "from" => $from_coa,
            "to" => $to_coa,
            "from_kelsub" => $from_kelsub,
            "to_kelsub" => $to_kelsub,
        );


        if (!is_null($from_kelsub) && !is_null($to_kelsub)) {
            if ($from_kelsub !== $to_kelsub) {
                $message = 'Sub account group COA : ' . $from_coa . ' - ' . $from_kelsub . ' not same with Sub account group COA : ' . $to_coa . ' - ' . $to_kelsub . ' <br/> Are you sure to Processing Account Code Change ?';
            }
        } else if (!is_null($from_kelsub) && is_null($to_kelsub)) {
            $message = 'Sub account group COA : ' . $from_coa . ' - ' . $from_kelsub . ' not empty but Sub account group COA : ' . $to_coa . ' is empty <br/> Are you sure to Processing Account Code Change ?';
        } else if (is_null($from_kelsub) && !is_null($to_kelsub)) {
            $message = 'Sub account group COA : ' . $from_coa . ' is empty but  Sub account group COA : ' . $to_coa . ' not empty with Sub : ' . $to_kelsub . ' <br/> Are you sure to Processing Account Code Change ?';
        } else {
            $message = 'Are you sure to Processing Account Code Change ?';
        }

        if ($flag == 'check') {
            $return = array(
                "msg" => $message,
                "flagprocess" => $flag,
            );
            return $return;
        } else {
            $this->changecoa_on_transaction($data);
            $this->change_on_rptformat($data);
            $this->change_on_sumtrh($data);

            $message = 'Processing change account, finish';
            $return = array(
                "msg" => $message,
                "flagprocess" => $flag,
            );
            return $return;
        }
    }

    function changecoa_on_transaction($data) {
        $result = $this->_model->getcoa_in_journaldetail($data);
        $counter = $result[0][0]['COUNTERDATA'];
        if ($counter > 0) {
            foreach ($result[1] as $row) {
                $kelsub = $row['kelsub'];
                if (!is_null($kelsub) && !is_null($data['to_kelsub'])) {
                    if ($kelsub !== $data['to_kelsub']) {
                        $this->delete_journalsubdetail($row['journaldetail_id']);
                        $data['kelsub_id'] = null;
                        $data['kelsub'] = null;
                    }
                } else if (!is_null($kelsub) && is_null($data['to_kelsub'])) {
                    $this->delete_journalsubdetail($row['journaldetail_id']);
                    $data['kelsub_id'] = null;
                    $data['kelsub'] = null;
                }else{
                    $data['kelsub_id'] = $row['kelsub_id'];
                    $data['kelsub'] = $row['kelsub'];
                }

                $data['table'] = 'td_journaldetail';
                $data['type'] = 'coa';
                $data['msg1'] = 'project_id:' . $row['project_id'] . ' pt_id:' . $row['pt_id'] . ' journal_id:' . $row['journal_id'] . ' journaldetail_id:' . $row['journaldetail_id'];
                $data['msg2'] = '';
                $this->_model->savetochange($data);
                $this->_model->changecoajournaldetail($data);
            }
        }
    }

    function delete_journalsubdetail($journaldetail_id) {
        $this->_model->delete_jurnalsubdetail($journaldetail_id);
    }

    function change_on_sumtrh($data) {
        $result = $this->_model->getcoa_in_sumtrh($data);
        $counter = $result[0][0]['COUNTERDATA'];
        if ($counter > 0) {
            foreach ($result[1] as $row) {
                $data['table'] = 'th_summary';
                $data['type'] = 'coa';
                $data['msg1'] = 'project_id:' . $row['project_id'] . ' pt_id:' . $row['pt_id'] . ' sumtrh_id:' . $row['summary_id'];
                $data['msg2'] = '';
                $this->_model->savetochange($data);
                $this->_model->changecoasumtrh($data);
            }
        }
    }

    function change_on_rptformat($data) {
        $result = $this->_model->getcoa_in_rptformat($data);
        $counter = $result[0][0]['COUNTERDATA'];
        if ($counter > 0) {
            foreach ($result[1] as $row) {
                $data['table'] = 'm_rptformat';
                $data['type'] = 'coa';
                $data['msg1'] = 'project_id:' . $row['project_id'] . ' pt_id:' . $row['pt_id'] . ' rptformat_id:' . $row['rptformat_id'];
                $data['msg2'] = '';
                $this->_model->savetochange($data);
                $this->_model->changerptformat($data);
            }
        }
    }

    function dataCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'default':
                        $result = $this->changedata($param);
                        $counter = 1;
                        $msg = $result['msg'];
                        $flag = $result['flagprocess'];
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