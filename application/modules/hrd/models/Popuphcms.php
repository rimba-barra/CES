<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Popuphcms extends Zend_Db_Table_Abstract {
    private $setting = null;

    function init() {
        $this->setting = new Hrd_Models_General_Setup();
        $this->setting->_storeprocedure = 'sp_popup_read';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                switch ($this->setting->_param['mode_read']) {
                    case 'searching':
                        $result = $this->setting->executeSP();
                        $counter = count($result[0]);
                        $data = $result[0];
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $data = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['mode_read'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
