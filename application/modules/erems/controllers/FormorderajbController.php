<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_FormorderajbController extends ApliController {
    
 
    
    
    public function detailRead(){
        $params = $this->getRequest()->getPost();
        
        $dao = new Erems_Models_Formorderajb_Dao();
        $fa = new Erems_Models_Formorderajb_FormOrderAJB();

        $fa->setId($params["formorderajb_id"]);

        return array(
            "formorderajb"=>$dao->getOne($fa->getId()),
        );
    }
    
    public function hapusRead(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Formorderajb_Dao();
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        $ids = array(intval($params["formorderajb_id"]));
        $ids = implode("~", $ids);
      
      //  $decan->set
        $hapus = $dao->delete($ids,$sesBox);
        
        return array(
            "status"=>$hapus
        );
    }

    public function allRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start/$params["limit"])+1:1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'formorderajb', array('cluster', 'block', 'unitb','customer'), array());
        $dao = new Erems_Models_Formorderajb_Dao();
        $fa = new Erems_Models_Formorderajb_FormOrderAJB();
        $fa->setArrayTable($params);
        $fa->setProject($sesBox->getProject());
        $fa->setPt($sesBox->getPt());
        


        $hasil = $dao->getAll($eremsReq, $fa);
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



        // $sesBox = new Erems_Box_Models_App_Session();
        // $sesBox->getProject()->setId($session->getCurrentProjectId());
        // $sesBox->getPt()->setId($session->getCurrentPtId());




        // $mc = new Erems_Models_App_Masterdata_Cluster();
        // $ac = $mc->prosesDataWithSession($sesBox, TRUE);



        // $pmDao = new Erems_Models_Master_AppDao();
        // $pmdl = new Erems_Box_Models_App_DataListCreator('', 'paymentmethod', array(), array());
        // $pmDlData = $pmDao->getAllPaymentMethod();

        // $blDao = new Erems_Models_Master_BlockDao();
        // $bldl = new Erems_Box_Models_App_DataListCreator('', 'blockb', array(), array());
        // $bl = new Erems_Models_Master_BlockTran();
        // $bl->getProject()->setId($session->getCurrentProjectId());
        // $bl->getPt()->setId($session->getCurrentPtId());
     
        // $blData = $blDao->getByCPP($bl);

        // $clDao = new Erems_Models_Master_ClusterDao();
        // $cl = new Erems_Models_Master_ClusterTran();
        // $cl->getProject()->setId($session->getCurrentProjectId());
        // $cl->getPt()->setId($session->getCurrentPtId());
        // $cldl = new Erems_Box_Models_App_DataListCreator('', 'clusterb', array(), array());
        // $clData  = $clDao->getByProjectPt($cl);
       // var_dump($clDao->getByProjectPt($cl));

        $fileReport     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getCurrentProjectId(), $session->getCurrentPtId())->getListajbFileName();


        return array(
            "data"=> array(
                // "paymentmethods" => array(
                //     "model" => Apli::generateExtJSModel($pmdl),
                //     "data" => $pmDlData[1],
                // ),
                // "blocks" => array(
                //     "model" => Apli::generateExtJSModel($bldl),
                //     "data" => $blData[1],
                // ),
                // "clusters" => array(
                //     "model" => Apli::generateExtJSModel($cldl),
                //     "data" => $clData[1],
                // ),
                "file_report" => $fileReport
            )
        );
    }

    public function saveRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"],TRUE);
    
        
    
        
      //  $data["payment"] =  preg_replace('/[,]+/', '', $data["payment"]);
        

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $formOrder = new Erems_Models_Formorderajb_FormOrderAJB();
        $formOrder->setArrayTable($data);
        $formOrder->setProject($sesBox->getProject());
        $formOrder->setPt($sesBox->getPt());
        



        //  var_dump($payment->getPurchaseLetterId());


        $validator = new Erems_Models_Formorderajb_Validator();
        $validator->run($formOrder);
        $validator->setSession(new Erems_Box_Models_App_Session());
        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Formorderajb_Dao();
            $hasilSave = 0;
            if($formOrder->getId() > 0){
                $hasilSave = $dao->update($formOrder);
            }else{
                $hasilSave = $dao->save($formOrder);
            }
            

            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan form order ajb.";
            }else{
                $status = TRUE;
            }

            // var_dump($hasilSave);
        }



        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

    public function selectedsoldunitRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId(intval($params["purchaseletter_id"]));

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());



        return array(
            "DATA" => $dao->getOne($pl->getId())
        );
    }

    public function soldunitlistRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        if(!isset($params["unit_number"])){
            $params["unit_number"] = "";
        }

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $eremsReq->setPage($params["page"]);
        $eremsReq->setLimit($params["limit"]);

        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        //   $unitTran->setArrayTable($data);
        $unitTran->getProject()->setId($session->getCurrentProjectId());
        $unitTran->getPt()->setId($session->getCurrentPtId());
        $unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->setNumber($params["unit_number"]);
        $unitTran->getBlock()->setId(0);
        $hasil = $dao->getAllLunas($eremsReq, $unitTran);

        return array(
            "DATA" => $hasil
        );
    }
    
    public function pdfprintRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        
       $hasil = FALSE;
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        
        
        $dao = new Erems_Models_Formorderajb_Dao();
        $fa = new Erems_Models_Formorderajb_FormOrderAJB();

        $fa->setId($params["formorderajb_id"]);
        $formOrderAjb = $dao->getOne($fa->getId());
        $formOrderAjb = $formOrderAjb[1][0];
        $dataForm = array();
        $dataFormReplace = array();
        foreach ($formOrderAjb as $k=>$v){
            if($k=="formorderajb_date" || $k=="penerima_date"){
                $v = Erems_Box_Tools::formatDate($v);
            }
            if($k=="biaya_ajbbbn" || $k=="biaya_bphtb"){
                $v = number_format($v, 2);
            }
            $dataForm[] = "{{".$k."}}";
            $dataFormReplace[] = $v;
        }
        
        //var_dump($dataForm);
        
      
        
        
        $pdf = new Erems_Models_Library_TemplateformajbPdf();
      //  $pdf->baseUrl = ;
        $baseUrl  = $this->view->serverUrl() . $this->view->baseUrl();
        
        
        $pdf->run($sesBox,$formOrderAjb,$dataForm,$dataFormReplace,$baseUrl);
        $hasil = TRUE;
     
        
        

        return array(
            "STATUS" => $hasil,
            "URL"=>$baseUrl."/".$pdf->getFileName()
        );
    }


}
