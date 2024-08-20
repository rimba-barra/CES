<?php

abstract class Gl_Box_Kouti_AbApp {

    protected $session;
    private $data = array(); /// format akhirnya adalah array
    protected $hasil;
    private $err = NULL;

    public function __construct($jsonString = '') {
        $this->init();
        $this->prosesZendSession();

        $this->prosesStringJSON($jsonString);
    }

    public function run($controller) {

        $controller->getResponse()->setHeader('Content-Type', 'application/json');
        try {
            $arrayHasil = (array) $this->hasil->getTypeHasil();
            echo Zend_Json::encode($arrayHasil);
        } catch (Exception $e) {
            $this->setErr($e->getMessage());
        }
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer');
        $viewRenderer->setNoRender(true);
        // $this->_helper->viewRenderer->setNoRender(true);
    }

    public function getSession() {
        return $this->session;
    }

    public function getData() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = $data;
    }

    public function getHasil() {
        return $this->hasil;
    }

    public function setHasil(Gl_Box_Kouti_InterHasil $interHasil) {
        $this->hasil = $interHasil;
    }

    public function setSession(Gl_Box_Kouti_InterSession $interSession) {
        $this->session = $interSession;
    }

    protected final function prosesZendSession() {
        $ses = NULL;

        try {
            $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        } catch (Exception $e) {
            $this->setErr($e->getMessage());
        }

        $ourSes = $this->session;
        if ($ourSes instanceof Gl_Box_Kouti_InterSession) {
            if ($ses != NULL) {

                $ourSes->setSession('user', $ses->getUserId());
                $ourSes->setSession('pt', $ses->getCurrentPtId());
                $ourSes->setSession('project', $ses->getCurrentProjectId());
                
            }
        }
        

        $this->session = $ourSes;
    }

    protected function init() {
        /* configurasi variable */
    }

    /* updated 3 Dec 2013
     * @param string|array $jsonString
     * @return void
     */

    private final function prosesStringJSON($jsonString) {
        if (is_array($jsonString)) {
            $this->data = $jsonString;
        } else {
            $x = (string) $jsonString;
            try {
                $x = Zend_Json::decode($x);
            } catch (Exception $e) {
                $this->setErr($e->getMessage());
            }
            $this->data = $x;
        }
    }

    

    public function getErr() {
        return $this->err;
    }

    public function setErr($err) {
        $this->err = $err;
    }

}

?>
