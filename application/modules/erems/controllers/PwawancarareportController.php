<?php

class Erems_PwawancarareportController extends Erems_Models_App_Controller {

    function readAction() {
        $app= new Erems_Models_App_Models_ReadReport($this);
       
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr){
            case "init":
               
                $app->attachParams("kpr",Erems_Models_App_Config::getv("PRICETYPEID_KPR"));
                $app->doStandartInit();
                break;
            case "bank":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Bank());
                break;
           
        }
         
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }
    
    

}

?>
