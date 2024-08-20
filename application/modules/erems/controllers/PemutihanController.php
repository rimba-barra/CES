<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_PemutihanController extends ApliController {

    public function allRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start / $params["limit"]) + 1 : 1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);

        $sesBox = Apli::getSession();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney', 'unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'purchaselettertransaction', 'customer'));

        $pl = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $pl->getCustomer()->setName($params["customer_name"]);
        $pl->getUnit()->setNumber($params["unit_unit_number"]);
        $pl->setNomor($params["purchaseletter_no"]);
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getAllPemutihan($eremsReq, $sesBox->getProject()->getId(), $sesBox->getPt()->getId(), $pl);


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

        $params = $this->getRequest()->getPost();

        return array(
            "data" => array()
        );
    }

    public function purchaseinfoRead() {

        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getOne(intval($params["purchaseletter_id"]));
		
	
        $allSchedule = $dao->getAllPemutihanSchedule(intval($params["schedule_id"]));

        return array(
            "purchaseletter" => $hasil[1][0],
            "schedule" => $allSchedule[0][0]
        );
    }

    public function saveRead() {

        $params = $this->getRequest()->getPost();

        $hasil = FALSE;
        $msg = "Proses Bayar";

        $sesBox = Apli::getSession();

        $params = json_decode($params["data"], TRUE);

        $scheduleId = intval($params["schedule_id"]);
        $purchaseletterId = intval($params["purchaseletter_id"]);



        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $allSchedule = $dao->getAllPemutihanSchedule($scheduleId);

        $nomorPayment = $params["payment_no"];



        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
        $payment->setAddBy($sesBox->getUser()->getId());
        $payment->setNomor($nomorPayment);
        $payment->getPurchaseletter()->setId($purchaseletterId);
        $payment->getPaymentMethod()->setId(1); // CASH
        $payment->setReferenceNo($nomorPayment);

        $payment->setDate(date("Y-m-d"));
        $payment->setDueDate(date("Y-m-d"));
        $payment->setCairDate(date("Y-m-d"));
        $payment->setDescription($params["note"]);
        $payment->setIsReferenceRejected(0);
        $payment->setAdminFee(0);
        $payment->setDenda(0);
        $payment->setCdn(0);
        $payment->setCdnValue(0);
        $payment->setReceiptNo($nomorPayment);

        $payDao = new Erems_Models_Payment_Dao();



        $fieldUnValid = "";




        $totalPayment = 0;
        if (count($allSchedule[0]) > 0) {
            foreach ($allSchedule[0] as $sch) {
                $paymentDetail = new Erems_Models_Payment_Detail();
                $paymentDetail->setId(0);
                $paymentDetail->getSchedule()->setId($sch["schedule_id"]);
                $paymentDetail->getPaymentType()->setId(0);
                $paymentDetail->setPayment($sch["remaining_balance"]);
                $paymentDetail->setAmount($sch["remaining_balance"]);
                $paymentDetail->setRemainingBalance(0);
                $paymentDetail->setDenda(0);
                $paymentDetail->setDescription("Pemutihan");

                $payment->addDetail($paymentDetail);
                $totalPayment += doubleval($sch["remaining_balance"]);
            }
        }

        $payment->setAmount($totalPayment);
        $payment->setTotal($totalPayment);


        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($payment);
        $de->generate();


        $validator = new Erems_Models_Payment_Validator();
        $validator->setSession($sesBox);
        $validator->run($payment);

        if ($validator->getStatus()) {
            $hasilSave = $payDao->save($payment);
            if ($hasilSave > 0) {
                $hasil = TRUE;
                $msg = "Pemutihan berhasil.";
            } else {
                $msg = "Terjadi kesalahan saat memproses request Anda.";
            }
        }else{
            $msg = $validator->getMsg();
        }









        return array(
            "STATUS" => $hasil,
            "MSG" => $msg,
            "UNVALID_FIELD" => $fieldUnValid
        );
    }

    /*
      public function bayarRead() {

      $params = $this->getRequest()->getPost();

      $hasil = FALSE;
      $msg = "Proses Bayar";

      $sesBox = Apli::getSession();

      $scheduleId = intval($params["schedule_id"]);
      $purchaseletterId = intval($params["purchaseletter_id"]);



      $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
      $allSchedule = $dao->getAllPemutihanSchedule($scheduleId);

      /// generate nomor
      $prefix = "/Col/";
      $nomorPayment = "NOMORKU";
      $tahun = date("Y");
      $lastNomor = $dao->getPemutihanLastNumber($sesBox->getProject()->getId(),$sesBox->getPt()->getId(),$tahun,$prefix);

      if(count($lastNomor[0]) > 0){
      $lastNomor = $lastNomor[0][0]["last_number"];
      $lastNomorAr = explode("/",$lastNomor);
      $nomorPayment = $this->buatNomor((intval($lastNomorAr[0])+1), $prefix, $tahun);
      }else{
      /// buat nomor baru
      $nomorPayment =  $this->buatNomor(1, $prefix, $tahun);

      }
      //end generate nomor

      $payment = new Erems_Models_Payment_Payment();
      $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
      $payment->setAddBy($sesBox->getUser()->getId());
      $payment->setNomor($nomorPayment);
      $payment->getPurchaseletter()->setId($purchaseletterId);
      $payment->getPaymentMethod()->setId(1); // CASH
      $payment->setReferenceNo($nomorPayment);

      $payment->setDate(date("Y-m-d"));
      $payment->setDueDate(date("Y-m-d"));
      $payment->setCairDate(date("Y-m-d"));
      $payment->setDescription("Pemutihan");
      $payment->setIsReferenceRejected(0);
      $payment->setAdminFee(0);
      $payment->setDenda(0);
      $payment->setCdn(0);
      $payment->setCdnValue(0);
      $payment->setReceiptNo($nomorPayment);

      $totalPayment = 0;
      if (count($allSchedule[0]) > 0) {
      foreach ($allSchedule[0] as $sch) {
      $paymentDetail = new Erems_Models_Payment_Detail();
      $paymentDetail->setId(0);
      $paymentDetail->getSchedule()->setId($sch["schedule_id"]);
      $paymentDetail->getPaymentType()->setId(0);
      $paymentDetail->setPayment($sch["remaining_balance"]);
      $paymentDetail->setAmount($sch["remaining_balance"]);
      $paymentDetail->setRemainingBalance(0);
      $paymentDetail->setDenda(0);
      $paymentDetail->setDescription("Pemutihan");

      $payment->addDetail($paymentDetail);
      $totalPayment += doubleval($sch["remaining_balance"]);
      }
      }

      $payment->setAmount($totalPayment);
      $payment->setTotal($totalPayment);


      $de = new Erems_Box_Delien_DelimiterEnhancer();
      $de->setDelimiterCandidate($payment);
      $de->generate();

      $payDao = new Erems_Models_Payment_Dao();
      $hasilSave = $payDao->save($payment);
      if($hasilSave > 0){
      $hasil = TRUE;
      $msg = "Pemutihan berhasil.";
      }else{
      $msg = "Terjadi kesalahan saat memproses request Anda.";
      }





      return array(
      "data" => array(
      "HASIL" => $hasil,
      "MSG" => $msg
      )
      );
      }

     */

    private function buatNomor($nomor, $prefix, $tahun) {
        return str_pad($nomor, 4, "0", STR_PAD_LEFT) . "" . $prefix . "" . $tahun;
    }

}
