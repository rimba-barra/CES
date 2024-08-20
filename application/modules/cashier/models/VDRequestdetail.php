<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_VDRequestdetail extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_td_voucherdetail';
    }

    function VDRequestdetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                            foreach ($data as $key => $field) {
                                $data[$key]['amount'] = number_format($data[$key]['amount'],2);
                            }
                            $totalamount = $result[2][0]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'kasbondetail':
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
                     case 'attachmentdetail':
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
                    case 'approvaldetail':
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                            $totalamount = $result[2][0]['totalamount'];
                        } else {
                            $data = null;
                            $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'getlistapproval':
                        if ( $param['project_id'] ) {
                            $this->setting->_project_id = $param['project_id'];
                        }
                        if ( $param['pt_id'] ) {
                            $this->setting->_pt_id = $param['pt_id'];
                        }
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            if ( $param['is_pajak'] == 1 ) {
                                $data = $result[2];
                            }else{
                                $data = $result[3];
                            }
                            $totalamount = 0;
                        } else {
                            $data = null;
                            $totalamount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'getlistapprovalbydepartment':
                        if ( $param['project_id'] ) {
                            $this->setting->_project_id = $param['project_id'];
                        }
                        if ( $param['pt_id'] ) {
                            $this->setting->_pt_id = $param['pt_id'];
                        }
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
                    case 'gettaxapprovalbydepartment':
                        if ( $param['project_id'] ) {
                            $this->setting->_project_id = $param['project_id'];
                        }
                        if ( $param['pt_id'] ) {
                            $this->setting->_pt_id = $param['pt_id'];
                        }
                        $result = $this->setting->executeSP();
                        // echo json_encode($result);die;
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                            $totalamount = 0;
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
                    case 'detaillog':
                        $result = $this->setting->getLogVoucherDept($param);
                        // echo json_encode($result);die;
                        $data = $result[0];
                        $totalamount = 0;
                        $counter = sizeof($result);
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

    public function VDRequestdetailCreate($param) {
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
                            $iddetail = $result[6][0]['voucherdetail_id'];
                        }
                        break;
                    case 'detailkasboncreate':
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
                            $iddetail = $result[6][0]['kasbondept_id'];
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
                    case 'detailapprovalcreate':
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
                            $iddetail = $result[6][0]['voucher_approval_id'];
                        }
                        break;
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

    public function VDRequestdetailUpdate($param) {
        $return['success'] = false;

        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                if(!isset($param['voucherdetail_id'])){
                    $param['voucherdetail_id'] = 0;
                }
                $this->setting->_iddata = $param['voucherdetail_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'detailupdate':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['voucherdetail_id'];
                        break;
                    case 'detailkasbonupdate':
                        $result = $this->setting->executeSP();   
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['kasbon_payment_id'];
                        break;
                    case 'detailattachmentupdate':
                        $result = $this->setting->executeSP();   
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['attachment_id'];
                        break;
                    case 'detailapprovalupdate':
                        $result = $this->setting->executeSP();   
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = 0;
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

    function VDRequestdetailDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'voucherdetail_id';
            if($param['hideparam'] == 'detailkasbondelete'){
                $key_name = 'kasbon_payment_id';
            }else if($param['hideparam'] == 'detailattachmentdelete'){
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
                $valid = $result[2][0]['VALIDDATA'];
                $counter = $result[3][0]['RECORD_TOTAL'];
                $message = $result[4][0]['MSG'];

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

    function VDRequestdetailDeleteAll($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'voucher_id';
            if($param['hideparam'] == 'detailkasbondelete'){
                $key_name = 'kasbon_payment_id';
            }
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'deleteall';
                $result = $this->setting->executeSP();
                $valid = $result[2][0]['VALIDDATA'];
                $counter = $result[3][0]['RECORD_TOTAL'];
                $message = $result[4][0]['MSG'];

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

    function VDRequestdetailMultisubConvert($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'voucher_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'multisubconvert';
                $result = $this->setting->executeSP();
                $valid = true;
                $counter = 1;
                $message = '';

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

    function VDRequestdetailGetdata($param){
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $flag = $param['flag'];

            if ($flag == "coa") {

                $return = $this->setting->getdata_bytableparam_v2($this->setting->_m_coa, [
                    // "deleted"    => $param['deleted'],
                    "project_id" => $param['project_id'],
                    "pt_id"      => $param['pt_id'],
                    "coa"        => $param['name']
                ]);

            }else if($flag == "kelsub"){


                $return = $this->setting->getdata_bytableparam_v2($this->setting->_m_kelsub, [
                    "kelsub_id" => $param['kelsub_id']
                ]);
            }else if($flag == "subgl"){


                $return = $this->setting->getdata_bytableparam_v2($this->setting->_m_subgl, [
                    // "deleted"    => $param['deleted'],
                    "project_id" => $param['project_id'],
                    "pt_id"      => $param['pt_id'],
                    "code"       => $param['name']
                ]);
            }
        }
        return $return;
    }

}