<?php

class Erems_Models_Masterformula extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_billingrules';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterformuladetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['billingrules_id']
				);
				$result = $this->execSP3('sp_billingrulesdetail_read', $data);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch(Exception $e) { }
		}
		return $return;
    }

    function masterformulaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_billingrules_count', $param['code'],$param['pricetype_id'],$param['active'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
                $resultdata = $this->execSP('sp_billingrules_read', $param['code'],$param['pricetype_id'], $param['start'], $param['limit'],$param['active'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterformulaCreate($param = array()) {
        $return['success'] = false;
        $dataDetail = $param['details'];
//        var_dump($param); die();
        if (is_array($param) && count($param)) {
            try {
                $billingrulesballoon_id = '';
                $term_angsuran = '';
                $persen = '';
                $schedule_type_balloon = '';
                $periode_angsuran = '';
                $type_periode_angsuran = '';
                $billingrules_id = '';
                $deleted = '';
                foreach ($dataDetail as $idx => $data) {
                    foreach ($data as $key => $value) {
                        switch($key){
                            case 'billingrulesballoon_id' : $billingrulesballoon_id .=intval($value).'~';break;
                            case 'term_angsuran' : $term_angsuran .=intval($value).'~';break;
                            case 'persen' : $persen .=$value.'~';break;
                            case 'schedule_type_balloon' : $schedule_type_balloon .=intval($value).'~';break;
                            case 'periode_angsuran' : $periode_angsuran .=intval($value).'~';break;
                            case 'type_periode_angsuran' : $type_periode_angsuran .=intval($value).'~';break;
                            case 'billingrules_id' : $billingrules_id .=intval($value).'~';break;
                            case 'deleted' : $deleted .=$value.'~';break;
                        }
                    }
                }
                $billingrulesballoon_id = preg_replace('/(~)$/','',$billingrulesballoon_id);
                $term_angsuran = preg_replace('/(~)$/','',$term_angsuran);
                $persen = preg_replace('/(~)$/','',$persen);
                $schedule_type_balloon = preg_replace('/(~)$/','',$schedule_type_balloon);
                $periode_angsuran = preg_replace('/(~)$/','',$periode_angsuran);
                $type_periode_angsuran = preg_replace('/(~)$/','',$type_periode_angsuran);
                $billingrules_id = preg_replace('/(~)$/','',$billingrules_id);
                $deleted = preg_replace('/(~)$/','',$deleted);
                if($param['billingrules_id'] == 0){
                    $affectedRow = $this->execSP('sp_billingrules_create', $param['code'],$param['description'],$param['pricetype_id'],$param['persen_tandajadi'],$param['tandajadi'],$param['persen_uangmuka'],$param['uangmuka'],$param['periode_uangmuka'],$param['type_periode_uangmuka'],$param['term_uangmuka'],$param['periode_angsuran'],$param['type_periode_angsuran'],$param['term_angsuran'],$param['Active'],$this->session->getUserId(), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),
                        $param['is_balloon'], $billingrulesballoon_id, $term_angsuran, $persen, $schedule_type_balloon, $periode_angsuran, $type_periode_angsuran, $billingrules_id, $param['is_jeda'], $param['periode_jeda'], $param['type_periode_jeda'] 
                        );
                }else{
                    $affectedRow = $this->execSP('sp_billingrules_update', $param['billingrules_id'], $param['code'],$param['description'],$param['pricetype_id'],$param['persen_tandajadi'],$param['tandajadi'],$param['persen_uangmuka'],$param['uangmuka'],$param['periode_uangmuka'],$param['type_periode_uangmuka'],$param['term_uangmuka'],$param['periode_angsuran'],$param['type_periode_angsuran'],$param['term_angsuran'],$param['Active'], $this->session->getUserId(),
                     $billingrulesballoon_id, $term_angsuran, $persen, $schedule_type_balloon, $periode_angsuran, $type_periode_angsuran, $billingrules_id, $deleted, $param['is_jeda'], $param['periode_jeda'], $param['type_periode_jeda'] 
                    );
//                    $affectedRow = $this->execSP('sp_billingrules_update', $param['code'],$param['description'],$param['pricetype_id'],$param['persen_tandajadi'],$param['tandajadi'],$param['persen_uangmuka'],$param['uangmuka'],$param['periode_uangmuka'],$param['type_periode_uangmuka'],$param['term_uangmuka'],$param['periode_angsuran'],$param['type_periode_angsuran'],$param['term_angsuran'],$param['Active'],$this->session->getUserId(), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),
//                        $param['is_balloon'], $billingrulesballoon_id, $term_angsuran, $persen, $periode_angsuran, $type_periode_angsuran, $billingrules_id
//                        );
                }
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function masterformulaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_billingrules_update', $param['billingrules_id'], $param['code'],$param['description'],$param['pricetype_id'],$param['persen_tandajadi'],$param['tandajadi'],$param['persen_uangmuka'],$param['uangmuka'],$param['periode_uangmuka'],$param['type_periode_uangmuka'],$param['term_uangmuka'],$param['periode_angsuran'],$param['type_periode_angsuran'],$param['term_angsuran'],$param['Active'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
               
            }
        }
        return $return;
    }

    function masterformulaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'billingrules_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_billingrules_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
