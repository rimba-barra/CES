<?php

class Erems_ReservationController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {      
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'reservation', array(), array(), array(),array("deletedRows"));
        $dao = new Erems_Models_Reservation_Dao();
        $unit = new Erems_Models_Unit_UnitTran();
        $unit->setProject($this->getAppSession()->getProject());
        $unit->setPt($this->getAppSession()->getPt());

        $data = $this->getAppData();

        //print_r($data);die();
        $salesman = (isset($data["salesman_id"])) ? $data["salesman_id"]: '';

        $hasil = $dao->getAllFillter($unit,$this->getAppRequest(),$data["reservation_no"],$data["unit_number"],$data["customer_name"], $salesman);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    
    public function initRead() {


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $params = array(
            "data_Reservation"=>array("productcategory_productcategory_id"=>0)
        );
        
        $template = array();
        $otherAT = array(array(
                
                "TEMPLATEPRINTOUT"=>$template
                
        ));

        $dm->setHasil(array($otherAT));

        return $dm;
    }

    public function detailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $AppData = $this->getAppData();

        $dao = new Erems_Models_Reservation_Dao();
        $hasil = $dao->getIsReservationAprovalExist($this->getAppSession()->getUser()->getId(),$this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());

        $dm->setHasil($hasil);


        return $dm;
    }

    public function maindetailRead() {
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'reservation', array(), array(), array(),array("deletedRows"));

        $appData = $this->getAppData();
        $dao = new Erems_Models_Reservation_Dao();
        
        $hasil = $dao->getOne($appData["reservation_id"]);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function comboboxesRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $appData = $this->getAppData();
        $dao = new Erems_Models_Reservation_Dao();
        $employee_dao = new Erems_Models_Hrd_EmployeeDao();
        
        $pricetype = array("pricetype"=>$dao->getPriceType());
        $mediapromotion = array("mediapromotion"=>$dao->getMediaPromotion());

        // added by rico 14022023
        $salesman = new Erems_Models_Sales_Salesman();
        $salesman->setProject($this->getAppSession()->getProject());
        $salesman->setPt($this->getAppSession()->getPt());
        $hasilsales = $employee_dao->getAll($salesman);
        $sales = array(0=>$hasilsales[1]);

        $arrayRespon = array_merge($pricetype,$mediapromotion, array("salesman"=>$sales));
        return Erems_Box_Tools::instantRead($arrayRespon, array());

        return $dm;
    }

    public function customerlistRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customer', array('city'));

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getAllByFilter($this->getAppRequest(),$this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function unitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));
        $data = $this->getAppData();
        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_STOCK);

        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getAllWoP($this->getAppRequest(), $unitTran);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function selectedunitRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));

        $dao = new Erems_Models_Unit_UnitDao();
        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $hasil = $dao->getOne($unit);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }


    public function mainCreate() {

        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $validator = new Erems_Models_Reservation_Validator();
        $validator->setSession($this->getAppSession());
        $validator->params = $this->getAppData(); 

        $obj = new Erems_Models_Reservation_Reservation();
        $dm->setDao(new Erems_Models_Reservation_Dao());

        $dm->setValidator($validator);
        $dm->setObject($obj);


        return $dm;
    }
    
    public function mainDelete() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Reservation_Reservation());
        $dm->setDao(new Erems_Models_Reservation_Dao());
        $dm->setIdProperty("reservation_id");
        return $dm;
    }

    public function browsedetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //

        $b = new Erems_Models_App_Masterdata_Block();
        $ab = $b->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($ab));

        return $dm;
    }

    public function checkAvailableUnitRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $AppData = $this->getAppData();
        $unitId=$AppData['unitId'];


        $dao = new Erems_Models_Reservation_Dao();
        $hasil = $dao->getAvailableUnit($unitId);

        $dm->setHasil($hasil);

        return $dm;
    }


    public function checkReservationDaysRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $AppData = $this->getAppData();

        $dao = new Erems_Models_Reservation_Dao();
        $hasil = $dao->getReservationDays($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());

        $dm->setHasil($hasil);

        return $dm;
    }


    public function printRead() {
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'reservation', array(), array(), array(),array("deletedRows"));

        $appData = $this->getAppData();
        $dao = new Erems_Models_Reservation_Dao();
        
        $hasil = $dao->getOne($appData["reservation_id"]);

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        $html = $genco->getReservationPrintTemplate()->getHTML();

        $params = $hasil[1][0];
        if($params['pricetype']=='KPR'){
            $params['hargajual'] = $params['hargajual_kpr'];
        }else if($params['pricetype']=='INHOUSE'){
            $params['hargajual'] = $params['hargajual_inhouse'];
        }else if($params['pricetype']=='CASH'){
            $params['hargajual'] = $params['hargajual_tunai'];
        }else{
            $params['hargajual'] = $params['hargajual_tunai'];
        }
        $params['hargajual'] = Erems_Box_Tools::toCurrency($params['hargajual']);
        $params['uang_titipan'] = Erems_Box_Tools::toCurrency($params['uang_titipan']);

        foreach (array_keys($params) as $key) {
            $html = str_replace("{".$key."}", $params[$key], $html);
        }

        $pdf = $genco->getReservationPrintTemplate()->createPDF($html, $appData["reservation_id"]);

        $arrayRespon = array(
            "HTML" => $html,
            "URL" => $pdf,
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());

    }


    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_ReservationProcessor();
    }

}

?>
