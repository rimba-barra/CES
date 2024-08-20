<?php

class Erems_Models_Townplanning extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_unit';
    protected $session;
    protected $dbTable;
    
    
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    // protected $dbTable;
    // function __construct() {
    //     $this->dbTable = new Erems_Box_Models_Dbtable_Db();
     
    // }

    function townplanningRead($param) {
        $return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_unit_count',$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['cluster_id'],$param['unit_number'],$param['productcategory_id'],$param['type_id'],$param['block_id'],$param['position_id'],$param['side_id'],$param['purpose_id'],$param['state_admistrative'],$param['progress_min'],$param['progress_max'],$param['start'], $param['limit']);
                $resultdata = $this->execSP('sp_unit_read',$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['cluster_id'],$param['unit_number'],$param['productcategory_id'],$param['type_id'],$param['block_id'],$param['position_id'],$param['side_id'],$param['purpose_id'],$param['state_admistrative'],$param['progress_min'],$param['progress_max'],$param['start'], $param['limit'],$param['unit_id']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
    
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function townplanningCreate($param = array()) {
        $return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_unit_create',$param['cluster_id'],$param['unit_number'],$param['productcategory_id'],$param['type_id'],$param['block_id'],$param['position_id'],$param['side_id'],$param['purpose_id'],$param['land_size'],$param['building_size'],$param['floor_size'],$param['floor'],$param['bedroom'],$param['bathroom'],$param['electricity'],$param['width'],$param['long'],$param['kelebihan'],$param['is_hookcalculated'],$param['is_tamancalculated'],$param['depan'],$param['samping'],$param['belakang'],$param['description'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $this->session->getUserId(),$param['state_admistrative'],$param['konsepdasar'],$param['progress']);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
               var_dump($e);
            }
        }
        return $return;
    }

    function townplanningUpdate($param = array()) {
        $return['success'] = false;
      
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_unit_update',$param['unit_id'],$param['unit_number'], $param['cluster_id'],$param['productcategory_id'],$param['type_id'],$param['block_id'],$param['position_id'],$param['side_id'],$param['purpose_id'],$param['land_size'],$param['building_size'],$param['floor_size'],$param['floor'],$param['bedroom'],$param['bathroom'],$param['electricity'],$param['width'],$param['long'],$param['kelebihan'],$param['is_hookcalculated'],$param['is_tamancalculated'],$param['depan'],$param['samping'],$param['belakang'],$param['description'],$param['state_admistrative'],$param['konsepdasar'],$param['progress'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                 var_dump($e->getMessage());
                var_dump($e); 
            }
        
          
        }
        return $return;
    }

    function townplanningInlineUpdate($param = array()) {
        $return['success'] = false;
        $table             = 'm_unit';
        $id                = 'unit_id';
        $id_value          = $param['id'];
        $collumn           = $param['collumn'];
        $collumn_value     = $param['value'];

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $this->session->getUserId());
                $return['success'] = (bool)count($affectedRow);
            } catch (Exception $e) {
                var_dump($e->getMessage());
                var_dump($e); 
            }
        }
        return $return;
    }

    function townplanningFloorUpdate($param = array()) {
        //$return['success'] = false;
        $return = 0;
        $id = $param['unit_id'];
        $floor = $param['floor'];


        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP3('sp_unit_floor_update', $id, $floor, $this->session->getUserId());
                // $result = $this->dbTable->SPExecute('sp_unit_floor_update', $id, $floor, $this->session->getUserId());
                //$return = $result[0];//  count($result[0]) > 0;
                $return = count($result[0]);
            } catch (Exception $e) {
                 var_dump($e->getMessage());
                var_dump($e); 
            }
        
          
        }
        return $return;
        // $hasil = false;

        // $hasil = $this->dbTable->SPExecute('sp_unit_floor_update', $id, $floor, $this->session->getUserId());
       
        
        // return $hasil;
    }

    function townplanningDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'unit_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
          
                if (is_array($val)) {
                    
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_unit_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    // added by rico 08032023
    function updatePTdanTanah($param = array()){
        $return['success'] = false;
        $json    = json_decode($param['rows']);
        $id = is_array($json) ? implode($json, "~"): $json;

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_pt_tanah_update', 
                    $id, 
                    $param['is_cluster'], 
                    $param['pt_id'], 
                    $param['tanahcode_pt_id'],
                    $this->session->getUserId(),
                    $param['tanahcode2_pt_id']
                );
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                print_r($e);
            }
        }
        return $return;   
    }

    // added by rico 04042023
    function getPT($param = array()){
        $return['success'] = false;

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_app_pt', 
                    $param['pt_id']
                );
                $return['data'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                print_r($e);
            }
        }
        return $return;   
    }

}

?>
