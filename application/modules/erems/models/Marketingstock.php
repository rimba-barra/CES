<?php

class Erems_Models_Marketingstock extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_marketstock';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function marketingstockRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_marketingstock_count',$param['cluster_id'],$param['unit_number'],$param['productcategory_id'],$param['type_id'],$param['block_id'],$param['position_id'],$param['side_id'],$param['purpose_id'],$param['state_admistrative'],$param['progress_min'],$param['progress_max']);
                $resultdata = $this->execSP('sp_marketingstock_read',$param['cluster_id'],$param['unit_number'],$param['productcategory_id'],$param['type_id'],$param['block_id'],$param['position_id'],$param['side_id'],$param['purpose_id'],$param['state_admistrative'],$param['progress_min'],$param['progress_max'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function marketingstockCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_marketingstock_create', $param['list_unit_id'], $param['tunjangan_uangmuka'], $param['hargatanah_njop'], $param['harga_KPR']['total'], $param['harga_TUNAI']['total'], $param['harga_INHOUSE']['total'], $this->session->getUserId(),$param['serahterima_plan'], '1~2~3', $param['tanahpermeter'], $param['kelebihantanah'], $param['harga_tanah'], $param['harga_kelebihantanah'], $param['harga_bangunan'], $param['harga_jualdasar'], $param['persen_dischargedasar'], $param['harga_dischargedasar'], $param['persen_dischargetanah'], $param['harga_dischargetanah'], $param['persen_dischargebangunan'], $param['harga_dischargebangunan'], $param['harga_neto'], $param['persen_ppntanah'], $param['harga_ppntanah'], $param['persen_ppnbangunan'], $param['harga_ppnbangunan'], $param['harga_bbnsertifikat'], $param['harga_bphtb'], $param['harga_bajb'], $param['harga_jual']
                );

                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function marketingstockReadPrice($param = array()) {

        //
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

                $resultdata = $this->execSP('sp_marketingstock_readprice', $param['unit_id']);

                $return['total'] = 3;
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function marketingstockUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_marketingstock_update',
                        $param['marketstock_id'],
                        $param['unit_id'],
                        $param['tunjangan_uangmuka'],
                        $param['hargatanah_njop'], 
                        $param['harga_KPR']['total'], 
                        $param['harga_TUNAI']['total'], 
                        $param['harga_INHOUSE']['total'],
                        $this->session->getUserId(),
                        $param['serahterima_plan'],
                        '1~2~3', 
                        $param['tanahpermeter'],
                        $param['kelebihantanah'],
                        $param['harga_tanah'], 
                        $param['harga_kelebihantanah'],
                        $param['harga_bangunan'],
                        $param['harga_jualdasar'],
                        $param['persen_dischargedasar'], 
                        $param['harga_dischargedasar'],
                        $param['persen_dischargetanah'], 
                        $param['harga_dischargetanah'], 
                        $param['persen_dischargebangunan'], 
                        $param['harga_dischargebangunan'], 
                        $param['harga_neto'], 
                        $param['persen_ppntanah'], 
                        $param['harga_ppntanah'], 
                        $param['persen_ppnbangunan'],
                        $param['harga_ppnbangunan'], 
                        $param['harga_bbnsertifikat'], 
                        $param['harga_bphtb'], 
                        $param['harga_bajb'], 
                        $param['harga_jual']
                        
                        );
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function marketingstockReadUnitDetail($param = array()){
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_marketingstock_readunitdetail', $param['unit_id']);

                $return['total'] = 1;
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function marketingstockDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'marketstock_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_marketingstock_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function marketingstockUpdateDeleteReason($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param))
        {

            $key_name = 'marketstock_id';
            $reason = 'Deletereason_id';
            $desc = 'Deletereason_desc';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            $param[$reason] = isset($param[$reason]) ? $param[$reason] : '';
            $param[$desc] = isset($param[$desc]) ? $param[$desc] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                     $param[$reason] .= $val[$reason] . ',';
                     $param[$desc] .= $val[$desc] . ',';

                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            $param[$reason] = preg_replace('/(,)$/', '', $param[$reason]);
            $param[$desc] = preg_replace('/(,)$/', '', $param[$desc]);
            try {
                $data = array (
                    $param['marketstock_id'],
                    $param['Deletereason_id'],
                    $this->session->getUserId()
                );

                //$result = $this->execSP3('sp_marketingstock_reason_delete', $data); 
                $result = $this->execSP('sp_marketingstock_destroy', $param[$key_name], $param[$reason], $param[$desc],$this->session->getUserId(),Erems_Box_Config::UNITSTATUS_STOCK,  Erems_Box_Config::UNITSTATUS_AVAILABLE);
                $return['data'] = $result;          
                $return['success'] = true;        
            } catch(Exception $e) 
            {  }
        }       
        return $return;
    }
	
	function marketingstockInsertLogSF($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_api_salesforce_logs', $param);
				$return['data'] = $result;
				$return['success'] = true;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

}

?>