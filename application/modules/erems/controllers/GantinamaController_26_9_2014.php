<?php

class Erems_GantinamaController extends Erems_Models_App_Controller {

    function readAction() {
       $app = new Erems_Models_App_Models_ReadWorms($this);
        // $app = new Erems_Models_App_Models_ReadWorms($this,"read_unit");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr) {

            case "all":
                $dataList = new Erems_Models_App_DataListCreator('', 'changename', array('purchaseletter','unitb','changenamereason',array('customer','customernew_'),array('customer','customerold_')));
                $app->registerDataList('data', $dataList);
                $dao = new Erems_Models_Sales_Change_Dao();
                $unit = new Erems_Models_Unit_UnitTran();
                $unit->setProject($app->getSession()->getProject());
                $unit->setPt($app->getSession()->getPt());
                
                $hasil = $dao->getAll($unit,$r);
                $app->setRequestModel(TRUE);
                $app->prosesDao("data", $hasil);
                break;
            case "detail":
                $dataList = new Erems_Models_App_DataListCreator('', 'changename', array());
                $app->registerDataList('data', $dataList);
               
                $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("data", $hasil);
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
                $dataList = new Erems_Models_App_DataListCreator('', 'purchaseletter', array('unit','customerprofile','cluster'));
                $app->registerDataList('unit', $dataList);
                $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
                $unit = new Erems_Models_Unit_Unit();
                $unit->setArrayTable($app->getData());
               // $unit->setId(3010);
                $hasil = $dao->getOneByUnit($unit);
            
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
            case "selected_customer":
                $dataList = new Erems_Models_App_DataListCreator('', 'customerprofile', array());
                $app->registerDataList('customer', $dataList);
                $dao = new Erems_Models_Master_CustomerDao();
                $hasil = $dao->getById($r);
                $app->setRequestModel(TRUE);
                $app->prosesDao("customer", $hasil);
                break;
            case "changenamereason":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_ChangeNameReason());
                break;
            
        }
        $app->run();
    }

    function createAction() {
        $app = new Erems_Models_App_Models_Create($this);
   //     $app = new Erems_Models_App_Models_Create($this, "create_customer");
        $msg = "Invalid Request";
        $success = FALSE;
        $changename = new Erems_Models_Sales_Change_ChangeName();
        $app->prosesData($changename);

        /* validate */
        $validator = new Erems_Models_Sales_Change_Validator();
        $validator->runChangeName($changename);

        if ($validator->getStatus()) {

            
            if ($changename->getId() == 0) {
               
                
                $hasil = 0;
                $dao = new Erems_Models_Sales_Change_Dao();
                $changename->setAddBy($app->getSession()->getUser()->getId());
                $hasil = $dao->saveCN($changename);
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