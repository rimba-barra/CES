<?php
class Erems_Models_Master_Pricelist extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_pricelist';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function pricelistRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pricelist'],
					$param['keterangan'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'], 
					$param['page']
				);
				$result = $this->execSP3('sp_masterpricelist_read', $data);		
						
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    // added by rico 23092021
    function clusterlistRead($param){
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					1,
					9999,
					'',
					'',
					''
				);
				$result = $this->execSP3('sp_clusterc_read', $data);	

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }
	
    function pricelistCreate($param = array()) {
        $return['success'] = false;
        
        $checkValid = $this->pricelistValidator($param);

		$th_pricelist_pricelist_id       = isset($param['pricelist_id']) ? $param['pricelist_id']:FALSE;
		$th_pricelist_project_id         = $this->session->getCurrentProjectId();
		$th_pricelist_pt_id              = $this->session->getCurrentPtId();
		$th_pricelist_keterangan         = $param['keterangan'];
		$th_pricelist_nomor_im           = $param['nomor_im'];
		$th_pricelist_pricelist_date     = $param['pricelist_date'];
		$th_pricelist_pricelist_end_date = $param['pricelist_end_date']; // added by rico 08022023
		$th_pricelist_doc_status         = 'OPEN';
		$th_pricelist_addby              = $this->session->getUserId();

		$paramdetail = $param['detail_pricelist'];		

        if($checkValid['status']){
			if (is_array($param) && count($param)){
				try {
					$td_pricelist_detail_pricelistdetail_id           = '';//is_int($param['pricelistdetail_id']) ? $param['pricelistdetail_id']:null;
					$td_pricelist_detail_pricelist_id                 = $th_pricelist_pricelist_id;
					$td_pricelist_detail_unit_id                      = '';
					$td_pricelist_detail_harga_tanahpermeter          = '';
					$td_pricelist_detail_harga_bangunanpermeter       = '';
					$td_pricelist_detail_total_hargatanah             = '';
					$td_pricelist_detail_total_hargabangunan          = '';
					$td_pricelist_detail_harga_netto                  = '';
					$td_pricelist_detail_harga_netto_grossup          = '';
					$td_pricelist_detail_is_grossup                   = '';
					$td_pricelist_detail_is_bphtb                     = '';
					$td_pricelist_detail_is_ajb                       = '';
					$td_pricelist_detail_is_bbn                       = '';
					$td_pricelist_detail_list_koefisien               = '';
					$td_pricelist_detail_harga_tanahdevcostpermeter   = '';					
					$td_pricelist_detail_harga_tanahmentahpermeter    = '';
					$td_pricelist_detail_harga_tanahhpp               = '';
					$td_pricelist_detail_harga_bangunanhpp            = '';
					$td_pricelist_detail_total_tanah_hpp              = '';
					$td_pricelist_detail_harga_tanah_margin           = '';
					$td_pricelist_detail_harga_tanah_margin_persen    = '';
					$td_pricelist_detail_total_bangunan_hpp           = '';
					$td_pricelist_detail_harga_bangunan_margin        = '';
					$td_pricelist_detail_harga_bangunan_margin_persen = '';					
					$td_pricelist_detail_total_hpptanahbangunan       = '';
					$td_pricelist_detail_total_margin                 = '';
					$td_pricelist_detail_persentase_margin            = '';
					$td_pricelist_detail_keterangan_unit              = '';
					$td_pricelistdetail_koefisien_id                  = '';
					$td_pricelistdetail_koefisien_pricelist_id        = $th_pricelist_pricelist_id;
					$td_pricelistdetail_koefisien_pricelistdetail_id  = '';
					$td_pricelistdetail_koefisien_harga_final         = '';
					$td_pricelistdetail_grossup_persen                = '';
					$td_pricelistdetail_markup                        = '';
					$td_pricelistdetail_margin_persen_tanah           = '';
					$td_pricelistdetail_margin_persen_bangunan        = '';
					$td_pricelistdetail_spare                         = '';
					$td_pricelistdetail_total_harga_jual              = '';

					$vartestkoefisien = '';

					// detail Unit
					if (is_array($paramdetail) && count($paramdetail) > 0) {
	                    foreach ($paramdetail as $idx => $data) {
	                        foreach ($data as $key => $value) {
	                            switch ($key) {
	                                case 'unit_id': $td_pricelist_detail_unit_id .= (float) $value . "~";
	                                    break;
									case 'harga_tanahpermeter' : $td_pricelist_detail_harga_tanahpermeter .= (float) $value ."~";
										break;
									case 'harga_bangunanpermeter' : $td_pricelist_detail_harga_bangunanpermeter .= (float) $value ."~";
										break;
									case 'total_hargatanah' : $td_pricelist_detail_total_hargatanah .= (float) $value ."~";
										break;
									case 'total_hargabangunan' : $td_pricelist_detail_total_hargabangunan .= (float) $value ."~";
										break;
									case 'harga_netto' : $td_pricelist_detail_harga_netto .= (float) $value ."~";
										break;
									case 'is_grossup' : $td_pricelist_detail_is_grossup .= $value ."~";
										break;
									case 'harga_netto_grossup' : $td_pricelist_detail_harga_netto_grossup .= (float) $value ."~";
										break;
									case 'is_bphtb' : $td_pricelist_detail_is_bphtb .= $value ."~";
										break;
									case 'is_ajb' : $td_pricelist_detail_is_ajb .= $value ."~";
										break;
									case 'is_bbn' : $td_pricelist_detail_is_bbn .= $value ."~";
										break;
									case 'harga_tanahdevcostpermeter' : $td_pricelist_detail_harga_tanahdevcostpermeter .= (float) $value ."~";
										break;									
									case 'harga_tanahmentahpermeter' : $td_pricelist_detail_harga_tanahmentahpermeter .= (float) $value ."~";
										break;
									case 'harga_tanahhpp' : $td_pricelist_detail_harga_tanahhpp .= (float) $value ."~";
										break;
									case 'harga_bangunanhpp' : $td_pricelist_detail_harga_bangunanhpp .= (float) $value ."~";
										break;
									case 'total_tanah_hpp' : $td_pricelist_detail_total_tanah_hpp .= (float) $value ."~";
										break;
									case 'harga_tanah_margin' : $td_pricelist_detail_harga_tanah_margin .= (float) $value ."~";
										break;
									case 'harga_tanah_margin_persen' : $td_pricelist_detail_harga_tanah_margin_persen .= (float) $value ."~";
										break;
									case 'total_bangunan_hpp' : $td_pricelist_detail_total_bangunan_hpp .= (float) $value ."~";
										break;
									case 'harga_bangunan_margin' : $td_pricelist_detail_harga_bangunan_margin .= (float) $value ."~";
										break;
									case 'harga_bangunan_margin_persen' : $td_pricelist_detail_harga_bangunan_margin_persen .= (float) $value ."~";
										break;								
									case 'total_hpptanahbangunan' : $td_pricelist_detail_total_hpptanahbangunan .= (float) $value ."~";
										break;
									case 'total_margin' : $td_pricelist_detail_total_margin .= (float) $value ."~";
										break;
									case 'persentase_margin' : $td_pricelist_detail_persentase_margin .= (float) $value ."~";
										break;
									case 'keterangan_unit' : $td_pricelist_detail_keterangan_unit .= $value ."~";
										break;
									// added by rico 18102021
									case 'grossup_persen' : $td_pricelistdetail_grossup_persen .= $value ."~";
										break;
									// added by rico 08112021
									case 'markup' : $td_pricelistdetail_markup .= $value ."~";
									// added by rico 09112021
										break;
									case 'margin_persen_tanah' : $td_pricelistdetail_margin_persen_tanah .= $value ."~";
									// added by rico 09112021
										break;
									case 'margin_persen_bangunan' : $td_pricelistdetail_margin_persen_bangunan .= $value ."~";
										break;
									case 'spare' : $td_pricelistdetail_spare .= $value ."~";
										break;
									case 'total_harga_jual' : $td_pricelistdetail_total_harga_jual .= $value ."~";
										break;

									// detail koefisien
									case 'list_koefisien_id' : 
										$td_pricelist_detail_list_koefisien .= $value ."~";
										$arrKoefisienId = explode(',', $value);
										foreach ($arrKoefisienId as $idKoefisien) {
											if($idKoefisien > 0){
												if($data['KoefisienId_netto_'.$idKoefisien] > 0 && $data['KoefisienId_gross_'.$idKoefisien] > 0){
													$td_pricelistdetail_koefisien_harga_final .= $data['KoefisienId_netto_'.$idKoefisien]."|".$data['KoefisienId_gross_'.$idKoefisien].',';
												}
											}
										}

										$td_pricelistdetail_koefisien_harga_final = rtrim($td_pricelistdetail_koefisien_harga_final,',');//preg_replace('/(\/)$/', '', $td_pricelistdetail_koefisien_harga_final);
										$td_pricelistdetail_koefisien_harga_final .= "~";

										break;
	                            }
	                        }
	                    };

						$td_pricelist_detail_unit_id                      = preg_replace('/(~)$/', '', $td_pricelist_detail_unit_id);
						$td_pricelist_detail_harga_tanahpermeter          = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_tanahpermeter);
						$td_pricelist_detail_harga_bangunanpermeter       = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_bangunanpermeter);
						$td_pricelist_detail_total_hargatanah             = preg_replace('/(~)$/', '', $td_pricelist_detail_total_hargatanah);
						$td_pricelist_detail_harga_tanah_margin           = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_tanah_margin);
						$td_pricelist_detail_harga_tanah_margin_persen    = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_tanah_margin_persen);
						$td_pricelist_detail_total_hargabangunan          = preg_replace('/(~)$/', '', $td_pricelist_detail_total_hargabangunan);
						$td_pricelist_detail_harga_bangunan_margin        = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_bangunan_margin);
						$td_pricelist_detail_harga_bangunan_margin_persen = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_bangunan_margin_persen);
						$td_pricelist_detail_harga_netto                  = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_netto);
                                                
						$td_pricelist_detail_is_grossup                  = preg_replace('/(~)$/', '', $td_pricelist_detail_is_grossup);
						$td_pricelist_detail_harga_netto_grossup         = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_netto_grossup);                                                
						$td_pricelist_detail_is_bphtb                    = preg_replace('/(~)$/', '', $td_pricelist_detail_is_bphtb);
						$td_pricelist_detail_is_ajb                      = preg_replace('/(~)$/', '', $td_pricelist_detail_is_ajb);
						$td_pricelist_detail_is_bbn                      = preg_replace('/(~)$/', '', $td_pricelist_detail_is_bphtb);

						$td_pricelist_detail_harga_tanahdevcostpermeter = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_tanahdevcostpermeter);
						$td_pricelist_detail_harga_tanahmentahpermeter  = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_tanahmentahpermeter);
						$td_pricelist_detail_harga_tanahhpp             = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_tanahhpp);
						$td_pricelist_detail_harga_bangunanhpp          = preg_replace('/(~)$/', '', $td_pricelist_detail_harga_bangunanhpp);
						$td_pricelist_detail_total_tanah_hpp            = preg_replace('/(~)$/', '', $td_pricelist_detail_total_tanah_hpp);
						$td_pricelist_detail_total_bangunan_hpp         = preg_replace('/(~)$/', '', $td_pricelist_detail_total_bangunan_hpp);
						$td_pricelist_detail_total_hpptanahbangunan     = preg_replace('/(~)$/', '', $td_pricelist_detail_total_hpptanahbangunan);
						$td_pricelist_detail_total_margin               = preg_replace('/(~)$/', '', $td_pricelist_detail_total_margin);
						$td_pricelist_detail_persentase_margin          = preg_replace('/(~)$/', '', $td_pricelist_detail_persentase_margin);
						$td_pricelist_detail_keterangan_unit            = preg_replace('/(~)$/', '', $td_pricelist_detail_keterangan_unit);
						
						$td_pricelist_detail_list_koefisien       = preg_replace('/(~)$/', '', $td_pricelist_detail_list_koefisien);
						$td_pricelistdetail_koefisien_harga_final = preg_replace('/(~)$/', '', $td_pricelistdetail_koefisien_harga_final);

						$td_pricelistdetail_grossup_persen = preg_replace('/(~)$/', '', $td_pricelistdetail_grossup_persen);
						$td_pricelistdetail_markup         = preg_replace('/(~)$/', '', $td_pricelistdetail_markup);

						$td_pricelistdetail_margin_persen_tanah    = preg_replace('/(~)$/', '', $td_pricelistdetail_margin_persen_tanah);
						$td_pricelistdetail_margin_persen_bangunan = preg_replace('/(~)$/', '', $td_pricelistdetail_margin_persen_bangunan);

						$td_pricelistdetail_spare            = preg_replace('/(~)$/', '', $td_pricelistdetail_spare);
						$td_pricelistdetail_total_harga_jual = preg_replace('/(~)$/', '', $td_pricelistdetail_total_harga_jual);

	                }

					$data = array(
						$th_pricelist_pricelist_id,
						$th_pricelist_project_id,
						$th_pricelist_pt_id,
						$th_pricelist_keterangan,
						$th_pricelist_nomor_im,
						$th_pricelist_pricelist_date,
						$th_pricelist_pricelist_end_date, // added by rico 08022023
						$th_pricelist_doc_status,
						$th_pricelist_addby,

						//detail
						$td_pricelist_detail_pricelistdetail_id,
						$td_pricelist_detail_unit_id,
						$td_pricelist_detail_harga_tanahpermeter,
						$td_pricelist_detail_harga_bangunanpermeter,
						$td_pricelist_detail_total_hargatanah,
						$td_pricelist_detail_harga_tanah_margin,
						$td_pricelist_detail_harga_tanah_margin_persen,
						$td_pricelist_detail_total_hargabangunan,
						$td_pricelist_detail_harga_bangunan_margin,
						$td_pricelist_detail_harga_bangunan_margin_persen,
						$td_pricelist_detail_harga_netto,
						$td_pricelist_detail_list_koefisien,

						$td_pricelist_detail_harga_tanahdevcostpermeter,
						$td_pricelist_detail_harga_tanahmentahpermeter,
						$td_pricelist_detail_harga_tanahhpp,
						$td_pricelist_detail_harga_bangunanhpp,
						$td_pricelist_detail_total_tanah_hpp,
						$td_pricelist_detail_total_bangunan_hpp,
						$td_pricelist_detail_total_hpptanahbangunan,
						$td_pricelist_detail_total_margin,
						$td_pricelist_detail_persentase_margin,
						$td_pricelist_detail_keterangan_unit,

						//detail koefisien
						$td_pricelistdetail_koefisien_id,
						$td_pricelistdetail_koefisien_harga_final,
                        $td_pricelist_detail_is_grossup,
                        $td_pricelist_detail_harga_netto_grossup,
                        $td_pricelist_detail_is_bphtb,
                        $td_pricelist_detail_is_ajb,
                        $td_pricelist_detail_is_bbn,

                        // added by rico 18102021
                        $td_pricelistdetail_grossup_persen,
                        $td_pricelistdetail_markup,

                        // added by rico 18102021
                        $td_pricelistdetail_margin_persen_tanah,
                        $td_pricelistdetail_margin_persen_bangunan,

                        $td_pricelistdetail_spare,
                        $td_pricelistdetail_total_harga_jual,
					);

					if($th_pricelist_pricelist_id){
						$result = $this->execSP3('sp_masterpricelist_update', $data);
					}
					else{				
						$result                     = $this->execSP3('sp_masterpricelist_create', $data);
						$return['new_pricelist_id'] = $result[1][0]['NEW_PRICELIST_ID'];
					}
					$return['total']   = $result[0];
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

    function pricelistDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'pricelist_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].'~#~'; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterpricelist_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) {
                var_dump($e->getMessage());
            }
		}
		return $return;
    }
    
    function pricelistValidator($param = array()){
    	$msg = "";
    	$setStatus = false;
        switch(true){
            case (strlen($param['keterangan']) < 1):
                $msg = "Keterangan minimum 1 characters";
                break;
            case (strlen($param['pricelist_date']) < 10):
                $msg = "Pricelist Date harus diisi";
                break;
            case (strlen($param['pricelist_end_date']) < 10):
                $msg = "Pricelist End Date harus diisi";
                break;
            default:
                $setStatus = TRUE;
                break;
        }

        return array("msg" => $msg, "status" => $setStatus);
    }

    function unitlistRead($param, $statusUnit) {
        $return['success'] = false;
        if (is_array($param) && count($param)){
        	$cluster = (empty($param['cluster'])) ? 0 : $param['cluster'];
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['page'], 
					$param['limit'],
					$param['unit_number'], //unit number
					0, //BLOCK NUMBER
					$statusUnit,
					$cluster
				);
				$result = $this->execSP3('sp_unitbsimpleb_pricelist_read', $data);

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function unitOneRead($param) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_id']
				);
				$result = $this->execSP3('sp_unit_one_read', $data);		

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function koefisienAllRead($param) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					'',
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					0,
					9999, 
					1
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
    
    function pricelistReadOne($param) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pricelist_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterpricelist_detail_read', $data);		

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function generateListCluster($param, $statusUnit) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					1,
					1, 
					99999,
					$param['unit_number'], //unit number
					0, //BLOCK NUMBER
					$statusUnit 
				);
				$result = $this->execSP3('sp_masterpricelist_generate_list_cluster', $data);

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function generateListType($param, $statusUnit) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					1,
					1, 
					99999,
					$param['unit_number'], //unit number
					0, //BLOCK NUMBER
					$statusUnit 
				);
				$result = $this->execSP3('sp_masterpricelist_generate_list_type', $data);

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function generateUnit($param, $statusUnit) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['page'], 
					$param['limit'],
					$param['cluster_id'],
					$param['type_id'],
					0, //BLOCK NUMBER
					$statusUnit 
				);
				$result = $this->execSP3('sp_masterpricelist_generate_unit', $data);	

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function pricelistExportData($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pricelist_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);
				$nameSp = 'sp_masterpricelist_export_excel';
				if($param['excelSH2'] == 1){
					$nameSp .= '_SH2';
				}
				$result = $this->execSP3($nameSp, $data);
						
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];		
				$return['dataKoefisien'] = $result[2];		
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function pricelistExportDataDetailKoefisien($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['koefisien_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterpricelist_export_excel_detail_koefisien', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];	
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function pricelistSaveExcelName($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pricelist_id'],
					$param['file_name'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterpricelist_save_excel', $data);		
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function pricelistSendEmail($param){
        $return['success'] = false;
    	try{
			$data = array (
				$param['pricelist_id'],
				$param['user_email_id'],
				$param['project_id'],
				$param['pt_id']
			);
			$result = $this->execSP3('sp_masterpricelist_detail_email', $data);

			$return['total'] = $result[0][0]['RECORD_TOTAL'];
			$return['data'] = $result[1];	
			$return['dataBefore'] = $result[2];		
			$return['success'] = true;				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

    function pricelistSetStatusDocStatus($param){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$param['pricelist_id'],
				$param['status'],
				$param['approveid'],
				$param['approveorder'],
				$param['approveemail'],
				$param['project_id'],
				$param['pt_id']
			);

			if(isset($param['rejectNotes'])) $data[] = $param['rejectNotes'];

			$result = $this->execSP3('sp_masterpricelist_update_status', $data);
			$return['data'] = $result[0][0];

			if(!isset($result[0][0]['result'])){		
				$return['success'] = true;
				$return['result'] = $result[1][0]['result'];
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

    function pricelistCheckStatusDoc($param){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$param['pricelist_id'],
				$param['status'],
				$param['approveid']
			);
			$result = $this->execSP3('sp_masterpricelist_check_status', $data);
			$return['data'] = $result[0][0];
			if(!isset($result[0][0]['result'])){		
				$return['success'] = true;
				$return['result'] = $result[1][0]['result'];
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

    function pricelistCheckApproveList($param){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$param['pricelist_id'],
				$param['project_id'],
				$param['pt_id']
			);
			$result = $this->execSP3('sp_masterpricelist_list_email', $data);

			$return['data'] = $result;
			if(!isset($result[0][0]['result'])){		
				$return['success'] = true;
				$return['result'] = $result[1][0]['result'];
				$return['dataApproval'] = $result[1][0]['result'];
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

    function pricelistSendMailAccept($param){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$param['pricelist_id'],
				$param['project_id'],
				$param['pt_id']
			);
			$result = $this->execSP3('sp_masterpricelist_update_sent_email', $data);

			$return['data'] = $result;
			if(!isset($result[0][0]['result'])){		
				$return['success'] = true;
				$return['result'] = $result[1][0]['result'];
				$return['dataApproval'] = $result[1][0]['result'];
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

	function datapricelistRead($param){
        $return['success'] = 'Gagal';
		// var_dump($param);die();
    	try{
			$data = array (
				$param['pricelist_id'],
				// $param['project_id'],
				// $param['pt_id']
			);
			$result = $this->execSP3('sp_datapricelistRead', $data);

			$return['data'] = $result;
			if(!isset($result[0])){		
				$return['success'] = true;
				$return['result'] = $result;
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

	function pricelistrejectCreate($param){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$param['pricelist_id'],
				$param['project_id'],
				$param['pt_id'],
				$param['keterangan'],
				$param['pricelist_date'],
				$param['pricelist_end_date'], // added by rico 08022023
				$param['doc_status'],
				$param['file_name'],
				$this->session->getUserId(),
			);
			$result = $this->execSP3('sp_pricelistreject_create', $data);
			$return['data'] = $result[0][0]['result'];
			if($result[0][0]['result'] > 0){		
				$return['success'] = true;
				// $return['result'] = $result;
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

	function pricelistdetailrejectCreate($param,$pricelist_id){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$pricelist_id,
				$param['cluster_id'],
				$param['cluster_code'],
				$param['cluster'],
				$param['block_id'],
				$param['block_code'],
				$param['block'],
				$param['unit_id'],
				$param['unit_number'],
				$param['type_id'],
				$param['type_code'],
				$param['type_name'],
				$param['land_size'],
				$param['building_size'],
				$param['harga_tanahpermeter'],
				$param['harga_bangunanpermeter'],
				$param['total_hargatanah'],
				$param['harga_tanah_margin'],
				$param['harga_tanah_margin_persen'],
				$param['total_hargabangunan'],
				$param['harga_bangunan_margin'],
				$param['harga_bangunan_margin_persen'],
				$param['harga_netto'],
				$param['harga_tanah_devcost'],
				$param['harga_tanah_mentah'],
				$param['harga_tanah_hpp'],
				$param['harga_bangunan_hpp'],
				$param['total_tanah_hpp'],
				$param['total_bangunan_hpp'],
				$param['total_hpp'],
				$param['total_margin'],
				$param['total_margin_persen'],
				$param['keterangan_unit'],
				$param['is_grossup'],
				$param['harga_netto_grossup'],
				$param['is_bphtb'],
				$param['is_ajb'],
				$param['is_bbn'],
				$this->session->getUserId(),
			);
			$result = $this->execSP3('sp_pricelistdetailreject_create', $data);

			$return['data'] = $result[0][0]['result'];
			if($result[0][0]['result'] > 0){		
				$return['success'] = true;
				// $return['result'] = $result;
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

	function pricelistdetailkoefisienrejectCreate($param,$pricelist_id,$pricelistdetail_id){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$pricelist_id,
				$pricelistdetail_id,
				$param['koefisien_id'],
				$param['pricetype_id'],
				$param['pricetype'],
				$param['pricelist_name'],
				$param['koefisien'],
				$param['asuransi_nominal_persen'],
				$param['biaya_asuransi'],
				$param['bphtb_nominal_persen'],
				$param['biaya_bphtb'],
				$param['bbn_nominal_persen'],
				$param['biaya_bbn'],
				$param['ajb_nominal_persen'],
				$param['biaya_ajb'],
				$param['administrasi_nominal_persen'],
				$param['biaya_administrasi'],
				$param['tandajadi_nominal_persen'],
				$param['tandajadi'],
				$param['harga_final_netto'],
				$param['harga_final_gross'],
				$param['admsubsidi_nominal_persen'],
				$param['biaya_admsubsidi'],
				$param['pmutu_nominal_persen'],
				$param['biaya_pmutu'],
				$param['paket_tambahan_nominal_persen'],
				$param['biaya_paket_tambahan'],
				$this->session->getUserId(),
			);
			$result = $this->execSP3('sp_pricelistdetailkoefisienreject_create', $data);
			$return['data'] = $result[0][0]['result'];
			if($result[0][0]['result'] > 0){		
				$return['success'] = true;
				// $return['result'] = $result;
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

    function pricelistbystatus($param=array()) {
        $return['success'] = false;
		try {
			$data = array (
				$param['project_id'], 
				$param['pt_id'],
				$param['status'],
				(isset($param['limit']) ? $param['limit'] : 25), 
				(isset($param['page']) ? $param['page'] : 1),
				$this->session->getUserId(),
				(isset($param['periode_startdate']) ? $param['periode_startdate'] : ''), 
				(isset($param['periode_enddate']) ? $param['periode_enddate'] : ''),
				(isset($param['mode_sp']) ? $param['mode_sp'] : ''),
			);
			$result = $this->execSP3('sp_masterpricelistbystatus_read', $data);		
					
			$return['total']   = $result[0][0]['RECORD_TOTAL'];
			$return['data']    = $result[1];			
			$return['success'] = true;				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }
}