<?php


abstract class Gl_Box_Models_App_Controller extends Zend_Controller_Action {  
   protected $requestor;
   function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('kouti', 'library/kouti', 'Kouti');
        $x = new Gl_Box_Kouti_Requestor();
        $this->requestor = $this->selectedRequestor($x);
    }
    
    public function getRequestor(){
        return $this->requestor;
    }
    
    abstract protected function selectedRequestor(Gl_Box_Kouti_Requestor $requestor);
   
}

?>
