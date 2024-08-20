<?php

class Erems_Models_Masterattribute extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'mh_attribute';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterattributeRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_attribute_count', $param['code'], $param['attribute'], $param['description'], $param['atttype_id']);
                $resultdata = $this->execSP('sp_attribute_read', $param['code'], $param['attribute'], $param['description'], $param['atttype_id'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterattributeCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if($param['detail_id']==NULL){
                    $affectedRow = $this->execSP('sp_attribute_create', $param['code'], $param['attribute'], $param['description'], $param['is_freetext'],$param['datatype'],$param['is_default'],$param['atttype_id'], $this->session->getUserId(), 
                        //added by anas 28042021
                        $param['urut'] < 0 ? '0' : $param['urut']

                    );
                }else{
                    $affectedRow = $this->execSP('sp_attribute_create', $param['code'], $param['attribute'], $param['description'], $param['is_freetext'],$param['datatype'],$param['is_default'],$param['atttype_id'], $this->session->getUserId(), 
                        //added by anas 28042021
                        $param['urut'] < 0 ? '0' : $param['urut'],
                        //end added
                        $param['detail_id'],$param['detail_code'],$param['detail_attributevalue'],$param['detail_is_default'],$param['detail_description']
                    );
                }
                
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterattributeUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if($param['detail_id']==NULL){
                    $affectedRow = $this->execSP('sp_attribute_update', $param['attribute_id'], $param['code'], $param['attribute'], $param['description'],$param['is_freetext'],$param['datatype'],$param['is_default'], $param['atttype_id'], $this->session->getUserId(), 
                        //added by anas 28042021
                        $param['urut'] < 0 ? '0' : $param['urut']
                    );
                }else{
                       $affectedRow = $this->execSP('sp_attribute_update', $param['attribute_id'], $param['code'], $param['attribute'], $param['description'],$param['is_freetext'],$param['datatype'],$param['is_default'], $param['atttype_id'], $this->session->getUserId(), 
                            //added by anas 28042021
                            $param['urut'] < 0 ? '0' : $param['urut'],
                            //end added
                            $param['detail_id'],$param['detail_code'],$param['detail_attributevalue'],$param['detail_is_default'],$param['detail_description']
                    );
                
                }
                
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterattributeDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'attribute_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_attribute_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterattributeatttypeRead($param) {
        $return['success'] = false;
        $this->_name = 'm_atttype';

        try {
            $resultcount = $this->execSP('sp_atttype_count');
            $resultdata = $this->execSP('sp_atttype_read');

            $return['total'] = $resultcount[0]['RECORD_TOTAL'];

            $return['data'] = $resultdata;
            $return['success'] = true;
        } catch (Exception $e) {
            var_dump($e->getMessage());
        }
        return $return;
    }
    
    function masterattributeDetailRead($param){
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_attributevalue_count',$param['attribute_id']);
                $resultdata = $this->execSP('sp_attributevalue_read', $param['attribute_id']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                //  var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function masterattributeDeleteRead($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'attributevalue_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_attributevalue_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function masterattributeUpdateDetail($param = array()) {
        $this->_name = 'md_attributevalue';
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_attributevalue_update',$param['attributevalue_id'],$param['code'],$param['attributevalue'],$param['description'],$param['is_default'],$this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
