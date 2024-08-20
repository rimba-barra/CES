<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Kasbondeptdetail extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_td_kasbondeptdetail';
    }

    function KasbondeptdetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                            $totalamount = $result[3][0]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        if (!empty($result[3][0]['RECORD_TOTAL'])) {
                            $data = $result[4];
                            $totalamount =  $result[5]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount =0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                     case 'attachment':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                            $totalamount = $result[3][0]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $totalamount = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                    "totalamount" => $totalamount,
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    public function KasbondeptdetailCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'detailcreate':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['counterdata'];
                        if ($counter > 0) {
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                            $iddetail = 0;
                        } else {
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                            $iddetail = $result[6][0]['kasbondeptdetail_id'];
                        }

                        break;
                     case 'detailattachmentcreate':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['counterdata'];
                        if ($counter > 0) {
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                            $iddetail = 0;
                        } else {
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                            $iddetail = $result[6][0]['attachment_id'];
                        }
                        break;

                    default:
                        $result = null;
                        $valid = false;
                        $iddetail = 0;
                        $counter = 1;
                        $message = 'data error';
                }
                
                $result['iddetail'] = $iddetail;
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function KasbondeptdetailUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['kasbondeptdetail_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'detailupdate':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['kasbondeptdetail_id'];
                        break;
                     case 'detailattachmentupdate':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['attachment_id'];
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                        $iddetail = 0;
                }
                $result['iddetail'] = $iddetail;
                
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function KasbondeptdetailDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kasbondeptdetail_id';
            if($param['hideparam'] == 'detailattachmentdelete'){
                $key_name = 'attachment_id';
            }else{
                $param['hideparam'] = 'default';
            }
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $this->setting->_param['hideparam'] = $param['hideparam'];
                $result = $this->setting->executeSP();
                if(isset($result[1][0]['VALIDDATA'])){
                    $valid = $result[1][0]['VALIDDATA'];
                    $counter = $result[2][0]['RECORD_TOTAL'];
                    $message = $result[3][0]['MSG'];
                }else{
                    $valid = $result[2][0]['VALIDDATA'];
                    $counter = $result[3][0]['RECORD_TOTAL'];
                    $message = $result[4][0]['MSG'];
                }
               

                $return = array(
                    "success" => $valid,
                    "total" => $counter,
                    "msg" => $message,
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }


     function KasbondeptdecvdeptRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $this->setting->_storeprocedure = 'sp_decvdept_read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                          //  $totalamount = $result[3][0]['totalamount'];
                        } else {
                            $data = null;
                           // $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                       // $totalamount = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                    //"totalamount" => $totalamount,
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

     function KasbondeptdetaillogRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {                
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $param['pt_id'] = $projectpt['pt_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                         $result = $this->setting->getHistory($param);  
                         $counter = $result[0][0]['RECORD_TOTAL'];
                       if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                          //  $totalamount = $result[3][0]['totalamount'];
                        } else {
                            $data = null;
                           // $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        
                        break;
                    default:
                         $result = null;
                        $valid = true;
                        $counter = 0;
                       // $totalamount = 0;
                        $message = null;
                }


               $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                    //"totalamount" => $totalamount,
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

}
