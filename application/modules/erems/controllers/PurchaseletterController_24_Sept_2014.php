<?php

class Erems_PurchaseletterController extends Erems_Models_App_Controller {

    function readAction() {
        $app = new Erems_Models_App_Models_ReadWorms($this);
     //   $app = new Erems_Models_App_Models_ReadWorms($this,"read_collector");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr) {

            case "all":
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb','clusterb', 'blockb', 'productcategory', 'type','salesman', 'collector','customer'), array('deletedRows'));
                $app->registerDataList('purchaseletter', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                $hasil = $dao->getAll($r, $pl);
                $app->setRequestModel(TRUE);
                $app->prosesDao("purchaseletter", $hasil);
                break;
            case "detail":
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran','unitstatus','clusterb', 'blockb', 'productcategory', 'type', 'salesman','citraclub','mediapromotion','saleslocation', 'collector', 'price', 'billingrulestran'));
                $app->registerDataList('purchaseletter', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                $pl->setArrayTable($app->getData());
                $hasil = $dao->getOne($pl->getId());

                $app->setRequestModel(TRUE);
                $app->prosesDao("purchaseletter", $hasil);
                break;
            case "selected_customer":
                $dataList = new Erems_Models_App_DataListCreator('', 'customerprofile', array());
                $app->registerDataList('customer', $dataList);
                $dao = new Erems_Models_Master_CustomerDao();
                $hasil = $dao->getById($r);
                $app->setRequestModel(TRUE);
                $app->prosesDao("customer", $hasil);
                break;
            case "selected_unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Unit_UnitDao();
                $unit = new Erems_Models_Unit_Unit();
                $unit->setArrayTable($app->getData());
                $hasil = $dao->getOne($unit);

                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "unit":
                $dataList = new Erems_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Unit_UnitDao();
                $unitTran = new Erems_Models_Unit_UnitTran();
                $unitTran->setProject($app->getSession()->getProject());
                $unitTran->setPt($app->getSession()->getPt());
                $unitTran->setStatus(Erems_Models_App_Config::getv("UNITSTATUS_STOCK"));
                $hasil = $dao->getAll($r, $unitTran);

                // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("unit", $hasil);
                break;
            case "customerlist":
                $dataList = new Erems_Models_App_DataListCreator('', 'customer', array());
                $app->registerDataList('customer', $dataList);
                $dao = new Erems_Models_Master_CustomerDao();
                $hasil = $dao->getAll();
                $app->setRequestModel(TRUE);
                $app->prosesDao("customer", $hasil);
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
            case "schedule":
                $dataList = new Erems_Models_App_DataListCreator('', 'schedule', array('scheduletype'));
                $app->registerDataList('schedule', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                $pl->setArrayTable($app->getData());
                $hasil = $dao->getScheduleById($pl);
              
                $app->setRequestModel(TRUE);
                $app->prosesDao("schedule", $hasil);
                break;
            case "salesman":
                $dataList = new Erems_Models_App_DataListCreator('', 'salesman', array());
                $app->registerDataList('salesman', $dataList);
                $hasil = array();
                $dao = new Erems_Models_Hrd_EmployeeDao();
                $employee = new Erems_Models_Sales_Salesman();
                $employee->setProject($app->getSession()->getProject());
                $employee->setPt($app->getSession()->getPt());
                
               
                $hasil = $dao->getAll($employee);
                $app->setRequestModel(TRUE);
                $app->prosesDao("salesman", $hasil);
                break;
            case "collector":
               
                $dataList = new Erems_Models_App_DataListCreator('', 'collector', array());
                $app->registerDataList('collector', $dataList);
                $hasil = array();
                $dao = new Erems_Models_Hrd_EmployeeDao();
                $employee = new Erems_Models_Sales_Collector();
                $employee->setProject($app->getSession()->getProject());
                $employee->setPt($app->getSession()->getPt());
                $hasil = $dao->getAll($employee);
                $app->setRequestModel(TRUE);
                $app->prosesDao("collector", $hasil);
                break;
            case "citraclub":
             
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_CitraClub());
                break;
            case "saleslocation":
            
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_SalesLocation());
                break;
            case "mediapromotion":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_MediaPromotion());
                break;
            case "bank":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Bank());
                break;
            case "billingrules":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_BillingRules());
                break;
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
    //    $app = new Erems_Models_App_Models_Create($this, "create_customer");
        $msg = "Invalid Request";
        $success = FALSE;
        $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $app->prosesData($purchaseletter);

        /* validate */
        $validator = new Erems_Models_Purchaseletter_Validator();
        $validator->run($purchaseletter);

        if ($validator->getStatus()) {

            $dao = new Erems_Models_Unit_UnitDao();
            $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
            $price = new Erems_Models_Purchaseletter_PriceCalculator();
            $unit = new Erems_Models_Unit_UnitTran();
            $unitDb = $dao->getOne($purchaseletter->getUnit());
            $unit->setArrayTable($unitDb[1][0]);
            $price->setUnit($unit);
            $price->setPurchaseLetter($purchaseletter);
            $price->process();
            if ($purchaseletter->getId() == 0) {
                $purchaseletter->setAddBy($app->getSession()->getUser()->getId());
                $purchaseletter->getUnit()->setStatus(Erems_Models_App_Config::getv("UNITSTATUS_SOLD"));
                $purchaseletter->setNomor(Erems_Models_App_DocPrefixGenerator::get("PCHLR"));
                $hasil = 0;
                
               
                
                $scheduleGenerator = new Erems_Models_Purchaseletter_ScheduleGenerator();
                $scheduleGenerator->run($purchaseletter);
                
                foreach($scheduleGenerator->getResult() as $row){
                    $purchaseletter->addSchedule($row);
                }

                $de = new Erems_Libraries_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($purchaseletter);
                $de->generate();
                
                $hasil = 0;
              
                $hasil = $plDao->save($purchaseletter,$purchaseletter->getPrice(),$purchaseletter->getPriceAdmin());

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
        // $success = $validator->getStatus();

        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    function updateAction() {
        $this->createAction();
    }

    function deleteAction() {
        $app = new Erems_Models_App_Models_Delete($this);
        $app->setIdProperty('customer_id');
        $app->execute(new Erems_Models_Master_CustomerDao());
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->debugFunct();
    }

}

?>