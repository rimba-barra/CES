<?php

class Erems_SpkmainController extends Erems_Models_App_Controller {
    
    

    function readAction() {
        
        
       
        
    }

    function createAction() {
       
    }

    function updateAction() {
        
    }

    function deleteAction() {
        
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->purchaseLetter();
    }

}

?>