<?php

class Erems_Models_Sspssb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_sspssb';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function sspssbRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_sspssb_count', 
									$param['sspssb_id'], 
									$param['purchaseletter_id'], 
									$param['cluster_id'], 
									$param['block_id'], 
									// $param['kavling_number_start'], 
									// $param['kavling_number_end'], 
									$param['unit_number'],									
									$param['customer_id'], 
									$param['pt_id'], 
									$param['type_id'], 
									$param['tax_year'],
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId()
								);
						
                $resultdata = $this->execSP('sp_sspssb_read', 
									$param['sspssb_id'], 
									$param['purchaseletter_id'], 
									$param['cluster_id'], 
									$param['block_id'], 
									// $param['kavling_number_start'], 
									// $param['kavling_number_end'],  
									$param['unit_number'],
									$param['customer_id'], 
									$param['pt_id'], 
									$param['type_id'], 
									$param['tax_year'], 
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId(),
									$param['start'], 
									$param['limit']
								);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function sspssbCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
				
				$serahterimaplan_date = '';
				$serahterimaplan_month = 0;
				
				if($param['radio_st_group'] == 'radio_tgl_st'){
					$serahterimaplan_date = $param['serahterimaplan_date'];
				}else if($param['radio_st_group'] == 'radio_bln_st'){
					$serahterimaplan_month = $param['serahterimaplan_month'];
				}
				
                $affectedRow = $this->execSP('sp_sspssb_create', 
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId(),
									$param['unit_id'], 
									$param['purchaseletter_id'], 
									$param['wajibpajak_name'], 
									$param['wajibpajak_address'], 
									$param['wajibpajak_npwp'], 
									$param['wajibpajak_kelurahan'], 
									$param['wajibpajak_kecamatan'], 
									$param['wajibpajak_rtrw'], 
									$param['wajibpajak_city_id'], 
									$param['wajibpajak_zipcode'], 
									$param['nop'], 
									$param['nop_landaddress'], 
									$param['nop_kelurahan'], 
									$param['nop_kecamatan'], 
									$param['nop_rtrw'], 
									$param['nop_city_id'], 
									$param['njop_landsize'], 
									$param['njop_buildingsize'], 
									$param['njop_landprice'], 
									$param['njop_buildingprice'], 
									$param['njop_landpbb'], 
									$param['njop_buildingpbb'], 
									$param['njop_totalpbb'], 
									$param['njop_hargajual'], 
									$param['njop_jenisphtb'], 
									$param['hgb_no'], 
									$param['npop'], 
									$param['npoptkp'], 
									$param['npopkp'], 
									$param['bphtb_persen'], 
									$param['bphtb_value'], 
									$param['warishibah'], 
									$param['bphtb_bayar'], 
									$param['totalbayar_persen'], 
									$param['totalbayar_value'], 
									$param['pthgbcode'], 
									$param['akunpajakcode'], 
									$param['jenissetorcode'], 
									$param['tax_year'], 
									$param['notes'], 
									$this->session->getUserId(), 
									'1'
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function sspssbUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $serahterimaplan_date = '';
				$serahterimaplan_month = 0;
				
				if($param['radio_st_group'] == 'radio_tgl_st'){
					$serahterimaplan_date = $param['serahterimaplan_date'];
				}else if($param['radio_st_group'] == 'radio_bln_st'){
					$serahterimaplan_month = $param['serahterimaplan_month'];
				}
				
                $affectedRow = $this->execSP('sp_sspssb_update', 
									$param['sspssb_id'], 
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId(),
									$param['unit_id'], 
									$param['purchaseletter_id'], 
									$param['wajibpajak_name'], 
									$param['wajibpajak_address'], 
									$param['wajibpajak_npwp'], 
									$param['wajibpajak_kelurahan'], 
									$param['wajibpajak_kecamatan'], 
									$param['wajibpajak_rtrw'], 
									$param['wajibpajak_city_id'], 
									$param['wajibpajak_zipcode'], 
									$param['nop'], 
									$param['nop_landaddress'], 
									$param['nop_kelurahan'], 
									$param['nop_kecamatan'], 
									$param['nop_rtrw'], 
									$param['nop_city_id'], 
									$param['njop_landsize'], 
									$param['njop_buildingsize'], 
									$param['njop_landprice'], 
									$param['njop_buildingprice'], 
									$param['njop_landpbb'], 
									$param['njop_buildingpbb'], 
									$param['njop_totalpbb'], 
									$param['njop_hargajual'], 
									$param['njop_jenisphtb'], 
									$param['hgb_no'], 
									$param['npop'], 
									$param['npoptkp'], 
									$param['npopkp'], 
									$param['bphtb_persen'], 
									$param['bphtb_value'], 
									$param['warishibah'], 
									$param['bphtb_bayar'], 
									$param['totalbayar_persen'], 
									$param['totalbayar_value'], 
									$param['pthgbcode'], 
									$param['akunpajakcode'], 
									$param['jenissetorcode'], 
									$param['tax_year'], 
									$param['notes'], 
									$this->session->getUserId(), 
									'1'
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function sspssbDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'sspssb_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_sspssb_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>