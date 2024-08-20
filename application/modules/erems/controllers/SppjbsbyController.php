<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_SppjbsbyController extends ApliController {
    
 
    
    
    public function detailRead(){
        $params = $this->getRequest()->getPost();
        
        $dao = new Erems_Models_Legal_SPPJBDao();
        $sppjb = new Erems_Models_Legal_SPPJBSby();

        $sppjb->setId($params["sppjb_id"]);

        return array(
            "sppjbsby"=>$dao->getOne($sppjb->getId()),
        );
    }
    
    public function hapusRead(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Legal_SPPJBDao();
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        $ids = array(intval($params["sppjb_id"]));
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'sppjbsby', array(), array());
        $dao = new Erems_Models_Legal_SPPJBDao();
        $sppjb = new Erems_Models_Legal_SPPJBSby();
        $sppjb->setArrayTable($params);
        $sppjb->setProject($sesBox->getProject());
        $sppjb->setPt($sesBox->getPt());
        


        $hasil = $dao->getAll($eremsReq, $sppjb);
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



        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());




        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($sesBox, TRUE);



        $pmDao = new Erems_Models_Master_AppDao();
        $pmdl = new Erems_Box_Models_App_DataListCreator('', 'paymentmethod', array(), array());
        $pmDlData = $pmDao->getAllPaymentMethod();

        $blDao = new Erems_Models_Master_BlockDao();
        $bldl = new Erems_Box_Models_App_DataListCreator('', 'blockb', array(), array());
        $bl = new Erems_Models_Master_BlockTran();
        $bl->getProject()->setId($session->getCurrentProjectId());
        $bl->getPt()->setId($session->getCurrentPtId());
     
        $blData = $blDao->getByCPP($bl);

        $clDao = new Erems_Models_Master_ClusterDao();
        $cl = new Erems_Models_Master_ClusterTran();
        $cl->getProject()->setId($session->getCurrentProjectId());
        $cl->getPt()->setId($session->getCurrentPtId());
        $cldl = new Erems_Box_Models_App_DataListCreator('', 'clusterb', array(), array());
        $clData  = $clDao->getByProjectPt($cl);
       // var_dump($clDao->getByProjectPt($cl));


        return array(
            "data"=> array(
                "paymentmethods" => array(
                    "model" => Apli::generateExtJSModel($pmdl),
                    "data" => $pmDlData[1],
                ),
                "blocks" => array(
                    "model" => Apli::generateExtJSModel($bldl),
                    "data" => $blData[1],
                ),
                "clusters" => array(
                    "model" => Apli::generateExtJSModel($cldl),
                    "data" => $clData[1],
                )
            )
        );
    }

    public function saveRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"],TRUE);
    

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $sppjb = new Erems_Models_Legal_SPPJBSby();
        $sppjb->setArrayTable($data);
        $sppjb->setProject($sesBox->getProject());
        $sppjb->setPt($sesBox->getPt());
        $sppjb->setModiBy($session->getUserId());
        
        
        $validator = new Erems_Models_Legal_SPPJBValidator();
        $validator->run($sppjb);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Legal_SPPJBDao();
            $hasilSave = 0;
      
            $hasilSave = $dao->save($sppjb);
         

            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan SPPJB.";
            }else{
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }
    
    public function updateRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"],TRUE);
    

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $sppjb = new Erems_Models_Legal_SPPJBSby();
        $sppjb->setArrayTable($data);
        $sppjb->setProject($sesBox->getProject());
        $sppjb->setPt($sesBox->getPt());
        $sppjb->setModiBy($session->getUserId());
        
        
        $validator = new Erems_Models_Legal_SPPJBValidator();
        $validator->run($sppjb);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Legal_SPPJBDao();
            $hasilSave = 0;
      
            $hasilSave = $dao->update($sppjb);
         

            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan SPPJB.";
            }else{
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

    public function paramsppjboneRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();


        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $eremsReq->setPage($params["page"]);
        $eremsReq->setLimit($params["limit"]);
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        
        $spparam = new Erems_Models_Legal_ParameterSPPJB();
        $spparam->setId($params["parametersppjb_id"]);

        $dao = new Erems_Models_Master_GeneralDao();
        $hasil = $dao->getParameterSPPJB($eremsReq, $sesBox->getProject()->getId(),$sesBox->getPt()->getId(),$spparam);


        return array(
            "DATA" => $hasil
        );
    }

    public function paramsppjblistRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();


        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $eremsReq->setPage($params["page"]);
        $eremsReq->setLimit($params["limit"]);
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        
        $paramsSPPJB = new Erems_Models_Legal_ParameterSPPJB();
        $paramsSPPJB->setArrayTable($params);

        $dao = new Erems_Models_Master_GeneralDao();
        $hasil = $dao->getParameterSPPJBb($eremsReq, $sesBox->getProject()->getId(),$sesBox->getPt()->getId(),$paramsSPPJB);


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
        $sppjb = new Erems_Models_Formorderajb_FormOrderAJB();

        $sppjb->setId($params["sppjb_id"]);
        $sppjbAjb = $dao->getOne($sppjb->getId());
        $sppjbAjb = $sppjbAjb[1][0];
        $dataForm = array();
        $dataFormReplace = array();
        foreach ($sppjbAjb as $k=>$v){
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
        
        
        $pdf->run($sesBox,$sppjbAjb,$dataForm,$dataFormReplace,$baseUrl);
        $hasil = TRUE;
     
        
        

        return array(
            "STATUS" => $hasil,
            "URL"=>$baseUrl."/".$pdf->getFileName()
        );
    }


}
