<?php require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_PopupagingcomplaintController extends ApliController {

//	public function allRead() {
//
//		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
//		$session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';
//
//		$params = $this->getRequest()->getPost();
//
//		$eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
//		$start = $params["start"];
//		$page = $start > 0 ? ($start / $params["limit"]) + 1 : 1;
//		$eremsReq->setArrayForm($params);
//		$eremsReq->setPage($page);
//		$eremsReq->setLimit($params["limit"]);
//
//		$sesBox = new Erems_Box_Models_App_Session();
//		$sesBox->getProject()->setId($session->getCurrentProjectId());
//		$sesBox->getPt()->setId($session->getCurrentPtId());
//
//		$dm = new Erems_Box_Models_App_Hermes_DataModel();
//		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('cluster', 'block', 'complaint', 'sourcemoney', 'unitb', 'customer', 'payment'));
//		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
//
//		$hasil = $dao->getScheduleMasihDenda($eremsReq, $sesBox->getProject()->getId(), $sesBox->getPt()->getId());
//
//
////        $dm->setDataList($dataList);
//		$dm->setHasil($hasil);
//
////        $dl = $dm->getDataList();
//		$dl->setDataDao($hasil);
//
//		$hasilData = Apli::prosesDao($dm->getDataList());
//
//		return array(
//			"model" => Apli::generateExtJSModel($dm->getDataList()),
//			"data" => $hasilData["data"],
//			"totalRow" => $hasilData["row"]
//		);
//	}

	public function initRead() {

		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$params = $this->getRequest()->getPost();

		return array(
			"data" => array()
		);
	}

//    public function printkurangbayarRead() {
//        
//        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
//
//        $dm = new Erems_Box_Models_App_Hermes_DataModel();
//        $dataList = new Erems_Box_Models_App_DataListCreator('', 'reservation', array(), array(), array(),array("deletedRows"));
//
//        $paramsb = $this->getRequest()->getPost();
//        
//        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
//        $eremsReq->setArrayForm($paramsb);
//
//        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
//        $sesBox = new Erems_Box_Models_App_Session();
//        $hasil = $dao->getScheduleMasihDenda($eremsReq,$session->getCurrentProjectId(), $session->getCurrentPtId());
//        $params = $hasil[1];
//
//        $hasilcounter = $dao->getCounterKurangBayar($session->getCurrentProjectId(), $session->getCurrentPtId());
//        $counter = $hasilcounter[0][0]['value'] ;
//        
//        $paramsOne = $hasil[1][0];
//        $dao = new Erems_Models_Purchaseletter_FollowupDao();
//        $dataPurchase = $dao->getPrintInfo(intval($paramsOne["purchaseletter_id"]));
//        $dataPurchase = $dataPurchase[0][0];
//
//        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getCurrentProjectId(), $session->getCurrentPtId());
//		
//		
//        $table = $genco->getSuratkurangbayarPrintTemplate()->generateTable($params);
//        $html = $genco->getSuratkurangbayarPrintTemplate()->getHTML();
//
//        $datenow = strtotime(date('Y-m-d'));
//        $datemax = strtotime("+14 day", $datenow);
//        $dataPurchase['date_today'] = Erems_Box_Tools::indodayWords(date('Y-m-d'));
//        $dataPurchase['date_max'] = Erems_Box_Tools::indodayWords(date('Y-m-d'));
//         $dataPurchase['date_2weeks'] = Erems_Box_Tools::indodayWords(date('Y-m-d', strtotime(date('Y-m-d'). ' + 14 days'))) ;
//        
//        //user info
//		$userInfo = Erems_Box_Tools::getCurrentUserInfo();
//        $userInfo = $dao->getUserInfo($userInfo['user_id']);
//        $dataPurchase['user_fullname'] = $userInfo['user_fullname'];
//        $dataPurchase['user_initial']  = $userInfo['description'];
//
//        //Penomoran
//        $datasurat['nomor_baru']=$counter;
//        $datasurat['bulan']=date('m');
//        $datasurat['tahun']=date('Y');
//       
//
//        $no_surat = $genco->formatNomorKurangBayar($datasurat);
//
//        $dataPurchase['no_surat'] = $no_surat;
//
//        foreach (array_keys($dataPurchase) as $key) {
//            $html = str_replace("{".$key."}", $dataPurchase[$key], $html);
//        }
//
//        $html = str_replace("{{table}}", $table, $html);
//
//        $pdf = $genco->getSuratkurangbayarPrintTemplate()->createPDF($html, $paramsOne["purchaseletter_id"]);
//
//        return array(
//                "data"=> array(
//                    "HTML" => $html,
//                    "URL" => $pdf,
//            )
//        );
//        
//
//    }
}
