<?php

class Erems_GeneralsalesreportController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function initRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $creator = new Erems_Box_Models_App_Creator();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);


        $msg = '';


        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

        $mt = new Erems_Models_App_Masterdata_Type();
        $mt->setSes($this->getAppSession());
        $at = $mt->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterPC = new Erems_Models_App_Masterdata_ProductCategory();
        $allPC = $masterPC->prosesDataWithSession($this->getAppSession(), TRUE);

        /// salesman 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Salesman();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allSalesman = array();
        $this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

        $hasil = array();

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "DATA" => $hasil,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT, $ac, $at, $allPC, $allSalesman));


        return $dm;
    }

    public function printoutRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $msg = '';





        // $dao = new Erems_Models_Payment_Dao();
        $ses = $this->getAppSession();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $data = $this->getAppData();

        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($ses->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($ses->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);



        $hasil = array(
            'pt_id' => $ses->getPt()->getId(),
            'project_id' => $ses->getProject()->getId(),
            'buildingclass' => 'ALL',
            'cluster_id' => 0,
            'type_id' => 0,
            'productcategory_id' => 0,
            'unitstatus_id' => 0,
            'groupby' => 0,
            'Project' => $project->getName(),
            'Pt' => $pt->getName(),
            'date_bot' => $data["date_bot"],
            'date_top' => $data["date_top"]
        );

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "DATA" => $hasil,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function selectedsoldunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'city', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = array();
        /// check purchaseletter by unit id

        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $pHasil = $dao->getOneByUnit($unit);

        if (count($pHasil[1]) > 0) {
            $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
            $pl->setArrayTable($pHasil[1][0]);

            $hasil = $dao->getOne($pl->getId());
        }



        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    /*
    public function excelRead() {



        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $params = $this->getAppData();
        $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
        $hasil = FALSE;
        $msg = "";

        $url = FALSE;

        $variables = $this->getAppData();


        /// header info
        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);

        $variables["project"] = $project->getName();
        $variables["pt"] = $pt->getName();
        $variables["print_date"] = date("d-m-Y H:i:s");




        $dao = new Erems_Models_General_ReportDao();
        $sales = $dao->generalSales($projectId, $ptId, $salesmanId, $variables["buildingclass"], $variables["cluster_id"], $variables["type_id"], $variables["productcategory_id"], $variables["date_bot"], $variables["date_top"]);
        

        $fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
        $fp = fopen($jsonFile, 'w');
        
        
        fwrite($fp, json_encode($sales[0]));
        fclose($fp);
        unset($sales);
        unset($dao);


        // $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
       // $jsonExcel = new Erems_Models_Library_JSON2Excel();
       // $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/ReportSales.xlsx';
       // $jsonExcel->fieldAwal = "salesman";
       // $hasil = $jsonExcel->process($variables, $jsonFile, $excelFile);
        $hasil = 1;
        if ($hasil) {
            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
        } else {
            $msg = $jsonExcel->msg;
        }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url,
            "JSON"=>$fileName
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
     
     */
    
    
    public function excelRead() {



        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $params = $this->getAppData();
        $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
        $hasil = FALSE;
        $msg = "";

        $url = FALSE;

        $variables = $this->getAppData();


        /// header info
        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);

        $variables["project"] = $project->getName();
        $variables["pt"] = $pt->getName();
        $variables["print_date"] = date("d-m-Y H:i:s");




        $dao = new Erems_Models_General_ReportDao();
        $sales = $dao->generalSales($projectId, $ptId, $salesmanId, $variables["buildingclass"], $variables["cluster_id"], $variables["type_id"], $variables["productcategory_id"], $variables["date_bot"], $variables["date_top"]);
        

        $fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
        $fp = fopen($jsonFile, 'w');
        
        
        fwrite($fp, json_encode($sales[0]));
        fclose($fp);
        unset($sales);
        unset($dao);


        // $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
        $jsonExcel = new Erems_Models_Library_JSON2Excel();
        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/ReportSales.xlsx';
        $jsonExcel->fieldAwal = "salesman";
        $hasil = $jsonExcel->process($variables, $jsonFile, $excelFile);

        if ($hasil) {
            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
        } else {
            $msg = $jsonExcel->msg;
        }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
     
    
    public function excelcarabayarRead() {



        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $params = $this->getAppData();
        $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
        $hasil = FALSE;
        $msg = "";

        $url = FALSE;

        $variables = $this->getAppData();


        /// header info
        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);

        $variables["project"] = $project->getName();
        $variables["pt"] = $pt->getName();
        $variables["print_date"] = date("d-m-Y H:i:s");




        $dao = new Erems_Models_General_ReportDao();
        $sales = $dao->generalSalesCaraBayar($projectId, $ptId, $salesmanId, $variables["buildingclass"], $variables["cluster_id"], $variables["type_id"], $variables["productcategory_id"], $variables["date_bot"], $variables["date_top"]);
        
  

        $fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
        $fp = fopen($jsonFile, 'w');
        
        
        fwrite($fp, json_encode($sales[0]));
        fclose($fp);
        unset($sales);
        unset($dao);


        // $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
        $jsonExcel = new Erems_Models_Library_JSON2Excel();
        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/ReportSalesCaraBayar.xlsx';
        $jsonExcel->fieldAwal = "purchase_date";
        $hasil = $jsonExcel->process($variables, $jsonFile, $excelFile);

        if ($hasil) {
            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
        } else {
            $msg = $jsonExcel->msg;
        }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
    
    
    
    public function excelclubcitraRead() {



        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $params = $this->getAppData();
        $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
        $hasil = FALSE;
        $msg = "";

        $url = FALSE;

        $variables = $this->getAppData();


        /// header info
        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);

        $variables["project"] = $project->getName();
        $variables["pt"] = $pt->getName();
        $variables["print_date"] = date("d-m-Y H:i:s");




        $dao = new Erems_Models_General_ReportDao();
        $sales = $dao->generalSales($projectId, $ptId, $salesmanId, $variables["buildingclass"], $variables["cluster_id"], $variables["type_id"], $variables["productcategory_id"], $variables["date_bot"], $variables["date_top"]);
        

        $fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
        $fp = fopen($jsonFile, 'w');
        
        
        fwrite($fp, json_encode($sales[0]));
        fclose($fp);
        unset($sales);
        unset($dao);


        // $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
        $jsonExcel = new Erems_Models_Library_JSON2Excel();
        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/ReportSales.xlsx';
        $jsonExcel->fieldAwal = "salesman";
        $hasil = $jsonExcel->process($variables, $jsonFile, $excelFile);

        if ($hasil) {
            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
        } else {
            $msg = $jsonExcel->msg;
        }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>
