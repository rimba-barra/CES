<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Helpers_Defaultdata extends Zend_Controller_Action_Helper_Abstract {

    public function generalData() {
        $setup = new Cashier_Models_General_Setdata();
        $masterproject = $setup->get_defaultproject();
        $masterpt = $setup->get_defaultpt();
        $masteruserlogin = $setup->getUserdata();
        $return['project_id'] = $masterproject['project_id'];
        $return['project_code'] = $masterproject['code'];
        $return['project_name'] = $masterproject['name'];
        $return['pt_id'] = $masterpt['pt_id'];
        $return['pt_code'] = $masterpt['code'];
        $return['pt_name'] = $masterpt['name'];
        $return['user_id'] = $masteruserlogin['user_id'];
        $return['user'] = $masteruserlogin['user_fullname'];
        $return['userprint'] = $masteruserlogin['user_fullname'];
        $return['user_email'] = $masteruserlogin['user_email'];
        $return['currentdate'] = date('Y-m-d');
        $return['computername'] = getenv('COMPUTERNAME');
        $return['computer_ip'] = $this->get_client_ip();
        return $return;
    }

    function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if (getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if (getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if (getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if (getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if (getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

}
