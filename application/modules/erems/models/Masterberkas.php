<?php

class Erems_Models_Masterberkas extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_buktipemilik';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterberkasRead($param) {
       $return['success'] = false;

       if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['code'],
                    $param['berkas'], 
                    0,
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    $param['limit'],
                    $param['page']

                );

                $result = $this->execSP3('sp_masterberkas_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }

    function masterberkasCreate($param = array()) {
    //        var_dump($this->session->getCurrentProjectId()); die();
        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP3('sp_masterberkas_create', 
                   $param['code'],
                   $param['berkas'],
                   $param['description'],
                   $this->session->getCurrentProjectId(), 
                   $this->session->getCurrentPtId(),
                   $this->session->getUserId()
               );

                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $this->returned;
    }

    function masterberkasUpdate($param = array()) {

        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP3('sp_masterberkas_update', 
                    $param['berkas_id'],
                    $param['code'],
                    $param['berkas'],
                    $param['description'],
                    $this->session->getUserId()
                );

                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $this->returned;
    }

    function masterberkasDelete($param) {
    	$return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'berkas_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_masterberkas_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {

            }
        }
        return $return;
    }

    // added by rico 27122022
    function masterberkasdocumentRead($param) {
       $return['success'] = false;

       if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['berkas_id'],
                    // $param['berkas'],
                    $param['page'],
                    $param['limit']
                );

                $result = $this->execSP3('sp_masterberkasdocument_read', $data);
                $return['total'] = $result[0][0]['totalRow'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }

    // added by rico 28122022
    function masterberkasdocumentCreate($param = array()) {
        $data = json_decode($param);

        if(empty($data->berkasdocument_id)){
            $result = $this->execSP3('sp_masterberkasdocument_create', 
               $data->documentname,
               $data->berkas_berkas_id,
               $data->filename,
               $data->description,
               $this->session->getUserId()
            );
        }else{
            $result = $this->execSP3('sp_masterberkasdocument_update', 
               $data->berkasdocument_id,
               $data->documentname,
               $data->berkas_berkas_id,
               $data->filename,
               $data->description,
               $this->session->getUserId()
            );
        }


        return $result;
    }

    function masterberkasdocumentDelete($param) {
        $return['success'] = false;
        // $key_name = 'berkasdocument_id';
        // $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
        // foreach ($param as $key => $val) {
        //     if (is_array($val)) {
        //         $param[$key_name] .= $val[$key_name] . ',';
        //     }
        // }

        // $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
        try {
            $affectedRow = $this->execSP('sp_masterberkasdocument_destroy', $param, $this->session->getUserId());
            $return['total'] = $affectedRow;
            $return['success'] = (bool) $affectedRow;
        } catch (Exception $e) {}
        
        return $return;
    }

}

?>