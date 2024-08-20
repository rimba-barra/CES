<?php

class Gl_Models_Dailyjurnaltransaction extends Zend_Db_Table_Abstract {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
    }  
    function Create($param) {        
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        //$result = $this->_helperdata->rangeActiveYear();
                        $result = $this->_helperdata->rangeCurrentYear();
                        break;
                    case 'getcoabyid':
                         $counter = 0;                        
                         $result = $this->_model->getcoabyid($param['coa_id']);     
                      break;
                     
                    default:
                          $counter = 0;
                          $result = null;
                     break;
                }
                
                if ($param['hideparam'] == 'default') {
                    $count = 0;
                    $msg = " ";
                } else {
                    $count = $counter;
                    $msg = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }
}
