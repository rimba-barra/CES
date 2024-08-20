<?php

/**
 * Description of Model
 *
 * @author MIS
 */
abstract class Box_Models_App_AbModel {

    private $moapp;
    /* @boolean */
    private $requestor;
    private $controller;
    private $innerHasil;
    private $storedObject; /* added 23 Mei 2014*/

    public function __construct($controller, $debug = '') {
        $this->isDebug = $debug;
        $this->controller = $controller;
        $this->requestor = $controller->getRequestor();
        $this->innerHasil = $this->getHasil();
        $this->moapp = new Box_Models_App_Box($this->selectGetPost($debug));
    }

    protected function getInnerHasil() {
        return $this->innerHasil;
    }

    protected function setInnerHasil($innerHasil) {
        $this->innerHasil = $innerHasil;
    }

    public final function run() {
        $moapp = $this->moapp;
        $this->prosesHasilBeforeRun();
        $moapp->setHasil($this->innerHasil);
        $moapp->run($this->controller);
		
    }

    public function getData() {
        return $this->moapp->getData();
    }

    protected function prosesHasilBeforeRun() {
        
    }

    private function selectGetPost($debug) {

        $gri = $this->getRequestorItem($debug);
        if (!$gri) {
            $gp = $this->getPost($this->controller);
        } else {
            $gp = $gri;
        }

        return $gp;
    }
    
    public function getSession(){
        return $this->moapp->getSession();
    }

    private function getRequestorItem($s) {

        $a = $this->requestor;

        $ns = FALSE;

        if (strlen($s) > 0 && is_array($a)) {

            $ar = explode('_', $s);

            $jAr = count($ar);
            switch ($jAr) {
                case 1:
                    $ns = array_key_exists($ar[0], $a) ? $a[$ar[0]] : FALSE;
                case 2:
                    if (array_key_exists($ar[0], $a)) {
                        if (array_key_exists($ar[1], $a[$ar[0]])) {
                            $ns = $a[$ar[0]][$ar[1]];
                        }
                    }
            }
        }

        return $ns;
    }
    
    public function getStoredObject() {
        return $this->storedObject;
    }

    public function setStoredObject($storedObject) {
        $this->storedObject = $storedObject;
    }
    
    protected function getMoapp(){
        return $this->moapp;
    }



    abstract protected function getHasil();

    abstract protected function getPost(Zend_Controller_Action $controller);
}

?>
