<?php


abstract class Master_Box_Models_App_Controller extends Zend_Controller_Action {  
   protected $requestor;
   function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('kouti', 'library/kouti', 'Kouti');
       
        
        $x = new Master_Box_Kouti_Requestor();
        $this->requestor = $this->selectedRequestor($x);
    }
    
    public function getRequestor(){
        return $this->requestor;
    }
    
    abstract protected function selectedRequestor(Master_Box_Kouti_Requestor $requestor);
   
}

?>
