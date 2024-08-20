<?php

class Erems_PembayaranbcreportController extends Erems_Models_App_Controller {

    function readAction() {
        $app= new Erems_Models_App_Models_ReadReport($this);
      
          $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr){
            case "init":
                $app->doStandartInit();
                break;
        }
         
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }

}

?>
