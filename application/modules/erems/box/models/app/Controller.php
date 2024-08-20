<?php


abstract class Erems_Box_Models_App_Controller extends Zend_Controller_Action {  
   protected $requestor;
   function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('kouti', 'library/kouti', 'Kouti');
       
        
        $x = new Erems_Box_Kouti_Requestor();
        $this->requestor = $this->selectedRequestor($x);
    }
    
    public function getRequestor(){
        return $this->requestor;
    }
    
    abstract protected function selectedRequestor(Erems_Box_Kouti_Requestor $requestor);
   
}

?>
