<?php

class Erems_Models_Mastertype extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'mh_type';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function mastertypeRead($param) {
        $return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                //$resultcount = $this->execSP('sp_type_count', $param['productcategory_id'],$param['cluster_id'],$param['name'], $param['building_class'], $param['salesgroup'],$param['bot_electricity'],$param['top_electricity']);
                $resultdata = $this->execSP('sp_type_read',$param['productcategory_id'],$param['cluster_id'],$param['name'], $param['building_class'], $param['salesgroup'],$param['bot_electricity'],$param['top_electricity'],$param['bot_land_size'],$param['top_land_size'],$param['bot_floor'],$param['top_floor'],$param['bot_building_size'],$param['bot_bedroom'],$param['top_bedroom'],$param['bot_floor_size'],$param['top_floor_size'],$param['bot_bathroom'],$param['top_bathroom'],$param['top_building_size'],$param['start'],$param['limit']);

               // $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['total'] = 10;
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {

                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function mastertypeCreate($param = array()) {
        $return['success'] = false;
      
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_type_create', $param['code'],$param['productcategory_id'], $param['cluster_id'],$param['name'], $param['land_size'], $param['building_size'], $param['floor'], $param['floor_size'],$param['bedroom'],$param['bathroom'],$param['electricity'],$param['building_class'], $param['salesgroup'], $param['description'],$this->session->getUserId(),$param['detail_id'],$param['detail_attribute_id'],$param['detail_attributevalue_id'],$param['detail_attributevalue']);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function mastertypeUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_type_update',$param['type_id'],$param['code'],$param['productcategory_id'], $param['cluster_id'],$param['name'], $param['land_size'], $param['building_size'], $param['floor'], $param['floor_size'],$param['bedroom'],$param['bathroom'],$param['electricity'],$param['building_class'], $param['salesgroup'], $param['description'],$this->session->getUserId(),$param['detail_id'],$param['detail_attribute_id'],$param['detail_attributevalue_id'],$param['detail_attributevalue']);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function mastertypeDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'type_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_type_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function mastertypedetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_typeattribute_count',$param['type_id']);
                $resultdata = $this->execSP('sp_typeattribute_read', $param['type_id']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                //  var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function mastertypedetailDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'typeattribute_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_typeattribute_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function mastertypedetailUpdate($param = array()) {
        $this->_name = 'md_typeattribute';
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_typeattribute_update',$param['typeattribute_id'],$param['attribute_id'],$param['attributevalue_id'],$param['attributevalue'],$this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
