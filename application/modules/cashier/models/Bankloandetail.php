<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Bankloandetail extends Zend_Db_Table_Abstract {

    // private $setting = null;
    protected $_schema = 'cashier';
    protected $_name = 'td_bank_loan_detail';
    protected $session;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        /*$this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_td_bank_loan_detail_read';*/
    }

    function BankloandetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                /*$this->setting->_param = $param;
                $this->setting->_paramsql = 'read';*/
                // echo json_encode($param);die;
                $data = [
                    'hideparam'     => $param['hideparam'],
                    'project_id'    => $param['project_id'],
                    'pt_id'         => $param['pt_id'],
                    'bank_loan_id'  => $param['bank_loan_id'],
                    'start'         => $param['start'],
                    'limit'         => $param['limit'],
                    'page'          => $param['page'],
                ];
                switch ($data['hideparam']) {
                    case 'default':
                        $result = $this->execSP3('sp_td_bank_loan_detail_read', $data);
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $result = $this->execSP3('sp_td_bank_loan_detail_read', $data);
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
                );
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    public function BankloandetailCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                /*$this->setting->_param = $param;
                $this->setting->_paramsql = 'create';*/
                // echo json_encode($param);die;
                $data = [
                    "hideparam" => $param['hideparam'],
                    "bank_loan_detail_id"=> $param['bank_loan_detail_id'],
                    "bank_loan_id"=> $param['bank_loan_id'],
                    "kode_kreditur"=> $param['kode_kreditur'],
                    "nama_kreditur"=> $param['nama_kreditur'],
                    "saldo_hutang"=> $param['saldo_hutang'],
                    "saldo_beban_bunga"=> $param['saldo_beban_bunga'],
                    "saldo_beban_bunga_pl"=> $param['saldo_beban_bunga_pl'],
                    "saldo_beban_bunga_kapitalisasi"=> $param['saldo_beban_bunga_kapitalisasi'],
                    "saldo_beban_bunga_bank_total"=> $param['saldo_beban_bunga_bank_total'],
                    "kategori_bunga"=> $param['kategori_bunga'],
                    "tingkat_biaya_bunga"=> floatval($param['tingkat_biaya_bunga']),
                    "is_lunas"=> $param['is_lunas'],
                    "tenor"=> $param['tenor'],
                    "tenor_type"=> $param['tenor_type'],
                    "saldo_kas_setara_kas"=> $param['saldo_kas_setara_kas'],
                    "saldo_restricted_fund"=> $param['saldo_restricted_fund'],
                    "startdate"=> $param['startdate'],
                    "duedate"=> $param['duedate'],
                    "jenis_loans_id"=> $param['jenis_loans_id'],
                    "kategori_loans_id"=> $param['kategori_loans_id'],
                    "jenis_pinjaman_id"=> $param['jenis_pinjaman_id'],
                    "kreditur_id"=> $param['kreditur_id'],
                    "kategori_bunga_id"=> $param['kategori_bunga_id'],
                    "benchmarking_id"=> $param['benchmarking_id'],
                    "persentase"=> floatval($param['persentase']),
                    "currency_id"=> $param['currency_id'],
                    "jt_1_tahun"=> $param['jt_1_tahun'],
                    "jt_2_tahun"=> $param['jt_2_tahun'],
                    "jt_3_tahun"=> $param['jt_3_tahun'],
                    "jt_4_tahun"=> $param['jt_4_tahun'],
                    "jt_5_tahun"=> $param['jt_5_tahun'],
                    "jt_6_tahun"=> $param['jt_6_tahun'],
                    "jt_7_tahun"=> $param['jt_7_tahun'],
                    "jt_8_tahun"=> $param['jt_8_tahun'],
                    "jt_9_tahun"=> $param['jt_9_tahun'],
                    "jt_10_tahun"=> $param['jt_10_tahun'],
                    "jt_total"=> $param['jt_total'],
                    "is_approver"=> ( isset($param['is_approver']) ? 1 : 0 ),
                    "user_id"=>$this->_user_id,
                ];
                switch ($data['hideparam']) {
                    case 'detailcreate':
                        $result = $this->execSP3('sp_td_bank_loan_detail_create', $data);
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['bank_loan_detail_id'];

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
                // var_dump($ex);
            }
        }
        return $return;
    }

    public function BankloandetailUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = [
                    "hideparam" => $param['hideparam'],
                ];
                switch ($data['hideparam']) {
                    case 'detailupdate':
                        
                        $data["bank_loan_detail_id"] = $param['bank_loan_detail_id'];
                        $data["bank_loan_id"] = $param['bank_loan_id'];
                        $data["kode_kreditur"] = $param['kode_kreditur'];
                        $data["nama_kreditur"] = $param['nama_kreditur'];
                        $data["saldo_hutang"] = $param['saldo_hutang'];
                        $data["saldo_beban_bunga"] = $param['saldo_beban_bunga'];
                        $data["saldo_beban_bunga_pl"] = $param['saldo_beban_bunga_pl'];
                        $data["saldo_beban_bunga_kapitalisasi"] = $param['saldo_beban_bunga_kapitalisasi'];
                        $data["saldo_beban_bunga_bank_total"] = $param['saldo_beban_bunga_bank_total'];
                        $data["kategori_bunga"] = $param['kategori_bunga'];
                        $data["tingkat_biaya_bunga"] = floatval($param['tingkat_biaya_bunga']);
                        $data["is_lunas"] = $param['is_lunas'];
                        $data["tenor"] = $param['tenor'];
                        $data["tenor_type"] = $param['tenor_type'];
                        $data["saldo_kas_setara_kas"] = $param['saldo_kas_setara_kas'];
                        $data["saldo_restricted_fund"] = $param['saldo_restricted_fund'];
                        $data["startdate"] = $param['startdate'];
                        $data["duedate"] = $param['duedate'];
                        $data["jenis_loans_id"] = $param['jenis_loans_id'];
                        $data["kategori_loans_id"] = $param['kategori_loans_id'];
                        $data["jenis_pinjaman_id"] = $param['jenis_pinjaman_id'];
                        $data["kreditur_id"] = $param['kreditur_id'];
                        $data["kategori_bunga_id"] = $param['kategori_bunga_id'];
                        $data["benchmarking_id"] = $param['benchmarking_id'];
                        $data["persentase"] = floatval($param['persentase']);
                        $data["currency_id"] = $param['currency_id'];
                        $data["jt_1_tahun"] = $param['jt_1_tahun'];
                        $data["jt_2_tahun"] = $param['jt_2_tahun'];
                        $data["jt_3_tahun"] = $param['jt_3_tahun'];
                        $data["jt_4_tahun"] = $param['jt_4_tahun'];
                        $data["jt_5_tahun"] = $param['jt_5_tahun'];
                        $data["jt_6_tahun"] = $param['jt_6_tahun'];
                        $data["jt_7_tahun"] = $param['jt_7_tahun'];
                        $data["jt_8_tahun"] = $param['jt_8_tahun'];
                        $data["jt_9_tahun"] = $param['jt_9_tahun'];
                        $data["jt_10_tahun"] = $param['jt_10_tahun'];
                        $data["jt_total"] = $param['jt_total'];
                        $data["is_approver"] = ( isset($param['is_approver']) ? 1 : 0 );
                        $data["user_id"] =$this->_user_id;

                        $result = $this->execSP3('sp_td_bank_loan_detail_update', $data);
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        $iddetail = $result[4][0]['bank_loan_detail_id'];
                        break;
                    case 'copydetail':
                        $data["project_id"] = $param['project_id'];
                        $data["pt_id"] = $param['pt_id'];
                        $data["bulan"] = $param['bulan'];
                        $data["kode_kreditur"] = $param['kode_kreditur'];

                        $result = $this->execSP3('sp_td_bank_loan_detail_copy', $data);
                        // echo json_encode($result);die;
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
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

    function BankloandetailDelete($param = array()) {
        $return['success'] = false;
        // echo json_encode($param);die;
        if (is_array($param) && count($param)) {
            $key_name = 'bank_loan_detail_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array (
                    $this->_user_id,
                );
                $result = $this->execSP3('sp_td_bank_loan_detail_delete', $param[$key_name], $data);
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

}
