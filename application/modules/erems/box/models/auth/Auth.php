<?php

/**
 * Description of Auth
 *
 * @author MIS
 */
class Erems_Box_Models_Auth_Auth {
    
    private $options;
    
    public function __construct() {
        $this->options = Zend_Registry::get('main_config');
    }

    public function ldapLogin($user, $pass) {
        $options = array(
            'host' => $this->options['apps']['login']['ldap']['host'],
            'port' => $this->options['apps']['login']['ldap']['port'],
            'username' => 'UID=' . $user . $this->options['apps']['login']['ldap']['user']['username'],
            'password' => $pass,
            'baseDn' => $this->options['apps']['login']['ldap']['baseDn'],
            'accountDomainName' => $this->options['apps']['login']['ldap']['accountDomainName'],
            'accountDomainNameShort' => $this->options['apps']['login']['ldap']['accountDomainNameShort']
        );
        $ldap = new Zend_Ldap($options);
        $ldap->_protocol = 3;
        try {
            $ldap->bind();
            $ldap->disconnect();
            return true;
        } catch (Zend_Ldap_Exception $e) {
            return false;
        }
    }

}

?>
