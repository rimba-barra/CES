<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_ProgressUnitProcessor extends Erems_Models_App_Box_Processor {

    private $currentConstruction;

    public function daoProses($dao, $object, $modeCreate) {
        echo "hello";
        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    public function afterFillData($construction) {
        // unmark this for development
        //   $this->updatePencairan($construction); 

        return $construction;
    }

    public function daoSave($dao, $object) {
        $hasilSave = (int) $dao->save($object);


        if ($hasilSave > 0) {
            $object->setId($hasilSave);
            $this->syncAllTableProgress($object);
            //$this->sendEmail($dao, $object);
        }

        return $hasilSave;
    }

    public function daoUpdate($dao, $construction) {
        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $data = $this->getData();
        $construction->setSendMail(isset($data["send_mail"]) ? $data["send_mail"] : false);

        $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
        $de->setDelimiterCandidate($decan);
        $de->generate();
        $hasilUpdate = (int) $dao->update($construction, $decan);


        $statusSentMail = FALSE;
        if ($hasilUpdate > 0) {
            // $construction->setId(900);
            $this->syncAllTableProgress($construction);
            //$this->sendEmail($dao, $construction);
        }


        return $hasilUpdate;
    }

    public function syncAllTableProgress($object){
        $this->updatePencairan($object);
        $this->updateProgressDetailPencairanKPR($object);
        $this->updateUnitprogress($object);
    }

    /* added 20170706
     * 
     */

    private function updateProgressDetailPencairanKPR(Erems_Models_Construction_Construction $co) {

        $params = $this->getData();
        $persenProgress = doubleval($params["progress_persen"]);
        $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $plId = isset($params["purchaseletter_purchaseletter_id"]) ? intval($params["purchaseletter_purchaseletter_id"]) : '';
        $pl = $plDao->getOne($plId);
        $priceType = isset($pl[1][0]["pricetype_pricetype"]) ? $pl[1][0]["pricetype_pricetype"] : "KOSONG";

        if ($priceType == "KPR") {
           
            $acDao = new Erems_Models_Admincollection_Dao();
            $acData = $acDao->getPencairanKPR($plId);
            $pencairan = $acData[1];
            if (count($pencairan) > 0) {

                $allUpdateCair = array();
                foreach($pencairan as $cair){
        
                 //if(doubleval($cair["persen_progress"]) < $persenProgress && ( $persenProgress >= doubleval($cair["persen_pencairan"]))){
                 if(doubleval($cair["persen_progress"]) < $persenProgress ){
                        $updateCair = new Erems_Models_Admincollection_PencairanKPR();
                        $updateCair->setId($cair["purchaseletter_pencairankpr_id"]);
                        $updateCair->setPlafon($cair['plafon_id']); 
                        //get plafon
                        $readPlafon = $acDao->readPlafon($this->getSession()->getProject()->getId(),$this->getSession()->getPt()->getId(),$cair['plafon_id']);
                        if(isset($readPlafon[0][0])){
                            $persenPlafon = doubleval($readPlafon[0][0]['persen_desc']);
                        }else{
                            $persenPlafon = 999;
                        }
                        //$updateCair->setPersenProgress($persenProgress);
                        if($persenProgress >= $persenPlafon){
                          //1 tahap plafon dianggap selesai
                          $updateCair->setPersenProgress(100);
              $updateCair->setDuedateEscrow($params['progress_date']);
              $this->sendEmailProgress($cair, $pl[1][0]);
                        }else{
                          $updateCair->setPersenProgress(0);
              $updateCair->setDuedateEscrow($cair['duedate_escrow']);
              //$updateCair->setDueDateEscrow($updateCair->getDueDateEscrow());
                          //$updateCair->setPersenProgress($cair["persen_progress"]);
                        }
                        
                        $allUpdateCair[] = $updateCair;
                    }
                }
                

                if(count($allUpdateCair) > 0){
                    $decan = Erems_Box_Tools::toDecan($allUpdateCair);
                    $daoUpateCair = new Erems_Models_Admincollection_Dao();
                    $hasil = $daoUpateCair->updateProgressPersenPencairanKPR($this->getSession()->getUser()->getId(),$decan);
                }
            }
        }
    }

    /* added 10 maret 2015
     * setelah user menambahkan progress, system akan mengecek persentase progress jika berdasarkan batasan
     * target dan menambahkan record baru pada skema pencairan
     * @return void
     *
     */

    private function updatePencairan(Erems_Models_Construction_Construction $co) {

        $this->currentConstruction = $co;

        // get all plafon limit
        $dao = new Erems_Models_Construction_Dao();
        $hasil = $dao->getTargets($co->getUnit()->getId(), $co->getSpk()->getId());

        $hasilObj = Erems_Box_Tools::dbResultToObjectsTree($hasil, 'constarget');



        if (!$hasilObj) {
            return FALSE;
        }
        // cek jika progres konstruksi ada di dalam target
        $plafons = $this->getMatchedPlafons($hasilObj, $co);



        if (count($plafons) == 0) {
            return FALSE;
        }

        // cek jika ada skema pencairan untuk bank di purchaseletter unit 
        $skemaBank = $dao->getSkemaBank($co->getUnit()->getId());




        $skemaBank = Erems_Box_Tools::dbResultToObjects($skemaBank, "bankkpr");

        $plafonCairs = $this->crosscekSkemaPencairanNonKPR($plafons);

        if (count($plafonCairs) > 0) {
            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $decan = new Erems_Box_Models_App_DecanForObject($plafonCairs);
            $de->setDelimiterCandidate($decan);
            $de->generate();


            $hasilSave = $dao->generateCair($this->getSession(), $decan);
        }



        /*
          if (!$skemaBank) { /// jika bukan KPR
          $plafonCairs = $this->crosscekSkemaPencairanNonKPR($plafons);

          if (count($plafonCairs) > 0) {
          $de = new Erems_Box_Delien_DelimiterEnhancer();
          $decan = new Erems_Box_Models_App_DecanForObject($plafonCairs);
          $de->setDelimiterCandidate($decan);
          $de->generate();


          $hasilSave = $dao->generateCair($this->getSession(), $decan);
          }

          } else {


          /*
          $skemaBank = $skemaBank[0];
          /// generate skema pencairan
          $plafonCairs = $this->crosscekSkemaPencairan($skemaBank, $plafons);

          if (count($plafonCairs) > 0) {
          $de = new Erems_Box_Delien_DelimiterEnhancer();
          $decan = new Erems_Box_Models_App_DecanForObject($plafonCairs);
          $de->setDelimiterCandidate($decan);
          $de->generate();


          $hasilSave = $dao->generateCair($this->getSession(), $decan);
          }

         */
        //}
    }

    private function updateUnitprogress(Erems_Models_Construction_Construction $co){
      //update top progress ke m_unit
      $dao = new Erems_Models_Construction_Dao();
      $hasil = $dao->getTopProgressB($co);
      if(isset($hasil[0][0])){
          $topProgress = doubleval($hasil[0][0]['progress']);
          $hasil = $dao->updateUnitprogress($co->getUnit()->getId(), $topProgress, $co->getAddBy());

      }
      return $hasil;
    }

    public function updatePencairanOnProgressDelete(Erems_Models_Construction_Construction $co, Erems_Box_Kouti_InterSession $session, $constId) {
      $dao = new Erems_Models_Construction_Dao();
      $acDao = new Erems_Models_Admincollection_Dao();
      //top proggress - 1
      $progressVal = $dao->getOneProgressPersenVal($constId);
      $progressVal = doubleval($progressVal[0][0]['progress_persen']);
      $top1 = $dao->getTopProgressB($co);
      $top2 = $dao->getTop2ndProgress($co);
      $top1progressVal = doubleval($top1[0][0]['progress']);


      if(isset($top2[0][0])){
          $top2progressVal = doubleval($top2[0][0]['progress']);
          if($top1progressVal>$progressVal){
              return FALSE;
          }
          $cairs = $dao->getCairs($co->getUnit()->getId(),$co->getSpk()->getId());
          foreach ($cairs[1] as $cair) {
            $readPlafon = $acDao->readPlafon($session->getProject()->getId(),$session->getPt()->getId(),$cair['plafon_id']);
      if(isset($readPlafon[0][0])){
        if($top2progressVal < doubleval($readPlafon[0][0]['persen_desc'])){
          //update yg berkaitan
          $this->updateProgressDetailPencairanKPROnProgressDelete($co, $session, $top2progressVal, $cair['purchaseletter_id']);
          $dao->deleteConstructioncair($cair['spkdetail_pencairan_id'],$session);
        }
      } 
          }
      }
      return TRUE;
    }


    private function updateProgressDetailPencairanKPROnProgressDelete(Erems_Models_Construction_Construction $co, $session, $top2progressVal, $plId) {

        $persenProgress = $top2progressVal;
        $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = $plDao->getOne($plId);
        $priceType = isset($pl[1][0]["pricetype_pricetype"]) ? $pl[1][0]["pricetype_pricetype"] : "KOSONG";

        if ($priceType == "KPR") {
           
            $acDao = new Erems_Models_Admincollection_Dao();
            $acData = $acDao->getPencairanKPR($plId);
            $pencairan = $acData[1];

            if (count($pencairan) > 0) {

                $allUpdateCair = array();
                foreach($pencairan as $cair){

                        if ($cair['pencairan_date'] !== NULL || $cair['pencairan_date'] !== ''){
                           //TO DO
                        }
        
                        $updateCair = new Erems_Models_Admincollection_PencairanKPR();
                        $updateCair->setId($cair["purchaseletter_pencairankpr_id"]);
                        $updateCair->setPlafon($cair['plafon_id']); 
                        //get plafon
                        $readPlafon = $acDao->readPlafon($session->getProject()->getId(),$session->getPt()->getId(),$cair['plafon_id']);

                        if(isset($readPlafon[0][0])){
                            $persenPlafon = doubleval($readPlafon[0][0]['persen_desc']);
                        }else{
                            $persenPlafon = 999;
                        }
                        
                        //$updateCair->setPersenProgress($persenProgress);
                        if($persenProgress >= $persenPlafon){
                          //1 tahap plafon dianggap selesai
                          $updateCair->setPersenProgress(100);
              $updateCair->setDuedateEscrow($cair['duedate_escrow']);
                        }else{
                          $updateCair->setPersenProgress(0);
                        }
            
                        $allUpdateCair[] = $updateCair;
                }

                if(count($allUpdateCair) > 0){
                    $decan = Erems_Box_Tools::toDecan($allUpdateCair);
                    $daoUpateCair = new Erems_Models_Admincollection_Dao();
                    $hasil = $daoUpateCair->updateProgressPersenPencairanKPR($session->getUser()->getId(),$decan);
                }
            }
        }
    }


    private function getMatchedPlafons($targets, $construction) {
        $plafons = array();
        foreach ($targets as $target) {
            if ($target->getPlafon()->getPercent() <= $construction->getProgressPersen()) {
                $plafons[] = $target;
            }
        }
        return $plafons;
    }

    private function crosscekSkemaPencairanNonKPR($matchedPlafons) {

        $plafonCairs = array();
        foreach ($matchedPlafons as $target) {

            $this->checkNonBankPlafon($target, $plafonCairs, $this->currentConstruction);
        }

        return $plafonCairs;
    }

    private function crosscekSkemaPencairan(Erems_Models_Master_BankKPR $skemaBank, $matchedPlafons) {

        $plafonCairs = array();
        foreach ($matchedPlafons as $target) {
            $this->checkBankPlafon($skemaBank->getPlafon1(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon2(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon3(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon4(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon5(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon6(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon7(), $target, $plafonCairs, $this->currentConstruction);
            $this->checkBankPlafon($skemaBank->getPlafon8(), $target, $plafonCairs, $this->currentConstruction);
        }

        return $plafonCairs;
    }

    private function checkBankPlafon(Erems_Models_Construction_Plafon $plafon, Erems_Models_Construction_Target $target, & $plafonCairs, Erems_Models_Construction_Construction $co) {
        if ($target->getPlafon()->getId() == $plafon->getId()) {
            $cair = new Erems_Models_Construction_Pencairan();
            $cair->setPlafon($plafon);
            $cair->setRealDate(date('m-d-Y', strtotime($co->getProgressDate())));
            $cair->setSpkDetail($target->getSpkDetail());
            $cair->setUnit($co->getUnit());
            $cair->setStatus(1);
            $plafonCairs[] = $cair;
        }
    }

    private function checkNonBankPlafon(Erems_Models_Construction_Target $target, & $plafonCairs, Erems_Models_Construction_Construction $co) {
        //  if ($target->getPlafon()->getId() == $plafon->getId()) {
        $cair = new Erems_Models_Construction_Pencairan();
        $cair->setPlafon($target->getPlafon());
        $cair->setRealDate(date('m-d-Y', strtotime($co->getProgressDate())));
        $cair->setSpkDetail($target->getSpkDetail());
        $cair->setUnit($co->getUnit());
        $cair->setStatus(1);
        $plafonCairs[] = $cair;
        // }
    }

    /*
      private function updatePencairan(Erems_Models_Construction_Construction $co) {


      // get all plafon limit
      $dao = new Erems_Models_Construction_Dao();
      $hasil = $dao->getTargets($co->getUnit()->getId(), $co->getSpk()->getId());

      $hasilObj = Erems_Box_Tools::dbResultToObjectsTree($hasil, 'constarget');

      if ($hasilObj) {
      $allCair = array();
      foreach ($hasilObj as $target) {
      if ($target->getPlafon()->getPercent() <= $co->getProgressPersen()) {
      /// add new skema
      $cair = new Erems_Models_Construction_Pencairan();
      $cair->setSpkDetail($target->getSpkDetail());
      $cair->setUnit($target->getUnit());
      $cair->setStatus(1);
      $cair->setRealDate(date('m-d-Y',strtotime($co->getProgressDate())));
      $cair->setPlafon($target->getPlafon());

      $allCair[] = $cair;
      }
      }





      $de = new Erems_Box_Delien_DelimiterEnhancer();
      $decan = new Erems_Box_Models_App_DecanForObject($allCair);
      $de->setDelimiterCandidate($decan);
      $de->generate();

      var_dump($decan->getDCResult());

      die();


      $hasilSave = $dao->generateCair($this->getSession(), $decan);


      }

      }
     */

   
  private function sendEmailProgress($cair, $pl) {

        $u = Erems_Box_Tools::getCurrentUserInfo();

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getSession()->getProject()->getId(),$this->getSession()->getPt()->getId());
        
        // set di genco
        // application\modules\erems\box\projectptconfig
        $receiverNotifikasi = $genco->getEmailNotifikasiKonstruksi();

        $userName = $receiverNotifikasi[0][1];

        if (count($cair) > 0) { // add datanya
            if (TRUE) {
                try {
                    $message = '<html><body>';
                    $message .= '<p>Dear Bapak / Ibu, ' . $userName . '</p>';
                    $message .= "<p>Berikut realisasi progress konstruksi unit no <b>".$pl['unit_unit_number'] ."</b> <br> ( NO SPT ".$pl['purchaseletter_no']." )  
                 <br> pada tanggal ".$cair['escrow_date']."</p>";
          $message .="<p>Progress saat ini : ".$pl['unit_progress']." %  / ".$cair['keterangan'] ."</p>";
                    $message .="<p>Jumlah Pencairan KPR : ".$cair['persen_pencairan']."% - Rp ".$cair['pencairan_amount']."</p>";
                    $message .= "<br><p>Regards,</p>";
                    $message .= "<p>EREMS SYSTEM <br>";
          $message .= "<i>".date("d-m-Y H:i:s")."</i></p>";
                    $message .= "</body></html>";

                    $mail = new Erems_Box_Library_Email();
                    $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                    $mail->getMail()->setBodyHtml(nl2br($message));

                    foreach ($receiverNotifikasi as $r) {
                       $mail->getMail()->addTo($r[0], $r[1]);
                    }

                    //$mail->addCc('emailAddress', 'nameUser');
                    $mail->getMail()->setSubject('Realisasi Progress Unit '.$pl['unit_unit_number']);
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
                } catch (Zend_Mail_Exception $e) {
                    $statusSentMail = FALSE;
                }
            }
        }
    }
  
    private function sendEmail($dao, $construction) {
        $unitInformation = $dao->getUnitInformation($construction);
        $unitInformation = $unitInformation[0];
        if (count($unitInformation) > 0) { // add datanya
            $userEmail = 'davidpras1994@gmail.com'; //$unitInformation[0]['customer_email'];
            $userName = $unitInformation[0]['customer_name'];

            if (strlen($userEmail) > 5) {
                try {
                    $message = '<html><body>';
                    $message .= '<p>Dear Bapak / Ibu, ' . $userName . '</p>';
                    $message .= "<p>Berikut progress Unit milik Anda</p>";
                    $message .= "<p>&nbsp;</p>";
                    $message .="<p></p>";
                    $message .= "<p>Regards,</p>";
                    $message .= "EREMS APPLICATIONS";
                    $message .= "</body></html>";

                    //  var_dump($message);
                    $req = new Erems_Box_Models_App_HasilRequestRead(array("construction_id" => $construction->getId()));

                    $req->setPage(1);
                    $req->setLimit(25);
                    $pics = $dao->getPictureByConstruction($req);
                    $pics = $pics[1];

                    $x = "http://" . $_SERVER["HTTP_HOST"] . "";
                    $z = new Zend_View_Helper_BaseUrl();
                    $x .= $z->getBaseUrl() . '/app/erems/uploads/progress_unit/';

                    if (count($pics) > 0) {
                        foreach ($pics as $img) {

                            $message .= "<p><img src='" . $x . $img["images"] . "' alt='image progress' /><br>" . $img["description"] . "</p>";
                        }
                    }

                    $mail = new Erems_Box_Library_Email();
                    $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                    $mail->getMail()->setBodyHtml(nl2br($message));
                    $mail->getMail()->addTo($userEmail, $userName);
                    //$mail->addCc('emailAddress', 'nameUser');
                    $mail->getMail()->setSubject('Progress Unit Information');
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
                } catch (Zend_Mail_Exception $e) {
                    $statusSentMail = FALSE;
                }
            }
        }
    }

}

?>
