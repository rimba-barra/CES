<?php

class Erems_ChangepriceController extends Erems_Models_App_Controller {

    function readAction() {
        $app = new Erems_Models_App_Models_ReadWorms($this);
     //   $app = new Erems_Models_App_Models_ReadWorms($this,"read_unit");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr) {
            case "all":
                break;
            case "detail":
                $dataList = new Erems_Models_App_DataListCreator('', 'changeprice', array('purchaseletter','pricetype','type',array('price','pricenew_')));
                $app->registerDataList('unit', $dataList);
                $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "unit":
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
            case "selected_unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('pricetype','customer', 'unittran', 'salesman', 'collector', 'price', 'billingrulestran','type'));
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
            case "type":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Type());
                break;
        }
        $app->run();
    }

    function createAction() {
         $app = new Erems_Models_App_Models_Create($this);
      //  $app = new Erems_Models_App_Models_Create($this, "create_customer");
        $msg = "Invalid Request";
        $success = FALSE;
         
        $changePrice = new Erems_Models_Sales_Change_ChangePrice();
        $app->prosesData($changePrice);
        
 
        
        /* validate */
        $validator = new Erems_Models_Sales_Change_Validator();
        $validator->runChangePrice($changePrice);

        if ($validator->getStatus()) {
            
           
            $price = new Erems_Models_Purchaseletter_PriceCalculator();
            $unit = new Erems_Models_Unit_UnitTran();
            $pl = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
            $unit = new Erems_Models_Unit_UnitTran();
            $unit->setPropertyInfo($changePrice->getPropertyInfo());
            $pl->setPrice($changePrice->getNewPrice());
            
           
            $pl->setPriceAdmin($changePrice->getPriceAdmin());
            
          
     
            $price->setUnit($unit);
            $price->setPurchaseLetter($pl);
            $price->process();
            
            if ($changePrice->getId() == 0) {
                $hasil = 0;
                $changePrice->setAddBy($app->getSession()->getUser()->getId());
                $dao = new Erems_Models_Sales_Change_Dao();
                $hasil = $dao->saveCP($changePrice,$pl->getPrice(),$pl->getPriceAdmin(),$pl);
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