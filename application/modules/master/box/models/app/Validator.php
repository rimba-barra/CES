<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
abstract class Master_Box_Models_App_Validator {
    /* @string */

    private $msg;
    /* @boolean */
    private $status;
    private $validateObject;
    private $digitValidator;
    protected $dao;
    public $appRequest;
    public $session;
    public $action;
    public $controller;
    public $paramdata;
    private $returnId;
    private $total;

    public function __construct() {
        $this->msg = "Unknown Error.";
        $this->status = FALSE;
        $this->returnId = 0;
        $this->digitValidator = new Zend_Validate_Digits();
    }

    public function getMsg() {
        return $this->msg;
    }

    public function setMsg($msg) {
        $this->msg = (string) $msg;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = (boolean) $status;
    }
    public function getReturnId() {
        return $this->returnId;
    }

    public function setReturnId($returnId) {
        $this->returnId = $returnId;
    }
    function getTotal() {
        return $this->total;
    }

    function setTotal($total) {
        $this->total = $total;
    }

            protected function isDigit($value) {
        return $this->digitValidator->isValid($value);
    }

    public function getDao() {
        return $this->abDao;
    }

    public function setDao(Master_Box_Models_App_AbDao $abDao) {
        $this->abDao = $abDao;
    }

}

?>
