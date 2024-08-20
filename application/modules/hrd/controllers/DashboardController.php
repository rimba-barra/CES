<?php

class Hrd_DashboardController extends Zend_Controller_Action {
    public $_model = null;
    private $_session = null;
    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $project_id =  $this->_session->getCurrentProjectId();
        $pt_id =  $this->_session->getCurrentPtId();        
        $user_id = $this->_session->getUserId();
        $module_id = $this->_session->getCurrentModuleId();      

        $session_ces = $user_id.'~'.$project_id.'~'.$pt_id.'~dashboard_projectpt';
        $session_ces = $this->sEncrypt($session_ces);
        
        header("Location: https://intranet.ciputragroup.com/syshrdv2/index.php/dashboardces?menow=" . $session_ces);
        die();
        
        // echo Zend_Json::encode($result);
        // $this->view->variable_name = "variable value";
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function sEncrypt($text)
    {
            $salt = date('dMY')."*20nEVX\69t09@A4a>/Us78g";
            $text = $salt . $text;
            $data =  trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
            return base64_encode($data);
    }

}

?>
