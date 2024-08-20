<?php

class Erems_Models_Clusterfacilities extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'mh_projectfacilities';
    protected $session;
    protected $mydb = NULL;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $defaultConfig = $this->getAdapter()->getConfig();
        $this->mydb = new Zend_Db_Adapter_Sqlsrv(array(
            'host' => $defaultConfig['host'],
            'username' => $defaultConfig['username'],
            'password' => $defaultConfig['password'],
            'dbname' => 'erems'
        ));
    }

    function clusterfacilitiesRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_clusterfacilities_count', $param['code'], $param['clusterfacilities'], $param['description'],$param['cluster_id'],$param['facilitiestype_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
                $resultdata = $this->execSP('sp_clusterfacilities_read', $param['code'], $param['clusterfacilities'], $param['description'],$param['cluster_id'],$param['facilitiestype_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                //  var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function clusterfacilitiesCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if($param['detail_id']==NULL){
                   $affectedRow = $this->execSP('sp_clusterfacilities_create',$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['cluster_id'],$param['facilitiestype_id'],$param['code'],$param['clusterfacilities'],$param['layer_img'],$param['description'],$this->session->getUserId());
                }else{
                   $affectedRow = $this->execSP('sp_clusterfacilities_create',$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['cluster_id'],$param['facilitiestype_id'],$param['code'],$param['clusterfacilities'],$param['layer_img'],$param['description'],$this->session->getUserId(),$param['detail_id'],$param['detail_title'],$param['detail_image'],$param['detail_is_default'],$param['detail_description']); 
                }
                $return['success'] = (bool) $affectedRow;
                
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function clusterfacilitiesUpdate($param = array()) {
        $return['success'] = false;
     
     
        if (is_array($param) && count($param)) {
            try {
                if($param['detail_id']==NULL){
                  $affectedRow = $this->execSP('sp_clusterfacilities_update',$param['clusterfacilities_id'],$param['code'],$param['clusterfacilities'],$param['cluster_id'],$param['facilitiestype_id'],$param['layer_img'],$param['description'],$this->session->getUserId(),$this->session->getCurrentProjectId(), $this->session->getCurrentPtId());  
                }else{
                  $affectedRow = $this->execSP('sp_clusterfacilities_update',$param['clusterfacilities_id'],$param['code'],$param['clusterfacilities'],$param['cluster_id'],$param['facilitiestype_id'],$param['layer_img'],$param['description'],$this->session->getUserId(),$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['detail_id'],$param['detail_title'],$param['detail_image'],$param['detail_is_default'],$param['detail_description']);  
                }
                
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function clusterfacilitiesUpdateDetail($param = array()) {
        $this->_name = 'md_clusterfacilities_images';
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_clusterfacilities_images_update',$param['clusterfacilities_images_id'],$param['title'],$param['image'],$param['is_default'],$param['description'],$this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function clusterfacilitiesDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'clusterfacilities_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_clusterfacilities_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function clusterfacilitiesDeleteDetail($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'clusterfacilities_images_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_clusterfacilities_images_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function clusterfacilitiesImagesRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_clusterfacilities_images_count',$param['clusterfacilities_id']);
                $resultdata = $this->execSP('sp_clusterfacilities_images_read', $param['clusterfacilities_id']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                //  var_dump($e->getMessage());
            }
        }
        return $return;
    }

}