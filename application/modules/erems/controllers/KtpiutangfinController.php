<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_KtpiutangfinController extends ApliController {

    public function excelRead() {


        $hasil = FALSE;
        $msg = "";

        $session = Apli::getSession();
        
        $params = $this->getRequest()->getPost();


        $fileName = $session->getProject()->getId() . "_" . $session->getPt()->getId() . "_" . $session->getUser()->getId() . "" . time();
        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $fileName . '.xlsx';

        $jsonExcel = new Erems_Models_Library_ExcelKtPiutangFin();
        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/KtPiutangFin.xlsx';
        
        
        // get data
        $dao = new Erems_Models_Ktpiutangfin_Dao();
        $kartupiutangAcc = $dao->all(intval($params["unit_id"]),1,99999);
        
        $purcDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
      
        $kartuPiutangHEader = $purcDao->getKartuPiutang2(intval($params["purchaseletter_id"]));


        $hasil = $jsonExcel->process($excelFile,$kartupiutangAcc[1],$kartuPiutangHEader[0][0]);

        if ($hasil) {
            $url = "app/erems/uploads/msexcel/" . $fileName . ".xlsx";
        } else {
            $msg = $jsonExcel->msg;
        }


        return Apli::instantRead(array(
                    "HASIL" => $hasil,
                    "MSG" => $msg,
                    "URL" => $url
        ));
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start / $params["limit"]) + 1 : 1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);

        $sesBox = Apli::getSession();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'ktpiutangfin', array('unitb', 'clusterb'), array());

        $dao = new Erems_Models_Ktpiutangfin_Dao();
        $hasil = $dao->all(intval($params["unit_id"]), $eremsReq->getPage(), $eremsReq->getLimit());


        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function initRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();




        return array(
            "data" => array()
        );
    }

    public function deleteRead() {

        $session = Apli::getSession();

        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Ktpiutangfin_Dao();

        $kpf = new Erems_Models_Ktpiutangfin_Ktpiutangfin();
        $kpf->setArrayTable($params);
        $hapus = $dao->delete($session->getUser()->getId(), $kpf);

        return array(
            "data" => $hapus
        );
    }

    public function saveRead() {


        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();

        $kartupiutangs = json_decode($params["data"], true);

        $delimiterAr = Apli::generateDelimiterArray($kartupiutangs);


        $dao = new Erems_Models_Ktpiutangfin_Dao();
        $hasilSave = $dao->save($session->getUser()->getId(), $session->getProject()->getId(), $session->getPt()->getId(), $delimiterAr);





        return array(
            "HASIL" => $hasilSave
        );
    }
    
    public function updateRead() {


        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();

        $ktpiutang = new Erems_Models_Ktpiutangfin_Ktpiutangfin();
        $ktpiutang->setArrayTable($params);
       
        $dao = new Erems_Models_Ktpiutangfin_Dao();
        $hasilSave = $dao->update($session->getUser()->getId(), $session->getProject()->getId(), $session->getPt()->getId(), $ktpiutang);

        return array(
            "HASIL" => $hasilSave
        );
    }

    public function panelinitRead() {

        $session = Apli::getSession();

        $params = $this->getRequest()->getPost();
        $msg = "";
        $hasil = FALSE;

        $dbParams = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->glDbParamsKtpiutangFin();

        $glConnect = new Erems_Models_Ktpiutangfin_Glconnect();
        // set tahun database
        $dbParams["dbname"] = str_replace("[TAHUN]", intval($params["year"]), $dbParams["dbname"]);
        $hasilDb = $glConnect->process($dbParams, intval($params["start"]), intval($params["limit"]));
        if (!$hasilDb) {
            $msg = $glConnect->errorMessage;
        } else {

            $dm = new Erems_Box_Models_App_Hermes_DataModel();
            $dataList = new Erems_Box_Models_App_DataListCreator('', 'gljurnal', array(), array());

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);

            $totalRow = $glConnect->totalData;
            $dataJurnal = array();
            // var_dump($glConnect->hasilQuery);
            foreach ($glConnect->hasilQuery as $k => $v) {

                $dataJurnal[] = array(
                    "gljurnal" => $v
                );
            }


            return array(
                "model" => Apli::generateExtJSModel($dm->getDataList()),
                "data" => $dataJurnal,
                "totalRow" => $totalRow
            );
        }


        return array(
            "msg" => $msg,
            "hasil" => $hasil
        );
    }

    public function panelinit2Read() {

        $session = Apli::getSession();

        $params = $this->getRequest()->getPost();
        $msg = "";
        $hasil = FALSE;

        // cluster
        $cDao = new Erems_Models_Master_ClusterDao();
        $c = new Erems_Models_Master_ClusterTran();
        $c->setProject($session->getProject());
        $c->setPt($session->getPt());
        $cAll = $cDao->getByProjectPtWOPL($c);


        $cDataModel = Apli::getDataModel($cAll, "cluster");

        //unit 
        $uDao = new Erems_Models_Unit_UnitDao();
        $u = new Erems_Models_Unit_UnitTran();
        $u->setProject($session->getProject());
        $u->setPt($session->getPt());
        $req = new Erems_Box_Models_App_HasilRequestRead(array());
        $req->setLimit(99999);
        $uAll = $uDao->getByProjectPtWitPage($u, $req);
        $uDataModel = Apli::getDataModel($uAll, "unit", array("clusterb"));

        // var_dump($cDataModel);

        return array(
            "maindata" => array(
                "cluster" => $cDataModel,
                "unit" => $uDataModel
            )
        );
    }

    public function purchaselistRead() {


        $session = Apli::getSession();

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start / $params["limit"]) + 1 : 1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub'), array());

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        //  $this->setArrayTable($pl, $this->getAppData());

        $hasil = $dao->getAllKrtPiutangFin($eremsReq, $session, $pl, $params["cluster_id"], $params["unit_id"]);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

}
