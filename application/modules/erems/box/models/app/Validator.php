<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
abstract class Erems_Box_Models_App_Validator {
    /*@string*/
    private $msg;
    /*@boolean*/
    private $status;
    private $validateObject;
    private $digitValidator;
    protected $dao;
    
    public function __construct() {
        $this->msg = "Unknown Error.";
        $this->status = FALSE;
        $this->digitValidator = new Zend_Validate_Digits();
    }
    
    public function getMsg() {
        return $this->msg;
    }

    public function setMsg($msg) {
        $this->msg = (string)$msg;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = (boolean)$status;
    }
    
    protected function isDigit($value){
        return $this->digitValidator->isValid($value);
    }
    
    public function getDao() {
        return $this->abDao;
    }

    public function setDao(Erems_Box_Models_App_AbDao $abDao) {
        $this->abDao = $abDao;
    }

    public function getStorage($index=-1) {
        if($index > -1){
            return $this->storage[$index];
        }
        return $this->storage;
    }

    public function addToStorage($x) {
        $this->storage[] = $x;
    }
    
    public function setCurrentSession($session){
        $this->currentSession = $session;
    }
}

?>
