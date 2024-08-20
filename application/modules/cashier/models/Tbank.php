<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Tbank extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $counterdoc = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time = date('H:i:s');
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');

        $this->setting = new Cashier_Models_General_Setdata;
        $this->function = new Cashier_Models_Function_Tcashbank;
        $this->setting->_storeprocedure = 'sp_th_kasbank_bank';
    }

    function bankRead($param) {
       
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'printpdf':
                        $data = $param['data'];
                        $dcode = json_decode($data);
                        $result = $dcode;
                        $format = $param['format'];
                        $object = new stdClass;
                        foreach ($dcode as $index => $row) {
                            // $row->terbilang =  Cashier_Box_Library_Terbilang::terbilang($dcode->amount, 3);
                            $object->$index = new stdClass;
                            $object->$index->terbilang = Cashier_Box_Library_Terbilang::terbilang($row->amount, 3);
                            $object->$index->kasbank_id = $row->kasbank_id;
                            $object->$index->amount = $row->amount;
                            $object->$index->description = $row->description;
                            $object->$index->made_by = $row->made_by;
                            $object->$index->ptname = $row->ptname;
                            $object->$index->kasbank_date = $row->kasbank_date;
                            // @$object->$index->terbilang  = Cashier_Box_Library_Terbilang::terbilang($row->amount, 3);
                        }
                        //$dcode->terbilang =  Cashier_Box_Library_Terbilang::terbilang($dcode->amount, 3);
                        $counter = 1;

                        $ses = array();
                        $ses['pt_id'] = $this->_pt_id;
                        $ses['project_id'] = $this->_project_id;

                        $print = Cashier_Box_Tools::paymentPrintPDF($object, $ses, $param['sortkasbank_id'], $format);
                        $arrayRespon = array("HASIL" => $print["hasil"],
                            "URL" => 'app/cashier/uploads/pdf/cekgiro/' . $print["file"]
                        );
                        $message = $arrayRespon;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
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
                //var_dump($e);
            }
        }
        return $return;
    }

    public function getdatavendorinvoucher($kasbank_id) {
        $result = $this->setting->getbyid_kasbank_voucherdepartment($kasbank_id);
        if ($result) {
            $vendor_id = $result['vendor_id'];
            if ($vendor_id) {
                $datavendor = $this->setting->getbyid_vendor($vendor_id);
                if ($datavendor) {
                    return $datavendor;
                }
            }
        } else {
            return null;
        }
    }

    public function bankCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;


                $this->setting->_paramsql = 'create';
                $this->setting->_param['accept_date'] = date('Y-m-d', strtotime($param['accept_date'])) . ' ' . $this->_time;
                $this->setting->_param['chequegiro_date'] = date('Y-m-d', strtotime($param['chequegiro_date'])) . ' ' . $this->_time;
                $this->setting->_param['chequegiro_payment_date'] = date('Y-m-d', strtotime($param['chequegiro_payment_date'])) . ' ' . $this->_time;
                $this->setting->_param['chequegiro_receive_date'] = date('Y-m-d', strtotime($param['chequegiro_receive_date'])) . ' ' . $this->_time;
                $this->setting->_param['chequegiro_release_date'] = date('Y-m-d', strtotime($param['chequegiro_release_date'])) . ' ' . $this->_time;

                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        //$this->getvoucherNo($param);
                        //exit;
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        if ($valid == 'false') {
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                            $idheader = null;
                        } else {
                            $idheader = $result[3][0]['kasbank_id'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                        }
                        $result['idheader'] = $idheader;
                        break;
                    case 'report':
                    case 'reportjs':
                    case 'reportdirectpdf':
                        $total = $this->function->totalAmount($param);
                        $dataheader = $this->function->getdataheader($param);
                        $bankrek = explode("|", $dataheader['vendor_desc']);
                        $datavendor = $this->getdatavendorinvoucher($param['kasbank_id']);

                        if (!empty($dataheader['vendor'])) {
                            $vendor = $dataheader['vendor'];
                        } else {
                            $vendor = '';
                        }

                        if (empty($vendor)) {
                            if ($datavendor) {
                                $vendor = $datavendor['vendorname'];
                            }
                        }

                        if (!empty($dataheader['vendor_desc'])) {
                            $rekno = $bankrek[0];
                            $bank = $bankrek[1];
                        } else {
                            $rekno = '';
                            $bank = '';
                        }

                        $arraydata = array(
                            "kasbank_id" => $param['kasbank_id'],
                        );

                        $this->setting->_param = $arraydata;
                        $result = array(
                            "kasbank_id" => $param['kasbank_id'],
                            "totalamount" => $total['totalamount'],
                            "numberformat_totalamount" => number_format($total['totalamount']),
                            "format_totalamount" => $total['format_totalamount'],
                            "paramxml" => trim(preg_replace('/\s\s+/', ' ', $this->setting->converttoXml())),
                            "voucher_date" => "Jakarta, " . date('d-m-Y', strtotime($param['accept_date'])),
                            "vdate" => date('d-m-Y', strtotime($param['accept_date'])),
                            "voucher_no" => $param['voucher_no'],
                            "rekno" => "",
                            "bank" => "",
                            "vendor" => $vendor,
                            "form_kr_nama" => $dataheader['form_kr_nama'],
                            "form_kr_alamat" => $dataheader['form_kr_alamat'],
                            "form_kr_rek_no" => $dataheader['form_kr_rek_no'],
                            "form_kr_nama_bank" => $dataheader['form_kr_nama_bank'],
                            "form_kr_telp" => $dataheader['form_kr_telp'],
                            "form_kr_kota" => $dataheader['form_kr_kota'],
                            "form_kr_negara" => $dataheader['form_kr_negara'],
                            "form_tr_nama" => $dataheader['form_tr_nama'],
                            "form_tr_alamat" => $dataheader['form_tr_alamat'],
                            "form_tr_rek_no" => $dataheader['form_tr_rek_no'],
                            "form_tr_telp" => $dataheader['form_tr_telp'],
                            "form_tr_kota" => $dataheader['form_tr_kota'],
                            "form_tr_negara" => $dataheader['form_tr_negara'],
                            "form_tr_nama_bank" => $dataheader['form_tr_nama_bank'],
                            "form_tr_cabang_bank" => $dataheader['form_tr_cabang_bank'],
                            "form_tr_alamat_bank" => $dataheader['form_tr_alamat_bank'],
                            "form_tr_kota_bank" => $dataheader['form_tr_kota_bank'],
                            "form_tr_negara_bank" => $dataheader['form_tr_negara_bank'],
                            "form_tr_ket1" => $dataheader['form_tr_ket1'],
                            "form_tr_ket2" => $dataheader['form_tr_ket2'],
                            "form_tr_ket3" => $dataheader['form_tr_ket3'],
                            "terbilang" => $dataheader['terbilang'],
                        );

                        $valid = true;
                        $counter = 0;
                        $message = 'data success generate';
                        break;

                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }
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
    
    public function getvoucherNo($param) {
        print_r($param);
        exit;
        $resultprefix = $this->setting->getbyid_prefix($param['prefix_id']);
        $_docNo = 'emptyprefix';
        if ($resultprefix) {
            $prefix = $resultprefix['prefix'];
            $_docdate = new DateTime(date('Y-m-d', strtotime($param['accept_date'])));
            $_var1 = array();
            $_var1['PREFIX'] = $prefix;
            $_var2 = array();
            $_docNo = $this->counterdoc->get_advanceNo(
                    $this->setting->_project_id, $this->setting->_pt_id, $this->setting->_module_id, 'BANK', // $this->setting->_module_id untuk definisi module 
                    $_var1, $_var2, $_docdate, 0//0 berarti bersifat sementara, 1 bersifat menjadi fisik 
            );
        }
        return $_docNo;
    }

    public function bankUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['kasbank_id'];


                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $this->setting->_param['accept_date'] = date('Y-m-d', strtotime($param['accept_date'])) . ' ' . $this->_time;
                        $this->setting->_param['chequegiro_date'] = date('Y-m-d', strtotime($param['chequegiro_date'])) . ' ' . $this->_time;
                        $this->setting->_param['chequegiro_payment_date'] = date('Y-m-d', strtotime($param['chequegiro_payment_date'])) . ' ' . $this->_time;
                        $this->setting->_param['chequegiro_receive_date'] = date('Y-m-d', strtotime($param['chequegiro_receive_date'])) . ' ' . $this->_time;
                        $this->setting->_param['chequegiro_release_date'] = date('Y-m-d', strtotime($param['chequegiro_release_date'])) . ' ' . $this->_time;
                        $this->setting->_param['chequegiro_reject_date'] = date('Y-m-d', strtotime($param['chequegiro_reject_date'])) . ' ' . $this->_time;
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_lastquery);
                        $result['idheader'] = $result[1][0]['kasbank_id'];
                        $valid = $result[2][0]['VALIDDATA'];
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        $message = $result[4][0]['MSG'];
                        break;
                    case 'updateheaderform':
						$this->setting->_storeprocedure = 'sp_kasbank_createform';
						$result = $this->setting->executeSP();
						$valid = $result[1][0]['VALIDDATA'];
						$counter = $result[2][0]['RECORD_TOTAL'];
						$message = $result[3][0]['MSG'];
						//reset to default store
						$this->setting->_storeprocedure = 'sp_th_kasbank_bank';
						break;
					default:
							$result = null;
							$idheader = null;
							$valid = false;
							$counter = 1;
							$message = 'data error';
                }


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

    function bankDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kasbank_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP();
                $valid = $result[3][0]['VALIDDATA'];
                $counter = $result[4][0]['RECORD_TOTAL'];
                $message = $result[5][0]['MSG'];

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
