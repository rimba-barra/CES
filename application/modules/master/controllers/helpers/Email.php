<?php

/* --------------------------------------------------
  17-11-2016
  Helper for send email
  Modified by Ahmad Riadi , originial resource erems mail
 * 
  ---------------------------------------------------- */

class Master_Helpers_Email extends Zend_Controller_Action_Helper_Abstract {
    public $maildata;
    public $param_smtp;
    public $param_status;
    public $param_message;
    public $param_error;
    public $emailserver;
    public $emailuser;
    public $emailuserpassword;

    public function __construct() {
        //TLS = tcp://    use port 25
        //SSL = ssl://    use port 465 or 587
        $this->emailserver = 'smtp.office365.com';
        $this->emailuser = 'no.reply@ciputra.com';
        $this->emailuserpassword = 'VaC46914';
        $this->typeauth = 'login';
        $this->typeconnection = 'tls';
        $this->connectiontype = 'ssl';
        $this->port = 587;

        $this->param_smtp = new Zend_Mail_Transport_Smtp($this->emailserver, array(
            $this->connectiontype => $this->typeconnection, //example  'ssl' => 'tls',
            'port' => $this->port,
            'auth' => $this->typeauth,
            'username' => $this->emailuser,
            'password' => $this->emailuserpassword,
        ));
        Zend_Mail::setDefaultTransport($this->param_smtp);
        $this->maildata = new Zend_Mail();
    }

    public function getStatus() {
        return $this->param_status;
    }

    public function getError() {
        return $this->param_error;
    }

    public function setData() {
        return $this->maildata;
    }

}
