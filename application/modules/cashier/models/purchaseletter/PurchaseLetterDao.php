<?php

/**
 * Description of PurchaseLetterDao
 *
 * @author MIS
 */
class Cashier_Models_Purchaseletter_PurchaseLetterDao extends Cashier_Box_Models_App_AbDao implements Cashier_Box_Models_App_BlackHole {

    public function getAllKrtPiutangFin(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$clusterId,$unitId) {
        $hasil = array();

        /*
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                $r->getOthersValue('api_aci'));
        */

        $hasil = $this->dbTable->spToQuery2('sp_purchkrtpiutangfin_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),'',$clusterId,$unitId);
     
        return $hasil;
    }
    
    public function getAll(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl) {
        $hasil = array();

        /*
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                $r->getOthersValue('api_aci'));
        */

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterb_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                $r->getOthersValue('api_aci'));
     
        return $hasil;
    }
    
    public function getAllXHariKebelakang(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterxharikebelakang_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                intval($paramsReq["x_hari"]));
        
  
     
        return $hasil;
    }
    
    public function getAllHPPTanah(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterhpptanah_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getUnit()->getNumber());
        return $hasil;
    }
    
    public function getAllBacklog(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterbacklog_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getCluster(),
                $pl->getUnit()->getNumber());
        return $hasil;
    }
    
    public function getPromoSdhByr30Persen(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

        $hasil = $this->dbTable->spToQuery2('sp_purchasepromobyr30persen_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                intval($paramsReq["persen_bayar"]));
        return $hasil;
    }
    
    public function getAllPersenBayarXHariKebelakang(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterpersenbayarxhariblkng_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                intval($paramsReq["x_hari"]),
                doubleval($paramsReq["persen_bayar"]));
        
  
        
  
     
        return $hasil;
    }
    
    public function getAllPersenBayarBelumST(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterpersenbayarbelumst_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                doubleval($paramsReq["persen_bayar"]));
        
  
        
  
     
        return $hasil;
    }

    public function getAllGeneralInformation(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$salesmanName,$purchaseDateBot,$purchaseDateTop) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', $ses->getProject()->getId(), $ses->getPt()->getId(), $r->getPage(), $r->getLimit(), $pl->getNomor(), $pl->getCustomer()->getName(), $pl->getUnit()->getNumber(),$salesmanName,$purchaseDateBot,$purchaseDateTop);
     
        return $hasil;
    }

    public function getAllGeneralInformationByPage($page,$limit, Cashier_Box_Models_App_Session $ses, Cashier_Models_Purchaseletter_PurchaseLetter $pl,$salesmanName,$purchaseDateBot,$purchaseDateTop) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', $ses->getProject()->getId(), $ses->getPt()->getId(),$page,$limit, $pl->getNomor(), $pl->getCustomer()->getName(), $pl->getUnit()->getNumber(),$salesmanName,$purchaseDateBot,$purchaseDateTop);
     
        return $hasil;
    }

    /* marked 11 oct 2014
      public function getTotalPayment(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter){
      $hasil = 0;
      return $hasil;
      }

     */

    public function getListKartuPiutang(Cashier_Box_Models_App_HasilRequestRead $requestRead, Cashier_Box_Models_App_Session $session = NULL) {
        $hasil = array();
        if ($session) {
            $hasil = $this->dbTable->SPExecute('sp_kartupiutang_read', $requestRead->getPage(),
                    $requestRead->getLimit(),
                    $session->getProject()->getId(),
                    $session->getPt()->getId(),
                    $requestRead->getOthersValue('cluster_id'), 
                    $requestRead->getOthersValue('block_id'), 
                    $requestRead->getOthersValue('position_id'),
                    $requestRead->getOthersValue('productcategory_id'),
                    $requestRead->getOthersValue('type_id'),
                    $requestRead->getOthersValue('purpose_id'), 
                    $requestRead->getOthersValue('side_id'), 
                    $requestRead->getOthersValue('unitstatus_id'),
                    $requestRead->getOthersValue('unit_number'),
                    $requestRead->getOthersValue('is_cancel'),
                    $requestRead->getOthersValue('customer_name')
            );
        } else {
            $hasil = $this->dbTable->SPExecute('sp_kartupiutang_read', $requestRead->getPage(), $requestRead->getLimit(), $requestRead->getOthersValue('cluster_id'), $requestRead->getOthersValue('block_id'), $requestRead->getOthersValue('position_id'), $requestRead->getOthersValue('productcategory_id'), $requestRead->getOthersValue('type_id'), $requestRead->getOthersValue('purpose_id'), $requestRead->getOthersValue('side_id'), $requestRead->getOthersValue('unitstatus_id')
            );
        }



        return $hasil;
    }

    public function getKartuPiutang(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangdetail_read', $purchaseLetter->getId());
        return $hasil;
    }
    
    public function getKartuPiutang2($purchaseletterId) {
        $hasil = array();
    
        $hasil = $this->dbTable->SPExecute('sp_report_kartupiutang_pl',$purchaseletterId);
        return $hasil;
    }

    /*  getPaymentsByPLId
     *  get Payments by purchaseletter id
     *  @params purchaseletter
     */

    public function getPaymentsById(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangpayment_read', $id);

        return $hasil;
    }
    
    public function getScheduleDenda(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_scheduledenda_read', $id);
        return $hasil;
    }

    /*  getScheduleById
     *  get Schedule by purchaseletter id
     *  @params purchaseletter
     */

    public function getScheduleById(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangschedule_read', $id);
        return $hasil;
    }
    
    public function getScheduleNoNKPRById(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangschedulenonkpr_read', $id);
        return $hasil;
    }
    
    public function getScheduleMasihDenda(Cashier_Box_Models_App_HasilRequestRead $r,$projectId,$ptId) {
        $hasil = array();
  
        $hasil = $this->dbTable->SPExecute('sp_popupdenda_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$r->getOthersValue("unit_unit_number"));
        return $hasil;
    }
    
    public function getScheduleByIdtanpaKPR(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangschedule_read', $id);
        if(is_array($hasil)){
           if(key_exists(1, $hasil)){
               if(is_array($hasil[1])){
                   foreach ($hasil[1] as $key => $tagihan){
                      if($tagihan["scheduletype_scheduletype_id"]==Cashier_Box_Config::SCHTYPE_KPR){
                          unset($hasil[1][$key]);
                          $hasil[0][0]['totalRow'] = $hasil[0][0]['totalRow']-1;
                      }
                   }
               }
           } 
        }
      
        return $hasil;
    }

    public function getOneByUnit(Cashier_Models_Unit_Unit $ut) {
        $hasil = array();
        if ($ut->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetailbyunit_read', $ut->getId());

        return $hasil;
    }

    public function getOneChangePriceRequested(Cashier_Models_Unit_Unit $ut) {
        $hasil = array();
        if ($ut->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterbychangeprice_read', $ut->getId());

        return $hasil;
    }

    public function getOne($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_v3_read', $purchaseLetterId);
    
        
        return $hasil;
    }
    
    public function getOne4Cashier($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_cashier_read', $purchaseLetterId);
    
        
        return $hasil;
    }
    
    public function getGeneralInformation($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_v4_read', $purchaseLetterId);
    
        
        return $hasil;
    }
    
    public function getOneForPrintout($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_printout_read', $purchaseLetterId,
        Cashier_Box_Config::SCHTYPE_UANGMUKA,  Cashier_Box_Config::SCHTYPE_TANDAJADI);
    
        return $hasil;
    }

    public function save(Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl) {
        $hasil = 0;
        
        

        $hasil = $this->saveintern($pl, $pl->getPrice(), $pl->getPriceAdmin());
        
        return $hasil;
    }

    public function getTotalPayment(Cashier_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        //
        $hasil = 0;
        if ($purchaseLetter->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_purchaselettergetpayment_read', $purchaseLetter->getId());

        $hasil = $hasil[0][0]['total_payment'];

        return $hasil;
    }

    public function update(Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl,Cashier_Box_Models_App_Decan $deletedDecan = NULL,Cashier_Models_Master_CustomerProfile $customer) {
        $hasil = 0;
        
        $dcResult = $pl->getDCResult();
        
        
        $ds = '';

        if ($deletedDecan) {
            $ds = $deletedDecan->getString();
        }
        
     
        
      
        

        $hasil = $this->dbTable->SPUpdate('sp_purchaseletterb_update', $pl->getAddBy(), $pl->getId(), $pl->getNomor(), date('Y-m-d', strtotime($pl->getDate())), $pl->getSalesman()->getId(), $pl->getMemberName(), $pl->getClubCitra()->getId(), $pl->getSalesLocation()->getId(), $pl->getMediaPromotion()->getId(), $pl->getRencanaSerahTerima(), date('Y-m-d', strtotime($pl->getRencanaSerahTerimaDate())), $pl->getCollector()->getId(), 
                $pl->getNotes(),$pl->getKpp(),$pl->getUpline()->getId(),$pl->getIsUplineReferall(),
                $pl->getCac()->getId(),$pl->getIsCacReferall(),
                $dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],$dcResult["sourcemoney_sourcemoney_id"],$ds,
                $customer->getId(),
                $customer->getAddress(),
                $customer->getCity()->getId(),
                $customer->getZipCode(),
                $customer->getHomePhone(),
                $customer->getMobilePhone(),
                $customer->getOfficePhone(),
                $customer->getFax(),
                $customer->getKtp()->getNomor(),
                $customer->getNpwpNumber(),
                $customer->getNpwpAddress(),
                $customer->getEmail(),
                $pl->getDownlineId(),
                $pl->getKeteranganBayar(),
                $pl->getKeterangan1(),
                $pl->getKeterangan2(),
                $pl->getKeterangan3(),
                $pl->getHouseAdvisor(),
                $pl->getManager(),
                $pl->getHsKeuangan(),
                $pl->getPromo()
        );
     

        return $hasil;
    }
    
    
    public function getAllReschedule($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_reschedule_read', $purchaseLetterId);
        return $hasil;
    }
    
    
    
    public function getReschScheduleById(Cashier_Models_Purchaseletter_Reschedule $r) {
        $hasil = array();
        $id = (int) $r->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_reschschedule_read', $id);
        return $hasil;
    }
    
    public function saveReschedule(Cashier_Models_Purchaseletter_Reschedule $r) {
        $hasil = 0;

        
   
        $dcResult = $r->getDCResult();
          
        $hasil = $this->dbTable->SPUpdate('sp_reschedule_create', $r->getAddBy(),
                $r->getPurchaseletter()->getId(),
                $r->getReason(),
                $r->getIsApprove(),
                $r->getApproveDate(),
                $r->getRencanaSerahTerimaDate(),
                $r->getRencanaSerahTerimaMonth(),
                $dcResult["schedule_id"], $dcResult["scheduletype_id"],
                $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],
                $dcResult["sourcemoney_sourcemoney_id"],
                $dcResult["remaining_balance"]
        );
        
        

     

        return $hasil;
    }
    
    public function updateReschedule(Cashier_Models_Purchaseletter_Reschedule $r,Cashier_Box_Models_App_Decan $deletedDecan = NULL) {
        $hasil = 0;

        
   
        $dcResult = $r->getDCResult();
        
        if ($deletedDecan) {
            $ds = $deletedDecan->getString();
        }
        
        
       /* echo "<pre>";
        var_dump($dcResult);
        echo "</pre>";
        die();
       */
        
        $hasil = $this->dbTable->SPUpdate('sp_reschedule_update', $r->getAddBy(),
                $r->getId(),
                $r->getReason(),
                $r->getIsApprove(),
                $r->getApproveDate(),
                $r->getRencanaSerahTerimaDate(),
                $r->getRencanaSerahTerimaMonth(),
                $ds,
                $dcResult["schedule_id"], $dcResult["scheduletype_id"],
                $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],
                $dcResult["sourcemoney_sourcemoney_id"],
                $dcResult["remaining_balance"]
        );
        
      //  var_dump($this->dbTable);

     

        return $hasil;
    }

    private function saveintern(Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl, Cashier_Models_Sales_Price $price, Cashier_Models_Sales_PriceAdmin $pa) {
        $hasil = 0;

        $dcResult = $pl->getDCResult();
        
        
      
  
        
        $hasil = $this->dbTable->SPUpdate('sp_purchaseletterb_create', $pl->getAddBy(), $pl->getUnit()->getStatus()->getId(), $pl->getNomor(),date('Y-m-d', strtotime($pl->getDate())), $pl->getUnit()->getId(), $pl->getSalesman()->getId(), $pl->getCustomer()->getId(), $pl->getPriceType()->getId(), $pl->getBankKPR()->getId(), $price->getPermeter(), $price->getKelebihan(), $price->getTanah(), $price->getTotalKelebihan(), $price->getBangunan(), $price->getJualDasar(), $price->getDiscountDasar(), $price->getAfterDiscountDasar(), $price->getDiscountTanah(), $price->getAfterDiscountTanah(), $price->getDiscountBangunan(), $price->getAfterDiscountBangunan(), $price->getNetto(), $price->getPpnTanah(), $price->getAfterPpnTanah(), $price->getPpnBangunan(),
                $price->getAfterPpnBangunan(),$price->getPpnbm(),$price->getAfterPpnbm(),$price->getPph22(),$price->getAfterPph22(),
                $price->getBbnSertifikat(), $price->getBphtb(), $price->getBajb(), $pa->getPrice(), $pa->getSubsidi(), $pa->getPMutu(), $pa->getPaketTambahan(), $price->getJual(), $pa->getDiskon(), $pa->getPriceDiskon(), $pl->getTotal(), $dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],$dcResult["sourcemoney_sourcemoney_id"], $pl->getBilling()->getId(), $pl->getBilling()->getTandaJadi()->getQuantity(), $pl->getBilling()->getTandaJadi()->getAmount(), $pl->getBilling()->getUangMuka()->getQuantity(), $pl->getBilling()->getUangMuka()->getAmount(), $pl->getBilling()->getAngsuran()->getQuantity(), $pl->getBilling()->getAngsuran()->getAmount(), $pl->getMemberName(), $pl->getClubCitra()->getId(), $pl->getSalesLocation()->getId(), $pl->getMediaPromotion()->getId(), $pl->getRencanaSerahTerima(), $pl->getRencanaSerahTerimaDate(),
                $pl->getCollector()->getId(), $pl->getNotes(),$pl->getKpp(),
                $pl->getUpline()->getId(),$pl->getIsUplineReferall(),$pl->getCac()->getId(),$pl->getIsCacReferall(),
                $pl->getDownlineId(),
                $pl->getKeteranganBayar(),
                $pl->getKeterangan1(),
                $pl->getKeterangan2(),
                $pl->getKeterangan3(),
                $pl->getHouseAdvisor(),
                $pl->getManager(),
                $pl->getHsKeuangan(),
                $pl->getBiayaAsuransi(),
                $pl->getPromo(),$pl->getRewardSales()->getId(),
                $pl->getRewardCustomer()->getId(),
                $pl->getRewardTambahan()->getId()
        );
        
        

 
        

        return $hasil;
    }

    public function directDelete(\Cashier_Box_Models_App_Decan $decan, \Cashier_Box_Kouti_InterSession $session) {
        $row = 0;


        $ds = $decan->getString();
        $ids = explode("~", $ds);

        foreach ($ids as $id) {
            $pl = new Cashier_Models_Purchaseletter_PurchaseLetter();
            $pl->setId($id);
            $payment = doubleval($this->getTotalPayment($pl));
			
			
			
            if ($payment > 0) {
                $ds = str_replace($id, "", $ds);
            }
			
		
        }
		
		

        $row = $this->dbTable->SPUpdate('sp_purchaseletter_destroy', $ds, $session->getUserId(), Cashier_Box_Config::UNITSTATUS_STOCK);
		
		
        return $row;
    }
    
    public function deletedReschedule($data, \Cashier_Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_reschedule_destroy', $data, $session->getUserId());
        
        return $row;
    }
    
    
    public function approveReschedule(Cashier_Models_Purchaseletter_Reschedule $r) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_reschedule_approve',$r->getModiBy(),$r->getId());
        
        return $row;
    }
    
    public function getEmailReschedule($rescheduleId,$approveUserId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_rescheduleemail_read',$rescheduleId,$approveUserId);
       
        return $hasil;
    }
    
    public function setForApiAci($id,$session){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_purchaseletter_setapiaci_update',$id,$session->getUserId());
        return $hasil;
    }
    
    public function setForApiAcis($id,$session){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_setapiaci_update',$id,$session->getUserId());
        return $hasil;
    }
    
    public function updateHppTanah(Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_hpptanah_update',$pl->getModiBy(),$pl->getId(),$pl->getHppTanahTanahMentah(),$pl->getHppTanahDevCost(),
                $pl->getHppTanahSkalaKota(),$pl->getHppTanahBunga(),$pl->getHppTanahBangunanaPermeter(),$pl->getHppTanahSkalaEco());
        return $hasil;
    }
    
    public function getAllPemutihan(Cashier_Box_Models_App_HasilRequestRead $r,$projectId,$ptId,Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_pemutihan_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$pl->getNomor(),$pl->getCustomer()->getName(),$pl->getUnit()->getNumber());
        return $hasil;
    }
    
    public function getAllPemutihanSchedule($scheduleIds){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_pemutihanbysch_read',$scheduleIds);
        return $hasil;
    }
    
    
    public function getPemutihanLastNumber($projectId,$ptId,$tahun,$prefix){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_pemutihanlastnumber_read',$projectId,$ptId,$tahun,$prefix);
        return $hasil;
    }
    
    public function getSiapKomisi($projectId,$ptId,Cashier_Box_Models_App_HasilRequestRead $r,Cashier_Models_Purchaseletter_PurchaseLetter $pl){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_popupsiapkomisi_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$pl->getNomor(),$pl->getUnit()->getNumber(),$pl->getCustomer()->getName());
   
        return $hasil;
    }

    public function getCounterKurangBayar($projectId,$ptId){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_counterkurangbayar_read',$projectId,$ptId);
   
        return $hasil;
    }
    
    

}

?>
