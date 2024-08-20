<?php

class Erems_ProsessmsController extends Erems_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dao = new Erems_Models_Sms_Dao();
        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'sms', array('smscategory', 'clusterb', 'unitb', 'customer', 'employee','purchaseletter'), array()));
        $dm->setObject(new Erems_Models_Sms_SMS());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Sms_Validator());
        $dm->setIdProperty("sms_id");
        return $dm;
    }

    public function saveexcelRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $params = $this->getAppData();
        $dao = new Erems_Models_Sms_Dao();
        $all = $dao->getAllByPageLimit($params["page"],25, $this->getAppSession()->getProject()->getId(), 
                $this->getAppSession()->getPt()->getId(), $params["unit_number"], $params["customer_name"], $params["process_date"], $params["smscategory_id"]);


        $ps = new Erems_Models_Sms_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($all[1]);



        $msg = 'Export Excel';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function mainCreate() {

        $dao = new Erems_Models_Sms_Dao();

        $sms = new Erems_Models_Sms_SMS();
        $sms->getAddBy($this->getAppSession()->getUser()->getId());
        $sms->setProject($this->getAppSession()->getProject());
        $sms->setPt($this->getAppSession()->getPt());

        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject($sms);
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Sms_Validator());

        return $dm;
    }

    public function allRead() {
        $data = $this->getAppData();
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($this->getAppData());

            if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }

            $hasil = $dao->getAll($this->getAppRequest(), $obj, $data["unit_number"], $data["customer_name"], $data["process_date"], $data["smscategory_id"]);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }

    public function customerlistRead() {


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array());

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getAllByFilter($this->getAppRequest(), $this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function selectedcustomerRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city'));

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getById($this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function prosessmsRead() {




        $hasil = FALSE;
        $msg = "Proses...";


        $data = $this->getAppData();

        $dao = new Erems_Models_Sms_Dao();


        /// get detail sms kategori;
        $scFilter = new Erems_Models_Sms_SMSCategory();
        $scFilter->setId($data["smscategory_id"]);
        $scFilter->setProject($this->getAppSession()->getProject());
        $scFilter->setPt($this->getAppSession()->getPt());
        $sc = $dao->getSMSCategory($scFilter);
        $sc = Erems_Box_Tools::toObjectRow($sc, new Erems_Models_Sms_SMSCategory());

        $smsCategoryCode = $sc->getCode();


        // $smsCategoryCode = Erems_Box_Config::SMSCAT_WAWANCARA;
        $startDate = isset($data["start_date"]) ? $data["start_date"] : NULL;
        $endDate = isset($data["end_date"]) ? $data["end_date"] : NULL;


        $datediff = strtotime($startDate) - strtotime($endDate);
        $datediff = abs(floor($datediff / (60 * 60 * 24)));

        // 31 hari untuk 2 bulan.
        if ($datediff > (31*1)) {
            $msg = "Proses sms maksimal ".(31*1)." hari.";
        } else {
            $params = array(
                "smscategory_id" => $sc->getId(),
                "smscategory_code" => $smsCategoryCode,
                "process_date" => $data["process_date"],
                "project_id" => $this->getAppSession()->getProject()->getId(),
                "pt_id" => $this->getAppSession()->getPt()->getId(),
                "start_date" => $startDate,
                "end_date" => $endDate,
                "template" => $sc->getTemplate()
            );




            $builder = new Erems_Models_Sms_Builder();
            $allSms = $builder->proses($params);



            if (count($allSms) > 0) {


                $decan = Erems_Box_Tools::toDecan($allSms);

               

                $hasil = $dao->saveMultiSMS($this->getAppSession()->getUser()->getId(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $decan);
                if ($hasil) {
                    $msg = "Sukses";
                }
            } else {
                $msg = "No record.";
            }
        }





        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);



        //===== MASTERDATA == //
        $dao = new Erems_Models_Sms_Dao();
        $scFilter = new Erems_Models_Sms_SMSCategory();
        $scFilter->setProject($this->getAppSession()->getProject());
        $scFilter->setPt($this->getAppSession()->getPt());
        $allCategory = $dao->getAllSMSCategory($scFilter);
        $allCategory = Box_Tools::toObjectResult($allCategory, new Erems_Models_Sms_SMSCategory());


        $dm->setHasil(array($allCategory));


        return $dm;
    }

    public function processinitRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);







        //===== MASTERDATA == //
        $dao = new Erems_Models_Sms_Dao();
        $scFilter = new Erems_Models_Sms_SMSCategory();
        $scFilter->setProject($this->getAppSession()->getProject());
        $scFilter->setPt($this->getAppSession()->getPt());
        $allCategory = $dao->getAllSMSCategory($scFilter);

        $allCategory = Erems_Box_Tools::toObjectResult($allCategory, new Erems_Models_Sms_SMSCategory());


        /// collector 
        $edao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Collector();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());

        $allCollector = $edao->getAll($employee);

        $allCollector = Erems_Box_Tools::toObjectResult($allCollector, new Erems_Models_Sales_Collector());


        $smsLangsungId = 0;
        foreach ($allCategory as $cat) {
            if ($cat->getCode() == Erems_Box_Config::SMSCAT_SMSLSNG) {
                $smsLangsungId = $cat->getId();
            }
        }

        $otherParam = array(array(
                "SMSLANGSUNGID" => $smsLangsungId
        ));


        $dm->setHasil(array($otherParam, $allCategory, $allCollector));


        return $dm;
    }

}

?>
