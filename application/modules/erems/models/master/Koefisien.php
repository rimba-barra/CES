<?php
class Erems_Models_Master_Koefisien extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_koefisien';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function koefisienRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pricelist'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'], 
					$param['page']
				);
				$result = $this->execSP3('sp_masterkoefisien_read', $data);		
						
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }
	
    function koefisienCreate($param = array()) {
        $return['success'] = false;
        $checkValid = $this->koefisienValidator($param);
        // print_r($checkValid);exit;
        // {"success":false,"success_transaction":null,"msg":"Please insert customer","others":null}

        if($checkValid['status']){
			if (is_array($param) && count($param))
			{
				$koefisien_detail_id = "";
				$koefisien_id = "";
				$um_inh_scheduletype = "";
				$termin = "";
				$um_inh_persen = "";
				$npv = "";
				foreach ($param['detail'] as $key => $value) {
					$koefisien_detail_id .= $value['koefisien_detail_id'].'~';
					$koefisien_id        .= $value['koefisien_id'].'~';
					$um_inh_scheduletype .= $value['scheduletype_id'].'~';
					$termin              .= $value['termin'].'~';
					$um_inh_persen       .= $value['um_inh_persen'].'~';
					$npv                 .= $value['npv'].'~';
				}
				$koefisien_detail_id = rtrim($koefisien_detail_id, "~");
				$koefisien_id = rtrim($koefisien_id, "~");
				$um_inh_scheduletype = rtrim($um_inh_scheduletype, "~");
				$termin = rtrim($termin, "~");
				$um_inh_persen = rtrim($um_inh_persen, "~");
				$npv = rtrim($npv, "~");

				try {
					$data = array (
						$this->session->getCurrentProjectId(), 
						$this->session->getCurrentPtId(),
						$param['pricetype_id'], 
						$param['pricelist'], 
						$param['koefisien'], 
						$param['is_biaya_asuransi'], 
						$param['asuransi_nominal_persen'], 
						$param['biaya_asuransi'], 
						$param['is_biaya_bphtb'], 
						$param['bphtb_nominal_persen'], 
						$param['biaya_bphtb'], 
						$param['is_biaya_bbn'], 
						$param['bbn_nominal_persen'], 
						$param['biaya_bbn'], 
						$param['is_biaya_ajb'], 
						$param['ajb_nominal_persen'], 
						$param['biaya_ajb'], 
						$param['is_biaya_administrasi'], 
						$param['administrasi_nominal_persen'], 
						$param['biaya_administrasi'], 
						$param['tandajadi_nominal_persen'], 
						$param['tandajadi'], 
						$param['is_biaya_admsubsidi'], 
						$param['admsubsidi_nominal_persen'], 
						$param['biaya_admsubsidi'],
						$param['is_biaya_pmutu'], 
						$param['pmutu_nominal_persen'], 
						$param['biaya_pmutu'],
						$param['is_biaya_paket_tambahan'], 
						$param['paket_tambahan_nominal_persen'], 
						$param['biaya_paket_tambahan'],
						$param['is_dp_awal'], 
						$param['persentase_dp'], 
						$param['um_inh_scheduletype'], 
						$param['um_inh_persen'], 
						$param['um_inh_termin'],
						$koefisien_detail_id,
						$koefisien_id,
						$um_inh_scheduletype,
						$termin,
						$um_inh_persen,
						$npv,
						$this->session->getUserId(),
						//added by rico 18102021
						$param['disc_pembayaran'],
						$param['collection_fee']
					);
					$result = $this->execSP3('sp_masterkoefisien_create', $data);
					$return['total'] = $result[0];
					$return['success'] = $result[0]>0;
				} catch(Exception $e) {
	                var_dump($e->getMessage());
	            }			
			}
		}
		else{
			$return['success_transaction'] = null;
			$return['msg'] = $checkValid['msg'];
			$return['others'] = null;
		}
		return $return;
    }

    function koefisienUpdate($param = array()) {
        $return['success'] = false; 
        $checkValid = $this->koefisienValidator($param);
        if($checkValid['status']){
			if (is_array($param) && count($param))
			{
				$koefisien_detail_id = "";
				$koefisien_id = "";
				$um_inh_scheduletype = "";
				$termin = "";
				$um_inh_persen = "";
				$npv = "";
				foreach ($param['detail'] as $key => $value) {
					// $koefisien_detail_id .= $value['koefisien_detail_id'].'~';
					// $koefisien_id        .= $value['koefisien_id'].'~';
					$um_inh_scheduletype .= $value["scheduletype_id"].'~';
					$termin              .= $value['termin'].'~';
					$um_inh_persen       .= $value['um_inh_persen'].'~';
					$npv                 .= $value['npv'].'~';
				}
				// $koefisien_detail_id = rtrim($koefisien_detail_id, "~");
				// $koefisien_id = rtrim($koefisien_id, "~");
				$um_inh_scheduletype = rtrim($um_inh_scheduletype, "~");
				$termin = rtrim($termin, "~");
				$um_inh_persen = rtrim($um_inh_persen, "~");
				$npv = rtrim($npv, "~");

				try {
					$data = array (
						$this->session->getUserId(),
						$param['koefisien_id'], 
						$param['pricetype_id'], 
						$param['pricelist'], 
						$param['koefisien'], 
						$param['is_biaya_asuransi'], 
						$param['asuransi_nominal_persen'], 
						$param['biaya_asuransi'], 
						$param['is_biaya_bphtb'], 
						$param['bphtb_nominal_persen'], 
						$param['biaya_bphtb'], 
						$param['is_biaya_bbn'], 
						$param['bbn_nominal_persen'],
						$param['biaya_bbn'], 
						$param['is_biaya_ajb'], 
						$param['ajb_nominal_persen'],
						$param['biaya_ajb'],
						$param['is_biaya_administrasi'], 
						$param['administrasi_nominal_persen'],
						$param['biaya_administrasi'],
						$param['tandajadi_nominal_persen'], 
						$param['tandajadi'], 
						$param['is_biaya_admsubsidi'], 
						$param['admsubsidi_nominal_persen'], 
						$param['biaya_admsubsidi'],
						$param['is_biaya_pmutu'], 
						$param['pmutu_nominal_persen'], 
						$param['biaya_pmutu'],
						$param['is_biaya_paket_tambahan'], 
						$param['paket_tambahan_nominal_persen'], 
						$param['biaya_paket_tambahan'],
						$param['is_dp_awal'],
						$param['persentase_dp'],
						$param['um_inh_scheduletype'], 
						$param['um_inh_persen'], 
						$param['um_inh_termin'] ,
						$koefisien_detail_id,
						$koefisien_id,
						$um_inh_scheduletype,
						$termin,
						$um_inh_persen,
						$npv,
						//added by rico 18102021
						$param['disc_pembayaran'],
						$param['collection_fee']
					);
					// print_r($data);
					// exit;
					$result = $this->execSP3('sp_masterkoefisien_update', $data);
					$return['total'] = $result[0];
					$return['success'] = $result[0]>0;			
				} catch(Exception $e) {
	                var_dump($e->getMessage());
	            }
			}
		}
		else{
			$return['success_transaction'] = null;
			$return['msg'] = $checkValid['msg'];
			$return['others'] = null;
		}
		return $return;
    }

    function koefisienDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'koefisien_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].'~#~'; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterkoefisien_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) {
                var_dump($e->getMessage());
            }
		}
		return $return;
    }

    function getScheduleById($param = array()){
        $return['success'] = false;
		if (is_array($param) && count($param))
		{		
			try {
				$data = array (
					$param['koefisien_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_masterkoefisien_detail_read', $data);
				$return['total'] = $result[0];
				$return['data'] = $result[1];	
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) {
                var_dump($e->getMessage());
            }
		}
		return $return;
    }
    
    function koefisienValidator($param = array()){
    	$msg = "";
    	$setStatus = false;

    	while(true){
            if((float)$param['koefisien']<1){
                $msg = "Koefisien minimum 1 nominal";
                break;
            }
            if(strlen($param['pricelist'])<5){
                $msg = "Nama Price List minimum 5 characters";
                break;
            }
            if($param['is_biaya_asuransi']){
                if($param['biaya_asuransi'] < 0 || $param['biaya_asuransi'] == 0){
                    $msg = "Biaya asuransi harus di isi";
                    break;
                }
            }
            if($param['is_biaya_bphtb']){
                if($param['biaya_bphtb'] < 0 || $param['biaya_bphtb'] == 0){
                    $msg = "Biaya BPHTB harus di isi";
                    break;
                }
            }
            if($param['is_biaya_bbn']){
            	// echo 'masuk12';exit;
                if($param['biaya_bbn'] < 0 || $param['biaya_bbn'] == 0){
                    $msg = "Biaya BBN harus di isi";
                    break;
                }
            }
            if($param['is_biaya_ajb']){
                if($param['biaya_ajb'] < 0 || $param['biaya_ajb'] == 0){
                    $msg = "Biaya AJB harus di isi";
                    break;
                }
            }
            if($param['is_biaya_administrasi']){
                if($param['biaya_administrasi'] < 0 || $param['biaya_administrasi'] == 0){
                    $msg = "Biaya Administrasi harus di isi";
                    break;
                }
            }
            if($param['is_biaya_admsubsidi']){
                if($param['biaya_admsubsidi'] < 0 || $param['biaya_admsubsidi'] == 0){
                    $msg = "Biaya Administrasi Subsidi harus di isi";
                    break;
                }
            }
            if($param['is_biaya_pmutu']){
                if($param['biaya_pmutu'] < 0 || $param['biaya_pmutu'] == 0){
                    $msg = "Biaya Pengendalian Mutu harus di isi";
                    break;
                }
            }
            if($param['is_biaya_paket_tambahan']){
                if($param['biaya_paket_tambahan'] < 0 || $param['biaya_paket_tambahan'] == 0){
                    $msg = "Biaya Paket Tambahan harus di isi";
                    break;
                }
            }
            $setStatus = TRUE;
            break;
        }
        return array("msg" => $msg, "status" => $setStatus);
    }

    function get_discount_rate_year(){
    	$return = 12; /// Default
		try {
			$data = array (
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				'DISCOUNT_RATE_YEAR'
			);
			$result = $this->execSP3('sp_global_parameter_read', $data);

			if(isset($result[0]) && count($result[0]) > 0){
				$return = $result[0][0]['value'];
			}
		} catch(Exception $e) {
            var_dump($e->getMessage());
        }
		return $return;
    }
}