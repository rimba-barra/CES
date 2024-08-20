<?php

class Erems_PindahkavlingController extends Erems_Models_App_Controller {

    function readAction() {
        $app = new Erems_Models_App_Models_ReadWorms($this);
      //  $app = new Erems_Models_App_Models_ReadWorms($this,"read_unit");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr) {
            case "all":
                break;
            case "detail":
                $dataList = new Erems_Models_App_DataListCreator('', 'changekavling', array());
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Unit_UnitDao();
                $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "unit_sold":
                $dataList = new Erems_Models_App_DataListCreator('', 'unitb', array());
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Unit_UnitDao();
                $unitTran = new Erems_Models_Unit_UnitTran();
                $unitTran->setProject($app->getSession()->getProject());
                $unitTran->setPt($app->getSession()->getPt());
                $unitTran->setStatus(Erems_Models_App_Config::getv("UNITSTATUS_SOLD"));
                $hasil = $dao->getAll($r, $unitTran);
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
           
            case "selected_new_unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('pricetype', 'price'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $unit = new Erems_Models_Unit_Unit();
                $unit->setArrayTable($app->getData());
      
                $hasil = $dao->getOneChangePriceRequested($unit);
            
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "selected_sold_unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('pricetype','customer', 'unitb', 'salesman', 'collector', 'price', 'billingrulestran'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $unit = new Erems_Models_Unit_Unit();
                $unit->setArrayTable($app->getData());
      
                $hasil = $dao->getOneChangePriceRequested($unit);
            
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "price":
                $dataList = new Erems_Models_App_DataListCreator('', 'price', array('unit', 'pricetype'));
                $app->registerDataList('price', $dataList);
                $dao = new Erems_Models_Unit_UnitDao();
                $unit = new Erems_Models_Unit_Unit();
                $unit->setArrayTable($app->getData());
                $hasil = $dao->getPrice($unit->getId());
                $app->setRequestModel(TRUE);
                $app->prosesDao("price", $hasil);
                break;
            case "movereason":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_ChangeMoveReason());
                break;
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
      //  $app = new Erems_Models_App_Models_Create($this, "create_customer");
        $msg = "Invalid Request";
        $success = FALSE;
         
        $changeKavling = new Erems_Models_Sales_Change_ChangeKavling();
        $app->prosesData($changeKavling);
        
      
 
        
        /* validate */
        $validator = new Erems_Models_Sales_Change_Validator();
        $validator->runChangeKavling($changeKavling);

        if ($validator->getStatus()) {
            
           
            
            if ($changeKavling->getId() == 0) {
                $hasil = 0;
                
                $dao = new Erems_Models_Sales_Change_Dao();
                $changeKavling->setAddBy($app->getSession()->getUser()->getId());
                $changeKavling->setProject($app->getSession()->getProject());
                $changeKavling->setPt($app->getSession()->getPt());
                
                $hasil = $dao->saveCK($changeKavling);
               
                if ($hasil == 0) {
                    $msg = "Something problem when saving your data";
                } else {
                    $msg = "SUCCESS";
                    $success = TRUE;
                }
            }
        } else {
            $msg = $validator->getMsg();
        }

        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    function updateAction() {
        
    }

    function deleteAction() {
        
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }

}

?>