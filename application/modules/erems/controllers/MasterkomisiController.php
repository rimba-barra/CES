<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_MasterkomisiController extends ApliController {
    
 
    
    
    public function detailRead(){
        $params = $this->getRequest()->getPost();
        
        $dao = new Erems_Models_Komisi_Master_Dao();
        $komisi = new Erems_Models_Komisi_Master_MasterKomisi();

        $komisi->setId($params["komisi_id"]);

        return array(
            "masterkomisi"=>$dao->getOne($komisi->getId()),
        );
    }
    
    public function hapusRead(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Komisi_Master_Dao();
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        $ids = array(intval($params["komisi_id"]));
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'komisi', array(), array());
        $dao = new Erems_Models_Komisi_Master_Dao();
        $komisi = new Erems_Models_Komisi_Master_MasterKomisi();
        $komisi->setArrayTable($params);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());
        


        $hasil = $dao->getAll($eremsReq, $komisi);
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
    
    public function forminitRead() {

        $session = Apli::getSession();
        
        $eremsReq = Apli::getRequest($this->getRequest()->getPost());



        $khDao = new Erems_Models_Komisi_Master_Dao();
        $khdl = new Erems_Box_Models_App_DataListCreator('', 'komisihitung', array(), array());
        $khData  = $khDao->getAllKomisiHitung(new Erems_Models_Komisi_Master_KomisiHitung());
       // var_dump($clDao->getByProjectPt($cl));


        return array(
            "data"=> array(
             
                "komisihitung" => array(
                    "model" => Apli::generateExtJSModel($khdl),
                    "data" => $khData[1],
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

        $komisi = new Erems_Models_Komisi_Master_MasterKomisi();
        $komisi->setArrayTable($data);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());
        $komisi->setAddBy($session->getUserId());
        
        
        $validator = new Erems_Models_Komisi_Master_Validator();
        $validator->run($komisi);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Komisi_Master_Dao();
            $hasilSave = 0;
      
            $hasilSave = $dao->save($komisi);
         

            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan master komisi.";
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
        
        $komisi = new Erems_Models_Komisi_Master_MasterKomisi();
        $komisi->setArrayTable($data);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());
        $komisi->setModiBy($session->getUserId());

        
        $validator = new Erems_Models_Komisi_Master_Validator();
        $validator->run($komisi);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Komisi_Master_Dao();
            $hasilSave = 0;
      
            $hasilSave = $dao->update($komisi);
         

            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan master komisi.";
            }else{
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

    

    


}
