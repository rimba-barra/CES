<?php

/**
 * Description of Tools
 *
 * @author MIS
 */
class Main_Box_Tools {
    ////// Add by Erwin.St 020822 for debug
    public static function generateShowExecSP($result){
        $session    = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $genco_main = New Main_Box_Genco();

        if(method_exists($genco_main, 'useridShowExecSP')){
            if(in_array($session->getUserId(), $genco_main->useridShowExecSP())){
                $result['exec_sp'] = implode(' || ', array_unique(Main_Box_GlobalParams::$EXEC_SP));
            }
        }

        return $result;
    }

    public static function debugExecuteSP($result){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

        if ( in_array($session->getUserId(), Main_Box_GlobalParams::$administrator_cashier) ) {
            $result['running'] = Main_Box_GlobalParams::$EXEC_SP;
        }

        return $result;
    }

    static function get_domain() {
        $url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME']) . '/');

        $pieces = parse_url($url);
        $domain = isset($pieces['host']) ? $pieces['host'] : $pieces['path'];
        if (preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{0,63}\.[a-z\.]{1,5})$/i', $domain, $regs)) {
            return $regs['domain'];
        }
        return false;
    }

    public function curl($url, $param_method='POST', $param_data=array(), $param_token_header=''){
        $curl_handle = curl_init();
        
        $httpHeader = array('Content-Type: application/x-www-form-urlencoded');
        if($param_token_header){
            $httpHeader = array_merge($httpHeader, array('Authorization: ' . $param_token_header));
        }

        $options = array(
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => FALSE,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => $param_method,
            CURLOPT_POSTFIELDS     => $param_data,
            CURLOPT_HTTPHEADER     => $httpHeader
        );

        curl_setopt_array($curl_handle, $options);
        $response = curl_exec($curl_handle);

        ///////////////////////////////////// Error CURL /////////////////////////////////////////////////////////
        // echo $httpcode = curl_getinfo($curl_handle, CURLINFO_HTTP_CODE).curl_error($curl_handle);
        // print_r($response);

        curl_close($curl_handle);

        return $response;
    }
}

?>
