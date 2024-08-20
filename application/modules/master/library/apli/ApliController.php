<?php

require_once 'Apli.php';

/**
 * Description of ApliController
 *
 * @author TOMMY-MIS
 */
class ApliController extends Zend_Controller_Action{
    function readAction() {
        $apli = new Apli();
        $apli->read($this);
    }
    
    function updateAction() {
        $apli = new Apli();
        $apli->update($this);
    }
    
    function createAction() {
        $apli = new Apli();
        $apli->create($this);
    }
    
    function deleteAction() {
        $apli = new Apli();
        $apli->delete($this);
      
    }
 
    
    
    function noRender(){
        $this->_helper->viewRenderer->setNoRender(true);
    }
}
