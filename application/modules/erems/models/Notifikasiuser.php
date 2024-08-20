<?php

class Erems_Models_Notifikasiuser extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_notifikasi_user';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function notifikasiuserRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_notifikasi_user_read', 
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['user_email'],
                    $param['module_name'],
                    $param['page'],
                    $param['limit']
                );

                $return['total'] = count($resultdata);
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function notifikasiuserCreate($param = array()) {
        $return['success'] = false;

        if (is_array($param) && count($param)) {
            $dayofmonth = ($param['is_allday'] == 1) ? "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31": $param['dayofmonth']; // added by rico 06022023

            try {
                $affectedRow = $this->execSP('sp_notifikasi_user_create', 
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(), 
                    $param['user_email'], 
                    $param['module_name'], 
                    $param['status'], 
                    $param['dayofweek'],  // added by rico 06022023
                    $dayofmonth,  // added by rico 06022023
                    $param['is_allday'],  // added by rico 06022023
                    $this->session->getUserId()
                );
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function notifikasiuserUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $dayofmonth = ($param['is_allday'] == 1) ? "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31": $param['dayofmonth']; // added by rico 06022023
            $dw = explode(",",$param['dayofweek']);
            $arrayweek = array();

            foreach ($dw as $key => $value) {
                if(is_numeric($value)){
                    array_push($arrayweek, $value);
                }else{
                    switch($value){
                        case "Minggu":
                            array_push($arrayweek, '0');
                            break;
                        case "Senin":
                            array_push($arrayweek, '1');
                            break;
                        case "Selasa":
                            array_push($arrayweek, '2');
                            break;
                        case "Rabu":
                            array_push($arrayweek, '3');
                            break;
                        case "Kamis":
                            array_push($arrayweek, '4');
                            break;
                        case "Jumat":
                            array_push($arrayweek, '5');
                            break;
                        case "Sabtu":
                            array_push($arrayweek, '6');
                            break;
                    }
                }
            }

            $dayofweek = implode(',', $arrayweek);

            try {
                $affectedRow = $this->execSP('sp_notifikasi_user_update', 
                    $param['notifikasi_user_id'], 
                    $param['user_email'], 
                    $param['module_name'], 
                    $param['status'], 
                    $dayofweek,  // added by rico 06022023
                    $dayofmonth,  // added by rico 06022023
                    $param['is_allday'], // added by rico 06022023
                    $this->session->getUserId()
                );
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                print_r($e);
            }
        }
        return $return;
    }

    function notifikasiuserDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'notifikasi_user_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_notifikasi_user_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function getEmail($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_user_email_read');

                $return['total'] = count($resultdata);
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function getModule($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_module_name_read');

                $return['total'] = count($resultdata);
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function getNotes($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_module_notes_read', 
                    $param['id']
                );

                $return['total'] = count($resultdata);
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

}

?>
